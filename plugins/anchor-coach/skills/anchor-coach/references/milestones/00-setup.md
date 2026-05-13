---
name: anchor-coach-rubric-m0-setup
kind: rubric
title: "Milestone 0 — Setup — Acceptance Rubric"
parent: anchor-coach
description: "Agent-checkable acceptance criteria for Milestone 0 of the Anchor curriculum. The Anchor Coach reads this file at the start of every session until M0 is green, then never reads it again."
---

# Milestone 0 — Setup — Acceptance Rubric

**Intent (one sentence the student also reads):**
Cowork is running, GitHub's CLI is installed and authenticated, your project folder exists with `.project-manager/` inside it, and you've named the tool you want to build in one line.

## The boxes

Read each box. For each, check the project state. Mark it ✓ or ✗. **All six must be ✓ to advance to M1.**

- [ ] **Cowork is running.** The student is in the chat with you. (Implicit pass — if you're reading this rubric, this box is green.)
- [ ] **The curriculum repo is cloned somewhere on disk.** Typical location is `~/Project-Manager-Package/` (Windows: `C:\Users\<name>\Project-Manager-Package\`). Verify the SKILL.md is readable at `<clone>/plugins/anchor-coach/skills/anchor-coach/SKILL.md`. If the clone is missing, run `git clone https://github.com/johncliechty/Project-Manager-Package <chosen-path>` via bash and re-check.
- [ ] **`CLAUDE.md` exists in the student's project folder** with an absolute pointer at the SKILL.md inside the local clone of `Project-Manager-Package`. This file is what makes future Cowork sessions in this folder auto-load the skill without the student having to re-prompt. If it doesn't exist yet, write it now (see `SKILL.md` § *First-turn-ever bootstrap* for the exact content and template). If the path inside it is wrong or stale (e.g. the student moved the clone), fix the path now.
- [ ] **`gh --version` returns a version ≥ 2.0.** Run the check; if it fails, walk the student through `winget install GitHub.cli` (Windows) or `brew install gh` (Mac). Re-check until green. This is the only software install the course asks for; everything else is browser-and-Cowork.
- [ ] **`gh auth status` shows the student authenticated to github.com.** If not, walk them through `gh auth login --web --git-protocol https --hostname github.com` — browser-based device-code flow, no PAT to copy, no SSH keys. Token lands in Windows Credential Manager or Mac Keychain automatically.
- [ ] **A project folder exists and contains `.project-manager/`.** The folder is at whatever path the student chose (their Desktop, `~/projects/anchor`, anywhere). The `.project-manager/` directory was created by the skill's init step and contains at minimum `state.json` and `config.yaml`. If `.project-manager/` doesn't exist yet, run the init step now.
- [ ] **`README.md` exists in the project folder with the student's name and a one-line "what is this."** Two lines, written by the student: their name, and one sentence about what they're building. *"Anna Kim — a one-page reading log that survives a closed tab."* The student typed both lines (or said yes to a coach-drafted version after one quick revision). This README will be expanded substantially in M6; right now it's a one-line placeholder so the project has a face.

## How you tell the student where they are

M0 is rarely the holdup — most students clear it in 10 minutes. If a box is red, name it and fix it on the spot.

> *"Almost ready to start M1. Two things: `gh` isn't installed yet — let me run `winget install GitHub.cli` for you, takes a minute. And your project folder doesn't have a README yet — give me your name and one sentence about what Anchor is for you, and I'll write the first version."*

The student who's brand new to development may need help opening a terminal for the first time — that's a five-minute conversation that lives here, not in M1. By M1 the terminal is open and authenticated, the folder exists, and the student is ready to write.

## Why this rubric

M0 is the only milestone whose deliverable is *the environment is ready.* Every other milestone produces an artifact about the project; this one produces the conditions that let artifacts exist at all. The reason it's a real milestone (and not just a sentence in the L1 intro) is that **most first-project failures happen before line one is written** — the student couldn't authenticate to GitHub, couldn't find their project folder, didn't know whether they were in the right working directory. M0 surfaces all of that into a short rubric the coach reads on every turn until green.

The "gh CLI, not a PAT" rule is firm. Personal access tokens are the dominant beginner failure mode — they expire, they get pasted into screenshots, they end up in `.bash_history`. The browser-based device-code flow has none of those failure modes and works on every OS. The coach uses `gh auth login --web` and never anything else.

The one-line README is the smallest possible answer to *"what is this folder?"* For most of the course the README is a one-liner; M6 expands it to four parts (screenshot, run instructions, credits) when there are external readers. Until then it's enough that there's a face on the folder.
