/**
 * POST /api/submit-medicaid-lead
 *
 * Forwards Medicaid screener lead data to the "Medicaid Screener Leads"
 * table in Airtable.
 *
 * Expected Airtable "Medicaid Screener Leads" table fields:
 *   First Name              (Single line text)
 *   Last Name               (Single line text)
 *   Email                   (Email)
 *   Phone                   (Phone number)
 *   Relationship            (Single line text)
 *   Age Range               (Single line text)
 *   State                   (Single line text)
 *   Marital Status          (Single line text)
 *   Income Range            (Single line text)
 *   Asset Range             (Single line text)
 *   ADL Needs               (Single line text)
 *   Eligibility Result      (Single line text)  — "likely" | "possibly" | "unlikely"
 *   Submitted At            (Single line text)
 *   Source Page             (Single line text)
 */

import { NextRequest, NextResponse } from "next/server";

interface MedicaidLeadPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  relationship: string;
  age: string;
  state: string;
  maritalStatus: string;
  income: string;
  assets: string;
  adlNeeds: string;
  eligibilityResult: string;
  submittedAt: string;
  sourcePage: string;
}

export async function POST(request: NextRequest) {
  const token = process.env.AIRTABLE_API_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;

  if (!token || !baseId) {
    console.error("Missing AIRTABLE_API_TOKEN or AIRTABLE_BASE_ID in .env.local");
    return NextResponse.json(
      { error: "Server configuration error. Please contact support." },
      { status: 500 }
    );
  }

  let body: MedicaidLeadPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

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

  const fields: Record<string, string> = {
    "First Name": firstName.trim(),
    "Last Name": lastName.trim(),
    "Email": email.trim(),
    "Phone": body.phone?.trim() ?? "",
    "Relationship": body.relationship ?? "",
    "Age Range": body.age ?? "",
    "State": body.state ?? "",
    "Marital Status": body.maritalStatus ?? "",
    "Income Range": body.income ?? "",
    "Asset Range": body.assets ?? "",
    "ADL Needs": body.adlNeeds ?? "",
    "Eligibility Result": body.eligibilityResult ?? "",
    "Submitted At": body.submittedAt ?? "",
    "Source Page": body.sourcePage ?? "",
  };

  let airtableResponse: Response;
  try {
    airtableResponse = await fetch(
      `https://api.airtable.com/v0/${baseId}/Medicaid%20Screener%20Leads`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ records: [{ fields }] }),
      }
    );
  } catch (err) {
    console.error("Airtable network error:", err);
    return NextResponse.json(
      { error: "Could not reach the database. Please try again." },
      { status: 500 }
    );
  }

  if (!airtableResponse.ok) {
    const errorBody = await airtableResponse.text();
    console.error(`Airtable error ${airtableResponse.status}:`, errorBody);
    return NextResponse.json(
      { error: "Could not save your information. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
