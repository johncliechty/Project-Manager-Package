# install-windows-task.ps1
# Registers a Windows Task Scheduler entry that runs `pm brief` daily.
# Called by `pm windows-task install`; can also be run directly.

param(
  [Parameter(Mandatory=$true)][string]$ProjectPath,
  [string]$Time = "07:00"
)

$ErrorActionPreference = "Stop"

if (-not (Test-Path $ProjectPath)) {
  Write-Error "Project path does not exist: $ProjectPath"
  exit 1
}

$projectName = Split-Path $ProjectPath -Leaf
$taskName = "pm-brief-$projectName"

# Find node.exe
$node = (Get-Command node -ErrorAction SilentlyContinue).Source
if (-not $node) {
  Write-Error "node.exe not found in PATH. Install Node.js first."
  exit 1
}

# Resolve the kit root: the directory containing this script's bin/ parent.
$kitRoot = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$briefScript = Join-Path $kitRoot "bin\update-investor-brief.mjs"

if (-not (Test-Path $briefScript)) {
  Write-Error "Could not find $briefScript. Re-clone the kit."
  exit 1
}

$action = New-ScheduledTaskAction `
  -Execute $node `
  -Argument "`"$briefScript`"" `
  -WorkingDirectory $ProjectPath

$trigger = New-ScheduledTaskTrigger -Daily -At $Time
$settings = New-ScheduledTaskSettingsSet `
  -StartWhenAvailable `
  -DontStopIfGoingOnBatteries `
  -AllowStartIfOnBatteries `
  -RunOnlyIfNetworkAvailable:$false

# Use the current user; no admin needed if user is logged in.
$principal = New-ScheduledTaskPrincipal -UserId $env:USERNAME -LogonType Interactive

# Replace existing if present.
if (Get-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue) {
  Unregister-ScheduledTask -TaskName $taskName -Confirm:$false
}

Register-ScheduledTask `
  -TaskName $taskName `
  -Action $action `
  -Trigger $trigger `
  -Settings $settings `
  -Principal $principal `
  -Description "Daily investor brief refresh for project: $projectName"

Write-Host ""
Write-Host "Registered Task Scheduler entry: $taskName"
Write-Host "  Runs daily at $Time, working dir: $ProjectPath"
Write-Host "  Manage: Open Task Scheduler, search for '$taskName'."
Write-Host "  Remove: Unregister-ScheduledTask -TaskName '$taskName' -Confirm:`$false"
