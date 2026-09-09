import { ProblemModel } from "../models/Problem";

export async function listProblems() {
    return ProblemModel.find().select("title statement")

}

export async function getProblems() {
    return ProblemModel.findById(id);
}

