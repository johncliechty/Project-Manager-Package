# `pm what-now` — the ranking

How `pm what-now` decides what to recommend. Read this if the recommendation surprises you, or if you want to tweak the heuristics for a specific project.

## What it reads

- `MASTER-PLAN.md` — section statuses and the "Next concrete actions" list at the bottom.
- `plans/subplans/*.md` — each subplan's status, `blockedBy`, `impact`, and `cheapness` fields.
- `.pm/state.json` — global project state (current phase, blockers, recent activity).
- `.pm/critique-passes.json` — which sections are at pass 0 / 1 / 2.
- `logs/sessions/` (last 5 files) — what was touched recently, what was logged.
- `logs/decisions/` (last 14 days) — what's been decided so the recommender doesn't suggest something already rejected.
- `briefs/investor-brief-current.md` — file mtime, to detect staleness.
- `.env` — to see which API keys are present (for filtering out subplans that need a missing key).

## The score

Each candidate next-action gets a score between 0 and 100.

```
score(candidate) =
    20 × is_unblocked(candidate)
  +  4 × impact(candidate)         // 1–5 from subplan frontmatter
  +  3 × cheapness(candidate)      // 1–5 from subplan frontmatter
  +  5 × within_critique_gate(candidate)
  +  3 × on_master_plan_next_actions(candidate)
  -  5 × stale_log(candidate)      // hasn't been touched in >2 weeks
  -  10 × needs_missing_key(candidate)
  -  20 × already_rejected(candidate) // mentioned in decisions log as "not now"
```

The top 3 by score are returned, with one-line justifications.

## Special cases that pre-empt the score

These short-circuit the normal scoring:

1. **Critique gate not closed.** If any section in the master plan has `Status: critiqued-1` and the bounded loop hasn't been completed (i.e., it should go to `critiqued-2-final`), the top recommendation is *finish the critique loop*, not start building. The critique loop is the cheapest high-leverage move when it's open.
2. **Investor brief is stale.** If `briefs/investor-brief-current.md` is more than 24h old, `pm brief` is one of the top three options regardless of score. It's cheap; signal-to-cost is high; staleness compounds.
3. **No session log today.** If the user is asking "what now?" and there's no log entry for today, the top recommendation is silently "log what you've already done today" before recommending new work. The script writes a one-line nudge.
4. **All subplans blocked.** If every subplan has a non-empty `blockedBy`, the recommendation is to *unblock something*, with the specific blockers listed. This is a project-state smell; surface it.

## What it does *not* do

- It does not pick *for* the user. It returns three options with justifications, and the user picks. This is deliberate: the recommender's job is to surface the option space, not to overdrive on a guess about preferences.
- It does not consider time-of-day or calendar. (We could; we don't yet.)
- It does not consider mood or energy level. (Same.)
- It does not chain — if you do action A, the next call to `what-now` will compute fresh from the new state.

## Tuning per project

The weights above are the defaults. Per-project overrides go in `.pm/state.json` under `whatNowWeights`. For example, a research-heavy project might down-weight `cheapness` and up-weight `impact`; a shipping-pressure project might invert it.

## How to teach it about your project

The two strongest signals it reads are:

1. **The "Next concrete actions" list at the bottom of `MASTER-PLAN.md`.** Keep this short (3 items) and current (update at session close). The recommender weights items on this list.
2. **The decisions log.** When you decide "we're not doing X right now, here's why", log it. The recommender will stop suggesting X. If you don't log the decision, X will keep coming back.
