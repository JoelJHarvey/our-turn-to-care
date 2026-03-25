import type { Metadata } from "next";
import ContentHubPage from "@/components/content-hub/ContentHubPage";

export const metadata: Metadata = {
  title: "Home Care: Bringing Professional Support Into Your Loved One's Home | OurTurnToCare",
  description:
    "Everything families need to know about in-home care: types of home care, costs ($2,500–$5,000/month), how to find the right caregiver, and how to pay for it.",
};

const sections = [
  {
    heading: "What Is Home Care?",
    content: (
      <>
        <p>
          Home care refers to a range of professional support services delivered
          in your loved one's home rather than in a facility. It's one of the most
          popular care options for older adults who want to maintain their
          independence and stay in a familiar environment while getting the
          assistance they need.
        </p>
        <p>
          Home care can range from a few hours a week of companion care — help
          with errands, meals, and conversation — to around-the-clock skilled
          nursing care for people with complex medical needs. The type and amount
          of care is entirely customizable to your loved one's specific situation.
        </p>
        <p>
          For many families, home care is the first step in a longer care journey.
          It provides breathing room and professional support while allowing
          everyone — including the person receiving care — to adjust gradually to
          new routines and arrangements.
        </p>
      </>
    ),
  },
  {
    heading: "Types of Home Care",
    content: (
      <>
        <p>
          Non-medical home care (also called custodial care or companion care)
          is the most common type. This includes help with activities of daily
          living — bathing, dressing, grooming, meal preparation, light
          housekeeping, and transportation. These services are provided by home
          health aides or personal care aides, who do not need clinical training.
        </p>
        <p>
          Skilled home health care involves licensed medical professionals —
          registered nurses, physical therapists, occupational therapists, or
          speech therapists — who come to the home to provide clinical care. This
          type of care is often prescribed after a hospital stay to support
          recovery, and may be covered by Medicare if specific eligibility
          requirements are met.
        </p>
        <p>
          Specialized care for dementia or Alzheimer's is a subset of home care
          where aides receive additional training in memory care techniques. If
          your loved one has been diagnosed with cognitive decline but you want
          them to stay at home, a dementia-trained home care aide can provide
          appropriate support while helping maintain daily routines and safety.
        </p>
      </>
    ),
  },
  {
    heading: "How Much Does Home Care Cost?",
    content: (
      <>
        <p>
          The cost of home care depends primarily on how many hours of care are
          needed per week. The national median hourly rate for a home health aide
          is around $27–$30 per hour, which translates to roughly $2,500 per month
          for part-time care (about 20 hours/week) and $4,500–$5,000 per month for
          full-time care (40+ hours/week).
        </p>
        <p>
          For around-the-clock live-in care, costs can reach $8,000–$12,000 per
          month or more, depending on location and whether you're using an agency
          or hiring independently. Skilled nursing visits are billed separately,
          typically at $75–$150 per visit.
        </p>
        <p>
          Home care is often more affordable than residential care for people who
          only need part-time support. But as care needs increase and hours
          accumulate, the cost comparison with assisted living or memory care
          becomes closer. It's worth modeling out both options as needs evolve.
        </p>
      </>
    ),
  },
  {
    heading: "Agency vs. Independent Caregiver: Which Is Right for You?",
    content: (
      <>
        <p>
          Home care agencies handle recruiting, screening, training, payroll, and
          backup coverage when a caregiver is sick or unavailable. You pay more
          per hour, but the logistics are managed for you, and you have recourse
          if a caregiver isn't working out. Reputable agencies also carry
          liability insurance and conduct background checks.
        </p>
        <p>
          Hiring an independent caregiver directly (sometimes called a private
          duty caregiver) typically costs 20–30% less per hour than using an
          agency. The tradeoff is that you take on more responsibility — including
          verifying background checks, handling payroll taxes, and arranging
          backup coverage. You're also the employer, which brings legal and
          financial obligations.
        </p>
        <p>
          For most families, especially those just starting out with home care,
          using a licensed agency provides the best balance of quality control
          and peace of mind. As you become more comfortable with the arrangement
          and understand what your loved one needs, some families transition to
          a trusted independent caregiver.
        </p>
      </>
    ),
  },
  {
    heading: "How to Pay for Home Care",
    content: (
      <>
        <p>
          Medicare covers skilled home health care (nursing, therapy) on a
          short-term basis when prescribed by a physician after a hospitalization
          or qualifying medical event. It does not cover ongoing non-medical home
          care. This distinction trips up many families who assume Medicare will
          cover their loved one's daily care needs.
        </p>
        <p>
          Medicaid home and community-based services (HCBS) waivers can fund
          home care for eligible individuals in many states. Eligibility is
          income- and asset-based, and waitlists can be long — but for families
          who qualify, this is a significant source of coverage.
        </p>
        <p>
          VA Aid and Attendance benefits provide up to $2,431 per month for
          wartime veterans and surviving spouses who need help with daily
          activities. Long-term care insurance, if purchased before the onset of
          care needs, often covers home care directly. Many families also pay
          privately using savings, Social Security income, and family contributions.
        </p>
      </>
    ),
  },
  {
    heading: "How to Find and Vet a Home Care Agency",
    content: (
      <>
        <p>
          Start by asking your loved one's primary care physician or geriatrician
          for referrals. Hospital discharge planners and social workers are also
          excellent sources of recommendations. Word of mouth from other families
          in similar situations is often the most reliable guide.
        </p>
        <p>
          When evaluating agencies, ask about their caregiver screening process,
          training requirements, supervision practices, and how they handle
          caregiver substitutions. Ask for references from current clients if
          possible. Verify the agency is licensed in your state and carries
          liability insurance.
        </p>
        <p>
          The first few weeks with a new caregiver often involve an adjustment
          period for your loved one. Frequent check-ins and clear communication
          about what's working and what isn't will help the relationship develop
          successfully. Don't hesitate to request a different caregiver if the
          initial match isn't working — good agencies accommodate this.
        </p>
      </>
    ),
  },
  {
    heading: "When Home Care Is No Longer Enough",
    content: (
      <>
        <p>
          Home care works best when care needs are moderate and stable. There
          are situations where it becomes less feasible: when 24-hour supervision
          is needed for safety, when the home itself isn't safe for the level of
          care required, when behavioral symptoms of dementia become too complex
          for home-based caregivers, or when the cost of around-the-clock home
          care exceeds what a memory care or assisted living community would cost.
        </p>
        <p>
          For many families, transitioning from home care to a residential setting
          is emotionally difficult even when it's clearly the right decision.
          Working with a geriatric care manager can provide objective guidance and
          help you make the transition on your own timeline rather than during
          a crisis.
        </p>
        <p>
          The fact that home care is no longer sufficient doesn't mean it failed.
          It served a purpose, and now your loved one's needs have simply evolved
          to a level where a different care setting will serve them better.
        </p>
      </>
    ),
  },
];

export default function HomeCarePage() {
  return (
    <ContentHubPage
      title="Home Care: Bringing Professional Support Into Your Loved One's Home"
      subtitle="Understanding in-home care options, costs, and how to find the right caregiver"
      breadcrumbLabel="Home Care"
      sections={sections}
    />
  );
}
