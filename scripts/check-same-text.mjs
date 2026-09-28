// The pages' text is unchanged: every page's text, tags, <style> and <script> stripped, is the same
// in two built folders (a build before the change and one after). Markup and classes may change.
// Usage: node scripts/check-same-text.mjs <before folder> [after folder, default _site]
// Exit 0 same, 2 different (or a page added or missing), 1 error.
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join, relative } from "node:path";

const [before, after = "_site"] = process.argv.slice(2);
if (!before) { console.error("usage: node scripts/check-same-text.mjs <before folder> [after folder]"); process.exit(1); }
const pages = (dir) => readdirSync(dir).flatMap((n) => {
  const p = join(dir, n);
  return statSync(p).isDirectory() ? pages(p) : p.endsWith(".html") ? [p] : [];
});
const entities = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'", "&nbsp;": " " };
const text = (f) => readFileSync(f, "utf8")
  .replace(/<(style|script)\b[\s\S]*?<\/\1>/gi, " ").replace(/<[^>]+>/g, " ")
  .replace(/&[#a-z0-9]+;/gi, (e) => entities[e] ?? e).replace(/\s+/g, " ").trim();

const names = new Set([...pages(before).map((f) => relative(before, f)), ...pages(after).map((f) => relative(after, f))]);
const result = {};
for (const n of [...names].sort()) {
  const a = join(before, n), b = join(after, n);
  result[n] = !existsSync(a) ? "added" : !existsSync(b) ? "missing" : text(a) === text(b) ? "same" : "different";
}
const ok = Object.values(result).every((v) => v === "same");
console.log(JSON.stringify({ ok, pages: result }, null, 2));
process.exitCode = ok ? 0 : 2;
