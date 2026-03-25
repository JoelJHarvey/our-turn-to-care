import type { Metadata } from "next";
import ContentHubPage from "@/components/content-hub/ContentHubPage";

export const metadata: Metadata = {
  title: "Assisted Living: Your Complete Guide to Understanding, Choosing, and Paying for Care | OurTurnToCare",
  description:
    "Learn what assisted living is, how much it costs ($3,500–$6,500/month), how to pay for it, and what to look for when choosing a community for your loved one.",
};

const sections = [
  {
    heading: "What Is Assisted Living?",
    content: (
      <>
        <p>
          Assisted living is a residential care setting that provides a combination
          of housing, personal care services, and health support for older adults
          who need some help with daily activities but don't require the around-the-clock
          medical attention of a skilled nursing facility. It sits in the middle of
          the care spectrum — more support than living at home, but more independence
          than a nursing home.
        </p>
        <p>
          Residents typically live in private or semi-private apartments within a
          community setting, with access to meals, housekeeping, transportation,
          social activities, and personal care assistance. The goal is to maximize
          independence while ensuring safety and well-being.
        </p>
        <p>
          Assisted living is regulated at the state level, so the services offered
          and the requirements for licensure vary significantly from state to state.
          When evaluating options, it's important to understand what your state
          requires and what individual communities actually provide.
        </p>
      </>
    ),
  },
  {
    heading: "Who Is Assisted Living For?",
    content: (
      <>
        <p>
          Assisted living is generally a good fit for older adults who need help
          with some activities of daily living — bathing, dressing, medication
          management, or meal preparation — but whose primary challenges are
          functional rather than medical. If your loved one is mostly healthy but
          struggling to keep up with daily tasks or becoming isolated at home,
          assisted living may be the right next step.
        </p>
        <p>
          It's also well-suited for people whose family caregivers are reaching
          burnout, or for those who would benefit from the social engagement and
          structured activities a community environment provides. Loneliness and
          isolation are serious health risks for older adults, and assisted living
          can provide meaningful daily connection.
        </p>
        <p>
          Assisted living is generally not designed for people with advanced
          dementia, complex medical needs requiring skilled nursing care, or
          significant behavioral symptoms. If cognitive decline is the primary
          concern, a dedicated memory care community is likely a better fit.
        </p>
      </>
    ),
  },
  {
    heading: "What Services Does Assisted Living Include?",
    content: (
      <>
        <p>
          Most assisted living communities provide a core set of services: three
          meals a day in a communal dining room, housekeeping and laundry,
          transportation to appointments, 24-hour staff availability, and a range
          of social and recreational activities. Personal care assistance —
          help with bathing, dressing, grooming, and toileting — is typically
          available and often tiered by level of need.
        </p>
        <p>
          Many communities also offer medication management, where staff ensure
          residents take the correct medications at the right times. Some provide
          on-site physical therapy, occupational therapy, or visiting health
          services. The specific services and how they're priced vary widely —
          some communities bundle everything into a single monthly rate, while
          others use a base rate plus à la carte fees for additional services.
        </p>
        <p>
          Before signing any contract, get a complete breakdown of what's included
          in the base fee and what will cost extra. Ask about how fees increase
          as care needs change over time — this is one of the most common
          surprises families encounter.
        </p>
      </>
    ),
  },
  {
    heading: "What Does Assisted Living Cost?",
    content: (
      <>
        <p>
          The national median cost for assisted living is around $4,500 per month,
          with a typical range of $3,500 to $6,500 depending on location, community
          size, and level of care. In high-cost urban markets like New York City or
          San Francisco, monthly costs can easily exceed $8,000. In smaller cities
          and rural areas, you may find quality options closer to $3,000 per month.
        </p>
        <p>
          These figures generally include the apartment, meals, housekeeping, and
          basic activities. If your loved one needs a higher level of personal care
          assistance, expect to pay more. Memory care within an assisted living
          campus typically runs $1,000–$2,000 per month more than standard
          assisted living.
        </p>
        <p>
          Cost transparency varies widely across communities. Some provide clear
          all-inclusive pricing upfront; others have complex fee structures that
          make true comparisons difficult. Always ask for a written fee schedule
          and a sample contract before visiting.
        </p>
      </>
    ),
  },
  {
    heading: "How to Pay for Assisted Living",
    content: (
      <>
        <p>
          Most assisted living is paid for privately — through personal savings,
          Social Security, pensions, and family contributions. Unlike nursing
          homes, Medicaid coverage for assisted living is more limited and varies
          significantly by state. Some states have Medicaid waiver programs that
          cover assisted living; others do not.
        </p>
        <p>
          Long-term care insurance is one of the best ways to fund assisted living,
          if a policy was purchased before care needs arose. VA Aid and Attendance
          benefits can provide up to $2,431 per month for eligible veterans and
          surviving spouses. If your loved one served in wartime, this benefit is
          worth exploring — many families don't know it exists.
        </p>
        <p>
          Some families use the proceeds from selling a home to fund assisted
          living costs. Others look into life settlement programs, which allow a
          life insurance policy to be sold for its current cash value. A geriatric
          care manager or elder law attorney can help you evaluate all available
          options.
        </p>
      </>
    ),
  },
  {
    heading: "What to Look for When Choosing an Assisted Living Community",
    content: (
      <>
        <p>
          Start with state inspection reports. Every state publishes licensing and
          inspection records for assisted living facilities — look for patterns of
          violations or complaints. A single isolated citation is less concerning
          than repeated citations for the same issue.
        </p>
        <p>
          Visit more than once, at different times of day. Arrive unannounced for
          at least one visit. Pay attention to how staff interact with residents,
          whether common areas are active and social, and whether the community
          smells clean. Trust your instincts — a well-run community is usually
          apparent from the moment you walk in.
        </p>
        <p>
          Ask specifically about staff turnover, caregiver-to-resident ratios,
          and what happens if a resident's care needs increase. Some communities
          can accommodate a wide range of needs; others will require a transfer
          to a higher level of care if needs escalate. Understanding this before
          you move in saves enormous stress later.
        </p>
      </>
    ),
  },
];

export default function AssistedLivingPage() {
  return (
    <ContentHubPage
      title="Assisted Living: Your Complete Guide to Understanding, Choosing, and Paying for Care"
      subtitle="What families need to know about assisted living communities"
      breadcrumbLabel="Assisted Living"
      sections={sections}
    />
  );
}
