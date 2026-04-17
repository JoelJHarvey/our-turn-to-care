"use client";

import { useState } from "react";
import QuestionScreen from "@/components/assessment/QuestionScreen";
import ToolLeadForm from "@/components/tools/ToolLeadForm";

// ── Types ──────────────────────────────────────────────────────────────────

interface VAAnswers {
  veteran_status: string;
  service_period: string;
  discharge_status: string;
  care_needs: string;
  living_situation: string;
}

interface VABenefitsResult {
  aidAndAttendance: boolean;
  survivingSpouse: boolean;
  vaHealthCare: boolean;
  stateVeteransHome: boolean;
  notEligible: boolean;
}

// ── Personalization map ────────────────────────────────────────────────────

const STATUS_LABELS: Record<
  string,
  { personLabel: string; pronoun: string; possessive: string; personPossessive: string; veteranRef: string }
> = {
  self: {
    personLabel: "you",
    pronoun: "you",
    possessive: "your",
    personPossessive: "your",
    veteranRef: "you",
  },
  spouse: {
    personLabel: "your spouse",
    pronoun: "they",
    possessive: "their",
    personPossessive: "your spouse's",
    veteranRef: "your spouse",
  },
  parent: {
    personLabel: "your parent",
    pronoun: "they",
    possessive: "their",
    personPossessive: "your parent's",
    veteranRef: "your parent",
  },
  other: {
    personLabel: "your family member",
    pronoun: "they",
    possessive: "their",
    personPossessive: "your family member's",
    veteranRef: "the veteran",
  },
};

// ── Benefits scoring ───────────────────────────────────────────────────────

function scoreVABenefits(answers: Partial<VAAnswers>): VABenefitsResult {
  const servicePeriod = answers.service_period ?? "not_sure";
  const discharge = answers.discharge_status ?? "not_sure";
  const careNeeds = answers.care_needs ?? "no";
  const veteranStatus = answers.veteran_status ?? "self";

  const isWartime = ["wwii", "korean", "vietnam", "gulf_war"].includes(servicePeriod);
  const goodDischarge = ["honorable", "general"].includes(discharge);
  const needsCare = careNeeds === "regular_help" || careNeeds === "housebound";

  const aidAndAttendance = isWartime && goodDischarge && needsCare;
  const survivingSpouse = veteranStatus === "spouse" && aidAndAttendance;
  const notEligible = !isWartime || !goodDischarge;

  return {
    aidAndAttendance,
    survivingSpouse,
    vaHealthCare: true,
    stateVeteransHome: true,
    notEligible: notEligible && !aidAndAttendance,
  };
}

const TOTAL_QUESTIONS = 5;

// ── Main component ─────────────────────────────────────────────────────────

export default function VABenefitsFlow() {
  const [screen, setScreen] = useState(0);
  const [answers, setAnswers] = useState<Partial<VAAnswers>>({});
  const [visible, setVisible] = useState(true);

  const [personLabel, setPersonLabel] = useState("the veteran");
  const [pronoun, setPronoun] = useState("they");
  const [possessive, setPossessive] = useState("their");
  const [personPossessive, setPersonPossessive] = useState("the veteran's");

  const fade = (callback: () => void) => {
    setVisible(false);
    setTimeout(() => {
      callback();
      setVisible(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 180);
  };

  const goTo = (n: number) => fade(() => setScreen(n));

  const handleAnswer = (questionId: keyof VAAnswers, value: string) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    if (questionId === "veteran_status") {
      const labels = STATUS_LABELS[value] ?? STATUS_LABELS.other;
      setPersonLabel(labels.personLabel);
      setPronoun(labels.pronoun);
      setPossessive(labels.possessive);
      setPersonPossessive(labels.personPossessive);
    }

    goTo(screen + 1);
  };

  const handleBack = () => {
    if (screen > 0) goTo(screen - 1);
  };

  const progress = screen === 0 ? 0 : Math.round((screen / TOTAL_QUESTIONS) * 100);

  const personProps = { personLabel, pronoun, possessive, personPossessive };
  const benefits = scoreVABenefits(answers);

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
                Free VA Benefits Screener
              </span>
            </div>
            <h1 className="text-3xl font-bold text-slate-800 leading-tight mb-4">
              VA Benefits for Senior Care: What You May Qualify For
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed mb-10">
              Veterans and their surviving spouses may be eligible for benefits that cover
              thousands of dollars per month in care costs. Most families don&rsquo;t know
              these programs exist.
            </p>
            <button
              onClick={() => goTo(1)}
              className="w-full bg-teal-600 text-white text-lg font-semibold py-4 rounded-xl
                         hover:bg-teal-700 active:bg-teal-800 transition-all duration-150 shadow-sm mb-6"
            >
              Check Your Benefits →
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

      {/* ── Screen 1: Veteran Status ───────────────────────────────────── */}
      {screen === 1 && (
        <QuestionScreen
          key="veteran_status"
          question="Are you a veteran, or are you checking for a family member?"
          options={[
            { label: "I'm a veteran", value: "self" },
            { label: "My spouse is/was a veteran", value: "spouse" },
            { label: "My parent is/was a veteran", value: "parent" },
            { label: "Another family member is/was a veteran", value: "other" },
          ]}
          multiSelect={false}
          progress={progress}
          {...personProps}
          onNext={([v]) => handleAnswer("veteran_status", v)}
          onBack={handleBack}
          initialValues={answers.veteran_status ? [answers.veteran_status] : []}
        />
      )}

      {/* ── Screen 2: Service Period ───────────────────────────────────── */}
      {screen === 2 && (
        <QuestionScreen
          key="service_period"
          question="When did {person} serve?"
          subtext="Wartime service is required for the VA Aid & Attendance pension benefit."
          options={[
            { label: "World War II (1941–1946)", value: "wwii" },
            { label: "Korean War (1950–1955)", value: "korean" },
            { label: "Vietnam War (1961–1975)", value: "vietnam" },
            { label: "Gulf War (1990–present, including Iraq/Afghanistan)", value: "gulf_war" },
            { label: "Peacetime service only", value: "peacetime" },
            { label: "I'm not sure", value: "not_sure" },
          ]}
          multiSelect={false}
          progress={progress}
          noneValues={["not_sure"]}
          {...personProps}
          onNext={([v]) => handleAnswer("service_period", v)}
          onBack={handleBack}
          initialValues={answers.service_period ? [answers.service_period] : []}
        />
      )}

      {/* ── Screen 3: Discharge Status ─────────────────────────────────── */}
      {screen === 3 && (
        <QuestionScreen
          key="discharge_status"
          question="What was {person's} discharge status?"
          subtext="Honorable or general discharge is typically required for most VA benefits."
          options={[
            { label: "Honorable", value: "honorable" },
            { label: "General (Under Honorable Conditions)", value: "general" },
            { label: "Other than honorable", value: "other" },
            { label: "I'm not sure", value: "not_sure" },
            { label: "Still serving", value: "still_serving" },
          ]}
          multiSelect={false}
          progress={progress}
          noneValues={["not_sure"]}
          {...personProps}
          onNext={([v]) => handleAnswer("discharge_status", v)}
          onBack={handleBack}
          initialValues={answers.discharge_status ? [answers.discharge_status] : []}
        />
      )}

      {/* ── Screen 4: Care Needs ───────────────────────────────────────── */}
      {screen === 4 && (
        <QuestionScreen
          key="care_needs"
          question="Does {person} currently need help with daily activities?"
          subtext="Aid & Attendance requires needing help with daily activities or being housebound."
          options={[
            { label: "Yes, needs regular help with activities like bathing or dressing", value: "regular_help" },
            { label: "Yes, is housebound (can't leave home without help)", value: "housebound" },
            { label: "No, but anticipating future care needs", value: "anticipating" },
          ]}
          multiSelect={false}
          progress={progress}
          {...personProps}
          onNext={([v]) => handleAnswer("care_needs", v)}
          onBack={handleBack}
          initialValues={answers.care_needs ? [answers.care_needs] : []}
        />
      )}

      {/* ── Screen 5: Living Situation ────────────────────────────────── */}
      {screen === 5 && (
        <QuestionScreen
          key="living_situation"
          question="Where does {person} currently live or plan to live?"
          options={[
            { label: "At home", value: "home" },
            { label: "Assisted living", value: "assisted_living" },
            { label: "Memory care", value: "memory_care" },
            { label: "Nursing home", value: "nursing_home" },
            { label: "With family", value: "with_family" },
          ]}
          multiSelect={false}
          progress={progress}
          {...personProps}
          onNext={([v]) => handleAnswer("living_situation", v)}
          onBack={handleBack}
          initialValues={answers.living_situation ? [answers.living_situation] : []}
        />
      )}

      {/* ── Screen 6: Results ──────────────────────────────────────────── */}
      {screen === 6 && (
        <VAResultsScreen
          benefits={benefits}
          answers={answers as VAAnswers}
          personLabel={personLabel}
          pronoun={pronoun}
          possessive={possessive}
          onStartOver={() => {
            setAnswers({});
            setPersonLabel("the veteran");
            setPronoun("they");
            setPossessive("their");
            setPersonPossessive("the veteran's");
            goTo(0);
          }}
        />
      )}
    </div>
  );
}

// ── VA Results Screen ──────────────────────────────────────────────────────

const BENEFIT_AMOUNTS = {
  veteran: "$2,431/month",
  spouseOnly: "$1,318/month",
  veteranWithSpouse: "$2,884/month",
} as const;

function VAResultsScreen({
  benefits,
  answers,
  personLabel,
  pronoun,
  possessive,
  onStartOver,
}: {
  benefits: VABenefitsResult;
  answers: VAAnswers;
  personLabel: string;
  pronoun: string;
  possessive: string;
  onStartOver: () => void;
}) {
  void possessive;

  const isVeteran = answers.veteran_status === "self";
  const isSurvivingSpouse = answers.veteran_status === "spouse";

  const benefitsShown = [
    benefits.aidAndAttendance ? "Aid & Attendance" : null,
    benefits.vaHealthCare ? "VA Health Care" : null,
    benefits.stateVeteransHome ? "State Veterans Homes" : null,
  ]
    .filter(Boolean)
    .join(", ");

  const extraPayload = {
    veteranStatus: answers.veteran_status ?? "",
    servicePeriod: answers.service_period ?? "",
    dischargeStatus: answers.discharge_status ?? "",
    careNeeds: answers.care_needs ?? "",
    livingSituation: answers.living_situation ?? "",
    benefitsShown,
  };

  const showAmount = isSurvivingSpouse
    ? BENEFIT_AMOUNTS.spouseOnly
    : BENEFIT_AMOUNTS.veteran;

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Sticky header */}
      <div className="bg-white border-b border-slate-100 sticky top-0 z-10 shadow-sm">
        <div className="max-w-2xl mx-auto px-5 py-4 flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-700">
            VA Benefits Results
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

        {/* Summary card */}
        <div>
          <p className="text-sm text-slate-500 mb-3">
            Based on your answers about {personLabel}:
          </p>
          <div className="bg-teal-700 rounded-2xl px-6 py-7 text-white shadow-md">
            <p className="text-sm font-semibold uppercase tracking-widest text-teal-200 mb-2">
              VA Benefits Assessment
            </p>
            <h1 className="text-2xl font-bold leading-tight mb-3">
              {benefits.aidAndAttendance
                ? `${pronoun === "you" ? "You may" : `${personLabel.charAt(0).toUpperCase() + personLabel.slice(1)} may`} qualify for VA Aid & Attendance`
                : `There may still be VA benefits worth exploring`}
            </h1>
            {benefits.aidAndAttendance && (
              <p className="text-teal-100 text-base leading-relaxed">
                This tax-free benefit can provide up to{" "}
                <strong className="text-white">{showAmount}</strong> to help cover care costs.
              </p>
            )}
          </div>
        </div>

        {/* Aid & Attendance benefit card */}
        {benefits.aidAndAttendance && (
          <section className="bg-white rounded-2xl px-6 py-6 shadow-sm border-l-4 border-teal-500">
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">🎖️</span>
              <div>
                <h2 className="text-lg font-bold text-slate-800 mb-2">
                  VA Aid & Attendance Pension Benefit
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  This benefit provides monthly payments to help cover care costs. The 2025
                  maximum rates are:
                </p>
                <div className="grid grid-cols-1 gap-3 mb-4 sm:grid-cols-3">
                  {[
                    { label: isVeteran ? "You (veteran)" : "Veteran", amount: BENEFIT_AMOUNTS.veteran },
                    {
                      label: "Surviving spouse",
                      amount: BENEFIT_AMOUNTS.spouseOnly,
                    },
                    {
                      label: "Veteran + dependent spouse",
                      amount: BENEFIT_AMOUNTS.veteranWithSpouse,
                    },
                  ].map(({ label, amount }) => (
                    <div key={label} className="bg-teal-50 rounded-xl p-3 text-center">
                      <p className="text-xs text-teal-600 mb-1">{label}</p>
                      <p className="text-base font-bold text-teal-800">{amount}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  These amounts are adjusted annually and are tax-free.
                </p>
                <div className="bg-slate-50 rounded-xl px-4 py-3">
                  <p className="text-xs font-semibold text-slate-600 mb-2">To apply, you&rsquo;ll need:</p>
                  <ul className="text-xs text-slate-500 space-y-1">
                    <li>• DD-214 discharge papers</li>
                    <li>• Medical evidence of care needs</li>
                    <li>• Financial information (income and assets)</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Not eligible explanation */}
        {benefits.notEligible && (
          <section className="bg-white rounded-2xl px-6 py-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 mb-3">
              About Aid & Attendance eligibility
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Based on your answers, {personLabel}{" "}
              {pronoun === "you" ? "may" : "may"} not qualify for the Aid & Attendance
              benefit right now — wartime service and an honorable or general discharge
              are required. However, there may be other VA benefits worth exploring with a
              specialist, and eligibility rules can be complex.
            </p>
          </section>
        )}

        {/* VA Health Care card */}
        <section className="bg-white rounded-2xl px-6 py-6 shadow-sm">
          <div className="flex items-start gap-3">
            <span className="text-2xl flex-shrink-0">🏥</span>
            <div>
              <h2 className="text-lg font-bold text-slate-800 mb-2">
                VA Health Care Benefits
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-3">
                If {personLabel}{" "}
                {pronoun === "you" ? "are" : "is"} enrolled in VA health care, additional
                benefits may include:
              </p>
              <ul className="space-y-1.5">
                {[
                  "Home-based primary care",
                  "Adult day health care",
                  "Respite care (temporary relief for family caregivers)",
                  "Community living centers (VA nursing homes)",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="text-teal-500 flex-shrink-0 mt-0.5">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* State Veterans Homes card */}
        <section className="bg-white rounded-2xl px-6 py-6 shadow-sm">
          <div className="flex items-start gap-3">
            <span className="text-2xl flex-shrink-0">🏡</span>
            <div>
              <h2 className="text-lg font-bold text-slate-800 mb-2">
                State Veterans Homes
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Most states operate veterans homes that provide nursing home, assisted
                living, and adult day care at reduced cost for eligible veterans. These
                facilities often have shorter wait times than VA community living centers
                and may accept surviving spouses as well.
              </p>
            </div>
          </div>
        </section>

        {/* Lead capture */}
        <section className="bg-white rounded-2xl px-6 py-7 shadow-sm">
          <h2 className="text-xl font-bold text-slate-800 mb-1">
            Connect with a VA Benefits Specialist
          </h2>
          <p className="text-sm text-slate-500 mb-6 leading-relaxed">
            A VA-accredited claims agent can help you navigate the application process,
            gather the required documentation, and maximize {pronoun === "you" ? "your" : `${personLabel}'s`} benefits.
            This service is typically free.
          </p>
          <ToolLeadForm
            apiEndpoint="/api/submit-va-lead"
            ctaText="Connect with a VA Benefits Specialist →"
            extraPayload={extraPayload}
            showStateField
            successTitle="We'll connect you with a specialist"
            successBody="A VA-accredited claims agent will be in touch to help you navigate the application process."
            onSuccess={() => {
              const params = new URLSearchParams({
                ...(benefits.aidAndAttendance && { benefit: "aid_attendance" }),
                ...(benefits.aidAndAttendance && { est: showAmount }),
              });
              window.location.href = `/tools/va-benefits/thank-you?${params.toString()}`;
            }}
          />
        </section>

        {/* Disclaimer */}
        <div className="bg-slate-100 rounded-xl px-5 py-4">
          <p className="text-xs text-slate-500 leading-relaxed">
            <strong>Disclaimer:</strong> This tool provides general guidance based on federal
            VA benefit guidelines. Eligibility depends on many factors including service
            record, income, and net worth. We recommend working with a VA-accredited claims
            agent or attorney for a formal evaluation.
          </p>
        </div>

        <div className="h-8" />
      </div>
    </div>
  );
}
