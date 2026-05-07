# The operating loop

The discipline this skill enforces. Read this when you're about to start a new project, when you find yourself wanting to re-critique a plan you've already critiqued twice, or when the skill's advice surprises you and you want to know why it's saying what it's saying.

## The seven steps

Adapted from John Liechty's *AI-Assisted Project Workflow*:

1. **Research and proto-plan.** Enough prior research to understand the topic. Define goals. Sketch a proto-plan. Rough is fine — it's starting material, not the answer.
2. **Stress-test with critique.** Feed the proto-plan to the agent and ask it to *attack* the plan, not validate it. See `critique-perspectives.md` for eight angles.
3. **Iterate, but bounded.** Revise. One more critique pass. **Stop after two passes**, even if the plan still feels imperfect. AI will happily generate plausible-sounding new blindspots forever — that's a planning trap. A polished plan is not the goal; a working project is.
4. **Decompose into subplans.** Identify the subparts of the project. For each, run the same loop (research → proto → critique → bounded iteration). The skeleton emerges from this.
5. **Build, treating the plan as provisional.** Start executing. Expect to discover that parts of the plan were wrong — that's a feature, not a failure. Update the plan as you build; don't treat it as a form to be filled in.
6. **Test each part as you build it.** Sketch your own test cases first. Then ask the agent to identify edge cases and blindspots. Implement the tests. Each subpart works in isolation before moving on.
7. **Integrate and test the seams.** Combine parts. Test the boundaries between them, not just the parts. Most failures live at the seams.

## Why "vary the prompt angle, not the model"

A common mistake is to send the same plan to Claude, GPT, Gemini, and Grok hoping for diverse pushback. The major frontier models converge on similar critiques because they were trained on overlapping internet-scale corpora. You get more diversity by varying the *role* you ask the agent to play:

- "Critique this from a security perspective."
- "Critique this from a UX perspective — the user has used the product for ten minutes and is frustrated."
- "Critique this as someone who builds products that compete with this one."
- "Critique this as a user-researcher who has interviewed thirty people in the target audience and is skeptical."

This produces meaningfully different feedback even within a single model. Use multiple models when you've already saturated the angle space.

## Why "stop after two passes"

This rule is the spine of the discipline. The trap is real:

- Pass 1 surfaces real, fixable issues.
- Pass 2 surfaces real-but-marginal issues.
- Pass 3 surfaces issues the agent invented to fill the request, dressed up to sound plausible.

After pass 2, the highest-value next move is *building*, because:

- The build will surface issues you couldn't have predicted (this is the *whole point* of building).
- Time spent on pass 3 is time not spent learning what's actually wrong.
- The plan was provisional anyway; pass 3 polishes a thing that's about to change.

The skill enforces this with `.pm/critique-passes.json`. If you find yourself wanting to override it, write down *what specific question* a third critique would answer that pass-1 and pass-2 didn't. If you can articulate it, do that one targeted question; don't run a full third pass.

## Why "the plan is provisional"

The mistake here is thinking of `MASTER-PLAN.md` as a contract that, once signed, must be followed. It's not. It's the current best understanding, edited as the build teaches you things.

Concretely:

- If you build a section and discover the plan was wrong, **edit the plan**. Don't apologize. Don't try to make the build match the wrong plan. Don't write a "deviation note" in the side margin.
- If a section has been `building` for two weeks with no progress, the plan-for-that-section is wrong. Step back, edit the section to reflect what you learned, and either resume or drop it.
- The history of plans is in `plans/proto-vN.md` and the `git log` of `MASTER-PLAN.md`. Future-you can reconstruct what you thought when, if you need to.

## Why "test the seams"

When you decompose a project into subplans, you push complexity into the *interfaces between subplans*. Each subplan can pass its own tests in isolation while the system is broken at the boundaries.

Concretely: if your project has subplans A, B, and C, your test suite needs:

- Tests for A in isolation (mocking B, C).
- Tests for B in isolation.
- Tests for C in isolation.
- **Tests for A↔B, B↔C, A↔C interactions** with real implementations of both sides.

The boundary tests are the ones people skip. They're the ones that catch most production bugs. Don't skip them.

## The phenomenology that John uses

> "Plan is form, implementation is matter — but the form is provisional. You discover what the form should be partly by working with the matter. Plan enough to start, build to learn, replan when needed."

This isn't whimsy; it's load-bearing. If you treat the plan as *form alone*, you over-plan and under-build. If you treat the implementation as *matter alone*, you build aimlessly. The two co-define each other, and you get to a working system by alternating between them with bounded patience for each.
