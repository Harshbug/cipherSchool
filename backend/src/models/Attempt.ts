import { Schema, model, Types } from "mongoose";

interface Attempt {
  _id: Types.ObjectId;
  problemId: Types.ObjectId;
  learnerId: string;
  status: "in_progress" | "submitted" | "evaluating" | "completed" | "failed";
  submissionId?: Types.ObjectId;
  evaluationId?: Types.ObjectId;
}

const attemptSchema = new Schema<Attempt>(
  {
    problemId: { type: Schema.Types.ObjectId, ref: "Problem", required: true },
    learnerId: { type: String, required: true },
    status: {
      type: String,
      enum: ["in_progress", "submitted", "evaluating", "completed", "failed"],
      default: "in_progress",
      required: true,
    },
    submissionId: { type: Schema.Types.ObjectId, ref: "Submission" },
    evaluationId: { type: Schema.Types.ObjectId, ref: "Evaluation" },
  },
  { timestamps: true }
);

export const AttemptModel = model<Attempt>("Attempt", attemptSchema);