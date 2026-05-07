# Decomposition

How to split a master plan into subplans that don't overlap and that can each be taken on independently.

## The goal

A subplan is good if:

1. **It can be worked on without coordinating with other subplans.** Coordination is the most expensive thing in software; subplans that need to keep talking to each other should probably be one subplan.
2. **It has a checkable acceptance test.** "Done" is unambiguous.
3. **It is small enough to hold in one head.** If you can't describe what's in it in two sentences, it's too big.
4. **It is large enough to matter.** If finishing it doesn't move the master plan forward visibly, it's too small.

## Heuristics for splitting

- **Split along data boundaries.** If subplan A produces data that subplan B consumes, that's a clean seam. If they share live state, that's not.
- **Split along user-value boundaries.** A subplan that delivers a thing the user can see and use is worth more than five infrastructure subplans of equal effort.
- **Split along risk boundaries.** Put the riskiest parts in their own subplan so they fail fast and visibly.
- **Don't split along organizational lines unless there's a real reason.** "This is the front end and this is the back end" is often premature decomposition; "this is the authentication flow" is rarely premature.

## Anti-patterns

- **The infinite-prerequisite chain.** Subplan A blocks B blocks C blocks the user-visible thing. By the time you finish A, you've forgotten why you started. Build a shortest-path slice through A → B → C that gives you something user-visible, even if rough; then deepen.
- **The over-decomposed micromanage.** Twenty subplans for a project that needs three. The overhead of tracking them costs more than the clarity gains.
- **The hidden dependency.** Subplan A nominally doesn't depend on B, but actually B has to be done first because A's tests need B's data. List dependencies explicitly in `blockedBy`.

## Recursion

Each subplan runs the same operating loop the master plan ran:

1. Research and proto-plan (within the subplan's scope).
2. Critique pass 1.
3. Critique pass 2 (bounded — same rule).
4. Build.
5. Test.

If a subplan turns out to be too big, decompose *it* into sub-subplans. But don't go more than two levels deep — three levels of nested decomposition is almost always over-planning. If you need three levels, the master plan probably has the wrong shape; step back.

## When to *re*compose

Sometimes you split too eagerly and discover the seam was wrong. Symptoms:

- Two subplans keep needing to be edited together.
- A subplan's tests can't be written without referencing another subplan's internals.
- Both subplans are stuck because each is waiting on the other for something neither owns.

When you see these, merge. It's cheap; the structure was always provisional.
