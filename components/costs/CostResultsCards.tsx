/**
 * CostResultsCards Component
 *
 * Displays care cost data in the card layout used by the Cost Calculator.
 * Shows side-by-side cost cards for all care types with real CareScout data.
 *
 * Drop this into your Cost Calculator results section to replace
 * the placeholder cost ranges.
 *
 * Usage:
 *   import { CostResultsCards } from '@/components/costs/CostResultsCards';
 *   import { useCostData } from '@/hooks/useCostData';
 *
 *   const { summary, loading, locationLabel, stateName, hasMsaData } = useCostData(zipCode);
 *
 *   <CostResultsCards
 *     summary={summary}
 *     loading={loading}
 *     locationLabel={locationLabel}
 *     stateName={stateName}
 *     hasMsaData={hasMsaData}
 *     zip={zipCode}
 *   />
 */

'use client';

import React from 'react';
import { getCostSummary } from '@/lib/costs';

// ============================================================
// TYPES
// ============================================================

interface CostResultsCardsProps {
  summary: ReturnType<typeof getCostSummary> | null;
  loading: boolean;
  locationLabel: string | null;
  stateName: string | null;
  hasMsaData: boolean;
  zip: string;
}

// ============================================================
// INDIVIDUAL COST CARD
// ============================================================

function CostCard({
  title,
  monthly,
  annual,
  subtitle,
  icon,
}: {
  title: string;
  monthly: string;
  annual: string;
  subtitle?: string;
  icon: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
      <div className="text-3xl mb-2">{icon}</div>
      <h3 className="font-semibold text-slate-800 text-lg mb-1">{title}</h3>
      {subtitle && (
        <p className="text-xs text-slate-500 mb-3">{subtitle}</p>
      )}
      <div className="text-2xl font-bold text-teal-700 mb-1">{monthly}</div>
      <div className="text-sm text-slate-500">{annual}</div>
    </div>
  );
}

// ============================================================
// LOADING SKELETON
// ============================================================

function CostCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col items-center animate-pulse">
      <div className="w-10 h-10 bg-slate-200 rounded-full mb-2" />
      <div className="w-24 h-5 bg-slate-200 rounded mb-3" />
      <div className="w-20 h-8 bg-slate-200 rounded mb-1" />
      <div className="w-16 h-4 bg-slate-200 rounded" />
    </div>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export function CostResultsCards({
  summary,
  loading,
  locationLabel,
  stateName,
  hasMsaData,
  zip,
}: CostResultsCardsProps) {

  // Loading state
  if (loading) {
    return (
      <div>
        <div className="mb-6">
          <div className="w-64 h-7 bg-slate-200 rounded animate-pulse mb-2" />
          <div className="w-48 h-4 bg-slate-200 rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <CostCardSkeleton />
          <CostCardSkeleton />
          <CostCardSkeleton />
          <CostCardSkeleton />
        </div>
      </div>
    );
  }

  // No data state
  if (!summary) {
    return null;
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
          Care costs near {locationLabel || stateName || `zip ${zip}`}
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          {hasMsaData
            ? `Metro area median costs (${stateName})`
            : `${stateName} statewide median costs`
          }
          {' '}· Source: CareScout 2025 Cost of Care Survey
        </p>
      </div>

      {/* Cost Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <CostCard
          title="Memory Care"
          monthly={summary.memoryCare.monthly}
          annual={summary.memoryCare.annual}
          subtitle="24-hour specialized dementia care"
          icon="🧠"
        />
        <CostCard
          title="Assisted Living"
          monthly={summary.assistedLiving.monthly}
          annual={summary.assistedLiving.annual}
          subtitle="Help with daily activities"
          icon="🏠"
        />
        <CostCard
          title="Home Care"
          monthly={summary.homeCare.monthly}
          annual={summary.homeCare.annual}
          subtitle={`~${summary.homeCare.hourly}/hr · Based on 40hr/week`}
          icon="💛"
        />
        <CostCard
          title="Nursing Home"
          monthly={summary.nursingHome.monthly}
          annual={summary.nursingHome.annual}
          subtitle={`Semi-private: ${summary.nursingHome.monthlySemiPrivate}`}
          icon="🏥"
        />
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-slate-400 leading-relaxed">
        These are median costs based on the 2025 CareScout Cost of Care Survey.
        Actual costs vary by community, level of care, and amenities.
        {summary.memoryCare.note && (
          <> Memory care estimate is based on assisted living costs plus a typical
          20-25% memory care premium.</>
        )}
      </p>
    </div>
  );
}

// ============================================================
// COMPACT VERSION (for Care Assessment results page)
// ============================================================

/**
 * A more compact cost display for embedding in the Care Assessment results.
 * Shows only the recommended care type's cost prominently,
 * with the others as smaller references.
 */
export function CostEstimateBlock({
  summary,
  recommendedCareType,
  locationLabel,
  stateName,
  loading,
}: {
  summary: ReturnType<typeof getCostSummary> | null;
  /** Which care type to highlight: 'memoryCare' | 'assistedLiving' | 'homeCare' | 'nursingHome' | 'adultDayCare' */
  recommendedCareType: 'memoryCare' | 'assistedLiving' | 'homeCare' | 'nursingHome' | 'adultDayCare';
  locationLabel: string | null;
  stateName: string | null;
  loading: boolean;
}) {
  if (loading) {
    return (
      <div className="bg-slate-50 rounded-xl p-5 animate-pulse">
        <div className="w-48 h-5 bg-slate-200 rounded mb-4" />
        <div className="w-32 h-8 bg-slate-200 rounded mb-2" />
        <div className="w-24 h-4 bg-slate-200 rounded" />
      </div>
    );
  }

  if (!summary) return null;

  // Map care type to display info
  const careTypeMap: Record<string, { label: string; data: any }> = {
    memoryCare: { label: 'Memory Care', data: summary.memoryCare },
    assistedLiving: { label: 'Assisted Living', data: summary.assistedLiving },
    homeCare: { label: 'Home Care', data: summary.homeCare },
    nursingHome: { label: 'Nursing Home', data: summary.nursingHome },
    adultDayCare: { label: 'Adult Day Care', data: summary.adultDayCare },
  };

  const primary = careTypeMap[recommendedCareType];
  if (!primary) return null;

  return (
    <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
      <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
        Estimated Costs in {locationLabel || stateName || 'Your Area'}
      </h3>

      {/* Primary cost */}
      <div className="mb-4">
        <p className="text-sm text-slate-600 mb-1">
          {primary.label} typically costs:
        </p>
        <p className="text-3xl font-bold text-teal-700">
          {primary.data.monthly}
        </p>
        <p className="text-sm text-slate-500">
          {primary.data.annual}
        </p>
      </div>

      {/* Other care types for comparison */}
      <div className="border-t border-slate-200 pt-3">
        <p className="text-xs text-slate-500 mb-2">For comparison:</p>
        <div className="grid grid-cols-2 gap-2 text-sm">
          {Object.entries(careTypeMap)
            .filter(([key]) => key !== recommendedCareType)
            .slice(0, 4)
            .map(([key, { label, data }]) => (
              <div key={key} className="flex justify-between">
                <span className="text-slate-600">{label}:</span>
                <span className="font-medium text-slate-800">{data.monthly}</span>
              </div>
            ))}
        </div>
      </div>

      <p className="text-xs text-slate-400 mt-3">
        Source: CareScout 2025 Survey · Median costs
      </p>
    </div>
  );
}
