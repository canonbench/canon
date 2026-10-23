// Moves the fetched canon into canon.json, rewrites CANON.md, and prints the commit message.
import { existsSync, readFileSync, renameSync, writeFileSync } from "node:fs";

const fresh = process.argv[2];
const before = existsSync("canon.json") ? JSON.parse(readFileSync("canon.json", "utf8")) : { questions: [] };
const canon = JSON.parse(readFileSync(fresh, "utf8"));
renameSync(fresh, "canon.json");

const old = new Map(before.questions.map((q) => [q.id, q]));
const now = new Set(canon.questions.map((q) => q.id));
const added = canon.questions.filter((q) => !old.has(q.id)).length;
const removed = before.questions.filter((q) => !now.has(q.id)).length;
const moved = canon.questions.filter((q) => old.has(q.id) && old.get(q.id).rank !== q.rank).length;
const reweighed = canon.questions.filter((q) => old.has(q.id) && old.get(q.id).weight !== q.weight).length;

const site = canon.questions.length ? new URL(canon.questions[0].url).origin : "";
const cell = (s) => String(s ?? "").replace(/\|/g, "\\|").replace(/\s*\n\s*/g, " ");

function answer(q) {
  if (q.type === "mcq") return q.answer.map((i) => q.options[i]).join(", ");
  if (q.type === "number") return `${q.answer.toLocaleString("en-US")} ${q.unit}`.trim();
  return q.answer;
}

const lines = [
  "# The canon",
  "",
  `The top questions that together hold ${canon.share * 100}% of all weight on [Canon Bench](${site}), heaviest first. ${canon.questions.length} questions; the lightest still in weighs ${canon.line}.`,
  "",
  "| # | Question | Answer | Field | Weight |",
  "|--:|---|---|---|--:|",
  ...canon.questions.map(
    (q) => `| ${q.rank} | [${cell(q.prompt)}](${q.url}) | ${cell(answer(q))} | ${cell(q.field)} | ${q.weight} |`,
  ),
  "",
];
writeFileSync("CANON.md", lines.join("\n"));

const date = new Date().toISOString().slice(0, 10);
const parts = [
  added && `${added} in`,
  removed && `${removed} out`,
  moved && `${moved} moved`,
  reweighed && `${reweighed} reweighed`,
].filter(Boolean);
console.log(`Canon, ${date}${parts.length ? `: ${parts.join(", ")}` : ""}`);
