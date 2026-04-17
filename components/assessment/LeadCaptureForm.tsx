"use client";

import { useState } from "react";
import { AssessmentResults } from "@/lib/assessment/scoring";
import { trackAssessmentEvent, trackServerEvent } from "@/lib/analytics";

interface LeadCaptureFormProps {
  zipCode: string;
  recommendationLabel: string; // e.g. "Memory Care"
  personLabel: string;         // e.g. "your mother"
  careRecipientName: string | null;
  hasFinancialFlags: boolean;  // Pre-checks the financial info checkbox
  results: AssessmentResults;  // Full results object for Airtable
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  wantsFinancialInfo: boolean;
}

export default function LeadCaptureForm({
  zipCode,
  recommendationLabel,
  personLabel,
  careRecipientName,
  hasFinancialFlags,
  results,
}: LeadCaptureFormProps) {
  const displayName = careRecipientName ?? personLabel;

  const [form, setForm] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    wantsFinancialInfo: hasFinancialFlags,
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError("");

    // Build the full payload combining form fields with all assessment data
    const payload = {
      // Contact info
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      wantsFinancialInfo: form.wantsFinancialInfo,

      // Care recipient / personalization
      careRecipientName: results.careRecipientName,
      relationship: results.relationship,
      ageRange: results.ageRange,
      zipCode: results.zipCode,

      // Scoring results
      primaryRecommendation: results.primaryRecommendation,
      secondaryRecommendation: results.secondaryRecommendation,
      totalScore: results.totalScore,
      memoryCareFlag: results.memoryCareFlag,
      urgencyFlag: results.urgencyFlag,

      // Raw selections
      adlSelections: results.adlSelections,
      cognitiveSelections: results.cognitiveSelections,
      safetySelections: results.safetySelections,

      // More raw inputs
      livingSituation: results.livingSituation,
      veteranStatus: results.veteranStatus,
      financialSituation: results.financialSituation,
      currentCoverage: results.currentCoverage,
      budget: results.budget,

      // Financial flags
      vaEligibleFlag: results.vaEligibleFlag,
      medicaidLikelyFlag: results.medicaidLikelyFlag,
      hasLtcInsurance: results.hasLtcInsurance,

      // Meta
      submittedAt: new Date().toISOString(),
      sourcePage:
        typeof window !== "undefined" ? window.location.href : "",
    };

    try {
      const res = await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({})) as { ok?: boolean; error?: string; detail?: string };
      if (!res.ok || data.ok === false) {
        // Surface the real Airtable error in the dev console for debugging
        if (data.detail) console.error("[LeadCaptureForm] Server detail:", data.detail);
        throw new Error(
          data.error === "missing_fields"
            ? "Please fill in all required fields."
            : "Could not save your information. Please try again, or email us at hello@ourturntocare.com."
        );
      }

      // Fire analytics before navigating away
      trackAssessmentEvent("assessment_lead_submitted", {
        primary_recommendation: results.primaryRecommendation,
        financial_assistance_checked: form.wantsFinancialInfo,
        va_eligible: results.vaEligibleFlag,
        medicaid_likely: results.medicaidLikelyFlag,
        has_ltc_insurance: results.hasLtcInsurance,
        zip_code: results.zipCode,
      });
      await trackServerEvent("lead_submitted", {
        primary_recommendation: results.primaryRecommendation,
        financial_assistance_checked: form.wantsFinancialInfo,
        zip_code: results.zipCode,
        va_eligible: results.vaEligibleFlag,
        medicaid_likely: results.medicaidLikelyFlag,
        has_ltc_insurance: results.hasLtcInsurance,
      });

      // Redirect to thank-you page with context for personalization
      const params = new URLSearchParams({
        rec: results.primaryRecommendation,
        zip: results.zipCode || "",
        fa: form.wantsFinancialInfo ? "1" : "0",
      });
      window.location.href = `/tools/care-assessment/thank-you?${params.toString()}`;
    } catch (err) {
      console.error("Lead submission error:", err);
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const set = (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({
        ...prev,
        [field]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
      }));
      // Clear the field-level error as soon as they start typing
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  if (submitted) {
    return (
      <div className="bg-teal-50 border border-teal-100 rounded-2xl px-6 py-8 text-center">
        <div className="text-4xl mb-3">✅</div>
        <h3 className="text-xl font-bold text-teal-800 mb-2">
          You're all set!
        </h3>
        <p className="text-teal-700 leading-relaxed">
          We're finding {recommendationLabel.toLowerCase()} options near{" "}
          {zipCode}. Check your email for personalized recommendations.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {/* Name row — side by side on wider screens */}
      <div className="flex gap-3">
        <div className="flex-1">
          <label className="block text-sm font-medium text-slate-700 mb-1">
            First name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={form.firstName}
            onChange={set("firstName")}
            autoComplete="given-name"
            className={inputClass(!!errors.firstName)}
            placeholder="First name"
          />
          {errors.firstName && <FieldError message={errors.firstName} />}
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Last name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={form.lastName}
            onChange={set("lastName")}
            autoComplete="family-name"
            className={inputClass(!!errors.lastName)}
            placeholder="Last name"
          />
          {errors.lastName && <FieldError message={errors.lastName} />}
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Email address <span className="text-red-400">*</span>
        </label>
        <input
          type="email"
          value={form.email}
          onChange={set("email")}
          autoComplete="email"
          className={inputClass(!!errors.email)}
          placeholder="you@example.com"
        />
        {errors.email && <FieldError message={errors.email} />}
      </div>

      {/* Phone (optional) */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Phone{" "}
          <span className="text-slate-400 font-normal">(optional)</span>
        </label>
        <input
          type="tel"
          value={form.phone}
          onChange={set("phone")}
          autoComplete="tel"
          className={inputClass(false)}
          placeholder="(555) 555-5555"
        />
      </div>

      {/* Financial info checkbox */}
      <label className="flex items-start gap-3 cursor-pointer py-1">
        <input
          type="checkbox"
          checked={form.wantsFinancialInfo}
          onChange={set("wantsFinancialInfo")}
          className="mt-0.5 w-4 h-4 rounded border-slate-300 text-teal-600 cursor-pointer flex-shrink-0"
        />
        <span className="text-sm text-slate-600 leading-snug">
          I'd also like information about financial assistance options for{" "}
          {displayName}
        </span>
      </label>

      {/* Submission error — shown when the API call fails */}
      {submitError && (
        <div
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          role="alert"
        >
          {submitError}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={[
          "w-full text-white text-lg font-semibold py-4 rounded-xl",
          "transition-all duration-150 shadow-sm mt-2 flex items-center justify-center gap-2",
          isSubmitting
            ? "bg-teal-400 cursor-not-allowed"
            : "bg-teal-600 hover:bg-teal-700 active:bg-teal-800",
        ].join(" ")}
      >
        {isSubmitting ? (
          <>
            {/* Simple CSS spinner */}
            <span
              className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin"
              aria-hidden="true"
            />
            Submitting…
          </>
        ) : (
          "Show Me Options →"
        )}
      </button>

      {/* Privacy note */}
      <p className="text-xs text-slate-400 text-center leading-relaxed pt-1">
        Your information is only shared with care providers you choose to
        connect with. We never sell your data.
      </p>
    </form>
  );
}

function inputClass(hasError: boolean) {
  return [
    "w-full px-4 py-3 rounded-xl border text-base text-slate-800",
    "outline-none transition-colors duration-150 bg-white",
    hasError
      ? "border-red-300 focus:border-red-400"
      : "border-slate-200 focus:border-teal-400",
  ].join(" ");
}

function FieldError({ message }: { message: string }) {
  return <p className="mt-1 text-xs text-red-500">{message}</p>;
}
