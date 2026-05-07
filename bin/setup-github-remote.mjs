#!/usr/bin/env node
// pm github-init — wire the current folder up to a GitHub repo.
//
// Two paths:
//   1. CREATE a new repo (default).  Wraps `gh repo create` — needs the
//      GitHub CLI (`gh`) installed and authenticated.
//   2. ATTACH to an EXISTING repo via --remote-url <url>.  Just runs
//      `git remote add origin <url>` + `git push`. Works even without `gh`.
//
// Never creates a GitHub account on the user's behalf.

import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join, basename } from "node:path";

const cwd = process.cwd();
const argv = process.argv.slice(2);

if (argv.includes("--help") || argv.includes("-h")) {
  console.log(`pm github-init [--name <name>] [--public] [--remote-url <url>]

Wire the current folder up to a GitHub repo.

Modes:
  CREATE (default): wraps \`gh repo create\` to make a private repo and push.
                    Requires \`gh\` (GitHub CLI) installed and authenticated.
  ATTACH:           pass --remote-url <url> to use an existing repo you've
                    already created on github.com. Skips \`gh\` entirely.

Examples:
  pm github-init                                                  # create new private
  pm github-init --name my-project                                # create new private, custom name
  pm github-init --public                                         # create new public (confirmation)
  pm github-init --remote-url https://github.com/me/my-repo.git   # attach to existing
`);
  process.exit(0);
}

// Must be in a git repo
if (!existsSync(join(cwd, ".git"))) {
  console.log(
    "pm github-init: this folder is not a git repo. Run \`git init\` first, or\n" +
    "re-run \`pm init\` (which initializes a git repo by default)."
  );
  process.exit(2);
}

const remoteUrlIdx = argv.indexOf("--remote-url");
const remoteUrl = remoteUrlIdx >= 0 ? argv[remoteUrlIdx + 1] : null;

if (remoteUrl) {
  // ATTACH path: existing repo. Skip gh entirely.
  attachToExisting(remoteUrl);
} else {
  // CREATE path: needs gh.
  createNewRepo();
}

function attachToExisting(url) {
  console.log("pm github-init: attaching to existing repo at " + url);

  // Make sure there's at least one commit; gh's create-and-push handles this
  // for us, but in attach-mode we do it explicitly.
  const logCheck = spawnSync("git", ["log", "-1"], { cwd, stdio: "ignore" });
  if (logCheck.status !== 0) {
    console.log("  no commits yet — making the initial commit:");
    spawnSync("git", ["add", "-A"], { cwd, stdio: "inherit" });
    const commit = spawnSync(
      "git",
      ["commit", "-m", "initial commit"],
      { cwd, stdio: "inherit" }
    );
    if (commit.status !== 0) {
      console.error("\npm github-init: initial commit failed; aborting.");
      process.exit(commit.status || 1);
    }
  }

  // Ensure on a branch named 'main' (GitHub default).
  spawnSync("git", ["branch", "-M", "main"], { cwd, stdio: "inherit" });

  // Add the origin remote (or update it if it already exists).
  const existingRemote = spawnSync("git", ["remote", "get-url", "origin"], { cwd });
  if (existingRemote.status === 0) {
    console.log("  origin remote already set; updating to " + url);
    spawnSync("git", ["remote", "set-url", "origin", url], { cwd, stdio: "inherit" });
  } else {
    spawnSync("git", ["remote", "add", "origin", url], { cwd, stdio: "inherit" });
  }

  // Try a regular push first.
  console.log("  pushing main to origin...");
  let push = spawnSync("git", ["push", "-u", "origin", "main"], { cwd, stdio: "inherit" });

  if (push.status !== 0) {
    // Most likely cause: remote has commits we don't (e.g. a README created
    // when the repo was initialized on github.com). Try a pull with
    // --allow-unrelated-histories, then push.
    console.log("\n  push rejected — remote may have its own history (e.g. a README from creation).");
    console.log("  attempting pull --allow-unrelated-histories, then re-push:");
    const pull = spawnSync(
      "git",
      ["pull", "--allow-unrelated-histories", "--no-rebase", "origin", "main"],
      { cwd, stdio: "inherit" }
    );
    if (pull.status !== 0) {
      console.error("\npm github-init: pull failed.");
      console.error("If there are merge conflicts, resolve them by hand and run:");
      console.error("  git push -u origin main");
      process.exit(pull.status || 1);
    }
    push = spawnSync("git", ["push", "-u", "origin", "main"], { cwd, stdio: "inherit" });
    if (push.status !== 0) {
      console.error("\npm github-init: push still failed after merge. Inspect git status; then:");
      console.error("  git push -u origin main");
      process.exit(push.status || 1);
    }
  }

  console.log(
    "\nDone. origin set to " + url + " and main pushed.\n" +
    "\nStanding rule: pm never pushes for you again. Use \`git push\` deliberately.\n"
  );
}

function createNewRepo() {
  // Check gh
  const ghCheck = spawnSync("gh", ["--version"], { stdio: "ignore" });
  if (ghCheck.status !== 0) {
    console.log(
      "pm github-init: GitHub CLI (\`gh\`) is not installed.\n\n" +
      "Install it:\n" +
      "  macOS:   brew install gh\n" +
      "  Windows: winget install --id GitHub.cli\n" +
      "  Linux:   see https://github.com/cli/cli/blob/trunk/docs/install_linux.md\n\n" +
      "After installing, run:\n" +
      "  gh auth login\n" +
      "  pm github-init\n\n" +
      "Or, if you already created the repo on github.com, attach to it:\n" +
      "  pm github-init --remote-url https://github.com/<you>/<repo>.git\n"
    );
    process.exit(2);
  }

  const nameIdx = argv.indexOf("--name");
  const name = nameIdx >= 0 ? argv[nameIdx + 1] : basename(cwd);
  const visibility = argv.includes("--public") ? "--public" : "--private";

  if (visibility === "--public") {
    console.log(
      "\nYou requested a PUBLIC repo. This will be visible to anyone on GitHub.\n" +
      "Type \"yes\" to confirm, anything else to cancel:"
    );
    const buf = Buffer.alloc(8);
    let n;
    try {
      const fs = require("node:fs");
      n = fs.readSync(0, buf, 0, 8, null);
    } catch {
      n = 0;
    }
    const ans = buf.slice(0, n).toString().trim().toLowerCase();
    if (ans !== "yes") {
      console.log("Cancelled.");
      process.exit(0);
    }
  }

  console.log(
    "\nCreating " + visibility.replace("--", "") + ' GitHub repo "' + name + '" and pushing...'
  );
  const create = spawnSync(
    "gh",
    ["repo", "create", name, visibility, "--source=.", "--remote=origin", "--push"],
    { cwd, stdio: "inherit" }
  );
  if (create.status !== 0) {
    console.error("\npm github-init: \`gh repo create\` failed.");
    console.error(
      "Common causes: not authenticated (\`gh auth login\`), repo name conflict, no commits yet."
    );
    console.error(
      "If the repo already exists on github.com, attach to it instead:"
    );
    console.error(
      "  pm github-init --remote-url https://github.com/<you>/<repo>.git"
    );
    process.exit(create.status ?? 1);
  }
  console.log(
    "\nDone. Remote 'origin' set; current branch pushed.\n" +
    "\nStanding rule: \`pm\` never pushes for you again. Use \`git push\` deliberately.\n"
  );
}
