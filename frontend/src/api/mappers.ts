import type {
  AttemptHistoryItem,
  AttemptStatus,
  CriterionResult,
  EvaluationResult,
  Problem,
} from '@/types';

/** Rubric labels mirrored from backend/src/rubric.ts */
const CRITERION_LABELS: Record<string, string> = {
  requirementUnderstanding: 'Requirement Understanding',
  responsibilities: 'Class Responsibilities',
  couplingCohesion: 'Coupling & Cohesion',
  abstraction: 'Abstraction & Interfaces',
  extensibility: 'Extensibility',
  explanationQuality: 'Explanation Quality',
};

const CRITERION_MAX_SCORE = 10;
const OVERALL_MAX_SCORE = 100;

export interface ApiProblem {
  _id: string;
  title: string;
  statement: string;
  requirements?: string[];
  constraints?: string[];
}

export interface ApiCriterionResult {
  key: string;
  score: number;
  evidence: string;
  concern: string;
  suggestion: string;
  confidence?: number;
}

export interface ApiEvaluation {
  _id: string;
  attemptId: string;
  status: 'evaluating' | 'completed' | 'failed';
  results?: ApiCriterionResult[];
  overallScore?: number;
  errorMessage?: string;
  createdAt?: string;
  completedAt?: string;
}

export interface ApiAttempt {
  _id: string;
  problemId: string;
  learnerId: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiSubmission {
  _id: string;
  attemptId: string;
  content: string;
  submittedAt?: string;
}

export interface ApiAttemptDetail {
  attempt: ApiAttempt | null;
  submission: ApiSubmission | null;
  evaluation: ApiEvaluation | null;
  problem: ApiProblem | null;
}

export interface ApiHistoryItem {
  id: string;
  problemTitle: string;
  date: string;
  status: AttemptStatus;
  score: number | null;
  maxScore: number;
}

function excerptFromStatement(statement: string): string {
  const trimmed = statement.trim();
  if (trimmed.length <= 160) return trimmed;
  return `${trimmed.slice(0, 157).trimEnd()}...`;
}

export function mapProblem(api: ApiProblem): Problem {
  return {
    id: api._id,
    title: api.title,
    excerpt: excerptFromStatement(api.statement),
    statement: api.statement,
    requirements: api.requirements ?? [],
    constraints: api.constraints ?? [],
  };
}

function mapCriterion(result: ApiCriterionResult): CriterionResult {
  return {
    id: result.key,
    name: CRITERION_LABELS[result.key] ?? result.key,
    score: result.score,
    maxScore: CRITERION_MAX_SCORE,
    evidence: result.evidence,
    concern: result.concern,
    suggestion: result.suggestion,
  };
}

function mapAttemptStatus(status: string | undefined): AttemptStatus {
  if (status === 'completed' || status === 'failed') return status;
  return 'evaluating';
}

/** Backend overallScore is 0–10 (weighted); UI expects 0–100. */
function toDisplayOverallScore(score: number | undefined): number {
  if (score == null) return 0;
  return Math.round(score * 10);
}

export function mapEvaluationResult(detail: ApiAttemptDetail): EvaluationResult {
  const attemptId = detail.attempt?._id ?? '';
  const evaluation = detail.evaluation;
  const status = mapAttemptStatus(evaluation?.status ?? detail.attempt?.status);

  return {
    attemptId,
    problemTitle: detail.problem?.title ?? 'Unknown problem',
    status,
    overallScore: toDisplayOverallScore(evaluation?.overallScore),
    maxOverallScore: OVERALL_MAX_SCORE,
    submittedAt:
      detail.submission?.submittedAt ??
      detail.attempt?.createdAt ??
      new Date().toISOString(),
    criteria: (evaluation?.results ?? []).map(mapCriterion),
  };
}

export function mapHistoryItem(item: ApiHistoryItem): AttemptHistoryItem {
  return {
    id: item.id,
    problemTitle: item.problemTitle,
    date: item.date,
    status: item.status,
    score: item.score,
    maxScore: item.maxScore,
  };
}
