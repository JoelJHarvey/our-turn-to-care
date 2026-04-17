'use client';

/**
 * ZipRadiusFilter — zip code + radius dropdown that changes URL search params.
 * The server renders filtered results based on ?zip=...&radius=... params.
 * Used on facility type sub-pages (/texas/nursing-homes, etc.)
 */

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const RADIUS_OPTIONS = [
  { value: '10', label: '10 miles' },
  { value: '25', label: '25 miles' },
  { value: '50', label: '50 miles' },
];

interface ZipRadiusFilterProps {
  pageUrl: string;     // base URL, e.g. "/texas/nursing-homes"
  activeZip?: string;  // current filter zip (from URL params)
  activeRadius?: string; // current radius (from URL params)
  sortBy?: string;
}

export function ZipRadiusFilter({
  pageUrl,
  activeZip,
  activeRadius = '25',
  sortBy = 'city',
}: ZipRadiusFilterProps) {
  const [zip, setZip] = useState(activeZip ?? '');
  const [radius, setRadius] = useState(activeRadius);
  const router = useRouter();

  const isFiltered = Boolean(activeZip);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const cleaned = zip.replace(/\D/g, '').slice(0, 5);
    if (cleaned.length !== 5) return;
    router.push(`${pageUrl}?zip=${cleaned}&radius=${radius}&sort=${sortBy}`);
  }

  function handleClear() {
    setZip('');
    setRadius('25');
    router.push(`${pageUrl}?sort=${sortBy}`);
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-5">
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
        Filter by Location
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          inputMode="numeric"
          value={zip}
          onChange={(e) => setZip(e.target.value.replace(/\D/g, '').slice(0, 5))}
          placeholder="Enter zip code"
          aria-label="Zip code"
          className="flex-1 h-10 px-3 rounded-lg border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
        />

        <select
          value={radius}
          onChange={(e) => setRadius(e.target.value)}
          aria-label="Search radius"
          className="h-10 px-3 rounded-lg border border-slate-300 text-slate-700 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
        >
          {RADIUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="h-10 px-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-colors text-sm whitespace-nowrap"
        >
          Search →
        </button>

        {isFiltered && (
          <button
            type="button"
            onClick={handleClear}
            className="h-10 px-4 border border-slate-300 text-slate-600 hover:bg-slate-50 font-medium rounded-lg transition-colors text-sm whitespace-nowrap"
          >
            Show All
          </button>
        )}
      </form>

      {isFiltered && (
        <p className="mt-2 text-xs text-teal-700 font-medium">
          Showing facilities within {activeRadius} miles of {activeZip}
        </p>
      )}
    </div>
  );
}
