# Structure plan

**Part of the [master plan](./README.md). Work item 1. Done — and superseded in part: `apps/lab` was deleted on 2026-10-09 once the kits reached full parity (docs/README.md). The lab sections below are the historical record.**

This plan reorganizes the repo into packages, and does two things. It pulls everything that isn't tied to a framework into `@hmziq/brand-core`, so the Svelte and Astro kits share one copy of it. And it moves the React code into `apps/lab`, where it stays as the design lab. The Svelte and Astro kits themselves are in [kits.md](./kits.md).

## Target tree

```text
brand/
├── apps/
│   └── lab/                     the React design lab: site pages, SaaS templates, tweakers, Storybook. Not shipped.
├── packages/
│   ├── brand-core/              @hmziq/brand-core (this plan)
│   ├── brand-svelte/            the Svelte kit (kits.md)
│   └── brand-astro/             the Astro kit (kits.md)
├── boilerplates/
│   ├── svelte-app/              (kits.md)
│   └── astro-app/               (kits.md)
├── assets/                      generated brand assets (assets.md)
├── docs/                        these plans
├── scripts/                     checks and generators
├── explorations/                frozen design record
├── .github/workflows/
├── BRAND.md · APP-BLOCKS.md · README.md
└── package.json · pnpm-workspace.yaml · pnpm-lock.yaml · tsconfig.json · tsconfig.base.json · .oxlintrc.json
```

Create a folder only when there's something to put in it.

## brand-core

Framework-free. Anything the Svelte kit, the Astro kit and the lab all need lives here, once.

```text
packages/brand-core/
├── theme.css
├── rings.css · logo.css         plain CSS for ring and logo movement
├── src/
│   ├── color.ts                 color math, contrast, reading theme.css
│   ├── family.ts                the site roster
│   ├── logo.ts                  the logo recipe; its defaults are the approved logo
│   ├── tones.ts                 tone → class lists (softTone, textTone)
│   ├── scroll-spy.ts
│   ├── code-theme.ts            the Shiki theme that points code colors at the --code-* tokens
│   ├── motion/                  rings.ts, scenes/
│   ├── markdown/                remark and rehype plugins (added by content-blocks.md)
│   └── app/                     shared app-block logic (added by app-blocks.md)
├── test/                        Vitest tests
└── package.json
```

- `tones.ts` holds Tailwind class names. Every stylesheet that uses core adds an `@source` for it, because Tailwind doesn't scan packages by itself.
- `logo.ts` keeps the recipe and its defaults. Its two React style helpers (`letterStyle`, `squareStyle`) move to the lab.
- `code-theme.ts` is the `createCssVariablesTheme({ name: "hmziq", variablePrefix: "--code-" })` call that now sits inside the lab's `code-block.tsx`. Both kits and the Markdown setup use it. `shiki` is a dependency of core for this file only.
- `theme.css` has two rules that depend on markup: outline buttons (`[data-slot="button"][data-variant="outline"]`) and the icon stroke (`.lucide`). kits.md makes every kit's components carry them.
- Tests run with Vitest (`pnpm test`, part of `pnpm check`). Step 1 adds tests for `color.ts`. assets.md adds the alpha case, content-blocks.md the Markdown plugins, and app-blocks.md the list params.

## apps/lab

The React code keeps its current layout inside `apps/lab`, so moving it is mechanical:

```text
apps/lab/
├── .storybook/
├── src/                         App.tsx, main.tsx, index.css, components/, sites/, templates/, brand/, hooks/, lib/
├── public/
├── components.json
└── index.html · vite.config.ts · tsconfig.app.json · tsconfig.node.json · package.json
```

The lab imports shared code from `@hmziq/brand-core`. Nothing else in the repo imports from the lab.

## Package rules

- Every package has explicit `exports`, one subpath per file. No barrel file.
- Scenes have their own subpath, so importing colors or rings never loads three.js. `three` is an optional peer dependency of core.
- Each package declares every library it imports directly.
- Shared code is imported through package exports, not through Vite aliases. `@/*` stays for the lab's own files.
- Root `tsconfig.json` lists every package; shared options live in `tsconfig.base.json`. Each package gets its type check when it's created.

## Build wiring

These change together with the files they point at:

| What | Change |
| --- | --- |
| Storybook | `.storybook/` moves into `apps/lab/`. Globs stay relative to it. Static dirs: the manager font from `assets/fonts/`; `BRAND.md` and `APP-BLOCKS.md` from the repo root. |
| `.storybook/preview.tsx` | New stylesheet path. Theme decorators and story order unchanged. |
| Raw imports | `color-blocks.tsx` reads `@hmziq/brand-core/theme.css?raw`. `BrandKit.mdx` reads `BRAND.md?raw` from the repo root. Search relative imports too, not only `@/`. |
| CSS | `apps/lab/src/index.css` imports `@hmziq/brand-core/theme.css`, in the same order as now: Tailwind → tw-animate + shadcn base → fonts → theme. Add `@source` for core's `src/`. `rings.css` and `logo.css` are imported by the components that use them. |
| `components.json` | Moves with the lab. `tailwind.css` still points at `src/index.css`, never at `theme.css`. |
| Lint | `.oxlintrc.json` overrides point at `apps/lab/src/components/ui/` and `apps/lab/src/hooks/`. |
| Root scripts | `pnpm check`, `pnpm build` and `pnpm build-storybook` run the lab's targets with `pnpm --filter`, plus the root checks. |
| CI | The workflow runs the same root commands and deploys `apps/lab/storybook-static`. |

## Checks

| Check | After the move |
| --- | --- |
| Colors | Scans the lab's `components/brand`, `sites`, `templates` and `brand`, plus core's `src/`. Stock `ui/` stays exempt. |
| Motion | Scans all of the lab's `components` (stock `ui/` included), `brand`, `sites`, `templates`, plus core's `src/` and CSS. |
| Contrast | Reads `theme.css` and `color.ts` from core. |
| Brand kit | Reads its inputs from core. |

Scripts find files relative to the repo (`import.meta.url`), not the folder they're run from. A missing scan folder is an error, not a silent skip. `.svelte` and `.astro` coverage comes in kits.md.

## Where existing files go

| Now | Goes to |
| --- | --- |
| `theme.css` | `packages/brand-core/theme.css` |
| `src/lib/color.ts` | `packages/brand-core/src/color.ts` |
| `src/lib/rings.ts`, `src/lib/scenes/` | `packages/brand-core/src/motion/` |
| `src/lib/logo.ts` | `packages/brand-core/src/logo.ts`, without `letterStyle` and `squareStyle`: those go to `apps/lab/src/components/brand/logo-style.ts` |
| `src/components/brand/tones.ts` | `packages/brand-core/src/tones.ts` |
| `src/components/brand/rings.css`, `logo.css` | `packages/brand-core/` |
| `src/lib/scroll-spy.ts` | `packages/brand-core/src/scroll-spy.ts` |
| `src/sites/shared/family.ts` | `packages/brand-core/src/family.ts` |
| The rest of `src/`, plus `index.html`, `vite.config.ts`, `tsconfig.app.json`, `tsconfig.node.json`, `components.json`, `public/`, `.storybook/` | `apps/lab/`, same paths inside |
| `public/fonts/onest-latin-wght-normal.woff2` | `assets/fonts/`, still served at the same URL |
| `BRAND.md`, `README.md`, `explorations/`, `scripts/`, `docs/`, workflows | Stay at the root; paths inside them change |

## Steps

**Gate after every step:** `pnpm check && pnpm build && pnpm build-storybook` pass. Then open a site page, a SaaS template, the ring and scene demos, the tweakers, the MDX docs and `BRAND.md` in Storybook, in light and dark. Favicon and fonts load, the console has no errors, and every `#hash` route in the lab opens its page. The tweakers still load their saved settings: their `localStorage` keys don't change, and neither does the Pages origin.

### Step 0: Start clean

The move touches every file, so nothing can be in flight:

1. Run `git status --short`. If there's uncommitted work (for example the logo tweaker), stop and ask the user to commit it or put it aside. Don't commit, stash or discard it yourself.
2. Run `git branch`. If a branch holds work that isn't on `master` (for example `tweakers`), ask the user to merge it first, or which branch to start from.
3. Create the `structure` branch from that point and record the commit.

List imports before moving anything:

```sh
rg --files src .storybook scripts .github
rg -n '@/|from ["\x27]\.\.?/|import\(["\x27]|theme\.css|BRAND\.md|src/' src .storybook scripts README.md BRAND.md components.json .oxlintrc.json vite.config.ts tsconfig*.json
rg -n 'roots|tsx|css|readFileSync' scripts
```

Include CSS imports, dynamic imports, `?raw` imports and links in prose.

### Step 1: brand-core

1. Add workspace globs `apps/*`, `packages/*`, `boilerplates/*` to `pnpm-workspace.yaml`. Keep the existing esbuild permission.
2. Move the core files (table above). Split `logo.ts`.
3. Give core its `package.json` with exports, a type check, and Vitest with tests for `color.ts`.
4. Move the Shiki theme out of `code-block.tsx` into `code-theme.ts`.
5. Rewrite every import that pointed at the moved files: components, sites, templates, stories, MDX, root scripts, scene subpaths (`support`, `lattice`), and `color-blocks.tsx`'s raw CSS import.
6. Point the check scripts at the new files.
7. Update the theme install instructions in `README.md` and `BRAND.md` section 2 (`@import "@hmziq/brand-core/theme.css"` plus its `@source`). Regenerate BRAND.md's generated blocks.

**Done when:** the gate passes and nothing outside `packages/brand-core` holds a copy of a moved file.

### Step 2: Move the React code into apps/lab

1. Move the files (table above), including `.storybook/`.
2. Give the lab its `package.json` (private, `"name": "lab"`) and move the React dependencies into it. Root `package.json` keeps only tooling.
3. Apply the build wiring table. Root `pnpm dev` runs the lab.
4. Update CI to run the root commands and deploy the lab's Storybook.
5. Delete the old root build folders (`dist/`, `storybook-static/`); they're ignored build output.
6. Rewrite the root `README.md`: what the repo is, the layout, the root commands, and a link to `docs/README.md`.

Only move files in this step. Don't change any component.

**Done when:** the gate passes, the deployed Storybook looks the same as before, and the repo root holds only workspace files, docs, scripts and folders from the target tree.
