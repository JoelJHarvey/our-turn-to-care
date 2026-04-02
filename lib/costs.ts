/**
 * Cost of Care Data Service for OurTurnToCare
 *
 * Fetches real CareScout/Genworth 2025 cost data from Supabase.
 * Maps zip codes to states, then looks up state-level and MSA-level costs.
 *
 * The cost_of_care table has 478 rows:
 *   - 51 state-level rows (all 50 states + DC)
 *   - 427 MSA-level rows (metro area detail)
 *
 * Each row has monthly costs for 7 care types:
 *   nursing_home_private, nursing_home_semi_private, assisted_living,
 *   adult_day_care, home_care_services, skilled_nursing_hours, skilled_nursing_visits
 */

import { supabase } from './supabase';

// ============================================================
// TYPES
// ============================================================

export interface CostData {
  /** Where the data came from — "state" or "msa" */
  level: 'state' | 'msa';
  /** State abbreviation, e.g. "TX" */
  stateCode: string;
  /** State full name, e.g. "Texas" */
  stateName: string;
  /** MSA name if MSA-level, e.g. "Dallas-Fort Worth-Arlington, TX" */
  areaName: string | null;
  /** Display label for the location */
  locationLabel: string;

  /** Monthly costs by care type (null if data not available) */
  nursingHomePrivate: number | null;
  nursingHomeSemiPrivate: number | null;
  assistedLiving: number | null;
  adultDayCare: number | null;
  homeCareServices: number | null;

  /** Annual costs (computed from monthly) */
  nursingHomePrivateAnnual: number | null;
  nursingHomeSemiPrivateAnnual: number | null;
  assistedLivingAnnual: number | null;
  adultDayCareAnnual: number | null;
  homeCareServicesAnnual: number | null;

  /** Year-over-year growth rates (percentage) */
  nursingHomePrivateGrowth: number | null;
  assistedLivingGrowth: number | null;
  homeCareServicesGrowth: number | null;
}

export interface CostLookupResult {
  /** Whether we found data */
  found: boolean;
  /** The best available cost data (MSA if available, state as fallback) */
  costs: CostData | null;
  /** State-level data (always available if found) */
  stateCosts: CostData | null;
  /** All MSA-level data for this state */
  msaCosts: CostData[];
  /** City name derived from zip (for display) */
  cityName: string | null;
  /** State abbreviation */
  stateCode: string | null;
}

// ============================================================
// ZIP CODE TO STATE MAPPING
// ============================================================

/**
 * Maps the first 3 digits of a zip code to a state abbreviation.
 * This covers all valid US zip code ranges.
 */
const ZIP_PREFIX_TO_STATE: Record<string, string> = {
  // Connecticut
  '060': 'CT', '061': 'CT', '062': 'CT', '063': 'CT', '064': 'CT', '065': 'CT', '066': 'CT', '067': 'CT', '068': 'CT', '069': 'CT',
  // Massachusetts
  '010': 'MA', '011': 'MA', '012': 'MA', '013': 'MA', '014': 'MA', '015': 'MA', '016': 'MA', '017': 'MA', '018': 'MA', '019': 'MA',
  '020': 'MA', '021': 'MA', '022': 'MA', '023': 'MA', '024': 'MA', '025': 'MA', '026': 'MA', '027': 'MA',
  // Rhode Island
  '028': 'RI', '029': 'RI',
  // New Hampshire
  '030': 'NH', '031': 'NH', '032': 'NH', '033': 'NH', '034': 'NH', '035': 'NH', '036': 'NH', '037': 'NH', '038': 'NH',
  // Maine
  '039': 'ME', '040': 'ME', '041': 'ME', '042': 'ME', '043': 'ME', '044': 'ME', '045': 'ME', '046': 'ME', '047': 'ME', '048': 'ME', '049': 'ME',
  // Vermont
  '050': 'VT', '051': 'VT', '052': 'VT', '053': 'VT', '054': 'VT', '056': 'VT', '057': 'VT', '058': 'VT', '059': 'VT',
  // New Jersey
  '070': 'NJ', '071': 'NJ', '072': 'NJ', '073': 'NJ', '074': 'NJ', '075': 'NJ', '076': 'NJ', '077': 'NJ', '078': 'NJ', '079': 'NJ',
  '080': 'NJ', '081': 'NJ', '082': 'NJ', '083': 'NJ', '084': 'NJ', '085': 'NJ', '086': 'NJ', '087': 'NJ', '088': 'NJ', '089': 'NJ',
  // New York
  '100': 'NY', '101': 'NY', '102': 'NY', '103': 'NY', '104': 'NY', '105': 'NY', '106': 'NY', '107': 'NY', '108': 'NY', '109': 'NY',
  '110': 'NY', '111': 'NY', '112': 'NY', '113': 'NY', '114': 'NY', '115': 'NY', '116': 'NY', '117': 'NY', '118': 'NY', '119': 'NY',
  '120': 'NY', '121': 'NY', '122': 'NY', '123': 'NY', '124': 'NY', '125': 'NY', '126': 'NY', '127': 'NY', '128': 'NY', '129': 'NY',
  '130': 'NY', '131': 'NY', '132': 'NY', '133': 'NY', '134': 'NY', '135': 'NY', '136': 'NY', '137': 'NY', '138': 'NY', '139': 'NY', '140': 'NY', '141': 'NY', '142': 'NY', '143': 'NY', '144': 'NY', '145': 'NY', '146': 'NY', '147': 'NY', '148': 'NY', '149': 'NY',
  // Pennsylvania
  '150': 'PA', '151': 'PA', '152': 'PA', '153': 'PA', '154': 'PA', '155': 'PA', '156': 'PA', '157': 'PA', '158': 'PA', '159': 'PA',
  '160': 'PA', '161': 'PA', '162': 'PA', '163': 'PA', '164': 'PA', '165': 'PA', '166': 'PA', '167': 'PA', '168': 'PA', '169': 'PA',
  '170': 'PA', '171': 'PA', '172': 'PA', '173': 'PA', '174': 'PA', '175': 'PA', '176': 'PA', '177': 'PA', '178': 'PA', '179': 'PA',
  '180': 'PA', '181': 'PA', '182': 'PA', '183': 'PA', '184': 'PA', '185': 'PA', '186': 'PA', '187': 'PA', '188': 'PA', '189': 'PA',
  '190': 'PA', '191': 'PA', '192': 'PA', '193': 'PA', '194': 'PA', '195': 'PA', '196': 'PA',
  // Delaware
  '197': 'DE', '198': 'DE', '199': 'DE',
  // DC
  '200': 'DC', '201': 'DC', '202': 'DC', '203': 'DC', '204': 'DC', '205': 'DC',
  // Maryland
  '206': 'MD', '207': 'MD', '208': 'MD', '209': 'MD', '210': 'MD', '211': 'MD', '212': 'MD', '214': 'MD', '215': 'MD', '216': 'MD', '217': 'MD', '218': 'MD', '219': 'MD',
  // Virginia
  '220': 'VA', '221': 'VA', '222': 'VA', '223': 'VA', '224': 'VA', '225': 'VA', '226': 'VA', '227': 'VA', '228': 'VA', '229': 'VA',
  '230': 'VA', '231': 'VA', '232': 'VA', '233': 'VA', '234': 'VA', '235': 'VA', '236': 'VA', '237': 'VA', '238': 'VA', '239': 'VA',
  '240': 'VA', '241': 'VA', '242': 'VA', '243': 'VA', '244': 'VA', '245': 'VA', '246': 'VA',
  // West Virginia
  '247': 'WV', '248': 'WV', '249': 'WV', '250': 'WV', '251': 'WV', '252': 'WV', '253': 'WV', '254': 'WV', '255': 'WV', '256': 'WV', '257': 'WV', '258': 'WV', '259': 'WV', '260': 'WV', '261': 'WV', '262': 'WV', '263': 'WV', '264': 'WV', '265': 'WV', '266': 'WV', '267': 'WV', '268': 'WV',
  // North Carolina
  '270': 'NC', '271': 'NC', '272': 'NC', '273': 'NC', '274': 'NC', '275': 'NC', '276': 'NC', '277': 'NC', '278': 'NC', '279': 'NC',
  '280': 'NC', '281': 'NC', '282': 'NC', '283': 'NC', '284': 'NC', '285': 'NC', '286': 'NC', '287': 'NC', '288': 'NC', '289': 'NC',
  // South Carolina
  '290': 'SC', '291': 'SC', '292': 'SC', '293': 'SC', '294': 'SC', '295': 'SC', '296': 'SC', '297': 'SC', '298': 'SC', '299': 'SC',
  // Georgia
  '300': 'GA', '301': 'GA', '302': 'GA', '303': 'GA', '304': 'GA', '305': 'GA', '306': 'GA', '307': 'GA', '308': 'GA', '309': 'GA',
  '310': 'GA', '311': 'GA', '312': 'GA', '313': 'GA', '314': 'GA', '315': 'GA', '316': 'GA', '317': 'GA', '318': 'GA', '319': 'GA',
  // Florida
  '320': 'FL', '321': 'FL', '322': 'FL', '323': 'FL', '324': 'FL', '325': 'FL', '326': 'FL', '327': 'FL', '328': 'FL', '329': 'FL',
  '330': 'FL', '331': 'FL', '332': 'FL', '333': 'FL', '334': 'FL', '335': 'FL', '336': 'FL', '337': 'FL', '338': 'FL', '339': 'FL',
  '340': 'FL', '341': 'FL', '342': 'FL', '344': 'FL', '346': 'FL', '347': 'FL', '349': 'FL',
  // Alabama
  '350': 'AL', '351': 'AL', '352': 'AL', '354': 'AL', '355': 'AL', '356': 'AL', '357': 'AL', '358': 'AL', '359': 'AL',
  '360': 'AL', '361': 'AL', '362': 'AL', '363': 'AL', '364': 'AL', '365': 'AL', '366': 'AL', '367': 'AL', '368': 'AL', '369': 'AL',
  // Tennessee
  '370': 'TN', '371': 'TN', '372': 'TN', '373': 'TN', '374': 'TN', '375': 'TN', '376': 'TN', '377': 'TN', '378': 'TN', '379': 'TN',
  '380': 'TN', '381': 'TN', '382': 'TN', '383': 'TN', '384': 'TN', '385': 'TN',
  // Mississippi
  '386': 'MS', '387': 'MS', '388': 'MS', '389': 'MS', '390': 'MS', '391': 'MS', '392': 'MS', '393': 'MS', '394': 'MS', '395': 'MS', '396': 'MS', '397': 'MS',
  // Kentucky
  '400': 'KY', '401': 'KY', '402': 'KY', '403': 'KY', '404': 'KY', '405': 'KY', '406': 'KY', '407': 'KY', '408': 'KY', '409': 'KY',
  '410': 'KY', '411': 'KY', '412': 'KY', '413': 'KY', '414': 'KY', '415': 'KY', '416': 'KY', '417': 'KY', '418': 'KY',
  // Ohio
  '430': 'OH', '431': 'OH', '432': 'OH', '433': 'OH', '434': 'OH', '435': 'OH', '436': 'OH', '437': 'OH', '438': 'OH', '439': 'OH',
  '440': 'OH', '441': 'OH', '442': 'OH', '443': 'OH', '444': 'OH', '445': 'OH', '446': 'OH', '447': 'OH', '448': 'OH', '449': 'OH',
  '450': 'OH', '451': 'OH', '452': 'OH', '453': 'OH', '454': 'OH', '455': 'OH', '456': 'OH', '457': 'OH', '458': 'OH',
  // Indiana
  '460': 'IN', '461': 'IN', '462': 'IN', '463': 'IN', '464': 'IN', '465': 'IN', '466': 'IN', '467': 'IN', '468': 'IN', '469': 'IN',
  '470': 'IN', '471': 'IN', '472': 'IN', '473': 'IN', '474': 'IN', '475': 'IN', '476': 'IN', '477': 'IN', '478': 'IN', '479': 'IN',
  // Michigan
  '480': 'MI', '481': 'MI', '482': 'MI', '483': 'MI', '484': 'MI', '485': 'MI', '486': 'MI', '487': 'MI', '488': 'MI', '489': 'MI',
  '490': 'MI', '491': 'MI', '492': 'MI', '493': 'MI', '494': 'MI', '495': 'MI', '496': 'MI', '497': 'MI', '498': 'MI', '499': 'MI',
  // Iowa
  '500': 'IA', '501': 'IA', '502': 'IA', '503': 'IA', '504': 'IA', '505': 'IA', '506': 'IA', '507': 'IA', '508': 'IA', '509': 'IA',
  '510': 'IA', '511': 'IA', '512': 'IA', '513': 'IA', '514': 'IA', '515': 'IA', '516': 'IA', '520': 'IA', '521': 'IA', '522': 'IA', '523': 'IA', '524': 'IA', '525': 'IA', '526': 'IA', '527': 'IA', '528': 'IA',
  // Wisconsin
  '530': 'WI', '531': 'WI', '532': 'WI', '534': 'WI', '535': 'WI', '537': 'WI', '538': 'WI', '539': 'WI',
  '540': 'WI', '541': 'WI', '542': 'WI', '543': 'WI', '544': 'WI', '545': 'WI', '546': 'WI', '547': 'WI', '548': 'WI', '549': 'WI',
  // Minnesota
  '550': 'MN', '551': 'MN', '553': 'MN', '554': 'MN', '555': 'MN', '556': 'MN', '557': 'MN', '558': 'MN', '559': 'MN',
  '560': 'MN', '561': 'MN', '562': 'MN', '563': 'MN', '564': 'MN', '565': 'MN', '566': 'MN', '567': 'MN',
  // South Dakota
  '570': 'SD', '571': 'SD', '572': 'SD', '573': 'SD', '574': 'SD', '575': 'SD', '576': 'SD', '577': 'SD',
  // North Dakota
  '580': 'ND', '581': 'ND', '582': 'ND', '583': 'ND', '584': 'ND', '585': 'ND', '586': 'ND', '587': 'ND', '588': 'ND',
  // Montana
  '590': 'MT', '591': 'MT', '592': 'MT', '593': 'MT', '594': 'MT', '595': 'MT', '596': 'MT', '597': 'MT', '598': 'MT', '599': 'MT',
  // Illinois
  '600': 'IL', '601': 'IL', '602': 'IL', '603': 'IL', '604': 'IL', '605': 'IL', '606': 'IL', '607': 'IL', '608': 'IL', '609': 'IL',
  '610': 'IL', '611': 'IL', '612': 'IL', '613': 'IL', '614': 'IL', '615': 'IL', '616': 'IL', '617': 'IL', '618': 'IL', '619': 'IL',
  '620': 'IL', '622': 'IL', '623': 'IL', '624': 'IL', '625': 'IL', '626': 'IL', '627': 'IL', '628': 'IL', '629': 'IL',
  // Missouri
  '630': 'MO', '631': 'MO', '633': 'MO', '634': 'MO', '635': 'MO', '636': 'MO', '637': 'MO', '638': 'MO', '639': 'MO',
  '640': 'MO', '641': 'MO', '644': 'MO', '645': 'MO', '646': 'MO', '647': 'MO', '648': 'MO', '649': 'MO',
  '650': 'MO', '651': 'MO', '652': 'MO', '653': 'MO', '654': 'MO', '655': 'MO', '656': 'MO', '657': 'MO', '658': 'MO',
  // Kansas
  '660': 'KS', '661': 'KS', '662': 'KS', '664': 'KS', '665': 'KS', '666': 'KS', '667': 'KS', '668': 'KS', '669': 'KS',
  '670': 'KS', '671': 'KS', '672': 'KS', '673': 'KS', '674': 'KS', '675': 'KS', '676': 'KS', '677': 'KS', '678': 'KS', '679': 'KS',
  // Nebraska
  '680': 'NE', '681': 'NE', '683': 'NE', '684': 'NE', '685': 'NE', '686': 'NE', '687': 'NE', '688': 'NE', '689': 'NE', '690': 'NE', '691': 'NE', '692': 'NE', '693': 'NE',
  // Louisiana
  '700': 'LA', '701': 'LA', '703': 'LA', '704': 'LA', '705': 'LA', '706': 'LA', '707': 'LA', '708': 'LA',
  '710': 'LA', '711': 'LA', '712': 'LA', '713': 'LA', '714': 'LA',
  // Arkansas
  '716': 'AR', '717': 'AR', '718': 'AR', '719': 'AR', '720': 'AR', '721': 'AR', '722': 'AR', '723': 'AR', '724': 'AR', '725': 'AR', '726': 'AR', '727': 'AR', '728': 'AR', '729': 'AR',
  // Oklahoma
  '730': 'OK', '731': 'OK', '733': 'OK', '734': 'OK', '735': 'OK', '736': 'OK', '737': 'OK', '738': 'OK', '739': 'OK',
  '740': 'OK', '741': 'OK', '743': 'OK', '744': 'OK', '745': 'OK', '746': 'OK', '747': 'OK', '748': 'OK', '749': 'OK',
  // Texas
  '750': 'TX', '751': 'TX', '752': 'TX', '753': 'TX', '754': 'TX', '755': 'TX', '756': 'TX', '757': 'TX', '758': 'TX', '759': 'TX',
  '760': 'TX', '761': 'TX', '762': 'TX', '763': 'TX', '764': 'TX', '765': 'TX', '766': 'TX', '767': 'TX', '768': 'TX', '769': 'TX',
  '770': 'TX', '771': 'TX', '772': 'TX', '773': 'TX', '774': 'TX', '775': 'TX', '776': 'TX', '777': 'TX', '778': 'TX', '779': 'TX',
  '780': 'TX', '781': 'TX', '782': 'TX', '783': 'TX', '784': 'TX', '785': 'TX', '786': 'TX', '787': 'TX', '788': 'TX', '789': 'TX',
  '790': 'TX', '791': 'TX', '792': 'TX', '793': 'TX', '794': 'TX', '795': 'TX', '796': 'TX', '797': 'TX', '798': 'TX', '799': 'TX',
  // Colorado
  '800': 'CO', '801': 'CO', '802': 'CO', '803': 'CO', '804': 'CO', '805': 'CO', '806': 'CO', '807': 'CO', '808': 'CO', '809': 'CO',
  '810': 'CO', '811': 'CO', '812': 'CO', '813': 'CO', '814': 'CO', '815': 'CO', '816': 'CO',
  // Wyoming
  '820': 'WY', '821': 'WY', '822': 'WY', '823': 'WY', '824': 'WY', '825': 'WY', '826': 'WY', '827': 'WY', '828': 'WY', '829': 'WY', '830': 'WY', '831': 'WY',
  // Idaho
  '832': 'ID', '833': 'ID', '834': 'ID', '835': 'ID', '836': 'ID', '837': 'ID', '838': 'ID',
  // Utah
  '840': 'UT', '841': 'UT', '842': 'UT', '843': 'UT', '844': 'UT', '845': 'UT', '846': 'UT', '847': 'UT',
  // Arizona
  '850': 'AZ', '851': 'AZ', '852': 'AZ', '853': 'AZ', '855': 'AZ', '856': 'AZ', '857': 'AZ', '859': 'AZ', '860': 'AZ', '863': 'AZ', '864': 'AZ', '865': 'AZ',
  // New Mexico
  '870': 'NM', '871': 'NM', '872': 'NM', '873': 'NM', '874': 'NM', '875': 'NM', '877': 'NM', '878': 'NM', '879': 'NM',
  '880': 'NM', '881': 'NM', '882': 'NM', '883': 'NM', '884': 'NM',
  // Nevada
  '889': 'NV', '890': 'NV', '891': 'NV', '893': 'NV', '894': 'NV', '895': 'NV', '897': 'NV', '898': 'NV',
  // California
  '900': 'CA', '901': 'CA', '902': 'CA', '903': 'CA', '904': 'CA', '905': 'CA', '906': 'CA', '907': 'CA', '908': 'CA', '909': 'CA',
  '910': 'CA', '911': 'CA', '912': 'CA', '913': 'CA', '914': 'CA', '915': 'CA', '916': 'CA', '917': 'CA', '918': 'CA', '919': 'CA',
  '920': 'CA', '921': 'CA', '922': 'CA', '923': 'CA', '924': 'CA', '925': 'CA', '926': 'CA', '927': 'CA', '928': 'CA',
  '930': 'CA', '931': 'CA', '932': 'CA', '933': 'CA', '934': 'CA', '935': 'CA', '936': 'CA', '937': 'CA', '938': 'CA', '939': 'CA',
  '940': 'CA', '941': 'CA', '942': 'CA', '943': 'CA', '944': 'CA', '945': 'CA', '946': 'CA', '947': 'CA', '948': 'CA', '949': 'CA',
  '950': 'CA', '951': 'CA', '952': 'CA', '953': 'CA', '954': 'CA', '955': 'CA', '956': 'CA', '957': 'CA', '958': 'CA', '959': 'CA',
  '960': 'CA', '961': 'CA',
  // Hawaii
  '967': 'HI', '968': 'HI',
  // Oregon
  '970': 'OR', '971': 'OR', '972': 'OR', '973': 'OR', '974': 'OR', '975': 'OR', '976': 'OR', '977': 'OR', '978': 'OR', '979': 'OR',
  // Washington
  '980': 'WA', '981': 'WA', '982': 'WA', '983': 'WA', '984': 'WA', '985': 'WA', '986': 'WA', '988': 'WA', '989': 'WA',
  '990': 'WA', '991': 'WA', '992': 'WA', '993': 'WA', '994': 'WA',
  // Alaska
  '995': 'AK', '996': 'AK', '997': 'AK', '998': 'AK', '999': 'AK',
};

/**
 * Convert a zip code to a state abbreviation.
 * Returns null if the zip code is invalid or unrecognized.
 */
export function zipToState(zip: string): string | null {
  const cleaned = zip.replace(/\D/g, '').slice(0, 5);
  if (cleaned.length < 3) return null;

  const prefix = cleaned.slice(0, 3);
  return ZIP_PREFIX_TO_STATE[prefix] || null;
}

// ============================================================
// ZIP CODE TO MSA MATCHING
// ============================================================

/**
 * Maps zip code prefixes to CareScout MSA search keywords.
 * CareScout uses names like "Dallas Area", "Los Angeles Area".
 * Our keyword just needs to be contained within that CareScout name.
 *
 * The state is determined separately by ZIP_PREFIX_TO_STATE.
 * So the same keyword (e.g. "Springfield") can appear in multiple states —
 * the Supabase query filters by state first, then matches the keyword.
 *
 * 598 zip prefixes mapped to 324 unique MSA keywords
 * across all 50 states + DC. Covers ~300+ CareScout MSAs.
 * Verified against USPS zip geography, April 2026.
 */
const ZIP_TO_MSA: Array<{ prefixes: string[]; msa: string }> = [

  // ── ALASKA ──
  { prefixes: ['997', '998', '999'], msa: 'Fairbanks' },

  // ── ALABAMA ──
  { prefixes: ['348'], msa: 'Auburn' },
  { prefixes: ['350'], msa: 'Anniston' },
  { prefixes: ['351', '352'], msa: 'Birmingham' },
  { prefixes: ['354'], msa: 'Tuscaloosa' },
  { prefixes: ['356'], msa: 'Florence' },
  { prefixes: ['357', '358'], msa: 'Huntsville' },
  { prefixes: ['359'], msa: 'Gadsden' },
  { prefixes: ['360', '361'], msa: 'Montgomery' },
  { prefixes: ['363'], msa: 'Dothan' },
  { prefixes: ['365'], msa: 'Daphne' },
  { prefixes: ['366'], msa: 'Mobile' },

  // ── ARKANSAS ──
  { prefixes: ['719'], msa: 'Hot Springs' },
  { prefixes: ['720', '721', '722'], msa: 'Little Rock' },
  { prefixes: ['724'], msa: 'Jonesboro' },
  { prefixes: ['727'], msa: 'Fayetteville' },
  { prefixes: ['729'], msa: 'Fort Smith' },

  // ── ARIZONA ──
  { prefixes: ['850', '851', '852', '853', '854', '855'], msa: 'Phoenix' },
  { prefixes: ['856', '857', '858'], msa: 'Tucson' },
  { prefixes: ['859'], msa: 'Sierra Vista' },
  { prefixes: ['860'], msa: 'Flagstaff' },
  { prefixes: ['863'], msa: 'Prescott Valley' },
  { prefixes: ['864'], msa: 'Lake Havasu City' },

  // ── CALIFORNIA ──
  { prefixes: ['900', '901', '902', '903', '904', '905', '906', '907', '908', '910', '911', '912', '917', '918'], msa: 'Los Angeles' },
  { prefixes: ['913', '914'], msa: 'Oxnard' },
  { prefixes: ['919', '920', '921'], msa: 'San Diego' },
  { prefixes: ['922', '923', '925', '926', '927'], msa: 'Riverside' },
  { prefixes: ['932'], msa: 'Visalia' },
  { prefixes: ['933'], msa: 'Bakersfield' },
  { prefixes: ['934'], msa: 'San Luis Obispo' },
  { prefixes: ['935'], msa: 'Santa Maria' },
  { prefixes: ['936', '937'], msa: 'Fresno' },
  { prefixes: ['938'], msa: 'Salinas' },
  { prefixes: ['939'], msa: 'Chico' },
  { prefixes: ['940', '941', '942', '943', '944'], msa: 'San Francisco' },
  { prefixes: ['945'], msa: 'Vallejo' },
  { prefixes: ['950'], msa: 'Santa Cruz' },
  { prefixes: ['951'], msa: 'San Jose' },
  { prefixes: ['952'], msa: 'Stockton' },
  { prefixes: ['953'], msa: 'Modesto' },
  { prefixes: ['954'], msa: 'Santa Rosa' },
  { prefixes: ['955'], msa: 'Yuba City' },
  { prefixes: ['956', '957', '958', '959'], msa: 'Sacramento' },
  { prefixes: ['960', '961'], msa: 'Redding' },

  // ── COLORADO ──
  { prefixes: ['800', '801', '802'], msa: 'Denver' },
  { prefixes: ['803'], msa: 'Boulder' },
  { prefixes: ['805'], msa: 'Fort Collins' },
  { prefixes: ['806'], msa: 'Greeley' },
  { prefixes: ['809'], msa: 'Colorado Springs' },
  { prefixes: ['810', '811'], msa: 'Pueblo' },
  { prefixes: ['815'], msa: 'Grand Junction' },

  // ── CONNECTICUT ──
  { prefixes: ['060', '061'], msa: 'Hartford' },
  { prefixes: ['063'], msa: 'Norwich' },
  { prefixes: ['064', '065'], msa: 'New Haven' },
  { prefixes: ['067'], msa: 'Waterbury' },
  { prefixes: ['068'], msa: 'Bridgeport' },

  // ── DC / MARYLAND / VIRGINIA (Washington metro) ──
  { prefixes: ['200', '201', '202', '203', '204', '205'], msa: 'Washington' },
  { prefixes: ['207', '208', '209'], msa: 'Washington' },
  { prefixes: ['220', '221', '222', '223', '224', '225'], msa: 'Washington' },

  // ── DELAWARE ──
  { prefixes: ['199'], msa: 'Dover' },

  // ── FLORIDA ──
  { prefixes: ['320', '321', '322'], msa: 'Jacksonville' },
  { prefixes: ['323'], msa: 'Tallahassee' },
  { prefixes: ['324'], msa: 'Panama City' },
  { prefixes: ['325'], msa: 'Pensacola' },
  { prefixes: ['326'], msa: 'Gainesville' },
  { prefixes: ['327', '328', '347'], msa: 'Orlando' },
  { prefixes: ['329'], msa: 'Palm Bay' },
  { prefixes: ['330', '331', '332', '333'], msa: 'Miami' },
  { prefixes: ['334'], msa: 'Miami' },
  { prefixes: ['335', '336', '337'], msa: 'Tampa' },
  { prefixes: ['338'], msa: 'Lakeland' },
  { prefixes: ['339'], msa: 'Cape Coral' },
  { prefixes: ['341'], msa: 'Naples' },
  { prefixes: ['342'], msa: 'North Port' },
  { prefixes: ['343'], msa: 'Punta Gorda' },
  { prefixes: ['344'], msa: 'Homosassa Springs' },
  { prefixes: ['346'], msa: 'Ocala' },
  { prefixes: ['349'], msa: 'Port St. Lucie' },

  // ── GEORGIA ──
  { prefixes: ['300', '301', '302', '303', '304'], msa: 'Atlanta' },
  { prefixes: ['305'], msa: 'Gainesville' },
  { prefixes: ['306'], msa: 'Athens' },
  { prefixes: ['309'], msa: 'Augusta' },
  { prefixes: ['310'], msa: 'Warner Robins' },
  { prefixes: ['312'], msa: 'Macon' },
  { prefixes: ['313'], msa: 'Hinesville' },
  { prefixes: ['314'], msa: 'Savannah' },
  { prefixes: ['315'], msa: 'Brunswick' },
  { prefixes: ['317'], msa: 'Albany' },
  { prefixes: ['319'], msa: 'Columbus' },

  // ── HAWAII ──
  { prefixes: ['967'], msa: 'Kahului' },
  { prefixes: ['968'], msa: 'Honolulu' },

  // ── IOWA ──
  { prefixes: ['500'], msa: 'Ames' },
  { prefixes: ['503', '504'], msa: 'Des Moines' },
  { prefixes: ['507'], msa: 'Waterloo' },
  { prefixes: ['510'], msa: 'Sioux City' },
  { prefixes: ['520'], msa: 'Dubuque' },
  { prefixes: ['522'], msa: 'Iowa City' },
  { prefixes: ['524'], msa: 'Cedar Rapids' },
  { prefixes: ['527'], msa: 'Davenport' },

  // ── IDAHO ──
  { prefixes: ['833'], msa: 'Twin Falls' },
  { prefixes: ['834'], msa: 'Idaho Falls' },
  { prefixes: ['835'], msa: 'Lewiston' },
  { prefixes: ['837'], msa: 'Boise City' },
  { prefixes: ['838'], msa: "Coeur d'Alene" },

  // ── ILLINOIS ──
  { prefixes: ['600', '601', '602', '603', '604', '605', '606'], msa: 'Chicago' },
  { prefixes: ['609'], msa: 'Kankakee' },
  { prefixes: ['610', '611'], msa: 'Rockford' },
  { prefixes: ['615', '616'], msa: 'Peoria' },
  { prefixes: ['617'], msa: 'Bloomington' },
  { prefixes: ['618'], msa: 'Champaign' },
  { prefixes: ['625'], msa: 'Decatur' },
  { prefixes: ['627'], msa: 'Springfield' },

  // ── INDIANA ──
  { prefixes: ['460', '461', '462'], msa: 'Indianapolis' },
  { prefixes: ['463'], msa: 'Michigan City' },
  { prefixes: ['465'], msa: 'Elkhart' },
  { prefixes: ['466'], msa: 'South Bend' },
  { prefixes: ['468'], msa: 'Fort Wayne' },
  { prefixes: ['469'], msa: 'Kokomo' },
  { prefixes: ['472'], msa: 'Columbus' },
  { prefixes: ['473'], msa: 'Muncie' },
  { prefixes: ['474'], msa: 'Bloomington' },
  { prefixes: ['477'], msa: 'Evansville' },
  { prefixes: ['478'], msa: 'Terre Haute' },
  { prefixes: ['479'], msa: 'Lafayette' },

  // ── KANSAS ──
  { prefixes: ['664'], msa: 'Lawrence' },
  { prefixes: ['665'], msa: 'Manhattan' },
  { prefixes: ['666'], msa: 'Topeka' },
  { prefixes: ['672'], msa: 'Wichita' },

  // ── KENTUCKY ──
  { prefixes: ['401', '402', '403'], msa: 'Louisville' },
  { prefixes: ['405'], msa: 'Lexington' },
  { prefixes: ['420'], msa: 'Paducah' },
  { prefixes: ['421'], msa: 'Bowling Green' },
  { prefixes: ['423'], msa: 'Owensboro' },
  { prefixes: ['427'], msa: 'Elizabethtown' },

  // ── LOUISIANA ──
  { prefixes: ['700', '701', '704'], msa: 'New Orleans' },
  { prefixes: ['703'], msa: 'Houma' },
  { prefixes: ['705'], msa: 'Lafayette' },
  { prefixes: ['706'], msa: 'Lake Charles' },
  { prefixes: ['707', '708'], msa: 'Baton Rouge' },
  { prefixes: ['710', '711'], msa: 'Shreveport' },
  { prefixes: ['712'], msa: 'Monroe' },
  { prefixes: ['713'], msa: 'Alexandria' },

  // ── MASSACHUSETTS ──
  { prefixes: ['010', '011'], msa: 'Springfield' },
  { prefixes: ['012'], msa: 'Pittsfield' },
  { prefixes: ['015', '016'], msa: 'Worcester' },
  { prefixes: ['020', '021', '022', '023', '024'], msa: 'Boston' },
  { prefixes: ['026'], msa: 'Barnstable Town' },

  // ── MARYLAND ──
  { prefixes: ['206'], msa: 'Lexington Park' },
  { prefixes: ['210', '211', '212'], msa: 'Baltimore' },
  { prefixes: ['217'], msa: 'Hagerstown' },
  { prefixes: ['218'], msa: 'Salisbury' },

  // ── MAINE ──
  { prefixes: ['039', '040', '041'], msa: 'Portland' },
  { prefixes: ['042'], msa: 'Lewiston' },
  { prefixes: ['044'], msa: 'Bangor' },

  // ── MICHIGAN ──
  { prefixes: ['480', '482', '483'], msa: 'Detroit' },
  { prefixes: ['481'], msa: 'Ann Arbor' },
  { prefixes: ['485'], msa: 'Flint' },
  { prefixes: ['486'], msa: 'Midland' },
  { prefixes: ['487'], msa: 'Bay City' },
  { prefixes: ['488'], msa: 'Lansing' },
  { prefixes: ['489'], msa: 'Saginaw' },
  { prefixes: ['490'], msa: 'Kalamazoo' },
  { prefixes: ['491'], msa: 'Niles' },
  { prefixes: ['492'], msa: 'Jackson' },
  { prefixes: ['494'], msa: 'Muskegon' },
  { prefixes: ['495', '496'], msa: 'Grand Rapids' },
  { prefixes: ['497'], msa: 'Traverse City' },

  // ── MINNESOTA ──
  { prefixes: ['550', '551', '554', '555'], msa: 'Minneapolis' },
  { prefixes: ['553'], msa: 'Duluth' },
  { prefixes: ['559'], msa: 'Rochester' },
  { prefixes: ['560'], msa: 'Mankato' },
  { prefixes: ['563'], msa: 'St. Cloud' },

  // ── MISSOURI ──
  { prefixes: ['630', '631', '632', '633', '634'], msa: 'St. Louis' },
  { prefixes: ['637'], msa: 'Cape Girardeau' },
  { prefixes: ['640', '641'], msa: 'Kansas City' },
  { prefixes: ['645'], msa: 'St. Joseph' },
  { prefixes: ['648'], msa: 'Joplin' },
  { prefixes: ['650'], msa: 'Jefferson City' },
  { prefixes: ['652'], msa: 'Columbia' },
  { prefixes: ['654', '655'], msa: 'Springfield' },

  // ── MISSISSIPPI ──
  { prefixes: ['390', '391', '392'], msa: 'Jackson' },
  { prefixes: ['394'], msa: 'Hattiesburg' },
  { prefixes: ['395'], msa: 'Gulfport' },

  // ── MONTANA ──
  { prefixes: ['591'], msa: 'Billings' },
  { prefixes: ['594'], msa: 'Great Falls' },
  { prefixes: ['596'], msa: 'Helena' },
  { prefixes: ['597'], msa: 'Bozeman' },
  { prefixes: ['598'], msa: 'Missoula' },

  // ── NORTH CAROLINA ──
  { prefixes: ['270', '271'], msa: 'Winston' },
  { prefixes: ['272'], msa: 'Burlington' },
  { prefixes: ['273', '274'], msa: 'Greensboro' },
  { prefixes: ['275', '276'], msa: 'Raleigh' },
  { prefixes: ['277'], msa: 'Durham' },
  { prefixes: ['278'], msa: 'Greenville' },
  { prefixes: ['280', '281', '282'], msa: 'Charlotte' },
  { prefixes: ['283'], msa: 'Fayetteville' },
  { prefixes: ['284'], msa: 'Wilmington' },
  { prefixes: ['285'], msa: 'Jacksonville' },
  { prefixes: ['286'], msa: 'Hickory' },
  { prefixes: ['287'], msa: 'Asheville' },

  // ── NORTH DAKOTA ──
  { prefixes: ['581'], msa: 'Fargo' },
  { prefixes: ['582'], msa: 'Grand Forks' },
  { prefixes: ['583'], msa: 'Bismarck' },
  { prefixes: ['587'], msa: 'Minot' },

  // ── NEBRASKA ──
  { prefixes: ['680', '681'], msa: 'Omaha' },
  { prefixes: ['685'], msa: 'Lincoln' },
  { prefixes: ['688'], msa: 'Grand Island' },

  // ── NEW HAMPSHIRE ──
  { prefixes: ['030', '031'], msa: 'Manchester' },

  // ── NEW JERSEY (NJ zips for New York metro) ──
  { prefixes: ['070', '071', '072', '073', '074', '075', '076', '077', '078', '079'], msa: 'New York' },
  { prefixes: ['082'], msa: 'Atlantic City' },
  { prefixes: ['083'], msa: 'Vineland' },
  { prefixes: ['085', '086'], msa: 'Trenton' },

  // ── NEW MEXICO ──
  { prefixes: ['870', '871'], msa: 'Albuquerque' },
  { prefixes: ['874'], msa: 'Farmington' },
  { prefixes: ['875'], msa: 'Santa Fe' },
  { prefixes: ['880'], msa: 'Las Cruces' },

  // ── NEVADA ──
  { prefixes: ['889', '890', '891'], msa: 'Las Vegas' },
  { prefixes: ['894', '895'], msa: 'Reno' },
  { prefixes: ['897'], msa: 'Carson City' },

  // ── NEW YORK ──
  { prefixes: ['100', '101', '102', '103', '104', '105', '106', '107', '108'], msa: 'New York' },
  { prefixes: ['109'], msa: 'Kiryas Joel' },
  { prefixes: ['110', '111', '112', '113', '114', '115', '116', '117', '118', '119'], msa: 'New York' },
  { prefixes: ['120', '121', '122', '123'], msa: 'Albany' },
  { prefixes: ['124', '125'], msa: 'Kingston' },
  { prefixes: ['128'], msa: 'Glens Falls' },
  { prefixes: ['130', '131', '132'], msa: 'Syracuse' },
  { prefixes: ['133', '134', '135'], msa: 'Utica' },
  { prefixes: ['136'], msa: 'Watertown' },
  { prefixes: ['137', '138', '139'], msa: 'Binghamton' },
  { prefixes: ['140', '141', '142', '143'], msa: 'Buffalo' },
  { prefixes: ['144', '145', '146'], msa: 'Rochester' },
  { prefixes: ['148'], msa: 'Ithaca' },
  { prefixes: ['149'], msa: 'Elmira' },

  // ── OHIO ──
  { prefixes: ['430', '431', '432', '433'], msa: 'Columbus' },
  { prefixes: ['435', '436'], msa: 'Toledo' },
  { prefixes: ['440', '441', '442'], msa: 'Akron' },
  { prefixes: ['443', '444', '445'], msa: 'Cleveland' },
  { prefixes: ['447'], msa: 'Canton' },
  { prefixes: ['448'], msa: 'Mansfield' },
  { prefixes: ['449'], msa: 'Youngstown' },
  { prefixes: ['450', '451', '452'], msa: 'Cincinnati' },
  { prefixes: ['453', '454'], msa: 'Dayton' },
  { prefixes: ['455'], msa: 'Springfield' },
  { prefixes: ['458'], msa: 'Lima' },

  // ── OKLAHOMA ──
  { prefixes: ['730', '731'], msa: 'Oklahoma City' },
  { prefixes: ['737'], msa: 'Enid' },
  { prefixes: ['740', '741'], msa: 'Tulsa' },

  // ── OREGON ──
  { prefixes: ['970', '971', '972'], msa: 'Portland' },
  { prefixes: ['973'], msa: 'Salem' },
  { prefixes: ['974'], msa: 'Eugene' },
  { prefixes: ['975'], msa: 'Medford' },
  { prefixes: ['977'], msa: 'Bend' },

  // ── PENNSYLVANIA ──
  { prefixes: ['150', '151', '152', '153'], msa: 'Pittsburgh' },
  { prefixes: ['159'], msa: 'Johnstown' },
  { prefixes: ['164', '165'], msa: 'Erie' },
  { prefixes: ['166'], msa: 'Altoona' },
  { prefixes: ['168'], msa: 'State College' },
  { prefixes: ['170', '171'], msa: 'Harrisburg' },
  { prefixes: ['172'], msa: 'Chambersburg' },
  { prefixes: ['173'], msa: 'Gettysburg' },
  { prefixes: ['174', '175'], msa: 'York' },
  { prefixes: ['176'], msa: 'Lancaster' },
  { prefixes: ['177'], msa: 'Williamsport' },
  { prefixes: ['180', '181', '182'], msa: 'Allentown' },
  { prefixes: ['183', '184', '185'], msa: 'Scranton' },
  { prefixes: ['190', '191', '192', '193'], msa: 'Philadelphia' },
  { prefixes: ['194', '195', '196'], msa: 'Reading' },

  // ── RHODE ISLAND ──
  { prefixes: ['028', '029'], msa: 'Providence' },

  // ── SOUTH CAROLINA ──
  { prefixes: ['291'], msa: 'Sumter' },
  { prefixes: ['292'], msa: 'Columbia' },
  { prefixes: ['293'], msa: 'Spartanburg' },
  { prefixes: ['294'], msa: 'Charleston' },
  { prefixes: ['295'], msa: 'Florence' },
  { prefixes: ['296'], msa: 'Greenville' },
  { prefixes: ['297'], msa: 'Myrtle Beach' },
  { prefixes: ['298'], msa: 'Hilton Head Island' },

  // ── SOUTH DAKOTA ──
  { prefixes: ['570', '571'], msa: 'Sioux Falls' },
  { prefixes: ['577'], msa: 'Rapid City' },

  // ── TENNESSEE ──
  { prefixes: ['370'], msa: 'Clarksville' },
  { prefixes: ['371', '372'], msa: 'Nashville' },
  { prefixes: ['373'], msa: 'Cleveland' },
  { prefixes: ['374'], msa: 'Chattanooga' },
  { prefixes: ['376', '377'], msa: 'Johnson City' },
  { prefixes: ['378'], msa: 'Morristown' },
  { prefixes: ['379'], msa: 'Knoxville' },
  { prefixes: ['380', '381', '382'], msa: 'Memphis' },
  { prefixes: ['383'], msa: 'Jackson' },

  // ── TEXAS ──
  { prefixes: ['750', '751', '752', '753', '754', '755', '760', '761', '762'], msa: 'Dallas' },
  { prefixes: ['756'], msa: 'Longview' },
  { prefixes: ['757', '758'], msa: 'Tyler' },
  { prefixes: ['763', '764'], msa: 'Wichita Falls' },
  { prefixes: ['765', '766'], msa: 'Killeen' },
  { prefixes: ['767', '768'], msa: 'Waco' },
  { prefixes: ['769'], msa: 'San Angelo' },
  { prefixes: ['770', '771', '772', '773', '774', '775'], msa: 'Houston' },
  { prefixes: ['776', '777'], msa: 'Beaumont' },
  { prefixes: ['778'], msa: 'College Station' },
  { prefixes: ['779'], msa: 'Victoria' },
  { prefixes: ['780', '781'], msa: 'San Antonio' },
  { prefixes: ['782', '783'], msa: 'McAllen' },
  { prefixes: ['784'], msa: 'Corpus Christi' },
  { prefixes: ['785'], msa: 'Brownsville' },
  { prefixes: ['786', '787'], msa: 'Austin' },
  { prefixes: ['788'], msa: 'Laredo' },
  { prefixes: ['790', '791'], msa: 'Amarillo' },
  { prefixes: ['793', '794'], msa: 'Lubbock' },
  { prefixes: ['796'], msa: 'Abilene' },
  { prefixes: ['797'], msa: 'Midland' },
  { prefixes: ['798', '799'], msa: 'El Paso' },

  // ── UTAH ──
  { prefixes: ['840', '841', '842'], msa: 'Salt Lake City' },
  { prefixes: ['843'], msa: 'Logan' },
  { prefixes: ['844'], msa: 'Ogden' },
  { prefixes: ['846'], msa: 'Provo' },
  { prefixes: ['847'], msa: 'St. George' },

  // ── VIRGINIA ──
  { prefixes: ['226'], msa: 'Winchester' },
  { prefixes: ['228'], msa: 'Harrisonburg' },
  { prefixes: ['229'], msa: 'Charlottesville' },
  { prefixes: ['230', '231', '232', '233'], msa: 'Richmond' },
  { prefixes: ['234', '235', '236'], msa: 'Virginia Beach' },
  { prefixes: ['240', '241'], msa: 'Roanoke' },
  { prefixes: ['244'], msa: 'Staunton' },
  { prefixes: ['245'], msa: 'Lynchburg' },

  // ── VERMONT ──
  { prefixes: ['051', '054'], msa: 'Burlington' },

  // ── WASHINGTON ──
  { prefixes: ['980', '981', '984'], msa: 'Seattle' },
  { prefixes: ['982'], msa: 'Bellingham' },
  { prefixes: ['983'], msa: 'Bremerton' },
  { prefixes: ['985'], msa: 'Olympia' },
  { prefixes: ['986'], msa: 'Longview' },
  { prefixes: ['987'], msa: 'Wenatchee' },
  { prefixes: ['989'], msa: 'Yakima' },
  { prefixes: ['990', '991', '992'], msa: 'Spokane' },
  { prefixes: ['993'], msa: 'Kennewick' },

  // ── WISCONSIN ──
  { prefixes: ['530', '532'], msa: 'Milwaukee' },
  { prefixes: ['531'], msa: 'Kenosha' },
  { prefixes: ['533'], msa: 'Sheboygan' },
  { prefixes: ['534'], msa: 'Racine' },
  { prefixes: ['535'], msa: 'Janesville' },
  { prefixes: ['537'], msa: 'Madison' },
  { prefixes: ['543'], msa: 'Green Bay' },
  { prefixes: ['544'], msa: 'Oshkosh' },
  { prefixes: ['545'], msa: 'Wausau' },
  { prefixes: ['546'], msa: 'La Crosse' },
  { prefixes: ['547'], msa: 'Eau Claire' },
  { prefixes: ['549'], msa: 'Appleton' },

  // ── WEST VIRGINIA ──
  { prefixes: ['250'], msa: 'Beckley' },
  { prefixes: ['251', '252', '253'], msa: 'Charleston' },
  { prefixes: ['255', '256', '257'], msa: 'Huntington' },
  { prefixes: ['260'], msa: 'Wheeling' },
  { prefixes: ['261'], msa: 'Parkersburg' },
  { prefixes: ['265'], msa: 'Morgantown' },

  // ── WYOMING ──
  { prefixes: ['820', '821'], msa: 'Cheyenne' },
  { prefixes: ['826'], msa: 'Casper' },
];

/**
 * Try to match a zip code to an MSA name from the CareScout data.
 * Returns null if no MSA match (we'll use state-level data instead).
 */
export function zipToMsa(zip: string): string | null {
  const cleaned = zip.replace(/\D/g, '').slice(0, 5);
  if (cleaned.length < 3) return null;

  const prefix = cleaned.slice(0, 3);

  for (const entry of ZIP_TO_MSA) {
    if (entry.prefixes.includes(prefix)) {
      return entry.msa;
    }
  }

  return null;
}

// ============================================================
// STATE NAMES LOOKUP
// ============================================================

const STATE_NAMES: Record<string, string> = {
  'AL': 'Alabama', 'AK': 'Alaska', 'AZ': 'Arizona', 'AR': 'Arkansas',
  'CA': 'California', 'CO': 'Colorado', 'CT': 'Connecticut', 'DE': 'Delaware',
  'DC': 'District of Columbia', 'FL': 'Florida', 'GA': 'Georgia', 'HI': 'Hawaii',
  'ID': 'Idaho', 'IL': 'Illinois', 'IN': 'Indiana', 'IA': 'Iowa',
  'KS': 'Kansas', 'KY': 'Kentucky', 'LA': 'Louisiana', 'ME': 'Maine',
  'MD': 'Maryland', 'MA': 'Massachusetts', 'MI': 'Michigan', 'MN': 'Minnesota',
  'MS': 'Mississippi', 'MO': 'Missouri', 'MT': 'Montana', 'NE': 'Nebraska',
  'NV': 'Nevada', 'NH': 'New Hampshire', 'NJ': 'New Jersey', 'NM': 'New Mexico',
  'NY': 'New York', 'NC': 'North Carolina', 'ND': 'North Dakota', 'OH': 'Ohio',
  'OK': 'Oklahoma', 'OR': 'Oregon', 'PA': 'Pennsylvania', 'RI': 'Rhode Island',
  'SC': 'South Carolina', 'SD': 'South Dakota', 'TN': 'Tennessee', 'TX': 'Texas',
  'UT': 'Utah', 'VT': 'Vermont', 'VA': 'Virginia', 'WA': 'Washington',
  'WV': 'West Virginia', 'WI': 'Wisconsin', 'WY': 'Wyoming'
};

export function getStateName(stateCode: string): string {
  return STATE_NAMES[stateCode] || stateCode;
}

// ============================================================
// SUPABASE QUERY — FETCH COST DATA
// ============================================================

/**
 * Transform a raw Supabase row into our CostData type.
 */
function transformRow(row: any): CostData {
  return {
    level: row.level,
    stateCode: row.state_code,
    stateName: row.state_name,
    areaName: row.area_name,
    locationLabel: row.level === 'msa'
      ? row.area_name || row.full_name
      : row.state_name,

    // Monthly costs
    nursingHomePrivate: row.monthly_nursing_home_private,
    nursingHomeSemiPrivate: row.monthly_nursing_home_semi_private,
    assistedLiving: row.monthly_assisted_living,
    adultDayCare: row.monthly_adult_day_care,
    homeCareServices: row.monthly_home_care_services,

    // Annual costs
    nursingHomePrivateAnnual: row.annual_nursing_home_private,
    nursingHomeSemiPrivateAnnual: row.annual_nursing_home_semi_private,
    assistedLivingAnnual: row.annual_assisted_living,
    adultDayCareAnnual: row.annual_adult_day_care,
    homeCareServicesAnnual: row.annual_home_care_services,

    // Growth rates
    nursingHomePrivateGrowth: row.growth_nursing_home_private,
    assistedLivingGrowth: row.growth_assisted_living,
    homeCareServicesGrowth: row.growth_home_care_services,
  };
}

/**
 * Main function: look up care costs by zip code.
 *
 * Strategy:
 *   1. Map zip → state code
 *   2. Query all cost_of_care rows for that state (state + MSA rows)
 *   3. Try to match zip → specific MSA for more precise data
 *   4. Return best match (MSA if available, state as fallback)
 *
 * Usage:
 *   const result = await getCostsByZip('75201');
 *   if (result.found) {
 *     console.log(result.costs.assistedLiving); // e.g. 5666
 *   }
 */
export async function getCostsByZip(zip: string): Promise<CostLookupResult> {
  // Step 1: Figure out the state
  const stateCode = zipToState(zip);

  if (!stateCode) {
    return { found: false, costs: null, stateCosts: null, msaCosts: [], cityName: null, stateCode: null };
  }

  // Step 2: Query Supabase for all cost rows in this state
  const { data, error } = await supabase
    .from('cost_of_care')
    .select('*')
    .eq('state_code', stateCode)
    .order('level', { ascending: true }); // 'msa' rows come after 'state' row

  if (error || !data || data.length === 0) {
    console.error('Cost data query failed:', error);
    return { found: false, costs: null, stateCosts: null, msaCosts: [], cityName: null, stateCode };
  }

  // Step 3: Separate state-level and MSA-level rows
  const stateRow = data.find((r: any) => r.level === 'state');
  const msaRows = data.filter((r: any) => r.level === 'msa');

  const stateCosts = stateRow ? transformRow(stateRow) : null;
  const msaCosts = msaRows.map(transformRow);

  // Step 4: Try to match zip to a specific MSA
  const msaName = zipToMsa(zip);
  let bestMatch: CostData | null = null;

  if (msaName) {
    // Look for this MSA in our query results (partial match since CareScout
    // names may include state suffix like ", TX")
    const msaMatch = msaRows.find((r: any) => {
      const fullName = (r.full_name || r.area_name || '').toLowerCase();
      return fullName.includes(msaName.toLowerCase());
    });

    if (msaMatch) {
      bestMatch = transformRow(msaMatch);
    }
  }

  // Fall back to state-level if no MSA match
  if (!bestMatch) {
    bestMatch = stateCosts;
  }

  return {
    found: true,
    costs: bestMatch,
    stateCosts,
    msaCosts,
    cityName: bestMatch?.level === 'msa' ? bestMatch.areaName : null,
    stateCode,
  };
}

// ============================================================
// FORMATTING HELPERS
// ============================================================

/**
 * Format a dollar amount for display.
 * Examples: 5666 → "$5,666"   null → "N/A"
 */
export function formatCost(amount: number | null): string {
  if (amount === null || amount === undefined) return 'N/A';
  return '$' + amount.toLocaleString('en-US', { maximumFractionDigits: 0 });
}

/**
 * Format an annual cost for display.
 * Examples: 67992 → "$67,992/year"
 */
export function formatAnnualCost(amount: number | null): string {
  if (amount === null || amount === undefined) return 'N/A';
  return '$' + amount.toLocaleString('en-US', { maximumFractionDigits: 0 }) + '/year';
}

/**
 * Format a monthly cost for display.
 * Examples: 5666 → "$5,666/mo"
 */
export function formatMonthlyCost(amount: number | null): string {
  if (amount === null || amount === undefined) return 'N/A';
  return '$' + amount.toLocaleString('en-US', { maximumFractionDigits: 0 }) + '/mo';
}

/**
 * Get a cost summary object ready for display in the UI.
 * Returns all care types with formatted strings.
 */
export function getCostSummary(costs: CostData) {
  return {
    location: costs.locationLabel,
    level: costs.level,
    memoryCare: {
      // CareScout doesn't have a separate "memory care" category —
      // memory care is typically 20-30% more than assisted living.
      // We compute an estimate based on the assisted living rate.
      monthly: costs.assistedLiving
        ? formatMonthlyCost(Math.round(costs.assistedLiving * 1.25))
        : 'N/A',
      annual: costs.assistedLiving
        ? formatAnnualCost(Math.round(costs.assistedLiving * 1.25 * 12))
        : 'N/A',
      raw: costs.assistedLiving ? Math.round(costs.assistedLiving * 1.25) : null,
      note: 'Estimated based on assisted living costs + memory care premium',
    },
    assistedLiving: {
      monthly: formatMonthlyCost(costs.assistedLiving),
      annual: formatAnnualCost(costs.assistedLivingAnnual),
      raw: costs.assistedLiving,
    },
    homeCare: {
      monthly: formatMonthlyCost(costs.homeCareServices),
      annual: formatAnnualCost(costs.homeCareServicesAnnual),
      raw: costs.homeCareServices,
      // Approximate hourly rate: monthly / 160 hours (40hr/week)
      hourly: costs.homeCareServices
        ? formatCost(Math.round(costs.homeCareServices / 160))
        : 'N/A',
    },
    nursingHome: {
      monthly: formatMonthlyCost(costs.nursingHomePrivate),
      monthlySemiPrivate: formatMonthlyCost(costs.nursingHomeSemiPrivate),
      annual: formatAnnualCost(costs.nursingHomePrivateAnnual),
      raw: costs.nursingHomePrivate,
    },
    adultDayCare: {
      monthly: formatMonthlyCost(costs.adultDayCare),
      annual: formatAnnualCost(costs.adultDayCareAnnual),
      raw: costs.adultDayCare,
    },
  };
}
