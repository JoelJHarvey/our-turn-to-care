#!/usr/bin/env python3
"""
Step 5b/7b/8b/9b/10b: Geocode facilities missing lat/lon coordinates.

Uses the US Census Bureau Geocoder batch API (free, no API key needed).
Reads records with NULL latitude from Supabase, geocodes them via Census API,
and updates Supabase with the resulting coordinates.

Processes by facility type: home_health → hospice → nursing → assisted_living
Census batch API limit: 10,000 addresses per request.

Safe to re-run — only processes records that still have NULL latitude.

v2 updates (2026-03-31):
  - Retry logic now catches HTTP 502/503/500 errors (not just timeouts)
  - 5 retry attempts with escalating backoff (30s → 120s)
  - Graceful per-source error handling (continues to next type on failure)
  - 10s delay between batches to reduce Census server load
  - Added 'nursing' to facility types

Usage: python3 geocode-facilities.py
"""

import csv
import io
import os
import sys
import time

try:
    import requests
except ImportError:
    print("ERROR: 'requests' library is not installed.")
    print("Fix:   pip3 install requests")
    sys.exit(1)

try:
    from supabase import create_client
except ImportError:
    print("ERROR: 'supabase' library is not installed.")
    print("Fix:   pip3 install supabase")
    sys.exit(1)

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

CENSUS_BATCH_URL = "https://geocoding.geo.census.gov/geocoder/locations/addressbatch"
CENSUS_BENCHMARK = "Public_AR_Current"
BATCH_SIZE = 5000          # Records per Census API call (max 10,000; 5K is safer)
SUPABASE_BATCH_SIZE = 200  # Records per Supabase update call
FACILITY_TYPES = ["home_health", "hospice", "assisted_living"]

MAX_RETRIES = 5            # Number of retry attempts per batch
RETRY_BASE_WAIT = 30       # Base wait time in seconds (multiplied by attempt number)
BATCH_DELAY = 10           # Seconds to wait between Census API batches

# ---------------------------------------------------------------------------
# Load Supabase credentials from .env.local
# ---------------------------------------------------------------------------

def load_env():
    """Read .env.local and return dict of key=value pairs."""
    env_vars = {}
    env_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), ".env.local")
    if not os.path.exists(env_path):
        print(f"ERROR: .env.local not found at {env_path}")
        sys.exit(1)
    with open(env_path, "r") as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                key, value = line.split("=", 1)
                env_vars[key.strip()] = value.strip()
    return env_vars


def get_supabase_client():
    """Create and return a Supabase client."""
    env = load_env()
    url = env.get("NEXT_PUBLIC_SUPABASE_URL")
    key = env.get("SUPABASE_SERVICE_ROLE_KEY")
    if not url or not key:
        print("ERROR: Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local")
        sys.exit(1)
    return create_client(url, key)


# ---------------------------------------------------------------------------
# Step 1: Fetch records needing geocoding from Supabase
# ---------------------------------------------------------------------------

def fetch_records_needing_geocoding(supabase, facility_type):
    """
    Fetch all records of a given facility_type where latitude is NULL.
    Returns list of dicts with facility_id, address_line_1, city, state, zip_code.

    Fetches by state to avoid Supabase free-tier statement timeouts.
    """
    print(f"\n{'='*60}")
    print(f"Fetching {facility_type} records with NULL coordinates...")

    STATES = [
        "AK","AL","AR","AZ","CA","CO","CT","DC","DE","FL","GA","GU","HI","IA",
        "ID","IL","IN","KS","KY","LA","MA","MD","ME","MI","MN","MO","MP","MS",
        "MT","NC","ND","NE","NH","NJ","NM","NV","NY","OH","OK","OR","PA","PR",
        "RI","SC","SD","TN","TX","UT","VA","VI","VT","WA","WI","WV","WY"
    ]

    all_records = []
    page_size = 500

    for st in STATES:
        offset = 0
        while True:
            try:
                response = (
                    supabase.table("facilities")
                    .select("facility_id, address_line_1, city, state, zip_code")
                    .eq("facility_type", facility_type)
                    .eq("state", st)
                    .is_("latitude", "null")
                    .eq("is_active", True)
                    .range(offset, offset + page_size - 1)
                    .execute()
                )
                batch = response.data
                if not batch:
                    break
                all_records.extend(batch)
                offset += page_size
                if len(batch) < page_size:
                    break
            except Exception as e:
                err_str = str(e)
                # Don't retry on schema/enum errors — they'll never succeed
                if "invalid input value" in err_str or "22P02" in err_str:
                    print(f"    ERROR: Invalid facility_type '{facility_type}'. Skipping entirely.")
                    return all_records
                print(f"    Warning: error fetching {facility_type} in {st}: {e}")
                print(f"    Retrying in 5s...")
                time.sleep(5)
                continue

    print(f"  Found {len(all_records)} records needing geocoding")
    return all_records


# ---------------------------------------------------------------------------
# Step 2: Build Census CSV and call batch API
# ---------------------------------------------------------------------------

def build_census_csv(records):
    """
    Build a CSV string for the Census batch geocoder.
    Format: Unique ID, Street address, City, State, ZIP (no headers).
    """
    output = io.StringIO()
    writer = csv.writer(output)
    for rec in records:
        writer.writerow([
            rec["facility_id"],
            rec.get("address_line_1", "") or "",
            rec.get("city", "") or "",
            rec.get("state", "") or "",
            rec.get("zip_code", "") or ""
        ])
    return output.getvalue()


def call_census_geocoder(csv_content, batch_num, total_batches):
    """
    Submit a batch of addresses to the Census Geocoder API.
    Returns parsed results as list of dicts: {facility_id, latitude, longitude, match_type}.

    Retries on HTTP 5xx errors, timeouts, and connection errors.
    """
    num_addresses = len(csv_content.splitlines())
    print(f"  Sending batch {batch_num}/{total_batches} to Census Geocoder ({num_addresses} addresses)...")

    files = {
        "addressFile": ("addresses.csv", csv_content, "text/csv")
    }
    data = {
        "benchmark": CENSUS_BENCHMARK
    }

    response = None

    for attempt in range(1, MAX_RETRIES + 1):
        try:
            response = requests.post(
                CENSUS_BATCH_URL,
                files=files,
                data=data,
                timeout=600  # 10 minutes per batch
            )

            # Check for server errors (500, 502, 503, etc.)
            if response.status_code >= 500:
                if attempt < MAX_RETRIES:
                    wait = RETRY_BASE_WAIT * attempt
                    print(f"    Attempt {attempt}/{MAX_RETRIES}: HTTP {response.status_code} error. "
                          f"Waiting {wait}s before retry...")
                    time.sleep(wait)
                    continue
                else:
                    print(f"    ERROR: HTTP {response.status_code} after {MAX_RETRIES} attempts. "
                          f"Skipping this batch ({num_addresses} addresses).")
                    return []

            # Raise for other HTTP errors (4xx)
            response.raise_for_status()

            # Success — break out of retry loop
            break

        except requests.exceptions.Timeout as e:
            if attempt < MAX_RETRIES:
                wait = RETRY_BASE_WAIT * attempt
                print(f"    Attempt {attempt}/{MAX_RETRIES}: Timeout. Waiting {wait}s before retry...")
                time.sleep(wait)
            else:
                print(f"    ERROR: Timeout after {MAX_RETRIES} attempts. Skipping this batch.")
                return []

        except requests.exceptions.ConnectionError as e:
            if attempt < MAX_RETRIES:
                wait = RETRY_BASE_WAIT * attempt
                print(f"    Attempt {attempt}/{MAX_RETRIES}: Connection error. Waiting {wait}s before retry...")
                time.sleep(wait)
            else:
                print(f"    ERROR: Connection failed after {MAX_RETRIES} attempts. Skipping this batch.")
                return []

        except requests.exceptions.RequestException as e:
            if attempt < MAX_RETRIES:
                wait = RETRY_BASE_WAIT * attempt
                print(f"    Attempt {attempt}/{MAX_RETRIES}: {type(e).__name__}: {e}. "
                      f"Waiting {wait}s before retry...")
                time.sleep(wait)
            else:
                print(f"    ERROR: {type(e).__name__} after {MAX_RETRIES} attempts. Skipping this batch.")
                return []

    # If we got here without a valid response, skip
    if response is None or response.status_code >= 400:
        return []

    # Parse response CSV
    # Columns: ID, Input Address, Match Indicator, Match Type, Matched Address, Lon/Lat, TIGER Line ID, Side
    results = []
    reader = csv.reader(io.StringIO(response.text))
    for row in reader:
        if len(row) < 6:
            continue

        facility_id = row[0].strip().strip('"')
        match_indicator = row[2].strip().strip('"')

        if match_indicator == "Match" and row[5].strip():
            coords = row[5].strip().strip('"')
            if "," in coords:
                lon_str, lat_str = coords.split(",", 1)
                try:
                    longitude = float(lon_str.strip())
                    latitude = float(lat_str.strip())
                    results.append({
                        "facility_id": facility_id,
                        "latitude": latitude,
                        "longitude": longitude,
                        "match_type": row[3].strip().strip('"')
                    })
                except ValueError:
                    pass

    matched = len(results)
    rate = (matched / num_addresses * 100) if num_addresses > 0 else 0
    print(f"    Results: {matched}/{num_addresses} matched ({rate:.1f}%)")
    return results


def geocode_records(records):
    """
    Split records into batches and geocode via Census API.
    Returns list of all successful results.
    """
    all_results = []
    total_batches = (len(records) + BATCH_SIZE - 1) // BATCH_SIZE

    for i in range(0, len(records), BATCH_SIZE):
        batch = records[i:i + BATCH_SIZE]
        batch_num = (i // BATCH_SIZE) + 1
        csv_content = build_census_csv(batch)
        results = call_census_geocoder(csv_content, batch_num, total_batches)
        all_results.extend(results)

        # Pause between batches to reduce load on Census server
        if batch_num < total_batches:
            print(f"    Pausing {BATCH_DELAY}s before next batch...")
            time.sleep(BATCH_DELAY)

    return all_results


# ---------------------------------------------------------------------------
# Step 3: Update Supabase with geocoded coordinates
# ---------------------------------------------------------------------------

def update_supabase(supabase, results):
    """
    Update facilities table with geocoded lat/lon.
    """
    if not results:
        print("  No results to update.")
        return 0

    print(f"  Updating {len(results)} records in Supabase...")
    updated = 0
    errors = 0

    for i in range(0, len(results), SUPABASE_BATCH_SIZE):
        batch = results[i:i + SUPABASE_BATCH_SIZE]
        for rec in batch:
            try:
                supabase.table("facilities").update({
                    "latitude": rec["latitude"],
                    "longitude": rec["longitude"]
                }).eq("facility_id", rec["facility_id"]).execute()
                updated += 1
            except Exception as e:
                errors += 1
                if errors <= 5:
                    print(f"    Error updating {rec['facility_id']}: {e}")
                elif errors == 6:
                    print(f"    (Suppressing further error messages...)")

        total_done = min(i + SUPABASE_BATCH_SIZE, len(results))
        print(f"    Updated {total_done}/{len(results)} records...")

    print(f"  Supabase update complete: {updated} updated, {errors} errors")
    return updated


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    print("=" * 60)
    print("GEOCODE: Facilities Missing Lat/Lon")
    print("Using: US Census Bureau Geocoder (free, no API key)")
    print(f"Retry policy: {MAX_RETRIES} attempts, {RETRY_BASE_WAIT}s base backoff")
    print("=" * 60)

    supabase = get_supabase_client()

    grand_total_fetched = 0
    grand_total_matched = 0
    grand_total_updated = 0
    skipped_batches = 0

    for ftype in FACILITY_TYPES:
        try:
            # Fetch records needing geocoding
            records = fetch_records_needing_geocoding(supabase, ftype)
            if not records:
                print(f"  No {ftype} records need geocoding. Skipping.")
                continue

            grand_total_fetched += len(records)

            # Skip records with no usable address
            usable = [r for r in records if r.get("address_line_1") and r["address_line_1"] != "Unknown"]
            skipped = len(records) - len(usable)
            if skipped > 0:
                print(f"  Skipping {skipped} records with no usable address")

            if not usable:
                print(f"  No usable addresses for {ftype}. Skipping.")
                continue

            # Geocode
            results = geocode_records(usable)
            grand_total_matched += len(results)

            if not results:
                print(f"  WARNING: Census geocoder returned 0 matches for {ftype}.")
                print(f"  The server may be degraded. Try again later.")
                skipped_batches += 1
                continue

            # Update Supabase
            updated = update_supabase(supabase, results)
            grand_total_updated += updated

        except Exception as e:
            print(f"\n  ERROR processing {ftype}: {type(e).__name__}: {e}")
            print(f"  Continuing to next facility type...")
            skipped_batches += 1
            continue

    # ---------------------------------------------------------------------------
    # Summary
    # ---------------------------------------------------------------------------
    print(f"\n{'='*60}")
    print("GEOCODING COMPLETE — SUMMARY")
    print(f"{'='*60}")
    print(f"  Records needing geocoding:  {grand_total_fetched}")
    print(f"  Census matches found:       {grand_total_matched}")
    print(f"  Supabase records updated:   {grand_total_updated}")
    match_rate = (grand_total_matched / grand_total_fetched * 100) if grand_total_fetched > 0 else 0
    print(f"  Overall match rate:         {match_rate:.1f}%")

    if skipped_batches > 0:
        print(f"\n  WARNING: {skipped_batches} facility type(s) had errors or 0 matches.")
        print(f"  The Census geocoder may be degraded. Safe to re-run later —")
        print(f"  the script only processes records still missing coordinates.")

    unmatched = grand_total_fetched - grand_total_matched
    if unmatched > 0:
        print(f"\n  {unmatched} records could not be geocoded in this run.")
        print("  Common reasons: server issues, PO Box addresses, incomplete addresses.")
        print("  These records remain in the database with NULL coordinates.")
        print("  Re-run this script when the Census server is more stable.")

    print(f"\nDone!")


if __name__ == "__main__":
    main()