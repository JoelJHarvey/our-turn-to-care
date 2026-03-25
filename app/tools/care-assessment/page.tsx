import type { Metadata } from "next";
import AssessmentFlow from "@/components/assessment/AssessmentFlow";

export const metadata: Metadata = {
  title: "Care Needs Assessment | OurTurnToCare",
  description:
    "Answer a few questions to understand what type of senior care your loved one needs — and what it might cost in your area. Free, private, no login required.",
};

// This server component owns the route and its metadata.
// AssessmentFlow (a client component) handles all interactive state.
export default function CareAssessmentPage() {
  return <AssessmentFlow />;
}
