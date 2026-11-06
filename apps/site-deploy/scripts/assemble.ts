import { cpSync, existsSync, rmSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dir, "../../..");
const site = join(root, "apps/site/dist");
const storybook = join(root, "packages/brand-svelte/storybook-static");
const out = join(root, "apps/site-deploy/dist");

for (const build of [site, storybook]) {
  if (!existsSync(join(build, "index.html"))) {
    console.error(`Missing build: ${build}`);
    process.exit(1);
  }
}

rmSync(out, { recursive: true, force: true });
cpSync(site, out, { recursive: true });
cpSync(storybook, join(out, "storybook"), { recursive: true });
console.log(`Assembled ${out}`);
