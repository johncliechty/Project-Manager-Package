# project-manager-kit

A tool-agnostic AI project-manager skill and CLI. Works with Claude Code, Cursor, Codex, Gemini CLI, Cowork, OpenClaw, or no AI at all.

The kit answers four questions for any software project:

1. **How do I start this?** (interactive bootstrap or absorb an existing folder)
2. **Where am I?** (`pm status`)
3. **What should I do next?** (`pm what-now` — top 3, ranked, with justifications)
4. **Can a non-technical reader understand the project?** (`pm brief` — daily-refreshed investor-readable summary)

The kit is opinionated about *one thing*: the operating loop. It enforces **research → proto-plan → critique (bounded to 2 passes) → decompose → build → log → review**, derived from John Liechty's *AI-Assisted Project Workflow*. The bounded-iteration rule is the discipline; the rest of the kit is plumbing.

**Repo:** [github.com/johncliechty/Project-Manager-Package](https://github.com/johncliechty/Project-Manager-Package)

## Quickstart

```bash
git clone https://github.com/johncliechty/Project-Manager-Package.git project-manager-kit
cd project-manager-kit
npm link                     # makes `pm` available globally (optional)

# In a folder where you want to start a project:
mkdir my-project && cd my-project
pm init                      # interactive bootstrap

# Daily flow:
pm status                    # what's the state
pm what-now                  # what should I do next
pm log "<entry>"             # cheap append
pm brief                     # refresh investor-readable summary

# When ready:
pm github-init               # create a private GitHub repo and push
pm backup b2                 # generate Backblaze B2 rclone config + snapshot script
pm brief --schedule          # register the daily 7 AM brief refresh (Cowork)
pm windows-task install      # also install a Task Scheduler entry (Windows)
```

If you don't want to `npm link`, you can run any subcommand directly:

```bash
node /path/to/project-manager-kit/bin/pm.mjs init
```

## What the kit gives you

A consistent project shape that any agent (or any human) can pick up cold:

```
<your-project>/
├── PROJECT.md              # the problem and the goal (rarely edited)
├── MASTER-PLAN.md          # current plan with section statuses (frequently edited)
├── plans/                  # archived proto-plans, critique transcripts, subplans
├── briefs/                 # investor-readable summary — current + dated archive
├── logs/                   # sessions/, decisions/, critique/
├── code/                   # the actual product
├── data/                   # project data (backed up if configured)
├── skills/                 # project-specific skills (self-contained for collaborators)
├── tools/                  # project-specific helper scripts
├── AGENTS.md               # cross-tool orientation (lingua franca)
├── CLAUDE.md, GEMINI.md    # tool-specific orientation layered on AGENTS.md
├── .pm/                    # state.json, critique-passes.json, routing.yaml
└── .git/
```

Every file in this layout has a job. The skill writes the layout so you don't have to think about it; you just write the *content*.

## The operating loop

This is the spine. Every project goes through:

1. **Research and proto-plan.** Enough prior research to understand the topic. Define goals. Sketch a proto-plan. Rough is fine.
2. **Stress-test with critique.** Ask the agent to *attack* the plan, not validate it. Vary the *prompt angle* (security perspective, frustrated user, operator on call) more than the *model*.
3. **Iterate, but bounded.** Revise. One more pass. **Stop after two passes**, even if the plan still feels imperfect. The skill enforces this — pass 3 is refused with an explanation.
4. **Decompose into subplans.** Each subpart runs the same loop.
5. **Build, treating the plan as provisional.** Update the plan as you build; don't treat it as a form to be filled in.
6. **Test each part.** Then test the seams between parts — most failures live there.

Why bounded iteration? Because AI will happily generate plausible-sounding new blindspots forever. That's a planning trap. A polished plan is not the goal; a working project is.

The full discipline is in [`references/operating-loop.md`](references/operating-loop.md).

## What the kit explicitly does *not* do

- **Doesn't create accounts on your behalf** (GitHub, Backblaze, Cloudflare). You do that.
- **Doesn't ask for credentials in chat.** Credentials go in `.env` (gitignored) or the provider's config file.
- **Doesn't push to a remote without your invocation.** `pm github-init` runs once; after that, `git push` is on you.
- **Doesn't pick *for* you.** `pm what-now` returns three options with justifications; you choose.
- **Doesn't enforce a third critique pass.** Two is two.

## Backup paths

The kit ships configs for three. Pick one or more per project; `pm init` asks during bootstrap.

| Path | What it protects | Cost | Best when |
|---|---|---|---|
| Local git + GitHub | Code, history, collaboration | Free for individuals | Always — this is the default |
| Backblaze B2 | `data/` and large artifacts | ~$6/TB-month, $0.01/GB egress | Cheapest at scale; mostly write-once |
| Cloudflare R2 | `data/` and large artifacts | ~$15/TB-month, **zero egress** | Pulling data out frequently |

Full tradeoffs and the OneDrive caveat are in [`references/backup-options.md`](references/backup-options.md).

## Daily investor brief

`pm brief` regenerates `briefs/investor-brief-current.md` from current project state — `PROJECT.md`, `MASTER-PLAN.md`, last 7 days of session logs, last 14 days of decisions. The script is *deterministic* (no LLM calls); its job is to keep the *facts* current. Polish-passes for voice are best done by an agent or by you, after.

To run it daily:

- **Cowork** (default): `pm brief --schedule` registers a 7 AM Cowork scheduled task.
- **Windows unattended**: `pm windows-task install` registers a Task Scheduler entry.
- **Mac/Linux unattended**: `pm brief --schedule --cron` prints the crontab line.

## Operating with an AI agent

The kit's `SKILL.md` is the front of the agent's view. Drop the kit into:

- **Claude Code**: junction or copy `project-manager-kit/` into `.claude/skills/project-manager/` at your project root, or a global skills folder.
- **Cursor**: same — Cursor reads from `.claude/skills/` if it's there.
- **Codex**: install the kit globally, point Codex at `bin/pm.mjs` for tool calls.
- **Gemini CLI**: junction into `.gemini/skills/project-manager/`.
- **Cowork**: drop the `.skill` zip (built via `npm run package-skill`) into your skills folder.
- **OpenClaw**: copy as real files into `~/.openclaw/skills/project-manager/` (junctions are rejected — see `INTEGRATION.md`).
- **No AI**: just use the `pm` CLI directly. The discipline doesn't require an agent; the agent makes the discipline cheaper to follow.

## Sharing a project

A project bootstrapped with this kit is portable: anyone who clones it can read `AGENTS.md` and be oriented in two minutes. The kit's per-project `skills/` mirror means a collaborator who doesn't have the global skill installed still has the project-specific skills the project actually uses.

## Ghost World Labs integration

If you're inside the GWL Agentic Sandbox at `C:\dev\Agentic-Home`, see `INTEGRATION.md` — it covers the symlink-escape rule, the `routing.json` registration, and the canonical PSU master skill repo location.

## License

MIT. See `LICENSE`.

## Contributing

This kit is opinionated. Pull requests that change the operating loop should be argued for in an issue first. Pull requests that fix bugs, add cross-platform support, or improve the templates are welcome.
