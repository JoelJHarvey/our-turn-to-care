/**
 * POST /api/submit-lead
 *
 * Server-side API route that forwards lead data to Airtable.
 * The Airtable API token lives in .env.local and never reaches the browser.
 *
 * ── SETUP REQUIRED ────────────────────────────────────────────────────────
 * 1. In the "OurTurnToCare" Airtable base, copy the base ID (starts with "app…").
 * 2. Add AIRTABLE_BASE_ID=<your-base-id> to .env.local.
 * 3. Create a table called "Leads" with the fields listed below.
 * ──────────────────────────────────────────────────────────────────────────
 *
 * Expected Airtable "Leads" table fields:
 *   First Name              (Single line text)
 *   Last Name               (Single line text)
 *   Email                   (Email)
 *   Phone Number            (Phone number)
 *   Care Recipient Name     (Single line text)
 *   Relationship            (Single line text)
 *   Age Range               (Single line text)
 *   Zip Code                (Single line text)
 *   Primary Recommendation  (Single line text)
 *   Secondary Recommendation(Single line text)
 *   Total Score             (Number)
 *   Memory Care Flag        (Checkbox)
 *   Urgency Flag            (Checkbox)
 *   ADL Selections          (Long text)
 *   Cognitive Selections    (Long text)
 *   Safety Selections       (Long text)
 *   Living Situation        (Single line text)
 *   Veteran Status          (Single line text)
 *   Financial Situation     (Single line text)
 *   Current Coverage        (Long text)
 *   Budget                  (Single line text)
 *   VA Eligible             (Checkbox)
 *   Medicaid Likely         (Checkbox)
 *   Has LTC Insurance       (Checkbox)
 *   Financial Assistance Requested (Checkbox)
 *   Submitted At            (Single line text)
 *   Source Page             (Single line text)
 */

import { NextRequest, NextResponse } from "next/server";

// Shape of the JSON body sent from the client
interface LeadPayload {
  // Contact info from the form
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  wantsFinancialInfo: boolean;

  // Personalisation / care recipient
  careRecipientName: string | null;
  relationship: string;
  ageRange: string;
  zipCode: string;

  // Scoring results
  primaryRecommendation: string;
  secondaryRecommendation: string;
  totalScore: number;
  memoryCareFlag: boolean;
  urgencyFlag: boolean;

  // Raw selections (arrays — joined to CSV before sending to Airtable)
  adlSelections: string[];
  cognitiveSelections: string[];
  safetySelections: string[];

  // More raw inputs
  livingSituation: string;
  veteranStatus: string;
  financialSituation: string;
  currentCoverage: string[];
  budget: string;

  // Financial flags
  vaEligibleFlag: boolean;
  medicaidLikelyFlag: boolean;
  hasLtcInsurance: boolean;

  // Meta
  submittedAt: string;
  sourcePage: string;
}

export async function POST(request: NextRequest) {
  // ── Environment variable guard ───────────────────────────────────────────
  const token = process.env.AIRTABLE_API_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;

  if (!token || !baseId) {
    console.error(
      "Missing AIRTABLE_API_TOKEN or AIRTABLE_BASE_ID in .env.local"
    );
    return NextResponse.json(
      { error: "Server configuration error. Please contact support." },
      { status: 500 }
    );
  }

  // ── Parse body ───────────────────────────────────────────────────────────
  let body: LeadPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // ── Validate required fields ─────────────────────────────────────────────
  const { firstName, lastName, email } = body;
  const missing: string[] = [];
  if (!firstName?.trim()) missing.push("First name");
  if (!lastName?.trim()) missing.push("Last name");
  if (!email?.trim()) missing.push("Email");

  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Missing required fields: ${missing.join(", ")}.` },
      { status: 400 }
    );
  }

  // ── Build Airtable record ────────────────────────────────────────────────
  // Array fields are joined into comma-separated strings because Airtable
  // "Long text" fields don't accept arrays.
  const fields: Record<string, string | number | boolean> = {
    "First Name": firstName.trim(),
    "Last Name": lastName.trim(),
    "Email": email.trim(),
    "Phone Number": body.phone?.trim() ?? "",
    "Care Recipient Name": body.careRecipientName ?? "",
    "Relationship": body.relationship,
    "Age Range": body.ageRange,
    "Zip Code": body.zipCode,
    "Primary Recommendation": body.primaryRecommendation,
    "Secondary Recommendation": body.secondaryRecommendation,
    "Total Score": body.totalScore,
    "Memory Care Flag": body.memoryCareFlag,
    "Urgency Flag": body.urgencyFlag,
    "ADL Selections": body.adlSelections?.join(", ") ?? "",
    "Cognitive Selections": body.cognitiveSelections?.join(", ") ?? "",
    "Safety Selections": body.safetySelections?.join(", ") ?? "",
    "Living Situation": body.livingSituation,
    "Veteran Status": body.veteranStatus,
    "Financial Situation": body.financialSituation,
    "Current Coverage": body.currentCoverage?.join(", ") ?? "",
    "Budget": body.budget,
    "VA Eligible": body.vaEligibleFlag,
    "Medicaid Likely": body.medicaidLikelyFlag,
    "Has LTC Insurance": body.hasLtcInsurance,
    "Financial Assistance Requested": body.wantsFinancialInfo,
    "Submitted At": body.submittedAt,
    "Source Page": body.sourcePage,
  };

  // ── Call Airtable API ────────────────────────────────────────────────────
  let airtableResponse: Response;
  try {
    airtableResponse = await fetch(
      `https://api.airtable.com/v0/${baseId}/Leads`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ records: [{ fields }], typecast: true }),
      }
    );
  } catch (err) {
    // Network-level failure (DNS, timeout, etc.)
    console.error("[submit-lead] Airtable network error:", err);
    return NextResponse.json(
      { ok: false, error: "network_error", detail: String(err) },
      { status: 500 }
    );
  }

  // ── Handle Airtable errors ───────────────────────────────────────────────
  if (!airtableResponse.ok) {
    const errorBody = await airtableResponse.text();
    console.error("[submit-lead] Airtable rejected request", {
      status: airtableResponse.status,
      statusText: airtableResponse.statusText,
      body: errorBody,
    });
    return NextResponse.json(
      {
        ok: false,
        error: "airtable_rejected",
        detail: errorBody,
        status: airtableResponse.status,
      },
      { status: 502 }
    );
  }

  // ── Success ──────────────────────────────────────────────────────────────
  const created = await airtableResponse.json() as { records?: Array<{ id: string }> };
  const leadId = created.records?.[0]?.id ?? null;
  console.log("[submit-lead] Lead saved successfully", { leadId, email: body.email });
  return NextResponse.json({ ok: true, lead_id: leadId }, { status: 200 });
}
