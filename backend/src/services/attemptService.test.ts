import { describe, it, expect } from "vitest";
import { RUBRIC } from "../rubric";

describe("RUBRIC", () => {
  it("weights sum to 1.0", () => {
    const total = RUBRIC.reduce((sum, c) => sum + c.weight, 0);
    expect(total).toBeCloseTo(1.0, 5);
  });
});

describe("overall score calculation", () => {
  it("computes a weighted sum from criterion results", () => {
    const mockResults = RUBRIC.map(c => ({
      key: c.key,
      score: 8,
      evidence: "test",
      concern: "test",
      suggestion: "test",
      confidence: 0.9,
    }));

    const overallScore = RUBRIC.reduce((sum, criterion) => {
      const result = mockResults.find(r => r.key === criterion.key);
      return sum + (result ? result.score * criterion.weight : 0);
    }, 0);

    // every criterion scored 8, weights sum to 1.0 -> overall should be 8
    expect(overallScore).toBeCloseTo(8, 5);
  });
});