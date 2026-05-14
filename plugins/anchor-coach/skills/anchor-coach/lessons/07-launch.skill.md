---
name: anchor-u07-launch
kind: lesson
title: "Lesson 7 — Launch — The Reveal, and the Next Thing"
source_course: "first-project/Anchor"
source_file: "lessons/07-launch.skill.md"
parent: anchor-coach
milestone: M7
hours_estimated: 0.4
description: "Lesson 7 of the Anchor curriculum. The agent silently generates retrospective.md as the closing artifact of Anchor and shows it to the student, then names the skill that has been running the whole curriculum (/project-manager), then the student uses /project-manager directly to bootstrap a new project of their own — greenfield or brownfield. This is the transfer moment. ~25 minutes. Three-part curriculum-builder format: Lecture, Worked Example, Practice."
license: "CC BY 4.0"
access:
  student:           [readonly_lecture, readonly_worked_examples, readonly_practice]
  teacher:           [readonly_lecture, readonly_worked_examples, readonly_practice, resolve_answer_key]
  dean:              [readonly_lecture, readonly_worked_examples, readonly_practice, resolve_answer_key, edit]
---

# Lesson 7 — Launch — The Reveal, and the Next Thing

> **Goal of this lesson.** You learn the name of the skill that has been running the whole curriculum (`/project-manager`), and you use it directly to bootstrap a project of your own — either from scratch (greenfield) or from existing materials you already have (brownfield). By the end you have a new `.project-manager/` folder in a new project of your choosing, with a working `brief.md` for it, sitting one step from M1.
>
> **Skill attached: `/project-manager`** (and `/expert-coder` if your next project is code-shaped; `/curriculum-builder` if it's teaching-shaped; whatever fits).
>
> **Time.** About 25 minutes.
>
> **What you'll have when you're done.** Two artifacts. (1) `.project-manager/retrospective.md` for Anchor — written automatically by the agent during this lesson, the final closing piece of the project you just shipped. (2) A brand-new project folder, somewhere on your machine, with its own `.project-manager/` scaffolded and a `brief.md` already drafted, ready for you to walk through M1–M6 on whatever you want to build next.

---

## Lecture

Picture this. You're at the kitchen window in October, looking at a tomato plant in a pot on the sill. Six months ago you put a seed in soil — small, brown, identical to the seven other seeds in the packet. You watered. You waited. The first leaf came up at week two. Through summer the plant grew, branched, flowered, fruited. There are tomatoes on it now. You can pick one, eat it. And the work that produced it — the seed, the soil, the water, the light, the waiting — is now a thing you know how to do. Next spring you'll put another seed in another pot. Basil. Or peppers. Or a different tomato. Same loop. Different plant.

Anchor was the seed. The loop is the plant. You put your brief in soil in M1 and watched it grow through M2 through M6 — picture, shell, build, test, ship — and now you can see the whole plant: a real public tool that someone other than you has clicked on. Today's lesson is two things at once: *closing* Anchor with a retrospective written about your own work, and *starting* a new seed — your next project. The reveal in this lesson is that you've known how to grow whatever you want for the last seven lessons; you just haven't been told the name of the gardener yet.

Anchor is shipped. Five lessons of writing, building, using, and putting your work somewhere other humans can see it. Before we go anywhere new, there's one small move left on Anchor itself — and it's the move that, more than any other, reveals what kind of work you've actually been doing.

Real engineering projects close with a **retrospective**. Not a quiz. Not a grade. A one-page reflection on what got built, what surprised the builder, what the builder might do differently next time. Teams write retrospectives at the end of sprints; companies write them at the end of launches; you're about to have one written for Anchor. *You don't write this one.* It gets written for you, automatically, as you sit at the chat. The reasons will be clear in a minute.

Here's what's going to happen. The coach is going to read every artifact in your `.project-manager/` folder — `brief.md`, `picture.md`, `answers.md`, `prompts.md`, `ship-note.md` — plus your full git log, plus your `index.html`. It will then write `retrospective.md` as a one-page reflection on the arc you actually traveled, with specific evidence drawn from your own files. *The retrospective will quote you.* It will quote your M1 prompt and compare it to your M5 prompt and tell you what changed about how you write. It will name what you said the tool would not be, and check whether the shipped version honored that NOT list. It will note one thing that surprised it about how you worked — usually something visible in `prompts.md` that the agent finds informative.

After you read the retrospective, the coach is going to tell you what just happened. Specifically, *which skill wrote it.* That moment is the load-bearing one in this whole course, so the lesson holds it carefully.

Then the rest of the lesson is yours. You pick a project — anything you want to build next — and you use the same skill directly. Two paths fork at that point:

- **Greenfield** is the path if you have an idea but nothing on paper. The skill runs an M1-equivalent conversation with you in real time, you answer, and a `brief.md` for the new project emerges from the conversation. You finish L7 sitting at the M1 line of your next project.
- **Brownfield** is the path if you have materials already — notes from two years ago, a half-built script, a folder of ideas you saved but never developed. The skill reads everything in the folder, summarizes what it found, drafts a `brief.md` derived from your own notes (including a NOT list inferred from what the notes implied was out of scope), and asks 2–3 clarifying questions about gaps. You finish L7 sitting at the M1 line of your next project — but with a brief that draws on materials you wrote a long time ago and forgot you had.

Brownfield is, for most students, the more striking demo. The skill doing the work of *summarize, organize, draft* on materials the student couldn't easily face down themselves is the moment you realize how much friction it removes from starting things.

When this lesson is over, you can do this to any project of yours, anytime. That generalization is the whole point. Anchor was the seed. The loop is the plant.

---

## Worked Example — The reading-log student gets a retrospective and bootstraps a songwriting project

Anna's reading log is shipped. Five lessons done. She enters L7 ready for whatever closing piece is coming.

**Step one — the agent generates the retrospective without being asked.**

The coach opens the chat with: *"One small move left on the reading log itself. Hold on a moment."*

About fifteen seconds of silent activity. `.project-manager/retrospective.md` appears.

The coach opens it and shows it to Anna. The file reads:

> *"# Reading Log — Retrospective*
>
> *Built between [start date] and [ship date] across seven sessions, totaling about three and a half hours of work. Ten commits on disk; one public GitHub repo with one external viewer (Anna's sister) who reacted in the affirmative.*
>
> *## What got built*
>
> *A single `index.html` that lets Anna log books she's read, edit a one-sentence note on each, scroll back through past years, delete entries, and survive a closed tab. Polished — system font, generous whitespace, one quiet blue accent, an open-book emoji in the header. ~280 lines of code, all in one file. Tests in the same file, triggered by `?test=1` in the URL.*
>
> *## What you said this would NOT be, and whether you held that line*
>
> *Three things were on the NOT list from M1: ratings, social features, categories or tags. None of them are in the shipped version. The line was held.*
>
> *## Your prompts, then and now*
>
> *Your M1 prompt was 47 words long and rambled — that's correct; M1 is for rambling. Your M6 prompt was 32 words long and specified the action, the four parts of the README, the voice constraint, and the name of the skill to attach. The compression isn't accidental. By M4 you were editing the coach's templates rather than accepting them; by M5 you were writing fix prompts from a cold start. That arc is the actual deliverable of this course.*
>
> *## What surprised me, watching you work*
>
> *Your M2 picture forgot to name the **current draft** as a data noun — it's a thing the app has to remember (what's typed in the input before you press Add) and easy to miss. The coach flagged it during the M2 closing sweep, you added it, and it survived intact through every later milestone. The students who miss that data noun and never add it tend to have a small bug in M4 around input clearing; you avoided it by handling the picture carefully. That's the engineering judgment you can take to your next project.*
>
> *## What I'd do differently if I were you, on the next project*
>
> *Two suggestions. (1) Take screenshots throughout the milestones, not just at M6 — they're surprisingly useful in retrospectives like this one. (2) The fix prompts you wrote in M5 were excellent; consider starting M4 of your next project with a slightly more detailed prompt to reduce the iteration round count from one to zero. You're ready for it.*
>
> *## What's next*
>
> *Whatever you want. The loop you used to build the reading log generalizes to anything you can describe and an agent can produce. Your next project starts in the next ten minutes."*

Anna reads it. The specifics surprise her — *"the data noun thing I almost missed"* — because she'd forgotten the M2 close.

**Step two — the reveal.**

The coach says: *"That file was just written by a skill called `/project-manager`. The same skill has been silently running every milestone of this whole course. Every `.project-manager/` file you saw, every commit message format, every closing sweep, every decision log — `/project-manager` was doing the bookkeeping in the background. You've been using it without knowing.*"

*"Now you're going to use it directly. What do you want to start next?"*

Anna sits with that for a beat. She's been wanting to build a small tool to help her with songwriting — she has a folder of chord-suggestion ideas from two years ago that she never developed. She tells the coach.

**Step three — brownfield bootstrap.**

The coach asks Anna for the path to the folder. She gives it: `~/old-projects/songwriting-helper/`.

The coach offers a prompt template:

> *"Using `/project-manager`, please look at the existing materials in `~/old-projects/songwriting-helper/` (about five markdown notes I wrote two years ago about a chord-suggestion tool I wanted to build but never did). Read everything in that folder, summarize what you found in two paragraphs, and bootstrap a fresh project there: create `.project-manager/`, draft a `brief.md` from my own notes (with a NOT list inferred from what the notes implied was out of scope), and ask me 2–3 clarifying questions about any gaps that came up. Don't touch any of the original notes; just add the `.project-manager/` alongside them."*

Anna approves the template. The coach captures the prompt to `prompts.md` and sends — but importantly, *not to Anchor's `prompts.md`.* This prompt belongs to the new project; the coach drops it into the new project's `.project-manager/prompts.md` once the bootstrap creates the folder.

**About thirty seconds later**, the agent reports back. The new project folder has:

- `.project-manager/brief.md` — a one-page brief in Anna's voice (the agent matched the cadence of her old notes), naming her as the user, describing three scenarios about suggesting chord progressions in unfamiliar keys (drawn from the old notes), listing four things on the NOT list including *"no audio playback in v0 — that's a different project"* and *"no music notation export"* (the old notes implied both were dreams, not requirements).
- A summary in chat of what the five old notes contained.
- Three clarifying questions: *"(1) Your old notes mention 'common chord progressions in popular music' — should v0 ship with a fixed library of progressions, or pull from a public dataset? (2) Your notes talk about 'tension and release' a lot — is that something the tool should help you reason about explicitly, or is it implicit? (3) Should the tool be browser-based like Anchor, or are you considering a different shape?"*

Anna reads the brief. It reads like she wrote it — because the agent grounded it in her own old notes. She edits two sentences, answers the three clarifying questions in the chat (each in one or two sentences), and the agent updates the brief.

**Step four — commit in the new project.**

```
cd ~/old-projects/songwriting-helper
git init
git add .
git commit -m "M0: project bootstrapped"
```

Anna has now opened her *next* project. She's at the M1 line. Her notebook of dreams from two years ago has been converted into a working brief by an agent that read them more carefully than she has in months.

**Step five — naming the next move.**

The coach asks Anna in one sentence what she's going to do next. She says: *"Sit with the brief tonight, sleep on it, do M2 on Saturday."*

The coach records that. Lesson closes.

Notice three things.

First, **the retrospective got written before the reveal.** That's the pedagogical move. Anna saw the work first, *then* learned what wrote it. If the reveal came first, the retrospective would be a demo. By doing the work first, the retrospective is a real artifact about her own project — and the reveal lands harder because the work that just happened was *useful, not impressive.*

Second, **the brownfield bootstrap drew from Anna's own old notes.** The new brief reads in her voice because it inherited her voice from materials she wrote two years ago. That's the demo that makes `/project-manager` feel like it's working *for* her instead of *at* her. The agent didn't write the brief from a generic template; it wrote it from Anna's own thinking, organized.

Third, **the lesson ended at the M1 line of the new project, not anywhere later.** Anna doesn't try to do M1 through M6 on the songwriting project today; that's a different week. She finishes L7 with *the next thing already started*, which is the gesture that ensures the curriculum has actually transferred. A student who finishes L7 *not knowing what's next* hasn't really done L7.

---

## The greenfield path (when there are no existing materials)

If you have an idea but no materials, the path is the same shape with one change: the `/project-manager` skill runs an M1-equivalent conversation with you to gather the brief, instead of reading old notes.

The prompt looks like:

> *"Using `/project-manager`, please bootstrap a new project at `~/projects/<name>`. I have an idea I want to build but nothing on paper. Ask me the questions you need to draft a `brief.md` — who it's for, scenarios with becauses covering the load-bearing flows, a NOT list of considered scope decisions, no implementation nouns. Then write the brief from my answers."*

The agent asks five or six questions in a short back-and-forth — *"who is this for?"*, *"name one specific scenario where you'd use it"*, *"what's a feature you'd love to have but are willing to cut from v0?"* — and writes `brief.md` from your answers. Same shape as M1 of Anchor, except the agent is now running the M1 conversation directly because `/project-manager` knows the M1 protocol.

You finish at the same place either way: a new `.project-manager/` exists, `brief.md` is drafted, you've committed the bootstrap.

---

## Practice — The session, end to end

About 25 minutes.

### Step 1 — The retrospective happens

You don't do anything. The coach opens the chat, says *"one small move left on Anchor — hold on a moment,"* and silently generates `.project-manager/retrospective.md` from everything in your `.project-manager/` folder, your git log, and `index.html`. About fifteen seconds.

The coach opens the file and shows it to you. Read it. It will quote your own prompts and name specifics from your actual project. Notice the things it surfaces.

### Step 2 — The reveal lands

The coach tells you which skill wrote the retrospective and which skill has been running the curriculum. Sit with that for a beat; it's worth the beat.

### Step 3 — You pick what's next

The coach asks: *"What do you want to start next?"* You name a project — something you want to build, organize, write, teach, or finish. It doesn't have to be code-shaped. It does have to be *yours*.

The coach then asks: *"Do you have existing materials, or are you starting from scratch?"* Your answer picks the path.

### Step 4 — Bootstrap

**Brownfield path.** Give the coach the path to your existing materials. The coach offers a prompt template referencing the folder, the `/project-manager` skill, and the new project's path. You approve. Agent reads, summarizes, drafts `brief.md`, asks 2–3 clarifying questions. You answer. Agent updates the brief.

**Greenfield path.** No folder needed. The coach offers a prompt template that asks `/project-manager` to run an M1-equivalent conversation. The agent asks 5–6 questions; you answer; agent drafts `brief.md` from your answers. You read it and edit anything that's not quite right.

Either way, the new project's folder now has `.project-manager/` with `brief.md` and `prompts.md` inside (the prompt that bootstrapped it is logged).

### Step 5 — Commit in the new project

```
cd <new-project-path>
git init
git add .
git commit -m "M0: project bootstrapped"
```

Important: this commit is in the *new* project, not in Anchor. The two projects are now separate repos.

### Step 6 — Name your next move

The coach asks: *"In one sentence, what's the next thing you're going to do on this project?"* Whatever you say — *"M2 tomorrow,"* *"sleep on the brief for a day,"* *"come back Saturday morning"* — the coach writes it into the new project's `.project-manager/next-move.md`. That note is your handoff to your future self.

### Step 7 — Closing sweep + commit (Anchor side)

Back in the Anchor project, the coach makes the final Anchor commit:

```
cd <anchor-path>
git add .
git commit -m "M7: retrospective + handoff"
git push
```

The retrospective is now part of the public Anchor repo, alongside the README and the screenshot. Your next person to find that repo sees the whole arc.

Done.

---

## When this lesson is over

You should have, on disk:

```
my-anchor-project/
├── .project-manager/
│   ├── brief.md, picture.md, answers.md, prompts.md, ship-note.md, state.json
│   └── retrospective.md      ← new: written by /project-manager
├── README.md, index.html, assets/screenshot.png
└── .git/   (7 commits now: M1–M7, plus any sub-commits)
   → public at github.com/<you>/anchor

my-next-project/
├── .project-manager/
│   ├── brief.md              ← drafted by /project-manager (brownfield or greenfield)
│   ├── prompts.md            ← the bootstrap prompt logged
│   └── next-move.md          ← your one-sentence handoff to future-you
├── (any existing materials, untouched, if brownfield)
└── .git/   (1 commit: "M0: project bootstrapped")
```

You should have, in your head:

- The name of the skill that has been running this whole course (`/project-manager`) and the muscle memory of attaching it to a prompt to bootstrap something new.
- A retrospective for Anchor, written by the agent, that says specific true things about how *you specifically* worked across seven lessons. That's a personal artifact; keep it.
- A *next project already started.* Not finished, not far along — *started*. The brief is on disk. The first commit is on disk. The handoff to your future self is on disk. You have done the thing the entire course was training you to be able to do unaided.
- The feeling that *this loop, from idea to shipped, is now available to you for anything you want.* That's the deliverable. Anchor was the seed. The loop is the plant. Go grow things.

You have finished the Anchor curriculum.

---

*Lesson 7 of 7. End of curriculum. Anchor is shipped; your next project has started; the loop is yours.*
