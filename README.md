# Project-Manager-Package

A Cowork / Claude Code plugin marketplace that ships two things:

1. **`/project-manager`** — a tool-agnostic AI project-management skill (set up, organize, and run software projects from intent to shipped artifact).
2. **`/anchor-coach`** — the **Anchor curriculum**, an interactive first-project course that teaches an absolute beginner to build, test, and ship a working web app by directing an AI agent through eight milestones.

The two are designed to work together: the Anchor curriculum quietly uses `/project-manager` under the hood, and the final lesson reveals this and hands `/project-manager` to the student to use directly on a project of their own choosing.

---

## Getting started — for students

Three steps. About 5 minutes from zero to your first lesson.

### 1. Install Cowork

Go to [claude.com/cowork](https://claude.com/cowork), download for your OS, and sign in with your Anthropic account.

*An Anthropic subscription is required. Free-tier limits may apply; check the current Cowork docs.*

### 2. Add this marketplace and install the curriculum

Open Cowork. Paste these three commands into the chat, one at a time, and press Enter after each. Wait for the confirmation between each one.

```
/plugin marketplace add johncliechty/Project-Manager-Package
```

```
/plugin install project-manager@project-manager-package
```

```
/plugin install anchor-coach@project-manager-package
```

### 3. Start your project

Make an empty folder anywhere on your computer (right-click your Desktop → New Folder → name it `anchor` or whatever you want). In Cowork, click **Open Folder** and pick that folder. Then type:

```
Let's start the Anchor curriculum.
```

Press Enter. The Anchor coach takes it from there. The first lesson is about 10 minutes. The whole curriculum is about 2 hours of session time, spread across whatever calendar feels right. You'll finish with a working web app shipped to your own public GitHub, a retrospective about your work, and a second project already bootstrapped.

---

## What you'll build

Anchor is a single-file local task tracker:

- One `index.html`, vanilla JavaScript, `localStorage` for persistence — no toolchain, no server, no install.
- Six features: add a task, mark complete, delete, group tasks under projects, persist across page reloads, polish (system font, comfortable whitespace, accent color, anchor SVG).
- Tests written by the agent that prove every feature works.
- Public GitHub repo with a README and screenshot at the end.

The course teaches *the loop you'll use for the next twenty years of building things with an AI agent.* Anchor is the seed; the loop is the plant.

---

## The 8-milestone spine

| # | Milestone | What you produce | Time |
|---|---|---|---|
| M0 | Setup | Cowork running, GitHub auth, project folder | ~10 min |
| M1 | Brainstorm | `brief.md` — who it's for, scenarios, NOT-list | ~10 min |
| M2 | Describe | `picture.md` — mockup, 5 data nouns, 4 interactions | ~15 min |
| M3 | Scaffold | `index.html` empty shell — agent shows 3 mockups, you pick | ~30–40 min |
| M4 | Build | Working `index.html` with all 6 features + tests | ~10 min |
| M5 | Test | Use it for real; find 2–3 things; fix them | ~10 min |
| M6 | Ship | Public GitHub repo + README + screenshot + text the link | ~10 min |
| M7 | Launch | Retrospective + meta-reveal + your next project bootstrapped | ~25 min |

Total: ~2 hours of session time. The course assumes you spread it across whatever calendar feels right.

---

## For instructors and developers

The curriculum is designed to be remixed for other first-project shapes (Business Statistics tool, data pipeline, content tool, etc.). The seven principles, the milestone spine, the rubric shape, the git contract, and the coach contract are reusable; what changes per course is the feature checklist and the technical scope. See [`courses/anchor-coach/lessons/`](./plugins/anchor-coach/skills/anchor-coach/lessons/) for the lesson format reference and [`PLAN.md`](https://github.com/johncliechty/Project-Manager-Package/blob/main/PLAN.md) (in the Teaching repo) for the design rationale.

### Repo structure

```
Project-Manager-Package/
├── .claude-plugin/
│   └── marketplace.json              ← plugin marketplace catalog
├── plugins/
│   ├── project-manager/              ← the /project-manager plugin
│   │   ├── .claude-plugin/plugin.json
│   │   └── skills/project-manager/
│   │       ├── SKILL.md
│   │       └── references/
│   └── anchor-coach/                 ← the /anchor-coach plugin
│       ├── .claude-plugin/plugin.json
│       └── skills/anchor-coach/
│           ├── SKILL.md
│           ├── lessons/              ← L1–L7
│           └── references/
│               ├── STYLE.md
│               ├── group-mode.md
│               ├── skills-and-prompts.md
│               └── milestones/      ← M0–M7 rubrics
├── bin/                              ← legacy CLI (pm init, pm status, etc.)
├── references/                       ← legacy kit references
├── templates/                        ← project templates
├── SKILL.md                          ← legacy top-level skill (CLI users)
└── README.md                         ← this file
```

The legacy CLI (`pm init`, `pm status`, `pm what-now`, `pm brief`) at the root is preserved for direct command-line use; it predates the plugin shape and stays available to existing collaborators. New users should install via the plugin marketplace path above.

---

## The standalone CLI (legacy path)

For users who want to use `/project-manager` outside the Cowork plugin system — Claude Code, Cursor, Codex, Gemini CLI, OpenClaw, or no AI at all:

```bash
git clone https://github.com/johncliechty/Project-Manager-Package.git
cd Project-Manager-Package
npm link                  # makes `pm` available globally (optional)

# In a folder where you want to start a project:
mkdir my-project && cd my-project
pm init                   # interactive bootstrap
```

The kit enforces a **bounded operating loop**: research → proto-plan → critique (max 2 passes) → decompose → build → log → review. The bounded-iteration rule is the discipline; the rest of the kit is plumbing.

Full CLI documentation is in [`SKILL.md`](./SKILL.md) and [`INTEGRATION.md`](./INTEGRATION.md).

---

## License

MIT for the code, CC BY 4.0 for the curriculum content. See [`LICENSE`](./LICENSE).

---

## Authorship

Built by John Liechty. The curriculum was developed with Cowork (Claude) as a writing partner; the operating-loop discipline derives from John's *AI-Assisted Project Workflow*. Contributions welcome via pull request.
