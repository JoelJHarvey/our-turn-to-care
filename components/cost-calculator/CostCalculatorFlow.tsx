"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import ProgressBar from "@/components/assessment/ProgressBar";
import ToolLeadForm from "@/components/tools/ToolLeadForm";
import { useCostData } from "@/hooks/useCostData";
import { CostResultsCards } from "@/components/costs/CostResultsCards";

// ── Main component ─────────────────────────────────────────────────────────

export default function CostCalculatorFlow() {
  // 0 = entry screen, 1 = results screen
  const [screen, setScreen] = useState<0 | 1>(0);
  const [zip, setZip] = useState("");
  const [visible, setVisible] = useState(true);

  const leadFormRef = useRef<HTMLDivElement>(null);

  const fade = (callback: () => void) => {
    setVisible(false);
    setTimeout(() => {
      callback();
      setVisible(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 180);
  };

  const handleZipSubmit = (zipCode: string) => {
    setZip(zipCode);
    fade(() => setScreen(1));
  };

  const scrollToForm = () =>
    leadFormRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div
      style={{ transition: "opacity 0.18s ease" }}
      className={visible ? "opacity-100" : "opacity-0"}
    >
      {screen === 0 && (
        <EntryScreen onSubmit={handleZipSubmit} />
      )}

      {screen === 1 && (
        <ResultsScreen
          zip={zip}
          leadFormRef={leadFormRef}
          scrollToForm={scrollToForm}
          onStartOver={() => fade(() => { setScreen(0); setZip(""); })}
        />
      )}
    </div>
  );
}

// ── Entry screen ───────────────────────────────────────────────────────────

function EntryScreen({ onSubmit }: { onSubmit: (zip: string) => void }) {
  const [zip, setZip] = useState("");
  const [error, setError] = useState("");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isValid = /^\d{5}$/.test(zip);

  useEffect(() => {
    if (isValid) {
      timerRef.current = setTimeout(() => onSubmit(zip), 300);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zip, isValid]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 5);
    setZip(digits);
    if (error) setError("");
  };

  const handleSubmit = () => {
    if (isValid) {
      if (timerRef.current) clearTimeout(timerRef.current);
      onSubmit(zip);
    } else {
      setError("Please enter a valid 5-digit zip code");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white px-5 pt-16 pb-12">
      <div className="flex-1 flex flex-col justify-center max-w-lg mx-auto w-full">
        <div className="mb-6">
          <span className="inline-block bg-teal-50 text-teal-700 text-sm font-medium px-3 py-1.5 rounded-full border border-teal-100">
            Free Cost of Care Calculator
          </span>
        </div>
        <h1 className="text-3xl font-bold text-slate-800 leading-tight mb-4">
          What Does Care Cost in Your Area?
        </h1>
        <p className="text-lg text-slate-500 leading-relaxed mb-10">
          Get cost estimates for memory care, assisted living, home care, and nursing
          homes near you.
        </p>

        {/* Zip input — same underline style as assessment */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-full max-w-[220px]">
            <label className="block text-sm text-slate-500 text-center mb-4">
              Enter your zip code
            </label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete="postal-code"
              placeholder="00000"
              value={zip}
              onChange={handleChange}
              maxLength={5}
              aria-label="Zip code"
              className={[
                "w-full bg-transparent text-center text-3xl font-semibold tracking-[0.3em]",
                "border-0 border-b-2 py-3 outline-none",
                "placeholder:text-slate-300 text-slate-800",
                "transition-colors duration-150",
                error
                  ? "border-red-400 focus:border-red-500"
                  : "border-slate-300 focus:border-teal-500",
              ].join(" ")}
            />
            {error && (
              <p className="mt-3 text-sm text-red-500 text-center" role="alert">
                {error}
              </p>
            )}
            {!error && zip.length > 0 && zip.length < 5 && (
              <p className="mt-3 text-sm text-slate-400 text-center">
                {5 - zip.length} more digit{5 - zip.length !== 1 ? "s" : ""}
              </p>
            )}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className={[
            "w-full py-4 rounded-xl text-base font-semibold transition-all duration-150",
            isValid
              ? "bg-teal-600 text-white hover:bg-teal-700 active:bg-teal-800 shadow-sm"
              : "bg-slate-100 text-slate-400 cursor-not-allowed",
          ].join(" ")}
        >
          See Costs →
        </button>

        {/* Progress bar at 0% — visual consistency with tool flows */}
        <div className="mt-10">
          <ProgressBar progress={0} />
        </div>
      </div>
    </div>
  );
}

// ── Results screen ─────────────────────────────────────────────────────────

function ResultsScreen({
  zip,
  leadFormRef,
  scrollToForm,
  onStartOver,
}: {
  zip: string;
  leadFormRef: React.RefObject<HTMLDivElement | null>;
  scrollToForm: () => void;
  onStartOver: () => void;
}) {
  const { summary, loading, locationLabel, stateName, hasMsaData } = useCostData(zip);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Sticky header */}
      <div className="bg-white border-b border-slate-100 sticky top-0 z-10 shadow-sm">
        <div className="max-w-2xl mx-auto px-5 py-4 flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-700">
            Care Costs Near {zip}
          </span>
          <button
            onClick={onStartOver}
            className="text-sm text-slate-400 hover:text-slate-600 transition-colors"
          >
            Change zip
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-5 py-8 space-y-6">

        {/* Header */}
        <div>
          <p className="text-sm text-slate-500 mb-2">
            Care costs near zip code <strong className="text-slate-700">{zip}</strong>
          </p>
          <h1 className="text-2xl font-bold text-slate-800 leading-snug">
            What You Can Expect to Pay
          </h1>
        </div>

        {/* Care type cost cards — real data from Supabase */}
        <CostResultsCards
          summary={summary}
          loading={loading}
          locationLabel={locationLabel}
          stateName={stateName}
          hasMsaData={hasMsaData}
          zip={zip}
        />

        {/* Not sure which type callout */}
        <div className="bg-teal-50 border border-teal-100 rounded-2xl px-5 py-5">
          <p className="text-teal-800 font-semibold mb-1">
            Not sure which type of care is right?
          </p>
          <p className="text-sm text-teal-700 mb-3 leading-relaxed">
            Our free Care Assessment helps you understand what level of support is needed
            based on your specific situation.
          </p>
          <Link
            href="/tools/care-assessment"
            className="text-sm font-semibold text-teal-700 hover:text-teal-900 transition-colors"
          >
            Take Our Free Care Assessment →
          </Link>
        </div>

        {/* Financial assistance section */}
        <section>
          <h2 className="text-lg font-bold text-slate-800 mb-2">
            Financial Assistance Options
          </h2>
          <p className="text-sm text-slate-500 mb-4 leading-relaxed">
            Many families qualify for financial assistance they don&rsquo;t know about.
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              {
                icon: "🏛️",
                title: "Medicaid",
                body: "Can cover most or all long-term care costs for qualifying families.",
                cta: "Check Medicaid Eligibility →",
                href: "/tools/medicaid-screener/",
                external: false,
              },
              {
                icon: "🎖️",
                title: "VA Benefits",
                body: "Veterans and surviving spouses may qualify for up to $2,884/month.",
                cta: "Check VA Benefits →",
                href: "/tools/va-benefits/",
                external: false,
              },
              {
                icon: "📋",
                title: "Long-term Care Insurance",
                body: "If your loved one has a policy, it may cover significant costs.",
                cta: "Contact your insurer",
                href: null,
                external: false,
              },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-white rounded-2xl px-5 py-5 shadow-sm flex flex-col"
              >
                <span className="text-2xl mb-2">{card.icon}</span>
                <h3 className="font-bold text-slate-800 mb-1">{card.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-3 flex-1">
                  {card.body}
                </p>
                {card.href ? (
                  <Link
                    href={card.href}
                    className="text-sm font-semibold text-teal-600 hover:text-teal-800 transition-colors"
                  >
                    {card.cta}
                  </Link>
                ) : (
                  <span className="text-sm text-slate-400">{card.cta}</span>
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 bg-white rounded-2xl px-5 py-4 shadow-sm">
            <p className="text-sm text-slate-600 leading-relaxed">
              An elder law attorney can help you navigate all of these options and
              develop a comprehensive funding strategy.{" "}
              <button
                onClick={scrollToForm}
                className="text-teal-600 font-semibold hover:text-teal-800 transition-colors"
              >
                Connect with an Elder Law Attorney →
              </button>
            </p>
          </div>
        </section>

        {/* Lead capture */}
        <section
          ref={leadFormRef}
          id="lead-capture-form"
          className="bg-white rounded-2xl px-6 py-7 shadow-sm"
        >
          <h2 className="text-xl font-bold text-slate-800 mb-1">
            Get Connected with Care Providers Near {zip}
          </h2>
          <p className="text-sm text-slate-500 mb-6 leading-relaxed">
            We can connect you with care providers and financial planning specialists in
            your area.
          </p>
          <ToolLeadForm
            apiEndpoint="/api/submit-cost-lead"
            ctaText="Connect Me with Local Providers →"
            extraPayload={{ zipCode: zip }}
            checkboxLabel="I'm also interested in financial planning assistance (Medicaid, VA benefits, etc.)"
            successTitle="You're all set!"
            successBody={`We're finding care providers and financial planning resources near ${zip}. Check your email for personalized recommendations.`}
            onSuccess={() => {
              const params = new URLSearchParams({
                ...(zip && { zip }),
              });
              window.location.href = `/tools/cost-calculator/thank-you?${params.toString()}`;
            }}
          />
        </section>

        <div className="h-8" />
      </div>
    </div>
  );
}
