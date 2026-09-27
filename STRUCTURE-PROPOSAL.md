# hmziq/brand — structure proposal

**One paragraph summary.** A pnpm-workspace hub — `apps/` holding one showcase web app for the sites and SaaS templates, `packages/` holding a framework-free brand-core (theme.css tokens, color, motion, site roster) beside the React brand kit, plus `boilerplates/` for the future Svelte and Astro starters and `assets/` as the one file home for logos, social, video and fonts split into authored source vs checked exports — theme.css stays the one file every framework imports, reached through package-qualified imports (a verified 143-file codemod), a root Storybook that owns its own staticDirs and viteFinal alias table, and checks that scan all hand-written code while exempting each framework's CLI-managed stock.

---

## The proposed tree

```
brand/                        ← repo root: the workspace + the front door
├── apps/                      RUNNABLE THINGS (shadcn-ui/ui convention)
│   └── web/                   the showcase app — today's single Vite SPA, routing every site + SaaS template
│       ├── src/
│       │   ├── App.tsx        hash router; site keys from family.ts's route slugs, saas-* keys (lines 27-31) from
│       │   │                  templates/roster.ts
│       │   ├── main.tsx       entry
│       │   ├── index.css      CSS assembly: tailwind → shadcn base → Fontsource → @hmziq/brand-core/theme.css
│       │   ├── sites/         THE 8 PERSONAL SITES — one folder each, landing page inside (sites/blog/index.tsx,
│       │   │                  post.tsx, data…; Sites.stories.tsx + Pages.stories.tsx stay here)
│       │   ├── templates/     THE 5 SAAS LANDING TEMPLATES (saas/sightline…) + roster.ts (the five-template
│       │   │                  route roster, outside saas/) + Templates.stories.tsx
│       │   └── lib/           app-only helpers (scroll-spy.ts)
│       ├── public/            favicon.svg only (fonts need no files — they ship via @fontsource imports)
│       └── index.html · vite.config.ts · tsconfig.json · package.json   (@/* means THIS app's src, the only place it exists)
├── packages/                  INSTALLABLE SHARED CODE (shadcn-ui/ui convention); imports are package-qualified
│   ├── brand-core/            THE FRAMEWORK-FREE CORE — single source every framework consumes (npm @hmziq/brand-core)
│   │   ├── theme.css          THE token file: Tailwind v4 + shadcn CSS vars, exported as ./theme.css (moved from root)
│   │   └── src/
│   │       ├── color.ts       color math + brand semantics (hueUses, contrast pairs)
│   │       ├── family.ts      the 8-site roster + route slugs — one source for routes, footers, BRAND.md, asset generation
│   │       └── motion/        rings.ts + scenes/ — authored motion, no framework; ./motion/scenes lazily imported,
│   │                          `three` an optional peer (non-scene consumers never install it)
│   ├── brand/                 THE REACT KIT (npm @hmziq/brand); self-referencing imports via its exports map;
│   │   │                      devDeps keep three + @types/three so the scene stories typecheck and the root
│   │   │                      Storybook resolves three from the kit's node_modules
│   │   ├── src/
│   │   │   ├── ui/            shadcn base-vega stock, CLI-managed — EXEMPT from the color/motion guards (as today);
│   │   │   │                  its 67 story files normalize to '@storybook/react-vite' (all import type — grep-verified)
│   │   │   ├── components/    hand-written brand components + co-located stories + icons/ + tones.ts (scanned)
│   │   │   ├── blocks/        page blocks promoted from src/sites/shared (SiteShell, Hero, Section, PricingPlans,
│   │   │   │                  plus shared docs/blog-index/timeline/install-picker furniture) (scanned)
│   │   │   └── hooks/ · utils.ts
│   │   ├── docs/              THE GUIDELINES HOME: 8 MDX pages + doc blocks + ring/lattice tweakers (+ their stories);
│   │   │                      future Logo.mdx / Social.mdx / Video.mdx land here (scanned)
│   │   ├── registry.json      shadcn registry serving brand components + theme.css to any React project
│   │   └── components.json · package.json · tsconfig.json
│   ├── brand-svelte/          (FUTURE) Svelte kit + registry.json for the shadcn-svelte CLI
│   └── brand-astro/           (FUTURE) Astro kit + registry.json for Starwind
├── boilerplates/              (FUTURE) SELF-CONTAINED STARTERS, one per framework — the owner's own word, named to not
│   ├── svelte-app/              collide with the SaaS "templates"; stock lands in each CLI's own dir (svelte stock dir
│   └── astro-app/               and Starwind's registry dir are web-sourced facts — pinned at creation, when their
│                                 guard exemptions are added); each boilerplate's OWN hand-written code is scanned
├── assets/                    EVERY NON-CODE BRAND FORMAT — source strictly split from exports
│   ├── logos/                 source/ (SVG masters: mark, wordmark, lockups, per-site two-letter tiles)
│   │                          exports/ (generated favicon + app-icon packs, logo PNG/SVG per size)
│   ├── social/                source/ (OG-image / banner templates per site) · exports/ (per-platform PNGs)
│   ├── video/                 source/ (Remotion intro/outro projects) · exports/ (rendered mp4/gif)
│   ├── motion/                exports/ (rendered loops: apng/webm/lottie — the SOURCE is code in brand-core/motion)
│   └── fonts/                 THE one home for committed woff2 — non-web consumers only (Storybook chrome via
│                              staticDirs, Remotion); web apps need no font files (@fontsource imports)
├── scripts/                   ROOT-OWNED CHECKS + GENERATORS (paths anchored to repo root, not cwd)
│   ├── brand-kit.mjs          regenerates BRAND.md's three marked blocks today; GROWS to emit .storybook/brand-theme.ts,
│   │                          roster tables and a fourth marker around BRAND.md §2's install snippet
│   ├── check-colors.mjs · check-contrast.mjs · check-motion.mjs   scan hand-written code in apps/, packages/,
│   │                          boilerplates/ — stock dirs exempt per framework, mirroring check-colors.mjs:5,9 today
│   └── render-assets.mjs      (FUTURE) regenerates every assets/*/exports — `pnpm check` fails when stale
├── explorations/              STAYS: the frozen design-decision record (brand-directions.html)
├── .storybook/               STAYS: repo-wide Storybook config — the deployed brand portal; stories globs span
│                              packages/brand + apps/web; GAINS a viteFinal owning the alias table (next/image →
│                              .storybook/next-image.tsx re-homed from the app's vite.config.ts:12-13, @hmziq/* →
│                              package sources, @ → the app's src) so it stops leaning on the app's config;
│                              staticDirs re-pointed (fonts ← assets/fonts/, favicon ← apps/web/public/, BRAND.md ←
│                              root) with manager-head.html's two URLs updated; brand-theme.ts becomes generated
├── .github/workflows/         CI: ONE composite `pnpm check` (chains lint + typecheck + the four guards), then build + deploy
├── BRAND.md                   STAYS: agent-facing compendium — three marked blocks generated today (106/427, 471/482,
│                              531/569), §2's install snippet hand-edited until the fourth marker lands; still served at /BRAND.md
├── README.md                  STAYS: human front door — theme.css link (l.5), install snippet (l.55), prose (l.62),
│                              path bullets and scripts table rewritten
└── package.json (workspace manifest, `engines: node>=24`) · pnpm-workspace.yaml (packages: apps/*, packages/*,
   boilerplates/*) · pnpm-lock.yaml · tsconfig.json (solution refs) + tsconfig.base.json · .oxlintrc.json · .gitignore

MIGRATION — gate for every step: `pnpm check && pnpm build-storybook` (check already chains lint+typecheck+guards;
baseline green — run this session). (1) brand-core: move theme.css + color + motion + family.ts AND codemod exactly what
moved — the 10 @/lib/{rings,scenes,color} importers and the 2 family importers (grep-verified) — plus index.css:6,
scripts, color-blocks.tsx:3+7, README:5/55/62, BRAND.md §2 by hand. (2) the kit: move components/ui/blocks/docs, run
the REMAINDER of the 143-file codemod, add three + @types/three to the kit devDeps, normalize the 67 nextjs-vite
`import type`s to react-vite, move next-image.tsx → .storybook/ and add main.ts's viteFinal alias table (@ → ../src
for now), widen stories globs together with the move. (3) the app: App/main/index/index.html/vite/tsconfigs/public →
apps/web, flip the viteFinal's @ target to ../apps/web/src, roster-driven routes, staticDirs re-point, root tsconfig →
solution refs, CI → composite check (per-site folder merge may be its own commit). (4+) additive only: assets/,
boilerplates/ (pinning stock-dir exemptions), brand-svelte/astro, brand-kit.mjs's new outputs.

Generated, git-ignored, not in the tree: apps/web/dist/, storybook-static/ (the deployed artifact), node_modules/.
```

**`apps/` — runnable things.** One showcase app, `apps/web`, is today's single Vite SPA, routing all eight personal sites and the five SaaS landing templates from one hash router. Each site becomes exactly one folder with its landing page inside as `index.tsx`. When a site eventually needs its own deployment it graduates to `apps/<site>` without changing shape. This is the shadcn-ui/ui monorepo convention: if you can run it, it's an app.

**`packages/` — installable shared code.** Two real packages now — `brand-core` (framework-free: the theme.css tokens, color math and semantics, the motion code, the site roster) and `brand` (the React kit: CLI-managed shadcn stock, hand-written brand components, page blocks, the MDX guidelines) — plus `brand-svelte` and `brand-astro` when those frameworks arrive. Every cross-package import is package-qualified (`@hmziq/brand-core/theme.css`, `@hmziq/brand/ui/button`), so one resolver — pnpm workspace links plus the packages' exports maps — serves the app, the root Storybook and every boilerplate.

**`boilerplates/` — the future Svelte and Astro starters.** Complete runnable projects (own package.json, components.json, README) that depend on brand-core via `workspace:*` and pull framework components in via `npx shadcn add` from the matching registry. They sit at the top level and carry the owner's own word — "boilerplates" — so they never collide with the five SaaS landing "templates".

**`assets/` — every non-code brand format.** Logos, social images, video and rendered motion each get `source/` over `exports/`: sources are editable masters, exports are committed generated files that `pnpm check` verifies. Fonts have exactly one file home here, `assets/fonts/`, serving only non-web chrome — web apps need no font files at all.

**`scripts/` — the checks and generators.** The four brand guards and the BRAND.md generator stay root-owned, with paths anchored to the repo root instead of the working directory, and a future `render-assets.mjs` extends the same generate-then-verify loop to the asset exports.

**`explorations/` — the frozen design record.** Kept exactly where it is, pointed to by README and BRAND.md, and kept out of the checks by declared frozen status.

**`.storybook/` — the deployed brand portal.** Storybook stays repo-wide at the root because its stories span packages and apps, and its build is the only deployed artifact. It gains ownership of its build wiring: a `viteFinal` alias table and re-pointed static dirs, so it stops leaning on the app's vite config.

**`.github/` — CI.** One workflow that runs the single composite `pnpm check`, then builds and deploys `storybook-static`.

**Root files.** `BRAND.md` stays the agent-facing compendium; `README.md` stays the human front door; `package.json` becomes the workspace manifest; `tsconfig.json` becomes a pure solution file with a new `tsconfig.base.json` beside it.

---

## Why these decisions

**1. A pnpm workspace with six visible top-level directories.** `apps/` + `packages/` + `boilerplates/` + `assets/` (the shadcn-ui/ui monorepo convention). The workspace activates by adding a `packages:` list to the existing `pnpm-workspace.yaml` — which today contains only an esbuild build permission and defines no workspace at all (read this session: the file is just `allowBuilds: esbuild: true`). That fixes the audit's high finding that the file grants esbuild builds but has no package boundary to hang Svelte and Astro on. Visible top-level dirs stay at six — apps, packages, boilerplates, assets, scripts, explorations — satisfying "few top-level entries" while giving every format in the goal a literal home.

**2. A framework-free core with real publication mechanics.** `packages/brand-core` receives `theme.css` (from the repo root), `color.ts` (the math plus the load-bearing `hueUses`/contrast-pairs semantics), `rings.ts` + `scenes/` (motion, framework-free by design), and `family.ts` (the 8-site roster). Its exports map makes every cited import literal: `.`, `./theme.css`, `./color`, `./family`, `./motion/rings`, `./motion/scenes`. `three` becomes an **optional peer** — the scenes index's own header says to load it lazily so pages without a scene never download three.js (`src/lib/scenes/index.ts:1-5`), and a hard dep would force every color.ts consumer to install it. Because pnpm never auto-installs optional peers and isolated node_modules make the app's copy unreachable from the kit, `three` + `@types/three` also ride in `packages/brand`'s devDependencies — today both sit in the root package.json (`three` in dependencies at line 46, `@types/three` in devDependencies at line 59; both read this session) — so the scene stories typecheck inside the kit and the root Storybook build resolves three from the kit's own node_modules.

**3. One React kit, with the page blocks promoted into it.** `packages/brand` holds `src/ui/` (CLI-managed shadcn stock; `components.json` moves here so the CLI writes into the kit and still never edits theme.css — README.md:71), `src/components/` (hand-written brand components with co-located stories — ending the four-way "brand" naming split of `src/brand` vs `src/components/brand` vs `BRAND.md` vs `theme.css`), and `src/blocks/` (SiteShell, Hero, Section, PricingPlans, CtaBand promoted from `src/sites/shared`, plus the triplicated docs/blog-index/timeline/install-picker furniture). React and react-dom are peers; exports cover `./ui`, `./components`, `./blocks`, `./hooks`, `./utils` and `./registry.json`. This reverses the inverted layering: templates, brand stories and tweakers stop importing from the sites layer.

**4. Package-qualified imports everywhere; `@/*` survives in exactly one place.** Every intra-kit import is rewritten to the package's own name (`@hmziq/brand/ui/button`, `@hmziq/brand/utils`) — self-reference via the exports map, the same scoped-import approach shadcn-ui/ui uses (`@workspace/ui`), borrowed fully instead of halfway — so the identical import string works inside the kit, inside `apps/web`, inside any boilerplate. `@/*` keeps exactly one meaning: inside apps/web, resolving its own `src/*`. The mechanical rewrite covers every `@/`-prefixed import whose target moves — `@/components/ui`, `@/components/brand`, `@/hooks/use-mobile`, `@/lib/{utils,highlight-shell,rings,scenes,color}`, `@/sites/shared/{site,content,family}` — a union of **143 files** under `src/` (grep re-run while writing this proposal: exactly 143). `@/lib/scroll-spy` is app-local and stays. The kit's `components.json` sets its aliases to the package name so the shadcn CLI emits the same qualified imports.

**5. One showcase app; each site is a single folder.** `apps/web` is today's single Vite SPA (App.tsx hash router, index.html, vite.config.ts, public/). Each of the 8 sites becomes exactly ONE folder with its landing page inside as `index.tsx` — fixing today's loose-file-plus-same-named-dir split (confirmed this session: eight loose `.tsx` landing files beside five same-named site directories plus `shared/`). The existing cross-site edges are severed by promotion: claude-multi and gpui-query code is imported into hmziq's components catalog (`src/sites/hmziq/components.tsx:12-14`), and blog's share-icons into oxlabs' contact page (`src/sites/oxlabs/contact.tsx:7`) — those shared widgets graduate to blocks. Routing becomes data-driven with the schema the roster lacks today: `family.ts` entries gain a `route` slug (they currently carry external href only — `family.ts:4-11`, read this session), while the five `saas-*` template routes (App.tsx:27-31, confirmed by grep; line 26 is the section comment) get their own roster at `apps/web/src/templates/roster.ts` — one location, at the templates/ level outside `saas/`. Adding a site then means one folder + one family entry (+ optional story); adding a template means one folder + one roster entry.

**6. Boilerplates at the top level, named with the owner's own word.** A noted divergence from shadcn's `templates/`: the owner's goal uses "templates" for the five SaaS landing pages and "boilerplates" for the Svelte/Astro starters, so the structure follows that vocabulary rather than shadcn-ui/ui's root `templates/` dir of starters. Each boilerplate is a complete runnable project (own package.json, components.json, README) depending on brand-core via `workspace:*` and pulling framework components via `npx shadcn add` from `packages/brand-svelte/registry.json` and `packages/brand-astro/registry.json` — the registry being the anti-drift mechanism: the boilerplate cannot fork the button.

**7. `assets/` splits source from exports, per format.** Logos, social, video and motion each get `source/` over `exports/`, borrowing remotion-dev/logo's render-from-source pattern while avoiding its flat-root failure mode. Sources are editable masters (SVG marks and per-site two-letter tiles per BRAND.md §7, OG templates, Remotion intro/outro projects); exports are committed generated files (favicon/app-icon packs, per-platform PNGs, mp4/gif) regenerated by a future `scripts/render-assets.mjs` and verified by `pnpm check` — the same generate-then-verify loop `scripts/brand-kit.mjs` already proves on BRAND.md. Authored motion stays code in brand-core; `assets/motion/exports` holds only rendered loops. Fonts have exactly ONE file home, `assets/fonts/`: the dev server needs no font files at all (fonts ship via the @fontsource imports in `src/index.css:4-5`), so the committed woff2s serve only non-web chrome — Storybook's manager via staticDirs and future Remotion renders — and apps/web/public/ carries no fonts.

**8. One guidelines home: Storybook MDX in `packages/brand/docs`.** No separate docs site. The eight MDX pages, doc blocks and the ring/lattice tweakers (+ saved.ts, tweaker-parts.tsx and their two story files) form the kit's single guidelines home; new Logo/Social/Video pages land there as those formats arrive. BRAND.md stays at root as the agent-facing compendium — today script-synced only for its three marked blocks (markers re-verified this session at lines 106/427, 471/482, 531/569, all inside §3 and §4; §2 at 29-101 is unmarked and hand-edited) — and GROWS generated coverage: site roster, Storybook hex mirrors, and a fourth marked block around the §2 install snippet so future token moves sync instead of silently staling. README.md stays the human front door: its theme.css touchpoints — the link at line 5, the install snippet at 55, the prose at 62 (all confirmed by grep this session) — are rewritten for the new tree, and the genuinely titled "Where things live" table that exists in `src/brand/CustomComponents.mdx:17` is rewritten rather than carried stale. This follows the storybookjs/design-system convention and declines both a docs site and a fourth prose home; the deployed Storybook doubles as the public brand portal.

**9. Storybook stays repo-wide at the root — with its static AND vite wiring re-pointed.** `.storybook/` keeps its place because stories span packages/brand and apps/web and its build is the only deployed artifact (CI deploys storybook-static). Today `staticDirs` is `['../public', { from: '../BRAND.md', to: '/BRAND.md' }]` (`.storybook/main.ts:14`) and the manager chrome loads `./favicon.svg` (manager-head.html:1) and `./fonts/onest-latin-wght-normal.woff2` (manager-head.html:8) — all read this session. When public/ moves, the same commit re-points staticDirs — fonts from assets/fonts/, favicon from apps/web/public/, BRAND.md still from the root — and updates manager-head's two URLs. Equally load-bearing: the Storybook build currently leans on the ROOT vite.config.ts, whose `next/image` alias points at `./src/lib/next-image.tsx` (vite.config.ts:12-13), and `.storybook/main.ts` has NO viteFinal (read in full this session) — so main.ts GAINS a `viteFinal` owning the root build's alias table: next/image → `.storybook/next-image.tsx`, `@hmziq/brand` and `@hmziq/brand-core` → the package sources, `@` → the app's src. That table decouples Storybook from the app's vite config before that config moves. The stories globs widen to `../packages/brand/**` and `../apps/web/src/**`; the 67 registry-story framework imports normalize from `@storybook/nextjs-vite` to `@storybook/react-vite` — every one is `import type` (re-verified this session: 67 files, 0 non-import-type occurrences), so the change is typecheck-only; brand-kit.mjs grows to emit brand-theme.ts and the preview-head striping; the next-image shim moves next to this config.

**10. Root owns tooling; one `pnpm check`; the scan keeps its stock exemption, defined per framework.** scripts/ keeps the four brand guards + generator at the root (one lockfile, one composite check, shared configs at root — Turborepo declined at solo scale), with three fixes the audits and rejections demand: (1) every script anchors paths to the repo root (`import.meta.url`) instead of cwd — today `brand-kit.mjs:10` and `check-contrast.mjs:7` both do `readFileSync("theme.css")` relative to cwd, so the workspace split would silently empty them; (2) CI and every migration gate run the single `pnpm check` composite — package.json:19 chains lint + typecheck + the four guards (read this session, and run green while writing this proposal) — so `pnpm check && pnpm build-storybook` IS the full gate, listed once, never re-enumerated; (3) the scan roots become explicit data listing hand-written trees — apps/web/src, packages/brand/src/{components,blocks,docs}, packages/brand-core/src, and each boilerplate's own code — EXCLUDING every framework's CLI-managed stock dir, mirroring today's deliberate exemption (check-colors.mjs:5 exempts shadcn stock; :9 lists the hand-written roots; both read this session). `packages/brand/src/ui` for React now; the Svelte and Astro entries are pinned the moment those boilerplates are created, because the two candidate paths are web-sourced facts that cannot be verified from this repo (shadcn-svelte's `src/lib/components/ui` default from search; Starwind's registry components under `src/components` from its docs — exact subdir unpinned). package.json gains `engines: { node: ">=24" }` matching the CI pin.

**11. TypeScript config restructure for the workspace.** The root tsconfig.json becomes a pure solution file of project references (plus a new tsconfig.base.json for shared options), killing the inert `@/*` paths copy the audit flags. Each package and app gets its own extending config whose paths mirror the chosen import scheme — package-qualified self-references inside packages/brand (resolved by its exports map) and `@/*` → `./src/*` only inside apps/web. The next/image and @storybook/nextjs-vite shims (tsconfig.app.json:20-21) move into the configs that still need them — which, once the 67 registry stories normalize to react-vite, is only the Storybook-side config, since no runtime code imports nextjs-vite.

**12. Migration in three commits that each end green, then additive growth — no big-bang.** The gate for every step is `pnpm check && pnpm build-storybook` (the composite already chains lint + typecheck + the four guards; its baseline is green — see "What to do first"). Each step is sized to be one focused sitting, and step 4 onward moves nothing. The detailed sequence is spelled out in the final section.

---

## Where everything moves

| Today | Moves to | Why |
| --- | --- | --- |
| `theme.css` | `packages/brand-core/theme.css` | The single token file becomes the heart of the framework-free core, exposed as the `@hmziq/brand-core/theme.css` subpath; step 1's commit rewires all its consumers (src/index.css:6, brand-kit.mjs:10, check-contrast.mjs:7, README.md:5/55/62, BRAND.md §2 by hand). |
| `src/lib/rings.ts` + `src/lib/scenes/` | `packages/brand-core/src/motion/` | Framework-free motion joins the core; scenes stay behind the lazily-imported `./motion/scenes` subpath with `three` as an optional peer so non-scene consumers never install it (`src/lib/scenes/index.ts:1-5`); their `@/lib` importers are rewired in step 1's codemod. |
| `src/lib/color.ts` | `packages/brand-core/src/color.ts` | Color math plus the brand semantics (`hueUses`, contrast pairs) that scripts and MDX blocks already import — now a workspace import instead of the cwd-fragile relative path. |
| `src/sites/shared/family.ts` | `packages/brand-core/src/family.ts` | The 8-site roster becomes one source in the core AND gains the `route` slug field it lacks today (family.ts:4-11 carries external href only): App.tsx routes, kit footers, BRAND.md §12, Signature.mdx and future asset generation all read it. Its two importers (site.tsx:15, wordmark.stories.tsx:2 — both grep-verified) are rewired in step 1. |
| `src/components/brand/` | `packages/brand/src/components/` | Hand-written brand components with co-located stories and rings.css; icons/ becomes the real home Icons.mdx already promises; tones.ts and highlight-shell.tsx land here too; `three` + `@types/three` join the package's devDependencies for the scene stories. |
| `src/components/ui/` | `packages/brand/src/ui/` (guard-exempt) | The 58 shadcn base-vega components + 67 registry stories stay CLI-managed stock, explicitly EXEMPT from the color/motion guards exactly as today (check-colors.mjs:5,9); the 67 framework imports normalize to `@storybook/react-vite` in step 2; the local deltas (button data-variant, CardTitle) get documented in the kit README. |
| `src/sites/shared/site.tsx` + `content.tsx` | `packages/brand/src/blocks/` | Kit-level page blocks promoted out of the sites tree — the audit's high finding — plus the triplicated docs/blog-index/timeline/install-picker furniture promoted from individual sites and templates. |
| `src/hooks/use-mobile.ts` | `packages/brand/src/hooks/use-mobile.ts` | Consumed by the ui sidebar, so it travels with the kit. |
| `src/lib/utils.ts` | `packages/brand/src/utils.ts` | The `cn` re-export is kit plumbing, imported as `@hmziq/brand/utils`. |
| `src/brand/` | `packages/brand/docs/` | The eight MDX guideline pages, doc blocks and the ring/lattice tweakers (+ saved.ts, tweaker-parts.tsx, their two story files) become the kit's single guidelines home; new Logo/Social/Video pages land here as those formats arrive. |
| `components.json` | `packages/brand/components.json` | The shadcn CLI config moves into the kit, its aliases set to the package name so the CLI writes to `packages/brand/src/ui` and emits package-qualified imports — and still never edits theme.css (README.md:71). |
| `src/App.tsx`, `src/main.tsx`, `src/index.css`, `index.html`, `vite.config.ts` | `apps/web/src/` + `apps/web/index.html` + `apps/web/vite.config.ts` | Today's single Vite app becomes apps/web; index.css keeps the layering recipe; App.tsx's eight site keys derive from family.ts's new route slugs and the five saas-* keys (App.tsx:27-31) from `apps/web/src/templates/roster.ts`; the app's vite.config keeps only app aliases once the Storybook viteFinal owns the shared table. |
| `src/sites/{blog,claude-multi,gpui-query,hmziq,oxlabs}/` + the eight loose `src/sites/<name>.tsx` landing files | `apps/web/src/sites/<name>/` | Each site becomes exactly one folder with its landing page inside as `index.tsx`; the cross-site imports are severed by promotion (claude-multi/gpui-query blocks+data INTO hmziq, blog's share-icons INTO oxlabs); Sites.stories.tsx and Pages.stories.tsx stay beside them; vibe-coding-cover.jpg stays with the blog site as content media. |
| `src/templates/saas/` | `apps/web/src/templates/saas/` (routes rostered at `apps/web/src/templates/roster.ts`) | The five SaaS landing templates stay together in the showcase app, now importing kit blocks instead of the sites layer; their five routes get a home outside family.ts, at the templates/ level. |
| `src/lib/scroll-spy.ts` | `apps/web/src/lib/scroll-spy.ts` | Used only by three site pages — an app helper, not kit; its `@/lib` alias keeps working because apps/web keeps `@/*` for its own src. |
| `src/lib/next-image.tsx` | `.storybook/next-image.tsx` (moved in step 2, wired via viteFinal) | Build tooling for the 3 registry stories that import next/image — moves to `.storybook/`, with the alias re-homed from vite.config.ts:12-13 into main.ts's new viteFinal, so the root Storybook stops leaning on the app's config. |
| `public/favicon.svg` | `apps/web/public/favicon.svg` | The dev server's favicon moves with the app; it remains the hand-drawn orange circle until real per-site favicons are generated per BRAND.md §7; Storybook's manager favicon re-points to it via staticDirs until assets/logos/exports exists. |
| `public/fonts/onest-latin-wght-normal.woff2` | `assets/fonts/onest-latin-wght-normal.woff2` (served via .storybook staticDirs) | The ONE committed font file exists solely for Storybook's manager chrome (manager-head.html:8); the dev server needs no font files (fonts ship via @fontsource imports, src/index.css:4-5), so its single home is assets/fonts/ — with the missing JetBrains Mono woff2 joining it. |
| `BRAND.md` | `BRAND.md` (repo root, unchanged) | Stays the agent-facing compendium AND stays served at /BRAND.md by staticDirs; its three marked blocks (106/427, 471/482, 531/569) are generated today, §2's install snippet is hand-edited until brand-kit.mjs grows a fourth marker, and the generated coverage grows to the site roster and Storybook hex mirrors. |
| `README.md` | `README.md` (repo root, unchanged) | Stays the human front door; all three theme.css touchpoints (line 5, 55, 62) are rewritten for the new tree, along with the path bullets and scripts table. It has no "Where things live" heading — that table lives in `src/brand/CustomComponents.mdx:17` and is rewritten there. |
| `explorations/` | `explorations/` (repo root, unchanged) | Kept as the frozen design-decision record README and BRAND.md already point to; its hand-typed palette snapshot stays out of the checks by declared frozen status. |
| `scripts/` | `scripts/` (repo root, unchanged) | The four brand guards + generator stay root-owned; paths become repo-root-anchored; the scan roots become explicit data covering hand-written trees while exempting each framework's CLI-managed stock dir; a future render-assets.mjs regenerates the assets exports. |
| `.storybook/` | `.storybook/` (repo root, unchanged, gains viteFinal) | Remains the repo-wide, deployed brand portal and gains OWNERSHIP of its build wiring: widened stories globs, a viteFinal alias table, re-pointed staticDirs with manager-head's two URLs updated, and brand-theme.ts + preview-head hexes as future outputs of brand-kit.mjs. |
| `.github/` | `.github/workflows/storybook.yml` (unchanged location, edited) | CI switches to the single `pnpm check` composite (which already chains lint + typecheck + the four guards, package.json:19) before building and deploying storybook-static. |
| `package.json` | `package.json` (repo root, becomes workspace manifest) | Scripts (dev via `--filter`, one composite check), shared tooling devDeps, and an `engines: node >= 24` field; `three` (dependencies:46) and `@types/three` (devDependencies:59) move out — three becomes brand-core's optional peer plus a packages/brand devDependency for the scene stories. |
| `pnpm-workspace.yaml` + `pnpm-lock.yaml` | `pnpm-workspace.yaml` + `pnpm-lock.yaml` (repo root) | The workspace file gains `packages: [apps/*, packages/*, boilerplates/*]` — the audit's high finding that no package boundary exists for Svelte/Astro; the single lockfile stays. |
| `tsconfig.json` | `tsconfig.json` (solution) + new `tsconfig.base.json` (repo root) | Root becomes a pure solution file of project references, killing the inert paths copy the audit flags; a new tsconfig.base.json holds shared compiler options. |
| `tsconfig.app.json` + `tsconfig.node.json` | `apps/web/tsconfig.app.json` + `apps/web/tsconfig.node.json` | The app's live configs move with the app, keeping `@/*` → `./src/*` (the alias's only remaining meaning); the next/image shim survives only where needed once the 67 registry stories normalize, and the @storybook/nextjs-vite shim is deleted outright. |
| `.oxlintrc.json` + `.gitignore` | `.oxlintrc.json` + `.gitignore` (repo root, unchanged) | Root-owned shared configs stay; .gitignore additionally names `.zcode/` explicitly and lists storybook-static once (removing the duplicate line); `.DS_Store` is already ignored at .gitignore:19. |
| `dist/` | `apps/web/dist/` (generated, stays git-ignored) | Git-ignored build output of the dev app, unchanged role — deploying it is a future owner decision, not a structure one. |
| `storybook-static/` | `storybook-static/` (repo root, generated, stays git-ignored) | The one deployed artifact (GitHub Pages) — stays put, produced by the same root Storybook build. |
| `node_modules/` + `.git` + `.DS_Store` | unchanged | Infrastructure and OS noise; node_modules becomes the pnpm workspace install; .DS_Store is already ignored, so nothing changes for it. |
| `.zcode/` | `.zcode/` (repo root, untracked local tooling) | Stays where it is, but the root .gitignore names it explicitly so the ignore policy is auditable in one file. |

---

## One source of truth across React, Svelte and Astro

**Tokens.** `packages/brand-core/theme.css` is the one source (Tailwind v4 + shadcn CSS variables — plain CSS, no framework), exposed as the literal subpath `@hmziq/brand-core/theme.css` via the package's exports map. Every consumer imports it verbatim and layers its own Tailwind entry on top, in the order theme.css's own header already documents: React — `apps/web/src/index.css`; Svelte — `boilerplates/svelte-app/src/app.css`; Astro — `boilerplates/astro-app/src/styles/global.css`. Tailwind v4 behaves identically in all three, and shadcn's registry docs state themes are plain CSS variables, "not limited to React" (research pattern 2).

**One import scheme, one resolver.** All cross-package imports are package-qualified (`@hmziq/brand/*`, `@hmziq/brand-core/*`), so one resolver — pnpm workspace links + the two packages' exports maps — serves the app, the root Storybook and every boilerplate. `@/*` exists only inside apps/web, pointing at its own src.

**Theme-with-components travels via shadcn registries.** `packages/brand/registry.json` (React), `packages/brand-svelte/registry.json` (shadcn-svelte CLI), `packages/brand-astro/registry.json` (Starwind) — each item declares the theme.css file as a dependency, so `npx shadcn add` carries the tokens in with the components (research pattern 3).

**Fonts.** theme.css's `--font-sans`/`--font-mono` variables are the single declaration of the stacks; every app in every framework installs the same @fontsource-variable packages (the repo's existing self-hosting rule, `src/index.css:4-5`), so the dev server needs no font files at all and the web font never exists as a second artifact. The committed woff2s live in ONE place, `assets/fonts/`, serving only non-web chrome — the Storybook manager via staticDirs and Remotion renders.

**Motion.** `packages/brand-core/src/motion/` is authored framework-free on purpose — rings.ts has no imports, and stage.ts documents "call mountScene from React, Svelte, Astro or plain HTML" (audits). React wraps it in packages/brand (Rings, Scene); Svelte and Astro import the identical functions, with scenes staying behind the lazily-imported `./motion/scenes` subpath so consumers without scenes never download three.js (`src/lib/scenes/index.ts:1-5`). Because pnpm does not auto-install optional peers, `three` + `@types/three` additionally ride in packages/brand's devDependencies so the kit's scene stories typecheck and the root Storybook build resolves three from the kit's own node_modules — today both sit in root package.json (dependencies:46, devDependencies:59, verified this session). Consumers that use scenes still declare three themselves.

**Guards.** scripts/check-colors and check-contrast read brand-core/theme.css and scan all hand-written code — apps/web/src, packages/brand/src/{components,blocks,docs}, packages/brand-core/src, and each boilerplate's own code — while deliberately exempting every framework's CLI-managed stock dir exactly as the check does today (check-colors.mjs:5 exempts shadcn stock; :9 lists only hand-written roots; both re-read this session). The round-2 rejection's replica run against src/components/ui found 14 stock violations — cited from that rejection, not re-run here. So the precise claim is: **a forked hex in any hand-written file in any framework fails `pnpm check`; stock stays exempt by the script's own root list, which is data, not convention.** The Svelte and Astro exemption paths are web-sourced facts, not verifiable from this repo, and are pinned the moment each boilerplate is created.

**Brand data and generation.** Generation today covers only BRAND.md's three marked blocks (markers re-verified this session at 106/427, 471/482, 531/569 — §2's install prose at 29-101 sits OUTSIDE them and is hand-edited). brand-kit.mjs grows to also emit `.storybook/brand-theme.ts`, the preview-head hexes, the site-roster tables, and a fourth marked block around the §2 install snippet. Brand data — the 8-site roster in brand-core/src/family.ts, the color semantics in brand-core/src/color.ts — is likewise imported verbatim by every framework and by the asset generators.

---

## What to do first

*The gate for every step is `pnpm check && pnpm build-storybook` — the composite check chains lint + typecheck + the four guards (package.json:19). Baseline `pnpm check` was run while writing this proposal and is green end to end (oxlint 0 warnings / 0 errors, tsc clean, "Every color comes from the theme", all 35 contrast pairs pass AA in both modes, "BRAND.md matches theme.css"). `pnpm build-storybook` was not run by this review, since it writes the storybook-static output; the upstream review ran it green.*

**Step 0 — land the working tree first.** The tree currently holds an uncommitted batch (31 changed paths at this session's `git status`: 21 modified files plus 10 new paths — the scene system, rings.css and the tweakers). Commit it before any move, so every migration step is a clean, reviewable diff.

**Step 1 — brand-core, with its partial codemod in the same commit.** Add the workspace `packages:` globs to pnpm-workspace.yaml. Create `packages/brand-core` by moving theme.css, color.ts, rings.ts, scenes/ and family.ts. Codemod exactly the modules that moved: `@/lib/{rings,scenes,color}` → `@hmziq/brand-core/…` across the 10 importing files (count re-verified this session), and the family imports → `@hmziq/brand-core/family` in their 2 importers (`src/sites/shared/site.tsx:15` — a relative `./family` import today — and `src/components/brand/wordmark.stories.tsx:2`). Also: `src/index.css:6`'s @import, `scripts/brand-kit.mjs:10` and `check-contrast.mjs:7` (both currently cwd-relative reads of "theme.css" — verified this session), color-blocks.tsx's BOTH references (line 3's `../../theme.css?raw` and line 7's `@/lib/color`), all three README touchpoints (lines 5, 55, 62), and BRAND.md §2's snippet by HAND (§2 spans 29-101 with no markers, so brand-kit:sync cannot touch it today; the fourth marked block lands with brand-kit.mjs's growth). No dangling alias remains in src/, so typecheck and build-storybook stay green.

**Step 2 — the kit, including its Storybook wiring, in the same commit.** Move `src/components/{brand,ui}`, hooks, utils/highlight-shell, the promoted blocks and src/brand's docs+tweakers into packages/brand. Run the REMAINDER of the 143-file import codemod (`@/components/ui`, `@/components/brand`, `@/hooks/use-mobile`, `@/lib/{utils,highlight-shell}`, `@/sites/shared/{site,content}`). Move components.json. Add `three` + `@types/three` to packages/brand devDependencies (the scene stories now live there). Normalize the 67 `import type '@storybook/nextjs-vite'` imports to `@storybook/react-vite` (typecheck-only — the tsconfig.app.json:21 shim that resolves them today disappears with the app). Move `src/lib/next-image.tsx` → `.storybook/next-image.tsx`. Add the viteFinal alias table to `.storybook/main.ts` (next/image → `.storybook/next-image.tsx`, `@hmziq/*` → package sources, `@` → `../src` while the app still sits at src/). Widen the stories globs to `../packages/brand/**` in the same commit — globs break the moment any `*.stories.*` moves, so they move together.

**Step 3 — the app.** `src/App.tsx`, main.tsx, index.css, index.html, vite.config.ts, tsconfig.app/node and public/ move to `apps/web/`. The app's vite.config keeps only app aliases; the Storybook viteFinal's `@` target flips from `../src` to `../apps/web/src` in the same commit. Routes switch to the roster-driven map (family route slugs + `templates/roster.ts`). staticDirs re-points to `assets/fonts/` + `apps/web/public/` and manager-head's two URLs update. Root tsconfig becomes solution refs; CI switches to the composite check. The per-site folder merge (loose landing files into `<name>/index.tsx`) can land as its own commit inside this step.

**Step 4+ — additive only, moving nothing.** `assets/` + render-assets; `boilerplates/` + brand-svelte/brand-astro (pinning their stock-dir exemptions at creation); brand-kit.mjs's new outputs. Each lands whenever the need arrives — none of them is blocked by or blocks the first three steps.

Sized for one maintainer: steps 1–3 are three focused sittings, each ending at a green gate; everything after is incremental.

---

## Open questions

1. **Site deployments.** Do any sites need their own deployments soon (e.g. blog or claude-multi as standalone apps under `apps/`), or is the single showcase app plus the deployed Storybook the steady state? This decides whether to split apps/web earlier or keep one SPA with per-site folders.
2. **Boilerplate coupling.** Should the Svelte/Astro boilerplates be workspace-coupled (depend on brand-core/brand-svelte via `workspace:*` — drift-safe but bound to this repo) or self-contained starters that pull components and theme.css via `npx shadcn add` from a served registry (degit-able anywhere, but the registry must be hosted — e.g. from the deployed Storybook or raw GitHub)?
3. **Video pipeline.** Remotion (code-rendered, fits the render-from-source checks the repo already uses) or designer tools (After Effects/Rive)? Only Remotion lets CI verify that exports match sources.
4. **The SaaS templates' audience.** Are the five landing templates showcase-only (as proposed), or also starting points clients copy — in which case they need boilerplate-grade, self-contained variants under `boilerplates/` in addition to the showcase pages?
5. **How far generation goes.** Is Storybook MDX the canonical human doc with BRAND.md fully generated for agents (the proposal's direction: growing scripts/brand-kit.mjs, including the fourth marker around §2's install snippet), or does the owner want to keep hand-writing BRAND.md prose as the master?
6. **Stock-dir guarding.** Should the exempted stock dirs get their own guard — a registry-diff check flagging hand edits to CLI-managed files (the audits found button.tsx/card.tsx deltas) — or stay exempt-and-documented as today?

---

*Advisory only — produced by a read-only structure review; nothing in this repository has been changed.*
