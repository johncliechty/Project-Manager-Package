---
name: anchor-u06-ship
kind: lesson
title: "Lesson 6 — Ship — Putting It Where Other People Can See It"
source_course: "first-project/Anchor"
source_file: "lessons/06-ship.skill.md"
parent: anchor-coach
milestone: M6
hours_estimated: 0.2
description: "Lesson 6 of the Anchor curriculum. The student writes one prompt that creates a public GitHub repo, drafts a README from brief.md + a screenshot, pushes everything, and gives them back the URL. They text the link to one person and write their one-sentence reaction. ~10 minutes. Three-part curriculum-builder format: Lecture, Worked Example, Practice."
license: "CC BY 4.0"
access:
  student:           [readonly_lecture, readonly_worked_examples, readonly_practice]
  teacher:           [readonly_lecture, readonly_worked_examples, readonly_practice, resolve_answer_key]
  dean:              [readonly_lecture, readonly_worked_examples, readonly_practice, resolve_answer_key, edit]
---

# Lesson 6 — Ship — Putting It Where Other People Can See It

> **Goal of this lesson.** Anchor exists at a public URL on GitHub, the repo has a README that explains what the tool is and how to run it, and you've texted the link to at least one person.
>
> **Skill attached: `/expert-coder`** for the README work (clean prose, no over-formatting).
>
> **Time.** About 10 minutes.
>
> **What you'll have when you're done.** A public GitHub repo, a screenshot embedded in the README, a commit `M6: shipped`, and a one-sentence reaction from the first person you sent it to logged in `.project-manager/ship-note.md`.

---

## Lecture

Picture this. The house is done. You moved in last week. The bed is made, the kitchen works, you've cooked a few meals, and you've started to notice which floorboard squeaks. Tonight is the night a friend is coming over for the first time. They ring the bell. You open the front door. They step into the entryway. *Before they say a word*, they take in the whole space — the light, the smell, the photo on the wall opposite the door, whether the place looks like *you*. You can't control what they take in; you can only control what's there to be taken in.

Until today, Anchor was yours. Today it becomes something other people can see, and the README is the entryway.

Until now Anchor has existed on your laptop. That's a real thing — it does what you said it would do, your data lives in it, you use it. But there's a quiet moment that hasn't happened yet, and it's the moment that turns a project into *a thing*. That moment is when someone other than you can see it.

Shipping is the engineering word for *making your work exist for other humans*. Not deployed-to-a-server with users-and-uptime-and-billing — that's a different thing, a bigger thing, several projects out from where you are. Shipping at the v0 scale is much simpler: your code goes to a public place on the internet (GitHub), it has a README that explains what it is, and someone you know can click a link and see it. That's it. Ten minutes from where you are now.

The smallest possible version is the right version. The repo is public. The README has four parts — *what this is* in one paragraph, *how to run it* in two lines (download the folder, double-click `index.html`), one screenshot, and a one-line credits note that says you built it with Cowork as your coach. The screenshot is the load-bearing part of the README; people scroll past words and look at pictures. The credits note is honest about how it got made, which matters for two reasons: it tells the truth about your method, and it gives the next person reading the README permission to learn the same way.

Before any of that there's a small one-time setup beat. If you've never published anything to GitHub before, the coach checks whether `gh` (the GitHub CLI) is installed and authenticated on your machine. If it isn't — first-timers, most of you — the coach handles the install (about 30 seconds via `winget` on Windows or `brew` on Mac) and walks you through `gh auth login`, which opens a GitHub sign-in page in your browser. Three minutes total for a true first-timer; under a minute if `gh` is already there. You watch and click the GitHub sign-in once; the coach does the rest. (If your runtime is sandboxed, the coach delegates the host operation to Claude Code via the `use-claude-code` skill — one paste, then back to building.)

After the one-time setup, the whole ship is one prompt. The agent runs `gh repo create`, generates the README from `brief.md` (so it inherits the voice you already established), embeds the screenshot you take, makes the first push, and gives you back the URL. The clarifying questions are small — *"public or private? repo name `anchor`, or do you want something else? Any specific copy to keep or omit?"*

Then the part that isn't software: you copy the URL and you send it to someone. A friend, a sibling, your spouse, the person you keep talking to about this project — any one human who knows you and would humor you for ninety seconds. They click the link. They see the screenshot. They send back one sentence — *"oh nice"*, *"is that for grad school?"*, *"how does the projects sidebar work?"*. That sentence is the artifact that proves the lesson worked. You write it into `.project-manager/ship-note.md` and the milestone is closed.

This is the moment most beginners say *"oh — I built something that exists in the world."* You did. Take it.

---

## Worked Example — The reading-log student ships

Reading log is built, used, revised. Five commits on disk (`M1` through `M5`). The student is ready to ship.

**Step zero — gh setup (one-time, ~3 minutes).** Anna's reading log is built and ready to ship, but she's never published anything to GitHub before — no `gh`, no GitHub account yet. The coach handles it via the Setup Protocol. *"Going to install gh and get you signed in to GitHub now — that's the tool that creates and pushes the repo. About three minutes total, mostly waiting on the install. Watch."* The coach runs `gh --version` (not found), then `winget install GitHub.cli` — about 30 seconds. The coach is running in Cowork's Linux sandbox so it doesn't have host PowerShell directly; it delegates via `use-claude-code` — Anna pastes one prompt into her Claude Code terminal, gh installs, she pastes back "done." The coach then runs `gh auth login --web`: a device-code page opens in her browser, she signs in to GitHub (no account yet — she creates one, takes about a minute), pastes the device code, the auth completes. The coach verifies with `gh auth status`: *"All set. gh installed (2.x.y), authenticated as `anna-kim`. Now for the actual ship."* Three minutes from a true first-timer; under a minute for any student who already has gh ready.

**Step one — take the screenshot.** Open `index.html`, make sure there are 5–10 books in the list with notes (a fresh empty page is a bad screenshot), full-window screenshot, save it as `assets/screenshot.png` in the project folder. The coach walks the student through the OS shortcut if needed (`Win+Shift+S` on Windows, `Cmd+Shift+4` on Mac).

**Step two — the prompt.** The coach offers a template; the student edits one phrase.

> *"Using `/expert-coder`, ship this project to GitHub. Run `gh repo create reading-log --public --source=. --remote=origin --push`. Generate a `README.md` from `.project-manager/brief.md` — four parts: a one-paragraph 'what this is' (in my voice, derived from the brief), a 'how to run' that says 'download the folder, double-click `index.html`', the screenshot at `assets/screenshot.png` embedded near the top, and a one-line credits note at the bottom that reads 'Built by [my name] with Cowork as my coach.' Make the README readable in 30 seconds — no over-formatting, no marketing voice, no emoji. Ask me any clarifying questions before running anything."*

**The agent asks two questions:**

> *"Two quick things.*
> *(1) Repo name confirmed as `reading-log`?*
> *(2) Your name for the credits line — pull it from the brief's who-it's-for paragraph (which says 'I'm a graduate student named Anna') as 'Anna'? Or do you want the full name?"*

**The student answers:**

> *"`reading-log` is right. Use 'Anna Kim' for the credits."*

**The agent runs it.** About thirty seconds of activity in the chat — repo created, README written, screenshot embedded, first commit pushed. The agent reports back:

> *"Shipped. The repo is live at `https://github.com/anna-kim/reading-log`. The README renders correctly on GitHub — screenshot at the top, brief paragraph, two-line how-to-run, credits at the bottom. `git status` is clean. The full M1–M5 commit history is on the public branch."*

**The student opens the URL.** Their reading log has a public page now. The screenshot is right there. The README reads in fifteen seconds. The credits line tells the truth.

**Step three — text the link.** The student copies the URL and texts it to her sister with the message *"made a thing."* The sister texts back two minutes later: *"is this the books thing? cute, are you going to track Sally Rooney for me too?"*

**Step four — ship note.** The student writes one line into `.project-manager/ship-note.md`:

```
Sister, 2026-05-13, "is this the books thing? cute, are you going to track Sally Rooney for me too?" — first person outside me has seen Anchor.
```

**Commit:**

```
git add .
git commit -m "M6: shipped"
git push
```

Total time: about 9 minutes, including the screenshot and the sister.

Notice three things.

First, **the README inherited the brief's voice.** It didn't read like marketing copy because the brief didn't read like marketing copy. `/expert-coder` carried the plain-English discipline through. Voice survives the pipeline if you let it.

Second, **the credits line is the most important sentence in the README.** It says how the thing got made. The next person who finds this repo and reads the README learns *"this person built a real tool by directing an agent under a curriculum."* That's a permission slip for them to try the same way. Authentic provenance is also pedagogy.

Third, **the sister's response is data.** *"Cute, are you going to track Sally Rooney for me too?"* is a feature request. Not a v0 request — that's filed for later. But it's the first sign that the tool exists for someone other than you. That's the gesture this milestone is training.

---

## Practice — The session, end to end

About 10 minutes.

### Step 0 — gh setup (one-time, skip if you already have gh installed and authenticated)

If `gh` (the GitHub CLI) isn't installed and authenticated on your machine, the coach handles it now — about 3 minutes total, you click once. Plain-English version:

1. Coach runs `gh --version`. If it returns a version ≥ 2.0, jump to Step 1.
2. If not, coach installs gh — `winget install GitHub.cli` on Windows or `brew install gh` on Mac. About 30 seconds. (In sandboxed runtimes the coach delegates the install to Claude Code on your host via the `use-claude-code` skill — one paste, one report-back.)
3. Coach runs `gh auth login --web`. A device-code page opens in your browser. You sign in to GitHub (or create a free account if you don't have one — about a minute), paste the device code shown in your terminal, and the auth completes. Token lands in your OS credential manager automatically.
4. Coach verifies with `gh auth status` and confirms you're ready.

Total: about 3 minutes for a first-timer, near-zero if gh is already there. You watch and click the GitHub sign-in once; the coach does the rest.

**Want to skip GitHub entirely?** If you'd rather not connect a GitHub account, tell the coach *"skip L6, ship locally"* and they'll close L6 with a local-only "shipped" state and move you to L7. The course's main thread (L1–L5 + L7) still works without the public publish step.

### Step 1 — Take a screenshot

Open `index.html`. Add 5–10 tasks across two projects so the screenshot doesn't show an empty page. Take a full-window screenshot:

- Windows: `Win + Shift + S` → drag-to-select → opens the snip in Snip & Sketch → save to `assets/screenshot.png` in your project folder.
- Mac: `Cmd + Shift + 4` → drag-to-select → image lands on Desktop → move it to `assets/screenshot.png`.

If `assets/` doesn't exist yet, the coach makes the folder for you with one shell command.

### Step 2 — Write the ship prompt

Coach offers a template referencing `brief.md`, the screenshot path, and the credits line format. Edit anything that doesn't sound like you.

### Step 3 — Answer the agent's clarifying questions

Usually two: *"repo name? credits-line name?"* Sometimes three if the brief is ambiguous about your name or the tool's name.

### Step 4 — Agent ships

Repo created, README written and pushed, screenshot embedded. URL reported back. Open it in your browser. Confirm the screenshot renders, the README reads cleanly, the credits line is right.

If anything's off (screenshot didn't render, README has the wrong name, etc.), one fix prompt and re-push. Rare; this part is well-trodden.

### Step 5 — Text the link

Copy the URL. Pick one person. Text it to them. *"Made a thing"* is enough; the screenshot does the rest of the talking. You don't have to explain.

### Step 6 — Record what they said

When they reply, write one line into `.project-manager/ship-note.md`:

```
<who>, <date>, "<their exact words>" — first person outside me has seen Anchor.
```

If their reply takes longer than a few minutes, you don't have to wait — log it later in the day. The lesson can close before the reply lands.

### Step 7 — Closing sweep + commit

Coach walks the M6 rubric out loud. Brisk. Commit:

```
git add .
git commit -m "M6: shipped"
git push
```

Done.

---

## When this lesson is over

You should have, on disk and online:

```
my-anchor-project/
├── .project-manager/
│   ├── brief.md
│   ├── picture.md
│   ├── answers.md
│   ├── prompts.md        ← grew by one entry (your M6 ship prompt)
│   ├── ship-note.md      ← new: who you sent it to and what they said
│   └── state.json
├── assets/
│   └── screenshot.png
├── README.md             ← public README, four parts
├── index.html
└── .git/                 ← pushed to github.com/<your-handle>/anchor (or whatever you named it)

→ public URL: github.com/<your-handle>/anchor
```

You should have, in your head:

- The experience of *sending a friend a link to a thing you made and watching them react to it.* That's the moment you stop being someone who built a thing and start being someone who *shipped* a thing. They're different identities.
- A working understanding of `gh repo create` + `git push` as a single step that lives in the agent's hands. You don't need to memorize the gh flags; the agent does. You need to know that *ship* is a one-prompt thing now.
- The feeling that the next thing is *not adding more features.* The next thing is *what's the next project?* That's Lesson 7. It's the most interesting one in the course.

M6 is closed; the coach moves you straight to M7.

---

*Lesson 6 of 7. Next: Lesson 7 — Launch — Reveal and Transfer.*
