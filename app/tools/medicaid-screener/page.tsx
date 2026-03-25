import type { Metadata } from "next";
import MedicaidScreenerFlow from "@/components/medicaid/MedicaidScreenerFlow";

export const metadata: Metadata = {
  title: "Medicaid Eligibility Screener | OurTurnToCare",
  description:
    "Find out if your loved one may qualify for Medicaid to cover long-term care costs. Free, private, takes 2 minutes.",
};

export default function MedicaidScreenerPage() {
  return <MedicaidScreenerFlow />;
}
