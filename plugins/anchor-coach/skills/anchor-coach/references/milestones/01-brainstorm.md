---
name: anchor-coach-rubric-m1-brainstorm
kind: rubric
title: "Milestone 1 — Brainstorm — Acceptance Rubric"
parent: anchor-coach
description: "Agent-checkable acceptance criteria for Milestone 1 of the Anchor curriculum. The Anchor Coach reads this file and decides whether the student has earned M2."
---

# Milestone 1 — Brainstorm — Acceptance Rubric

**Intent (one sentence the student also reads):**
You have described what you want Anchor to do in your own words, in writing, in plain English, with examples — and you have *not* described how to build it.

## The boxes

Read each box. For each, check the project state (read the file, ask the student, look at the chat). Mark it ✓ or ✗. **All eight must be ✓ to advance to M2.**

- [ ] `.project-manager/brief.md` exists.
- [ ] The brief opens with a one-paragraph "who is this for." Even if the answer is "me," it is written out as a sentence about the human who will use this tool. Example of green: *"This is for me. I'm a graduate student who keeps a paper to-do list and loses it about once a week. I want one place I can open on my laptop that survives me closing the lid."* Example of red: *"For the user."*
- [ ] **The brief contains concrete scenarios** in the *"When I X, I want Y to happen, because Z"* form, covering at minimum the three load-bearing subjects: adding a task, finishing a task, and grouping (a project). **Three scenarios is the default count** — picked because three is the smallest set that exercises Anchor's whole loop. *Fewer* is acceptable if the student deliberately combined subjects ("two scenarios that each touch two of the three subjects, with strong becauses, that the student can defend"); *more* is acceptable too. The bar is **engagement with each load-bearing subject**, not a specific count. Example of green: *"When I sit down to start work, I want to see only the tasks for the project I'm working on right now, because the rest are noise."* Example of red: *"User adds tasks."*
- [ ] **The brief contains a "what this is NOT" section** with features the student has deliberately cut from v0. **Three items is the default** — that count was picked because beginners typically have many ideas they could ship, and naming three forces deliberate cutting. *If the student has thought carefully and pushed back on three* — saying *"I want all of these in v0; here's why each one is worth its weight"* — that's a passing answer; record their reasoning. *If the student has fewer than three* because Anchor at their chosen scope is genuinely narrower than typical, that's also fine, provided they can defend the choice. **The discipline being trained is engagement with the cut question, not a specific count.** For each item that IS on the NOT list, the student must be able to say (in chat) why it's there. If the answer is *"I don't know,"* that item doesn't count. (This is the most important section. Beginners want to build everything; the discipline of saying *"not yet"* or *"yes, I want all of these and here's why"* is the engineering lesson hiding inside the brainstorming exercise.)
- [ ] The brief contains zero references to: HTML tags, JavaScript functions, classes, libraries, frameworks, files, databases, APIs, JSON, localStorage, or any other implementation noun. If the student wrote "I'll store the tasks in a JSON file," the brief isn't green. Tell them which sentences need to be re-said in plain English about the *user experience*, not the *implementation*. (This is the box students most often miss; flag it directly and offer a concrete rewrite of one sentence.)
- [ ] **The brief reflects the student's actual thinking about Anchor, in their voice, by one of two paths:** (a) the student wrote it themselves, with the coach providing only sentence-fragment scaffolding; OR (b) the **Path 2 pattern** (see `references/STYLE.md`) — the student rambled the v0 vision in plain English, the coach drafted the brief from that and showed the prompt it used as a worked example, the student read it and directed revisions until satisfied. Either path counts. What's required is that the brief sounds like the student (you can quote their actual words back to them from the rambling or from their revisions) and that the student can explain in plain English what each section says without rereading it. The discipline being trained is *specification*, not *typing*.
- [ ] **The student has received a structured review of the brief from the coach, and every suggested edit has been either applied to `brief.md` or replied to with a one-sentence explanation of why not.** This is the M1-closing handshake (Practice 7). The review opens with what is already working (by line), proposes 2–4 specific edits with one-sentence justifications grounded in the four Lecture rules, and closes with an invitation to do another round if the student wants to push the brief further. The gate is **engagement, not agreement** — a student who explains why they are not taking an edit still earns the box. A student who silently ignores it does not; ask once before closing. See `references/STYLE.md` § *How to review a student's brief* for how to run the review.
- [ ] First git commit has happened with the message `M1: brief written`. The coach ran the commit via the Setup Protocol's commit step and reported the commit hash. Sandboxed coaches run the commit through `bin/anchor-git.sh commit <project-folder> "M1: brief written"` (never raw `git` on the mounted folder — see `references/sandbox-and-git.md`). If `auto_commit: false` in the student's `config.yaml`, the coach prompted once for confirmation before running. The student does not type git commands at any point.

## How you tell the student where they are

If 6–7 boxes are green and 1–2 are red, say specifically which ones and offer a one-line next action. Example:

> *"You're close on M1. The brief is solid and the scenarios are great. Two things still red: (1) the 'what this is NOT' section is missing — give me three features Anchor won't have at v0, and why; (2) the line 'I'll store tasks in a JSON file' is an implementation detail — rewrite it as a sentence about what the user experiences when they reopen the app. We're a paragraph away."*

If fewer than 6 boxes are green, the milestone needs more work. Don't drag the student through every red box at once. Pick the one that unlocks the next two and work on that.

**Ordering note for the review handshake.** Boxes 1–6 (the brief content checks) must be green *before* the review happens — there is no point reviewing a brief that doesn't have a NOT list yet. The natural flow matches the Practice sequence in the lesson: student writes brief (Practices 1–4) → boxes 1–6 green → first git commit `M1: brief written` (Practice 5) → optional friend review (Practice 6) → coach review of the brief (Practice 7) → student applies or explains each edit → review-received box green → optional follow-up commit `M1.1: brief revisions from review` if any edits were applied → all eight green → advance to M2.

This mirrors how reviews work in real engineering practice: the author commits first, the reviewer reviews the committed version, and follow-up edits land as additional small commits. The student gets a tiny taste of this loop here.

If all eight are green, mark M1 complete in `.project-manager/state.json`, propose the commit, congratulate the student in one sentence, and open M2.

## Why this rubric

The M1 brainstorm is the milestone where most first-time projects fail — not because the student couldn't code, but because they couldn't *decide what they were building*. Every implementation noun the student writes in M1 is a decision they'll regret in M3 when the picture forces them to be more concrete. Every "what this is NOT" they write is one fewer feature they'll feel bad about not having.

**Specification, not typing, is the discipline being trained.** Earlier versions of this rubric required the student to type the brief from scratch. Real-student piloting showed that produced a brittle experience — students who couldn't bridge the blank-page gap stalled at L1 and never reached the agentic-AI payoff. The Path 2 pattern (coach drafts from the student's rambling, student directs revisions) preserves the load-bearing skill — *deciding what Anchor is and isn't, in plain English* — while letting the agent do the typing the student wouldn't have done well anyway. The student still owns the thinking. They still defend the NOT list. They still must be able to read the brief back and explain it without rereading. What changed is who types — and that change matches the L3+ pattern where the agent writes code and the student directs.
