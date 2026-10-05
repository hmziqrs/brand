import { readFileSync } from "node:fs";
import { defineConfig } from "tsup";

// One entry per export in package.json: everything under src becomes real
// JavaScript in dist/, because the export map points there. The published
// package has to load in plain Node (a site's vite.config or astro.config
// imports the Markdown plugins there), and Node refuses to strip types from
// anything under node_modules. In this repo the workspace package is the
// same files, so `pnpm --filter @hmziq/brand-core build` (run by prepare, by
// `pnpm check` and by `pnpm build`) keeps in-repo consumers in step too.
const pkg = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf8"));
const entries = Object.values(pkg.exports as Record<string, string | { default: string }>)
  .map((target) => (typeof target === "string" ? target : target.default))
  .filter((target) => target.startsWith("./dist/"))
  .map((target) => `${target.replace(/^\.\/dist\//, "src/").replace(/\.js$/, "")}.ts`);

export default defineConfig({
  entry: entries,
  format: "esm",
  dts: true,
  splitting: true,
  clean: true,
  sourcemap: true,
  // Dependencies and the optional three peer stay external: they are the
  // consumer's to install, never bundled into core.
  external: ["shiki", "unist-util-visit", "three"],
  outDir: "dist",
});
