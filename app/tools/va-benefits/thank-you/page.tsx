import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thank You — VA Benefits | OurTurnToCare",
  robots: "noindex, nofollow",
};

interface PageProps {
  searchParams: Promise<{
    benefit?: string;
    est?: string;
  }>;
}

export default async function VaBenefitsThankYou({ searchParams }: PageProps) {
  const params = await searchParams;

  const est = params.est?.trim() || "";

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
            A VA-accredited claims agent will contact you.
          </h1>

          <p className="text-slate-500 leading-relaxed">
            {est
              ? `Based on your answers, you may be eligible for up to ${est}/month in Aid & Attendance benefits. A VA-accredited claims agent will reach out to verify eligibility and help you apply.`
              : "A VA-accredited claims agent will reach out to verify eligibility and help you file a claim."}
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
                text: "You'll receive a confirmation email within a few minutes with information on what documents you'll need — DD-214, medical evidence, and financial information.",
              },
              {
                number: 2,
                text: "A VA-accredited claims agent or attorney will reach out within one business day.",
              },
              {
                number: 3,
                text: "VA benefit applications typically take 3–6 months to process. Your agent will guide you through each step.",
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
                icon: "🏛️",
                label: "Also check Medicaid eligibility",
                href: "/tools/medicaid-screener",
                desc: "VA benefits and Medicaid can often work together to cover long-term care costs.",
              },
              {
                icon: "🧭",
                label: "Take the Care Assessment",
                href: "/tools/care-assessment",
                desc: "Get a personalized recommendation for the level of care your veteran needs.",
              },
              {
                icon: "💰",
                label: "See what care costs in your area",
                href: "/tools/cost-calculator",
                desc: "Get cost estimates to plan while your benefits claim is processed.",
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
            href="/tools/va-benefits"
            className="text-sm text-slate-400 hover:text-slate-600 transition-colors"
          >
            ← Start a new screening
          </Link>
        </div>

      </div>
    </div>
  );
}
