#!/usr/bin/env node
// pm brief — regenerate briefs/investor-brief-current.md from current project state.
//
// This script is *deterministic* — it doesn't call an LLM. It assembles
// the brief from the project's own files (PROJECT.md, MASTER-PLAN.md,
// logs/sessions/, logs/decisions/, .pm/state.json) into the template at
// templates/INVESTOR-BRIEF.md.
//
// For the *language polish* of the brief — making it read for a non-
// technical investor — the kit assumes the user (or their agent) will
// edit briefs/investor-brief-current.md after the regeneration. The
// regeneration's job is to ensure the *facts* are current.
//
// Idempotent: archives yesterday's brief, then writes today's.

import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, statSync, copyFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const KIT_ROOT = dirname(__dirname);
const TEMPLATES = join(KIT_ROOT, "templates");
const cwd = process.cwd();
const argv = process.argv.slice(2);

if (argv.includes("--help") || argv.includes("-h")) {
  console.log(`pm brief                       regenerate briefs/investor-brief-current.md
pm brief --schedule            register the daily 7 AM Cowork scheduled task
pm brief --schedule --cron     print the cron line to add (Mac/Linux)
pm brief --schedule --windows  also install a Windows Task Scheduler entry
`);
  process.exit(0);
}

if (argv.includes("--schedule")) {
  await registerSchedule(argv);
  process.exit(0);
}

regenerate();

function regenerate() {
  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

  const project = readMaybe(join(cwd, "PROJECT.md"));
  const master = readMaybe(join(cwd, "MASTER-PLAN.md"));
  const stateRaw = readMaybe(join(cwd, ".pm/state.json"));
  const state = stateRaw ? safeJson(stateRaw) : null;

  if (!state) {
    console.error("No .pm/state.json found. Run `pm init` first.");
    process.exit(2);
  }

  const oneLiner = grabOneLiner(project) || state.oneLiner || state.projectName;
  const intent = grabIntent(project) || "(see PROJECT.md)";

  const sessionsDir = join(cwd, "logs/sessions");
  const decisionsDir = join(cwd, "logs/decisions");

  const last7Sessions = lastNDaysOfFiles(sessionsDir, 7);
  const last14Decisions = lastNDaysOfFiles(decisionsDir, 14);

  const shippedThisWeek = bulletizeSessionEntries(last7Sessions, sessionsDir, /shipped|landed|merged|deploy|done|complete/i);
  const workingNow = extractFromMasterPlan(master, "building");
  const recentDecisions = formatDecisions(last14Decisions, decisionsDir).slice(0, 3);

  const tplPath = join(TEMPLATES, "INVESTOR-BRIEF.md");
  if (!existsSync(tplPath)) {
    console.error(`Missing template: ${tplPath}`);
    process.exit(2);
  }
  let body = readFileSync(tplPath, "utf8");

  const subs = {
    PROJECT_NAME: state.projectName,
    DATE: today,
    YESTERDAY_DATE: yesterday,
    ONE_LINE_PITCH: oneLiner,
    PLAIN_LANGUAGE_SUMMARY: intent,
    WHY_NOW: extractWhyNow(project) || "(fill in)",
    WORKING_TODAY: extractFromMasterPlan(master, "built").join("\n") || "(none yet — that's honest for a fresh project)",
    SHIPPED_THIS_WEEK: shippedThisWeek.length > 0 ? shippedThisWeek.join("\n") : "(no shipping events logged this week — log liberally with `pm log`)",
    WORKING_NOW: workingNow.length > 0 ? workingNow.join("\n") : "(see MASTER-PLAN.md sections marked 'building')",
    RECENT_DECISIONS: recentDecisions.length > 0 ? recentDecisions.join("\n\n") : "(none logged in the last 14 days)",
    OPEN_QUESTIONS: "(fill in 2–3 questions a thoughtful skeptic would ask, with our current best answer)",
    FAILURE_MODES: "(fill in 2–3 specific failure modes we're actively watching)",
    TEAM_CAPACITY: state.teamCapacity || "(fill in team and hours/week)",
    BURN: state.burn || "(fill in monthly run-rate)",
    ASKS: state.asks || "(fill in what you'd want from a collaborator/investor)",
  };

  for (const [k, v] of Object.entries(subs)) {
    body = body.replaceAll(`{{${k}}}`, String(v ?? ""));
  }

  // Archive yesterday's brief if present
  const currentPath = join(cwd, "briefs/investor-brief-current.md");
  const archiveDir = join(cwd, "briefs/archive");
  mkdirSync(archiveDir, { recursive: true });
  if (existsSync(currentPath)) {
    const stat = statSync(currentPath);
    const stamp = new Date(stat.mtimeMs).toISOString().slice(0, 10);
    if (stamp !== today) {
      const archived = join(archiveDir, `investor-brief-${stamp}.md`);
      if (!existsSync(archived)) {
        copyFileSync(currentPath, archived);
        console.log(`Archived: ${archived}`);
      }
    }
  }
  mkdirSync(dirname(currentPath), { recursive: true });
  writeFileSync(currentPath, body);
  console.log(`Wrote: ${currentPath}`);
  console.log("(The script populated facts; consider an editing pass for an investor reader's voice.)");
}

async function registerSchedule(argv) {
  const wantsCron = argv.includes("--cron");
  const wantsWindows = argv.includes("--windows");
  const briefPath = `node ${join(KIT_ROOT, "bin/update-investor-brief.mjs").replace(/\\/g, "/")}`;
  const cwdEsc = cwd.replace(/\\/g, "/");

  if (wantsCron) {
    console.log("Add this line to your crontab (`crontab -e`):");
    console.log(`0 7 * * * cd ${cwdEsc} && ${briefPath}`);
    return;
  }
  if (wantsWindows) {
    const scriptPath = join(KIT_ROOT, "bin/install-windows-task.ps1");
    console.log(`Run as administrator:`);
    console.log(`  powershell.exe -ExecutionPolicy Bypass -File "${scriptPath}" -ProjectPath "${cwd}"`);
    return;
  }
  // Default: print Cowork schedule registration instructions.
  console.log(
    `To register a daily 7 AM Cowork scheduled task, run this from the Cowork app:\n` +
      `\n` +
      `  Use the schedule skill to register a task:\n` +
      `    name: "${(safeJson(readMaybe(join(cwd, ".pm/state.json"))) || {}).projectName || "project"} — daily investor brief"\n` +
      `    schedule: "0 7 * * *"\n` +
      `    command: "cd ${cwdEsc} && ${briefPath}"\n` +
      `\n` +
      `For unattended overnight runs (Cowork not open), also pass --windows to register a Task Scheduler entry, or --cron for the crontab line.`
  );
}

function readMaybe(p) {
  return existsSync(p) ? readFileSync(p, "utf8") : "";
}
function safeJson(s) {
  try {
    return JSON.parse(s);
  } catch {
    return null;
  }
}
function grabOneLiner(project) {
  const m = project.match(/\*\*One-line summary[^:]*:\s*\*\*\s*([^\n]+)/i);
  return m ? m[1].trim() : null;
}
function grabIntent(project) {
  const m = project.match(/##\s+What this is\s*\n+([\s\S]*?)\n##/i);
  return m ? m[1].trim() : null;
}
function extractWhyNow(project) {
  // best-effort — not always present
  const m = project.match(/##\s+Why now\s*\n+([\s\S]*?)\n##/i);
  return m ? m[1].trim() : null;
}
function extractFromMasterPlan(master, status) {
  const out = [];
  const re = /^###\s+(\d+\.\s+[^\n]+)\n+\*\*Status:\*\*\s+([^\n]+)/gm;
  let m;
  while ((m = re.exec(master)) !== null) {
    if (m[2].toLowerCase().includes(status)) {
      out.push(`- ${m[1].trim()}`);
    }
  }
  return out;
}
function lastNDaysOfFiles(dir, n) {
  if (!existsSync(dir)) return [];
  const cutoff = Date.now() - n * 86400000;
  return readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => ({ f, t: statSync(join(dir, f)).mtimeMs }))
    .filter((x) => x.t >= cutoff)
    .sort((a, b) => b.t - a.t)
    .map((x) => x.f);
}
function bulletizeSessionEntries(files, dir, regex) {
  const out = [];
  for (const f of files) {
    const lines = readFileSync(join(dir, f), "utf8").split("\n");
    for (const l of lines) {
      const m = l.match(/^-\s+\d{2}:\d{2}:\s+(.+)/);
      if (m && regex.test(m[1])) {
        out.push(`- ${m[1]}  *(${f.replace(/\.md$/, "")})*`);
      }
    }
  }
  return out.slice(0, 10);
}
function formatDecisions(files, dir) {
  return files.map((f) => {
    const text = readFileSync(join(dir, f), "utf8");
    const title = (text.match(/^##\s+[\d-]+\s+[\d:]+\s+—\s+(.+)/m) || [])[1] || f;
    const why = (text.match(/\*\*Why:\*\*\s+([^\n]+)/) || [])[1] || "(see decision file)";
    return `- **${title}** — ${why}`;
  });
}
