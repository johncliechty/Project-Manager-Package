---
name: anchor-u05-test
kind: lesson
title: "Lesson 5 — Test — Eat Your Own Cooking"
source_course: "first-project/Anchor"
source_file: "lessons/05-test.skill.md"
parent: anchor-coach
milestone: M5
hours_estimated: 0.2
description: "Lesson 5 of the Anchor curriculum. The agent's tests caught the logic bugs in M4; M5 is where the student catches the feel bugs by using the app intensively with their own real data for five to ten minutes. They find two or three things they want to change, write one fix prompt, the agent makes the changes (re-running the M4 test routine to confirm nothing broke), and commit. ~10 minutes total. Three-part curriculum-builder format: Lecture, Worked Example, Practice."
license: "CC BY 4.0"
access:
  student:           [readonly_lecture, readonly_worked_examples, readonly_practice]
  teacher:           [readonly_lecture, readonly_worked_examples, readonly_practice, resolve_answer_key]
  dean:              [readonly_lecture, readonly_worked_examples, readonly_practice, resolve_answer_key, edit]
---

# Lesson 5 — Test — Eat Your Own Cooking

> **Goal of this lesson.** Use Anchor with real data for five to ten minutes. Find two or three things you want to change. Get them changed in one round. Commit. The M4 tests still pass after the changes.
>
> **Skill attached: `/expert-coder`** for the fix prompt. (None for the using-it part — that's just you and the app.)
>
> **Time.** About 10 minutes — five of intensive use, five of fixing.
>
> **What you'll have when you're done.** A revised `index.html` that's been *used*, the next entry in `prompts.md`, one commit `M5: revisions from real use`.

---

## Lecture

The chef who serves the soup without tasting it serves cold soup. The M4 agent wrote a test routine that proved every feature *works* — buttons add tasks, checkboxes toggle, deletes delete, the page survives a refresh. Those are real tests. They are not the only tests. The agent's tests can't tell you that the cursor jumped to the wrong place after Enter, or that the X is so close to the checkbox that you keep mis-clicking, or that the empty-state copy reads weird the first time you see it. Those failures are *feel* failures. The only instrument that catches feel failures is *you*, using your own app, with your own data, for real.

This lesson is short on purpose. You don't need to use Anchor for a week to find the rough edges. Five to ten minutes of *real use* — put your actual tasks in, switch between actual projects, mark some done the way you'd mark them done if you were running your day — surfaces almost everything that matters. The rest you'll find over the course of using it forever. M5 catches the first wave.

The shape of the lesson is *use → notice → fix.* You'll spend most of the time using the app and a small amount writing one fix prompt. The agent makes all the changes at once; the M4 test routine runs after to confirm nothing broke. If the tests are still green, you commit. If a test went red, the agent fixes it and re-runs before you commit. That's the safety net the M4 tests are doing on a second job: they're now your **regression check**, the thing that catches whether a fix broke an unrelated feature. Future-you, after a year of changes to Anchor, will be very glad that test routine is still in the file.

This is where you start being a real user of your own tool. The transition from *building* to *using* is small in calendar time and large in identity — you stop being someone who built a thing and start being someone who *has* a thing. That's the engineering frame this whole course has been training toward.

---

## Worked Example — The reading-log student uses it

Same student. Their reading log is built, tests are green, polish landed. They open the page and decide to actually put in the seventeen books they read this year so far.

**Five minutes of real use.** They paste titles, type one-sentence notes for each, scroll through the list, edit two notes that came out wrong, delete one book they decided to keep on a separate list. By the time they're done, three things are bothering them.

1. *"After I press Enter to add a book, the cursor stays in the title field but the title field is empty — fine — but the **note** field still has the previous book's note in it. I keep typing a new title and then realizing the note from the last book is still there."* The note field isn't clearing on Enter the way the title field is.

2. *"The year header reads '2026' which is right, but it's the same size as the book titles below it, so when I'm scrolling the page my eye can't find the header to know what year I'm in. I want the header bigger and a different weight."*

3. *"Empty-state copy when there are zero books reads just 'No books yet.' I'd rather it said something that makes me want to add the first one — like 'Add your first book of 2026.'"*

**The student writes one fix prompt.** The coach offers a template; the student edits a phrase or two.

> *"Read the current `index.html`. Using `/expert-coder`, make three small changes: (1) clear the note input as well as the title input when a book is added; (2) make the year header noticeably larger and bolder than the book titles — magazine-headline feel; (3) change the empty-state copy from 'No books yet' to 'Add your first book of 2026.' (or whatever the current year evaluates to — derive it the same way the header does). Run the test routine after the changes to confirm nothing else broke."*

**The agent makes the changes** and runs the test routine. All seven previous tests still pass. (They were testing add / edit / delete / persist behavior — none of which the three fixes touched.) The student opens the page; the note field clears now, the year header reads big and bold, the empty-state copy reads like the page is asking for the first book.

**The student tries it for another minute** to confirm the feel is right. Adds two more books. The cursor flow is correct. The year header is now what the eye lands on first. They smile.

**Commit:**

```
git add .
git commit -m "M5: revisions from real use"
```

Total time: about 9 minutes. Five of use, four of fixing.

Notice three things.

First, **the three fixes were not bugs.** None of them broke a feature. They were *feel*. The kind of thing the M4 tests can't see and the agent can't anticipate. Eating your own cooking is the only way to find them.

Second, **the fix prompt batched all three changes into one call.** Old programming pedagogy would tell you to fix one at a time and verify each. With the M4 test routine acting as regression check, batching is fine — if anything breaks, the tests tell you which feature broke and the agent diagnoses. Batched fixes are faster and don't lose anything in safety.

Third, **the student got better at writing prompts in M5 than they were in M4.** Compare this prompt — short, specific, scoped, derives a value the same way the existing code does — to the M1 prompt where they were rambling for a paragraph. That's the curve. By L7 the student will write prompts like this from a cold start without a template.

---

## Practice — The session, end to end

About 10 minutes.

### Step 1 — Use Anchor with real data

Open `index.html`. Add five to ten tasks across two or three projects — your *real* tasks, not made-up ones. *"Email professor about deadline extension."* *"Buy birthday card for mom."* *"Replace the rear bike tire."* The realer the data, the faster you find the rough edges.

Now use the app the way you'd use it if it were yours forever:

- Switch between projects. Does the switch feel right, or is it sluggish? Does the selected-project marker read clearly?
- Mark some tasks done. Does the visual cue read at a glance, or do you have to squint?
- Delete one. Does the gesture feel right, or does the X live in a spot where you keep mis-clicking?
- Close the tab. Reopen. Are your tasks back? (They should be — the M4 tests confirmed it. But feeling it work with your real data is a different experience than reading a test report.)
- Add a task while a project is selected, then switch to another project. Does the new task land where you expect?
- Type a long task — like 200 characters. Does the layout handle it, or does the text overflow weirdly?

Five to ten minutes. Don't rush; this is where the lesson happens.

### Step 2 — Write down what you noticed

In the chat (or in your head if you're sharp), name **two or three specific things** you want changed. Specific is the gate — *"it feels clunky"* is not actionable; *"the X is too close to the checkbox and I keep clicking the wrong one"* is. The coach will press you on vague items until they're specific.

If you can't find anything you want to change after five minutes of real use, something's off. Either Anchor is genuinely perfect (rare) or you're not using it hard enough — put in more real data, click around more, try edge cases. The coach can suggest two or three things to try.

### Step 3 — Write one fix prompt

Coach offers a prompt template — *"Read `index.html`. Using `/expert-coder`, make these small changes: [the student's two or three items]. Run the test routine after to confirm nothing broke."*

You edit anything that doesn't sound like you (the items should be in *your* voice — that's the record of what you noticed). Coach captures to `prompts.md` and sends.

### Step 4 — Agent fixes, re-runs tests, you confirm

Agent makes all the changes in one pass. Re-runs the M4 test routine. Reports green/red. If green, the coach opens the updated `index.html` and points at what changed. You play with the app for another minute to confirm the feel is right.

If a test went red — uncommon but possible if a fix touched a feature the test was checking — the agent diagnoses and fixes; tests re-run; you confirm.

### Step 5 — Closing sweep + commit

Coach walks the M5 rubric out loud, brisk. ~30 seconds.

Commit:

```
git add .
git commit -m "M5: revisions from real use"
```

Done.

---

## When this lesson is over

You should have, on disk:

```
my-anchor-project/
├── .project-manager/
│   ├── brief.md
│   ├── picture.md
│   ├── answers.md
│   ├── prompts.md        ← grew by one entry (your M5 fix prompt)
│   └── state.json
├── index.html            ← revised based on what real use surfaced
└── (a git repo with five commits now: M1, M2, M3, M4, M5)
```

You should have, in your head:

- The feeling of *using your own tool with your real data and noticing what's wrong by feel.* That's a skill the tests can't replace. Future-you, working on bigger projects, will be glad you practiced it on this one.
- A short, specific, sharp fix prompt you wrote yourself — visible at the bottom of `prompts.md` as evidence of how far your prompting has come since the M1 rambling.
- The feeling that the next thing is *put this on GitHub so someone other than you can see it*, not *use it for another week*. (That's Lesson 6 — ten minutes, you'll see.)

If you have all of that, ask the coach to advance you to M6.

---

*Lesson 5 of 7. Next: Lesson 6 — Ship — Putting It Where Other People Can See It.*
