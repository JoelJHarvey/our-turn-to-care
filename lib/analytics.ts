/**
 * analytics.ts — Care Assessment Analytics Utility
 *
 * Layer 1: GA4 page_view events are captured automatically via pushState URLs (see AssessmentFlow).
 * Layer 2: Enriched custom events via gtag + dataLayer (this file).
 * Layer 3: Server-side events for ad-blocker resilience (trackServerEvent below).
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: Record<string, unknown>[];
  }
}

export function trackAssessmentEvent(
  eventName: string,
  params: Record<string, unknown> = {}
) {
  if (typeof window === "undefined") return;

  // GA4 via gtag
  if (window.gtag) {
    window.gtag("event", eventName, params);
  }

  // GTM dataLayer
  if (window.dataLayer) {
    window.dataLayer.push({ event: eventName, ...params });
  }
}

// ── Session ID ─────────────────────────────────────────────────────────────

function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return "";
  try {
    let id = sessionStorage.getItem("ottc_session_id");
    if (!id) {
      id = crypto.randomUUID();
      sessionStorage.setItem("ottc_session_id", id);
    }
    return id;
  } catch {
    return "";
  }
}

// ── Server-side event (Layer 3) ────────────────────────────────────────────

export async function trackServerEvent(
  eventName: string,
  params: Record<string, unknown> = {}
) {
  if (typeof window === "undefined") return;

  try {
    await fetch("/api/analytics/assessment-event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: eventName,
        timestamp: new Date().toISOString(),
        session_id: getOrCreateSessionId(),
        referrer: document.referrer || "direct",
        ...params,
      }),
      // keepalive ensures the request completes even if the user navigates away
      keepalive: true,
    });
  } catch {
    // Silent fail — analytics must never break the UX
  }
}
