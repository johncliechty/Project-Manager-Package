---
name: anchor-u02-describe
kind: lesson
title: "Lesson 2 — Describe — Drawing the Picture Before You Write the Code"
source_course: "first-project/Anchor"
source_file: "lessons/02-describe.skill.md"
parent: anchor-coach
milestone: M2
hours_estimated: 0.25
description: "Lesson 2 of the Anchor curriculum. Teaches the discipline of describing the finished tool in plain English — a mockup, five data nouns, four interactions, and an answer to the refresh question — before any code exists. Coach-driven interactive shape: brief.md is read back, the student describes, the coach offers a prompt template, the agent drafts picture.md and answers.md, the student iterates. The prompt is itself a deliverable. Three-part curriculum-builder format: Lecture, Worked Examples, Practice Problems."
license: "CC BY 4.0"
access:
  student:           [readonly_lecture, readonly_worked_examples, readonly_practice]
  teacher:           [readonly_lecture, readonly_worked_examples, readonly_practice, resolve_answer_key]
  dean:              [readonly_lecture, readonly_worked_examples, readonly_practice, resolve_answer_key, edit]
---

# Lesson 2 — Describe — Drawing the Picture Before You Write the Code

> **Goal of this lesson.** By the end you have a one-page picture of Anchor — what the screen looks like, the five things Anchor has to remember in order to work, and the four things the user can do — and you've answered one specific question about what happens when the user closes the tab. Still no code. Still no file extensions. The picture, in plain English, with enough detail that a friend who hasn't seen Anchor could draw it on a napkin.
>
> **Still no skills attached.** Same wow as Lesson 1: plain prompting drafts most of this in fifteen seconds, you iterate, you ship. The lesson where skills start mattering is Lesson 3.
>
> **Type or talk.** Dictation works particularly well for the mockup paragraph — describing a layout out loud is faster than typing it.
>
> **Working with one or two friends?** More eyes catch more "what about…" gaps. Each person announces themselves once per session. Sidebar below.
>
> **Time.** About 15 minutes solo for the first pass. More iterations welcome.
>
> **What you'll have when you're done.** `.project-manager/picture.md`, `.project-manager/answers.md`, the next entry appended to `.project-manager/prompts.md`, your second git commit.

---

## Lecture

Picture this. Your friend is going to visit your bedroom for the first time, but they're getting directions on the phone before they arrive. You start describing the room: *"There's a bed against the window — full size, blue blanket. To the left of the bed is a desk with my laptop on it; that's where I do homework. The wall opposite the door is a bookshelf, mostly novels, two shelves of school stuff at the bottom. The light switch is right inside the door. The floor is wood, but there's a small rug in front of the desk."*

By the time you've finished, your friend can *picture* the room without having been in it. They couldn't build it — they don't know whether the walls are sheetrock or brick — but they could walk through the room in their head and tell you where they'd put their bag down.

That's exactly the job in M2. You wrote the brief in M1; it described *who Anchor is for and what they want to do*. Now you describe *what Anchor looks like* — the picture, in plain English, with enough detail that a friend (or the agent) could draw it on a napkin. People who make movies do this professionally and call it a *storyboard* — every shot drawn out before the camera rolls. You're doing the software version.

The picture has three parts. No more.

**One — the mockup.** A description of what the page looks like, walked top to bottom the way you described your bedroom. Plain text, or sketch on paper and take a photo — either counts.

**Two — the data nouns.** What Anchor has to *remember* in order to work. Five things, in plain English: *a task. A project. The list of tasks. The list of projects. Which project is currently selected.* The kind of words you'd use to explain Anchor to your grandmother. The data nouns survive every later decision: change the framework, the data nouns stay the same. They are the bones of Anchor.

**Three — the interactions.** What the user can *do*. Four verbs, in plain English: *add a task. Mark a task done. Delete a task. Switch which project you're looking at.* Each described as one sentence that starts with the user.

When the three parts are written, the agent asks one question on purpose: *"What happens when the user closes the tab and opens Anchor again later?"* The right answer is *"the tasks should still be there."* If your gut says something different — *"I don't know"* or *"they go away"* — that's useful information. It means *persistence* (the word for *remembering across sessions*) is something you haven't thought through, and we'll talk it through before any code exists. Anchor's whole purpose is to outlive a closed tab.

Most beginners feel impatient at this point. They want to start typing code. The discipline of staying in plain English for one more lesson is what makes everything from M3 onward feel orderly instead of frantic. M2 is the map; the map is cheap, the wrong build is expensive.

---

## Worked Examples

One example by default — the reading-log picture, fully worked. Want a second example (workout tracker, fully faded) or a review-in-motion? Ask the coach.

### Worked Example 1 — A reading log picture (the picture, fully worked)

The same reading log from Lesson 1 — now described as a finished tool, in plain English.

**Mockup.** *"A single page that opens to a list of books, one book per row, with the title in bold and a one-sentence note underneath. The most recent book is at the top. At the bottom of the list is a row called 'Add a book' with a text box for the title and a text box for the note. The header of the page says 'Reading Log — 2026' with a small open-book icon next to it. No sidebar. No buttons except 'Add'. The page is one column, centered, with comfortable whitespace on both sides."*

**Data nouns** (five things to remember):

- A *book* — title, the one-sentence note, the date you added it.
- The *list of books* — the books you've added this year, in order.
- The *year* — which year we're looking at (it'll usually be the current one).
- The *current draft* — what's typed in the "Add a book" boxes before you press Add.
- The *display order* — chronological, newest at top.

**Interactions** (four things the user can do):

- *Add a book* — type the title and a note, press Add, the book appears at the top of the list.
- *Edit a book's note* — click the note text and it becomes editable; click out to save.
- *Delete a book* — a small × on the right side of each row removes it.
- *Scroll through past books* — the list just keeps going; no pagination, no search, scroll the page.

**What happens on refresh.** *The books should still be there. Closing the tab and reopening should show the same list in the same order.*

Notice three things. Every sentence is about what the user sees or does. Zero implementation nouns. And the data nouns include things you might not have thought were "data" — like *which year we're looking at* and *what's typed in the input box right now*. Those are real things the app has to keep track of, even though they aren't tasks-or-books.

**How this picture got written.** Same shape as L1. The student read their brief back, described the page they imagined out loud, and the agent drafted the picture from a coach-provided prompt template. Two rounds of revision to tighten the mockup and add the *current draft* data noun that the student forgot the first time. About twelve minutes.

### Sidebars (offered on request)

If you want a second worked example with a fading move — the workout tracker, with one interaction left blank — ask: *"show me the workout-tracker picture."* If you want to see a review-in-motion (a thin picture, the coach's four-edit response), ask: *"show me a review in motion."*

---

## Working with friends? (group sidebar)

Group mode works the same way as in Lesson 1, with one specific advantage for M2: *more eyes catch more "what about…" gaps.* Solo students consistently forget one or two data nouns (the *current draft* in the input box, the *display order*, the *selected project*) because those things feel obvious until you try to write them down. Group students miss fewer of them because someone in the room asks *"wait — if I switch projects mid-typing, what happens to what I'd typed so far?"* and the rest of the team realizes there's a data noun there.

Three reminders.

**Announce yourself before your first turn.** *"This is Maria —"* The agent attributes contributions accordingly.

**You'll disagree about what's on the page.** The three-layer flow from Lesson 1 applies: restate → research → file for later. Decisions go in `decisions.md`.

**One screen, many describers.** The most productive group setup for M2 is *one person at the keyboard, the rest of the team walking around describing the page.* Take turns. The picture written by three people describing aloud is consistently richer than one person describing in their head.

The full group setup is in [`references/group-mode.md`](../references/group-mode.md).

---

## Practice — The session, end to end

One coach-driven flow. The coach reads your brief back, asks you to describe the page, offers a prompt template, drafts your picture, and walks the rubric. About fifteen minutes.

### Step 1 — Coach reads brief.md back; you describe the page

Coach: *"Quick recap — your brief says Anchor is [the coach reads back the who-it's-for sentence and the three scenarios from `brief.md`]. Now: what do you imagine this looks like? Walk me through the screen, top to bottom, like you're describing your bedroom to a friend on the phone."*

You describe. Dictation is ideal here — describing a layout out loud is much faster than typing it. *"OK so at the top there's a header that says Anchor with a little anchor icon next to it. On the left there's a sidebar — narrower than the main area — and it lists my projects, which is just 'Personal' for now. The main area is on the right; it shows the tasks for whichever project I have selected. The selected project's name is the heading at the top of the main area. At the bottom of the main area is an input box where I type a new task and press Enter to add it. Each task has a checkbox on the left and an × on the right. Plenty of whitespace. One accent color, blue I think."*

The coach reflects it back to confirm.

### Step 2 — Coach offers a prompt template

Coach: *"Here's the prompt I'd write. Edit or approve."*

The prompt, annotated:

> *— Context: read `.project-manager/brief.md` first. —*
> *— Skills: (none — same as Lesson 1) —*
> *— Task: Draft a one-page picture of Anchor at `.project-manager/picture.md`. The picture has three sections: (1) a mockup paragraph that walks the page top to bottom, picturable enough that a friend could draw it on a napkin; (2) five data nouns under a heading "What Anchor has to remember" — the five things the app has to keep track of, named in plain English; (3) four interactions under a heading "What the user can do" — each one sentence that starts with the user. Zero implementation nouns. Voice: plain English, my voice. Use what I just told you about the page I imagine: [the coach inserts your description from Step 1]. Then in `.project-manager/answers.md`, add the line `Q: What happens on refresh / tab close-and-reopen?` followed by an `A:` line — my answer is "the tasks and projects should still be there, exactly as they were."*

You read, edit, or approve.

### Step 3 — Send; agent drafts `picture.md` and `answers.md`

The coach sends. About fifteen seconds. Two files appear: `picture.md` (mockup, data nouns, interactions) and `answers.md` (the refresh Q&A). The coach appends your prompt verbatim to `.project-manager/prompts.md` with an `M2` tag.

Coach opens `picture.md` and `answers.md` and shows you both.

### Step 4 — Read + iterate

Coach: *"Take a look. What's right, what's not quite?"*

You read. You give two or three specific revisions. *"The mockup is right but it doesn't say the project sidebar has a heading that reads 'Projects' above the project list — add that. Data nouns are good, but I want to call the fifth one 'currentDraft' rather than 'what's typed in the input.' Interactions look right. Refresh answer is right."* The agent updates. One more round if you want.

Two rounds normal. Three fine. Past four, you're polishing.

### Step 5 — Closing sweep

Coach walks the M2 rubric out loud — nine boxes — at a brisk pace: *"picture.md exists ✓ ... mockup is picturable ✓ ... five data nouns ✓ ... four interactions ✓ ... answers.md exists with refresh answer ✓ ... zero implementation nouns ✓ ... student typed it themselves — student wrote the prompt and directed the draft ✓ ... review-received — that's now ... commit — that's next."*

For any red box, one specific edit, you greenlight. Engagement, not agreement.

### Step 6 — Second git commit

Coach: *"Ready to commit M2?"*

You say yes. On the default-on auto-commit path:

```
git add .
git commit -m "M2: picture and data nouns"
```

If your picture changed substantially during iteration, the coach may propose a small follow-up `M2.1: picture revisions from review` to reflect the revised state. Optional.

Done. Picture on disk, refresh answer on disk, prompt logged, second commit made. About fifteen minutes from the brief-read-back.

---

## When this lesson is over

You should have, on disk, in your project folder:

```
my-anchor-project/
├── .project-manager/
│   ├── brief.md          ← from M1
│   ├── picture.md        ← the document the agent drafted, that you iterated on
│   ├── answers.md        ← the refresh-question answer
│   ├── prompts.md        ← grew by one entry — your M2 prompt is now logged
│   └── state.json        ← coach-maintained
└── (a git repo with two commits now: M1, M2 — possibly M2.1)
```

You should have, in your head:

- A picture of Anchor clear enough that you could describe it to your grandmother and she'd be able to imagine it.
- The five things Anchor has to remember in order to work, named in plain English. (You will run into these same five things in every milestone from here on. They are the bones.)
- The four things the user can do, named as user actions — not handler functions.
- An answered question about what happens on tab-close-and-reopen, which means you've thought about persistence at least once before any code exists.
- The feeling that the next thing to do is *build the empty shell so the page loads in your browser*, not *write the working features*. (That's Lesson 3, where skills also enter the picture for the first time.)

M2 is closed; the coach moves you straight to M3.

---

*Lesson 2 of 7. Next: Lesson 3 — Scaffold — Building the Empty Shell That Loads in the Browser.*
