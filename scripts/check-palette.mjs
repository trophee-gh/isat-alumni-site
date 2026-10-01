// Every colour on the built site is from the ISAT chart (Octobre 2025) or the Trait neutrals (isat-6),
// opaque or with transparency.
// Usage: node scripts/check-palette.mjs [built folder, default _site]
// Scans every .css file and every <style> block and style="" attribute in .html: hex, rgb(a), hsl(a)
// colours, and any bare word in a colour property that is not a keyword (a named colour).
// The chart's secondary palette is not listed: its values are TBD here; add them when one is used.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.argv[2] ?? "_site";

const chart = new Set([
  "a10e2f", // burgundy, Pantone 201 C
  "600815", // burgundy, dark tint
  "e4c8cb", // burgundy, light tint
  "303b3e", // logo grey, Pantone 425
  "65696b", "000000", "ffffff", // web palette
  "e7d0c1", // beige, Pantone 4755 C at 60 %
  // Trait neutrals (isat-5 converged pick, isat-6): paper, paper-2, line, ink, muted, photo placeholders.
  "f4f3ef", "ecebe5", "dcdad3", "111111", "6b6b6b", "d5d7d4", "c3c6c2",
]);

const hex2 = (h) => (h.length <= 4 ? [...h].map((c) => c + c).join("") : h).toLowerCase();
const keywords = new Set(["transparent", "currentcolor", "inherit", "initial", "unset", "revert", "none",
  "solid", "dashed", "dotted", "double", "underline", "auto", "from-font",
  // Colour and image functions whose colour arguments are checked above (isat-6: color-mix, gradients).
  "color-mix", "in", "srgb", "linear-gradient", "radial-gradient", "to", "right", "left", "top", "bottom",
  "center", "circle", "at", "no-repeat", "inset", "-"]);
const colourProps = /^(color|background(-color)?|border(-(top|right|bottom|left))?(-color)?|outline(-color)?|text-decoration(-color)?|box-shadow|text-shadow|fill|stroke|caret-color|accent-color|column-rule(-color)?)$/i;

// The declarations of a stylesheet (or of a style="" attribute), selectors left out.
const declarations = (css) => css.replace(/\/\*[\s\S]*?\*\//g, "")
  .split(/[{};]/).map((d) => d.match(/^\s*([a-z-]+)\s*:\s*([\s\S]+?)\s*$/i)).filter(Boolean);

function check(css, where, found) {
  for (const [, prop, value] of declarations(css)) checkValue(prop, value, where, found);
}

function checkValue(prop, css, where, found) {
  for (const m of css.matchAll(/#([0-9a-f]{3,8})\b/gi)) {
    const h = m[1];
    if (![3, 4, 6, 8].includes(h.length)) continue;
    const full = hex2(h);
    const rgb = full.slice(0, 6), alpha = full.slice(6);
    if (alpha && alpha !== "ff") {
      if (!chart.has(rgb)) found.push({ file: where, colour: m[0], why: "transparent, not in the palette" });
    } else if (!chart.has(rgb)) found.push({ file: where, colour: m[0], why: "not in the chart" });
  }
  for (const m of css.matchAll(/rgba?\(\s*([^)]*)\)/gi)) {
    const [r, g, b, a] = m[1].split(/[\s,/]+/).filter(Boolean);
    const rgb = [r, g, b].map((v) => Number(v).toString(16).padStart(2, "0")).join("");
    if (a !== undefined && Number(a.replace("%", "")) < (a.endsWith("%") ? 100 : 1)) {
      if (!chart.has(rgb)) found.push({ file: where, colour: m[0], why: "transparent, not in the palette" });
    } else if (!chart.has(rgb)) found.push({ file: where, colour: m[0], why: "not in the chart" });
  }
  for (const m of css.matchAll(/hsla?\([^)]*\)/gi)) found.push({ file: where, colour: m[0], why: "hsl: write it as hex" });
  if (colourProps.test(prop)) {
    const rest = css.replace(/var\([^)]*\)|hsla?\([^)]*\)|rgba?\([^)]*\)|#[0-9a-f]+|[\d.]+[a-z%]*/gi, " ");
    for (const w of rest.match(/[a-z-]+/gi) ?? []) {
      if (!keywords.has(w.toLowerCase())) found.push({ file: where, colour: w, why: "a named colour or unknown word" });
    }
  }
}

function files(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? files(path) : [path];
  });
}

const found = [];
let scanned = 0;
for (const f of files(root)) {
  const where = relative(root, f);
  if (f.endsWith(".css")) { check(readFileSync(f, "utf8"), where, found); scanned++; }
  else if (f.endsWith(".html")) {
    const html = readFileSync(f, "utf8");
    for (const m of html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)) check(m[1], where, found);
    for (const m of html.matchAll(/\sstyle\s*=\s*("([^"]*)"|'([^']*)')/gi)) check(m[2] ?? m[3], where, found);
    scanned++;
  }
}
const ok = found.length === 0;
console.log(JSON.stringify({ ok, scanned, found }, null, 2));
process.exitCode = ok ? 0 : 2;
