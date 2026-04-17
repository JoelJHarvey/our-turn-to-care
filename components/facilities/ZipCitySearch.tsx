'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface ZipCitySearchProps {
  stateSlug: string;
}

function cityToSlug(city: string): string {
  return city.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

export function ZipCitySearch({ stateSlug }: ZipCitySearchProps) {
  const [zip, setZip] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const cleaned = zip.replace(/\D/g, '').slice(0, 5);
    if (cleaned.length !== 5) {
      setErrorMsg('Please enter a valid 5-digit zip code.');
      return;
    }

    router.push(`/${stateSlug}/search?zip=${cleaned}`);
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-5 max-w-xl">
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
        Browse by Location
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          inputMode="numeric"
          value={zip}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, '').slice(0, 5);
            setZip(val);
            if (errorMsg) { setErrorMsg(null); setStatus('idle'); }
          }}
          placeholder="Enter your zip code"
          aria-label="Zip code"
          className="flex-1 h-10 px-3 rounded-lg border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="h-10 px-4 bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 text-white font-semibold rounded-lg transition-colors text-sm whitespace-nowrap"
        >
          {status === 'loading' ? 'Searching…' : 'Find Near Me →'}
        </button>
      </form>
      {errorMsg && (
        <p className="mt-2 text-xs text-red-600">{errorMsg}</p>
      )}
      <p className="mt-2 text-xs text-slate-400">
        Find facilities near your zip code, then filter by city.{' '}
        <Link href={`/${stateSlug}`} className="text-teal-600 hover:underline">
          Browse all cities →
        </Link>
      </p>
    </div>
  );
}
