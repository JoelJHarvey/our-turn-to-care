"""
Import GitHub Assisted Living Facilities dataset into Supabase.
Step 4 of OurTurnToCare Facility Database build.

Source: https://github.com/antonstengel/assisted-living-data
File: assisted-living-facilities.csv
Records: ~44,638 across all 50 states + DC

v2 fixes:
  - Deduplicates rows within batches (handles duplicate source_ids)
  - Extracts city/zip from Address field when City or Zip Code columns are empty
  - Uses "Unknown" fallback for required NOT NULL fields (zip_code, city, address_line_1)

Usage:
  1. Place this script in the project root (our-turn-to-care/)
  2. Place assisted-living-facilities.csv in the same directory
  3. Run: python3 import-assisted-living.py

Safe to re-run — uses upsert (ON CONFLICT source, source_id).
"""

import csv
import hashlib
import json
import os
import re
import sys
from pathlib import Path

# ---------------------------------------------------------------------------
# 1. Read Supabase credentials from .env.local
# ---------------------------------------------------------------------------

env_path = Path(__file__).parent / ".env.local"
env_vars = {}

if not env_path.exists():
    print(f"ERROR: {env_path} not found. Make sure this script is in the project root.")
    sys.exit(1)

with open(env_path) as f:
    for line in f:
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            key, value = line.split("=", 1)
            env_vars[key.strip()] = value.strip()

SUPABASE_URL = env_vars.get("NEXT_PUBLIC_SUPABASE_URL", "")
SUPABASE_KEY = env_vars.get("SUPABASE_SERVICE_ROLE_KEY", "")

if not SUPABASE_URL or not SUPABASE_KEY:
    print("ERROR: Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local")
    sys.exit(1)

print(f"Supabase URL: {SUPABASE_URL}")
print(f"Service role key: {SUPABASE_KEY[:12]}...{SUPABASE_KEY[-4:]}")

# ---------------------------------------------------------------------------
# 2. Connect to Supabase
# ---------------------------------------------------------------------------

from supabase import create_client

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
print("Connected to Supabase.\n")

# ---------------------------------------------------------------------------
# 3. Helper functions
# ---------------------------------------------------------------------------

# US state abbreviations for address parsing
US_STATES = {
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL",
    "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME",
    "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH",
    "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI",
    "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
}


def clean(value):
    """Strip whitespace, return None for empty strings."""
    if value is None:
        return None
    value = str(value).strip()
    return value if value else None


def clean_float(value):
    """Parse a float, return None if invalid."""
    value = clean(value)
    if value is None:
        return None
    try:
        return float(value)
    except (ValueError, TypeError):
        return None


def clean_int(value):
    """Parse an int (from possibly float-formatted string like '144.0')."""
    f = clean_float(value)
    if f is None:
        return None
    return int(round(f))


def clean_zip(value):
    """Ensure zip codes are zero-padded to 5 digits."""
    value = clean(value)
    if value is None:
        return None
    # Remove anything after a decimal (some zips stored as '3431.0')
    if "." in value:
        value = value.split(".")[0]
    # Remove non-numeric characters except hyphen (for ZIP+4)
    value = re.sub(r"[^\d\-]", "", value)
    # Zero-pad to 5 digits if needed
    if value and len(value) < 5 and "-" not in value:
        value = value.zfill(5)
    return value if value else None


def clean_phone(value):
    """Normalize phone number format."""
    value = clean(value)
    if value is None:
        return None
    # Remove all non-digit characters
    digits = re.sub(r"\D", "", value)
    if len(digits) == 10:
        return f"({digits[:3]}) {digits[3:6]}-{digits[6:]}"
    elif len(digits) == 11 and digits[0] == "1":
        return f"({digits[1:4]}) {digits[4:7]}-{digits[7:]}"
    return value  # Return original if format unclear


def extract_zip_from_address(address):
    """Try to extract a 5-digit zip (or ZIP+4) from the end of an address string."""
    if not address:
        return None
    # Match 5-digit zip or ZIP+4 at end of string
    match = re.search(r"\b(\d{5}(?:-\d{4})?)\s*$", address)
    if match:
        return match.group(1)
    # Also try mid-string (e.g., "5217 W GOWAN ROAD LAS VEGAS NV 89130-3118")
    match = re.search(r"\b(\d{5}(?:-\d{4})?)\b", address)
    if match:
        # Only return if it looks like a zip (not a street number)
        # Zips are usually after a state abbreviation
        before = address[:match.start()].strip()
        for st in US_STATES:
            if before.endswith(st) or before.endswith(st + ","):
                return match.group(1)
    return None


def extract_city_from_address(address, state_abbr):
    """Try to extract city name from address field when City column is empty."""
    if not address or not state_abbr:
        return None
    # Pattern: "... CITY_NAME ST ZIPCODE" or "... CITY_NAME, ST ZIPCODE"
    # e.g., "5217 W GOWAN ROAD LAS VEGAS NV 89130-3118"
    pattern = r"(.+?)\s+" + re.escape(state_abbr) + r"\s+\d{5}"
    match = re.search(pattern, address, re.IGNORECASE)
    if match:
        # The city is the last part of the preceding text
        preceding = match.group(1).strip().rstrip(",")
        # Try to get just the city (last 1-3 words after the street address)
        # Split and take words that look like city names (after a number-free segment)
        parts = preceding.split()
        # Walk backwards to find where the street address ends and city begins
        # Heuristic: city names don't usually start with numbers
        city_parts = []
        for part in reversed(parts):
            if re.match(r"^\d", part) or part in ("DR", "ST", "AVE", "BLVD", "RD", "LN", "WAY", "CT", "PL", "DRIVE", "STREET", "AVENUE", "ROAD", "LANE", "PLACE", "CIRCLE", "PARKWAY", "PKWY"):
                break
            city_parts.insert(0, part)
            if len(city_parts) >= 3:
                break
        if city_parts:
            city = " ".join(city_parts).strip(",").strip()
            # Title case it
            return city.title() if city else None
    return None


def generate_source_id(row):
    """
    Generate a deterministic source_id for records without a Facility ID.
    Uses a hash of name + address + state to ensure consistency across re-runs.
    """
    facility_id = clean(row.get("Facility ID"))
    if facility_id:
        return facility_id

    # Fallback: deterministic hash from name + address + state
    name = (row.get("Facility Name") or "").strip().upper()
    address = (row.get("Address") or "").strip().upper()
    state = (row.get("State") or "").strip().upper()
    key = f"{name}|{address}|{state}"
    return "GEN-" + hashlib.md5(key.encode()).hexdigest()[:16]


def deduplicate_batch(batch):
    """Remove duplicate source_ids within a batch, keeping the last occurrence."""
    seen = {}
    for record in batch:
        key = record["source_id"]
        seen[key] = record  # Last one wins
    return list(seen.values())


# ---------------------------------------------------------------------------
# 4. Transform row from CSV format to Supabase schema
# ---------------------------------------------------------------------------

def transform_row(row):
    """Map a CSV row to the unified facilities table schema."""

    lat = clean_float(row.get("Latitude"))
    lon = clean_float(row.get("Longitude"))

    # Build the raw_data JSONB with ALL original fields (nothing lost)
    raw_data = {k: clean(v) for k, v in row.items() if clean(v) is not None}

    # --- Get base values ---
    address = clean(row.get("Address"))
    city = clean(row.get("City"))
    state = clean(row.get("State"))
    zip_code = clean_zip(row.get("Zip Code"))

    # --- Fix: Try to extract missing zip from Address field ---
    if not zip_code and address:
        extracted_zip = extract_zip_from_address(address)
        if extracted_zip:
            zip_code = clean_zip(extracted_zip)

    # --- Fix: Try to extract missing city from Address field ---
    if not city and address and state:
        extracted_city = extract_city_from_address(address, state)
        if extracted_city:
            city = extracted_city

    # --- Fix: Clean up address (remove embedded city/state/zip if we extracted them) ---
    clean_address = address
    if clean_address and state:
        # Remove trailing "CITY, ST ZIPCODE" pattern that belongs in city/zip fields
        clean_address = re.sub(
            r"\s+" + re.escape(state) + r"\s+\d{5}(-\d{4})?\s*$",
            "",
            clean_address,
            flags=re.IGNORECASE,
        )
        # If the cleaned address is significantly shorter, use it
        # But only if we successfully extracted the city
        if city and len(clean_address) < len(address) - 5:
            # Also try to trim the city name from the end of the address
            city_pattern = r"\s+" + re.escape(city) + r"\s*,?\s*$"
            clean_address = re.sub(city_pattern, "", clean_address, flags=re.IGNORECASE)

    # --- Fallbacks for NOT NULL columns ---
    if not clean_address:
        clean_address = "Unknown"
    if not city:
        city = "Unknown"
    if not zip_code:
        zip_code = "00000"

    record = {
        # Identity
        "source": "github_assisted_living",
        "source_id": generate_source_id(row),
        "ccn": None,
        "npi": None,

        # Facility basics
        "facility_name": clean(row.get("Facility Name")),
        "legal_name": clean(row.get("Licensee")),
        "facility_type": "assisted_living",
        "ownership_type": clean(row.get("Ownership Type")),
        "bed_count": clean_int(row.get("Capacity")),
        "license_number": clean(row.get("License Number")),
        "license_status": None,
        "is_active": True,

        # Location
        "address_line_1": clean_address,
        "address_line_2": None,
        "city": city,
        "county": clean(row.get("County")),
        "state": state,
        "zip_code": zip_code,
        "latitude": lat,
        "longitude": lon,

        # Contact
        "phone": clean_phone(row.get("Phone Number")),
        "email": clean(row.get("Email Address")),
        "website": None,  # Not in this dataset

        # Program participation (not available in this dataset)
        "accepts_medicare": None,
        "accepts_medicaid": None,

        # Quality & ratings (not available — will be enriched in Steps 7-10)
        "overall_rating": None,
        "health_inspection_rating": None,
        "staffing_rating": None,
        "quality_measure_rating": None,
        "last_inspection_date": None,
        "deficiency_count": None,
        "penalty_count": None,

        # Metadata
        "raw_data": raw_data,
        "source_updated_at": None,
    }

    return record


# ---------------------------------------------------------------------------
# 5. Read CSV and import in batches
# ---------------------------------------------------------------------------

CSV_FILE = Path(__file__).parent / "assisted-living-facilities.csv"

if not CSV_FILE.exists():
    print(f"ERROR: {CSV_FILE} not found.")
    print("Place assisted-living-facilities.csv in the same directory as this script.")
    sys.exit(1)

print(f"Reading {CSV_FILE}...")

BATCH_SIZE = 500
batch = []
total_processed = 0
total_errors = 0
total_skipped_noname = 0
total_deduped = 0

with open(CSV_FILE, encoding="utf-8-sig") as f:
    reader = csv.DictReader(f)

    for row in reader:
        try:
            record = transform_row(row)

            # Skip rows with no name (unusable)
            if not record["facility_name"]:
                total_skipped_noname += 1
                continue

            batch.append(record)

            if len(batch) >= BATCH_SIZE:
                # Deduplicate within batch to prevent "cannot affect row a second time"
                original_len = len(batch)
                batch = deduplicate_batch(batch)
                deduped_this_batch = original_len - len(batch)
                total_deduped += deduped_this_batch

                try:
                    supabase.table("facilities").upsert(
                        batch, on_conflict="source,source_id"
                    ).execute()
                    total_processed += len(batch)
                    print(f"  Imported {total_processed} records...")
                except Exception as e:
                    print(f"  ERROR on batch at record {total_processed}: {e}")
                    # Try smaller batches on error
                    for mini_start in range(0, len(batch), 100):
                        mini_batch = batch[mini_start : mini_start + 100]
                        try:
                            supabase.table("facilities").upsert(
                                mini_batch, on_conflict="source,source_id"
                            ).execute()
                            total_processed += len(mini_batch)
                            print(f"    Sub-batch OK: {total_processed} records...")
                        except Exception as e2:
                            total_errors += len(mini_batch)
                            print(f"    Sub-batch ERROR: {e2}")
                batch = []

        except Exception as e:
            total_errors += 1
            name = row.get("Facility Name", "UNKNOWN")
            print(f"  Transform error for '{name}': {e}")

    # Final batch
    if batch:
        batch = deduplicate_batch(batch)
        try:
            supabase.table("facilities").upsert(
                batch, on_conflict="source,source_id"
            ).execute()
            total_processed += len(batch)
        except Exception as e:
            print(f"  ERROR on final batch: {e}")
            for mini_start in range(0, len(batch), 100):
                mini_batch = batch[mini_start : mini_start + 100]
                try:
                    supabase.table("facilities").upsert(
                        mini_batch, on_conflict="source,source_id"
                    ).execute()
                    total_processed += len(mini_batch)
                except Exception as e2:
                    total_errors += len(mini_batch)
                    print(f"    Sub-batch ERROR: {e2}")

# ---------------------------------------------------------------------------
# 6. Verify
# ---------------------------------------------------------------------------

print(f"\n{'='*60}")
print(f"IMPORT COMPLETE")
print(f"  Records processed: {total_processed}")
print(f"  Duplicates removed: {total_deduped}")
print(f"  Skipped (no name): {total_skipped_noname}")
print(f"  Errors:            {total_errors}")
print(f"{'='*60}")

# Count by source in database
try:
    result = supabase.table("facilities").select(
        "source", count="exact"
    ).eq("source", "github_assisted_living").execute()
    print(f"\n  Assisted living records in database: {result.count}")
except Exception as e:
    print(f"\n  Could not verify count: {e}")

# Total count
try:
    result = supabase.table("facilities").select(
        "facility_id", count="exact"
    ).execute()
    print(f"  TOTAL records in database: {result.count}")
except Exception as e:
    print(f"  Could not get total count: {e}")

print("\nDone! Verify in Supabase Table Editor:")
print(f"  {SUPABASE_URL.replace('.supabase.co', '')}/project/default/editor")
print("  Filter by source = 'github_assisted_living'")
