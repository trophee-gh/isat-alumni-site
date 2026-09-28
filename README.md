# isat-alumni-site

The website of the Association des ingénieurs de l'ISAT (11ty, static).

- Build: `npm ci && npm run build` writes `_site/`; `npm start` serves it locally.
- Content is edited here: pages in `src/` (Markdown), outbound links in `src/_data/site.js`
  (a value starting with `TBD` shows as "bientôt disponible").
- The annuaire is `src/annuaire/annuaire.json`, opt-in entries only; `npm run check:annuaire`
  checks it. Test with an uncommitted file: `ANNUAIRE_FIXTURE=data/<file>.json npm start`.

`Documents\Tries\isat-alumni\` is an archive, read for history only.
