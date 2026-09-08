import { Schema, model } from "mongoose";

const attemptSchema = new Schema({
  problemId: { type: Schema.Types.ObjectId, ref: "Problem", required: true },
  learnerId: { type: String, required: true },
  status: {
    type: String,
    enum: ["in_progress", "submitted", "evaluating", "completed", "failed"],
    required: true,
    default: "in_progress",
  },
  submissionId: { type: Schema.Types.ObjectId, ref: "Submission" },
  evaluationId: { type: Schema.Types.ObjectId, ref: "Evaluation" },
}, { timestamps: true });

export const AttemptModel = model("Attempt", attemptSchema);