import { Schema, model, Types } from "mongoose";

interface Submission {
  _id: Types.ObjectId;
  attemptId: Types.ObjectId;
  type: "text";
  content: string;
}

const submissionSchema = new Schema<Submission>(
  {
    attemptId: { type: Schema.Types.ObjectId, ref: "Attempt", required: true },
    type: { type: String, enum: ["text"], required: true },
    content: { type: String, required: true },
  },
  {
    timestamps: {
      createdAt: "submittedAt",
      updatedAt: false,
    },
  }
);

export const SubmissionModel = model<Submission>("Submission", submissionSchema);