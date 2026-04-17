-- ============================================================
-- Texas City Data Cleanup
-- Run these in Supabase SQL Editor to fix known bad city names.
-- ============================================================

-- INVESTIGATE first (read-only checks):

-- Verify each issue exists before running UPDATEs
SELECT city, COUNT(*) AS facility_count
FROM facilities
WHERE state = 'TX' AND is_active = true
  AND city IN (
    '1205 Santa Fe Dr', 'Corpus Chrisi', 'Grand Paririe', 'Grand Prarie',
    'Ft Worth', 'Ft. Worth', 'Gainseville', 'Carrollto', 'No Richland Hills',
    'Sugarland', 'Villa Nueva'
  )
  OR TRIM(city) = 'Farmers Branch,'
  OR TRIM(city) ILIKE 'mckinney%'
GROUP BY city
ORDER BY city;

-- Investigate the address-as-city entry
SELECT facility_id, facility_name, city, address_line_1, zip_code
FROM facilities
WHERE state = 'TX' AND city = '1205 Santa Fe Dr';


-- ============================================================
-- FIX QUERIES — run after verifying above
-- ============================================================

-- Typo: Corpus Christi
UPDATE facilities
SET city = 'Corpus Christi'
WHERE state = 'TX' AND city = 'Corpus Chrisi';

-- Typo: Grand Prairie (two variants)
UPDATE facilities
SET city = 'Grand Prairie'
WHERE state = 'TX' AND city IN ('Grand Paririe', 'Grand Prarie');

-- Consolidate: Fort Worth
UPDATE facilities
SET city = 'Fort Worth'
WHERE state = 'TX' AND city IN ('Ft Worth', 'Ft. Worth');

-- Trailing comma: Farmers Branch
UPDATE facilities
SET city = 'Farmers Branch'
WHERE state = 'TX' AND TRIM(city) = 'Farmers Branch,';

-- Typo: Gainesville
UPDATE facilities
SET city = 'Gainesville'
WHERE state = 'TX' AND city = 'Gainseville';

-- Hidden Unicode / case normalization: McKinney
UPDATE facilities
SET city = 'McKinney'
WHERE state = 'TX' AND TRIM(city) ILIKE 'mckinney%' AND city != 'McKinney';

-- Typo: Carrollton
UPDATE facilities
SET city = 'Carrollton'
WHERE state = 'TX' AND city = 'Carrollto';

-- Typo: North Richland Hills
UPDATE facilities
SET city = 'North Richland Hills'
WHERE state = 'TX' AND city = 'No Richland Hills';

-- Two words: Sugar Land
UPDATE facilities
SET city = 'Sugar Land'
WHERE state = 'TX' AND city = 'Sugarland';

-- After running all updates, verify the distinct city list improved:
SELECT COUNT(DISTINCT city) AS distinct_city_count
FROM facilities
WHERE state = 'TX' AND is_active = true;
