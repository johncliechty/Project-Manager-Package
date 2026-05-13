# Existing project vs new project

The bootstrap branch. `pm init` does both, but the steps are different.

## New project (no folder, or empty folder)

The interactive bootstrap. The script asks for:

1. **Project name** — used as the directory name and the `name:` field everywhere.
2. **One-paragraph intent** — what is this, in plain words. *Capture the user's actual phrasing*; don't paraphrase it into something more polished. Polished phrasing reads as committee-speak; the user's first words usually have the truth in them.
3. **Target user** — who, specifically. "Engineers" is too broad. "Solo founders trying to manage AI agent projects" is the right grain.
4. **Success criteria** — at least three measurable things. The script rejects "users will love it" and similar.
5. **Known constraints** — time, money, tooling, knowledge. What is not negotiable.
6. **Backup preference** — github / b2 / r2 / defer. Defaults to github.
7. **Daily investor brief** — yes (registers Cowork scheduled task) / no.
8. **GWL project?** — yes (writes `GWLabs.md` and adds the GWL master-plan integration block) / no.

The script then:

- `mkdir`s the standard layout.
- `git init`s.
- Writes templates with `{{PLACEHOLDER}}` substitutions.
- Writes `.pm/state.json` with initial state.
- If GitHub backup chosen and `gh` is installed, runs `pm github-init`.
- Prints a one-line "next" hint pointing the user at `MASTER-PLAN.md`.

The user is now in step 1 of the operating loop (research and proto-plan) — not step 0. The bootstrap captured enough to start.

## Existing project (folder already has stuff)

This is the tricky branch. The agent's first job is *to read*, not to write.

**Step 1: read everything readable.** Specifically:

- All `*.md` files at the root.
- `package.json`, `pyproject.toml`, `Cargo.toml`, `go.mod` — anything that declares dependencies.
- The 10 most-recently-modified files (excluding `.git/`, `node_modules/`, `dist/`, etc.).
- Any `README.md` in subdirectories.

**Step 2: propose a layout as a diff.** Not a writeover. The script writes `pm-init.proposal.md` with three sections:

```markdown
# Bootstrap proposal for <project-name>

## Files I'd add (won't touch your existing files)
- PROJECT.md (new)
- MASTER-PLAN.md (new)
- briefs/ (new directory)
- logs/ (new directory)
- AGENTS.md (new)
- .pm/state.json (new)

## Files I'd reorganize (with your permission)
- existing-notes.md → would move to plans/proto-v1.md
- TODO.txt → would move to MASTER-PLAN.md "Next concrete actions" section

## Files I'd not touch
- src/, tests/, package.json, README.md, .git/

## What I think this project is, based on what I read
<one-paragraph synthesis from the read step>

## What I'd want you to confirm or correct
- The target user is X — is that right?
- The success criteria seem to be Y — what's missing?
- The constraints look like Z — anything else?
```

**Step 3: wait for explicit approval before writing.** The script blocks on `pm init --confirm` with the proposal still on disk. The user reviews, edits the proposal in place if needed, and then re-runs.

**Step 4: apply the proposal.** Same writing pass as the new-project branch, but using the proposal's already-confirmed answers.

## Why the existing-project branch is more cautious

Because the user has put work into the existing folder. Overwriting their notes, mis-shaping their problem statement, or moving files they relied on is a much higher cost than starting from blank. The diff-and-confirm pattern is friction by design — friction that prevents bigger losses than the friction itself costs.

## Common existing-project pitfalls

- **The user has a `PLAN.md` and a `MASTER-PLAN.md` and a `plan-v3.md` lying around.** Treat them as proto-plans (move to `plans/`), not as the master. The new `MASTER-PLAN.md` should synthesize them, not pick one.
- **The user has a `README.md` that's actually the project description.** Read it, and use it to seed `PROJECT.md`. Don't leave the README empty; populate it with a one-screen orientation that points at `PROJECT.md`, `MASTER-PLAN.md`, and `AGENTS.md`.
- **The user has half-built code with no tests.** That's information about *where they are* in the operating loop, not a problem to fix immediately. Note it in the proposal; let them decide whether to add tests now or after the bootstrap.
- **The user has secrets in unencrypted files at the project root.** Stop the bootstrap. Ask them to move secrets to `.env` (gitignored) before continuing. Don't fix it for them; teach them.
