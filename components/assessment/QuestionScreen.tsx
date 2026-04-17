"use client";

import { useState } from "react";
import ProgressBar from "./ProgressBar";
import { Option } from "@/lib/assessment/types";

interface QuestionScreenProps {
  question: string;
  subtext?: string;
  options: Option[];
  multiSelect: boolean;
  progress: number;
  progressLabel?: string;
  personLabel: string;
  pronoun: string;
  possessive: string;
  personPossessive: string;
  onNext: (values: string[]) => void;
  onBack: () => void;
  showSkip?: boolean;
  // Pre-fills selections if the user navigates back to a question they already answered
  initialValues?: string[];
  // Values that behave like "None of the above": selecting one clears all others;
  // selecting any regular option clears all of these.
  noneValues?: string[];
  // Optional informational note rendered below the options list
  footnote?: string;
}

export default function QuestionScreen({
  question,
  subtext,
  options,
  multiSelect,
  progress,
  progressLabel,
  personLabel,
  pronoun,
  possessive,
  personPossessive,
  onNext,
  onBack,
  showSkip = false,
  initialValues = [],
  noneValues,
  footnote,
}: QuestionScreenProps) {
  const [selected, setSelected] = useState<string[]>(initialValues);

  // Replace all supported placeholders in a string
  const sub = (text: string) =>
    text
      .replace(/\{person's\}/g, personPossessive)
      .replace(/\{person\}/g, personLabel)
      .replace(/\{pronoun\}/g, pronoun)
      .replace(/\{possessive\}/g, possessive);

  const handleToggle = (value: string) => {
    if (!multiSelect) {
      setSelected([value]);
      return;
    }

    setSelected((prev) => {
      const alreadySelected = prev.includes(value);
      const isExclusive = noneValues?.includes(value) ?? false;

      if (isExclusive) {
        // Tapping an exclusive option clears everything else and selects only it;
        // tapping it again deselects it entirely
        return alreadySelected ? [] : [value];
      }

      // Tapping a regular option strips out any exclusive values first, then toggles
      const withoutExclusive = prev.filter(
        (v) => !(noneValues?.includes(v) ?? false)
      );
      return alreadySelected
        ? withoutExclusive.filter((v) => v !== value)
        : [...withoutExclusive, value];
    });
  };

  const canProceed = selected.length > 0;

  return (
    <div className="bg-white px-5 pt-6 pb-8 max-w-lg mx-auto w-full">
      {/* Progress */}
      <div className="mb-8">
        <ProgressBar progress={progress} label={progressLabel} />
      </div>

      {/* Question text */}
      <div>
        <h2 className="text-2xl font-semibold text-slate-800 leading-snug mb-3">
          {sub(question)}
        </h2>

        {subtext && (
          <p className="text-base text-slate-500 leading-relaxed mb-6">
            {sub(subtext)}
          </p>
        )}
        {!subtext && <div className="mb-6" />}

        {/* Answer options */}
        <div className="flex flex-col gap-3">
          {options.map((option) => {
            const isSelected = selected.includes(option.value);

            // Exclusive options ("None of the above", "I'm not sure", etc.)
            // should only ever show teal styling when actively selected —
            // never on hover. This prevents them from looking pre-highlighted.
            const isExclusiveOption = noneValues?.includes(option.value) ?? false;

            return (
              <button
                key={option.value}
                onClick={() => handleToggle(option.value)}
                className={[
                  "w-full text-left px-4 py-4 rounded-xl border-2 text-base font-medium",
                  "transition-all duration-150 min-h-[52px]",
                  isSelected
                    ? "border-teal-500 bg-teal-50 text-teal-800"
                    : isExclusiveOption
                    ? "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    : "border-slate-200 bg-white text-slate-700 hover:border-teal-300 hover:bg-slate-50",
                ].join(" ")}
              >
                <span className="flex items-center gap-3">
                  {/* Checkbox for multi-select, radio circle for single-select */}
                  {multiSelect ? (
                    <span
                      className={[
                        "w-5 h-5 rounded flex-shrink-0 border-2 flex items-center justify-center",
                        isSelected
                          ? "border-teal-500 bg-teal-500"
                          : "border-slate-300 bg-white",
                      ].join(" ")}
                      aria-hidden="true"
                    >
                      {isSelected && (
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          viewBox="0 0 12 12"
                        >
                          <path
                            d="M2 6l3 3 5-5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </span>
                  ) : (
                    <span
                      className={[
                        "w-5 h-5 rounded-full flex-shrink-0 border-2 flex items-center justify-center",
                        isSelected
                          ? "border-teal-500"
                          : "border-slate-300 bg-white",
                      ].join(" ")}
                      aria-hidden="true"
                    >
                      {isSelected && (
                        <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
                      )}
                    </span>
                  )}

                  {/* Apply placeholder substitution to option labels too */}
                  {sub(option.label)}
                </span>
              </button>
            );
          })}
        </div>

        {/* Footnote — informational note below options */}
        {footnote && (
          <p className="mt-5 text-sm text-slate-400 leading-relaxed">
            {footnote}
          </p>
        )}
      </div>

      {/* Navigation — flows naturally below the last option */}
      <div className="mt-8 flex flex-col gap-3">
        <button
          onClick={() => {
            if (canProceed) onNext(selected);
          }}
          disabled={!canProceed}
          className={[
            "w-full py-4 rounded-xl text-base font-semibold transition-all duration-150",
            canProceed
              ? "bg-teal-600 text-white hover:bg-teal-700 active:bg-teal-800 shadow-sm"
              : "bg-slate-100 text-slate-400 cursor-not-allowed",
          ].join(" ")}
        >
          Next
        </button>

        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="text-gray-600 text-base font-medium py-3 px-3 min-h-[44px] hover:text-slate-800 transition-colors"
          >
            ← Back
          </button>

          {showSkip && (
            // Stores "skip" as the answer value so the scoring engine can
            // distinguish "skipped" from "no answer given"
            <button
              onClick={() => onNext(["skip"])}
              className="text-gray-600 text-base font-medium py-3 px-3 min-h-[44px] hover:text-slate-800 transition-colors"
            >
              Skip this question
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
