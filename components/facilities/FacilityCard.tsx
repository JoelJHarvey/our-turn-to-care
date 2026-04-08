'use client';

/**
 * FacilityCard — Individual facility card with name, address, rating, badges, CTA
 */

import React, { useState } from 'react';
import Link from 'next/link';
import { Facility } from '@/lib/facilities';
import {
  formatPhoneNumber, renderStarRating, getDeficiencyLevel,
  formatBedCount, getFacilityTypeLabel,
} from '@/lib/facilityHelpers';

interface FacilityCardProps {
  facility: Facility;
  onSelect?: (facility: Facility) => void;
  showRating?: boolean;
  href?: string;
}

export function FacilityCard({ facility, onSelect, showRating = true, href }: FacilityCardProps) {
  const [showRatingTooltip, setShowRatingTooltip] = useState(false);

  const deficiencyLevel = getDeficiencyLevel(facility.deficiency_count);
  const hasHighDeficiencies = deficiencyLevel === 'high';
  const hasRating = facility.overall_rating && facility.overall_rating > 0;
  const formattedPhone = formatPhoneNumber(facility.phone);
  const bedCount = formatBedCount(facility.bed_count);
  const facilityTypeLabel = getFacilityTypeLabel(facility.facility_type);
  const addressLine2 = facility.address_line_2 ? `${facility.address_line_2}, ` : '';
  const fullAddress = `${facility.address_line_1}, ${addressLine2}${facility.city}, ${facility.state} ${facility.zip_code}`;

  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-slate-100">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <Link
              href={href || '#'}
              className="text-teal-700 hover:text-teal-900 font-semibold leading-snug text-lg block truncate"
              title={facility.facility_name}
            >
              {facility.facility_name}
            </Link>
            <p className="text-xs text-slate-500 mt-1">{facilityTypeLabel}</p>
          </div>
          {hasHighDeficiencies && (
            <div
              className="flex-shrink-0 px-2 py-1 bg-amber-100 border border-amber-300 rounded text-xs font-medium text-amber-800 whitespace-nowrap"
              title={`${facility.deficiency_count} deficiencies on record`}
            >
              {facility.deficiency_count} issues
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-4 space-y-3">
        <div className="text-sm text-slate-600 leading-snug">
          <p className="line-clamp-2">{fullAddress}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm">
          {formattedPhone && (
            <a href={`tel:${facility.phone}`} className="text-teal-600 hover:text-teal-700 hover:underline font-medium">
              {formattedPhone}
            </a>
          )}
          {facility.website && (
            <a href={facility.website} target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 hover:underline text-xs">
              Website →
            </a>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2 text-sm">
          {showRating && (
            <div className="relative">
              {hasRating ? (
                <div
                  className="flex items-center gap-1 cursor-help"
                  onMouseEnter={() => setShowRatingTooltip(true)}
                  onMouseLeave={() => setShowRatingTooltip(false)}
                >
                  <span className="text-amber-400 text-lg leading-none">{renderStarRating(facility.overall_rating)}</span>
                  <span className="text-slate-600 font-medium text-xs ml-1">{facility.overall_rating?.toFixed(1)}</span>
                  {showRatingTooltip && (
                    <div className="absolute bottom-full left-0 mb-2 p-2 bg-slate-900 text-white text-xs rounded shadow-lg whitespace-nowrap z-10">
                      <div>Health: {facility.health_inspection_rating || 'N/A'}</div>
                      <div>Staffing: {facility.staffing_rating || 'N/A'}</div>
                      <div>Quality: {facility.quality_measure_rating || 'N/A'}</div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-slate-400 text-xs italic">Rating not available</p>
              )}
            </div>
          )}
          {bedCount && <span className="text-slate-500 text-xs">{bedCount}</span>}
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {facility.accepts_medicaid && (
            <span className="inline-flex items-center px-2 py-1 bg-green-50 border border-green-200 rounded text-xs font-medium text-green-800">
              ✓ Medicaid
            </span>
          )}
          {facility.accepts_medicare && (
            <span className="inline-flex items-center px-2 py-1 bg-blue-50 border border-blue-200 rounded text-xs font-medium text-blue-800">
              ✓ Medicare
            </span>
          )}
        </div>
      </div>

      {/* CTA */}
      <div className="p-4 border-t border-slate-100 bg-slate-50">
        <button
          onClick={() => onSelect?.(facility)}
          className="w-full px-4 py-2.5 bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-semibold rounded transition-colors text-sm"
        >
          Get Pricing
        </button>
      </div>
    </div>
  );
}

/** Loading skeleton */
export function FacilityCardSkeleton() {
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden animate-pulse">
      <div className="p-4 border-b border-slate-100">
        <div className="h-6 bg-slate-200 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-slate-200 rounded w-1/3"></div>
      </div>
      <div className="p-4 space-y-3">
        <div className="space-y-2">
          <div className="h-3 bg-slate-200 rounded w-full"></div>
          <div className="h-3 bg-slate-200 rounded w-5/6"></div>
        </div>
        <div className="h-3 bg-slate-200 rounded w-1/2"></div>
        <div className="flex gap-2 pt-2">
          <div className="h-5 bg-slate-200 rounded w-24"></div>
          <div className="h-5 bg-slate-200 rounded w-24"></div>
        </div>
      </div>
      <div className="p-4 border-t border-slate-100 bg-slate-50">
        <div className="h-10 bg-slate-200 rounded"></div>
      </div>
    </div>
  );
}
