"use client";

import { useState, useEffect, useCallback } from "react";
import WelcomeScreen from "./WelcomeScreen";
import QuestionScreen from "./QuestionScreen";
import ZipCodeScreen from "./ZipCodeScreen";
import NameScreen from "./NameScreen";
import TransitionScreen from "./TransitionScreen";
import CalculatingScreen from "./CalculatingScreen";
import { questions, RELATIONSHIP_OPTIONS } from "@/lib/assessment/questions";
import type { AssessmentAnswers } from "@/lib/assessment/types";
import {
  buildInput,
  calculateResults,
  AssessmentResults,
} from "@/lib/assessment/scoring";
import ResultsPage from "./ResultsPage";
import { trackAssessmentEvent, trackServerEvent } from "@/lib/analytics";

// The three top-level phases of the assessment experience
type AssessmentPhase = "questions" | "calculating" | "results";

// ── URL slug map ────────────────────────────────────────────────────────────

const SCREEN_SLUGS: Record<number, string> = {
  0: "",
  1: "relationship",
  2: "age",
  3: "daily-activities",
  4: "cognitive-changes",
  5: "safety",
  6: "living-situation",
  7: "location",
  8: "financial-intro",
  9: "veteran-status",
  10: "financial-situation",
  11: "coverage",
  12: "budget",
  13: "name",
};

// ── Progress bar section labels ─────────────────────────────────────────────

function getProgressLabel(screen: number, relationship?: string): string {
  if (screen <= 2) return relationship === "self" ? "About you" : "About your loved one";
  if (screen <= 5) return "Care needs";
  if (screen === 6) return "Living situation";
  if (screen === 7) return "Location";
  if (screen >= 8 && screen <= 12) return "Financial assistance";
  if (screen === 13) return "Almost done!";
  return "Assessment";
}

// ── Main component ──────────────────────────────────────────────────────────

export default function AssessmentFlow() {
  const [phase, setPhase] = useState<AssessmentPhase>("questions");

  // 0 = welcome screen, 1 = first question, 2 = second question, etc.
  const [currentScreen, setCurrentScreen] = useState(0);
  const [answers, setAnswers] = useState<AssessmentAnswers>({});

  // Populated when the last question is answered and the calculating phase begins
  const [results, setResults] = useState<AssessmentResults | null>(null);

  // Personalisation state — all set when the user answers Screen 1
  const [personLabel, setPersonLabel] = useState("your loved one");
  const [personPossessive, setPersonPossessive] = useState("your loved one's");
  const [pronoun, setPronoun] = useState("they");
  const [possessive, setPossessive] = useState("their");

  // Controls the fade transition between every screen and phase change
  const [visible, setVisible] = useState(true);

  // ── Time tracking ──────────────────────────────────────────────────────────
  const [stepStartTime, setStepStartTime] = useState(() => Date.now());
  const [totalStartTime] = useState(() => Date.now());

  const getTimeOnStep = useCallback(
    () => Math.round((Date.now() - stepStartTime) / 1000),
    [stepStartTime]
  );

  const getTotalTime = useCallback(
    () => Math.round((Date.now() - totalStartTime) / 1000),
    [totalStartTime]
  );

  // ── Scroll to top + URL tracking on every screen/phase change ─────────────

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setStepStartTime(Date.now());

    // Build the new URL path
    let slug: string;
    if (phase === "calculating") {
      slug = "calculating";
    } else if (phase === "results") {
      slug = "results";
    } else {
      slug = SCREEN_SLUGS[currentScreen] ?? "";
    }

    const newPath = slug
      ? `/tools/care-assessment/${slug}`
      : "/tools/care-assessment";

    if (window.location.pathname !== newPath) {
      window.history.pushState({ step: currentScreen, phase }, "", newPath);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentScreen, phase]);

  // ── Browser back/forward button support ────────────────────────────────────

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state) {
        setPhase(event.state.phase ?? "questions");
        setCurrentScreen(event.state.step ?? 0);
      } else {
        setPhase("questions");
        setCurrentScreen(0);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // ── Direct URL access: if someone lands on a step slug with no state, redirect to start ──

  useEffect(() => {
    const path = window.location.pathname;
    if (path !== "/tools/care-assessment" && currentScreen === 0 && phase === "questions") {
      window.history.replaceState({}, "", "/tools/care-assessment");
    }
    // Only run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Transitions ────────────────────────────────────────────────────────────

  const fadeTransition = (callback: () => void) => {
    setVisible(false);
    setTimeout(() => {
      callback();
      setVisible(true);
    }, 180);
  };

  const navigate = (nextScreen: number) =>
    fadeTransition(() => setCurrentScreen(nextScreen));

  const switchPhase = (next: AssessmentPhase) =>
    fadeTransition(() => setPhase(next));

  // ── Handlers ───────────────────────────────────────────────────────────────

  const handleStart = () => {
    trackAssessmentEvent("assessment_started", {
      entry_source: document.referrer || "direct",
      landing_page: window.location.href,
    });
    navigate(1);
  };

  const handleNext = (questionId: string, values: string[]) => {
    const timeOnStep = getTimeOnStep();
    const newAnswers = { ...answers, [questionId]: values };
    setAnswers(newAnswers);

    // Screen 1 sets all personalisation labels for the rest of the assessment
    if (questionId === "relationship" && values.length > 0) {
      const match = RELATIONSHIP_OPTIONS.find((o) => o.value === values[0]);
      if (match) {
        setPersonLabel(match.personLabel);
        setPersonPossessive(match.personPossessive);
        setPronoun(match.pronoun);
        setPossessive(match.possessive);
      }
    }

    // Fire step completion event
    const isSkip = values[0] === "skip";
    const currentQ = questions[currentScreen - 1];
    trackAssessmentEvent("assessment_step_completed", {
      step_number: currentScreen,
      step_name: SCREEN_SLUGS[currentScreen] ?? "",
      step_action: isSkip ? "skip" : "next",
      answer_value: values[0] ?? null,
      answer_count: isSkip ? 0 : values.length,
      time_on_step_seconds: timeOnStep,
      progress_percent: currentQ?.progress ?? 0,
    });

    // When the last question is answered, score and move to calculating phase
    if (currentScreen === questions.length) {
      const input = buildInput(newAnswers, personLabel, pronoun, possessive, personPossessive);
      const scored = calculateResults(input);
      setResults(scored);

      console.log("=== Assessment Results ===", scored);

      switchPhase("calculating");
    } else {
      navigate(currentScreen + 1);
    }
  };

  const handleBack = () => {
    if (currentScreen > 0) {
      trackAssessmentEvent("assessment_step_abandoned", {
        abandoned_step_number: currentScreen,
        abandoned_step_name: SCREEN_SLUGS[currentScreen] ?? "",
        direction: "back",
        time_on_step_seconds: getTimeOnStep(),
      });
      navigate(currentScreen - 1);
    }
  };

  const handleTransitionContinue = () => navigate(currentScreen + 1);

  const handleCalculatingBack = () => switchPhase("questions");

  const handleStartOver = () =>
    fadeTransition(() => {
      setPhase("questions");
      setCurrentScreen(0);
      setAnswers({});
      setResults(null);
      setPersonLabel("your loved one");
      setPersonPossessive("your loved one's");
      setPronoun("they");
      setPossessive("their");
    });

  const handleCalculatingComplete = () => switchPhase("results");

  // Fire assessment_completed once when transitioning to results
  const handleResultsVisible = useCallback(
    (scored: AssessmentResults) => {
      const totalTime = getTotalTime();
      trackAssessmentEvent("assessment_completed", {
        primary_recommendation: scored.primaryRecommendation,
        secondary_recommendation: scored.secondaryRecommendation,
        total_score: scored.totalScore,
        memory_care_flag: scored.memoryCareFlag,
        urgency_flag: scored.urgencyFlag,
        cognitive_score: scored.cognitiveScore,
        adl_score: scored.adlScore,
        safety_score: scored.safetyScore,
        va_eligible: scored.vaEligibleFlag,
        va_possible: scored.vaPossibleFlag,
        medicaid_likely: scored.medicaidLikelyFlag,
        medicaid_possible: scored.medicaidPossibleFlag,
        has_ltc_insurance: scored.hasLtcInsurance,
        has_medicaid: scored.hasMedicaid,
        has_va: scored.hasVA,
        coverage_unknown: scored.coverageUnknown,
        budget_range: scored.budget || "not_provided",
        relationship: scored.relationship,
        age_range: scored.ageRange,
        zip_code: scored.zipCode,
        name_provided: !!scored.careRecipientName,
        total_time_seconds: totalTime,
      });
      trackServerEvent("assessment_completed", {
        primary_recommendation: scored.primaryRecommendation,
        total_score: scored.totalScore,
        zip_code: scored.zipCode,
        va_eligible: scored.vaEligibleFlag,
        medicaid_likely: scored.medicaidLikelyFlag,
        has_ltc_insurance: scored.hasLtcInsurance,
        relationship: scored.relationship,
        age_range: scored.ageRange,
        total_time_seconds: totalTime,
      });
    },
    [getTotalTime]
  );

  // questions is 0-indexed; screen 1 → questions[0], screen 2 → questions[1], etc.
  const currentQuestion =
    currentScreen > 0 ? questions[currentScreen - 1] : null;

  // The relationship answer drives per-screen variant selection and label personalization.
  const relationship = answers["relationship"]?.[0] ?? "";

  const progress = currentQuestion?.progress ?? 0;
  const progressLabel = currentScreen > 0 ? getProgressLabel(currentScreen, relationship) : undefined;

  // Resolve relationship-specific overrides so every screen component receives
  // the correct text and options without knowing about relationship paths.
  const displayQuestion =
    currentQuestion?.questionVariants?.[relationship] ??
    currentQuestion?.question ??
    "";
  const displaySubtext =
    currentQuestion?.subtextVariants?.[relationship] ??
    currentQuestion?.subtext;
  const displayOptions =
    currentQuestion?.optionVariants?.[relationship] ??
    currentQuestion?.options ??
    [];

  // Shared personalisation props spread into every screen that renders text
  const personalisationProps = {
    personLabel,
    pronoun,
    possessive,
    personPossessive,
  };

  return (
    <div
      style={{ transition: "opacity 0.18s ease" }}
      className={visible ? "opacity-100" : "opacity-0"}
    >
      {/* ── Questions phase ───────────────────────────────────────────── */}
      {phase === "questions" && (
        <>
          {currentScreen === 0 && <WelcomeScreen onStart={handleStart} />}

          {currentScreen > 0 && currentQuestion && (
            <>
              {currentQuestion.screenType === "transition" && (
                <TransitionScreen
                  key={currentScreen}
                  message={displayQuestion}
                  subtext={displaySubtext ?? ""}
                  {...personalisationProps}
                  onContinue={handleTransitionContinue}
                  onBack={handleBack}
                  progress={progress}
                  progressLabel={progressLabel}
                />
              )}

              {currentQuestion.screenType === "zip" && (
                <ZipCodeScreen
                  key={currentScreen}
                  question={displayQuestion}
                  subtext={displaySubtext}
                  progress={progress}
                  progressLabel={progressLabel}
                  personLabel={personLabel}
                  possessive={possessive}
                  onNext={(values) => handleNext(currentQuestion.id, values)}
                  onBack={handleBack}
                  initialValue={answers[currentQuestion.id]?.[0] ?? ""}
                />
              )}

              {currentQuestion.screenType === "name" && (
                <NameScreen
                  key={currentScreen}
                  question={displayQuestion}
                  subtext={displaySubtext}
                  progress={progress}
                  progressLabel={progressLabel}
                  {...personalisationProps}
                  onNext={(values) => handleNext(currentQuestion.id, values)}
                  onBack={handleBack}
                  // Don't restore "skip" as the input value — show empty instead
                  initialValue={
                    answers[currentQuestion.id]?.[0] === "skip"
                      ? ""
                      : (answers[currentQuestion.id]?.[0] ?? "")
                  }
                />
              )}

              {/* Default: "select" (or undefined) renders QuestionScreen */}
              {(!currentQuestion.screenType ||
                currentQuestion.screenType === "select") && (
                <QuestionScreen
                  key={currentScreen}
                  question={displayQuestion}
                  subtext={displaySubtext}
                  options={displayOptions}
                  multiSelect={currentQuestion.multiSelect}
                  noneValues={currentQuestion.noneValues}
                  footnote={currentQuestion.footnote}
                  progress={progress}
                  progressLabel={progressLabel}
                  {...personalisationProps}
                  onNext={(values) => handleNext(currentQuestion.id, values)}
                  onBack={handleBack}
                  showSkip={currentQuestion.showSkip}
                  initialValues={answers[currentQuestion.id] ?? []}
                />
              )}
            </>
          )}
        </>
      )}

      {/* ── Calculating phase ─────────────────────────────────────────── */}
      {phase === "calculating" && (
        <CalculatingScreen
          onComplete={() => {
            handleCalculatingComplete();
            if (results) handleResultsVisible(results);
          }}
          onBack={handleCalculatingBack}
        />
      )}

      {/* ── Results phase ─────────────────────────────────────────────── */}
      {phase === "results" && results && (
        <ResultsPage results={results} onStartOver={handleStartOver} />
      )}
    </div>
  );
}
