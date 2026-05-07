#!/usr/bin/env node
// package-skill — emit a project-manager.skill zip release artifact.
//
// The .skill format is just a zip of a skill directory containing SKILL.md.
// Cowork users can drop a .skill into their skills folder; OpenClaw users
// get a copy that obeys the symlink-escape rule (real files only).
//
// We assemble a temp dir with the SKILL.md, references/, scripts/ (subset
// of bin/ that's relevant for in-skill use), templates/, and zip it.

import { readdirSync, readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync, rmSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const KIT_ROOT = dirname(__dirname);
const RELEASE_DIR = join(KIT_ROOT, "release");

mkdirSync(RELEASE_DIR, { recursive: true });

const stage = join(RELEASE_DIR, "project-manager");
if (existsSync(stage)) rmSync(stage, { recursive: true, force: true });
mkdirSync(stage, { recursive: true });

// Copy the in-skill files. The .skill bundle is intentionally smaller than
// the full kit — it ships SKILL.md + references + templates + the bin
// scripts that work without npm install (they're all single-file Node).
copyFileSync(join(KIT_ROOT, "SKILL.md"), join(stage, "SKILL.md"));

const dirsToCopy = ["references", "templates", "bin"];
for (const d of dirsToCopy) {
  const srcDir = join(KIT_ROOT, d);
  const dstDir = join(stage, d);
  mkdirSync(dstDir, { recursive: true });
  for (const f of readdirSync(srcDir)) {
    copyFileSync(join(srcDir, f), join(dstDir, f));
  }
}

// Optional README in the .skill so a Cowork user knows what it is
writeFileSync(
  join(stage, "README.md"),
  `# project-manager (skill bundle)\n\nThis is the skill-bundle build of \`project-manager-kit\`. It contains:\n\n- SKILL.md (the skill spec)\n- references/ (load on demand)\n- templates/ (used by \`pm init\`)\n- bin/ (the CLI scripts; \`pm.mjs\` is the dispatcher)\n\nFull repo and updates: https://github.com/<your-org>/project-manager-kit\n`
);

// Zip into release/project-manager.skill
const out = join(RELEASE_DIR, "project-manager.skill");
if (existsSync(out)) rmSync(out);

// Try Node 21+'s built-in archiver via tar -a (Windows) or zip (Mac/Linux/WSL)
const isWin = process.platform === "win32";
let result;
if (isWin) {
  // PowerShell Compress-Archive
  result = spawnSync(
    "powershell.exe",
    [
      "-NoProfile",
      "-Command",
      `Compress-Archive -Path "${stage}\\*" -DestinationPath "${out.replace(/\.skill$/, ".zip")}" -Force ; Move-Item -Path "${out.replace(/\.skill$/, ".zip")}" -Destination "${out}" -Force`,
    ],
    { stdio: "inherit" }
  );
} else {
  result = spawnSync("zip", ["-rq", out, "."], { cwd: stage, stdio: "inherit" });
}

if (result.status !== 0) {
  console.error(
    `package-skill: zip failed. On Windows, ensure PowerShell is in PATH. On Mac/Linux, install zip.`
  );
  process.exit(1);
}

console.log(`\nWrote: ${out}`);
console.log(`(Cowork users can drop this into their skills folder; OpenClaw users should unzip it as real files into ~/.openclaw/skills/project-manager/.)`);
