#!/usr/bin/env python3
"""
Step 9: Import New York Health Facility data into OurTurnToCare facilities table.

Sources:
  - Health Facility General Information (vn5v-hh5r): 5,967 facility records
  - Health Facility Certification Information (2g9y-7kqm): 45,457 certification rows

What this script does:
  Phase 1: Load and join NY datasets (General Info + Certification bed/service data)
  Phase 2: Load existing NY records from Supabase, build matching indexes
  Phase 3: Process Adult Care facilities (AH + EHP) — merge with existing github_al records
  Phase 4: Process Nursing Homes (NH) — enrich existing cms_nursing records
  Phase 5: Process Home Health (CHHA) — enrich existing cms_homehealth records
  Phase 6: Process Hospice (HSPC) — enrich existing cms_hospice records
  Phase 7: Insert Licensed Home Care Services Agencies (LHCSA) as new records
  Phase 8: Insert Adult Day Health Care (ADHCP) as new adult_day records
  Phase 9: Insert Long Term Home Health Care (LTHHCP) as new home_health records

Follows the merge pattern established in Steps 7 (California) and 8 (Texas):
  - Exact zip+address match first, fuzzy name+city fallback (65% bigram threshold)
  - Matches: UPDATE/enrich with NY state data
  - Non-matches: INSERT as new records
  - Deduplicate before batch upsert

Usage:
  python3 import-newyork-step9.py
"""

import csv
import os
import re
import json
import time
import math
from collections import defaultdict

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

GENERAL_INFO_CSV = "/Users/JoelHarvey/our-turn-to-care/Health_Facility_General_Information.csv"
CERTIFICATION_CSV = "/Users/JoelHarvey/our-turn-to-care/Health_Facility_Certification_Information.csv"
ENV_FILE = ".env.local"

BATCH_SIZE = 200  # Supabase upsert batch size (conservative for free tier)

# Facility types we process and their mapping to our facility_type enum
NY_TYPE_MAP = {
    'AH':     'assisted_living',   # Adult Home
    'EHP':    'assisted_living',   # Enriched Housing Program
    'NH':     'nursing_home',      # Residential Health Care Facility - SNF
    'CHHA':   'home_health',       # Certified Home Health Agency
    'HSPC':   'hospice',           # Hospice
    'LHCSA':  'home_health',       # Licensed Home Care Services Agency
    'ADHCP':  'adult_day',         # Adult Day Health Care Program
    'LTHHCP': 'home_health',       # Long Term Home Health Care Program
}

# Which existing sources to match against for each NY type
MATCH_SOURCES = {
    'AH':   ['github_al', 'ca_ccl', 'ca_alw', 'tx_hhsc'],  # assisted living base layer
    'EHP':  ['github_al', 'ca_ccl', 'ca_alw', 'tx_hhsc'],
    'NH':   ['cms_nursing'],
    'CHHA': ['cms_homehealth'],
    'HSPC': ['cms_hospice'],
    'LHCSA':  [],   # No existing source to match — all new
    'ADHCP':  [],   # No existing source to match — all new (like TX DAHS)
    'LTHHCP': [],   # No existing source to match — all new
}

# Source tags for new records
NY_SOURCE_MAP = {
    'AH':     'ny_doh',
    'EHP':    'ny_doh',
    'NH':     'ny_doh',
    'CHHA':   'ny_doh',
    'HSPC':   'ny_doh',
    'LHCSA':  'ny_doh_lhcsa',
    'ADHCP':  'ny_doh_adhcp',
    'LTHHCP': 'ny_doh_lthhcp',
}

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def load_env(filepath):
    """Read .env.local and return dict of key=value pairs."""
    env = {}
    if not os.path.exists(filepath):
        # Try parent directories
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
    """Normalize address for matching: uppercase, remove punctuation, standardize abbreviations."""
    if not addr:
        return ''
    addr = addr.upper().strip()
    # Remove punctuation
    addr = re.sub(r'[.,#\-/]', ' ', addr)
    # Standardize common abbreviations
    replacements = {
        'STREET': 'ST', 'AVENUE': 'AVE', 'BOULEVARD': 'BLVD', 'DRIVE': 'DR',
        'ROAD': 'RD', 'LANE': 'LN', 'COURT': 'CT', 'PLACE': 'PL',
        'CIRCLE': 'CIR', 'TERRACE': 'TER', 'HIGHWAY': 'HWY', 'PARKWAY': 'PKWY',
        'NORTH': 'N', 'SOUTH': 'S', 'EAST': 'E', 'WEST': 'W',
        'SUITE': 'STE', 'APARTMENT': 'APT', 'BUILDING': 'BLDG',
        'FLOOR': 'FL', 'ROOM': 'RM', 'UNIT': 'UNIT',
    }
    words = addr.split()
    normalized = []
    for w in words:
        normalized.append(replacements.get(w, w))
    addr = ' '.join(normalized)
    # Collapse whitespace
    addr = re.sub(r'\s+', ' ', addr).strip()
    return addr


def normalize_name(name):
    """Normalize facility name for matching."""
    if not name:
        return ''
    name = name.upper().strip()
    # Remove punctuation
    name = re.sub(r'[.,\-\'\"#/&()]', ' ', name)
    # Remove common suffixes that vary
    for suffix in ['LLC', 'INC', 'CORP', 'LP', 'LLP', 'LTD']:
        name = re.sub(r'\b' + suffix + r'\b', '', name)
    name = re.sub(r'\s+', ' ', name).strip()
    return name


def bigram_similarity(s1, s2):
    """Calculate bigram (character pair) similarity between two strings. Returns 0.0-1.0."""
    if not s1 or not s2:
        return 0.0
    s1 = s1.lower()
    s2 = s2.lower()
    if s1 == s2:
        return 1.0

    def get_bigrams(s):
        return set(s[i:i+2] for i in range(len(s)-1))

    b1 = get_bigrams(s1)
    b2 = get_bigrams(s2)
    if not b1 or not b2:
        return 0.0
    intersection = b1 & b2
    return 2.0 * len(intersection) / (len(b1) + len(b2))


BIGRAM_THRESHOLD = 0.65


def clean_zip(z):
    """Clean zip code to 5 digits."""
    if not z:
        return ''
    z = str(z).strip()
    # Take first 5 digits
    match = re.match(r'(\d{5})', z)
    return match.group(1) if match else z


def clean_phone(p):
    """Clean phone to digits only."""
    if not p:
        return None
    digits = re.sub(r'\D', '', str(p))
    if len(digits) == 10:
        return digits
    if len(digits) == 11 and digits[0] == '1':
        return digits[1:]
    return digits if digits else None


def safe_float(val):
    """Safely convert to float, return None if invalid."""
    if val is None:
        return None
    try:
        v = float(str(val).strip())
        return v if not math.isnan(v) else None
    except (ValueError, TypeError):
        return None


def safe_int(val):
    """Safely convert to int, return None if invalid."""
    if val is None:
        return None
    try:
        return int(float(str(val).strip()))
    except (ValueError, TypeError):
        return None


# ---------------------------------------------------------------------------
# Phase 1: Load and join NY datasets
# ---------------------------------------------------------------------------

def load_general_info():
    """Load the Health Facility General Information CSV."""
    print("\n=== Phase 1: Loading NY datasets ===")
    facilities = {}
    with open(GENERAL_INFO_CSV, 'r', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        for row in reader:
            fac_id = row['Facility ID'].strip()
            short_desc = row['Short Description'].strip()
            # Only process types we care about
            if short_desc not in NY_TYPE_MAP:
                continue
            facilities[fac_id] = {
                'ny_facility_id': fac_id,
                'facility_name': row['Facility Name'].strip(),
                'short_description': short_desc,
                'description': row['Description'].strip(),
                'open_date': row.get('Facility Open Date', '').strip(),
                'address_line_1': row['Facility Address 1'].strip(),
                'address_line_2': row.get('Facility Address 2', '').strip(),
                'city': row['Facility City'].strip(),
                'state': 'NY',
                'zip_code': clean_zip(row['Facility Zip Code']),
                'phone': clean_phone(row.get('Facility Phone Number', '')),
                'fax': row.get('Facility Fax Number', '').strip() or None,
                'website': row.get('Facility Website', '').strip() or None,
                'county_code': row.get('Facility County Code', '').strip(),
                'county': row.get('Facility County', '').strip(),
                'regional_office_id': row.get('Regional Office ID', '').strip(),
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
                # Will be populated from certification data
                'bed_count': None,
                'certifications': [],
                'services': [],
            }

    print(f"  Loaded {len(facilities)} facilities from General Information")

    # Count by type
    from collections import Counter
    type_counts = Counter(f['short_description'] for f in facilities.values())
    for t, c in sorted(type_counts.items(), key=lambda x: -x[1]):
        print(f"    {t}: {c}")

    return facilities


def load_certification_info(facilities):
    """Load Certification Information and join to facilities by Facility ID."""
    bed_data = defaultdict(list)
    service_data = defaultdict(list)

    with open(CERTIFICATION_CSV, 'r', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        for row in reader:
            fac_id = row['Facility ID'].strip()
            if fac_id not in facilities:
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
                bed_data[fac_id].append(entry)
            elif attr_type == 'Service':
                service_data[fac_id].append(entry)

    # Merge bed and service data into facilities
    enriched_count = 0
    for fac_id, fac in facilities.items():
        if fac_id in bed_data:
            fac['certifications'] = bed_data[fac_id]
            enriched_count += 1
            # Extract overall capacity as bed_count
            for bed in bed_data[fac_id]:
                if bed['attribute_value'] == 'Overall Capacity (AH/EHP)':
                    fac['bed_count'] = safe_int(bed['measure_value'])
                    break
                elif bed['attribute_value'] == 'RHCF':
                    fac['bed_count'] = safe_int(bed['measure_value'])
                    break
            # If no overall capacity found, sum up
            if fac['bed_count'] is None:
                vals = [safe_int(b['measure_value']) for b in bed_data[fac_id] if safe_int(b['measure_value'])]
                if vals:
                    fac['bed_count'] = max(vals)  # Use max as approximation
        if fac_id in service_data:
            fac['services'] = service_data[fac_id]

    print(f"  Joined certification data: {enriched_count} facilities have bed/capacity data")

    # Identify special designations
    alp_count = 0
    alr_count = 0
    dementia_count = 0
    for fac_id, fac in facilities.items():
        fac['has_alp'] = False
        fac['has_alr'] = False
        fac['has_ealr'] = False
        fac['has_snalr'] = False
        fac['has_dementia'] = False
        fac['alp_beds'] = None
        fac['alr_beds'] = None
        fac['dementia_beds'] = None

        for cert in fac.get('certifications', []):
            val = cert['attribute_value']
            measure = safe_int(cert['measure_value'])
            if val == 'Assisted Living Program (ALP)':
                fac['has_alp'] = True
                fac['alp_beds'] = measure
                alp_count += 1
            elif val == 'Assisted Living Residence (ALR)':
                fac['has_alr'] = True
                fac['alr_beds'] = measure
                alr_count += 1
            elif val == 'Enhanced Assisted Living Residence (EALR)':
                fac['has_ealr'] = True
            elif val == 'Special Needs Assisted Living Residence (SNALR)':
                fac['has_snalr'] = True
            elif val == 'Dementia':
                fac['has_dementia'] = True
                fac['dementia_beds'] = measure
                dementia_count += 1

    print(f"  Special designations: {alp_count} ALP (Medicaid), {alr_count} ALR, {dementia_count} Dementia")

    return facilities


# ---------------------------------------------------------------------------
# Phase 2: Load existing NY records from Supabase
# ---------------------------------------------------------------------------

def load_existing_ny_records(supabase):
    """Load all existing NY facility records from Supabase, paginated."""
    print("\n=== Phase 2: Loading existing NY records from Supabase ===")

    all_records = []
    page_size = 1000
    offset = 0

    while True:
        result = supabase.table('facilities') \
            .select('facility_id,source,source_id,facility_name,facility_type,address_line_1,city,state,zip_code,latitude,longitude,is_active') \
            .eq('state', 'NY') \
            .range(offset, offset + page_size - 1) \
            .execute()

        batch = result.data
        all_records.extend(batch)

        if len(batch) < page_size:
            break
        offset += page_size
        time.sleep(0.3)  # Be gentle on free tier

    print(f"  Loaded {len(all_records)} existing NY records")

    # Count by source
    from collections import Counter
    source_counts = Counter(r['source'] for r in all_records)
    for s, c in sorted(source_counts.items(), key=lambda x: -x[1]):
        print(f"    {s}: {c}")

    return all_records


def build_matching_indexes(records):
    """Build zip+address and city+name matching indexes from existing records."""
    zip_addr_index = {}   # (zip, normalized_address) -> record
    city_name_index = {}  # (city_upper, normalized_name) -> record

    for rec in records:
        addr = normalize_address(rec.get('address_line_1', ''))
        zipcode = clean_zip(rec.get('zip_code', ''))
        city = (rec.get('city', '') or '').upper().strip()
        name = normalize_name(rec.get('facility_name', ''))

        if zipcode and addr:
            key = (zipcode, addr)
            zip_addr_index[key] = rec

        if city and name:
            key = (city, name)
            city_name_index[key] = rec

    return zip_addr_index, city_name_index


def find_match(fac, zip_addr_index, city_name_index, allowed_sources=None):
    """Try to match a NY facility against existing records.

    Strategy:
    1. Exact zip + normalized address match
    2. Fuzzy name + city match (65% bigram threshold)

    If allowed_sources is provided, only match against records from those sources.
    """
    addr = normalize_address(fac['address_line_1'])
    zipcode = fac['zip_code']
    city = (fac['city'] or '').upper().strip()
    name = normalize_name(fac['facility_name'])

    # Strategy 1: Exact zip + address
    if zipcode and addr:
        key = (zipcode, addr)
        if key in zip_addr_index:
            match = zip_addr_index[key]
            if allowed_sources is None or match['source'] in allowed_sources:
                return match, 'zip_address'

    # Strategy 2: Fuzzy name + city
    if city and name:
        best_match = None
        best_score = 0
        for (idx_city, idx_name), rec in city_name_index.items():
            if allowed_sources and rec['source'] not in allowed_sources:
                continue
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
# Build Supabase records
# ---------------------------------------------------------------------------

def build_raw_data(fac):
    """Build the raw_data JSONB from NY facility data."""
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

    # Add certification data
    if fac.get('certifications'):
        raw['ny_doh']['certifications'] = fac['certifications']
    if fac.get('services'):
        raw['ny_doh']['services'] = fac['services']

    # Add special designation flags
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


def build_enrichment_fields(fac):
    """Build the fields to UPDATE on matched existing records."""
    fields = {}

    # License / certificate info
    if fac.get('operating_cert_number'):
        fields['license_number'] = fac['operating_cert_number']
        fields['license_status'] = 'LICENSED'

    # Bed count
    if fac.get('bed_count'):
        fields['bed_count'] = fac['bed_count']

    # Legal name (operator)
    if fac.get('operator_name'):
        fields['legal_name'] = fac['operator_name']

    # Ownership type
    if fac.get('ownership_type'):
        fields['ownership_type'] = fac['ownership_type']

    # Phone
    if fac.get('phone'):
        fields['phone'] = fac['phone']

    # Website → email field not available, but website is

    # County
    if fac.get('county'):
        fields['county'] = fac['county']

    # Coordinates (fill in if existing record is missing them)
    if fac.get('latitude') and fac.get('longitude'):
        fields['_ny_latitude'] = fac['latitude']
        fields['_ny_longitude'] = fac['longitude']

    # ALP = Medicaid eligible
    if fac.get('has_alp'):
        fields['accepts_medicaid'] = True

    # Raw data
    fields['raw_data'] = build_raw_data(fac)

    return fields


def build_new_record(fac, source_tag):
    """Build a complete new facility record for INSERT."""
    return {
        'source': source_tag,
        'source_id': f"NY-{fac['ny_facility_id']}",
        'facility_name': fac['facility_name'] or 'Unknown',
        'facility_type': NY_TYPE_MAP[fac['short_description']],
        'address_line_1': fac['address_line_1'] or 'Unknown',
        'city': fac['city'] or 'Unknown',
        'state': 'NY',
        'zip_code': fac['zip_code'] or '00000',
        'county': fac.get('county') or None,
        'phone': fac.get('phone') or None,
        'latitude': fac.get('latitude'),
        'longitude': fac.get('longitude'),
        'bed_count': fac.get('bed_count'),
        'license_number': fac.get('operating_cert_number'),
        'license_status': 'LICENSED',
        'legal_name': fac.get('operator_name'),
        'ownership_type': fac.get('ownership_type'),
        'is_active': True,
        'accepts_medicaid': fac.get('has_alp', False) or None,
        'raw_data': build_raw_data(fac),
    }


# ---------------------------------------------------------------------------
# Phase 3-9: Process each facility type
# ---------------------------------------------------------------------------

def process_facility_group(supabase, facilities, existing_records, group_types, group_label, allowed_match_sources):
    """Process a group of NY facility types: match, enrich, or insert."""

    print(f"\n=== Processing {group_label} ===")

    # Filter facilities for this group
    group_facs = {fid: f for fid, f in facilities.items() if f['short_description'] in group_types}
    print(f"  NY records to process: {len(group_facs)}")

    if not group_facs:
        return {'matched': 0, 'new': 0, 'no_match': 0}

    # Filter existing records by allowed sources
    if allowed_match_sources:
        match_records = [r for r in existing_records if r['source'] in allowed_match_sources]
        print(f"  Existing records to match against ({', '.join(allowed_match_sources)}): {len(match_records)}")
    else:
        match_records = []
        print(f"  No existing sources to match — all records will be inserted as new")

    # Build matching indexes
    zip_addr_index, city_name_index = build_matching_indexes(match_records)

    # Process each facility
    matched_updates = []  # (existing_facility_id, enrichment_fields)
    new_inserts = []       # new record dicts
    match_count = 0
    no_match_count = 0

    for fac_id, fac in group_facs.items():
        if allowed_match_sources:
            match, match_type = find_match(fac, zip_addr_index, city_name_index, allowed_match_sources)
        else:
            match = None
            match_type = None

        if match:
            # Enrich existing record
            enrichment = build_enrichment_fields(fac)
            matched_updates.append((match['facility_id'], enrichment, match.get('latitude'), match.get('longitude')))
            match_count += 1
        else:
            # Insert as new
            source_tag = NY_SOURCE_MAP[fac['short_description']]
            new_record = build_new_record(fac, source_tag)
            new_inserts.append(new_record)
            no_match_count += 1

    if allowed_match_sources:
        match_rate = 100 * match_count / max(len(group_facs), 1)
        print(f"  Match results: {match_count} matched ({match_rate:.1f}%), {no_match_count} new")
    else:
        print(f"  All {no_match_count} records will be inserted as new")

    # Execute enrichment updates
    if matched_updates:
        print(f"  Enriching {len(matched_updates)} existing records...")

        # For CMS records, we need to MERGE raw_data (preserve existing CMS data).
        # For github_al records, replacing raw_data is fine.
        # Strategy: fetch existing raw_data for matched records, merge in ny_doh key.
        is_cms_source = any(s.startswith('cms_') for s in allowed_match_sources)
        if is_cms_source:
            print(f"    (Fetching existing raw_data to merge — preserving CMS data)")

        update_count = 0
        for facility_id, enrichment, existing_lat, existing_lon in matched_updates:
            update_fields = {}

            for key, val in enrichment.items():
                if key.startswith('_ny_'):
                    continue  # Handle coordinates separately
                if key == 'raw_data':
                    continue  # Handle raw_data merge separately below
                elif val is not None:
                    update_fields[key] = val

            # Only fill in coordinates if existing record is missing them
            if not existing_lat and enrichment.get('_ny_latitude'):
                update_fields['latitude'] = enrichment['_ny_latitude']
                update_fields['longitude'] = enrichment['_ny_longitude']

            # Merge raw_data: fetch existing, add ny_doh key, write back
            ny_raw_data = enrichment.get('raw_data', {})
            if is_cms_source:
                try:
                    existing = supabase.table('facilities') \
                        .select('raw_data') \
                        .eq('facility_id', facility_id) \
                        .execute()
                    existing_raw = existing.data[0].get('raw_data') if existing.data else None
                    if existing_raw and isinstance(existing_raw, dict):
                        # Merge: keep existing keys, add ny_doh
                        merged = existing_raw.copy()
                        merged.update(ny_raw_data)
                        update_fields['raw_data'] = json.dumps(merged)
                    else:
                        update_fields['raw_data'] = json.dumps(ny_raw_data)
                except Exception as e:
                    # If fetch fails, just use NY data
                    update_fields['raw_data'] = json.dumps(ny_raw_data)
            else:
                update_fields['raw_data'] = json.dumps(ny_raw_data)

            if update_fields:
                try:
                    supabase.table('facilities') \
                        .update(update_fields) \
                        .eq('facility_id', facility_id) \
                        .execute()
                    update_count += 1
                except Exception as e:
                    print(f"    ERROR updating {facility_id}: {e}")

            if update_count % 50 == 0 and update_count > 0:
                print(f"    Updated {update_count}/{len(matched_updates)}...")
                time.sleep(0.2)

        print(f"  Enriched {update_count} existing records")

    # Execute new inserts (batch upsert)
    if new_inserts:
        print(f"  Inserting {len(new_inserts)} new records...")

        # Deduplicate by source_id
        seen_ids = set()
        deduped = []
        for rec in new_inserts:
            sid = (rec['source'], rec['source_id'])
            if sid not in seen_ids:
                seen_ids.add(sid)
                deduped.append(rec)
            else:
                print(f"    DEDUP: Skipping duplicate {sid}")

        insert_count = 0
        for i in range(0, len(deduped), BATCH_SIZE):
            batch = deduped[i:i+BATCH_SIZE]
            try:
                # Convert raw_data to JSON string for Supabase
                for rec in batch:
                    if isinstance(rec.get('raw_data'), dict):
                        rec['raw_data'] = json.dumps(rec['raw_data'])
                    # Clean None coordinates
                    if rec.get('latitude') is None:
                        rec.pop('latitude', None)
                    if rec.get('longitude') is None:
                        rec.pop('longitude', None)
                    # Remove None accepts_medicaid
                    if rec.get('accepts_medicaid') is None:
                        rec.pop('accepts_medicaid', None)

                supabase.table('facilities') \
                    .upsert(batch, on_conflict='source,source_id') \
                    .execute()
                insert_count += len(batch)
                print(f"    Inserted batch: {insert_count}/{len(deduped)}")
            except Exception as e:
                print(f"    ERROR inserting batch at offset {i}: {e}")
                # Try one by one
                for rec in batch:
                    try:
                        supabase.table('facilities') \
                            .upsert([rec], on_conflict='source,source_id') \
                            .execute()
                        insert_count += 1
                    except Exception as e2:
                        print(f"      ERROR inserting {rec.get('source_id')}: {e2}")

            time.sleep(0.3)

        print(f"  Inserted {insert_count} new records")

    return {
        'matched': match_count,
        'new': len(new_inserts),
        'no_match': no_match_count,
    }


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    print("=" * 60)
    print("Step 9: New York DOH Facility Data Import")
    print("=" * 60)

    # Load environment
    env = load_env(ENV_FILE)
    supabase_url = env.get('NEXT_PUBLIC_SUPABASE_URL')
    supabase_key = env.get('SUPABASE_SERVICE_ROLE_KEY')

    if not supabase_url or not supabase_key:
        print("ERROR: Missing Supabase credentials in .env.local")
        print("  Need: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY")
        return

    print(f"Supabase URL: {supabase_url}")

    # Connect to Supabase
    from supabase import create_client
    supabase = create_client(supabase_url, supabase_key)
    print("Connected to Supabase")

    # Phase 1: Load and join NY datasets
    facilities = load_general_info()
    facilities = load_certification_info(facilities)

    # Phase 2: Load existing NY records
    existing_records = load_existing_ny_records(supabase)

    # Phase 3: Adult Care (AH + EHP) — merge with github_al
    results_ac = process_facility_group(
        supabase, facilities, existing_records,
        group_types=['AH', 'EHP'],
        group_label='Phase 3: Adult Care (AH + EHP) — merge with github_al',
        allowed_match_sources=['github_al']
    )

    # Reload existing records (now includes any new inserts from Phase 3)
    existing_records = load_existing_ny_records(supabase)

    # Phase 4: Nursing Homes (NH) — enrich cms_nursing
    results_nh = process_facility_group(
        supabase, facilities, existing_records,
        group_types=['NH'],
        group_label='Phase 4: Nursing Homes — enrich cms_nursing',
        allowed_match_sources=['cms_nursing']
    )

    # Phase 5: Home Health (CHHA) — enrich cms_homehealth
    results_chha = process_facility_group(
        supabase, facilities, existing_records,
        group_types=['CHHA'],
        group_label='Phase 5: Certified Home Health (CHHA) — enrich cms_homehealth',
        allowed_match_sources=['cms_homehealth']
    )

    # Phase 6: Hospice — enrich cms_hospice
    results_hspc = process_facility_group(
        supabase, facilities, existing_records,
        group_types=['HSPC'],
        group_label='Phase 6: Hospice — enrich cms_hospice',
        allowed_match_sources=['cms_hospice']
    )

    # Phase 7: LHCSA — all new (Licensed Home Care Services Agencies)
    results_lhcsa = process_facility_group(
        supabase, facilities, existing_records,
        group_types=['LHCSA'],
        group_label='Phase 7: Licensed Home Care Services (LHCSA) — all new',
        allowed_match_sources=[]
    )

    # Phase 8: ADHCP — all new (Adult Day Health Care)
    results_adhcp = process_facility_group(
        supabase, facilities, existing_records,
        group_types=['ADHCP'],
        group_label='Phase 8: Adult Day Health Care (ADHCP) — all new',
        allowed_match_sources=[]
    )

    # Phase 9: LTHHCP — all new (Long Term Home Health Care)
    results_lthhcp = process_facility_group(
        supabase, facilities, existing_records,
        group_types=['LTHHCP'],
        group_label='Phase 9: Long Term Home Health Care (LTHHCP) — all new',
        allowed_match_sources=[]
    )

    # ---------------------------------------------------------------------------
    # Summary
    # ---------------------------------------------------------------------------
    print("\n" + "=" * 60)
    print("STEP 9 COMPLETE — SUMMARY")
    print("=" * 60)

    all_results = {
        'Adult Care (AH+EHP)': results_ac,
        'Nursing Homes (NH)': results_nh,
        'Home Health (CHHA)': results_chha,
        'Hospice (HSPC)': results_hspc,
        'Licensed Home Care (LHCSA)': results_lhcsa,
        'Adult Day Health (ADHCP)': results_adhcp,
        'Long Term Home Health (LTHHCP)': results_lthhcp,
    }

    total_matched = 0
    total_new = 0

    print(f"\n{'Category':<35} {'Matched':>8} {'New':>8}")
    print("-" * 55)
    for label, res in all_results.items():
        print(f"{label:<35} {res['matched']:>8} {res['new']:>8}")
        total_matched += res['matched']
        total_new += res['new']

    print("-" * 55)
    print(f"{'TOTAL':<35} {total_matched:>8} {total_new:>8}")
    print(f"\nTotal existing records enriched: {total_matched}")
    print(f"Total new records inserted: {total_new}")
    print(f"Grand total NY records affected: {total_matched + total_new}")


if __name__ == '__main__':
    main()