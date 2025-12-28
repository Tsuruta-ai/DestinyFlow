export enum TaskType {
  SHORT_TERM_PROCRASTINATION = 'SHORT_TERM_PROCRASTINATION',
  LONG_TERM_COMPLEX = 'LONG_TERM_COMPLEX',
}

export interface UserProfile {
  name: string;
  mbti: string;
  birthDate: string; // YYYY-MM-DD
  birthTime: string; // HH:MM
  gender: 'male' | 'female' | 'other';
  height?: string;
  weight?: string;
  traits: string; // Free text for quirks, self-perception
}

export interface PlanStep {
  id: string;
  text: string;
  isCompleted: boolean;
  type: 'micro' | 'milestone'; // micro for activation energy, milestone for long term
}

export interface CoachAnalysis {
  userAnalysis: string; // Deep dive into MBTI + BaZi structure
  baziTiming: string; // Current month/year interaction (e.g., Shen-Zi-Chen water bureau)
  taskClassification: string; // Why it was classified this way
  strategy: string; // Fogg model or Learning Curve theory application
  motivationalQuote: string; // Personalized based on "Gods" (e.g., Seven Killings needs toughness)
}

export interface CoachResponse {
  analysis: CoachAnalysis;
  steps: string[]; // Raw strings from AI, converted to PlanStep in UI
  taskType: TaskType;
}
