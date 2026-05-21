# Anchor — invite to send a student

Copy everything below the line into an email or message. It's written for someone
who has never coded. About 5 minutes from zero to their first lesson; ~2 hours of
session time total, spread over whatever calendar suits them.

---

Hi — I'd love your help trying a short AI-coding course I built, called **Anchor**.
You don't need to know how to code: you'll describe what you want in plain English
and an AI agent writes the code. By the end you'll have built and shipped a small
personal task tracker. About 2 hours total, in bite-sized lessons.

**Three steps to start (about 5 minutes):**

**1. Pick your AI agent.** Any of these works (requires a paid subscription):
- **Cowork** (Recommended for beginners) — Desktop app from Anthropic. Download from [claude.ai/download](https://claude.ai/download).
- **Claude Code** — Terminal-based. Install via `npm install -g @anthropic-ai/claude-code`.
- **Gemini CLI** — Terminal-based. Install via `npm install -g @google/gemini-cli`.

**2. Make an empty folder** for your project — e.g. right-click your Desktop → New Folder → name it `anchor`. Leave it empty.

**3. Open that folder in your agent** (Cowork: **Open Folder**; Claude/Gemini: `cd` into the folder and run `claude` or `gemini`), then paste this exact message into the chat:

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

You don't need to understand that message — it just keeps the agent from tripping
over a known quirk. From there, just talk to the agent and follow along.

**What happens:** the agent sets up your project folder and starts Lesson 1 — all
inside the chat, no terminal, no installs. Over the lessons you'll brainstorm what
you want, watch the agent build it, test it, and (optionally) publish it to GitHub.

**If anything feels off, slow, or confusing — tell me.** Your friction is the most
useful thing I can learn from.

Thanks for trying it.

---

## Note for you (not the student)

- The whole curriculum runs **host-free in Cowork** — files plus local version
  history. The student is guaranteed to reach Lesson 1 and finish the course on any
  machine; nothing on the critical path needs their terminal, an install, or GitHub.
- **GitHub is an optional bonus.** The coach tries to set it up (so the project is
  backed up from day one) but falls back to local-only instantly if anything is
  slow or the student declines — it never blocks the lesson. Publishing can happen
  whenever, including at the ship lesson.
- The only time a student ever touches anything outside the chat is the *optional*
  one-time helper install (a double-click) if they choose the GitHub path.
