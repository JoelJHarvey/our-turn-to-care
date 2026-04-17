import { Question } from "./types";

// ─────────────────────────────────────────────────────────────────────────────
// RELATIONSHIP OPTIONS
//
// Each entry maps a relationship answer value to the personalisation tokens
// used in question text. AssessmentFlow stores these after Screen 1.
//
// Placeholder reference in question strings:
//   {person}     → personLabel          e.g. "your mother", "you"
//   {person's}   → personPossessive     e.g. "your mother's", "your"
//   {pronoun}    → pronoun              e.g. "she", "he", "they", "you"
//   {possessive} → possessive           e.g. "her", "his", "their", "your"
// ─────────────────────────────────────────────────────────────────────────────
export const RELATIONSHIP_OPTIONS = [
  {
    label: "My mother",
    value: "mother",
    personLabel: "your mother",
    personPossessive: "your mother's",
    pronoun: "she",
    possessive: "her",
  },
  {
    label: "My father",
    value: "father",
    personLabel: "your father",
    personPossessive: "your father's",
    pronoun: "he",
    possessive: "his",
  },
  {
    label: "My spouse or partner",
    value: "spouse",
    personLabel: "your spouse or partner",
    personPossessive: "your spouse or partner's",
    pronoun: "they",
    possessive: "their",
  },
  {
    label: "Another family member",
    value: "family",
    personLabel: "your family member",
    personPossessive: "your family member's",
    pronoun: "they",
    possessive: "their",
  },
  {
    // personLabel is "you" (not "yourself") so the {person} placeholder
    // produces grammatically correct sentences for all paths.
    // e.g. "Now let's see if you might qualify..." ✓
    label: "Myself",
    value: "self",
    personLabel: "you",
    personPossessive: "your",
    pronoun: "you",
    possessive: "your",
  },
  {
    label: "Someone I'm helping (professional caregiver, friend, etc.)",
    value: "other",
    personLabel: "your loved one",
    personPossessive: "your loved one's",
    pronoun: "they",
    possessive: "their",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// QUESTIONS ARRAY
//
// Screen 1 = questions[0], Screen 2 = questions[1], and so on.
//
// Each question can declare `questionVariants`, `subtextVariants`, and
// `optionVariants` keyed by the relationship answer value (e.g. "self",
// "spouse"). AssessmentFlow resolves these before passing to components, so
// the screen components themselves don't need to know about relationships.
// ─────────────────────────────────────────────────────────────────────────────
export const questions: Question[] = [
  // ── Screen 1 ─────────────────────────────────────────────────────────────
  {
    id: "relationship",
    question: "Who are you looking into care for?",
    options: RELATIONSHIP_OPTIONS.map(({ label, value }) => ({ label, value })),
    multiSelect: false,
    progress: 8,
  },

  // ── Screen 2: Age ─────────────────────────────────────────────────────────
  {
    id: "age",
    question: "How old is {person}?",
    questionVariants: {
      self: "How old are you?",
    },
    options: [
      { label: "Under 65", value: "under_65" },
      { label: "65–74", value: "65_74" },
      { label: "75–84", value: "75_84" },
      { label: "85+", value: "85_plus" },
    ],
    multiSelect: false,
    progress: 16,
  },

  // ── Screen 3: Daily Activities (ADLs) ────────────────────────────────────
  {
    id: "adls",
    question: "Does {person} need help with any of these daily activities?",
    questionVariants: {
      self: "Do you need help with any of these daily activities?",
    },
    subtext: "Select all that apply",
    options: [
      { label: "Bathing or showering", value: "bathing" },
      { label: "Getting dressed", value: "dressing" },
      { label: "Using the bathroom", value: "bathroom" },
      { label: "Eating or preparing meals", value: "eating" },
      {
        label: "Moving around the house (walking, getting out of bed/chair)",
        value: "mobility",
      },
      { label: "Managing medications", value: "medications" },
      { label: "None of the above", value: "none" },
    ],
    multiSelect: true,
    noneValues: ["none"],
    progress: 25,
  },

  // ── Screen 4: Cognitive / Memory Concerns ────────────────────────────────
  {
    id: "cognitive",
    question: "Have you noticed any of these changes in {person}?",
    questionVariants: {
      self: "Have you noticed any of these changes in yourself?",
    },
    subtext: "Select all that apply",
    options: [
      {
        label: "Forgetting recent conversations or events",
        value: "forgetting",
      },
      {
        label: "Getting confused about time, date, or {possessive} current location",
        value: "confusion",
      },
      {
        label: "Difficulty managing money or paying bills",
        value: "finances",
      },
      {
        label: "Repeating questions or stories frequently",
        value: "repeating",
      },
      { label: "Getting lost in familiar places", value: "lost" },
      {
        label: "Personality changes or unusual behavior",
        value: "personality",
      },
      {
        label: "Not recognizing close family members",
        value: "recognition",
      },
      {
        label: "Wandering or leaving the house unexpectedly",
        value: "wandering",
      },
      { label: "None of the above", value: "none" },
    ],
    multiSelect: true,
    noneValues: ["none"],
    progress: 35,
  },

  // ── Screen 5: Safety Concerns ─────────────────────────────────────────────
  {
    id: "safety",
    question: "Have any of these happened to {person} in the last 6 months?",
    questionVariants: {
      self: "Have any of these happened to you in the last 6 months?",
    },
    subtext: "Select all that apply",
    options: [
      { label: "A fall or injury at home", value: "fall" },
      { label: "A trip to the emergency room", value: "er_visit" },
      {
        label: "Leaving the stove on or other fire risk",
        value: "fire_risk",
      },
      {
        label: "Missed medications or took wrong dose",
        value: "med_error",
      },
      { label: "Unexplained weight loss", value: "weight_loss" },
      {
        label: "Noticeable decline in personal hygiene",
        value: "hygiene",
      },
      {
        label: "Hoarding or neglecting the home",
        value: "hoarding",
      },
      { label: "None of the above", value: "none" },
    ],
    multiSelect: true,
    noneValues: ["none"],
    progress: 45,
  },

  // ── Screen 6: Current Living Situation ────────────────────────────────────
  {
    id: "living_situation",
    question: "Where does {person} currently live?",
    questionVariants: {
      self: "Where do you currently live?",
    },
    options: [
      { label: "Alone in {possessive} own home", value: "alone" },
      { label: "With a spouse or partner", value: "with_spouse" },
      { label: "With me or another family member", value: "with_family" },
      {
        label: "In an independent living community",
        value: "independent_living",
      },
      { label: "In an assisted living facility", value: "assisted_living" },
      { label: "Other", value: "other" },
    ],
    // Spouse path: the care recipient IS the user's spouse, so reframe from
    // the caregiver's perspective
    optionVariants: {
      spouse: [
        { label: "Alone (living separately from me)", value: "alone" },
        { label: "With me", value: "with_spouse" },
        { label: "With another family member", value: "with_family" },
        {
          label: "In an independent living community",
          value: "independent_living",
        },
        { label: "In an assisted living facility", value: "assisted_living" },
        { label: "Other", value: "other" },
      ],
      // Self path: options in first person
      self: [
        { label: "Alone", value: "alone" },
        { label: "With my spouse or partner", value: "with_spouse" },
        { label: "With family or others", value: "with_family" },
        {
          label: "In an independent living community",
          value: "independent_living",
        },
        { label: "In an assisted living facility", value: "assisted_living" },
        { label: "Other", value: "other" },
      ],
    },
    multiSelect: false,
    progress: 55,
  },

  // ── Screen 7: Zip Code ────────────────────────────────────────────────────
  {
    id: "zip",
    question: "What zip code does {person} live in?",
    questionVariants: {
      self: "What is your zip code?",
    },
    subtext: "This helps us show you care options and costs in {possessive} area.",
    options: [],
    multiSelect: false,
    screenType: "zip",
    progress: 63,
  },

  // ── Transition: Financial Section ─────────────────────────────────────────
  // {person}="you" for self path → "Now let's see if you might qualify..."
  // which works perfectly without a variant.
  {
    id: "financial_intro",
    question:
      "Now let's see if {person} might qualify for financial assistance.",
    subtext:
      "Many families don't realize there are programs that can help cover care costs.",
    options: [],
    multiSelect: false,
    screenType: "transition",
    progress: 65,
  },

  // ── Screen 8: Veteran Status ──────────────────────────────────────────────
  //
  // Base question + placeholders already produce correct text for:
  //   mother → "Is your mother — or her spouse — a U.S. military veteran?" ✓
  //   father → "Is your father — or his spouse — a U.S. military veteran?" ✓
  //   family → "Is your family member — or their spouse — ..." ✓
  //   other  → "Is your loved one — or their spouse — ..." ✓
  // Only spouse and self need question variants.
  //
  // Base options use "they are/were" (correct for family/other).
  // optionVariants override for mother/father/spouse/self.
  {
    id: "veteran_status",
    question:
      "Is {person} — or {possessive} spouse — a U.S. military veteran?",
    questionVariants: {
      spouse: "Are you or your spouse a U.S. military veteran?",
      self: "Are you — or your spouse — a U.S. military veteran?",
    },
    // Fallback options (used for family/other paths)
    options: [
      { label: "Yes — they are/were a veteran", value: "veteran" },
      { label: "Yes — their spouse is/was a veteran", value: "spouse" },
      { label: "No", value: "no" },
      { label: "I'm not sure", value: "not_sure" },
    ],
    optionVariants: {
      mother: [
        { label: "Yes — she is/was a veteran", value: "veteran" },
        { label: "Yes — her spouse is/was a veteran", value: "spouse" },
        { label: "No", value: "no" },
        { label: "I'm not sure", value: "not_sure" },
      ],
      father: [
        { label: "Yes — he is/was a veteran", value: "veteran" },
        { label: "Yes — his spouse is/was a veteran", value: "spouse" },
        { label: "No", value: "no" },
        { label: "I'm not sure", value: "not_sure" },
      ],
      spouse: [
        // In the spouse path, "your spouse" = the care recipient
        { label: "Yes — my spouse is/was a veteran", value: "veteran" },
        { label: "Yes — I am/was a veteran", value: "spouse" },
        { label: "No", value: "no" },
        { label: "I'm not sure", value: "not_sure" },
      ],
      self: [
        { label: "Yes — I am/was a veteran", value: "veteran" },
        { label: "Yes — my spouse is/was a veteran", value: "spouse" },
        { label: "No", value: "no" },
        { label: "I'm not sure", value: "not_sure" },
      ],
    },
    multiSelect: false,
    progress: 70,
    footnote:
      "Many families don't realize that veterans — or their spouses — may qualify for benefits that help cover care costs.",
  },

  // ── Screen 9: Financial Situation ─────────────────────────────────────────
  // {person's}="your" for self → "Which of these best describes your
  // financial situation?" ✓  No question variant needed for self.
  // Subtext {pronoun}="you" for self → "...programs you may qualify for." ✓
  {
    id: "financial_situation",
    question: "Which of these best describes {person's} financial situation?",
    subtext:
      "This helps us identify assistance programs {pronoun} may qualify for.",
    options: [
      {
        label: "Lives primarily on Social Security and/or a small pension",
        value: "social_security",
      },
      {
        label: "Has modest savings and retirement income",
        value: "modest_savings",
      },
      {
        label: "Has significant savings or retirement assets",
        value: "significant_savings",
      },
      {
        label: "I'm not sure about {possessive} finances",
        value: "not_sure",
      },
    ],
    // Self path: rewrite all options in first person
    optionVariants: {
      self: [
        {
          label: "I live primarily on Social Security and/or a small pension",
          value: "social_security",
        },
        {
          label: "I have modest savings and retirement income",
          value: "modest_savings",
        },
        {
          label: "I have significant savings or retirement assets",
          value: "significant_savings",
        },
        {
          label: "I'm not sure about my finances",
          value: "not_sure",
        },
      ],
    },
    multiSelect: false,
    showSkip: true,
    progress: 77,
  },

  // ── Screen 10: Current Coverage ───────────────────────────────────────────
  {
    id: "current_coverage",
    question: "What health coverage does {person} currently have?",
    questionVariants: {
      self: "What health coverage do you currently have?",
    },
    subtext: "Select all that apply",
    options: [
      {
        label: "Medicare (the federal program for people 65+)",
        value: "medicare",
      },
      {
        label: "Medicaid (the state/federal program based on income)",
        value: "medicaid",
      },
      { label: "VA health benefits", value: "va_benefits" },
      { label: "Private health insurance", value: "private_insurance" },
      { label: "Long-term care insurance", value: "ltc_insurance" },
      { label: "I'm not sure about {possessive} coverage", value: "not_sure" },
      { label: "None / uninsured", value: "none" },
    ],
    // Self path: update "they have" → "I have" on the uncertain option
    optionVariants: {
      self: [
        {
          label: "Medicare (the federal program for people 65+)",
          value: "medicare",
        },
        {
          label: "Medicaid (the state/federal program based on income)",
          value: "medicaid",
        },
        { label: "VA health benefits", value: "va_benefits" },
        { label: "Private health insurance", value: "private_insurance" },
        { label: "Long-term care insurance", value: "ltc_insurance" },
        { label: "I'm not sure what I have", value: "not_sure" },
        { label: "None / uninsured", value: "none" },
      ],
    },
    multiSelect: true,
    noneValues: ["not_sure", "none"],
    progress: 83,
  },

  // ── Screen 11: Budget ─────────────────────────────────────────────────────
  {
    id: "budget",
    question: "Do you have a sense of the monthly budget available for care?",
    questionVariants: {
      self: "Do you have a sense of the monthly budget available for your care?",
    },
    subtext:
      "This is optional and helps us tailor our recommendations. Don't worry if you're not sure — that's exactly what the financial assistance programs are for.",
    options: [
      { label: "Under $2,000/month", value: "under_2k" },
      { label: "$2,000 – $4,000/month", value: "2k_4k" },
      { label: "$4,000 – $7,000/month", value: "4k_7k" },
      { label: "$7,000 – $10,000/month", value: "7k_10k" },
      { label: "Over $10,000/month", value: "over_10k" },
      { label: "I'm not sure yet", value: "not_sure" },
    ],
    multiSelect: false,
    showSkip: true,
    progress: 90,
  },

  // ── Screen 12: Care Recipient Name ────────────────────────────────────────
  // {person's}="your" for self → "What's your first name?" ✓
  // The self variant uses "What is your first name?" for natural phrasing.
  {
    id: "care_recipient_name",
    question: "What's {person's} first name?",
    questionVariants: {
      self: "What is your first name?",
    },
    subtext:
      "This helps us personalize your results. You can skip this if you prefer.",
    subtextVariants: {
      self: "This helps us personalize your results.",
    },
    options: [],
    multiSelect: false,
    screenType: "name",
    progress: 95,
  },
];

// Total number of question screens (excluding welcome screen and transition screens).
export const TOTAL_QUESTIONS = 12;
