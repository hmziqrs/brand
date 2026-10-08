// kits.md: `pnpm compare <piece|group|all>` screenshots the Svelte story and
// the Astro gallery entry for a piece, in light and dark, at 360px and
// 1280px, and lays them side by side in compare/ (git-ignored). That report
// is what every "matches" check in the plans is read from.
//
// `pnpm compare --pages <path>` does the same for a page in both
// boilerplates.
//
// The report is relayed from every shot in compare/, not just the current
// run's, so a later run (a page pair, one piece) never drops the rows an
// earlier run laid down. `pnpm compare --report` rebuilds it from the folder
// as it stands, without shooting anything.
//
// Servers have to be running. The script starts from these URLs, overridable
// with environment variables of the same names:
//   SVELTE_URL (the kit Storybook, 6007)
//   ASTRO_URL (the /kit gallery, 4321)     SVELTE_APP_URL / ASTRO_APP_URL (the boilerplates)
import { chromium } from "playwright";
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const OUT = join(root, "compare");
const roster = JSON.parse(readFileSync(join(root, "scripts/pieces.json"), "utf8")).pieces;

const SVELTE = process.env.SVELTE_URL ?? "http://localhost:6007";
const ASTRO = process.env.ASTRO_URL ?? "http://localhost:4321";
const SVELTE_APP = process.env.SVELTE_APP_URL ?? "http://localhost:5173";
const ASTRO_APP = process.env.ASTRO_APP_URL ?? "http://localhost:4322";

const [argument, ...pagePaths] = process.argv.slice(2);
const reportOnly = argument === "--report";
const themes = ["dark", "light"];
const widths = [360, 1280];
const viewLabels = ["svelte", "astro", "svelte-app", "astro-app"];

// Which gallery page each piece's anchor lives on, read from the gallery
// pages themselves the same way check-parity reads them
// (scripts/check-parity.mjs). A piece's group names the plan that owns it,
// not the page that shows it — the content pieces that live in the site
// gallery (Prose, Bullets, … Kicker) would otherwise be shot on /kit/content,
// which never carries their anchors.
const galleryPage = new Map();
for (const name of readdirSync(join(root, "boilerplates/astro-app/src/pages/kit"))) {
  if (!name.endsWith(".astro")) continue;
  for (const match of readFileSync(join(root, "boilerplates/astro-app/src/pages/kit", name), "utf8").matchAll(
    /\bid=\{?['"]piece-([\w-]+)['"]/g,
  ))
    galleryPage.set(match[1], name.replace(/\.astro$/, ""));
}

/** Every view of one subject: where it lives and what label it gets. */
function views(subject) {
  if (subject.page) {
    return [
      { label: "svelte-app", url: `${SVELTE_APP}${subject.page}` },
      { label: "astro-app", url: `${ASTRO_APP}${subject.page}` },
    ];
  }
  return [
    subject.svelte && { label: "svelte", url: `${SVELTE}/iframe.html?id=${subject.svelte}&viewMode=story` },
    subject.astro &&
      subject.astro !== "not yet" && {
        label: "astro",
        url: `${ASTRO}/kit/${galleryPage.get(subject.astro) ?? subject.group}#piece-${subject.astro}`,
      },
  ].filter(Boolean);
}

let subjects;
if (reportOnly) {
  subjects = [];
} else if (argument === "--pages") {
  // One or more routes (space- or comma-separated), each shot in both
  // boilerplates: `pnpm compare --pages /app/overview /app/members` lays
  // every route's pair side by side in ONE report, the way app-blocks.md's
  // phase 10 gate reads it — one run per route would leave the report
  // holding only the last route's pair.
  const paths = pagePaths.flatMap((value) => value.split(",")).map((value) => value.trim()).filter(Boolean);
  if (!paths.length) {
    console.error("usage: compare --pages <path> [more paths]   (the same routes in both boilerplates, e.g. / /app/overview)");
    process.exit(1);
  }
  subjects = paths.map((path) => ({ name: `page ${path}`, group: "pages", page: path }));
} else if (!argument || argument === "all") {
  subjects = roster;
} else {
  subjects = roster.filter((p) => p.name.toLowerCase() === argument.toLowerCase() || p.group === argument.toLowerCase());
  if (!subjects.length) {
    console.error(`No piece or group "${argument}" in scripts/pieces.json. Groups: ${[...new Set(roster.map((p) => p.group))].join(", ")}.`);
    process.exit(1);
  }
}

mkdirSync(OUT, { recursive: true });
const shots = [];

const browser = reportOnly ? null : await chromium.launch();

for (const subject of subjects) {
  const targets = views(subject);
  if (!targets.length) {
    console.log(`- ${subject.name}: nothing to shoot yet`);
    continue;
  }
  for (const theme of themes) {
    for (const width of widths) {
      for (const target of targets) {
        const file = `${subject.name.toLowerCase().replace(/[^\w]+/g, "-")}-${target.label}-${theme}-${width}.png`;
        const context = await browser.newContext({ viewport: { width, height: 900 }, colorScheme: theme });
        const page = await context.newPage();
        page.on("pageerror", (error) => console.error(`  ! ${subject.name} (${target.label}) threw: ${error.message}`));
        // A view whose server isn't up is reported and skipped, not fatal:
        // compare is run piece by piece while only some servers are started.
        try {
          await page.goto(target.url, { waitUntil: "networkidle", timeout: 15000 });
        } catch (error) {
          console.error(`  ! ${subject.name}: ${target.label} not reachable at ${target.url} (${error.message.split("\n")[0]})`);
          await context.close();
          continue;
        }
        // The Storybook preview and both boilerplates follow the theme class.
        await page.evaluate(
          (dark) => {
            document.documentElement.classList.toggle("dark", dark);
            document.documentElement.classList.toggle("light", !dark);
          },
          theme === "dark",
        );
        await page.waitForTimeout(400);
        await page.screenshot({ path: join(OUT, file), fullPage: true });
        await context.close();
        shots.push({ subject: subject.name, theme, width, label: target.label, file });
      }
    }
  }
  console.log(`- ${subject.name}: ${targets.map((t) => t.label).join(", ")}`);
}

await browser?.close();

// The report: one row per subject and theme, every version and width side by
// side, so "matches" is a read across the row. The rows come from every shot
// in compare/ — this run's and earlier runs' alike — so running one piece or
// a page pair doesn't drop the pieces the last full run laid down.
const slug = (name) => name.toLowerCase().replace(/[^\w]+/g, "-");
const display = new Map();
for (const piece of roster) display.set(slug(piece.name), piece.name);
for (const subject of subjects) display.set(slug(subject.name), subject.name);

const onDisk = new Map();
for (const file of readdirSync(OUT).sort()) {
  const match = /^(.*)-(svelte|astro|svelte-app|astro-app)-(dark|light)-(\d+)\.png$/.exec(file);
  if (!match) continue;
  const [, subject, label, theme, width] = match;
  if (!onDisk.has(subject)) onDisk.set(subject, new Map());
  onDisk.get(subject).set(`${label}|${theme}|${width}`, file);
}

// Roster pieces in roster order first, then anything else (page pairs) by name.
const rosterOrder = new Map(roster.map((piece) => [slug(piece.name), roster.indexOf(piece)]));
const subjectsInOrder = [...onDisk.keys()].sort((a, b) => {
  const ai = rosterOrder.get(a) ?? Infinity;
  const bi = rosterOrder.get(b) ?? Infinity;
  return ai === bi ? a.localeCompare(b) : ai - bi;
});

const rows = [];
for (const subject of subjectsInOrder) {
  for (const theme of themes) {
    const cells = [];
    for (const label of viewLabels) {
      for (const width of widths) {
        const file = onDisk.get(subject).get(`${label}|${theme}|${width}`);
        cells.push(file ? `<td><img src="${file}" loading="lazy"></td>` : "<td></td>");
      }
    }
    if (cells.some((cell) => cell !== "<td></td>")) {
      rows.push(`<tr><th>${display.get(subject) ?? subject}<br>${theme}</th>${cells.join("")}</tr>`);
    }
  }
}
writeFileSync(
  join(OUT, "index.html"),
  `<!doctype html><meta charset="utf-8"><title>compare</title>
<style>body{background:#171717;color:#fafafa;font:14px/1.5 system-ui;margin:2rem}table{border-collapse:collapse}th{white-space:nowrap;text-align:left;padding:8px;border:1px solid #262626}td{padding:8px;vertical-align:top;border:1px solid #262626}img{display:block;max-height:340px;width:auto}</style>
<h1>compare</h1><table>${rows.join("\n")}</table>`,
);
const relaid = [...onDisk.values()].reduce((count, views) => count + views.size, 0);
console.log(`\n${reportOnly ? `${relaid} shots relayed` : `${shots.length} screenshots taken`} — ${subjectsInOrder.length} subjects in ${relative(root, OUT)}/index.html`);
