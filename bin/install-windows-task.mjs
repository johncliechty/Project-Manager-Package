#!/usr/bin/env node
// pm windows-task install
//
// Wrapper that calls the install-windows-task.ps1 PowerShell script.

import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const cwd = process.cwd();
const argv = process.argv.slice(2);

if (argv.length === 0 || argv.includes("--help") || argv.includes("-h")) {
  console.log(`pm windows-task install [--time HH:MM]

Installs a Windows Task Scheduler entry that runs \`pm brief\` daily.
Default time is 07:00 local. Requires PowerShell.

Examples:
  pm windows-task install
  pm windows-task install --time 06:30
`);
  process.exit(0);
}

if (argv[0] !== "install") {
  console.error(`pm windows-task: only 'install' is supported, got '${argv[0]}'`);
  process.exit(2);
}

if (process.platform !== "win32") {
  console.error(
    `pm windows-task: this command only works on Windows. On Mac/Linux, use:\n  pm brief --schedule --cron`
  );
  process.exit(2);
}

const timeIdx = argv.indexOf("--time");
const time = timeIdx >= 0 ? argv[timeIdx + 1] : "07:00";

const scriptPath = join(__dirname, "install-windows-task.ps1");
const result = spawnSync(
  "powershell.exe",
  ["-ExecutionPolicy", "Bypass", "-File", scriptPath, "-ProjectPath", cwd, "-Time", time],
  { stdio: "inherit" }
);
process.exit(result.status ?? 0);
