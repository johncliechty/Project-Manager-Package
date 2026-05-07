#!/usr/bin/env node
// pm log <entry>
// pm log --decision <entry>
// pm log --close-day <summary>
//
// Append-only. Cheap. Use liberally.

import { readFileSync, writeFileSync, existsSync, mkdirSync, appendFileSync } from "node:fs";
import { join, dirname } from "node:path";

const cwd = process.cwd();
const argv = process.argv.slice(2);

if (argv.length === 0 || argv.includes("--help") || argv.includes("-h")) {
  console.log(`pm log <entry>                     append to today's session log
pm log --decision <entry>          append to the decisions ledger
pm log --close-day <summary>       set the day's session summary

Examples:
  pm log "fixed the routing.json watcher race"
  pm log --decision "switching from B2 to R2 because egress is heavy"
  pm log --close-day "shipped the bounded-critique enforcer; tomorrow is decompose"
`);
  process.exit(0);
}

const today = new Date().toISOString().slice(0, 10);
const time = new Date().toTimeString().slice(0, 5);

function ensureDirFor(path) {
  mkdirSync(dirname(path), { recursive: true });
}

if (argv[0] === "--decision") {
  const entry = argv.slice(1).join(" ").trim();
  if (!entry) {
    console.error("pm log --decision requires an entry.");
    process.exit(2);
  }
  const slug = entry
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 50);
  const file = join(cwd, "logs/decisions", `${today}-${slug}.md`);
  ensureDirFor(file);
  const content = `## ${today} ${time} — ${entry}

**Context:** (fill in why this came up)

**Decision:** ${entry}

**Why:** (fill in the reasoning)

**Reversible?:** (yes/no, with the trigger that would prompt revisiting)
`;
  writeFileSync(file, content);
  console.log(`Wrote decision: ${file}`);
  console.log("(Open it and fill in the Context/Why/Reversible blocks while it's fresh.)");
  process.exit(0);
}

if (argv[0] === "--close-day") {
  const summary = argv.slice(1).join(" ").trim();
  if (!summary) {
    console.error("pm log --close-day requires a summary.");
    process.exit(2);
  }
  const file = join(cwd, "logs/sessions", `${today}.md`);
  ensureDirFor(file);
  let text = existsSync(file) ? readFileSync(file, "utf8") : `# Session log — ${today}\n\n## Session summary\n\n## Entries\n`;
  // Replace the empty "## Session summary\n\n" with the summary
  if (text.includes("## Session summary\n\n##")) {
    text = text.replace(
      "## Session summary\n\n",
      `## Session summary\n\n${summary}\n\n`
    );
  } else if (text.includes("## Session summary\n")) {
    text = text.replace(
      /## Session summary\n+/,
      `## Session summary\n\n${summary}\n\n`
    );
  } else {
    text = text + `\n\n## Session summary\n\n${summary}\n`;
  }
  writeFileSync(file, text);
  console.log(`Closed day: ${file}`);
  process.exit(0);
}

// Plain log entry
const entry = argv.join(" ").trim();
if (!entry) {
  console.error("pm log requires an entry.");
  process.exit(2);
}
const file = join(cwd, "logs/sessions", `${today}.md`);
ensureDirFor(file);
if (!existsSync(file)) {
  writeFileSync(
    file,
    `# Session log — ${today}\n\n## Session summary\n\n## Entries\n\n- ${time}: session opened.\n`
  );
}
appendFileSync(file, `- ${time}: ${entry}\n`);
console.log(`Logged to ${file}`);
