import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Always log to server output — this is the ad-blocker-proof source of truth
    console.log("[ASSESSMENT_ANALYTICS]", JSON.stringify(body));

    // Forward to GA4 Measurement Protocol if credentials are configured
    await forwardToGA4(body);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Analytics event error:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

async function forwardToGA4(eventData: Record<string, unknown>) {
  const measurementId = process.env.GA4_MEASUREMENT_ID;
  const apiSecret = process.env.GA4_API_SECRET;

  if (!measurementId || !apiSecret) return;

  try {
    const { event, session_id, timestamp, ...rest } = eventData;
    await fetch(
      `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
      {
        method: "POST",
        body: JSON.stringify({
          client_id: String(session_id || "anonymous"),
          timestamp_micros: timestamp
            ? new Date(String(timestamp)).getTime() * 1000
            : undefined,
          events: [
            {
              name: String(event),
              params: {
                ...rest,
                engagement_time_msec: 1,
                session_id: String(session_id || ""),
              },
            },
          ],
        }),
      }
    );
  } catch {
    // GA4 Measurement Protocol failures are non-fatal
  }
}
