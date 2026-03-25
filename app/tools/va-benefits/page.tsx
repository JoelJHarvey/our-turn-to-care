import type { Metadata } from "next";
import VABenefitsFlow from "@/components/va-benefits/VABenefitsFlow";

export const metadata: Metadata = {
  title: "VA Benefits for Senior Care | OurTurnToCare",
  description:
    "Veterans and their surviving spouses may qualify for VA benefits covering thousands per month in care costs. Check your eligibility in 2 minutes — free.",
};

export default function VABenefitsPage() {
  return <VABenefitsFlow />;
}
