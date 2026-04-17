"use client";

import { useState, useRef } from "react";
import ProgressBar from "./ProgressBar";

interface ZipCodeScreenProps {
  question: string;
  subtext?: string;
  progress: number;
  progressLabel?: string;
  personLabel: string;
  possessive: string;
  onNext: (values: string[]) => void;
  onBack: () => void;
  // Pre-fills the input if the user navigates back to this screen
  initialValue?: string;
}

export default function ZipCodeScreen({
  question,
  subtext,
  progress,
  progressLabel,
  personLabel,
  possessive,
  onNext,
  onBack,
  initialValue = "",
}: ZipCodeScreenProps) {
  const [zip, setZip] = useState(initialValue);
  const [error, setError] = useState("");
  // Keep a ref so we can cancel any pending auto-focus timers
  const inputRef = useRef<HTMLInputElement>(null);

  // Apply {person} and {possessive} placeholders
  const sub = (text: string) =>
    text
      .replace(/\{person\}/g, personLabel)
      .replace(/\{possessive\}/g, possessive);

  const isValid = /^\d{5}$/.test(zip);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Strip anything that isn't a digit, then cap at 5 characters
    const digits = e.target.value.replace(/\D/g, "").slice(0, 5);
    setZip(digits);
    if (error) setError("");
  };

  const handleNext = () => {
    if (isValid) {
      onNext([zip]);
    } else {
      setError("Please enter a valid 5-digit zip code");
    }
  };

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
          <p className="text-base text-slate-500 leading-relaxed mb-10">
            {sub(subtext)}
          </p>
        )}
        {!subtext && <div className="mb-10" />}

        {/* Zip code input */}
        <div className="flex flex-col items-center">
          <div className="w-full max-w-[220px]">
            <input
              ref={inputRef}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete="postal-code"
              placeholder="00000"
              value={zip}
              onChange={handleChange}
              onKeyDown={(e) => {
                if (e.key === "Enter" && isValid) handleNext();
              }}
              maxLength={5}
              aria-label="Zip code"
              aria-describedby={error ? "zip-error" : undefined}
              className={[
                // Underline-only style — no box, just a bottom border
                "w-full bg-transparent text-center text-3xl font-semibold tracking-[0.3em]",
                "border-0 border-b-2 py-3 outline-none",
                "placeholder:text-slate-300 text-slate-800",
                "transition-colors duration-150",
                error
                  ? "border-red-400 focus:border-red-500"
                  : "border-slate-300 focus:border-teal-500",
              ].join(" ")}
            />

            {/* Inline error */}
            {error && (
              <p
                id="zip-error"
                className="mt-3 text-sm text-red-500 text-center"
                role="alert"
              >
                {error}
              </p>
            )}

            {/* Subtle hint shown while they haven't finished typing */}
            {!error && zip.length > 0 && zip.length < 5 && (
              <p className="mt-3 text-sm text-slate-400 text-center">
                {5 - zip.length} more digit{5 - zip.length !== 1 ? "s" : ""}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Navigation — flows naturally below content */}
      <div className="mt-8 flex flex-col gap-3">
        <button
          onClick={handleNext}
          className={[
            "w-full py-4 rounded-xl text-base font-semibold transition-all duration-150",
            isValid
              ? "bg-teal-600 text-white hover:bg-teal-700 active:bg-teal-800 shadow-sm"
              : "bg-slate-100 text-slate-400 cursor-not-allowed",
          ].join(" ")}
        >
          Next
        </button>

        <div className="flex items-center">
          <button
            onClick={onBack}
            className="text-gray-600 text-base font-medium py-3 px-3 min-h-[44px] hover:text-slate-800 transition-colors"
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
}
