'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const CARE_TYPE_OPTIONS = [
  { value: '', label: 'Any type of care' },
  { value: 'Nursing Home', label: 'Nursing Home' },
  { value: 'Assisted Living', label: 'Assisted Living' },
  { value: 'Memory Care', label: 'Memory Care' },
  { value: 'Home Health', label: 'Home Health' },
  { value: 'Hospice', label: 'Hospice Care' },
  { value: 'Adult Day Care', label: 'Adult Day Care' },
];

interface StateCityLeadFormProps {
  /** Full state name, e.g. "Texas" */
  state: string;
  /** URL slug, e.g. "texas" */
  stateSlug: string;
  /** City name if this is a city-level page; omit for state-level pages */
  city?: string;
  /** Override the default heading */
  heading?: string;
}

export function StateCityLeadForm({
  state,
  city,
  heading,
}: StateCityLeadFormProps) {
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    zipCode: '',
    typeOfCare: '',
    financialAssistance: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tool: 'state_city_page',
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          zipCode: form.zipCode,
          typeOfCare: form.typeOfCare,
          financialAssistance: form.financialAssistance,
          sourceUrl: window.location.href,
          state,
          city: city || '',
        }),
      });

      const result = await response.json();

      if (result.ok) {
        const params = new URLSearchParams({
          state,
          ...(form.typeOfCare ? { care: form.typeOfCare } : {}),
        });
        router.push(`/request/thank-you?${params.toString()}`);
      } else {
        setError(
          result.error ||
          'Something went wrong. Please try again, or email us at hello@ourturntocare.com.'
        );
      }
    } catch {
      setError('Something went wrong. Please try again, or email us at hello@ourturntocare.com.');
    } finally {
      setIsSubmitting(false);
    }
  }

  const defaultHeading = city
    ? `Get Personalized Help Finding Care in ${city}, ${state}`
    : `Get Personalized Help Finding Care in ${state}`;

  return (
    <div className="bg-teal-50 border border-teal-200 rounded-xl p-6 sm:p-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          {heading || defaultHeading}
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
            <label htmlFor="scf-firstName" className="block text-sm font-medium text-slate-700 mb-1">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              id="scf-firstName"
              name="firstName"
              type="text"
              required
              value={form.firstName}
              onChange={handleChange}
              className="w-full h-11 px-3 rounded-lg bg-white border border-gray-300 text-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
          <div>
            <label htmlFor="scf-lastName" className="block text-sm font-medium text-slate-700 mb-1">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              id="scf-lastName"
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
            <label htmlFor="scf-email" className="block text-sm font-medium text-slate-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="scf-email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full h-11 px-3 rounded-lg bg-white border border-gray-300 text-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
          <div>
            <label htmlFor="scf-phone" className="block text-sm font-medium text-slate-700 mb-1">
              Phone <span className="text-slate-400 font-normal">(optional)</span>
            </label>
            <input
              id="scf-phone"
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
            <label htmlFor="scf-zipCode" className="block text-sm font-medium text-slate-700 mb-1">
              Zip Code
            </label>
            <input
              id="scf-zipCode"
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
            <label htmlFor="scf-typeOfCare" className="block text-sm font-medium text-slate-700 mb-1">
              Type of Care
            </label>
            <select
              id="scf-typeOfCare"
              name="typeOfCare"
              value={form.typeOfCare}
              onChange={handleChange}
              className="w-full h-11 px-3 rounded-lg bg-white border border-gray-300 text-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
            >
              {CARE_TYPE_OPTIONS.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Financial assistance checkbox */}
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="financialAssistance"
            checked={form.financialAssistance}
            onChange={handleChange}
            className="mt-0.5 h-4 w-4 accent-teal-600 rounded"
          />
          <span className="text-sm text-slate-700">
            I&apos;d like help understanding financial assistance options (Medicaid, VA benefits, etc.)
          </span>
        </label>

        {/* Error message */}
        {error && (
          <p className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-3">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 text-white font-semibold rounded-lg transition-colors text-base"
        >
          {isSubmitting ? 'Sending…' : 'Get Matched with Care Options →'}
        </button>

        <p className="text-xs text-center text-slate-500">
          Your information is private and never shared without your permission.
        </p>
      </form>
    </div>
  );
}
