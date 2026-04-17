-- ============================================================
-- get_facilities_by_state_and_type
-- Paginated facility listing by state and type, with optional
-- proximity filtering using lat/lon + radius.
--
-- Run this in the Supabase SQL Editor, then GRANT EXECUTE.
-- ============================================================

CREATE OR REPLACE FUNCTION get_facilities_by_state_and_type(
  state_code        text,
  facility_type_filter text,         -- 'nursing_home' | 'assisted_living' | 'home_health' | 'hospice' | 'adult_day'
  page_num          integer DEFAULT 1,
  page_size         integer DEFAULT 20,
  sort_by           text    DEFAULT 'city',
  -- optional proximity filter
  lat               numeric DEFAULT NULL,
  lon               numeric DEFAULT NULL,
  radius_meters     numeric DEFAULT NULL
)
RETURNS TABLE (
  facility_id             uuid,
  facility_name           text,
  facility_type           text,
  city                    text,
  county                  text,
  state                   text,
  zip_code                text,
  address_line_1          text,
  phone                   text,
  bed_count               integer,
  overall_rating          smallint,
  health_inspection_rating smallint,
  staffing_rating         smallint,
  quality_measure_rating  smallint,
  accepts_medicare        boolean,
  accepts_medicaid        boolean,
  latitude                numeric,
  longitude               numeric,
  distance_miles          numeric,
  total_count             bigint
)
LANGUAGE sql STABLE
AS $$
  SELECT
    f.facility_id,
    f.facility_name,
    f.facility_type::text,
    INITCAP(LOWER(f.city))   AS city,
    f.county,
    f.state,
    f.zip_code,
    f.address_line_1,
    f.phone,
    f.bed_count,
    f.overall_rating,
    f.health_inspection_rating,
    f.staffing_rating,
    f.quality_measure_rating,
    f.accepts_medicare,
    f.accepts_medicaid,
    f.latitude,
    f.longitude,
    -- distance in miles (NULL when no proximity filter)
    CASE
      WHEN lat IS NOT NULL AND lon IS NOT NULL THEN
        ROUND(
          (ST_Distance(
            f.location::geography,
            ST_SetSRID(ST_MakePoint(lon, lat), 4326)::geography
          ) / 1609.34)::numeric,
          1
        )
      ELSE NULL
    END AS distance_miles,
    COUNT(*) OVER() AS total_count
  FROM facilities f
  WHERE
    f.state     = state_code
    AND f.is_active = true
    AND f.facility_type::text = facility_type_filter
    -- optional proximity filter
    AND (
      lat IS NULL
      OR lon IS NULL
      OR radius_meters IS NULL
      OR ST_DWithin(
           f.location::geography,
           ST_SetSRID(ST_MakePoint(lon, lat), 4326)::geography,
           radius_meters
         )
    )
  ORDER BY
    CASE WHEN sort_by = 'city'   THEN LOWER(f.city)   END ASC,
    CASE WHEN sort_by = 'rating' THEN f.overall_rating END DESC NULLS LAST,
    CASE
      WHEN sort_by = 'distance' AND lat IS NOT NULL AND lon IS NOT NULL
      THEN ST_Distance(
             f.location::geography,
             ST_SetSRID(ST_MakePoint(lon, lat), 4326)::geography
           )
    END ASC NULLS LAST,
    f.facility_name ASC
  LIMIT  page_size
  OFFSET (page_num - 1) * page_size;
$$;

GRANT EXECUTE ON FUNCTION get_facilities_by_state_and_type(text, text, integer, integer, text, numeric, numeric, numeric) TO anon;
GRANT EXECUTE ON FUNCTION get_facilities_by_state_and_type(text, text, integer, integer, text, numeric, numeric, numeric) TO authenticated;
