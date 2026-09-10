export interface Problem {
  id: string;
  title: string;
  excerpt: string;
  statement: string;
  requirements: string[];
  constraints: string[];
}

export type AttemptStatus = 'evaluating' | 'completed' | 'failed';

export interface CriterionResult {
  id: string;
  name: string;
  score: number;
  maxScore: number;
  evidence: string;
  concern: string;
  suggestion: string;
}

export interface EvaluationResult {
  attemptId: string;
  problemTitle: string;
  status: AttemptStatus;
  overallScore: number;
  maxOverallScore: number;
  submittedAt: string;
  criteria: CriterionResult[];
}

export interface AttemptHistoryItem {
  id: string;
  problemTitle: string;
  date: string;
  status: AttemptStatus;
  score: number | null;
  maxScore: number;
}
