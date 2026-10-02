// axe over every page of the /kit gallery, the Astro kit's stand-in for
// Storybook (content-blocks.md step 3: "axe shows zero violations"). The
// gallery is served by the astro-app boilerplate, so the server has to be
// running; the runner reads the gallery's own index for its pages the same
// way the Svelte runner reads the Storybook index. ASTRO_URL is the same
// variable `pnpm compare` uses for the gallery.
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const base = process.env.ASTRO_URL ?? "http://localhost:4321";

const html = await (await fetch(`${base}/kit/`)).text();
const pages = ["/kit/", ...new Set([...html.matchAll(/href="(\/kit\/[^"#?]*)"/g)].map((m) => m[1]))].sort();

const browser = await chromium.launch();
const violations = [];
for (const path of pages) {
  const page = await (await browser.newContext({ viewport: { width: 1280, height: 900 } })).newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(`${base}${path}`, { waitUntil: "load" });
  // The gallery's pieces settle (the terminal replays, the spy moves), so
  // give them a beat before the report is read.
  await page.waitForTimeout(500);
  const results = await new AxeBuilder({ page }).analyze();
  for (const v of results.violations) violations.push(`${path}  ${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(" | ")}`);
  for (const error of errors) violations.push(`${path}  pageerror: ${error}`);
  await page.close();
}
await browser.close();
console.log(`${pages.length} gallery pages checked, ${violations.length} violations`);
for (const v of violations) console.log("  " + v);
