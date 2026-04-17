'use client';

import { useState, useMemo } from 'react';
import { FacilityCard } from './FacilityCard';
import { Facility } from '@/lib/facilities';
import { formatPhoneNumber } from '@/lib/facilityHelpers';

interface FacilityCounts {
  nursing_home: number;
  assisted_living: number;
  memory_care: number;
  home_health: number;
  hospice: number;
  adult_day: number;
}

interface CityFacilityFilterProps {
  facilities: Facility[];
  facilityCounts: FacilityCounts;
  totalFacilities: number;
}

const FACILITY_TYPES = [
  { key: 'all', label: 'All' },
  { key: 'nursing_home', label: 'Nursing Homes' },
  { key: 'assisted_living', label: 'Assisted Living' },
  { key: 'memory_care', label: 'Memory Care' },
  { key: 'home_health', label: 'Home Health' },
  { key: 'hospice', label: 'Hospice' },
  { key: 'adult_day', label: 'Adult Day Care' },
] as const;

const PAGE_SIZE = 20;

function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function CityFacilityFilter({ facilities, facilityCounts, totalFacilities }: CityFacilityFilterProps) {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    if (activeFilter === 'all') return facilities;
    return facilities.filter(f => f.facility_type === activeFilter);
  }, [facilities, activeFilter]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const startIdx = (currentPage - 1) * PAGE_SIZE + 1;
  const endIdx = Math.min(currentPage * PAGE_SIZE, filtered.length);

  function handleFilterChange(key: string) {
    setActiveFilter(key);
    setCurrentPage(1);
  }

  function getCount(key: string): number {
    if (key === 'all') return totalFacilities;
    return facilityCounts[key as keyof FacilityCounts] || 0;
  }

  return (
    <div>
      {/* Filter Tabs */}
      <div className="overflow-x-auto -mx-4 px-4 pb-2">
        <div className="flex gap-2 min-w-max">
          {FACILITY_TYPES.map(type => {
            const count = getCount(type.key);
            if (type.key !== 'all' && count === 0) return null;
            const isActive = activeFilter === type.key;
            return (
              <button
                key={type.key}
                onClick={() => handleFilterChange(type.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-teal-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-teal-500'
                }`}
              >
                {type.label} ({formatNumber(count)})
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count */}
      {filtered.length > 0 && (
        <p className="text-sm text-gray-600 mt-4 mb-4">
          Showing {formatNumber(startIdx)}-{formatNumber(endIdx)} of {formatNumber(filtered.length)} facilities
        </p>
      )}

      {/* Facility Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {paginated.map(facility => (
          <FacilityCard
            key={facility.facility_id}
            facility={facility}
            showRating={true}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No facilities found</h3>
          <p className="text-slate-600">Try a different care type filter.</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            ← Previous
          </button>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }).map((_, i) => {
              const pageNum = i + 1;
              if (pageNum === 1 || pageNum === totalPages || Math.abs(pageNum - currentPage) <= 1) {
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === pageNum
                        ? 'bg-teal-600 text-white'
                        : 'border border-slate-300 text-slate-700 hover:bg-slate-50'
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
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next →
          </button>
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-3 text-center text-slate-600 text-sm">
          Page {currentPage} of {totalPages}
        </div>
      )}
    </div>
  );
}
