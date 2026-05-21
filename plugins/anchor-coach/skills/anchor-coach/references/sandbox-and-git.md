---
name: anchor-coach-sandbox-and-git
kind: reference
title: "Sandbox & Git — Read First If You Are a Sandboxed Coach"
parent: anchor-coach
description: "The one operating manual the Anchor Coach reads before touching files or git when it is running in a sandboxed runtime (Cowork's Linux sandbox is the canonical case). Explains why git cannot run inside the mounted project folder, and the exact, validated recipe for cloning the curriculum, scaffolding the project, and committing — with no host access, no bridge, and no terminal paste from the student."
---

# Sandbox & Git — the coach's operating manual

Read this on your first turn in any session **before** you run a single file or git
operation. It is short on purpose. Everything here was verified empirically against
the current Cowork build; it is not theory.

## Are you sandboxed? (10-second check)

Run `pwd` (or look at your working path).

- **Sandboxed** if the path looks like `/sessions/<id>/mnt/<folder>/...`. Your `bash`
  tool is Linux even though the student is on Windows or Mac. The student's project
  folder is a **mounted host folder**, not a normal Linux directory. **This whole file
  applies to you.**
- **On the host** if the path is native (`C:\Users\...`, `/Users/...`, `/home/...`).
  Your shell is the student's real shell; git works normally. **Skip this file** — just
  run git directly, the normal way.

If unsure, assume sandboxed. The cost of being wrong is zero; the cost of assuming
host-access you don't have is a corrupted folder (see below).

## The one fact that governs everything

**You cannot run `git` inside the mounted project folder, and you cannot delete files
in it.** The mount (virtiofs) allows creating, writing, renaming, and overwriting
files, but it **refuses `unlink`** (the syscall behind delete and behind git's
lock-file dance). Concretely, on the mount:

| Operation | Works? |
|---|---|
| Create a new file / directory | YES |
| Write / overwrite a file (truncate-in-place, `cp`, `>` redirect) | YES |
| Rename a file | YES |
| **Delete / `rm` a file** | **NO — "Operation not permitted"** |
| **`git init` / `git clone` / `git commit` inside the folder** | **NO — corrupts `.git`** |

Why git breaks: git writes `config.lock`, then renames/unlinks it; the mount can't
complete that, so `.git/config` lands empty and the repo is dead on arrival. Worse, a
half-written `.git` directory **cannot be removed from the sandbox** — it becomes a
permanent broken stub that poisons the folder. This is the exact failure that has
stalled real students at M0. **Granting delete permission does not fix it** — git's
rename/lock protocol is still incompatible with the mount.

## The three rules

1. **Never run `git` inside the project folder. Never `git clone` into it.** Not to
   set it up, not to commit, not to check status. If you catch yourself typing
   `git ...` with the project folder as the working directory, stop.

2. **Get the curriculum into `/tmp`, not the mount.** `/tmp` is sandbox-local; git
   works there perfectly and fast (~2s shallow clone).

3. **Do version control through `bin/anchor-git.sh`** (in the curriculum clone). It
   keeps the git database in `/tmp` and the work-tree on the mount, and persists
   history as a single bundle file the mount *can* hold. No host, no bridge, no
   delete permission, no terminal paste.

And the behavioral rule from `STYLE.md`: **none of this is ever shown to the student.**
System setup is coach-facing only. The student writes prose and prompts; they never
see "I'm cloning to /tmp because the mount can't do git."

## The bootstrap recipe (first turn in a new project folder)

```bash
# 1. Get the curriculum into a sandbox-local temp dir (NOT the project folder).
SRC=/tmp/anchor-coach-src
rm -rf "$SRC" 2>/dev/null
git clone --depth 1 https://github.com/johncliechty/Project-Manager-Package "$SRC"
#    Offline fallback: if the clone fails and a cached copy exists at
#    <project>/.project-manager/.curriculum-cache/, read from there instead.

# 2. Read the skill + this file + STYLE.md from $SRC, then run M0.
#    SKILL.md is at:
#    $SRC/plugins/anchor-coach/skills/anchor-coach/SKILL.md
```

Then, using your **file tools** (Read/Write/Edit — they write to the host directly and
*can* create files in the project folder):

3. Write the project scaffolding into the project folder: `.project-manager/state.json`,
   `.project-manager/config.yaml`, `.project-manager/prompts.md` (header line), a one-line
   `README.md`, and a `.gitignore` that includes `.project-manager/history.bundle`,
   `.project-manager/*.bundle`, and `.project-manager/.curriculum-cache/`.

4. Write `CLAUDE.md` in the project folder (re-bootstrap pointer — see SKILL.md
   *First-turn-ever bootstrap* for the exact template). It must NOT hard-code an
   absolute clone path; it tells future sessions to re-clone the curriculum to `/tmp`.

5. (Optional, recommended) Initialise version control silently:
   `bash "$SRC/.../bin/anchor-git.sh" init "<project-folder>"`. You do NOT have to
   commit at M0; the first commit can wait for M1's gate.

That's M0. No terminal, no installs, no GitHub, no bridge. M0 closes in ~2–3 minutes.

## Committing at each milestone (M1+)

**Primary path -- if the bridge is live** (`host.bridgeReady` in `state.json`, set up at
M0 by the host-setup preflight): commit AND push via the bridge using real host git --
`git -C "<project>" add -A`, `git -C "<project>" commit -m "..."`, `git -C "<project>" push`
-- so the student's work is backed up to their GitHub repo at every milestone. The bridge
runs git on the host (not through the mount), so this just works.

**Fallback path -- local-only (no bridge).** When `host.bridgeReady` is false, keep history
locally with `anchor-git.sh`. Whenever a milestone gate passes and you'd normally
`git commit`, run instead:

```bash
bash "<curriculum-clone>/plugins/anchor-coach/skills/anchor-coach/../../../../bin/anchor-git.sh" \
     commit "<project-folder>" "M1: brief written"
```

(Resolve the real path to `bin/anchor-git.sh` inside your `/tmp` curriculum clone.)
It stages everything, commits to the `/tmp` git database, and refreshes
`<project>/.project-manager/history.bundle` so the history survives into the next
session. `anchor-git.sh log <project-folder>` shows the history; `init` restores it
from the bundle automatically at the start of each new session. This satisfies every
milestone rubric's "Nth git commit has happened" box without ever touching git on the
mount.

## Keeping the curriculum fresh

Because step 1 re-clones to `/tmp` at the start of every session, the curriculum is
**auto-updated** every session for free — there is no `git pull` on the mount to fail.
If a session is offline and the `/tmp` clone fails, fall back to the cached copy under
`<project>/.project-manager/.curriculum-cache/` (write one there on the first
successful clone if you want belt-and-suspenders offline support).

## Host operations (bridge + GitHub) -- set up at the start

Anchor now sets up the host-execution channel and GitHub *at the start of the project*
(M0), not at the end -- doing it on day one is a deliberate habit, and the bridge makes
it silent thereafter. Run the shared preflight in
`plugins/project-manager/skills/project-manager/references/host-setup.md`. In short: if
the bridge isn't installed, drop `Install-Bridge.bat` into the project folder for a
one-time double-click (no cut-and-paste), mount the bridge, set up `gh auth login --web`,
and create the project's GitHub repo at the start. Every later commit and push is then a
silent host git operation via the bridge (the bridge runs git on the host in the project
folder by absolute path -- never through the mount).

**`anchor-git.sh` is the no-bridge fallback.** If the student declines the install, it
fails, or they're offline, do NOT block: use `bin/anchor-git.sh` for local-only version
control (history in `.project-manager/history.bundle`) and offer to turn on GitHub later
in one step. With the bridge live, prefer real host git + push; without it, `anchor-git.sh`
keeps the history locally until the bridge is set up.

## If you ever leave un-deletable junk in the project folder

If a stray `git` attempt (or any `rm` failure) left files you can't remove and they're
genuinely in the way, call `mcp__cowork__allow_cowork_file_delete` with the path — the
student gets a one-click approval and deletes are then enabled for that folder. Use this
sparingly and silently; prevention (never running git on the mount) is the real fix.
