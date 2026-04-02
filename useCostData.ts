/**
 * React Hook: useCostData
 *
 * Fetches real care cost data from Supabase when given a zip code.
 * Drop this into any component that needs to show costs.
 *
 * Usage:
 *   const { costs, loading, error, summary } = useCostData('75201');
 *
 *   if (loading) return <Spinner />;
 *   if (summary) {
 *     console.log(summary.assistedLiving.monthly); // "$5,666/mo"
 *     console.log(summary.memoryCare.monthly);     // "$7,083/mo"
 *   }
 */

'use client';

import { useState, useEffect } from 'react';
import { getCostsByZip, getCostSummary, getStateName } from '@/lib/costs';
import type { CostLookupResult, CostData } from '@/lib/costs';

interface UseCostDataReturn {
  /** Raw cost lookup result from Supabase */
  result: CostLookupResult | null;
  /** The best available cost data (MSA or state-level) */
  costs: CostData | null;
  /** Formatted cost summary ready for display */
  summary: ReturnType<typeof getCostSummary> | null;
  /** Loading state */
  loading: boolean;
  /** Error message if something went wrong */
  error: string | null;
  /** Display label for the location (e.g. "Dallas-Fort Worth-Arlington" or "Texas") */
  locationLabel: string | null;
  /** State name */
  stateName: string | null;
  /** Whether we found MSA-level (metro) data vs state-level */
  hasMsaData: boolean;
}

export function useCostData(zip: string | null): UseCostDataReturn {
  const [result, setResult] = useState<CostLookupResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Don't fetch if no zip or invalid zip
    if (!zip || !/^\d{5}$/.test(zip)) {
      setResult(null);
      setError(null);
      return;
    }

    let cancelled = false;

    async function fetchCosts() {
      setLoading(true);
      setError(null);

      try {
        const data = await getCostsByZip(zip!);
        if (!cancelled) {
          setResult(data);
          if (!data.found) {
            setError('No cost data available for this area');
          }
        }
      } catch (err) {
        if (!cancelled) {
          setError('Unable to load cost data. Please try again.');
          console.error('Cost data fetch error:', err);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchCosts();

    return () => {
      cancelled = true;
    };
  }, [zip]);

  // Compute derived values
  const costs = result?.costs || null;
  const summary = costs ? getCostSummary(costs) : null;
  const locationLabel = costs?.locationLabel || null;
  const stateName = result?.stateCode ? getStateName(result.stateCode) : null;
  const hasMsaData = costs?.level === 'msa';

  return {
    result,
    costs,
    summary,
    loading,
    error,
    locationLabel,
    stateName,
    hasMsaData,
  };
}
