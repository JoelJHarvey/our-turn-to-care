'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface ZipSearchFormProps {
  initialZip: string;
  initialRadius: number;
  initialType: string | null;
}

export function ZipSearchForm({ initialZip, initialRadius, initialType }: ZipSearchFormProps) {
  const [zip, setZip] = useState(initialZip);
  const [radius, setRadius] = useState(initialRadius);
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!zip || zip.length !== 5) return;
    const url = `/texas/search?zip=${zip}&radius=${radius}${initialType ? `&type=${initialType}` : ''}`;
    router.push(url);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 items-start sm:items-end">
      <div>
        <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">
          Texas Zip Code
        </label>
        <input
          id="zip"
          type="text"
          inputMode="numeric"
          pattern="[0-9]{5}"
          maxLength={5}
          value={zip}
          onChange={e => setZip(e.target.value.replace(/\D/g, ''))}
          placeholder="e.g. 78758"
          className="border border-gray-300 rounded-lg px-4 py-2 w-40 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
        />
      </div>
      <div>
        <label htmlFor="radius" className="block text-sm font-medium text-gray-700 mb-1">
          Search Radius
        </label>
        <select
          id="radius"
          value={radius}
          onChange={e => setRadius(parseInt(e.target.value, 10))}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
        >
          <option value={10}>10 miles</option>
          <option value={25}>25 miles</option>
          <option value={50}>50 miles</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors font-medium"
      >
        Search →
      </button>
    </form>
  );
}
