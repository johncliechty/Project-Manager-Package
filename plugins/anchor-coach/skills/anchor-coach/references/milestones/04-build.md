---
name: anchor-coach-rubric-m4-build
kind: rubric
title: "Milestone 4 — Build — Acceptance Rubric"
parent: anchor-coach
description: "Agent-checkable acceptance criteria for Milestone 4 of the Anchor curriculum. The Anchor Coach reads this file and decides whether the student has earned M5. M4 is one prompt, one round of clarifying questions, one generation pass with agent-written tests, optional iteration, one commit."
---

# Milestone 4 — Build — Acceptance Rubric

**Intent (one sentence the student also reads):**
You wrote one well-built prompt that produced the entire working app — six features, persistence, polish — and the agent wrote a small test routine that proves every feature works.

## The boxes

Read each box. For each, check the project state. Mark it ✓ or ✗. **All seven must be ✓ to advance to M5.**

- [ ] **`index.html` renders without errors in the browser.** Double-click the file; the page opens; the dev console (`Ctrl+Shift+J` Windows / `Cmd+Option+J` Mac) is clean. If anything's red, diagnose with the student before checking any other boxes.
- [ ] **All six described features work in the browser, verified live.** Walk through with the student: add a task, mark complete and uncomplete, delete a task, add a second project and switch between them, close the tab and reopen (tasks survive), and the page looks like an app — system font, comfortable whitespace, one accent color, an anchor SVG or emoji in the header. If any of those is broken, the milestone is held until that one feature works.
- [ ] **The agent's in-browser test routine exists and passes.** Open `index.html?test=1` (or whatever invocation the agent set up); a test report should render showing each feature's check as green. Read the report with the student — they should understand what each line of the report is verifying. If a test is red, the agent diagnoses and proposes a fix; student approves; re-run; this box doesn't turn green until the report is.
- [ ] **The student wrote the M4 prompt and answered the agent's clarifying questions in their own words.** Verify by reading the latest M4 entry in `.project-manager/prompts.md`. A meaningful edit of the coach's template counts; verbatim acceptance does not. The clarifying-question exchange should also be in `prompts.md` — the student's answers should read like their own sentences, not paraphrases of the agent's options. Ownership through *prompting and answering*; that's the engineering skill M4 is training.
- [ ] **The student can explain in plain English what each new function does.** Ask 2–3 specific questions: *"what does `saveState` do? What does `renderTasks` do when you switch projects? What's stored under the localStorage key, in one sentence?"* If they can answer in plain English at the *what does this do for the user* level (not syntax level), ownership is real. If they can't, walk through that part of the file with them until they can. **The student does not need to have typed any of the code.** Ownership is by direction and understanding, not by keystroke.
- [ ] **M4-closing sweep happened.** Coach walked the rubric out loud at a brisk pace; any small fixes from the sweep are either applied or replied to with a one-sentence reason. Engagement, not agreement — same gate as every other M-closing handshake.
- [ ] **One git commit exists with the message `M4: working app`.** If polish or behavior changed substantially after the first commit (e.g., a follow-up iteration round), an optional `M4.1: revisions from iteration` commit captures that — also fine, the rubric checks that *the work is committed*, not that the commit count is exactly one.

## How you tell the student where they are

If 5–6 boxes are green and 1–2 are red, name them specifically and offer a one-line next action. Example:

> *"You're close on M4. The app works and the tests are green. Two things still red: (1) the delete test is failing because the agent forgot to also remove the task from the `tasks` array (it only updated the DOM); we need a one-line fix in `deleteTask`. (2) The polish landed but the accent color is the default agent-blue, not one you chose; want three quick variants or do you want to specify one? Either way, we close M4 in five minutes."*

If 3 or fewer boxes are green, something went wrong with the generation — probably the prompt was missing context, or one of the clarifying questions wasn't answered. Back up: re-read the prompt with the student, look at the agent's clarifying questions, identify what the agent didn't know, and run one more pass. *Most M4 failures are prompt failures.* A clean prompt + good clarifying-question answers produces a clean app on the first try about 90% of the time.

**Ordering note.** Boxes 1–3 (the app works + tests pass) must be green before boxes 4–6 are evaluated — there is no point checking ownership of a file that doesn't run. The natural flow matches the Practice sequence in Lesson 4: prompt + clarifying-question dance (boxes 4) → generation + tests (boxes 1–3) → one iteration round if needed → closing sweep (boxes 5–6) → commit (box 7).

If all seven are green, mark M4 complete in `.project-manager/state.json`, propose the commit, congratulate the student in one sentence, and open M5.

## Why this rubric

M4 is the milestone where the transformative speed of agent-collaborative engineering becomes a felt thing instead of a rumor. Old-school programming pedagogy would have the student build six features one at a time over multiple sessions, *"feeling each loop"* until it became automatic. That mattered when the student was typing each loop. The student is not typing each loop. The agent is. What the student needs to feel — once, viscerally — is that **one well-built prompt produces a working application.** That's the moment the rest of their career hinges on.

The rubric is therefore deliberately short. Seven boxes, not ten. One commit, not six. Ten minutes, not three hours. Anything longer would teach the wrong lesson: that this is hard and slow. It isn't. The skill being trained is *writing good prompts*, *answering clarifying questions well*, *trusting the agent's tests*, and *reading the rendered result with engineering eyes*. All of those happen in one short session.

The "agent-written tests" rule (box 3) is the rubric's quiet upgrade over earlier milestones. It teaches a habit worth carrying forward: **when an agent does work for you, ask it to also write a check that proves it did the work.** Tests are how trust scales. The student who internalizes this will be a substantially more effective agent collaborator for the rest of their life. By M6 they'll be asking the agent to write tests for the README's "how to run" instructions. By their next project they'll be asking it unprompted.

The "ownership through prompting and answering" rule (box 4) replaces the M3-era "ownership through choice." In M3 the student chose among three concrete mockups; in M4 the student wrote the brief that became the prompt that became the app, and answered the clarifying questions that shaped the build. Both are ownership; both are real. By M4 the student has produced 4+ entries in `prompts.md` — that record is itself a snapshot of how their prompt-writing matured over the course.

The "explain in plain English" rule (box 5) is the same ownership check as M3, applied to working logic. The bar is not *how does this work* (that's the agent's job) — the bar is *what does this do for the user* (that's the engineer's job). A student who can answer the second question can give meaningful direction on the next iteration; a student who can't is along for the ride. The coach is responsible for walking the file with the student until they're not.

The "use it for real" gate that M5 will check is what stops M4 from feeling unfinished after 10 minutes. M4 produces an app that works; M5 produces an app that's been *used*. Those are different milestones. Keep them separate.
