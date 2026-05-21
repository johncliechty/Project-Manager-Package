# Anchor Coach

> A Cowork / Claude Code skill that turns the agent into a coach — not an autopilot — for an absolute-beginner student building their first web app.

The student is the engineer. The agent is the senior who reviews.

**Where this lives.** Anchor Coach ships as a sub-folder inside the [`johncliechty/Project-Manager-Package`](https://github.com/johncliechty/Project-Manager-Package) repo at the path `courses/anchor-coach/`. The `courses/` top-level signals *pedagogy* (as opposed to the workflow tooling that lives elsewhere in the same repo) and scales to siblings like `courses/bizstats-coach/` for future first-project courses.

## What this skill does

Walks an absolute beginner (never coded, never used git, never used a terminal) through building **Anchor** — a local task-and-project tracker that runs by double-clicking an HTML file. Six features, vanilla JavaScript, `localStorage` for persistence. No npm. No build step. About 6–10 hours of guided work across seven milestones.

The skill enforces a real pedagogical contract:

- **Show one, fade one, do one.** Worked examples → faded examples → blank practice. The agent refuses to show the next worked example if the student hasn't typed the faded one.
- **Green before gold.** Each milestone has a tiny, agent-checkable rubric. The agent refuses to advance until every box is ✓.
- **The coach asks first, types last.** Before any code paste: one clarifying question, one student guess. Code is the last resort.
- **Commit small, commit always.** Tiny commits at every milestone gate-pass. Public GitHub push at M6. The default is on; the student can opt out via `.project-manager/config.yaml`.
- **Don't teach the cliff.** Branches, rebase, reset, revert, merge theory — out of scope. Recovery is "ask the agent" or [Oh Shit, Git](https://ohshitgit.com/).

## Install

```bash
cowork plugin install github.com/johncliechty/Project-Manager-Package@courses/anchor-coach
```

(The `@courses/anchor-coach` suffix points Cowork at the sub-folder inside the repo. If your installer doesn't yet support sub-paths, clone the repo and point Cowork at the local `courses/anchor-coach/` directory.)

Then, in Cowork, open a folder where you want to build your project and say:

> *"I'd like to start my first project."*

The skill will introduce itself, ask one question, and start Milestone 0.

## What you'll have at the end

- A public GitHub repo with your Anchor.
- A working `index.html` you can double-click to run.
- A README *you* wrote that explains your tool.
- A commit history that tells the story of the build, one milestone at a time.
- A screenshot you're proud of.
- A friend who has clicked the link.

## What's inside this repo

```
SKILL.md                       The skill's main file. Cowork reads this on activation.
README.md                      You are here.
LICENSE                        MIT for skill code; CC BY 4.0 for lesson content.
references/
├── STYLE.md                   The coach-not-autopilot contract. Read on every turn.
├── git-hygiene.md             The default-on git/GitHub contract.
└── milestones/                One file per milestone, with the agent-checkable rubric.
lessons/                       One file per milestone, in Ghost World Labs
                               curriculum-builder 3-part format (Lecture / Worked
                               Examples / Practice Problems).
scripts/                       init-project, check-milestone, git-bootstrap.
assets/                        Templates dropped into the student's new project.
teacher/
└── ANSWER-KEYS/               Answer keys for the practice problems.
                               Visible to teacher and dean roles; hidden from students.
```

## Designed for remixing

This skill is the worked example for the Anchor curriculum, and it's also the template for *any* first-project course. Want to teach Business Statistics this way? Or research replications? Or R + Python data pipelines? The pedagogy, the milestone shape, the rubric structure, the git contract, the coach contract — all of it is domain-agnostic. Add a sibling folder under `courses/` (e.g. `courses/bizstats-coach/`), swap the lessons, ship.

The template, with a worked Business-Statistics example, lives at [`TEMPLATE-for-other-courses.md`](../../TEMPLATE-for-other-courses.md) at the repo root.

## License

MIT for the skill code (the orchestration prose in `SKILL.md`, `STYLE.md`, the milestone rubrics, the scripts). Creative Commons Attribution 4.0 for the lesson content under `lessons/`. Use it, modify it, teach with it. If you build a course on top, please link back.

## Composes with

- `curriculum-builder` — every lesson is in the 3-part format with full YAML provenance frontmatter.
- `project-manager` — the existing PM kit handles `.project-manager/` state.
- `expert-coder` — for students who level up to v1+ ambitions.

## Credits

Designed by John Liechty with Cowork (Claude) as the co-author. Pedagogy distilled from Sweller's cognitive load theory, Bloom's mastery learning, Renkl & Atkinson on faded worked examples, the 2025 SIGCSE papers on AI-tutored novices, and the [Software Carpentry git-novice](https://swcarpentry.github.io/git-novice/) tradition.
