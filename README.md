# Project-Manager-Package

A tool-agnostic AI-collaboration toolkit that ships two things:

1. **Anchor Coach** — an interactive first-project course that teaches an absolute beginner to build, test, and ship a working web app by directing an AI agent through eight milestones (about 2 hours of session time, spread across whatever calendar feels right).
2. **Project Manager** — the underlying skill that organizes and runs software projects from intent to shipped artifact. Anchor Coach uses it internally, then hands it directly to the student in the final lesson so they can apply the same loop to a project of their own choosing.

Works with **Cowork**, **Claude Code**, and any agent that has bash and file-read access. No marketplace install required — just clone the repo and the agent reads the skill files directly.

---

## Getting started — for students

Three steps. About 3 minutes from zero to your first lesson.

### 1. Install Cowork

Go to [claude.com/cowork](https://claude.com/cowork), download for your OS, and sign in with your Anthropic account. *(An Anthropic subscription is required.)*

### 2. Make an empty folder for your project

Right-click your Desktop → New Folder → name it `anchor` (or whatever you want). Don't put anything in it.

### 3. Open the folder in Cowork and paste the bootstrap prompt

Open Cowork. Click **Open Folder** and pick the folder you just made. In the chat, paste this exact prompt and press Enter:

```
Please clone https://github.com/johncliechty/Project-Manager-Package
into my home directory if it isn't already there, then read the file at
Project-Manager-Package/plugins/anchor-coach/skills/anchor-coach/SKILL.md
and start the Anchor curriculum with me here in this folder. Follow the
SKILL.md's instructions for the rest of our session and every future one.
```

Your Anchor coach takes it from there. It will clone the curriculum repo to your home folder, drop a small `CLAUDE.md` in your project folder so that every future Cowork session in this folder auto-loads the skill (no re-pasting needed), and start your first lesson — which is about 10 minutes.

The whole curriculum is about 2 hours of session time, spread across whatever calendar feels right. You'll finish with a working web app shipped to your own public GitHub, a retrospective about your work, and a second project already bootstrapped.

**Updates.** If the curriculum gets improved later, just type *"update the Anchor skill"* and the coach will `git pull` the repo. No re-install ceremony.

---

## What you'll build

Anchor is a single-file local task tracker — the narrow default. The coach can scale it up if you want something bigger.

**The default scope:**

- One `index.html`, vanilla JavaScript, `localStorage` for persistence — no toolchain, no server, no install.
- Six features: add a task, mark complete, delete, group tasks under projects, persist across page reloads, polish (system font, comfortable whitespace, accent color, anchor SVG).
- Tests written by the agent that prove every feature works.
- Public GitHub repo with a README and screenshot at the end.

**Want it to do more?** Anchor can grow from where v0 lands — extra features, better polish, whatever fits the way you actually use it. Just tell your coach at any lesson; bigger asks take more refinement time, but you'll see how fast agentic AI builds even substantial additions on top of a clean foundation. *The narrow default is the launchpad, not the ceiling.*

The course teaches *the loop you'll use for the next twenty years of building things with an AI agent.* Anchor is the seed; the loop is the plant.

---

## The 8-milestone spine

| # | Milestone | What you produce | Time |
|---|---|---|---|
| M0 | Setup | Cowork running, project folder with `.project-manager/`, README placeholder | ~5 min |
| M1 | Brainstorm | `brief.md` — who it's for, scenarios, NOT-list | ~10 min |
| M2 | Describe | `picture.md` — mockup, 5 data nouns, 4 interactions | ~15 min |
| M3 | Scaffold | `index.html` empty shell — agent shows 3 mockups, you pick | ~30–40 min |
| M4 | Build | Working `index.html` with all 6 features + tests | ~10 min |
| M5 | Test | Use it for real; find 2–3 things; fix them | ~10 min |
| M6 | Ship | Public GitHub repo + README + screenshot + text the link (coach handles gh install + auth here if not done) | ~15 min |
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
