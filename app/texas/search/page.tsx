import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { searchFacilitiesByZip, slugToCity } from '@/lib/facilities';
import { getFacilityTypeLabel } from '@/lib/facilityHelpers';
import { TexasZipSearch } from '@/components/texas/TexasZipSearch';
import { StateCityLeadForm } from '@/components/forms/StateCityLeadForm';
import { FacilityCard } from '@/components/facilities/FacilityCard';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Search Senior Care Facilities in Texas by Zip Code',
  description:
    'Find nursing homes, assisted living, memory care, home health, and hospice near your Texas zip code.',
  robots: { index: false, follow: true }, // noindex — utility page
};

function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

interface PageProps {
  searchParams: Promise<{ zip?: string; type?: string; page?: string }>;
}

export default async function TexasSearchPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const zip = params.zip?.replace(/\D/g, '').slice(0, 5) || '';
  const type = params.type || 'all';
  const page = Math.max(1, parseInt(params.page ?? '1', 10));

  // If no zip provided, show the search form
  if (!zip || zip.length !== 5) {
    return (
      <div className="bg-white min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-8 justify-center">
            <Link href="/" className="hover:text-slate-900">Home</Link>
            <span>/</span>
            <Link href="/texas" className="hover:text-slate-900">Texas</Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">Search</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Find Senior Care Near You
          </h1>
          <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto">
            Enter your Texas zip code to find nursing homes, assisted living, memory care,
            and other senior care facilities nearby.
          </p>

          <div className="flex justify-center">
            <TexasZipSearch />
          </div>
        </div>
      </div>
    );
  }

  // Fetch nearby facilities
  const results = await searchFacilitiesByZip(zip, {
    type,
    page,
    limit: 20,
    sort: 'distance',
  });

  const { facilities, total, pages } = results;

  // Type filter options
  const TYPES = [
    { key: 'all', label: 'All Types' },
    { key: 'nursing_home', label: 'Nursing Homes' },
    { key: 'assisted_living', label: 'Assisted Living' },
    { key: 'home_health', label: 'Home Health' },
    { key: 'hospice', label: 'Hospice' },
    { key: 'adult_day', label: 'Adult Day Care' },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-slate-900">Home</Link>
          <span>/</span>
          <Link href="/texas" className="hover:text-slate-900">Texas</Link>
          <span>/</span>
          <span className="text-slate-900 font-medium">Search: {zip}</span>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-br from-teal-50 to-slate-50 border-b border-slate-200 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
            Senior Care Near {zip}
          </h1>
          <p className="text-lg text-slate-600 mb-6">
            {total > 0
              ? `Found ${formatNumber(total)} facilities within 25 miles of zip code ${zip}.`
              : `No facilities found near zip code ${zip}. Try a different zip code.`}
          </p>

          {/* New search */}
          <TexasZipSearch />
        </div>
      </div>

      {/* Results */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Type filter pills */}
        <div className="overflow-x-auto -mx-4 px-4 pb-4">
          <div className="flex gap-2 min-w-max">
            {TYPES.map((t) => {
              const isActive = type === t.key;
              const href = t.key === 'all'
                ? `/texas/search?zip=${zip}`
                : `/texas/search?zip=${zip}&type=${t.key}`;
              return (
                <Link
                  key={t.key}
                  href={href}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-teal-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:border-teal-500'
                  }`}
                >
                  {t.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Results count */}
        {total > 0 && (
          <p className="text-sm text-slate-500 mb-6">
            Showing {formatNumber((page - 1) * 20 + 1)}-{formatNumber(Math.min(page * 20, total))} of {formatNumber(total)} results
            {type !== 'all' && ` · ${getFacilityTypeLabel(type)}`}
          </p>
        )}

        {/* Facility cards */}
        {facilities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {facilities.map((facility) => (
              <FacilityCard
                key={facility.facility_id}
                facility={facility}
                showRating={true}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-50 rounded-xl border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              No facilities found
            </h3>
            <p className="text-slate-600 mb-6">
              We couldn&apos;t find facilities near zip code {zip}.
              {type !== 'all' && ' Try removing the care type filter or '}
              Try a different zip code.
            </p>
            <Link
              href="/texas"
              className="text-teal-600 hover:text-teal-700 font-medium underline"
            >
              Browse all Texas facilities →
            </Link>
          </div>
        )}

        {/* Pagination */}
        {pages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            {page > 1 && (
              <Link
                href={`/texas/search?zip=${zip}${type !== 'all' ? `&type=${type}` : ''}&page=${page - 1}`}
                className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                ← Previous
              </Link>
            )}
            <span className="text-sm text-slate-600">
              Page {page} of {pages}
            </span>
            {page < pages && (
              <Link
                href={`/texas/search?zip=${zip}${type !== 'all' ? `&type=${type}` : ''}&page=${page + 1}`}
                className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Next →
              </Link>
            )}
          </div>
        )}

        {/* CTA */}
        <div className="mt-12">
          <StateCityLeadForm state="Texas" stateSlug="texas" />
        </div>
      </div>
    </div>
  );
}
