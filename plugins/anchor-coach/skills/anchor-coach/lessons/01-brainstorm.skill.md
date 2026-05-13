---
name: anchor-u01-brainstorm
kind: lesson
title: "Lesson 1 — Brainstorm — Saying What You're Building Before You Build It"
source_course: "first-project/Anchor"
source_file: "lessons/01-brainstorm.skill.md"
parent: anchor-coach
milestone: M1
hours_estimated: 0.2
description: "Lesson 1 of the Anchor curriculum. Teaches the discipline of describing what you're building in plain English — including what you're deliberately NOT building — before any code exists. Coach-driven interactive shape: the student rambles, the coach offers a prompt template, the agent drafts the brief, the student iterates. The prompt is itself a deliverable. Three-part curriculum-builder format: Lecture, Worked Examples, Practice Problems."
license: "CC BY 4.0"
access:
  student:           [readonly_lecture, readonly_worked_examples, readonly_practice]
  teacher:           [readonly_lecture, readonly_worked_examples, readonly_practice, resolve_answer_key]
  dean:              [readonly_lecture, readonly_worked_examples, readonly_practice, resolve_answer_key, edit]
---

# Lesson 1 — Brainstorm — Saying What You're Building Before You Build It

> **Goal of this lesson.** By the end you have a one-page brief that describes Anchor in plain English — including three things it deliberately won't do — and the prompt you used to draft it, saved in your project. No code. No file extensions. No jargon. Just the picture in your head, written down so someone else could see it.
>
> **One thing about how this course works.** In Lessons 1 and 2 *you write* — the brief and the picture are prose, and only you know what's in your head. From Lesson 3 onward *the agent writes the code* and you direct. Both halves are real engineering work: writing teaches you to specify; directing teaches you to evaluate. This is what real software work looks like in 2026.
>
> **One more thing — the prompt is part of the deliverable.** Every lesson, the prompt you wrote to produce the artifact gets saved alongside the artifact itself in `.project-manager/prompts.md`. By Lesson 7 you'll have a record of how your prompt-writing evolved. That record is one of the most valuable things you'll leave this course with.
>
> **No skills attached today.** That's deliberate. The wow of Lesson 1 is *plain prompting on a frontier LLM is already a superpower.* You'll see in about ten minutes.
>
> **Type or talk — your call.** Dictation (`Win + H` on Windows, double-tap `Fn` on Mac) is especially useful for the rambling-first-version step; describing what you want out loud is faster than typing it.
>
> **Working with one or two friends?** Even better — brainstorming is a team sport. Each person announces themselves with *"This is Maria —"* before their first turn. Sidebar below.
>
> **Time.** About 10 minutes solo for the first pass. More iterations welcome.
>
> **What you'll have when you're done.** `.project-manager/brief.md`, `.project-manager/prompts.md`, your first git commit.

---

## Lecture

Most first projects don't fail because the person couldn't code. They fail because the person didn't know what they were building.

Picture this. You decide to build a treehouse in the backyard with your kid. You go to the hardware store. You stand in the lumber aisle. You realize you don't know how big the treehouse should be, what shape, whether it has a roof, how the kid gets up to it, whether it's painted, or what tree it's going in. You buy lumber anyway because you're already at the store. You get home. You realize you bought the wrong lumber. The kid is disappointed. The lumber sits in the garage for two years.

The treehouse needed a sketch on a napkin first. Not a blueprint — a sketch. *"It's a square box, six feet on a side, four feet off the ground in the maple. Roof, no door, ladder up the front. Painted blue because she likes blue."* Now you can buy lumber. Now you know what you're doing in the lumber aisle. Now the kid can tell you what you got wrong before you've cut anything.

Software is the same. The lumber aisle is the code editor. Most beginners walk into the code editor without a sketch and start buying lumber. An hour later they have a half-built thing they don't recognize and they don't know what to add next.

The sketch in software is called a **brief**. One page. Plain English — the kind you'd use to describe the tool to a friend over coffee. It says four things:

1. **Who is this for.** A real person, even if it's you.
2. **Three concrete scenarios** in the form *"When I X, I want Y to happen, because Z."* The *because* is doing the work — it tells you whether the feature is worth building.
3. **Three things this is deliberately NOT.** Not "won't ever have" — *"won't have at v0."* The list of things you're cutting on purpose so you can ship.
4. **No implementation nouns.** The brief never says "JSON" or "function" or "database" or "API." Those are decisions you'll make in Lesson 3.

The brief is hard. Not technically hard — emotionally hard. Beginners want to put everything in. The discipline of saying *"not yet"* to a feature you secretly love is the engineering lesson hiding inside this exercise. You will write a NOT-list and feel a little sad about something on it. That's the right feeling.

Here's what's new in 2026 and why this lesson takes ten minutes instead of an hour: you don't write the brief by staring at a blank page. You ramble at the agent for a minute about what's in your head, the agent drafts a coherent brief, and you iterate. Two rounds, maybe three. The wow is that *plain prompting on a frontier LLM is already a superpower* — no skills attached, no special tooling, just describing what you want and reading the result. That's the entire technique.

---

## Worked Examples

You'll see one example by default — a *different student* named Anna writing the brief for *her* tool, a reading-log. **The worked examples throughout this curriculum follow Anna's reading-log project rather than your Anchor — that's deliberate.** Seeing a different concrete project run through the same workflow makes the workflow itself easier to internalize: you mentally translate from Anna's reading-log to your Anchor and back, and the *shape of the pattern* becomes the load-bearing thing rather than any one project's specifics. If you want to see other variants — a workout tracker, a fully-faded version, or a review-in-motion — just ask the coach.

### Worked Example 1 — A reading log brief (the brief, fully worked)

**Who it's for.** *"For me. I read a lot of books and forget what I read by January. I want one place that knows what I read this year and lets me write a sentence about each one."*

**Scenarios.**

- *"When I finish a book, I want to add it to my list with the title and one sentence about why it mattered, because I want to remember why I picked it up later."*
- *"When I'm thinking about what to read next, I want to scroll back through last year's list, because the books I loved cluster — finding one tells me three more."*
- *"When someone asks me what I've been reading, I want to open the page on my phone in the conversation, because Goodreads makes me sign in and I lose the moment."*

**This is NOT.**

- *Not ratings* — *"because numbers turn the act of reading into a contest with myself, and I don't want that."*
- *Not social features* — *"because I'm not building Goodreads, I'm building my reading log."*
- *Not categories or tags* — *"because the chronological list is the whole point."*

Notice three things. Every sentence is about the human and what they experience. Zero implementation nouns. Each NOT line has a *because* — and the *because* is honest (not *"I don't know how to build that yet"*).

**How this brief got written.** The student didn't write this from scratch. They sat at the chat and rambled for thirty seconds: *"I want a thing for tracking what I read, because I always forget by January. I want it to remember the title and let me say one sentence about each book. I don't want it to be Goodreads — no ratings, no social stuff, no tags."* The coach summarized that back in one sentence to confirm, then *drafted the brief directly* — about fifteen seconds — and saved it to `.project-manager/brief.md`. The coach then showed the student the prompt it had just used, naming the three parts (Context, Skills, Task), so the student could see the shape of a good prompt as a worked example. The student read the brief, asked for two small revisions, and it was done. About eight minutes. *That* is what's new — not just the speed, but the fact that the student saw the bridge between her thinking and the deliverable in the form of the prompt itself.

### Sidebars (offered on request)

If you want a second worked example with a fading move — the workout tracker, with one NOT item left blank for you to think through — ask the coach: *"show me the workout-tracker example."* If you want to see a review-in-motion (a deliberately-weak brief and the coach's four-edit response, so you know what's coming in your own closing sweep), ask: *"show me a review in motion."* The default is one example; the others are on tap.

---

## Working with friends? (group sidebar)

If you're in a group, the lesson works the same way — only louder. Three things to know.

**Announce yourself before your first turn.** *"This is Maria —"* (or whatever you go by) before your first contribution. The agent uses that to attribute ideas in the brief. After your first turn you don't need to keep saying it.

**You'll disagree about features. That's good.** When two people in the room want different things — Maria wants due dates in v0, Sam wants to cut them — the agent runs the three-layer flow: (1) restate both positions; (2) do real research with citations if step 1 didn't resolve it; (3) file for later in `filed-for-later.md` if still stuck. Most disagreements unstick at step 2.

Every decision the team *does* make — including ones with disagreement noted — gets a one-paragraph entry in `decisions.md`. Real engineering teams use this pattern; you're learning it on a project where the stakes are the right size.

**One computer is fine to start.** You don't need GitHub or branches yet. One person at the keyboard, the rest of the team talking, the agent listening to everyone. The full group setup is documented in [`references/group-mode.md`](../references/group-mode.md).

---

## Practice — The session, end to end

This is one coach-driven flow, not seven separate exercises. The coach runs the loop with you, captures your prompt at the end, walks the rubric, and proposes the commit. You should be done in about ten minutes.

### Step 1 — Get a rambling first version on the page

Coach asks: *"In your own words — who is this for, and what do you want it to do? Doesn't have to be polished. Just a few sentences of what's in your head."*

You ramble. Dictation is ideal here. Three to five sentences is plenty. *"I keep losing my paper to-do list and I want one place on my laptop that survives me closing the lid. I'm a grad student. I want it to know which project I'm working on so I'm not staring at every task all the time. I don't want due dates or any social stuff or notifications or dark mode."*

The coach reflects it back in one sentence to confirm. *"OK — Anchor is a personal task tracker for you (a grad student) that survives a closed tab and groups tasks by project, deliberately without due dates, social features, notifications, or dark mode. Sound right?"* You confirm or correct.

### Step 2 — Coach drafts the brief; you witness the prompt

The coach takes the v0 vision you just rambled and *just produces* the brief — about fifteen seconds. Saved to `.project-manager/brief.md`. The coach opens the file and shows it to you.

Then — and this is the small teaching beat that makes L1 work — the coach shows you the prompt it just used, with one sentence:

> *"FYI, here's the prompt I just sent the agent to produce that brief. The three parts at the top of every good prompt are **Context** (which files the agent should read first), **Skills** (which `/skill-name` packages to attach — none today; we start attaching skills in Lesson 3), and **Task** (the actual ask, crisp). You can ask me to write prompts like this for you any time."*

The prompt itself looks something like this, for the grad-student-task-tracker case:

> *Context: (none — first lesson, no project files exist yet). Skills: (none — plain prompting today). Task: Draft a one-page brief for a personal task tracker called Anchor. Four sections: (1) a one-paragraph "who is this for" naming a real human; (2) three concrete scenarios in the form "When I X, I want Y to happen, because Z" — at least one about adding a task, one about finishing a task, one about a project; (3) a "this is NOT" section with three features deliberately cut from v0, each with a one-sentence "because"; (4) zero implementation nouns — describe the user experience, not the wiring. Voice: plain English, like describing the tool to a friend over coffee. Save to `.project-manager/brief.md`.*

You see the prompt. You don't approve it; you witness it as a worked example of the craft. The prompt is captured verbatim into `.project-manager/prompts.md` with a date and `M1` tag — `prompts.md` is append-mode; new entries land at the bottom; you'll see it grow over the seven lessons.

The reveal: the agent did the prompt-writing for you. *You* did the thinking — what Anchor is, who it's for, what it does and deliberately doesn't do. The prompt is the bridge between your thinking and the deliverable. Over the next six lessons you'll write more and more of that bridge yourself; by L7 you'll be writing prompts unaided for your next project.

### Step 3 — Read + iterate

Coach: *"Take a look. What sounds right, what doesn't?"*

You read. You give two or three specific revisions. *"The 'who it's for' is fine but I want to say I'm in my third year of a PhD, that matters. The second scenario reads like it's about productivity in general, not Anchor — make it specifically about the project sidebar. The NOT list is missing 'no notifications' — add that with a because."* The agent updates. You look again. One more round if you want.

Two rounds is normal. Three is fine. If you're past four, you're polishing — the brief is good enough; ship it.

### Step 4 — Closing sweep

Coach walks the M1 rubric out loud, brisk: *"file exists ✓ ... who-it's-for paragraph ✓ ... three scenarios with becauses ✓ ... NOT list with three items, each has a because ✓ ... zero implementation nouns ✓ ... review-received — that's now ... commit — that's next."* About a minute.

For any red box, the coach proposes one specific edit. *"Box 5 — the second scenario still has the word 'database' in it. Strike it; rewrite as 'when I close my laptop and open it again, my tasks are still there.'"* You greenlight, the agent updates, the box turns green. Engagement, not agreement — if you disagree, say so in one sentence and we keep moving.

### Step 5 — First git commit

The coach runs the commit itself — bookkeeping the project manager handles, not a beat that needs your attention. *"Committing M1."* Behind the scenes:

```
git init   # only the first time
git add .
git commit -m "M1: brief written"
```

The coach reports the commit hash and confirms the brief and prompts.md are now in version control. *"Brief on disk, prompt logged, first commit made. Done — about ten minutes from the rambling start. Starting M2."*

### Sidebar — Want to swap with a friend?

If you have a friend or classmate doing this course, swap briefs. Read theirs; tell them one thing that's clear and one thing you'd ask about. This is the cheapest kind of code review and it works on a brief, before any code exists. Optional, but the conversation is worth the five minutes.

---

## When this lesson is over

You should have, on disk, in your project folder:

```
my-anchor-project/
├── .project-manager/
│   ├── brief.md          ← the document the agent drafted from your prompt, that you iterated on
│   ├── prompts.md        ← the prompt you wrote, captured verbatim
│   └── state.json        ← the coach maintains this; you don't touch it
└── (a git repo with one commit: "M1: brief written")
```

You should have, in your head:

- A clear picture of what you're building.
- Three things you've decided not to build, and you're a little sad about one of them.
- The experience of *describing what you wanted out loud, watching the agent draft it cleanly, and iterating in plain English*. Plain prompting on a frontier model is already a superpower. You just used it.
- The feeling that the next thing to do is *describe what it looks like*, not *write code*. (That's Lesson 2.)

M1 is closed; the coach moves you straight to M2.

---

*Lesson 1 of 7. Next: Lesson 2 — Describe — Drawing the Picture Before You Write the Code.*
