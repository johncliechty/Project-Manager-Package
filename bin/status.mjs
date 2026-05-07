#!/usr/bin/env node
// pm status — print current project state.

import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

const cwd = process.cwd();

function loadJson(path) {
  if (!existsSync(path)) return null;
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch (e) {
    return null;
  }
}

function listLastN(dir, n) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => ({ f, t: statSync(join(dir, f)).mtimeMs }))
    .sort((a, b) => b.t - a.t)
    .slice(0, n)
    .map((x) => x.f);
}

const state = loadJson(join(cwd, ".pm/state.json"));
if (!state) {
  console.error(
    "No .pm/state.json found. Run `pm init` first to bootstrap a project."
  );
  process.exit(2);
}

const passes = loadJson(join(cwd, ".pm/critique-passes.json")) ?? { sections: {} };
const masterPlan = existsSync(join(cwd, "MASTER-PLAN.md"))
  ? readFileSync(join(cwd, "MASTER-PLAN.md"), "utf8")
  : "";
const briefPath = join(cwd, "briefs/investor-brief-current.md");
const briefAge = existsSync(briefPath)
  ? Math.floor((Date.now() - statSync(briefPath).mtimeMs) / 36e5)
  : null;

function extractSections(text) {
  // Extract "### N. Name" headings and their Status: lines
  const sections = [];
  const regex = /^###\s+(\d+\.\s+[^\n]+)\n+\*\*Status:\*\*\s+([^\n]+)/gm;
  let m;
  while ((m = regex.exec(text)) !== null) {
    sections.push({ name: m[1].trim(), status: m[2].trim() });
  }
  return sections;
}

const sections = extractSections(masterPlan);

console.log(`# ${state.projectName} — status`);
console.log(`Phase: ${state.phase}`);
console.log(`Backup: ${state.backupChoice}`);
console.log(`Daily brief: ${state.dailyBriefEnabled ? "enabled" : "disabled"}`);
if (briefAge !== null) {
  const stale = briefAge >= 24;
  console.log(
    `Investor brief: ${briefAge}h old${stale ? "  ← stale, consider `pm brief`" : ""}`
  );
} else {
  console.log("Investor brief: not yet generated");
}

console.log(`\nMaster plan sections (${sections.length}):`);
if (sections.length === 0) {
  console.log("  (no sections defined yet — open MASTER-PLAN.md and fill in)");
} else {
  for (const s of sections) {
    const pass = passes.sections?.[s.name]?.passes ?? 0;
    console.log(`  - ${s.name}  [${s.status}]  critique: ${pass}/2`);
  }
}

console.log("\nRecent session logs:");
const recent = listLastN(join(cwd, "logs/sessions"), 5);
if (recent.length === 0) {
  console.log("  (no sessions logged yet — `pm log \"<entry>\"` is cheap, use it)");
} else {
  for (const f of recent) console.log(`  - ${f}`);
}

console.log("\nRecent decisions:");
const recentDec = listLastN(join(cwd, "logs/decisions"), 5);
if (recentDec.length === 0) {
  console.log("  (none logged — `pm log --decision \"<entry>\"` for major choices)");
} else {
  for (const f of recentDec) console.log(`  - ${f}`);
}

if (state.blockers && state.blockers.length > 0) {
  console.log("\nBlockers:");
  for (const b of state.blockers) console.log(`  - ${b}`);
}

console.log("");
