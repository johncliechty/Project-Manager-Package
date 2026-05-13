---
name: anchor-coach-group-mode
kind: reference
title: "Group Mode — Working in a Team on a First Project"
parent: anchor-coach
description: "The team workflow for the Anchor curriculum. Three rungs of progression — one-computer-many-voices, shared-repo-one-branch, branches-and-pull-requests — with decision records, the filed-for-later pattern, and the agent-as-reviewer-of-last-resort fallback. Read this when `.project-manager/config.yaml` has `mode: group`."
---

# Group Mode — Working in a Team on a First Project

This is the team workflow. The Anchor Coach reads this file when `mode: group` is set in `.project-manager/config.yaml`. Solo students don't need any of it.

## The principle that changed when the team showed up

The solo curriculum says *"don't teach the cliff"* — branches, rebase, reset, pull requests, merge theory are all out of scope, because a solo beginner has no real reason to climb that cliff and the climb has a high dropout rate.

**For a team, the cliff *is* the lesson.** Branches and pull requests aren't engineering folklore; they're the mechanism by which two or more people work on the same code without overwriting each other and without becoming each other's bug factories. Teach the discipline when there's a real reason for it; the reason is here.

So group mode reverses the solo principle, with a small refinement: *we still don't teach the cliff for its own sake; we teach exactly the parts of it that solve the coordination problems this team is going to hit, in the order they're going to hit them.* Rebase, advanced merge-resolution, force-push — still out of scope. Branches, pull requests, code review, pull-before-push — in.

## The three rungs

Group mode is a ladder. The team starts at rung 1 and climbs as the work asks for it. The skill detects which rung from project state; the team doesn't have to ask permission to climb.

### Rung 1 — One computer, many voices

**When.** Lesson 1 (Brainstorm) through most of Lesson 2 (Describe). The team is thinking, talking, sketching. Nobody is typing code yet.

**The setup.** One laptop, one screen, the team around it. Cowork is open. The Anchor Coach skill is loaded. Everyone can see the chat.

**The protocol.**

- Each person announces themselves before their first contribution: *"This is Maria —"*. Once per session per person. The agent tracks attribution from that point on.
- Anyone can speak; the agent listens and summarizes. (Dictation works the same as it does for a solo student — `Win + H` on Windows, double-tap `Fn` on Mac — except now everyone in the room can talk into it.)
- The agent's attributions show up in the brief: *"Maria wants tasks grouped by project; Sam wants the grouping optional."* Disagreements are not hidden; they're named.
- When a decision is reached, the agent prompts the team to confirm: *"OK, sounds like we're going with grouping by project. Anyone disagree? Sam — you good with this for v0?"* If yes → entry to `decisions.md`. If Sam still disagrees → see the three-layer flow below.
- Commits at the end of each lesson go in on `main`, attributed in the message: `M1: brief written (Maria, Sam, Jamal)`.

**The three-layer disagreement flow.** This is the load-bearing pattern for group mode. The agent applies it whenever two voices in the room want different things.

1. **Restate both positions.** The agent says back, in the team's own words: *"Maria wants due dates because she wants to know what's overdue. Sam wants no due dates because he says they'll make Anchor feel like every other to-do app and we're trying to make something cleaner. Did I get both right?"* This step alone resolves about a third of disagreements — people often discover, hearing their own position back, that they weren't as committed to it as they thought.
2. **Agent research.** If the team is still stuck, the agent does *real research* — web search, named sources, practitioner consensus. *"OK, I looked this up: due dates are a feature in nearly every popular task tool, but several productivity researchers — Mark Forster, Cal Newport — argue they create false urgency and recommend against them for personal task management. Sources: \[a, b, c\]. Looks like the case for cutting them is stronger than for keeping them, but reasonable people disagree. Where does that leave you?"* Most teams unstick here, because evidence beats opinion.
3. **Filed for later.** If still stuck after research, the agent writes the disagreement to `filed-for-later.md` (the team's "we'll come back to this" list) with both positions named honestly, the team picks one option for v0 by simple vote or by deferring to whoever owns the feature, and the project moves. Nothing is "lost"; the dissenting voice has a permanent home; the team is unstuck.

This is exactly the pattern real engineering teams use, just made visible. Most beginner teams have never seen it; teaching it on a six-feature class project is the right altitude.

**The artifacts at the end of rung 1.**

```
my-anchor-project/
├── .project-manager/
│   ├── brief.md              ← the team's brief, attributed
│   ├── decisions.md          ← every meaningful choice, one paragraph each
│   ├── filed-for-later.md    ← the "we'll come back to this" list
│   ├── state.json            ← agent-maintained
│   └── config.yaml           ← mode: group, plus the team roster
└── (a git repo with team-attributed commits)
```

### Rung 2 — Shared repo, one branch

**When.** Around Lesson 3 (Scaffold). The team is about to write code. They want to work from more than one place — usually because the in-person session is ending and they want to keep going from home.

**The setup.**

The agent walks the team through this once, with the team lead at the keyboard. (Team lead = whoever has a working GitHub account, or whoever volunteers to learn first.) The other team members watch and learn so they can do it themselves on their own machines after.

1. **Team lead creates the shared repo.** `gh repo create my-anchor-project --public --source=. --push`. The skill confirms the repo URL with the team and writes it to `.project-manager/config.yaml`.
2. **Everyone else clones it.** `gh repo clone <team-lead-username>/my-anchor-project` on each teammate's laptop. The skill checks `gh auth status` on each machine first; if not authed, walks the teammate through `gh auth login --web` (one command, browser flow, token in credential manager).
3. **The team agrees on a rhythm.** Commits go on `main` directly at this rung. The skill prompts the team to follow a simple pull-then-push routine before each commit: `git pull origin main` first, then make changes, then `git add`, `git commit`, `git push`. If two people forget the pull, the second one will get a push rejection — the skill catches this, explains it in one sentence, and walks them through `git pull --rebase` (the one safe rebase the curriculum teaches, because it's the right tool for "I forgot to pull").
4. **The `.gitignore` rule.** Docs (markdown, HTML, JS, config) go in the repo. *Data does not.* The skill drops a `.gitignore` that excludes `data/`, `*.csv`, `*.sqlite`, `*.db`, `node_modules/`, `.env`, and a few obvious others — and tells the team in plain English: *"Code and docs go in the repo. Data stays on your machine, because (a) it can be big, (b) it can be private, and (c) different teammates may have different data."* For Anchor specifically there's no data yet, but the rule is there so when the team moves to a data-shaped project it's already in muscle memory.

**The protocol.** Same brainstorming protocol as rung 1, but now anyone can be at the keyboard. The agent attributes commits to whoever ran the commit command. Decisions and filed-for-later entries still flow into the shared files in `.project-manager/`, which everyone can see.

### Rung 3 — Branches and pull requests

**When.** Around Lesson 4 (Build). The team is writing features in parallel — Maria is doing the add-task feature, Sam is doing the project sidebar, Jamal is doing the polish. Working on `main` together at this point causes constant conflicts.

**The setup.**

The agent introduces this when (and only when) the team is about to hit parallel work for real. Not before. The lesson is "we need this *because* of this specific thing we're about to do" — never "we need this because someday we'll need it."

**The branch naming convention.** `<initials>/<feature>`. So Maria's add-task branch is `mj/add-task`. Sam's project sidebar is `sk/project-sidebar`. Short, scannable, makes ownership visible on GitHub.

**The workflow, per feature.**

1. **Pull first.** `git checkout main && git pull origin main`. Always. The skill bakes this into the start of every feature.
2. **Branch.** `git checkout -b mj/add-task`.
3. **Code on the branch.** Commits land on the branch, not on `main`. Each commit message follows the milestone format: `M4.1: add task on Enter`.
4. **Push.** `git push -u origin mj/add-task`.
5. **Open the pull request.** `gh pr create --fill --base main --head mj/add-task`. The skill helps draft the PR description — what changed, what to test, what the PR is *not* doing. (The PR description is the same shape as the brief: scenarios, a *because*, what this is NOT. The skills compose; the muscle is the same.)
6. **Review.** At least one teammate reads the PR, runs the change in their browser, leaves comments or an approval review.
    - If a teammate is available and reviewing: great, the discipline is intact.
    - **If no teammate is available**, the agent is the reviewer of last resort. The agent reads the diff substantively, runs the change in its head (and asks the PR author to share a screenshot of the running app), leaves real comments — *"the event listener is on `<input>`; should it be on `<form>` so Enter submits and Shift+Enter doesn't?"* — and approves only after the PR author has either fixed the issues or explained why they're not issues. The agent's approval counts for the rubric, but the M6 retrospective flags whether the team practiced *human* code review or relied on the agent.
7. **Merge.** Once approved, `gh pr merge --squash --delete-branch`. Squash-merge keeps `main` history clean and beginner-readable; delete-branch keeps the branch list tidy.
8. **Everyone pulls main.** *"OK, Maria's add-task is merged. Everyone — `git checkout main && git pull origin main` before your next branch."* The skill prompts this in the team chat.

**Merge conflicts.** The skill teaches the simple case only: two people changed the same line, the conflict markers show up in the file, the team decides which version to keep (or how to combine), saves, `git add`, `git commit`. For anything more complex than three or four conflict markers, the skill says: *"This conflict is bigger than a v0 conflict should be. Let's `git restore` the branch and rebuild the change from `main`."* That's the safe beginner sledgehammer, same as the solo path.

**The M4 rubric, in group mode.** Each of the six M4 features adds a sub-checkbox: *"PR merged with at least one approving review (agent or teammate)."* The agent will not mark M4.1 (add tasks) green until it sees a merged PR with an approval. This is the real-team gate; it's what makes "we built it together" honest.

## The retrospective check (M6 Ship, group mode)

At M6, before the team gets the "shipped!" mark, the agent runs a one-minute retrospective:

- *Did every team member have at least one PR merged?* If not, the project shipped uneven — the agent notes which teammate didn't author code and asks the team whether that was intentional (e.g., one person was the designer and another was the documenter, both legitimate).
- *Were PRs human-reviewed or agent-reviewed?* If most PRs were agent-reviewed (the team didn't practice reading each other's code), the agent gently notes this and lists the three concrete code-review skills the team didn't get reps on. The project still ships; the note goes in `retrospective.md` for the team to reflect on.
- *How many things ended up filed-for-later?* If `filed-for-later.md` is empty, the agent gently asks whether the team really didn't disagree about anything, or whether disagreements got swallowed. (A team that never disagreed about anything in a real first project usually means one voice dominated.) If `filed-for-later.md` has more than five items, the agent notes that the team had a lot of unresolved disagreements and asks whether v1 should start by addressing them.

The retrospective is not a grade. It's a mirror. The team reads it together, talks about what they'd do differently next time, and writes a one-paragraph response in `retrospective.md`. That paragraph is the last commit on the project.

## The files this mode adds

In `.project-manager/`:

- `decisions.md` — one paragraph per non-obvious choice. Includes options considered and dissenting views.
- `filed-for-later.md` — disagreements parked for now. Each entry names both positions, the date filed, who proposed each, and what triggered "we couldn't decide."
- `config.yaml` gains a `team:` field listing roster names and (when set up) GitHub usernames.
- `retrospective.md` — written at M6, one paragraph from the team in response to the agent's retrospective check.

In the repo root:

- `.gitignore` — drops at rung 2, excludes data and machine-specific cruft. Code and docs go in.
- The repo itself is public on GitHub at the URL recorded in `config.yaml`.

## What stays the same as solo mode

- The seven principles on the wall.
- The seven-milestone spine.
- The rubric *shape* (agent-checkable boxes per milestone; one more "PR approved" sub-box at M4 in group mode).
- The coach contract (`STYLE.md`).
- The curriculum-builder lesson format.
- The "type or talk" affordance — everyone in the room can dictate, everyone can type.

Group mode is solo mode plus the parts of engineering team discipline that the team actually needs. Nothing more, nothing less.
