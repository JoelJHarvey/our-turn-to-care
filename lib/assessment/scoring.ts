/**
 * scoring.ts — The Care Assessment Scoring Engine
 *
 * This file does one job: takes all the answers from the 12-screen assessment
 * and produces a structured results object that the results page can display.
 *
 * It is a "pure function" — it only reads its inputs and returns outputs.
 * It has no side effects and doesn't touch the screen or the database.
 *
 * How to read this file:
 *   1. AssessmentInput  — the shape of data coming IN (one field per question)
 *   2. AssessmentResults — the shape of data going OUT (scores, flags, recommendations)
 *   3. buildInput()     — converts the raw answer storage into a clean input object
 *   4. calculateResults() — the actual scoring logic, step by step
 */

import { AssessmentAnswers } from "./types";

// ─────────────────────────────────────────────────────────────────────────────
// INPUT TYPE
// One field for each assessment question, with clean types (no raw arrays for
// single-select questions). buildInput() does this conversion for you.
// ─────────────────────────────────────────────────────────────────────────────

export interface AssessmentInput {
  relationship: string;       // "mother", "father", "spouse", "family", "self", "other"
  ageRange: string;           // "under_65", "65_74", "75_84", "85_plus"
  adlSelections: string[];    // ADL items selected, e.g. ["bathing", "dressing"]
  cognitiveSelections: string[]; // Cognitive items selected
  safetySelections: string[]; // Safety event items selected
  livingSituation: string;    // "alone", "with_spouse", "with_family", etc.
  zipCode: string;            // 5-digit zip, e.g. "94102"
  veteranStatus: string;      // "veteran", "spouse", "no", "not_sure"
  financialSituation: string; // "social_security", "modest_savings", etc., or "skip"
  currentCoverage: string[];  // e.g. ["medicare", "private_insurance"]
  budget: string;             // "under_2k", "2k_4k", etc., or "skip"
  careRecipientName: string | null; // Entered first name, or null if skipped
  personLabel: string;        // "your mother", "your father", "yourself", etc.
  personPossessive: string;   // "your mother's", "your father's", "your" (for "myself")
  pronoun: string;            // "she", "he", "they"
  possessive: string;         // "her", "his", "their"
}

// ─────────────────────────────────────────────────────────────────────────────
// OUTPUT TYPE
// Everything the results page needs: scores, care recommendations, financial
// flags, and pass-through data for personalizing the display.
// ─────────────────────────────────────────────────────────────────────────────

export interface AssessmentResults {
  // ── Individual scores (useful for showing "why this recommendation") ──────
  ageScore: number;
  adlScore: number;
  cognitiveScore: number;  // Includes the high-severity bonus
  safetyScore: number;     // Includes the fall bonus
  livingScore: number;
  urgencyBonus: number;    // Extra points if living alone + memory/safety concern
  totalScore: number;

  // ── Care recommendation ───────────────────────────────────────────────────
  primaryRecommendation: string;   // e.g. "memory_care", "home_care", "assisted_living"
  secondaryRecommendation: string; // A lighter or heavier alternative

  // ── Clinical flags ────────────────────────────────────────────────────────
  memoryCareFlag: boolean; // True when cognitive score indicates memory care need
  urgencyFlag: boolean;    // True when living alone + memory/safety concern

  // ── Financial eligibility flags ───────────────────────────────────────────
  vaEligibleFlag: boolean;      // Confirmed veteran or veteran's spouse
  vaPossibleFlag: boolean;      // Veteran status is uncertain ("not_sure")
  medicaidLikelyFlag: boolean;  // Lives primarily on Social Security/small pension
  medicaidPossibleFlag: boolean;// Modest savings — may qualify depending on state
  medicaidUnknownFlag: boolean; // Financial situation skipped or unknown
  hasMedicaid: boolean;         // Already enrolled in Medicaid
  hasVA: boolean;               // Already has VA health benefits
  hasLtcInsurance: boolean;     // Has long-term care insurance
  coverageUnknown: boolean;     // Coverage situation is unknown

  // ── Pass-through data for personalizing the results page ─────────────────
  personLabel: string;      // "your mother", "your father", etc.
  personPossessive: string; // "your mother's", "your" (for "myself" edge case)
  pronoun: string;          // "she", "he", "they"
  possessive: string;       // "her", "his", "their"
  careRecipientName: string | null; // First name if entered, null if skipped
  veteranStatus: string;    // Raw veteran status — needed for VA card copy
  zipCode: string;
  budget: string;
  livingAlone: boolean;     // Shortcut so the results page doesn't re-derive this

  // ── Raw selections (needed for "Why this recommendation" explanations) ────
  adlSelections: string[];
  cognitiveSelections: string[];
  safetySelections: string[];

  // ── Raw input values (passed through for lead capture / analytics) ────────
  relationship: string;        // "mother", "father", "spouse", "self", "other"
  ageRange: string;            // "under_65", "65_74", "75_84", "85_plus"
  livingSituation: string;     // "alone", "with_spouse", "with_family", etc.
  financialSituation: string;  // "social_security", "modest_savings", etc.
  currentCoverage: string[];   // e.g. ["medicare", "private_insurance"]
}

// ─────────────────────────────────────────────────────────────────────────────
// buildInput()
//
// Converts the raw answer storage (AssessmentAnswers) into the clean
// AssessmentInput shape. Call this in AssessmentFlow before calling
// calculateResults().
//
// Why a separate function? So calculateResults() stays pure and readable —
// it works with clean strings and arrays, not raw answer objects.
// ─────────────────────────────────────────────────────────────────────────────

export function buildInput(
  answers: AssessmentAnswers,
  personLabel: string,
  pronoun: string,
  possessive: string,
  personPossessive: string
): AssessmentInput {
  // Helper: get the first selected value for a single-select question
  const single = (key: string): string => answers[key]?.[0] ?? "";

  // Helper: get all selected values for a multi-select question,
  // filtering out the "none" sentinel value (it means nothing was selected)
  const multi = (key: string): string[] =>
    (answers[key] ?? []).filter((v) => v !== "none");

  // The name question stores "skip" when the user tapped Skip —
  // convert that to null so the results page knows to use personLabel instead
  const rawName = single("care_recipient_name");
  const careRecipientName =
    rawName && rawName !== "skip" ? rawName : null;

  return {
    relationship: single("relationship"),
    ageRange: single("age"),
    adlSelections: multi("adls"),
    cognitiveSelections: multi("cognitive"),
    safetySelections: multi("safety"),
    livingSituation: single("living_situation"),
    zipCode: single("zip"),
    veteranStatus: single("veteran_status"),
    financialSituation: single("financial_situation"),
    pronoun,
    possessive,
    personPossessive,
    personLabel,
    // Coverage can include "not_sure" and "none" — don't filter those out
    // because they're used for the coverageUnknown flag
    currentCoverage: answers["current_coverage"] ?? [],
    budget: single("budget"),
    careRecipientName,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// calculateResults()
//
// The main scoring function. Takes a clean AssessmentInput and returns a
// complete AssessmentResults object. Every step is commented.
//
// The logic flows in this order:
//   1. Age score
//   2. ADL (daily activities) score
//   3. Cognitive score + memory care flag
//   4. Safety score
//   5. Living situation score
//   6. Urgency bonus
//   7. Total score → primary recommendation
//   8. Secondary recommendation
//   9. Financial flags
// ─────────────────────────────────────────────────────────────────────────────

export function calculateResults(input: AssessmentInput): AssessmentResults {
  const {
    relationship,
    ageRange,
    adlSelections,
    cognitiveSelections,
    safetySelections,
    livingSituation,
    veteranStatus,
    financialSituation,
    currentCoverage,
    personLabel,
    personPossessive,
    pronoun,
    possessive,
    careRecipientName,
    zipCode,
    budget,
  } = input;

  // ── 1. AGE SCORE ───────────────────────────────────────────────────────────
  // Older individuals generally have higher care needs. Each age bracket adds
  // to the total score.

  const AGE_SCORES: Record<string, number> = {
    under_65: 0,
    "65_74": 1,
    "75_84": 2,
    "85_plus": 3,
  };
  const ageScore = AGE_SCORES[ageRange] ?? 0;

  // ── 2. ADL SCORE ───────────────────────────────────────────────────────────
  // ADLs = Activities of Daily Living. Needing help with more of them signals
  // a higher level of care is needed.
  // The "none" value is already filtered out by buildInput(), so we count the
  // actual number of needs selected.

  const adlCount = adlSelections.length;
  let adlScore: number;
  if (adlCount === 0) adlScore = 0;
  else if (adlCount <= 2) adlScore = 3;
  else if (adlCount <= 4) adlScore = 6;
  else adlScore = 9; // 5–6 items selected

  // ── 3. COGNITIVE SCORE + MEMORY CARE FLAG ──────────────────────────────────
  // More cognitive concerns = higher score. Two high-severity symptoms
  // (wandering, not recognizing family) add a bonus on top, because they
  // indicate a more urgent memory care need regardless of total count.

  const cognitiveCount = cognitiveSelections.length;
  let cognitiveScore: number;
  if (cognitiveCount === 0) cognitiveScore = 0;
  else if (cognitiveCount <= 2) cognitiveScore = 2;
  else if (cognitiveCount <= 4) cognitiveScore = 5;
  else cognitiveScore = 8; // 5+ items selected

  // High-severity symptom bonus — these two indicate significant risk
  // even in isolation, so they get an extra +3
  const hasHighSeverityCognitive =
    cognitiveSelections.includes("wandering") ||
    cognitiveSelections.includes("recognition"); // "recognition" = not recognizing family
  if (hasHighSeverityCognitive) {
    cognitiveScore += 3;
  }

  // Memory care flag — triggers when cognitive score (including bonus) is high
  const memoryCareFlag = cognitiveScore >= 5;

  // ── 4. SAFETY SCORE ────────────────────────────────────────────────────────
  // Recent safety events (falls, ER visits, etc.) signal higher risk.
  // A fall is given extra weight because it's a leading cause of serious
  // injury in older adults and often precedes a rapid decline.

  const safetyCount = safetySelections.length;
  let safetyScore: number;
  if (safetyCount === 0) safetyScore = 0;
  else if (safetyCount <= 2) safetyScore = 3;
  else safetyScore = 6; // 3+ items selected

  // Fall bonus — adds urgency for one of the most dangerous safety events
  if (safetySelections.includes("fall")) {
    safetyScore += 2;
  }

  // ── 5. LIVING SITUATION SCORE ──────────────────────────────────────────────
  // Living alone with cognitive or safety concerns is the highest-risk
  // situation because there's no one nearby to help in an emergency.

  const LIVING_SCORES: Record<string, number> = {
    alone: 3,
    with_spouse: 2,
    with_family: 0,
    independent_living: 1,
    assisted_living: 0, // Already in care — needs a higher level, not more urgency
    other: 1,
  };
  const livingScore = LIVING_SCORES[livingSituation] ?? 1;

  // ── 6. URGENCY BONUS ───────────────────────────────────────────────────────
  // Living alone is manageable in many situations, but when combined with
  // memory concerns OR recent safety incidents, it becomes a high-priority
  // situation that needs immediate attention.

  const livingAlone = livingSituation === "alone";
  const urgencyFlag = livingAlone && (memoryCareFlag || safetyScore >= 3);
  const urgencyBonus = urgencyFlag ? 3 : 0;

  // ── 7. TOTAL SCORE → PRIMARY RECOMMENDATION ────────────────────────────────
  // All the individual scores add up to a single number. The thresholds below
  // were calibrated so that common care situations land in the right bucket.
  // Memory care is always evaluated first because it requires a specialized
  // environment regardless of the total score.

  const totalScore =
    ageScore + adlScore + cognitiveScore + safetyScore + livingScore + urgencyBonus;

  let primaryRecommendation: string;
  if (memoryCareFlag) {
    primaryRecommendation = "memory_care";
  } else if (totalScore >= 18) {
    primaryRecommendation = "nursing_home";
  } else if (totalScore >= 12) {
    primaryRecommendation = "assisted_living";
  } else if (totalScore >= 6) {
    primaryRecommendation = "home_care";
  } else if (totalScore >= 3) {
    primaryRecommendation = "aging_in_place";
  } else {
    primaryRecommendation = "independent";
  }

  // ── 8. SECONDARY RECOMMENDATION ────────────────────────────────────────────
  // The secondary recommendation is shown alongside the primary — it's either
  // a lighter alternative ("if you want to try something less intensive first")
  // or a heavier one ("if needs increase, here's what's next").

  let secondaryRecommendation: string;
  switch (primaryRecommendation) {
    case "memory_care":
      // Home care with memory support is a lighter in-home alternative
      secondaryRecommendation = "home_care_memory";
      break;

    case "nursing_home":
      // If approaching memory care threshold, flag that as secondary;
      // otherwise assisted living is the lighter-level alternative
      secondaryRecommendation = cognitiveScore >= 3 ? "memory_care" : "assisted_living";
      break;

    case "assisted_living":
      // If significant cognitive concerns are present (but not enough for the
      // full memory care flag), memory care is the secondary to watch
      secondaryRecommendation = cognitiveScore >= 3 ? "memory_care" : "home_care";
      break;

    case "home_care":
      // If trending toward the higher end of the home care range, the next
      // step up is assisted living; otherwise a more independent setup
      secondaryRecommendation =
        totalScore >= 9 ? "assisted_living" : "aging_in_place";
      break;

    case "aging_in_place":
      // Home care is the natural escalation if needs increase
      secondaryRecommendation = "home_care";
      break;

    default: // "independent"
      // A little structured support could still be beneficial
      secondaryRecommendation = "aging_in_place";
      break;
  }

  // ── 9. FINANCIAL FLAGS ─────────────────────────────────────────────────────
  // These flags drive which financial assistance callouts appear on the results
  // page. They are independent of the care score — a low-care-need person can
  // still have significant financial options worth surfacing.

  // VA benefits — for veterans and their spouses
  const vaEligibleFlag =
    veteranStatus === "veteran" || veteranStatus === "spouse";
  const vaPossibleFlag = veteranStatus === "not_sure";

  // Medicaid eligibility — based on self-reported financial situation
  const medicaidLikelyFlag = financialSituation === "social_security";
  const medicaidPossibleFlag = financialSituation === "modest_savings";
  const medicaidUnknownFlag =
    financialSituation === "not_sure" || financialSituation === "skip" || financialSituation === "";

  // Current coverage already in place
  const hasMedicaid = currentCoverage.includes("medicaid");
  const hasVA = currentCoverage.includes("va_benefits");
  const hasLtcInsurance = currentCoverage.includes("ltc_insurance");
  const coverageUnknown = currentCoverage.includes("not_sure");

  // ── RETURN ─────────────────────────────────────────────────────────────────

  return {
    // Scores
    ageScore,
    adlScore,
    cognitiveScore,
    safetyScore,
    livingScore,
    urgencyBonus,
    totalScore,

    // Care recommendations
    primaryRecommendation,
    secondaryRecommendation,
    memoryCareFlag,
    urgencyFlag,

    // Financial flags
    vaEligibleFlag,
    vaPossibleFlag,
    medicaidLikelyFlag,
    medicaidPossibleFlag,
    medicaidUnknownFlag,
    hasMedicaid,
    hasVA,
    hasLtcInsurance,
    coverageUnknown,

    // Pass-through for results page personalization
    personLabel,
    personPossessive,
    pronoun,
    possessive,
    careRecipientName,
    veteranStatus,
    zipCode,
    budget,
    livingAlone,

    // Raw selections for "Why this recommendation" text
    adlSelections,
    cognitiveSelections,
    safetySelections,

    // Raw input values — passed through for lead capture and analytics
    relationship,
    ageRange,
    livingSituation,
    financialSituation,
    currentCoverage,
  };
}
