import type { Metadata } from "next";
import CostCalculatorFlow from "@/components/cost-calculator/CostCalculatorFlow";

export const metadata: Metadata = {
  title: "Senior Care Cost Calculator | OurTurnToCare",
  description:
    "See what memory care, assisted living, home care, and nursing homes cost in your area. Free estimates based on your zip code.",
};

export default function CostCalculatorPage() {
  return <CostCalculatorFlow />;
}
