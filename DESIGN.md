# Design - LLD Practice Platform

## Design Overview

The platform is built to make Low-Level Design practice repeatable.

Instead of giving one-time feedback, learners can attempt a problem, receive structured feedback, and compare progress across multiple attempts.

## Design Approach

The system follows a simple structure where each part has a single responsibility.

- **Problem** stores the question and requirements.
- **Submission** stores the learner's design.
- **Attempt** represents one complete practice session.
- **Evaluation** stores scores and feedback.

The goal was to keep the flow easy to understand without adding unnecessary layers.

## Workflow

1. Learner selects an LLD problem.
2. Reads the requirements.
3. Writes a text-based design.
4. Submits it for evaluation.
5. Reviews rubric-based feedback.
6. Creates another attempt if they want to improve.

Every attempt is stored instead of replacing older ones, making progress measurable over time.

## Core Components

### Problem
Stores the design question and its requirements.

### Submission
Contains the learner's written design.

### Attempt
Tracks a single practice session and its evaluation status.

### Evaluation
Stores criterion-wise scores, evidence, and improvement suggestions.

### Rubric
Defines the fixed scoring criteria used during evaluation.

## Key Design Decisions

### Text-Based Submission

The MVP accepts text instead of code or diagrams. This captures design reasoning without requiring a diagram editor or code execution pipeline.

### Separate Attempts

Each submission creates a new attempt instead of overwriting previous work, allowing learners to compare improvements across multiple revisions.

### Evaluator Interface

Evaluation is placed behind an `Evaluator` interface so the practice flow is not tied to a single AI model. Other evaluators can be added later without changing the rest of the system.

### Asynchronous Evaluation

Submissions are stored first, then evaluated in the background. This keeps the API responsive while avoiding unnecessary queue infrastructure for the MVP.

## Trade-offs

The scope stays focused on the core practice experience.

- No authentication.
- No advanced concurrency handling.
- No distributed queue system.

These features were intentionally left out to keep the implementation practical while leaving room for future improvements.