import { Metadata } from 'next';
import { StateFacilityTypePage } from '@/components/facilities/StateFacilityTypePage';

export const metadata: Metadata = {
  title: 'Assisted Living in Texas — Compare 2,043 Communities (2026)',
  description:
    'Find and compare 2,043 assisted living communities across Texas. Services, licensing, costs, and availability.',
  openGraph: {
    title: 'Assisted Living in Texas — Compare 2,043 Communities',
    description:
      'Find and compare 2,043 assisted living communities across Texas. Services, licensing, costs, and availability.',
    url: 'https://ourturntocare.org/texas/assisted-living',
    type: 'website',
  },
};

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<{ page?: string; sort?: string; zip?: string; radius?: string }>;
}

export default async function TexasAssistedLivingPage({ searchParams }: PageProps) {
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
      facilityType="assisted_living"
      facilityTypeLabel="Assisted Living"
      facilityTypeSlug="assisted-living"
      page={page}
      sortBy={sortBy}
      zip={zip}
      radius={radius}
    />
  );
}
