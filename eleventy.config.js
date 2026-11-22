export default function (eleventyConfig) {
  // ANNUAIRE_FIXTURE swaps in an uncommitted test file (kept under data/, which is ignored).
  const annuaire = process.env.ANNUAIRE_FIXTURE || "src/annuaire/annuaire.json";
  eleventyConfig.addPassthroughCopy({ [annuaire]: "annuaire/annuaire.json" });
  eleventyConfig.addPassthroughCopy("src/fonts/**/*.woff2");
  eleventyConfig.addPassthroughCopy("src/fonts/**/*.txt");
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/favicon.svg");
  eleventyConfig.addFilter("pad2", (n) => String(n).padStart(2, "0"));
  // Sections shown on a page (F5): a page lists its section ids, a hidden one as false.
  // secs: drop the hidden; secNum: "03 / 05" for an id; onPage: hub links to hidden sections dropped.
  const pad2 = (n) => String(n).padStart(2, "0");
  eleventyConfig.addFilter("secs", (ids) => ids.filter(Boolean));
  eleventyConfig.addFilter("secNum", (id, secs) => `${pad2(secs.indexOf(id) + 1)} / ${pad2(secs.length)}`);
  eleventyConfig.addFilter("onPage", (hub, secs) => hub.filter((h) => !h.href.startsWith("#") || secs.includes(h.href.slice(1))));
  return {
    dir: { input: "src", output: "_site" },
  };
}
