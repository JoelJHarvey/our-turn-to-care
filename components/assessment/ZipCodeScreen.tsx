"use client";

import { useState, useEffect, useRef } from "react";
import ProgressBar from "./ProgressBar";

interface ZipCodeScreenProps {
  question: string;
  subtext?: string;
  progress: number;
  personLabel: string;
  onNext: (values: string[]) => void;
  onBack: () => void;
  // Pre-fills the input if the user navigates back to this screen
  initialValue?: string;
}

export default function ZipCodeScreen({
  question,
  subtext,
  progress,
  personLabel,
  onNext,
  onBack,
  initialValue = "",
}: ZipCodeScreenProps) {
  const [zip, setZip] = useState(initialValue);
  const [error, setError] = useState("");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const displayQuestion = question.replace(/\{person\}/g, personLabel);

  const isValid = /^\d{5}$/.test(zip);

  // Auto-advance 300 ms after the 5th digit is entered. The Next button
  // remains visible as a fallback for paste/autofill edge cases.
  useEffect(() => {
    if (isValid) {
      timerRef.current = setTimeout(() => onNext([zip]), 300);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // onNext is recreated each render but this component is keyed by screen,
    // so the closure is always fresh and excluding it from deps is safe.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zip, isValid]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Strip anything that isn't a digit, then cap at 5 characters
    const digits = e.target.value.replace(/\D/g, "").slice(0, 5);
    setZip(digits);
    if (error) setError("");
  };

  const handleNext = () => {
    if (isValid) {
      if (timerRef.current) clearTimeout(timerRef.current);
      onNext([zip]);
    } else {
      setError("Please enter a valid 5-digit zip code");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white px-5 pt-6 pb-8 max-w-lg mx-auto w-full">
      {/* Progress */}
      <div className="mb-8">
        <ProgressBar progress={progress} />
      </div>

      {/* Question text */}
      <div className="flex-1">
        <h2 className="text-2xl font-semibold text-slate-800 leading-snug mb-3">
          {displayQuestion}
        </h2>

        {subtext && (
          <p className="text-base text-slate-500 leading-relaxed mb-10">
            {subtext}
          </p>
        )}
        {!subtext && <div className="mb-10" />}

        {/* Zip code input */}
        <div className="flex flex-col items-center">
          <div className="w-full max-w-[220px]">
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

      {/* Navigation */}
      <div className="mt-8 flex flex-col gap-3">
        <button
          onClick={handleNext}
          className={[
            "w-full py-4 rounded-xl text-base font-semibold transition-all duration-150",
            zip.length === 5
              ? "bg-teal-600 text-white hover:bg-teal-700 active:bg-teal-800 shadow-sm"
              : "bg-slate-100 text-slate-400 cursor-not-allowed",
          ].join(" ")}
        >
          Next
        </button>

        <div className="flex items-center">
          <button
            onClick={onBack}
            className="text-slate-500 text-sm font-medium py-3 px-1 hover:text-slate-700 transition-colors"
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
}
