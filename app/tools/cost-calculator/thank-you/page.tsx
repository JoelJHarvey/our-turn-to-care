import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thank You — Cost Calculator | OurTurnToCare",
  robots: "noindex, nofollow",
};

interface PageProps {
  searchParams: Promise<{
    zip?: string;
  }>;
}

export default async function CostCalculatorThankYou({ searchParams }: PageProps) {
  const params = await searchParams;

  const zip = params.zip?.trim() || "";

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-lg mx-auto px-5 py-12 space-y-8">

        {/* ── Confirmation header ───────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl px-6 py-8 shadow-sm text-center">
          <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-teal-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-slate-800 mb-2">
            You&rsquo;re all set! We&rsquo;re connecting you with providers.
          </h1>

          <p className="text-slate-500 leading-relaxed">
            We&rsquo;re matching you with care providers
            {zip ? ` near ${zip}` : " in your area"} who can give you real quotes
            based on your specific situation.
          </p>
        </div>

        {/* ── What happens next ─────────────────────────────────────────────── */}
        <section className="bg-white rounded-2xl px-6 py-6 shadow-sm">
          <h2 className="text-base font-semibold text-slate-500 uppercase tracking-wide mb-5">
            What happens next
          </h2>
          <ol className="space-y-4">
            {[
              {
                number: 1,
                text: "You'll get a confirmation email within a few minutes with a summary of typical care costs in your area.",
              },
              {
                number: 2,
                text: "A local care advisor will reach out within one business day with current pricing from 2–3 providers matched to your situation.",
              },
              {
                number: 3,
                text: "You can compare providers side by side — no pressure, no obligation.",
              },
            ].map((step) => (
              <li key={step.number} className="flex gap-4">
                <span className="w-7 h-7 rounded-full bg-teal-100 text-teal-700 text-sm font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  {step.number}
                </span>
                <p className="text-slate-600 text-sm leading-relaxed">{step.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ── While you wait ────────────────────────────────────────────────── */}
        <section className="bg-white rounded-2xl px-6 py-6 shadow-sm">
          <h2 className="text-base font-semibold text-slate-500 uppercase tracking-wide mb-5">
            While you wait
          </h2>
          <div className="flex flex-col gap-4">
            {[
              {
                icon: "🧭",
                label: "Not sure which type of care is right?",
                href: "/tools/care-assessment",
                desc: "Take our free 4-minute Care Assessment to get a personalized recommendation.",
              },
              {
                icon: "🏛️",
                label: "Check Medicaid Eligibility",
                href: "/tools/medicaid-screener",
                desc: "Medicaid can cover most or all long-term care costs for qualifying families.",
              },
              {
                icon: "🎖️",
                label: "Check VA Benefits Eligibility",
                href: "/tools/va-benefits",
                desc: "Veterans and surviving spouses may qualify for up to $2,884/month.",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-start gap-3 group"
              >
                <span className="text-xl flex-shrink-0 mt-0.5">{item.icon}</span>
                <div>
                  <span className="font-medium text-sm text-teal-600 group-hover:text-teal-800 transition-colors">
                    {item.label} →
                  </span>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Return link ───────────────────────────────────────────────────── */}
        <div className="text-center pb-4">
          <Link
            href="/tools/cost-calculator"
            className="text-sm text-slate-400 hover:text-slate-600 transition-colors"
          >
            ← Look up costs for a different zip code
          </Link>
        </div>

      </div>
    </div>
  );
}
