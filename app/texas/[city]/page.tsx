/**
 * City Page Template — /texas/[city]
 * Server-rendered with generateStaticParams for all Texas cities
 */

import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  getDistinctCitiesByState, searchFacilitiesByStateAndCity,
  normalizeCityName, cityToSlug, slugToCity,
} from '@/lib/facilities';
import { stateNameFromCode, MAJOR_TEXAS_CITIES } from '@/lib/facilityHelpers';
import { FacilityListings } from '@/components/facilities/FacilityListings';

interface CityPageProps {
  params: { city: string };
}

/** Generate static paths for all Texas cities at build time */
export async function generateStaticParams() {
  try {
    const cities = await getDistinctCitiesByState('TX');
    return cities.map((city) => ({ city: cityToSlug(city) }));
  } catch (error) {
    return MAJOR_TEXAS_CITIES.map((city) => ({ city: cityToSlug(city) }));
  }
}

/** Dynamic SEO metadata per city */
export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const cityName = normalizeCityName(slugToCity(params.city));

  let facilityCount = '';
  try {
    const result = await searchFacilitiesByStateAndCity('TX', params.city, { limit: 1 });
    facilityCount = result.total > 0 ? ` — ${result.total} Facilities` : '';
  } catch (error) {
    // Swallow error; facilityCount stays empty
  }

  const title = `Senior Care in ${cityName}, Texas${facilityCount}`;
  const description = `Find nursing homes, assisted living, home health, and hospice facilities in ${cityName}, Texas. Compare costs, ratings, and services.`;

  return { title, description, keywords: `${cityName} senior care, ${cityName} nursing homes, ${cityName} assisted living` };
}

export default async function CityPage({ params }: CityPageProps) {
  const citySlug = params.city;
  const cityName = normalizeCityName(slugToCity(citySlug));
  const stateName = stateNameFromCode('TX');

  const facilityStats = { total: 0, nursing_home: 0, assisted_living: 0, home_health: 0, hospice: 0, adult_day: 0 };

  try {
    const result = await searchFacilitiesByStateAndCity('TX', citySlug, { limit: 1000 });
    facilityStats.total = result.total;
    result.facilities.forEach((f) => {
      if (f.facility_type in facilityStats) {
        facilityStats[f.facility_type as keyof typeof facilityStats]++;
      }
    });
  } catch (error) {
    console.error(`Error fetching facilities for ${cityName}:`, error);
  }

  let otherCities: string[] = [];
  try {
    const allCities = await getDistinctCitiesByState('TX');
    otherCities = allCities.filter((c) => normalizeCityName(c) !== cityName).slice(0, 8);
  } catch (error) {
    otherCities = MAJOR_TEXAS_CITIES.filter((c) => c !== cityName).slice(0, 8);
  }

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Link href="/" className="hover:text-slate-900">Home</Link>
          <span>/</span>
          <Link href="/texas" className="hover:text-slate-900">Texas</Link>
          <span>/</span>
          <span className="text-slate-900 font-medium">{cityName}</span>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-br from-teal-50 to-slate-50 border-b border-slate-200 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">Senior Care in {cityName}</h1>
          <p className="text-xl text-slate-600 mb-6 max-w-2xl">
            Find nursing homes, assisted living, home health, and other senior care facilities in {cityName}, {stateName}.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            <div className="bg-white rounded-lg p-4 border border-slate-200">
              <div className="text-3xl font-bold text-teal-600">{facilityStats.total}</div>
              <div className="text-sm text-slate-600 mt-1">Total Facilities</div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-slate-200">
              <div className="text-3xl font-bold text-purple-600">{facilityStats.nursing_home}</div>
              <div className="text-sm text-slate-600 mt-1">Nursing Homes</div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-slate-200">
              <div className="text-3xl font-bold text-blue-600">{facilityStats.assisted_living}</div>
              <div className="text-sm text-slate-600 mt-1">Assisted Living</div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-slate-200">
              <div className="text-3xl font-bold text-orange-600">{facilityStats.home_health}</div>
              <div className="text-sm text-slate-600 mt-1">Home Health</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Facility Listings */}
          <div className="lg:col-span-2">
            <FacilityListings state="TX" city={citySlug} defaultType="all" title={`Facilities in ${cityName}`} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-slate-50 rounded-lg p-6 border border-slate-200 sticky top-4">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">How to Pay for Care</h3>
              <div className="space-y-3 mb-6">
                <div>
                  <h4 className="font-medium text-slate-900 text-sm mb-1">Medicaid Coverage</h4>
                  <p className="text-xs text-slate-600">Learn about nursing home and assisted living coverage in {stateName}</p>
                </div>
                <div className="border-t border-slate-200 pt-3">
                  <h4 className="font-medium text-slate-900 text-sm mb-1">Medicare Benefits</h4>
                  <p className="text-xs text-slate-600">Understand coverage for home health and skilled nursing care</p>
                </div>
                <div className="border-t border-slate-200 pt-3">
                  <h4 className="font-medium text-slate-900 text-sm mb-1">Veteran&apos;s Aid &amp; Attendance</h4>
                  <p className="text-xs text-slate-600">Additional benefits available for eligible veterans</p>
                </div>
              </div>

              <Link
                href="/tools/medicaid-screener"
                className="block w-full text-center px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-colors text-sm mb-2"
              >
                Check Medicaid Eligibility
              </Link>
              <Link
                href="/tools/cost-calculator"
                className="block w-full text-center px-4 py-2 border-2 border-teal-600 text-teal-600 hover:bg-teal-50 font-semibold rounded-lg transition-colors text-sm"
              >
                Calculate Costs
              </Link>
            </div>

            {/* Related Cities */}
            {otherCities.length > 0 && (
              <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Other {stateName} Cities</h3>
                <div className="space-y-2">
                  {otherCities.map((city) => (
                    <Link
                      key={city}
                      href={`/texas/${cityToSlug(city)}`}
                      className="block text-sm text-teal-600 hover:text-teal-700 hover:underline"
                    >
                      {normalizeCityName(city)}
                    </Link>
                  ))}
                </div>
                <Link
                  href="/texas"
                  className="block mt-4 pt-4 border-t border-slate-200 text-sm text-slate-600 hover:text-slate-900 font-medium"
                >
                  View all {stateName} cities →
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-teal-50 border-t border-slate-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Not sure what type of care is right?</h2>
              <p className="text-slate-600 mb-6">Our Care Assessment tool helps you determine the best care option.</p>
              <Link
                href="/tools/care-assessment"
                className="inline-flex items-center px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-colors"
              >
                Start Care Assessment
              </Link>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Understand your costs</h2>
              <p className="text-slate-600 mb-6">Get cost estimates for different types of care in {cityName}.</p>
              <Link
                href="/tools/cost-calculator"
                className="inline-flex items-center px-6 py-3 border-2 border-teal-600 text-teal-600 hover:bg-white font-semibold rounded-lg transition-colors"
              >
                Use Cost Calculator
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
