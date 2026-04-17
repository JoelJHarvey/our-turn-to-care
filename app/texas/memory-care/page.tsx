import { Metadata } from 'next';
import { StateFacilityTypePage } from '@/components/facilities/StateFacilityTypePage';

export const metadata: Metadata = {
  title: "Memory Care Facilities in Texas — Alzheimer's & Dementia Care (2026)",
  description:
    "Find 1,863 memory care facilities in Texas for Alzheimer's and dementia care. Compare specialized communities with ratings, costs, and Medicaid acceptance.",
  openGraph: {
    title: "Memory Care Facilities in Texas — Alzheimer's & Dementia Care",
    description:
      "Find 1,863 memory care facilities in Texas for Alzheimer's and dementia care. Compare specialized communities with ratings and Medicaid acceptance.",
    url: 'https://ourturntocare.org/texas/memory-care',
    type: 'website',
  },
};

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<{ page?: string; sort?: string }>;
}

export default async function TexasMemoryCarePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page ?? '1', 10));
  const sortBy = params.sort === 'rating' ? 'rating' : 'city';

  return (
    <StateFacilityTypePage
      state="TX"
      stateName="Texas"
      stateSlug="texas"
      facilityType="memory_care"
      facilityTypeLabel="Memory Care"
      facilityTypeSlug="memory-care"
      isMemoryCare={true}
      page={page}
      sortBy={sortBy}
    />
  );
}
