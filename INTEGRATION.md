# Integration — Ghost World Labs

How the `project-manager-kit` integrates into the GWL Agentic Sandbox at `C:\dev\Agentic-Home\`. This file is GWL-specific; collaborators outside GWL can ignore it.

## Source-of-truth and propagation

The **canonical source-of-truth** for the skill is this very repo:

```
C:\dev\Agentic-Home\project-manager-kit\
```

It propagates into three places:

```
C:\dev\Agentic-Home\project-manager-kit\          ← canonical (this repo)
        │
        ├── (copy) PSU master skill repo:
        │     C:\Users\jcl12\OneDrive - The Pennsylvania State University\
        │       Research\AI Skill Repo\Agent Review\skills\project-manager\
        │
        ├── (copy) OpenClaw runtime skills:
        │     ~/.openclaw/skills/project-manager/   (real files — junctions rejected)
        │
        └── (junction) Tool-side skill folders:
              C:\dev\Agentic-Home\.claude\skills\project-manager   (junction → master)
              C:\dev\Agentic-Home\.gemini\skills\project-manager   (junction → master)
```

The `Bootstrap-Agentic-Home.ps1` script at the workspace root is the propagator. It already enforces:

- `~/.openclaw/skills/` gets **real-file copies** (OpenClaw rejects symlinks/junctions with `reason=symlink-escape`).
- `.claude/skills/` and `.gemini/skills/` get **junctions** to the master.
- Master files have any UTF-8 BOM stripped before propagation (OpenClaw's frontmatter parser doesn't tolerate `EF BB BF` at byte 0).

To add `project-manager` to that propagation, the bootstrap needs one new step. See "Bootstrap step" below.

## Bootstrap step (for `Bootstrap-Agentic-Home.ps1`)

Add this block after the existing skill propagation logic:

```powershell
# project-manager skill propagation (added 2026-05-07)
# Source-of-truth: C:\dev\Agentic-Home\project-manager-kit
# Master copy: PSU OneDrive skill repo
# Live copy: ~/.openclaw/skills/project-manager (real files)

$pmKitRoot = Join-Path $WorkspaceRoot "project-manager-kit"
$pmMasterDest = Join-Path $env:AGENTIC_SKILL_REPO "project-manager"
$pmOpenClawDest = Join-Path $env:USERPROFILE ".openclaw/skills/project-manager"

if (Test-Path $pmKitRoot) {
  # Copy SKILL.md + references + templates + bin into master skill repo
  Write-Host "Propagating project-manager skill..."
  $skillFiles = @(
    "SKILL.md",
    "references",
    "templates",
    "bin"
  )
  if (Test-Path $pmMasterDest) { Remove-Item $pmMasterDest -Recurse -Force }
  New-Item -ItemType Directory -Path $pmMasterDest -Force | Out-Null
  foreach ($f in $skillFiles) {
    $src = Join-Path $pmKitRoot $f
    if (Test-Path $src) {
      Copy-Item -Path $src -Destination $pmMasterDest -Recurse -Force
    }
  }
  # Strip BOM from SKILL.md (OpenClaw parser cannot tolerate it)
  $skillMd = Join-Path $pmMasterDest "SKILL.md"
  $content = [System.IO.File]::ReadAllText($skillMd)
  [System.IO.File]::WriteAllText($skillMd, $content, [System.Text.UTF8Encoding]::new($false))

  # Real-file copy into OpenClaw
  if (Test-Path $pmOpenClawDest) { Remove-Item $pmOpenClawDest -Recurse -Force }
  Copy-Item -Path $pmMasterDest -Destination $pmOpenClawDest -Recurse -Force
  Write-Host "  ✓ project-manager → $pmMasterDest (master)"
  Write-Host "  ✓ project-manager → $pmOpenClawDest (OpenClaw real-file copy)"
}
```

After re-running `Bootstrap-Agentic-Home.ps1`, verify:

```powershell
openclaw skills check | Select-String "project-manager"
# expect: project-manager: eligible

ls C:\dev\Agentic-Home\.claude\skills\project-manager
# expect: contents (junction resolves to master)

(Get-Content "$env:USERPROFILE\.openclaw\skills\project-manager\SKILL.md")[0..2]
# expect: starts with "---" (no BOM, no junction)
```

## Persona declaration

Make the skill available to specific GWL agents by adding it to their persona YAML frontmatter at `Sandbox Setup Package/PERSONAS/global/<id>-personal-manager.md`. For Alpha:

```yaml
---
name: alpha
provider: google
model: gemini-2.5-flash
brain: PVB
skills:
  - deep-think
  - deep-research
  - expert-coder
  - agent-builder
  - curriculum-builder
  - project-manager      # ← add this line
---
```

`agent-chat.js` reads this list at session start and ensures the skill is present before accepting input. After editing the persona, no restart is needed — the next turn picks it up.

For `prime-coder`, the same line addition works.

## Master Plan v4 entry

Add to `Master Plan v4` under "Recently completed":

```markdown
- 2026-05-07: project-manager-kit shipped at C:\dev\Agentic-Home\project-manager-kit\.
  Tool-agnostic skill + CLI + standalone repo. Enforces the bounded-iteration
  operating loop from John's AI Workflow PDF. Daily investor brief refresh
  via Cowork scheduled task (`pm brief --schedule`). Bootstrap propagation
  block needs to be added to Bootstrap-Agentic-Home.ps1 (see
  project-manager-kit/INTEGRATION.md). Active in Alpha + prime-coder personas
  via the skills: list.
```

And add a new entry to "Active Skills (in master repo)" in CLAUDE.md/GEMINI.md:

```markdown
- **project-manager**: Set up, organize, and operate software projects from
  intent to investor-ready summary. Enforces the bounded-iteration operating
  loop. Provides `pm` CLI for status/what-now/log/brief. Integrates with
  Backblaze B2, Cloudflare R2, and GitHub for backup.
```

## API-key contract reminder

The same rule from the workspace `CLAUDE.md` applies:

- The user's interactive Cowork/Claude Code session uses the subscription. **No API key.**
- Agents launched **inside** a project that the project-manager skill manages spend API budget from `.env`.

The kit's scripts themselves never call an LLM — they're deterministic plumbing. Agents using the skill *do* spend, but that's the agent's spend, not the skill's.

## What the kit does *not* assume about GWL

- It does not assume OpenClaw is installed (the kit works fine without it).
- It does not assume `gh` is installed (the kit prints install instructions if missing).
- It does not assume the workspace is `C:\dev\Agentic-Home` (it reads `process.cwd()` for project work).

This is deliberate — the same kit is the standalone collaborator deliverable, so it can't depend on GWL infrastructure being present. GWL gets one extra propagation step in the bootstrap; the kit itself is portable.
