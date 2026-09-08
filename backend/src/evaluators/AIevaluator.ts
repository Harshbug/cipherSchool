import {GoogleGenerativeAI} from "@google/generative-ai";
import { RUBRIC } from "../rubric";
import type {Evaluator} from "./Evaluator";
import type {Problem,Submission,CriterionResult} from "../types";

const genAI=new GoogleGenerativeAI(ProcessingInstruction.env.GEMINI_API_KEY);

export class AIEvaluator implements Evaluator {
  async evaluate(problem: Problem, submission: Submission) {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: { responseMimeType: "application/json" },
    });

    const prompt = this.buildPrompt(problem, submission);
    const response = await model.generateContent(prompt);
    const parsed = JSON.parse(response.response.text());

    const results: CriterionResult[] = parsed.results;
    const overallScore = RUBRIC.reduce((sum, criterion) => {
      const result = results.find(r => r.key === criterion.key);
      return sum + (result ? result.score * criterion.weight : 0);
    }, 0);

    return { results, overallScore };
  }

  private buildPrompt(problem: Problem, submission: Submission): string {
    return `You are evaluating a Low-Level Design submission against a fixed rubric.

Problem: ${problem.title}
Statement: ${problem.statement}
Requirements: ${problem.requirements.join(", ")}

Learner's submission:
${submission.content}

Score the submission on EACH of these criteria (0-10):
${RUBRIC.map(c => `- ${c.key}: ${c.description}`).join("\n")}

Respond ONLY with JSON matching this exact shape, one object per criterion:
{
  "results": [
    { "key": "...", "score": 0, "evidence": "...", "concern": "...", "suggestion": "...", "confidence": 0.0 }
  ]
}`;
  }
}