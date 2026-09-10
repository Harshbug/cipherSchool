# Research - LLD Practice Platform

## The Learner Problem

Low-Level Design problems are easy to attempt but difficult to evaluate.

Unlike DSA, there is rarely a single correct answer. Two learners can design the same problem with different class structures and still produce valid solutions. Without expert feedback, it is hard to know whether a design is actually improving or which part of it needs work.

## How Learners Currently Practice

### Self-study and Blog Posts

Reference solutions teach common patterns, but they do not evaluate the learner's own design. The comparison is completely manual.

### Coding Platforms

DSA platforms judge correctness through test cases, but that approach does not work well for LLD. A design can produce the same result while having very different quality in terms of responsibilities, coupling, and extensibility.

### Human Review

Mock interviews and mentor reviews provide valuable feedback, but they are difficult to repeat consistently for every practice attempt.

### General LLM Chat

Asking an LLM to review a design is flexible, but the quality depends on the prompt. Feedback is inconsistent across attempts, and there is no structured way to measure progress.

## Key Gaps

- No simple practice loop focused on **attempt → feedback → retry**.
- Feedback is often inconsistent, making different attempts difficult to compare.
- Most tools either rely on rigid checklists or leave everything to open-ended AI judgment.
- There is little separation between checks that can be done automatically and those that require design reasoning.

## Product Direction

The MVP focuses on a single repeatable workflow:

1. Choose an LLD problem.
2. Write a text-based design.
3. Submit it for evaluation.
4. Receive rubric-based feedback with per-criterion scores, evidence, and suggestions.
5. Compare the attempt with previous submissions.

The main idea is to use a fixed rubric with structured AI output so that feedback stays more consistent and progress becomes easier to track across multiple attempts.