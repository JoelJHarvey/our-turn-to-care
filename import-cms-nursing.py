"""
OurTurnToCare — CMS Nursing Home Data Import
=============================================
This script reads the CMS NH_ProviderInfo CSV file and imports all ~14,700
nursing homes into your Supabase facilities table.

HOW TO RUN:
1. Open Cursor terminal (Ctrl+` or Cmd+`)
2. Install the one dependency:  pip install supabase
3. Make sure the CSV file path below is correct
4. Run:  python import-cms-nursing.py

It will show progress as it imports in batches of 500.
"""

import csv
import json
import os
import sys
from datetime import datetime

# ============================================================
# CONFIGURATION — Update these if needed
# ============================================================

# Path to the CMS CSV file you downloaded
CSV_FILE = "NH_ProviderInfo_Mar2026.csv"

# Your Supabase credentials (reads from .env.local automatically)
# Or you can paste them directly here temporarily
SUPABASE_URL = os.environ.get("NEXT_PUBLIC_SUPABASE_URL", "")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY", "")

# If env vars aren't found, try reading .env.local
if not SUPABASE_URL or not SUPABASE_KEY:
    env_file = os.path.join(os.path.dirname(os.path.abspath(__file__)), ".env.local")
    if not os.path.exists(env_file):
        # Try parent directory
        env_file = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".env.local")
    if os.path.exists(env_file):
        print(f"Reading credentials from {env_file}")
        with open(env_file, 'r') as f:
            for line in f:
                line = line.strip()
                if line.startswith('#') or '=' not in line:
                    continue
                key, val = line.split('=', 1)
                key = key.strip()
                val = val.strip()
                if key == "NEXT_PUBLIC_SUPABASE_URL":
                    SUPABASE_URL = val
                elif key == "SUPABASE_SERVICE_ROLE_KEY":
                    SUPABASE_KEY = val

if not SUPABASE_URL or not SUPABASE_KEY:
    print("\n❌ ERROR: Could not find Supabase credentials.")
    print("Make sure your .env.local file has:")
    print("  NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co")
    print("  SUPABASE_SERVICE_ROLE_KEY=eyJ...")
    print("\nOr set them as environment variables before running this script.")
    sys.exit(1)

BATCH_SIZE = 500

# ============================================================
# FIELD MAPPING — How CMS columns map to our unified schema
# ============================================================

# Key CMS fields to preserve in raw_data (not all 99 — just the useful ones)
RAW_DATA_KEYS = [
    'CMS Certification Number (CCN)', 'Provider Name', 'Provider Address',
    'City/Town', 'State', 'ZIP Code', 'Telephone Number', 'County/Parish',
    'Urban', 'Ownership Type', 'Number of Certified Beds',
    'Average Number of Residents per Day', 'Provider Type',
    'Provider Resides in Hospital', 'Legal Business Name',
    'Date First Approved to Provide Medicare and Medicaid Services',
    'Chain Name', 'Chain ID', 'Continuing Care Retirement Community',
    'Special Focus Status', 'Abuse Icon',
    'Most Recent Health Inspection More Than 2 Years Ago',
    'Provider Changed Ownership in Last 12 Months',
    'With a Resident and Family Council',
    'Automatic Sprinkler Systems in All Required Areas',
    'Overall Rating', 'Health Inspection Rating', 'QM Rating',
    'Long-Stay QM Rating', 'Short-Stay QM Rating', 'Staffing Rating',
    'Reported Total Nurse Staffing Hours per Resident per Day',
    'Reported RN Staffing Hours per Resident per Day',
    'Total nursing staff turnover', 'Registered Nurse turnover',
    'Rating Cycle 1 Standard Survey Health Date',
    'Rating Cycle 1 Total Number of Health Deficiencies',
    'Total Weighted Health Survey Score',
    'Number of Fines', 'Total Amount of Fines in Dollars',
    'Number of Payment Denials', 'Total Number of Penalties',
    'Latitude', 'Longitude', 'Processing Date'
]


def safe_int(val):
    """Convert to int or return None"""
    if not val or not val.strip():
        return None
    try:
        return int(float(val))
    except (ValueError, TypeError):
        return None


def safe_float(val):
    """Convert to float or return None"""
    if not val or not val.strip():
        return None
    try:
        return float(val)
    except (ValueError, TypeError):
        return None


def determine_medicare_medicaid(provider_type):
    """Parse Provider Type into accepts_medicare and accepts_medicaid booleans"""
    pt = (provider_type or '').strip().lower()
    if 'medicare and medicaid' in pt:
        return True, True
    elif 'medicare' in pt:
        return True, False
    elif 'medicaid' in pt:
        return False, True
    return None, None


def transform_row(row):
    """Transform a CMS CSV row into our unified schema"""
    medicare, medicaid = determine_medicare_medicaid(row.get('Provider Type', ''))

    # Build compact raw_data with just the useful fields
    raw_data = {k: row.get(k, '') for k in RAW_DATA_KEYS if row.get(k, '')}

    return {
        'source': 'cms_nursing',
        'source_id': row.get('CMS Certification Number (CCN)', '').strip(),
        'ccn': row.get('CMS Certification Number (CCN)', '').strip() or None,
        'facility_name': row.get('Provider Name', '').strip(),
        'legal_name': row.get('Legal Business Name', '').strip() or None,
        'facility_type': 'nursing_home',
        'ownership_type': row.get('Ownership Type', '').strip() or None,
        'bed_count': safe_int(row.get('Number of Certified Beds', '')),
        'is_active': True,
        'address_line_1': row.get('Provider Address', '').strip(),
        'city': row.get('City/Town', '').strip(),
        'county': row.get('County/Parish', '').strip() or None,
        'state': row.get('State', '').strip(),
        'zip_code': row.get('ZIP Code', '').strip(),
        'latitude': safe_float(row.get('Latitude', '')),
        'longitude': safe_float(row.get('Longitude', '')),
        'phone': row.get('Telephone Number', '').strip() or None,
        'accepts_medicare': medicare,
        'accepts_medicaid': medicaid,
        'overall_rating': safe_int(row.get('Overall Rating', '')),
        'health_inspection_rating': safe_int(row.get('Health Inspection Rating', '')),
        'quality_measure_rating': safe_int(row.get('QM Rating', '')),
        'staffing_rating': safe_int(row.get('Staffing Rating', '')),
        'last_inspection_date': row.get('Rating Cycle 1 Standard Survey Health Date', '').strip() or None,
        'deficiency_count': safe_int(row.get('Rating Cycle 1 Total Number of Health Deficiencies', '')),
        'penalty_count': safe_int(row.get('Total Number of Penalties', '')),
        'source_updated_at': row.get('Processing Date', '').strip() or None,
        'raw_data': raw_data,
    }


def main():
    # Check CSV exists — try a few common locations
    csv_path = CSV_FILE
    if not os.path.exists(csv_path):
        alt_paths = [
            os.path.join(os.path.dirname(os.path.abspath(__file__)), CSV_FILE),
            os.path.join(os.path.expanduser("~"), "Downloads", CSV_FILE),
        ]
        for p in alt_paths:
            if os.path.exists(p):
                csv_path = p
                break
        else:
            print(f"\n❌ ERROR: Cannot find {CSV_FILE}")
            print(f"Make sure the CMS CSV file is in the same folder as this script,")
            print(f"or update the CSV_FILE path at the top of this file.")
            sys.exit(1)

    # Import supabase
    try:
        from supabase import create_client
    except ImportError:
        print("\n❌ ERROR: supabase package not installed.")
        print("Run this in your terminal:  pip install supabase")
        sys.exit(1)

    # Connect to Supabase
    print(f"\n🔌 Connecting to Supabase at {SUPABASE_URL[:40]}...")
    supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
    print("✅ Connected!\n")

    # Read CSV
    print(f"📄 Reading {csv_path}...")
    rows = []
    with open(csv_path, 'r', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        for row in reader:
            rows.append(row)
    print(f"   Found {len(rows):,} nursing homes\n")

    # Transform all rows
    print("🔄 Transforming data to match database schema...")
    transformed = [transform_row(r) for r in rows]
    print(f"   Transformed {len(transformed):,} rows\n")

    # Import in batches
    total_batches = (len(transformed) + BATCH_SIZE - 1) // BATCH_SIZE
    imported = 0
    errors = 0

    print(f"⬆️  Importing to Supabase in {total_batches} batches of {BATCH_SIZE}...\n")

    for i in range(0, len(transformed), BATCH_SIZE):
        batch = transformed[i:i + BATCH_SIZE]
        batch_num = (i // BATCH_SIZE) + 1

        try:
            # Upsert: insert new rows, update existing ones (matched on source + source_id)
            result = supabase.table('facilities').upsert(
                batch,
                on_conflict='source,source_id'
            ).execute()

            imported += len(batch)
            bar = "█" * int(batch_num / total_batches * 30)
            bar += "░" * (30 - len(bar))
            print(f"   [{bar}] Batch {batch_num}/{total_batches} — {imported:,} rows imported")

        except Exception as e:
            errors += 1
            print(f"   ❌ Batch {batch_num} failed: {str(e)[:200]}")
            # Continue with next batch
            continue

    # Summary
    print(f"\n{'='*50}")
    print(f"✅ IMPORT COMPLETE")
    print(f"   Total rows imported: {imported:,}")
    if errors:
        print(f"   ⚠️  Failed batches: {errors}")
    print(f"{'='*50}")

    # Verify
    print(f"\n🔍 Verifying...")
    count = supabase.table('facilities').select('facility_id', count='exact').eq('source', 'cms_nursing').execute()
    print(f"   Nursing homes in database: {count.count:,}")

    # Show a sample
    sample = supabase.table('facilities').select(
        'facility_name, city, state, overall_rating, bed_count'
    ).eq('source', 'cms_nursing').eq('state', 'TX').order('overall_rating', desc=True).limit(5).execute()

    if sample.data:
        print(f"\n📊 Sample — Top-rated nursing homes in Texas:")
        for row in sample.data:
            stars = "⭐" * (row['overall_rating'] or 0)
            print(f"   {stars} {row['facility_name']}, {row['city']} ({row['bed_count']} beds)")

    print(f"\n🎉 Done! Your facility database now has real CMS nursing home data.")
    print(f"   Go to Supabase Table Editor to browse your data.")


if __name__ == '__main__':
    main()
    