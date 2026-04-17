/**
 * POST /api/submit-lead
 *
 * Server-side API route that forwards lead data to Airtable.
 * The Airtable API token lives in .env.local and never reaches the browser.
 *
 * Branches on the `tool` field in the request body:
 *   - "state_city_page"  → "State City Page Leads" table
 *   - (default / omitted) → "Leads" table (Care Assessment, Cost Calculator, etc.)
 *
 * ── SETUP REQUIRED ────────────────────────────────────────────────────────
 * 1. In the "OurTurnToCare" Airtable base, copy the base ID (starts with "app…").
 * 2. Add AIRTABLE_BASE_ID=<your-base-id> to .env.local.
 * 3. "State City Page Leads" table columns: First Name, Last Name, Email,
 *    Phone Number, Zip Code, Type of Care, Financial Assistance Requested,
 *    Source URL, State, City, Submitted At
 * ──────────────────────────────────────────────────────────────────────────
 */

import { NextRequest, NextResponse } from "next/server";

// ── Shape of the JSON body sent from the client ───────────────────────────

interface CareAssessmentPayload {
  tool?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  wantsFinancialInfo: boolean;
  careRecipientName: string | null;
  relationship: string;
  ageRange: string;
  zipCode: string;
  primaryRecommendation: string;
  secondaryRecommendation: string;
  totalScore: number;
  memoryCareFlag: boolean;
  urgencyFlag: boolean;
  adlSelections: string[];
  cognitiveSelections: string[];
  safetySelections: string[];
  livingSituation: string;
  veteranStatus: string;
  financialSituation: string;
  currentCoverage: string[];
  budget: string;
  vaEligibleFlag: boolean;
  medicaidLikelyFlag: boolean;
  hasLtcInsurance: boolean;
  submittedAt: string;
  sourcePage: string;
}

interface StateCityPagePayload {
  tool: "state_city_page";
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  zipCode?: string;
  typeOfCare?: string;
  financialAssistance?: boolean;
  sourceUrl?: string;
  state?: string;
  city?: string;
}

type LeadPayload = CareAssessmentPayload | StateCityPagePayload;

// ── Helpers ───────────────────────────────────────────────────────────────

function isStateCityPayload(body: LeadPayload): body is StateCityPagePayload {
  return (body as StateCityPagePayload).tool === "state_city_page";
}

// ── Handler ───────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  const token = process.env.AIRTABLE_API_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;

  if (!token || !baseId) {
    console.error("Missing AIRTABLE_API_TOKEN or AIRTABLE_BASE_ID in .env.local");
    return NextResponse.json(
      { ok: false, error: "Server configuration error. Please contact support." },
      { status: 500 }
    );
  }

  let body: LeadPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  // ── Validate shared required fields ──────────────────────────────────────
  const missing: string[] = [];
  if (!body.firstName?.trim()) missing.push("First name");
  if (!body.lastName?.trim()) missing.push("Last name");
  if (!body.email?.trim()) missing.push("Email");

  if (missing.length > 0) {
    return NextResponse.json(
      { ok: false, error: `Missing required fields: ${missing.join(", ")}.` },
      { status: 400 }
    );
  }

  // ── Branch: State / City page leads ──────────────────────────────────────
  if (isStateCityPayload(body)) {
    const airtableBody = {
      records: [{
        fields: {
          "First Name": body.firstName.trim(),
          "Last Name": body.lastName.trim(),
          "Email": body.email.trim(),
          "Phone Number": body.phone?.trim() || "",
          "Zip Code": body.zipCode || "",
          "Type of Care": body.typeOfCare || "",
          "Financial Assistance Requested": body.financialAssistance || false,
          "Source URL": body.sourceUrl || "",
          "State": body.state || "",
          "City": body.city || "",
          "Submitted At": new Date().toISOString(),
        },
      }],
      typecast: true,
    };

    return submitToAirtable(token, baseId, "State City Page Leads", airtableBody, body.email);
  }

  // ── Branch: Care Assessment / other tools (existing behaviour) ────────────
  const careBody = body as CareAssessmentPayload;

  const fields: Record<string, string | number | boolean> = {
    "First Name": careBody.firstName.trim(),
    "Last Name": careBody.lastName.trim(),
    "Email": careBody.email.trim(),
    "Phone Number": careBody.phone?.trim() ?? "",
    "Care Recipient Name": careBody.careRecipientName ?? "",
    "Relationship": careBody.relationship,
    "Age Range": careBody.ageRange,
    "Zip Code": careBody.zipCode,
    "Primary Recommendation": careBody.primaryRecommendation,
    "Secondary Recommendation": careBody.secondaryRecommendation,
    "Total Score": careBody.totalScore,
    "Memory Care Flag": careBody.memoryCareFlag,
    "Urgency Flag": careBody.urgencyFlag,
    "ADL Selections": careBody.adlSelections?.join(", ") ?? "",
    "Cognitive Selections": careBody.cognitiveSelections?.join(", ") ?? "",
    "Safety Selections": careBody.safetySelections?.join(", ") ?? "",
    "Living Situation": careBody.livingSituation,
    "Veteran Status": careBody.veteranStatus,
    "Financial Situation": careBody.financialSituation,
    "Current Coverage": careBody.currentCoverage?.join(", ") ?? "",
    "Budget": careBody.budget,
    "VA Eligible": careBody.vaEligibleFlag,
    "Medicaid Likely": careBody.medicaidLikelyFlag,
    "Has LTC Insurance": careBody.hasLtcInsurance,
    "Financial Assistance Requested": careBody.wantsFinancialInfo,
    "Submitted At": careBody.submittedAt,
    "Source Page": careBody.sourcePage,
  };

  return submitToAirtable(token, baseId, "Leads", { records: [{ fields }], typecast: true }, careBody.email);
}

// ── Shared Airtable submission helper ────────────────────────────────────

async function submitToAirtable(
  token: string,
  baseId: string,
  tableName: string,
  airtableBody: object,
  email: string
): Promise<NextResponse> {
  let airtableResponse: Response;

  try {
    airtableResponse = await fetch(
      `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(airtableBody),
      }
    );
  } catch (err) {
    console.error(`[submit-lead] Airtable network error (table: ${tableName}):`, err);
    return NextResponse.json(
      { ok: false, error: "network_error", detail: String(err) },
      { status: 500 }
    );
  }

  if (!airtableResponse.ok) {
    const errorBody = await airtableResponse.text();
    console.error(`[submit-lead] Airtable rejected request (table: ${tableName})`, {
      status: airtableResponse.status,
      statusText: airtableResponse.statusText,
      body: errorBody,
    });
    return NextResponse.json(
      {
        ok: false,
        error: "Something went wrong saving your information. Please try again.",
        status: airtableResponse.status,
      },
      { status: 502 }
    );
  }

  const created = await airtableResponse.json() as { records?: Array<{ id: string }> };
  const leadId = created.records?.[0]?.id ?? null;
  console.log(`[submit-lead] Lead saved to "${tableName}"`, { leadId, email });
  return NextResponse.json({ ok: true, lead_id: leadId }, { status: 200 });
}
