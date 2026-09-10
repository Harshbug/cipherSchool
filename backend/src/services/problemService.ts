import { ProblemModel } from "../models/Problem";

export async function listProblem() {
    return ProblemModel.find().select("title statement requirements constraints");
}

export async function getProblem(id: string) {
    return ProblemModel.findById(id);
}