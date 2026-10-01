# @hmziq/brand-core

The hmziq brand, framework-free. Everything not tied to a framework: the
theme tokens (`theme.css`), color math, the logo recipe, ring art, the Shiki
code theme, the Markdown plugins, shared app logic and the site roster.

The Svelte kit and the Astro kit ([docs/README.md](../../docs/README.md))
are built on it, and sites import the theme straight from here:

```css
@import "@hmziq/brand-core/theme.css";
@source "../node_modules/@hmziq/brand-core/src";
```

`tones.ts` holds class names Tailwind has to see, which is what the `@source`
line is for. Sites that don't use npm can fetch the same file from
`/theme.css` on the brand's Pages site. [BRAND.md](../../BRAND.md) is the
rulebook; `three` is an optional peer for the 3D scenes.

The export map points at `dist/`, built by `pnpm --filter @hmziq/brand-core
build` (tsup): the published package has to load in plain Node — a site's
`vite.config.ts` or `astro.config.mjs` imports the Markdown plugins there,
and Node refuses to strip types from anything under `node_modules`. The
workspace package resolves the same way, so rebuild after editing `src/`
(root `pnpm check` and `pnpm build` both do it first).

MIT licensed — see [LICENSE](./LICENSE).
