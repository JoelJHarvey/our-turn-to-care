/**
 * POST /api/submit-cost-lead
 *
 * Forwards Cost Calculator lead data to the "Cost Calculator Leads"
 * table in Airtable.
 *
 * Expected Airtable "Cost Calculator Leads" table fields:
 *   First Name                    (Single line text)
 *   Last Name                     (Single line text)
 *   Email                         (Email)
 *   Phone Number                  (Phone number)
 *   Zip Code                      (Single line text)
 *   Financial Planning Interest   (Checkbox)
 *   Submitted At                  (Single line text)
 *   Source Page                   (Single line text)
 */

import { NextRequest, NextResponse } from "next/server";

interface CostLeadPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  zipCode: string;
  checkbox: boolean;
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

  let body: CostLeadPayload;
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

  const fields: Record<string, string | boolean> = {
    "First Name": firstName.trim(),
    "Last Name": lastName.trim(),
    "Email": email.trim(),
    "Phone Number": body.phone?.trim() ?? "",
    "Zip Code": body.zipCode ?? "",
    "Financial Planning Interest": body.checkbox ?? false,
    "Submitted At": body.submittedAt ?? "",
    "Source Page": body.sourcePage ?? "",
  };

  let airtableResponse: Response;
  try {
    airtableResponse = await fetch(
      `https://api.airtable.com/v0/${baseId}/Cost%20Calculator%20Leads`,
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
    console.error("Airtable network error:", err);
    return NextResponse.json(
      { error: "Could not reach the database. Please try again." },
      { status: 500 }
    );
  }

  if (!airtableResponse.ok) {
    const errorBody = await airtableResponse.text();
    console.error("[submit-cost-lead] Airtable rejected request", {
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

  const created = await airtableResponse.json() as { records?: Array<{ id: string }> };
  const leadId = created.records?.[0]?.id ?? null;
  console.log("[submit-cost-lead] Lead saved successfully", { leadId, email: body.email });
  return NextResponse.json({ ok: true, lead_id: leadId }, { status: 200 });
}
