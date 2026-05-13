---
name: anchor-u03-scaffold
kind: lesson
title: "Lesson 3 — Scaffold — The Empty Stage Loads in the Browser"
source_course: "first-project/Anchor"
source_file: "lessons/03-scaffold.skill.md"
parent: anchor-coach
milestone: M3
hours_estimated: 0.75
description: "Lesson 3 of the Anchor curriculum. Teaches the student to write a tiny HTML file that loads in a browser and shows Anchor's empty shell — the structure visible, nothing working yet. Three-part curriculum-builder format: Lecture, Worked Examples, Practice Problems."
license: "CC BY 4.0"
access:
  student:           [readonly_lecture, readonly_worked_examples, readonly_practice]
  teacher:           [readonly_lecture, readonly_worked_examples, readonly_practice, resolve_answer_key]
  dean:              [readonly_lecture, readonly_worked_examples, readonly_practice, resolve_answer_key, edit]
---

# Lesson 3 — Scaffold — The Empty Stage Loads in the Browser

> **Goal of this lesson.** By the end, you have a file called `index.html` in your project folder. Double-click it and your browser opens to a page with Anchor's shape on it: a header, a project sidebar with one project called "Personal", an empty task list, an input box at the bottom. Nothing works yet. That's correct.
>
> **How this lesson works.** You're not going to type the code. You're going to ask the agent for **three mockups** of Anchor based on your M2 picture. The agent produces them in about thirty seconds and opens each one in your browser. You react to what you see — you can pick one as-is, ask for a hybrid (*"Option 2's sidebar with Option 3's colors"*), alter on the spot like a tailor (*"make the sidebar wider; change the accent to teal"*), or — if none feels right — describe a new direction from scratch (option four). Once you have a starting point you like, you iterate. The whole loop runs in 20–30 minutes.
>
> **Why no typing yet.** This is the first lesson where code shows up. The temptation is to think *"shouldn't I be learning to type this myself?"* Skip that thought. The skill the course is training is *describing what you want clearly* and *evaluating what comes back* — engineering judgment, not keyboarding. Lessons 4 onward go deeper into this loop. By M6 you'll have shipped a real app you can use, and you'll have done so by directing, not transcribing. That's how the work actually gets done in 2026, and it's how you'll keep building things long after this course ends.
>
> **Type or talk.** Both work for descriptions and feedback. Dictation is especially natural here — describing a layout out loud is faster than typing it.
>
> **Working with one or two friends?** One person at the chat, the rest watching the screen as each draft loads. The team gives feedback collectively — *"the sidebar is too narrow, the input needs a placeholder, can the header be a bit bigger."* The agent attributes via the announce-yourself protocol; the team's eyes are doing the work the typist's hands used to.
>
> **Time.** Plan about 40 minutes solo. Add 10–15 for a group.
>
> **What you'll have when you're done.** `index.html` in your project folder, the page rendering in your browser, your third git commit, and the smallest *"holy crap, I built that"* feeling you'll have all course — earned by directing the agent through a few rounds of iteration, not by typing it yourself.

---

## Lecture

Software designers have always done this: before committing to a design, sketch three concepts, watch the client react, refine the chosen one. What's new in 2026 is the speed. The agent can produce three full, working mockups of Anchor — different layouts, different visual choices, different ways a "done" task looks — in about thirty seconds. Three minutes of work used to take three days. Take a beat to register that, because it changes how you should approach the rest of this milestone.

The most useful thing you can do in M3 is *not* to describe the perfect Anchor in advance. It's to ask the agent for three mockups, open them in your browser, and react.

Think of it like a fitting room. You don't shop for a shirt by describing the perfect shirt to the tailor. You bring three into the fitting room, try each on, and notice how each one fits. Maybe none is exactly right — but the one that's closest tells you what to ask for. Shorter sleeves on that cut. A different color. The tailor alters from a real starting point, not from a description.

In M3, the agent offers you three mockups. You open each one in the browser. You react: *"I like Option 2's sidebar but Option 3's color scheme. Combine them."* The agent does. You look again. The whole loop — show, react, alter, show, react — runs in minutes.

And here's where it gets even better. In this fitting room, you can also be the tailor. *"Make the sidebar wider. Use teal instead of blue. Move the input to the top."* The agent alters on the spot. Or — if none of the three feels right — you can ask for something very different: *"Forget those. Try a layout with no sidebar at all, just a single column with the project name as a heading I can click to switch."* That's option four — describe your own from scratch, and start the loop from your version. Customer, tailor, or original designer, depending on what the situation needs.

What's in each mockup, all in one file: HTML tags that *name* what's on the page (the header, sidebar, task list, input — you'll recognize them when you look); CSS that controls *layout and styling* (most of what varies between the three options); and a `<script>` block at the bottom with the five data nouns from M2 as empty variables — `let tasks = [];` `let projects = ["Personal"];` and so on. The variables exist but do nothing yet. They're the actors' marks taped to the floor — the spots that say *"someone will stand here"* before anyone walks on.

When you settle on a mockup, the agent saves it as `index.html`. Double-click it; the browser opens; Anchor appears. The shape is real, and it's *yours* — you chose it from concrete options and refined it through iteration. That's the smile moment Principle 3 promised: a handful of minutes from *"I have a picture"* to *"the picture is on my screen."*

One temptation to resist: asking the agent to wire anything up yet. Keep the script empty. The discipline is what makes M4 clean — every feature gets added on top of a known-good shell, not bolted onto something half-finished. The actors arrive next milestone.

---

## Worked Examples

Three shells and one review. Read them. Notice the patterns.

### Worked Example 1 — Three reading-log mockups, one chosen, one round of refinement

This is what M3 actually looks like end-to-end. Another student is building a reading log. They have a `picture.md` from M2 (the bedroom lesson) and they're starting M3.

**The student says:** *"Based on my picture.md, show me three mockups for the reading log."*

**About thirty seconds later, the agent has produced three files and opened them in three browser tabs.**

**Option A — The minimal column.** A single centered column on a clean white background. At the top: a small open-book emoji and *"Reading Log — 2026"* in a clean sans-serif. Below the header, an empty area marking where books will appear once Add is wired up. At the bottom, two text inputs ("Title", "One-sentence note") and a small blue Add button. Plenty of whitespace; nothing flashy. Like an article you'd want to read.

**Option B — The personal dashboard.** A two-column layout. On the left, a narrow sidebar with the heading *"This Year"* and a counter showing *"Books read: 0 of 12"*. On the right, the main reading area: a larger header at the top, the book entry area beneath it, the Add row at the bottom of the right column. More structure; feels more like a tool you'd open every morning.

**Option C — The timeline.** A single column like Option A, but the books are organized into month sections with subtle headers (*"January"*, *"February"*, etc.). Each book row shows the title, the note, and a small grey date. The Add row at the bottom asks for "what month" alongside title and note. More architectural; if you read thirty books a year you'll appreciate the structure.

**The student takes about a minute to skim all three.** They tell the coach: *"I like Option A's minimal feel, but Option C's month-organization is what I actually want. Combine them — keep Option A's clean look, but add the month headers from Option C."*

**The agent saves the combined version as `reading-log-example.html` and opens it. Here's the code that produces what the student sees:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Reading Log — 2026</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
           max-width: 720px; margin: 2rem auto; padding: 0 1rem; color: #222; }
    h1 { font-size: 1.5rem; margin-bottom: 1.5rem; }
    .month-header { font-size: 0.85rem; font-weight: 600; color: #888; text-transform: uppercase;
                    letter-spacing: 0.05em; margin: 1.75rem 0 0.5rem; }
    .book { padding: 0.75rem 0; border-bottom: 1px solid #eee; }
    .book .title { font-weight: 600; }
    .book .note { color: #555; margin-top: 0.25rem; }
    .add-row { margin-top: 2rem; display: flex; gap: 0.5rem; }
    .add-row input { flex: 1; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px; }
    .add-row button { padding: 0.5rem 1rem; border: 0; background: #2a6df4; color: white;
                      border-radius: 4px; cursor: pointer; }
  </style>
</head>
<body>
  <h1>📖 Reading Log — 2026</h1>

  <div id="books">
    <!-- month sections will appear here once we wire up Add in M4 -->
  </div>

  <div class="add-row">
    <input id="title" placeholder="Title">
    <input id="note" placeholder="One-sentence note">
    <button>Add</button>
  </div>

  <script>
    let books = [];
    let year = 2026;
    let currentDraft = { title: "", note: "" };
    let displayOrder = "by-month";
  </script>
</body>
</html>
```

**The student looks at the rendered page.** *"Looks great, but the Add button feels too saturated — make it a quieter blue."* **The agent changes one color value.** *"Yes — done."*

**Notice four things about this session.**

First — and most importantly — **the agent just saved this student a ton of work.** Producing three different reading-log mockups by hand would have taken hours; the agent produced three in under a minute. That speed is what makes *"ask for options"* the right opening move. The cost of generating alternatives is essentially zero, so you should always do it. The biggest mistake beginners make in M3 is asking the agent for *one* mockup. Ask for three. Always.

Second, **the student's feedback got better because they had concrete things to react to.** *"Option A's minimal feel with Option C's month-headers"* is precise direction. The student could not have produced that direction from a blank prompt — they needed to *see* the three first. This is the whole point of leading with options.

Third, **only one mockup got saved as `index.html`.** The other two were temporary; the agent generated them, the student rejected them, they're gone. That's healthy. Most of what AI produces in a session is throwaway, and expecting that keeps the loop fast. The value is in the *choosing*, not in the *producing*.

Fourth, **the script block declares exactly the data nouns from M2 and nothing else.** No functions. No event listeners. No working logic. The empty script is the discipline that makes M4 clean — and the student didn't have to remember to ask for that, because the *coach* (which is the same agent playing both roles) holds that line.

### Worked Example 2 — Workout tracker empty shell (the chosen mockup, almost fully worked)

Different student, different app, same loop. Imagine the agent offered three workout-tracker mockups; the student picked this one but spotted that one variable was missing. Here's what the chosen mockup looks like, then the code, then the spot for the student's small piece of direction.

**What you see in the browser:**

A narrow centered column. At the top, big text reading *"Today: "* followed by a blank space (the actual workout name will fill in once M4 wires the rotation). Below the heading, a row of four small circles — one of them filled in blue, the rest grey, indicating which day of the rotation you're on. Below the dots, a large blue "Mark Done" button as the page's main visual focus. Below the button, three lines of small grey text where the upcoming workouts will eventually appear.

Click "Mark Done" — nothing happens yet. The script block has variables but no logic.

**The code:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Workouts</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 480px; margin: 3rem auto;
           text-align: center; color: #222; }
    h1 { font-size: 2rem; margin-bottom: 0.5rem; }
    .dots { display: flex; justify-content: center; gap: 0.5rem; margin: 1rem 0; }
    .dot { width: 12px; height: 12px; border-radius: 50%; background: #ddd; }
    .dot.today { background: #2a6df4; }
    button.done { font-size: 1.1rem; padding: 1rem 2rem; border: 0; background: #2a6df4;
                  color: white; border-radius: 8px; cursor: pointer; margin: 1.5rem 0; }
    .upcoming { color: #888; font-size: 0.9rem; }
  </style>
</head>
<body>
  <h1 id="today">Today: <!-- M4 will fill this --></h1>

  <div class="dots">
    <span class="dot"></span>
    <span class="dot today"></span>
    <span class="dot"></span>
    <span class="dot"></span>
  </div>

  <button class="done">Mark Done</button>

  <div class="upcoming" id="upcoming">
    <!-- M4 will fill the next-three -->
  </div>

  <script>
    let rotation = ["Push", "Pull", "Legs", "Rest"];
    let currentIndex = 1;
    let history = [];
    // ↓ Your turn — declare one more variable. Look at your M2 data nouns
    //   for the workout tracker. What's the fifth thing the app has to remember?

  </script>
</body>
</html>
```

One fade only: the fifth variable in the script block. M2 named five data nouns for the workout tracker; four of them are here. The fifth is yours to *spot* — not type. Look at your M2 picture, find the data noun that's missing, and tell the agent what to add. *"Add a fifth variable for the last date a workout was marked done."* The agent picks a sensible name like `let lastMarkedDate = null;`; you confirm whether the name reads right to you. This is the director's loop in miniature: you spot the gap, the agent fills it, you check it.

### Worked Example 3 — Your Anchor empty shell (what you're aiming for)

You're about to direct the agent to build your own. When you ask for three mockups, they'll vary in layout, visual feel, and small UI choices — but each one will land somewhere in this rough neighborhood:

**What you're aiming for visually:**

A page that opens with a small anchor icon and the heading "Anchor" at the top. Below the header, a two-column layout: on the left, a narrower sidebar with the heading "Projects" and one item — "Personal" — listed underneath. On the right, a wider area with the heading of the currently selected project, an empty space where tasks will appear (with a thin line or label indicating where), and an input at the bottom with placeholder text like "Add a task and press Enter." Plenty of whitespace. One accent color of your choice — pick something that feels like *you*.

Click around — nothing works yet. That's correct.

**Where the agent starts:**

The agent will produce a first draft with the structure shown below in the framework, then fill in the styling, the regions, and the empty script block based on your M2 picture. You don't need to know HTML to direct this — you just need to look at the rendered page and tell the agent what's missing or off.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Anchor</title>
  <style>
    /* agent fills this in based on your description */
  </style>
</head>
<body>
  <header>
    <h1>⚓ Anchor</h1>
  </header>

  <!-- agent adds: sidebar, task list, input, script block with five data nouns -->

</body>
</html>
```

Practice 1 starts the loop: you describe, the agent drafts, you look, you iterate.

### Worked Example 4 — A review in motion (what Practice 7 looks like)

You saw this shape in Lessons 1 and 2. Here it is on an M3 artifact — a snapshot from another student's session, where the iteration loop stopped a couple of rounds short and the coach is stepping in to catch what was missed.

**What the page looks like in the browser:**

The page renders without errors, but it looks like a draft document, not an app shell. At the top, the word "Anchor" in default font. Below it, two lines of plain text — *"Sidebar with projects: Personal, Research"* and *"Task list goes here"* — sitting next to each other vertically instead of side-by-side. Below those, an input field with the placeholder "Add a task". No two-column layout. No styling. No visual cues that this is an app.

Type into the input — nothing visible happens, but if you open the browser's developer console (`Ctrl+Shift+J`), it logs *"adding: <whatever you typed>"*. The script block is doing work it shouldn't be doing yet.

**The code:**

```html
<!DOCTYPE html>
<html>
<head><title>Anchor</title></head>
<body>
  <h1>Anchor</h1>
  <p>Sidebar with projects: Personal, Research</p>
  <p>Task list goes here</p>
  <input placeholder="Add a task">
  <script>
    function addTask() {
      let task = document.querySelector("input").value;
      console.log("adding: " + task);
    }
    document.querySelector("input").addEventListener("keypress", addTask);
  </script>
</body>
</html>
```

**The coach's response:**

> *"Good news first — the file is well-formed and renders without errors, and there's a `<script>` block in there. The shape is reachable. Four things to sharpen.*
>
> *(1) **The sidebar and task list are paragraphs, not regions.** *'Sidebar with projects: Personal, Research'* reads like a description of a sidebar, not a sidebar itself. The browser has no idea that text is supposed to be a navigable region. Tell me to switch those to real structural elements — `<aside>` or `<div class="sidebar">` containing a `<ul>` with one `<li>` per project. Same pattern for the task list.*
>
> *(2) **The script block has working JavaScript — an `addTask` function and an event listener.** M3 is the empty stage; nothing in the script should be doing work yet. Tell me to strike both. They come back in M4.1, on a known-good foundation.*
>
> *(3) **The five data nouns are missing from the script block.** Your M2 picture named `tasks`, `projects`, `selectedProject`, `currentDraft`, and one more. None of them are declared as variables here. Tell me to add them — empty arrays, empty strings, sensible defaults.*
>
> *(4) **No styling.** The page renders but doesn't match your M2 mockup — sidebar on the left, task list on the right, comfortable whitespace, an accent color of your choice. Tell me to add a `<style>` block with a flexbox layout and the system-font stack.*
>
> *One more round of direction and this is solid. Want to walk through the four changes one at a time, or batch them all into one go?"*

**Notice three things about the review.** The coach opens with a real strength (the file renders, the shape is reachable) — diagnosis, not flattery. Each edit cites an M3 rule (real structural elements, empty script, data nouns present, layout styling) and tells the student *what to ask the agent for*, not what to type. And the coach closes with an invitation to do one more round. Same shape as Lessons 1 and 2.

---

## Working with friends? (group sidebar)

For M3 specifically, group mode is *one person at the chat, the rest of the team's eyes on the screen.* The team gives feedback collectively after each draft; the typist's role is *managing the conversation with the agent*, not typing code. Take turns being the manager; everyone should run the loop at least once during the course.

Three reminders.

**Announce yourself before your first turn** (*"This is Maria —"*) so the agent can attribute contributions. When Maria says *"the sidebar is too narrow"* and Sam says *"and the accent should be teal,"* the agent knows whose feedback is whose.

**Three eyes catch what one misses.** Solo students often miss small details — *"is the placeholder showing in full?"*, *"does the sidebar have a heading?"* — that a group spots immediately because three pairs of eyes are looking at the same page. The group's feedback per round will be richer than a solo student's.

**Disagreements still go through the three-layer flow** from Lesson 1 (restate → research → file for later). For M3 the disagreements are usually small — should the accent color be blue or green? — but they're real, and the team practices the same pattern. When the team can't agree on a visual choice, the agent shows two versions of the file (one with each option) and the team picks. *Showing both is faster than arguing about either.*

The full group setup is documented in [`references/group-mode.md`](../references/group-mode.md).

---

## Practice Problems

Do these in order. The Anchor Coach runs the loop with you, checks the rubric, and runs the review at the end.

### Practice 1 — Ask the agent for three mockups

Open your `picture.md` from M2 — the mockup, the data nouns, the interactions, the refresh answer. Read it once to remind yourself what you described.

Now tell the coach (in the chat, or out loud if you're using dictation):

> *"Based on my picture.md, please show me three Anchor mockups — different layouts and visual styles — so I can pick a starting point. No working JavaScript yet; just the empty shell with the five data nouns in the script."*

If the agent asks one or two clarifying questions first (*"what kind of feel are you going for — minimal, colorful, dense?"*), answer in one sentence and let them produce the three. If the agent doesn't ask, that's fine too; you'll see what they decided to vary.

About thirty seconds later, three full mockups open in your browser — three tabs, three rendered pages.

> **Coach checks:** the student requested three mockups (not one); the three are meaningfully different from each other (not three colorways of the same layout); each one matches the M1 brief and M2 picture in *intent* even though the visuals differ.

**About option four — describe your own.** If you have a clear vision that none of the three options seem likely to match, you can also say: *"Skip the three options — I want to describe my own."* Then describe it. The director's loop still applies; you just start from your description instead of from one of the agent's offers. Most students get more out of seeing three first, but option four is real.

### Practice 2 — Look at all three (or your own)

Open each mockup in turn. Don't rush; this is where the real work happens. For each one, ask yourself:

1. **Does it match the spirit of my brief?** A reading-log mockup with a dark techy aesthetic might be cool but doesn't match a brief that said *"a quiet place to remember what I read."*
2. **What do I notice first?** That's what's working visually. Keep it.
3. **What feels off?** That's the friction. Name it.

Tell the coach what you noticed about each option. *"Option A feels right but is too plain; Option B has the energy I want but the sidebar feels heavy; Option C has the structure I want but the colors are wrong."* Detailed observations like this are what unlock the iteration in Practice 3.

> **Coach checks:** the student named at least one specific thing they liked or disliked about each option. If the student only looked at one (the prettiest) and ignored the others, the coach asks them to spend thirty seconds with each — *the value of options is in the comparison, not in any single one.*

### Practice 3 — Pick one (or hybridize, or restart) and start iterating

Now you direct. Three ways to begin:

- **Pick one as-is.** *"Use Option B — it's closest to what I want."* The agent saves it as `index.html`.
- **Hybridize.** *"Use Option A's clean layout but pull in the month headers from Option C."* The agent combines them and saves the result.
- **Restart from your own description.** *"None of these feel right. Try a layout with no sidebar — just filter pills at the top — and the kind of minimal feel Option A has."* The agent produces a new mockup from your description.

Once the agent has saved something as `index.html` and opened it, look at the rendered page and give 2–3 specific changes. Examples of feedback that lands:

- *"The sidebar is too narrow — make it wider, maybe 220 pixels."*
- *"I want the accent color to be teal, not blue."*
- *"The input doesn't have placeholder text. Make it say 'Add a task and press Enter.'"*

Avoid feedback that's too vague (*"make it nicer"*) — the agent can't act on that. Avoid feedback that's too technical (*"change flex-basis to 220px"*) — you're directing in plain English, the agent translates.

The agent will update the file and re-render. Look at the new version.

> **Coach checks:** the student made a starting-point choice (pick / hybridize / restart) and gave at least one round of refinement feedback. The agent has saved the chosen mockup as `index.html` and applied the refinements.

### Practice 4 — Iterate until you're satisfied

Keep going. Two or three more rounds is normal — most students land between three and five rounds total. Stop when you look at the page and your gut says *"yes, that's it."*

If you start polishing for ten rounds, stop. You're optimizing past the M3 bar. Polish lives in M4.6.

If you're stuck on what to ask for next, the coach can offer one suggestion: *"want me to suggest one thing I'd change?"* — but the coach doesn't volunteer suggestions unprompted, because then it would be running the loop for you instead of with you.

> **Coach checks:** the student is converging (each round's changes are getting smaller); the file currently in the browser matches the M2 picture; the student has declared themselves satisfied.

### Practice 5 — Checkbox sweep with the coach

Tell the coach: *"Walk me through the rubric."*

The coach will go through the eight boxes out loud — file exists, page renders without errors, four regions present as real HTML elements, five data nouns declared, styling matches the picture, you can explain what each region and variable does, the review handshake is next, the commit is next.

During the sweep, the coach will ask you 2–3 ownership questions, like *"what does the `selectedProject` variable hold?"* or *"which region is the task list?"* If you can answer in plain English, you own the file. If you can't, the coach walks through that part of the file with you — pointing at lines, explaining what they do — until you can.

If any box is still red, the coach proposes one specific change. You greenlight it; the agent updates.

> **Coach checks:** all eight rubric boxes evaluated; the student can explain in plain English what each region of the file and each variable does. **Ownership through understanding is the gate; typing was never the point.**

### Practice 6 (optional, for the curious) — Show your shell to a friend

If you have a friend nearby, open the page on your laptop and ask: *"What do you think this app is going to do?"* Don't tell them; let them look at the layout and guess.

What they guess is information about your shell. If they say *"a to-do list with projects on the side,"* your structure is reading correctly. If they say *"a chat app?"* — your layout is misleading and the next round of iteration should fix it.

> **Coach checks:** the student tells the coach who they showed it to and what their friend guessed. *No answer key — the answer is the conversation.*

### Practice 7 — Get a review of your shell (required — this is the M3-closing handshake)

Same shape as in Lessons 1 and 2. The coach reviews the *finished* `index.html`: highlights what's working by line, proposes 2–4 specific refinements with rule-grounded justifications (real structural elements, empty script, data nouns declared, styling matches the picture), and invites another round if you want to push the shell further.

You apply each suggested refinement (by directing the agent to make the change in one more round) or write one sentence explaining why you're not.

> **Coach checks (this is the M3-closing handshake):** the review happened; every suggested refinement was either applied to `index.html` (through one more round of direction) or replied to with a sentence of reasoning. *The gate is engagement, not agreement.*
>
> *Coach reference: see `references/STYLE.md` § "How to review a student's brief" and § "How to run the director's loop" — the four-rule lens generalizes by substituting M3 rules for the M1 Lecture rules.*

After the review, make your third git commit:

```
git add .
git commit -m "M3: empty shell loads"
```

If your shell changed substantially after the review, an optional follow-up commit `M3.1: shell revisions from review` reflects the post-review state. On the default-on auto-commit path, the coach offers to run both for you.

---

## When this lesson is over

You should have, on disk:

```
my-anchor-project/
├── .project-manager/
│   ├── brief.md          ← from M1
│   ├── picture.md        ← from M2, reviewed and revised
│   ├── answers.md        ← from M2
│   └── state.json        ← coach-maintained
├── index.html            ← the file you directed the agent to write, that you can now see in your browser
└── (a git repo with three commits now: M1, M2, M3 — possibly M2.1 and M3.1)
```

You should have, in your head:

- The experience of *directing the agent through a few rounds of iteration and ending with a file that does what you wanted.* This is the moment most beginners say *"oh — I actually did it."* You did. The agent typed the characters; the page exists because of choices *you* made.
- A working mental model of *one file, three regions* (HTML / CSS / `<script>`) and what each region does. You can answer in plain English what each region of your file does and what each variable in the script holds — that's ownership, and ownership is what the rubric checks.
- The five data nouns from M2 now living as variables in the script. They are the bones of what comes next.
- The feeling that the next thing to do is *direct the agent to make the input box actually add a task to the list* — one feature at a time, not all six at once. (That's Lesson 4, sub-lesson 1.)

If you have all of that, ask the coach to advance you to M4. The bar is real. The bar is also low enough that you'll clear it.

---

*Lesson 3 of 7. Next: Lesson 4 — Build — Making the Six Features Work, One at a Time.*
