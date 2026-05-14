---
name: anchor-u04-build
kind: lesson
title: "Lesson 4 — Build — The Whole App, From One Good Prompt"
source_course: "first-project/Anchor"
source_file: "lessons/04-build.skill.md"
parent: anchor-coach
milestone: M4
hours_estimated: 0.2
description: "Lesson 4 of the Anchor curriculum. Teaches the student to write one well-built prompt that produces the entire working app — six features, persistence, polish — in about ten minutes. The agent attaches /expert-coder, asks a few clarifying questions, generates index.html on top of the M3 shell, and writes a small in-browser test routine that proves each feature works. Single iteration round if needed. Three-part curriculum-builder format: Lecture, Worked Examples, Practice Problems."
license: "CC BY 4.0"
access:
  student:           [readonly_lecture, readonly_worked_examples, readonly_practice]
  teacher:           [readonly_lecture, readonly_worked_examples, readonly_practice, resolve_answer_key]
  dean:              [readonly_lecture, readonly_worked_examples, readonly_practice, resolve_answer_key, edit]
---

# Lesson 4 — Build — The Whole App, From One Good Prompt

> **Goal of this lesson.** By the end you have a working `index.html` — all six features functioning, your data surviving a closed tab, the page looking like an app you'd actually use — and a small in-browser test routine the agent wrote that proves every feature works. One git commit: `M4: working app`.
>
> **Skill attached: `/expert-coder`.** The package that teaches the agent to prefer clean, simple, readable code over clever code. (New to skills? Read [`references/skills-and-prompts.md`](../references/skills-and-prompts.md) — three pages, five minutes.)
>
> **Time.** About 10 minutes. If it takes twenty, something interesting happened — tell the coach.
>
> **Type or talk.** Either works. The prompt is short.
>
> **Working with one or two friends?** Even faster — three pairs of eyes on the first running version catches small things one set misses. Sidebar below.
>
> **What you'll have when you're done.** `index.html` (working), the in-browser test report (all green), the next entry in `prompts.md`, one commit.

---

## Lecture

Picture this. It's the day of the shoot. The script is locked. The stage is built, the lighting is hung, the actors are in costume. The director walks onto the set, scans the room once, and says, *"Places. Roll camera. Action."* For the next six minutes the crew works simultaneously — lighting cues fire, cameras track, the lead delivers the line — and at the end, the director calls cut, watches the playback, and asks for one re-shoot of the second beat because the actor's timing was a half-second early. That's M4. Not six rounds of slowly walking the agent through *now-add-this-feature* and *now-add-the-next-one.* One well-prepared shoot. One playback. Maybe one re-take.

You wrote the brief in M1. You described the picture in M2. You set up the empty shell in M3. Today you hand the agent everything it needs in one well-built prompt, watch it generate the entire working app in fifteen seconds, watch a test routine the agent wrote run and report green on every feature, and use the result yourself for a minute to confirm the feel is right. The whole thing in about ten minutes.

M4 is where the whole working app appears in front of you — not because you slowly walk the agent through six rounds of *now-add-this-feature*, but because you give the agent everything it needs in one well-built prompt and let it do the work it's good at. Old-school programming told you to feel each loop six times before it became automatic; that mattered when *you* were typing each loop. You are not typing each loop. The agent is. Your job is to write one prompt that names all six features clearly, get out of the way, and react to what comes back.

Three things make this work. First, `/expert-coder` is attached — the agent reaches for clean, readable code instead of clever code, which makes the result easier for you to skim and to debug if something does go sideways. Second, the agent asks you two or three **clarifying questions** before it generates anything — *"localStorage for persistence, yes? Local-only, no server, no phone? Should I extend your M3 file or rewrite it from scratch?"* — and your one-sentence answers shape the build. The questions are the design conversation; you don't have to anticipate every detail in the prompt, because the agent will surface the gaps. Third, the agent **writes a small test routine alongside the app** that exercises every feature and reports green or red. The tests are the safety net that makes one-shot generation trustworthy: you don't have to click through every feature to verify; the agent's tests do that and tell you the score. You spend your attention on the parts a test can't see — does the polish look right, is the empty state friendly, does the accent color feel like *you*.

Scope discipline: this app runs *locally* on your machine, in your browser, with your data in `localStorage`. No server. No syncing to your phone. Those are real things, and they're each a future project — out of scope for v0 because they'd multiply the complexity before you've felt the speed of the simple version. When you want them, they're each their own ten-minute conversation later.

---

## Worked Example — The reading-log build, end to end

Same reading-log student. Brief and picture done. M3 shell exists in `index.html` — header, list region, add row, the five data-noun variables declared empty.

**The student's prompt** (the coach offered a template; the student edited two phrases):

> *"Read `.project-manager/brief.md` and `.project-manager/picture.md` and the current `index.html`. Using `/expert-coder`, fill in the working logic for everything the picture describes — adding a book, editing the note inline, deleting, persisting across page reload via localStorage. Build on top of my M3 shell rather than rewriting it. Use a system font stack, comfortable whitespace, and one quiet blue as the accent. Also write a small in-browser test routine inside a `<script>` block that, when I open the page with `?test=1` in the URL, adds three books, edits one's note, deletes one, simulates a refresh by re-reading from localStorage, and prints a green/red report for each step into a `<div id="test-results">`. Ask me any clarifying questions before you generate anything."*

**The agent comes back with three questions:**

> *"Three quick things before I generate.*
>
> *(1) Should the date-added on each book come from `new Date()` automatically, or do you want a manual field? Default: automatic.*
>
> *(2) The 'year' in your header — hard-coded to 2026, derived from the most recent book, or a dropdown the user can switch? Default: derived from the most recent book, falls back to current year if the list is empty.*
>
> *(3) For localStorage I'll key the data under `reading-log-v0` so future versions can migrate cleanly without overwriting v0 data. Sound right?"*

**The student answers in two sentences:**

> *"Automatic date, year derived from the most recent book. The v0 key is fine."*

**The agent generates.** About fifteen seconds. `index.html` is now a working reading log on top of the M3 shell — the regions are unchanged but the script block has real logic in it, plus a small `<style>` block with the polish. The agent opens the page in the browser. The student sees a clean, empty reading log: header, prompt to add their first book, polished but quiet.

**The agent then loads `index.html?test=1`.** The page runs its test routine, and a small report appears at the bottom:

```
✓ added "Book One" with current date
✓ added "Book Two"
✓ added "Book Three"
✓ edited Book Two's note
✓ deleted Book One — only 2 books remain
✓ simulated refresh: reloaded from localStorage, both books present, edited note preserved
✓ year header reads "2026" (derived from most recent book)
all tests passed (7/7)
```

The student reads the report. Every feature is verified without them having clicked anything.

**The student opens `index.html` without the `?test=1` flag** (so the test routine doesn't run) and plays with the app for a minute. Adds two books of their own. Edits one note. Deletes a book. Closes the tab. Reopens. Their books are still there. The whole thing works. They smile.

One thing the student doesn't love:

> *"The Add button is too saturated — make it a quieter blue, more like a link than a CTA."*

The agent updates one CSS value. The student opens the page again. *"Yes — done."*

**The commit:**

```
git add .
git commit -m "M4: working app"
```

Total time from *"ready for M4"* to commit: about eight minutes.

Notice four things about this session.

First, **the clarifying questions are the design conversation.** The student didn't have to anticipate the date-handling detail or the year-derivation question in their prompt — the agent surfaced both. That back-and-forth is the modern engineering interview: the agent asks the questions a careful senior would ask, the student decides, the build is shaped by it. By the third clarifying-question conversation you have with an agent in your career, you'll start anticipating those questions and putting the answers in the original prompt. That anticipation *is* engineering judgment.

Second, **the test routine is the safety net.** The student trusted the result without reading the JavaScript line by line because the agent's tests verified each feature. That's a habit worth carrying: when an agent does work for you, ask it to also write a check that proves it did the work. Tests are how you scale your trust.

Third, **the agent built on top of the M3 shell.** The four regions are unchanged. The data noun variables are unchanged. The agent added logic, listeners, render functions, a tiny CSS block — but it preserved the structure the student designed. `/expert-coder` is doing this quietly: clean diffs, preserved naming, no clever rewrites.

Fourth, **the commit message names what the user gets, not what the code does.** `M4: working app`. Not `M4: implemented addBook, editNote, deleteBook, renderList, persistState, hydrateState with event delegation and localStorage`. Real engineering commit messages name the user-visible change. The student is practicing that without anyone calling it out.

---

## Working with friends? (group sidebar)

For M4, group mode is *one person at the chat, the rest of the team watching the running app and the test report.* Take turns being the prompt writer. Three reminders.

**Announce yourself before your first turn.** *"This is Maria —"* lets the agent attribute who chose what.

**Three pairs of eyes catch what one misses.** While one person is typing the prompt, the rest can be naming the bits of the picture that should be specifically called out. Once the app is rendering, three people clicking around find the bugs much faster than one.

**Disagreements about polish or behavior** still go through the three-layer flow (restate → research → file for later). For M4 these are usually small — accent color choices, where the input lives, whether deleting needs a confirmation. Most resolve at step 1.

If your team is on Rung 3 (branches and pull requests), the natural shape is *one branch for M4, one PR with the working app and the test report attached, one teammate review before merge.* The agent is the reviewer of last resort if no teammate is available. The full Rung-3 workflow is in [`references/group-mode.md`](../references/group-mode.md).

---

## Practice — The session, end to end

One coach-driven flow. About ten minutes.

### Step 1 — Write the prompt

Coach: *"Here's the template I'd use for M4. Read it — what's off?"*

The coach offers a template like the one in the worked example — references `brief.md`, `picture.md`, and `index.html` as context, attaches `/expert-coder`, names all the features the picture described, asks for a system font stack + comfortable whitespace + one accent color + the anchor SVG in the header, asks for an in-browser test routine triggered by `?test=1`, and ends with *"ask me clarifying questions before you generate."*

You read. Edit one or two phrases so the prompt reads in your voice and reflects anything in your picture that's specific. The coach captures the final prompt verbatim into `.project-manager/prompts.md` with an `M4` tag.

### Step 2 — Answer the clarifying questions

You send the prompt. The agent comes back with two or three clarifying questions — *"automatic or manual timestamps? Empty-state copy preference? Confirm on delete, or instant?"* — and waits.

Answer each in one sentence. The coach appends your answers to `prompts.md` along with the prompt (the conversation is the artifact).

### Step 3 — Watch the agent generate and test

About fifteen to thirty seconds. `index.html` updates. The coach opens it in the browser. Then opens it again with `?test=1` and shows you the test report.

If the report is all green, you have a working app. If any test is red, the agent diagnoses and proposes a fix on the spot — that's a normal first-shot outcome maybe 1 in 10 times. Approve the fix, re-run the tests, move on.

### Step 4 — Use the app for one minute

Open `index.html` without the `?test=1` flag. Add a few tasks of your own. Mark some done. Delete one. Switch projects. Close the tab. Reopen. Add another task. The whole thing works because the tests said so, but feeling it work with your own data is the actual reveal.

### Step 5 — One iteration round if anything's off

Most students give one to three small notes here. *"The accent feels too loud — try a quieter blue."* *"The empty-state copy is fine but the input placeholder doesn't show in full — widen the input."* *"When I delete a task, can it briefly fade out instead of just disappearing?"*

Agent updates. Re-run the tests if the change touched logic; skip if it was pure CSS. One round usually does it.

If you're past three rounds and still changing things, you're polishing past the M4 bar. Polish lives on the iteration loop forever; M4 just needs the app to *work* and to *look like an app*. Ship it; you can polish more on your own time.

### Step 6 — Closing sweep

Coach walks the M4 rubric out loud, brisk: *"index.html renders ✓ ... all features work in the browser ✓ ... tests exist and pass ✓ ... student wrote the prompt and answered the clarifying questions ✓ ... ownership-check questions answered ✓ ... polish landed ✓ ... commit ready."*

Any red box → one specific edit → you greenlight → done.

Ownership-check is two or three questions about what's in the file: *"what does `saveState` do? What's `selectedProject` doing now that it wasn't doing in M3?"* If you can answer in plain English, ownership is real. If you can't, the coach walks through that part of the file with you — pointing at lines — until you can. **You did not need to type any of the code.** Ownership is by direction and understanding, not by keystroke.

### Step 7 — Commit

```
git add .
git commit -m "M4: working app"
```

Done. About 10 minutes.

---

## Things to try once it works

Optional, but each is a small reveal that's worth the minute.

- **Open the app in two browser tabs** of the same browser. Add a task in tab A. Switch to tab B and refresh. The task is there. (That's `localStorage` shared across tabs of the same origin — useful to know.)
- **Open the dev console** (`Ctrl+Shift+J` on Windows, `Cmd+Option+J` on Mac), type `localStorage.getItem('anchor-v0')` (or whatever key the agent used). The whole app's state is sitting there as JSON. That's where your data lives.
- **Ask the agent for the test routine to be moved to its own file** `tests.html` instead of triggered by a query param. Same content, different shape. A small refactor like that is a good way to feel what `/expert-coder` does when there's no new feature to write.

These are sidebars, not required practice. The coach offers them only if you ask.

---

## When this lesson is over

You should have, on disk:

```
my-anchor-project/
├── .project-manager/
│   ├── brief.md
│   ├── picture.md
│   ├── answers.md
│   ├── prompts.md        ← grew by one entry (your M4 prompt + the clarifying-question exchange)
│   └── state.json
├── index.html            ← a working app, six features deep, with an in-browser test routine
└── (a git repo with four commits now: M1, M2, M3, M4)
```

You should have, in your head:

- The experience of *writing one prompt that produced the entire working app.* This is where it stops feeling like programming class and starts feeling like the actual workflow you'll use for the next twenty years. Notice how fast that was. Notice what you didn't have to do.
- A working mental model of *the agent verifies its own work with tests it wrote.* You can carry this habit to any future project: when the agent does something, ask it to also write a check that proves it did the thing.
- Plain-English understanding of what each new function in `index.html` does. Not at the syntax level — at the *what it does for the user* level. That's the engineer's level.
- The feeling that the next thing is *use Anchor for real for a day or two and notice what's clunky*, not *add more features*. That's Lesson 5.

M4 is closed; the coach moves you straight to M5.

---

*Lesson 4 of 7. Next: Lesson 5 — Test — Using It For Real, Bringing Back What's Clunky.*
