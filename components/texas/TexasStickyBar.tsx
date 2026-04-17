'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function TexasStickyBar() {
  const [visible, setVisible] = useState(false);
  const [zip, setZip] = useState('');
  const router = useRouter();

  useEffect(() => {
    function onScroll() {
      // Show after scrolling past roughly 500px (below hero)
      setVisible(window.scrollY > 500);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function handleZipSubmit(e: React.FormEvent) {
    e.preventDefault();
    const cleaned = zip.replace(/\D/g, '').slice(0, 5);
    if (cleaned.length === 5) {
      router.push(`/tools/cost-calculator?zip=${cleaned}`);
    }
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 shadow-lg px-4 py-3 sm:hidden">
      <form onSubmit={handleZipSubmit} className="flex items-center gap-2">
        <input
          type="text"
          inputMode="numeric"
          value={zip}
          onChange={(e) => setZip(e.target.value.replace(/\D/g, '').slice(0, 5))}
          placeholder="Your zip code"
          aria-label="Zip code"
          className="flex-1 h-10 px-3 rounded-lg border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <button
          type="submit"
          className="h-10 px-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-colors text-sm whitespace-nowrap"
        >
          Find Care
        </button>
        <Link
          href="/tools/care-assessment"
          className="h-10 px-3 border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium rounded-lg transition-colors text-sm flex items-center whitespace-nowrap"
        >
          Assessment
        </Link>
      </form>
    </div>
  );
}
