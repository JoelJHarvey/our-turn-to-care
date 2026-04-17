-- ============================================================
-- STEP 1: Explore what Alzheimer-related keys exist in raw_data
-- Run these FIRST to understand the actual field names before
-- creating the RPC function.
-- ============================================================

-- What keys exist at all in raw_data for TX nursing homes / assisted living?
SELECT DISTINCT jsonb_object_keys(raw_data) AS key
FROM facilities
WHERE state = 'TX'
  AND is_active = true
  AND facility_type IN ('nursing_home', 'assisted_living')
  AND raw_data IS NOT NULL
ORDER BY key;

-- Which keys relate to Alzheimer's / dementia / memory care?
SELECT DISTINCT key
FROM facilities,
     jsonb_object_keys(raw_data) AS key
WHERE state = 'TX'
  AND is_active = true
  AND (
    key ILIKE '%alz%'
    OR key ILIKE '%dement%'
    OR key ILIKE '%memory%'
  )
ORDER BY key;

-- How many TX facilities have any Alzheimer-related key in raw_data?
SELECT COUNT(*)
FROM facilities
WHERE state = 'TX'
  AND is_active = true
  AND facility_type IN ('nursing_home', 'assisted_living')
  AND (
    raw_data ? 'alzheimer_certified_capacity'
    OR raw_data ? 'alzheimer_capacity'
    OR raw_data ? 'dementia_certified'
    OR raw_data ? 'memory_care'
    OR (
      (raw_data->>'alzheimer_certified_beds') IS NOT NULL
      AND (raw_data->>'alzheimer_certified_beds')::int > 0
    )
  );


-- ============================================================
-- STEP 2: Create the RPC function
-- Adjust the field names based on what Step 1 reveals.
-- ============================================================

CREATE OR REPLACE FUNCTION get_memory_care_facilities_by_state(state_code text)
RETURNS TABLE (
  facility_id       uuid,
  facility_name     text,
  facility_type     text,
  city              text,
  county            text,
  state             text,
  zip_code          text,
  address_line_1    text,
  phone             text,
  bed_count         integer,
  overall_rating    smallint,
  accepts_medicare  boolean,
  accepts_medicaid  boolean,
  latitude          numeric,
  longitude         numeric,
  alzheimer_capacity text
)
LANGUAGE sql STABLE
AS $$
  SELECT
    f.facility_id,
    f.facility_name,
    f.facility_type::text,
    INITCAP(LOWER(f.city)) AS city,
    f.county,
    f.state,
    f.zip_code,
    f.address_line_1,
    f.phone,
    f.bed_count,
    f.overall_rating,
    f.accepts_medicare,
    f.accepts_medicaid,
    f.latitude,
    f.longitude,
    COALESCE(
      f.raw_data->>'alzheimer_certified_capacity',
      f.raw_data->>'alzheimer_capacity',
      f.raw_data->>'dementia_certified',
      f.raw_data->>'memory_care',
      ''
    ) AS alzheimer_capacity
  FROM facilities f
  WHERE f.state = state_code
    AND f.is_active = true
    AND f.facility_type IN ('nursing_home', 'assisted_living')
    AND (
      f.raw_data ? 'alzheimer_certified_capacity'
      OR f.raw_data ? 'alzheimer_capacity'
      OR f.raw_data ? 'dementia_certified'
      OR f.raw_data ? 'memory_care'
      OR (
        (f.raw_data->>'alzheimer_certified_beds') IS NOT NULL
        AND (f.raw_data->>'alzheimer_certified_beds')::int > 0
      )
    )
  ORDER BY f.city, f.facility_name;
$$;

-- Grant anonymous access (required for Supabase RLS + anon key)
GRANT EXECUTE ON FUNCTION get_memory_care_facilities_by_state(text) TO anon;
