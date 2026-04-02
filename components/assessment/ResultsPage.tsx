"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import LeadCaptureForm from "./LeadCaptureForm";
import { AssessmentResults } from "@/lib/assessment/scoring";
import {
  RECOMMENDATION_LABELS,
  RECOMMENDATION_DESCRIPTIONS,
  SECONDARY_DESCRIPTIONS,
  generateWhyText,
} from "@/lib/assessment/results";
import { useCostData } from "@/hooks/useCostData";
import { CostEstimateBlock } from "@/components/costs/CostResultsCards";

interface ResultsPageProps {
  results: AssessmentResults;
  onStartOver: () => void;
}

// ── Helpers ────────────────────────────────────────────────────────────────

function cap(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ── Financial card data builder ────────────────────────────────────────────

interface FinancialCard {
  icon: string;
  headline: string;
  body: string;
  cta: string;
  // If set, renders as a Link to the tool instead of scrolling to the lead form
  href?: string;
}

function buildFinancialCards(
  r: AssessmentResults,
  name: string,
  namePossessive: string
): FinancialCard[] {
  const cards: FinancialCard[] = [];
  const recLabel = RECOMMENDATION_LABELS[r.primaryRecommendation] ?? r.primaryRecommendation;

  if (r.vaEligibleFlag) {
    const vaContext =
      r.veteranStatus === "veteran"
        ? "As a veteran"
        : "As a veteran's spouse";
    cards.push({
      icon: "💡",
      headline: `${cap(name)} may qualify for VA Aid & Attendance`,
      body: `${vaContext}, ${name} may be eligible for the VA Aid & Attendance benefit — up to $2,431/month to help cover care costs. Many families don't know this program exists.`,
      cta: "Check VA Benefits Eligibility →",
      href: "/tools/va-benefits/",
    });
  }

  if (r.medicaidLikelyFlag) {
    cards.push({
      icon: "💡",
      headline: `${cap(name)} may qualify for Medicaid assistance`,
      // Use the name throughout the body, not a pronoun, so there's no
      // mismatch between the headline ("David") and body text ("they/she/he").
      body: `Based on what you told us about ${namePossessive} financial situation, ${cap(name)} may qualify for Medicaid, which can cover a significant portion — or even all — of these care costs.`,
      cta: "Check Medicaid Eligibility →",
      href: "/tools/medicaid-screener/",
    });
  }

  if (r.medicaidPossibleFlag) {
    cards.push({
      icon: "💡",
      headline: "Medicaid may be an option worth exploring",
      body: `Depending on ${namePossessive} specific financial details, Medicaid may help cover some or all of these costs. Eligibility rules vary by state, and many families are surprised to learn they qualify.`,
      cta: "Check Medicaid Eligibility →",
      href: "/tools/medicaid-screener/",
    });
  }

  if (r.hasLtcInsurance) {
    cards.push({
      icon: "💡",
      headline: "Your long-term care insurance may cover a significant portion of this",
      body: `Long-term care insurance policies often cover ${recLabel.toLowerCase()}, assisted living, and home care. The coverage amount depends on your specific policy.`,
      cta: "Connect with a Benefits Counselor →",
    });
  }

  if (r.hasMedicaid) {
    cards.push({
      icon: "✅",
      headline: `${cap(name)} already has Medicaid coverage`,
      body: `Medicaid covers ${recLabel.toLowerCase()} services. The key is finding providers that accept Medicaid and have availability. We can help you find options in your area.`,
      cta: "See Medicaid-Accepting Options Near You →",
    });
  }

  if (r.hasVA) {
    cards.push({
      icon: "✅",
      headline: `${cap(name)} already has VA health benefits`,
      body: `VA benefits may cover more care options than you realize. A VA benefits specialist can help you maximize your coverage.`,
      cta: "Talk to a VA Benefits Specialist →",
    });
  }

  if (r.coverageUnknown) {
    cards.push({
      icon: "💡",
      headline: `There may be benefits ${name} already qualifies for`,
      body: `Many families are unaware of financial assistance programs that can help cover care costs. A benefits counselor can help you find out what's available.`,
      cta: `Find Out What ${cap(name)} Qualifies For →`,
    });
  }

  // If no flags at all, show a general cost-management card
  if (cards.length === 0) {
    cards.push({
      icon: "💡",
      headline: "Ways to manage these costs",
      body: "Even with savings and private insurance, there are strategies to make care more affordable — from tax deductions to state programs to negotiating directly with care providers.",
      cta: "Explore Financial Options →",
    });
  }

  return cards;
}

// ── Care type page URLs ─────────────────────────────────────────────────────

const CARE_TYPE_URLS: Record<string, string> = {
  memory_care: "/memory-care/",
  assisted_living: "/assisted-living/",
  home_care: "/home-care/",
  aging_in_place: "/aging-in-place/",
  nursing_home: "/nursing-homes/",
  independent: "/aging-in-place/",
};

// ── Main component ─────────────────────────────────────────────────────────

export default function ResultsPage({ results: r, onStartOver }: ResultsPageProps) {
  const [showAllFinancial, setShowAllFinancial] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [shareEmail, setShareEmail] = useState("");
  const [emailShareSent, setEmailShareSent] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const leadFormRef = useRef<HTMLDivElement>(null);

  // Display name: use entered first name if available, else personLabel
  const name = r.careRecipientName ?? r.personLabel;
  const nameCap = cap(name);
  const namePossessive = r.careRecipientName
    ? `${r.careRecipientName}'s`
    : r.personPossessive;

  const recKey = r.primaryRecommendation;
  const recLabel = RECOMMENDATION_LABELS[recKey] ?? recKey;
  const recDesc = RECOMMENDATION_DESCRIPTIONS[recKey] ?? "";

  const { summary, loading, locationLabel, stateName } = useCostData(r.zipCode ?? null);

  const CARE_TYPE_KEY_MAP: Record<string, 'memoryCare' | 'assistedLiving' | 'homeCare' | 'nursingHome' | 'adultDayCare'> = {
    memory_care: 'memoryCare',
    assisted_living: 'assistedLiving',
    home_care: 'homeCare',
    aging_in_place: 'homeCare',
    nursing_home: 'nursingHome',
    independent: 'homeCare',
  };
  const careTypeKey = CARE_TYPE_KEY_MAP[recKey] ?? 'homeCare';

  const secondaryKey = r.secondaryRecommendation;
  const secondaryLabel = RECOMMENDATION_LABELS[secondaryKey] ?? secondaryKey;
  const secondaryDescRaw = SECONDARY_DESCRIPTIONS[secondaryKey] ?? "";
  const secondaryDesc = secondaryDescRaw.replace(/\{person\}/g, name);

  const whyTexts = generateWhyText(r).slice(0, 3);
  const financialCards = buildFinancialCards(r, name, namePossessive);
  const visibleCards = showAllFinancial ? financialCards : financialCards.slice(0, 2);

  const hasFinancialFlags =
    r.vaEligibleFlag || r.medicaidLikelyFlag || r.medicaidPossibleFlag ||
    r.hasMedicaid || r.hasVA || r.hasLtcInsurance || r.coverageUnknown;

  const scrollToForm = () =>
    leadFormRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const handleEmailShare = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("=== Email Share ===", { to: shareEmail, results: r });
    setEmailShareSent(true);
  };

  const handleWebShare = async () => {
    const shareData = {
      title: "Care Assessment Results — OurTurnToCare",
      text: `Care assessment results for ${name}`,
      url: window.location.href,
    };
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // User cancelled — do nothing
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2500);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">

      {/* ── Sticky results header ───────────────────────────────────────── */}
      <div className="bg-white border-b border-slate-100 sticky top-0 z-10 shadow-sm">
        <div className="max-w-2xl mx-auto px-5 py-4 flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-700">
            Your Care Assessment Results
          </span>
          <button
            onClick={onStartOver}
            className="text-sm text-slate-400 hover:text-slate-600 transition-colors"
          >
            Start over
          </button>
        </div>
      </div>

      {/* ── Main scrollable content ─────────────────────────────────────── */}
      <div className="max-w-2xl mx-auto px-5 py-8 space-y-8">

        {/* ── Section 1: Recommendation ─────────────────────────────────── */}

        {/* Urgency alert — only shown when living alone + memory/safety risk */}
        {r.urgencyFlag && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 flex gap-3">
            <span className="text-xl flex-shrink-0 mt-0.5">⚠️</span>
            <p className="text-amber-800 text-sm leading-relaxed">
              Based on your answers, {namePossessive} current situation may need
              attention soon. We'd recommend exploring options now rather than
              waiting for an emergency.
            </p>
          </div>
        )}

        {/* Recommendation card */}
        <div>
          <p className="text-sm text-slate-500 mb-3">
            Based on your answers, {name} would likely benefit from:
          </p>
          <div className="bg-teal-700 rounded-2xl px-6 py-7 text-white shadow-md">
            <p className="text-sm font-semibold uppercase tracking-widest text-teal-200 mb-2">
              Primary Recommendation
            </p>
            <h1 className="text-3xl font-bold leading-tight mb-4">{recLabel}</h1>
            <p className="text-teal-100 leading-relaxed text-base">{recDesc}</p>
          </div>
        </div>

        {/* ── Section 2: Why this recommendation ────────────────────────── */}
        {whyTexts.length > 0 && (
          <section className="bg-white rounded-2xl px-6 py-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 mb-4">
              Why this recommendation
            </h2>
            <div className="space-y-3">
              {whyTexts.map((text, i) => (
                <p key={i} className="text-slate-600 text-sm leading-relaxed">
                  {text}
                </p>
              ))}
            </div>
          </section>
        )}

        {/* ── Section 3: Estimated costs ────────────────────────────────── */}
        {(loading || summary) ? (
          <section className="bg-white rounded-2xl px-6 py-6 shadow-sm">
            <CostEstimateBlock
              summary={summary}
              recommendedCareType={careTypeKey}
              locationLabel={locationLabel}
              stateName={stateName}
              loading={loading}
            />
          </section>
        ) : recKey === 'independent' ? (
          <section className="bg-white rounded-2xl px-6 py-6 shadow-sm">
            <p className="text-slate-600 text-sm leading-relaxed">
              No immediate care costs — but planning ahead can save money
              and stress later. A little preparation now goes a long way.
            </p>
          </section>
        ) : null}

        {/* ── Section 3A: Financial assistance ──────────────────────────── */}
        <section>
          <h2 className="text-lg font-bold text-slate-800 mb-4">
            Financial assistance options
          </h2>
          <div className="space-y-3">
            {visibleCards.map((card, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border-l-4 border-teal-500 px-5 py-5 shadow-sm"
              >
                <p className="font-semibold text-slate-800 mb-2">
                  {card.icon} {card.headline}
                </p>
                <p className="text-sm text-slate-600 leading-relaxed mb-3">
                  {card.body}
                </p>
                {card.href ? (
                  <Link
                    href={card.href}
                    className="text-teal-600 text-sm font-semibold hover:text-teal-800 transition-colors"
                  >
                    {card.cta}
                  </Link>
                ) : (
                  <button
                    onClick={scrollToForm}
                    className="text-teal-600 text-sm font-semibold hover:text-teal-800 transition-colors"
                  >
                    {card.cta}
                  </button>
                )}
              </div>
            ))}
          </div>

          {financialCards.length > 2 && (
            <button
              onClick={() => setShowAllFinancial((v) => !v)}
              className="mt-3 w-full text-center text-sm text-slate-400 hover:text-slate-600 py-2 transition-colors"
            >
              {showAllFinancial
                ? "Show fewer options ↑"
                : `See ${financialCards.length - 2} more option${financialCards.length - 2 > 1 ? "s" : ""} ↓`}
            </button>
          )}
        </section>

        {/* ── Section 4: What to do next ────────────────────────────────── */}
        <section className="bg-white rounded-2xl px-6 py-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 mb-5">
            What to do next
          </h2>
          <ol className="space-y-4">
            {(hasFinancialFlags
              ? [
                  {
                    label: "Explore financial assistance options",
                    action: scrollToForm,
                    href: null,
                    note: "You may qualify for programs that cover a significant portion of these costs",
                  },
                  {
                    label: `See ${recLabel} options near you`,
                    action: scrollToForm,
                    href: null,
                    note: `Find communities and providers in your area that match ${namePossessive} needs`,
                  },
                  {
                    label: `Learn more about ${recLabel}`,
                    action: null,
                    href: CARE_TYPE_URLS[recKey] ?? null,
                    note: "Understand what to look for, what to ask, and how to compare options",
                  },
                ]
              : [
                  {
                    label: `See ${recLabel} options near you`,
                    action: scrollToForm,
                    href: null,
                    note: `Find communities and providers in your area that match ${namePossessive} needs`,
                  },
                  {
                    label: `Learn more about ${recLabel}`,
                    action: null,
                    href: CARE_TYPE_URLS[recKey] ?? null,
                    note: "Understand what to look for, what to ask, and how to compare options",
                  },
                  {
                    label: "Explore ways to manage care costs",
                    action: scrollToForm,
                    href: null,
                    note: "Tax strategies, state programs, and negotiation tips",
                  },
                ]
            ).map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="w-7 h-7 rounded-full bg-teal-100 text-teal-700 text-sm font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <div>
                  {step.href ? (
                    <Link
                      href={step.href}
                      className="font-semibold text-slate-800 text-left hover:text-teal-700 transition-colors text-sm"
                    >
                      {step.label}
                    </Link>
                  ) : (
                    <button
                      onClick={step.action ?? undefined}
                      className="font-semibold text-slate-800 text-left hover:text-teal-700 transition-colors text-sm"
                    >
                      {step.label}
                    </button>
                  )}
                  <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                    {step.note}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ── Section 5: Lead capture form ──────────────────────────────── */}
        <section
          ref={leadFormRef}
          id="lead-capture-form"
          className="bg-white rounded-2xl px-6 py-7 shadow-sm"
        >
          <h2 className="text-xl font-bold text-slate-800 mb-1">
            See {recLabel} Options Near {r.zipCode || "You"}
          </h2>
          <p className="text-sm text-slate-500 mb-6 leading-relaxed">
            We can connect you with {recLabel.toLowerCase()} providers in your
            area that match {namePossessive} needs.
          </p>
          <LeadCaptureForm
            zipCode={r.zipCode}
            recommendationLabel={recLabel}
            personLabel={r.personLabel}
            careRecipientName={r.careRecipientName}
            hasFinancialFlags={hasFinancialFlags}
            results={r}
          />
        </section>

        {/* ── Section 6: Secondary recommendation ──────────────────────── */}
        <section className="bg-white rounded-2xl px-6 py-6 shadow-sm">
          <h2 className="text-base font-semibold text-slate-500 uppercase tracking-wide mb-4">
            Also worth considering
          </h2>
          <p className="text-slate-700 text-base leading-relaxed mb-5">
            {secondaryDesc || secondaryLabel}
          </p>
          <div className="flex gap-3">
            {CARE_TYPE_URLS[secondaryKey] ? (
              <Link
                href={CARE_TYPE_URLS[secondaryKey]}
                className="flex-1 text-center text-sm font-semibold text-teal-600 border border-teal-200 rounded-xl py-3 hover:bg-teal-50 transition-colors"
              >
                Learn More →
              </Link>
            ) : (
              <a
                href="#"
                className="flex-1 text-center text-sm font-semibold text-teal-600 border border-teal-200 rounded-xl py-3 hover:bg-teal-50 transition-colors"
              >
                Learn More →
              </a>
            )}
            <button
              onClick={scrollToForm}
              className="flex-1 text-center text-sm font-semibold text-teal-600 border border-teal-200 rounded-xl py-3 hover:bg-teal-50 transition-colors"
            >
              Estimate Costs →
            </button>
          </div>
        </section>

        {/* ── Section 7: Share and save ─────────────────────────────────── */}
        <section className="bg-white rounded-2xl px-6 py-6 shadow-sm">
          <h2 className="text-base font-semibold text-slate-500 uppercase tracking-wide mb-4">
            Share these results
          </h2>
          <div className="flex gap-3">
            <button
              onClick={() => setEmailModalOpen(true)}
              className="flex-1 flex flex-col items-center gap-1.5 py-4 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors text-sm font-medium"
            >
              <span className="text-xl">📧</span>
              <span>Email</span>
            </button>
            <button
              onClick={() => window.print()}
              className="flex-1 flex flex-col items-center gap-1.5 py-4 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors text-sm font-medium"
            >
              <span className="text-xl">🖨️</span>
              <span>Print</span>
            </button>
            <button
              onClick={handleWebShare}
              className="flex-1 flex flex-col items-center gap-1.5 py-4 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors text-sm font-medium"
            >
              <span className="text-xl">📤</span>
              <span>{linkCopied ? "Copied!" : "Share"}</span>
            </button>
          </div>
        </section>

        {/* Bottom padding */}
        <div className="h-8" />
      </div>

      {/* ── Email share modal ──────────────────────────────────────────────── */}
      {emailModalOpen && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-5"
          onClick={(e) => {
            if (e.target === e.currentTarget) setEmailModalOpen(false);
          }}
        >
          <div className="bg-white rounded-2xl px-6 py-7 w-full max-w-sm shadow-xl">
            {emailShareSent ? (
              <div className="text-center py-4">
                <div className="text-4xl mb-3">✅</div>
                <p className="font-semibold text-slate-800 mb-1">Sent!</p>
                <p className="text-sm text-slate-500">
                  Results are on their way.
                </p>
                <button
                  onClick={() => {
                    setEmailModalOpen(false);
                    setEmailShareSent(false);
                    setShareEmail("");
                  }}
                  className="mt-4 text-teal-600 text-sm font-medium"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-bold text-slate-800 mb-1">
                  Email these results
                </h3>
                <p className="text-sm text-slate-400 mb-5">
                  Share with a family member or keep a copy for yourself.
                </p>
                <form onSubmit={handleEmailShare} className="space-y-3">
                  <input
                    type="email"
                    placeholder="Email address"
                    value={shareEmail}
                    onChange={(e) => setShareEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-400 outline-none text-base"
                  />
                  <button
                    type="submit"
                    className="w-full bg-teal-600 text-white py-3 rounded-xl font-semibold text-base hover:bg-teal-700 transition-colors"
                  >
                    Send Results
                  </button>
                  <button
                    type="button"
                    onClick={() => setEmailModalOpen(false)}
                    className="w-full text-slate-400 text-sm py-2"
                  >
                    Cancel
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
