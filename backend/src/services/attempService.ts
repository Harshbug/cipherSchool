// src/services/attemptService.ts
import { AttemptModel } from "../models/Attempt";
import { SubmissionModel } from "../models/Submission";
import { EvaluationModel } from "../models/Evaluation";
import { ProblemModel } from "../models/Problem";
import { AIEvaluator } from "../evaluators/AIEvaluator";
import { Types } from "mongoose";
const evaluator = new AIEvaluator();

export async function startAttempt(problemId: string, learnerId: string){
  return AttemptModel.create({ problemId, learnerId, status: "in_progress" });
}

export async function submitAttempt(attemptId: string, content: string) {
  const attempt = await AttemptModel.findById(attemptId);
  if (!attempt) throw new Error("Attempt not found");
  if (attempt.status !== "in_progress") {
    throw new Error("Attempt already submitted"); // duplicate-submission guard
  }

  // Store submission FIRST, before evaluation starts — per the guide,
  // so nothing is lost if the AI call fails.
  const submission = await SubmissionModel.create({
    attemptId, type: "text", content,
  });

  const evaluation = await EvaluationModel.create({
    attemptId, status: "evaluating",
  });
  attempt.submissionId = submission._id as Types.ObjectId;
  attempt.evaluationId = evaluation._id as Types.ObjectId;
  attempt.status = "evaluating";
  await attempt.save();
   

  // Fire evaluation without blocking the response — learner sees
  // "evaluating" status immediately, poll/fetch for the result later.
  runEvaluation(attempt.id, evaluation.id, submission.id).catch(err =>
    console.error("Evaluation failed to even start:", err)
  );

  return attempt;
}

async function runEvaluation(attemptId: string, evaluationId: string, submissionId: string) {
  try {
    const attempt = await AttemptModel.findById(attemptId);
    const submission = await SubmissionModel.findById(submissionId);
    const problem = await ProblemModel.findById(attempt!.problemId);

    const { results, overallScore } = await evaluator.evaluate(problem as any, submission as any);

    await EvaluationModel.findByIdAndUpdate(evaluationId, {
      status: "completed", results, overallScore, completedAt: new Date(),
    });
    await AttemptModel.findByIdAndUpdate(attemptId, { status: "completed" });
  } catch (err) {
    console.log("eval error",err);
    await EvaluationModel.findByIdAndUpdate(evaluationId, {
      status: "failed", errorMessage: (err as Error).message,
    });
    await AttemptModel.findByIdAndUpdate(attemptId, { status: "failed" });
  }
}

function mapHistoryStatus(status: string): "evaluating" | "completed" | "failed" {
  if (status === "completed" || status === "failed") return status;
  return "evaluating";
}

export async function getAttemptHistory(learnerId: string) {
  const attempts = await AttemptModel.find({ learnerId }).sort({ createdAt: -1 });

  return Promise.all(
    attempts.map(async (attempt) => {
      const problem = await ProblemModel.findById(attempt.problemId).select("title");
      const evaluation = attempt.evaluationId
        ? await EvaluationModel.findById(attempt.evaluationId)
        : await EvaluationModel.findOne({ attemptId: attempt._id });

      const overallScore =
        evaluation?.status === "completed" && evaluation.overallScore != null
          ? Math.round(evaluation.overallScore * 10)
          : null;
      
      return {
        id: attempt._id.toString(),
        problemTitle: problem?.title ?? "Unknown problem",
        date: (attempt as any).createdAt?.toISOString?.() ?? new Date().toISOString(),
        status: mapHistoryStatus(attempt.status),
        score: overallScore,
        maxScore: 100,
      };
    })
  );
}

export async function getAttemptDetail(attemptId: string) {
  const attempt = await AttemptModel.findById(attemptId);
  if (!attempt) {
    return { attempt: null, submission: null, evaluation: null, problem: null };
  }

  const [submission, evaluation, problem] = await Promise.all([
    attempt.submissionId
      ? SubmissionModel.findById(attempt.submissionId)
      : SubmissionModel.findOne({ attemptId: attempt._id }),
    attempt.evaluationId
      ? EvaluationModel.findById(attempt.evaluationId)
      : EvaluationModel.findOne({ attemptId: attempt._id }),
    ProblemModel.findById(attempt.problemId),
  ]);

  return { attempt, submission, evaluation, problem };
}