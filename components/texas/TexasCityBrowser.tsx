'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

function cityToSlug(city: string): string {
  return city.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

interface Props {
  cities: string[];
}

export function TexasCityBrowser({ cities }: Props) {
  const [search, setSearch] = useState('');
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);

  // Which letters have at least one city
  const lettersWithCities = useMemo(() => {
    const set = new Set<string>();
    cities.forEach((c) => {
      const first = c.charAt(0).toUpperCase();
      set.add(first);
    });
    return set;
  }, [cities]);

  // Filtered cities
  const filtered = useMemo(() => {
    let result = cities;
    if (activeLetter) {
      result = result.filter((c) => c.charAt(0).toUpperCase() === activeLetter);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter((c) => c.toLowerCase().includes(q));
    }
    return result;
  }, [cities, activeLetter, search]);

  const totalCount = cities.length;
  const matchCount = filtered.length;

  const displayedCities = expanded ? filtered : filtered.slice(0, 20);
  const hasMore = filtered.length > 20 && !expanded;

  function clearFilters() {
    setSearch('');
    setActiveLetter(null);
  }

  const isFiltered = search.trim() !== '' || activeLetter !== null;

  return (
    <div>
      {/* Search input */}
      <div className="mb-4">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg select-none">
            🔍
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              if (!expanded) setExpanded(true);
            }}
            placeholder="Search Texas cities…"
            className="w-full pl-10 pr-4 h-11 rounded-lg border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
        </div>
        {isFiltered && (
          <p className="mt-1.5 text-xs text-slate-500">
            {matchCount === 0
              ? `No cities found matching "${search}". Try a different spelling.`
              : `${matchCount} of ${totalCount} cities match`}
            {' · '}
            <button
              onClick={clearFilters}
              className="text-teal-600 hover:underline"
            >
              Clear filters
            </button>
          </p>
        )}
      </div>

      {/* Letter filter */}
      <div className="flex flex-wrap gap-1 mb-5">
        {LETTERS.map((letter) => {
          const hasCity = lettersWithCities.has(letter);
          const isActive = activeLetter === letter;
          return (
            <button
              key={letter}
              onClick={() => {
                if (!hasCity) return;
                setActiveLetter(isActive ? null : letter);
                if (!expanded) setExpanded(true);
              }}
              disabled={!hasCity}
              aria-pressed={isActive}
              className={`w-8 h-8 rounded text-xs font-semibold transition-colors ${
                isActive
                  ? 'bg-teal-600 text-white'
                  : hasCity
                  ? 'bg-slate-100 text-slate-700 hover:bg-teal-50 hover:text-teal-700'
                  : 'bg-slate-50 text-slate-300 cursor-not-allowed'
              }`}
            >
              {letter}
            </button>
          );
        })}
        {activeLetter && (
          <button
            onClick={() => setActiveLetter(null)}
            className="h-8 px-3 rounded text-xs font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
          >
            All
          </button>
        )}
      </div>

      {/* City grid — collapsed by default, shows first 20 */}
      {!expanded && !isFiltered ? (
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 mb-4">
            {displayedCities.map((city) => (
              <Link
                key={city}
                href={`/texas/${cityToSlug(city)}`}
                className="group px-3 py-2 border border-slate-200 rounded-lg hover:border-teal-400 hover:bg-teal-50 transition-all"
              >
                <span className="text-sm font-medium text-slate-900 group-hover:text-teal-700 transition-colors">
                  {city}
                </span>
              </Link>
            ))}
          </div>
          <button
            onClick={() => setExpanded(true)}
            className="w-full sm:w-auto px-6 py-3 border-2 border-teal-600 text-teal-600 hover:bg-teal-50 font-semibold rounded-lg transition-colors text-sm"
          >
            Browse all {totalCount} Texas cities ↓
          </button>
        </div>
      ) : (
        <div>
          {matchCount === 0 ? (
            <div className="text-center py-10 bg-slate-50 rounded-lg border border-slate-200">
              <p className="text-slate-500 text-sm">No cities match your search.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 mb-4">
                {displayedCities.map((city) => (
                  <Link
                    key={city}
                    href={`/texas/${cityToSlug(city)}`}
                    className="group px-3 py-2 border border-slate-200 rounded-lg hover:border-teal-400 hover:bg-teal-50 transition-all"
                  >
                    <span className="text-sm font-medium text-slate-900 group-hover:text-teal-700 transition-colors">
                      {city}
                    </span>
                  </Link>
                ))}
              </div>

              {hasMore && (
                <button
                  onClick={() => setExpanded(true)}
                  className="w-full sm:w-auto px-6 py-3 border-2 border-teal-600 text-teal-600 hover:bg-teal-50 font-semibold rounded-lg transition-colors text-sm"
                >
                  Show all {matchCount} cities ↓
                </button>
              )}

              {expanded && !isFiltered && (
                <button
                  onClick={() => setExpanded(false)}
                  className="w-full sm:w-auto px-6 py-3 border border-slate-300 text-slate-600 hover:bg-slate-50 font-medium rounded-lg transition-colors text-sm"
                >
                  Collapse city list ↑
                </button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
