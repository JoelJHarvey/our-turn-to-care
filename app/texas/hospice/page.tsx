import { Metadata } from 'next';
import { StateFacilityTypePage } from '@/components/facilities/StateFacilityTypePage';

export const metadata: Metadata = {
  title: 'Hospice Care in Texas — Compare 1,081 Providers (2026)',
  description:
    'Find and compare 1,081 hospice care providers across Texas. Compassionate end-of-life care with pain management and family support.',
  openGraph: {
    title: 'Hospice Care in Texas — Compare 1,081 Providers',
    description:
      'Find and compare 1,081 hospice care providers across Texas. Compassionate end-of-life care with pain management and family support.',
    url: 'https://ourturntocare.org/texas/hospice',
    type: 'website',
  },
};

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<{ page?: string; sort?: string; zip?: string; radius?: string }>;
}

export default async function TexasHospicePage({ searchParams }: PageProps) {
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
      facilityType="hospice"
      facilityTypeLabel="Hospice Care"
      facilityTypeSlug="hospice"
      page={page}
      sortBy={sortBy}
      zip={zip}
      radius={radius}
    />
  );
}
