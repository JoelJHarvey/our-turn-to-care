// Core data shape for a single answer option
export interface Option {
  label: string;
  value: string;
}

// Which component renders this screen.
// "select"     → QuestionScreen (button-style options)
// "zip"        → ZipCodeScreen (numeric text input)
// "name"       → NameScreen (text input, final CTA)
// "transition" → TransitionScreen (interstitial message, no saved answer)
export type ScreenType = "select" | "zip" | "name" | "transition";

// Shape of a question in the assessment
export interface Question {
  id: string;
  question: string;
  subtext?: string;
  options: Option[];
  multiSelect: boolean;
  showSkip?: boolean;
  // One or more "exclusive" option values (e.g. "None of the above").
  // Selecting any exclusive value clears all other selections.
  // Selecting any non-exclusive value clears all exclusive values.
  noneValues?: string[];
  // Explicit progress percentage for this screen (0–100).
  progress: number;
  // Determines which input component renders this screen. Defaults to "select".
  screenType?: ScreenType;
  // Informational text rendered below the options list (not above like subtext).
  footnote?: string;
  // Per-relationship overrides. The key is the relationship answer value
  // (e.g. "self", "spouse"). AssessmentFlow picks these up and passes the
  // correct text/options to the screen component.
  questionVariants?: Record<string, string>;
  subtextVariants?: Record<string, string>;
  optionVariants?: Record<string, Option[]>;
}

// Maps question IDs to the user's selected answer(s)
export type AssessmentAnswers = Record<string, string[]>;

// Full state of the assessment at any point in time
export interface AssessmentState {
  currentScreen: number; // 0 = welcome screen, 1+ = question screens
  answers: AssessmentAnswers;
  personLabel: string;       // e.g. "your mother"
  pronoun: string;           // e.g. "she", "he", "they"
  possessive: string;        // e.g. "her", "his", "their"
  personPossessive: string;  // e.g. "your mother's", "yourself" (handles the grammar edge case)
}
