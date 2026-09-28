// Text on its background reaches WCAG 2 contrast: 4.5:1, or 3:1 for text 24 px and up.
// Usage: node scripts/check-contrast.mjs <pairs.json>
// The pairs are named by a reader of the built CSS (a fresh-context model, per the episode's clause):
// { "pairs": [ { "where": "...", "fg": "#rrggbb", "bg": "#rrggbb", "px": 16 } ] }. This script only
// does the arithmetic. Exit 0 all pass, 2 some fail, 1 error.
import { readFileSync } from "node:fs";

const file = process.argv[2];
if (!file) { console.error("usage: node scripts/check-contrast.mjs <pairs.json>"); process.exit(1); }
const lum = (h) => {
  const c = [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const { pairs } = JSON.parse(readFileSync(file, "utf8"));
const rows = pairs.map((p) => {
  if (!/^#[0-9a-f]{6}$/i.test(p.fg) || !/^#[0-9a-f]{6}$/i.test(p.bg)) throw new Error(`${p.where}: colours as #rrggbb`);
  const [a, b] = [lum(p.fg), lum(p.bg)].sort((x, y) => y - x);
  const ratio = Math.round(((a + 0.05) / (b + 0.05)) * 100) / 100, need = p.px >= 24 ? 3 : 4.5;
  return { ...p, ratio, need, ok: ratio >= need };
});
const ok = rows.every((r) => r.ok);
console.log(JSON.stringify({ ok, pairs: rows }, null, 2));
process.exitCode = ok ? 0 : 2;
