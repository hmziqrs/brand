import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import node from "@astrojs/node";
import tailwindcss from "@tailwindcss/vite";
import { unified } from "@astrojs/markdown-remark";
import { callout } from "@hmziq/brand-core/markdown/callout";
import { codeMeta } from "@hmziq/brand-core/markdown/code-meta";
import { headingAnchor } from "@hmziq/brand-core/markdown/heading-anchor";
import { table } from "@hmziq/brand-core/markdown/table";

// Inside this repo the boilerplate uses the kit from its source, so kit
// changes show up right away. `pnpm new-project` points `$brand` at the
// folder the kit is installed into instead; no import in here changes.
const brand = fileURLToPath(new URL("../../packages/brand-astro/src", import.meta.url));

export default defineConfig({
  // astro-app renders on demand (docs/kits.md), so Astro Actions, URL params
  // and server islands all work in the starter.
  adapter: node({ mode: "standalone" }),
  output: "server",
  vite: {
    resolve: {
      alias: {
        $brand: brand,
      },
    },
    plugins: [tailwindcss()],
  },
  markdown: {
    // The built-in highlighter is off: core's Shiki rehype plugin highlights
    // fenced code instead, so Astro and SvelteKit produce the same markup
    // (docs/content-blocks.md, "Markdown"). The unified processor is the one
    // both kits' plugin pipeline runs on; Astro 7 ships Sätteri by default
    // and keeps unified as an opt-in through @astrojs/markdown-remark.
    syntaxHighlight: false,
    processor: unified({ rehypePlugins: [headingAnchor, callout, codeMeta, table] }),
  },
});
