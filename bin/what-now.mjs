#!/usr/bin/env node
// pm what-now — top 3 ranked next actions, with one-line justifications.

import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const cwd = process.cwd();

function loadJson(p) {
  try { return JSON.parse(readFileSync(p, "utf8")); } catch { return null; }
}
function readMaybe(p) { return existsSync(p) ? readFileSync(p, "utf8") : ""; }

const state = loadJson(join(cwd, ".pm/state.json"));
if (!state) {
  console.error("No .pm/state.json. Run `pm init` first.");
  process.exit(2);
}
const passes = loadJson(join(cwd, ".pm/critique-passes.json")) ?? { sections: {} };
const masterPlan = readMaybe(join(cwd, "MASTER-PLAN.md"));
const briefPath = join(cwd, "briefs/investor-brief-current.md");
const briefAgeHours = existsSync(briefPath)
  ? (Date.now() - statSync(briefPath).mtimeMs) / 36e5
  : Infinity;

const today = new Date().toISOString().slice(0, 10);
const todayLog = join(cwd, "logs/sessions", today + ".md");

const candidates = [];

// Pre-empt 1: critique gate open?
const sectionsAtPass1 = [];
const sectionRe = /^###\s+(\d+\.\s+[^\n]+)\n+\*\*Status:\*\*\s+([^\n]+)/gm;
let m;
while ((m = sectionRe.exec(masterPlan)) !== null) {
  if (/critiqued-1/i.test(m[2])) sectionsAtPass1.push(m[1].trim());
}
for (const name of sectionsAtPass1) {
  candidates.push({
    score: 95,
    label: 'Run pass 2 critique on "' + name + '"',
    why: "Section is at critiqued-1; closing the bounded loop is the cheapest high-leverage move.",
    cmd: 'pm critique MASTER-PLAN.md --section "' + name + '"',
  });
}

// Pre-empt 2: investor brief stale?
if (briefAgeHours > 24) {
  candidates.push({
    score: 80,
    label: "Refresh the investor brief",
    why: "Last brief is " + Math.floor(briefAgeHours) + "h old; cheap to refresh, signal-to-cost is high.",
    cmd: "pm brief",
  });
}

// Pre-empt 3: no log today?
if (!existsSync(todayLog)) {
  candidates.push({
    score: 70,
    label: "Log what you've already done today",
    why: "No session log for today yet. Future-you and the recommender both depend on logs.",
    cmd: 'pm log "<one-line summary of what you did today>"',
  });
}

// Standard candidates: extract from MASTER-PLAN.md "Next concrete actions"
const nextRe = /Next concrete actions[^\n]*\n+([\s\S]*?)(?:\n##\s|\n---|$)/i;
const nextMatch = masterPlan.match(nextRe);
if (nextMatch) {
  const lines = nextMatch[1]
    .split("\n")
    .filter((l) => /^\s*\d+\.\s+\S/.test(l))
    .map((l) => l.replace(/^\s*\d+\.\s*/, "").trim())
    .filter((l) => l && !l.startsWith("This list") && !/^\(/.test(l));
  for (const [i, item] of lines.slice(0, 5).entries()) {
    candidates.push({
      score: 50 - i * 3,
      label: item,
      why: 'On the "Next concrete actions" list in MASTER-PLAN.md.',
      cmd: null,
    });
  }
}

// Subplan candidates from plans/subplans/
const subplanDir = join(cwd, "plans/subplans");
if (existsSync(subplanDir)) {
  for (const f of readdirSync(subplanDir).filter((f) => f.endsWith(".md"))) {
    const text = readFileSync(join(subplanDir, f), "utf8");
    const status = (text.match(/^\*\*Status:\*\*\s+(\S+)/m) || [])[1] || "?";
    const blockedBy = (text.match(/blocks us\)\n([\s\S]*?)\n##/) || [])[1] || "";
    const isBlocked = /[a-z0-9]/i.test(blockedBy.replace(/[-\s]/g, ""));
    if (status === "proto" || status === "critiqued-1" || status === "critiqued-2-final") {
      candidates.push({
        score: 40 - (isBlocked ? 30 : 0),
        label: "Subplan: " + f.replace(/\.md$/, "") + "  [" + status + (isBlocked ? ", blocked" : "") + "]",
        why: status === "critiqued-2-final"
          ? "Critique loop closed; ready to build."
          : "Subplan exists but isn't through critique yet.",
        cmd: null,
      });
    }
  }
}

candidates.sort((a, b) => b.score - a.score);
const top = candidates.slice(0, 3);

console.log("# what-now -- top " + top.length);
console.log("# (project: " + state.projectName + ", phase: " + state.phase + ")");
console.log("");
if (top.length === 0) {
  console.log("No candidates surfaced. The project may need scaffolding:");
  console.log("  1. Open MASTER-PLAN.md and fill in Section 1.");
  console.log("  2. Add a few items to the 'Next concrete actions' list at the bottom.");
  console.log("  3. Run `pm what-now` again.");
} else {
  for (const [i, c] of top.entries()) {
    console.log((i + 1) + ". " + c.label);
    console.log("   why: " + c.why);
    if (c.cmd) console.log("   run: " + c.cmd);
    console.log("");
  }
}
console.log("(pm what-now returns options, not a dictate. You pick. The recommender is fed by your pm log entries and MASTER-PLAN.md edits -- keep those current.)");
