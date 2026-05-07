#!/usr/bin/env node
// pm decompose <plan-file>
//
// Drafts subplans from a master plan. The script's job is to:
//   - read MASTER-PLAN.md and surface its sections
//   - for each section that doesn't already have subplan stubs, write
//     plans/subplans/<slug>.md from templates/SUBPLAN.md
//   - print a summary of what it created so the user/agent can fill in the bodies
//
// The script does NOT decide *what* the subplans should be — that's the
// agent's/user's call. It just enforces the file layout and provides
// stubs so the work doesn't get lost.

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const KIT_ROOT = dirname(__dirname);
const TEMPLATES = join(KIT_ROOT, "templates");
const cwd = process.cwd();
const argv = process.argv.slice(2);

if (argv.length === 0 || argv.includes("--help") || argv.includes("-h")) {
  console.log(`pm decompose <plan-file>

Drafts subplan stubs from a plan file. For each top-level section in the
plan that has subplan checkboxes (e.g., "- [ ] Some subplan"), this writes
plans/subplans/<slug>.md from the SUBPLAN.md template.

Examples:
  pm decompose MASTER-PLAN.md
`);
  process.exit(0);
}

const planArg = argv[0];
const planPath = resolve(planArg);
if (!existsSync(planPath)) {
  console.error(`pm decompose: file not found: ${planPath}`);
  process.exit(2);
}
const tplPath = join(TEMPLATES, "SUBPLAN.md");
if (!existsSync(tplPath)) {
  console.error(`pm decompose: missing template ${tplPath}`);
  process.exit(2);
}

const plan = readFileSync(planPath, "utf8");
const tpl = readFileSync(tplPath, "utf8");

// Find sections and their subplan checkboxes.
const sectionRe = /^###\s+(\d+\.\s+([^\n]+))\n([\s\S]*?)(?=^###\s|\Z)/gm;
const subplanCheckRe = /^\s*- \[ \] (.+)$/gm;

const created = [];
let m;
while ((m = sectionRe.exec(plan)) !== null) {
  const sectionName = m[2].trim();
  const sectionBody = m[3];
  let s;
  while ((s = subplanCheckRe.exec(sectionBody)) !== null) {
    const subName = s[1].trim();
    if (!subName || /^\(/.test(subName)) continue;
    const slug = subName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40);
    const out = join(cwd, "plans/subplans", `${slug}.md`);
    if (existsSync(out)) {
      created.push({ slug, status: "skip (exists)", path: out });
      continue;
    }
    const filled = tpl
      .replaceAll("{{SUBPLAN_NAME}}", subName)
      .replaceAll("{{PARENT_SECTION}}", sectionName)
      .replaceAll("{{OWNER}}", process.env.USER || process.env.USERNAME || "(your name)")
      .replaceAll("{{EFFORT}}", "(estimate hours/days)")
      .replaceAll("{{WHAT}}", "")
      .replaceAll("{{WHY_NOW}}", "")
      .replaceAll("{{ACCEPTANCE_1}}", "")
      .replaceAll("{{ACCEPTANCE_2}}", "")
      .replaceAll("{{APPROACH}}", "")
      .replaceAll("{{DEP_1}}", "")
      .replaceAll("{{DOWNSTREAM_1}}", "")
      .replaceAll("{{SUBPLAN_RISK_1}}", "")
      .replaceAll("{{CRITIQUE_1}}", "")
      .replaceAll("{{CRITIQUE_1_RESPONSE}}", "")
      .replaceAll("{{CRITIQUE_2}}", "")
      .replaceAll("{{CRITIQUE_2_RESPONSE}}", "")
      .replaceAll("{{DATE}}", new Date().toISOString().slice(0, 10));
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, filled);
    created.push({ slug, status: "wrote", path: out });
  }
}

console.log(`Decomposed ${planArg}:`);
for (const c of created) console.log(`  ${c.status.padEnd(14)} plans/subplans/${c.slug}.md`);
if (created.length === 0) {
  console.log(
    `  (no subplan checkboxes found — add lines like "- [ ] Subplan name" under each\n   "### N. Section name" in ${planArg} and re-run)`
  );
}
console.log("\nNext: open each new subplan stub and fill in What / Why now / Acceptance test.");
