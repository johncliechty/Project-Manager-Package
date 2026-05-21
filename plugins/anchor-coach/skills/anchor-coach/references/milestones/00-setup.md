---
name: anchor-coach-rubric-m0-setup
kind: rubric
title: "Milestone 0 — Setup — Acceptance Rubric"
parent: anchor-coach
description: "Agent-checkable acceptance criteria for Milestone 0 of the Anchor curriculum. The Anchor Coach reads this file at the start of every session until M0 is green, then never reads it again."
---

# Milestone 0 — Setup — Acceptance Rubric

**Intent (one sentence the student also reads):**
The curriculum is loaded, your project folder exists with `.project-manager/` inside it, you've named the tool you want to build in one line, and your project's tools — version control and a GitHub home — are set up at the start so they're there for the whole project. Setting GitHub up on day one is a deliberate habit, made dead-easy: one double-click, then nothing to paste ever again. And if you'd rather not, M0 still proceeds in a local-only mode — setup is never a wall.

**Coach, before you check any box:** if you're a sandboxed coach (Cowork — `pwd` looks like `/sessions/<id>/mnt/...`), read **two** references first: `references/sandbox-and-git.md` (never run git inside the mounted folder; clone the curriculum to `/tmp`) and `plugins/project-manager/skills/project-manager/references/host-setup.md` (the preflight that installs the bridge + GitHub at the start). Run the host-setup preflight as part of M0.

## The boxes

Mark each ✓ or ✗. **Boxes 1–4 must be ✓ to advance to M1. Box 5 is ✓ when host setup succeeded OR the student consciously chose local-only** — it is *attempted* at M0, never a hard wall.

- [ ] **The curriculum is reachable.** You can read `SKILL.md` and the lessons/rubrics. *Sandboxed coaches:* clone to a temp dir — `git clone --depth 1 https://github.com/johncliechty/Project-Manager-Package /tmp/anchor-coach-src` — and read from there. **Never `git clone` into the student's project folder** (the mount can't do git's lock/unlink, so it corrupts and leaves an un-deletable stub). Offline: fall back to `<project>/.project-manager/.curriculum-cache/`.

- [ ] **`CLAUDE.md` exists in the project folder**, re-bootstrapping future sessions, with no hard-coded clone path. See `SKILL.md` § *First-turn-ever bootstrap*.

- [ ] **A project folder exists and contains `.project-manager/`** (written with your file tools), with at least `state.json` and `config.yaml`, plus a `.gitignore` excluding `.project-manager/history.bundle`, `.project-manager/*.bundle`, and `.project-manager/.curriculum-cache/`.

- [ ] **`README.md` exists with the student's name and a one-line "what is this."** *"Anna Kim — a one-page personal task tracker that survives a closed lid."*

- [ ] **Host setup ran (the habit), or local-only was chosen.** Run the preflight in `host-setup.md`: set up the claude-code-bridge (drop `Install-Bridge.bat` for a one-time double-click) and GitHub (`gh auth login --web`), then create the project's repo at the start (`gh repo create`) and record `host.bridgeReady` / `host.githubReady` / `host.repoUrl` in `state.json`. **If the student declines or it fails, fall back to local-only version control** via `bin/anchor-git.sh init` (history kept in a bundle; see `sandbox-and-git.md`), set `host.bridgeReady=false`, mention GitHub can be turned on later in one step, and proceed. **Use a short timeout (~15s) on any bridge call and fall back the instant it is slow, errors, or is declined** — the student never waits on a setup spinner. Either way version control is running locally by the end of M0, and **M0 through M5 require no host access at all**.

## How you tell the student where they are

M0 takes a couple of minutes. The only out-of-chat action — once, on this machine — is double-clicking `Install-Bridge.bat`; after that every project is zero-touch. Don't surface the sandbox/git mechanics; that's coach-facing housekeeping. The one thing you *do* narrate is creating the GitHub repo, because that's the habit you're teaching:

> *"First thing on any project — let's give it a home on GitHub so your work is backed up from day one. Done: github.com/you/anchor. Now, give me your name and one sentence about what Anchor is for you, and I'll write the first README."*

If the student opted local-only: *"We'll keep your history locally for now and can put it on GitHub anytime with one step. Starting M1."*

## Why this rubric

M0 is the only milestone whose deliverable is *the environment is ready.* Most first-project failures happen before line one is written. Two earlier designs each created a wall here — first a mandatory `gh` install + auth, then a mandatory bridge install + paste. The lesson from both: **the wall was the paste/install grind, not the timing.** So setup is now front-loaded *and* dead-easy: a double-click instead of a paste, GitHub created for the student rather than walked through manually, and a local-only fallback so it never blocks. Setting up version control and GitHub at the start of a project is a habit worth building; making it one double-click is what makes the habit painless.

The "gh CLI, not a PAT" preference holds: `gh auth login --web` uses the browser device-code flow — no tokens to expire, paste into screenshots, or leak into `.bash_history`.

The one-line README is the smallest possible answer to *"what is this folder?"*; M6 expands it when there are external readers.
