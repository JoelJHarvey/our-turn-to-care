'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

/** Validates that a zip code falls within Texas zip ranges */
function isTexasZip(zip: string): boolean {
  const num = parseInt(zip, 10);
  return (
    (num >= 73301 && num <= 73399) || // part of 73xxx (Wichita Falls area)
    (num >= 75001 && num <= 79999) || // main TX range
    (num >= 88501 && num <= 88595)    // El Paso TX extended
  );
}

function cityToSlug(city: string): string {
  return city.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

export function TexasZipSearch() {
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
    if (!isTexasZip(cleaned)) {
      setErrorMsg(null); // handled separately below via state
      setStatus('error');
      setErrorMsg('That zip code isn\'t in Texas.');
      return;
    }

    router.push(`/texas/search?zip=${cleaned}`);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value.replace(/\D/g, '').slice(0, 5);
    setZip(val);
    if (errorMsg) {
      setErrorMsg(null);
      setStatus('idle');
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 max-w-2xl">
      <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">
        Find Care Near You
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          inputMode="numeric"
          value={zip}
          onChange={handleChange}
          placeholder="Enter your Texas zip code"
          aria-label="Zip code"
          className="flex-1 h-12 px-4 rounded-lg border border-slate-300 text-slate-900 text-base focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="h-12 px-6 bg-teal-600 hover:bg-teal-700 active:bg-teal-800 disabled:bg-teal-400 text-white font-semibold rounded-lg transition-colors whitespace-nowrap"
        >
          {status === 'loading' ? 'Searching…' : 'Find Facilities →'}
        </button>
      </form>

      {errorMsg && (
        <p className="mt-2 text-sm text-red-600">
          {errorMsg}{' '}
          {errorMsg.includes('isn\'t in Texas') && (
            <Link href="/" className="underline text-teal-700 hover:text-teal-800">
              View all states →
            </Link>
          )}
        </p>
      )}
    </div>
  );
}
