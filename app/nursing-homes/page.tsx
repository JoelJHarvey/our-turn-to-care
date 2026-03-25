import type { Metadata } from "next";
import ContentHubPage from "@/components/content-hub/ContentHubPage";

export const metadata: Metadata = {
  title: "Nursing Homes: When 24-Hour Medical Care Is What's Needed | OurTurnToCare",
  description:
    "Understand skilled nursing facilities, what they cost ($7,000–$12,000/month), quality ratings, Medicaid coverage, and your rights as a resident or family member.",
};

const sections = [
  {
    heading: "What Is a Nursing Home?",
    content: (
      <>
        <p>
          A nursing home — officially called a skilled nursing facility (SNF) —
          provides the highest level of residential long-term care, combining
          24-hour nursing supervision with help for all activities of daily living.
          Nursing homes are designed for people with complex medical needs, serious
          physical disabilities, or advanced illness who require a level of care
          that cannot be safely or practically provided at home or in an assisted
          living setting.
        </p>
        <p>
          Modern skilled nursing facilities vary widely in quality and culture.
          At their best, they function as true communities — with activity
          programs, therapy services, social engagement, and care that supports
          dignity and quality of life. At their worst, they can be understaffed,
          institutional, and isolating. The difference between a good nursing
          home and a poor one is enormous, and the quality of your loved one's
          daily experience depends heavily on which type you choose.
        </p>
        <p>
          Not everyone who enters a nursing home stays permanently. A significant
          portion of nursing home admissions are short-term — following a
          hospitalization for a hip fracture, stroke, or other acute event —
          with the goal of rehabilitation and eventual return home.
        </p>
      </>
    ),
  },
  {
    heading: "Who Needs a Nursing Home?",
    content: (
      <>
        <p>
          Nursing homes are appropriate for people who require 24-hour medical
          supervision, complex wound care or IV therapy, rehabilitation following
          a hospital stay (physical, occupational, or speech therapy), or
          management of multiple serious chronic conditions. They're also an
          option for people in the later stages of dementia or Parkinson's disease
          whose care needs have become too complex for memory care or assisted
          living.
        </p>
        <p>
          The decision to pursue nursing home care is often made during or after
          a medical crisis — a fall, a stroke, a hospitalization. Hospital
          discharge planners will typically begin discussing post-acute care
          options during the hospitalization, often with significant time pressure.
          Understanding your options in advance puts you in a much better position
          to make a good decision under these circumstances.
        </p>
        <p>
          Many families feel that choosing a nursing home represents a failure or
          a last resort. In reality, for people with complex medical needs,
          skilled nursing care is often the safest and most appropriate setting —
          one that provides more consistent care and monitoring than is possible
          at home.
        </p>
      </>
    ),
  },
  {
    heading: "What Does a Nursing Home Cost?",
    content: (
      <>
        <p>
          Skilled nursing facility care is the most expensive form of long-term
          residential care. The national median cost is approximately $9,000 per
          month for a semi-private room and over $10,000 per month for a private
          room. In high-cost states, private room rates of $12,000–$15,000 or more
          per month are not uncommon. In lower-cost states, you may find options
          closer to $7,000–$8,000 per month.
        </p>
        <p>
          These costs typically include room, meals, nursing care, personal care
          assistance, and basic activities. Additional charges may apply for
          physical therapy, occupational therapy, speech therapy, specialized
          medical equipment, and certain medications. Reviewing the full fee
          schedule before admission is essential.
        </p>
        <p>
          For short-term rehabilitation stays, Medicare Part A covers the first
          20 days in full following a qualifying hospital stay of three or more
          nights, then covers days 21–100 with a significant daily copayment.
          After 100 days, Medicare coverage ends entirely. For long-term stays,
          most residents eventually transition to Medicaid once personal funds
          are exhausted.
        </p>
      </>
    ),
  },
  {
    heading: "How to Pay for Nursing Home Care",
    content: (
      <>
        <p>
          Medicaid is the dominant payer for long-term nursing home care in the
          United States, covering roughly 60% of all nursing home residents.
          Medicaid eligibility requires limited income and assets, and the rules
          vary by state. Many families begin paying privately and transition to
          Medicaid after their personal funds are depleted — a process sometimes
          called "spending down." An elder law attorney can help you understand
          the rules in your state and plan appropriately.
        </p>
        <p>
          Medicare, as noted above, covers short-term skilled nursing care
          following a qualifying hospitalization. It does not cover long-term
          custodial nursing home care. Long-term care insurance, if purchased
          before the onset of care needs, typically covers skilled nursing
          facility care. VA benefits can cover nursing home care for eligible
          veterans through the Community Nursing Home program.
        </p>
        <p>
          For couples, Medicaid "spousal impoverishment" protections allow the
          at-home spouse to keep a portion of the couple's assets and income
          while the institutionalized spouse qualifies for Medicaid. These
          protections are complex and vary by state — professional guidance from
          an elder law attorney is strongly advisable.
        </p>
      </>
    ),
  },
  {
    heading: "How to Evaluate Nursing Home Quality",
    content: (
      <>
        <p>
          Medicare's Care Compare website (medicare.gov/care-compare) publishes
          quality ratings for every Medicare- and Medicaid-certified nursing home
          in the country, using a five-star system. The ratings incorporate health
          inspections, staffing levels, and quality measures. They're not perfect —
          a community can have a poor rating due to administrative paperwork issues
          while providing excellent direct care — but they're a useful starting
          point.
        </p>
        <p>
          Staffing levels matter enormously. Low staffing is consistently
          associated with worse care outcomes, including higher rates of
          pressure ulcers, falls, and hospital readmissions. When evaluating a
          nursing home, ask about nurse staffing ratios on different shifts —
          including evenings and weekends when staffing is typically lower.
        </p>
        <p>
          In-person visits are essential. Arrive at different times of day,
          including on a weekend or evening. Observe how staff interact with
          residents — is there warmth and patience, or does it feel rushed and
          institutional? Talk to residents and family members if you can. Ask
          the administrator about staff turnover rates; high turnover is a
          significant warning sign.
        </p>
      </>
    ),
  },
  {
    heading: "Your Rights as a Nursing Home Resident",
    content: (
      <>
        <p>
          Every resident of a Medicare- or Medicaid-certified nursing home has
          legally protected rights under the Federal Nursing Home Reform Act.
          These include the right to dignity, privacy, and respect; the right to
          participate in planning your own care; the right to be free from abuse
          and unnecessary physical or chemical restraints; the right to manage
          your own financial affairs; and the right to complain without fear of
          retaliation.
        </p>
        <p>
          Every state has a Long-Term Care Ombudsman program that advocates for
          residents and investigates complaints. If you have concerns about the
          quality of care your loved one is receiving, the ombudsman is a free
          resource and an important ally. Find your state's program through the
          National Long-Term Care Ombudsman Resource Center.
        </p>
        <p>
          Discharge from a nursing home — whether to home, another facility, or
          a different level of care — requires advance written notice and an
          appeal process. If your loved one is being discharged in a way you
          believe is premature or unsafe, you have the right to appeal, and the
          Ombudsman can help you navigate that process.
        </p>
      </>
    ),
  },
  {
    heading: "Short-Term Rehab vs. Long-Term Care",
    content: (
      <>
        <p>
          It's helpful to understand the difference between short-term
          rehabilitative stays and long-term permanent residence. Short-term
          rehab — typically following a hospitalization for a joint replacement,
          fracture, stroke, or serious illness — is focused on restoring function
          and returning home. Medicare covers much of the cost for eligible
          patients during this period.
        </p>
        <p>
          Long-term care, by contrast, is for people who cannot safely return
          home and require ongoing medical supervision and daily care assistance
          indefinitely. The transition from short-term to long-term status
          often happens gradually — a rehab stay gets extended, progress stalls,
          and it becomes clear that discharge home isn't realistic.
        </p>
        <p>
          For families navigating a loved one's transition from hospital to nursing
          home, having an advocate present during care conferences — whether a
          family member, social worker, or geriatric care manager — helps ensure
          your loved one's goals and preferences are centered in every decision.
        </p>
      </>
    ),
  },
];

export default function NursingHomesPage() {
  return (
    <ContentHubPage
      title="Nursing Homes: When 24-Hour Medical Care Is What's Needed"
      subtitle="Understanding skilled nursing facilities, costs, quality ratings, and your rights"
      breadcrumbLabel="Nursing Homes"
      sections={sections}
    />
  );
}
