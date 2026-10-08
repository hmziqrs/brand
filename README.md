# hmziq brand

One brand kit that installs into every hmziq site and app. This repo holds the framework-free core of the brand, a Svelte kit, an Astro kit and two starter apps; [`docs/README.md`](./docs/README.md) is the master plan they were built from.

- **Core**: [`packages/brand-core/`](./packages/brand-core/), `@hmziq/brand-core`. Everything not tied to a framework: `theme.css` (Tailwind v4 + shadcn/ui tokens, dark by default, oxide orange as the brand color), color math and contrast, the logo recipe, ring art and 3D scenes, the Shiki code theme, and the site roster. Both kits import it; nothing else is shared by copy.
- **Docs**: [`BRAND.md`](./BRAND.md), the whole brand in one file for AI agents doing migrations and redesigns. Also served at `/BRAND.md` on the published Storybook. [`docs/README.md`](./docs/README.md) is the master plan; it also lists the agent skills required before working on a plan.
- **Explorations**: [`explorations/brand-directions.html`](./explorations/brand-directions.html), the playground where the signature and every page pattern were picked. Open it in a browser.
- **Assets**: [`assets/`](./assets/), the generated brand assets — per-site logos, icon packs and social images under `exports/`, rendered from core by `pnpm render-assets` ([`docs/assets.md`](./docs/assets.md)) — plus [`assets/fonts/`](./assets/fonts/), the self-hosted fonts. Onest for everything people read, JetBrains Mono for code (both via Fontsource; the Storybook manager serves the Onest file directly).

## Layout

```text
brand/
├── packages/brand-core/   @hmziq/brand-core: theme, colors, logo, rings, code theme
├── packages/brand-svelte/ the Svelte kit
├── packages/brand-astro/  the Astro kit
├── boilerplates/          the svelte-app and astro-app starters
├── assets/                generated brand assets: fonts, logos, icon packs, social images
├── docs/                  the master plan and its plan docs
├── scripts/               the brand checks and generators
├── explorations/          frozen design record
└── BRAND.md · README.md
```

The Svelte and Astro kits (`packages/brand-svelte`, `packages/brand-astro`) and the starters (`boilerplates/svelte-app`, `boilerplates/astro-app`) are built and in the workspace; [`docs/kits.md`](./docs/kits.md) is their plan.

## Run it

```bash
pnpm install
pnpm storybook        # http://localhost:6007
```

Use the sun/moon switch in the Storybook toolbar to see light and dark.

Root commands. The build ones run through the workspace:

| Command | What it does |
| --- | --- |
| `pnpm storybook` | The Svelte kit's Storybook at http://localhost:6007 |
| `pnpm build-storybook` | Static build of the Svelte kit's Storybook (the Pages site root) |
| `pnpm build` | Production builds of core and both boilerplates (`svelte-app`, `astro-app`) |
| `pnpm typecheck` | TypeScript across core (`tsc`), plus `astro check` on the Astro kit and the `astro-app` starter |
| `pnpm test` | Core's Vitest tests |
| `pnpm check:assets` | Fails if the generated assets (logos, icon packs, social images) are out of date (`pnpm render-assets` fixes them) |
| `pnpm check:motion` | Fails if anything moves on hover, press or focus (brand rule) |
| `pnpm check:colors` | Fails if custom components or pages use a color that isn't a theme token (hex, `bg-green-500`, `bg-white`…) |
| `pnpm check:contrast` | Measures every text/background pair in `theme.css` in both modes; fails below WCAG AA |
| `pnpm check:brand-kit` | Fails if the generated parts of `BRAND.md` (theme copy, colors, contrast) are out of date (`pnpm brand-kit:sync` fixes it) |
| `pnpm check` | Everything above, plus lint, the kits' own checks (`check:kit`) and the registries' parity check |
| `pnpm lint` | oxlint, over the whole repo |

## Use the theme in a site

Install the core package, the fonts and shadcn's base CSS in the site:

```bash
pnpm add @hmziq/brand-core @fontsource-variable/onest @fontsource-variable/jetbrains-mono tw-animate-css shadcn
```

Then in the site's main stylesheet:

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";
@import "@fontsource-variable/onest";
@import "@fontsource-variable/jetbrains-mono";
@import "@hmziq/brand-core/theme.css";
@source "../node_modules/@hmziq/brand-core/src";
```

The `@source` line makes Tailwind scan the core package: `tones.ts` there holds class names Tailwind has to see. Put `class="dark"` on `<html>` so dark is the default.

## Change the brand color

`--primary` points at `--orange` in both the `:root` (light) and `.dark` blocks of `packages/brand-core/theme.css`. Point it at another color (`var(--blue)`), or change the colors themselves in part 2 of the file. The ring, `chart-1`, the sidebar and code keywords follow. Every story updates on reload. Then run `pnpm check:contrast` and `pnpm brand-kit:sync`.

## Publish on GitHub Pages

The workflow in `.github/workflows/storybook.yml` runs `pnpm check`, the builds and the kit's Storybook on every push to `main` or `master`, then assembles one Pages site: the Svelte kit's Storybook at the root (serving `BRAND.md` and `APP-BLOCKS.md` there) and — once core has a released version — the registries under `/r/` and core's `theme.css`.

1. Create a GitHub repo and push this project.
2. In the repo: **Settings → Pages → Source: GitHub Actions**.
3. Push again (or run the workflow by hand). The site appears at `https://<user>.github.io/<repo>/`.
