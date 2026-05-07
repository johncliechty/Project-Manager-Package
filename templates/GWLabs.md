# GWLabs.md — {{PROJECT_NAME}}

*Ghost World Labs-specific orientation. Only present on projects bootstrapped inside the GWL Agentic Sandbox. Generic agents can ignore this; GWL agents should read it.*

## GWL context

This project is being run inside the Ghost World Labs sandbox. That means:

- The canonical workspace is `C:\dev\Agentic-Home\` (local NVMe, not OneDrive).
- The agent runtime is **OpenClaw** (global npm install).
- The dispatcher is the GWL master GUI (`Launch-Ghost-World-Labs.bat` → `sandbox-lab-gui/`).
- Agent personas live at `Sandbox Setup Package/PERSONAS/global/<id>-personal-manager.md`.
- Routing is at `Sandbox Setup Package/config/routing.json`.

## API-key contract (do not violate)

- The user's interactive **Cowork / Claude Code** session uses the user's subscription. **No API key.**
- Agents launched **inside this project** through OpenClaw / agent-chat use API keys from the workspace `.env` (`GEMINI_API_KEY`, `ANTHROPIC_API_KEY`).

When this project's Cowork session is editing the project-manager skill or the project itself, it does *not* spend API budget. When the project's logic dispatches a task to an Alpha or prime-coder agent, it *does*. Don't blur the line.

## How this project intersects with the master plan

GWL has a top-level `Master Rollout Plan v4`. Projects managed by this skill are first-class items in v4 — they get an entry, a North Star, and a place in the master roadmap. When a section in *this* project's `MASTER-PLAN.md` is marked `built`, mention it in the next session log on the GWL master plan, so the master plan's "recently completed" list stays current.

## Skills

GWL maintains a master skill repository at the PSU OneDrive path (see workspace `CLAUDE.md`). The `project-manager` skill is one of those skills. Per-project skill copies in this project's `skills/` folder are *additions* on top of the global set, not replacements.

## Backups in GWL context

- **Local git** is the default, always.
- **GitHub remote** is encouraged. If the project is shareable, push it to the GWL GitHub org once it's worth showing.
- **Backblaze B2 / Cloudflare R2** for `data/` is encouraged when the project accumulates non-trivial data. The GWL workspace has the `rclone` config conventions documented at `references/backup-options.md` in the project-manager-kit.

## When to spawn a GWL agent vs do it yourself

- **Yourself (Cowork):** planning, writing, single-file edits, design-doc work, project-manager operations. Subscription-paid; no metered cost.
- **Spawn an agent:** code generation across many files, deep research, training-loop runs, anything benefiting from a long-running autonomous turn. Metered against `.env` keys.

When you spawn, log it in `logs/decisions/` with the model used and approximate token count if you can — this is how the project's budget telemetry gets honest.
