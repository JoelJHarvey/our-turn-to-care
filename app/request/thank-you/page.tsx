import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Thank You — OurTurnToCare',
  description: 'Your care request has been received.',
  robots: 'noindex',
};

export default async function RequestThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ state?: string; care?: string }>;
}) {
  const params = await searchParams;
  const state = params.state || '';
  const careType = params.care || '';

  return (
    <main className="max-w-2xl mx-auto px-4 py-16 text-center">
      {/* Success icon */}
      <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-8 h-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        Thank You!
      </h1>

      <p className="text-lg text-gray-600 mb-6">
        We&apos;ve received your request
        {careType ? ` for ${careType.toLowerCase()} options` : ''}
        {state ? ` in ${state}` : ''}.
        Our team will review your information and connect you with care
        providers in your area.
      </p>

      <div className="bg-teal-50 border border-teal-200 rounded-lg p-6 mb-8 text-left">
        <h2 className="font-semibold text-gray-900 mb-3">What happens next:</h2>
        <ol className="space-y-2 text-gray-700">
          <li className="flex gap-3">
            <span className="font-bold text-teal-600 flex-shrink-0">1.</span>
            We&apos;ll match you with vetted care providers near your zip code.
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-teal-600 flex-shrink-0">2.</span>
            You&apos;ll receive personalized recommendations via email within 24 hours.
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-teal-600 flex-shrink-0">3.</span>
            A care advisor may follow up to help narrow your options — no obligation.
          </li>
        </ol>
      </div>

      <p className="text-gray-500 mb-8">
        Questions? Email us at{' '}
        <a href="mailto:hello@ourturntocare.com" className="text-teal-600 underline">
          hello@ourturntocare.com
        </a>
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href={state ? `/${state.toLowerCase()}` : '/'}
          className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
        >
          Back to {state || 'Home'}
        </Link>
        <Link
          href="/tools/care-assessment"
          className="px-6 py-3 border border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50 transition-colors"
        >
          Take Our Care Assessment
        </Link>
      </div>
    </main>
  );
}
