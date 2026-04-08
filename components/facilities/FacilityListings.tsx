'use client';

/**
 * FacilityListings — Main search results component (ecommerce category page style)
 */

import React, { useState, useEffect } from 'react';
import { useFacilityData } from '@/hooks/useFacilityData';
import { FacilityCard, FacilityCardSkeleton } from './FacilityCard';
import { FacilityFilters } from './FacilityFilters';
import { Facility } from '@/lib/facilities';

interface FacilityListingsProps {
  zip?: string;
  state?: string;
  city?: string;
  defaultType?: string;
  title?: string;
}

export function FacilityListings({ zip, state, city, defaultType = 'all', title }: FacilityListingsProps) {
  const [currentType, setCurrentType] = useState(defaultType);
  const [currentSort, setCurrentSort] = useState('rating');
  const [currentPage, setCurrentPage] = useState(1);
  const [acceptsMedicaid, setAcceptsMedicaid] = useState(false);
  const [acceptsMedicare, setAcceptsMedicare] = useState(false);

  const { facilities, loading, error, pagination, refetch } = useFacilityData({
    zip, state, city, type: currentType, sort: currentSort, page: currentPage, limit: 20,
    acceptsMedicaid: acceptsMedicaid ? true : undefined,
    acceptsMedicare: acceptsMedicare ? true : undefined,
  });

  // Reset to page 1 when filters change
  useEffect(() => { setCurrentPage(1); }, [currentType, currentSort, acceptsMedicaid, acceptsMedicare]);

  const handleSelectFacility = (facility: Facility) => {
    console.log('Selected facility:', facility);
    // TODO: Wire up to lead capture modal
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {title && (
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">{title}</h1>
          </div>
        </div>
      )}

      <FacilityFilters
        defaultType={defaultType} currentType={currentType} onTypeChange={setCurrentType}
        currentSort={currentSort} onSortChange={setCurrentSort}
        acceptsMedicaid={acceptsMedicaid} onMedicaidChange={setAcceptsMedicaid}
        acceptsMedicare={acceptsMedicare} onMedicareChange={setAcceptsMedicare}
        totalResults={pagination.total} currentPageResults={facilities.length} isLoading={loading}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 font-medium">Error loading facilities</p>
            <p className="text-red-600 text-sm mt-1">{error}</p>
            <button
              onClick={() => refetch()}
              className="mt-3 px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded transition-colors"
            >
              Try again
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => <FacilityCardSkeleton key={`skeleton-${i}`} />)
          ) : facilities.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No facilities found</h3>
              <p className="text-slate-600 mb-6">Try adjusting your filters or search criteria</p>
              <button
                onClick={() => { setCurrentType('all'); setAcceptsMedicaid(false); setAcceptsMedicare(false); setCurrentPage(1); }}
                className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition-colors"
              >
                Clear filters
              </button>
            </div>
          ) : (
            facilities.map((facility) => (
              <FacilityCard key={facility.facility_id} facility={facility} onSelect={handleSelectFacility} showRating={true} />
            ))
          )}
        </div>

        {/* Pagination */}
        {!loading && facilities.length > 0 && pagination.pages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              ← Previous
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: pagination.pages }).map((_, i) => {
                const pageNum = i + 1;
                if (pageNum === 1 || pageNum === pagination.pages || Math.abs(pageNum - currentPage) <= 1) {
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        currentPage === pageNum ? 'bg-teal-600 text-white' : 'border border-slate-300 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                } else if (Math.abs(pageNum - currentPage) === 2) {
                  return <span key={pageNum} className="px-2 py-2">...</span>;
                }
                return null;
              })}
            </div>
            <button
              onClick={() => setCurrentPage(Math.min(pagination.pages, currentPage + 1))}
              disabled={currentPage === pagination.pages}
              className="px-3 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next →
            </button>
          </div>
        )}

        {!loading && facilities.length > 0 && pagination.pages > 1 && (
          <div className="mt-4 text-center text-slate-600 text-sm">Page {currentPage} of {pagination.pages}</div>
        )}
      </div>
    </div>
  );
}
