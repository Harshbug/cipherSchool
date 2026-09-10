import { apiFetch } from '@/api/client';
import {
  mapEvaluationResult,
  mapHistoryItem,
  type ApiAttempt,
  type ApiAttemptDetail,
  type ApiHistoryItem,
} from '@/api/mappers';
import type { AttemptHistoryItem, EvaluationResult } from '@/types';


export const LEARNER_ID = 'demo-learner';

export async function startAttempt(problemId: string): Promise<ApiAttempt> {
  return apiFetch<ApiAttempt>('/api/attempts', {
    method: 'POST',
    body: JSON.stringify({ problemId, learnerId: LEARNER_ID }),
  });
}

export async function submitAttempt(attemptId: string, content: string): Promise<ApiAttempt> {
  return apiFetch<ApiAttempt>(`/api/attempts/${attemptId}/submit`, {
    method: 'POST',
    body: JSON.stringify({ content }),
  });
}

export async function fetchAttemptDetail(attemptId: string): Promise<ApiAttemptDetail> {
  return apiFetch<ApiAttemptDetail>(`/api/attempt/${attemptId}`);
}

export async function fetchEvaluationResult(attemptId: string): Promise<EvaluationResult> {
  const detail = await fetchAttemptDetail(attemptId);
  return mapEvaluationResult(detail);
}

export async function fetchAttemptHistory(
  learnerId: string = LEARNER_ID
): Promise<AttemptHistoryItem[]> {
  const data = await apiFetch<ApiHistoryItem[]>(`/api/learners/${learnerId}/attempts`);
  return data.map(mapHistoryItem);
}
