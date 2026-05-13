# publish-plugin.ps1 — push the plugin marketplace + Anchor curriculum to GitHub.
#
# Run this from PowerShell at the repo root:
#   cd C:\dev\Agentic-Home\project-manager-kit
#   .\publish-plugin.ps1
#
# Why this script exists: the assistant prepped the plugin-marketplace files
# from inside a sandbox that couldn't commit due to a stale .git/index.lock
# (Windows file-permission quirk on the mount). This script clears the lock,
# stages everything new, commits, and pushes.

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "=== publish-plugin: preparing repo ===" -ForegroundColor Cyan

# 1. Clear any stale index lock.
if (Test-Path ".git\index.lock") {
    Write-Host "  removing stale .git/index.lock" -ForegroundColor Yellow
    Remove-Item -Force ".git\index.lock"
}

# 2. Show what's new.
Write-Host ""
Write-Host "=== files to commit ===" -ForegroundColor Cyan
git status --short

# 3. Stage everything.
Write-Host ""
Write-Host "=== git add . ===" -ForegroundColor Cyan
git add .

# 4. Commit.
Write-Host ""
Write-Host "=== git commit ===" -ForegroundColor Cyan
$commitMsg = @"
feat: add Cowork plugin marketplace + Anchor curriculum

- .claude-plugin/marketplace.json catalogs two plugins
- plugins/project-manager/ packages the /project-manager skill
  for marketplace install (./.claude-plugin/plugin.json + skills/)
- plugins/anchor-coach/ ships the full Anchor curriculum:
    7 lessons (M1-M7), 8 milestone rubrics (M0-M7), STYLE.md,
    skills-and-prompts.md, group-mode.md
  Activates on **/.project-manager/** glob; trigger phrases include
  "start the Anchor curriculum", "begin Anchor", "my first app".
- README rewritten to lead with the 3-step student install:
    /plugin marketplace add johncliechty/Project-Manager-Package
    /plugin install project-manager@project-manager-package
    /plugin install anchor-coach@project-manager-package
- Legacy CLI (bin/, references/, templates/, SKILL.md at root)
  preserved unchanged for non-plugin users.

The curriculum was developed in C:\dev\Teaching\ across several
sessions on 2026-05-12; this commit imports the locked content into
the plugin shape and adds the marketplace machinery.
"@
git commit -m $commitMsg

# 5. Push.
Write-Host ""
Write-Host "=== git push origin main ===" -ForegroundColor Cyan
git push origin main

Write-Host ""
Write-Host "=== done ===" -ForegroundColor Green
Write-Host "Public URL: https://github.com/johncliechty/Project-Manager-Package"
Write-Host ""
Write-Host "Verify in Cowork by running these three commands:"
Write-Host "  /plugin marketplace add johncliechty/Project-Manager-Package"
Write-Host "  /plugin install project-manager@project-manager-package"
Write-Host "  /plugin install anchor-coach@project-manager-package"
Write-Host ""
