// The link images, screenshotted from /media/raw/og/<slug>/ in the built site,
// so they use the site's real pieces. Writes public/og.png, the one every page
// shares, and the examples in public/og/<slug>.png:
//
//   bun run --filter brand-site render:og

import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import { exampleCards, siteCard } from "../src/lib/og-pages.ts";

const dist = fileURLToPath(new URL("../dist", import.meta.url));
const publicDir = fileURLToPath(new URL("../public", import.meta.url));

const server = Bun.serve({
  port: 0,
  async fetch(request) {
    const path = new URL(request.url).pathname;
    const file = Bun.file(join(dist, path.endsWith("/") ? `${path}index.html` : path));
    return (await file.exists()) ? new Response(file) : new Response("not found", { status: 404 });
  },
});

mkdirSync(join(publicDir, "og"), { recursive: true });
const browser = await chromium.launch({ channel: "chrome" });
const context = await browser.newContext({ viewport: { width: 1200, height: 630 }, reducedMotion: "reduce" });
const tab = await context.newPage();
for (const { slug: page } of [siteCard, ...exampleCards]) {
  await tab.goto(`${server.url}media/raw/og/${page}/`, { waitUntil: "load" });
  await tab.evaluate(() => document.fonts.ready);
  await tab.waitForTimeout(500);
  const file = page === siteCard.slug ? "og.png" : `og/${page}.png`;
  await tab.screenshot({ path: join(publicDir, file) });
  console.log(file);
}
await browser.close();
server.stop();
