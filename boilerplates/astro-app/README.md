# astro-app

The Astro starter for hmziq sites. The theme from `@hmziq/brand-core`, the
brand kit through `$brand`, a landing page built from the site blocks, the
content pages from [docs/content-blocks.md](../../docs/content-blocks.md),
and the `/kit` gallery that stands in for Storybook (which doesn't support
Astro components). Start new projects with `pnpm new-project astro <folder>`.

## What's in it

- `src/styles/app.css` — the main stylesheet (BRAND.md section 2): Tailwind,
  tw-animate, the fonts, core's `theme.css`, the kit's `kit.css`, and the
  `@source` lines that make Tailwind scan core and the kit.
- `src/components/theme-init.astro` — the theme before first paint (dark by
  default, a remembered choice kept); every page puts it in the layout's
  `head` slot, where it also pulls in the stylesheet.
- `src/components/theme-toggle.astro` — the light/dark switch.
- `src/pages/index.astro` — the landing page, from the site blocks. Example
  content: replace every word before shipping.
- `src/pages/blog`, `docs`, `changelog`, `faq`, `privacy`, `terms`, `about`,
  `contact`, `404` and `components` — the content pages, from the
  content-page blocks. The posts and docs pages come from the content
  collections in `src/content/`, rendered through core's Markdown plugins
  (astro.config.mjs, with the built-in highlighter off). All example content.
- `src/pages/kit/` — the gallery: one page per group, every piece in every
  state. Each section's id is the piece's anchor in `scripts/pieces.json`,
  which `pnpm check:parity` reads.
- `src/pages/app/` — the app demo from [docs/app-blocks.md](../../docs/app-blocks.md):
  the signed-in side of Sightline, the same routes, data, `state` values and
  scripted failures the SvelteKit demo has. Forms post to Astro Actions
  (`src/actions/index.ts`), list state lives in the URL, `state=pending`
  renders as a `server:defer` island, and the roster and settings the demo
  edits sit in `src/lib/app/` (example data; a server restart resets them).
  Every page renders inside `src/components/app/app-document.astro`, the
  demo's own `<html>`/`<head>` — charset, title and theme included — because
  Astro Actions pages that call `Astro.getActionResult` get no synthesized
  head, and with it no styles.
- `src/components/app/` — the demo's scaffolding: the workspace shell, the
  auth frame, the demo state switch, the deferred island and the pages'
  shared content pieces. Demo code, not kit pieces.

## Inside this repo

The boilerplate uses the kit from its source, so kit changes show up right
away: `$brand` points at `packages/brand-astro/src` (astro.config.mjs and
tsconfig.json). `pnpm new-project` points `$brand` at the folder the kit is
installed into instead; no import in here changes.

The app renders on demand with the `@astrojs/node` adapter (docs/kits.md),
so Astro Actions, URL params and server islands work in the starter.

## The icon pack is a placeholder

`public/` ships a full icon pack for the placeholder name "Paperplane" (Pp):
favicon, PNGs, ICO, apple-touch, Android and maskable icons and
`site.webmanifest`, so every link `SiteHead` renders resolves from the start.
`public/og.png` is the same name's placeholder OG card (1200×630, drawn with
the social-card sources in `assets/social/source/`), because `SiteHead`
defaults `og:image` to `/og.png`; replace it with the real site's card from
`assets/social/exports/sites/<id>/` when the project gets its name. Render a
pack for the project's real name and replace it (docs/assets.md):

```sh
pnpm render-assets --name "Paperplane" --symbol Pp --out <folder>
```

## Commands

| Command | Action |
| --- | --- |
| `pnpm dev` | Starts the dev server at `localhost:4321` |
| `pnpm build` | Build the production server to `./dist/` |
| `pnpm preview` | Preview the build locally |
| `pnpm typecheck` | `astro check` for the app and its pages |
