#!/usr/bin/env python3
"""
Step 7: Import California CCL + ALW data into Supabase facilities table.

This script:
1. Loads all existing CA records from the facilities table
2. Processes CCL (Community Care Licensing) RCFE data — merges with existing, inserts new
3. Processes ALW (Assisted Living Waiver) data — flags Medi-Cal participants, adds coordinates
4. Reports match/insert/update statistics

Data sources:
- CCL: tmpacjmwy9v.csv (California Dept of Social Services, 12,522 records)
- ALW: ALW_Assisted_Living_Facilities.csv (DHCS, 1,224 records)

Run from project root (our-turn-to-care/):
    caffeinate -i python3 import-california-step7.py

Requirements: supabase-py, requests (already installed from previous steps)
"""

import csv
import os
import re
import json
import sys
from datetime import datetime

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

# File paths — adjust if your files are in a different location
CCL_FILE = "tmpacjmwy9v.csv"
ALW_FILE = "ALW_Assisted_Living_Facilities.csv"

# Batch size for Supabase upserts (keep small to avoid free-tier timeouts)
BATCH_SIZE = 200

# Matching thresholds
# When comparing addresses, we normalize and check for exact match.
# When comparing names, we use a simple similarity ratio.
NAME_MATCH_THRESHOLD = 0.65  # 65% character overlap to consider a name match


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def load_env():
    """Read Supabase credentials from .env.local"""
    env = {}
    env_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '.env.local')
    if not os.path.exists(env_path):
        print(f"ERROR: .env.local not found at {env_path}")
        sys.exit(1)
    with open(env_path, 'r') as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith('#') and '=' in line:
                key, val = line.split('=', 1)
                env[key.strip()] = val.strip()
    return env


def normalize_address(addr):
    """
    Normalize an address for matching:
    - Uppercase
    - Remove punctuation (periods, commas, hashes)
    - Normalize common abbreviations
    - Collapse whitespace
    """
    if not addr:
        return ""
    s = addr.upper().strip()
    # Remove punctuation
    s = re.sub(r'[.,#]', '', s)
    # Normalize common abbreviations
    replacements = {
        ' STREET': ' ST',
        ' AVENUE': ' AVE',
        ' BOULEVARD': ' BLVD',
        ' DRIVE': ' DR',
        ' ROAD': ' RD',
        ' LANE': ' LN',
        ' COURT': ' CT',
        ' PLACE': ' PL',
        ' CIRCLE': ' CIR',
        ' HIGHWAY': ' HWY',
        ' PARKWAY': ' PKWY',
        ' NORTH': ' N',
        ' SOUTH': ' S',
        ' EAST': ' E',
        ' WEST': ' W',
    }
    for old, new in replacements.items():
        s = s.replace(old, new)
    # Collapse whitespace
    s = re.sub(r'\s+', ' ', s).strip()
    return s


def normalize_zip(z):
    """Extract 5-digit zip code."""
    if not z:
        return ""
    z = z.strip()
    # Take first 5 digits
    match = re.match(r'(\d{5})', z)
    return match.group(1) if match else z


def simple_similarity(a, b):
    """
    Simple character-level similarity ratio between two strings.
    Returns a float between 0 and 1.
    Uses longest common subsequence length / max length.
    For speed, we just use set intersection of character bigrams.
    """
    if not a or not b:
        return 0.0
    a = a.upper().strip()
    b = b.upper().strip()
    if a == b:
        return 1.0
    # Bigram similarity (Dice coefficient)
    def bigrams(s):
        return set(s[i:i+2] for i in range(len(s)-1))
    ba = bigrams(a)
    bb = bigrams(b)
    if not ba or not bb:
        return 0.0
    overlap = len(ba & bb)
    return (2.0 * overlap) / (len(ba) + len(bb))


def clean_phone(phone):
    """Normalize phone number to digits only, then format."""
    if not phone:
        return None
    digits = re.sub(r'\D', '', phone)
    if len(digits) == 10:
        return f"({digits[:3]}) {digits[3:6]}-{digits[6:]}"
    elif len(digits) == 11 and digits[0] == '1':
        return f"({digits[1:4]}) {digits[4:7]}-{digits[7:]}"
    return phone.strip() if phone.strip() else None


def safe_int(val):
    """Convert to int safely, return None if not possible."""
    if val is None or val == '':
        return None
    try:
        return int(val)
    except (ValueError, TypeError):
        return None


def parse_date(date_str):
    """Parse date from CCL format (M/D/YYYY) to ISO format."""
    if not date_str or not date_str.strip():
        return None
    try:
        dt = datetime.strptime(date_str.strip(), '%m/%d/%Y')
        return dt.strftime('%Y-%m-%d')
    except ValueError:
        try:
            dt = datetime.strptime(date_str.strip(), '%m/%d/%y')
            return dt.strftime('%Y-%m-%d')
        except ValueError:
            return None


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    print("=" * 70)
    print("Step 7: California CCL + ALW Data Import")
    print("=" * 70)
    print()

    # Load Supabase credentials
    env = load_env()
    url = env.get('NEXT_PUBLIC_SUPABASE_URL')
    key = env.get('SUPABASE_SERVICE_ROLE_KEY')
    if not url or not key:
        print("ERROR: Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local")
        sys.exit(1)

    from supabase import create_client
    supabase = create_client(url, key)
    print(f"Connected to Supabase: {url}")
    print()

    # ------------------------------------------------------------------
    # PHASE 1: Load existing CA records from Supabase
    # ------------------------------------------------------------------
    print("-" * 70)
    print("PHASE 1: Loading existing California facilities from Supabase...")
    print("-" * 70)

    existing_ca = []
    # Query by state to avoid timeouts on large table
    # Supabase free tier may timeout on large result sets, so paginate
    page_size = 1000
    offset = 0
    while True:
        result = supabase.table('facilities').select(
            'facility_id, source, source_id, facility_name, address_line_1, city, state, zip_code, '
            'facility_type, latitude, longitude, is_active, license_number, accepts_medicaid'
        ).eq('state', 'CA').range(offset, offset + page_size - 1).execute()

        batch = result.data
        if not batch:
            break
        existing_ca.extend(batch)
        offset += page_size
        if len(batch) < page_size:
            break

    print(f"  Loaded {len(existing_ca)} existing CA records from Supabase")

    # Build lookup indexes for matching
    # Index 1: zip + normalized address -> list of records
    zip_addr_index = {}
    # Index 2: city + normalized name -> list of records
    city_name_index = {}

    for rec in existing_ca:
        z = normalize_zip(rec.get('zip_code', ''))
        a = normalize_address(rec.get('address_line_1', ''))
        if z and a:
            key_za = f"{z}|{a}"
            if key_za not in zip_addr_index:
                zip_addr_index[key_za] = []
            zip_addr_index[key_za].append(rec)

        city = (rec.get('city') or '').upper().strip()
        name = (rec.get('facility_name') or '').upper().strip()
        if city and name:
            key_cn = f"{city}|{name}"
            if key_cn not in city_name_index:
                city_name_index[key_cn] = []
            city_name_index[key_cn].append(rec)

    print(f"  Built zip+address index: {len(zip_addr_index)} unique entries")
    print(f"  Built city+name index: {len(city_name_index)} unique entries")
    print()

    # ------------------------------------------------------------------
    # PHASE 2: Process CCL data
    # ------------------------------------------------------------------
    print("-" * 70)
    print("PHASE 2: Processing CCL RCFE data...")
    print("-" * 70)

    # Read CCL CSV
    ccl_records = []
    with open(CCL_FILE, 'r', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        for row in reader:
            ccl_records.append(row)
    print(f"  Read {len(ccl_records)} CCL records from {CCL_FILE}")

    # Separate by status
    ccl_active = [r for r in ccl_records if r['facility_status'] in ('LICENSED', 'PENDING', 'ON PROBATION')]
    ccl_closed = [r for r in ccl_records if r['facility_status'] == 'CLOSED']
    print(f"  Active (Licensed/Pending/On Probation): {len(ccl_active)}")
    print(f"  Closed: {len(ccl_closed)}")
    print()

    def find_match(address, zip_code, name, city):
        """Try to find a matching existing record."""
        z = normalize_zip(zip_code)
        a = normalize_address(address)

        # Strategy 1: Exact zip + address match
        if z and a:
            key_za = f"{z}|{a}"
            if key_za in zip_addr_index:
                return zip_addr_index[key_za][0]  # Return first match

        # Strategy 2: Same city + fuzzy name match
        c = city.upper().strip() if city else ''
        n = name.upper().strip() if name else ''
        if c and n:
            # Check all records in the same city
            best_match = None
            best_score = 0
            for key_cn, recs in city_name_index.items():
                if key_cn.startswith(c + '|'):
                    existing_name = key_cn.split('|', 1)[1]
                    score = simple_similarity(n, existing_name)
                    if score > best_score:
                        best_score = score
                        best_match = recs[0]

            if best_match and best_score >= NAME_MATCH_THRESHOLD:
                # Double-check zip code matches (within reason)
                match_zip = normalize_zip(best_match.get('zip_code', ''))
                if not z or not match_zip or z == match_zip:
                    return best_match

        return None

    # Process active CCL records
    ccl_updates = []      # Records to UPDATE (matched existing)
    ccl_inserts = []      # Records to INSERT (new facilities)
    ccl_matched_ids = set()  # Track which existing records we've matched

    print("  Matching active CCL records against existing database...")
    for i, row in enumerate(ccl_active):
        match = find_match(
            row['facility_address'],
            row['facility_zip'],
            row['facility_name'],
            row['facility_city']
        )

        if match:
            # Build update payload
            fid = match['facility_id']
            if fid not in ccl_matched_ids:
                ccl_matched_ids.add(fid)
                update = {
                    'facility_id': fid,
                    'license_number': row['facility_number'].strip(),
                    'license_status': row['facility_status'],
                    'is_active': True,
                }
                # Only update bed_count if CCL has a value and it's larger
                # (CCL capacity = licensed capacity, may be more authoritative)
                cap = safe_int(row['facility_capacity'])
                if cap and cap > 0:
                    update['bed_count'] = cap
                # Add legal_name from licensee if available
                licensee = row.get('licensee', '').strip()
                if licensee:
                    update['legal_name'] = licensee
                # Add phone if existing doesn't have one or CCL is more complete
                phone = clean_phone(row.get('facility_telephone_number', ''))
                if phone:
                    update['phone'] = phone
                # Store all CCL data in raw_data for reference
                update['raw_data'] = json.dumps({
                    'ca_ccl': {
                        'facility_type': row['facility_type'],
                        'facility_number': row['facility_number'].strip(),
                        'facility_name': row['facility_name'].strip(),
                        'licensee': row.get('licensee', '').strip(),
                        'administrator': row.get('facility_administrator', '').strip(),
                        'capacity': row.get('facility_capacity', '').strip(),
                        'status': row['facility_status'],
                        'license_first_date': row.get('license_first_date', '').strip(),
                        'closed_date': row.get('closed_date', '').strip(),
                        'file_date': row.get('file_date', '').strip(),
                        'regional_office': row.get('regional_office', '').strip(),
                    }
                })
                ccl_updates.append(update)
        else:
            # New facility — prepare INSERT
            cap = safe_int(row['facility_capacity'])
            phone = clean_phone(row.get('facility_telephone_number', ''))
            licensee = row.get('licensee', '').strip()

            record = {
                'source': 'ca_ccl',
                'source_id': row['facility_number'].strip(),
                'facility_name': row['facility_name'].strip(),
                'legal_name': licensee if licensee else None,
                'facility_type': 'assisted_living',
                'address_line_1': row['facility_address'].strip() or 'Unknown',
                'city': row['facility_city'].strip() or 'Unknown',
                'state': 'CA',
                'zip_code': normalize_zip(row['facility_zip']) or '00000',
                'county': row.get('county_name', '').strip() or None,
                'phone': phone,
                'bed_count': cap,
                'license_number': row['facility_number'].strip(),
                'license_status': row['facility_status'],
                'is_active': True,
                'raw_data': json.dumps({
                    'ca_ccl': {
                        'facility_type': row['facility_type'],
                        'facility_number': row['facility_number'].strip(),
                        'facility_name': row['facility_name'].strip(),
                        'licensee': licensee,
                        'administrator': row.get('facility_administrator', '').strip(),
                        'capacity': row.get('facility_capacity', '').strip(),
                        'status': row['facility_status'],
                        'license_first_date': row.get('license_first_date', '').strip(),
                        'closed_date': row.get('closed_date', '').strip(),
                        'file_date': row.get('file_date', '').strip(),
                        'regional_office': row.get('regional_office', '').strip(),
                    }
                }),
            }
            ccl_inserts.append(record)

        if (i + 1) % 2000 == 0:
            print(f"    Processed {i + 1}/{len(ccl_active)} active records...")

    print(f"  Active CCL results:")
    print(f"    Matched existing records (will UPDATE): {len(ccl_updates)}")
    print(f"    New facilities (will INSERT): {len(ccl_inserts)}")
    print()

    # Process CLOSED CCL records — only to mark existing matches as inactive
    ccl_closures = []
    print("  Matching closed CCL records to mark existing as inactive...")
    for row in ccl_closed:
        match = find_match(
            row['facility_address'],
            row['facility_zip'],
            row['facility_name'],
            row['facility_city']
        )
        if match:
            fid = match['facility_id']
            if fid not in ccl_matched_ids:
                ccl_matched_ids.add(fid)
                ccl_closures.append({
                    'facility_id': fid,
                    'is_active': False,
                    'license_status': 'CLOSED',
                    'license_number': row['facility_number'].strip(),
                    'raw_data': json.dumps({
                        'ca_ccl': {
                            'facility_type': row['facility_type'],
                            'facility_number': row['facility_number'].strip(),
                            'facility_name': row['facility_name'].strip(),
                            'status': 'CLOSED',
                            'license_first_date': row.get('license_first_date', '').strip(),
                            'closed_date': row.get('closed_date', '').strip(),
                            'file_date': row.get('file_date', '').strip(),
                        }
                    }),
                })

    print(f"  Closed CCL records matched to existing (will mark inactive): {len(ccl_closures)}")
    print()

    # ------------------------------------------------------------------
    # PHASE 2b: Execute CCL updates, inserts, and closures
    # ------------------------------------------------------------------
    print("  Executing CCL updates...")
    update_count = 0
    for i in range(0, len(ccl_updates), BATCH_SIZE):
        batch = ccl_updates[i:i+BATCH_SIZE]
        for rec in batch:
            fid = rec.pop('facility_id')
            try:
                supabase.table('facilities').update(rec).eq('facility_id', fid).execute()
                update_count += 1
            except Exception as e:
                print(f"    WARNING: Update failed for {fid}: {e}")
        print(f"    Updated {min(i + BATCH_SIZE, len(ccl_updates))}/{len(ccl_updates)}")
    print(f"  CCL updates complete: {update_count} records enriched")
    print()

    print("  Executing CCL inserts...")
    insert_count = 0
    # Deduplicate inserts by source_id
    seen_source_ids = set()
    deduped_inserts = []
    for rec in ccl_inserts:
        sid = rec['source_id']
        if sid not in seen_source_ids:
            seen_source_ids.add(sid)
            deduped_inserts.append(rec)
    if len(deduped_inserts) < len(ccl_inserts):
        print(f"    Deduplicated: {len(ccl_inserts)} -> {len(deduped_inserts)} (removed {len(ccl_inserts) - len(deduped_inserts)} duplicate source_ids)")

    for i in range(0, len(deduped_inserts), BATCH_SIZE):
        batch = deduped_inserts[i:i+BATCH_SIZE]
        try:
            supabase.table('facilities').upsert(batch, on_conflict='source,source_id').execute()
            insert_count += len(batch)
        except Exception as e:
            print(f"    WARNING: Insert batch failed at offset {i}: {e}")
            # Try one at a time
            for rec in batch:
                try:
                    supabase.table('facilities').upsert([rec], on_conflict='source,source_id').execute()
                    insert_count += 1
                except Exception as e2:
                    print(f"      SKIP: {rec.get('facility_name', '?')}: {e2}")
        print(f"    Inserted {min(i + BATCH_SIZE, len(deduped_inserts))}/{len(deduped_inserts)}")
    print(f"  CCL inserts complete: {insert_count} new records added")
    print()

    print("  Executing CCL closures...")
    closure_count = 0
    for rec in ccl_closures:
        fid = rec.pop('facility_id')
        try:
            supabase.table('facilities').update(rec).eq('facility_id', fid).execute()
            closure_count += 1
        except Exception as e:
            print(f"    WARNING: Closure update failed for {fid}: {e}")
    print(f"  CCL closures complete: {closure_count} records marked inactive")
    print()

    # ------------------------------------------------------------------
    # PHASE 3: Process ALW data
    # ------------------------------------------------------------------
    print("-" * 70)
    print("PHASE 3: Processing ALW (Assisted Living Waiver) data...")
    print("-" * 70)

    # Reload CA records from Supabase to include newly inserted CCL records
    print("  Reloading CA records from Supabase (includes new CCL inserts)...")
    existing_ca_2 = []
    offset = 0
    while True:
        result = supabase.table('facilities').select(
            'facility_id, source, source_id, facility_name, address_line_1, city, state, zip_code, '
            'facility_type, latitude, longitude, is_active, license_number, accepts_medicaid'
        ).eq('state', 'CA').range(offset, offset + page_size - 1).execute()
        batch = result.data
        if not batch:
            break
        existing_ca_2.extend(batch)
        offset += page_size
        if len(batch) < page_size:
            break
    print(f"  Loaded {len(existing_ca_2)} CA records (post-CCL import)")

    # Rebuild indexes
    zip_addr_index_2 = {}
    city_name_index_2 = {}
    for rec in existing_ca_2:
        z = normalize_zip(rec.get('zip_code', ''))
        a = normalize_address(rec.get('address_line_1', ''))
        if z and a:
            key_za = f"{z}|{a}"
            if key_za not in zip_addr_index_2:
                zip_addr_index_2[key_za] = []
            zip_addr_index_2[key_za].append(rec)

        city = (rec.get('city') or '').upper().strip()
        name = (rec.get('facility_name') or '').upper().strip()
        if city and name:
            key_cn = f"{city}|{name}"
            if key_cn not in city_name_index_2:
                city_name_index_2[key_cn] = []
            city_name_index_2[key_cn].append(rec)

    # Read ALW CSV
    alw_records = []
    with open(ALW_FILE, 'r', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        for row in reader:
            alw_records.append(row)
    print(f"  Read {len(alw_records)} ALW records from {ALW_FILE}")
    print()

    def find_match_v2(address, zip_code, name, city):
        """Same as find_match but uses updated indexes."""
        z = normalize_zip(zip_code)
        a = normalize_address(address)

        if z and a:
            key_za = f"{z}|{a}"
            if key_za in zip_addr_index_2:
                return zip_addr_index_2[key_za][0]

        c = city.upper().strip() if city else ''
        n = name.upper().strip() if name else ''
        if c and n:
            best_match = None
            best_score = 0
            for key_cn, recs in city_name_index_2.items():
                if key_cn.startswith(c + '|'):
                    existing_name = key_cn.split('|', 1)[1]
                    score = simple_similarity(n, existing_name)
                    if score > best_score:
                        best_score = score
                        best_match = recs[0]

            if best_match and best_score >= NAME_MATCH_THRESHOLD:
                match_zip = normalize_zip(best_match.get('zip_code', ''))
                if not z or not match_zip or z == match_zip:
                    return best_match

        return None

    alw_updates = []
    alw_inserts = []
    alw_matched_ids = set()

    print("  Matching ALW records against database...")
    for row in alw_records:
        # Try matching by business name first, then legal name
        biz_name = row.get('Business_Name', '').strip()
        legal_name = row.get('Legal_Name', '').strip()
        address = row.get('Address', '').strip()
        city = row.get('City', '').strip()
        zip_code = row.get('Zip_Code', '').strip()

        match = find_match_v2(address, zip_code, biz_name, city)
        if not match and legal_name != biz_name:
            match = find_match_v2(address, zip_code, legal_name, city)

        lat = None
        lon = None
        try:
            lat = float(row.get('Latitude', ''))
            lon = float(row.get('Longitude', ''))
        except (ValueError, TypeError):
            pass

        if match:
            fid = match['facility_id']
            if fid not in alw_matched_ids:
                alw_matched_ids.add(fid)
                update = {
                    'facility_id': fid,
                    'accepts_medicaid': True,
                }
                # Add coordinates if existing record is missing them
                if lat and lon and (not match.get('latitude') or not match.get('longitude')):
                    update['latitude'] = lat
                    update['longitude'] = lon
                alw_updates.append(update)
        else:
            # New facility from ALW
            cap = safe_int(row.get('Capacity_Per_PEU', ''))
            phone = clean_phone(row.get('Phone_Number', ''))

            record = {
                'source': 'ca_alw',
                'source_id': row.get('Number', '').strip(),
                'facility_name': biz_name if biz_name else legal_name,
                'legal_name': legal_name if legal_name else None,
                'facility_type': 'assisted_living',
                'address_line_1': address or 'Unknown',
                'city': city or 'Unknown',
                'state': 'CA',
                'zip_code': normalize_zip(zip_code) or '00000',
                'county': row.get('County', '').strip() or None,
                'phone': phone,
                'bed_count': cap,
                'latitude': lat,
                'longitude': lon,
                'accepts_medicaid': True,
                'is_active': True,
                'raw_data': json.dumps({
                    'ca_alw': {
                        'provider_number': row.get('Number', '').strip(),
                        'legal_name': legal_name,
                        'business_name': biz_name,
                        'capacity_per_peu': row.get('Capacity_Per_PEU', '').strip(),
                    }
                }),
            }
            alw_inserts.append(record)

    print(f"  ALW results:")
    print(f"    Matched existing records (will flag Medi-Cal): {len(alw_updates)}")
    print(f"    New facilities (will INSERT): {len(alw_inserts)}")
    print()

    # Execute ALW updates
    print("  Executing ALW Medi-Cal flag updates...")
    alw_update_count = 0
    for rec in alw_updates:
        fid = rec.pop('facility_id')
        try:
            supabase.table('facilities').update(rec).eq('facility_id', fid).execute()
            alw_update_count += 1
        except Exception as e:
            print(f"    WARNING: ALW update failed for {fid}: {e}")
    print(f"  ALW updates complete: {alw_update_count} records flagged accepts_medicaid=TRUE")
    print()

    # Execute ALW inserts
    print("  Executing ALW inserts...")
    alw_insert_count = 0
    # Deduplicate
    seen_alw_ids = set()
    deduped_alw = []
    for rec in alw_inserts:
        sid = rec['source_id']
        if sid not in seen_alw_ids:
            seen_alw_ids.add(sid)
            deduped_alw.append(rec)
    if len(deduped_alw) < len(alw_inserts):
        print(f"    Deduplicated: {len(alw_inserts)} -> {len(deduped_alw)}")

    for i in range(0, len(deduped_alw), BATCH_SIZE):
        batch = deduped_alw[i:i+BATCH_SIZE]
        try:
            supabase.table('facilities').upsert(batch, on_conflict='source,source_id').execute()
            alw_insert_count += len(batch)
        except Exception as e:
            print(f"    WARNING: ALW insert batch failed: {e}")
            for rec in batch:
                try:
                    supabase.table('facilities').upsert([rec], on_conflict='source,source_id').execute()
                    alw_insert_count += 1
                except Exception as e2:
                    print(f"      SKIP: {rec.get('facility_name', '?')}: {e2}")
        print(f"    Inserted {min(i + BATCH_SIZE, len(deduped_alw))}/{len(deduped_alw)}")
    print(f"  ALW inserts complete: {alw_insert_count} new records added")
    print()

    # ------------------------------------------------------------------
    # PHASE 4: Summary
    # ------------------------------------------------------------------
    print("=" * 70)
    print("STEP 7 COMPLETE — SUMMARY")
    print("=" * 70)
    print()
    print("CCL (Community Care Licensing) RCFE Data:")
    print(f"  Source records: {len(ccl_records)} ({len(ccl_active)} active, {len(ccl_closed)} closed)")
    print(f"  Matched & enriched existing records: {update_count}")
    print(f"  New facilities inserted: {insert_count}")
    print(f"  Existing records marked inactive (closed): {closure_count}")
    print()
    print("ALW (Assisted Living Waiver) Data:")
    print(f"  Source records: {len(alw_records)}")
    print(f"  Matched & flagged Medi-Cal: {alw_update_count}")
    print(f"  New facilities inserted: {alw_insert_count}")
    print()

    # Count new records without coordinates (will need geocoding)
    no_coords = 0
    for rec in deduped_inserts:
        if not rec.get('latitude') or not rec.get('longitude'):
            no_coords += 1
    print(f"NOTE: {no_coords} new CCL records have no lat/lon coordinates.")
    print("  These can be geocoded using the Census Geocoder (same as Step 5).")
    print("  Run: python3 geocode-facilities.py  (it will find records missing coordinates)")
    print()

    # Final count
    count_result = supabase.table('facilities').select('facility_id', count='exact').execute()
    total = count_result.count if hasattr(count_result, 'count') and count_result.count else '?'
    ca_result = supabase.table('facilities').select('facility_id', count='exact').eq('state', 'CA').execute()
    ca_total = ca_result.count if hasattr(ca_result, 'count') and ca_result.count else '?'
    print(f"Total facilities in database: {total}")
    print(f"California facilities: {ca_total}")
    print()


if __name__ == '__main__':
    main()