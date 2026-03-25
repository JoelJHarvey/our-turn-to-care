"use client";

import { useState, useRef } from "react";
import ProgressBar from "@/components/assessment/ProgressBar";
import QuestionScreen from "@/components/assessment/QuestionScreen";
import ToolLeadForm, { US_STATES } from "@/components/tools/ToolLeadForm";

// ── Types ──────────────────────────────────────────────────────────────────

interface MedicaidAnswers {
  relationship: string;
  age: string;
  state: string;
  marital_status: string;
  income: string;
  assets: string;
  adl_needs: string;
}

type EligibilityResult = "likely" | "possibly" | "unlikely";

// ── Personalization map ────────────────────────────────────────────────────

const RELATIONSHIP_LABELS: Record<
  string,
  { personLabel: string; pronoun: string; possessive: string; personPossessive: string }
> = {
  mother: {
    personLabel: "your mother",
    pronoun: "she",
    possessive: "her",
    personPossessive: "your mother's",
  },
  father: {
    personLabel: "your father",
    pronoun: "he",
    possessive: "his",
    personPossessive: "your father's",
  },
  spouse: {
    personLabel: "your spouse",
    pronoun: "they",
    possessive: "their",
    personPossessive: "your spouse's",
  },
  other: {
    personLabel: "your family member",
    pronoun: "they",
    possessive: "their",
    personPossessive: "your family member's",
  },
  self: {
    personLabel: "you",
    pronoun: "you",
    possessive: "your",
    personPossessive: "your",
  },
};

// ── Eligibility scoring ────────────────────────────────────────────────────

function scoreEligibility(answers: Partial<MedicaidAnswers>): EligibilityResult {
  const income = answers.income ?? "not_sure";
  const assets = answers.assets ?? "not_sure";
  const adl = answers.adl_needs ?? "no";

  if (income === "not_sure" || assets === "not_sure") return "possibly";

  const lowIncome = ["under_1k", "1k_2k"].includes(income);
  const highIncome = ["3k_5k", "over_5k"].includes(income);
  const lowAssets = assets === "under_2k";
  const highAssets = ["10k_50k", "50k_100k", "over_100k"].includes(assets);
  const needsHelp = adl === "significant" || adl === "some";

  if (lowIncome && lowAssets && needsHelp) return "likely";
  if (highIncome && highAssets) return "unlikely";
  return "possibly";
}

// Total question screens (1–7, not counting welcome=0 and results=8)
const TOTAL_QUESTIONS = 7;

// ── Main component ─────────────────────────────────────────────────────────

export default function MedicaidScreenerFlow() {
  // 0=welcome, 1–7=questions, 8=results
  const [screen, setScreen] = useState(0);
  const [answers, setAnswers] = useState<Partial<MedicaidAnswers>>({});
  const [visible, setVisible] = useState(true);

  // Personalization — set when relationship is answered on screen 1
  const [personLabel, setPersonLabel] = useState("your loved one");
  const [pronoun, setPronoun] = useState("they");
  const [possessive, setPossessive] = useState("their");
  const [personPossessive, setPersonPossessive] = useState("your loved one's");

  const resultsRef = useRef<HTMLDivElement>(null);

  const fade = (callback: () => void) => {
    setVisible(false);
    setTimeout(() => {
      callback();
      setVisible(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 180);
  };

  const goTo = (n: number) => fade(() => setScreen(n));

  const handleAnswer = (questionId: keyof MedicaidAnswers, value: string) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    if (questionId === "relationship") {
      const labels = RELATIONSHIP_LABELS[value] ?? RELATIONSHIP_LABELS.other;
      setPersonLabel(labels.personLabel);
      setPronoun(labels.pronoun);
      setPossessive(labels.possessive);
      setPersonPossessive(labels.personPossessive);
    }

    const next = screen + 1;
    goTo(next);
  };

  const handleBack = () => {
    if (screen > 0) goTo(screen - 1);
  };

  const progress = screen === 0 ? 0 : Math.round((screen / TOTAL_QUESTIONS) * 100);

  const personProps = { personLabel, pronoun, possessive, personPossessive };

  const stateName =
    US_STATES.find((s) => s.value === answers.state)?.label ?? answers.state ?? "your state";

  const eligibility = scoreEligibility(answers);

  return (
    <div
      style={{ transition: "opacity 0.18s ease" }}
      className={visible ? "opacity-100" : "opacity-0"}
    >
      {/* ── Welcome ────────────────────────────────────────────────────── */}
      {screen === 0 && (
        <div className="flex flex-col min-h-screen bg-white px-5 pt-16 pb-12">
          <div className="flex-1 flex flex-col justify-center max-w-lg mx-auto w-full">
            <div className="mb-6">
              <span className="inline-block bg-teal-50 text-teal-700 text-sm font-medium px-3 py-1.5 rounded-full border border-teal-100">
                Free Medicaid Eligibility Screener
              </span>
            </div>
            <h1 className="text-3xl font-bold text-slate-800 leading-tight mb-4">
              Could Your Loved One Qualify for Medicaid?
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed mb-10">
              Medicaid can cover most or all long-term care costs for people who qualify.
              Answer a few questions to find out if it&rsquo;s worth exploring.
            </p>
            <button
              onClick={() => goTo(1)}
              className="w-full bg-teal-600 text-white text-lg font-semibold py-4 rounded-xl
                         hover:bg-teal-700 active:bg-teal-800 transition-all duration-150 shadow-sm mb-6"
            >
              Check Eligibility →
            </button>
            <ul className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-5 sm:gap-y-2">
              {[
                { icon: "⏱", text: "Takes 2 minutes" },
                { icon: "✓", text: "Free — no login required" },
                { icon: "🔒", text: "Private" },
              ].map(({ icon, text }) => (
                <li key={text} className="flex items-center gap-1.5 text-sm text-slate-400">
                  <span>{icon}</span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* ── Screen 1: Relationship ─────────────────────────────────────── */}
      {screen === 1 && (
        <QuestionScreen
          key="relationship"
          question="Who are you checking eligibility for?"
          options={[
            { label: "My mother", value: "mother" },
            { label: "My father", value: "father" },
            { label: "My spouse", value: "spouse" },
            { label: "Another family member", value: "other" },
            { label: "Myself", value: "self" },
          ]}
          multiSelect={false}
          progress={progress}
          {...personProps}
          onNext={([v]) => handleAnswer("relationship", v)}
          onBack={handleBack}
          initialValues={answers.relationship ? [answers.relationship] : []}
        />
      )}

      {/* ── Screen 2: Age ──────────────────────────────────────────────── */}
      {screen === 2 && (
        <QuestionScreen
          key="age"
          question="How old is {person}?"
          options={[
            { label: "Under 65", value: "under_65" },
            { label: "65 or older", value: "65_plus" },
          ]}
          multiSelect={false}
          progress={progress}
          {...personProps}
          onNext={([v]) => handleAnswer("age", v)}
          onBack={handleBack}
          initialValues={answers.age ? [answers.age] : []}
        />
      )}

      {/* ── Screen 3: State (custom dropdown) ─────────────────────────── */}
      {screen === 3 && (
        <StateScreen
          progress={progress}
          personLabel={personLabel}
          pronoun={pronoun}
          possessive={possessive}
          initialValue={answers.state ?? ""}
          onNext={(v) => handleAnswer("state", v)}
          onBack={handleBack}
        />
      )}

      {/* ── Screen 4: Marital Status ───────────────────────────────────── */}
      {screen === 4 && (
        <QuestionScreen
          key="marital_status"
          question="Is {person} currently married?"
          options={[
            { label: "Yes, currently married", value: "married" },
            { label: "No", value: "no" },
            { label: "Widowed", value: "widowed" },
          ]}
          multiSelect={false}
          progress={progress}
          {...personProps}
          onNext={([v]) => handleAnswer("marital_status", v)}
          onBack={handleBack}
          initialValues={answers.marital_status ? [answers.marital_status] : []}
        />
      )}

      {/* ── Screen 5: Income ───────────────────────────────────────────── */}
      {screen === 5 && (
        <QuestionScreen
          key="income"
          question="What is {person's} approximate monthly income?"
          subtext="Include Social Security, pensions, and any other regular income. An estimate is fine."
          options={[
            { label: "Under $1,000/month", value: "under_1k" },
            { label: "$1,000 – $2,000/month", value: "1k_2k" },
            { label: "$2,000 – $3,000/month", value: "2k_3k" },
            { label: "$3,000 – $5,000/month", value: "3k_5k" },
            { label: "Over $5,000/month", value: "over_5k" },
            { label: "I'm not sure", value: "not_sure" },
          ]}
          multiSelect={false}
          progress={progress}
          noneValues={["not_sure"]}
          {...personProps}
          onNext={([v]) => handleAnswer("income", v)}
          onBack={handleBack}
          initialValues={answers.income ? [answers.income] : []}
        />
      )}

      {/* ── Screen 6: Assets ───────────────────────────────────────────── */}
      {screen === 6 && (
        <QuestionScreen
          key="assets"
          question="Approximately how much does {person} have in savings, investments, and other countable assets?"
          subtext="Don't include the value of their primary home, one vehicle, personal belongings, or prepaid funeral arrangements — those typically don't count."
          options={[
            { label: "Under $2,000", value: "under_2k" },
            { label: "$2,000 – $10,000", value: "2k_10k" },
            { label: "$10,000 – $50,000", value: "10k_50k" },
            { label: "$50,000 – $100,000", value: "50k_100k" },
            { label: "Over $100,000", value: "over_100k" },
            { label: "I'm not sure", value: "not_sure" },
          ]}
          multiSelect={false}
          progress={progress}
          noneValues={["not_sure"]}
          {...personProps}
          onNext={([v]) => handleAnswer("assets", v)}
          onBack={handleBack}
          initialValues={answers.assets ? [answers.assets] : []}
        />
      )}

      {/* ── Screen 7: ADL Needs ────────────────────────────────────────── */}
      {screen === 7 && (
        <QuestionScreen
          key="adl_needs"
          question="Does {person} currently need help with daily activities like bathing, dressing, or eating?"
          options={[
            { label: "Yes, significant help needed", value: "significant" },
            { label: "Yes, some help needed", value: "some" },
            { label: "No", value: "no" },
          ]}
          multiSelect={false}
          progress={progress}
          {...personProps}
          onNext={([v]) => handleAnswer("adl_needs", v)}
          onBack={handleBack}
          initialValues={answers.adl_needs ? [answers.adl_needs] : []}
        />
      )}

      {/* ── Screen 8: Results ──────────────────────────────────────────── */}
      {screen === 8 && (
        <ResultsScreen
          eligibility={eligibility}
          stateName={stateName}
          personLabel={personLabel}
          pronoun={pronoun}
          possessive={possessive}
          answers={answers as MedicaidAnswers}
          resultsRef={resultsRef}
          onStartOver={() => {
            setAnswers({});
            setPersonLabel("your loved one");
            setPronoun("they");
            setPossessive("their");
            setPersonPossessive("your loved one's");
            goTo(0);
          }}
        />
      )}
    </div>
  );
}

// ── StateScreen component ──────────────────────────────────────────────────

function StateScreen({
  progress,
  personLabel,
  pronoun,
  possessive,
  initialValue,
  onNext,
  onBack,
}: {
  progress: number;
  personLabel: string;
  pronoun: string;
  possessive: string;
  initialValue: string;
  onNext: (value: string) => void;
  onBack: () => void;
}) {
  const [state, setState] = useState(initialValue);
  const [error, setError] = useState("");

  // Unused but kept for the QuestionScreen-like interface consistency
  void pronoun;
  void possessive;

  const handleNext = () => {
    if (!state) {
      setError("Please select a state");
      return;
    }
    onNext(state);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white px-5 pt-6 pb-8 max-w-lg mx-auto w-full">
      <div className="mb-8">
        <ProgressBar progress={progress} />
      </div>

      <div className="flex-1">
        <h2 className="text-2xl font-semibold text-slate-800 leading-snug mb-3">
          What state does{" "}
          <span className="text-teal-700">{personLabel}</span> live in?
        </h2>
        <p className="text-base text-slate-500 leading-relaxed mb-6">
          Medicaid rules and eligibility limits vary significantly by state.
        </p>

        <select
          value={state}
          onChange={(e) => {
            setState(e.target.value);
            setError("");
          }}
          className={[
            "w-full px-4 py-4 rounded-xl border-2 text-base text-slate-800",
            "outline-none transition-colors duration-150 bg-white",
            error
              ? "border-red-300 focus:border-red-400"
              : state
              ? "border-teal-500 bg-teal-50"
              : "border-slate-200 focus:border-teal-400",
          ].join(" ")}
        >
          <option value="">Select a state…</option>
          {US_STATES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </div>

      <div className="mt-8 flex flex-col gap-3">
        <button
          onClick={handleNext}
          className={[
            "w-full py-4 rounded-xl text-base font-semibold transition-all duration-150",
            state
              ? "bg-teal-600 text-white hover:bg-teal-700 active:bg-teal-800 shadow-sm"
              : "bg-slate-100 text-slate-400 cursor-not-allowed",
          ].join(" ")}
        >
          Next
        </button>
        <button
          onClick={onBack}
          className="text-slate-500 text-sm font-medium py-3 px-1 hover:text-slate-700 transition-colors text-left"
        >
          ← Back
        </button>
      </div>
    </div>
  );
}

// ── ResultsScreen component ────────────────────────────────────────────────

function ResultsScreen({
  eligibility,
  stateName,
  personLabel,
  pronoun,
  possessive,
  answers,
  resultsRef,
  onStartOver,
}: {
  eligibility: EligibilityResult;
  stateName: string;
  personLabel: string;
  pronoun: string;
  possessive: string;
  answers: MedicaidAnswers;
  resultsRef: React.RefObject<HTMLDivElement | null>;
  onStartOver: () => void;
}) {
  // Suppress unused variable warnings for props used only in JSX
  void possessive;

  const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  const config = {
    likely: {
      badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
      card: "bg-emerald-600",
      label: "May Qualify for Medicaid",
      icon: "✅",
      headline: `Based on your answers, ${personLabel} may qualify for Medicaid in ${stateName}.`,
      body: `Medicaid in ${stateName} can cover long-term care costs in full or in large part. The next step is to work with an elder law attorney or Medicaid planning specialist who can guide you through the application process. The rules are complex, and small mistakes can delay or deny coverage.`,
      ctaText: "Connect with a Medicaid Planning Specialist →",
      formHeadline: "Connect with a Medicaid Planning Specialist",
      formSubtext: `A Medicaid planning specialist can evaluate ${pronoun === "you" ? "your" : possessive} specific situation and guide you through the application process in ${stateName}.`,
    },
    possibly: {
      badge: "bg-amber-100 text-amber-700 border-amber-200",
      card: "bg-amber-500",
      label: "May Qualify — Needs Evaluation",
      icon: "🔍",
      headline: `Based on your answers, ${personLabel} may qualify for Medicaid — but it depends on details a specialist would need to evaluate.`,
      body: `Your answers suggest ${pronoun === "you" ? "you could" : `${cap(personLabel)} could`} be close to eligibility. Medicaid planning strategies — like spending down assets, setting up trusts, or restructuring income — may help. An elder law attorney can evaluate the specific situation and map out the best path forward.`,
      ctaText: "Talk to a Medicaid Planning Specialist →",
      formHeadline: "Talk to a Medicaid Planning Specialist",
      formSubtext: `A specialist can evaluate whether ${personLabel} qualifies and identify planning strategies that could help.`,
    },
    unlikely: {
      badge: "bg-slate-100 text-slate-600 border-slate-200",
      card: "bg-slate-600",
      label: "Likely Doesn't Qualify Right Now",
      icon: "📋",
      headline: `Based on your answers, ${personLabel} likely doesn't qualify for Medicaid right now — but planning ahead is still important.`,
      body: `Even if Medicaid isn't an option today, care costs can deplete savings quickly. A Medicaid planning attorney can help you understand the look-back rules and plan ahead so Medicaid is available if and when it's needed. Many families who plan proactively qualify sooner than they expect.`,
      ctaText: "Talk to an Elder Law Attorney About Planning →",
      formHeadline: "Talk to an Elder Law Attorney",
      formSubtext: `An elder law attorney can help you understand the Medicaid look-back rules and plan ahead for ${personLabel}'s future care needs.`,
    },
  }[eligibility];

  const extraPayload = {
    relationship: answers.relationship ?? "",
    age: answers.age ?? "",
    state: answers.state ?? "",
    maritalStatus: answers.marital_status ?? "",
    income: answers.income ?? "",
    assets: answers.assets ?? "",
    adlNeeds: answers.adl_needs ?? "",
    eligibilityResult: eligibility,
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Sticky header */}
      <div className="bg-white border-b border-slate-100 sticky top-0 z-10 shadow-sm">
        <div className="max-w-2xl mx-auto px-5 py-4 flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-700">
            Medicaid Eligibility Results
          </span>
          <button
            onClick={onStartOver}
            className="text-sm text-slate-400 hover:text-slate-600 transition-colors"
          >
            Start over
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-5 py-8 space-y-6">
        {/* Result card */}
        <div>
          <p className="text-sm text-slate-500 mb-3">
            Based on your answers about {personLabel}:
          </p>
          <div className={`${config.card} rounded-2xl px-6 py-7 text-white shadow-md`}>
            <p className="text-sm font-semibold uppercase tracking-widest opacity-80 mb-2">
              {config.icon} Eligibility Assessment
            </p>
            <h1 className="text-2xl font-bold leading-tight mb-4">
              {config.label}
            </h1>
            <p className="opacity-90 leading-relaxed text-base">{config.headline}</p>
          </div>
        </div>

        {/* Explanation card */}
        <section className="bg-white rounded-2xl px-6 py-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 mb-3">What this means</h2>
          <p className="text-slate-600 text-sm leading-relaxed">{config.body}</p>
        </section>

        {/* Summary of answers */}
        <section className="bg-white rounded-2xl px-6 py-6 shadow-sm">
          <h2 className="text-base font-semibold text-slate-500 uppercase tracking-wide mb-4">
            Your answers
          </h2>
          <dl className="space-y-3">
            {[
              { label: "Who", value: cap(personLabel) },
              {
                label: "Age",
                value: answers.age === "under_65" ? "Under 65" : "65 or older",
              },
              { label: "State", value: stateName },
              {
                label: "Marital status",
                value:
                  answers.marital_status === "married"
                    ? "Currently married"
                    : answers.marital_status === "widowed"
                    ? "Widowed"
                    : "Not married",
              },
              {
                label: "Monthly income",
                value:
                  {
                    under_1k: "Under $1,000/month",
                    "1k_2k": "$1,000 – $2,000/month",
                    "2k_3k": "$2,000 – $3,000/month",
                    "3k_5k": "$3,000 – $5,000/month",
                    over_5k: "Over $5,000/month",
                    not_sure: "Not sure",
                  }[answers.income] ?? answers.income,
              },
              {
                label: "Countable assets",
                value:
                  {
                    under_2k: "Under $2,000",
                    "2k_10k": "$2,000 – $10,000",
                    "10k_50k": "$10,000 – $50,000",
                    "50k_100k": "$50,000 – $100,000",
                    over_100k: "Over $100,000",
                    not_sure: "Not sure",
                  }[answers.assets] ?? answers.assets,
              },
              {
                label: "Needs daily help",
                value:
                  answers.adl_needs === "significant"
                    ? "Yes, significant help"
                    : answers.adl_needs === "some"
                    ? "Yes, some help"
                    : "No",
              },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between items-start gap-4">
                <dt className="text-sm text-slate-500 flex-shrink-0">{label}</dt>
                <dd className="text-sm font-medium text-slate-800 text-right">{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Lead capture */}
        <section
          ref={resultsRef}
          className="bg-white rounded-2xl px-6 py-7 shadow-sm"
        >
          <h2 className="text-xl font-bold text-slate-800 mb-1">
            {config.formHeadline}
          </h2>
          <p className="text-sm text-slate-500 mb-6 leading-relaxed">
            {config.formSubtext}
          </p>
          <ToolLeadForm
            apiEndpoint="/api/submit-medicaid-lead"
            ctaText={config.ctaText}
            extraPayload={extraPayload}
            successTitle="We'll be in touch soon"
            successBody={`A Medicaid planning specialist will reach out to discuss ${personLabel}'s options in ${stateName}.`}
          />
        </section>

        {/* Disclaimer */}
        <div className="bg-slate-100 rounded-xl px-5 py-4">
          <p className="text-xs text-slate-500 leading-relaxed">
            <strong>Disclaimer:</strong> This screening provides a general estimate based on
            federal Medicaid guidelines. Each state has its own rules and income/asset limits,
            which change periodically. This is not a guarantee of eligibility. We recommend
            consulting with an elder law attorney for a complete evaluation.
          </p>
        </div>

        <div className="h-8" />
      </div>
    </div>
  );
}
