"use client";

import { useState } from "react";
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

// The three top-level phases of the assessment experience
type AssessmentPhase = "questions" | "calculating" | "results";

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

  const fadeTransition = (callback: () => void) => {
    setVisible(false);
    setTimeout(() => {
      callback();
      setVisible(true);
    }, 180);
  };

  // Navigate between numbered question screens
  const navigate = (nextScreen: number) =>
    fadeTransition(() => setCurrentScreen(nextScreen));

  // Switch between the three top-level phases
  const switchPhase = (next: AssessmentPhase) =>
    fadeTransition(() => setPhase(next));

  const handleStart = () => navigate(1);

  const handleNext = (questionId: string, values: string[]) => {
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

    // When the last question is answered, score the assessment and move to
    // the calculating phase (which shows the animated loader for 2 seconds)
    if (currentScreen === questions.length) {
      // Build a clean input object from the raw answers, then score it.
      // We use newAnswers (not answers from state) because state updates are
      // async — newAnswers already includes the just-submitted answer.
      const input = buildInput(newAnswers, personLabel, pronoun, possessive, personPossessive);
      const scored = calculateResults(input);
      setResults(scored);

      // Log the full results to the browser console during testing
      console.log("=== Assessment Results ===", scored);

      switchPhase("calculating");
    } else {
      navigate(currentScreen + 1);
    }
  };

  const handleBack = () => {
    if (currentScreen > 0) navigate(currentScreen - 1);
  };

  // Transition screens advance without saving any answer
  const handleTransitionContinue = () => navigate(currentScreen + 1);

  // Back from calculating returns to Screen 12 (currentScreen stays at questions.length)
  const handleCalculatingBack = () => switchPhase("questions");

  // Resets every piece of state back to its initial value
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

  // After 2 seconds of calculating, move to results
  const handleCalculatingComplete = () => switchPhase("results");

  // questions is 0-indexed; screen 1 → questions[0], screen 2 → questions[1], etc.
  const currentQuestion =
    currentScreen > 0 ? questions[currentScreen - 1] : null;

  const progress = currentQuestion?.progress ?? 0;

  // The relationship answer drives per-screen variant selection.
  const relationship = answers["relationship"]?.[0] ?? "";

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
                />
              )}

              {currentQuestion.screenType === "zip" && (
                <ZipCodeScreen
                  key={currentScreen}
                  question={displayQuestion}
                  subtext={displaySubtext}
                  progress={progress}
                  personLabel={personLabel}
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
          onComplete={handleCalculatingComplete}
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

