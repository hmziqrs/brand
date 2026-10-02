# Kits, boilerplates and publishing

**Part of the [master plan](./README.md). Work items 2, 3 and 4.** Starts after [structure.md](./structure.md).

This plan builds the Svelte kit and the Astro kit, and their two boilerplates, then puts them where other repos can install them. Each kit is built on the component library its sites already use:

- **SvelteKit sites use shadcn-svelte** (Bits UI).
- **Astro sites use Starwind UI**, an Astro-native library in the style of shadcn.

The two kits are separate ports of the lab's React pieces. Neither depends on the other; both share `@hmziq/brand-core`. Content-page blocks ([content-blocks.md](./content-blocks.md)) and app blocks ([app-blocks.md](./app-blocks.md)) come later, on top of this foundation.

## The two kits

| | brand-svelte | brand-astro |
| --- | --- | --- |
| Base components | shadcn-svelte (Bits UI) | Starwind UI |
| Component files | `.svelte` (Svelte 5) | `.astro` |
| Interaction | Svelte state | Starwind's own way (its component scripts or `@starwind-ui/runtime`, whichever the installed version uses) |
| Brand pieces (BRAND.md section 9) | Wordmark, Mark, Marker, Rings, CornerRings, BandArcs, RingGauge, Scene, Tag, IconTile, Notice, CodeBlock, CodeLines, CopyButton, CommandBar, TerminalWindow, Stepper, Segmented, Question, Toc, DataTable, BrandIcon | The same |
| Site blocks | SiteShell, Hero and its parts, PageIntro, RingStats, Section, OutlineCard, ElementCard, FeatureCards, FeatureGrid, Steps, PricingPlans, Price, BeforeAfter, CtaBand, and a new SiteHead | The same; SiteShell is a layout (`SiteLayout`) |
| Content pieces | Prose, Bullets, CheckList, LinkBar, SummaryBox, BigNumbers, SearchBox, TopicChips, EmptyNote | The same |
| Previewed in | Its own Storybook | A `/kit` gallery in `astro-app` |
| Matched against | The lab's React version (`apps/lab`) | The lab's React version (`apps/lab`) |

**SiteHead** is new (the lab is a single-page app, so it has none). It renders the page head for one site: title, description, canonical URL, OG and X tags, icon links and `theme-color`. It uses the same tags as the `head.html` in assets.md, from the site's id in `family.ts`.

The lab's SaaS-only blocks (AppWindow, LogoCloud, Person, QuoteCard, IntegrationGrid, Faq, InverseBand) are not ported.

## Porting rules (both kits)

1. **Same as the lab.** Component names, prop names, `data-slot` names, classes, copy and motion match the lab's React version. Motion includes the ring motion, the scene's pause button, reduced motion, and three.js loading only when a scene is on the page. Where the two differ, React is right.
2. Framework-free logic (tones, rings, logo recipe, scroll spy, code theme) is imported from `@hmziq/brand-core`, never copied.
3. **Kit files import each other through the `$brand` alias**, never through long relative paths. Every project that uses a kit defines `$brand`. Inside this repo it points at the kit's source; in a copied project it points at the folder the kit is installed into.
4. Colors come only from core's `theme.css`. Delete the default color variables each library's CLI writes.
5. **`theme.css` relies on markup.** Two rules depend on it:
   - Outline buttons stay unfilled through `[data-slot="button"][data-variant="outline"]`.
   - Icons get the brand stroke through the `.lucide` class.

   Every kit's buttons must carry those two attributes, and every icon must have the `lucide` class. Add them where the library or the Lucide package doesn't.
6. **The lab's changes to stock components apply here too.** Before porting, list every change the lab made to stock shadcn components: compare `apps/lab/src/components/ui` with a fresh `shadcn add` of each one. Apply the same changes to the shadcn-svelte and Starwind copies, and keep the list in the kit's README. Hover and press movement is always removed.
7. Blocks never read the URL or navigate by themselves. The page passes in the current path and handles navigation.

### brand-svelte

```text
packages/brand-svelte/
├── .storybook/
├── src/lib/
│   ├── ui/                      shadcn-svelte stock, with the brand's changes
│   ├── components/              brand pieces
│   ├── blocks/site/             site blocks and content pieces
│   ├── blocks/content/          content-page blocks (content-blocks.md)
│   ├── blocks/app/              app blocks (app-blocks.md)
│   ├── styles/kit.css           the stylesheet the shadcn-svelte CLI edits; never theme.css
│   └── utils.ts
├── components.json · registry.json · README.md
└── svelte.config.js · package.json
```

- Svelte 5 only: runes, snippets, callback props. React's `className` becomes `class`, `children` becomes a snippet, and `render` props become snippets or an `href`.
- No `$app/*` imports. The page owns routing, and the components stay easy to preview in Storybook.
- The `components.json` aliases use `$brand/…`. In a copied project, `$brand` points at `src/lib/brand`.
- The Storybook reuses the lab's manager theme, fonts and preview styles (`brand-theme.ts`, `manager-head.html`, `preview-head.html`), so the two look the same.

### brand-astro

```text
packages/brand-astro/
├── src/
│   ├── starwind/                Starwind stock components, with the brand's changes
│   ├── components/              brand pieces
│   ├── blocks/site/             site blocks, content pieces, SiteLayout, SiteHead
│   ├── blocks/content/          content-page blocks (content-blocks.md)
│   ├── blocks/app/              app blocks (app-blocks.md, phase 10)
│   └── styles/kit.css           Starwind's stylesheet and the BRAND.md 3.1 adapter; never theme.css
├── starwind.config.json · README.md
└── package.json
```

- Props come through `Astro.props`, and content through default and named slots.
- Interaction works the way Starwind's own components do. Scripts find elements by `data-slot`, and they rerun after view transitions (`astro:page-load`). No React, Svelte or Vue islands.
- A piece with no interaction ships no JS.
- Test BRAND.md's Starwind adapter (section 3.1) here, and fix it where it's wrong.
- Starwind variants that fill status colors solid (success, warning, info, error) are restyled to the soft recipe from BRAND.md section 4. Only orange is ever a solid fill behind text.
- `starwind.config.json` records which Starwind version each stock component came from. `starwind update` shows the upstream changes, which are then merged by hand with the brand's changes.
- Aliases: `$brand` points at `packages/brand-astro/src` in this repo, and at `src/components/brand` in a copied project (Vite alias plus `tsconfig` paths).

## The pieces roster

`scripts/pieces.json` lists every piece once. For each one it records:

- its name and group (brand, site, content page, app);
- its lab story id;
- its Svelte story id;
- its anchor in the Astro `/kit` gallery;
- its registry item name in each kit.

Every plan adds its own pieces to the roster. Two tools read it:

- **`pnpm check:parity`** fails when a piece in the roster is missing from either kit, from either kit's stories or gallery, or from either registry. A piece can be marked "not yet" while its plan is in progress. It runs in `pnpm check`.
- **`pnpm compare <piece|group>`** (`scripts/compare.mjs`, with Playwright) screenshots the lab story, the Svelte story and the Astro gallery entry, in light and dark, at 360px and 1280px. It lays them side by side in `compare/` (git-ignored). When a piece has no lab story (the app blocks), the Svelte story is the reference. `pnpm compare --pages <path>` does the same for a demo page in both boilerplates. Every "matches" check in these plans is done from this report.

## Boilerplates

`boilerplates/svelte-app` (SvelteKit with shadcn-svelte) and `boilerplates/astro-app` (Astro with Starwind UI). Each one:

- is a normal project for its framework, with its own `package.json`;
- has the main stylesheet from BRAND.md section 2 (Tailwind, tw-animate, the Onest and JetBrains Mono Fontsource packages, core's `theme.css`, the kit stylesheet), plus an `@source` for core;
- gets its kit through `$brand`, so kit changes show up right away inside this repo;
- is dark by default with a light toggle that remembers the choice. The `dark` class is set before first paint, so the wrong theme never flashes.
- has `SiteHead` in its layout and a placeholder icon pack (assets.md) until the project gets its own;
- has a landing page built from the site blocks, with example content marked as example (like the lab's SaaS templates);
- has a 404 page with the lab's not-found design;
- has the content pages from content-blocks.md and the app demo from app-blocks.md.

`astro-app` also has a `/kit` gallery: one page per group, showing every piece in every state. It stands in for Storybook, which doesn't support Astro components. `astro-app` renders on demand with the `@astrojs/node` adapter, so Astro Actions, URL params and server islands work.

**Starting a new project:** `pnpm new-project <svelte|astro> <folder>` (`scripts/new-project.mjs`):

1. Copies the boilerplate.
2. Replaces `workspace:*` versions with the published `@hmziq/brand-core` version.
3. Installs the kit from its registry into the kit folder and points `$brand` there.
4. Runs `pnpm install`.

No import in the boilerplate changes.

**Fresh-copy check:** `pnpm check:fresh-copy <svelte|astro>` runs `new-project` into a temp folder outside the repo, then builds it. A boilerplate, kit or core release happens only when this passes.

## Distribution

| What | How |
| --- | --- |
| `@hmziq/brand-core` | npm package. Semver; Changesets writes the changelog and bumps the version. |
| Svelte kit | Copied into each project from the Svelte registry, with the shadcn-svelte CLI |
| Astro kit | Copied into each project from the Astro registry. The install method comes from the test in step 2. |
| Dioxus and anything else | `theme.css` from the core package, or from `/theme.css` on the Pages site; classes copied by hand |

Rules:

- Projects import the theme from the package: `@import "@hmziq/brand-core/theme.css";`. No copied theme files.
- Projects add an `@source` for the core package in the main stylesheet, because `tones.ts` holds class names Tailwind has to see.
- The registries ship the kit's own copies of the stock components, with the brand's changes, not upstream's.
- To update a copied component, run the add command again and review the diff. The project keeps its own edits.
- The kits are never published to npm; only their registries are. Changesets still versions them as private packages, so each kit has a changelog that says which components changed.
- A LICENSE is needed at the repo root before anything is published (master plan, "Decisions").
- Releases run by hand: `pnpm changeset version`, check the fresh copies, `pnpm changeset publish`, then deploy the registries.

Everything is served from the existing GitHub Pages site:

| Path | What |
| --- | --- |
| `/` | The Svelte Storybook (the lab's Storybook until it exists) |
| `/lab/` | The lab's React Storybook |
| `/r/svelte/` | The Svelte registry |
| `/r/astro/` | The Astro registry |
| `/theme.css` | The current theme, for projects that don't use npm |
| `/BRAND.md`, `/APP-BLOCKS.md` | Reference documents for agents |

The Svelte Storybook lists the lab's Storybook as a ref, so one sidebar shows both. The lab's manager already uses relative URLs, so moving it to `/lab/` keeps its fonts and icon working.

## Repo setup for the kits

- `.gitignore`: add `.svelte-kit`, `.astro` and `compare/`. `dist` and `storybook-static` already match in any folder.
- `pnpm-workspace.yaml`: approve the build scripts the new dependencies need (for example `sharp` for Astro images) next to the existing esbuild approval.
- Lint: run oxlint on the kits' `.ts` files and, where it supports them, on `.svelte` and `.astro` script blocks. `svelte-check` and `astro check` cover types.
- CI runs `pnpm check` (including `check:parity`) and every build. `check:fresh-copy` runs before each release.

## Steps

### Step 1: brand-svelte and svelte-app (work item 2)

1. Create `packages/brand-svelte` with `sv create` (library template), Tailwind 4, and `@source` for core.
2. Run `shadcn-svelte init` with the CSS file set to `src/lib/styles/kit.css` and the aliases set to `$brand/…`. Delete the color variables it writes.
3. Add Storybook (`@storybook/sveltekit`) with the a11y and themes addons, dark first, reusing the lab's manager theme and heads. Stories are `*.stories.svelte` files next to each component.
4. Extend `check-colors` and `check-motion` to `.svelte` files (markup and `<style>`), scanning `packages/brand-svelte/src/lib` and `boilerplates/svelte-app`. Stock `ui/` is exempt from the color check but not the motion check. Add one passing and one failing example file for each check.
5. Write `scripts/pieces.json`, `check:parity` and `scripts/compare.mjs`.
6. List the lab's changes to stock components (porting rule 6).
7. Add shadcn-svelte components as the ported pieces need them, with the brand's changes.
8. Port every brand piece from `apps/lab/src/components/brand`, each with stories for the same states as its React stories.
9. Port the site blocks and content pieces from `apps/lab/src/sites/shared`, and build `SiteHead`.
10. Create `boilerplates/svelte-app` with its landing page and 404 page.
11. Root scripts: `pnpm check` also runs `svelte-check` for the kit and the boilerplate; `pnpm build` also builds `svelte-app`; `pnpm build-storybook` builds both Storybooks.
12. Deploy both Storybooks at the paths above.

**Done when:**

- `pnpm compare` shows every piece in the table above matching its lab story, in light and dark, at 360px and 1280px.
- Buttons carry `data-slot`/`data-variant`, and icons render at the brand stroke.
- axe shows zero violations.
- The checks pass (including `check:parity` for this step's pieces), and each failing example file fails.
- `svelte-app`'s landing page builds and matches the layout of the lab's landing pages, with no theme flash on load.
- `rg '\$app/' packages/brand-svelte/src` finds nothing.

**Step 1 status (updated 2026-10-01).** Done, except the deploy (1.12):

- `packages/brand-svelte` is `sv create` (library) + Tailwind 4 + `shadcn-svelte init`
  (Vega preset, base neutral), with the CSS file at `src/lib/styles/kit.css` and every
  alias on `$brand/…` (a SvelteKit `kit.alias`, handed to Vite and TypeScript both).
  The color variables init wrote are deleted; `kit.css` loads the framework CSS and
  nothing else. The stock set the pieces build on is in `ui/` (button, card, alert,
  table, tooltip, input-group) with the lab's two changes applied — the list is in the
  kit's README, with what was compared against what.
- **Import order matters**: the framework CSS must load before core's `theme.css`, or
  Tailwind's `@theme inline` utilities don't resolve the tokens (borders came out as
  `currentColor`). Both app stylesheets — the kit's `src/app.css` and the boilerplate's —
  load `kit.css` first, then the fonts, then the theme.
- Every brand piece, site block and content piece from the table is ported, each with a
  `*.stories.svelte` next to it (96 stories). `SiteHead` is new: the tags a site's
  `head.html` will hold, for a site's id in `family.ts`, with the theme-color hexes
  derived from core's `theme.css` at build time (`readTheme` + `toHex`) rather than
  typed in.
- `pnpm compare` (new, `scripts/compare.mjs`, Playwright) lays each piece next to its
  lab story in light and dark at 360px and 1280px. All 13 brand pieces with lab stories
  are byte-identical screenshots; `Scene` can't be (it animates — the lab differs from
  itself too) and matches in its `still` story, same canvas size, same pause button.
  Two real bugs it caught are fixed: a button rendered inside a button (the tooltip
  trigger now renders through bits-ui's `child` snippet) and a whitespace text node
  inside `<pre>` adding a line.
- `scripts/pieces.json` (61 pieces), `check:parity` and the failing/passing example
  files for `check:colors` and `check:motion` on `.svelte` are in. Astro fields are
  "not yet" until step 2's gallery exists.
- axe: 96 stories, 0 violations (`pnpm check:a11y` in the kit, with Storybook running).
  The two page-scope rules are off in the preview config — a story is a component in an
  iframe, and the lab's stories report exactly those two and nothing else.
- `boilerplates/svelte-app` builds: landing page from the site blocks with example copy,
  the lab's not-found design as `+error.svelte`, dark before first paint with a
  remembered light toggle, a placeholder icon pack, and `SiteHead` in the layout.

Still open in this step: nothing. 1.12 is wired: `.github/workflows/storybook.yml`
builds both Storybooks, assembles them into one Pages artifact (the kit's at `/`,
the lab's copied under `lab/`) and deploys it. Both builds emit relative asset URLs,
so neither needs a base path. The layout was checked locally by serving that same
assembled folder: `/` and `/lab/` each load on their own, the `refs.lab` entry shows
in the root sidebar, and a composed story (`?path=/story/lab_<id>`) renders in a
`/lab/iframe.html` ref iframe. The workflow also now runs `pnpm check` and
`pnpm build` instead of the five single checks, which is what "Repo setup for the
kits" asks CI to run.

### Step 2: brand-astro and astro-app (work item 3)

Needs only structure.md, so it can run alongside step 1.

1. **Test first**, in a scratch Astro app:
   - Starwind's init, with the theme from core and the BRAND.md 3.1 adapter;
   - how Starwind's CLI installs components, how they import each other, and how their interaction runs;
   - whether Starwind's buttons carry `data-slot`/`data-variant`, and whether `@lucide/astro` icons get the `lucide` class;
   - whether the `$brand` alias works for `.astro` files and their scripts;
   - how our own `.astro` files can be installed from a registry. Try Starwind's CLI with a custom registry, then the shadcn CLI with plain file items, then a small copy script, and use the first that works.
2. Create `packages/brand-astro` with Starwind, `kit.css` and the adapter. Delete Starwind's default colors.
3. Extend `check-colors` and `check-motion` to `.astro` files (markup, `<style>` and `<script>`), scanning `packages/brand-astro/src` and `boilerplates/astro-app`. Stock `starwind/` is exempt from the color check but not the motion check. Add one passing and one failing example file for each check.
4. Apply the lab's stock changes (porting rule 6) and restyle Starwind's solid status variants to soft fills.
5. Port every brand piece, then the site blocks and content pieces, and build `SiteLayout` and `SiteHead`.
6. Create `boilerplates/astro-app` with its landing page, 404 page and the `/kit` gallery.
7. Root scripts: `pnpm check` also runs `astro check`; `pnpm build` also builds `astro-app`.
8. Update BRAND.md section 2's Astro line to say Starwind UI, with no React islands, and section 3.1 with whatever the adapter test fixed.

**Done when:**

- `pnpm compare` shows every piece in the table above matching its lab story, in light and dark, at 360px and 1280px.
- axe (the browser extension or `@axe-core/cli`) shows zero violations on each `/kit` page.
- The checks pass (including `check:parity`), and each failing example file fails.
- `astro-app`'s landing page ships no JS apart from interactive pieces, with no theme flash on load.
- No Starwind component fills a status color solid behind text. The Progress and Slider indicators keep their solid fills — nothing is printed on them; the kit's README records that exception.

**Step 2 status (updated 2026-10-02).** The foundation is built; the pieces
are ported (2.5 below) and the boilerplate exists (content-blocks.md step 3,
app-blocks.md phase 10). Done:

- Step 2.1's tests, in a scratch Astro 7 app. Starwind 3.3 / registry 2.2 /
  runtime 1.2.1. Findings, kept in `packages/brand-astro/README.md`:
  - Buttons carry `data-slot` but not `data-variant`; the kit's Button adds
    it. `@lucide/astro` icons render the `lucide` class, so the brand stroke
    applies. `$brand` works for `.astro` files and their `<script>`s.
  - Installing the kit's own files: Starwind's CLI rejects shadcn-shaped
    registry items (its manifest schema is its own and undocumented); the
    shadcn CLI with plain `registry:file` items installs `.astro` files to
    exact paths. **That is the method for step 3's Astro registry.**
- `packages/brand-astro` exists: `kit.css` (Starwind's stylesheet minus its
  colors, plus the 3.1 adapter), the stock set the pieces and blocks build on
  (alert, avatar, badge, button, card, field, input, input-group, kbd, label,
  progress, separator, slider, switch, table, tabs, textarea, tooltip) with
  the brand's changes, `starwind.config.json` recording versions, and
  `astro check` wired into root `pnpm typecheck`.
- The 3.1 adapter was tested in a real build. It is correct as written. Two
  of Starwind's own lines must be deleted from `kit.css` alongside its
  colors, or they override core: the `@custom-variant dark` line (core's
  keeps `.light` bands working) and the `--radius-*` scale above `xs`. Both
  are done, and section 3.1 says so (step 2.8 applied: section 2's Astro
  line and section 3.1's adapter note, 2026-10-02).
- `check-colors` and `check-motion` read `.astro` files and scan
  `packages/brand-astro/src` (stock `starwind/` exempt from colors only) and
  `boilerplates/astro-app/src`, with self-testing examples in
  `scripts/examples/`. A scan folder that doesn't exist yet is warned about,
  not fatal, so the checks pass before the boilerplate exists.

Still open in this step: the axe pass over the `/kit` pages. Everything else
this step listed as open has landed: `astro-app` with its `/kit` gallery
(2.6), the root build script (2.7), the BRAND.md edits (2.8), `check:parity`
(it also verifies every roster piece's Astro kit file, and that every
gallery anchor belongs to the roster), `pnpm compare` and `.astro` in
`.gitignore`. `pnpm compare` ran over the whole roster on 2026-10-02: the
report in `compare/` (git-ignored) carries every piece's lab, Svelte and
Astro shots in both themes at 360px and 1280px — the Astro half for the
first time — and the Astro views match their references (checked across the
lab-story brand pieces and site, content and app samples; the kit's own
`Scene` was separately verified to mount on sites without view transitions,
which the `astro:page-load`-only init had left blank). That first run built
each Astro URL from the piece's roster group, so the ten content pieces
that live in the site gallery (Prose … Kicker) were shot on `/kit/content`,
a page that never carries their anchors; compare now reads each anchor's
gallery page from the gallery pages themselves, the way `check:parity`
does, and those ten were re-shot on `/kit/site` and re-checked.

**Step 2.5 status (updated 2026-10-01).** The pieces are ported. Every brand
piece from the kits.md table is in `packages/brand-astro/src/components/`,
the site blocks and content pieces in `src/blocks/site/`, with
`SiteLayout` (the lab's SiteShell, rendering the whole document) and
`SiteHead`; `src/index.ts` is the barrel. `astro check` (0 errors),
`check:colors` and `check-motion` pass, and a throwaway page rendering every
piece once was built with `astro build` to prove they all render — then
deleted. Findings, kept in the kit's README:

- ReactNode props became named slots; `style` objects are kebab-cased by
  `styleText`, because a style attribute ignores React's camelCase names.
  The Svelte kit's `styleText` (`packages/brand-svelte/src/lib/utils.ts`)
  has the same camelCase hole and needs the same fix before its looks are
  compared.
- Interaction, the Starwind way: delegated scripts keyed on `data-slot`,
  rerun on `astro:page-load`. `CopyButton` swaps on `data-copied`;
  `CodeBlock` renders every tab's panel at build time and toggles them;
  `Segmented` and `TopicChips` set `aria-pressed` and bubble a
  `segmented-change` / `topic-change` CustomEvent (the stand-in for the
  lab's callback props), which `PricingPlans` answers by showing the
  matching `[data-billing]` price. Everything else ships no JS.
- `Scene` works in a real build: the dynamic import bundles core's scenes
  plus three as separate chunks, loaded only when a scene is on the page.
  Projects using Scene install `three` themselves (core's optional peer).
- Pieces that must match the lab exactly carry the lab's classes on the
  piece (Notice over Starwind's Alert, cards over Starwind's Card). The
  side-by-side `pnpm compare` report is still to come (above), so the
  pixel match is unverified.

### Step 3: Publish core and the registries (work item 4)

Needs steps 1 and 2.

1. Settle the npm scope and the LICENSE (master plan, "Decisions"). Set up Changesets and publish `@hmziq/brand-core`.
2. Write `packages/brand-svelte/registry.json` for every piece in the roster so far, each with its npm dependencies (including core) and the other registry items it needs. Build it into the Pages deploy at `/r/svelte/`.
3. Build the Astro registry at `/r/astro/`, using the install method from step 2's test.
4. Install one component into a fresh SvelteKit app and one into a fresh Astro app. Then install all of them.
5. Write `scripts/new-project.mjs` and `check:fresh-copy` for both.
6. Serve `/theme.css` from the Pages deploy.
7. Update BRAND.md:
   - section 2: installing from npm and the registries, and `pnpm new-project`;
   - section 9, "Where things live": the Svelte and Astro kit folders instead of the React ones;
   - section 14, the migration checklist: which kit and registry to use.

Content blocks and app blocks are added to the registries as their plans finish them.

**Done when:**

- A fresh SvelteKit app and a fresh Astro app each get the theme from the published core and every component from their registry, and look like the references.
- `pnpm check:fresh-copy svelte` and `pnpm check:fresh-copy astro` both pass.
- BRAND.md tells a new site how to install the brand without reading these plans.

**Step 3 status (updated 2026-10-02).** The machinery is built and both
fresh-copy checks pass against a locally served registry — re-run 2026-10-02
after the content and app blocks landed in the registries (181 Svelte items,
170 Astro items, each check installs every item and builds the copy); the
actual npm publish and the first Pages deploy of the registries are the
by-hand release steps below. Done:

- LICENSE (MIT) at the root, and `@hmziq/brand-core` is publishable:
  `license`/`repository` fields, its own README and LICENSE, and a tsup build
  to `dist/` that the export map points at. Shipping TypeScript source broke
  the moment a real project imported it: a site's `vite.config.ts` loads
  core's Markdown plugins in plain Node, and Node refuses to strip types
  under `node_modules` (`ERR_UNSUPPORTED_NODE_MODULES_TYPE_STRIPPING`).
  `pnpm check` and `pnpm build` both build core first, so the workspace
  package stays in step; rebuild after editing `src/`.
- Changesets (`@changesets/cli` at the root, `.changeset/config.json`):
  core is versioned and published, the two kits are versioned as private
  packages (`privatePackages.version: true`, no tag) so each keeps a
  changelog, and `.changeset/README.md` is the release runbook:
  `pnpm changeset version` → `pnpm registry:generate` → both fresh copies →
  `pnpm changeset publish` → push (the Pages workflow then deploys the
  registries).
- Both registries, generated from the roster and the kits' source trees by
  `pnpm registry:generate` (scripts/registry-lib.mjs +
  scripts/generate-registries.mjs): one item per roster piece, one per
  vendored stock folder (`ui-*`, `starwind-*`), `utils`, a `kit` item that
  depends on everything, and a catch-all per blocks folder the roster
  doesn't list yet (`content-blocks`, `app-blocks`) — pieces become their
  own items when their plan rosters them and the generator is re-run. Every
  kit file lands in exactly one item; an item's `registryDependencies` are
  the items its files import.
  - Svelte: `packages/brand-svelte/registry.json`, built by the
    shadcn-svelte CLI's `registry build`. The CLI's alias rewriting does the
    porting-rule-3 work: kit files import `$brand/…`, and installing into a
    project whose `components.json` aliases are `$lib/brand/…` rewrites them
    to `$lib/brand/…`. The CLI's injected `devDependencies` for stock
    components (storybook and friends) are stripped in the build; the kit's
    own `dependencies` already carry what the files import.
  - Astro: `packages/brand-astro/registry.json`, the shadcn CLI's plain
    file-item format from step 2's test, with exact
    `src/components/brand/…` targets and `@hmziq/…` registryDependencies
    resolved through the project's `registries` map.
  - The Scene items carry `three` (core's optional peer): the kit barrel
    exports Scene, so every whole-kit install has to build it.
- `pnpm registry:build` (scripts/build-registries.mjs) writes the Pages
  layout — `r/svelte/`, `r/astro/`, `theme.css` — into `dist/registries/`
  (git-ignored), including the `styles/vega/index.json` the shadcn-svelte
  CLI fetches before every add. The Storybook workflow copies it into the
  Pages artifact, but only once core's version is not 0.0.0: an unreleased
  version would send installs to npm for a package that isn't there.
- `pnpm new-project <svelte|astro> <folder>`
  (scripts/new-project.mjs): copies the boilerplate, points
  `@hmziq/brand-core` at the published version (`--core` overrides, e.g. a
  `pnpm pack` tarball before a release), writes the `components.json` the
  CLIs need, points `$brand` at the installed kit folder, rewrites the
  in-repo-only lines (each stylesheet's `@source` for the kit — the Svelte
  one to the folder the kit installs into, the Astro one away, since the kit
  sits inside `src/` in a copy — and the svelte config's relative imports of
  core's Markdown plugins, which the config's own comment asks for),
  installs, and adds the whole kit from the registry. No import in the
  boilerplate changes.
- `pnpm check:fresh-copy <svelte|astro>` (scripts/check-fresh-copy.mjs):
  builds the registries, serves them from `scripts/serve-registries.mjs`
  (a separate process — the installs run under `spawnSync`), runs
  `new-project` into a temp folder outside the repo, and builds the copy.
  While core is unreleased it installs the local `pnpm pack` tarball — the
  same bytes publish would upload — and says so. Both pass.
- BRAND.md: section 2 leads with `pnpm new-project` and "The registries"
  table, section 9's "Where things live" points at the kits, section 14
  names the registry per framework.

Still open in this step:

- The release itself: `pnpm changeset version` (0.1.0 with the changeset in
  `.changeset/`), `pnpm changeset publish` (needs npm login; the @hmziq
  scope has to exist), then push so the Pages workflow ships `/r/svelte/`,
  `/r/astro/` and `/theme.css`. Until then the registries are not deployed
  and `check:fresh-copy`'s registry stays local.
- The "look like the references" half of the done-when: the fresh copies
  build, but nobody has compared their landing pages side by side with the
  lab's yet (`pnpm compare --pages`, after the Storybook/registry deploy).

## Not in this plan

- The lab's SaaS-only blocks and product-only demos (they stay in the lab)
- Moving existing sites onto the kits (each site's own repo, BRAND.md section 14)
- React, Svelte or Vue islands inside the Astro kit
- A React kit or React registry
