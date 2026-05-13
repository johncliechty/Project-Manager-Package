---
name: anchor-coach-rubric-m6-ship
kind: rubric
title: "Milestone 6 — Ship — Acceptance Rubric"
parent: anchor-coach
description: "Agent-checkable acceptance criteria for Milestone 6 of the Anchor curriculum. The student's project lives at a public GitHub URL, has a README with the four parts, and at least one external human has seen it."
---

# Milestone 6 — Ship — Acceptance Rubric

**Intent (one sentence the student also reads):**
Anchor exists at a public URL on GitHub, the README explains what it is in 30 seconds, and one person you know has seen it and replied.

## The boxes

Read each box. Mark each ✓ or ✗. **All six must be ✓ to advance to M7.**

- [ ] **A public GitHub repo exists at `github.com/<student>/<repo-name>`.** Verify by visiting the URL — it loads, the page shows the file tree, the repo is marked Public. If the student chose Private by accident, walk them through `gh repo edit --visibility public`.
- [ ] **`README.md` in the repo has the four parts:**
  - A one-paragraph *"what this is"* in the student's voice (derived from `brief.md`, not marketing copy).
  - A two-line *"how to run"* — usually just *"download the folder, double-click `index.html`."*
  - One screenshot embedded near the top of the README, referencing `assets/screenshot.png` (or wherever the student saved it). The screenshot renders correctly on GitHub.
  - A one-line credits note at the bottom — *"Built by [name] with Cowork as my coach."*

  Each part should be readable in a few seconds. The total README reads in 30 seconds total. If it's longer than that, it's overwritten — trim it.
- [ ] **`assets/screenshot.png` (or equivalent) exists in the repo** and shows the app with 5–10 real-looking entries in it, not an empty page. If the screenshot is of an empty Anchor or only contains lorem-ipsum tasks, send the student back to add real data and re-screenshot. The screenshot is what people scroll past words to look at; it has to do real work.
- [ ] **`git status` is clean and the full commit trail is on the public branch.** Run `git log --oneline` and verify the commits go from `M1: brief written` through `M6: shipped` (with any sub-commits). `git push` should show *"Everything up-to-date"* — meaning the local and remote are in sync.
- [ ] **At least one external human has seen the link and replied.** The student copied the URL and sent it to someone (sibling, friend, spouse, classmate, anyone outside this chat). That person replied in some form — *"oh nice"*, *"how does X work?"*, *"is this for school?"*, even *"k"* counts. The reply is logged in `.project-manager/ship-note.md` with the person's name (or relation), the date, and their exact words in quotes. If the reply hasn't come back yet, the milestone can still close *after* the message has been sent — the student logs the send-event and updates `ship-note.md` once a reply lands.
- [ ] **One git commit exists with the message `M6: shipped`** and it has been pushed to the remote.

## How you tell the student where they are

The common reds on M6 are: (1) screenshot of an empty page; (2) README overwritten with marketing voice; (3) student sent the link but didn't log the reply.

> *"You're close on M6. The repo is live and looks clean. Two things left: (1) the screenshot is of an empty Anchor — add a few real tasks, re-screenshot, and push again; takes one minute. (2) Did you text the link to anyone yet? When they reply, write one line in `.project-manager/ship-note.md` and we close M6."*

If the student's first reply is *"it doesn't actually load on her phone"* — that's information about the v0 scope (Anchor is desktop-browser-only at v0), not an M6 failure. Log it in `filed-for-later.md` as a v1+ candidate; M6 still closes if the desktop version loads correctly.

If all six are green, mark M6 complete in `.project-manager/state.json`, propose the closing commit, congratulate the student in one sentence, and open M7.

## Why this rubric

M6 is the smallest possible version of *making your work exist for other humans.* The mechanics — `gh repo create`, README, push — are well-trodden and the agent handles them on one prompt. The pedagogically load-bearing parts of the rubric are **the screenshot has real data** and **someone you know has seen it and replied.** Both are about whether the project actually crossed the threshold from *thing on your laptop* to *thing in the world.*

The screenshot rule (box 3) is firmer than it sounds. A README with an empty-page screenshot reads to outside humans as *"I haven't actually used this."* Even five real-looking tasks make the screenshot read as *"this person is using this."* That difference is the difference between *"oh"* and *"oh, cool"* from the friend who clicks the link. The screenshot does more work in the README than the prose does; the rubric weights it accordingly.

The "external human has replied" rule (box 5) is the load-bearing emotional beat of the milestone. Until someone replies, the project still exists only for the student. The first reply — even *"k"* — is the moment the work is shared, and that moment is the engineering identity transition this milestone is built around. The course will not close this milestone without it; *"I sent it but no one's replied"* is fine for now (the student can finish the rest of the rubric and come back to update `ship-note.md` later in the day), but eventually a reply needs to land.

The credits line is non-optional. Engineers who learned to direct agents often hide the method when shipping — they want the work to look like solo work. The course refuses that. The credits line says *"this is how the work got made,"* which is honest and which gives the next person reading the README permission to learn the same way. Authentic provenance is also pedagogy. By M6 the student has done enough that the credits line is *true* — they did direct an agent through seven lessons of real engineering. The credits line tells the truth.

`/expert-coder` did the work on the README itself. The student didn't write *"a beautifully crafted, minimalist productivity tool"* because `/expert-coder` doesn't write like that. Voice survives the pipeline if you let it; the rubric is implicitly checking that the README doesn't read like a sales page.
