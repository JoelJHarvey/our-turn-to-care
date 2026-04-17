import { Metadata } from 'next';
import { StateFacilityTypePage } from '@/components/facilities/StateFacilityTypePage';

export const metadata: Metadata = {
  title: 'Nursing Homes in Texas — Compare 1,164 Facilities with Ratings (2026)',
  description:
    'Find and compare 1,164 nursing homes across Texas. CMS quality ratings, inspection reports, staffing data, Medicare & Medicaid acceptance.',
  openGraph: {
    title: 'Nursing Homes in Texas — Compare 1,164 Facilities with Ratings',
    description:
      'Find and compare 1,164 nursing homes across Texas. CMS quality ratings, inspection reports, staffing data, Medicare & Medicaid acceptance.',
    url: 'https://ourturntocare.org/texas/nursing-homes',
    type: 'website',
  },
};

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<{ page?: string; sort?: string; zip?: string; radius?: string }>;
}

export default async function TexasNursingHomesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page ?? '1', 10));
  const sortBy = params.sort === 'rating' ? 'rating' : 'city';
  const zip = params.zip?.replace(/\D/g, '').slice(0, 5) || undefined;
  const radius = Math.min(50, Math.max(10, parseInt(params.radius ?? '25', 10)));

  return (
    <StateFacilityTypePage
      state="TX"
      stateName="Texas"
      stateSlug="texas"
      facilityType="nursing_home"
      facilityTypeLabel="Nursing Homes"
      facilityTypeSlug="nursing-homes"
      page={page}
      sortBy={sortBy}
      zip={zip}
      radius={radius}
    />
  );
}
