---
"@hmziq/brand-core": minor
"@hmziq/brand-svelte": minor
"@hmziq/brand-astro": minor
---

Content-page blocks in both registries, and the Markdown plugins on core. Every block from docs/content-blocks.md is its own registry item in each kit (`blog-layout`, `post-header`, `docs-layout`, `release-timeline`, `faq-list`, `not-found`, …), so a site can add one at a time instead of the whole `content-blocks` folder. The shared Markdown setup ships from `@hmziq/brand-core/markdown` (`callout`, `code-meta`, `heading-anchor`, `table`): content collections in Astro and mdsvex in SvelteKit render the same markup through the same plugins.
