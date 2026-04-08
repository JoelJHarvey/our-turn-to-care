/**
 * Facility Helper Functions
 * Shared utility functions for formatting, display labels, and data transformations
 */

/** Format phone number to (xxx) xxx-xxxx format */
export function formatPhoneNumber(phone: string | null | undefined): string {
  if (!phone) return '';
  const cleaned = phone.replace(/\D/g, '');
  const digits = cleaned.slice(-10);
  if (digits.length !== 10) return phone;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

/** Render star rating as filled/empty stars: "★★★☆☆" */
export function renderStarRating(rating: number | null | undefined): string {
  if (!rating || rating < 1 || rating > 5) return '';
  const roundedRating = Math.round(rating);
  return '★'.repeat(roundedRating) + '☆'.repeat(5 - roundedRating);
}

/** Get human-readable label for facility type */
export function getFacilityTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    nursing_home: 'Nursing Home',
    assisted_living: 'Assisted Living',
    home_health: 'Home Health',
    hospice: 'Hospice Care',
    adult_day: 'Adult Day Care',
  };
  return labels[type] || type;
}

/** Get detailed description of each care type */
export function getFacilityTypeDescription(type: string): string {
  const descriptions: Record<string, string> = {
    nursing_home:
      'Nursing homes provide 24/7 medical care, rehabilitation services, and daily living assistance for seniors with significant health needs. Licensed facilities offer medication management and skilled nursing services.',
    assisted_living:
      'Assisted living communities offer a balance of independence and support. Residents get help with daily activities like bathing and meals while maintaining privacy in their own apartments. No medical care is provided.',
    home_health:
      'Home health services bring medical and personal care to your home. Nurses, therapists, and aides visit to provide treatments, recovery services, and assistance after hospitalization.',
    hospice:
      'Hospice provides compassionate, comfort-focused care for people with terminal illnesses. The focus is on quality of life, pain management, and emotional support for both patients and families.',
    adult_day:
      'Adult day programs offer social activities, meals, and supervision during daytime hours. Ideal for seniors who live with family and need structured activities and peer interaction while caregivers work.',
  };
  return descriptions[type] || '';
}

/** Map care assessment recommendations to facility types */
export function getAssessmentToFacilityType(recommendation: string): string | null {
  const mapping: Record<string, string> = {
    nursing_home: 'nursing_home',
    'skilled nursing': 'nursing_home',
    'skilled nursing facility': 'nursing_home',
    snf: 'nursing_home',
    assisted_living: 'assisted_living',
    'assisted living': 'assisted_living',
    al: 'assisted_living',
    independent_living: 'assisted_living',
    'independent living': 'assisted_living',
    home_health: 'home_health',
    'home health': 'home_health',
    'home health care': 'home_health',
    hhc: 'home_health',
    hospice: 'hospice',
    'hospice care': 'hospice',
    'adult day care': 'adult_day',
    'adult day': 'adult_day',
    'adult day program': 'adult_day',
    adult_day: 'adult_day',
  };
  const normalized = recommendation.toLowerCase().trim();
  return mapping[normalized] || null;
}

/** URL-safe slug from city name: "San Antonio" -> "san-antonio" */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Convert slug back to title case: "san-antonio" -> "San Antonio" */
export function deslugify(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/** Get full state name from 2-letter code: "TX" -> "Texas" */
export function stateNameFromCode(code: string): string {
  const stateMap: Record<string, string> = {
    AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas',
    CA: 'California', CO: 'Colorado', CT: 'Connecticut', DE: 'Delaware',
    FL: 'Florida', GA: 'Georgia', HI: 'Hawaii', ID: 'Idaho',
    IL: 'Illinois', IN: 'Indiana', IA: 'Iowa', KS: 'Kansas',
    KY: 'Kentucky', LA: 'Louisiana', ME: 'Maine', MD: 'Maryland',
    MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota', MS: 'Mississippi',
    MO: 'Missouri', MT: 'Montana', NE: 'Nebraska', NV: 'Nevada',
    NH: 'New Hampshire', NJ: 'New Jersey', NM: 'New Mexico', NY: 'New York',
    NC: 'North Carolina', ND: 'North Dakota', OH: 'Ohio', OK: 'Oklahoma',
    OR: 'Oregon', PA: 'Pennsylvania', RI: 'Rhode Island', SC: 'South Carolina',
    SD: 'South Dakota', TN: 'Tennessee', TX: 'Texas', UT: 'Utah',
    VT: 'Vermont', VA: 'Virginia', WA: 'Washington', WV: 'West Virginia',
    WI: 'Wisconsin', WY: 'Wyoming',
  };
  return stateMap[code.toUpperCase()] || code;
}

/** Get 2-letter state code from full name: "Texas" -> "TX" */
export function stateCodeFromName(name: string): string | null {
  const reverseMap: Record<string, string> = {
    alabama: 'AL', alaska: 'AK', arizona: 'AZ', arkansas: 'AR',
    california: 'CA', colorado: 'CO', connecticut: 'CT', delaware: 'DE',
    florida: 'FL', georgia: 'GA', hawaii: 'HI', idaho: 'ID',
    illinois: 'IL', indiana: 'IN', iowa: 'IA', kansas: 'KS',
    kentucky: 'KY', louisiana: 'LA', maine: 'ME', maryland: 'MD',
    massachusetts: 'MA', michigan: 'MI', minnesota: 'MN', mississippi: 'MS',
    missouri: 'MO', montana: 'MT', nebraska: 'NE', nevada: 'NV',
    newhampshire: 'NH', newjersey: 'NJ', newmexico: 'NM', newyork: 'NY',
    northcarolina: 'NC', northdakota: 'ND', ohio: 'OH', oklahoma: 'OK',
    oregon: 'OR', pennsylvania: 'PA', rhodeisland: 'RI', southcarolina: 'SC',
    southdakota: 'SD', tennessee: 'TN', texas: 'TX', utah: 'UT',
    vermont: 'VT', virginia: 'VA', washington: 'WA', westvirginia: 'WV',
    wisconsin: 'WI', wyoming: 'WY',
  };
  const normalized = name.toLowerCase().replace(/\s/g, '');
  return reverseMap[normalized] || null;
}

/** Priority states for launch */
export const PRIORITY_STATES = [
  { code: 'TX', name: 'Texas' },
  { code: 'CA', name: 'California' },
  { code: 'FL', name: 'Florida' },
  { code: 'NY', name: 'New York' },
  { code: 'IL', name: 'Illinois' },
];

/** Major Texas cities (fallback for static generation) */
export const MAJOR_TEXAS_CITIES = [
  'Houston', 'Dallas', 'Austin', 'San Antonio', 'Fort Worth',
  'El Paso', 'Arlington', 'Corpus Christi', 'Plano', 'Garland',
  'Laredo', 'Irving', 'Lubbock', 'Brownsville', 'Frisco',
  'McKinney', 'Amarillo', 'Beaumont', 'Midland',
];

/** Deficiency severity level */
export function getDeficiencyLevel(count: number | null | undefined): 'none' | 'low' | 'medium' | 'high' {
  if (!count) return 'none';
  if (count <= 2) return 'low';
  if (count <= 5) return 'medium';
  return 'high';
}

/** Format bed count with singular/plural */
export function formatBedCount(count: number | null | undefined): string {
  if (!count) return '';
  return count === 1 ? '1 bed' : `${count} beds`;
}

/** Data source label and credibility */
export function getSourceLabel(source: string): { label: string; credibility: string } {
  const sourceInfo: Record<string, { label: string; credibility: string }> = {
    cms_nursing: { label: 'CMS Data', credibility: 'cms' },
    cms_home_health: { label: 'CMS Data', credibility: 'cms' },
    cms_hospice: { label: 'CMS Data', credibility: 'cms' },
    state_tx: { label: 'Texas Health & Human Services', credibility: 'state' },
    state_ca: { label: 'California State Health', credibility: 'state' },
    state_ny: { label: 'New York State', credibility: 'state' },
    state_fl: { label: 'Florida State Health', credibility: 'state' },
    github_al: { label: 'Community Data', credibility: 'community' },
  };
  return sourceInfo[source] || { label: 'Facility Data', credibility: 'unknown' };
}
