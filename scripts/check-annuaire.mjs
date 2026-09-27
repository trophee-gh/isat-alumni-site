// Checks the annuaire JSON against decision 014: only the agreed fields, each well formed.
import { readFileSync } from "node:fs";

const file = process.argv[2] || "src/annuaire/annuaire.json";
const allowed = ["nom", "prenom", "promo", "programme", "linkedin", "secteur", "consentement"];
const required = ["nom", "prenom", "promo", "programme", "linkedin", "consentement"];
const errors = [];

const gens = JSON.parse(readFileSync(file, "utf8"));
if (!Array.isArray(gens)) errors.push("the file is not an array");
else gens.forEach((p, i) => {
  for (const k of Object.keys(p)) if (!allowed.includes(k)) errors.push(`#${i}: field not allowed: ${k}`);
  for (const k of required) if (!(k in p)) errors.push(`#${i}: missing ${k}`);
  if (!Number.isInteger(p.promo)) errors.push(`#${i}: promo is not a year`);
  if (!/^https:\/\/(www\.)?linkedin\.com\/in\/[^/\s]+\/?$/.test(p.linkedin ?? "")) errors.push(`#${i}: linkedin is not a profile URL`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(p.consentement ?? "")) errors.push(`#${i}: consentement is not a date`);
});

if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
console.log(`${file}: ${gens.length} entries, schema ok`);
