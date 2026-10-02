# svelte-app

The SvelteKit starter for hmziq sites: the theme, the brand kit through
`$brand`, a landing page built from the site blocks, and a 404 page. Start a
new project from it with `pnpm new-project svelte <folder>` (repo root).

## What's in it

- `src/app.css` — the main stylesheet from BRAND.md section 2: Tailwind,
  tw-animate, shadcn-svelte's CSS, the Onest and JetBrains Mono Fontsource
  packages, core's `theme.css`, the kit stylesheet, and an `@source` for core.
  The framework CSS loads **before** the theme, or Tailwind's `@theme inline`
  utilities don't pick the tokens up.
- `vite.config.ts` — the `$brand` alias. Inside this repo it points at
  `packages/brand-svelte/src/lib`, so kit changes show up right away.
  `pnpm new-project` repoints it at the folder the kit is installed into;
  no import in the app changes.
- `src/app.html` — dark by default, with the remembered light choice applied
  before first paint so the wrong theme never flashes.
- `src/lib/theme-toggle.svelte` — the light / dark switch (colors only,
  nothing moves).
- `src/routes/+page.svelte` — the landing page, built from the site blocks.
  Every word on it is example copy: replace it with the project's own.
- `src/routes/+error.svelte` — the 404 (and other errors), with the lab's
  not-found design: the words and rings drawn from "not found".
- `src/routes/+layout.svelte` — `SiteHead` for one site, from the site's id in
  core's `family.ts`. Swap the id and the copy when the project gets its name.

## The icon pack is a placeholder

`static/` ships a full icon pack for the placeholder name "Paperplane" (Pp):
favicon, PNGs, ICO, apple-touch, Android and maskable icons and
`site.webmanifest`, so every link `SiteHead` renders resolves from the start.
`static/og.png` is the same name's placeholder OG card (1200×630, drawn with
the social-card sources in `assets/social/source/`), because `SiteHead`
defaults `og:image` to `/og.png`; replace it with the real site's card from
`assets/social/exports/sites/<id>/` when the project gets its name.
Render a pack for the project's real name and replace it (docs/assets.md):

```sh
pnpm render-assets --name "Paperplane" --symbol Pp --out <folder>
```

The content pages (content-blocks.md) are added by their own plan.

## The app demo (`/app`)

The demo admin app from app-blocks.md: the signed-in side of Sightline in the
workspace "Paperplane", built from the app blocks as their phases land. The
skeleton is there now — the route groups, the demo state switch in the top
bar and the Toaster in the root layout — with placeholder pages until each
phase fills its own:

- `src/routes/app/(auth)/` — sign-in, sign-up, forgot and reset password,
  verify email. No shell.
- `src/routes/app/(workspace)/` — everything else, behind the workspace
  layout that will hold `AppShell`. `/app` redirects to `/app/overview`.
- `src/lib/demo-state.svelte.ts` and `demo-state-switch.svelte` — the demo's
  own URL reading (`state=normal|pending|empty|error|denied|offline|limit`).
  Demo scaffolding, not a kit piece: kit blocks never read the URL.
- Example data and list-state helpers come from `@hmziq/brand-core`
  (`app/demo-data`, `app/nav`, `app/list-params`), the same package
  `astro-app` reads, so the two demos stay comparable.

The demo is part of the app-blocks contract (`APP-BLOCKS.md` at the repo
root); new projects can delete `src/routes/app/` and `src/lib/demo-state*`
unless they want the same admin screens.

## Commands

```sh
pnpm install
pnpm dev       # http://localhost:5173
pnpm build
pnpm check     # svelte-check
```
