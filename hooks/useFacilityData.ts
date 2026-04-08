/**
 * React Hook: useFacilityData
 * Manages facility search with async loading, error handling, and debouncing
 */

import { useEffect, useState, useCallback, useRef } from 'react';
import { Facility, FacilitySearchParams } from '@/lib/facilities';

interface UseFacilityDataOptions extends Partial<FacilitySearchParams> {
  enabled?: boolean;
  debounceMs?: number;
}

interface UseFacilityDataResult {
  facilities: Facility[];
  loading: boolean;
  error: string | null;
  pagination: { total: number; page: number; limit: number; pages: number };
  refetch: () => Promise<void>;
}

export function useFacilityData(options: UseFacilityDataOptions = {}): UseFacilityDataResult {
  const {
    zip, state, city, type = 'all', acceptsMedicare, acceptsMedicaid,
    sort = 'rating', page = 1, limit = 20, enabled = true, debounceMs = 300,
  } = options;

  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 20, pages: 0 });

  const debounceTimeoutRef = useRef<NodeJS.Timeout>();
  const abortControllerRef = useRef<AbortController>();

  const fetchFacilities = useCallback(async () => {
    if (!zip && !(state && city)) {
      setFacilities([]);
      setError(null);
      setPagination({ total: 0, page: 1, limit, pages: 0 });
      return;
    }
    if (!enabled) return;

    setLoading(true);
    setError(null);

    try {
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();

      const params = new URLSearchParams();
      if (zip) params.append('zip', zip);
      if (state) params.append('state', state);
      if (city) params.append('city', city);
      if (type && type !== 'all') params.append('type', type);
      if (acceptsMedicare !== undefined) params.append('medicare', String(acceptsMedicare));
      if (acceptsMedicaid !== undefined) params.append('medicaid', String(acceptsMedicaid));
      if (sort) params.append('sort', sort);
      if (page) params.append('page', String(page));
      if (limit) params.append('limit', String(limit));

      const response = await fetch(`/api/facilities?${params.toString()}`, {
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) throw new Error(`API error: ${response.statusText}`);

      const data = await response.json();
      if (data.success && data.data) {
        setFacilities(data.data.facilities || []);
        setPagination(data.data.pagination);
      } else {
        setError(data.error || 'Failed to load facilities');
      }
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') return;
      setError(err instanceof Error ? err.message : 'Failed to load facilities');
      setFacilities([]);
    } finally {
      setLoading(false);
    }
  }, [zip, state, city, type, acceptsMedicare, acceptsMedicaid, sort, page, limit, enabled]);

  useEffect(() => {
    if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);
    debounceTimeoutRef.current = setTimeout(() => { fetchFacilities(); }, debounceMs);
    return () => { if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current); };
  }, [fetchFacilities, debounceMs]);

  const refetch = useCallback(async () => {
    if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);
    await fetchFacilities();
  }, [fetchFacilities]);

  return { facilities, loading, error, pagination, refetch };
}
