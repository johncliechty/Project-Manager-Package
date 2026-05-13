# Critique perspectives

Eight angles to rotate through when running a critique pass. Pick two or three per pass — varying the angle gets more diverse pushback than varying the model.

The goal of a critique pass is *to attack the plan, not to validate it*. The agent should adopt the role and stay in it.

## 1. Security

> "You are a security engineer who has spent ten years finding holes in software like this. Look at this plan and tell me where the user gets compromised. What threat models am I not considering? What does an attacker get if they own one component?"

Surfaces: data flow problems, secrets handling, privilege escalation, supply chain risk.

## 2. UX (frustrated user)

> "You are a user who has spent ten minutes trying to use this product and is now frustrated. Walk through what you'd do, where you'd give up, and what you'd say to a friend about it. Be specific."

Surfaces: confusing flows, missing affordances, jargon, broken expectations.

## 3. Operator

> "You are the person who will be on call when this thing breaks at 2 AM. What happens? How do you know what broke? How do you fix it without rebuilding from scratch?"

Surfaces: missing observability, single points of failure, undocumented assumptions, runbook gaps.

## 4. Skeptical user-researcher

> "You have interviewed thirty people in the target audience for this product. You are skeptical that the people building it understand the audience. Critique this plan in light of what real users would actually do."

Surfaces: assumptions about the user that aren't true, features no one asked for, missing features people desperately want.

## 5. Competitor

> "You build a product that competes with this one. You've seen this plan. Tell me where it's weak compared to what you have, what you'd attack, and where you'd let them have the win because it's not worth fighting for."

Surfaces: differentiation gaps, weak moats, parts of the plan that are table-stakes vs distinguishing.

## 6. Bored investor

> "You are an investor who has seen ten thousand pitches like this. The pitch deck is open. You are bored. What part of this plan would make you close the deck? What part would make you ask a follow-up question?"

Surfaces: unclear value proposition, vague metrics, founder-myopia, lack of evidence.

## 7. Maintainer six months from now

> "You are the person who has to maintain this codebase six months after the original builder has lost interest or moved on. What do you wish was different? What's going to bite you?"

Surfaces: missing documentation, clever-but-fragile code, dependency rot risk, knowledge concentration.

## 8. The premise itself

> "Steel-man the position that this project should not exist. Why might it be the wrong project to build? What's the strongest argument for doing something else with this time?"

Surfaces: motivated reasoning, sunk-cost thinking, opportunity cost. Use sparingly — but use it. It's the pass most likely to save you from a wrong project.

## How to actually run a pass

1. Pick 2–3 angles. Don't run all eight; you'll get bored and the critiques will get shallow.
2. For each angle, paste the plan and the role prompt. Capture the output verbatim into `plans/critique-pass-N.md`.
3. Read the captures. Look for *concrete*, *fixable* issues.
4. Edit the plan in response. **Discard issues that are vague, hand-wavy, or "what about X" without specifics.** Frontier models are very willing to invent vague issues; don't reward that.
5. Mark the section's `Status:` to `critiqued-1` or `critiqued-2-final`.
6. After pass 2, build. Don't go back for pass 3.

## What to discard

- "Have you considered…" with no specifics.
- "There may be edge cases…" with no example.
- "Some users might…" without a concrete user.
- Long lists of "things to think about" with no ranking by importance.
- Suggestions to add more sections to the plan (the plan should *shrink* under critique, not grow).

What to keep:

- Concrete failure modes with a how-they-trigger.
- Specific assumptions that aren't justified.
- Specific stakeholders whose perspective is missing.
- Suggestions to *cut* a section (these are gold).
