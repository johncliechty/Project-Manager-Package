# GEMINI.md — {{PROJECT_NAME}}

*This file is what Gemini CLI reads first when opened in this project. Everything below is also in `AGENTS.md`; the Gemini-specific bits are at the bottom.*

## What this project is

{{ONE_LINER}}

Full description: `PROJECT.md`. Current plan: `MASTER-PLAN.md`. Today's notes: `logs/sessions/{{TODAY}}.md`.

## Read this before doing anything

1. `PROJECT.md` — the problem and the goal.
2. `MASTER-PLAN.md` — current plan with section statuses.
3. `logs/sessions/` last 5 files — what happened recently.
4. `logs/decisions/` — what's been decided and why.

## Operating loop

This project uses the **project-manager** skill (`{{KIT_PATH}}`). The loop is: research → proto-plan → critique (bounded to 2 passes) → decompose → build → log → review.

**The bounded-iteration rule is enforced.** Two critique passes per section, then build.

## Useful commands

- `pm status`
- `pm what-now`
- `pm log "<entry>"`
- `pm log --decision "<entry>"`
- `pm brief`
- `pm critique <file>`

## Standing rules

- Never paste secrets into chat or files outside `.env`.
- Never push to a remote without explicit permission.
- Never delete files in bulk without listing first.
- Plan is provisional.
- One thing at a time when in doubt.

## Gemini CLI specifics

- Skills available to this project: `.gemini/skills/` (if junctioned). Project-specific skills live at `skills/`.
- Long-context Gemini models are useful for absorbing the whole project state at session start (`PROJECT.md` + `MASTER-PLAN.md` + last 5 session logs); take advantage of it.
- When you make non-obvious choices, log them: `pm log --decision "<entry>"`.
