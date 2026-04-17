/**
 * StateFacilityTypePage — Shared server component for state + facility-type listing pages.
 *
 * Handles:
 *  - Standard facility types: nursing_home, assisted_living, home_health, hospice, adult_day
 *    Uses: get_facilities_by_state_and_type RPC (supports proximity filtering via lat/lon)
 *  - Memory care (isMemoryCare=true):
 *    Uses: get_memory_care_facilities_by_state RPC (Alzheimer/dementia certification data)
 *
 * Zip+radius proximity filter is URL-param based — the ZipRadiusFilter client component
 * submits to ?zip=...&radius=... and this server component geocodes + queries accordingly.
 */

import React from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import {
  fetchFacilitiesByStateAndType,
  fetchMemoryCareFacilities,
  getLatLonForZip,
  FacilityListItem,
} from '@/lib/facilities';
import { formatPhoneNumber, renderStarRating } from '@/lib/facilityHelpers';
import { TexasFaqAccordion, type FaqItem } from '@/components/texas/TexasFaqAccordion';
import { ZipRadiusFilter } from '@/components/facilities/ZipRadiusFilter';

// ─── Types ─────────────────────────────────────────────────────────────────

export interface StateFacilityTypePageProps {
  state: string;
  stateName: string;
  stateSlug: string;
  facilityType: string;       // "nursing_home" | "assisted_living" | "home_health" | "hospice" | "adult_day" | "memory_care"
  facilityTypeLabel: string;
  facilityTypeSlug: string;
  isMemoryCare?: boolean;
  page?: number;
  sortBy?: 'city' | 'rating';
  zip?: string;
  radius?: number;            // miles
}

// ─── Cost field mapping ─────────────────────────────────────────────────────

interface CostRow {
  monthly_nursing_home_semi_private: number | null;
  monthly_assisted_living: number | null;
  monthly_home_care_services: number | null;
  monthly_adult_day_care: number | null;
}

function getCostForType(row: CostRow, facilityType: string, isMemoryCare: boolean): number | null {
  if (isMemoryCare) {
    const al = row.monthly_assisted_living;
    return al ? Math.round(al * 1.25) : null;
  }
  switch (facilityType) {
    case 'nursing_home':    return row.monthly_nursing_home_semi_private;
    case 'assisted_living': return row.monthly_assisted_living;
    case 'home_health':     return row.monthly_home_care_services;
    case 'adult_day':       return row.monthly_adult_day_care;
    default:                return null; // hospice is Medicare-covered, no direct cost field
  }
}

function formatDollars(num: number | null): string {
  if (!num) return 'N/A';
  return '$' + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// ─── Static config per facility type ───────────────────────────────────────

const TYPE_CONFIG: Record<string, {
  heroSubtext: string;
  costNote: string;
  faqs: FaqItem[];
  contentHubSlug: string;
}> = {
  nursing_home: {
    heroSubtext:
      'Find and compare nursing homes across Texas. View CMS quality ratings, inspection reports, staffing levels, and Medicare/Medicaid acceptance.',
    costNote: 'Statewide median — semi-private room · Source: CareScout 2025',
    contentHubSlug: 'nursing-homes',
    faqs: [
      {
        question: 'What is the CMS Five-Star rating system for nursing homes?',
        answer:
          'The CMS Five-Star Quality Rating System rates nursing homes on a scale of 1–5 stars across three domains: health inspections, staffing levels, and quality measures. Five-star facilities perform above average in all three areas. You can view each sub-rating separately on our facility pages to understand exactly where a facility excels or falls short.',
      },
      {
        question: "What's the difference between skilled nursing and custodial care?",
        answer:
          'Skilled nursing care involves medically necessary services provided by licensed professionals — such as wound care, IV therapy, or physical therapy after a hospitalization. Medicare covers up to 100 days of skilled nursing care following a qualifying hospital stay. Custodial care refers to help with daily activities like bathing, dressing, and eating. Medicare does NOT cover custodial care; it must be paid for privately or through Medicaid.',
      },
      {
        question: 'How much do nursing homes cost in Texas?',
        answer:
          'According to 2025 CareScout data, the median monthly cost for a semi-private room in a Texas nursing home is approximately $6,600–$7,700. A private room typically costs $500–$1,000 more per month. Costs vary significantly by city — major metros like Houston, Dallas, and Austin generally run higher than smaller communities. Use our Cost Calculator for estimates specific to your zip code.',
      },
    ],
  },
  assisted_living: {
    heroSubtext:
      'Find and compare assisted living communities across Texas. Compare services, licensing status, and availability.',
    costNote: 'Statewide median · Source: CareScout 2025',
    contentHubSlug: 'assisted-living',
    faqs: [
      {
        question: 'What services do assisted living facilities provide?',
        answer:
          'Assisted living communities typically provide assistance with activities of daily living (bathing, dressing, grooming, toileting), medication management, meals, housekeeping, laundry, transportation, and social activities. Most also provide 24-hour staff availability for emergencies. Texas law requires assisted living facilities to provide personal care services, but not skilled nursing care.',
      },
      {
        question: 'Does Texas Medicaid cover assisted living?',
        answer:
          'Texas Medicaid does not directly cover room and board in assisted living facilities. However, the STAR+PLUS Home and Community-Based Services (HCBS) waiver can cover personal care, nursing services, and other supports within an assisted living setting for eligible individuals. There is often a waitlist for waiver services. Contact HHSC at 1-800-252-0154 to get on the interest list.',
      },
      {
        question: "What's the difference between assisted living and a nursing home?",
        answer:
          'Assisted living communities are for seniors who need help with daily activities but not around-the-clock medical care. They emphasize independence and a home-like environment. Nursing homes provide 24/7 skilled nursing care for people with significant medical needs. Nursing homes are more regulated and typically cost more than assisted living. If someone\'s medical needs increase beyond what assisted living can accommodate, a transition to a nursing home may be needed.',
      },
    ],
  },
  memory_care: {
    heroSubtext:
      'Find facilities offering Alzheimer\'s and dementia care in Texas. Specialized communities with trained staff, secured environments, and structured programs.',
    costNote: 'Estimated from assisted living median × 1.25 · Source: CareScout 2025',
    contentHubSlug: 'memory-care',
    faqs: [
      {
        question: 'What is memory care and who needs it?',
        answer:
          'Memory care is a specialized form of residential care designed for people with Alzheimer\'s disease, dementia, and other cognitive impairments. Unlike standard assisted living, memory care communities feature secured environments to prevent wandering, staff trained in dementia-specific care techniques, structured daily routines and therapeutic activities, and higher staff-to-resident ratios. Memory care is appropriate when someone can no longer safely live at home or in standard assisted living due to cognitive decline.',
      },
      {
        question: 'How do I know when a loved one needs memory care?',
        answer:
          'Signs that someone may need memory care include: frequent wandering or getting lost, inability to manage daily tasks safely (bathing, dressing, meals), aggressive behavior or extreme mood swings, inability to recognize family members, safety risks at home (leaving stove on, falling frequently), and significant caregiver burnout. A physician assessment and consultation with a geriatric care manager can help determine the right level of care.',
      },
      {
        question: 'What should I look for when choosing a memory care facility?',
        answer:
          'Key things to evaluate: the staff-to-resident ratio (especially overnight), whether staff are specifically trained in dementia care techniques (e.g., Validation Therapy, Teepa Snow\'s Positive Approach), the security features to prevent wandering, the activity programming (music therapy, reminiscence therapy, sensory activities), how the facility communicates with families, the physical layout (simple, low-stimulation environments reduce confusion), and the facility\'s policy on antipsychotic medications. Visit at different times of day before making a decision.',
      },
    ],
  },
  home_health: {
    heroSubtext:
      'Find and compare home health agencies across Texas. Medical care, therapy, and personal assistance delivered to your home.',
    costNote: 'Statewide median (~$27/hr · Based on 40hr/week) · Source: CareScout 2025',
    contentHubSlug: 'home-care',
    faqs: [
      {
        question: "What's the difference between home health and home care?",
        answer:
          'Home health refers to medically necessary services provided by licensed professionals (nurses, physical/occupational/speech therapists) in the home — typically ordered by a physician after a hospitalization or for a chronic condition. Home care (also called personal care or private duty care) refers to non-medical assistance with daily activities like bathing, cooking, and companionship. Medicare covers home health when you\'re homebound and need skilled care; it does NOT cover non-medical home care.',
      },
      {
        question: 'Does Medicare cover home health services in Texas?',
        answer:
          'Medicare covers home health when you meet all of these criteria: (1) you\'re homebound, meaning leaving home requires considerable effort; (2) you need skilled nursing care or physical/occupational/speech therapy; (3) the care is ordered by a physician; and (4) the agency is Medicare-certified. Coverage includes skilled nursing visits, therapy, home health aide visits, and medical social services. There is no copay for home health under Medicare Part A.',
      },
      {
        question: 'How do I choose a home health agency?',
        answer:
          'Look for Medicare-certified agencies, which are subject to federal quality standards. Check the CMS Home Health Compare tool for quality ratings. Ask about the agency\'s response time for urgent calls, staff continuity (seeing the same nurse/aide regularly), how they handle after-hours needs, and whether they accept your insurance. Request references from current or former patients. Confirm the agency is licensed with the Texas Health and Human Services Commission.',
      },
    ],
  },
  hospice: {
    heroSubtext:
      'Find and compare hospice care providers across Texas. Compassionate end-of-life care focused on comfort and family support.',
    costNote: 'Hospice is nearly fully covered by Medicare Part A and most Medicaid plans.',
    contentHubSlug: 'hospice',
    faqs: [
      {
        question: 'When is it time to consider hospice care?',
        answer:
          'Hospice is appropriate when a person\'s illness is terminal, a physician certifies a life expectancy of 6 months or less if the illness follows its expected course, and the focus of care shifts from curative treatment to comfort. Many families wish they had chosen hospice sooner — studies show that hospice patients often live as long or longer than those who continue aggressive treatment, with better quality of life.',
      },
      {
        question: 'Does Medicare cover hospice in Texas?',
        answer:
          'Yes. Medicare covers hospice under the Medicare Hospice Benefit (Part A) when a physician certifies a terminal prognosis of 6 months or less. Coverage includes physician services, nursing visits, aide services, medical equipment, medications related to the terminal illness, counseling, and 13 months of bereavement support for the family. There is minimal cost-sharing: a small copay for medications (capped at $5) and 5% of the Medicare-approved amount for respite care.',
      },
      {
        question: 'What services does hospice provide?',
        answer:
          'Hospice provides a comprehensive team-based approach: physician oversight and coordination, skilled nursing visits for symptom and pain management, home health aide assistance with personal care, social work services for emotional support and care planning, chaplain or spiritual counseling, volunteer companionship and respite for family caregivers, medications and medical equipment related to the terminal diagnosis, and bereavement counseling for family members after the patient\'s death.',
      },
    ],
  },
  adult_day: {
    heroSubtext:
      'Find and compare adult day care programs across Texas. Daytime activities, meals, and supervision for seniors.',
    costNote: 'Statewide median daily rate · Source: CareScout 2025',
    contentHubSlug: 'adult-day-care',
    faqs: [
      {
        question: 'What activities do adult day care programs offer?',
        answer:
          'Adult day care programs typically offer a structured schedule of social activities, health monitoring, therapeutic activities, meals and snacks, transportation assistance, and personal care help. Many programs offer specialized programming for people with dementia. Activities often include group exercise, arts and crafts, music therapy, educational programs, and outings. The goal is meaningful engagement during the day while giving family caregivers a much-needed break.',
      },
      {
        question: 'How much does adult day care cost in Texas?',
        answer:
          'According to 2025 CareScout data, the median daily cost of adult day care in Texas is approximately $78 per day — roughly $1,560/month for a 5-day-a-week schedule. This makes adult day care one of the most affordable senior care options. Costs vary by location and the level of services provided. Programs with medical supervision or specialized dementia care may cost more.',
      },
      {
        question: 'Is adult day care covered by Medicaid in Texas?',
        answer:
          'Yes. Texas Medicaid covers adult day care through the STAR+PLUS Home and Community-Based Services (HCBS) waiver for eligible individuals. The Day Activity and Health Services (DAHS) program specifically funds adult day care for Medicaid recipients who would otherwise require nursing home care. To qualify, you must meet financial eligibility requirements and have a functional need for supervision and assistance. Contact HHSC at 1-800-252-0154 to apply.',
      },
    ],
  },
};

const OTHER_TYPES = [
  { label: 'Nursing Homes', slug: 'nursing-homes' },
  { label: 'Assisted Living', slug: 'assisted-living' },
  { label: 'Memory Care', slug: 'memory-care' },
  { label: 'Home Health', slug: 'home-health' },
  { label: 'Hospice', slug: 'hospice' },
  { label: 'Adult Day Care', slug: 'adult-day-care' },
];

const PAGE_SIZE = 20;

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// ─── Facility row card ──────────────────────────────────────────────────────

function FacilityRow({ facility }: { facility: FacilityListItem }) {
  const phone = formatPhoneNumber(facility.phone);
  const stars = renderStarRating(facility.overall_rating);

  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-3 p-4 border border-slate-200 rounded-xl hover:border-teal-300 hover:bg-teal-50/20 transition-all">
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-slate-900 text-sm leading-snug">
          {facility.facility_name}
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          {facility.address_line_1}, {facility.city}, {facility.state} {facility.zip_code}
        </p>

        <div className="flex flex-wrap items-center gap-2 mt-2">
          {facility.accepts_medicaid && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-700 font-medium">
              ✓ Medicaid
            </span>
          )}
          {facility.accepts_medicare && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-blue-100 text-blue-700 font-medium">
              ✓ Medicare
            </span>
          )}
          {facility.bed_count ? (
            <span className="text-xs text-slate-400">{facility.bed_count} beds</span>
          ) : null}
          {facility.distance_miles !== null && facility.distance_miles !== undefined && (
            <span className="text-xs text-slate-500 font-medium">{facility.distance_miles} mi away</span>
          )}
        </div>
      </div>

      <div className="flex sm:flex-col items-center sm:items-end gap-4 sm:gap-1 flex-shrink-0">
        {stars && (
          <div className="text-right">
            <div className="text-amber-400 text-sm leading-none">{stars}</div>
            <div className="text-xs text-slate-400 mt-0.5">{facility.overall_rating}/5 stars</div>
          </div>
        )}
        {phone && (
          <a
            href={`tel:${facility.phone}`}
            className="text-xs text-teal-600 hover:underline whitespace-nowrap"
          >
            {phone}
          </a>
        )}
      </div>
    </div>
  );
}

// ─── Main server component ──────────────────────────────────────────────────

export async function StateFacilityTypePage({
  state,
  stateName,
  stateSlug,
  facilityType,
  facilityTypeLabel,
  facilityTypeSlug,
  isMemoryCare = false,
  page = 1,
  sortBy = 'city',
  zip,
  radius = 25,
}: StateFacilityTypePageProps) {
  const config = TYPE_CONFIG[isMemoryCare ? 'memory_care' : facilityType];
  const pageUrl = `/${stateSlug}/${facilityTypeSlug}`;

  // ── Geocode zip if provided ──
  let geoCoords: { lat: number; lon: number } | null = null;
  if (zip && zip.length === 5 && !isMemoryCare) {
    geoCoords = await getLatLonForZip(zip);
  }
  const radiusMeters = radius * 1609.34;
  const effectiveSortBy: 'city' | 'rating' | 'distance' =
    geoCoords ? 'distance' : sortBy;

  // ── Fetch facilities ──
  let facilities: FacilityListItem[] = [];
  let total = 0;
  let pages = 0;

  if (isMemoryCare) {
    const result = await fetchMemoryCareFacilities(state, { page, pageSize: PAGE_SIZE, sortBy });
    facilities = result.facilities;
    total = result.total;
    pages = result.pages;
  } else {
    const result = await fetchFacilitiesByStateAndType(state, facilityType, {
      page,
      pageSize: PAGE_SIZE,
      sortBy: effectiveSortBy,
      lat: geoCoords?.lat,
      lon: geoCoords?.lon,
      radiusMeters: geoCoords ? radiusMeters : undefined,
    });
    facilities = result.facilities;
    total = result.total;
    pages = result.pages;
  }

  // ── Fetch cost data ──
  let costMonthly: number | null = null;
  try {
    const { data } = await supabase
      .from('cost_of_care')
      .select(
        'monthly_nursing_home_semi_private,monthly_assisted_living,monthly_home_care_services,monthly_adult_day_care'
      )
      .eq('state_code', state.toUpperCase())
      .eq('level', 'state')
      .limit(1)
      .single();
    if (data) {
      costMonthly = getCostForType(data as CostRow, facilityType, isMemoryCare);
    }
  } catch {
    // cost data optional — page still renders without it
  }

  const startIdx = total > 0 ? (page - 1) * PAGE_SIZE + 1 : 0;
  const endIdx = Math.min(page * PAGE_SIZE, total);
  const isFiltered = Boolean(geoCoords && zip);

  // ── JSON-LD schemas ──
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ourturntocare.org/' },
      { '@type': 'ListItem', position: 2, name: stateName, item: `https://ourturntocare.org/${stateSlug}` },
      { '@type': 'ListItem', position: 3, name: facilityTypeLabel },
    ],
  };

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${facilityTypeLabel} in ${stateName}`,
    url: `https://ourturntocare.org${pageUrl}`,
    breadcrumb: breadcrumbSchema,
  };

  const faqSchema = config?.faqs?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: config.faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      }
    : null;

  return (
    <div className="bg-white">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* ── Breadcrumb ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2 text-sm text-slate-500 flex-wrap">
          <Link href="/" className="hover:text-slate-900">Home</Link>
          <span>/</span>
          <Link href={`/${stateSlug}`} className="hover:text-slate-900">{stateName}</Link>
          <span>/</span>
          <span className="text-slate-900 font-medium">{facilityTypeLabel}</span>
        </div>
      </div>

      {/* ── Hero ── */}
      <div className="bg-gradient-to-br from-teal-50 to-slate-50 border-b border-slate-200 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-3">
            {facilityTypeLabel} in {stateName}
          </h1>
          {total > 0 && (
            <p className="text-teal-600 font-semibold text-lg mb-3">
              {formatNumber(total)} {facilityTypeLabel.toLowerCase()} across {stateName}
            </p>
          )}
          {config?.heroSubtext && (
            <p className="text-lg text-slate-600 max-w-2xl mb-8">
              {config.heroSubtext}
            </p>
          )}

          {/* Zip + radius filter — memory care uses simple zip→city redirect instead */}
          {!isMemoryCare ? (
            <ZipRadiusFilter
              pageUrl={pageUrl}
              activeZip={zip}
              activeRadius={String(radius)}
              sortBy={sortBy}
            />
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-5 max-w-xl">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                Browse by City
              </p>
              <p className="text-sm text-slate-600">
                Memory care facilities are available across Texas.{' '}
                <Link href={`/${stateSlug}`} className="text-teal-600 hover:underline font-medium">
                  Browse cities on the Texas page →
                </Link>
              </p>
            </div>
          )}

          <p className="mt-4 text-sm text-slate-500">
            Or{' '}
            <Link
              href="/tools/care-assessment"
              className="text-teal-600 hover:text-teal-700 font-medium underline"
            >
              take our free Care Assessment →
            </Link>{' '}
            to confirm the right type of care
          </p>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14">

        {/* ── Results bar + facility list ── */}
        <div>
          {/* Proximity filter banner */}
          {isFiltered && (
            <div className="mb-4 flex items-center gap-3 px-4 py-3 bg-teal-50 border border-teal-200 rounded-xl text-sm">
              <span className="text-teal-700 font-medium">
                📍 Showing facilities within {radius} miles of zip {zip}
              </span>
              <Link
                href={`${pageUrl}?sort=${sortBy}`}
                className="ml-auto text-slate-500 hover:text-slate-700 text-xs underline whitespace-nowrap"
              >
                Show all {stateName} →
              </Link>
            </div>
          )}

          {/* Results count + sort */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <p className="text-sm text-slate-600">
              {total > 0
                ? `Showing ${formatNumber(startIdx)}–${formatNumber(endIdx)} of ${formatNumber(total)} ${facilityTypeLabel.toLowerCase()} in ${stateName}`
                : `No ${facilityTypeLabel.toLowerCase()} found — the database RPC may need to be run.`}
            </p>

            {!geoCoords && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-slate-500">Sort:</span>
                <Link
                  href={`${pageUrl}?sort=city${zip ? `&zip=${zip}&radius=${radius}` : ''}`}
                  className={`px-3 py-1 rounded-full border text-xs font-medium transition-colors ${
                    sortBy === 'city'
                      ? 'bg-teal-600 text-white border-teal-600'
                      : 'bg-white text-slate-600 border-slate-300 hover:border-teal-400'
                  }`}
                >
                  City A–Z
                </Link>
                <Link
                  href={`${pageUrl}?sort=rating${zip ? `&zip=${zip}&radius=${radius}` : ''}`}
                  className={`px-3 py-1 rounded-full border text-xs font-medium transition-colors ${
                    sortBy === 'rating'
                      ? 'bg-teal-600 text-white border-teal-600'
                      : 'bg-white text-slate-600 border-slate-300 hover:border-teal-400'
                  }`}
                >
                  Rating
                </Link>
              </div>
            )}
            {geoCoords && (
              <span className="text-xs text-slate-400 italic">Sorted by distance</span>
            )}
          </div>

          {/* Facility list */}
          {facilities.length > 0 ? (
            <div className="space-y-3">
              {facilities.map((facility) => (
                <FacilityRow key={facility.facility_id} facility={facility} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-slate-50 rounded-xl border border-slate-200">
              <p className="text-slate-500 mb-2">
                {isFiltered
                  ? `No facilities found within ${radius} miles of zip ${zip}.`
                  : 'No facilities found.'}
              </p>
              {isFiltered && (
                <Link
                  href={`${pageUrl}?sort=${sortBy}`}
                  className="text-sm text-teal-600 hover:underline"
                >
                  Show all {stateName} facilities →
                </Link>
              )}
              {!isFiltered && (
                <p className="text-xs text-slate-400 mt-1">
                  Run the SQL RPC in Supabase to enable this page.
                </p>
              )}
            </div>
          )}

          {/* Pagination */}
          {pages > 1 && (
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-200">
              <p className="text-sm text-slate-500">Page {page} of {pages}</p>
              <div className="flex gap-2">
                {page > 1 && (
                  <Link
                    href={`${pageUrl}?page=${page - 1}&sort=${sortBy}${zip ? `&zip=${zip}&radius=${radius}` : ''}`}
                    className="px-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-700 hover:border-teal-400 hover:text-teal-700 transition-colors"
                  >
                    ← Previous
                  </Link>
                )}
                {page < pages && (
                  <Link
                    href={`${pageUrl}?page=${page + 1}&sort=${sortBy}${zip ? `&zip=${zip}&radius=${radius}` : ''}`}
                    className="px-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-700 hover:border-teal-400 hover:text-teal-700 transition-colors"
                  >
                    Next →
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ── Cost callout ── */}
        <div className="bg-slate-50 rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-1">
            What {facilityTypeLabel} Cost in {stateName}
          </h2>
          {facilityType === 'hospice' || (facilityType !== 'hospice' && !costMonthly) ? (
            <>
              {facilityType === 'hospice' ? (
                <p className="text-slate-600 text-sm mb-3">
                  {config?.costNote}
                </p>
              ) : (
                <p className="text-slate-600 text-sm mb-3">
                  Costs vary by city, facility, and level of care.
                </p>
              )}
            </>
          ) : (
            <div className="mb-3">
              <div className="text-2xl font-bold text-teal-600 mb-0.5">
                {formatDollars(costMonthly)}/mo
              </div>
              {costMonthly && (
                <div className="text-xs text-slate-500 mb-2">
                  {formatDollars(costMonthly * 12)}/year · {config?.costNote}
                </div>
              )}
              <p className="text-slate-600 text-sm">
                Costs vary significantly by city — major metros typically run 15–30% higher than rural areas.
              </p>
            </div>
          )}
          <Link
            href="/tools/cost-calculator"
            className="inline-flex items-center text-sm font-semibold text-teal-600 hover:text-teal-700"
          >
            Get cost estimates for your zip code →
          </Link>
        </div>

        {/* ── FAQs ── */}
        {config?.faqs?.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              {facilityTypeLabel} FAQs
            </h2>
            <TexasFaqAccordion faqs={config.faqs} />
          </div>
        )}

        {/* ── Cross-links ── */}
        <div className="border-t border-slate-200 pt-10 space-y-8">
          {/* CTA */}
          <div className="bg-teal-50 rounded-xl p-6 border border-teal-200">
            <h2 className="text-lg font-bold text-slate-900 mb-2">
              Not sure {facilityTypeLabel.toLowerCase()} is right?
            </h2>
            <p className="text-slate-600 text-sm mb-4">
              Our free Care Assessment asks about health needs, safety concerns, and independence
              level to recommend the best type of care — in about 5 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/tools/care-assessment"
                className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-colors text-sm inline-flex items-center justify-center"
              >
                Take the Care Assessment
              </Link>
              <Link
                href={`/${stateSlug}`}
                className="px-5 py-2.5 border border-slate-300 text-slate-600 hover:bg-slate-50 font-medium rounded-lg transition-colors text-sm inline-flex items-center justify-center"
              >
                ← Back to {stateName}
              </Link>
            </div>
          </div>

          {/* Also in Texas */}
          <div>
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
              Also in {stateName}
            </h3>
            <div className="flex flex-wrap gap-2">
              {OTHER_TYPES.filter((t) => t.slug !== facilityTypeSlug).map((t) => (
                <Link
                  key={t.slug}
                  href={`/${stateSlug}/${t.slug}`}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-700 rounded-lg text-sm transition-colors"
                >
                  {t.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Learn more */}
          {config?.contentHubSlug && (
            <p className="text-sm text-slate-500">
              <Link
                href={`/${config.contentHubSlug}`}
                className="text-teal-600 hover:text-teal-700 font-medium hover:underline"
              >
                Learn more about {facilityTypeLabel.toLowerCase()} →
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
