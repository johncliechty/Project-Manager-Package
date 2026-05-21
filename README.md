# Project-Manager-Package

A tool-agnostic AI-collaboration toolkit that ships two things:

1. **Anchor Coach** — an interactive first-project course that teaches an absolute beginner to build, test, and ship a working web app by directing an AI agent through eight milestones (about 2 hours of session time, spread across whatever calendar feels right).
2. **Project Manager** — the underlying skill that organizes and runs software projects from intent to shipped artifact. Anchor Coach uses it internally, then hands it directly to the student in the final lesson so they can apply the same loop to a project of their own choosing.

Works with **Cowork**, **Claude Code**, and any agent that has bash and file-read access. No marketplace install required — just clone the repo and the agent reads the skill files directly.

---

## Getting started — for students

About 5 minutes from zero to your first lesson. The only setup is one dead-easy step, the very first time on your computer: you double-click a file the agent drops into your folder, which installs a small helper so the agent can run git and GitHub *for* you. After that first time, every future project is zero-touch. (Prefer not to install it? The agent falls back to a local-only mode and you can add GitHub later.)

### 1. Pick your AI agent

Both desktop and terminal-based agents work. **Requires a paid subscription (Claude Pro or Gemini Advanced/API).**

- **Cowork** (Recommended for beginners) — Desktop app from Anthropic. Download from [claude.ai/download](https://claude.ai/download).
- **Claude Code** — Terminal-based. Install via `npm install -g @anthropic-ai/claude-code`.
- **Gemini CLI** — Terminal-based. Install via `npm install -g @google/gemini-cli`.

### 2. Make an empty folder for your Anchor project

Create a new, empty folder on your Desktop named `anchor`.

### 3. Open the folder in your agent and paste the bootstrap prompt

Open your agent (Cowork: **Open Folder**; Claude Code/Gemini: `cd` into the folder and run `claude` or `gemini`). In the chat, paste this exact prompt:

```text
I'd like to start the Anchor curriculum in this folder.

First, get the curriculum onto the machine without breaking anything:
- If you're a sandboxed agent (e.g. Cowork — your working path looks like
  /sessions/.../mnt/...), THIS folder is a mounted host folder where git can't
  run. Clone the curriculum with
  `git clone --depth 1 https://github.com/johncliechty/Project-Manager-Package`
  into a temporary location like /tmp/anchor-coach-src — NOT into this folder.
  If instead you have direct access to my computer's shell (e.g. Claude Code),
  clone it to my home directory; git works normally for you.
- Then read
  Project-Manager-Package/plugins/anchor-coach/skills/anchor-coach/SKILL.md
  and follow it for this session and every future one. If you're sandboxed, the
  SKILL will tell you to read references/sandbox-and-git.md first — do that
  before any git or file operation.

Then start the Anchor curriculum with me here in this folder.
```

---

## ⚡ Pro Tip: "YOLO" Mode

If you find the constant permission prompts annoying, you can enable **"YOLO Mode"** to let the AI work faster:

*   **Claude Code:** Start with `claude --yolo`
*   **Gemini CLI:** Start with `gemini --yolo`

*Warning: YOLO mode means the AI will make changes without asking first.*

Your Anchor coach takes it from there. It will:

You don't need to understand that prompt — it just keeps the agent from tripping over a known sandbox quirk. Your Anchor coach takes it from there. It will:

1. Fetch the curriculum into a temporary working area (not your project folder).
2. Drop a small `CLAUDE.md` in your project folder so every future session here auto-resumes the curriculum — no re-pasting needed.
3. Set up your project folder, give it a home on GitHub, and start tracking versions of your work — so it's backed up from day one. The one-time helper install is a single double-click; the agent hands you the file.
4. Start your first lesson — about 10 minutes.

The only thing you ever do outside the chat is that **one double-click the first time**, to install the helper — no copy-pasting commands, and nothing to repeat on future projects.

The whole curriculum is about **2 hours of session time**, spread across whatever calendar feels right. You'll finish with a working web app shipped to your own public GitHub, a retrospective about your work, and a second project already bootstrapped.

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