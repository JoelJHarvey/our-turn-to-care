import { Metadata } from 'next';
import { StateFacilityTypePage } from '@/components/facilities/StateFacilityTypePage';

export const metadata: Metadata = {
  title: 'Adult Day Care in Texas — Compare 398 Programs (2026)',
  description:
    'Find and compare 398 adult day care programs across Texas. Daytime activities, meals, and supervision for seniors.',
  openGraph: {
    title: 'Adult Day Care in Texas — Compare 398 Programs',
    description:
      'Find and compare 398 adult day care programs across Texas. Daytime activities, meals, and supervision for seniors.',
    url: 'https://ourturntocare.org/texas/adult-day-care',
    type: 'website',
  },
};

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<{ page?: string; sort?: string; zip?: string; radius?: string }>;
}

export default async function TexasAdultDayCarePage({ searchParams }: PageProps) {
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
      facilityType="adult_day"
      facilityTypeLabel="Adult Day Care"
      facilityTypeSlug="adult-day-care"
      page={page}
      sortBy={sortBy}
      zip={zip}
      radius={radius}
    />
  );
}
