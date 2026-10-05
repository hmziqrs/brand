// axe over every story of the kit's Storybook (kits.md step 1: "axe shows
// zero violations"). The a11y addon already puts axe-core in the iframe, so
// this drives that instance rather than loading a second one.
import { chromium } from "playwright";

const base = process.env.SB ?? "http://localhost:6007";
const index = await (await fetch(`${base}/index.json`)).json();
const stories = Object.values(index.entries).filter((e) => e.type === "story").map((e) => e.id);
const browser = await chromium.launch();
const violations = [];
for (const id of stories) {
  const page = await (await browser.newContext({ viewport: { width: 1280, height: 900 } })).newPage();
  await page.goto(`${base}/iframe.html?id=${id}&viewMode=story`, { waitUntil: "load" });
  await page.locator("#storybook-root").first().waitFor({ timeout: 30000 }).catch(() => {});
  // The a11y addon injects axe once the story has rendered; scenes take a
  // moment longer, so wait for the injection too.
  await page.waitForFunction(() => Boolean(window.axe), null, { timeout: 30000 }).catch(() => {});
  const found = await page.evaluate(async () => {
    if (!window.axe) return ["axe not loaded"];
    // The a11y addon runs axe itself when a story renders; wait for that to
    // finish rather than starting a second concurrent run.
    for (let i = 0; i < 40; i++) {
      try {
        const results = await window.axe.run();
        return results.violations.flatMap((v) => v.nodes.map((n) => `${v.id}: ${n.target.join(" ")}`));
      } catch (error) {
        if (!String(error).includes("already running")) throw error;
        await new Promise((resolve) => setTimeout(resolve, 250));
      }
    }
    return ["axe never finished"];
  });
  for (const v of found) violations.push(`${id}  ${v}`);
  await page.close();
}
await browser.close();
console.log(`${stories.length} stories checked, ${violations.length} violations`);
for (const v of violations) console.log("  " + v);
