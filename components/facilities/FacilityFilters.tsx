'use client';

/**
 * FacilityFilters — Care type tabs, sort dropdown, Medicaid/Medicare toggles
 */

import React, { useState } from 'react';

interface FacilityFiltersProps {
  defaultType?: string;
  currentType: string;
  onTypeChange: (type: string) => void;
  currentSort: string;
  onSortChange: (sort: string) => void;
  acceptsMedicaid?: boolean;
  onMedicaidChange: (accepted: boolean) => void;
  acceptsMedicare?: boolean;
  onMedicareChange: (accepted: boolean) => void;
  totalResults: number;
  currentPageResults: number;
  isLoading: boolean;
}

const FACILITY_TYPES = [
  { value: 'all', label: 'All Types' },
  { value: 'nursing_home', label: 'Nursing Homes' },
  { value: 'assisted_living', label: 'Assisted Living' },
  { value: 'home_health', label: 'Home Health' },
  { value: 'hospice', label: 'Hospice' },
  { value: 'adult_day', label: 'Adult Day' },
];

const SORT_OPTIONS = [
  { value: 'rating', label: 'Best Rating' },
  { value: 'name', label: 'Name (A-Z)' },
  { value: 'beds', label: 'Most Beds' },
  { value: 'distance', label: 'Closest' },
];

export function FacilityFilters({
  currentType, onTypeChange, currentSort, onSortChange,
  acceptsMedicaid = false, onMedicaidChange, acceptsMedicare = false, onMedicareChange,
  totalResults, currentPageResults, isLoading,
}: FacilityFiltersProps) {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  let resultsText = 'No results';
  if (totalResults > 0) {
    resultsText = currentPageResults === 0
      ? `Showing 0 of ${totalResults} facilities`
      : `Showing ${currentPageResults} of ${totalResults} facilities`;
  }

  return (
    <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="mb-4">
          <p className="text-sm font-medium text-slate-700">
            {isLoading ? 'Loading...' : resultsText}
          </p>
        </div>

        {/* Care Type Tabs */}
        <div className="mb-4">
          <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="flex gap-2 pb-2">
              {FACILITY_TYPES.map((type) => (
                <button
                  key={type.value}
                  onClick={() => onTypeChange(type.value)}
                  className={`px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-colors flex-shrink-0 ${
                    currentType === type.value
                      ? 'bg-teal-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sort and Filter Toggle */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <label htmlFor="sort-select" className="text-sm font-medium text-slate-600">Sort:</label>
            <select
              id="sort-select"
              value={currentSort}
              onChange={(e) => onSortChange(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="text-sm font-medium text-teal-600 hover:text-teal-700 px-3 py-2"
          >
            {showAdvancedFilters ? '− Filter' : '+ Filter'}
          </button>
        </div>

        {/* Advanced Filters */}
        {showAdvancedFilters && (
          <div className="mt-4 pt-4 border-t border-slate-200 space-y-3">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="medicaid-filter"
                checked={acceptsMedicaid}
                onChange={(e) => onMedicaidChange(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
              />
              <label htmlFor="medicaid-filter" className="text-sm font-medium text-slate-700 cursor-pointer">
                Medicaid Accepted
              </label>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="medicare-filter"
                checked={acceptsMedicare}
                onChange={(e) => onMedicareChange(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
              />
              <label htmlFor="medicare-filter" className="text-sm font-medium text-slate-700 cursor-pointer">
                Medicare Accepted
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
