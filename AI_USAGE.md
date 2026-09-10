# AI Usage

I used Claude as a pair-programmer for backend architecture, domain modeling, and debugging, while an AI code-generation tool helped scaffold the frontend. The decisions below are the ones that actually affected the MVP.

## AI-Assisted Decisions

| AI Suggestion | Status | Why |
|---------------|--------|-----|
| Use text instead of code or diagrams | Accepted | Text captures LLD reasoning without building a code execution or diagramming system, which kept the MVP achievable within the time limit. |
| `Evaluator` as an interface | Accepted | The evaluation flow stays independent of a specific AI model, making it easier to add another evaluator later. |
| Rubric as a class | Rejected (my change) | The rubric is fixed data with no behavior, so keeping it as a constant object avoids unnecessary abstraction. |
| Asynchronous evaluation | Accepted | Submissions are stored first and evaluated in the background, keeping the API responsive without adding queues or workers. |

## Model Changes During Development

The original Gemini model (`gemini-2.0-flash`) became unavailable during development, and another free-tier replacement also stopped working. Instead of relying on an outdated model list, I switched to the model recommended by Google's API response.

This also validated the failure-handling flow: submissions are saved before evaluation starts, and if the AI call fails, the attempt is marked as `failed` instead of losing the user's work.