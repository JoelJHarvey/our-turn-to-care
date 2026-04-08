/**
 * Facility Data Service
 * Search, filter, and retrieve senior care facilities from Supabase
 */

import { supabase } from './supabase';

// --- TypeScript Interfaces ---

export interface Facility {
  facility_id: string;
  source: string;
  source_id: string;
  ccn: string | null;
  npi: string | null;
  facility_name: string;
  legal_name: string | null;
  facility_type: 'nursing_home' | 'assisted_living' | 'home_health' | 'hospice' | 'adult_day';
  ownership_type: string | null;
  bed_count: number | null;
  license_number: string | null;
  license_status: string | null;
  is_active: boolean;
  address_line_1: string;
  address_line_2: string | null;
  city: string;
  county: string | null;
  state: string;
  zip_code: string;
  latitude: number;
  longitude: number;
  phone: string | null;
  email: string | null;
  website: string | null;
  accepts_medicare: boolean;
  accepts_medicaid: boolean;
  overall_rating: number | null;
  health_inspection_rating: number | null;
  staffing_rating: number | null;
  quality_measure_rating: number | null;
  last_inspection_date: string | null;
  deficiency_count: number | null;
  penalty_count: number | null;
  raw_data: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
  source_updated_at: string | null;
  distance_miles?: number;
}

export interface FacilitySearchParams {
  zip?: string;
  state?: string;
  city?: string;
  type?: string;
  acceptsMedicare?: boolean;
  acceptsMedicaid?: boolean;
  hasRating?: boolean;
  sort?: string;
  page?: number;
  limit?: number;
}

export interface FacilitySearchResult {
  facilities: Facility[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

// --- Search Functions ---

/** Search facilities by ZIP code using PostGIS proximity (25-mile radius) */
export async function searchFacilitiesByZip(
  zip: string,
  params: Partial<FacilitySearchParams> = {}
): Promise<FacilitySearchResult> {
  const {
    type = 'all', acceptsMedicare, acceptsMedicaid,
    hasRating = false, sort = 'distance', page = 1, limit = 20,
  } = params;

  const radiusMeters = 25 * 1609.34; // 25 miles

  try {
    // Get center point from a facility in this ZIP
    const { data: centerData, error: centerError } = await supabase
      .from('facilities')
      .select('latitude, longitude')
      .eq('zip_code', zip)
      .limit(1);

    if (centerError || !centerData || centerData.length === 0) {
      return { facilities: [], total: 0, page, limit, pages: 0 };
    }

    const { latitude, longitude } = centerData[0];

    // Query nearby facilities using PostGIS RPC function
    const { data: nearbyFacilities, error: nearbyError } = await supabase.rpc('get_nearby_facilities', {
      lat: latitude,
      lon: longitude,
      radius_meters: radiusMeters,
      facility_type_filter: type === 'all' ? null : type,
      accepts_medicare_filter: acceptsMedicare ?? false,
      accepts_medicaid_filter: acceptsMedicaid ?? false,
      has_rating_filter: hasRating,
    });

    if (nearbyError) {
      console.error('RPC error, falling back:', nearbyError);
      return searchFacilitiesByZipFallback(zip, params);
    }

    const sorted = sortFacilities(nearbyFacilities || [], sort);
    const start = (page - 1) * limit;
    const paginated = sorted.slice(start, start + limit);

    return {
      facilities: paginated,
      total: nearbyFacilities?.length || 0,
      page, limit,
      pages: Math.ceil((nearbyFacilities?.length || 0) / limit),
    };
  } catch (error) {
    console.error('Error in searchFacilitiesByZip:', error);
    return searchFacilitiesByZipFallback(zip, params);
  }
}

/** Fallback: simple ZIP code match when RPC fails */
async function searchFacilitiesByZipFallback(
  zip: string,
  params: Partial<FacilitySearchParams> = {}
): Promise<FacilitySearchResult> {
  const { type = 'all', acceptsMedicare, acceptsMedicaid, sort = 'name', page = 1, limit = 20 } = params;

  try {
    let query = supabase
      .from('facilities')
      .select('*', { count: 'exact' })
      .eq('zip_code', zip)
      .eq('is_active', true);

    if (type !== 'all') query = query.eq('facility_type', type);
    if (acceptsMedicare !== undefined) query = query.eq('accepts_medicare', acceptsMedicare);
    if (acceptsMedicaid !== undefined) query = query.eq('accepts_medicaid', acceptsMedicaid);

    query = query.range((page - 1) * limit, page * limit - 1).limit(limit);

    const { data: facilities, count, error } = await query;
    if (error) return { facilities: [], total: 0, page, limit, pages: 0 };

    return {
      facilities: sortFacilities(facilities || [], sort),
      total: count || 0, page, limit,
      pages: Math.ceil((count || 0) / limit),
    };
  } catch (error) {
    return { facilities: [], total: 0, page, limit, pages: 0 };
  }
}

/** Search facilities by state and city (case-insensitive) */
export async function searchFacilitiesByStateAndCity(
  state: string,
  city: string,
  params: Partial<FacilitySearchParams> = {}
): Promise<FacilitySearchResult> {
  const {
    type = 'all', acceptsMedicare, acceptsMedicaid,
    hasRating = false, sort = 'rating', page = 1, limit = 20,
  } = params;

  try {
    let query = supabase
      .from('facilities')
      .select('*', { count: 'exact' })
      .eq('state', state.toUpperCase())
      .eq('is_active', true);

    // Case-insensitive city matching
    query = query.ilike('city', `%${city.toUpperCase()}%`);

    if (type !== 'all') query = query.eq('facility_type', type);
    if (acceptsMedicare !== undefined) query = query.eq('accepts_medicare', acceptsMedicare);
    if (acceptsMedicaid !== undefined) query = query.eq('accepts_medicaid', acceptsMedicaid);
    if (hasRating) query = query.not('overall_rating', 'is', null);

    query = query.range((page - 1) * limit, page * limit - 1).limit(limit);

    const { data: facilities, count, error } = await query;
    if (error) return { facilities: [], total: 0, page, limit, pages: 0 };

    return {
      facilities: sortFacilities(facilities || [], sort),
      total: count || 0, page, limit,
      pages: Math.ceil((count || 0) / limit),
    };
  } catch (error) {
    return { facilities: [], total: 0, page, limit, pages: 0 };
  }
}

/** Get facility counts by type for a state */
export async function getFacilityCountsByState(state: string): Promise<{
  all: number; nursing_home: number; assisted_living: number;
  home_health: number; hospice: number; adult_day: number;
}> {
  const defaults = { all: 0, nursing_home: 0, assisted_living: 0, home_health: 0, hospice: 0, adult_day: 0 };

  try {
    const { data, error } = await supabase
      .from('facilities')
      .select('facility_type')
      .eq('state', state.toUpperCase())
      .eq('is_active', true);

    if (error || !data) return defaults;

    const counts = { ...defaults, all: data.length };
    data.forEach((f) => {
      if (f.facility_type in counts) {
        counts[f.facility_type as keyof typeof counts]++;
      }
    });
    return counts;
  } catch (error) {
    return defaults;
  }
}

/** Get all distinct cities in a state (for generating static paths) */
export async function getDistinctCitiesByState(state: string): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('facilities')
      .select('city')
      .eq('state', state.toUpperCase())
      .eq('is_active', true);

    if (error || !data) return [];

    const uniqueCities = Array.from(
      new Set(data.map((f) => normalizeCityName(f.city)).filter(Boolean))
    );
    return uniqueCities.sort();
  } catch (error) {
    return [];
  }
}

/** Get average rating for a state */
export async function getStateAverageRating(state: string): Promise<number | null> {
  try {
    const { data, error } = await supabase
      .from('facilities')
      .select('overall_rating')
      .eq('state', state.toUpperCase())
      .eq('is_active', true)
      .not('overall_rating', 'is', null);

    if (error || !data || data.length === 0) return null;

    const sum = data.reduce((acc, f) => acc + (f.overall_rating || 0), 0);
    return Math.round((sum / data.length) * 10) / 10;
  } catch (error) {
    return null;
  }
}

// --- Helper Functions ---

function sortFacilities(facilities: Facility[], sortBy: string = 'name'): Facility[] {
  const sorted = [...facilities];
  switch (sortBy) {
    case 'rating':
      return sorted.sort((a, b) => {
        if (a.overall_rating && !b.overall_rating) return -1;
        if (!a.overall_rating && b.overall_rating) return 1;
        if (a.overall_rating && b.overall_rating) return b.overall_rating - a.overall_rating;
        return a.facility_name.localeCompare(b.facility_name);
      });
    case 'distance':
      return sorted.sort((a, b) => (a.distance_miles ?? Infinity) - (b.distance_miles ?? Infinity));
    case 'beds':
      return sorted.sort((a, b) => (b.bed_count ?? 0) - (a.bed_count ?? 0));
    case 'name':
    default:
      return sorted.sort((a, b) => a.facility_name.localeCompare(b.facility_name));
  }
}

export function normalizeCityName(city: string): string {
  return city.toLowerCase().split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function cityToSlug(city: string): string {
  return city.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

export function slugToCity(slug: string): string {
  return slug.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

export function assessmentToFacilityType(recommendation: string): string | null {
  const mapping: Record<string, string> = {
    nursing_home: 'nursing_home', 'skilled nursing': 'nursing_home',
    assisted_living: 'assisted_living', 'assisted living': 'assisted_living',
    home_health: 'home_health', 'home health': 'home_health',
    hospice: 'hospice', 'adult day care': 'adult_day', adult_day: 'adult_day',
  };
  return mapping[recommendation.toLowerCase().trim()] || null;
}
