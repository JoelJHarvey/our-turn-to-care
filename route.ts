/**
 * API Route: /api/costs
 *
 * Server-side endpoint for fetching care cost data by zip code.
 * This keeps the Supabase query on the server for better performance.
 *
 * Usage: GET /api/costs?zip=75201
 *
 * Returns JSON with cost data for the area, or an error message.
 */

import { NextRequest, NextResponse } from 'next/server';
import { getCostsByZip } from '@/lib/costs';

export async function GET(request: NextRequest) {
  const zip = request.nextUrl.searchParams.get('zip');

  // Validate zip code
  if (!zip || !/^\d{5}$/.test(zip)) {
    return NextResponse.json(
      { error: 'Please provide a valid 5-digit zip code' },
      { status: 400 }
    );
  }

  try {
    const result = await getCostsByZip(zip);

    if (!result.found) {
      return NextResponse.json(
        { error: 'No cost data found for this zip code', stateCode: result.stateCode },
        { status: 404 }
      );
    }

    return NextResponse.json(result);
  } catch (err) {
    console.error('Cost lookup error:', err);
    return NextResponse.json(
      { error: 'Something went wrong fetching cost data' },
      { status: 500 }
    );
  }
}
