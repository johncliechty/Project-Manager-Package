---
name: host-setup-preflight
kind: reference
title: "Host Setup Preflight — set up the bridge + GitHub at project start"
parent: project-manager
description: "The shared startup routine that BOTH /project-manager and /anchor-coach run on the first turn in a project: get a host-execution channel (the claude-code-bridge) and GitHub set up ONCE, up front, so every commit and push for the rest of the project is silent. One dead-easy setup at the start, then zero cut-and-paste forever after. Includes a graceful local-only fallback so setup never becomes a wall."
---

# Host Setup Preflight

Both `/project-manager` and `/anchor-coach` run this on the first turn in a new
project (and re-check quickly on later turns). The goal is deliberate: **set up
version control and GitHub at the start of every project** — it's a habit worth
building — and pay the host-setup cost **once**, in the dead-easiest way a sandbox
allows, so the rest of the project is silent.

## Reliability contract (read this first)

**The student's success never depends on the bridge or GitHub.** Everything the
curriculum actually teaches and builds -- M0 through M5 and L7 -- runs entirely
inside Cowork with no host access: files are written with your file tools, and
version history is kept by `bin/anchor-git.sh` (git database in `/tmp`, work-tree
the project folder, history persisted as a bundle in `.project-manager/`). That
path is host-free and is the thing that must always work.

The bridge + GitHub are a **best-effort enhancement**, attempted at the start
because backing a project up on day one is a good habit -- but they are *never on
the critical path*:

- **Fast-fail.** When you call the bridge during setup, pass a short timeout
  (~15s on the `run_command` tool). If it doesn't answer quickly, errors, or the
  student declines, treat it as unavailable **immediately** -- do not wait on it,
  do not retry more than once. A flaky headless daemon must never make the student
  watch a spinner.
- **Instant, invisible fallback.** On any bridge/GitHub hiccup, set
  `host.bridgeReady=false` in `state.json`, switch to local-only version control
  via `anchor-git.sh`, and continue the lesson without comment. The student must
  never see a stall or a setup error -- that is system housekeeping (STYLE.md).
- **Offer again later, cheaply.** GitHub can be turned on at any later milestone
  (or at L6) in one step if the bridge becomes available. Local-only is a complete,
  valid way to finish the entire course.

The rule: **two minutes to Lesson 1, every time, on every machine -- guaranteed.**
GitHub is a bonus that never costs the student the curriculum.

## The principle: one setup, then silent

A sandboxed agent (Cowork) cannot install a host daemon by itself, so the *first*
time on a given machine there is exactly one out-of-chat action. After that the
bridge is installed and **every later project on that machine is zero-touch.** The
one action is a **double-click**, not a paste (see step 1), to honour "no
cut-and-paste."

## Detect your runtime first

Run `pwd`. If the path looks like `/sessions/<id>/mnt/...` you're a **sandboxed
coach** and need the bridge for host operations. If it's native (`C:\Users\...`,
`/Users/...`) you're **on the host** — skip the bridge entirely; you already have
git/gh; jump to "On the host" at the bottom.

Then read `host.*` from `.project-manager/state.json`. If `host.bridgeReady` and
`host.githubReady` are already true (set on a previous session/project), skip the
checks and go straight to work — this is what makes every project after the first
zero-touch.

## Preflight state machine (sandboxed coach, first time)

**1. Is the bridge installed and reachable?**
   - It's live if the MCP tool `mcp__Claude_Code_Bridge__run_command` is available,
     OR the bridge folder is mounted and a ping round-trips (see `sandbox-and-git.md`
     and the bridge's `IPC-PROTOCOL.md`).
   - **If not installed:** drop the installer into the project folder for a
     double-click — copy `plugins/use-claude-code/skills/use-claude-code/Install-Bridge.bat`
     into the student's project folder with your file tools, then say, in one
     sentence: *"Double-click `Install-Bridge.bat` in your project folder to set up
     the helper that lets me run things on your computer — about a minute. If Windows
     shows a blue 'protected your PC' box, click **More info -> Run anyway**."* That
     double-click is the entire out-of-chat cost. **Fallback** if the double-click is
     blocked or the student prefers: have them open PowerShell (**Win+X**, then **T**)
     and paste the one line in *The one-time installer* below.
   - **After it runs:** bring the bridge into this session — call
     `mcp__cowork__request_cowork_directory` with `C:\dev\claude-code-bridge`
     (macOS/Linux: `~/dev/claude-code-bridge`) — and confirm with a ping or by checking
     the MCP tool is present.

**2. Is GitHub ready?** (via the bridge / host shell)
   - `gh --version` — if missing, install it (`winget install GitHub.cli`).
   - `gh auth status` — if not authenticated, run `gh auth login --web`. The student
     approves once in the browser (device-code flow; no tokens to paste or leak).

**3. Create the project's repo at the start (the habit).**
   - If the project has no `origin` remote, create one now:
     `gh repo create <name> --private --source <project-path> --remote origin --push`
     (use `--public` if the student wants it public from the start). Make the first
     commit if the tree is empty of history.
   - **Narrate it as the habit, briefly:** *"First thing on any project — give it a
     home on GitHub so your work is backed up from day one. Done: <repo-url>."* This
     is the one place host setup is shown to the student, because it's teaching the
     habit; everything else stays silent.

**4. Record state** in `.project-manager/state.json` so later runs are no-ops:
   `host.bridgeReady`, `host.githubReady`, `host.repoUrl`, `host.checkedAt` (ISO).

## Degraded mode — never let setup become a wall

If the student declines the install, it fails, or they're offline: **do not block.**
Fall back to local-only version control (Anchor: `bin/anchor-git.sh`; see
`sandbox-and-git.md`), set `host.bridgeReady=false`, and continue. Mention once that
GitHub can be turned on later in one step, then move on. Losing a student at setup is
worse than a project that starts local-only. The habit is the default; the wall is not.

## The one-time installer

`Install-Bridge.bat` (dropped into the project folder for a double-click) runs the
bridge bootstrap. If a double-click is blocked, the equivalent paste — into an
already-open PowerShell, which avoids the Smart App Control child-process block — is:

```
[Net.ServicePointManager]::SecurityProtocol='Tls12'; iex (iwr -useb 'https://raw.githubusercontent.com/johncliechty/claude-code-bridge/main/bootstrap.ps1').Content
```

The bootstrap auto-installs Python and git if missing, clones the bridge to
`C:\dev\claude-code-bridge`, and registers the background daemon.

## Why the bridge can run git/gh now

The bridge daemon launches from a Windows Scheduled Task with a heavily stripped
environment (observed: `PATHEXT=.CPL`, no git on PATH). The daemon repairs this at
startup in `bridge/shell.py` — it prepends standard tool dirs to PATH and restores a
sane `PATHEXT` — so `git`/`gh` resolve for every command it runs. **If a student's
bridge predates that fix** and you see *"git is not recognized"* through the bridge,
the fix is: `git pull` in `C:\dev\claude-code-bridge` and re-run the installer.

## On the host (not sandboxed)

You have native git/gh — no bridge needed. Still do the habit: ensure `gh` is
installed and authenticated, and `gh repo create` the project at the start. Record the
same `host.*` state.
