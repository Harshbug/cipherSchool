import type { Problem, Submission, CriterionResult } from "../types";

export interface Evaluator {
  evaluate(problem: Problem, submission: Submission): Promise<{
    results: CriterionResult[];
    overallScore: number;
  }>;
}