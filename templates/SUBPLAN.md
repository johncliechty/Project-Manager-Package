# Subplan — {{SUBPLAN_NAME}}

**Parent section in master plan:** {{PARENT_SECTION}}
**Status:** proto
**Critique passes done:** 0 of 2
**Owner:** {{OWNER}}
**Estimated effort:** {{EFFORT}}

## What this is

{{WHAT}}

(One paragraph. Should fit on one screen.)

## Why we're doing it now (vs later)

{{WHY_NOW}}

## Acceptance test

When this subplan is done, the following will be true:

- {{ACCEPTANCE_1}}
- {{ACCEPTANCE_2}}

These are *runnable*, not aspirational. If the test isn't actually checkable, rewrite it.

## Approach (provisional)

{{APPROACH}}

(How we'll attempt this. Likely to change. Don't over-detail.)

## Dependencies (blocks us)

- {{DEP_1}}

## Things this enables (we block these)

- {{DOWNSTREAM_1}}

## Risks specific to this subplan

- {{SUBPLAN_RISK_1}}

## Critique pass 1

*Filled in after the first critique. Use `pm critique` to run it. Vary the angle (security / UX / "as someone who hates this") rather than the model.*

{{CRITIQUE_1}}

**Changes made in response:**
{{CRITIQUE_1_RESPONSE}}

## Critique pass 2

*The bounded final pass. After this, the subplan goes to `building` whether it feels finished or not. The build will teach you what the plan missed; that's expected.*

{{CRITIQUE_2}}

**Changes made in response:**
{{CRITIQUE_2_RESPONSE}}

## Build log

(Append-only. One line per meaningful event. The `pm log` command writes here.)

- {{DATE}}: stub created.

## What we learned

(Filled in once status hits `built`. What the plan got wrong, what the build taught us, what to feed back into the master plan.)
