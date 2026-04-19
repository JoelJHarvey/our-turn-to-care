/**
 * StateFacilityTypePage — Shared server component for state + facility-type listing pages.
 *
 * Handles:
 *  - Standard facility types: nursing_home, assisted_living, home_health, hospice, adult_day
 *    Uses: get_facilities_by_state_and_type RPC (supports proximity filtering via lat/lon)
 *  - Memory care (isMemoryCare=true):
 *    Uses: get_memory_care_facilities_by_state RPC (Alzheimer/dementia certification data)
 *
 * Zip+radius proximity filter is URL-param based — the ZipRadiusFilter client component
 * submits to ?zip=...&radius=... and this server component geocodes + queries accordingly.
 */

import React from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import {
  fetchFacilitiesByStateAndType,
  fetchMemoryCareFacilities,
  FacilityListItem,
} from '@/lib/facilities';
import { formatPhoneNumber, renderStarRating } from '@/lib/facilityHelpers';
import { TexasFaqAccordion, type FaqItem } from '@/components/texas/TexasFaqAccordion';
import { ZipRadiusFilter } from '@/components/facilities/ZipRadiusFilter';

// ─── Types ─────────────────────────────────────────────────────────────────

export interface StateFacilityTypePageProps {
  state: string;
  stateName: string;
  stateSlug: string;
  facilityType: string;       // "nursing_home" | "assisted_living" | "home_health" | "hospice" | "adult_day" | "memory_care"
  facilityTypeLabel: string;
  facilityTypeSlug: string;
  isMemoryCare?: boolean;
  page?: number;
  sortBy?: 'city' | 'rating';
  zip?: string;
  radius?: number;            // miles
}

// ─── Cost field mapping ─────────────────────────────────────────────────────

interface CostRow {
  monthly_nursing_home_semi_private: number | null;
  monthly_assisted_living: number | null;
  monthly_home_care_services: number | null;
  monthly_adult_day_care: number | null;
}

function getCostForType(row: CostRow, facilityType: string, isMemoryCare: boolean): number | null {
  if (isMemoryCare) {
    const al = row.monthly_assisted_living;
    return al ? Math.round(al * 1.25) : null;
  }
  switch (facilityType) {
    case 'nursing_home':    return row.monthly_nursing_home_semi_private;
    case 'assisted_living': return row.monthly_assisted_living;
    case 'home_health':     return row.monthly_home_care_services;
    case 'adult_day':       return row.monthly_adult_day_care;
    default:                return null; // hospice is Medicare-covered, no direct cost field
  }
}

function formatDollars(num: number | null): string {
  if (!num) return 'N/A';
  return '$' + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// ─── Static config per facility type ───────────────────────────────────────

const TYPE_CONFIG: Record<string, {
  heroSubtext: string;
  costNote: string;
  faqs: FaqItem[];
  contentHubSlug: string;
}> = {
  nursing_home: {
    heroSubtext:
      'Find and compare nursing homes across Texas. View CMS quality ratings, inspection reports, staffing levels, and Medicare/Medicaid acceptance.',
    costNote: 'Statewide median — semi-private room · Source: CareScout 2025',
    contentHubSlug: 'nursing-homes',
    faqs: [
      {
        question: 'How much do nursing homes cost in Texas?',
        answer:
          'A semi-private room in a Texas nursing home runs about $5,627 a month at the statewide median, or roughly $67,524 a year, according to the 2025 CareScout Cost of Care Survey. A private room usually adds $500 to $1,200 on top of that. Texas is a good bit cheaper than the national average of about $7,900 a month for a semi-private room. Prices still swing quite a bit inside the state. Facilities in Houston, Dallas, Austin, and San Antonio tend to run 15 to 30 percent above the rural Texas median. Small towns and much of the Rio Grande Valley come in below it. The final price for a specific facility also depends on staffing levels, the room type, and extras like ventilator care or a locked memory-care unit. For an estimate tied to your zip code, use our Cost Calculator.',
      },
      {
        question: 'How do I read the CMS Five-Star rating?',
        answer:
          'Every Medicare- or Medicaid-certified nursing home carries an overall star rating from 1 to 5. CMS builds that rating from three pieces: health inspection results from unannounced state surveys, staffing (RN and total nurse-aide hours per resident per day), and 15 clinical quality measures like pressure ulcers, antipsychotic use, and falls with injury. Inspection results carry the most weight, which is why a facility with strong staffing can still land at 2 stars after a serious citation. The rating is a useful first pass on a long list. It narrows the field, but it does not pick the facility for you. A 4 or 5 star home is a reasonable place to start. Before you sign anything, pull the actual inspection report (it lives on Medicare.gov and is linked from each of our facility pages) and walk through the building. Look closely at staff turnover, RN coverage on nights and weekends, and any citations involving abuse, neglect, or medication errors.',
      },
      {
        question: 'Does Medicare pay for nursing home care in Texas?',
        answer:
          'Medicare pays for short-term skilled nursing, but does not cover long-term custodial care. If you spend at least three days as an inpatient in a hospital and then need daily skilled nursing or therapy, Part A will pick up the bill in a Medicare-certified skilled nursing facility for up to 100 days. The first 20 days cost you nothing. Days 21 through 100 carry a daily coinsurance of about $204 in 2025. After day 100 you pay the full cost. Everyday help with things like bathing, dressing, or supervision does not qualify on its own. That kind of help is custodial care, and about two-thirds of long-stay nursing home residents end up paying for it through Medicaid, long-term care insurance, or personal savings.',
      },
      {
        question: 'How does Texas Medicaid help pay for a nursing home?',
        answer:
          'Texas Medicaid is administered by the Health and Human Services Commission (HHSC), and it will pay for long-term nursing home care if you meet the medical, income, and asset criteria. For 2025, the general income limit for long-term care Medicaid is about $2,829 a month for an individual, and countable assets must usually stay under $2,000. Your home is typically exempt while you or a spouse are still living in it, and the Community Spouse Resource Allowance protects a portion of combined assets for a spouse who stays at home. Texas enforces a five-year look-back on asset transfers, and the state can pursue estate recovery against the home after the resident passes away. Most Texas nursing homes accept Medicaid, but not every bed in every facility is Medicaid-certified, so confirm before admission. To start an application, call HHSC at 2-1-1 or 1-800-252-9240, or apply online at YourTexasBenefits.com.',
      },
      {
        question: 'What\'s the difference between a nursing home and assisted living?',
        answer:
          'Nursing homes provide 24/7 skilled nursing and are staffed for residents with serious medical needs: IV antibiotics, ventilator support, complex wound care, or late-stage dementia with behavioral issues. They answer to both Texas HHSC and federal CMS regulators. Assisted living communities provide personal care (help with bathing, dressing, medications, meals) and light health oversight in a more apartment-style setting, but they are not staffed or licensed for around-the-clock skilled nursing. In Texas, the assisted living median runs about $4,500 to $5,200 a month compared with roughly $5,627 for a nursing home semi-private room, and assisted living residents typically have more privacy and more independence. If your loved one needs frequent professional nursing attention, or cannot safely manage mobility and medications, a nursing home is usually the right level of care.',
      },
      {
        question: 'What should I look for when I tour a Texas nursing home?',
        answer:
          'Tour at least twice, at different times of day. A weekday meal and a weekend evening are the two most useful windows, because weekend evenings are when staffing is thinnest. Watch whether residents are engaged (talking, taking part in activities) or sitting in hallways in front of a TV. Ask specific questions. What is the RN-to-resident ratio on nights and weekends? What was nursing staff turnover over the past year? How many residents are on antipsychotic medications? When was the last state inspection? If the facility lets you, walk the halls without an escort. Do common areas smell clean? Are call lights answered quickly? Are residents dressed and groomed? Ask to see the most recent inspection report (every Texas nursing home must make it available), pull the star rating and deficiency history on Medicare.gov, and chat with any family members of current residents you bump into. An administrator who dodges direct questions or tries to rush you through the tour is telling you something.',
      },
      {
        question: 'What are warning signs of a poor-quality nursing home?',
        answer:
          'Some warning signs show up in the public records. A 1- or 2-star CMS rating, repeated serious deficiencies (especially around abuse, neglect, or medication errors), recent fines, or a change of ownership to a chain with a cost-cutting reputation all fall in that category. Others take more digging. High nursing staff turnover (above roughly 50 percent a year), thin RN coverage on nights and weekends, heavy antipsychotic use among long-stay residents, and constant reliance on temporary agency staff instead of regular employees are all worth asking about directly. Then there are the things you can see and smell on a walk-through: urine odor in common areas, call lights that go unanswered, residents left unattended in wheelchairs, visible bruises or pressure sores, staff who seem rushed and cannot make eye contact, and family members who quietly mention they are looking to move their loved one somewhere else. One of these on its own does not settle the question. A cluster of them does.',
      },
    ],
  },
  assisted_living: {
    heroSubtext:
      'Find and compare assisted living communities across Texas. Compare services, licensing status, and availability.',
    costNote: 'Statewide median · Source: CareScout 2025',
    contentHubSlug: 'assisted-living',
    faqs: [
      {
        question: 'How much does assisted living cost in Texas?',
        answer:
          'The statewide median for assisted living in Texas lands roughly between $4,500 and $5,200 a month in 2025, based on CareScout data. That is meaningfully cheaper than a nursing home semi-private room ($5,627 a month) and well below the national assisted living average. Price depends on apartment size (studio vs. one-bedroom), whether the unit is private or shared, and the level-of-care assessment. Most Texas communities charge a base rent plus tiered care fees that rise as needs grow. Austin and Dallas tend to price at the top of the range. Smaller cities and rural areas come in lower. Memory care wings usually add 20 to 30 percent on top of the base rate. Before you sign anything, get the full fee schedule in writing, including base rent, each care level, the community fee, and any second-occupant fee.',
      },
      {
        question: 'What services do Texas assisted living communities provide?',
        answer:
          'Assisted living covers help with activities of daily living, meaning bathing, dressing, grooming, toileting, and transferring. On top of that you get medication management, three meals a day, housekeeping, laundry, and scheduled transportation to medical appointments. Most Texas communities are staffed 24 hours a day for emergencies, but they are not staffed or licensed for continuous skilled nursing. If your loved one needs IV antibiotics, ventilator support, complex wound care, or extensive rehab, they need a nursing home. Communities typically run social programming throughout the week: group exercise, outings, religious services, arts, games. Many have on-site salons, fitness rooms, and secured outdoor spaces. Some offer memory care wings for residents with dementia.',
      },
      {
        question: 'What\'s the difference between a Type A and Type B assisted living license in Texas?',
        answer:
          'Texas HHSC licenses assisted living communities as either Type A or Type B. A Type A facility can only accept residents who are physically and mentally capable of evacuating the building on their own in an emergency, and whose needs do not cross into skilled nursing. A Type B facility can accept residents who need help to evacuate and who may have more complex care needs, including dementia. Most Texas communities marketed as "assisted living" are Type B, but not all of them are, and a Type A facility may be required to discharge your loved one if their condition changes. Before you move anyone in, ask which license type the community holds and what their discharge criteria are.',
      },
      {
        question: 'Does Texas Medicaid pay for assisted living?',
        answer:
          'Texas Medicaid does not pay for room and board in an assisted living community. The STAR+PLUS Home and Community-Based Services (HCBS) waiver can cover the services portion: personal care, nursing visits, medication management, and other supports for financially and medically eligible residents. Room and board still has to come out of Social Security, pension, private savings, or a family contribution. Waiver slots are limited, and there is typically a waitlist (HHSC calls it an "interest list") that can run years long in parts of Texas, so get on it as early as possible by calling HHSC at 2-1-1 or 1-800-252-9240. Not every assisted living community participates in the waiver. Ask directly whether a specific facility is a STAR+PLUS provider before assuming coverage.',
      },
      {
        question: 'How do I tell if a Texas assisted living community is well-run?',
        answer:
          'HHSC inspection reports are public. Search the facility\'s name at hhs.texas.gov to pull up its recent survey history, any deficiencies, and the corrective actions taken. The paperwork is only half the picture. The other half is the visit. Tour at least twice, ideally once at mealtime and once on a weekend evening when staffing thins out. Watch whether residents are engaged or sitting in front of a TV, whether call lights get answered quickly, and whether staff know residents by name. Ask about caregiver turnover in the past year (anything above 60 percent is a yellow flag), overnight staffing ratios, how the level-of-care assessment gets done, and how discharge decisions are made. If you can, talk to a family member of a current resident. They will tell you things the marketing tour will not.',
      },
      {
        question: 'When is it time to move from assisted living to a nursing home?',
        answer:
          'The move usually becomes necessary when care needs outgrow what the assisted living license allows. Common triggers include frequent falls that keep sending the resident back to the ER, new incontinence that the facility\'s staffing cannot manage, wandering or aggression that is not safe in an unsecured setting, complex medical needs like IV therapy or serious wound care, and rapid cognitive decline. Texas assisted living communities will generally give a 30-day notice if they can no longer meet a resident\'s needs. Sometimes the trigger is a hospitalization the resident cannot safely return home from. It pays to get ahead of this. Identify two or three nursing home options and get on their waitlists while your loved one is still stable, rather than trying to find a bed in a crisis.',
      },
    ],
  },
  memory_care: {
    heroSubtext:
      'Find facilities offering Alzheimer\'s and dementia care in Texas. Specialized communities with trained staff, secured environments, and structured programs.',
    costNote: 'Estimated from assisted living median × 1.25 · Source: CareScout 2025',
    contentHubSlug: 'memory-care',
    faqs: [
      {
        question: 'What is memory care, and who needs it?',
        answer:
          'Memory care is long-term care built specifically for people with Alzheimer\'s, other dementias, or significant cognitive impairment. A few things set it apart from standard assisted living. Exits are secured, and the physical layout is designed to prevent wandering. Direct-care staff are trained in dementia-specific care techniques (curricula like Teepa Snow\'s Positive Approach or Validation Therapy are common). Staff-to-resident ratios are higher. Daily routines are organized around cognitive support through music, reminiscence, sensory activities, and consistent mealtimes. Memory care usually makes sense when someone can no longer live safely at home or in regular assisted living because of wandering, unsafe behaviors, aggression, or the loss of basic self-care skills.',
      },
      {
        question: 'How much does memory care cost in Texas?',
        answer:
          'Memory care in Texas typically runs 20 to 30 percent more than standard assisted living, which puts the statewide median somewhere in the $5,500 to $6,500 a month range. Higher-acuity or private-room options in Austin, Dallas, or Houston can cross $8,000 a month. Pricing usually bundles the memory care wing premium, a higher level-of-care fee reflecting dementia-specific staffing, and sometimes a one-time community fee at admission. Most memory care is paid for out of pocket. Texas Medicaid\'s STAR+PLUS waiver can sometimes cover the services portion in waiver-participating communities, but room and board remains private pay.',
      },
      {
        question: 'How do I know when my loved one needs memory care?',
        answer:
          'The most common triggers involve safety and behavior. Frequent wandering or getting lost in familiar places. Dangerous forgetfulness like leaving the stove on or missing medications. Aggression or severe anxiety a family cannot de-escalate at home. Sundowning that disrupts sleep for everyone in the house. Incontinence layered on top of cognitive decline. Failure to recognize close family members. Quieter signs matter too: weight loss, withdrawal, repeated falls, or a primary caregiver hitting burnout. A physician assessment (a geriatrician or neurologist is ideal) combined with a consultation with a geriatric care manager usually clarifies whether regular assisted living, memory care, or a nursing home is the right fit.',
      },
      {
        question: 'What does the Texas Alzheimer\'s disclosure requirement tell me?',
        answer:
          'Any Texas facility that advertises memory care or Alzheimer\'s care is required by state law to hand over a written disclosure statement. It covers admission and discharge criteria, staff training, staffing ratios, security features, activity programming, the care-planning process, and medication policies. That disclosure is one of the most useful documents you can put in front of yourself when comparing two or three facilities side by side. Request it in writing, read it carefully, and take any mismatch between what the disclosure says and what you heard on the marketing tour as a serious warning. If a community cannot produce the disclosure when you ask for it, that is a problem on its own.',
      },
      {
        question: 'What should I look for when choosing a Texas memory care facility?',
        answer:
          'The things that matter most are staff and physical environment, which can get overshadowed by amenities on a glossy tour. Ask about overnight staffing ratios specifically. Many facilities show well during the day and thin out dramatically at night. Confirm that direct-care staff receive dementia-specific training and ask what curriculum is used. Walk the halls. A well-run memory care environment feels calm, quiet, and low-stimulation, with simple wayfinding, outdoor access to secured courtyards, and activity stations instead of residents sitting in front of a TV. Ask about antipsychotic medication use. Lower rates generally suggest a care philosophy that leans on behavioral interventions rather than sedation. Visit during meals and during the late afternoon (the typical sundowning window) so you can see how staff handle the harder moments.',
      },
      {
        question: 'Is memory care available in nursing homes, or only in assisted living?',
        answer:
          'Both. In Texas, roughly half of the 1,800-plus facilities that offer memory care are nursing homes with dedicated dementia units. The other half are assisted living communities with memory care wings. Which setting fits depends on medical complexity. Nursing-home memory care is usually the right call if your loved one has significant medical needs layered on top of dementia, such as a feeding tube, IV therapy, or late-stage immobility. Assisted living memory care is typically a better match for mobile residents whose issues are cognitive more than medical. Cost and Medicaid coverage differ too. Long-stay nursing home care is more commonly covered by Medicaid than assisted living memory care is.',
      },
    ],
  },
  home_health: {
    heroSubtext:
      'Find and compare home health agencies across Texas. Medical care, therapy, and personal assistance delivered to your home.',
    costNote: 'Statewide median (~$27/hr · Based on 40hr/week) · Source: CareScout 2025',
    contentHubSlug: 'home-care',
    faqs: [
      {
        question: 'What\'s the difference between home health and home care?',
        answer:
          'Home health refers to medical, skilled services delivered at home by licensed professionals: registered nurses, physical therapists, occupational therapists, speech therapists, and medical social workers. It is ordered by a physician, typically short-term (episodes run about 60 days), and covered by Medicare for those who qualify. Home care (also called non-medical home care, personal care, or private duty) is help with everyday activities like bathing, dressing, meal prep, light housekeeping, companionship, and transportation. The aides who provide home care do not need to be medically licensed, and Medicare does not pay for it. Many families end up needing both at different points: home health after a hospitalization, and ongoing home care to fill the longer-term gap.',
      },
      {
        question: 'Does Medicare cover home health in Texas?',
        answer:
          'Yes, if you meet four criteria: you are homebound (meaning leaving home takes real effort), you need skilled nursing care or physical/occupational/speech therapy, the care is ordered by your physician, and the agency is Medicare-certified. When those conditions are met, Medicare Part A picks up 100 percent of the cost. That includes skilled nursing visits, therapies, home health aide visits while skilled care is active, medical social services, and medical equipment tied to the plan of care. There is no deductible and no copay on the home health visits themselves. Medicare does not cover 24-hour care, delivered meals, homemaker services on their own, or custodial care if that is all you need.',
      },
      {
        question: 'How much does home care (non-medical) cost in Texas?',
        answer:
          'Private-pay home care aides in Texas typically run $25 to $30 an hour in 2025, per CareScout data. That works out to roughly $4,300 to $5,200 a month for a standard 40-hour-a-week schedule. Round-the-clock live-in or 24/7 coverage can exceed $15,000 a month. At that cost, residential options like assisted living or a nursing home are usually cheaper. Most families stretch dollars by combining part-time paid care with family caregiving. Long-term care insurance, VA Aid & Attendance (for qualifying veterans), and Texas Medicaid waivers like STAR+PLUS and CLASS can all help cover the bill for eligible seniors.',
      },
      {
        question: 'How do I choose a good Texas home health agency?',
        answer:
          'Start with Medicare certification. Certified agencies meet federal quality standards and appear on Medicare.gov\'s Home Health Compare tool, which publishes star ratings and patient-experience survey data. Verify current licensure through the Texas Health and Human Services Commission. Then get specific with the agency. What is your response time for an urgent call at 2 a.m.? How often will the same nurse or aide come back, and how do you handle staff continuity? Do you staff weekends and holidays in-house, or hand off to an answering service? Are you in-network with my insurance, including any Medicare Advantage plan? Agencies worth hiring will answer those questions clearly, in writing. Vague or defensive answers are a reason to keep looking.',
      },
      {
        question: 'What skilled services does Medicare home health include?',
        answer:
          'Skilled nursing visits handle wound care, IV therapy, medication teaching, diabetes management, and post-surgical monitoring. Physical therapy supports recovery after a stroke, fall, or orthopedic surgery. Occupational therapy helps people regain the skills they need for daily living. Speech-language therapy addresses post-stroke issues or swallowing problems. Home health aide visits cover bathing and personal care while skilled nursing or therapy is also in place. Medical social workers connect families with community resources. Episodes run 60 days and a physician can recertify them if you still meet the homebound and skilled-need criteria.',
      },
      {
        question: 'How do Texas Medicaid waivers help pay for home care?',
        answer:
          'Texas runs several waiver programs that cover personal attendant care at home for qualifying seniors. STAR+PLUS HCBS is the most common and serves seniors and adults with disabilities who are enrolled in STAR+PLUS managed care. Community Based Alternatives covers certain medically fragile individuals. Community First Choice supports attendant services tied to activities of daily living. Between them, these programs can pay for personal care, homemaker services, respite, and some nursing visits, often enough to delay or prevent a nursing home placement. Eligibility is income- and asset-limited similar to nursing home Medicaid, and interest lists can be long in some regions. Apply early by calling HHSC at 2-1-1 or 1-800-252-9240.',
      },
    ],
  },
  hospice: {
    heroSubtext:
      'Find and compare hospice care providers across Texas. Compassionate end-of-life care focused on comfort and family support.',
    costNote: 'Hospice is nearly fully covered by Medicare Part A and most Medicaid plans.',
    contentHubSlug: 'hospice',
    faqs: [
      {
        question: 'When is it time to consider hospice?',
        answer:
          'Hospice is appropriate when a physician certifies a life expectancy of six months or less if the illness runs its expected course, and when the family and patient have decided the focus of care should shift from trying to cure the disease to comfort, dignity, and quality of life. Most families who have been through it say they wish they had started hospice sooner. Research has consistently shown that hospice patients live as long as or longer than comparable patients who keep pursuing aggressive treatment, and they do it with less pain, fewer hospitalizations, and more time at home. Hospice is also reversible. If a patient stabilizes and improves, you can leave hospice and resume curative treatment at any point.',
      },
      {
        question: 'Does choosing hospice mean stopping all treatment?',
        answer:
          'No. Hospice shifts the goal of care toward comfort, and most treatments continue or intensify for that reason. Pain medications, oxygen, nausea control, infection treatment when it relieves suffering, hydration, and comfort procedures all stay on the plan. What stops are treatments aimed at curing the terminal illness itself, such as chemotherapy intended to cure cancer, dialysis for end-stage renal disease if the patient chooses to forgo it, or aggressive ICU-level interventions. You can revoke hospice at any time if you change your mind.',
      },
      {
        question: 'Does Medicare cover hospice in Texas?',
        answer:
          'Yes, and the coverage is broad. The Medicare Hospice Benefit under Part A activates when a physician certifies a terminal prognosis of six months or less. It covers physician services, nursing visits, home health aide visits, medical social work, chaplain or spiritual counseling, volunteer services, medications tied to the terminal illness, medical equipment and supplies, short-term inpatient care for symptom management, up to five days of inpatient respite at a time for the family, and 13 months of bereavement support for the family after the patient passes away. Out-of-pocket costs are minimal: up to $5 per prescription and 5 percent coinsurance for respite care. Texas Medicaid and most private insurance plans offer comparable coverage.',
      },
      {
        question: 'What services does a hospice team actually provide?',
        answer:
          'Hospice is delivered by an interdisciplinary team, not a single clinician. The team usually includes a hospice physician who oversees the plan of care, a registered nurse who serves as the primary care coordinator and visits regularly (more often as symptoms change), a home health aide for personal care like bathing and grooming, a medical social worker to help the family with decisions, planning, and resources, a chaplain or spiritual counselor (available regardless of religious background), and trained volunteers who provide companionship and give caregivers a break. Someone on the team is on call 24 hours a day. A reliable hospice should be able to reach a nurse within roughly 30 minutes at any hour.',
      },
      {
        question: 'Where can hospice care be delivered in Texas?',
        answer:
          'Wherever the patient lives. Most hospice care in Texas happens in the patient\'s own home, with the team visiting on a regular schedule. It can also be delivered in a nursing home or assisted living community. In that case, the patient keeps paying the facility for room and board while Medicare pays the hospice provider separately. Many Texas hospice agencies operate dedicated inpatient hospice houses for short stays when symptoms are too difficult to manage at home. Medicare covers General Inpatient (GIP) hospice in a hospital or hospice facility for symptom crises, and inpatient respite (up to five days at a time) gives family caregivers a break in a facility setting, also covered by the benefit.',
      },
      {
        question: 'How do I choose a good Texas hospice provider?',
        answer:
          'Start with the CMS Hospice Compare tool, which posts CAHPS (Consumer Assessment of Healthcare Providers and Systems) survey ratings. Those ratings capture real family feedback on communication, symptom control, and emotional support. Then ask prospective hospices a pointed set of questions. What is your nurse-to-patient ratio? How quickly does your on-call nurse respond at 2 a.m.? Do you have a hospice inpatient facility for symptom crises, and do you have a relationship with local hospitals for GIP? What volunteer and chaplain services do you offer? What does your bereavement program look like? Both nonprofit and for-profit hospices can deliver excellent care. Those questions help you tell the thoughtful providers from the rest. And pay attention to how you feel about the primary nurse at the intake visit, because you will end up relying on that person heavily.',
      },
    ],
  },
  adult_day: {
    heroSubtext:
      'Find and compare adult day care programs across Texas. Daytime activities, meals, and supervision for seniors.',
    costNote: 'Statewide median daily rate · Source: CareScout 2025',
    contentHubSlug: 'adult-day-care',
    faqs: [
      {
        question: 'What is adult day care, and who is it for?',
        answer:
          'Adult day care is a daytime program, typically running weekdays from about 7 a.m. to 6 p.m., that provides supervision, meals, activities, and often health services for seniors who still live at home with family. Participants go home every evening. It is not residential. Two common models exist. Social adult day programs focus on activities, companionship, meals, and supervision. Medical day health programs (in Texas these are licensed as DAHS, which stands for Day Activity and Health Services) add skilled nursing, medication management, therapies, and health monitoring. Adult day care works best for seniors with mild-to-moderate dementia, physical limitations, or social isolation whose family caregivers work during the day or simply need structured respite.',
      },
      {
        question: 'How much does adult day care cost in Texas?',
        answer:
          'Texas has the lowest median daily rate for adult day care in the country. CareScout puts the 2025 figure at roughly $78 a day. A standard five-day-a-week schedule works out to about $1,560 a month, which makes adult day care by a wide margin the most affordable formal senior-care option short of informal family caregiving. DAHS (medical model) programs tend to cost a bit more than social-model programs because of the on-site nursing and therapy. Some programs offer sliding-scale fees, half-day rates, or bundled pricing that includes transportation. Ask what is included before comparing two programs on price alone.',
      },
      {
        question: 'Does Texas Medicaid pay for adult day care?',
        answer:
          'Yes. The Texas DAHS (Day Activity and Health Services) program is a Medicaid-funded adult day program for recipients who meet nursing-home level-of-care criteria but can still stay at home with structured daytime support. The STAR+PLUS HCBS waiver also pays for adult day services for eligible seniors. To qualify, you need to meet Texas Medicaid financial eligibility and have a documented functional need, whether that is help with activities of daily living, supervision because of dementia, or something similar. Start the application by calling HHSC at 2-1-1 or 1-800-252-9240. Wait times vary by region but are generally shorter than the wait for nursing home Medicaid.',
      },
      {
        question: 'What happens in a typical day at adult day care?',
        answer:
          'Programs generally run a structured but flexible schedule. Morning arrival usually includes a welcome and some informal socializing, followed by a group activity like gentle exercise, a current events discussion, or music. A hot midday meal is provided, along with morning and afternoon snacks. Afternoons typically feature a themed activity such as arts and crafts, reminiscence therapy, games, gardening, or an outing. Staff check on health throughout the day (blood pressure, medication reminders), help with toileting and bathing as needed, and provide one-on-one engagement for participants who cannot join group activities. DAHS programs add skilled nursing care, therapies, and sometimes podiatry or dental visits on site. Door-to-door transportation is often available for an additional fee or included in DAHS programs.',
      },
      {
        question: 'How does adult day care compare to in-home care or assisted living?',
        answer:
          'Each option is built for a different situation. Adult day care is the cheapest and assumes family members are home and able to provide care in the evenings, overnight, and on weekends. It shines for socialization and respite but falls short for seniors who live alone. In-home care offers one-on-one attention in a familiar setting and can be scheduled flexibly, though full-time coverage gets expensive and can feel isolating for the participant. Assisted living provides around-the-clock support and meals in a residential setting, but it is a bigger cost and a bigger life change, and it takes the senior out of their own home. Many Texas families combine pieces. Adult day care three to five days a week plus family caregiving on nights and weekends can postpone a move to assisted living or a nursing home by years.',
      },
      {
        question: 'How do I choose a good Texas adult day program?',
        answer:
          'Confirm state licensure first. Texas HHSC licenses adult day care facilities under the DADS/HHSC licensing rules, and DAHS programs have additional requirements, including an on-site registered nurse. Visit during midday when activities are in full swing and lunch is being served. Are participants engaged, or just sitting and staring at the wall? Is the staff-to-participant ratio reasonable (4:1 is typical, and lower is better for dementia participants)? Is there specialized dementia programming if your loved one needs it? Ask about transportation, meal quality (ask to see the week\'s menu), how the program communicates with families (daily notes, app updates), and the program\'s policy on challenging behaviors or medication administration. A program worth enrolling in will welcome questions and let you observe for as long as you like.',
      },
    ],
  },
};

const OTHER_TYPES = [
  { label: 'Nursing Homes', slug: 'nursing-homes' },
  { label: 'Assisted Living', slug: 'assisted-living' },
  { label: 'Memory Care', slug: 'memory-care' },
  { label: 'Home Health', slug: 'home-health' },
  { label: 'Hospice', slug: 'hospice' },
  { label: 'Adult Day Care', slug: 'adult-day-care' },
];

const PAGE_SIZE = 20;

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// ─── Facility row card ──────────────────────────────────────────────────────

function FacilityRow({ facility }: { facility: FacilityListItem }) {
  const phone = formatPhoneNumber(facility.phone);
  const stars = renderStarRating(facility.overall_rating);

  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-3 p-4 border border-slate-200 rounded-xl hover:border-teal-300 hover:bg-teal-50/20 transition-all">
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-slate-900 text-sm leading-snug">
          {facility.facility_name}
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          {facility.address_line_1}, {facility.city}, {facility.state} {facility.zip_code}
        </p>

        <div className="flex flex-wrap items-center gap-2 mt-2">
          {facility.accepts_medicaid && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-700 font-medium">
              ✓ Medicaid
            </span>
          )}
          {facility.accepts_medicare && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-blue-100 text-blue-700 font-medium">
              ✓ Medicare
            </span>
          )}
          {facility.bed_count ? (
            <span className="text-xs text-slate-400">{facility.bed_count} beds</span>
          ) : null}
          {facility.distance_miles !== null && facility.distance_miles !== undefined && (
            <span className="text-xs text-slate-500 font-medium">{facility.distance_miles} mi away</span>
          )}
        </div>
      </div>

      <div className="flex sm:flex-col items-center sm:items-end gap-4 sm:gap-1 flex-shrink-0">
        {stars && (
          <div className="text-right">
            <div className="text-amber-400 text-sm leading-none">{stars}</div>
            <div className="text-xs text-slate-400 mt-0.5">{facility.overall_rating}/5 stars</div>
          </div>
        )}
        {phone && (
          <a
            href={`tel:${facility.phone}`}
            className="text-xs text-teal-600 hover:underline whitespace-nowrap"
          >
            {phone}
          </a>
        )}
      </div>
    </div>
  );
}

// ─── Main server component ──────────────────────────────────────────────────

export async function StateFacilityTypePage({
  state,
  stateName,
  stateSlug,
  facilityType,
  facilityTypeLabel,
  facilityTypeSlug,
  isMemoryCare = false,
  page = 1,
  sortBy = 'city',
  zip,
  radius = 25,
}: StateFacilityTypePageProps) {
  const config = TYPE_CONFIG[isMemoryCare ? 'memory_care' : facilityType];
  const pageUrl = `/${stateSlug}/${facilityTypeSlug}`;

  // NOTE: Zip proximity filtering on state-level list pages is not yet supported
  // by the get_facilities_by_state_and_type RPC. If a zip is provided, we still
  // show the full state-wide list. Future enhancement: redirect to /texas/search
  // when a zip is entered so the user gets a real proximity-filtered view.

  // ── Fetch facilities ──
  let facilities: FacilityListItem[] = [];
  let total = 0;
  let pages = 0;

  if (isMemoryCare) {
    const result = await fetchMemoryCareFacilities(state, { page, pageSize: PAGE_SIZE, sortBy });
    facilities = result.facilities;
    total = result.total;
    pages = result.pages;
  } else {
    const result = await fetchFacilitiesByStateAndType(state, facilityType, {
      page,
      pageSize: PAGE_SIZE,
      sortBy,
    });
    facilities = result.facilities;
    total = result.total;
    pages = result.pages;
  }

  // ── Fetch cost data ──
  let costMonthly: number | null = null;
  try {
    const { data } = await supabase
      .from('cost_of_care')
      .select(
        'monthly_nursing_home_semi_private,monthly_assisted_living,monthly_home_care_services,monthly_adult_day_care'
      )
      .eq('state_code', state.toUpperCase())
      .eq('level', 'state')
      .limit(1)
      .single();
    if (data) {
      costMonthly = getCostForType(data as CostRow, facilityType, isMemoryCare);
    }
  } catch {
    // cost data optional — page still renders without it
  }

  const startIdx = total > 0 ? (page - 1) * PAGE_SIZE + 1 : 0;
  const endIdx = Math.min(page * PAGE_SIZE, total);

  // ── JSON-LD schemas ──
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ourturntocare.org/' },
      { '@type': 'ListItem', position: 2, name: stateName, item: `https://ourturntocare.org/${stateSlug}` },
      { '@type': 'ListItem', position: 3, name: facilityTypeLabel },
    ],
  };

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${facilityTypeLabel} in ${stateName}`,
    url: `https://ourturntocare.org${pageUrl}`,
    breadcrumb: breadcrumbSchema,
  };

  const faqSchema = config?.faqs?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: config.faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      }
    : null;

  return (
    <div className="bg-white">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* ── Breadcrumb ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2 text-sm text-slate-500 flex-wrap">
          <Link href="/" className="hover:text-slate-900">Home</Link>
          <span>/</span>
          <Link href={`/${stateSlug}`} className="hover:text-slate-900">{stateName}</Link>
          <span>/</span>
          <span className="text-slate-900 font-medium">{facilityTypeLabel}</span>
        </div>
      </div>

      {/* ── Hero ── */}
      <div className="bg-gradient-to-br from-teal-50 to-slate-50 border-b border-slate-200 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-3">
            {facilityTypeLabel} in {stateName}
          </h1>
          {total > 0 && (
            <p className="text-teal-600 font-semibold text-lg mb-3">
              {formatNumber(total)} {facilityTypeLabel.toLowerCase()} across {stateName}
            </p>
          )}
          {config?.heroSubtext && (
            <p className="text-lg text-slate-600 max-w-2xl mb-8">
              {config.heroSubtext}
            </p>
          )}

          {/* Zip + radius filter — memory care uses simple zip→city redirect instead */}
          {!isMemoryCare ? (
            <ZipRadiusFilter
              pageUrl={pageUrl}
              activeZip={zip}
              activeRadius={String(radius)}
              sortBy={sortBy}
            />
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-5 max-w-xl">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                Browse by City
              </p>
              <p className="text-sm text-slate-600">
                Memory care facilities are available across Texas.{' '}
                <Link href={`/${stateSlug}`} className="text-teal-600 hover:underline font-medium">
                  Browse cities on the Texas page →
                </Link>
              </p>
            </div>
          )}

          <p className="mt-4 text-sm text-slate-500">
            Or{' '}
            <Link
              href="/tools/care-assessment"
              className="text-teal-600 hover:text-teal-700 font-medium underline"
            >
              take our free Care Assessment →
            </Link>{' '}
            to confirm the right type of care
          </p>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14">

        {/* ── Results bar + facility list ── */}
        <div>
          {/* Results count + sort */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <p className="text-sm text-slate-600">
              {total > 0
                ? `Showing ${formatNumber(startIdx)}–${formatNumber(endIdx)} of ${formatNumber(total)} ${facilityTypeLabel.toLowerCase()} in ${stateName}`
                : `No ${facilityTypeLabel.toLowerCase()} found.`}
            </p>

            <div className="flex items-center gap-2 text-sm">
              <span className="text-slate-500">Sort:</span>
              <Link
                href={`${pageUrl}?sort=city`}
                className={`px-3 py-1 rounded-full border text-xs font-medium transition-colors ${
                  sortBy === 'city'
                    ? 'bg-teal-600 text-white border-teal-600'
                    : 'bg-white text-slate-600 border-slate-300 hover:border-teal-400'
                }`}
              >
                City A–Z
              </Link>
              <Link
                href={`${pageUrl}?sort=rating`}
                className={`px-3 py-1 rounded-full border text-xs font-medium transition-colors ${
                  sortBy === 'rating'
                    ? 'bg-teal-600 text-white border-teal-600'
                    : 'bg-white text-slate-600 border-slate-300 hover:border-teal-400'
                }`}
              >
                Rating
              </Link>
            </div>
          </div>

          {/* Facility list */}
          {facilities.length > 0 ? (
            <div className="space-y-3">
              {facilities.map((facility) => (
                <FacilityRow key={facility.facility_id} facility={facility} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-slate-50 rounded-xl border border-slate-200">
              <p className="text-slate-500 mb-2">
                No facilities found.
              </p>
            </div>
          )}

          {/* Pagination */}
          {pages > 1 && (
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-200">
              <p className="text-sm text-slate-500">Page {page} of {pages}</p>
              <div className="flex gap-2">
                {page > 1 && (
                  <Link
                    href={`${pageUrl}?page=${page - 1}&sort=${sortBy}`}
                    className="px-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-700 hover:border-teal-400 hover:text-teal-700 transition-colors"
                  >
                    ← Previous
                  </Link>
                )}
                {page < pages && (
                  <Link
                    href={`${pageUrl}?page=${page + 1}&sort=${sortBy}`}
                    className="px-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-700 hover:border-teal-400 hover:text-teal-700 transition-colors"
                  >
                    Next →
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ── Cost callout ── */}
        <div className="bg-slate-50 rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-1">
            What {facilityTypeLabel} Cost in {stateName}
          </h2>
          {facilityType === 'hospice' || (facilityType !== 'hospice' && !costMonthly) ? (
            <>
              {facilityType === 'hospice' ? (
                <p className="text-slate-600 text-sm mb-3">
                  {config?.costNote}
                </p>
              ) : (
                <p className="text-slate-600 text-sm mb-3">
                  Costs vary by city, facility, and level of care.
                </p>
              )}
            </>
          ) : (
            <div className="mb-3">
              <div className="text-2xl font-bold text-teal-600 mb-0.5">
                {formatDollars(costMonthly)}/mo
              </div>
              {costMonthly && (
                <div className="text-xs text-slate-500 mb-2">
                  {formatDollars(costMonthly * 12)}/year · {config?.costNote}
                </div>
              )}
              <p className="text-slate-600 text-sm">
                Costs vary a lot by city. Major metros typically run 15 to 30 percent higher than rural areas.
              </p>
            </div>
          )}
          <Link
            href="/tools/cost-calculator"
            className="inline-flex items-center text-sm font-semibold text-teal-600 hover:text-teal-700"
          >
            Get cost estimates for your zip code →
          </Link>
        </div>

        {/* ── FAQs ── */}
        {config?.faqs?.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              {facilityTypeLabel} FAQs
            </h2>
            <TexasFaqAccordion faqs={config.faqs} />
          </div>
        )}

        {/* ── Cross-links ── */}
        <div className="border-t border-slate-200 pt-10 space-y-8">
          {/* CTA */}
          <div className="bg-teal-50 rounded-xl p-6 border border-teal-200">
            <h2 className="text-lg font-bold text-slate-900 mb-2">
              Not sure {facilityTypeLabel.toLowerCase()} is right?
            </h2>
            <p className="text-slate-600 text-sm mb-4">
              Our free Care Assessment asks about health needs, safety concerns, and independence
              level to recommend the best type of care, in about 5 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/tools/care-assessment"
                className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-colors text-sm inline-flex items-center justify-center"
              >
                Take the Care Assessment
              </Link>
              <Link
                href={`/${stateSlug}`}
                className="px-5 py-2.5 border border-slate-300 text-slate-600 hover:bg-slate-50 font-medium rounded-lg transition-colors text-sm inline-flex items-center justify-center"
              >
                ← Back to {stateName}
              </Link>
            </div>
          </div>

          {/* Also in Texas */}
          <div>
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
              Also in {stateName}
            </h3>
            <div className="flex flex-wrap gap-2">
              {OTHER_TYPES.filter((t) => t.slug !== facilityTypeSlug).map((t) => (
                <Link
                  key={t.slug}
                  href={`/${stateSlug}/${t.slug}`}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-700 rounded-lg text-sm transition-colors"
                >
                  {t.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Learn more */}
          {config?.contentHubSlug && (
            <p className="text-sm text-slate-500">
              <Link
                href={`/${config.contentHubSlug}`}
                className="text-teal-600 hover:text-teal-700 font-medium hover:underline"
              >
                Learn more about {facilityTypeLabel.toLowerCase()} →
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
