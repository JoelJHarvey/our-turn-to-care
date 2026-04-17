import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thank You — Medicaid Screener | OurTurnToCare",
  robots: "noindex, nofollow",
};

const RESULT_MESSAGES: Record<string, string> = {
  likely:
    "Based on your answers, your loved one looks likely to qualify for Medicaid. An elder law attorney will reach out to help you navigate the application.",
  possibly:
    "Your answers suggest Medicaid may be possible with proper planning. An elder law attorney will reach out to walk through your options.",
  unlikely:
    "Even if Medicaid isn't available right now, planning ahead is important. An elder law attorney will reach out to explain your options.",
};

interface PageProps {
  searchParams: Promise<{
    result?: string;
    state?: string;
  }>;
}

export default async function MedicaidScreenerThankYou({ searchParams }: PageProps) {
  const params = await searchParams;

  const result = params.result?.trim() || "";
  const state = params.state?.trim() || "";

  const resultMessage =
    RESULT_MESSAGES[result] ??
    "An elder law attorney will reach out to walk through your Medicaid options.";

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
            An elder law attorney will contact you soon.
          </h1>

          <p className="text-slate-500 leading-relaxed">{resultMessage}</p>
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
                text: "You'll receive a confirmation email within a few minutes with a summary of Medicaid eligibility rules for your state.",
              },
              {
                number: 2,
                text: state
                  ? `An elder law attorney licensed in ${state} will reach out within one business day.`
                  : "An elder law attorney will reach out within one business day.",
              },
              {
                number: 3,
                text: "Initial consultations are typically free. You decide whether to work with them — there's no obligation.",
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
                icon: "🎖️",
                label: "Also check VA Benefits",
                href: "/tools/va-benefits",
                desc: "Veterans and surviving spouses may qualify for up to $2,727/month in Aid & Attendance.",
              },
              {
                icon: "💰",
                label: "See what care costs in your area",
                href: "/tools/cost-calculator",
                desc: "Get cost estimates so you can plan while you navigate eligibility.",
              },
              {
                icon: "🧭",
                label: "Not sure what level of care is needed?",
                href: "/tools/care-assessment",
                desc: "Take our free 4-minute Care Assessment for a personalized recommendation.",
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
            href="/tools/medicaid-screener"
            className="text-sm text-slate-400 hover:text-slate-600 transition-colors"
          >
            ← Start a new screening
          </Link>
        </div>

      </div>
    </div>
  );
}
