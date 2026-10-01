// kits.md: `pnpm compare <piece|group|all>` screenshots the lab story, the
// Svelte story and the Astro gallery entry for a piece, in light and dark, at
// 360px and 1280px, and lays them side by side in compare/ (git-ignored).
// That report is what every "matches" check in the plans is read from.
//
// `pnpm compare --pages <path>` does the same for a page in both
// boilerplates. When a piece has no lab story (the app blocks), the Svelte
// story is the reference.
//
// Servers have to be running. The script starts from these URLs, overridable
// with environment variables of the same names:
//   LAB_URL (the lab Storybook, 6006)      SVELTE_URL (the kit Storybook, 6007)
//   ASTRO_URL (the /kit gallery, 4321)     SVELTE_APP_URL / ASTRO_APP_URL (the boilerplates)
import { chromium } from "playwright";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const OUT = join(root, "compare");
const roster = JSON.parse(readFileSync(join(root, "scripts/pieces.json"), "utf8")).pieces;

const LAB = process.env.LAB_URL ?? "http://localhost:6006";
const SVELTE = process.env.SVELTE_URL ?? "http://localhost:6007";
const ASTRO = process.env.ASTRO_URL ?? "http://localhost:4321";
const SVELTE_APP = process.env.SVELTE_APP_URL ?? "http://localhost:5173";
const ASTRO_APP = process.env.ASTRO_APP_URL ?? "http://localhost:4322";

const [argument, pagePath] = process.argv.slice(2);
const themes = ["dark", "light"];
const widths = [360, 1280];

/** Every view of one subject: where it lives and what label it gets. */
function views(subject) {
  if (subject.page) {
    return [
      { label: "svelte-app", url: `${SVELTE_APP}${subject.page}` },
      { label: "astro-app", url: `${ASTRO_APP}${subject.page}` },
    ];
  }
  return [
    subject.lab && { label: "lab", url: `${LAB}/iframe.html?id=${subject.lab}&viewMode=story` },
    subject.svelte && { label: "svelte", url: `${SVELTE}/iframe.html?id=${subject.svelte}&viewMode=story` },
    subject.astro && subject.astro !== "not yet" && { label: "astro", url: `${ASTRO}/kit/${subject.group}#piece-${subject.astro}` },
  ].filter(Boolean);
}

let subjects;
if (argument === "--pages") {
  if (!pagePath) {
    console.error("usage: compare --pages <path>   (the same route in both boilerplates, e.g. /)");
    process.exit(1);
  }
  subjects = [{ name: `page ${pagePath}`, group: "pages", page: pagePath }];
} else if (!argument || argument === "all") {
  subjects = roster;
} else {
  subjects = roster.filter((p) => p.name.toLowerCase() === argument.toLowerCase() || p.group === argument.toLowerCase());
  if (!subjects.length) {
    console.error(`No piece or group "${argument}" in scripts/pieces.json. Groups: ${[...new Set(roster.map((p) => p.group))].join(", ")}.`);
    process.exit(1);
  }
}

const browser = await chromium.launch();
mkdirSync(OUT, { recursive: true });
const shots = [];

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

await browser.close();

// The report: one row per subject and theme, every version and width side by
// side, so "matches" is a read across the row.
const columns = [];
for (const label of ["lab", "svelte", "astro", "svelte-app", "astro-app"]) {
  for (const width of widths) columns.push(`${label} @${width}`);
}
const rows = [];
for (const subject of subjects) {
  for (const theme of themes) {
    const cells = columns.map((column) => {
      const [label, width] = column.split(" @");
      const shot = shots.find((s) => s.subject === subject.name && s.theme === theme && s.label === label && s.width === Number(width));
      return shot ? `<td><img src="${shot.file}" loading="lazy"></td>` : "<td></td>";
    });
    if (cells.some((cell) => cell !== "<td></td>")) rows.push(`<tr><th>${subject.name}<br>${theme}</th>${cells.join("")}</tr>`);
  }
}
writeFileSync(
  join(OUT, "index.html"),
  `<!doctype html><meta charset="utf-8"><title>compare</title>
<style>body{background:#171717;color:#fafafa;font:14px/1.5 system-ui;margin:2rem}table{border-collapse:collapse}th{white-space:nowrap;text-align:left;padding:8px;border:1px solid #262626}td{padding:8px;vertical-align:top;border:1px solid #262626}img{display:block;max-height:340px;width:auto}</style>
<h1>compare</h1><table>${rows.join("\n")}</table>`,
);
console.log(`\n${shots.length} screenshots in ${relative(root, OUT)}/ — open ${relative(root, join(OUT, "index.html"))}`);
