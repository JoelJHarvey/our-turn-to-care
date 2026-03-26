#!/usr/bin/env python3
"""
Import CMS Home Health Agency data into Supabase facilities table.

Source: https://data.cms.gov/provider-data/dataset/6jpm-sxkc
File:   HH_Provider_Jan2026.csv

Follows the same pattern as import-cms-nursing.py:
  - Reads Supabase credentials from .env.local
  - Transforms each row to unified facilities schema
  - Upserts in batches of 500 (idempotent via source + source_id)
  - Verifies count after import

Usage:
  1. Place this script in the project root (our-turn-to-care/)
  2. Place HH_Provider_Jan2026.csv in the same directory
  3. Run: python3 import-cms-homehealth.py
"""

import csv
import json
import os
import sys

# ─── Read .env.local ────────────────────────────────────────────────────────

def read_env():
    """Read Supabase credentials from .env.local in the same directory."""
    env_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '.env.local')
    env_vars = {}
    try:
        with open(env_path, 'r') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    key, value = line.split('=', 1)
                    env_vars[key.strip()] = value.strip()
    except FileNotFoundError:
        print("ERROR: .env.local not found. Make sure this script is in the project root.")
        sys.exit(1)
    return env_vars

env = read_env()

SUPABASE_URL = env.get('NEXT_PUBLIC_SUPABASE_URL', '')
SUPABASE_KEY = env.get('SUPABASE_SERVICE_ROLE_KEY', '')

if not SUPABASE_URL or not SUPABASE_KEY:
    print("ERROR: Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local")
    sys.exit(1)

# ─── Connect to Supabase ────────────────────────────────────────────────────

from supabase import create_client
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# ─── Helper functions ────────────────────────────────────────────────────────

def safe_int(value):
    """Convert a value to int, returning None if it can't be converted."""
    if value is None:
        return None
    try:
        # Handle commas in numbers like "1,234"
        cleaned = str(value).replace(',', '').strip()
        if cleaned == '' or cleaned == '-':
            return None
        return int(float(cleaned))
    except (ValueError, TypeError):
        return None

def safe_float(value):
    """Convert a value to float, returning None if it can't be converted."""
    if value is None:
        return None
    try:
        cleaned = str(value).replace(',', '').strip()
        if cleaned == '' or cleaned == '-':
            return None
        return float(cleaned)
    except (ValueError, TypeError):
        return None

def clean_phone(phone_str):
    """Clean phone number — keep only digits."""
    if not phone_str:
        return None
    digits = ''.join(c for c in str(phone_str) if c.isdigit())
    if len(digits) == 10:
        return f"({digits[:3]}) {digits[3:6]}-{digits[6:]}"
    elif len(digits) == 11 and digits[0] == '1':
        return f"({digits[1:4]}) {digits[4:7]}-{digits[7:]}"
    return phone_str.strip() if phone_str.strip() else None

def clean_zip(zip_str):
    """Clean zip code — keep first 5 digits."""
    if not zip_str:
        return None
    digits = ''.join(c for c in str(zip_str) if c.isdigit())
    if len(digits) >= 5:
        return digits[:5]
    return zip_str.strip() if zip_str.strip() else None

def map_ownership(cms_ownership):
    """Map CMS ownership type strings to our schema."""
    if not cms_ownership:
        return None
    ownership = cms_ownership.strip().upper()
    mapping = {
        'PROPRIETARY': 'For-Profit',
        'NON-PROFIT': 'Non-Profit',
        'GOVERNMENT OPERATED': 'Government',
        'GOVERNMENT - STATE': 'Government',
        'GOVERNMENT - FEDERAL': 'Government',
        'GOVERNMENT - LOCAL': 'Government',
        'GOVERNMENT - STATE/COUNTY': 'Government',
        'COMBINATION GOVERNMENT & VOLUNTARY NON-PROFIT': 'Non-Profit',
    }
    return mapping.get(ownership, cms_ownership.strip())

# ─── Transform row ───────────────────────────────────────────────────────────

def transform_row(row):
    """
    Transform a CMS Home Health CSV row into the unified facilities schema.

    Maps CMS columns → facilities table columns.
    Stores the entire original row in raw_data as JSONB.
    """
    ccn = row.get('CMS Certification Number (CCN)', '').strip()
    if not ccn:
        return None  # Skip rows without a CCN

    # Build the record for the unified schema
    record = {
        # Identity
        'source': 'cms_home_health',
        'source_id': ccn,                              # CCN is the unique identifier
        'ccn': ccn,
        'npi': None,                                   # Not in this dataset

        # Facility basics
        'facility_name': row.get('Provider Name', '').strip() or None,
        'legal_name': None,                            # Not in this dataset
        'facility_type': 'home_health',                # Enum value
        'ownership_type': map_ownership(row.get('Type of Ownership', '')),
        'bed_count': None,                             # Not applicable for home health
        'license_number': None,
        'license_status': None,
        'is_active': True,                             # All CMS-listed providers assumed active

        # Location
        'address_line_1': row.get('Address', '').strip() or None,
        'address_line_2': None,
        'city': row.get('City/Town', '').strip() or None,
        'county': None,                                # Not in this dataset
        'state': row.get('State', '').strip() or None,
        'zip_code': clean_zip(row.get('ZIP Code', '')),
        'latitude': None,                              # Not in this dataset — needs geocoding
        'longitude': None,                             # Not in this dataset — needs geocoding

        # Contact
        'phone': clean_phone(row.get('Telephone Number', '')),
        'email': None,                                 # Not in this dataset
        'website': None,                               # Not in this dataset

        # Program participation — Home health agencies are CMS-listed,
        # so they participate in Medicare by definition.
        # Medicaid acceptance not explicitly in this dataset.
        'accepts_medicare': True,
        'accepts_medicaid': None,                      # Unknown from this source

        # Quality & ratings
        # CMS provides one star rating: "Quality of patient care star rating"
        # Note: Home health ratings can be half-stars (3.5, 4.5, etc.) but
        # the overall_rating column is smallint, so we round to nearest int.
        # The exact rating is preserved in raw_data JSONB.
        'overall_rating': safe_int(safe_float(row.get('Quality of patient care star rating', ''))),
        'health_inspection_rating': None,              # Not applicable
        'staffing_rating': None,                       # Not applicable
        'quality_measure_rating': None,                # The overall_rating IS the QM rating here
        'last_inspection_date': None,                  # Not in this dataset
        'deficiency_count': None,                      # Not in this dataset
        'penalty_count': None,                         # Not in this dataset

        # Metadata — store the entire original row for future use
        'raw_data': json.dumps(row, default=str),

        # source_updated_at — CMS processing date from filename (Jan 2026)
        'source_updated_at': '2026-01-01',
    }

    return record

# ─── Main import ─────────────────────────────────────────────────────────────

def main():
    csv_file = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'HH_Provider_Jan2026.csv')

    if not os.path.exists(csv_file):
        print(f"ERROR: CSV file not found: {csv_file}")
        print("Make sure HH_Provider_Jan2026.csv is in the same directory as this script.")
        sys.exit(1)

    print(f"Reading {csv_file}...")

    # Read and transform all rows
    records = []
    skipped = 0

    with open(csv_file, 'r', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        for row in reader:
            record = transform_row(row)
            if record:
                records.append(record)
            else:
                skipped += 1

    print(f"Transformed {len(records)} records ({skipped} skipped)")

    # Upsert in batches of 500
    batch_size = 500
    total_batches = (len(records) + batch_size - 1) // batch_size
    success_count = 0
    error_count = 0

    for i in range(0, len(records), batch_size):
        batch = records[i:i + batch_size]
        batch_num = (i // batch_size) + 1

        try:
            result = supabase.table("facilities").upsert(
                batch,
                on_conflict="source,source_id"
            ).execute()
            success_count += len(batch)
            print(f"  Batch {batch_num}/{total_batches}: {len(batch)} records upserted ✓")
        except Exception as e:
            error_count += len(batch)
            print(f"  Batch {batch_num}/{total_batches}: ERROR — {str(e)[:200]}")

    print(f"\n{'='*60}")
    print(f"IMPORT COMPLETE")
    print(f"  Success: {success_count}")
    print(f"  Errors:  {error_count}")
    print(f"  Skipped: {skipped}")
    print(f"{'='*60}")

    # Verify total count in the database
    try:
        count_result = supabase.table("facilities").select("facility_id", count="exact").eq("source", "cms_home_health").execute()
        print(f"\nVerification: {count_result.count} home health records now in database")
    except Exception as e:
        print(f"\nVerification query failed: {e}")

    # Also show total facilities count
    try:
        total_result = supabase.table("facilities").select("facility_id", count="exact").execute()
        print(f"Total facilities in database: {total_result.count}")
    except Exception as e:
        print(f"Total count query failed: {e}")

if __name__ == '__main__':
    main()