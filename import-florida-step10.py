#!/usr/bin/env python3
"""
Step 10: Import Florida AHCA Assisted Living Facility Data
OurTurnToCare.org — Facility Database

Imports and merges Florida Agency for Health Care Administration (AHCA)
assisted living facility data into the existing facilities table.

Data sources (three CSVs, all joined on AHCA File Number — 2,998 records each):
  1. Address CSV: File Number, Facility, Street Address, City, Zip, Phone Number, Licensed Beds
  2. Quality CSV: File Number, County, complaints, sanctions, fines, deficiencies (Class 1-4),
     activities, nurse availability, special programs (incl. Memory Care)
  3. Licensing CSV: AHCA Number, License Number, License ID, License Status, License Dates,
     Owner, Owner Since, Profit Status, Admin/CEO, Web Address

Merge strategy (same pattern as Steps 7-9):
  - Load existing FL records from Supabase
  - Build matching indexes (zip+address, city+name)
  - Match AHCA records against existing github_assisted_living records → enrich
  - Non-matches → insert as new fl_ahca records
  - Flag Memory Care facilities in raw_data

Usage:
  cd our-turn-to-care
  caffeinate -i python3 import-florida-step10.py

Requires: supabase-py, .env.local with Supabase credentials
"""

import csv
import json
import os
import re
import sys
import time
from collections import defaultdict, Counter

# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------
ADDRESS_CSV = "Assisted Living Facility_2026330_18933.csv"
QUALITY_CSV = "Assisted Living Facility_2026330_18340.csv"
LICENSING_CSV = "ALF FacilityData_2026_03_30_23_10_02.csv"

BATCH_SIZE = 200  # Supabase upsert batch size (conservative for free tier)
SIMILARITY_THRESHOLD = 0.65  # Bigram similarity for fuzzy name matching

# ---------------------------------------------------------------------------
# Load Supabase credentials from .env.local
# ---------------------------------------------------------------------------
def load_env():
    env = {}
    env_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '.env.local')
    if not os.path.exists(env_path):
        print(f"ERROR: .env.local not found at {env_path}")
        sys.exit(1)
    with open(env_path) as f:
        for line in f:
            line = line.strip()
            if '=' in line and not line.startswith('#'):
                key, val = line.split('=', 1)
                env[key.strip()] = val.strip()
    return env

env = load_env()
SUPABASE_URL = env.get('NEXT_PUBLIC_SUPABASE_URL', '')
SUPABASE_KEY = env.get('SUPABASE_SERVICE_ROLE_KEY', '')

if not SUPABASE_URL or not SUPABASE_KEY:
    print("ERROR: Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local")
    sys.exit(1)

from supabase import create_client
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# ---------------------------------------------------------------------------
# Utility functions
# ---------------------------------------------------------------------------
def safe_int(val):
    """Parse an integer from a string that may contain $, commas, or decimals."""
    if not val:
        return None
    val = val.strip().replace('$', '').replace(',', '')
    try:
        return int(float(val))
    except (ValueError, TypeError):
        return None

def parse_date(val):
    """Extract just the date portion from '6/15/2025 12:00:00 AM' format."""
    if not val or not val.strip():
        return None
    return val.split(' ')[0] if ' ' in val else val

# ---------------------------------------------------------------------------
# Address normalization (same as Steps 7-9)
# ---------------------------------------------------------------------------
STREET_ABBREVS = {
    'STREET': 'ST', 'AVENUE': 'AVE', 'BOULEVARD': 'BLVD', 'DRIVE': 'DR',
    'LANE': 'LN', 'ROAD': 'RD', 'COURT': 'CT', 'CIRCLE': 'CIR',
    'PLACE': 'PL', 'TERRACE': 'TER', 'TRAIL': 'TRL', 'PARKWAY': 'PKWY',
    'HIGHWAY': 'HWY', 'NORTH': 'N', 'SOUTH': 'S', 'EAST': 'E', 'WEST': 'W',
    'NORTHEAST': 'NE', 'NORTHWEST': 'NW', 'SOUTHEAST': 'SE', 'SOUTHWEST': 'SW',
    'SUITE': 'STE', 'APARTMENT': 'APT', 'BUILDING': 'BLDG', 'FLOOR': 'FL',
}

def normalize_address(addr):
    """Normalize address for matching: uppercase, remove punctuation, standardize abbreviations."""
    if not addr:
        return ''
    addr = addr.upper().strip()
    addr = re.sub(r'[.,#\-/\\]', ' ', addr)
    words = addr.split()
    words = [STREET_ABBREVS.get(w, w) for w in words]
    return ' '.join(words).strip()

def normalize_name(name):
    """Normalize facility name for matching."""
    if not name:
        return ''
    name = name.upper().strip()
    for suffix in [', LLC', ' LLC', ', INC', ' INC', ', LP', ' LP', ', LTD', ' LTD',
                   ' CORPORATION', ' CORP', ', CORP', ' COMPANY', ' CO',
                   ' ALF', ' ASSISTED LIVING FACILITY', ' ASSISTED LIVING',
                   ' RETIREMENT', ' SENIOR LIVING', ' SENIOR CARE',
                   ' OF FLORIDA', ' OF FL']:
        name = name.replace(suffix, '')
    name = re.sub(r'[.,#\-/\\\'\"()]', ' ', name)
    name = re.sub(r'\s+', ' ', name).strip()
    return name

def bigram_similarity(s1, s2):
    """Calculate bigram (character pair) similarity between two strings."""
    if not s1 or not s2:
        return 0.0
    def bigrams(s):
        return set(s[i:i+2] for i in range(len(s)-1))
    b1 = bigrams(s1.lower())
    b2 = bigrams(s2.lower())
    if not b1 or not b2:
        return 0.0
    return 2.0 * len(b1 & b2) / (len(b1) + len(b2))

# =========================================================================
# Phase 1: Load and join all three CSVs
# =========================================================================
print("=" * 70)
print("STEP 10: FLORIDA AHCA ASSISTED LIVING FACILITY IMPORT")
print("=" * 70)

print("\n--- Phase 1: Loading and joining Florida AHCA data (3 CSVs) ---")

# Load address CSV
if not os.path.exists(ADDRESS_CSV):
    print(f"ERROR: {ADDRESS_CSV} not found. Place it in the project root.")
    sys.exit(1)
with open(ADDRESS_CSV, 'r', encoding='utf-8-sig') as f:
    addr_rows = {r['File Number']: r for r in csv.DictReader(f)}
print(f"  Address CSV: {len(addr_rows)} records")

# Load quality CSV
if not os.path.exists(QUALITY_CSV):
    print(f"ERROR: {QUALITY_CSV} not found. Place it in the project root.")
    sys.exit(1)
with open(QUALITY_CSV, 'r', encoding='utf-8-sig') as f:
    qual_rows = {r['File Number']: r for r in csv.DictReader(f)}
print(f"  Quality CSV: {len(qual_rows)} records")

# Load licensing CSV
if not os.path.exists(LICENSING_CSV):
    print(f"WARNING: {LICENSING_CSV} not found — proceeding without licensing data.")
    lic_rows = {}
else:
    with open(LICENSING_CSV, 'r', encoding='utf-8-sig') as f:
        lic_rows = {r['AHCA Number (File Number)']: r for r in csv.DictReader(f)}
    print(f"  Licensing CSV: {len(lic_rows)} records")

# Join all three on File Number
joined = {}
for file_num in addr_rows:
    a = addr_rows[file_num]
    q = qual_rows.get(file_num, {})
    l = lic_rows.get(file_num, {})
    joined[file_num] = {**a, **q, **l}

print(f"  Joined records: {len(joined)}")
print(f"  Records with quality data: {sum(1 for fn in joined if fn in qual_rows)}")
print(f"  Records with licensing data: {sum(1 for fn in joined if fn in lic_rows)}")

# Summarize key fields
memory_care_count = 0
licensed_count = 0
for fn, r in joined.items():
    programs = r.get('Special Programs and Services', '') or ''
    if 'Memory Care' in programs:
        memory_care_count += 1
    if r.get('License Status', '').strip() == 'LICENSED':
        licensed_count += 1

lic_statuses = Counter(r.get('License Status', '').strip() for fn, r in joined.items() if r.get('License Status', '').strip())
profit_statuses = Counter(r.get('Profit Status', '').strip() for fn, r in joined.items() if r.get('Profit Status', '').strip())

print(f"  Memory Care facilities: {memory_care_count}")
print(f"  License statuses: {dict(lic_statuses)}")
print(f"  Profit statuses: {dict(profit_statuses)}")

# =========================================================================
# Phase 2: Load existing Florida records from Supabase
# =========================================================================
print("\n--- Phase 2: Loading existing FL records from Supabase ---")

existing_fl = []
page_size = 1000
offset = 0
while True:
    resp = supabase.table('facilities') \
        .select('facility_id,source,source_id,facility_name,address_line_1,city,state,zip_code,phone,bed_count,raw_data,facility_type') \
        .eq('state', 'FL') \
        .range(offset, offset + page_size - 1) \
        .execute()
    batch = resp.data
    existing_fl.extend(batch)
    if len(batch) < page_size:
        break
    offset += page_size
    print(f"  Loaded {len(existing_fl)} records so far...")

print(f"  Total existing FL records: {len(existing_fl)}")

source_counts = Counter(r['source'] for r in existing_fl)
print("  By source:")
for s, c in source_counts.most_common():
    print(f"    {s}: {c}")

type_counts = Counter(r['facility_type'] for r in existing_fl)
print("  By facility_type:")
for t, c in type_counts.most_common():
    print(f"    {t}: {c}")

# =========================================================================
# Phase 3: Build matching indexes
# =========================================================================
print("\n--- Phase 3: Building matching indexes ---")

zip_addr_index = defaultdict(list)
city_name_index = defaultdict(list)

for rec in existing_fl:
    zip5 = (rec.get('zip_code') or '')[:5]
    addr_norm = normalize_address(rec.get('address_line_1', ''))
    city_upper = (rec.get('city') or '').upper().strip()
    name_norm = normalize_name(rec.get('facility_name', ''))

    if zip5 and addr_norm:
        zip_addr_index[(zip5, addr_norm)].append(rec)
    if city_upper and name_norm:
        city_name_index[(city_upper, name_norm)].append(rec)

print(f"  Zip+address index entries: {len(zip_addr_index)}")
print(f"  City+name index entries: {len(city_name_index)}")

# =========================================================================
# Phase 4: Match AHCA records against existing, build upsert batches
# =========================================================================
print("\n--- Phase 4: Matching AHCA records against existing FL records ---")

matched_enrichments = []   # Records to UPDATE (enrich existing)
new_inserts = []           # Records to INSERT (new facilities)
match_sources = Counter()
match_methods = Counter()

for file_num, r in joined.items():
    # --- Parse fields from all three CSVs ---

    # Address CSV fields
    ahca_name = (r.get('Facility') or r.get('Name') or '').strip()
    ahca_addr = (r.get('Street Address') or '').strip()
    ahca_city = (r.get('City') or r.get('Street City') or '').strip()
    ahca_zip_raw = (r.get('Zip') or r.get('Street Zip') or '').strip()
    ahca_zip5 = ahca_zip_raw[:5] if ahca_zip_raw else ''
    ahca_phone = (r.get('Phone Number') or '').strip()
    ahca_county = (r.get('County') or r.get('Street County') or '').strip()

    # Bed count
    bed_str = r.get('Licensed Beds') or r.get('Bed Size') or ''
    ahca_beds = int(bed_str) if str(bed_str).strip().isdigit() else None

    # Quality CSV fields
    programs = r.get('Special Programs and Services', '') or ''
    has_memory_care = 'Memory Care' in programs
    total_deficiencies = safe_int(r.get('Total Deficiencies'))
    class1 = safe_int(r.get('Class 1'))
    class2 = safe_int(r.get('Class 2'))
    class3 = safe_int(r.get('Class 3'))
    class4 = safe_int(r.get('Class 4'))
    unclassified = safe_int(r.get('Unclassified'))
    complaints = safe_int(r.get('Number of Substantiated Complaints'))
    sanctions = safe_int(r.get('Sanctions/Final Orders'))
    fine_str = (r.get('Fine Amount') or '').replace('$', '').replace(',', '').strip()
    fine_amount = float(fine_str) if fine_str else None
    activities = r.get('Activities') or ''
    nurse_avail = r.get('Nurse Availability') or ''

    # Licensing CSV fields
    license_number = (r.get('License Number') or '').strip()
    license_id = (r.get('License ID') or '').strip()
    license_status = (r.get('License Status') or '').strip()
    license_effective = parse_date(r.get('License Effective Date'))
    license_expiration = parse_date(r.get('License Expiration Date'))
    owner = (r.get('Owner') or '').strip()
    owner_since = parse_date(r.get('Owner Since'))
    profit_status = (r.get('Profit Status') or '').strip()
    admin_ceo = (r.get('Admin/CEO') or '').strip()
    web_address = (r.get('Web Address') or '').strip()
    closed_date = parse_date(r.get('Closed Date'))

    # Map profit_status to ownership_type
    ownership_type = None
    if profit_status == 'For-Profit':
        ownership_type = 'For-Profit'
    elif profit_status == 'Not-For-Profit':
        ownership_type = 'Non-Profit'

    # Build raw_data JSONB
    raw_data = {
        'fl_ahca': {
            'file_number': file_num,
            'facility_name': ahca_name,
            'address': ahca_addr,
            'city': ahca_city,
            'zip': ahca_zip_raw,
            'county': ahca_county,
            'phone': ahca_phone,
            'licensed_beds': ahca_beds,
            'has_memory_care': has_memory_care,
            'special_programs': programs if programs != 'NR' else None,
            'activities': activities if activities != 'None' else None,
            'nurse_availability': nurse_avail if nurse_avail else None,
            'total_deficiencies': total_deficiencies,
            'class1_deficiencies': class1,
            'class2_deficiencies': class2,
            'class3_deficiencies': class3,
            'class4_deficiencies': class4,
            'unclassified_deficiencies': unclassified,
            'substantiated_complaints': complaints,
            'sanctions_final_orders': sanctions,
            'fine_amount': fine_amount,
            'license_number': license_number or None,
            'license_id': license_id or None,
            'license_status': license_status or None,
            'license_effective_date': license_effective,
            'license_expiration_date': license_expiration,
            'owner': owner or None,
            'owner_since': owner_since,
            'profit_status': profit_status or None,
            'admin_ceo': admin_ceo or None,
            'web_address': web_address or None,
            'closed_date': closed_date,
        }
    }

    # --- Matching ---
    matched = None
    method = None

    # Strategy 1: Exact zip + normalized address match
    ahca_addr_norm = normalize_address(ahca_addr)
    if ahca_zip5 and ahca_addr_norm:
        candidates = zip_addr_index.get((ahca_zip5, ahca_addr_norm), [])
        if len(candidates) == 1:
            matched = candidates[0]
            method = 'zip_addr'
        elif len(candidates) > 1:
            al_candidates = [c for c in candidates if c['facility_type'] == 'assisted_living']
            if al_candidates:
                matched = al_candidates[0]
                method = 'zip_addr'
            else:
                matched = candidates[0]
                method = 'zip_addr'

    # Strategy 2: City + fuzzy name match (fallback)
    if not matched:
        ahca_city_upper = ahca_city.upper().strip()
        ahca_name_norm = normalize_name(ahca_name)

        best_match = None
        best_score = 0.0

        for (idx_city, idx_name), recs in city_name_index.items():
            if idx_city != ahca_city_upper:
                continue
            score = bigram_similarity(ahca_name_norm, idx_name)
            if score > best_score:
                best_score = score
                al_recs = [rc for rc in recs if rc['facility_type'] == 'assisted_living']
                best_match = al_recs[0] if al_recs else recs[0]

        if best_match and best_score >= SIMILARITY_THRESHOLD:
            matched = best_match
            method = 'city_name'

    if matched:
        # --- ENRICHMENT: Update existing record ---
        match_sources[matched['source']] += 1
        match_methods[method] += 1

        update = {
            'facility_id': matched['facility_id'],
            'phone': ahca_phone or matched.get('phone'),
            'bed_count': ahca_beds or matched.get('bed_count'),
            'county': ahca_county or matched.get('county'),
        }

        # Add license data
        if license_number:
            update['license_number'] = license_number
        if license_status:
            update['license_status'] = license_status
        if owner:
            update['legal_name'] = owner
        if ownership_type:
            update['ownership_type'] = ownership_type
        if web_address:
            update['website'] = web_address

        # Add deficiency_count
        if total_deficiencies is not None:
            update['deficiency_count'] = total_deficiencies

        # Mark inactive if license status indicates closure/suspension
        if license_status in ('INACTIVE',):
            update['is_active'] = False

        # Merge raw_data (preserve existing data, add fl_ahca key)
        existing_raw = matched.get('raw_data') or {}
        if isinstance(existing_raw, str):
            try:
                existing_raw = json.loads(existing_raw)
            except:
                existing_raw = {}
        merged_raw = {**existing_raw, **raw_data}
        update['raw_data'] = merged_raw

        matched_enrichments.append(update)
    else:
        # --- NEW INSERT ---
        new_record = {
            'source': 'fl_ahca',
            'source_id': f"FL-ALF-{file_num}",
            'facility_name': ahca_name,
            'facility_type': 'assisted_living',
            'address_line_1': ahca_addr or 'Unknown',
            'city': ahca_city or 'Unknown',
            'state': 'FL',
            'zip_code': ahca_zip5 or '00000',
            'county': ahca_county,
            'phone': ahca_phone,
            'bed_count': ahca_beds,
            'is_active': license_status not in ('INACTIVE',),
            'raw_data': raw_data,
        }

        if license_number:
            new_record['license_number'] = license_number
        if license_status:
            new_record['license_status'] = license_status
        if owner:
            new_record['legal_name'] = owner
        if ownership_type:
            new_record['ownership_type'] = ownership_type
        if web_address:
            new_record['website'] = web_address
        if total_deficiencies is not None:
            new_record['deficiency_count'] = total_deficiencies

        new_inserts.append(new_record)

# --- Print match results ---
print(f"\n  Results:")
print(f"    Matched & will enrich: {len(matched_enrichments)}")
print(f"    New facilities to insert: {len(new_inserts)}")
print(f"    Total processed: {len(matched_enrichments) + len(new_inserts)}")

print(f"\n  Match sources:")
for s, c in match_sources.most_common():
    print(f"    {s}: {c}")

print(f"\n  Match methods:")
for m, c in match_methods.most_common():
    print(f"    {m}: {c}")

mc_matched = sum(1 for e in matched_enrichments if (e.get('raw_data', {}).get('fl_ahca', {}).get('has_memory_care')))
mc_new = sum(1 for n in new_inserts if (n.get('raw_data', {}).get('fl_ahca', {}).get('has_memory_care')))
print(f"\n  Memory Care: {mc_matched} matched + {mc_new} new = {mc_matched + mc_new} total")

# =========================================================================
# Phase 5: Apply enrichments (UPDATE existing records)
# =========================================================================
print("\n--- Phase 5: Applying enrichments to existing records ---")

enrichment_success = 0
enrichment_errors = 0

for i in range(0, len(matched_enrichments), BATCH_SIZE):
    batch = matched_enrichments[i:i+BATCH_SIZE]
    for rec in batch:
        fid = rec.pop('facility_id')
        # Convert raw_data dict to JSON string
        if isinstance(rec.get('raw_data'), dict):
            rec['raw_data'] = json.dumps(rec['raw_data'])
        try:
            supabase.table('facilities').update(rec).eq('facility_id', fid).execute()
            enrichment_success += 1
        except Exception as e:
            enrichment_errors += 1
            if enrichment_errors <= 5:
                print(f"  ERROR enriching {fid}: {e}")

    done = min(i + BATCH_SIZE, len(matched_enrichments))
    print(f"  Enriched {done}/{len(matched_enrichments)}...")

print(f"  Enrichment complete: {enrichment_success} success, {enrichment_errors} errors")

# =========================================================================
# Phase 6: Insert new records (UPSERT to handle re-runs)
# =========================================================================
print("\n--- Phase 6: Inserting new facilities ---")

# Deduplicate by source_id before upserting
seen_source_ids = set()
deduped_inserts = []
for rec in new_inserts:
    sid = rec['source_id']
    if sid not in seen_source_ids:
        seen_source_ids.add(sid)
        deduped_inserts.append(rec)
    else:
        print(f"  WARNING: Duplicate source_id {sid} — skipping")

if len(deduped_inserts) != len(new_inserts):
    print(f"  Deduplicated: {len(new_inserts)} → {len(deduped_inserts)}")

insert_success = 0
insert_errors = 0

for i in range(0, len(deduped_inserts), BATCH_SIZE):
    batch = deduped_inserts[i:i+BATCH_SIZE]
    try:
        for rec in batch:
            if isinstance(rec.get('raw_data'), dict):
                rec['raw_data'] = json.dumps(rec['raw_data'])

        supabase.table('facilities').upsert(
            batch,
            on_conflict='source,source_id'
        ).execute()
        insert_success += len(batch)
    except Exception as e:
        insert_errors += len(batch)
        print(f"  ERROR inserting batch at offset {i}: {e}")
        # Try one-by-one for the failed batch
        for rec in batch:
            try:
                supabase.table('facilities').upsert(
                    [rec],
                    on_conflict='source,source_id'
                ).execute()
                insert_success += 1
                insert_errors -= 1
            except Exception as e2:
                if insert_errors <= 5:
                    print(f"    Single insert error for {rec.get('source_id')}: {e2}")

    done = min(i + BATCH_SIZE, len(deduped_inserts))
    print(f"  Inserted {done}/{len(deduped_inserts)}...")

print(f"  Insert complete: {insert_success} success, {insert_errors} errors")

# =========================================================================
# Phase 7: Summary
# =========================================================================
print("\n" + "=" * 70)
print("STEP 10 COMPLETE — FLORIDA AHCA IMPORT SUMMARY")
print("=" * 70)
print(f"""
Data sources:
  Address CSV: {ADDRESS_CSV} ({len(addr_rows)} records)
  Quality CSV: {QUALITY_CSV} ({len(qual_rows)} records)
  Licensing CSV: {LICENSING_CSV} ({len(lic_rows)} records)
  Joined records: {len(joined)}

Results:
  Matched & enriched existing records: {enrichment_success}
  New facilities inserted: {insert_success}
  Total AHCA records processed: {enrichment_success + insert_success}
  Errors: {enrichment_errors + insert_errors}

Match breakdown:
  By source: {dict(match_sources)}
  By method: {dict(match_methods)}
  Match rate: {len(matched_enrichments) / len(joined) * 100:.1f}%

Memory Care:
  Total Memory Care facilities: {memory_care_count}
  Matched (enriched): {mc_matched}
  New (inserted): {mc_new}

License statuses: {dict(lic_statuses)}
Ownership: {dict(profit_statuses)}

Enrichment fields added to matched records:
  - phone, bed_count, county
  - license_number, license_status
  - legal_name (owner), ownership_type (profit status)
  - website (web address)
  - deficiency_count
  - raw_data.fl_ahca with full AHCA record:
    - file_number, license_id, license_number, license_status
    - license_effective_date, license_expiration_date
    - owner, owner_since, profit_status, admin_ceo, web_address
    - has_memory_care, special_programs, activities, nurse_availability
    - total_deficiencies, class1-4 deficiencies
    - substantiated_complaints, sanctions, fine_amount

New records inserted with source='fl_ahca':
  - Full address, city, state, zip, county, phone
  - license_number, license_status, legal_name, ownership_type, website
  - bed_count, deficiency_count
  - raw_data.fl_ahca (same fields as enriched)
""")

print("Script complete. Safe to re-run (idempotent via upsert + update-by-id).")