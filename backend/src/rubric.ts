
import type { RubricCriterion } from "./types";

export const RUBRIC: RubricCriterion[] = [
  {
    key: "requirementUnderstanding",
    label: "Requirement Understanding",
    description: "Does the design address the stated requirements and constraints?",
    weight: 0.15,
  },
  {
    key: "responsibilities",
    label: "Class Responsibilities",
    description: "Does each class/interface have a single, clear responsibility?",
    weight: 0.2,
  },
  {
    key: "couplingCohesion",
    label: "Coupling & Cohesion",
    description: "Are related behaviors grouped together, and are dependencies minimized?",
    weight: 0.2,
  },
  {
    key: "abstraction",
    label: "Abstraction & Interfaces",
    description: "Are abstractions used where they add value, not just for their own sake?",
    weight: 0.15,
  },
  {
    key: "extensibility",
    label: "Extensibility",
    description: "Could a stated future requirement be added without a major rewrite?",
    weight: 0.2,
  },
  {
    key: "explanationQuality",
    label: "Explanation Quality",
    description: "Is the reasoning behind decisions clear and well justified?",
    weight: 0.1,
  },
];