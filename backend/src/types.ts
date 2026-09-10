interface Problem{
    id:string;
    title:string;
    statement:string;
    requirements:string[];
    constraints:string[];
}

interface Submission {
    id:string;
    attemptId:string;
    //diagram/code later
    type:"text";
    content:string;
    submittedAt:Date;
}

//designing rubric constants

type CriterionKey= "requirementUnderstanding"|"responsibilities"|"couplingCohesion"|"abstraction"|"extensibility"|"explanationQuality";

interface RubricCriterion {
    key:CriterionKey;
    label:string;
    description:string;
    weight:number;
}

const RUBRIC: RubricCriterion[] = [
  { key: "requirementUnderstanding", label: "Requirement Understanding", weight: 0.15,
    description: "Does the design address the stated requirements and constraints?" },
  { key: "responsibilities", label: "Class Responsibilities", weight: 0.2,
    description: "Does each class/interface have a single, clear responsibility?" },
  { key: "couplingCohesion", label: "Coupling & Cohesion", weight: 0.2,
    description: "Are related behaviors grouped together, and are dependencies minimized?" },
  { key: "abstraction", label: "Abstraction & Interfaces", weight: 0.15,
    description: "Are abstractions used where they add value, not just for their own sake?" },
  { key: "extensibility", label: "Extensibility", weight: 0.2,
    description: "Could a stated future requirement be added without a major rewrite?" },
  { key: "explanationQuality", label: "Explanation Quality", weight: 0.1,
    description: "Is the reasoning behind decisions clear and well justified?" },
];
type EvaluationStatus="evaluating" | "completed" | "failed";

interface CriterionResult {
    key:CriterionKey;
    score:number;
    evidence:string;
    concern:String;
    suggestion:string;
    confidence:number;
}

interface Evaluation{
    id:string;
    attemptId:string;
    status:EvaluationStatus;
    //results from llm
    results?:CriterionResult[];
    //overall score provided my llm
    overallScore?:number;
    //any unexpected error caught in midway 
    errorMessage?:string;
    createdAt:Date;
    completedAt?:Date;
}
//it will provide the result irrespective of any business assigning IDs or timestamps
interface Evaluator {
  evaluate(problem: Problem, submission: Submission): Promise<Omit<Evaluation, "id" | "attemptId" | "createdAt">>;
}

type AttemptStatus = "in_progress" | "submitted" | "evaluating" | "completed" | "failed";

//attempt lifecycle in_progress → submitted → evaluating → completed
interface Attempt {
    id:string;
    problemId:string;
    learnerId:string;
    status:AttemptStatus;
    submissionId?:string;
    evaluationId?:string;
    createdAt:Date;
    updatedAt:Date;

}
export type {
  Problem, Submission, RubricCriterion, CriterionKey, CriterionResult,
  Evaluation, EvaluationStatus, Evaluator, Attempt, AttemptStatus,
};
export { RUBRIC };