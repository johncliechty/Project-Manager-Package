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

# IMPORTANT: keep this at "Continue", not "Stop". git frequently writes
# informational text to stderr (e.g. "error: No such remote 'origin'" when
# checking whether origin exists), which would cause "Stop" mode to abort
# the script even though the situation is benign.
$ErrorActionPreference = "Continue"

function Write-Step($msg) { Write-Host "==> $msg" -ForegroundColor Cyan }
function Write-Ok($msg)   { Write-Host "OK  $msg" -ForegroundColor Green }
function Write-Warn2($msg){ Write-Host "!!  $msg" -ForegroundColor Yellow }

function Invoke-Git {
  # Wrapper that runs git, captures both stdout and stderr, and returns an
  # object with $.stdout, $.stderr, and $.exitCode. Keeps PowerShell from
  # treating git's stderr writes as terminating errors.
  param([Parameter(ValueFromRemainingArguments)][string[]]$Args)
  $psi = New-Object System.Diagnostics.ProcessStartInfo
  $psi.FileName = "git"
  foreach ($a in $Args) { $psi.ArgumentList.Add($a) | Out-Null }
  $psi.RedirectStandardOutput = $true
  $psi.RedirectStandardError  = $true
  $psi.UseShellExecute = $false
  $psi.CreateNoWindow  = $true
  $p = [System.Diagnostics.Process]::Start($psi)
  $stdout = $p.StandardOutput.ReadToEnd()
  $stderr = $p.StandardError.ReadToEnd()
  $p.WaitForExit()
  return [PSCustomObject]@{
    stdout   = $stdout.Trim()
    stderr   = $stderr.Trim()
    exitCode = $p.ExitCode
  }
}

# Sanity: are we in the kit folder?
if (-not (Test-Path .\SKILL.md) -or -not (Test-Path .\bin\pm.mjs)) {
  Write-Host "!!  This script must be run from the project-manager-kit folder." -ForegroundColor Red
  Write-Host "    Expected to find SKILL.md and bin/pm.mjs in the current directory." -ForegroundColor Red
  exit 1
}

Write-Step "Verifying git is installed"
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  Write-Host "!!  git is not on PATH. Install: winget install Git.Git" -ForegroundColor Red
  exit 1
}
$ver = (& git --version) -replace "^git version ", ""
Write-Ok "git $ver"

# Clean up any existing .git so a re-run starts fresh.
if (Test-Path .\.git) {
  Write-Step "Removing existing .git folder (fresh start)"
  Remove-Item -Recurse -Force .\.git
  Write-Ok "  cleaned"
}

Write-Step "git init"
& git init -q -b main
Write-Ok "  initialized on branch main"

Write-Step "Configuring user identity for this repo"
& git config user.name  $UserName
& git config user.email $UserEmail
Write-Ok "  $UserName <$UserEmail>"

Write-Step "Staging all files"
& git add -A | Out-Null
$staged = (& git diff --cached --name-only | Measure-Object).Count
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

Smoke-tested end-to-end. All 12 .mjs scripts pass node --check.
"@
& git commit -q -m $msg
$head = (& git rev-parse --short HEAD)
Write-Ok "  HEAD: $head"

Write-Step "Setting origin to $RemoteUrl"
$check = Invoke-Git remote get-url origin
if ($check.exitCode -eq 0) {
  & git remote set-url origin $RemoteUrl
  Write-Ok "  origin updated"
} else {
  & git remote add origin $RemoteUrl
  Write-Ok "  origin added"
}

# Final verification
Write-Step "Verifying state"
$remoteCheck = Invoke-Git remote -v
Write-Host $remoteCheck.stdout
Write-Ok "  ready"

Write-Host ""
Write-Host "==================================================================" -ForegroundColor Green
Write-Host "Local git is ready. The push is yours." -ForegroundColor Green
Write-Host "==================================================================" -ForegroundColor Green
Write-Host ""
Write-Host "To push:"
Write-Host "  git push -u origin main"
Write-Host ""
Write-Host "If the push is rejected because the GitHub repo has a README:" -ForegroundColor Yellow
Write-Host "  git pull --allow-unrelated-histories --no-rebase origin main"
Write-Host "  git push -u origin main"
Write-Host ""
Write-Host "If git asks for credentials and you want a one-time setup:" -ForegroundColor Yellow
Write-Host "  winget install --id GitHub.cli"
Write-Host "  gh auth login           # opens a browser; you log in once"
Write-Host "  gh auth setup-git       # makes gh handle git credentials"
Write-Host "  git push -u origin main # this push and all future ones are silent"
Write-Host ""
