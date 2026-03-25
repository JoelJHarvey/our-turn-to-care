import type { Metadata } from "next";
import ContentHubPage from "@/components/content-hub/ContentHubPage";

export const metadata: Metadata = {
  title: "Aging in Place: How to Help Your Loved One Stay Home Safely | OurTurnToCare",
  description:
    "A practical guide to home modifications, safety assessments, support services, and planning strategies that make aging in place possible for your loved one.",
};

const sections = [
  {
    heading: "What Is Aging in Place?",
    content: (
      <>
        <p>
          Aging in place means choosing to remain in one's own home as one grows
          older, rather than moving to a senior living facility or other care
          setting. For the vast majority of older adults, staying at home is
          the preferred option — and with the right planning and support
          systems, it's achievable for many people well into their later years.
        </p>
        <p>
          Aging in place isn't just about geography. It's about maintaining
          independence, connection to community, and a sense of identity that
          comes with living in one's own space. The emotional and psychological
          benefits are real, and for many people, the goal of staying home is
          worth significant effort and investment.
        </p>
        <p>
          That said, aging in place requires honest assessment of your loved one's
          current needs and realistic planning for how those needs will change
          over time. The families who make it work successfully are the ones who
          plan ahead rather than waiting for a crisis to force action.
        </p>
      </>
    ),
  },
  {
    heading: "Home Safety Assessment: Where to Start",
    content: (
      <>
        <p>
          Before making any modifications, a home safety assessment helps identify
          the specific risks in your loved one's living environment. An occupational
          therapist who specializes in home assessments can evaluate fall risks,
          accessibility challenges, and safety hazards — and provide a prioritized
          list of recommended changes.
        </p>
        <p>
          The most common hazards identified in home assessments include loose
          throw rugs, poor lighting in hallways and stairwells, absence of grab
          bars in bathrooms, slippery tub or shower surfaces, and clutter that
          creates navigation obstacles. Many of these are inexpensive to address.
        </p>
        <p>
          A home safety assessment from an occupational therapist typically costs
          $150–$400 and takes two to three hours. Many Area Agencies on Aging
          offer free or subsidized home safety assessments for older adults.
          Contact your local AAA through the Eldercare Locator (eldercare.acl.gov)
          to find out what's available in your area.
        </p>
      </>
    ),
  },
  {
    heading: "Essential Home Modifications",
    content: (
      <>
        <p>
          Bathroom modifications are usually the highest priority. Falls in the
          bathroom are among the most common and most serious injuries for older
          adults. Installing grab bars next to the toilet and in the shower or
          tub, adding a shower bench or transfer bench, using non-slip mats, and
          replacing a tub with a walk-in shower or curbless shower are all
          high-impact changes.
        </p>
        <p>
          For mobility and access, consider widening doorways if a wheelchair
          or walker will be needed, installing a first-floor bedroom and bathroom
          if stairs become a challenge, adding handrails on both sides of all
          stairways, and improving lighting throughout the home — particularly in
          areas used at night, like the path between the bedroom and bathroom.
        </p>
        <p>
          In the kitchen, lever-style door handles and faucets are easier to use
          for people with arthritis or limited hand strength. Removing items from
          high shelves that require step stools to reach, and ensuring frequently
          used items are easily accessible, can prevent many common accidents.
        </p>
      </>
    ),
  },
  {
    heading: "Technology and Monitoring Solutions",
    content: (
      <>
        <p>
          Medical alert systems (sometimes called personal emergency response
          systems) allow your loved one to summon help with the press of a button.
          Modern systems include fall detection, GPS tracking for people who drive
          or walk outside, and two-way communication. They typically cost $30–$60
          per month for monitoring, plus equipment fees.
        </p>
        <p>
          Medication management technology ranges from simple pill organizers
          with alarms to automated dispensers that lock unused compartments and
          alert caregivers when doses are missed. For people who struggle with
          medication adherence — one of the most common and serious care
          challenges — these tools can be genuinely life-changing.
        </p>
        <p>
          Remote monitoring systems allow family members to check in passively —
          sensors can detect movement patterns, door activity, appliance use, and
          sleep quality without requiring your loved one to actively do anything.
          These systems provide peace of mind without the feeling of being watched
          that some older adults find intrusive.
        </p>
      </>
    ),
  },
  {
    heading: "Support Services That Make Aging in Place Work",
    content: (
      <>
        <p>
          Home care aides can provide regular in-home assistance with personal
          care, meals, housekeeping, and companionship. Even a few hours a week
          can make a meaningful difference, and it's much easier to establish a
          care routine before it becomes urgently necessary. Starting with light
          support also gives your loved one time to adjust to having help.
        </p>
        <p>
          Adult day programs provide structured daytime activities, meals, and
          social engagement in a supervised setting outside the home. They're
          particularly valuable for people with mild cognitive impairment who
          benefit from routine and social connection, and for family caregivers
          who need regular respite during working hours.
        </p>
        <p>
          Community-based services like Meals on Wheels, senior transportation
          programs, grocery delivery, and friendly visitor programs can fill
          important gaps at relatively low cost. Many of these services are
          available through your local Area Agency on Aging and are free or
          income-based.
        </p>
      </>
    ),
  },
  {
    heading: "The Role of Family Caregivers",
    content: (
      <>
        <p>
          Family caregivers are the backbone of aging in place. But caregiver
          burnout is real, and it's one of the most common reasons aging in place
          eventually becomes unsustainable. Recognizing your own limits and
          building in regular respite care isn't selfish — it's necessary to
          sustain quality care over the long term.
        </p>
        <p>
          Clear communication among family members about responsibilities,
          expectations, and boundaries prevents a lot of conflict. If multiple
          family members are involved, consider a family meeting facilitated by a
          social worker or geriatric care manager to establish a shared care plan
          and divide responsibilities equitably.
        </p>
        <p>
          As your loved one's needs increase, regularly reassessing whether home
          care is still meeting those needs is important. Aging in place is a
          goal worth pursuing, but it's not a permanent commitment. If safety
          risks become unmanageable or care needs exceed what home-based support
          can provide, transitioning to a higher level of care is not a failure.
        </p>
      </>
    ),
  },
  {
    heading: "When to Reconsider Aging in Place",
    content: (
      <>
        <p>
          There are situations where aging in place is no longer the safest or
          most appropriate option, no matter how much everyone wants it to work.
          Wandering behavior, significant fall risk in a home that can't be
          sufficiently modified, inability to be safely left alone at any point
          during the day, or medical needs requiring skilled nursing care around
          the clock are all signs that it may be time to consider other options.
        </p>
        <p>
          Advanced dementia is one of the most common reasons aging in place
          becomes unsustainable. As cognitive decline progresses, the complexity
          of care needs typically exceeds what can be safely provided in a home
          setting without a level of staffing that rivals or exceeds the cost of
          residential care.
        </p>
        <p>
          Making this assessment honestly and proactively — before a crisis
          forces the decision — gives your family control over the transition
          and allows your loved one to have a voice in the process. Our free
          Care Assessment can help you evaluate where your loved one currently
          stands and what options make the most sense.
        </p>
      </>
    ),
  },
];

export default function AgingInPlacePage() {
  return (
    <ContentHubPage
      title="Aging in Place: How to Help Your Loved One Stay Home Safely"
      subtitle="Home modifications, support services, and planning for the future"
      breadcrumbLabel="Aging in Place"
      sections={sections}
    />
  );
}
