---
name: anchor-coach-rubric-m5-test
kind: rubric
title: "Milestone 5 — Test — Acceptance Rubric"
parent: anchor-coach
description: "Agent-checkable acceptance criteria for Milestone 5 of the Anchor curriculum. The student used the app intensively with real data, noticed at least two specific things they wanted changed, wrote one fix prompt, and the M4 test suite is still green after the changes."
---

# Milestone 5 — Test — Acceptance Rubric

**Intent (one sentence the student also reads):**
You used Anchor with your real data, noticed two or three specific things you wanted to change, and got them changed in one round — and the M4 test suite still passes.

## The boxes

Read each box. Mark each ✓ or ✗. **All six must be ✓ to advance to M6.**

- [ ] **The student used Anchor intensively for at least five minutes with real data.** Verified by asking — *"how long did you spend using it, and what did you put in?"* — and the answer is *"about five to ten minutes, with my actual tasks/books/whatever."* Five made-up tasks don't count; the data has to be real enough that the student would feel the rough edges. If the student says they used it for ninety seconds with three fake tasks, send them back to use it longer.
- [ ] **The student named at least two specific things they wanted changed.** Vague items don't count — *"it feels off"* is not specific; *"the X is too close to the checkbox and I keep clicking the wrong one"* is. Press for specificity until each item names a concrete element of the page and a concrete change. Two is the floor; three is normal; more than four and you're stretching what M5 is for.
- [ ] **The student wrote one fix prompt** (or meaningfully edited the coach's template) that names all 2–3 items as a batch. The prompt is captured in `.project-manager/prompts.md` with an `M5` tag. Read the prompt — it should be sharper than the student's M1 prompt (shorter, more specific, no rambling). That arc is itself part of what the milestone is checking.
- [ ] **The agent made all the changes in one pass and re-ran the M4 test routine.** Verify by reading the agent's response: the changes landed, and the test report at the end shows all M4 tests still green. If a test went red, the agent must have diagnosed and fixed before this box closes — a red test in `M5` is a regression and not optional.
- [ ] **The student tried the app again after the fixes and confirmed the feel is right.** Verified by asking the student to type the prompt fix into the running app and confirm in one sentence that the change landed correctly. If they say *"actually the input still doesn't clear correctly"* — that's a second round, not a failed milestone. Iterate; close the milestone when the student says *"yes, that's what I wanted."*
- [ ] **One git commit exists with the message `M5: revisions from real use`.** Default-on auto-commit; the student says yes when asked. Optional sub-commit `M5.1: second round` if iteration produced additional changes.

## How you tell the student where they are

If 4–5 boxes are green and 1–2 are red, name them and offer the next step.

> *"You're close on M5. The fix landed and the tests are still green. One thing still red: the second item on your fix list — the empty-state copy — looks like it didn't actually change in `index.html`. Want me to diff the file and figure out why, or do you want to walk through it together?"*

The most common red on M5 is **box 2 (items too vague)**. The student says *"some stuff felt clunky"* and can't name what. Push: *"give me one thing, specific to one element of the page."* If they truly can't find anything after another minute of using the app, they probably haven't put in enough real data — send them back with the instruction to add ten more tasks and try again.

If all six are green, mark M5 complete in `.project-manager/state.json`, propose the commit, congratulate the student in one sentence, and open M6.

## Why this rubric

M5 is where the student becomes the user of their own tool, briefly and on purpose. The M4 tests caught what the agent could anticipate — buttons add, deletes delete, refresh works. M5 catches what only the student can see — cursor flow, visual hierarchy, copy that reads wrong, gestures that feel wrong, the X being one pixel too close to the checkbox. *Feel* is a real category of bug; the engineer who can't see it ships products that work but feel cheap, and they don't know why their users don't come back.

The "use real data" rule (box 1) is what makes the lesson actually work. Made-up data doesn't expose feel failures because the student has no stake in the outcome. *"Buy milk"* and *"Test task 1"* feel identical when nothing depends on either one. *"Email professor about deadline extension"* and *"Replace the rear bike tire"* feel different because the student knows which one is overdue. That's the data layer the rubric is forcing.

The "batched fix prompt" rule (box 3) is a small but important pedagogical move. Old programming pedagogy would tell you to fix one thing at a time and verify each separately. With the M4 test suite acting as regression check, batching is fine and *faster*. The student learns that **tests scale your willingness to make changes**. That's a load-bearing engineering instinct.

The "re-run M4 tests" rule (box 4) is the regression check. M4 left the student with a test routine in `index.html`; M5 is the first place that routine earns its keep beyond the original generation. Every future milestone (and every future project the student takes on) should run the previous milestone's tests before declaring done. That habit gets installed here.

The student's prompt-writing arc is also being quietly verified in this rubric. By M5 the student should be writing prompts that are sharper than their M1 ramble. The coach reading their M5 prompt in `prompts.md` is making a quiet check on the curve. By L7 the student will write the bootstrap prompt for their *next* project unaided — that whole transfer move hinges on the prompt-writing skill having developed. M5 is where it shows up.
