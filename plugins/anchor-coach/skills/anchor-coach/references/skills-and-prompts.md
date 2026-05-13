---
name: anchor-coach-skills-and-prompts
kind: reference
title: "Skills and Prompts — A Student-Facing Primer"
parent: anchor-coach
description: "What a skill is, how to attach one to a prompt, what comes pre-installed, and how to build a new one in about thirty seconds. The coach opens this when the skill concept first arrives in Lesson 3."
---

# Skills and Prompts — A Student-Facing Primer

You'll see the coach reach for *skills* starting in Lesson 3. This file is the one-page explanation. Read it once; you'll come back when you want a sharper version of something.

## What a skill is

A skill is a small package of instructions and reference material the agent loads when it's about to do a specific kind of task. A *graphic-designer* skill teaches the agent what good layout, typography, and color choices look like; an *expert-coder* skill teaches the agent to prefer clean, simple code over clever code; a *project-manager* skill teaches the agent how to scaffold and run a milestone-driven project. You attach a skill to a prompt by writing `/skill-name` somewhere in the prompt — the agent reads that as *"load this skill for this turn."*

## How attaching looks

Three sentences are enough to know. The slash-syntax goes inline, anywhere in your prompt — beginning, middle, or end. You can attach more than one (`/expert-coder` and `/graphic-designer` together is normal at M4.6). If the skill isn't installed, the agent will tell you and offer to build it on the spot.

An example prompt with a skill attached:

> *"Read `picture.md`. Using `/graphic-designer`, show me three Anchor mockups — three meaningfully different layouts. No working JavaScript yet; just the empty shell with the five data nouns in the script block."*

That's it. The `/graphic-designer` reads as a directive to the agent: *load the design-thinking package before doing this.*

## The skills that come pre-installed

The Anchor course assumes four are present. Three are student-facing; the fourth runs in the background.

- **`/expert-coder`** — clean code, simpler is better, readable beats clever. Attached during M4 (every sub-feature) and used when you want generated code to age well.
- **`/graphic-designer`** — magazine and website best practices: layout, typography, color theory, whitespace. First shows up at M3 (the three mockups), comes back at M4.6 (polish).
- **`/project-manager`** — milestone-driven project workflow, `.project-manager/` scaffolding, commit hygiene, decision logs. *This skill has quietly been running your whole curriculum.* You meet it directly in Lesson 7.
- **`/anchor-coach`** — the curriculum you're using right now. You're inside it.

## Building a new skill in thirty seconds

If a skill you want doesn't exist, you build it by describing what you want, in a sentence, and asking the agent to save it. Worked example — this actually happens in Lesson 3:

> *"I want a `/graphic-designer` skill. It should know about magazine layout principles, typography (system fonts, line heights, hierarchy), color theory for digital interfaces (one accent color, plenty of whitespace), and the conventions of well-designed websites. Save it where my other skills live."*

The agent writes a short markdown file — *frontmatter, a few paragraphs of "what good design is," a few worked examples* — and saves it as a skill folder. Next time you write `/graphic-designer` in a prompt, it loads. Building a skill is *describing what a senior in that field knows*, in plain English, and letting the agent capture it as reusable instructions.

The same pattern works for `/copywriter`, `/data-engineer`, `/security-reviewer`, `/your-domain-expert` — anything you find yourself wanting the agent to be sharper at. Build once, attach everywhere.

## When to use bundled vs. when to build your own

Reach for a bundled skill when it exists. They're tested, maintained, and consistent with what the course expects. Build a custom skill when you've explained the same context twice in two different prompts — that's the signal to spend thirty seconds capturing it once.

## Small troubleshooting

If a skill doesn't seem to be having an effect, three things to check. First, the syntax — `/expert-coder` (slash-prefix), not `expert-coder` or `[expert-coder]`. Second, is it installed — ask the coach, *"is `/expert-coder` available?"* Third, is the prompt's *task* asking for the kind of work the skill cares about — `/graphic-designer` won't sharpen a prompt that's purely about JavaScript logic.

## For the curious

Cowork's skill documentation lives at [docs.claude.com](https://docs.claude.com) under *Agents and Tools → Agent Skills*. Skills are a small but powerful idea — once you've built three, you'll start seeing places to build a fourth.
