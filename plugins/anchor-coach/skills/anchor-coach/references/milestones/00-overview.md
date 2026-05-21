---
name: anchor-coach-milestones-overview
kind: overview
title: "Anchor Curriculum — Milestone Overview"
parent: anchor-coach
description: "Index of the eight Anchor milestones with one-line intents and rubric file pointers. The Anchor Coach reads this when it needs to orient itself; the student reads it when they want to see the whole map."
---

# Anchor Curriculum — The Eight Milestones

| # | Name | Intent (one sentence) | Time | Rubric file |
|---|---|---|---|---|
| **M0** | **Setup** | The curriculum is loaded, your project folder has `.project-manager/` and a one-line README, and your tools (version control + a GitHub home) are set up at the start the dead-easy way — one double-click, no cut-and-paste; local-only fallback if you'd rather. | ~5 min | [`00-setup.md`](./00-setup.md) |
| **M1** | **Brainstorm** | You've described what you want in plain English, with examples, and what it deliberately *won't* do — no code, no implementation nouns. | ~10 min | [`01-brainstorm.md`](./01-brainstorm.md) |
| **M2** | **Describe** | A picture of the finished tool: the data nouns and the interactions. Still no code. | ~15 min | [`02-describe.md`](./02-describe.md) |
| **M3** | **Scaffold** | The empty shell loads in the browser. You picked from three mockups; you can see what you're going to fill in. | ~30–40 min | [`03-scaffold.md`](./03-scaffold.md) |
| **M4** | **Build** | All six features work: add, complete, delete, group by project, persist, polish — with agent-written tests. | ~10 min | [`04-build.md`](./04-build.md) |
| **M5** | **Test** | You've run every scenario from M1, found at least one bug, and fixed it. | ~10 min | [`05-test.md`](./05-test.md) |
| **M6** | **Ship** | Public GitHub repo, README, screenshot, a friend has clicked the link. (The coach handles `gh` install + auth here, where it's actually needed.) | ~15 min | [`06-ship.md`](./06-ship.md) |
| **M7** | **Launch** | A retrospective about your own work, the `/project-manager` meta-reveal, and your next project already bootstrapped. | ~25 min | [`07-launch.md`](./07-launch.md) |

Total: ~2 hours of session time, spread across whatever calendar feels right.

## How the agent uses this file

On every turn, the Anchor Coach reads `.project-manager/state.json` to find the current milestone, then opens the matching rubric file from this folder. The coach does *not* preload all eight rubric files — that's the progressive-disclosure rule. One milestone at a time.

**Setup is front-loaded and dead-easy.** M0 sets up the claude-code-bridge (one double-click of `Install-Bridge.bat`) and GitHub (the project's repo is created at the start -- a habit worth building), so commits and pushes are silent thereafter; it falls back to local-only via `bin/anchor-git.sh` if the student declines, so it never blocks. See `plugins/project-manager/skills/project-manager/references/host-setup.md` and `references/sandbox-and-git.md`. Sandboxed coaches never run git inside the mounted folder.

## How the student uses this file

You can read this whenever you want to see the whole map. Some students like seeing it; others find it overwhelming. The coach won't show it to you unprompted — if you want it, ask.

The promise of the map: each milestone is a real gate, not a stage. You don't move on until the rubric for that milestone is ✓ across the board. The coach will tell you exactly what's still red and exactly what to do about it. There is no "I think you got it." There's green, or there's a specific thing to fix.
