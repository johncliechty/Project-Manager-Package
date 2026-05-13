---
name: anchor-coach-rubric-m2-describe
kind: rubric
title: "Milestone 2 — Describe — Acceptance Rubric"
parent: anchor-coach
description: "Agent-checkable acceptance criteria for Milestone 2 of the Anchor curriculum. The Anchor Coach reads this file and decides whether the student has earned M3."
---

# Milestone 2 — Describe — Acceptance Rubric

**Intent (one sentence the student also reads):**
You have described what Anchor looks like, what it has to remember in order to work, and what the user can do — all in plain English, in writing, with enough detail that a friend could draw it on a napkin from your description alone.

## The boxes

Read each box. For each, check the project state (read the files, ask the student, look at the chat). Mark it ✓ or ✗. **All nine must be ✓ to advance to M3.** (M2 has one more box than M1 because M2 produces two artifacts — `picture.md` and `answers.md` — instead of one.)

- [ ] `.project-manager/picture.md` exists.
- [ ] The picture contains a **mockup** — a paragraph or sketch that walks the page top to bottom. The mockup is *picturable*: read the description, close your eyes, can you draw the page on paper? Example of green: *"A header at the top with 'Anchor' and a small anchor icon. A sidebar on the left listing project names. The main area on the right showing the tasks for the selected project. An input at the bottom of the main area for adding new tasks, with placeholder text 'Add a task and press Enter'."* Example of red: *"Anchor has a list of tasks and you can add them."* If the mockup is a photo of a hand sketch instead of text, that counts — open the photo and verify it shows the elements listed.
- [ ] The picture contains a **"What Anchor has to remember"** section with five data nouns in plain English. The five typical ones for Anchor: *a task, a project, the list of tasks, the list of projects, which project is currently selected.* If the student's M1 brief committed to features beyond the v0 default (e.g., due dates), the corresponding data nouns appear here too and the student can explain why. Example of green: *"A task — has text, whether it's done, which project it belongs to."* Example of red: *"A JavaScript array."*
- [ ] The picture contains a **"What the user can do"** section with four interactions, each described as a user action in one sentence that starts with the user. The four for Anchor: *add a task, mark a task done (toggleable), delete a task, switch projects.* Example of green: *"The user types in the input box at the bottom and presses Enter; the new task appears at the top of the list for the currently selected project."* Example of red: *"There's an event handler that fires on click."*
- [ ] `.project-manager/answers.md` exists with the line *"Q: What happens on refresh / tab close-and-reopen?"* followed by an *"A:"* line. The answer commits to data surviving — the v0 promise is that tasks and projects come back exactly as they were. If the student's first answer was different (a common red), the coach has worked through it with them and the corrected answer is now in `answers.md`. This box is what tells you the student has thought about persistence before any code touches the screen.
- [ ] The picture contains **zero implementation nouns**. No mention of arrays, functions, event listeners, render functions, components, JSON, classes, frameworks, files, or libraries. If the student wrote *"the tasks are stored in a JavaScript array"* anywhere, this box is not green. Tell them which sentences need to be re-said in plain English about what the *user experiences* or what the *app has to remember*, not how it's wired. (This is the box M2 students miss most often — implementation nouns are seductive once you've written a brief, because they feel like *progress*.)
- [ ] The **student has typed the picture themselves.** The Anchor Coach has *not* written whole paragraphs of mockup or whole lists of data nouns. Sentence-fragment scaffolds ("Start with 'A header at the top with...'") are fine; full paragraphs are not. If you (the coach) catch yourself writing more than a sentence at a time, the milestone is held — ask the student to rewrite that section.
- [ ] **The student has received a structured review of the picture from the coach, and every suggested edit has been either applied to `picture.md` (or `answers.md`) or replied to with a one-sentence explanation of why not.** This is the M2-closing handshake (Practice 7). The review opens with what is already working (by line), proposes 2–4 specific edits with one-sentence justifications grounded in the M2 rules above (the mockup is picturable; the data nouns are plain-English-rememberables; the interactions are user-initiated; the refresh answer is present; no implementation nouns), and closes with an invitation to do another round if the student wants to push the picture further. The gate is **engagement, not agreement** — a student who explains why they are not taking an edit still earns the box. A student who silently ignores it does not; ask once before closing. See `references/STYLE.md` § *How to review a student's brief* — the four-rule lens generalizes by substituting the M2 rules for the M1 Lecture rules.
- [ ] **Second git commit has happened** with the message `M2: picture and data nouns`. If the picture changed substantially after the review, an optional follow-up commit `M2.1: picture revisions from review` reflects the post-review state of the files. The student typed the commit themselves (or said yes to the auto-commit prompt on the default-on path).

## How you tell the student where they are

If 7–8 boxes are green and 1–2 are red, say specifically which ones and offer a one-line next action. Example:

> *"You're close on M2. The mockup is solid and the data nouns are great. Two things still red: (1) one of your interactions is still phrased as 'the handler fires when…' — rewrite it starting with 'the user'; (2) `answers.md` is missing the refresh-question answer — one sentence, what happens when the user closes the tab and reopens? We're a paragraph away."*

If fewer than 7 boxes are green, the milestone needs more work. Don't drag the student through every red box at once. Pick the one that unlocks the next two and work on that.

**Ordering note for the review handshake.** Boxes 1–6 (the picture content checks) plus box 7 (the student typed it themselves) must be green *before* the review happens — there is no point reviewing a picture that is missing a section. The natural flow matches the Practice sequence in Lesson 2: student writes mockup + data nouns + interactions (Practices 1–3) → answers the refresh question (Practice 4) → boxes 1–7 green → second git commit `M2: picture and data nouns` (Practice 5) → optional friend-with-a-napkin review (Practice 6) → coach review of the picture (Practice 7) → student applies or explains each edit → review-received box green → optional follow-up commit `M2.1: picture revisions from review` → all nine green → advance to M3.

This mirrors how reviews work in real engineering practice and matches the M1 ordering: commit first, review the committed version, follow-up commits for edits.

If all nine are green, mark M2 complete in `.project-manager/state.json`, propose the commit (and the optional follow-up if review-edits changed the files), congratulate the student in one sentence, and open M3.

## Why this rubric

M2 is the milestone beginners most want to skip. They have a brief; they have an idea; they want to start typing code. The picture feels like *more talking about software when we could be making software.* The discipline of M2 — staying in plain English for one more hour, naming the five data nouns, naming the four interactions, answering the refresh question — is what makes M3 (Scaffold) and M4 (Build) go in a straight line instead of in circles.

Every implementation noun the student writes in M2 is a decision made too early. *"A JavaScript array"* commits Anchor to a single in-browser representation before the student has even decided whether v0 uses localStorage or a sidecar file. *"An event listener"* commits to a specific style of UI wiring before the student has read what the page looks like back to themselves. The plain-English discipline is not pedantry; it's the engineering practice of *naming what has to be true* before deciding *how to make it true.*

The refresh question is the rubric's quiet secret. A student who answers *"the tasks should still be there"* has, in one sentence, declared that Anchor is a *persistent* tool — that localStorage (or some equivalent) is going to matter. A student who answers *"they go away"* has accidentally said Anchor is throwaway, and the coach catches it before M3 builds the wrong thing. That single question separates "I'm building a notepad" from "I'm building Anchor."

The "type it yourself" rule for M2 is firmer than for M1 because the picture is more tempting for the agent to write — the agent can produce a beautiful mockup in two seconds, and the student loses the experience of *deciding what's on the page*. If the agent writes the picture, the student has not done M2; they have watched the agent do M2.

The review handshake at the end is the M-closing pattern that will repeat at M3, M4, M5, and M6. By M3, receiving a structured review will feel normal; by M5, the student will start anticipating what the coach is about to flag. That anticipation is the engineering-judgment skill the whole curriculum is training. Receiving review well is half the engineering job; you're training it explicitly here.
