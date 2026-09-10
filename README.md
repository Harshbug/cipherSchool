# LLD Practice Platform

A small practice tool where a learner picks a Low-Level Design problem, submits a text-based design, and receives structured, rubric-based AI feedback — with attempt history to track improvement over time.

## Stack

- **Frontend:** React + Vite + TypeScript, Tailwind CSS
- **Backend:** Express + TypeScript, MongoDB (Mongoose)
- **AI evaluation:** Gemini API (`gemini-3.5-flash-lite`, free tier)

## Setup

### Backend

```bash
cd backend
npm install
```

Create a `.env` file in `backend/` (same level as `package.json`, **not** inside `src/`) with:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/lld-practice
GEMINI_API_KEY=your_key_here
```

Get a free Gemini API key at [aistudio.google.com/apikey](https://aistudio.google.com/apikey).

Seed the database with the 3 practice problems (run once):
```bash
npm run seed
```

Start the server:
```bash
npm run dev
```

Run tests:
```bash
npm test
```

### Frontend

```bash
cd frontend/project
npm install
npm run dev
```

Open the printed local URL (default `http://localhost:5173`).

## How it works

1. **Choose a problem** from the practice list.
2. **Write a design** — classes, responsibilities, relationships, reasoning — as text.
3. **Submit** — the submission is saved immediately, then evaluation runs asynchronously against Gemini using a fixed rubric.
4. **Review feedback** — per-criterion scores (0-10) with evidence, concerns, and suggestions, plus a weighted overall score.
5. **Check history** — all past attempts across problems, with status and score, to track improvement.

## Key design decisions

- **Text-based submissions**, not code or diagrams — smallest format that still gives an evaluator enough signal on design reasoning, given the 1-day build window.
- **`Evaluator` interface** with `AIEvaluator` as the only implementation — the one deliberate abstraction in the codebase, so a rule-based or human-review evaluator could be added later without touching the practice-loop logic.
- **Rubric is a constant config object**, not a class — it's data with no behavior, so a class would add ceremony with no benefit.
- **Evaluation runs asynchronously**, no message queue — the submission is persisted before evaluation starts (so nothing is lost on failure), and the attempt/evaluation status moves through `evaluating → completed/failed`. The frontend polls for the result.
- **Overall score is computed in application code**, not by the LLM — Gemini scores each criterion (subjective judgment), the weighted sum is plain arithmetic done in TypeScript (deterministic, no reason to trust an LLM with it).

See `DESIGN.md` and `RESEARCH.md` for the full reasoning, and `AI_USAGE.md` for AI-assisted decisions made during the build.

## Known limitations

- No authentication — a plain learner identifier string is used instead of real accounts.
- Duplicate-submission protection is a status check, not an atomic database lock — sufficient at this scale, not safe under real concurrent load.
- `Evaluation`'s status-dependent fields (`results`, `overallScore`, `errorMessage`) are modeled as optional fields on one type rather than a discriminated union per status — faster to build for a prototype, a stricter type would be preferable in production.
- Only one submission format (text) and one evaluator (Gemini) are implemented, though the domain model is designed to support additional ones without a rewrite.
- Gemini's free tier has request-rate limits; heavy concurrent use will hit them.
