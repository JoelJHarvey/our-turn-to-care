/**
 * API Route: /api/facilities
 * Server-side endpoint for searching and filtering facilities
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  searchFacilitiesByZip,
  searchFacilitiesByStateAndCity,
  FacilitySearchParams,
} from '@/lib/facilities';

function parseQueryParams(request: NextRequest): FacilitySearchParams {
  const searchParams = request.nextUrl.searchParams;

  const params: FacilitySearchParams = {
    zip: searchParams.get('zip') || undefined,
    state: searchParams.get('state') || undefined,
    city: searchParams.get('city') || undefined,
    type: searchParams.get('type') || 'all',
    sort: searchParams.get('sort') || 'rating',
    page: parseInt(searchParams.get('page') || '1', 10),
    limit: parseInt(searchParams.get('limit') || '20', 10),
  };

  const medicaidParam = searchParams.get('medicaid');
  if (medicaidParam !== null) {
    params.acceptsMedicaid = medicaidParam === 'true' || medicaidParam === '1';
  }
  const medicareParam = searchParams.get('medicare');
  if (medicareParam !== null) {
    params.acceptsMedicare = medicareParam === 'true' || medicareParam === '1';
  }

  if (params.page! < 1) params.page = 1;
  if (params.limit! < 1) params.limit = 20;
  if (params.limit! > 100) params.limit = 100;

  return params;
}

export async function GET(request: NextRequest) {
  try {
    const params = parseQueryParams(request);

    if (!params.zip && !(params.state && params.city)) {
      return NextResponse.json(
        { error: 'Either zip code or (state + city) is required' },
        { status: 400 }
      );
    }

    let result;
    if (params.zip) {
      result = await searchFacilitiesByZip(params.zip, params);
    } else if (params.state && params.city) {
      result = await searchFacilitiesByStateAndCity(params.state, params.city, params);
    } else {
      return NextResponse.json({ error: 'Invalid search parameters' }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      data: {
        facilities: result.facilities,
        pagination: { total: result.total, page: result.page, limit: result.limit, pages: result.pages },
      },
    });
  } catch (error) {
    console.error('Error in /api/facilities:', error);
    return NextResponse.json(
      { error: 'Failed to search facilities', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
