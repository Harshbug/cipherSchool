import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../models/Attempt", () => ({
  AttemptModel: {
    findById: vi.fn(),
  },
}));
vi.mock("../models/Submission", () => ({
  SubmissionModel: { create: vi.fn() },
}));
vi.mock("../models/Evaluation", () => ({
  EvaluationModel: { create: vi.fn(), findByIdAndUpdate: vi.fn() },
}));

import { AttemptModel } from "../models/Attempt";
import { submitAttempt } from "./attempService";

describe("submitAttempt — duplicate submission guard", () => {
  beforeEach(() => vi.clearAllMocks());

  it("throws if the attempt is not in_progress", async () => {
    (AttemptModel.findById as any).mockResolvedValue({
      status: "submitted", // already submitted once
    });

    await expect(submitAttempt("fake-id", "some design text"))
      .rejects.toThrow("Attempt already submitted");
  });

  it("throws if the attempt does not exist", async () => {
    (AttemptModel.findById as any).mockResolvedValue(null);

    await expect(submitAttempt("missing-id", "some design text"))
      .rejects.toThrow("Attempt not found");
  });
});