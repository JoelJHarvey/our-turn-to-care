'use client';

import React, { useState } from 'react';

const CARE_TYPES = [
  { value: '', label: 'Any type of care' },
  { value: 'nursing_home', label: 'Nursing Home' },
  { value: 'assisted_living', label: 'Assisted Living' },
  { value: 'memory_care', label: 'Memory Care' },
  { value: 'home_health', label: 'Home Health' },
  { value: 'hospice', label: 'Hospice Care' },
  { value: 'adult_day', label: 'Adult Day Care' },
];

export function TexasLeadCapture() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    zipCode: '',
    careType: '',
    wantsFinancialInfo: false,
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === 'submitting') return;
    setStatus('submitting');
    setErrorMessage('');

    try {
      const careTypeLabel =
        CARE_TYPES.find((t) => t.value === form.careType)?.label || 'Any';

      const res = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          zipCode: form.zipCode,
          wantsFinancialInfo: form.wantsFinancialInfo,
          // Required fields with defaults for this simplified form
          careRecipientName: null,
          relationship: '',
          ageRange: '',
          primaryRecommendation: careTypeLabel,
          secondaryRecommendation: '',
          totalScore: 0,
          memoryCareFlag: form.careType === 'memory_care',
          urgencyFlag: false,
          adlSelections: [],
          cognitiveSelections: [],
          safetySelections: [],
          livingSituation: '',
          veteranStatus: '',
          financialSituation: '',
          currentCoverage: [],
          budget: '',
          vaEligibleFlag: false,
          medicaidLikelyFlag: false,
          hasLtcInsurance: false,
          submittedAt: new Date().toISOString(),
          sourcePage: 'texas-state-page',
        }),
      });

      if (res.ok) {
        setStatus('success');
      } else {
        const data = await res.json();
        setErrorMessage(data.error || 'Something went wrong. Please try again.');
        setStatus('error');
      }
    } catch {
      setErrorMessage('Network error. Please check your connection and try again.');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-teal-50 border border-teal-200 rounded-xl p-8 text-center">
        <div className="text-4xl mb-3">✅</div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">
          Thank you! We&apos;ll be in touch.
        </h3>
        <p className="text-slate-600 text-sm max-w-md mx-auto">
          We&apos;ll send you personalized recommendations for senior care in your
          area, along with information about costs and financial assistance options.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-teal-50 border border-teal-200 rounded-xl p-6 sm:p-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Get Personalized Help Finding Care in Texas
        </h2>
        <p className="text-slate-600 text-sm max-w-lg mx-auto">
          Navigating senior care options can be overwhelming. Tell us a little about
          your situation and we&apos;ll help you find the right facilities, understand
          costs, and explore financial assistance options.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4">
        {/* Name row */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="lc-firstName" className="block text-sm font-medium text-slate-700 mb-1">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              id="lc-firstName"
              name="firstName"
              type="text"
              required
              value={form.firstName}
              onChange={handleChange}
              className="w-full h-11 px-3 rounded-lg bg-white border border-gray-300 text-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
          <div>
            <label htmlFor="lc-lastName" className="block text-sm font-medium text-slate-700 mb-1">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              id="lc-lastName"
              name="lastName"
              type="text"
              required
              value={form.lastName}
              onChange={handleChange}
              className="w-full h-11 px-3 rounded-lg bg-white border border-gray-300 text-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
        </div>

        {/* Email / Phone row */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="lc-email" className="block text-sm font-medium text-slate-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="lc-email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full h-11 px-3 rounded-lg bg-white border border-gray-300 text-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
          <div>
            <label htmlFor="lc-phone" className="block text-sm font-medium text-slate-700 mb-1">
              Phone <span className="text-slate-400 font-normal">(optional)</span>
            </label>
            <input
              id="lc-phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              className="w-full h-11 px-3 rounded-lg bg-white border border-gray-300 text-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
        </div>

        {/* Zip / Care Type row */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="lc-zipCode" className="block text-sm font-medium text-slate-700 mb-1">
              Zip Code
            </label>
            <input
              id="lc-zipCode"
              name="zipCode"
              type="text"
              inputMode="numeric"
              maxLength={5}
              value={form.zipCode}
              onChange={handleChange}
              className="w-full h-11 px-3 rounded-lg bg-white border border-gray-300 text-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
          <div>
            <label htmlFor="lc-careType" className="block text-sm font-medium text-slate-700 mb-1">
              Type of Care
            </label>
            <select
              id="lc-careType"
              name="careType"
              value={form.careType}
              onChange={handleChange}
              className="w-full h-11 px-3 rounded-lg bg-white border border-gray-300 text-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
            >
              {CARE_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Financial info checkbox */}
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="wantsFinancialInfo"
            checked={form.wantsFinancialInfo}
            onChange={handleChange}
            className="mt-0.5 h-4 w-4 accent-teal-600 rounded"
          />
          <span className="text-sm text-slate-700">
            I&apos;d like help understanding financial assistance options (Medicaid, VA benefits, etc.)
          </span>
        </label>

        {/* Error message */}
        {status === 'error' && (
          <p className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-3">
            {errorMessage}
          </p>
        )}

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full h-12 bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 text-white font-semibold rounded-lg transition-colors text-base"
        >
          {status === 'submitting' ? 'Sending…' : 'Get Matched with Care Options →'}
        </button>

        <p className="text-xs text-center text-slate-500">
          Your information is private and never shared without your permission.
        </p>
      </form>
    </div>
  );
}
