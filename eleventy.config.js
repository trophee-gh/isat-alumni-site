export default function (eleventyConfig) {
  // ANNUAIRE_FIXTURE swaps in an uncommitted test file (kept under data/, which is ignored).
  const annuaire = process.env.ANNUAIRE_FIXTURE || "src/annuaire/annuaire.json";
  eleventyConfig.addPassthroughCopy({ [annuaire]: "annuaire/annuaire.json" });
  eleventyConfig.addPassthroughCopy("src/fonts/**/*.woff2");
  return {
    dir: { input: "src", output: "_site" },
  };
}
