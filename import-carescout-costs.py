#!/usr/bin/env python3
"""Step 6: Import CareScout 2025 Cost of Care data into Supabase.

Reads carescout-cost-of-care-2025.json and upserts into cost_of_care.

PREREQS: 1) Run SQL in Supabase first  2) .env.local  3) pip3 install supabase
USAGE: python3 import-carescout-costs.py
"""

import json, os, sys

def load_env(filepath=".env.local"):
    env = {}
    if not os.path.exists(filepath):
        print("ERROR: " + filepath + " not found.")
        sys.exit(1)
    with open(filepath, "r") as f:
        for line in f:
            line = line.strip()
            if "=" in line and not line.startswith("#"):
                key, value = line.split("=", 1)
                env[key.strip()] = value.strip().strip('"').strip("'")
    return env

print("Loading credentials...")
env = load_env()
SUPABASE_URL = env.get("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_KEY = env.get("SUPABASE_SERVICE_ROLE_KEY")
if not SUPABASE_URL or not SUPABASE_KEY:
    print("ERROR: Missing SUPABASE credentials in .env.local")
    sys.exit(1)

from supabase import create_client
print("Connecting to Supabase: " + SUPABASE_URL)
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

JSON_FILE = "carescout-cost-of-care-2025.json"
if not os.path.exists(JSON_FILE):
    print("ERROR: " + JSON_FILE + " not found.")
    sys.exit(1)

print("Reading " + JSON_FILE + "...")
with open(JSON_FILE, "r") as f:
    raw_rows = json.load(f)
print("  Loaded " + str(len(raw_rows)) + " rows")

def safe_int(value):
    if value is None: return None
    try: return int(value)
    except (ValueError, TypeError): return None

def transform_row(r):
    ac = r.get("annual_costs", {})
    mc = r.get("monthly_costs", {})
    dc = r.get("daily_costs", {})
    hc = r.get("hourly_costs", {})
    gr = r.get("annual_growth_rates", {})
    level = r.get("_level", "msa")
    return {
        "level": level,
        "state_code": r.get("state_code", ""),
        "state_name": r.get("state_name", ""),
        "area_name": r.get("area_name") if level == "msa" else None,
        "full_name": r.get("full_name", ""),
        "year": safe_int(r.get("year", 2025)),
        "annual_nursing_home_private": safe_int(ac.get("nursing_home_private")),
        "annual_nursing_home_semi_private": safe_int(ac.get("nursing_home_semi_private")),
        "annual_assisted_living": safe_int(ac.get("assisted_living")),
        "annual_adult_day_care": safe_int(ac.get("adult_day_care")),
        "annual_home_care_services": safe_int(ac.get("home_care_services")),
        "annual_skilled_nursing_by_hours": safe_int(ac.get("skilled_nursing_by_hours")),
        "annual_skilled_nursing_by_visits": safe_int(ac.get("skilled_nursing_by_visits")),
        "monthly_nursing_home_private": safe_int(mc.get("nursing_home_private")),
        "monthly_nursing_home_semi_private": safe_int(mc.get("nursing_home_semi_private")),
        "monthly_assisted_living": safe_int(mc.get("assisted_living")),
        "monthly_adult_day_care": safe_int(mc.get("adult_day_care")),
        "monthly_home_care_services": safe_int(mc.get("home_care_services")),
        "monthly_skilled_nursing_by_hours": safe_int(mc.get("skilled_nursing_by_hours")),
        "monthly_skilled_nursing_by_visits": safe_int(mc.get("skilled_nursing_by_visits")),
        "daily_nursing_home_private": safe_int(dc.get("nursing_home_private")),
        "daily_nursing_home_semi_private": safe_int(dc.get("nursing_home_semi_private")),
        "daily_assisted_living": safe_int(dc.get("assisted_living")),
        "daily_adult_day_care": safe_int(dc.get("adult_day_care")),
        "daily_home_care_services": safe_int(dc.get("home_care_services")),
        "hourly_home_care_services": safe_int(hc.get("home_care_services")),
        "hourly_skilled_nursing_by_hours": safe_int(hc.get("skilled_nursing_by_hours")),
        "hourly_skilled_nursing_by_visits": safe_int(hc.get("skilled_nursing_by_visits")),
        "growth_nursing_home_private": safe_int(gr.get("nursing_home_private")),
        "growth_nursing_home_semi_private": safe_int(gr.get("nursing_home_semi_private")),
        "growth_assisted_living": safe_int(gr.get("assisted_living")),
        "growth_adult_day_care": safe_int(gr.get("adult_day_care")),
        "growth_home_care_services": safe_int(gr.get("home_care_services")),
        "growth_skilled_nursing_by_hours": safe_int(gr.get("skilled_nursing_by_hours")),
        "growth_skilled_nursing_by_visits": safe_int(gr.get("skilled_nursing_by_visits")),
        "raw_data": {k: v for k, v in r.items() if k not in ("cities", "_level")},
    }

print("Transforming rows...")
rows = [transform_row(r) for r in raw_rows]
print("  " + str(len(rows)) + " rows ready")

# Deduplicate
seen = {}
for row in rows:
    key = (row["state_code"], row["full_name"], row["year"])
    seen[key] = row
rows = list(seen.values())
print("  " + str(len(rows)) + " after dedup")

# Upsert in batches
BATCH_SIZE = 100
total = 0
print("Upserting " + str(len(rows)) + " rows into cost_of_care...")
for i in range(0, len(rows), BATCH_SIZE):
    batch = rows[i:i + BATCH_SIZE]
    try:
        result = supabase.table("cost_of_care").upsert(
            batch, on_conflict="state_code,full_name,year"
        ).execute()
        count = len(result.data) if result.data else 0
        total += count
        bn = i // BATCH_SIZE + 1
        print("  Batch " + str(bn) + ": " + str(count) + " rows")
    except Exception as e:
        bn = i // BATCH_SIZE + 1
        print("  ERROR batch " + str(bn) + ": " + str(e))

print("Total upserted: " + str(total))

# Verify
result = supabase.table("cost_of_care").select("id", count="exact").execute()
db_count = result.count if result.count is not None else len(result.data)
print("Rows in cost_of_care: " + str(db_count))

# Sample
sample = supabase.table("cost_of_care").select(
    "state_code,full_name,level,monthly_assisted_living,monthly_nursing_home_private"
).eq("state_code", "TX").order("level", desc=True).limit(5).execute()
print("\nSample (Texas):")
for row in sample.data:
    al = str(row.get("monthly_assisted_living") or "N/A")
    nh = str(row.get("monthly_nursing_home_private") or "N/A")
    print("  " + row["level"] + " | " + row["full_name"][:45] + " | AL: $" + al + " | NH: $" + nh)

print("\nDONE!")
