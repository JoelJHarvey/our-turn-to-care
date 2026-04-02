#!/usr/bin/env python3
"""
Step 9 Fix: Re-match Adult Care and Home Health records against correct source names.

The initial import used 'github_al' and 'cms_homehealth' as source names,
but the actual values in the database are 'github_assisted_living' and 'cms_home_health'.

This script:
1. Loads the NY records that were just inserted (ny_doh for AH/EHP, ny_doh for CHHA)
2. Loads the existing github_assisted_living and cms_home_health records for NY
3. Matches them using the same zip+address / fuzzy name logic
4. For matches: enriches the existing record with NY data, then deletes the duplicate ny_doh record
5. Keeps unmatched ny_doh records as-is (genuinely new facilities)

Usage:
  caffeinate -i python3 fix-newyork-step9-matches.py
"""

import csv
import os
import re
import json
import time
import math
from collections import defaultdict, Counter

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

GENERAL_INFO_CSV = "/Users/JoelHarvey/our-turn-to-care/Health_Facility_General_Information.csv"
CERTIFICATION_CSV = "/Users/JoelHarvey/our-turn-to-care/Health_Facility_Certification_Information.csv"
ENV_FILE = ".env.local"
BATCH_SIZE = 200

# ---------------------------------------------------------------------------
# Helpers (same as main script)
# ---------------------------------------------------------------------------

def load_env(filepath):
    env = {}
    if not os.path.exists(filepath):
        for parent in ['../', '../../']:
            alt = os.path.join(parent, filepath)
            if os.path.exists(alt):
                filepath = alt
                break
    with open(filepath, 'r') as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith('#'):
                continue
            if '=' in line:
                key, val = line.split('=', 1)
                env[key.strip()] = val.strip().strip('"').strip("'")
    return env


def normalize_address(addr):
    if not addr:
        return ''
    addr = addr.upper().strip()
    addr = re.sub(r'[.,#\-/]', ' ', addr)
    replacements = {
        'STREET': 'ST', 'AVENUE': 'AVE', 'BOULEVARD': 'BLVD', 'DRIVE': 'DR',
        'ROAD': 'RD', 'LANE': 'LN', 'COURT': 'CT', 'PLACE': 'PL',
        'CIRCLE': 'CIR', 'TERRACE': 'TER', 'HIGHWAY': 'HWY', 'PARKWAY': 'PKWY',
        'NORTH': 'N', 'SOUTH': 'S', 'EAST': 'E', 'WEST': 'W',
        'SUITE': 'STE', 'APARTMENT': 'APT', 'BUILDING': 'BLDG',
        'FLOOR': 'FL', 'ROOM': 'RM', 'UNIT': 'UNIT',
    }
    words = addr.split()
    normalized = [replacements.get(w, w) for w in words]
    addr = ' '.join(normalized)
    return re.sub(r'\s+', ' ', addr).strip()


def normalize_name(name):
    if not name:
        return ''
    name = name.upper().strip()
    name = re.sub(r'[.,\-\'\"#/&()]', ' ', name)
    for suffix in ['LLC', 'INC', 'CORP', 'LP', 'LLP', 'LTD']:
        name = re.sub(r'\b' + suffix + r'\b', '', name)
    return re.sub(r'\s+', ' ', name).strip()


def bigram_similarity(s1, s2):
    if not s1 or not s2:
        return 0.0
    s1, s2 = s1.lower(), s2.lower()
    if s1 == s2:
        return 1.0
    def get_bigrams(s):
        return set(s[i:i+2] for i in range(len(s)-1))
    b1, b2 = get_bigrams(s1), get_bigrams(s2)
    if not b1 or not b2:
        return 0.0
    return 2.0 * len(b1 & b2) / (len(b1) + len(b2))


BIGRAM_THRESHOLD = 0.65


def clean_zip(z):
    if not z:
        return ''
    match = re.match(r'(\d{5})', str(z).strip())
    return match.group(1) if match else str(z).strip()


def clean_phone(p):
    if not p:
        return None
    digits = re.sub(r'\D', '', str(p))
    if len(digits) == 10:
        return digits
    if len(digits) == 11 and digits[0] == '1':
        return digits[1:]
    return digits if digits else None


def safe_float(val):
    try:
        v = float(str(val).strip()) if val and str(val).strip() else None
        return v if v and not math.isnan(v) else None
    except:
        return None


def safe_int(val):
    try:
        return int(float(str(val).strip())) if val and str(val).strip() else None
    except:
        return None


def build_matching_indexes(records):
    zip_addr_index = {}
    city_name_index = {}
    for rec in records:
        addr = normalize_address(rec.get('address_line_1', ''))
        zipcode = clean_zip(rec.get('zip_code', ''))
        city = (rec.get('city', '') or '').upper().strip()
        name = normalize_name(rec.get('facility_name', ''))
        if zipcode and addr:
            zip_addr_index[(zipcode, addr)] = rec
        if city and name:
            city_name_index[(city, name)] = rec
    return zip_addr_index, city_name_index


def find_match(fac_name, fac_addr, fac_city, fac_zip, zip_addr_index, city_name_index):
    addr = normalize_address(fac_addr)
    zipcode = clean_zip(fac_zip)
    city = (fac_city or '').upper().strip()
    name = normalize_name(fac_name)

    if zipcode and addr:
        key = (zipcode, addr)
        if key in zip_addr_index:
            return zip_addr_index[key], 'zip_address'

    if city and name:
        best_match = None
        best_score = 0
        for (idx_city, idx_name), rec in city_name_index.items():
            if idx_city != city:
                continue
            score = bigram_similarity(name, idx_name)
            if score >= BIGRAM_THRESHOLD and score > best_score:
                best_score = score
                best_match = rec
        if best_match:
            return best_match, f'fuzzy_name({best_score:.2f})'

    return None, None


# ---------------------------------------------------------------------------
# Build enrichment data from the NY CSVs
# ---------------------------------------------------------------------------

def load_ny_facility_data():
    """Load NY facilities from CSVs and build enrichment data keyed by NY-{facility_id}."""
    print("\n=== Loading NY facility data from CSVs ===")

    NY_TYPES = {'AH', 'EHP', 'CHHA'}
    facilities = {}

    with open(GENERAL_INFO_CSV, 'r', encoding='utf-8-sig') as f:
        for row in csv.DictReader(f):
            sd = row['Short Description'].strip()
            if sd not in NY_TYPES:
                continue
            fid = row['Facility ID'].strip()
            facilities[fid] = {
                'ny_facility_id': fid,
                'facility_name': row['Facility Name'].strip(),
                'short_description': sd,
                'description': row['Description'].strip(),
                'open_date': row.get('Facility Open Date', '').strip(),
                'address_line_1': row['Facility Address 1'].strip(),
                'city': row['Facility City'].strip(),
                'zip_code': clean_zip(row['Facility Zip Code']),
                'phone': clean_phone(row.get('Facility Phone Number', '')),
                'fax': row.get('Facility Fax Number', '').strip() or None,
                'website': row.get('Facility Website', '').strip() or None,
                'county_code': row.get('Facility County Code', '').strip(),
                'county': row.get('Facility County', '').strip(),
                'regional_office': row.get('Regional Office', '').strip(),
                'main_site_name': row.get('Main Site Name', '').strip() or None,
                'main_site_id': row.get('Main Site Facility ID', '').strip() or None,
                'operating_cert_number': row.get('Operating Certificate Number', '').strip() or None,
                'operator_name': row.get('Operator Name', '').strip() or None,
                'operator_address': row.get('Operator Address 1', '').strip() or None,
                'operator_city': row.get('Operator City', '').strip() or None,
                'operator_state': row.get('Operator State', '').strip() or None,
                'operator_zip': row.get('Operator Zip Code', '').strip() or None,
                'cooperator_name': row.get('Cooperator Name', '').strip() or None,
                'ownership_type': row.get('Ownership Type', '').strip() or None,
                'latitude': safe_float(row.get('Facility Latitude', '')),
                'longitude': safe_float(row.get('Facility Longitude', '')),
                'bed_count': None,
                'certifications': [],
                'services': [],
                'has_alp': False, 'has_alr': False, 'has_ealr': False,
                'has_snalr': False, 'has_dementia': False,
                'alp_beds': None, 'alr_beds': None, 'dementia_beds': None,
            }

    # Join certification data
    with open(CERTIFICATION_CSV, 'r', encoding='utf-8-sig') as f:
        for row in csv.DictReader(f):
            fid = row['Facility ID'].strip()
            if fid not in facilities:
                continue
            attr_type = row['Attribute Type'].strip()
            attr_value = row['Attribute Value'].strip()
            measure = row.get('Measure Value', '').strip()
            sub_type = row.get('Sub Type', '').strip()
            eff_date = row.get('Effective Date', '').strip()

            entry = {
                'attribute_type': attr_type,
                'attribute_value': attr_value,
                'measure_value': measure,
                'sub_type': sub_type,
                'effective_date': eff_date,
            }

            if attr_type == 'Bed':
                facilities[fid]['certifications'].append(entry)
                if attr_value == 'Overall Capacity (AH/EHP)' and facilities[fid]['bed_count'] is None:
                    facilities[fid]['bed_count'] = safe_int(measure)
                if attr_value == 'Assisted Living Program (ALP)':
                    facilities[fid]['has_alp'] = True
                    facilities[fid]['alp_beds'] = safe_int(measure)
                if attr_value == 'Assisted Living Residence (ALR)':
                    facilities[fid]['has_alr'] = True
                    facilities[fid]['alr_beds'] = safe_int(measure)
                if attr_value == 'Enhanced Assisted Living Residence (EALR)':
                    facilities[fid]['has_ealr'] = True
                if attr_value == 'Special Needs Assisted Living Residence (SNALR)':
                    facilities[fid]['has_snalr'] = True
                if attr_value == 'Dementia':
                    facilities[fid]['has_dementia'] = True
                    facilities[fid]['dementia_beds'] = safe_int(measure)
            elif attr_type == 'Service':
                facilities[fid]['services'].append(entry)

    # Build lookup by source_id
    by_source_id = {}
    for fid, fac in facilities.items():
        by_source_id[f"NY-{fid}"] = fac

    print(f"  Loaded {len(facilities)} AH/EHP/CHHA facilities from CSVs")
    type_counts = Counter(f['short_description'] for f in facilities.values())
    for t, c in sorted(type_counts.items(), key=lambda x: -x[1]):
        print(f"    {t}: {c}")

    return by_source_id


def build_raw_data(fac):
    raw = {
        'ny_doh': {
            'facility_id': fac['ny_facility_id'],
            'short_description': fac['short_description'],
            'description': fac['description'],
            'open_date': fac['open_date'],
            'operating_cert_number': fac['operating_cert_number'],
            'operator_name': fac['operator_name'],
            'operator_address': fac['operator_address'],
            'operator_city': fac['operator_city'],
            'operator_state': fac['operator_state'],
            'operator_zip': fac['operator_zip'],
            'cooperator_name': fac['cooperator_name'],
            'ownership_type': fac['ownership_type'],
            'county_code': fac['county_code'],
            'regional_office': fac['regional_office'],
            'main_site_name': fac['main_site_name'],
            'main_site_id': fac['main_site_id'],
            'fax': fac['fax'],
            'website': fac['website'],
        }
    }
    if fac.get('certifications'):
        raw['ny_doh']['certifications'] = fac['certifications']
    if fac.get('services'):
        raw['ny_doh']['services'] = fac['services']
    if fac.get('has_alp'):
        raw['ny_doh']['has_alp'] = True
        raw['ny_doh']['alp_beds'] = fac.get('alp_beds')
    if fac.get('has_alr'):
        raw['ny_doh']['has_alr'] = True
        raw['ny_doh']['alr_beds'] = fac.get('alr_beds')
    if fac.get('has_ealr'):
        raw['ny_doh']['has_ealr'] = True
    if fac.get('has_snalr'):
        raw['ny_doh']['has_snalr'] = True
    if fac.get('has_dementia'):
        raw['ny_doh']['has_dementia'] = True
        raw['ny_doh']['dementia_beds'] = fac.get('dementia_beds')
    return raw


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    print("=" * 60)
    print("Step 9 Fix: Re-match Adult Care and Home Health")
    print("=" * 60)

    # Load environment
    env = load_env(ENV_FILE)
    supabase_url = env.get('NEXT_PUBLIC_SUPABASE_URL')
    supabase_key = env.get('SUPABASE_SERVICE_ROLE_KEY')

    if not supabase_url or not supabase_key:
        print("ERROR: Missing Supabase credentials in .env.local")
        return

    from supabase import create_client
    supabase = create_client(supabase_url, supabase_key)
    print(f"Connected to Supabase ({supabase_url})")

    # Load NY facility data from CSVs
    ny_by_source_id = load_ny_facility_data()

    # -----------------------------------------------------------------------
    # Fix 1: Adult Care (AH + EHP) — match ny_doh against github_assisted_living
    # -----------------------------------------------------------------------
    print("\n=== Fix 1: Adult Care (AH+EHP) — match ny_doh vs github_assisted_living ===")

    # Load ny_doh records that are assisted_living type
    print("  Loading ny_doh assisted_living records...")
    ny_doh_al = []
    offset = 0
    while True:
        result = supabase.table('facilities') \
            .select('facility_id,source,source_id,facility_name,facility_type,address_line_1,city,state,zip_code,latitude,longitude') \
            .eq('state', 'NY') \
            .eq('source', 'ny_doh') \
            .eq('facility_type', 'assisted_living') \
            .range(offset, offset + 999) \
            .execute()
        ny_doh_al.extend(result.data)
        if len(result.data) < 1000:
            break
        offset += 1000
        time.sleep(0.3)
    print(f"  Found {len(ny_doh_al)} ny_doh assisted_living records")

    # Load github_assisted_living records for NY
    print("  Loading github_assisted_living NY records...")
    github_al = []
    offset = 0
    while True:
        result = supabase.table('facilities') \
            .select('facility_id,source,source_id,facility_name,facility_type,address_line_1,city,state,zip_code,latitude,longitude') \
            .eq('state', 'NY') \
            .eq('source', 'github_assisted_living') \
            .range(offset, offset + 999) \
            .execute()
        github_al.extend(result.data)
        if len(result.data) < 1000:
            break
        offset += 1000
        time.sleep(0.3)
    print(f"  Found {len(github_al)} github_assisted_living NY records")

    # Build matching indexes from github_assisted_living
    zip_addr_index, city_name_index = build_matching_indexes(github_al)

    # Match ny_doh records against github_assisted_living
    matched = []  # (ny_doh_record, github_record, match_type)
    unmatched = []

    for ny_rec in ny_doh_al:
        match, match_type = find_match(
            ny_rec['facility_name'], ny_rec['address_line_1'],
            ny_rec['city'], ny_rec['zip_code'],
            zip_addr_index, city_name_index
        )
        if match:
            matched.append((ny_rec, match, match_type))
        else:
            unmatched.append(ny_rec)

    match_rate = 100 * len(matched) / max(len(ny_doh_al), 1)
    print(f"  Matched: {len(matched)} ({match_rate:.1f}%), Unmatched: {len(unmatched)}")

    # For each match: enrich the github_assisted_living record, then delete the ny_doh duplicate
    if matched:
        print(f"  Enriching {len(matched)} github_assisted_living records and removing duplicates...")
        enrich_count = 0
        delete_count = 0

        for ny_rec, github_rec, match_type in matched:
            source_id = ny_rec['source_id']
            ny_fac_data = ny_by_source_id.get(source_id)

            if not ny_fac_data:
                continue

            # Build enrichment fields
            update_fields = {}
            if ny_fac_data.get('operating_cert_number'):
                update_fields['license_number'] = ny_fac_data['operating_cert_number']
                update_fields['license_status'] = 'LICENSED'
            if ny_fac_data.get('bed_count'):
                update_fields['bed_count'] = ny_fac_data['bed_count']
            if ny_fac_data.get('operator_name'):
                update_fields['legal_name'] = ny_fac_data['operator_name']
            if ny_fac_data.get('ownership_type'):
                update_fields['ownership_type'] = ny_fac_data['ownership_type']
            if ny_fac_data.get('phone'):
                update_fields['phone'] = ny_fac_data['phone']
            if ny_fac_data.get('county'):
                update_fields['county'] = ny_fac_data['county']
            if ny_fac_data.get('has_alp'):
                update_fields['accepts_medicaid'] = True

            # Fill in coordinates if missing
            if not github_rec.get('latitude') and ny_fac_data.get('latitude'):
                update_fields['latitude'] = ny_fac_data['latitude']
                update_fields['longitude'] = ny_fac_data['longitude']

            # Merge raw_data (github_al records have simple raw_data)
            raw_data = build_raw_data(ny_fac_data)
            update_fields['raw_data'] = json.dumps(raw_data)

            # Update the github_assisted_living record
            try:
                supabase.table('facilities') \
                    .update(update_fields) \
                    .eq('facility_id', github_rec['facility_id']) \
                    .execute()
                enrich_count += 1
            except Exception as e:
                print(f"    ERROR enriching {github_rec['facility_id']}: {e}")

            # Delete the duplicate ny_doh record
            try:
                supabase.table('facilities') \
                    .delete() \
                    .eq('facility_id', ny_rec['facility_id']) \
                    .execute()
                delete_count += 1
            except Exception as e:
                print(f"    ERROR deleting ny_doh {ny_rec['facility_id']}: {e}")

            if enrich_count % 50 == 0 and enrich_count > 0:
                print(f"    Processed {enrich_count}/{len(matched)}...")
                time.sleep(0.2)

        print(f"  Enriched {enrich_count} github_assisted_living records")
        print(f"  Deleted {delete_count} duplicate ny_doh records")
        print(f"  Remaining genuinely new ny_doh assisted_living: {len(unmatched)}")

    # -----------------------------------------------------------------------
    # Fix 2: Home Health (CHHA) — match ny_doh against cms_home_health
    # -----------------------------------------------------------------------
    print("\n=== Fix 2: Home Health (CHHA) — match ny_doh vs cms_home_health ===")

    # Load ny_doh CHHA records (source = ny_doh, facility_type = home_health)
    # But we need to distinguish CHHA from LHCSA/LTHHCP. CHHA used source 'ny_doh'.
    # Actually, looking at the original script: CHHA source was 'ny_doh', LHCSA was 'ny_doh_lhcsa'
    # So ny_doh + home_health could be CHHA or... let's check by source_id pattern
    print("  Loading ny_doh home_health records (CHHA only)...")
    ny_doh_hh = []
    offset = 0
    while True:
        result = supabase.table('facilities') \
            .select('facility_id,source,source_id,facility_name,facility_type,address_line_1,city,state,zip_code,latitude,longitude') \
            .eq('state', 'NY') \
            .eq('source', 'ny_doh') \
            .eq('facility_type', 'home_health') \
            .range(offset, offset + 999) \
            .execute()
        ny_doh_hh.extend(result.data)
        if len(result.data) < 1000:
            break
        offset += 1000
        time.sleep(0.3)
    print(f"  Found {len(ny_doh_hh)} ny_doh home_health records")

    # Load cms_home_health records for NY
    print("  Loading cms_home_health NY records...")
    cms_hh = []
    offset = 0
    while True:
        result = supabase.table('facilities') \
            .select('facility_id,source,source_id,facility_name,facility_type,address_line_1,city,state,zip_code,latitude,longitude') \
            .eq('state', 'NY') \
            .eq('source', 'cms_home_health') \
            .range(offset, offset + 999) \
            .execute()
        cms_hh.extend(result.data)
        if len(result.data) < 1000:
            break
        offset += 1000
        time.sleep(0.3)
    print(f"  Found {len(cms_hh)} cms_home_health NY records")

    # Build matching indexes from cms_home_health
    zip_addr_index2, city_name_index2 = build_matching_indexes(cms_hh)

    # Match
    matched_hh = []
    unmatched_hh = []

    for ny_rec in ny_doh_hh:
        match, match_type = find_match(
            ny_rec['facility_name'], ny_rec['address_line_1'],
            ny_rec['city'], ny_rec['zip_code'],
            zip_addr_index2, city_name_index2
        )
        if match:
            matched_hh.append((ny_rec, match, match_type))
        else:
            unmatched_hh.append(ny_rec)

    match_rate = 100 * len(matched_hh) / max(len(ny_doh_hh), 1)
    print(f"  Matched: {len(matched_hh)} ({match_rate:.1f}%), Unmatched: {len(unmatched_hh)}")

    if matched_hh:
        print(f"  Enriching {len(matched_hh)} cms_home_health records and removing duplicates...")
        enrich_count = 0
        delete_count = 0

        for ny_rec, cms_rec, match_type in matched_hh:
            source_id = ny_rec['source_id']
            ny_fac_data = ny_by_source_id.get(source_id)

            if not ny_fac_data:
                continue

            update_fields = {}
            if ny_fac_data.get('operating_cert_number'):
                update_fields['license_number'] = ny_fac_data['operating_cert_number']
                update_fields['license_status'] = 'LICENSED'
            if ny_fac_data.get('operator_name'):
                update_fields['legal_name'] = ny_fac_data['operator_name']
            if ny_fac_data.get('ownership_type'):
                update_fields['ownership_type'] = ny_fac_data['ownership_type']
            if ny_fac_data.get('phone'):
                update_fields['phone'] = ny_fac_data['phone']
            if ny_fac_data.get('county'):
                update_fields['county'] = ny_fac_data['county']

            if not cms_rec.get('latitude') and ny_fac_data.get('latitude'):
                update_fields['latitude'] = ny_fac_data['latitude']
                update_fields['longitude'] = ny_fac_data['longitude']

            # Merge raw_data with existing CMS data
            try:
                existing = supabase.table('facilities') \
                    .select('raw_data') \
                    .eq('facility_id', cms_rec['facility_id']) \
                    .execute()
                existing_raw = existing.data[0].get('raw_data') if existing.data else None
                ny_raw = build_raw_data(ny_fac_data)
                if existing_raw and isinstance(existing_raw, dict):
                    merged = existing_raw.copy()
                    merged.update(ny_raw)
                    update_fields['raw_data'] = json.dumps(merged)
                else:
                    update_fields['raw_data'] = json.dumps(ny_raw)
            except:
                update_fields['raw_data'] = json.dumps(build_raw_data(ny_fac_data))

            # Update CMS record
            try:
                supabase.table('facilities') \
                    .update(update_fields) \
                    .eq('facility_id', cms_rec['facility_id']) \
                    .execute()
                enrich_count += 1
            except Exception as e:
                print(f"    ERROR enriching {cms_rec['facility_id']}: {e}")

            # Delete duplicate ny_doh record
            try:
                supabase.table('facilities') \
                    .delete() \
                    .eq('facility_id', ny_rec['facility_id']) \
                    .execute()
                delete_count += 1
            except Exception as e:
                print(f"    ERROR deleting {ny_rec['facility_id']}: {e}")

            if enrich_count % 50 == 0 and enrich_count > 0:
                print(f"    Processed {enrich_count}/{len(matched_hh)}...")
                time.sleep(0.2)

        print(f"  Enriched {enrich_count} cms_home_health records")
        print(f"  Deleted {delete_count} duplicate ny_doh records")
        print(f"  Remaining genuinely new ny_doh home_health: {len(unmatched_hh)}")

    # -----------------------------------------------------------------------
    # Summary
    # -----------------------------------------------------------------------
    print("\n" + "=" * 60)
    print("FIX COMPLETE — SUMMARY")
    print("=" * 60)
    al_matched = len(matched) if matched else 0
    al_unmatched = len(unmatched)
    hh_matched = len(matched_hh) if matched_hh else 0
    hh_unmatched = len(unmatched_hh)

    print(f"\n  Adult Care (AH+EHP):")
    print(f"    github_assisted_living records enriched: {al_matched}")
    print(f"    Duplicate ny_doh records removed: {al_matched}")
    print(f"    Genuinely new ny_doh records remaining: {al_unmatched}")
    print(f"\n  Home Health (CHHA):")
    print(f"    cms_home_health records enriched: {hh_matched}")
    print(f"    Duplicate ny_doh records removed: {hh_matched}")
    print(f"    Genuinely new ny_doh records remaining: {hh_unmatched}")
    print(f"\n  Total records enriched (additional): {al_matched + hh_matched}")
    print(f"  Total duplicates removed: {al_matched + hh_matched}")
    print(f"  Net new records that remain: {al_unmatched + hh_unmatched}")


if __name__ == '__main__':
    main()
