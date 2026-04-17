import { redirect } from 'next/navigation';

// Catch-all route for assessment step URLs created by history.pushState.
// These paths (/tools/care-assessment/relationship, /age, /results, etc.) are
// for analytics and browser history only — they are not real pages. If a user
// navigates directly to one (page refresh, hard back/forward, or direct URL
// entry), redirect them back to the assessment start so they get a fresh flow
// rather than a 404. Next.js prioritises the more-specific /thank-you route
// over this catch-all, so that page is unaffected.
export default function AssessmentCatchAll() {
  redirect('/tools/care-assessment');
}

export const metadata = {
  robots: 'noindex, nofollow',
};
