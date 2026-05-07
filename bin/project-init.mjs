#!/usr/bin/env node
// pm init — bootstrap a new project, or absorb an existing folder.
//
// Two modes:
//   1. Empty/missing folder → interactive bootstrap, write the standard layout.
//   2. Folder with existing material → write a proposal file and stop.
//      User reviews, runs `pm init --confirm` to apply.
//
// Non-interactive: pass --answers <file.json>.

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createInterface } from "node:readline/promises";
import { spawnSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const KIT_ROOT = dirname(__dirname);
const TEMPLATES = join(KIT_ROOT, "templates");

const argv = process.argv.slice(2);
const FLAG_CONFIRM = argv.includes("--confirm");
const FLAG_HELP = argv.includes("--help") || argv.includes("-h");
const answersIdx = argv.indexOf("--answers");
const ANSWERS_FILE = answersIdx >= 0 ? argv[answersIdx + 1] : null;

const TARGET = (
  argv.find((a, i) => !a.startsWith("--") && argv[i - 1] !== "--answers") || "."
).trim();
const TARGET_ABS = resolve(TARGET);

if (FLAG_HELP) {
  console.log("pm init [<directory>] [--confirm] [--answers <file.json>]\n\nBootstrap a project at <directory> (default: current).\n\nModes:\n  - Empty/missing dir: interactive bootstrap (or --answers).\n  - Existing dir: writes pm-init.proposal.md and stops.\n    Re-run with --confirm.\n\nThe --answers JSON should have: projectName, oneLiner, intent, targetUser,\nsuccessList[], constraints, horizonDraft, horizonShip,\nbackupChoice ('1'|'2'|'3'|'4'), dailyBrief (bool), isGwl (bool).\n");
  process.exit(0);
}

const today = new Date().toISOString().slice(0, 10);
const nowTime = new Date().toTimeString().slice(0, 5);

function readTemplate(name) {
  return readFileSync(join(TEMPLATES, name), "utf8");
}
function fill(text, vars) {
  return Object.entries(vars).reduce(
    (s, [k, v]) => s.replaceAll("{{" + k + "}}", String(v ?? "")),
    text
  );
}
function bn(p) {
  return p.split(/[\\\/]/).pop() || "project";
}
function dirIsBootstrapEligible(dir) {
  if (!existsSync(dir)) return { mode: "new", reason: "folder does not exist" };
  const entries = readdirSync(dir).filter((e) => !e.startsWith("."));
  if (entries.length === 0) return { mode: "new", reason: "empty folder" };
  if (entries.length <= 2 && entries.every((e) => /^(README|LICENSE|license)/i.test(e)))
    return { mode: "new", reason: "only README/LICENSE present" };
  return { mode: "existing", reason: entries.length + " entries already present" };
}
async function ask(rl, prompt, def) {
  const suffix = def ? " [" + def + "]" : "";
  const ans = (await rl.question(prompt + suffix + ": ")).trim();
  return ans || def || "";
}
async function askBool(rl, prompt, def) {
  const ans = (await ask(rl, prompt + " (y/n)", def ? "y" : "n")).toLowerCase();
  return ans.startsWith("y");
}
async function interactiveQuestionnaire() {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  console.log("\npm init — let's set up the project. Hit Enter for defaults.\n");
  const projectName = await ask(rl, "Project name", bn(TARGET_ABS));
  const oneLiner = await ask(rl, "One-line summary (you'll read this in 6 months)", "");
  console.log("\nIn one paragraph: what is this project, and why now?");
  const intent = await ask(rl, "Intent", "");
  const targetUser = await ask(rl, "Target user (be specific)", "");
  console.log("\nThree measurable success criteria, comma-separated:");
  const successRaw = await ask(rl, "Success criteria", "");
  const constraints = await ask(rl, "Known constraints", "");
  const horizonDraft = await ask(rl, "Working draft target", "4 weeks");
  const horizonShip = await ask(rl, "Shippable target", "12 weeks");
  console.log("\nBackup: 1) GitHub (rec)  2) Backblaze B2  3) Cloudflare R2  4) defer");
  const backupChoice = await ask(rl, "Choice (1-4)", "1");
  const dailyBrief = await askBool(rl, "Generate a daily investor brief?", true);
  const isGwl = await askBool(rl, "Is this a Ghost World Labs project?", false);
  rl.close();
  return {
    projectName, oneLiner, intent, targetUser,
    successList: successRaw.split(",").map((s) => s.trim()).filter(Boolean),
    constraints, horizonDraft, horizonShip,
    backupChoice: ["1","2","3","4"].includes(backupChoice) ? backupChoice : "1",
    dailyBrief, isGwl,
  };
}
function writeIfMissing(path, content) {
  if (existsSync(path)) { console.log("  - skip (exists): " + path); return false; }
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content);
  console.log("  + " + path);
  return true;
}
function scanExisting(target) {
  const visible = readdirSync(target).filter((e) => !e.startsWith("."));
  const proposedAdds = ["PROJECT.md","MASTER-PLAN.md","AGENTS.md","CLAUDE.md","GEMINI.md","briefs/ (dir)","logs/ (dir)","plans/ (dir)",".pm/state.json",".pm/critique-passes.json"];
  const proposedMoves = [];
  for (const e of visible) {
    const lower = e.toLowerCase();
    if (lower === "todo.txt" || lower === "todo.md")
      proposedMoves.push({ from: e, to: "MASTER-PLAN.md (Next concrete actions)" });
    if (/^plan(-v\d+)?\.md$/i.test(e))
      proposedMoves.push({ from: e, to: "plans/proto-v1.md (archived)" });
    if (/^notes\.md$/i.test(e))
      proposedMoves.push({ from: e, to: "plans/proto-v1.md (archived)" });
  }
  let synthesis = "(I read the folder; adjust as needed.)";
  const readme = visible.find((e) => /^readme\.md$/i.test(e));
  if (readme) {
    const text = readFileSync(join(target, readme), "utf8");
    const firstPara = text.split(/\n\s*\n/).find((p) => p.trim() && !p.startsWith("#"));
    if (firstPara) synthesis = firstPara.trim().slice(0, 600);
  }
  const untouched = visible.filter((e) => {
    const lower = e.toLowerCase();
    return !["todo.txt","todo.md"].includes(lower) && !/^plan(-v\d+)?\.md$/i.test(e);
  });
  return { entriesCount: visible.length, proposedAdds, proposedMoves, untouched, synthesis };
}
function writeProposal(target, scan) {
  const proposalPath = join(target, "pm-init.proposal.md");
  let content = "# Bootstrap proposal for " + bn(target) + "\n\n";
  content += "**Generated:** " + today + " " + nowTime + "\n\n";
  content += "This folder already has content (" + scan.entriesCount + " entries). I am not going to write\n";
  content += "anything yet. Below is what I would add. Review, edit this file in place if you want\n";
  content += "something different, then run:\n\n    pm init --confirm\n\n";
  content += "## Files I would add\n\n" + scan.proposedAdds.map((p) => "- " + p).join("\n") + "\n\n";
  content += "## Files I would consider reorganizing (only with permission)\n\n";
  content += scan.proposedMoves.length === 0
    ? "(none)\n\n"
    : scan.proposedMoves.map((p) => "- " + p.from + " -> " + p.to).join("\n") + "\n\n";
  content += "## Files I would not touch\n\n" + scan.untouched.map((p) => "- " + p).join("\n") + "\n\n";
  content += "## What I think this project is\n\n" + scan.synthesis + "\n\n";
  content += "## What I want you to confirm\n\n- Is the synthesis right?\n- Target user, one specific sentence?\n- Three measurable success criteria?\n- Constraints?\n\nWhen ready, edit answers below under '## Confirmed answers', then run `pm init --confirm`.\n";
  writeFileSync(proposalPath, content);
  console.log("\nWrote proposal: " + proposalPath);
  console.log("\nNext: review, edit, then run `pm init --confirm`.");
}
function applyBootstrap(target, vars) {
  console.log("\nApplying bootstrap to " + target + "...");
  mkdirSync(target, { recursive: true });
  for (const d of ["plans","plans/subplans","briefs","briefs/archive","logs","logs/sessions","logs/decisions","logs/critique","code","data","skills","tools",".pm"]) {
    mkdirSync(join(target, d), { recursive: true });
  }
  const projectVars = {
    PROJECT_NAME: vars.projectName,
    ONE_LINER: vars.oneLiner,
    INTENT_PARAGRAPH: vars.intent,
    TARGET_USER: vars.targetUser,
    SUCCESS_CRITERIA: (vars.successList || []).map((s) => "- " + s).join("\n") || "- (define)",
    CONSTRAINTS: vars.constraints,
    HORIZON_DRAFT: vars.horizonDraft,
    HORIZON_SHIPPABLE: vars.horizonShip,
    BUILDER: process.env.USER || process.env.USERNAME || "(your name)",
    VALIDATOR: "(same as builder)",
    BILLPAYER: "(same as builder)",
    ANTI_GOAL_1: "(fill in something this project is NOT trying to do)",
    ANTI_GOAL_2: "(another)",
    DATE: today, TODAY: today, TIME: nowTime,
    NORTH_STAR: vars.oneLiner,
    STRATEGY_PARAGRAPH: vars.intent,
    PHASE: "proto",
    CRITIQUE_PASS_GLOBAL: "0",
    SECTION_1_NAME: "(define your first major section)",
    SECTION_1_WHAT: "", SECTION_1_WHY_NOW: "", SECTION_1_TEST: "",
    SUBPLAN_1_1: "", SUBPLAN_1_2: "", OPEN_Q_1_1: "",
    SECTION_2_NAME: "(define your second major section)",
    NOT_DOING_1: "", RISK_1: "", MITIGATION_1: "",
    NEXT_1: "Read MASTER-PLAN.md and fill in Section 1.",
    NEXT_2: "Run `pm critique MASTER-PLAN.md` once Section 1 has content.",
    NEXT_3: "Run `pm log \"<what you did today>\"` at session close.",
    KIT_PATH: "(path to project-manager-kit, varies by host)",
    KIT_LOCATION_NOTE: vars.isGwl
      ? "Skill source-of-truth: C:\\dev\\Agentic-Home\\project-manager-kit\\."
      : "Skill source-of-truth: wherever the user cloned project-manager-kit.",
    YESTERDAY_DATE: today,
    ONE_LINE_PITCH: vars.oneLiner,
    PLAIN_LANGUAGE_SUMMARY: vars.intent,
    WHY_NOW: "(fill in)",
    WORKING_TODAY: "(fresh project — nothing yet; that's honest)",
    SHIPPED_THIS_WEEK: "(none yet)",
    WORKING_NOW: "(see MASTER-PLAN.md)",
    RECENT_DECISIONS: "(none yet)",
    OPEN_QUESTIONS: "(fill in 2-3 questions a thoughtful skeptic would ask)",
    FAILURE_MODES: "(fill in 2-3 specific failure modes)",
    TEAM_CAPACITY: "Solo, ~10 hours/week (adjust)",
    BURN: "(none yet)",
    ASKS: "(fill in once you know)",
  };
  writeIfMissing(join(target, "PROJECT.md"), fill(readTemplate("PROJECT.md"), projectVars));
  writeIfMissing(join(target, "MASTER-PLAN.md"), fill(readTemplate("MASTER-PLAN.md"), projectVars));
  writeIfMissing(join(target, "briefs/investor-brief-current.md"), fill(readTemplate("INVESTOR-BRIEF.md"), projectVars));
  writeIfMissing(join(target, "AGENTS.md"), fill(readTemplate("AGENTS.md"), projectVars));
  writeIfMissing(join(target, "CLAUDE.md"), fill(readTemplate("CLAUDE.md"), projectVars));
  writeIfMissing(join(target, "GEMINI.md"), fill(readTemplate("GEMINI.md"), projectVars));
  if (vars.isGwl) writeIfMissing(join(target, "GWLabs.md"), fill(readTemplate("GWLabs.md"), projectVars));
  writeIfMissing(join(target, "logs/sessions", today + ".md"), fill(readTemplate("SESSION-LOG.md"), projectVars));
  writeIfMissing(join(target, ".gitignore"), readTemplate("gitignore.template"));
  writeIfMissing(
    join(target, "logs/decisions/README.md"),
    "# Decisions log\n\nAppend-only. One file per significant decision, named\n`YYYY-MM-DD-<slug>.md`.\n\nTemplate:\n\n```\n## " + today + " — <one-line title>\n\n**Context:** what's going on that prompted this.\n\n**Decision:** what we decided.\n\n**Why:** why this and not alternatives.\n\n**Reversible?:** yes/no, with the trigger that would prompt revisiting.\n```\n"
  );
  const state = {
    schemaVersion: 1,
    projectName: vars.projectName,
    createdAt: new Date().toISOString(),
    phase: "proto",
    skillRepo: vars.isGwl
      ? "C:\\Users\\jcl12\\OneDrive - The Pennsylvania State University\\Research\\AI Skill Repo\\Agent Review\\skills"
      : null,
    backupChoice: { "1": "github", "2": "b2", "3": "r2", "4": "defer" }[vars.backupChoice],
    dailyBriefEnabled: vars.dailyBrief,
    isGwl: vars.isGwl,
    whatNowWeights: null,
    blockers: [],
  };
  writeIfMissing(join(target, ".pm/state.json"), JSON.stringify(state, null, 2) + "\n");
  writeIfMissing(join(target, ".pm/critique-passes.json"), JSON.stringify({ schemaVersion: 1, sections: {} }, null, 2) + "\n");
  writeIfMissing(
    join(target, "README.md"),
    "# " + vars.projectName + "\n\n" + vars.oneLiner + "\n\nThis project is operated with the project-manager skill. To get oriented:\n\n1. Read `PROJECT.md`.\n2. Read `MASTER-PLAN.md`.\n3. Run `pm what-now` for ranked next actions, or `pm status`.\n\nTool-specific orientation: `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`" + (vars.isGwl ? ", `GWLabs.md`" : "") + ".\n"
  );
  if (!existsSync(join(target, ".git"))) {
    const r = spawnSync("git", ["init", "-q"], { cwd: target });
    if (r.status === 0) console.log("  + initialized local git repo");
    else console.log("  ! git init failed (skipping)");
  }
  console.log("\nDone. Next:");
  console.log("  - Open MASTER-PLAN.md and fill in Section 1.");
  console.log("  - Run `pm critique MASTER-PLAN.md` once Section 1 has content.");
  console.log("  - When ready, `pm github-init` for a remote.");
  if (vars.dailyBrief) console.log("  - Daily brief refresh: `pm brief --schedule`.");
}
(async () => {
  const eligibility = dirIsBootstrapEligible(TARGET_ABS);
  if (FLAG_CONFIRM) {
    const proposalPath = join(TARGET_ABS, "pm-init.proposal.md");
    if (!existsSync(proposalPath)) {
      console.error("--confirm requires a pm-init.proposal.md in the target dir.");
      console.error("Run `pm init` first.");
      process.exit(2);
    }
    console.log("Applying proposal. Some fields will need short answers:");
    let answers = ANSWERS_FILE
      ? JSON.parse(readFileSync(ANSWERS_FILE, "utf8"))
      : await interactiveQuestionnaire();
    applyBootstrap(TARGET_ABS, answers);
    return;
  }
  if (eligibility.mode === "new") {
    console.log("pm init: bootstrapping " + TARGET_ABS + " (" + eligibility.reason + ")");
    let answers;
    if (ANSWERS_FILE) {
      answers = JSON.parse(readFileSync(ANSWERS_FILE, "utf8"));
      console.log("(answers loaded from " + ANSWERS_FILE + ")");
    } else {
      answers = await interactiveQuestionnaire();
    }
    applyBootstrap(TARGET_ABS, answers);
  } else {
    console.log("pm init: existing folder (" + eligibility.reason + "). Generating proposal.");
    const scan = scanExisting(TARGET_ABS);
    writeProposal(TARGET_ABS, scan);
  }
})().catch((err) => {
  console.error("pm init failed:", err.message);
  process.exit(1);
});
