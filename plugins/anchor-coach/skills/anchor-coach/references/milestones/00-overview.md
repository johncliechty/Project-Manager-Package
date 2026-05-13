---
name: anchor-coach-milestones-overview
kind: overview
title: "Anchor Curriculum — Milestone Overview"
parent: anchor-coach
description: "Index of the seven Anchor milestones with one-line intents and rubric file pointers. The Anchor Coach reads this when it needs to orient itself; the student reads it when they want to see the whole map."
---

# Anchor Curriculum — The Seven Milestones

| # | Name | Intent (one sentence) | Time | Rubric file |
|---|---|---|---|---|
| **M0** | **Setup** | Cowork, gh CLI, project folder, and the Anchor coach are all loaded and ready. | ~30 min | [`00-setup.md`](./00-setup.md) *(stub)* |
| **M1** | **Brainstorm** | You've described what you want in plain English, with examples, and what it deliberately *won't* do — no code, no implementation nouns. | ~60 min | [`01-brainstorm.md`](./01-brainstorm.md) |
| **M2** | **Describe** | A picture of the finished tool. The data nouns and the interactions. Still no code. | ~60–90 min | [`02-describe.md`](./02-describe.md) *(stub)* |
| **M3** | **Scaffold** | The empty shell loads in the browser. The student can see what they're going to fill in. | ~45 min | [`03-scaffold.md`](./03-scaffold.md) *(stub)* |
| **M4** | **Build** | All six features work: add, complete, delete, group by project, persist, polish. One commit per feature. | ~2–4 hours | [`04-build.md`](./04-build.md) *(stub)* |
| **M5** | **Test** | The student has run every scenario from M1, found at least one bug, and fixed it. | ~30 min | [`05-test.md`](./05-test.md) *(stub)* |
| **M6** | **Ship** | Public GitHub repo. README. Screenshot. A friend has clicked the link. | ~20 min | [`06-ship.md`](./06-ship.md) *(stub)* |

## How the agent uses this file

On every turn, the Anchor Coach reads `.project-manager/state.json` to find the current milestone, then opens the matching rubric file from this folder. The coach does *not* preload all seven rubric files — that's the progressive-disclosure rule. One milestone at a time.

The stub files in this folder (M0, M2–M6) are placeholders to be filled in the next deliverable turn. The full M1 rubric is complete and serves as the format reference.

## How the student uses this file

You can read this whenever you want to see the whole map. Some students like seeing it; others find it overwhelming. The coach won't show it to you unprompted — if you want it, ask.

The promise of the map: each milestone is a real gate, not a stage. You don't move on until the rubric for that milestone is ✓ across the board. The coach will tell you exactly what's still red and exactly what to do about it. There is no "I think you got it." There's green, or there's a specific thing to fix.
