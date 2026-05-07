# Master Plan — {{PROJECT_NAME}}

> **This file is provisional.** It changes as the build teaches you things. Don't treat it as a contract; treat it as the current best understanding.

**Last edited:** {{DATE}}
**Project critique-pass status:** {{CRITIQUE_PASS_GLOBAL}} of 2
**Phase:** {{PHASE}}  *(proto / critiqued / building / integrating / shipping / shipped)*

---

## North star

The single sentence that, if you forget every other detail of this project, you should still remember:

> {{NORTH_STAR}}

## Strategy in one paragraph

{{STRATEGY_PARAGRAPH}}

(A paragraph an investor or a new collaborator could read once and roughly know what we're doing and why.)

---

## Sections

Every section below has a `Status:` line. Allowed values:

- `proto` — first draft, not yet critiqued
- `critiqued-1` — survived one critique pass
- `critiqued-2-final` — survived the bounded second pass; ready to build
- `building` — implementation underway
- `built` — implementation complete and tested
- `dropped` — explicitly decided not to do this; keep here for memory

The skill enforces the bounded-iteration rule: a section cannot go directly from `proto` to `building`. It must pass through `critiqued-1` and `critiqued-2-final`. Pass 3 is refused.

---

### 1. {{SECTION_1_NAME}}

**Status:** proto

**What:** {{SECTION_1_WHAT}}

**Why now:** {{SECTION_1_WHY_NOW}}

**Acceptance test:** {{SECTION_1_TEST}}

**Subplans:**
- [ ] {{SUBPLAN_1_1}}
- [ ] {{SUBPLAN_1_2}}

**Open questions:**
- {{OPEN_Q_1_1}}

---

### 2. {{SECTION_2_NAME}}

**Status:** proto

**What:** ...

(Repeat the structure for each section.)

---

## Decisions log (most recent first)

| Date | Decision | Why | Reversible? |
|---|---|---|---|
| {{DATE}} | Chose to start with X over Y | X has working prior art; Y is a research project | Yes — we can swap if X bottoms out |

(The `logs/decisions/` folder has the full text; this table is the index.)

## What we explicitly are *not* doing

- {{NOT_DOING_1}}

(Anti-goals. When something tempting comes up that we decide to pass on, add it here with the date.)

## Risks we're tracking

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| {{RISK_1}} | M | H | {{MITIGATION_1}} |

---

## Next concrete actions (the "if you only had two hours" list)

In rank order:

1. {{NEXT_1}}
2. {{NEXT_2}}
3. {{NEXT_3}}

This list should be short and updated *every* time you close a session. `pm what-now` reads this; if it's stale, the recommendations will be too.
