import type { Metadata } from "next";
import Link from "next/link";
import ContentHubPage from "@/components/content-hub/ContentHubPage";

export const metadata: Metadata = {
  title: "Memory Care: What It Is, Costs & How to Know If It's Time | OurTurnToCare",
  description:
    "Understand memory care options, costs ($4,500–$8,500/month), how to pay, and when it's time. Free care assessment to find the right fit for your loved one.",
};

const sections = [
  {
    heading: "What Is Memory Care?",
    content: (
      <>
        <p>
          Memory care is a specialized type of long-term residential care designed
          for people living with Alzheimer's disease, dementia, or other forms of
          cognitive decline. Unlike standard assisted living, memory care
          communities are built from the ground up around the unique needs of
          residents with memory loss.
        </p>
        <p>
          That means secured environments so residents can't wander into unsafe
          situations, staff trained specifically in dementia care techniques,
          structured daily routines that reduce confusion and anxiety, and
          therapeutic activities designed to engage cognitive function rather than
          just pass time.
        </p>
        <p>
          Most memory care communities are either standalone facilities or
          dedicated wings within larger assisted living or nursing home campuses.
          The distinction matters — a dedicated memory care community typically
          offers more specialized programming and higher staff-to-resident ratios
          than a memory care unit attached to a general assisted living facility.
        </p>
      </>
    ),
  },
  {
    heading: "Memory Care vs. Assisted Living: What's the Difference?",
    content: (
      <>
        <p>
          The most common question families ask is whether their loved one needs
          memory care or whether assisted living is enough. The short answer: if
          cognitive decline is the primary concern, memory care is usually the
          better fit. If physical care needs are the main issue and cognition is
          mostly intact, assisted living may be sufficient.
        </p>
        <p>
          Assisted living helps with daily activities like bathing, dressing, and
          medication management in a community setting. Residents generally come
          and go freely, make their own choices about meals and activities, and
          maintain a high degree of independence.
        </p>
        <p>
          Memory care provides all of that daily assistance plus a layer of
          cognitive support and safety that assisted living doesn't offer. The
          environment is designed to minimize confusion. Activities are tailored
          to cognitive ability levels. Staff are trained to handle sundowning,
          agitation, wandering, and the behavioral changes that often accompany
          dementia. And the staff-to-resident ratio is typically much higher.
        </p>
      </>
    ),
  },
  {
    heading: "When Is It Time for Memory Care?",
    content: (
      <>
        <p>
          There's rarely a single moment when the answer becomes obvious. For
          most families, it's a gradual accumulation of incidents and concerns.
          But there are specific signs that experienced geriatric care
          professionals look for.
        </p>
        <p>
          Safety indicators are often the tipping point. Wandering outside the
          home, especially at night. Leaving the stove or oven on. Falls that
          happen because of disorientation rather than physical frailty. Getting
          lost while driving or walking in familiar neighborhoods.
        </p>
        <p>
          Care needs exceeding what the current environment can provide is
          another key factor. If a family caregiver is providing round-the-clock
          supervision, if the person can no longer be safely left alone for any
          period of time, or if the behavioral symptoms of dementia are
          overwhelming the household — those are signals that professional memory
          care may be necessary.
        </p>
        <p>
          Not sure what level of care is right? Our{" "}
          <Link href="/tools/care-assessment">Care Assessment</Link> can help you
          evaluate your loved one's specific situation and get a personalized
          recommendation.
        </p>
      </>
    ),
  },
  {
    heading: "What Does Memory Care Cost?",
    content: (
      <>
        <p>
          Across the United States, memory care typically costs between $4,500
          and $8,500 per month, with a national median around $6,500 per month.
          That translates to roughly $78,000 per year at the median. In high-cost
          areas, costs can exceed $10,000 per month. In more rural areas or
          lower-cost states, you may find options in the $3,500 to $5,000 range.
        </p>
        <p>
          These figures usually include room, meals, personal care assistance,
          activities, and 24-hour supervision. Some communities charge additional
          fees for higher levels of care as a resident's needs increase over time.
        </p>
        <p>
          The sticker shock is real, but financial help may be available. Many
          families don't realize that programs like Medicaid, VA Aid and
          Attendance benefits, and long-term care insurance can cover a
          significant portion of memory care costs. Our{" "}
          <Link href="/tools/care-assessment">Care Assessment</Link> screens for
          potential financial assistance as part of the evaluation.
        </p>
      </>
    ),
  },
  {
    heading: "How to Pay for Memory Care",
    content: (
      <>
        <p>
          Medicaid is the single largest payer of long-term care in the United
          States. Eligibility varies by state, but generally requires limited
          income and assets. Many states have Medicaid waiver programs
          specifically for assisted living and memory care.
        </p>
        <p>
          VA Aid and Attendance is a pension benefit available to wartime veterans
          and their surviving spouses who need help with daily activities. It can
          provide up to $2,431 per month to help cover care costs. This benefit
          is massively underutilized.
        </p>
        <p>
          Long-term care insurance policies purchased before the onset of dementia
          often cover memory care. Medicare does not cover long-term memory care —
          this is one of the most common misconceptions. Medicare will cover
          short-term skilled nursing care after a hospital stay but does not pay
          for ongoing residential memory care.
        </p>
      </>
    ),
  },
  {
    heading: "What to Look for When Choosing a Memory Care Community",
    content: (
      <>
        <p>
          Ask specifically about dementia care training. How many hours of
          specialized training do caregivers receive? What's the staff turnover
          rate? High turnover means residents are constantly adjusting to new
          faces, which is particularly destabilizing for people with dementia.
        </p>
        <p>
          Memory care should have significantly higher staff-to-resident ratios
          than standard assisted living. A ratio of 1:5 or 1:6 during the day is
          considered good. Ask what the ratio is during day shifts, evening
          shifts, and overnight.
        </p>
        <p>
          Visit in person, unannounced if possible. The best way to evaluate a
          memory care community is to see it during a regular day, not during a
          scheduled tour. Pay attention to how staff interact with residents.
        </p>
      </>
    ),
  },
];

export default function MemoryCarePage() {
  return (
    <ContentHubPage
      title="Memory Care: What It Is, What It Costs, and How to Know If It's Time"
      subtitle="A complete guide for families navigating memory care decisions"
      breadcrumbLabel="Memory Care"
      sections={sections}
    />
  );
}
