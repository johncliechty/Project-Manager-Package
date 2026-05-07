# CLAUDE.md — {{PROJECT_NAME}}

*This file is what Claude Code reads first when opened in this project. Everything below is also in `AGENTS.md`; the only Claude-specific bits are at the bottom.*

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

**The bounded-iteration rule is enforced.** Two critique passes per section, then build, even if it still feels imperfect. The build teaches things planning can't.

## Useful commands

- `pm status` — current state.
- `pm what-now` — ranked next actions.
- `pm log "<entry>"` — append session log.
- `pm log --decision "<entry>"` — append decisions ledger.
- `pm brief` — refresh investor brief.
- `pm critique <file>` — bounded 2-pass critique.

## Standing rules

- Never paste secrets into chat or files outside `.env`.
- Never push to a remote without explicit permission.
- Never delete files in bulk without listing first.
- Plan is provisional — edit it freely as the build teaches you things.
- One thing at a time when in doubt.

## Claude Code specifics

- Skills available to this project: `.claude/skills/` (if junctioned). Project-specific skills live at `skills/`.
- Plan mode (Shift+Tab) is encouraged for any change >50 LOC.
- Use `/clear` between unrelated subtasks to keep context lean.
- When you make non-obvious choices, log them: `pm log --decision "<entry>"`.
- The `project-manager` skill auto-triggers when you bootstrap, plan, decompose, log, or refresh briefs. You can force-trigger it by saying "use the project-manager skill".
