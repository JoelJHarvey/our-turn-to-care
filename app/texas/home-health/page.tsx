import { Metadata } from 'next';
import { StateFacilityTypePage } from '@/components/facilities/StateFacilityTypePage';

export const metadata: Metadata = {
  title: 'Home Health Agencies in Texas — Compare 1,849 Providers (2026)',
  description:
    'Find and compare 1,849 home health agencies across Texas. Skilled nursing, therapy, and personal care services in your home.',
  openGraph: {
    title: 'Home Health Agencies in Texas — Compare 1,849 Providers',
    description:
      'Find and compare 1,849 home health agencies across Texas. Skilled nursing, therapy, and personal care services in your home.',
    url: 'https://ourturntocare.org/texas/home-health',
    type: 'website',
  },
};

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<{ page?: string; sort?: string; zip?: string; radius?: string }>;
}

export default async function TexasHomeHealthPage({ searchParams }: PageProps) {
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
      facilityType="home_health"
      facilityTypeLabel="Home Health Agencies"
      facilityTypeSlug="home-health"
      page={page}
      sortBy={sortBy}
      zip={zip}
      radius={radius}
    />
  );
}
