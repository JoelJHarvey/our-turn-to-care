"use client";

import { useState } from "react";

interface ToolLeadFormProps {
  apiEndpoint: string;
  ctaText?: string;
  extraPayload?: Record<string, unknown>;
  successTitle?: string;
  successBody?: string;
  checkboxLabel?: string;
  showStateField?: boolean;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  state: string;
  checkbox: boolean;
}

export default function ToolLeadForm({
  apiEndpoint,
  ctaText = "Submit →",
  extraPayload = {},
  successTitle = "You're all set!",
  successBody = "We'll be in touch shortly.",
  checkboxLabel,
  showStateField = false,
}: ToolLeadFormProps) {
  const [form, setForm] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    state: "",
    checkbox: true,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!form.firstName.trim()) e.firstName = "First name is required";
    if (!form.lastName.trim()) e.lastName = "Last name is required";
    if (!form.email.trim()) {
      e.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Please enter a valid email address";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          ...(showStateField ? { state: form.state } : {}),
          checkbox: form.checkbox,
          submittedAt: new Date().toISOString(),
          sourcePage: typeof window !== "undefined" ? window.location.href : "",
          ...extraPayload,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          (data as { error?: string }).error ?? "Something went wrong. Please try again."
        );
      }
      setSubmitted(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const setField =
    (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value =
        e.target instanceof HTMLInputElement && e.target.type === "checkbox"
          ? e.target.checked
          : e.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  if (submitted) {
    return (
      <div className="bg-teal-50 border border-teal-100 rounded-2xl px-6 py-8 text-center">
        <div className="text-4xl mb-3">✅</div>
        <h3 className="text-xl font-bold text-teal-800 mb-2">{successTitle}</h3>
        <p className="text-teal-700 leading-relaxed">{successBody}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="flex gap-3">
        <div className="flex-1">
          <label className="block text-sm font-medium text-slate-700 mb-1">
            First name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={form.firstName}
            onChange={setField("firstName")}
            autoComplete="given-name"
            placeholder="First name"
            className={inputClass(!!errors.firstName)}
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
            onChange={setField("lastName")}
            autoComplete="family-name"
            placeholder="Last name"
            className={inputClass(!!errors.lastName)}
          />
          {errors.lastName && <FieldError message={errors.lastName} />}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Email address <span className="text-red-400">*</span>
        </label>
        <input
          type="email"
          value={form.email}
          onChange={setField("email")}
          autoComplete="email"
          placeholder="you@example.com"
          className={inputClass(!!errors.email)}
        />
        {errors.email && <FieldError message={errors.email} />}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Phone <span className="text-slate-400 font-normal">(optional)</span>
        </label>
        <input
          type="tel"
          value={form.phone}
          onChange={setField("phone")}
          autoComplete="tel"
          placeholder="(555) 555-5555"
          className={inputClass(false)}
        />
      </div>

      {showStateField && (
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            State <span className="text-slate-400 font-normal">(optional)</span>
          </label>
          <select
            value={form.state}
            onChange={setField("state")}
            className={[
              "w-full px-4 py-3 rounded-xl border text-base text-slate-800",
              "outline-none transition-colors duration-150 bg-white",
              "border-slate-200 focus:border-teal-400",
            ].join(" ")}
          >
            <option value="">Select state…</option>
            {US_STATES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {checkboxLabel && (
        <label className="flex items-start gap-3 cursor-pointer py-1">
          <input
            type="checkbox"
            checked={form.checkbox}
            onChange={setField("checkbox")}
            className="mt-0.5 w-4 h-4 rounded border-slate-300 text-teal-600 cursor-pointer flex-shrink-0"
          />
          <span className="text-sm text-slate-600 leading-snug">{checkboxLabel}</span>
        </label>
      )}

      {submitError && (
        <div
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          role="alert"
        >
          {submitError}
        </div>
      )}

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
            <span
              className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin"
              aria-hidden="true"
            />
            Submitting…
          </>
        ) : (
          ctaText
        )}
      </button>

      <p className="text-xs text-slate-400 text-center leading-relaxed pt-1">
        Your information is only shared with specialists you choose to connect with.
        We never sell your data.
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

export const US_STATES = [
  { label: "Alabama", value: "AL" },
  { label: "Alaska", value: "AK" },
  { label: "Arizona", value: "AZ" },
  { label: "Arkansas", value: "AR" },
  { label: "California", value: "CA" },
  { label: "Colorado", value: "CO" },
  { label: "Connecticut", value: "CT" },
  { label: "Delaware", value: "DE" },
  { label: "Florida", value: "FL" },
  { label: "Georgia", value: "GA" },
  { label: "Hawaii", value: "HI" },
  { label: "Idaho", value: "ID" },
  { label: "Illinois", value: "IL" },
  { label: "Indiana", value: "IN" },
  { label: "Iowa", value: "IA" },
  { label: "Kansas", value: "KS" },
  { label: "Kentucky", value: "KY" },
  { label: "Louisiana", value: "LA" },
  { label: "Maine", value: "ME" },
  { label: "Maryland", value: "MD" },
  { label: "Massachusetts", value: "MA" },
  { label: "Michigan", value: "MI" },
  { label: "Minnesota", value: "MN" },
  { label: "Mississippi", value: "MS" },
  { label: "Missouri", value: "MO" },
  { label: "Montana", value: "MT" },
  { label: "Nebraska", value: "NE" },
  { label: "Nevada", value: "NV" },
  { label: "New Hampshire", value: "NH" },
  { label: "New Jersey", value: "NJ" },
  { label: "New Mexico", value: "NM" },
  { label: "New York", value: "NY" },
  { label: "North Carolina", value: "NC" },
  { label: "North Dakota", value: "ND" },
  { label: "Ohio", value: "OH" },
  { label: "Oklahoma", value: "OK" },
  { label: "Oregon", value: "OR" },
  { label: "Pennsylvania", value: "PA" },
  { label: "Rhode Island", value: "RI" },
  { label: "South Carolina", value: "SC" },
  { label: "South Dakota", value: "SD" },
  { label: "Tennessee", value: "TN" },
  { label: "Texas", value: "TX" },
  { label: "Utah", value: "UT" },
  { label: "Vermont", value: "VT" },
  { label: "Virginia", value: "VA" },
  { label: "Washington", value: "WA" },
  { label: "Washington D.C.", value: "DC" },
  { label: "West Virginia", value: "WV" },
  { label: "Wisconsin", value: "WI" },
  { label: "Wyoming", value: "WY" },
];
