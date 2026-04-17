import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import {
  getDistinctCitiesByState,
  normalizeCityName, cityToSlug, slugToCity,
  Facility,
} from '@/lib/facilities';
import { MAJOR_TEXAS_CITIES } from '@/lib/facilityHelpers';
import { CityFacilityFilter } from '@/components/facilities/CityFacilityFilter';
import { TexasFaqAccordion, type FaqItem } from '@/components/texas/TexasFaqAccordion';
import { StateCityLeadForm } from '@/components/forms/StateCityLeadForm';

export const dynamic = 'force-dynamic';

function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function formatDollars(num: number | null): string {
  if (!num) return 'N/A';
  return '$' + Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// ─── MSA Mapping ────────────────────────────────────────────────────────────

const CITY_TO_MSA: Record<string, string> = {
  'Dallas': 'Dallas-Fort Worth', 'Fort Worth': 'Dallas-Fort Worth',
  'Arlington': 'Dallas-Fort Worth', 'Irving': 'Dallas-Fort Worth',
  'Garland': 'Dallas-Fort Worth', 'Grand Prairie': 'Dallas-Fort Worth',
  'McKinney': 'Dallas-Fort Worth', 'Frisco': 'Dallas-Fort Worth',
  'Plano': 'Dallas-Fort Worth', 'Richardson': 'Dallas-Fort Worth',
  'Carrollton': 'Dallas-Fort Worth', 'Denton': 'Dallas-Fort Worth',
  'Lewisville': 'Dallas-Fort Worth', 'Mesquite': 'Dallas-Fort Worth',
  'Houston': 'Houston', 'Pasadena': 'Houston',
  'Sugar Land': 'Houston', 'The Woodlands': 'Houston',
  'Katy': 'Houston', 'Pearland': 'Houston',
  'Baytown': 'Houston', 'League City': 'Houston',
  'Austin': 'Austin-Round Rock', 'Round Rock': 'Austin-Round Rock',
  'Cedar Park': 'Austin-Round Rock', 'Georgetown': 'Austin-Round Rock',
  'San Marcos': 'Austin-Round Rock',
  'San Antonio': 'San Antonio', 'New Braunfels': 'San Antonio',
  'El Paso': 'El Paso', 'Corpus Christi': 'Corpus Christi',
  'Lubbock': 'Lubbock', 'Amarillo': 'Amarillo',
  'Beaumont': 'Beaumont-Port Arthur', 'Laredo': 'Laredo',
  'Brownsville': 'Brownsville-Harlingen', 'McAllen': 'McAllen-Edinburg-Mission',
  'Midland': 'Midland', 'Odessa': 'Odessa',
};

// ─── City-specific Extra FAQs ───────────────────────────────────────────────

const CITY_EXTRA_FAQS: Record<string, Array<{ question: string; answer: string }>> = {
  'Houston': [
    {
      question: 'What is the Texas Medical Center and how does it affect senior care in Houston?',
      answer: 'The Texas Medical Center (TMC) is the world\'s largest medical complex, home to Houston Methodist (ranked #23 nationally for geriatrics), Baylor College of Medicine, MD Anderson, Memorial Hermann, and Harris Health System. This concentration of medical expertise means Houston seniors have access to exceptional specialized geriatric care, rehabilitation services, comprehensive geriatric assessments, and clinical trials not available in most cities. Many senior care facilities are located near the TMC for convenient access to specialists.'
    },
    {
      question: 'What free senior services are available in Houston?',
      answer: 'Houston has extensive free senior services. Interfaith Ministries delivers 3,600+ meals daily through Meals on Wheels. The Harris County Area Agency on Aging (832-393-4301) provides free benefits counseling, caregiver support, and care coordination. Call 2-1-1 to connect with local services. The Evelyn Rubenstein JCC offers kosher meals for seniors, and Catholic Charities of Galveston-Houston (713-526-4611) provides guardianship services, case management, and emergency assistance.'
    },
    {
      question: 'What VA health care is available for Houston-area veterans?',
      answer: 'The Michael E. DeBakey VA Medical Center, located in the Texas Medical Center, is one of the VA\'s largest hospitals. It serves Harris County and 27 surrounding counties with primary care, specialty health, cardiovascular surgery, spinal cord injury treatment, and mental health services. It has been affiliated with Baylor College of Medicine since 1949. Use our VA Benefits Calculator to estimate your benefit amount.'
    },
    {
      question: 'What Medicaid managed care plans serve Houston seniors?',
      answer: 'Houston-area seniors eligible for STAR+PLUS Medicaid managed care can choose from Community Health Choice, UnitedHealthcare Community Plan, Molina Healthcare, and Wellpoint. These plans cover nursing home care, home and community-based services, personal attendant services, and home modifications. Call 2-1-1 or visit YourTexasBenefits.com to apply.'
    },
  ],
  'San Antonio': [
    {
      question: 'What senior care resources are available for San Antonio veterans?',
      answer: 'San Antonio has one of the largest veteran populations in the country — over 84,000 retired military and 211,000+ active veterans in the vicinity. The South Texas Veterans Health Care System operates the Audie L. Murphy Memorial VA Hospital with comprehensive geriatric care, a Community Living Center, and home-based primary care. Brooke Army Medical Center at Fort Sam Houston provides Level 1 trauma care. Many local facilities have experience serving veterans. Use our VA Benefits Calculator to estimate your benefit amount.'
    },
    {
      question: 'What are the best free senior resources in San Antonio?',
      answer: 'The Bexar Area Agency on Aging (210-362-5200) provides free benefits counseling, care coordination, and caregiver support through the Alamo Area Council of Governments. Meals on Wheels San Antonio delivers 4,000+ meals daily and operates Grace Place Alzheimer\'s Activity Centers. Jewish Family Service (210-302-6920) offers counseling and care management. The Alzheimer\'s Association San Antonio chapter (210-822-6449) provides support groups and a 24/7 helpline at 800-272-3900.'
    },
    {
      question: 'How does the military presence affect senior care in San Antonio?',
      answer: 'San Antonio\'s strong military culture means many senior care facilities understand veteran-specific needs, including PTSD-informed care and VA benefits coordination. The Army Residence Community provides housing for residents 62+. The military medical infrastructure (Brooke Army Medical Center, VA hospital) creates a deep pool of healthcare professionals who often work in civilian senior care. Community First Health Plans, a nonprofit managed care organization, serves many military retirees.'
    },
  ],
  'Dallas': [
    {
      question: 'What geriatric medical programs are available in Dallas?',
      answer: 'Dallas has exceptional geriatric medical care. UT Southwestern Medical Center is ranked #20 nationally for geriatrics and operates the Wold Center for Geriatric Care (for patients 70+), the only Acute Care for Elders (ACE) unit in DFW, the POSH program for pre-operative evaluation of seniors, and the COVE program providing home-based primary care — unique in North Texas. Dallas Regional Medical Center has the first accredited geriatric emergency department in Dallas County. Parkland Health also offers geriatric clinics across the county.'
    },
    {
      question: 'What free senior services does Dallas offer?',
      answer: 'The Dallas Area Agency on Aging provides home repairs, meal assistance, financial counseling, and care coordination. The Visiting Nurse Association (VNA) has delivered Meals on Wheels in Dallas for 50+ years. Jewish Family Service of Greater Dallas (972-437-9950) offers the only kosher Meals on Wheels in North Texas, plus memory care and counseling services. Catholic Charities Dallas operates the Brady Senior Center (817-877-1199) as a social hub for adults 60+.'
    },
    {
      question: 'What VA services are available for Dallas veterans?',
      answer: 'The VA North Texas Health Care System operates the Dallas VA Medical Center (853 beds) at 4500 S Lancaster Road with primary care, specialty health, cardiology, mental health, and spinal cord injury treatment. The system includes a Community Living Center with a dedicated hospice unit, a Fisher House for families, and several community-based outpatient clinics. Fort Worth veterans are also served through this system.'
    },
  ],
  'Austin': [
    {
      question: 'How does Austin\'s cost of living affect senior care costs?',
      answer: 'Austin has the highest cost of living of any major Texas city — about 20% above the national average. Assisted living averages around $3,218/month and in-home care runs $26-28/hour, both above the Texas average. However, Austin offers options at every price point. The Housing Authority of Austin (HACA) manages 1,839 public housing units, and HUD Section 202 communities offer income-based rent (typically 30% of income) for seniors 62+. The Area Agency on Aging of the Capital Area (855-937-2372) provides free counseling on financial assistance programs.'
    },
    {
      question: 'What unique senior services does Austin offer?',
      answer: 'Meals on Wheels Central Texas is one of the state\'s largest meal-delivery organizations, providing 3,000+ meals daily plus home repair, pet care, case management, and twice-weekly Alzheimer\'s programs. AGE of Central Texas (ageofcentraltx.org) operates adult day health centers, caregiver education, and care navigation for Travis, Williamson, and Hays counties. Dell Medical School\'s Division of Geriatrics provides teaching-quality care and geriatric psychiatry services. The Austin Parks & Recreation Department runs a Congregate Meal Program for seniors 60+.'
    },
    {
      question: 'What VA services are available in the Austin area?',
      answer: 'The Central Texas Veterans Health Care System operates the Austin VA Clinic at 7901 Metropolis Drive (800-423-2111) offering primary care, mental health, and specialty care services. For inpatient care, veterans travel to the VA medical centers in Temple or Waco. Austin\'s clinic is a 1a-High Complexity facility with growing services for the area\'s veteran population.'
    },
  ],
  'Fort Worth': [
    {
      question: 'What specialized dementia and memory care is available in Fort Worth?',
      answer: 'Fort Worth is home to the James L. West Center for Dementia Care (jameslwest.org), a nationally recognized Alzheimer\'s and dementia care center offering skilled nursing with memory support, short-term rehabilitation, and a senior day program. WellBridge Fort Worth provides a full-service geriatric behavioral health hospital with 24-hour monitoring. The Alzheimer\'s Association offers dementia-friendly community resources through its 24/7 helpline (800-272-3900).'
    },
    {
      question: 'What free senior services are available in Fort Worth?',
      answer: 'The Tarrant County Area Agency on Aging (817-258-8000), uniquely operated through United Way of Tarrant County, provides free Medicare/Medicaid counseling, prescription coverage assistance, long-term care planning, and advance directives guidance. Meals on Wheels of Tarrant County (founded 1973) delivers 1.1 million meals annually with professional case management. All AAA services are free for Tarrant County residents.'
    },
    {
      question: 'What Medicaid waiver programs are available for Fort Worth seniors?',
      answer: 'Fort Worth seniors can access the Texas STAR+PLUS program through UnitedHealthcare Community Plan or Community First Health Plans. The HCBS waiver covers assisted living, adult day care, personal attendant services, and home modifications. The Tarrant County Aging and Disability Resource Center (888-730-2372) provides free help with Medicaid applications and understanding waiver options. The AAA also assists with SNAP, SSI, and energy assistance applications.'
    },
  ],
  'El Paso': [
    {
      question: 'Are there bilingual senior care facilities in El Paso?',
      answer: 'Yes, most senior care facilities in El Paso have bilingual (English/Spanish) staff, reflecting the city\'s predominantly Hispanic population. The Rio Grande Area Agency on Aging (915-533-0998) provides bilingual benefits counseling and care coordination. El Paso Health, the local nonprofit Medicaid managed care plan (elpasohealth.com), offers bilingual member services. The Hospitals of Providence and UMC both maintain bilingual geriatric care teams. When searching for care, ask about language capabilities for both daily care and medical staff.'
    },
    {
      question: 'What is the PACE program in El Paso?',
      answer: 'Bienvivir (bienvivir.org) is El Paso\'s only Program of All-Inclusive Care for the Elderly (PACE). This comprehensive, community-based healthcare program serves adults 55+ who need a nursing home level of care but want to remain in their community. PACE provides medical care, therapy, meals, social activities, and transportation — all coordinated through one program. It\'s available to those eligible for both Medicare and Medicaid.'
    },
    {
      question: 'What VA and military health services are available in El Paso?',
      answer: 'The VA El Paso Health Care System operates clinics throughout the city (main clinic at 5001 North Piedras Street, 915-564-6100), adjacent to William Beaumont Army Medical Center at Fort Bliss. A new VA hospital is under construction with completion expected in early 2028. The system also serves Doña Ana County, New Mexico through a Las Cruces clinic. For immediate inpatient needs, coordination with other VA facilities is available.'
    },
    {
      question: 'What is the El Paso County Senior Nutrition Program?',
      answer: 'The El Paso County Senior Nutrition Program has served seniors for 45+ years through 20 nutrition centers throughout the city and county. It delivers home meals to 1,117+ homebound seniors and serves 1,000+ residents daily at congregate meal sites, Monday through Friday. This is a county-funded program requiring no means testing. Contact the Rio Grande Area Agency on Aging at 915-533-0998 for enrollment.'
    },
  ],
  'Arlington': [
    {
      question: 'What senior services are available in Arlington?',
      answer: 'Arlington is served by the North Central Texas Area Agency on Aging (800-272-3921) at 616 Six Flags Drive. Meals on Wheels of Tarrant County delivers to Arlington seniors, with meal sites at Most Blessed Sacrament Catholic Church and St. Mark\'s Episcopal Church. The city offers Handitran transportation for seniors and disabled residents at $2 one-way or $55/month unlimited. Arlington has 45,000+ seniors (11.5% of population) with 80+ assisted living options at below-national-average costs.'
    },
    {
      question: 'Does Arlington have property tax relief for seniors?',
      answer: 'Yes, Texas law provides a property tax exemption for homeowners age 65+. In Arlington and Tarrant County, this means a significant reduction in your property tax bill. Additionally, seniors can defer property taxes on their homestead until the property is sold. Contact the Tarrant Appraisal District for current exemption amounts and to apply. This tax relief makes aging in place more affordable for Arlington seniors.'
    },
  ],
  'Corpus Christi': [
    {
      question: 'Is Corpus Christi a good place to retire?',
      answer: 'Corpus Christi is a popular retirement destination thanks to its warm year-round coastal climate, moderate cost of living, low crime rates, and beach lifestyle. The Coastal Bend Council of Governments Area Agency on Aging (361-883-3935) operates multiple senior centers (Broadmoor, Ethel Eyerly, Garden, Greenwood, Northwest, Oveal Williams, and Zavala) with congregate meals, activities, and services. The city also benefits from CHRISTUS Spohn Hospital\'s geriatric fellowship program, meaning access to geriatric-trained physicians.'
    },
    {
      question: 'What dementia resources are available in Corpus Christi?',
      answer: 'Corpus Christi is one of the few Texas cities with a formal Dementia Friendly Community initiative through the Coastal Bend Council of Governments. CHRISTUS Spohn Hospital has an ACGME-accredited Geriatric Fellowship program training dementia specialists. The Alzheimer\'s Association provides support through its 24/7 helpline (800-272-3900). Multiple upscale memory care communities are available, including The Viera and Solstice.'
    },
  ],
  'Plano': [
    {
      question: 'What senior services does the City of Plano offer?',
      answer: 'Plano operates the Plano Senior Recreation Center with a heated pool for water aerobics, and the Plano Wellness Center for Older Adults with exercise classes and nutrition counseling. Texas Health Presbyterian Hospital Plano (972-424-7547) runs a Senior Wellness Initiative. The city has a Senior Advisory Board advocating for senior residents. Property taxes are capped for residents 65+. As part of Collin County (which grew from 264,000 to 1.1 million since 2000), Plano benefits from rapid healthcare infrastructure expansion.'
    },
    {
      question: 'What Area Agency on Aging serves Plano?',
      answer: 'Plano is served by the North Central Texas Area Agency on Aging (NCTAAA), which covers Collin County. They can be reached through the Aging and Disability Resource Center at 888-730-2372. Services include benefits counseling for Medicare and Medicaid, caregiver support, long-term care planning, and referrals to local resources. The agency serves the entire DFW metroplex region.'
    },
  ],
  'Lubbock': [
    {
      question: 'What challenges do Lubbock seniors face with healthcare access?',
      answer: 'As a West Texas city, Lubbock serves as a regional healthcare hub but faces rural access challenges. Many seniors in surrounding communities travel 30+ miles for specialist appointments, creating a "doughnut effect" where medical resources concentrate in the city. Limited public transportation is a barrier for some seniors. However, Lubbock benefits from the Covenant Health System\'s free SeniorCare membership program (for ages 60+) and the Grace Clinic Geriatric Care Center (806-725-4218) with multidisciplinary geriatric teams. Texas Tech University Health Sciences Center also provides teaching-quality geriatric care.'
    },
    {
      question: 'What senior services does the South Plains region offer?',
      answer: 'The South Plains Association of Governments Area Agency on Aging (806-687-0940 or 888-418-6564) provides care coordination, homemaker services, adult day care, medical transportation, emergency response systems, eye exams, hearing aids, and prescription assistance for Lubbock and surrounding counties. The Alzheimer\'s Association West Texas Chapter serves the region with support groups and caregiver resources.'
    },
  ],
  'Laredo': [
    {
      question: 'Are there bilingual senior care services in Laredo?',
      answer: 'Yes, Laredo\'s 94% Hispanic population means virtually all senior care facilities and services operate bilingually in English and Spanish. The South Texas Development Council Area Agency on Aging (956-722-3995 or 800-292-5426) provides bilingual benefits counseling and care coordination for Webb, Jim Hogg, Starr, and Zapata counties. Laredo Medical Center has a 5-star CMS rating with bilingual staff and 18 skilled nursing beds. The Border Area Nutrition Council (B.A.N.C.) serves seniors at 12 senior centers plus 3 rural centers.'
    },
    {
      question: 'What makes Laredo unique for senior care?',
      answer: 'As a major U.S.-Mexico border city, Laredo has unique senior care characteristics. Cross-border family structures are common, meaning some caregivers and family members live in Mexico. The Mexican Consulate partners with local health programs. Meals on Wheels through Webb County provides free home-delivered meals with no means testing. The Border Region Behavioral Health Center offers mental health services for seniors. Lower cost of living makes senior care more affordable than major Texas metros, though options may be more limited than larger cities.'
    },
  ],
  'Amarillo': [
    {
      question: 'What challenges do Amarillo-area seniors face?',
      answer: 'The Texas Panhandle covers 26 counties with a spread-out population, creating significant healthcare access challenges for seniors in rural areas. The Area Agency on Aging of the Panhandle (806-372-3381) coordinates services across this vast region including emergency response, adult day care, transportation, home repairs, and legal assistance. Northwest Texas Healthcare System is a 495-bed teaching facility with 106 physicians covering 45 specialties, serving as the lead trauma facility for all 26 Panhandle counties. Cold winters and long distances can create seasonal transportation barriers.'
    },
    {
      question: 'What Meals on Wheels services are available in Amarillo?',
      answer: 'Amarillo Meals on Wheels (806-374-1521, amarillomealsonwheels.org) serves 360+ seniors daily with the help of 450 volunteers. Meals cost $4.75 each, with scholarships available for those who cannot pay. They also run the unique Animeals program, delivering pet food so seniors don\'t have to choose between feeding themselves and their pets. Located at 7550 Outlook Drive, Amarillo, TX 79106.'
    },
  ],
  'Beaumont': [
    {
      question: 'What senior mental health services are available in Beaumont?',
      answer: 'Baptist Hospitals of Southeast Texas operates a dedicated 20-bed Senior Mental Health Program led by a board-certified geriatric psychiatrist (409-212-5012). This is one of the few dedicated geriatric behavioral health units in Southeast Texas. The Area Agency on Aging of Southeast Texas (409-924-3381 or 800-395-5465) provides additional mental health referrals and support services for Hardin, Jasper, Jefferson, and Orange counties.'
    },
    {
      question: 'What Meals on Wheels services are in the Beaumont area?',
      answer: 'Nutrition & Services for Seniors (409-892-4455, seniormeals.org) has served the Beaumont area since 1983, delivering 18+ million meals over its history. They prepare meals on-site and serve approximately 1,600 lunches daily, Monday through Friday, to Jefferson and Hardin County seniors. No means testing is required. In Orange County, the Orange Community Action Association (409-886-2186) provides similar meal services.'
    },
  ],
  'Brownsville': [
    {
      question: 'What bilingual senior resources are available in Brownsville?',
      answer: 'Brownsville is a heavily Hispanic border city where Spanish-language services are essential. The Lower Rio Grande Valley Area Agency on Aging (800-365-6131 or 956-682-3481 ext. 412) provides bilingual benefits counseling and care coordination for Cameron, Hidalgo, and Willacy counties. Amigos Del Valle (advrgv.org) operates nutrition centers and Meals on Wheels serving 4,000+ seniors daily across the Rio Grande Valley. Valley Baptist Medical Center (956-544-1400) has a Geriatric Behavioral Health Unit with bilingual staff. The Mexican Consulate partners with local agencies for health screenings.'
    },
    {
      question: 'What makes Brownsville affordable for senior care?',
      answer: 'Brownsville has a significantly lower cost of living than most Texas cities, making senior care more affordable. Many seniors qualify for Medicaid due to income levels, with the STAR+PLUS program covering nursing home care, home-based services, and personal attendant services. Texas Visiting Nurse Service (tvns.today) provides home care, and community-based programs through Amigos Del Valle supplement care without cost barriers. The warm year-round climate also enables outdoor activities and reduces heating costs for aging-in-place seniors.'
    },
  ],
  'McAllen': [
    {
      question: 'What senior care services are available in the McAllen area?',
      answer: 'McAllen is the hub of the Rio Grande Valley for senior care. The Lower Rio Grande Valley Area Agency on Aging (956-682-3481, main office at 311 N 15th St) provides care coordination, medical transportation, residential modifications, medications, and caregiver respite. Amigos Del Valle (1100 E. Dallas Ave) operates congregate and home-delivery meal programs serving 4,000+ seniors daily. South Texas Health System McAllen Hospital has geriatric medicine specialists. The area has a growing retirement community with affordable care options.'
    },
    {
      question: 'Are there bilingual care options in McAllen?',
      answer: 'Yes, McAllen\'s 94%+ Hispanic population means healthcare systems are strongly bilingual. Most facilities, home care agencies, and senior services operate in both English and Spanish. The LRGV Area Agency on Aging provides bilingual benefits counseling and Medicaid application assistance. Many seniors in the area are Medicaid-eligible, and the STAR+PLUS program covers extensive home and community-based services. Texas Visiting Nurse Service also serves the McAllen area with bilingual home health aides.'
    },
  ],
  'Midland': [
    {
      question: 'How does the oil economy affect senior care in Midland?',
      answer: 'Midland\'s economy is heavily tied to the Permian Basin oil industry (5.5 million barrels/day), which creates a boom-bust cycle affecting senior services. During booms, high wages ($2,357/week average for oil and gas jobs) drive up costs of living and make it harder to recruit care workers. The Area Agency on Aging of the Permian Basin (432-563-1061, aaapb.com) coordinates services across 17 counties. Midland Memorial Hospital has earned Level 2 Geriatric Emergency Department Accreditation — the highest-rated GEDA in the Permian Basin.'
    },
  ],
  'Odessa': [
    {
      question: 'What senior services are available in Odessa?',
      answer: 'Odessa is served by the Area Agency on Aging of the Permian Basin (432-563-1061), which covers 17 Permian Basin counties including Ector County. Meals on Wheels of Odessa (mowo.org) has operated since 1977, delivering fresh weekday meals planned by a registered dietitian and prepared by Odessa Regional Medical Center. Senior Life Midland coordinates volunteer events and fundraising for senior programs. As a twin city with Midland, Odessa residents have access to Midland Memorial Hospital\'s geriatric emergency services.'
    },
  ],
  'Irving': [
    {
      question: 'What senior services does Irving provide?',
      answer: 'The City of Irving operates the Heritage Senior Center at 200 S. Jefferson Street with classes, trips, and social events. Irving is served by the Dallas Area Agency on Aging (for Dallas County portions) and the North Central Texas AAA. The city\'s proximity to DFW Airport makes it attractive for active retirees who travel frequently. Senior living options range from $1,500 to $5,500/month with good variety across price points.'
    },
  ],
  'Garland': [
    {
      question: 'What senior centers and services does Garland offer?',
      answer: 'Garland operates two senior centers — the Garland Senior Activity Center and the Carver Senior Center — both offering social activities, meal programs, and wellness classes. The city provides free weekday transportation for adults 60+ enrolled in the senior meal program. Garland is served by the Dallas Area Agency on Aging, which offers additional benefits counseling and care coordination services for Dallas County residents.'
    },
  ],
  'Grand Prairie': [
    {
      question: 'What senior care options are available in Grand Prairie?',
      answer: 'Grand Prairie has a notably high concentration of memory care and skilled nursing facilities relative to its population, making it a regional hub for these care types in the DFW metroplex. The city is served by the Tarrant County Area Agency on Aging (817-258-8000) and benefits from its location between Dallas and Fort Worth, providing access to major medical centers in both cities. Assisted living and nursing home options are available at competitive prices compared to the DFW average.'
    },
  ],
  'McKinney': [
    {
      question: 'Why is McKinney attracting new senior care facilities?',
      answer: 'McKinney is one of the fastest-growing suburbs in DFW, driving rapid expansion of senior care options. New, modern facilities are opening regularly, including Hidden Springs of McKinney (recognized by U.S. News for Best Memory Care). Assisted living in McKinney averages $3,274/month — among the lowest in the DFW metro. The city is served by the North Central Texas Area Agency on Aging for Collin County, reachable through the ADRC at 888-730-2372.'
    },
  ],
  'Frisco': [
    {
      question: 'What is senior living like in Frisco?',
      answer: 'Frisco is one of DFW\'s most explosive growth markets (34% metro growth 2020-2023) with 61 senior living communities and counting. The city trends toward premium, high-end communities with an average cost around $5,109/month. Top options include Landing at Watermere Frisco, Bethesda Gardens, and Watermere at Frisco for independent living. Frisco is served by the North Central Texas AAA for Collin County. The rapid growth means newer facilities with modern amenities and the latest care approaches.'
    },
  ],
  'Richardson': [
    {
      question: 'What senior services does Richardson offer?',
      answer: 'Richardson operates a state-of-the-art Senior Center at 820 W. Arapaho Road (972-744-7800) for adults 55+ with classes, social events, and wellness programs. The city provides free van transportation for in-city trips for seniors. Richardson is served by the North Central Texas AAA and benefits from proximity to UT Southwestern Medical Center\'s geriatric programs, including the only ACE (Acute Care for Elders) unit in DFW.'
    },
  ],
  'Denton': [
    {
      question: 'What makes Denton unique for senior living?',
      answer: 'Denton offers an arts-focused senior community with maker culture. The Denton Senior Center (19,430 sq ft) features state-of-the-art fitness facilities, a woodshop, game room, and Aletha\'s Craft Store where seniors sell handmade items. As a university town (UNT and TWU), Denton has a vibrant cultural scene accessible to seniors. The North Central Texas AAA serves Denton County with benefits counseling and care coordination.'
    },
  ],
  'Mesquite': [
    {
      question: 'What senior resources are available in Mesquite?',
      answer: 'Mesquite offers a network of recreation centers serving seniors: Rutherford Recreation Center (900 Rutherford Dr.), Evans Recreation Center (1116 Hillcrest Dr.), and Goodbar Recreation Center (3000 Concord Dr.). The city is in Dallas County, served by the Dallas Area Agency on Aging and the Dallas County Aging & Disability Resource Center\'s Connect to Care online resource directory. East Dallas suburb pricing makes senior care more affordable than central Dallas.'
    },
  ],
  'Pasadena': [
    {
      question: 'What senior care options are available in Pasadena?',
      answer: 'Pasadena is a mature Houston suburb with established in-home care infrastructure. Multiple agencies serve the area including Memorial Home Health Care, Always Best Care, and Temporary Home Care (operating since 1988). Pasadena is in Harris County, served by the Harris County Area Agency on Aging (832-393-4301) and the Houston-Galveston Area Council AAA. In-home care costs tend to be more affordable than central Houston.'
    },
  ],
  'Sugar Land': [
    {
      question: 'What senior care is available in Sugar Land?',
      answer: 'Sugar Land is an affluent southwest Houston suburb with premium in-home care options including ABET Life, Always Best Care, and BrightStar Care. Fort Bend County has 18+ assisted living facilities with both standard and luxury price points. The area is served by the Houston-Galveston Area Council AAA. Sugar Land\'s professional demographic has driven demand for concierge-level aging services with higher staff-to-resident ratios.'
    },
  ],
  'The Woodlands': [
    {
      question: 'What luxury senior living options are in The Woodlands?',
      answer: 'The Woodlands is a premier retirement destination with resort-style senior living. Village at The Woodlands Waterway offers luxury independent living on the scenic waterway. Conservatory at Alden Bridge is an upscale 55+ community with fine dining, pool, and spa. Watermere at Woodlands Lakes features luxury 1-3 bedroom apartments with indoor pool. About 35% of The Woodlands\' population is 55+. The area is served by the Houston-Galveston Area Council AAA (Montgomery County satellite office in Conroe: 936-441-3200).'
    },
  ],
  'Katy': [
    {
      question: 'What senior living options are available in Katy?',
      answer: 'Katy offers a mix of affordable and upscale senior living in a planned suburban community. Options include Sunrise of Cinco Ranch (assisted living, memory care, respite), Atria Cinco Ranch (independent, assisted, memory care), and multiple in-home care agencies (BrightStar Care, Always Best Care, A Hug Away Healthcare). Katy is in Fort Bend County, served by the Houston-Galveston Area Council AAA. The suburban setting provides a quieter alternative to central Houston with strong community amenities.'
    },
  ],
  'Pearland': [
    {
      question: 'What senior care facilities are in Pearland?',
      answer: 'Pearland is a growing affluent suburb south of Houston with a mix of community programming and private senior living. Options include Serenity Pointe (licensed assisted living), The Reserve at Pearland, and Tuscany Village (121-bed skilled nursing). The Knapp Activity Center offers Parks & Recreation senior programs. Pearland is served by the Houston-Galveston Area Council AAA (Fort Bend County satellite in Richmond: 281-633-0519).'
    },
  ],
  'Baytown': [
    {
      question: 'What senior care is available in Baytown?',
      answer: 'Baytown has established nursing and rehabilitation infrastructure including Houston Methodist San Jacinto Hospital (30-bed nursing home unit) and Cedar Bayou Nursing and Rehab Center (125-bed facility at 2000 W Baker Rd). Multiple home health agencies serve the area including Memorial Home Health Care and Temporary Home Care (founded 1988). Baytown is in Harris County, served by the Houston-Galveston Area Council AAA.'
    },
  ],
  'League City': [
    {
      question: 'What senior living options are available in League City?',
      answer: 'League City has a strong senior care presence with 20 skilled nursing facilities and top independent living options including The Delaney at South Shore, Brookdale Clear Lake, and Discovery Village Clear Lake. Independent living averages about $3,990/month. The coastal-proximity suburban setting offers a relaxed environment with easy access to Houston Methodist\'s Clear Lake services. League City is in Galveston County, served by the Houston-Galveston Area Council AAA.'
    },
  ],
  'Round Rock': [
    {
      question: 'What senior services are available in Round Rock?',
      answer: 'Round Rock benefits from strong nonprofit aging services. AGE of Central Texas (512-255-4865, office at 475 Round Rock West Dr. #120) operates adult day health centers and provides care navigation. Senior Access offers free transportation for seniors in Round Rock and Pflugerville. The Area Agency on Aging of the Capital Area (855-937-2372) serves Williamson County with benefits counseling and Medicaid application assistance. Multiple in-home care providers (Seniors Helping Seniors, Senior Helpers) serve the area. Round Rock is part of the fast-growing Austin-Round Rock metro.'
    },
  ],
  'Georgetown': [
    {
      question: 'Why is Georgetown considered a top retirement destination in Texas?',
      answer: 'Georgetown has earned a reputation as a premier Texas retirement destination thanks to its cost of living (93% below the national average), low crime, vibrant small-town atmosphere centered on a historic town square, and access to San Gabriel River and Austin amenities 30 minutes south. Multiple luxury retirement communities serve the area including Grand Living at Georgetown, Touchmark (45+ years experience), NorthStar Georgetown (all-inclusive 55+), and The Oscar. Sun City Georgetown is one of Texas\'s best-known active adult communities. AGE of Central Texas operates a Georgetown office (512-614-6085) at 2425 Williams Drive.'
    },
  ],
  'Cedar Park': [
    {
      question: 'What senior services are developing in Cedar Park?',
      answer: 'Cedar Park is part of the fast-growing northwest Austin corridor with an emerging senior services infrastructure. The Wise Owls Initiative (founded 2020) operates a volunteer-driven senior center. In-home care providers like Seniors Helping Seniors Austin North and Senior Helpers serve the area. Cedar Park is in Williamson County, covered by the Area Agency on Aging of the Capital Area (855-937-2372). As the Austin metro continues rapid growth, new senior living communities are opening in the Cedar Park/Leander area.'
    },
  ],
  'San Marcos': [
    {
      question: 'What makes San Marcos unique for senior living?',
      answer: 'San Marcos is a college town (Texas State University) with a Hill Country setting that offers a unique blend of cultural and educational activities, excellent walkability (score of 75), and SMAT bus transit with senior shuttles. Assisted living costs run below the national average. The city has 26 senior living communities across all care types. Ascension Seton Hays and Central Texas Medical Center provide geriatric-focused healthcare. San Marcos is served by the Area Agency on Aging of the Capital Area (Hays County) and Texas STAR+PLUS Medicaid waiver services are available.'
    },
  ],
  'New Braunfels': [
    {
      question: 'What senior services are available in New Braunfels?',
      answer: 'New Braunfels has a strong community-based senior services foundation through the Comal County Senior Citizens Foundation (830-629-4547, 710 Landa St). This nonprofit provides 7,500+ home-delivered meals monthly, a fitness center ($15-25/month), pool and hot tub, wellness classes ($2-5 each), and home repair assistance. The Alamo Area Agency on Aging (866-231-4922) serves Comal County with benefits counseling and care coordination. Alamo Regional Transit provides curb-to-curb transportation across a 12-county region. New Braunfels\' Hill Country charm and low-cost programming make it an attractive aging-in-place community.'
    },
  ],
};

// ─── City-specific Resources ────────────────────────────────────────────────

interface CityResource {
  name: string;
  description: string;
  url?: string;
  phone?: string;
  category: 'government' | 'nonprofit' | 'health' | 'aging';
}

const STATEWIDE_RESOURCES: CityResource[] = [
  {
    name: 'Texas Health and Human Services Commission (HHSC)',
    description: 'State agency overseeing Medicaid, SNAP, and long-term care services. Search for licensed facilities and file complaints.',
    url: 'https://www.hhs.texas.gov/',
    category: 'government',
  },
  {
    name: 'Texas Department of Aging and Disability Services Hotline',
    description: 'Call 2-1-1 (or 877-541-7905) for help finding local senior services, benefits counseling, and caregiver support.',
    phone: '211',
    category: 'aging',
  },
  {
    name: 'Area Agency on Aging — Find Your Local Office',
    description: 'AAAs provide free benefits counseling, care coordination, and caregiver support. Texas has 28 regional AAA offices.',
    url: 'https://www.hhs.texas.gov/services/aging/long-term-care/area-agencies-aging',
    category: 'aging',
  },
  {
    name: 'Texas Long-Term Care Ombudsman',
    description: 'Free advocacy for residents of nursing homes, assisted living, and other long-term care facilities. File complaints and get help resolving concerns.',
    url: 'https://www.hhs.texas.gov/services/aging/long-term-care/long-term-care-ombudsman',
    phone: '800-458-9858',
    category: 'government',
  },
  {
    name: 'Benefits.gov — Texas Senior Benefits',
    description: 'Screen for federal and state benefit programs including Medicare, Medicaid, SSI, SNAP, and energy assistance.',
    url: 'https://www.benefits.gov/',
    category: 'government',
  },
];

const CITY_RESOURCES: Record<string, CityResource[]> = {
  'Houston': [
    { name: 'Harris County Area Agency on Aging', description: 'Free benefits counseling, caregiver support, and care coordination for Harris County seniors.', url: 'https://www.houstonhealth.org/services/aging', phone: '832-393-4301', category: 'aging' },
    { name: 'Houston-Galveston Area Council AAA', description: 'Regional aging services for 13 counties including Fort Bend, Montgomery, and Galveston.', url: 'https://www.h-gac.com/area-agency-on-aging', phone: '800-365-6131', category: 'aging' },
    { name: 'Interfaith Ministries — Meals on Wheels Houston', description: 'Delivers 3,600+ meals daily to homebound seniors in Harris and Galveston counties.', url: 'https://imgh.org/imhouston-meals-on-wheels/', category: 'nonprofit' },
    { name: 'Jewish Family Service of Houston', description: 'Mental health counseling, care management, and support groups for seniors and caregivers of all backgrounds.', url: 'https://www.jfshouston.org/', phone: '713-667-9336', category: 'nonprofit' },
    { name: 'Catholic Charities of Galveston-Houston', description: 'Guardianship, representative payee services, case management, and disaster recovery for seniors.', url: 'https://catholiccharities.org/', phone: '713-526-4611', category: 'nonprofit' },
    { name: 'Houston Methodist Hospital — Geriatric Medicine', description: 'Ranked #23 nationally for geriatrics. Comprehensive geriatric assessment, memory disorders program, and palliative care.', url: 'https://www.houstonmethodist.org/geriatrics/', category: 'health' },
    { name: 'Baylor College of Medicine — Geriatrics', description: 'Comprehensive geriatric assessment, long-term care, wound care, and medication education.', url: 'https://www.bcm.edu/healthcare/specialties/geriatrics-and-palliative-medicine', category: 'health' },
    { name: 'Michael E. DeBakey VA Medical Center', description: 'One of VA\'s largest hospitals, in the Texas Medical Center. Serves Harris County and 27 surrounding counties.', url: 'https://www.va.gov/houston-health-care/', category: 'health' },
    { name: 'Alzheimer\'s Association — Houston & Southeast Texas', description: 'Support groups, caregiver resources, and 24/7 helpline for Alzheimer\'s and dementia.', url: 'https://www.alz.org/texas', phone: '800-272-3900', category: 'nonprofit' },
  ],
  'Dallas': [
    { name: 'Dallas Area Agency on Aging', description: 'Home repairs, meal assistance, financial counseling, and care coordination for Dallas County seniors.', url: 'https://txregionalcouncil.org/agencies-on-aging/dallas-area-agency-on-aging/', category: 'aging' },
    { name: 'UT Southwestern — Wold Center for Geriatric Care', description: 'Ranked #20 nationally for geriatrics. Primary care for patients 70+, only ACE unit in DFW, home-based primary care (COVE).', url: 'https://utswmed.org/locations/seay/geriatric-care-clinic/', category: 'health' },
    { name: 'Dallas Regional Medical Center — Geriatric ER', description: 'First accredited geriatric emergency department in Dallas County with specially trained staff.', url: 'https://dallasregionalmedicalcenter.com/services/geriatric-emergency-department/', phone: '214-320-7000', category: 'health' },
    { name: 'Visiting Nurse Association of Texas (VNA) — Meals on Wheels', description: 'Home health, hospice, palliative care, and Meals on Wheels. Nonprofit serving Dallas for 50+ years.', url: 'https://www.vnatexas.org/for-providers/meals-on-wheels/', category: 'nonprofit' },
    { name: 'Jewish Family Service of Greater Dallas', description: 'Only kosher Meals on Wheels in North Texas. Memory care, counseling, and care management for all.', url: 'https://jfsdallas.org/', phone: '972-437-9950', category: 'nonprofit' },
    { name: 'Catholic Charities Dallas — Brady Senior Center', description: 'Social hub for adults 60+ with activities, meals, and community connections.', url: 'https://www.ccdallas.org/', phone: '817-877-1199', category: 'nonprofit' },
    { name: 'VA North Texas Health Care System', description: '853-bed system with Dallas VA Medical Center, Community Living Center with hospice unit, and Fisher House.', url: 'https://www.va.gov/north-texas-health-care/', category: 'health' },
    { name: 'Alzheimer\'s Association — Greater Dallas', description: 'Support groups, memory loss resources, and caregiver education.', phone: '800-272-3900', category: 'nonprofit' },
  ],
  'San Antonio': [
    { name: 'Bexar Area Agency on Aging (AACOG)', description: 'Free benefits counseling, care coordination, caregiver support, and ombudsman services for the Alamo region.', url: 'https://aacog.gov/who-we-serve/area-agencies-on-aging/', phone: '210-362-5200', category: 'aging' },
    { name: 'Meals on Wheels San Antonio', description: 'Delivers 4,000+ meals daily. Also operates Grace Place Alzheimer\'s Activity Centers.', url: 'https://www.mowsatx.org/', category: 'nonprofit' },
    { name: 'South Texas Veterans Health Care System (Audie L. Murphy VA)', description: 'Comprehensive geriatric care, Community Living Center, home-based primary care. Serves 84,000+ military retirees.', url: 'https://www.va.gov/south-texas-health-care/', category: 'health' },
    { name: 'University Health — Senior Services', description: 'Medicare information, annual wellness visits, and senior health programs.', url: 'https://www.universityhealth.com/services/senior-health', phone: '210-358-7477', category: 'health' },
    { name: 'Jewish Family Service San Antonio', description: 'Senior counseling, care management, and family support services.', url: 'https://jfs-sa.org/', phone: '210-302-6920', category: 'nonprofit' },
    { name: 'Alzheimer\'s Association — San Antonio & South Texas', description: 'Support groups, caregiver resources, and educational programs.', url: 'https://www.alz.org/sanantonio', phone: '210-822-6449', category: 'nonprofit' },
  ],
  'Austin': [
    { name: 'Area Agency on Aging of the Capital Area (CAPCOG)', description: 'Free benefits counseling, Medicaid applications, caregiver support for 10-county Capital Area.', url: 'https://www.capcog.org/divisions/area-agency-on-aging/adrc/', phone: '855-937-2372', category: 'aging' },
    { name: 'AGE of Central Texas', description: 'Adult day health centers, caregiver education, and care navigation for Travis, Williamson, and Hays counties.', url: 'https://www.ageofcentraltx.org/', category: 'nonprofit' },
    { name: 'Meals on Wheels Central Texas', description: '3,000+ meals daily. Also provides home repair, pet care, case management, and Alzheimer\'s programs.', url: 'https://www.mealsonwheelscentraltexas.org/', category: 'nonprofit' },
    { name: 'Dell Medical School — Geriatrics & Palliative Care', description: 'Teaching-quality geriatric care, geriatric psychiatry, and palliative medicine.', url: 'https://dellmed.utexas.edu/units/department-of-internal-medicine/division-of-geriatrics-and-palliative-care', category: 'health' },
    { name: 'Alzheimer\'s Texas (Central Texas)', description: 'Support programs, caregiver resources, and information services. Serving Central Texas since 1982.', phone: '512-241-0420', category: 'nonprofit' },
    { name: 'Austin Senior Services Hub', description: 'City of Austin\'s central information resource for senior services and programs.', url: 'https://www.austintexas.gov/health/austin-senior-services-hub', category: 'government' },
    { name: 'Central Texas Veterans Health Care System', description: 'Austin VA Clinic at 7901 Metropolis Drive. Primary care, mental health, and specialty care.', url: 'https://www.va.gov/central-texas-health-care/', phone: '800-423-2111', category: 'health' },
  ],
  'Fort Worth': [
    { name: 'Tarrant County Area Agency on Aging (United Way)', description: 'Free Medicare/Medicaid counseling, prescription assistance, long-term care planning, and advance directives. All services free.', url: 'https://www.unitedwaytarrant.org/what-we-do/area-agency-aging-aaa', phone: '817-258-8000', category: 'aging' },
    { name: 'Meals on Wheels of Tarrant County', description: 'Founded 1973. Delivers 1.1 million meals/year with professional case management.', url: 'https://mealsonwheels.org/', phone: '817-336-0912', category: 'nonprofit' },
    { name: 'James L. West Center for Dementia Care', description: 'Nationally recognized Alzheimer\'s and dementia care. Skilled nursing, short-term rehab, and senior day program.', url: 'https://www.jameslwest.org/', phone: '817-877-1199', category: 'health' },
    { name: 'WellBridge Fort Worth — Geriatric Behavioral Health', description: 'Full-service behavioral health hospital for seniors with 24-hour monitoring and therapy.', category: 'health' },
    { name: 'Tarrant County ADRC', description: 'Government assistance, counseling, and care coordination for seniors and disabled adults.', url: 'https://www.unitedwaytarrant.org/aging-disability-resource-center', phone: '888-730-2372', category: 'aging' },
    { name: 'VA North Texas — Fort Worth Clinic', description: 'Largest leased VA space in the U.S. Primary care, specialty health, imaging, women\'s health, and mental health.', url: 'https://www.va.gov/north-texas-health-care/', phone: '817-730-0000', category: 'health' },
  ],
  'El Paso': [
    { name: 'Rio Grande Area Agency on Aging', description: 'Bilingual benefits counseling, care coordination, health & wellness classes, and ombudsman program.', url: 'https://www.riocog.org/riogoc/aging-services/', phone: '915-533-0998', category: 'aging' },
    { name: 'Bienvivir — PACE Program', description: 'El Paso\'s only Program of All-Inclusive Care for the Elderly. Comprehensive community-based healthcare for 55+.', url: 'https://www.bienvivir.org/', category: 'health' },
    { name: 'UMC El Paso — Geriatrics Department', description: 'Multidisciplinary geriatric team with dementia evaluation, fall risk assessment, and palliative care.', url: 'https://www.umcelpaso.org/medical-services/department/geriatrics', category: 'health' },
    { name: 'Hospitals of Providence — Senior Health', description: 'Comprehensive elder care including Geriatric Behavioral Unit for mental health needs.', url: 'https://www.thehospitalsofprovidence.com/services/senior-health', category: 'health' },
    { name: 'El Paso County Senior Nutrition Program', description: '45+ years of service. 20 nutrition centers, home-delivered meals for 1,117+ homebound seniors, 1,000+ served daily.', url: 'https://www.epcounty.com/famcom/nutrition.htm', category: 'government' },
    { name: 'El Paso Health — STAR+PLUS', description: 'Local nonprofit Medicaid managed care. Bilingual services for El Paso and Hudspeth counties.', url: 'https://www.elpasohealth.com/starplus/', category: 'government' },
    { name: 'VA El Paso Health Care System', description: 'Multiple clinic locations. New hospital under construction (completion early 2028).', url: 'https://www.va.gov/el-paso-health-care/', phone: '915-564-6100', category: 'health' },
  ],
  'Arlington': [
    { name: 'North Central Texas Area Agency on Aging', description: 'Regional aging services for 13 counties including the DFW metroplex.', url: 'https://www.nctcog.org/aging-services', phone: '800-272-3921', category: 'aging' },
    { name: 'Meals on Wheels of Tarrant County — Arlington', description: 'Meal delivery for Arlington seniors. Sites at Most Blessed Sacrament Catholic Church and St. Mark\'s Episcopal.', url: 'https://mealsonwheels.org/', phone: '817-336-0912', category: 'nonprofit' },
    { name: 'Arlington Handitran', description: 'City transportation for seniors and disabled residents. $2 one-way or $55/month unlimited.', category: 'government' },
  ],
  'Corpus Christi': [
    { name: 'Coastal Bend AAA — Senior Centers', description: 'Operates 7 senior centers (Broadmoor, Ethel Eyerly, Garden, Greenwood, Northwest, Oveal Williams, Zavala) with meals and activities.', url: 'https://aaacoastalbend.org/', phone: '361-883-3935', category: 'aging' },
    { name: 'CHRISTUS Spohn Hospital — Geriatric Fellowship', description: 'ACGME-accredited geriatric fellowship program with trained geriatric physicians.', url: 'https://www.christushealth.org/', category: 'health' },
    { name: 'Dementia Friendly Corpus Christi', description: 'Community initiative promoting dementia awareness and support through the Coastal Bend Council of Governments.', url: 'https://coastalbendcog.org/aaa/about/dementia-friendly-corpus-christi', category: 'nonprofit' },
  ],
  'Plano': [
    { name: 'North Central Texas AAA (Collin County)', description: 'Benefits counseling, long-term care planning, and caregiver support for Collin County seniors.', url: 'https://www.nctcog.org/aging-services', phone: '888-730-2372', category: 'aging' },
    { name: 'Texas Health Presbyterian Plano — Senior Wellness', description: 'Senior Wellness Initiative with exercise classes and nutrition counseling.', url: 'https://www.texashealth.org/', phone: '972-424-7547', category: 'health' },
    { name: 'Plano Senior Recreation Center & Wellness Center', description: 'City-run centers with heated pool, water aerobics, health programs, and Senior Advisory Board.', category: 'government' },
  ],
  'Lubbock': [
    { name: 'South Plains Association of Governments AAA', description: 'Care coordination, homemaker services, adult day care, medical transportation, and emergency response.', url: 'https://www.spag.org/programs-services/area-agency-on-aging/', phone: '806-687-0940', category: 'aging' },
    { name: 'Grace Clinic Geriatric Care Center', description: 'Multidisciplinary geriatric team at Covenant Health System.', url: 'https://grace.covenanthealth.org/locations/grace-clinic/geriatric-care-center', phone: '806-725-4218', category: 'health' },
    { name: 'Covenant Health — SeniorCare Program', description: 'Free membership program for adults 60+ with health screenings and wellness benefits.', url: 'https://www.providence.org/locations/covenant-health/medical-center', category: 'health' },
    { name: 'Alzheimer\'s Association — West Texas', description: 'Support groups and caregiver resources for the Lubbock region.', url: 'https://www.alz.org/westtexas', phone: '800-272-3900', category: 'nonprofit' },
  ],
  'Laredo': [
    { name: 'South Texas Development Council AAA', description: 'Bilingual benefits counseling and care coordination for Webb, Jim Hogg, Starr, and Zapata counties.', url: 'https://stdc.cog.tx.us/area-agency-on-aging/', phone: '956-722-3995', category: 'aging' },
    { name: 'Border Area Nutrition Council (B.A.N.C.)', description: 'Serves seniors 60+ at 12 senior centers plus 3 rural centers with congregate meals.', url: 'https://stdc.cog.tx.us/border-area-nutrition-council-b-a-n-c/', category: 'nonprofit' },
    { name: 'Meals on Wheels — Webb County', description: 'Free home-delivered meals for homebound seniors in Webb County.', url: 'https://www.webbcountytx.gov/CommunityActionAgency/MealsonWheels/', category: 'nonprofit' },
    { name: 'Laredo Medical Center — Skilled Nursing', description: '5-star CMS rating. 18 skilled nursing beds with bilingual staff and physical/occupational therapy.', url: 'https://www.laredomedical.com/', category: 'health' },
  ],
  'Amarillo': [
    { name: 'Area Agency on Aging of the Panhandle', description: 'Services for 26 Panhandle counties: emergency response, adult day care, transportation, home repairs, and legal assistance.', url: 'https://theprpc.org/Programs/Aging/', phone: '806-372-3381', category: 'aging' },
    { name: 'Amarillo Meals on Wheels', description: 'Serves 360+ seniors daily with 450 volunteers. $4.75/meal with scholarships. Animeals pet food program.', url: 'https://amarillomealsonwheels.org/', phone: '806-374-1521', category: 'nonprofit' },
    { name: 'Northwest Texas Healthcare System', description: '495-bed teaching facility, lead trauma center for 26 Panhandle counties. 106 physicians across 45 specialties.', url: 'https://www.nwths.com/', category: 'health' },
  ],
  'Beaumont': [
    { name: 'Area Agency on Aging of Southeast Texas', description: 'Serves Hardin, Jasper, Jefferson, and Orange counties with benefits counseling and care coordination.', url: 'https://www.setrpc.org/area-agency-on-aging/', phone: '409-924-3381', category: 'aging' },
    { name: 'Baptist Hospitals — Senior Mental Health Program', description: 'Dedicated 20-bed geriatric mental health unit led by board-certified geriatric psychiatrist.', url: 'https://www.bhset.net/', phone: '409-212-5012', category: 'health' },
    { name: 'Nutrition & Services for Seniors (Meals on Wheels)', description: 'Since 1983: 18+ million meals delivered. Serves ~1,600 lunches/day in Jefferson and Hardin Counties. No means testing.', url: 'https://www.seniormeals.org/', phone: '409-892-4455', category: 'nonprofit' },
  ],
  'Brownsville': [
    { name: 'Lower Rio Grande Valley AAA', description: 'Bilingual benefits counseling and care coordination for Cameron, Hidalgo, and Willacy counties.', url: 'http://www.lrgvdc.org/aging.html', phone: '956-682-3481', category: 'aging' },
    { name: 'Amigos Del Valle — Nutrition & Meals on Wheels', description: 'Serves 4,000+ seniors daily across the Rio Grande Valley with congregate meals and home delivery.', url: 'https://advrgv.org/adv-nutrition-centers/', category: 'nonprofit' },
    { name: 'Valley Baptist Medical Center Brownsville', description: 'Operating since 1923. Geriatric Behavioral Health Unit with bilingual staff.', url: 'https://www.valleybaptist.net/locations/detail/vbmc-brownsville', phone: '956-544-1400', category: 'health' },
  ],
  'McAllen': [
    { name: 'Lower Rio Grande Valley AAA — McAllen Office', description: 'Senior center operations, congregate meals, home-delivered meals, and medical transportation.', url: 'http://www.lrgvdc.org/aging.html', phone: '956-682-3481', category: 'aging' },
    { name: 'Amigos Del Valle — McAllen', description: 'Congregate and home-delivery meal programs at 1100 E. Dallas Ave. Serves 4,000+ seniors daily in the RGV.', url: 'https://advrgv.org/adv-nutrition-centers/', category: 'nonprofit' },
    { name: 'South Texas Health System McAllen', description: 'Multiple geriatric medicine specialists. Regional medical hub for the Rio Grande Valley.', url: 'https://southtexashealthsystemmcallen.com/', category: 'health' },
  ],
  'Midland': [
    { name: 'Area Agency on Aging of the Permian Basin', description: 'Serves 17 Permian Basin counties with OAA-funded senior services.', url: 'https://aaapb.com/', phone: '432-563-1061', category: 'aging' },
    { name: 'Midland Memorial Hospital — Geriatric ER', description: 'Level 2 Geriatric Emergency Department Accreditation — highest-rated GEDA in the Permian Basin.', url: 'https://www.midlandhealth.org/main/services/elderly-care-891', category: 'health' },
  ],
  'Odessa': [
    { name: 'Area Agency on Aging of the Permian Basin', description: 'Serves 17 Permian Basin counties. Office at Midland International Air & Space Port.', url: 'https://aaapb.com/', phone: '432-563-1061', category: 'aging' },
    { name: 'Meals on Wheels of Odessa', description: 'Operating since 1977. Fresh weekday meals by registered dietitian, prepared by Odessa Regional Medical Center.', url: 'https://mowo.org/', category: 'nonprofit' },
  ],
  'Irving': [
    { name: 'Heritage Senior Center', description: 'City-run senior center at 200 S. Jefferson St with classes, trips, and social events.', url: 'https://irvingtx.gov/index.php?section=seniors', category: 'government' },
  ],
  'Garland': [
    { name: 'Garland Senior Activity Center & Carver Senior Center', description: 'Dual city-operated senior centers with activities, meal programs, and free weekday transportation for 60+.', url: 'https://www.garlandtx.gov/2068/Senior-Centers', category: 'government' },
  ],
  'Grand Prairie': [
    { name: 'Tarrant County Area Agency on Aging', description: 'Benefits counseling, Meals on Wheels, and caregiver support for Grand Prairie seniors.', url: 'https://www.unitedwaytarrant.org/what-we-do/area-agency-aging-aaa', phone: '817-258-8000', category: 'aging' },
  ],
  'McKinney': [
    { name: 'North Central Texas AAA (Collin County)', description: 'Benefits counseling, long-term care planning, and ADRC services for Collin County.', phone: '888-730-2372', category: 'aging' },
  ],
  'Frisco': [
    { name: 'North Central Texas AAA (Collin County)', description: 'Benefits counseling and aging services for Collin County residents.', phone: '888-730-2372', category: 'aging' },
  ],
  'Richardson': [
    { name: 'Richardson Senior Center', description: 'State-of-the-art facility at 820 W. Arapaho Rd for 55+. Free city van transportation for in-city trips.', url: 'https://www.cor.net/services/senior-services', phone: '972-744-7800', category: 'government' },
  ],
  'Carrollton': [
    { name: 'Carrollton Senior Center', description: '17,300 sq ft facility at 1720 Keller Springs Rd with lake views, ballroom, fitness, and monthly socials.', category: 'government' },
  ],
  'Denton': [
    { name: 'Denton Senior Center', description: '19,430 sq ft center with fitness, woodshop, game room, and Aletha\'s Craft Store for seniors to sell handmade items.', category: 'government' },
  ],
  'Mesquite': [
    { name: 'Dallas County ADRC — Connect to Care', description: 'Online resource directory and care coordination for Dallas County seniors.', url: 'https://www.dallascountyadrc.org/resource-directory', category: 'aging' },
  ],
  'Pasadena': [
    { name: 'Harris County Area Agency on Aging', description: 'Benefits counseling and care coordination for Harris County seniors including Pasadena.', url: 'https://www.houstonhealth.org/services/aging', phone: '832-393-4301', category: 'aging' },
  ],
  'Sugar Land': [
    { name: 'Houston-Galveston Area Council AAA (Fort Bend County)', description: 'Regional aging services for Fort Bend County including Sugar Land.', url: 'https://www.h-gac.com/area-agency-on-aging', phone: '800-365-6131', category: 'aging' },
  ],
  'The Woodlands': [
    { name: 'Houston-Galveston Area Council AAA (Montgomery County)', description: 'Regional aging services. Montgomery County satellite at 701 N. Loop 336 E, Suite 109, Conroe.', url: 'https://www.h-gac.com/area-agency-on-aging', phone: '936-441-3200', category: 'aging' },
  ],
  'Katy': [
    { name: 'Houston-Galveston Area Council AAA', description: 'Regional aging services for the greater Houston area including Katy.', url: 'https://www.h-gac.com/area-agency-on-aging', phone: '800-365-6131', category: 'aging' },
  ],
  'Pearland': [
    { name: 'Houston-Galveston Area Council AAA (Fort Bend Satellite)', description: 'Aging services for Fort Bend County. Richmond office: 281-633-0519.', url: 'https://www.h-gac.com/area-agency-on-aging', phone: '281-633-0519', category: 'aging' },
    { name: 'Knapp Activity Center — Senior Programs', description: 'Parks & Recreation senior programs for Pearland residents.', category: 'government' },
  ],
  'Baytown': [
    { name: 'Houston-Galveston Area Council AAA', description: 'Regional aging services for Harris County including Baytown.', url: 'https://www.h-gac.com/area-agency-on-aging', phone: '800-365-6131', category: 'aging' },
  ],
  'League City': [
    { name: 'Houston-Galveston Area Council AAA', description: 'Regional aging services for Galveston County including League City.', url: 'https://www.h-gac.com/area-agency-on-aging', phone: '800-365-6131', category: 'aging' },
  ],
  'Round Rock': [
    { name: 'AGE of Central Texas — Round Rock Office', description: 'Adult day health center, care navigation, and caregiver education at 475 Round Rock W. Dr. #120.', url: 'https://ageofcentraltx.org/', phone: '512-255-4865', category: 'nonprofit' },
    { name: 'Senior Access — Free Transportation', description: 'Free transportation for seniors in Round Rock and Pflugerville.', category: 'government' },
    { name: 'Area Agency on Aging of the Capital Area', description: 'Benefits counseling and Medicaid application assistance for Williamson County.', url: 'https://www.capcog.org/divisions/area-agency-on-aging/adrc/', phone: '855-937-2372', category: 'aging' },
  ],
  'Georgetown': [
    { name: 'AGE of Central Texas — Georgetown Office', description: 'Aging services at 2425 Williams Drive #103. Care navigation and caregiver support.', url: 'https://ageofcentraltx.org/', phone: '512-614-6085', category: 'nonprofit' },
    { name: 'Area Agency on Aging of the Capital Area', description: 'Benefits counseling for Williamson County seniors.', url: 'https://www.capcog.org/divisions/area-agency-on-aging/adrc/', phone: '855-937-2372', category: 'aging' },
  ],
  'Cedar Park': [
    { name: 'Area Agency on Aging of the Capital Area', description: 'Benefits counseling and services for Williamson County.', url: 'https://www.capcog.org/divisions/area-agency-on-aging/adrc/', phone: '855-937-2372', category: 'aging' },
  ],
  'San Marcos': [
    { name: 'Area Agency on Aging of the Capital Area', description: 'Benefits counseling and services for Hays County seniors.', url: 'https://www.capcog.org/divisions/area-agency-on-aging/adrc/', phone: '855-937-2372', category: 'aging' },
  ],
  'New Braunfels': [
    { name: 'Alamo Area Agency on Aging', description: 'Benefits counseling and care coordination for Comal County.', url: 'https://aacog.gov/who-we-serve/area-agencies-on-aging/', phone: '866-231-4922', category: 'aging' },
    { name: 'Comal County Senior Citizens Foundation', description: '7,500+ meals/month for homebound seniors. Fitness center ($15-25/mo), pool, wellness classes ($2-5). Home repair assistance.', url: 'https://www.nbsenior.org/', phone: '830-629-4547', category: 'nonprofit' },
    { name: 'Alamo Regional Transit', description: 'Curb-to-curb transportation for seniors across 12-county region including Comal County.', category: 'government' },
  ],
};

function getCityResources(cityName: string): CityResource[] {
  const citySpecific = CITY_RESOURCES[cityName] || [];
  return [...citySpecific, ...STATEWIDE_RESOURCES];
}

// ─── Static Params ──────────────────────────────────────────────────────────

export async function generateStaticParams() {
  try {
    const cities = await getDistinctCitiesByState('TX');
    return cities.map((city) => ({ city: cityToSlug(city) }));
  } catch {
    return MAJOR_TEXAS_CITIES.map((city) => ({ city: cityToSlug(city) }));
  }
}

// ─── Metadata ───────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: citySlug } = await params;
  const cityName = normalizeCityName(slugToCity(citySlug));

  return {
    title: `Senior Care in ${cityName}, Texas — Find & Compare Facilities (2026)`,
    description: `Find and compare senior care facilities in ${cityName}, TX. Browse nursing homes, assisted living, memory care, home health, hospice with ratings, costs, and Medicaid acceptance.`,
    openGraph: {
      title: `Senior Care in ${cityName}, Texas`,
      description: `Compare senior care facilities in ${cityName}, TX. Ratings, costs, and availability.`,
      type: 'website',
    },
  };
}

// ─── Page Component ─────────────────────────────────────────────────────────

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: citySlug } = await params;
  const cityName = normalizeCityName(slugToCity(citySlug));

  // 1. All facilities in this city
  const { data: facilities } = await supabase
    .from('facilities')
    .select('*')
    .eq('state', 'TX')
    .eq('is_active', true)
    .ilike('city', cityName)
    .order('facility_name');

  const allFacilities: Facility[] = (facilities as Facility[]) || [];

  // 2. Facility counts by type
  const facilityCounts = {
    nursing_home: 0,
    assisted_living: 0,
    memory_care: 0,
    home_health: 0,
    hospice: 0,
    adult_day: 0,
  };
  allFacilities.forEach((f) => {
    const type = f.facility_type as string;
    if (type in facilityCounts) {
      facilityCounts[type as keyof typeof facilityCounts]++;
    }
  });
  const totalFacilities = allFacilities.length;

  // 3. Cost data for the metro area
  const { data: costData } = await supabase
    .from('cost_of_care')
    .select('*')
    .eq('state_code', 'TX');

  const msaKey = CITY_TO_MSA[cityName];
  const stateRow = costData?.find((r: any) => r.level === 'state');
  const msaRows = costData?.filter((r: any) => r.level === 'msa') || [];

  const cityMsaRow = msaKey
    ? msaRows.find((row: any) => {
        const name = (row.area_name || row.full_name || '').toLowerCase();
        return name.includes(msaKey.toLowerCase());
      })
    : msaRows.find((row: any) => {
        const name = (row.area_name || row.full_name || '').toLowerCase();
        return name.includes(cityName.toLowerCase());
      });

  const costRow = cityMsaRow || stateRow || null;
  const costLabel = cityMsaRow
    ? (cityMsaRow.area_name || cityMsaRow.full_name || '').replace(/ Area$/, '')
    : 'Texas (State Average)';
  const isStateFallback = !cityMsaRow;

  // Compute cost values
  const nursingHomeSemiPrivate = costRow?.monthly_nursing_home_semi_private ?? null;
  const nursingHomePrivate = costRow?.monthly_nursing_home_private ?? null;
  const assistedLiving = costRow?.monthly_assisted_living ?? null;
  const memoryCare = assistedLiving ? Math.round(assistedLiving * 1.25) : null;
  const homeCare = costRow?.monthly_home_care_services ?? null;
  const homeHealthHourly = homeCare ? Math.round(homeCare / 160) : null;
  const adultDayCare = costRow?.monthly_adult_day_care ?? null;

  // 4. Nearby cities for cross-linking
  let otherCities: string[] = [];
  try {
    const allCities = await getDistinctCitiesByState('TX');
    otherCities = allCities
      .filter((c) => normalizeCityName(c) !== cityName)
      .slice(0, 10);
  } catch {
    otherCities = MAJOR_TEXAS_CITIES.filter((c) => c !== cityName).slice(0, 10);
  }

  // 5. Build FAQs
  const cityFaqs: FaqItem[] = [
    {
      question: `How many senior care facilities are in ${cityName}, Texas?`,
      answer: `${cityName} has ${formatNumber(totalFacilities)} senior care facilities, including ${facilityCounts.nursing_home} nursing homes, ${facilityCounts.assisted_living} assisted living communities, ${facilityCounts.home_health} home health agencies, ${facilityCounts.hospice} hospice providers${facilityCounts.adult_day > 0 ? `, and ${facilityCounts.adult_day} adult day care programs` : ''}. Use our filters above to browse by care type.`,
    },
    {
      question: `How much does senior care cost in ${cityName}?`,
      answer: costRow
        ? `Based on the ${costLabel} metro area, the median monthly cost of a semi-private nursing home room is ${formatDollars(nursingHomeSemiPrivate)}. Assisted living averages ${formatDollars(assistedLiving)}/month. Home health aide services average ${formatDollars(homeHealthHourly)}/hour. Costs vary by facility, level of care, and room type. Use our Cost Calculator for personalized estimates.`
        : `Senior care costs in ${cityName} vary by care type and level of service. Use our Cost Calculator for personalized estimates based on your zip code.`,
    },
    {
      question: `Does Medicaid cover senior care in ${cityName}, Texas?`,
      answer: `Texas Medicaid covers nursing home care for eligible individuals. For assisted living and home-based care, the STAR+PLUS Home and Community-Based Services (HCBS) waiver can help cover costs, though there is often a waitlist. Medicaid also covers some home health services. Use our Medicaid Eligibility Screener to check if your loved one may qualify.`,
    },
    {
      question: `How do I choose the right senior care facility in ${cityName}?`,
      answer: `Start by identifying the level of care needed — nursing homes provide 24/7 medical care, assisted living helps with daily activities, and home health brings services to you. Visit facilities in person, check CMS quality ratings (for nursing homes), ask about staff-to-resident ratios, review state inspection reports, and confirm insurance acceptance. Our Care Assessment tool can help you determine which type of care is the best fit.`,
    },
    {
      question: `Are there memory care options in ${cityName}, Texas?`,
      answer: facilityCounts.memory_care > 0
        ? `Yes, ${cityName} has ${facilityCounts.memory_care} facilities offering memory care for Alzheimer's and dementia. These provide specialized environments with trained staff, structured activities, and enhanced security. Look for facilities with HHSC Alzheimer's certification for Texas-specific quality standards.`
        : `While ${cityName} may have limited dedicated memory care facilities, some assisted living and nursing home communities in the area offer memory care wings or programs. Check with individual facilities about their dementia care capabilities, or search nearby cities for more options.`,
    },
    {
      question: `Does Medicare cover senior care in ${cityName}?`,
      answer: `Medicare covers short-term skilled nursing care (up to 100 days after a qualifying hospital stay), home health services if you're homebound and need skilled care, and hospice care. Medicare does NOT cover long-term custodial care, assisted living, or adult day care. Most families pay for these through private funds, long-term care insurance, or Medicaid.`,
    },
  ];

  const extraFaqs = CITY_EXTRA_FAQS[cityName] || [];
  const allFaqs = [...cityFaqs, ...extraFaqs];

  // 6. Resources
  const resources = getCityResources(cityName);
  const hasCitySpecificResources = (CITY_RESOURCES[cityName] || []).length > 0;

  // 7. Schema markup
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ourturntocare.org/' },
      { '@type': 'ListItem', position: 2, name: 'Texas', item: 'https://ourturntocare.org/texas' },
      { '@type': 'ListItem', position: 3, name: `Senior Care in ${cityName}` },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  const CARE_TYPE_LINKS = [
    { href: '/texas/nursing-homes', label: 'Nursing Homes' },
    { href: '/texas/assisted-living', label: 'Assisted Living' },
    { href: '/texas/memory-care', label: 'Memory Care' },
    { href: '/texas/home-health', label: 'Home Health' },
    { href: '/texas/hospice', label: 'Hospice' },
    { href: '/texas/adult-day-care', label: 'Adult Day Care' },
  ];

  return (
    <div className="bg-white">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-sm text-slate-600">
          <Link href="/" className="hover:text-teal-600">Home</Link>
          <span>/</span>
          <Link href="/texas" className="hover:text-teal-600">Texas</Link>
          <span>/</span>
          <span className="text-slate-900 font-medium">{cityName}</span>
        </nav>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-teal-50 to-slate-50 border-b border-slate-200 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Senior Care in {cityName}, Texas
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl">
            Find and compare {formatNumber(totalFacilities)} senior care facilities in {cityName}.
            Browse nursing homes, assisted living, memory care, home health, hospice, and adult day
            care options with ratings, costs, and availability.
          </p>
        </div>
      </div>

      {/* Stats Summary Bar */}
      {totalFacilities > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {facilityCounts.nursing_home > 0 && (
              <Link href="/texas/nursing-homes" className="text-center group">
                <div className="text-2xl font-bold text-teal-600 group-hover:text-teal-700">
                  {formatNumber(facilityCounts.nursing_home)}
                </div>
                <div className="text-sm text-gray-500">Nursing Homes</div>
              </Link>
            )}
            {facilityCounts.assisted_living > 0 && (
              <Link href="/texas/assisted-living" className="text-center group">
                <div className="text-2xl font-bold text-teal-600 group-hover:text-teal-700">
                  {formatNumber(facilityCounts.assisted_living)}
                </div>
                <div className="text-sm text-gray-500">Assisted Living</div>
              </Link>
            )}
            {facilityCounts.memory_care > 0 && (
              <Link href="/texas/memory-care" className="text-center group">
                <div className="text-2xl font-bold text-teal-600 group-hover:text-teal-700">
                  {formatNumber(facilityCounts.memory_care)}
                </div>
                <div className="text-sm text-gray-500">Memory Care</div>
              </Link>
            )}
            {facilityCounts.home_health > 0 && (
              <Link href="/texas/home-health" className="text-center group">
                <div className="text-2xl font-bold text-teal-600 group-hover:text-teal-700">
                  {formatNumber(facilityCounts.home_health)}
                </div>
                <div className="text-sm text-gray-500">Home Health</div>
              </Link>
            )}
            {facilityCounts.hospice > 0 && (
              <Link href="/texas/hospice" className="text-center group">
                <div className="text-2xl font-bold text-teal-600 group-hover:text-teal-700">
                  {formatNumber(facilityCounts.hospice)}
                </div>
                <div className="text-sm text-gray-500">Hospice</div>
              </Link>
            )}
            {facilityCounts.adult_day > 0 && (
              <Link href="/texas/adult-day-care" className="text-center group">
                <div className="text-2xl font-bold text-teal-600 group-hover:text-teal-700">
                  {formatNumber(facilityCounts.adult_day)}
                </div>
                <div className="text-sm text-gray-500">Adult Day Care</div>
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Care Type Filter + Facility Listings */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Facilities in {cityName}
          </h2>
          <CityFacilityFilter
            facilities={allFacilities}
            facilityCounts={facilityCounts}
            totalFacilities={totalFacilities}
          />
        </section>

        {/* Cost of Care Section */}
        {costRow && (
          <section className="mt-16 py-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Cost of Senior Care in {cityName} Metro Area
            </h2>
            {isStateFallback && (
              <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2 mb-4">
                State average shown. Costs in {cityName} may vary.
              </p>
            )}
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-slate-200">
                    <th className="py-3 pr-4 text-sm font-semibold text-slate-700">Care Type</th>
                    <th className="py-3 px-4 text-sm font-semibold text-slate-700 text-right">Monthly Cost</th>
                    <th className="py-3 pl-4 text-sm font-semibold text-slate-700 text-right">Annual Cost</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {nursingHomeSemiPrivate && (
                    <tr>
                      <td className="py-3 pr-4 text-sm text-slate-700">Nursing Home (Semi-Private)</td>
                      <td className="py-3 px-4 text-sm text-slate-900 font-medium text-right">{formatDollars(nursingHomeSemiPrivate)}</td>
                      <td className="py-3 pl-4 text-sm text-slate-600 text-right">{formatDollars(nursingHomeSemiPrivate * 12)}</td>
                    </tr>
                  )}
                  {nursingHomePrivate && (
                    <tr>
                      <td className="py-3 pr-4 text-sm text-slate-700">Nursing Home (Private)</td>
                      <td className="py-3 px-4 text-sm text-slate-900 font-medium text-right">{formatDollars(nursingHomePrivate)}</td>
                      <td className="py-3 pl-4 text-sm text-slate-600 text-right">{formatDollars(nursingHomePrivate * 12)}</td>
                    </tr>
                  )}
                  {assistedLiving && (
                    <tr>
                      <td className="py-3 pr-4 text-sm text-slate-700">Assisted Living</td>
                      <td className="py-3 px-4 text-sm text-slate-900 font-medium text-right">{formatDollars(assistedLiving)}</td>
                      <td className="py-3 pl-4 text-sm text-slate-600 text-right">{formatDollars(assistedLiving * 12)}</td>
                    </tr>
                  )}
                  {memoryCare && (
                    <tr>
                      <td className="py-3 pr-4 text-sm text-slate-700">Memory Care*</td>
                      <td className="py-3 px-4 text-sm text-slate-900 font-medium text-right">{formatDollars(memoryCare)}</td>
                      <td className="py-3 pl-4 text-sm text-slate-600 text-right">{formatDollars(memoryCare * 12)}</td>
                    </tr>
                  )}
                  {homeCare && (
                    <tr>
                      <td className="py-3 pr-4 text-sm text-slate-700">Home Care Services</td>
                      <td className="py-3 px-4 text-sm text-slate-900 font-medium text-right">{formatDollars(homeCare)}</td>
                      <td className="py-3 pl-4 text-sm text-slate-600 text-right">{formatDollars(homeCare * 12)}</td>
                    </tr>
                  )}
                  {adultDayCare && (
                    <tr>
                      <td className="py-3 pr-4 text-sm text-slate-700">Adult Day Health</td>
                      <td className="py-3 px-4 text-sm text-slate-900 font-medium text-right">{formatDollars(adultDayCare)}</td>
                      <td className="py-3 pl-4 text-sm text-slate-600 text-right">{formatDollars(adultDayCare * 12)}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="mt-4 space-y-1">
              {memoryCare && (
                <p className="text-xs text-slate-500">
                  *Memory care estimated at 25% premium over assisted living
                </p>
              )}
              <p className="text-xs text-slate-500">
                Source: CareScout/Genworth 2024 Cost of Care Survey
              </p>
            </div>
            <div className="mt-4">
              <Link
                href="/tools/cost-calculator"
                className="text-sm text-teal-600 hover:text-teal-700 font-medium hover:underline"
              >
                Get detailed cost estimates for your area →
              </Link>
            </div>
          </section>
        )}

        {/* FAQs */}
        <section className="mt-16 py-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Frequently Asked Questions About Senior Care in {cityName}
          </h2>
          <TexasFaqAccordion faqs={allFaqs} />
        </section>

        {/* Resources */}
        <section className="mt-16 py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Senior Care Resources {hasCitySpecificResources ? `in ${cityName}` : 'in Texas'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resources.map((resource, i) => (
              <div key={i} className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900">{resource.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{resource.description}</p>
                <div className="mt-2 flex gap-3">
                  {resource.url && (
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-teal-600 hover:underline"
                    >
                      Visit Website →
                    </a>
                  )}
                  {resource.phone && (
                    <a href={`tel:${resource.phone}`} className="text-sm text-teal-600 hover:underline">
                      {resource.phone}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Lead Capture Form */}
        <section className="mt-16 py-8">
          <StateCityLeadForm
            state="Texas"
            stateSlug="texas"
            city={cityName}
          />
        </section>

        {/* Cross-Links */}
        <section className="mt-12 py-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Explore Senior Care in Texas
          </h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {CARE_TYPE_LINKS.map((link, i) => (
              <React.Fragment key={link.href}>
                {i > 0 && <span className="text-gray-300">·</span>}
                <Link href={link.href} className="text-sm text-teal-600 hover:underline">
                  {link.label}
                </Link>
              </React.Fragment>
            ))}
          </div>
          <div className="flex flex-wrap gap-4 mb-6">
            <Link href="/texas" className="text-sm text-teal-600 hover:underline">
              ← Back to Senior Care in Texas
            </Link>
            <Link href="/tools/care-assessment" className="text-sm text-teal-600 hover:underline">
              Take Our Care Assessment →
            </Link>
            <Link href="/tools/cost-calculator" className="text-sm text-teal-600 hover:underline">
              Cost Calculator →
            </Link>
          </div>

          {/* Nearby Cities */}
          {otherCities.length > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">
                Nearby Cities
              </h4>
              <div className="flex flex-wrap gap-2">
                {otherCities.map((city) => (
                  <Link
                    key={city}
                    href={`/texas/${cityToSlug(city)}`}
                    className="text-sm text-teal-600 hover:underline bg-teal-50 px-3 py-1 rounded-full"
                  >
                    {normalizeCityName(city)}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
