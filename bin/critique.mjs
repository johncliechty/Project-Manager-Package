#!/usr/bin/env node
// pm critique <plan-file> [--section "Name"]
//
// Bounded 2-pass critique enforcer. The script's actual job is *bookkeeping*:
//   - it tracks how many critique passes a given section/plan has had
//   - it refuses pass 3 with an explanation
//   - it generates the *prompt* the user (or their agent) should run on the plan
//   - it accepts the captured critique back via stdin and files it under plans/critique-pass-N.md
//
// The skill itself does the actual critique — this script is the discipline.

import { readFileSync, writeFileSync, existsSync, mkdirSync, appendFileSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createInterface } from "node:readline/promises";

const __dirname = dirname(fileURLToPath(import.meta.url));
const KIT_ROOT = dirname(__dirname);
const cwd = process.cwd();
const argv = process.argv.slice(2);

if (argv.length === 0 || argv.includes("--help") || argv.includes("-h")) {
  console.log(`pm critique <plan-file> [--section "Section name"]

Run a bounded critique pass on a plan or subplan. The script:
  - increments the pass counter in .pm/critique-passes.json
  - refuses pass 3 with an explanation
  - prints the critique prompt for you (or your agent) to run
  - on completion (you re-run with --capture), files the captured output

Examples:
  pm critique MASTER-PLAN.md --section "1. User authentication"
  pm critique plans/subplans/auth.md
  pm critique plans/subplans/auth.md --capture < critique-output.txt
`);
  process.exit(0);
}

const planArg = argv.find((a) => !a.startsWith("--"));
if (!planArg) {
  console.error("pm critique: missing <plan-file>");
  process.exit(2);
}

const planPath = resolve(planArg);
if (!existsSync(planPath)) {
  console.error(`pm critique: file not found: ${planPath}`);
  process.exit(2);
}

const sectionIdx = argv.indexOf("--section");
const section = sectionIdx >= 0 ? argv[sectionIdx + 1] : "(whole plan)";
const captureMode = argv.includes("--capture");

const passesPath = join(cwd, ".pm/critique-passes.json");
mkdirSync(dirname(passesPath), { recursive: true });
let passes = { schemaVersion: 1, sections: {} };
if (existsSync(passesPath)) {
  try {
    passes = JSON.parse(readFileSync(passesPath, "utf8"));
  } catch {}
}
passes.sections ??= {};

const key = `${planArg}::${section}`;
const current = passes.sections[key]?.passes ?? 0;

if (captureMode) {
  // Read stdin and file as plans/critique-pass-(current+1).md
  let captured = "";
  process.stdin.setEncoding("utf8");
  for await (const chunk of process.stdin) captured += chunk;
  if (!captured.trim()) {
    console.error("pm critique --capture: stdin was empty.");
    process.exit(2);
  }
  const next = current + 1;
  if (next > 2) {
    console.error(refusalMessage(key, current));
    process.exit(2);
  }
  const outFile = join(cwd, "plans", `critique-pass-${next}-${slug(section)}.md`);
  mkdirSync(dirname(outFile), { recursive: true });
  writeFileSync(
    outFile,
    `# Critique pass ${next} — ${section}\n\n*Captured ${new Date().toISOString()}*\n\nPlan file: \`${planArg}\`\n\n---\n\n${captured.trim()}\n`
  );
  passes.sections[key] = { passes: next, lastAt: new Date().toISOString() };
  writeFileSync(passesPath, JSON.stringify(passes, null, 2) + "\n");
  console.log(`Captured critique pass ${next} → ${outFile}`);
  if (next === 2) {
    console.log(
      `\nThis was pass 2 — the bounded loop is now closed for "${section}".\n` +
        `Next move: edit the plan in response, mark the section's Status to\n` +
        `"critiqued-2-final" in MASTER-PLAN.md, and start building.\n`
    );
  } else {
    console.log(`\nNext: edit the plan in response, then run pass 2 when ready:\n  pm critique ${planArg} --section "${section}"\n`);
  }
  process.exit(0);
}

// Normal mode: emit the prompt for the user/agent to run.
if (current >= 2) {
  console.log(refusalMessage(key, current));
  process.exit(0);
}

const next = current + 1;
const planText = readFileSync(planPath, "utf8");
const angles = next === 1
  ? ["security", "frustrated user", "operator (on call at 2 AM)"]
  : ["competitor", "skeptical user-researcher", "the premise itself"];

console.log(`# Critique pass ${next} of 2 — ${section}\n`);
console.log(`Plan file: ${planPath}\n`);
console.log(
  `Run the following prompts against the plan (vary the *angle*, not the model — the major models converge on similar critiques):\n`
);
for (const a of angles) {
  console.log(`  - "Critique this from a ${a} perspective. Be specific. Give me concrete failure modes, not 'have you considered…'."`);
}
console.log("");
console.log("After running these, capture the merged output and pipe it back:");
console.log(`  pm critique ${planArg} --section "${section}" --capture < critique-output.txt`);
console.log("");
console.log(
  "Reminder: discard vague critique ('have you considered…' without specifics). Keep concrete failure modes, missing-stakeholder calls, and suggestions to *cut* sections."
);

function slug(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40);
}

function refusalMessage(key, current) {
  return (
    `\nRefusing pass ${current + 1}.\n\n` +
    `"${key}" has already had ${current} critique pass(es). The bounded loop is closed.\n\n` +
    `If you find yourself wanting another pass, that's the trap the bounded rule exists to\n` +
    `prevent. AI will happily generate plausible-sounding new blindspots forever; pass 3+\n` +
    `is almost always polishing a plan that's about to change anyway.\n\n` +
    `Better moves at this point:\n` +
    `  1. Edit the plan in response to passes 1+2 (you don't need a third pass to do this).\n` +
    `  2. Start building. The build will surface real issues the plan missed.\n` +
    `  3. If there's ONE specific question another critique would answer, ask that one\n` +
    `     question by hand — don't run a full third pass.\n\n` +
    `If you really need to override (e.g., a major outside event changed the project),\n` +
    `delete the entry from .pm/critique-passes.json manually. The script doesn't gate\n` +
    `you from override; it just doesn't help you skip the friction.`
  );
}
