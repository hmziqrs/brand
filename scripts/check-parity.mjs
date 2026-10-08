// kits.md, the pieces roster: `pnpm check:parity` fails when a piece in
// scripts/pieces.json is missing from either kit, from either kit's stories
// or gallery, or from either registry. A piece can be marked "not yet" while
// its plan is in progress.
//
// Pieces with no story of their own (internal helpers, parts always shown
// inside another piece) carry null and are checked by file only.
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const roster = JSON.parse(readFileSync(join(root, "scripts/pieces.json"), "utf8")).pieces;
const NOT_YET = "not yet";

// Storybook's own id rules, so the ids we read from source match the ones the
// built Storybooks serve: sanitize(title) + "--" + sanitize(story name).
const sanitize = (text) =>
  text
    .toLowerCase()
    .replace(/['‘’]/g, "")
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/, "");

function* files(dir) {
  if (!existsSync(dir)) return;
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) yield* files(path);
    else yield path;
  }
}

/** The Svelte kit's story ids, read from the *.stories.svelte files. */
function svelteStoryIds() {
  const ids = new Set();
  for (const file of files(join(root, "packages/brand-svelte/src/lib"))) {
    if (!file.endsWith(".stories.svelte")) continue;
    const source = readFileSync(file, "utf8");
    const title = source.match(/\btitle:\s*['"](.+?)['"]/)?.[1];
    if (!title) continue;
    for (const match of source.matchAll(/<Story\s[^>]*\bname=\{?['"](.+?)['"]/g)) {
      ids.add(`${sanitize(title)}--${sanitize(match[1])}`);
    }
  }
  return ids;
}

/** The Astro kit's /kit gallery anchors, read from its gallery pages. */
function astroAnchors() {
  const anchors = new Set();
  for (const file of files(join(root, "boilerplates/astro-app/src/pages/kit"))) {
    if (!file.endsWith(".astro")) continue;
    for (const match of readFileSync(file, "utf8").matchAll(/\bid=\{?['"]piece-([\w-]+)['"]/g)) anchors.add(match[1]);
  }
  return anchors;
}

/** A kit's registry item names, from its registry.json. */
function registryItems(path) {
  const file = join(root, path);
  if (!existsSync(file)) return new Set();
  const json = JSON.parse(readFileSync(file, "utf8"));
  return new Set((json.items ?? []).map((item) => item.name));
}

const svelteStories = svelteStoryIds();
const astroGallery = astroAnchors();
const svelteRegistry = registryItems("packages/brand-svelte/registry.json");
const astroRegistry = registryItems("packages/brand-astro/registry.json");

const problems = [];
const seen = new Set();
for (const piece of roster) {
  if (seen.has(piece.name)) problems.push(`${piece.name}: listed twice in the roster`);
  seen.add(piece.name);

  // A piece whose plan is still in progress is listed with every field
  // "not yet" (app-blocks.md phase 0); nothing of it exists to check yet.
  if (piece.svelteFile === NOT_YET) continue;

  const file = join(root, "packages/brand-svelte/src/lib", piece.svelteFile ?? "");
  if (!piece.svelteFile || !existsSync(file)) {
    problems.push(`${piece.name}: missing from the Svelte kit (${piece.svelteFile ?? "no file recorded"})`);
  }
  // The Astro kit's file for the piece, derived the way the registry
  // generator derives it (generate-registries.mjs): `astroFile` when the
  // piece records one, else the Svelte path with its extension swapped. A
  // story file has no Astro twin to check — stories never ship (the table
  // recipe is a pattern, not an installable piece).
  const astroFile = piece.astroFile ?? piece.svelteFile?.replace(/\.svelte$/, ".astro");
  if (astroFile && !astroFile.endsWith(".stories.astro") && !existsSync(join(root, "packages/brand-astro/src", astroFile))) {
    problems.push(`${piece.name}: missing from the Astro kit (${astroFile})`);
  }
  if (piece.svelte && piece.svelte !== NOT_YET && !svelteStories.has(piece.svelte)) {
    problems.push(`${piece.name}: no Svelte story ${piece.svelte}`);
  }
  if (piece.astro && piece.astro !== NOT_YET && !astroGallery.has(piece.astro.replace(/^piece-/, ""))) {
    problems.push(`${piece.name}: no Astro gallery anchor ${piece.astro}`);
  }
  if (piece.svelteItem && piece.svelteItem !== NOT_YET && !svelteRegistry.has(piece.svelteItem)) {
    problems.push(`${piece.name}: no Svelte registry item ${piece.svelteItem}`);
  }
  if (piece.astroItem && piece.astroItem !== NOT_YET && !astroRegistry.has(piece.astroItem)) {
    problems.push(`${piece.name}: no Astro registry item ${piece.astroItem}`);
  }
}

// The other direction: every story the Svelte kit ships belongs to a piece in
// the roster ("every new piece goes into scripts/pieces.json").
const rosterTitles = new Set(roster.filter((p) => p.svelte && p.svelte !== NOT_YET).map((p) => p.svelte.split("--")[0]));
for (const id of svelteStories) {
  if (!rosterTitles.has(id.split("--")[0])) problems.push(`Svelte story ${id} is not in the roster`);
}

// And the same for the Astro gallery: every `piece-…` anchor it carries
// belongs to a piece in the roster, so a stray or renamed anchor is caught.
const rosterAnchors = new Set(roster.filter((p) => p.astro && p.astro !== NOT_YET).map((p) => p.astro.replace(/^piece-/, "")));
for (const anchor of astroGallery) {
  if (!rosterAnchors.has(anchor)) problems.push(`Astro gallery anchor ${anchor} is not in the roster`);
}

const byGroup = {};
for (const piece of roster) byGroup[piece.group] = (byGroup[piece.group] ?? 0) + 1;

if (problems.length) {
  console.error("Pieces out of step between the roster and the kits:");
  for (const p of problems) console.error("  " + p);
  process.exit(1);
}
console.log(
  `Every piece is in step: ${roster.length} pieces (${Object.entries(byGroup)
    .map(([group, count]) => `${count} ${group}`)
    .join(", ")}), ${svelteStories.size} Svelte stories.`,
);
