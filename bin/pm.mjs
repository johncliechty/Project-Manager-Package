#!/usr/bin/env node
// pm — the project-manager dispatcher.
//
// Subcommands all live in their own .mjs file in this same directory; this
// file is just routing. Keeping subcommands separate means agents can read
// just the one they need.

import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { existsSync } from "node:fs";

const __dirname = dirname(fileURLToPath(import.meta.url));

const SUBCOMMANDS = {
  init: "project-init.mjs",
  status: "status.mjs",
  "what-now": "what-now.mjs",
  log: "log-entry.mjs",
  brief: "update-investor-brief.mjs",
  critique: "critique.mjs",
  decompose: "decompose.mjs",
  "github-init": "setup-github-remote.mjs",
  backup: "setup-backup.mjs",
  "windows-task": "install-windows-task.mjs",
};

function usage() {
  console.log(`pm — project-manager dispatcher
Usage: pm <subcommand> [args...]

Subcommands:
  init                  Bootstrap a new project (or absorb an existing folder).
  status                Print current project state.
  what-now              Print top 3 ranked next actions.
  log <entry>           Append a session log entry.
  log --decision <e>    Append to the decisions ledger.
  brief                 Refresh briefs/investor-brief-current.md.
  brief --schedule      Register the daily 7 AM Cowork scheduled task.
  critique <plan>       Run the bounded 2-pass critique on a plan/subplan.
  decompose <plan>      Draft subplans from a master plan.
  github-init           Create a private GitHub repo and push.
  backup b2|r2          Generate rclone config for data backup.
  windows-task install  Install a Windows Task Scheduler entry for daily brief.

Run 'pm <subcommand> --help' for subcommand-specific help.
`);
}

const [, , sub, ...rest] = process.argv;

if (!sub || sub === "--help" || sub === "-h") {
  usage();
  process.exit(0);
}

const file = SUBCOMMANDS[sub];
if (!file) {
  console.error(`pm: unknown subcommand '${sub}'\n`);
  usage();
  process.exit(2);
}

const path = join(__dirname, file);
if (!existsSync(path)) {
  console.error(`pm: subcommand file missing: ${path}`);
  console.error(
    `(this should not happen on a fresh install — please re-clone the kit or report it)`
  );
  process.exit(2);
}

const child = spawn(process.execPath, [path, ...rest], {
  stdio: "inherit",
  env: process.env,
});

child.on("exit", (code) => process.exit(code ?? 0));
