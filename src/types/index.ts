export type NavTab = 
  | 'home' 
  | 'lessons' 
  | 'stories' 
  | 'video' 
  | 'map' 
  | 'games' 
  | 'worksheet' 
  | 'results';

export interface TeaserQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface CharacterCard {
  id: string;
  name: string;
  roleTitle: string;
  description: string;
  iconName: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LessonScene {
  step: number;
  title: string;
  description: string;
  question: string;
  options: string[];
  correctIndex: number;
}

export interface MoralValue {
  title: string;
  meaning: string;
  schoolExample: string;
  icon: string;
}

export interface LessonChapter {
  id: number;
  title: string;
  subtitle: string;
  readTime: string;
  summary: string;
  content: string[];
  teaser?: TeaserQuestion;
  characters?: CharacterCard[];
  scenes?: LessonScene[];
  morals?: MoralValue[];
  reflection?: {
    question: string;
    sampleThoughts: string[];
  };
}

export interface StorySlide {
  id: number;
  title: string;
  subtitle: string;
  narration: string;
  historicalFact: string;
  altText: string;
  sceneType: 'makkah' | 'mountain_track' | 'cave_tsur' | 'desert_journey' | 'oasis_outskirts' | 'ansar_welcome' | 'nabawi_building' | 'brotherhood_today';
  interactiveQuestion: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface JourneyStop {
  id: string;
  stepNumber: number;
  name: string;
  historicalName?: string;
  subtitle: string;
  distanceInfo: string;
  description: string;
  eventDetails: string[];
  moralLesson: string;
  coordinates: { x: number; y: number }; // Percentage in custom SVG map
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    feedback: string;
  };
}

export interface WorksheetQuestionPG {
  id: number;
  type: 'LOTS' | 'MOTS' | 'HOTS';
  question: string;
  options: string[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
}

export interface WorksheetQuestionIsian {
  id: number;
  type: 'MOTS' | 'HOTS';
  question: string;
  acceptedKeywords: string[];
  idealAnswer: string;
  scoringGuide: string;
}

export interface WorksheetSubmission {
  studentName: string;
  studentClass: string;
  submissionDate: string;
  pgAnswers: Record<number, 'A' | 'B' | 'C' | 'D'>;
  isianAnswers: Record<number, string>;
  pgScore: number; // Max 50
  isianScore: number; // Max 50
  totalScore: number; // Max 100
  correctCountPG: number;
  reviewedIsian: Record<number, { score: number; feedback: string; status: 'correct' | 'partial' | 'review_needed' | 'incorrect' }>;
  feedbackCategory: 'hebat' | 'bagus' | 'berkembang' | 'semangat';
  strengths: string[];
  improvementAreas: string[];
  nextSteps: string[];
}

export interface UserProgress {
  stars: number;
  completedLessons: number[]; // Lesson chapter IDs [1..6]
  completedStories: number[]; // Story slide IDs [1..8]
  visitedMapStops: string[]; // Map stop IDs
  gameCompleted: {
    orderGame: boolean;
    characterMatch: boolean;
    valueMission: boolean;
  };
  lastWorksheetScore: number | null;
  lastWorksheetSubmission: WorksheetSubmission | null;
  audioNarrationEnabled: boolean;
}
