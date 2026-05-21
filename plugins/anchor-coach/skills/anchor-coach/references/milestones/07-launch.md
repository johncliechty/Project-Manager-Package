---
name: anchor-coach-rubric-m7-launch
kind: rubric
title: "Milestone 7 — Launch — Acceptance Rubric"
parent: anchor-coach
description: "Agent-checkable acceptance criteria for Milestone 7 of the Anchor curriculum. The retrospective for Anchor has been written by /project-manager, the student has named the skill, and a new project of the student's choosing has been bootstrapped with its own .project-manager/."
---

# Milestone 7 — Launch — Acceptance Rubric

**Intent (one sentence the student also reads):**
The agent wrote a retrospective for Anchor automatically, you understood the skill that wrote it (and that has been running this whole course), and you used that same skill to start a new project of your own choosing — its `.project-manager/` exists, its brief is drafted, and you've named what you're going to do next on it.

## The boxes

Read each box. Mark each ✓ or ✗. **All five must be ✓ to advance — and "advance" here means *close the curriculum and start your next project*.**

- [ ] **`.project-manager/retrospective.md` exists in the Anchor project.** The agent generated it automatically at the start of L7 — not in response to a student request. The file is one page, in the agent's voice, citing specific evidence from the student's `.project-manager/` folder, git log, prompts, and `index.html`. Read it with the student. Verify that the retrospective contains at least: a summary of what got built, a check on whether the NOT list was held, a comparison of an early prompt and a later prompt from the student's own `prompts.md`, one observation about how the student worked that surprised the agent, and one or two specific suggestions for the next project. If the retrospective is generic ("you built a great app, keep going!") instead of specific to the student's actual work, send it back — the value of this artifact is in the specifics.
- [ ] **The reveal landed and the student can name the skill in their own words.** After showing the retrospective and naming `/project-manager` as the skill that wrote it, ask the student in one sentence: *"in your own words, what's `/project-manager`?"* If they say something like *"the skill that's been keeping track of milestones and writing the closing files all along"* or *"the thing that wrote my retrospective"* — close enough; the reveal landed. If they say *"I don't know"* or *"some kind of project tracker?"* — explain again with one specific example from their own course history (*"remember in L1 when the coach created `.project-manager/` for you? `/project-manager` did that"*). Don't move on until the student can articulate it.
- [ ] **A new project folder exists somewhere on the student's machine, with its own `.project-manager/` inside it.** The path is whatever the student chose (`~/projects/<name>` or wherever). The folder contains at minimum `.project-manager/brief.md` and `.project-manager/prompts.md` (the bootstrap prompt). For brownfield projects, the original existing materials are still in place — `/project-manager` was told not to touch them. For greenfield projects, the folder is otherwise empty (other than the `.project-manager/` and the bootstrap commit).
- [ ] **The new project's `brief.md` has been drafted and the student has edited it or approved it.** The brief reads in the student's voice — for brownfield projects this means it was drawn from the existing materials and matches their cadence; for greenfield projects this means the agent ran an M1-equivalent conversation and the brief reflects the student's answers. The brief has the M1 shape: who-it's-for, three scenarios with becauses, a NOT list, no implementation nouns. The student has either edited the brief or said *"this reads right, no changes"* — silent acceptance without reading doesn't count.
- [ ] **One git commit exists in the *new* project with the message `M0: project bootstrapped`** (or equivalent — committed the sandbox-safe way via `bin/anchor-git.sh`, never raw `git` on the mounted folder; see `references/sandbox-and-git.md`). The student has also named, in one sentence, their next move on this new project. That sentence is written into the new project's `.project-manager/next-move.md` (the coach handles the writing if the student dictates). The next move should be a concrete near-term action — *"M2 tomorrow,"* *"sleep on this and start M1 on Saturday morning,"* *"think about whether the NOT list is right and come back next week."* Vague answers like *"I'll work on it sometime"* get one push for specificity before the box closes.

Additionally — though it's not on the rubric — there is one final Anchor commit when L7 finishes:

```
git add .
git commit -m "M7: retrospective + handoff"
git push
```

This pushes `retrospective.md` to the public Anchor repo so the artifact lives where the rest of the work lives.

## How you tell the student where they are

The most common red on M7 is **box 5 (next move named vaguely)**. The student finishes the bootstrap, says *"OK done"*, and forgets to name what they'll do next. Push:

> *"One more thing before we close. In one sentence — what's the very next thing you're going to do on this new project? Not what you'll do over the next year, just the next move. Tonight, tomorrow, this weekend — whatever timeframe."*

The second most common red is **box 4 (brief reads generic)**, especially in the brownfield case if the existing materials were thin. If the brief doesn't draw on the student's own materials in a recognizable way, ask `/project-manager` to re-read the source folder and tighten the brief. Generic briefs are the failure mode that prevents transfer.

If all five are green, mark M7 complete in Anchor's `.project-manager/state.json`, commit the retrospective to the public Anchor repo, and **close the curriculum.** The student has finished. Their next project has already started.

## Why this rubric

M7 is the milestone where the curriculum's value transfers from *the project that just shipped* to *the next project, and the one after that.* The whole course has been training a loop; M7 is where the student picks up the loop and uses it on something of their own choosing.

The "agent writes the retrospective without being asked" rule (box 1) is the load-bearing pedagogical move of the lesson. If the coach asked *"want me to write a retrospective?"* the student would say yes and the moment would feel like a service. By writing it automatically and showing the result, the coach demonstrates `/project-manager` doing real work *before* naming what wrote it. The reveal then lands harder because the work that just happened was useful, not impressive. Pedagogy is sequence.

The "name the skill in your own words" rule (box 2) is the comprehension check on the reveal. The reveal can be delivered cleanly and still not land — if the student doesn't articulate the concept back, they haven't transferred it. Asking them to name it forces the consolidation that makes the rest of the lesson work.

The brownfield case (in the practice section of L7) is where `/project-manager` gets to *show* what it does. The skill that reads a folder of two-year-old notes, summarizes them, and drafts a brief from the student's own thinking is a skill that does work the student *can't easily do themselves.* That asymmetry is what makes the demo land. Greenfield is real but less striking; the agent running an M1-equivalent conversation is impressive but the student could (and just did) do that for Anchor. Brownfield is the killer demo because the student really couldn't have done it alone — not in 15 minutes, not without a substantial activation-energy cost.

The "name your next move" rule (box 5) is what ensures transfer. A student who finishes L7 with a brief drafted but *no concrete next action* hasn't really finished — they have a starting line, but they don't have momentum. The next-move sentence is the hand-off to future-them. Future-them, opening this folder on Saturday morning, sees `next-move.md` and knows immediately what they were going to do. That continuity is how projects actually get built, and the course teaches it explicitly here.

The closing commit on Anchor (`M7: retrospective + handoff`, pushed) is what completes the public record. The retrospective is now part of the GitHub repo alongside the README — anyone who finds Anchor in the future sees not just the working app but the *reflection on how it got built*. That artifact is one of the highest-leverage things in the whole course, because it's the kind of artifact most real engineering projects never produce. The student has now produced one. They'll do it again.
