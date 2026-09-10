// src/evaluators/AIEvaluator.failure.test.ts
import { describe, it, expect, vi } from "vitest";

vi.mock("@google/generative-ai", () => {
  return {
    GoogleGenerativeAI: class {
      getGenerativeModel() {
        return {
          generateContent: vi.fn().mockRejectedValue(new Error("Gemini API timeout")),
        };
      }
    },
  };
});

import { AIEvaluator } from "./AIEvaluator";

describe("AIEvaluator — failure handling", () => {
  it("propagates an error when the Gemini call fails", async () => {
    const evaluator = new AIEvaluator();
    const problem = { title: "Test", statement: "x", requirements: [] } as any;
    const submission = { content: "design text" } as any;

    await expect(evaluator.evaluate(problem, submission))
      .rejects.toThrow("Gemini API timeout");
  });
});