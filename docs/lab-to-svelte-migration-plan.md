# Lab → Svelte migration plan

**DONE. The port finished and `apps/lab` was deleted on 2026-10-09; everything below is the historical record of the migration. The Svelte kit (`packages/brand-svelte` + `boilerplates/svelte-app`) is the surviving reference.**

Goal: the React lab (apps/lab) hands everything worth keeping to the Svelte kit (packages/brand-svelte + boilerplates). After this plan, React retires from use — no hmziq work happens in React.

**Freeze policy: NOTHING in apps/lab gets deleted or modified — source, config and assets alike. Generated build output is exempt: apps/lab/storybook-static (327 git-ignored files, served at /lab) and apps/lab/dist (27 git-ignored files, rewritten by the root build's lab half — package.json:11 runs pnpm --filter lab build). Both exist only to be built and served; rebuilding them changes no source. The lab stays as the owner's manual-verification reference, served by the kit Storybook's /lab/ ref (apps/lab/storybook-static is served at /lab in dev by packages/brand-svelte/.storybook/main.ts:34-36; the Pages deploy copies the same build there).**

Every step below only adds Svelte files. React code is touched once, in a final retirement step this plan defines but does not run. That step needs its own approval.

Evidence base: the six mappings in `.zflow/migration/` (brand-docs, tweakers, sites, support, templates, ui-base) and the inventories beside them, plus the check-parity roster for the pieces area (which has no mapping file). Mapping counts were recomputed from those files; the pieces directory was listed this session (26 files, 25 in scope). `node scripts/check-parity.mjs` run this session: "Every piece is in step: 136 pieces (30 brand, 22 site, 37 content, 47 app), 313 Svelte stories."

## Disposition summary

| area | items | already-done | keep-port | reference-only | decide |
|---|---|---|---|---|---|
| brand pieces | 25 | 25 | 0 | 0 | 0 |
| brand-docs | 11 | 0 | 0 | 11 | 0 |
| tweakers | 8 | 0 | 8 | 0 | 0 |
| sites | 31 | 15 | 0 | 15 | 1 |
| support | 32 | 29 | 1 | 2 | 0 |
| templates | 16 | 0 | 0 | 16 | 0 |
| ui-base | 128 | 27 | 2 | 97 | 2 |
| **total** | **251** | **96** | **11** | **141** | **3** |

Verdicts:

- **already-done** — the Svelte side exists and is verified. Nothing to do.
- **keep-port** — wanted in Svelte and missing. This plan ports it (steps 1–5).
- **reference-only** — stays viewable only in the frozen lab. No Svelte work. The lab's /lab/ ref is its permanent home unless a decide answer says otherwise.
- **decide** — the owner picks between porting and reference-only (questions D5 and D12).

The shape in one line: the kit is already the reference for pieces, blocks and pages (96 done, parity-checked); the only real porting work left is the four tweaker pages and their shared parts (8 rows), one favicon file, the two stock vendoring adds (ui/label, ui/slider), and two owner decisions.

### brand pieces — 25 rows, all already-done (roster-covered, no mapping file)

The 25 piece files under apps/lab/src/components/brand/ (directory listed this session: 26 files, minus wordmark.stories.tsx which the tweakers table covers). Every one is ported and enforced by the check-parity roster, not by a mapping file: `node scripts/check-parity.mjs` run this session passes — "Every piece is in step: 136 pieces (30 brand, 22 site, 37 content, 47 app), 313 Svelte stories" — and each counterpart exists in packages/brand-svelte/src/lib/components/.

| item | what | svelte | gaps | verdict | work |
|---|---|---|---|---|---|
| brand-icon.tsx + .stories.tsx, code-block.tsx + .stories.tsx, command.tsx, data-table.tsx, icon-tile.tsx + .stories.tsx, marker.tsx + .stories.tsx, notice.tsx + .stories.tsx, question.tsx, rings.tsx + .stories.tsx, scene.tsx + .stories.tsx, segmented.tsx, stepper.tsx, tag.tsx + .stories.tsx, terminal.tsx, toc.tsx, wordmark.tsx (16 rostered components + 8 story files = 24 rows) | the brand pieces | ported (components/ in the kit: one .svelte twin each, terminal as terminal-window/-body/-line) | each is a roster entry in scripts/pieces.json — file and story enforced by pnpm check:parity (16 names matched in the roster this session) | already-done | - |
| logo-style.ts | shared logo look helper | ported (components/logo-style.ts) | not a roster entry — a helper shown inside Wordmark/Mark, checked by existence, not by a story (parity's reverse rule covers stories only) | already-done | - |

## Per-area items

Verdict first, then the rows. "Work" cells point at the step that does them.

### brand-docs — 11 rows, all reference-only

Verdict: nothing moves. The kit's Storybook has no MDX and no docs pages by design (stories glob is `*.stories.svelte` only, packages/brand-svelte/.storybook/main.ts:7). Every page's content is durable in BRAND.md, which the kit itself serves at /BRAND.md (staticDirs, main.ts:29) and pnpm check:brand-kit / check:contrast keep in step with theme.css.

| item | what | svelte | gaps | verdict | work |
|---|---|---|---|---|---|
| brand/BrandKit.mdx | BRAND.md rendered inside Storybook | not ported | deliverable already served at /BRAND.md; only the rendered-inside-Storybook form stays lab-only | reference-only | - |
| brand/Colors.mdx | palette, roles, soft fills, live contrast table | not ported | same numbers live in BRAND.md section 4, regenerated from the same core functions; interactive swatch page stays in the lab | reference-only | - |
| brand/CustomComponents.mdx | folder map, rules table, recipe, checklist, 3 demos | not ported | rules in BRAND.md sections 8-9; Svelte recipe already in kit README:33-37,47-53; half the page documents the retired structure | reference-only | - |
| brand/Icons.mdx | Lucide rules, sizes, glossary, recipes | not ported | BRAND.md section 6 carries table + glossary; kit README:80-85 carries the Svelte stroke rule; rebuild deps exist in kit | reference-only | - |
| brand/Introduction.mdx | overview, short brand, motion, theme CSS | not ported | content is BRAND.md sections 1, 2, 10; section map describes the lab's own sidebar | reference-only | - |
| brand/Signature.mdx | wordmark/marks/marker/rings/bands page | not ported | all eight embedded stories are ported under the same names (wordmark, marker, rings stories); recipes in BRAND.md section 7 | reference-only | - |
| brand/Typography.mdx | Onest + JetBrains Mono specimens | not ported | rules in BRAND.md section 5; Typeset blocks are addon-docs presentation the kit does not use | reference-only | - |
| brand/Writing.mdx | plain-language rules, before/after table | not ported | BRAND.md section 11 and 13; pure prose, nothing live lost | reference-only | - |
| brand/color-blocks.tsx | React swatch/contrast computation lib | not ported | every computation is already framework-free in @hmziq/brand-core/color and used by the kit (site-head.svelte, tag stories); only React presentation retires | reference-only | - |
| brand/custom-blocks.tsx | 3 do/don't demo panels | not ported | composes already-ported pieces (IconTile, Notice, Tag); rules are BRAND.md section 4's "where color goes" | reference-only | - |
| brand/icon-blocks.tsx | Icons-page demos (strokes, sizes, glossary, in-use) | not ported | tables are BRAND.md section 6; pieces all ported; deps for a rebuild exist (package.json:43,48) | reference-only | - |

### tweakers — 8 rows, all keep-port

Verdict: the one genuine hole in the kit. Every tweaker is missing, but everything they compose is ported and verified: Scene takes settings and rebuilds, Rings takes motion plus paused, Wordmark/Mark take look plus paused, and core carries lattice/rings/logo/family wholesale. No kit story today exercises Rings motion at all.

| item | what | svelte | gaps | verdict | work |
|---|---|---|---|---|---|
| brand/saved.ts | loadSaved/save/within helpers (3 localStorage keys) | missing | plain browser code, ports as-is; same keys so lab-saved settings carry over | keep-port | step 2 |
| brand/tweaker-parts.tsx | TweakerPage, Setting, ColorSetting, Toggle, Group, ExportBox | missing | needs stock ui/label + ui/slider (kit has neither); button/input/switch/textarea already in kit ui/ with both button brand changes applied | keep-port | steps 2-3 |
| brand/lattice-tweaker.tsx | 13-range lattice tweaker, 5 presets, 2 views, JSON export/paste | missing | all building blocks ported (Scene, Rings, Segmented, Hero, BrandIcon; core latticeDefaults/latticeModel) | keep-port | step 3 |
| brand/lattice.stories.tsx | fullscreen Custom/Lattice Tweaker story | missing | kit lattice coverage is static only | keep-port | step 3 |
| brand/ring-tweaker.tsx | per-layer ring motion tweaker, merge-only paste | missing | kit Rings already takes everything it feeds (motion, paused, seed) | keep-port | step 4 |
| brand/ring-motion.stories.tsx | Tweaker + SideBySide (8 presets, per-preset pause) | missing | no kit story exercises Rings motion | keep-port | step 4 |
| brand/logo-tweaker.tsx | 21-range logo tweaker, 5 views, 3 backdrops, 10 presets | missing | wordmark/mark take look + paused; the kit's current Tweaker story is a static preset wall, not the tuning page | keep-port | step 5 |
| components/brand/wordmark.stories.tsx | Custom/Logo stories; Tweaker renders LogoTweaker | ported with gaps | 4 static stories ported; Tweaker story is static, needs the live tweaker (D3 decides replace vs beside) | keep-port | step 5 |

### sites — 31 rows: 15 already-done, 15 reference-only, 1 decide

Verdict: the reusable layer is ported 1:1 and parity-checked. Real site content is per-site repo work by design. One hole: claude-multi's product demos.

| item | what | svelte | gaps | verdict | work |
|---|---|---|---|---|---|
| sites/shared/site.tsx | ButtonLink, Container, SiteShell, Hero + parts, Section, RingStats, cards, Steps, CtaBand, PricingPlans, BeforeAfter | ported | - | already-done | - |
| sites/shared/content.tsx | Prose, Bullets, CheckList, LinkBar, SummaryBox, BigNumbers, SearchBox, EmptyNote, Kicker, TopicChips | ported | TopicChips is string-typed where the lab was generic — same behavior | already-done | - |
| sites/blog.tsx | blog landing/post-list | ported | real copy stays behind; pattern ships with example posts | already-done | - |
| sites/blog/post.tsx | full post page: TOC spy, TL;DR, quote, share bar | ported | example post proves the pattern | already-done | - |
| sites/blog/share-icons.ts | 6 Simple Icons paths | ported | - | already-done | - |
| sites/blog/shared.tsx | BlogShell + NewsletterBand | ported | form is SvelteKit action + ?subscribed state, same states | already-done | - |
| sites/blog/vibe-coding-cover.jpg | post cover JPEG | not ported | blog's own asset; kit covers come from frontmatter | reference-only | - |
| sites/Pages.stories.tsx | 12 site pages fullscreen | not ported | 11 pages exist as boilerplate routes (shot by pnpm compare --pages); providers page has no route by plan | reference-only | - |
| sites/Sites.stories.tsx | 8 landing pages fullscreen | not ported | landings are per-site assemblies; boilerplate carries one example landing | reference-only | - |
| sites/claude-multi.tsx | claude-multi landing | ported with gaps | MenuDemo, ProvidersTable, InstanceGraph have no Svelte counterpart | reference-only | - |
| sites/claude-multi/about.tsx | /about page | ported | - | already-done | - |
| sites/claude-multi/blocks.tsx | MenuDemo, InstallBlock, Checks, ProvidersTable, InstanceGraph | ported with gaps | only inline Code and the ClaudeMultiShell wrapper are ported; no Svelte file composes InstallBlock (Segmented + CommandBar + Checks, blocks.tsx:182-193 — install-steps.svelte is the components-page stepper, not this), and Checks (horizontal wrap, text-success Markers, blocks.tsx:199-208) has no counterpart at all: check-list.svelte is the shared CheckList's port (vertical, text-primary, sites/shared/content.tsx:42-53), a different component; content-blocks.md:22 records MenuDemo, InstanceGraph, ProvidersTable and Checks as "Product-only parts stay in the lab", which stops working once React stops | decide | C1 (D5) |
| sites/claude-multi/blog.tsx | /blog index | ported | example content in boilerplate | already-done | - |
| sites/claude-multi/changelog.tsx | /changelog timeline | ported | collapse verified in kit | already-done | - |
| sites/claude-multi/data.ts | claude-multi's real content | not ported | site's own content; only type shapes ported | reference-only | - |
| sites/claude-multi/faq.tsx | /faq list | ported | - | already-done | - |
| sites/claude-multi/legal-text.ts | privacy/terms words | not ported | LegalDoc structure is a kit block; the words are the site's | reference-only | - |
| sites/claude-multi/legal.tsx | privacy/terms page | ported | - | already-done | - |
| sites/claude-multi/not-found.tsx | 404 | ported | boilerplate +error.svelte | already-done | - |
| sites/claude-multi/providers.tsx | /providers page | not ported | excluded by content-blocks.md:389; straight assembly in the site's repo | reference-only | - |
| sites/freeoxide.tsx | freeoxide landing | ported | real content per-site | reference-only | - |
| sites/gpui-query.tsx | gpui-query landing | ported | every block it assembles is in the kit | reference-only | - |
| sites/gpui-query/blocks.tsx | CodeEditor, Comparison, Questions | ported | - | already-done | - |
| sites/gpui-query/data.ts | gpui-query content | not ported | sample strings live on in kit story data | reference-only | - |
| sites/gpui-query/docs.tsx | docs page | ported | 3 example docs pages in boilerplate | already-done | - |
| sites/gpui-starter.tsx | gpui-starter landing | ported with gaps | AppPreview hero mock stays in the lab as a product-only demo | reference-only | - |
| sites/hmziq.tsx | hmziq.rs landing | ported | tools badges used stock ui/badge; Tag covers the role | reference-only | - |
| sites/hmziq/components.tsx | components catalog | ported with gaps | Svelte page drops MenuDemo/ProvidersTable/InstanceGraph with the product demos | reference-only | - |
| sites/labs.tsx | hmziq.xyz landing | ported | real content per-site | reference-only | - |
| sites/oxlabs.tsx | oxlabs.dev landing | ported | badge note as hmziq.rs | reference-only | - |
| sites/oxlabs/contact.tsx | /contact page | ported | - | already-done | - |

### support — 32 rows: 29 already-done, 1 keep-port, 2 reference-only

Verdict: done. The kit's Storybook chrome is the lab's (brand-theme, manager, manager-head, preview-head diff-identical); SvelteKit replaces the Vite/TS/app shell trio; rendered assets have their per-project home. One real gap: the kit's favicon.

| item | what | svelte | gaps | verdict | work |
|---|---|---|---|---|---|
| .storybook/brand-theme.ts | manager theme | ported | - | already-done | - |
| .storybook/main.ts | SB composition | ported | swaps to sveltekit + svelte-csf, adds refs.lab and the dev /lab staticDir | already-done | - |
| .storybook/manager-head.html | favicon + font tags | ported | - | already-done | - |
| .storybook/manager.ts | brandDark manager | ported | - | already-done | - |
| .storybook/preview-head.html | docs CSS overrides | ported | - | already-done | - |
| .storybook/preview.tsx | renderer config | ported | keeps theme machine; drops TooltipProvider (bits-ui needs none); adds phone360 viewport | already-done | - |
| components.json | shadcn config | ported | shadcn-svelte schema, $brand aliases | already-done | - |
| package.json | lab manifest: storybook/dev/build scripts and every React dependency (react 19, @base-ui/react, recharts, react-day-picker, lucide-react, …) | ported | the kit and boilerplates carry their own manifests; the lab's exists to run the frozen lab only — its workspace entry and React deps go in step R | already-done | - (step R) |
| index.html | app shell + head tags | ported | app.html + SiteHead render the same tag set | already-done | - |
| public/favicon.svg | the hmziq mark | ported with gaps | kit file is sv-create's Svelte-logo default, so the Pages-root tab shows the wrong icon | keep-port | step 1 |
| public/favicon.ico, favicon-16/32/48.png, icon-192/512.png, maskable-512.png, og-1200x630.png, x-1200x675.png, site.webmanifest, apple-touch-icon.png (11 rows) | rendered asset pack | not ported by design | per-project packs via pnpm render-assets; svelte-app carries placeholders + SiteHead emits the tags | already-done | - |
| App.tsx | dev hash router | ported | pages are real SvelteKit routes; the 5 saas-* mounts stay lab-only | already-done | - |
| index.css | stylesheet root | ported | split into app.css + kit.css per kit rules | already-done | - |
| lib/highlight-shell.tsx | shell highlighter | ported | framework-free twin highlight-shell.svelte.ts | already-done | - |
| lib/next-image.tsx | next/image stand-in for registry demos | not ported | nothing Svelte needs it; existed for lab-only demos | reference-only | - |
| lib/utils.ts | cn re-export | ported | same cn, plus kit helpers | already-done | - |
| main.tsx | Vite entry | not applicable | SvelteKit owns the entry | already-done | - |
| tsconfig.app.json / tsconfig.json / tsconfig.node.json (3 rows) | TS configs | ported / not applicable | single tsconfig from SvelteKit | already-done | - |
| vite.config.ts | Vite config | ported | sveltekit + tailwind plugins; alias via svelte.config.js | already-done | - |
| src/.DS_Store | macOS folder metadata (not source) | - | nothing to port; the freeze forbids deleting it — leave it, or gitignore the pattern repo-wide | reference-only | - |

(The 11 asset-pack rows are collapsed to one line here; the mapping file carries them one by one, same verdict each.)

### templates — 16 rows, all reference-only

Verdict: the five SaaS templates stay in the frozen lab. kits.md:27 names the SaaS-only blocks as not ported; kits.md:537 keeps product-only demos in the lab; pieces.json has no template entries. Every brand piece they compose is ported, so a future port owes only the SaaS-only blocks, the pages, and three React-only libraries.

| item | what | svelte | gaps | verdict | work |
|---|---|---|---|---|---|
| templates/Templates.stories.tsx | 5 fullscreen template stories | not ported | none planned; reachable via the /lab ref | reference-only | - |
| templates/saas/blocks.tsx | AppWindow, LogoCloud, Person, QuoteCard, IntegrationGrid, Faq, InverseBand | not ported | SaaS-only blocks; every ingredient for a revival exists (mode-watcher answers InverseBand) | reference-only | - |
| templates/saas/shell.tsx | SaasShell + CenteredHero | not ported | pure composition; kit site-shell carries the same snippets | reference-only | - |
| templates/saas/sightline.tsx | template 1 landing | not ported | all kit deps ported except SaaS-only blocks | reference-only | - |
| templates/saas/sightline/dashboard.tsx | in-app dashboard demo | not ported | recharts has no Svelte kit equivalent | reference-only | - |
| templates/saas/hookline.tsx | template 2 landing | not ported | only SaaS-only Faq + stock slider missing | reference-only | - |
| templates/saas/hookline/delivery.tsx | DeliveryLog replay demo | not ported | timers map 1:1 to runes if ever ported | reference-only | - |
| templates/saas/groundwork.tsx | template 3 landing | not ported | AvatarGroup already in kit ui/ | reference-only | - |
| templates/saas/groundwork/board.tsx | kanban board demo | not ported | ui/progress missing from kit | reference-only | - |
| templates/saas/groundwork/explorer.tsx | ARIA tablist explorer | not ported | only SaaS-only Person missing | reference-only | - |
| templates/saas/parley.tsx | template 4 landing | not ported | only SaaS-only Person/Faq missing | reference-only | - |
| templates/saas/parley/channels.tsx | channels demo | not ported | ui/bubble in neither kit | reference-only | - |
| templates/saas/parley/chat.tsx | support chat demo | not ported | ui/bubble in neither kit | reference-only | - |
| templates/saas/openslot.tsx | template 5 landing | not ported | ui/tabs missing from kit | reference-only | - |
| templates/saas/openslot/booking.tsx | booking demo | not ported | react-day-picker calendar + ui/field missing | reference-only | - |
| templates/saas/openslot/timezones.tsx | timezone demo | not ported | every dependency already ported; still scoped out by kits.md:537 | reference-only | - |

### ui-base — 128 rows: 27 already-done, 2 keep-port, 97 reference-only, 2 decide

Verdict: stock throughout, one exception. button.tsx is the only stock file with brand changes; both are already applied in the kit. The kit vendors 25 of the 58 stock components (26 ui/ folders counting the kit-built combobox) and deliberately keeps no standalone stories for stock ui/ — states surface through piece and block stories. The other 33 stock components have no kit consumer today: 31 retire with the lab and come back via the CLI when a piece needs them; label and slider are the two this plan adds (step 2).

| item | what | svelte | gaps | verdict | work |
|---|---|---|---|---|---|
| ui/alert-dialog.tsx | stock, 12 parts | ported (ui/alert-dialog) | - | already-done | - |
| ui/alert-dialog.stories.tsx | stock stories | not ported | states covered by actions block stories | reference-only | - |
| ui/alert.tsx | stock | ported (ui/alert) | - | already-done | - |
| ui/alert.stories.tsx | stock stories | not ported | states show via Notice piece stories | reference-only | - |
| ui/avatar.tsx | stock, 6 parts | ported (ui/avatar) | - | already-done | - |
| ui/avatar.stories.tsx | stock stories | not ported | fallback renders in user-menu stories | reference-only | - |
| ui/breadcrumb.tsx | stock, 7 parts | ported (ui/breadcrumb) | - | already-done | - |
| ui/breadcrumb.stories.tsx | stock stories | not ported | renders in app-shell/page-header stories | reference-only | - |
| ui/button.tsx | stock + the 2 brand changes | ported (ui/button) | both changes applied: data-variant at button.svelte:62,76; no translate-y-px | already-done | - |
| ui/button.stories.tsx | stock stories | not ported | states across piece/block stories | reference-only | - |
| ui/card.tsx | stock, 6 parts | ported (ui/card) | - | already-done | - |
| ui/card.stories.tsx | stock stories | not ported | renders through element-card, feature-cards | reference-only | - |
| ui/checkbox.tsx | stock | ported (ui/checkbox) | - | already-done | - |
| ui/checkbox.stories.tsx | stock stories | not ported | states in table stories | reference-only | - |
| ui/command.tsx | stock, all lab parts | ported (ui/command) | adds kit extras link-item, loading | already-done | - |
| ui/command.stories.tsx | stock stories | not ported | closest kit twin: ui/combobox stories | reference-only | - |
| ui/dialog.tsx | stock, 10 parts | ported (ui/dialog) | no direct consumer yet (base of command-dialog) | already-done | - |
| ui/dialog.stories.tsx | stock stories | not ported | ships as CommandDialog base | reference-only | - |
| ui/dropdown-menu.tsx | stock, 18 parts | ported (ui/dropdown-menu) | - | already-done | - |
| ui/dropdown-menu.stories.tsx | stock stories | not ported | covered by account/collection/table stories | reference-only | - |
| ui/input-group.tsx | stock, 6 parts | ported (ui/input-group) | - | already-done | - |
| ui/input-group.stories.tsx | stock stories | not ported | one composition in search-box stories | reference-only | - |
| ui/input-otp.tsx | stock | ported (ui/input-otp) | - | already-done | - |
| ui/input-otp.stories.tsx | stock stories | not ported | renders in verify-email stories | reference-only | - |
| ui/input.tsx | stock | ported (ui/input) | - | already-done | - |
| ui/input.stories.tsx | stock stories | not ported | states in auth form stories | reference-only | - |
| ui/popover.tsx | stock | ported (ui/popover) | - | already-done | - |
| ui/popover.stories.tsx | stock stories | not ported | combobox story is the consumer | reference-only | - |
| ui/radio-group.tsx | stock | ported (ui/radio-group) | no block consumer yet | already-done | - |
| ui/radio-group.stories.tsx | stock stories | not ported | no kit story | reference-only | - |
| ui/select.tsx | stock, all parts | ported (ui/select) | no block consumer yet | already-done | - |
| ui/select.stories.tsx | stock stories | not ported | no kit story | reference-only | - |
| ui/separator.tsx | stock | ported (ui/separator) | - | already-done | - |
| ui/separator.stories.tsx | stock stories | not ported | only inside sidebar/select parts | reference-only | - |
| ui/sheet.tsx | stock, 10 parts | ported (ui/sheet) | - | already-done | - |
| ui/sheet.stories.tsx | stock stories | not ported | side-sheets in app-shell, actions stories | reference-only | - |
| ui/sidebar.tsx | stock, 26 parts | ported (ui/sidebar) | - | already-done | - |
| ui/sidebar.stories.tsx | stock stories | not ported | provider/menu in app-shell stories | reference-only | - |
| ui/skeleton.tsx | stock | ported (ui/skeleton) | kit adds motion-reduce | already-done | - |
| ui/skeleton.stories.tsx | stock stories | not ported | states across blocks/app/states | reference-only | - |
| ui/sonner.tsx | stock | ported (ui/sonner) | svelte-sonner + mode-watcher stand-ins | already-done | - |
| ui/sonner.stories.tsx | stock stories | not ported | Toaster mounted in svelte-app layout | reference-only | - |
| ui/switch.tsx | stock | ported (ui/switch) | - | already-done | - |
| ui/switch.stories.tsx | stock stories | not ported | toggle states in settings stories | reference-only | - |
| ui/table.tsx | stock, 7 parts | ported (ui/table) | - | already-done | - |
| ui/table.stories.tsx | stock stories | not ported | renders in app table stories | reference-only | - |
| ui/textarea.tsx | stock | ported (ui/textarea) | - | already-done | - |
| ui/textarea.stories.tsx | stock stories | not ported | ships inside ui/input-group | reference-only | - |
| ui/tooltip.tsx | stock | ported (ui/tooltip) | - | already-done | - |
| ui/tooltip.stories.tsx | stock stories | not ported | shows in copy-button story | reference-only | - |
| hooks/use-mobile.ts | stock hook | ported (is-mobile.svelte.ts) | - | already-done | - |
| hooks/use-scroll-spy.ts | lab hook over core spy | ported | kit calls core scrollSpy directly in $effect | already-done | - |
| ui/typeset.css | lab-added typeset stylesheet presets | missing | pure CSS, ports as-is; nothing in the kit uses it (Prose covers rendered docs) | decide | C2 (D12) |
| ui/typeset.stories.tsx | lab typeset stories | missing | only meaningful with typeset.css | decide | C2 (D12) |
| ui/accordion.tsx + .stories.tsx (2 rows) | stock | not vendored | kit uses native details (faq-list) | reference-only | - |
| ui/aspect-ratio.tsx + .stories.tsx (2) | stock | not vendored | no kit consumer; needed next-image in the lab | reference-only | - |
| ui/attachment.tsx + .stories.tsx (2) | stock, chat family | not vendored | no chat surface in the kit | reference-only | - |
| ui/badge.tsx + .stories.tsx (2) | stock | not vendored | Tag covers the role (D5 kbd/badge note) | reference-only | - |
| ui/bubble.tsx + .stories.tsx (2) | stock, chat family | not vendored | needed only by frozen SaaS demos | reference-only | - |
| ui/button-group.tsx + .stories.tsx (2) | stock | not vendored | toolbars build on Button directly | reference-only | - |
| ui/calendar.tsx + .stories.tsx (2) | stock (react-day-picker) | not vendored | no date picker in the kit | reference-only | - |
| ui/carousel.tsx + .stories.tsx (2) | stock | not vendored | no kit consumer | reference-only | - |
| ui/chart.tsx + .stories.tsx (2) | stock (recharts) | not vendored | React-only library | reference-only | - |
| ui/collapsible.tsx + .stories.tsx (2) | stock | not vendored | sidebar handles its own collapse | reference-only | - |
| ui/context-menu.tsx + .stories.tsx (2) | stock | not vendored | no kit consumer | reference-only | - |
| ui/date-picker.stories.tsx (1) | lab composition story | not ported | recipe stays readable in the lab | reference-only | - |
| ui/drawer.tsx + .stories.tsx (2) | stock (vaul) | not vendored | bottom sheets are Sheet sides | reference-only | - |
| ui/empty.tsx + .stories.tsx (2) | stock | not vendored | EmptyState block covers it | reference-only | - |
| ui/field.tsx + .stories.tsx (2) | stock | not vendored | AuthField/SettingRow use a plain label | reference-only | - |
| ui/form-react-hook.stories.tsx (1) | lab composition story | not ported | kit forms are SvelteKit actions + FormResult | reference-only | - |
| ui/form-tanstack.stories.tsx (1) | lab composition story | not ported | same | reference-only | - |
| ui/hover-card.tsx + .stories.tsx (2) | stock | not vendored | no kit consumer | reference-only | - |
| ui/item.tsx + .stories.tsx (2) | stock | not vendored | kit lists use table parts | reference-only | - |
| ui/kbd.tsx + .stories.tsx (2) | stock | not vendored | kit renders key hints itself; matters only if MenuDemo ports (D5) | reference-only | - |
| ui/label.tsx + .stories.tsx (2) | stock | not vendored | forms use a plain label today; the component is work — vendored stock in step 2 (lab copy unmodified); the stories retire with the lab | keep-port | step 2 |
| ui/marker.tsx + .stories.tsx (2) | stock (timeline) | not vendored | unrelated to the brand Marker piece | reference-only | - |
| ui/menubar.tsx + .stories.tsx (2) | stock | not vendored | nav is the app shell | reference-only | - |
| ui/message.tsx, message-scroller.tsx, questionnaire.tsx + stories (6) | stock, chat family | not vendored | no chat surface (D13) | reference-only | - |
| ui/navigation-menu.tsx + .stories.tsx (2) | stock | not vendored | site nav is SiteShell links | reference-only | - |
| ui/pagination.tsx + .stories.tsx (2) | stock | not vendored | TablePagination block covers it | reference-only | - |
| ui/progress.tsx + .stories.tsx (2) | stock | not vendored | RingGauge covers metering | reference-only | - |
| ui/radius.stories.tsx, shadow.stories.tsx, spacing.stories.tsx, color.stories.tsx, typography.stories.tsx (5) | lab token reference pages | not ported | tokens' source of truth is core theme.css (D1) | reference-only | - |
| ui/resizable.tsx + .stories.tsx (2) | stock | not vendored | no kit consumer | reference-only | - |
| ui/scroll-area.tsx + .stories.tsx (2) | stock | not vendored | plain overflow utilities | reference-only | - |
| ui/slider.tsx + .stories.tsx (2) | stock | not vendored | needed by the tweaker port — vendored stock in step 2 (lab copy unmodified); the stories retire with the lab | keep-port | step 2 |
| ui/spinner.tsx + .stories.tsx (2) | stock | not vendored | skeleton + inline Loader2 cover loading | reference-only | - |
| ui/tabs.tsx + .stories.tsx (2) | stock | not vendored | page header tabs are links | reference-only | - |
| ui/toggle.tsx, toggle-group.tsx + stories (4) | stock | not vendored | Segmented covers selection | reference-only | - |

(Collapsed rows are grouped component+stories pairs with identical verdicts; the mapping file carries every one of the 128 singly.)

## Open questions

From the mappings, each with its trade-off. Answers D5 and D12 gate steps; the rest shape scope.

**D1 — A live tokens/color view in the Svelte Storybook?** (brand-docs + ui-base token pages) Today nothing in the kit renders the palette visually; BRAND.md's check-enforced tables plus the frozen lab's Colors page carry the numbers. Port: cheap — every computation is already in @hmziq/brand-core/color — but adds a docs-ish surface to a kit that today has none, and five more token pages (radius, shadow, spacing, typography) would follow. Not port: the numbers stay check-enforced but never seen in Svelte.

**D2 — Registry status for src/lib/tweakers/?** (tweakers) Roster the tweakers in scripts/pieces.json: they ship in the generated registry and stay parity-checked, but registry consumers get dev tooling. Exclude: cleaner registry, but scripts/check-parity.mjs:136-137 fails on any Svelte story outside the roster, so the check itself needs an exception. Catch-all item: one roster entry covering the folder — least churn, weakest check.

**D3 — Wordmark Tweaker story: replace or beside?** (tweakers) Replace the static preset wall with the live tweaker: matches the lab exactly, loses the at-a-glance 10-preset view. Beside: keeps both, sidebar grows by one story.

**D4 — Tweaker stories in the public Pages deploy?** (tweakers) The kit's Storybook deploys at '/' and is also the owner's tuning tool. Keeping tweakers public shows visitors the brand's motion knobs; localStorage settings are visitor-local either way. Hiding them means a second, private build or parameters gating.

**D5 — MenuDemo, InstanceGraph, ProvidersTable (claude-multi demos)?** (sites; the one decide row) Port as kit content blocks: the demos survive React's retirement and any site can use them, but it forces a kbd/badge stock answer and stories for keyboard nav, reduced motion and timed reveals. Rebuild in claude-multi's own repo when it migrates: the kit stays lean, but the demos are React-only until that migration happens.

**D6 — Kit-side fullscreen stories for the eight real landings?** (sites) Port: eyeballing without the lab. Not port: the frozen lab plus the boilerplate's single example landing carry it; real content belongs to each site's repo anyway.

**D7 — Permanent home of the MDX docs pages?** (support) The /lab composed ref forever: zero work, docs stay readable but React-served. Move into the kit's Storybook: docs go Svelte-native, but the kit gains addon-docs/MDX it deliberately dropped and the docs must be rewritten to the Svelte structure.

**D8 — None of the ~40 unported stock ui demos wanted as Svelte stories?** (support) The kit's only ui story today is the kit-built combobox. Confirm and the stock demos retire with the lab; any wanted one is a CLI add plus a story.

**D9 — Kit Storybook favicon: the hmziq mark now?** (support; gates step 1) The kit's Storybook is the Pages root deploy and currently shows sv-create's Svelte logo in the tab. Copy the mark: one file, matches the lab and the brand. Keep the logo: the kit's own identity stays until it has one.

**D10 — The five SaaS templates: port or frozen-lab home?** (templates) All-or-nothing port: pages are ~250-330 lines each, plus the SaaS-only blocks, a recharts replacement for dashboard, and calendar/field/bubble/tabs/progress vendoring. Stay: kits.md:537's recorded decision holds, zero work, but the templates die with the lab if it is ever deleted.

**D11 — Promote the Faq block?** (templates) The one SaaS-only block a real site could want. Promote: a kit Faq block against kits.md:27. Keep: sites compose Question/Questions directly, as they already do.

**D12 — typeset.css + stories: vendor into the kit?** (ui-base; the two decide rows) Keep: Svelte docs/chat response text gains the lab's rhythm presets — pure CSS port. Leave: Prose + core's markdown pipeline already cover rendered docs; the presets stay readable in the lab.

**D13 — Chat family (attachment, bubble, message, message-scroller, questionnaire): vendor now?** (ui-base) Vendor a Svelte chat set now: ready when a product needs it, five stock adds with no consumer. On demand: nothing unused ships; a future product waits on a CLI add.

**D14 — Delete the untracked leftover packages/brand-svelte/src/lib/um.json?** (ui-base; visible in git status) Raw registry JSON of use-mobile, looks like a leftover from the 2026-10-01 stock comparison. Delete: repo hygiene. Keep: none apparent.

## The owner's two questions, answered

### (a) Where do brand docs, custom components, sites, templates each land?

- **Brand docs** — already landed, in two places: the words live in BRAND.md (sections 1-13), which the kit's Storybook serves at /BRAND.md (staticDirs, main.ts:29) and which pnpm check:brand-kit and check:contrast keep true to theme.css on every check. The rendered-inside-Storybook form (8 MDX pages + 3 React demo libs, 11 items) stays in the frozen lab at /lab/ as reference. Nothing more moves unless D1 wants a live tokens view.
- **Custom components** — every brand piece is already ported and parity-checked (136 pieces, 313 Svelte stories, verified this session). The only missing custom work is the interactive layer: the four tweaker pages, their shared parts, saved.ts and their stories — steps 2-5 of this plan, 8 rows. After step 5, custom is fully Svelte.
- **Sites** — the reusable layer (shared/site.tsx, shared/content.tsx, blog shared + share-icons, gpui-query blocks) is ported 1:1 into blocks/site and blocks/content; the nine page patterns exist as boilerplate routes shot by pnpm compare --pages. The real words, data and covers of the eight landings are per-site repo work by design. One hole: claude-multi's MenuDemo/InstanceGraph/ProvidersTable (D5).
- **Templates** — the five SaaS pages and their shared blocks stay in the frozen lab (16/16 reference-only, kits.md:27 + :537). They move only if D10 says port.

### (b) The "Base and the UI" verdict

Three layers, one sentence each:

1. **Stock shadcn**: the lab's whole ui/ directory is stock base-vega as installed — 58 components, byte-verified against the registry (2026-10-04 diff in .zflow/migration/ui-base-inventory.json). The kit does not copy React files; it vendors the shadcn-svelte (Bits UI) vega equivalents, and only as pieces need them: 25 of 58 so far, with kit rules applied (lucide class on icons, motion-reduce on animations). The 26th ui/ folder, combobox, is kit-built on top of command + popover, not stock.
2. **Lab changes to stock**: exactly two, both in button.tsx — the press translate removed and data-variant added. Both are already applied in the kit's ui/button/button.svelte (data-variant at lines 62 and 76, no translate-y-px). Nothing of the lab's stock changes is un-ported.
3. **The kit's ui/ and what still must move**: the kit's stock set is complete for everything ported. The only additions this plan needs are ui/label and ui/slider (stock, lab copies unmodified) for the tweaker parts — step 2. Everything else is decide-gated: kbd/badge only if MenuDemo ports (D5); bubble/calendar/field/chart/progress/tabs only if the SaaS templates port (D10) or the chat family vendors (D13).

So: Base and UI need no migration beyond two stock CLI adds. The lab's ui/ retires as-is, reference-only.

## Steps

Additive only: each step adds Svelte files under packages/brand-svelte (plus, in step 2, two stock vendored folders). No step edits or deletes anything under apps/lab. Hand verification always runs against the frozen lab — the Lab (React) group in the kit's sidebar at localhost:6007 (the /lab/ ref), pnpm compare, and side-by-side light/dark at 360px and 1280px.

### Step 0 — Baseline and freeze check (no code changes)

- **Scope**: nothing ported; the lab untouched.
- **Work**: the /lab staticDir needs apps/lab/storybook-static to exist — it already does (verified this session), so normally skip any build; run pnpm --filter lab build-storybook only if it is absent, a freeze-exempt write (see the freeze policy). Start the servers — pnpm storybook (kit, 6007), pnpm storybook:lab (lab, 6006), the astro gallery (4321) and both boilerplates if running compare; run pnpm check and a full pnpm compare to lay the baseline report.
- **Done-when**: the Lab (React) group opens in the kit's sidebar and its stories load; pnpm check passes; compare/index.html carries every roster piece's row.
- **Hand verification**: at localhost:6007 open the Lab (React) group and click a story from each of Brand, Custom, Sites, Templates, design, ui — this is the reference everything below is compared against.

### Step 1 — Favicon (gated on D9)

- **Scope**: support row public/favicon.svg.
- **Work**: copy apps/lab/public/favicon.svg over packages/brand-svelte/static/favicon.svg; rebuild the kit Storybook.
- **Done-when**: packages/brand-svelte/storybook-static/favicon.svg is byte-equal to apps/lab/public/favicon.svg (cmp).
- **Hand verification**: reload localhost:6007 — the tab icon is the hmziq mark, same as the /lab tab.

### Step 2 — Tweaker foundations

- **Scope**: tweakers rows brand/saved.ts and brand/tweaker-parts.tsx (its stock needs only); stock ui/label and ui/slider.
- **Work**: copy saved.ts verbatim to packages/brand-svelte/src/lib/tweakers/saved.ts — same three localStorage keys, so settings saved in the lab's tweakers carry over; add ui/label and ui/slider via the shadcn-svelte CLI (stock — the lab copies are unmodified); re-verify ui/button still carries both brand changes (the kit README warns the CLI can revert them); run pnpm check:kit and pnpm check:motion.
- **Done-when**: svelte-check clean; ui/button unchanged (data-variant present, no translate-y-px); pnpm check passes with no new stories added.
- **Hand verification**: at 6007 confirm existing stories still render, especially the ui-dependent ones (table, settings, auth).

### Step 3 — Tweaker parts + lattice tweaker

- **Scope**: tweakers rows brand/tweaker-parts.tsx, brand/lattice-tweaker.tsx, brand/lattice.stories.tsx.
- **Work**: port tweaker-parts to src/lib/tweakers/tweaker-parts.svelte (Svelte 5 runes; React useId becomes ids or aria-labelledby pairs; the canvas toHex probe stays browser-guarded; download via URL.createObjectURL/Blob; paste-load status messages; the kit CodeBlock already supports the files tabs ExportBox uses). Port lattice-tweaker.svelte keeping the 13 ranges verbatim (they clamp pasted settings too), the Turns/Still lastTurn behavior, the five presets, the counts line, the 'hmziq-lattice-tweaks' key, and the {lattice: s} export shape. Add src/lib/tweakers/lattice.stories.svelte with layout fullscreen.
- **Done-when**: the story id custom-lattice--tweaker resolves in the kit; every control behaves as the lab's; a pasted JSON clamps to the same ranges; saved settings from the lab's tweaker load (shared key).
- **Hand verification**: kit's Custom/Lattice--Tweaker at 6007 beside the lab's custom-lattice--tweaker via the /lab ref — same controls, both views, export and paste-load, in dark and light at 360px and 1280px.

### Step 4 — Ring tweaker + ring motion stories

- **Scope**: tweakers rows brand/ring-tweaker.tsx, brand/ring-motion.stories.tsx.
- **Work**: port ring-tweaker.svelte — per-layer ranges (turn/breathe/orbit/ripple/dial/grayTurn), reverse/inward toggles, the merge-only fromPasted semantics (ring-tweaker.tsx:76-104), preset buttons, the 'hmziq-ring-tweaks' key, the {rings: {motion}} export. Port ring-motion.stories.svelte with both stories: Tweaker (fullscreen) and SideBySide — the eight-preset gallery with per-preset pause, seed switcher and pause-all, the kit's first coverage of Rings motion.
- **Done-when**: both story ids resolve; SideBySide shows all eight ringPresets live; a pasted partial motion updates only the pasted layers; every pause button stops its preset.
- **Hand verification**: kit's Custom/Ring-motion stories beside the lab's twins via /lab — all eight presets animate the same, pause works, dark and light at 360px and 1280px.

### Step 5 — Logo tweaker + wordmark Tweaker story (gated on D3)

- **Scope**: tweakers rows brand/logo-tweaker.tsx and components/brand/wordmark.stories.tsx (Tweaker story).
- **Work**: port logo-tweaker.svelte — 21 numeric ranges, choices and noneable color validation including CSS.supports('color', value), five preview views, three backdrops, the 'hmziq-logo-tweaks' key, the {logo: look} export; 'Play again' becomes a {#key round} remount; pause uses the ported paused props. Make the kit wordmark Tweaker story render it fullscreen; per D3 either replace the static preset wall or keep it as its own story.
- **Done-when**: the kit's Tweaker story is the live tuning page, control-for-control with the lab's, including paste-load rejection messages; the roster entry custom-logo--default still resolves (pnpm check:parity).
- **Hand verification**: kit's Custom/Logo--Tweaker beside the lab's via /lab — tune a letter color, paste an invalid color and see the same rejection, play again restarts, dark and light at 360px and 1280px.

### Step 6 — Sweep

- **Scope**: everything added in steps 1-5.
- **Work**: apply the D2 answer (roster the tweakers, add a check exception, or a catch-all entry — check:parity will otherwise fail on the new stories); run pnpm check; run pnpm compare all with the servers up.
- **Done-when**: pnpm check green; the compare report shows no regression on existing pieces (rows unchanged from step 0's baseline).
- **Hand verification**: one full side-by-side pass, light and dark at 360px and 1280px, of each new tweaker story against its /lab twin.

### Step C1 — claude-multi demos (only if D5 = port)

- **Scope**: sites row claude-multi/blocks.tsx — MenuDemo, InstanceGraph and Checks, plus the InstallBlock composition (ProvidersTable alone is assembly of existing pieces).
- **Work**: port MenuDemo and InstanceGraph as kit content blocks in packages/brand-svelte/src/lib/blocks/content/ with stories covering keyboard nav, reduced motion and the timed reveal; port Checks (the horizontal text-success variant, not the shared CheckList) and compose InstallBlock from Segmented + command-bar + it; settle the kbd (and badge, if wanted) stock adds.
- **Done-when**: the claude-multi landing can be assembled in Svelte with its hero demo intact.
- **Hand verification**: the new stories beside the lab's claude-multi landing (Sites/Landing pages via /lab), keyboard through the menu demo, dark and light at 360px and 1280px.

### Step C2 — typeset (only if D12 = keep)

- **Scope**: ui-base rows ui/typeset.css and ui/typeset.stories.tsx.
- **Work**: copy typeset.css into src/lib/styles/; port the stories as *.stories.svelte.
- **Done-when**: the docs and chat presets render in the kit Storybook.
- **Hand verification**: beside the lab's typeset stories via /lab, including the responsive-table and append-safety cases, dark and light at 360px and 1280px.

### Step R — React retirement (final; defined here, NOT executed — needs its own approval)

- **Scope**: apps/lab/** plus every repo hook that builds, serves or checks it.
- **Work**, one approved cut:
  1. Pick the lab's afterlife: (a) keep the frozen build — archive the final apps/lab/storybook-static so /lab/ keeps serving the reference with no React toolchain, or (b) delete the reference and rely on BRAND.md plus the kit.
  2. Remove apps/lab, its workspace entry and the React devDependencies.
  3. Root package.json: dev (line 9) points at the kit; build (11) and build-storybook (12) drop their lab halves; preview (25) and storybook:lab (27) go.
  4. scripts/check-parity.mjs: drop labStoryIds() (lines 54-67) and the piece.lab check (119-121); the roster's lab fields go; the reference flips to Svelte.
  5. scripts/compare.mjs: drop or retarget the lab view (LAB at line 28, the view at 64, viewLabels at 38, the filename regex at 157) — see the appendix.
  6. Kit main.ts: refs.lab (15-20) and the conditional staticDir (34-36) survive only under option (a), pointed at the archive.
  7. Docs and workflows: the kits.md /lab passages, the kit README's refs line, and the Pages workflow that copies the lab build.
- **Done-when**: pnpm check green with the lab gone; the /lab ref still opens (option a) or is fully removed (option b).
- **Hand verification**: full pnpm compare after the cut; every roster piece's row reads as matching from the Svelte side.

## Appendix — what pnpm compare and check:parity change once Svelte is the reference

Today the lab is the reference and the scripts say so: scripts/check-parity.mjs:6-8 — "The lab is the reference: when a piece has a lab story, the Svelte kit has to show it too" — enforced by labStoryIds() (lines 54-67, reading apps/lab/src/**/*.stories.tsx) and the piece.lab check (119-121). After retirement:

- **check:parity**: delete labStoryIds() and the piece.lab check; drop the lab field from scripts/pieces.json entries. The mandatory direction becomes what already exists for the app blocks: the Svelte file and the Svelte story must exist, and the reverse guard — every Svelte story belongs to a roster piece (lines 136-137) — stays as the only story-level rule. The header comment flips: the Svelte story is the reference; Astro stays checked as a consumer.
- **compare**: it already handles Svelte-as-reference — "When a piece has no lab story (the app blocks), the Svelte story is the reference" (scripts/compare.mjs:7-8). Changes at retirement: the lab column goes, or — under retirement option (a) — LAB_URL retargets to the archived build (http://localhost:6007/lab, so the lab view's iframe URL becomes .../lab/iframe.html?id=...). Whether the archived build resolves iframe URLs under the /lab subpath was not verified this session; verify before committing to the retarget, and drop the column if it does not. The on-disk report keeps relaying old lab shots (compare.mjs builds rows from every file in compare/), so historical lab columns stay readable as the frozen record either way. pnpm compare --pages is unaffected — it shoots only the two boilerplates.
- **Root scripts**: dev, build, build-storybook, preview and storybook:lab lose their lab halves (package.json lines 9, 11, 12, 25, 27). pnpm check's parity link stays, now checking Svelte-first.
- **New pieces after retirement** never have a lab twin: they enter pieces.json with svelte/astro fields only, and compare shoots them as svelte + astro + boilerplate — the app-blocks precedent, now the rule.
