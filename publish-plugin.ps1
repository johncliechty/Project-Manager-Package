# publish-plugin.ps1 -- commit + push curriculum updates.
#
# Run from PowerShell at the repo root:
#   cd C:\dev\Agentic-Home\project-manager-kit
#   .\publish-plugin.ps1
#
# Handles three common failure modes:
#   - stale .git/index.lock from a prior interrupted operation
#   - corrupt .git/index file ("bad signature 0x00000000")
#   - multi-line commit messages getting parsed as pathspec by PowerShell

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "=== publish-plugin: preparing repo ===" -ForegroundColor Cyan

# 1. Clear any stale index lock.
if (Test-Path ".git\index.lock") {
    Write-Host "  removing stale .git/index.lock" -ForegroundColor Yellow
    Remove-Item -Force ".git\index.lock"
}

# 2. Detect and repair a corrupt index. If git status fails with
#    "index file corrupt" or "bad signature", we delete the index
#    and rebuild from HEAD.
$statusOutput = git status 2>&1
$statusString = $statusOutput -join "`n"
if ($LASTEXITCODE -ne 0 -or $statusString -match "index file corrupt|bad signature") {
    Write-Host "  index is corrupt -- rebuilding from HEAD" -ForegroundColor Yellow
    if (Test-Path ".git\index") {
        Remove-Item -Force ".git\index"
    }
    git reset HEAD --quiet
    if ($LASTEXITCODE -ne 0) {
        Write-Host "  reset failed -- falling back to read-tree" -ForegroundColor Yellow
        git read-tree HEAD
    }
}

Write-Host ""
Write-Host "=== files to commit ===" -ForegroundColor Cyan
git status --short

Write-Host ""
Write-Host "=== git add . ===" -ForegroundColor Cyan
git add .

# Check whether there's actually anything to commit before we try.
$staged = git diff --cached --name-only
if (-not $staged) {
    Write-Hos