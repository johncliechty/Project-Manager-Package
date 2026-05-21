---
name: anchor-u01-brainstorm-key
kind: answer-key
title: "Worked Reference — Lesson 1 — Worked Example 4 (A review in motion)"
parent: anchor-u01-brainstorm
description: "Instructor reference and coach-side worked content for Worked Example 4 of Lesson 1 — the bad brief, the four-edit review, and the revised brief. Used as teaching material, not as a pass/fail key. Hidden from student role."
access:
  student:           []
  teacher:           [readonly]
  dean:              [readonly, edit]
---

# Worked Reference — Lesson 1 — Worked Example 4 (A review in motion)

This file is the worked content behind **Worked Example 4** in `lessons/01-brainstorm.skill.md`. It contains the deliberately-weak brief shown in that example, the full coach review with each suggested edit and its one-sentence justification, and the revised brief that results from one round of edits.

**This is not a pass/fail key.** Lesson 1's Practice 7 (the M1-closing handshake) is a coach review of the *student's own* brief — every brief is different, so there is no fixed answer key. This file is instructor reference material for two purposes:

1. **For coaches running Practice 7:** the four-rule lens below is the diagnostic kit. When you review a student's brief, you check it against the same four rules and propose edits grounded in whichever ones are violated. Most student briefs miss two or three of the four; some only miss one. Some miss all four, in which case the bad-brief review pattern below is a near-direct template.
2. **For instructors teaching the course:** this is the source material for the *shape* of a good review — highlights first, specific edits with rule-grounded justifications, an invitation to iterate. Modeling this shape consistently is what teaches the student to *give* reviews (a M4 group-mode skill) as well as receive them.

---

## The brief as it was handed in

> *"This app is for users who need to manage tasks. It will use a JSON file to store tasks and have a function to add new ones. The user can create tasks, edit them, delete them, set due dates, set priority, drag to reorder, mark complete, search, filter by tag, group by project, export to CSV, and toggle dark mode. It will be built with React for the frontend and Node for the backend."*

## The review — what to highlight first

A bad brief still has things worth naming:

- **The student got a draft on the page.** Most beginners stall before there's a paragraph. The act of writing the first version is the hardest part of M1; everything from here is editing.
- **The shape is roughly right.** There is a who-it's-for sentence, then a feature list, then a tech note. The skeleton matches what a brief is supposed to be — only the contents need sharpening.

Open the review by naming both of these, by line. The student needs to know which moves were already correct so they keep doing them.

## The four edits — each with its rule and its justification

### Edit 1 — Name a specific human

**Rule (from Lecture):** *Who is this for.* A real person, even if it is the student themselves.

**Suggested edit:** Replace *"users who need to manage tasks"* with a specific named human and the situation that brought them here. *"This is for me — a [your role] who [the actual situation that brought you here]."*

**Justification (one sentence):** *"'users' is vague — name a specific human, even if it is you, because every later feature decision is decided by asking 'would this real person care?' and a faceless 'user' has nothing to say."*

### Edit 2 — Strike the implementation nouns

**Rule (from Lecture):** *No implementation nouns.* The brief is about what the user experiences, not how the software is wired.

**Suggested edit:** Strike *"JSON file," "function," "React," "Node"* — all four. Anything that remains is what belongs in a brief.

**Justification (one sentence):** *"Those are Lesson-3 (Scaffold) decisions, not Lesson-1 (Brainstorm) decisions — deciding the stack before the brief is set is how you end up building the wrong tool with the right framework."*

### Edit 3 — Cut the feature list; add a NOT list with becauses

**Rule (from Lecture):** *Three things this is deliberately NOT.* Pick a small v0; everything else is on the cut list with a reason.

**Suggested edit:** The brief currently has eleven features and zero cuts (create, edit, delete, due dates, priority, drag-to-reorder, mark complete, search, filter by tag, group by project, export CSV, dark mode). Pick five that survive to v0. Move the other seven to a NOT list, each with one sentence on *why* it is on the cut list.

**Justification (one sentence):** *"Eleven features with zero cut is the recipe for a year of building and never shipping — the discipline of saying 'not yet' to features you secretly love is the engineering lesson hiding inside M1."*

### Edit 4 — Every feature needs a *because*

**Rule (from Lecture):** *Scenarios in the form 'When I X, I want Y to happen, because Z.'* The *because* is the load-bearing word.

**Suggested edit:** Rewrite each surviving feature as a scenario with all three clauses. The features whose *because* cannot be written are the ones to cut to the NOT list.

**Justification (one sentence):** *"A feature without a *because* is a feature that hasn't earned its place — the *because* is the test that separates the features the user actually needs from the features the student wants because they sound impressive."*

## The invitation that closes the review

> *"One round of edits and this brief becomes solid. Want to try the rewrites and bring them back, or want me to walk through the first one with you out loud? If you want a second pass after that I am happy to do one — a good brief usually gets noticeably sharper across two rounds of review."*

A review closes with an invitation, not a grade. The student decides whether to do one round or two; the coach volunteers up to three rounds and then stops volunteering.

---

## The revised brief — what one round of edits produces

> *"This is for me, a graduate student who keeps a paper to-do list and loses it about once a week. I want one place I can open on my laptop that survives me closing the lid.*
>
> *Scenarios:*
>
> - *When I sit down to start work in the morning, I want to see only the tasks for the project I'm working on right now, because the rest are noise and I get distracted.*
> - *When I finish a task, I want to mark it done and watch it move off the active list, because the small visual reward is what keeps me coming back.*
> - *When I'm switching between my Personal and Research projects, I want to click the project name and see only that project's tasks, because mixing them is how I lose track of which life I'm in.*
>
> *This is NOT:*
>
> - *Not due dates, because I want the tool to feel like a list, not a calendar, and dates would change that.*
> - *Not priority levels, because everything I write down is something I plan to do, and ranking them is a procrastination move dressed up as planning.*
> - *Not drag-to-reorder, because the chronological order of when I added a task is information I want to keep.*
> - *Not search or filter-by-tag, because Cmd-F in the browser is enough for v0.*
> - *Not export-to-CSV, because if I ever want my tasks elsewhere I will open the file directly.*
> - *Not dark mode, because the white background is fine for a v0 tool I will use for thirty minutes at a time.*
> - *Not a backend or accounts, because the tool living in one browser on one laptop is the whole point of v0."*

Notice: the revised brief is longer than the original because the NOT list now does real work, but every sentence is now about the user experience and every feature has a *because*. This is what one round of structured review can do to a draft.

---

## How a coach uses this file in a live Practice 7

The student's brief will not look like the bad brief above (most students do better than this on their first draft) and will not look like the revised brief above (every student's *because*s will be different from the example). What the coach borrows from this file is the **shape**:

1. Open the review with one or two specific things the student got right.
2. Identify which of the four rules the brief violates (zero to four — most students miss two or three).
3. For each violation, propose a specific edit and cite the rule by name in one sentence.
4. Close with an invitation to do another round on the revised brief.

If the student's brief is solid on all four rules already (rare on first drafts, but it happens), the coach's review is celebratory: name what is working, suggest one small *polish* edit if one exists, close with *"this is genuinely solid — ready to commit?"* A great brief on the first try is still a great brief; the rubric does not require there to be edits, only that a review happened and the student engaged with whatever the coach proposed.

---

*This reference file is for instructors and coaches. It is not loaded by the agent in normal student-facing operation; the agent uses the four-rule lens directly from the Lecture and the review shape from `references/STYLE.md`.*
