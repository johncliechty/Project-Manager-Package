---
name: anchor-coach-rubric-m0-setup
kind: rubric
title: "Milestone 0 — Setup — Acceptance Rubric"
parent: anchor-coach
description: "Agent-checkable acceptance criteria for Milestone 0 of the Anchor curriculum. The Anchor Coach reads this file at the start of every session until M0 is green, then never reads it again."
---

# Milestone 0 — Setup — Acceptance Rubric

**Intent (one sentence the student also reads):**
Cowork is running, the curriculum repo is reachable on disk, your project folder exists with `.project-manager/` inside it, and you've named the tool you want to build in one line. **GitHub setup (installing `gh`, authenticating) is deferred to L6** — most students never need to think about GitHub until then, and the original M0-mandated gh install was the curriculum's biggest dropout point.

## The boxes

Read each box. For each, check the project state. Mark it ✓ or ✗. **All five must be ✓ to advance to M1.**

- [ ] **Cowork is running.** The student is in the chat with you. (Implicit pass — if you're reading this rubric, this box is green.)
- [ ] **The curriculum repo is cloned somewhere on disk.** Typical location is `~/Project-Manager-Package/` (Windows: `C:\Users\<name>\Project-Manager-Package\`). Verify the SKILL.md is readable at `<clone>/plugins/anchor-coach/skills/anchor-coach/SKILL.md`. If the clone is missing, run `git clone https://github.com/johncliechty/Project-Manager-Package <chosen-path>` via bash and re-check.
- [ ] **`CLAUDE.md` exists in the student's project folder** with an absolute pointer at the SKILL.md inside the local clone of `Project-Manager-Package`. This file is what makes future Cowork sessions in this folder auto-load the skill without the student having to re-prompt. If it doesn't exist yet, write it now (see `SKILL.md` § *First-turn-ever bootstrap* for the exact content and template). If the path inside it is wrong or stale (e.g. the student moved the clone), fix the path now.
- [ ] **A project folder exists and contains `.project-manager/`.** The folder is at whatever path the student chose (their Desktop, `~/projects/anchor`, anywhere). The `.project-manager/` directory was created by the skill's init step and contains at minimum `state.json` and `config.yaml`. If `.project-manager/` doesn't exist yet, run the init step now.
- [ ] **`README.md` exists in the project folder with the student's name and a one-line "what is this."** Two lines: their name, and one sentence about what they're building. *"Anna Kim — a one-page personal task tracker that survives a closed lid."* Either the student wrote both lines themselves, or they gave the coach the two pieces (their name and a one-sentence what-Anchor-is) and the coach assembled them. This README will be expanded substantially in M6; right now it's a one-line placeholder so the project has a face.

**Deferred to L6:** `gh` install and `gh auth login`. Earlier versions of the curriculum required these at M0; in practice that consumed ~30 minutes from real students and was the single biggest cause of curriculum dropout. GitHub setup now happens at L6 (Ship), where it's actually needed, executed silently by the coach via the Setup Protocol — see `references/STYLE.md` for the Setup Protocol and `plugins/use-claude-code/skills/use-claude-code/SKILL.md` for host-delegation when the coach is running in a sandboxed runtime.

## How you tell the student where they are

M0 should clear in ~5 minutes for most students now that the gh install is deferred. If a box is red, name it and fix it on the spot — execute, don't narrate (per the Real-Intent Protocol in `STYLE.md`).

> *"Almost ready to start M1. One thing: your project folder doesn't have a README yet — give me your name and one sentence about what Anchor is for you, and I'll write the first version. We'll handle the GitHub side of things at L6 when we actually need it; no install grinding upfront."*

By M1 the file system is reachable, the curriculum repo is cloned, the project folder exists, and the student is ready to write. No PowerShell, no installs, no authentication waits.

## Why this rubric

M0 is the only milestone whose deliverable is *the environment is ready.* Every other milestone produces an artifact about the project; this one produces the conditions that let artifacts exist at all. The reason it's a real milestone (and not just a sentence in the L1 intro) is that **most first-project failures happen before line one is written** — the student couldn't authenticate to GitHub, couldn't find their project folder, didn't know whether they were in the right working directory. M0 surfaces all of that into a short rubric the coach reads on every turn until green.

M0 is intentionally light on installs. The original design forced `gh` install and authentication here; in real-student piloting that consumed ~30 minutes and was the curriculum's single biggest dropout point. The fix is to defer GitHub entirely until L6 — where it's actually needed — and have the coach execute the install and `gh auth login` walkthrough silently at that moment via the Setup Protocol. When the coach is running in a sandboxed runtime that lacks host-shell access (Cowork's Linux sandbox), the host operation is delegated to Claude Code via the `use-claude-code` skill (one paste, one report-back). The student does not type PowerShell commands at any point.

The "gh CLI, not a PAT" preference still holds when L6 sets it up. Personal access tokens are the dominant beginner failure mode — they expire, they get pasted into screenshots, they end up in `.bash_history`. The browser-based device-code flow has none of those failure modes and works on every OS. The coach uses `gh auth login --web` and never anything else.

The one-line README is the smallest possible answer to *"what is this folder?"* For most of the course the README is a one-liner; M6 expands it to four parts (screenshot, run instructions, credits) when there are external readers. Until then it's enough that there's a face on the folder.
