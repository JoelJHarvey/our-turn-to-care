/**
 * Texas State Page — /texas
 * Server-rendered overview with facility counts, care types, city directory
 */

import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getFacilityCountsByState, getDistinctCitiesByState } from '@/lib/facilities';
import { getFacilityTypeLabel, getFacilityTypeDescription } from '@/lib/facilityHelpers';

export const metadata: Metadata = {
  title: 'Senior Care in Texas - Nursing Homes, Assisted Living, and Home Health',
  description: 'Find nursing homes, assisted living, home health, hospice, and adult day care facilities in Texas. Compare costs, ratings, and services.',
  keywords: 'nursing homes Texas, assisted living Texas, home health Texas, senior care Texas',
};

export default async function TexasPage() {
  let stats = { total: 0, nursing_home: 0, assisted_living: 0, home_health: 0, hospice: 0, adult_day: 0 };
  let cities: string[] = [];

  try {
    const counts = await getFacilityCountsByState('TX');
    stats = { total: counts.all, ...counts };
    cities = await getDistinctCitiesByState('TX');
  } catch (error) {
    console.error('Error fetching Texas data:', error);
  }

  const careTypes = [
    { type: 'nursing_home', count: stats.nursing_home },
    { type: 'assisted_living', count: stats.assisted_living },
    { type: 'home_health', count: stats.home_health },
    { type: 'hospice', count: stats.hospice },
    { type: 'adult_day', count: stats.adult_day },
  ];

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Link href="/" className="hover:text-slate-900">Home</Link>
          <span>/</span>
          <span className="text-slate-900 font-medium">Texas</span>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-br from-teal-50 to-slate-50 border-b border-slate-200 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">Senior Care in Texas</h1>
          <p className="text-xl text-slate-600 mb-6 max-w-2xl">
            Find nursing homes, assisted living, home health, and other senior care facilities across Texas. Compare costs, ratings, and services.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            <div className="bg-white rounded-lg p-4 border border-slate-200">
              <div className="text-3xl font-bold text-teal-600">{stats.total.toLocaleString()}</div>
              <div className="text-sm text-slate-600 mt-1">Total Facilities</div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-slate-200">
              <div className="text-3xl font-bold text-purple-600">{cities.length}</div>
              <div className="text-sm text-slate-600 mt-1">Cities Served</div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-slate-200">
              <div className="text-3xl font-bold text-blue-600">{stats.assisted_living.toLocaleString()}</div>
              <div className="text-sm text-slate-600 mt-1">Assisted Living</div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-slate-200">
              <div className="text-3xl font-bold text-orange-600">{stats.nursing_home.toLocaleString()}</div>
              <div className="text-sm text-slate-600 mt-1">Nursing Homes</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Care Type Overview */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Types of Senior Care in Texas</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {careTypes.map((care) => (
              <div key={care.type} className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                <h3 className="text-xl font-semibold text-slate-900">{getFacilityTypeLabel(care.type)}</h3>
                <p className="text-sm text-teal-600 font-medium mt-1 mb-4">{care.count.toLocaleString()} facilities</p>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">{getFacilityTypeDescription(care.type)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-teal-50 rounded-lg p-8 border border-teal-200 mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Not sure what type of care is right?</h2>
          <p className="text-slate-600 mb-6">Our Care Assessment tool helps you determine the best care option.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/tools/care-assessment"
              className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-colors inline-flex items-center justify-center"
            >
              Take Care Assessment
            </Link>
            <Link
              href="/tools/cost-calculator"
              className="px-6 py-3 border-2 border-teal-600 text-teal-600 hover:bg-teal-50 font-semibold rounded-lg transition-colors inline-flex items-center justify-center"
            >
              Calculate Costs
            </Link>
          </div>
        </div>

        {/* City Directory */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Browse Facilities by City</h2>
          <p className="text-slate-600 mb-8">Select a city to view available facilities.</p>

          {cities.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {cities.map((city) => {
                const slug = city.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                return (
                  <Link
                    key={city}
                    href={`/texas/${slug}`}
                    className="group p-4 border border-slate-200 rounded-lg hover:border-teal-400 hover:bg-teal-50 transition-all"
                  >
                    <h3 className="font-semibold text-slate-900 group-hover:text-teal-700 transition-colors">{city}</h3>
                    <p className="text-sm text-slate-500 mt-1">View facilities →</p>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 bg-slate-50 rounded-lg border border-slate-200">
              <p className="text-slate-600">Loading cities...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
