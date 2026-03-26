#!/usr/bin/env python3
"""
Import CMS Hospice Provider data into Supabase facilities table.

Source: https://data.cms.gov/provider-data/dataset/yc9t-dgbk
File:   Hospice_General-Information_Feb2026.csv

Follows the same pattern as import-cms-nursing.py and import-cms-homehealth.py:
  - Reads Supabase credentials from .env.local
  - Transforms each row to unified facilities schema
  - Upserts in batches of 500 (idempotent via source + source_id)
  - Verifies count after import

Usage:
  1. Place this script in the project root (our-turn-to-care/)
  2. Place Hospice_General-Information_Feb2026.csv in the same directory
  3. Run: python3 import-cms-hospice.py
"""

import csv
import json
import os
import sys
import warnings
warnings.filterwarnings('ignore')  # Suppress LibreSSL warning

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

def clean_phone(phone_str):
    """Clean phone number — keep only digits, format nicely."""
    if not phone_str:
        return None
    # Phone is already formatted as (XXX) XXX-XXXX in this dataset
    cleaned = phone_str.strip()
    if cleaned:
        return cleaned
    return None

def clean_zip(zip_str):
    """Clean zip code — keep first 5 digits."""
    if not zip_str:
        return None
    digits = ''.join(c for c in str(zip_str) if c.isdigit())
    if len(digits) >= 5:
        return digits[:5]
    return zip_str.strip() if zip_str.strip() else None

def map_ownership(ownership_str):
    """Map ownership type — this dataset already uses friendly names."""
    if not ownership_str:
        return None
    ownership = ownership_str.strip()
    if not ownership:
        return None
    # Map the one odd one to our convention
    mapping = {
        'For-Profit': 'For-Profit',
        'Non-Profit': 'Non-Profit',
        'Government': 'Government',
        'Combination Government & Non-Profit': 'Non-Profit',
        'Other': 'Other',
    }
    return mapping.get(ownership, ownership)

# ─── Transform row ───────────────────────────────────────────────────────────

def transform_row(row):
    """
    Transform a CMS Hospice CSV row into the unified facilities schema.

    Maps CMS columns → facilities table columns.
    Stores the entire original row in raw_data as JSONB.
    """
    ccn = row.get('CMS Certification Number (CCN)', '').strip()
    if not ccn:
        return None  # Skip rows without a CCN

    # Build the record for the unified schema
    record = {
        # Identity
        'source': 'cms_hospice',
        'source_id': ccn,                              # CCN is the unique identifier
        'ccn': ccn,
        'npi': None,                                   # Not in this dataset

        # Facility basics
        'facility_name': row.get('Facility Name', '').strip() or None,
        'legal_name': None,                            # Not in this dataset
        'facility_type': 'hospice',                    # Enum value
        'ownership_type': map_ownership(row.get('Ownership Type', '')),
        'bed_count': None,                             # Not applicable for hospice
        'license_number': None,
        'license_status': None,
        'is_active': True,                             # All CMS-listed providers assumed active

        # Location
        'address_line_1': row.get('Address Line 1', '').strip() or None,
        'address_line_2': row.get('Address Line 2', '').strip() or None,
        'city': row.get('City/Town', '').strip() or None,
        'county': row.get('County/Parish', '').strip() or None,
        'state': row.get('State', '').strip() or None,
        'zip_code': clean_zip(row.get('ZIP Code', '')),
        'latitude': None,                              # Not in this dataset — needs geocoding
        'longitude': None,                             # Not in this dataset — needs geocoding

        # Contact
        'phone': clean_phone(row.get('Telephone Number', '')),
        'email': None,                                 # Not in this dataset
        'website': None,                               # Not in this dataset

        # Program participation — Hospice providers are CMS-listed,
        # so they participate in Medicare by definition.
        'accepts_medicare': True,
        'accepts_medicaid': None,                      # Unknown from this source

        # Quality & ratings — No star ratings in this dataset
        'overall_rating': None,
        'health_inspection_rating': None,
        'staffing_rating': None,
        'quality_measure_rating': None,
        'last_inspection_date': None,
        'deficiency_count': None,
        'penalty_count': None,

        # Metadata — store the entire original row for future use
        'raw_data': json.dumps(row, default=str),

        # source_updated_at — CMS processing date from filename (Feb 2026)
        'source_updated_at': '2026-02-01',
    }

    return record

# ─── Main import ─────────────────────────────────────────────────────────────

def main():
    csv_file = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'Hospice_General-Information_Feb2026.csv')

    if not os.path.exists(csv_file):
        print(f"ERROR: CSV file not found: {csv_file}")
        print("Make sure Hospice_General-Information_Feb2026.csv is in the same directory as this script.")
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

    # Verify hospice count
    try:
        count_result = supabase.table("facilities").select("facility_id", count="exact").eq("source", "cms_hospice").execute()
        print(f"\nVerification: {count_result.count} hospice records now in database")
    except Exception as e:
        print(f"\nVerification query failed: {e}")

    # Show total facilities count
    try:
        total_result = supabase.table("facilities").select("facility_id", count="exact").execute()
        print(f"Total facilities in database: {total_result.count}")
    except Exception as e:
        print(f"Total count query failed: {e}")

if __name__ == '__main__':
    main()
    