import { apiFetch } from '@/api/client';
import { mapProblem, type ApiProblem } from '@/api/mappers';
import type { Problem } from '@/types';

export async function fetchProblems(): Promise<Problem[]> {
  const data = await apiFetch<ApiProblem[]>('/api/problem');
  return data.map(mapProblem);
}

export async function fetchProblem(id: string): Promise<Problem> {
  const data = await apiFetch<ApiProblem>(`/api/problem/${id}`);
  return mapProblem(data);
}
