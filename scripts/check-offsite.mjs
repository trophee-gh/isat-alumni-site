// FE3: nothing on the built site is loaded from or sent to another host.
// Usage: node scripts/check-offsite.mjs [built folder, default _site]
// Scans every .html and .css: <script src>, <form action>, <button formaction>, <iframe src>,
// <link href> (stylesheets, fonts, preloads), media sources, and CSS url() / @import (fonts).
// A URL is off-site when it has a scheme (http:, https:, mailto:, ...) or starts with //;
// data: URLs are inline and allowed. Outbound <a href> links are navigation, not loading: allowed.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.argv[2] ?? "_site";

function files(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? files(path) : [path];
  });
}

const offsite = (url) => {
  const u = url.trim().replace(/^['"]|['"]$/g, "");
  return /^\/\//.test(u) || (/^[a-z][a-z0-9+.-]*:/i.test(u) && !/^data:/i.test(u));
};

// Element, attribute: each loads or sends to its URL.
const attrs = [
  ["script", "src"], ["form", "action"], ["button", "formaction"], ["input", "formaction"],
  ["iframe", "src"], ["frame", "src"], ["link", "href"], ["img", "src"], ["img", "srcset"],
  ["source", "src"], ["source", "srcset"], ["video", "src"], ["video", "poster"], ["audio", "src"],
  ["embed", "src"], ["object", "data"], ["track", "src"],
];

function checkCss(css, where, found) {
  for (const m of css.matchAll(/url\(\s*([^)]+?)\s*\)|@import\s+['"]([^'"]+)['"]/gi)) {
    const url = (m[1] ?? m[2]).replace(/^['"]|['"]$/g, "");
    if (offsite(url)) found.push({ file: where, what: m[1] ? "css url()" : "css @import", url });
  }
}

function checkHtml(html, where, found) {
  for (const [el, attr] of attrs) {
    const tag = new RegExp(`<${el}\\b[^>]*>`, "gi");
    const val = new RegExp(`\\s${attr}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>]+))`, "i");
    for (const t of html.matchAll(tag)) {
      const m = t[0].match(val);
      if (!m) continue;
      // A <link> that only names a page (canonical, alternate...) loads nothing.
      if (el === "link" && /\srel\s*=\s*["']?(canonical|alternate|me|author|license|help)\b/i.test(t[0])) continue;
      const value = m[2] ?? m[3] ?? m[4];
      const urls = attr === "srcset" ? value.split(",").map((s) => s.trim().split(/\s+/)[0]) : [value];
      for (const url of urls) {
        if (offsite(url)) found.push({ file: where, what: `<${el} ${attr}>`, url });
      }
    }
  }
  for (const m of html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)) checkCss(m[1], where, found);
  for (const m of html.matchAll(/\sstyle\s*=\s*("([^"]*)"|'([^']*)')/gi)) checkCss(m[2] ?? m[3], where, found);
}

const found = [];
let scanned = 0;
for (const path of files(root)) {
  const where = relative(root, path).replaceAll("\\", "/");
  if (path.endsWith(".html")) checkHtml(readFileSync(path, "utf8"), where, found);
  else if (path.endsWith(".css")) checkCss(readFileSync(path, "utf8"), where, found);
  else continue;
  scanned++;
}

console.log(JSON.stringify({ ok: found.length === 0, scanned, found }, null, 2));
process.exit(found.length === 0 ? 0 : 2);
