import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getFacilityCountsByState, getDistinctCitiesByState } from '@/lib/facilities';
import { supabase } from '@/lib/supabase';
import { TexasZipSearch } from '@/components/texas/TexasZipSearch';
import { TexasCityBrowser } from '@/components/texas/TexasCityBrowser';
import { TexasFaqAccordion, type FaqItem } from '@/components/texas/TexasFaqAccordion';
import { StateCityLeadForm } from '@/components/forms/StateCityLeadForm';
import { TexasStickyBar } from '@/components/texas/TexasStickyBar';

export const metadata: Metadata = {
  title: 'Senior Care in Texas — Find Nursing Homes, Assisted Living & Memory Care (2026)',
  description:
    'Compare 6,535+ senior care facilities across 590 Texas cities. Find nursing homes, assisted living, memory care, home health & hospice with costs, ratings, and Medicaid info.',
  keywords:
    'nursing homes Texas, assisted living Texas, memory care Texas, home health Texas, hospice Texas, senior care Texas, Medicaid Texas',
  openGraph: {
    title: 'Senior Care in Texas — Find Nursing Homes, Assisted Living & Memory Care',
    description:
      'Compare 6,535+ senior care facilities across 590 Texas cities. Costs, ratings, and Medicaid info.',
    url: 'https://ourturntocare.org/texas',
    siteName: 'OurTurnToCare',
    type: 'website',
  },
};

export const dynamic = 'force-dynamic';

function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function formatDollars(num: number | null): string {
  if (!num) return 'N/A';
  return '$' + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const STATS = {
  totalFacilities: 6535,
  citiesServed: 585,
  assistedLiving: 2043,
  memoryCare: 1863,
  nursingHomes: 1164,
  homeHealth: 1849,
  hospice: 1081,
  adultDayCare: 398,
};

const FACILITY_TILES = [
  { label: 'Assisted Living', count: STATS.assistedLiving, href: '/texas/assisted-living' },
  { label: 'Memory Care', count: STATS.memoryCare, href: '/texas/memory-care' },
  { label: 'Nursing Homes', count: STATS.nursingHomes, href: '/texas/nursing-homes' },
  { label: 'Home Health', count: STATS.homeHealth, href: '/texas/home-health' },
  { label: 'Hospice', count: STATS.hospice, href: '/texas/hospice' },
  { label: 'Adult Day Care', count: STATS.adultDayCare, href: '/texas/adult-day-care' },
];

const TOP_10_CITIES = [
  { name: 'Houston', slug: 'houston' },
  { name: 'San Antonio', slug: 'san-antonio' },
  { name: 'Dallas', slug: 'dallas' },
  { name: 'Austin', slug: 'austin' },
  { name: 'Fort Worth', slug: 'fort-worth' },
  { name: 'El Paso', slug: 'el-paso' },
  { name: 'Arlington', slug: 'arlington' },
  { name: 'Corpus Christi', slug: 'corpus-christi' },
  { name: 'Lubbock', slug: 'lubbock' },
  { name: 'Amarillo', slug: 'amarillo' },
];

const TEXAS_FAQS: FaqItem[] = [
  {
    question: 'How much does senior care cost in Texas?',
    answer:
      'Senior care costs in Texas vary widely by type. According to 2025 CareScout data, the median cost of a semi-private room in a Texas nursing home is approximately $6,600–$7,700 per month. Assisted living averages around $4,500–$5,500 per month, while home health aide services average $27 per hour. Adult day care is the most affordable option at roughly $78 per day. Costs can vary significantly by city — care in Houston or Dallas tends to be higher than in smaller communities. Use our Cost Calculator for estimates specific to your area.',
  },
  {
    question: 'Does Texas Medicaid cover assisted living?',
    answer:
      'Texas Medicaid does not directly cover room and board in assisted living facilities, but the state offers the STAR+PLUS Home and Community-Based Services (HCBS) waiver, which can help cover personal care, nursing services, and other support in assisted living settings. Eligibility is based on income, assets, and functional need. There is often a waitlist for waiver services. Texas also has a Community Attendant Services (CAS) program for those who qualify. Use our Medicaid Eligibility Screener to check if you or your loved one may qualify.',
  },
  {
    question: 'How do I find a good nursing home in Texas?',
    answer:
      'Start by checking the CMS Five-Star Quality Rating on our facility listings — facilities rated 4 or 5 stars generally have better health inspections, staffing levels, and quality measures. Look at deficiency counts (lower is better) and check for any recent penalties. Visit in person during mealtimes to observe staff interactions. Ask about staff-to-resident ratios, especially for night shifts. Review the most recent state inspection report. Our facility pages show ratings, deficiency history, and whether a facility accepts Medicare or Medicaid, so you can compare options side by side.',
  },
  {
    question: "What's the difference between assisted living and memory care?",
    answer:
      "Assisted living provides help with daily activities like bathing, dressing, meals, and medication management for seniors who are largely independent but need some support. Memory care is a specialized form of assisted living designed specifically for people with Alzheimer's disease, dementia, or other cognitive impairments. Memory care communities offer secured environments to prevent wandering, structured daily routines, and staff trained in dementia-specific care techniques. Memory care is typically more expensive than standard assisted living due to the higher staffing ratios and specialized programming required.",
  },
  {
    question: 'Does Medicare pay for long-term care in Texas?',
    answer:
      'Medicare has very limited coverage for long-term care. It covers up to 100 days of skilled nursing facility care following a qualifying 3-day hospital stay — with full coverage for days 1–20 and a daily copay for days 21–100. Medicare does NOT cover custodial care (help with daily activities like bathing and dressing), which is what most people need in assisted living or nursing homes long-term. Medicare does cover home health services when you need skilled nursing or therapy and are homebound. For true long-term care, most Texans rely on Medicaid, long-term care insurance, or private pay.',
  },
  {
    question: 'How do I qualify for Medicaid nursing home coverage in Texas?',
    answer:
      'To qualify for Medicaid nursing home coverage in Texas, you must meet both financial and medical criteria. Financial requirements include a monthly income limit (currently ~$2,829/month for an individual) and an asset limit of $2,000 in countable resources. Your primary home, one vehicle, and personal belongings are generally exempt. You must also demonstrate a medical need for nursing facility-level care, typically assessed through a functional evaluation. Texas has a Medicaid Estate Recovery Program that may seek reimbursement from your estate after death. Use our Medicaid Eligibility Screener for a personalized estimate.',
  },
  {
    question: 'How do I report abuse or neglect at a Texas care facility?',
    answer:
      'Contact the Texas Health and Human Services Commission (HHSC) abuse hotline at 1-800-458-9858. You can report suspected abuse, neglect, or exploitation of anyone receiving care in a nursing home, assisted living facility, or through a home health agency. Reports can be made 24/7 and can be anonymous. You can also file a complaint online through the HHSC website. If someone is in immediate danger, call 911 first.',
  },
  {
    question: 'What is the Texas Long-Term Care Ombudsman and how can they help?',
    answer:
      'The Texas Long-Term Care Ombudsman is a free, confidential advocacy service for residents of nursing homes and assisted living facilities. Ombudsmen help resolve complaints, explain residents\' rights, and can investigate concerns about care quality. Texas has 28 regional ombudsman programs — you can reach one by calling 1-800-252-2412. The program operates independently of the facilities and government agencies that regulate them.',
  },
  {
    question: 'Can I use VA benefits to pay for assisted living or memory care in Texas?',
    answer:
      'Yes. Veterans who served during wartime and need help with daily activities may qualify for the VA Aid & Attendance benefit, which can provide up to $2,431/month for a single veteran or $2,870/month for a veteran with a spouse (2024 rates). This benefit can be used toward assisted living, memory care, or home care costs. Texas also has 9 state veterans homes that offer affordable long-term care for veterans and their spouses.',
  },
  {
    question: 'How long is the Medicaid waiver waitlist in Texas?',
    answer:
      'Texas Medicaid waivers for community-based services, including the STAR+PLUS Home and Community-Based Services (HCBS) waiver, often have significant waitlists. Wait times vary by region and can range from several months to several years. To get on the interest list, contact the HHSC Interest List Management unit or your managed care organization if you\'re already enrolled in STAR+PLUS. Nursing home Medicaid does not have a waitlist — if you meet the financial and medical criteria, coverage can begin immediately.',
  },
  {
    question: 'What rights do nursing home residents have in Texas?',
    answer:
      'Texas nursing home residents have extensive legal protections under both federal law (the Nursing Home Reform Act) and the Texas Health and Safety Code. Key rights include: the right to be treated with dignity and respect, the right to participate in your own care planning, the right to voice complaints without retaliation, the right to manage your own finances, the right to privacy, and the right to be free from physical or chemical restraints unless medically necessary. The Texas Long-Term Care Ombudsman (1-800-252-2412) can help if you believe these rights are being violated.',
  },
  {
    question: 'What is the STAR+PLUS program and who qualifies?',
    answer:
      'STAR+PLUS is a Texas Medicaid managed care program for adults age 21+ who have disabilities or are age 65 or older. It combines acute care (doctor visits, hospital stays) with long-term services and supports. The STAR+PLUS HCBS waiver provides home and community-based services that help people live at home instead of in a nursing facility. To qualify, you must be eligible for Medicaid and demonstrate a need for nursing-facility-level care. Services include personal attendant care, assisted living, adult day care, home modifications, and more.',
  },
];

interface CostRow {
  monthly_nursing_home_semi_private: number | null;
  monthly_assisted_living: number | null;
  monthly_home_care_services: number | null;
  monthly_adult_day_care: number | null;
}

interface StatCostCards {
  memoryCare: number | null;
  assistedLiving: number | null;
  homeCare: number | null;
  nursingHome: number | null;
  adultDay: number | null;
}

export default async function TexasPage() {
  let stats = {
    total: 0,
    nursing_home: 0,
    assisted_living: 0,
    home_health: 0,
    hospice: 0,
    adult_day: 0,
  };
  let cities: string[] = [];
  let statCosts: StatCostCards = {
    memoryCare: null,
    assistedLiving: null,
    homeCare: null,
    nursingHome: null,
    adultDay: null,
  };

  try {
    const counts = await getFacilityCountsByState('TX');
    stats = {
      total: counts.all,
      nursing_home: counts.nursing_home,
      assisted_living: counts.assisted_living,
      home_health: counts.home_health,
      hospice: counts.hospice,
      adult_day: counts.adult_day,
    };
    cities = await getDistinctCitiesByState('TX');
  } catch (err) {
    console.error('Error fetching Texas facility data:', err);
  }

  try {
    const { data } = await supabase
      .from('cost_of_care')
      .select(
        'monthly_nursing_home_semi_private,monthly_assisted_living,monthly_home_care_services,monthly_adult_day_care'
      )
      .eq('state_code', 'TX')
      .eq('level', 'state')
      .limit(1)
      .single();

    if (data) {
      const row = data as CostRow;
      const al = row.monthly_assisted_living;
      statCosts = {
        assistedLiving: al,
        memoryCare: al ? Math.round(al * 1.25) : null,
        homeCare: row.monthly_home_care_services,
        nursingHome: row.monthly_nursing_home_semi_private,
        adultDay: row.monthly_adult_day_care,
      };
    }
  } catch (err) {
    console.error('Error fetching cost data:', err);
  }

  const sortedCities = [...cities].sort();

  // ── Schema markup ──
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: TEXAS_FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ourturntocare.org/' },
      { '@type': 'ListItem', position: 2, name: 'Texas', item: 'https://ourturntocare.org/texas' },
    ],
  };

  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: 'Senior Care in Texas',
    description:
      'Find and compare 6,535+ senior care facilities across 590 Texas cities. Nursing homes, assisted living, memory care, home health, hospice, and adult day care.',
    url: 'https://ourturntocare.org/texas',
    about: { '@type': 'MedicalCondition', name: 'Aging and Elder Care' },
    audience: { '@type': 'PeopleAudience', audienceType: 'Family Caregivers' },
  };

  const hasCostData =
    statCosts.assistedLiving || statCosts.nursingHome || statCosts.homeCare;

  return (
    <div className="bg-white">
      {/* ── JSON-LD Schema ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      {/* ── Sticky mobile bar ── */}
      <TexasStickyBar />

      {/* ── Breadcrumb ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-slate-900">
            Home
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-medium">Texas</span>
        </div>
      </div>

      {/* ════════════════════════════════════════
          SECTION 1: HERO
      ════════════════════════════════════════ */}
      <div className="bg-gradient-to-br from-teal-50 to-slate-50 border-b border-slate-200 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Senior Care in Texas
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 mb-8 max-w-2xl">
            Find nursing homes, assisted living, memory care, home health, and other
            senior care facilities across Texas. Compare costs, ratings, and services
            to make the best choice for your loved one.
          </p>

          {/* Zip code search */}
          <TexasZipSearch />

          {/* Secondary CTA */}
          <p className="mt-4 text-sm text-slate-500">
            Or take our{' '}
            <Link
              href="/tools/care-assessment"
              className="text-teal-600 hover:text-teal-700 font-medium underline"
            >
              free Care Assessment →
            </Link>{' '}
            to find the right type of care
          </p>
        </div>
      </div>

      {/* ════════════════════════════════════════
          SECTION 2: STATS BANNER
      ════════════════════════════════════════ */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">

          {/* Tier 1 — Value-prop headline + subhead */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Search the Largest Database of Texas Senior Care Facilities
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto mt-3">
            Find the right care for yourself or a loved one — powered by CMS ratings, state
            licensing data, and verified cost information.
          </p>

          {/* Tier 2 — Hero stat */}
          <div className="mt-8 flex flex-col items-center gap-1">
            <div className="flex flex-col sm:flex-row sm:items-end sm:gap-3">
              <span className="text-6xl md:text-7xl font-bold text-teal-600 leading-none">
                {formatNumber(STATS.totalFacilities)}
              </span>
              <span className="text-xl text-gray-700 sm:pb-2">facilities</span>
            </div>
            <p className="text-base text-gray-500 mt-1">
              across {formatNumber(STATS.citiesServed)} Texas cities
            </p>
          </div>

          {/* Tier 3 — Six facility-type tiles */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4 mt-8">
            {FACILITY_TILES.map((tile) => (
              <Link
                key={tile.href}
                href={tile.href}
                className="block rounded-lg border border-gray-200 bg-white p-3 md:p-4 text-center hover:border-teal-500 hover:shadow-md transition-all"
              >
                <div className="text-2xl md:text-3xl font-bold text-teal-600">
                  {formatNumber(tile.count)}
                </div>
                <div className="text-sm text-gray-600 mt-1">{tile.label}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════
          SECTION 3: COST SUMMARY
      ════════════════════════════════════════ */}
      {hasCostData && (
        <div className="bg-slate-50 border-b border-slate-200 py-14">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-1">
              What Senior Care Costs in Texas
            </h2>
            <p className="text-slate-500 text-sm mb-8">
              Statewide median costs · Source: CareScout 2025 Cost of Care Survey
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                {
                  icon: '🧠',
                  label: 'Memory Care',
                  subtitle: '24-hour specialized dementia care',
                  monthly: statCosts.memoryCare,
                },
                {
                  icon: '🏡',
                  label: 'Assisted Living',
                  subtitle: 'Help with daily activities',
                  monthly: statCosts.assistedLiving,
                },
                {
                  icon: '💛',
                  label: 'Home Care',
                  subtitle: '~$27/hr · Based on 40hr/week',
                  monthly: statCosts.homeCare,
                },
                {
                  icon: '🏥',
                  label: 'Nursing Home',
                  subtitle: 'Semi-private room · 24/7 skilled care',
                  monthly: statCosts.nursingHome,
                },
              ].map((card) => (
                <div
                  key={card.label}
                  className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm"
                >
                  <div className="text-2xl mb-2">{card.icon}</div>
                  <div className="font-semibold text-slate-900 text-sm mb-1">
                    {card.label}
                  </div>
                  <div className="text-xs text-slate-400 mb-3 leading-snug">
                    {card.subtitle}
                  </div>
                  <div className="text-xl font-bold text-teal-600">
                    {formatDollars(card.monthly)}/mo
                  </div>
                  {card.monthly && (
                    <div className="text-xs text-slate-500 mt-0.5">
                      {formatDollars(card.monthly * 12)}/year
                    </div>
                  )}
                </div>
              ))}
            </div>

            <p className="text-xs text-slate-500 mb-6">
              These are statewide median costs based on the 2025 CareScout Cost of Care Survey.
              Actual costs vary by city, community, level of care, and amenities.{' '}
              <Link
                href="/tools/cost-calculator"
                className="text-teal-600 hover:underline font-medium"
              >
                Get costs for your specific area →
              </Link>
            </p>

            {/* Urban vs. Rural callout */}
            <div className="bg-teal-50 border border-teal-200 rounded-xl p-5 flex gap-4">
              <span className="text-2xl flex-shrink-0">📊</span>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">
                  Urban vs. Rural Cost Differences
                </h3>
                <p className="text-slate-600 text-sm mb-3">
                  Care costs in major Texas metros (Houston, Dallas, Austin, San Antonio)
                  typically run 15–30% higher than rural areas. Use our Cost Calculator
                  with your zip code for area-specific estimates.
                </p>
                <Link
                  href="/tools/cost-calculator"
                  className="inline-flex items-center text-sm font-semibold text-teal-600 hover:text-teal-700"
                >
                  Calculate Your Area&apos;s Costs →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════
          MAIN CONTENT WRAPPER
      ════════════════════════════════════════ */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">

        {/* ════════════════════════════════════════
            SECTION 4: CARE TYPE CARDS
        ════════════════════════════════════════ */}
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-8">
            Types of Senior Care in Texas
          </h2>
          <div className="grid md:grid-cols-2 gap-6">

            {/* Nursing Homes */}
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <h3 className="text-xl font-semibold text-slate-900 mb-1">Nursing Homes</h3>
              <p className="text-sm text-teal-600 font-medium mb-3">
                {formatNumber(stats.nursing_home)} facilities in Texas
              </p>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Nursing homes provide 24/7 medical care, rehabilitation services, and daily
                living assistance for seniors with significant health needs. Licensed
                facilities offer medication management and skilled nursing services.
              </p>
              <div className="flex flex-col gap-1.5">
                <Link
                  href="/texas/nursing-homes"
                  className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium text-sm"
                >
                  View nursing homes in Texas →
                </Link>
                <Link
                  href="/nursing-homes"
                  className="inline-flex items-center text-slate-500 hover:text-slate-700 text-xs"
                >
                  Learn about nursing home care →
                </Link>
              </div>
            </div>

            {/* Assisted Living */}
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <h3 className="text-xl font-semibold text-slate-900 mb-1">Assisted Living</h3>
              <p className="text-sm text-teal-600 font-medium mb-3">
                {formatNumber(stats.assisted_living)} facilities in Texas
              </p>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Assisted living communities offer a balance of independence and support.
                Residents get help with daily activities like bathing and meals while
                maintaining privacy in their own apartments.
              </p>
              <div className="flex flex-col gap-1.5">
                <Link
                  href="/texas/assisted-living"
                  className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium text-sm"
                >
                  View assisted living in Texas →
                </Link>
                <Link
                  href="/assisted-living"
                  className="inline-flex items-center text-slate-500 hover:text-slate-700 text-xs"
                >
                  Learn about assisted living →
                </Link>
              </div>
            </div>

            {/* Memory Care */}
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <h3 className="text-xl font-semibold text-slate-900 mb-1">Memory Care</h3>
              <p className="text-sm text-teal-600 font-medium mb-3">
                1,863 facilities with memory care in Texas
              </p>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Memory care is a specialized form of assisted living or nursing home care
                designed for people with Alzheimer&apos;s, dementia, or other cognitive
                impairments. These secured communities provide structured routines, trained
                staff, and safety features to prevent wandering.
              </p>
              <div className="flex flex-col gap-1.5">
                <Link
                  href="/texas/memory-care"
                  className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium text-sm"
                >
                  View memory care in Texas →
                </Link>
                <Link
                  href="/memory-care"
                  className="inline-flex items-center text-slate-500 hover:text-slate-700 text-xs"
                >
                  Learn about memory care →
                </Link>
              </div>
            </div>

            {/* Home Health */}
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <h3 className="text-xl font-semibold text-slate-900 mb-1">Home Health</h3>
              <p className="text-sm text-teal-600 font-medium mb-3">
                {formatNumber(stats.home_health)} agencies in Texas
              </p>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Home health services bring medical and personal care to your home. Nurses,
                therapists, and aides visit to provide treatments, recovery services, and
                assistance after hospitalization.
              </p>
              <div className="flex flex-col gap-1.5">
                <Link
                  href="/texas/home-health"
                  className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium text-sm"
                >
                  View home health in Texas →
                </Link>
                <Link
                  href="/home-care"
                  className="inline-flex items-center text-slate-500 hover:text-slate-700 text-xs"
                >
                  Learn about home care →
                </Link>
              </div>
            </div>

            {/* Hospice */}
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <h3 className="text-xl font-semibold text-slate-900 mb-1">Hospice Care</h3>
              <p className="text-sm text-teal-600 font-medium mb-3">
                {formatNumber(stats.hospice)} providers in Texas
              </p>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Hospice provides compassionate, comfort-focused care for people with
                terminal illnesses. The focus is on quality of life, pain management, and
                emotional support for both patients and families.
              </p>
              <Link
                href="/texas/hospice"
                className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium text-sm"
              >
                View hospice care in Texas →
              </Link>
            </div>

            {/* Adult Day */}
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <h3 className="text-xl font-semibold text-slate-900 mb-1">Adult Day Care</h3>
              <p className="text-sm text-teal-600 font-medium mb-3">
                {formatNumber(stats.adult_day)} programs in Texas
              </p>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Adult day programs offer social activities, meals, and supervision during
                daytime hours. Ideal for seniors who live with family and need structured
                activities while caregivers work.
              </p>
              <Link
                href="/texas/adult-day-care"
                className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium text-sm"
              >
                View adult day care in Texas →
              </Link>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════
            SECTION 5: CARE ASSESSMENT CTA BANNER
        ════════════════════════════════════════ */}
        <div className="bg-teal-50 rounded-xl p-8 border border-teal-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">
            Not sure what type of care is right?
          </h2>
          <p className="text-slate-600 mb-6 max-w-xl">
            Our Care Assessment tool helps you determine the best care option based on
            your loved one&apos;s health needs and independence level. Takes about 5 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/tools/care-assessment"
              className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-colors inline-flex items-center justify-center"
            >
              Take the Care Assessment
            </Link>
            <Link
              href="/tools/cost-calculator"
              className="px-6 py-3 border-2 border-teal-600 text-teal-600 hover:bg-teal-50 font-semibold rounded-lg transition-colors inline-flex items-center justify-center"
            >
              Calculate Costs
            </Link>
          </div>
        </div>

        {/* ════════════════════════════════════════
            SECTION 6: TOP 10 CITIES
        ════════════════════════════════════════ */}
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            Top 10 Cities for Senior Care in Texas
          </h2>
          <p className="text-slate-500 mb-8 text-sm">
            The largest Texas cities with the most senior care options.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {TOP_10_CITIES.map((city, index) => (
              <Link
                key={city.slug}
                href={`/texas/${city.slug}`}
                className="group p-4 border border-slate-200 rounded-xl hover:border-teal-400 hover:bg-teal-50 transition-all text-center"
              >
                <div className="text-xs text-slate-400 font-medium mb-1">
                  #{index + 1}
                </div>
                <h3 className="font-semibold text-slate-900 group-hover:text-teal-700 transition-colors text-sm">
                  {city.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1 group-hover:text-teal-600">
                  View facilities →
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* ════════════════════════════════════════
            SECTION 7: CITY SEARCH & BROWSE
        ════════════════════════════════════════ */}
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            Browse All Texas Cities
          </h2>
          <p className="text-slate-500 mb-6 text-sm">
            {formatNumber(sortedCities.length)} cities with senior care facilities. Search
            by name or filter by letter.
          </p>

          {sortedCities.length > 0 ? (
            <TexasCityBrowser cities={sortedCities} />
          ) : (
            <div className="text-center py-12 bg-slate-50 rounded-xl border border-slate-200">
              <p className="text-slate-500">Loading cities…</p>
            </div>
          )}
        </div>

        {/* ════════════════════════════════════════
            SECTION 8: FAQs
        ════════════════════════════════════════ */}
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-8">
            Texas Senior Care FAQs
          </h2>
          <TexasFaqAccordion faqs={TEXAS_FAQS} />
        </div>

        {/* ════════════════════════════════════════
            SECTION 9: LEAD CAPTURE
        ════════════════════════════════════════ */}
        <StateCityLeadForm state="Texas" stateSlug="texas" />

        {/* ════════════════════════════════════════
            SECTION 10: TEXAS RESOURCES
        ════════════════════════════════════════ */}
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            Texas Senior Care Resources
          </h2>
          <p className="text-slate-500 mb-8 text-sm">
            Official agencies, advocacy organizations, and tools to help you navigate
            senior care in Texas.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Column 1: Texas Government Agencies */}
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
                🏛 Texas Government Agencies
              </h3>
              <ul className="space-y-3">
                {[
                  {
                    label: 'Texas Health & Human Services Commission (HHSC)',
                    href: 'https://www.hhs.texas.gov/services/aging/long-term-care',
                    note: 'Long-term care services and regulation',
                    external: true,
                  },
                  {
                    label: 'Texas Long-Term Care Ombudsman',
                    href: 'https://apps.hhs.texas.gov/news_info/ombudsman/',
                    note: 'Free advocacy · 1-800-252-2412',
                    external: true,
                  },
                  {
                    label: 'HHSC Abuse & Neglect Hotline',
                    href: 'https://www.hhs.texas.gov/services/aging/long-term-care',
                    note: 'Report suspected abuse: 1-800-458-9858',
                    external: true,
                  },
                  {
                    label: 'STAR+PLUS Medicaid Program',
                    href: 'https://www.hhs.texas.gov/services/health/medicaid-chip/medicaid-chip-members/starplus',
                    note: 'Managed care for seniors and adults with disabilities',
                    external: true,
                  },
                  {
                    label: 'Texas State Veterans Homes',
                    href: 'https://www.glo.texas.gov/veterans/texas-state-veterans-homes',
                    note: 'Affordable long-term care for TX veterans (9 locations)',
                    external: true,
                  },
                  {
                    label: 'Texas Veterans Commission',
                    href: 'https://tvc.texas.gov/',
                    note: 'Free benefits counseling for veterans and families',
                    external: true,
                  },
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      className="text-teal-700 hover:text-teal-800 font-medium text-sm hover:underline"
                    >
                      {link.label}
                    </a>
                    {link.note && (
                      <p className="text-xs text-slate-500 mt-0.5">{link.note}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Alzheimer's & Dementia */}
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
                🧠 Alzheimer&apos;s &amp; Dementia Support
              </h3>
              <ul className="space-y-3">
                {[
                  {
                    label: "Alzheimer's Association — Capital of Texas",
                    href: 'https://www.alz.org/texascapital',
                    note: 'Austin & Central TX support groups',
                  },
                  {
                    label: "Alzheimer's Association — Houston & SE Texas",
                    href: 'https://www.alz.org/texas',
                    note: 'Greater Houston metro area',
                  },
                  {
                    label: "Alzheimer's Association — Dallas & NE Texas",
                    href: 'https://www.alz.org/dallasnetexas',
                    note: 'Dallas-Fort Worth region',
                  },
                  {
                    label: "Alzheimer's Association — San Antonio & South TX",
                    href: 'https://www.alz.org/sanantonio',
                    note: '40+ counties across South Texas',
                  },
                  {
                    label: "Alzheimer's Association — North Central TX",
                    href: 'https://www.alz.org/northcentraltexas',
                    note: 'North Central Texas communities',
                  },
                  {
                    label: "Alzheimer's Association — West Texas",
                    href: 'https://www.alz.org/westtexas',
                    note: 'Amarillo, El Paso, Lubbock, Permian Basin',
                  },
                  {
                    label: "24/7 Alzheimer's Helpline",
                    href: 'tel:+18002723900',
                    note: '1-800-272-3900 · Free, confidential, 200+ languages',
                  },
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-teal-700 hover:text-teal-800 font-medium text-sm hover:underline"
                    >
                      {link.label}
                    </a>
                    {link.note && (
                      <p className="text-xs text-slate-500 mt-0.5">{link.note}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Additional Resources */}
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
                📋 Additional Resources
              </h3>
              <ul className="space-y-3">
                {[
                  {
                    label: 'AARP Texas — Caregiver Resources',
                    href: 'https://states.aarp.org/texas/caregiver-resources',
                    note: 'Support and information for family caregivers',
                    external: true,
                  },
                  {
                    label: 'Aging & Disability Resource Center',
                    href: 'tel:+18559372372',
                    note: 'Navigate long-term care options: 855-937-2372',
                    external: false,
                  },
                  {
                    label: 'HICAP Texas — Free Medicare Counseling',
                    href: 'tel:+18002523439',
                    note: 'Claims assistance: 800-252-3439',
                    external: false,
                  },
                  {
                    label: 'Texas Alzheimer\'s & Public Health Info',
                    href: 'https://www.alz.org/professionals/public-health/state-overview/texas',
                    note: 'State-level Alzheimer\'s data and initiatives',
                    external: true,
                  },
                  {
                    label: 'Our Care Assessment Tool',
                    href: '/tools/care-assessment',
                    note: 'Find the right type of care for your situation',
                    external: false,
                  },
                  {
                    label: 'Our Cost Calculator',
                    href: '/tools/cost-calculator',
                    note: 'Get care cost estimates for your Texas zip code',
                    external: false,
                  },
                  {
                    label: 'Our Medicaid Eligibility Screener',
                    href: '/tools/medicaid-screener',
                    note: 'Check if you qualify for Medicaid coverage',
                    external: false,
                  },
                  {
                    label: 'Our VA Benefits Calculator',
                    href: '/tools/va-benefits',
                    note: 'Estimate VA Aid & Attendance eligibility',
                    external: false,
                  },
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      className="text-teal-700 hover:text-teal-800 font-medium text-sm hover:underline"
                    >
                      {link.label}
                    </a>
                    {link.note && (
                      <p className="text-xs text-slate-500 mt-0.5">{link.note}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
