/**
 * results.ts — Display data and helper functions for the Results Page
 *
 * This file contains:
 *   1. Human-readable labels and descriptions for every recommendation level
 *   2. Placeholder cost data (to be replaced with real Genworth data)
 *   3. generateWhyText() — builds personalized explanation paragraphs
 */

import { AssessmentResults } from "./scoring";

// ─────────────────────────────────────────────────────────────────────────────
// RECOMMENDATION DISPLAY DATA
// ─────────────────────────────────────────────────────────────────────────────

export const RECOMMENDATION_LABELS: Record<string, string> = {
  memory_care: "Memory Care",
  nursing_home: "Nursing Home / Skilled Nursing",
  assisted_living: "Assisted Living",
  home_care: "Home Care",
  aging_in_place: "Aging in Place with Modifications",
  independent: "Independent Living — Plan Ahead",
};

export const RECOMMENDATION_DESCRIPTIONS: Record<string, string> = {
  memory_care:
    "Memory care provides 24-hour supervised care specifically designed for people living with Alzheimer's disease or other forms of dementia. It includes specialized activities, safety features, and trained staff who understand the unique needs of memory loss.",
  nursing_home:
    "Skilled nursing facilities provide 24-hour medical care and assistance with daily activities. They're equipped for complex medical needs and offer rehabilitation services.",
  assisted_living:
    "Assisted living communities provide daily support with activities like bathing, dressing, and medication management while allowing residents to maintain their independence in a community setting.",
  home_care:
    "Home care brings professional caregivers into the home to help with daily activities, medication management, and companionship. It allows your loved one to stay in a familiar environment.",
  aging_in_place:
    "With some home modifications and safety measures, your loved one can continue living at home comfortably. Now is a great time to plan ahead and put support systems in place.",
  independent:
    "Great news — your loved one appears to be managing well independently. It's smart that you're thinking ahead. Here are some steps to prepare for the future.",
};

// Short descriptions used in the Secondary Recommendation section
export const SECONDARY_DESCRIPTIONS: Record<string, string> = {
  home_care_memory:
    "Home Care with Memory Support — If you'd prefer to explore keeping {person} at home, specialized home care aides trained in dementia care can provide support in a familiar environment.",
  assisted_living:
    "Assisted Living — A community setting that provides daily support while allowing more independence.",
  home_care:
    "Home Care — Professional caregivers who come to the home for daily assistance.",
  aging_in_place:
    "Aging in Place — Home modifications and support services that allow {person} to stay at home.",
  memory_care:
    "Memory Care — Specialized 24-hour care for cognitive decline, if needs increase.",
  nursing_home:
    "Skilled Nursing — 24-hour medical care if needs progress.",
};

// ─────────────────────────────────────────────────────────────────────────────
// COST DATA
// Placeholder ranges — will be replaced with real Genworth survey data.
// null means "don't show a cost section" (used for the independent level).
// ─────────────────────────────────────────────────────────────────────────────

export interface CostData {
  low: number;
  median: number;
  high: number;
  note?: string; // Optional qualifier shown below the numbers
}

export const COST_DATA: Record<string, CostData | null> = {
  memory_care: { low: 4500, median: 6500, high: 8500 },
  nursing_home: { low: 7000, median: 9000, high: 12000 },
  assisted_living: { low: 3500, median: 4500, high: 6500 },
  home_care: {
    low: 2500,
    median: 3500,
    high: 5000,
    note: "Cost varies by hours of care needed per week",
  },
  aging_in_place: {
    low: 500,
    median: 1500,
    high: 3000,
    note: "Depends on home modifications and services needed",
  },
  independent: null, // No cost section — show a different message instead
};

// ─────────────────────────────────────────────────────────────────────────────
// INTERNAL HELPERS
// ─────────────────────────────────────────────────────────────────────────────

// Maps stored ADL answer values to natural English phrases
const ADL_LABELS: Record<string, string> = {
  bathing: "bathing",
  dressing: "getting dressed",
  bathroom: "using the bathroom",
  eating: "eating or preparing meals",
  mobility: "moving around the house",
  medications: "managing medications",
};

// Maps stored cognitive answer values to natural English phrases
const COGNITIVE_LABELS: Record<string, string> = {
  forgetting: "forgetting recent conversations",
  confusion: "getting confused about time or place",
  finances: "difficulty managing money",
  repeating: "frequently repeating themselves",
  lost: "getting lost in familiar places",
  personality: "personality changes",
  recognition: "difficulty recognizing family members",
  wandering: "wandering",
};

// Maps stored safety answer values to natural English phrases
const SAFETY_LABELS: Record<string, string> = {
  fall: "a fall or injury at home",
  er_visit: "an emergency room visit",
  fire_risk: "leaving the stove on",
  med_error: "missed or incorrect medications",
  weight_loss: "unexplained weight loss",
  hygiene: "decline in personal hygiene",
  hoarding: "hoarding or home neglect",
};

/**
 * Formats an array of answer values into a natural English list.
 * e.g. ["bathing", "dressing", "medications"] → "bathing, getting dressed, and managing medications"
 */
function formatList(values: string[], labels: Record<string, string>): string {
  const named = values.map((v) => labels[v] ?? v).filter(Boolean);
  if (named.length === 0) return "";
  if (named.length === 1) return named[0];
  if (named.length === 2) return `${named[0]} and ${named[1]}`;
  const last = named[named.length - 1];
  const rest = named.slice(0, -1);
  return `${rest.join(", ")}, and ${last}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// generateWhyText()
//
// Builds an array of explanation paragraphs connecting the user's specific
// answers to the recommendation. Returns them in priority order — the results
// page shows the first 3.
// ─────────────────────────────────────────────────────────────────────────────

export function generateWhyText(results: AssessmentResults): string[] {
  const reasons: string[] = [];

  const name = results.careRecipientName ?? results.personLabel;
  const { possessive, primaryRecommendation } = results;
  const recLabel =
    RECOMMENDATION_LABELS[primaryRecommendation] ?? primaryRecommendation;

  // ── Highest priority: specific high-severity cognitive symptoms ───────────
  // These are surfaced first because they are the most actionable and urgent.

  if (results.cognitiveSelections.includes("wandering")) {
    reasons.push(
      `Wandering is a serious safety concern. Memory care communities are specifically designed with secure environments to keep residents safe.`
    );
  }

  if (results.cognitiveSelections.includes("recognition")) {
    reasons.push(
      `The difficulty recognizing close family members suggests a stage of cognitive decline where specialized care staff can provide the most appropriate support.`
    );
  }

  // ── General cognitive concerns (when memory care flag is set) ─────────────

  if (results.memoryCareFlag && results.cognitiveSelections.length > 0) {
    // Exclude wandering and recognition — they already have their own entries above
    const otherCognitive = results.cognitiveSelections.filter(
      (v) => v !== "wandering" && v !== "recognition"
    );
    if (otherCognitive.length > 0) {
      const listed = formatList(otherCognitive.slice(0, 3), COGNITIVE_LABELS);
      reasons.push(
        `You described changes like ${listed}. These are signs of cognitive changes that memory care is specifically designed to support.`
      );
    }
  }

  // ── ADL (daily activities) needs ──────────────────────────────────────────

  if (results.adlSelections.length > 0) {
    const listed = formatList(results.adlSelections, ADL_LABELS);
    // Tailor the follow-up sentence based on whether this is a facility or home-based recommendation
    const tailoring = ["memory_care", "nursing_home", "assisted_living"].includes(
      primaryRecommendation
    )
      ? `This level of daily support is what ${recLabel} is designed to provide.`
      : `A home care aide can help with these specific needs.`;
    reasons.push(
      `You mentioned that ${name} needs help with ${listed}. ${tailoring}`
    );
  }

  // ── Safety concerns ───────────────────────────────────────────────────────

  if (results.safetySelections.length > 0) {
    const listed = formatList(results.safetySelections, SAFETY_LABELS);
    reasons.push(
      `The safety concerns you mentioned — including ${listed} — suggest that ${name}'s current situation involves some risk that ${recLabel} can help address.`
    );
  }

  // ── Urgency: living alone with safety or memory concerns ──────────────────

  if (results.urgencyFlag) {
    reasons.push(
      `Because ${name} is currently living alone with these concerns, addressing this sooner rather than later is important for ${possessive} safety.`
    );
  } else if (
    results.livingAlone &&
    ["home_care", "assisted_living", "nursing_home", "memory_care"].includes(
      primaryRecommendation
    )
  ) {
    reasons.push(
      `Since ${name} is living alone, having regular care support can provide both practical help and peace of mind for your family.`
    );
  }

  return reasons;
}
