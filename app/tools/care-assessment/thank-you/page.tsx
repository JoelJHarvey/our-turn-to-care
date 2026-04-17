import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Thank You — OurTurnToCare",
  robots: "noindex, nofollow",
};

// Map recommendation slugs to display labels and content hub URLs
const REC_MAP: Record<string, { label: string; hub: string; guide: string }> = {
  memory_care: {
    label: "Memory Care",
    hub: "/memory-care/",
    guide: "our Memory Care guide",
  },
  assisted_living: {
    label: "Assisted Living",
    hub: "/assisted-living/",
    guide: "our Assisted Living guide",
  },
  home_care: {
    label: "Home Care",
    hub: "/home-care/",
    guide: "our Home Care guide",
  },
  aging_in_place: {
    label: "Aging in Place",
    hub: "/aging-in-place/",
    guide: "our Aging in Place guide",
  },
  nursing_home: {
    label: "Nursing Home",
    hub: "/nursing-homes/",
    guide: "our Nursing Home guide",
  },
  independent: {
    label: "Independent Living",
    hub: "/aging-in-place/",
    guide: "our resource guide",
  },
};

interface PageProps {
  searchParams: Promise<{
    rec?: string;
    zip?: string;
    fa?: string;
  }>;
}

export default async function ThankYouPage({ searchParams }: PageProps) {
  const params = await searchParams;

  // Guard: if no recommendation param, this wasn't a real form submission
  if (!params.rec) {
    redirect("/tools/care-assessment");
  }

  const recKey = params.rec;
  const recInfo = REC_MAP[recKey] ?? {
    label: "care",
    hub: "/",
    guide: "our resource guide",
  };

  const displayName = "your loved one";
  const nameOrLovedOne = "your loved one";
  const showFinancialAssistance = params.fa === "1";

  // What happens next steps — personalized to recommendation
  const nextSteps = [
    {
      number: 1,
      text: `We'll review ${nameOrLovedOne}'s assessment results and match them with ${recInfo.label.toLowerCase()} providers in your area.`,
    },
    {
      number: 2,
      text: "You'll receive an email with personalized options — no obligation, no pressure.",
    },
    ...(showFinancialAssistance
      ? [
          {
            number: 3,
            text: `We'll include information about financial assistance programs ${nameOrLovedOne} may qualify for.`,
          },
        ]
      : []),
  ];

  // "While you wait" links
  const whileYouWait = [
    {
      icon: "📖",
      label: `Read ${recInfo.guide}`,
      href: recInfo.hub,
      show: true,
    },
    {
      icon: "💰",
      label: "Check Medicaid Eligibility",
      href: "/tools/medicaid-screener/",
      show: showFinancialAssistance,
    },
    {
      icon: "🎖️",
      label: "Check VA Benefits Eligibility",
      href: "/tools/va-benefits/",
      show: showFinancialAssistance,
    },
  ].filter((item) => item.show);

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-lg mx-auto px-5 py-12 space-y-8">

        {/* ── Confirmation header ─────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl px-6 py-8 shadow-sm text-center">
          <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-teal-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-slate-800 mb-2">
            Thank you — we&rsquo;re on it.
          </h1>

          <p className="text-slate-500 leading-relaxed">
            We&rsquo;re finding {recInfo.label} options
            {params.zip ? ` near ${params.zip}` : " in your area"} that match{" "}
            {displayName}&rsquo;s needs. You&rsquo;ll hear from us within 24
            hours.
          </p>
        </div>

        {/* ── What happens next ────────────────────────────────────────────── */}
        <section className="bg-white rounded-2xl px-6 py-6 shadow-sm">
          <h2 className="text-base font-semibold text-slate-500 uppercase tracking-wide mb-5">
            What happens next
          </h2>
          <ol className="space-y-4">
            {nextSteps.map((step) => (
              <li key={step.number} className="flex gap-4">
                <span className="w-7 h-7 rounded-full bg-teal-100 text-teal-700 text-sm font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  {step.number}
                </span>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {step.text}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* ── While you wait ───────────────────────────────────────────────── */}
        {whileYouWait.length > 0 && (
          <section className="bg-white rounded-2xl px-6 py-6 shadow-sm">
            <h2 className="text-base font-semibold text-slate-500 uppercase tracking-wide mb-5">
              While you wait
            </h2>
            <div className="flex flex-col gap-4">
              {whileYouWait.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 text-teal-600 hover:text-teal-800 transition-colors"
                >
                  <span className="text-xl flex-shrink-0">{item.icon}</span>
                  <span className="font-medium text-sm">{item.label} →</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── Return link ──────────────────────────────────────────────────── */}
        <div className="text-center pb-4">
          <Link
            href="/tools/care-assessment"
            className="text-sm text-slate-400 hover:text-slate-600 transition-colors"
          >
            ← Start a new assessment
          </Link>
        </div>

      </div>
    </div>
  );
}
