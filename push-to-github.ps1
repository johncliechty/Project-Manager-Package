# push-to-github.ps1
# One-shot: stage the project-manager-kit for its first push to GitHub.
#
# Run this from C:\dev\Agentic-Home\project-manager-kit\.
# It does all the local git plumbing then stops just short of `git push`,
# so the actual push (which needs your GitHub authentication) is yours.

[CmdletBinding()]
param(
  [string]$RemoteUrl = "https://github.com/johncliechty/Project-Manager-Package.git",
  [string]$UserName  = "John Liechty",
  [string]$UserEmail = "john.liechty@gmail.com"
)

$ErrorActionPreference = "Stop"

function Write-Step($msg) { Write-Host "==> $msg" -ForegroundColor Cyan }
function Write-Ok($msg)   { Write-Host "OK  $msg" -ForegroundColor Green }
function Write-Warn2($msg){ Write-Host "!!  $msg" -ForegroundColor Yellow }

# Sanity: are we in the kit folder?
if (-not (Test-Path .\SKILL.md) -or -not (Test-Path .\bin\pm.mjs)) {
  Write-Error "This script must be run from the project-manager-kit folder (where SKILL.md lives)."
  exit 1
}

Write-Step "Verifying git is installed"
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  Write-Error "git is not on PATH. Install: winget install Git.Git"
  exit 1
}
Write-Ok "git $((git --version) -replace '^git version ','')"

# Clean up any existing .git (including the corrupted nested state from
# a prior failed attempt). We force-remove because the cowork sandbox
# left some files in odd states.
if (Test-Path .\.git) {
  Write-Step "Removing existing .git folder (any prior partial state)"
  Remove-Item -Recurse -Force .\.git
  Write-Ok "  cleaned"
}

Write-Step "git init"
git init -q -b main
Write-Ok "  initialized on branch main"

Write-Step "Configuring user identity for this repo"
git config user.name  $UserName
git config user.email $UserEmail
Write-Ok "  $UserName <$UserEmail>"

Write-Step "Staging all files"
git add -A
$staged = (git diff --cached --name-only | Measure-Object).Count
Write-Ok "  $staged files staged"

Write-Step "Initial commit"
$msg = @"
v0.1: initial commit -- project-manager-kit

Tool-agnostic AI project-manager skill and CLI.

Highlights:
- SKILL.md (Anthropic skill format) -- the operating discipline that any
  agent loads when triggered. Enforces the bounded 2-pass critique loop
  from AI Workflow.pdf.
- bin/ -- pm dispatcher + 12 subcommands (Node + PowerShell wrapper for
  Windows Task Scheduler). Cross-platform.
- templates/ -- PROJECT, MASTER-PLAN, INVESTOR-BRIEF, SUBPLAN, SESSION-LOG,
  AGENTS, CLAUDE, GEMINI, GWLabs, gitignore.
- references/ -- operating-loop, critique-perspectives, decomposition,
  investor-brief-style, what-now-ranking, backup-options, existing-vs-new.
- README.md, COLLABORATORS.md, INTEGRATION.md, LICENSE (MIT).

CLI surface:
  pm init       -- bootstrap a project (interactive or --answers <file.json>)
  pm status     -- current phase, sections, recent logs/decisions
  pm what-now   -- top 3 ranked next actions
  pm log        -- append session log; pm log --decision for the ledger
  pm brief      -- regenerate investor-readable summary deterministically
  pm critique   -- bounded 2-pass critique enforcer; refuses pass 3
  pm decompose  -- drafts subplan stubs from master-plan checkboxes
  pm github-init [--remote-url <url>]   -- wire up GitHub remote
  pm backup b2|r2                       -- generate rclone config + script
  pm windows-task install               -- Task Scheduler entry for daily brief

Smoke-tested end-to-end. All 12 .mjs scripts pass node --check.
"@
git commit -q -m $msg
$head = (git rev-parse --short HEAD)
Write-Ok "  HEAD: $head"

Write-Step "Setting origin to $RemoteUrl"
$existing = git remote get-url origin 2>$null
if ($LASTEXITCODE -eq 0) {
  git remote set-url origin $RemoteUrl
  Write-Ok "  origin updated"
} else {
  git remote add origin $RemoteUrl
  Write-Ok "  origin added"
}

Write-Host ""
Write-Host "==================================================================" -ForegroundColor Green
Write-Host "Local git is ready. The push is yours." -ForegroundColor Green
Write-Host "==================================================================" -ForegroundColor Green
Write-Host ""
Write-Host "To push:"
Write-Host "  git push -u origin main"
Write-Host ""
Write-Host "If the GitHub repo already has a README from when you created it" -ForegroundColor Yellow
Write-Host "and the push is rejected, run:" -ForegroundColor Yellow
Write-Host ""
Write-Host "  git pull --allow-unrelated-histories --no-rebase origin main"
Write-Host "  git push -u origin main"
Write-Host ""
Write-Host "If git asks for credentials, the easiest path is to install" -ForegroundColor Yellow
Write-Host "the GitHub CLI once and let it handle git auth:" -ForegroundColor Yellow
Write-Host ""
Write-Host "  winget install --id GitHub.cli"
Write-Host "  gh auth login           # opens a browser; you log in once"
Write-Host "  gh auth setup-git       # makes gh handle git credentials"
Write-Host "  git push -u origin main # this push will now be silent"
Write-Host ""
