---
name: use-claude-code
description: Delegate host-side tasks (Windows/Mac/Linux native operations) to Claude Code running on the user's actual machine. Use whenever you're operating in a sandboxed agent runtime (Cowork's Linux sandbox, or any agent without host-shell access) and need to do something that requires execution on the user's real box — installing software via winget/brew/apt, running git operations that need host credentials, admin-elevated PowerShell, Windows-specific commands, or anything else that can't run inside the sandbox.
---

# Use Claude Code

You are operating in a sandboxed agent runtime — most often Cowork — whose shell access is isolated from the user's host machine. You can read and write files in mounted folders, but you cannot execute commands on the host directly.

The user has **Claude Code installed and authenticated** on their host. It runs natively on their Windows / Mac / Linux box and has direct shell access — it can run PowerShell, install software, repair git state that needs credentials, run admin-elevated commands, anything host-native.

**This skill is the bridge between the two.** When you hit a host-side task, you delegate to Claude Code via a paste-once handoff. The user pastes one prompt into their Claude Code terminal; Claude Code does the work; the user reports back; you continue from where you left off. One paste, not ten typed commands.

## When this skill applies — and when it doesn't

**Apply this skill when** you are running in a sandboxed runtime that lacks host-shell access. Cowork is the canonical case — its `bash` tool runs in an isolated Linux sandbox, which means installs, host credentials, admin operations, and Windows-specific commands are off-limits unless delegated.

**Skip this skill when** your runtime already has host-shell access. Claude Code running on the host, Gemini CLI running on the host, Cursor running on the host — all of these can execute commands on the user's real machine directly. In those runtimes, just execute (per the Real-Intent Protocol's *Run, don't narrate* rule). There's no sandbox to bridge.

In other words: **this skill activates the delegation pattern only when needed.** If you can already run the command yourself, do that.

## How to detect your runtime

If you're unsure whether you're in a sandboxed runtime, introspect your current working directory:

- **You're in Cowork's sandbox** if your working path looks like `/sessions/<session-id>/mnt/<folder-name>/...`. Folders the user mounted appear under `/sessions/.../mnt/`. Your `bash` tool runs Linux even when the user is on Windows. **Apply this skill** for host operations.
- **You're on the host** if your working path is native — `C:\Users\<name>\...` or `C:\dev\...` on Windows, `/Users/<name>/...` on Mac, `/home/<name>/...` on Linux. Your shell is the user's actual shell. **Skip this skill; execute directly.**
- **One quick check:** run `pwd` (or read the working directory from your environment). The path tells you which side of the fence you're on.

If you're still uncertain after introspection — e.g., a runtime that mounts paths differently — assume sandbox and apply the skill. The cost of unneeded delegation (one extra paste for the user) is much lower than the cost of narrating commands the user has to type.

## Detect Claude Code at session start — turn-one posture

The Real-Intent Protocol's spine is *be the project manager who does things the user would want done, comes back, and tells them what was done.* For a sandboxed agent, that posture means knowing on **turn one** whether host operations will be available — so the project plan either proceeds with them assumed, or pauses up front to set them up. Discovering Claude Code's status piecemeal at each host operation is the wrong shape: it produces per-operation friction every time, instead of one one-time setup.

**On your very first turn in any sandboxed session that will involve host operations** (curriculum work, project bootstrapping, anything beyond pure conversation), check whether Claude Code is installed and authenticated on the user's host. Two ways:

1. **Direct test.** Write a minimal Claude Code test prompt and inform the user. *"Quick check on your setup — paste this into your Claude Code terminal: `claude --version`. Let me know what it reports."* If they reply with a version string, Claude Code is set up. If they reply *"I don't have Claude Code"* or *"`claude` isn't recognized"* or similar, it isn't.

2. **Memory-of-environment.** If you've verified Claude Code in a prior session (a note in `.project-manager/state.json` under `host.claudeCodeVerified` or equivalent), skip the test on subsequent sessions. Re-verify only if the state-file says it's stale or unset.

### If Claude Code is set up

Proceed normally. Note the fact in `state.json` so future sessions don't re-test. Host operations as they come up get delegated via this skill.

### If Claude Code is NOT set up

**Walk the user through the install before any other work begins.** Even if the curriculum lesson at hand doesn't immediately need a host operation, the install is a one-time setup that unblocks everything downstream — better to do it once at the start of the session than to hit friction at every later operation.

The walkthrough:

1. **Check Node.js first** (Claude Code needs it). Have the user run `node --version` in PowerShell or Terminal. If they get a version, jump to step 3.
2. **If Node.js is missing**, install it:
   - **Windows:** `winget install OpenJS.NodeJS` from PowerShell (or the installer at `nodejs.org` for users who'd rather click).
   - **Mac:** `brew install node` from Terminal (or the installer at `nodejs.org`).
3. **Install Claude Code globally:** `npm install -g @anthropic-ai/claude-code`. ~30 seconds.
4. **Launch and sign in:** Have the user open a new terminal tab and run `claude`. It will prompt for sign-in — they use their Anthropic account (the same one that authenticates Cowork). Sign-in is browser-based; takes about a minute including account creation if needed.
5. **Verify** with `claude --version` and have the user paste the version string back.
6. **Record** the verification in `.project-manager/state.json` under `host.claudeCodeVerified: true` (with a timestamp) so future sessions don't re-test.
7. **Report ready** and proceed with the curriculum / project work.

Total time: ~5 minutes for a true first-timer, near-zero on subsequent sessions thanks to the state-file memo.

### Why this comes first

Every host operation in the session — installing tools at M0 or L6, running git that needs credentials, anything admin, anything requiring the host's actual environment — depends on Claude Code being available. Setting it up at turn one means the rest of the session proceeds without per-operation friction. Setting it up just-in-time means the user hits friction every time a host operation comes up, AND the agent has to interrupt its train of thought to handle the install dance. The setup-protocol-at-session-level is just the Setup Protocol applied one layer up — the same posture (detect → inform → execute → verify → report ready), with the *session* itself as the project being bootstrapped.

This is the difference between a coach that delivers a smooth two-hour experience and one that punctuates every lesson with installation interruptions. Pay the five-minute setup cost once.

## What the student needs (the Claude Code prereq)

**Claude Code is a separate install** from the Claude desktop app and from Cowork. The Claude desktop app (which includes Cowork mode) is at [`claude.com/download`](https://claude.com/download). **Claude Code** is a separate CLI tool installed independently — typically `npm install -g @anthropic-ai/claude-code` (requires Node.js) or via the installer at [`claude.com/code`](https://claude.com/code). They share Anthropic account authentication but install separately.

For the Anchor curriculum specifically, **Claude Code is NOT required to start.** M0 through L5 run fine in Cowork alone — file edits, planning, conversation, Linux-sandbox git operations on mounted folders. The delegation pattern only matters at L6 (the ship step, where `gh` install and `gh auth login` happen on the host).

**At L6, the student has four paths:**

1. **Preferred path — student already has Claude Code installed and authenticated.** Coach delegates the L6 install + auth via this skill. About 3 minutes total, one paste from the student.

2. **Just-in-time install path — student doesn't have Claude Code but installs it at L6.** Coach offers a one-paragraph walkthrough: install Node.js (~2 minutes via `winget install OpenJS.NodeJS` on Windows or `brew install node` on Mac), then `npm install -g @anthropic-ai/claude-code`, then `claude` to sign in. ~5 minutes total for the Claude Code install plus the gh install via delegation. After this, delegation works for L6 and everything that follows.

3. **No-Claude-Code path — student doesn't want to install Claude Code.** Coach falls back to the old paste-into-PowerShell narration for the L6 install. Less smooth, but still works. The narration should still be coach-driven (clearly numbered steps, full commands, expected outputs) — not a vague gesture in the right direction.

4. **Skip-GitHub-entirely path — student doesn't want GitHub at all.** Coach closes L6 with a local-only "shipped" state and moves to L7. Curriculum's main thread (L1–L5 + L7) still works without the public-publish step.

The coach discovers which path applies just-in-time, at the first L6 host operation: it tries delegation, and the student's response tells the coach whether Claude Code is set up. The coach adapts to whatever the student reports.

## When to delegate (within a sandboxed runtime)

**Delegate to Claude Code when:**

- A tool needs to be installed on the host (`winget install`, `brew install`, `apt install`, official installers).
- A git operation requires host credentials (push to a private remote with the host's credential manager, `gh auth login`'s device-code flow, signed commits).
- An admin-elevated command is needed (UAC on Windows, `sudo` on Mac/Linux).
- A Windows-specific operation that the Linux sandbox can't perform (`Remove-Item` against a locked file, PowerShell modules, registry edits, Windows Task Scheduler).
- Anything that needs the host's actual environment (real PATH, real credentials, real file locks, real network identity).

**Do NOT delegate when:**

- The work is editing files in a mounted folder — do it in your own session with Read/Write/Edit. Don't make Claude Code do file edits you can do yourself.
- The work runs fine in the sandbox (Linux `git` operations on mounted folders, `cat`/`grep`/`find`, `cp`/`mv` within mounts — all of these work in-sandbox).
- The work is reading something to inform your next step — read the file directly, don't loop in Claude Code for that.

The rule: **stay in your own session for file work; delegate only when the host is genuinely required.**

## The delegation pattern

1. **Identify the host-side task** and what success looks like. Be specific.

2. **Write one complete prompt** the user will paste into their Claude Code terminal. The prompt must:

   - Specify the working directory as an absolute Windows / Mac / Linux path.
   - State what to do in plain English, one or two sentences per step.
   - Specify an explicit verify step (what command confirms success, what output you expect).
   - Ask Claude Code to report back with the verify output and any errors.
   - If admin elevation is needed, name it so Claude Code knows to use `Start-Process -Verb RunAs` or `sudo` — and ask Claude Code to confirm with the user once before running elevated.

3. **Inform the user; don't ask permission.** Per the Real-Intent Protocol, delegation for an obviously-in-scope host operation is just the next step. *"Need to install gh on your host. Paste this into your Claude Code terminal:"* — then the prompt block. The user pastes; they don't authorize a delegation pattern they already know about.

4. **Wait for the user to report back.** Usually it's brief — *"done"*, or Claude Code's verify output pasted in. If Claude Code surfaced an error, the user pastes that and you diagnose.

5. **Proceed.** The host state is now known to be ready. Continue your work in your own (Cowork) session.

## Prompt template for Claude Code

```
In `<absolute-path-to-project>`, please do the following:

1. <step 1 in plain English>
2. <step 2 in plain English>
3. Verify by running `<verify command>` and report its output.

If any step needs admin elevation, name it and ask me once before running elevated. Otherwise just do it and report back. If anything errors, paste the full error.
```

### Two worked examples

**Example 1 — install gh on Windows.**

```
In `C:\dev\Project-Manager`, please install the GitHub CLI on this Windows host.

1. Run `winget install GitHub.cli`.
2. Once it completes, run `gh --version` to verify the install.
3. Report back with the gh version and any messages from the install.

If the winget command needs admin elevation, surface that once before running. Otherwise proceed.
```

**Example 2 — repair a corrupt git index after a sandbox file copy.**

```
In `C:\dev\Project-Manager`, please repair the git index that came across corrupted during a folder copy from the Cowork sandbox.

1. Run `Remove-Item .git\index.lock -Force -ErrorAction SilentlyContinue` (it's OK if the lock file is already gone).
2. Run `git read-tree HEAD` to rebuild the index from HEAD.
3. Verify with `git status` and report what it shows. We expect a clean working tree matching the current HEAD.

If `git status` shows anything other than clean-or-known-staged-changes, paste the full output so we can diagnose.
```

## Why this skill exists

Cowork's `bash` runs in a Linux sandbox intentionally isolated from the user's host machine — that's a deliberate security boundary. Most file work doesn't need to cross that boundary because folders are mounted in, but software installs, host credentials, admin operations, and Windows-specific commands do. Until Cowork ships a native host-shell tool (an MCP server in the registry, or a built-in primitive), Claude Code is the cleanest bridge: same authentication on the user's account, same agent intelligence, native host execution. The paste-once handshake is the minimum-friction shape.

## When this skill becomes obsolete

When Cowork exposes a native host-shell tool — whether through an official MCP integration, a community MCP server (`mcp-server-shell` or similar) installed on the user's box, or a Cowork built-in — the delegation pattern collapses to direct execution and this skill stops being needed. Until then, lean on it whenever the sandbox boundary blocks you.

## One-line summary for the coach

When you're in a sandbox and the host is needed: write the Claude Code prompt, tell the user to paste it, wait for the brief report, continue. Inform — don't ask. The user pastes once; you don't make them type ten commands.
