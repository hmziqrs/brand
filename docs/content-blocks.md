# Content blocks plan

**Part of the [master plan](./README.md). Work item 5.**

**Done 2026-10-09. Historical plan: the React lab (`apps/lab`) it ports from was deleted after the port finished. The kits and `boilerplates/` are the living reference.** Starts after [kits.md](./kits.md) steps 1 and 2 (both kits exist).

The lab already has finished designs for every kind of content page: blog post, blog index, docs, changelog, FAQ, legal, about, contact, 404, and the interactive landing pieces. They were built as one-off pages. This plan turns them into reusable blocks in both kits, plus a shared Markdown setup that feeds them. Most of the sites are content sites (the blog, gpui-query's docs, claude-multi's blog, changelog, FAQ and legal pages), so this comes right after the foundation.

## Sources in the lab

| Page | Lab file (`apps/lab/src/sites/…`) | Lab story (Sites/Pages) |
| --- | --- | --- |
| Blog post | `blog/post.tsx`, `blog/shared.tsx`, `blog/share-icons.ts` | Blog post · blog.hmziq.rs |
| Blog index | `claude-multi/blog.tsx` | Blog index · claude-multi |
| Docs | `gpui-query/docs.tsx` | Docs · gpui-query |
| Changelog | `claude-multi/changelog.tsx` | Changelog · claude-multi |
| FAQ | `claude-multi/faq.tsx` | FAQ · claude-multi |
| Privacy, Terms | `claude-multi/legal.tsx` | Privacy · claude-multi, Terms · claude-multi |
| About | `claude-multi/about.tsx` | About · claude-multi |
| Contact | `oxlabs/contact.tsx` | Contact · oxlabs.dev |
| 404 | `claude-multi/not-found.tsx` | 404 · claude-multi |
| Interactive landing pieces | `hmziq/components.tsx`, `gpui-query/blocks.tsx` | Components · hmziq.rs |

Product-only parts stay in the lab: claude-multi's MenuDemo, InstanceGraph, ProvidersTable and Checks, and its Providers page.

## Blocks

Names are generic, not site names. Props follow the lab's page code, turned into data and slots under the kits' porting rules. Where the lab offered variants, the lab's current default stays the default.

| Group | Block | What it is |
| --- | --- | --- |
| Blog | BlogLayout | The blog's shell (the lab's `BlogShell`): header, centered column, footer |
| Blog | PostHeader | Title, date, reading time. A cover image, which inverts in light mode when it's line art (`invert dark:invert-0`); a big title when there's no image |
| Blog | PostContents | On-this-page links: inline after the cover (default), a floating pill with scroll spy, or a left or right column |
| Blog | PullQuote | Margin note (default); also left margin, hanging ring, signed, and a TL;DR-style box. Hidden from screen readers when it repeats a line from the text |
| Blog | ShareBar | Link bar (default), logo tiles, ring buttons, or a sentence. X, LinkedIn, Hacker News, Reddit, Facebook, Telegram and copy link. Icons are in the text color; on hover, text color (default) or the theme tone nearest each network — the brand's colors come only from core's theme.css, so X keeps the text color |
| Blog | NewsletterBand | The orange band with an email field. Its form posts to the page's own action; no mailing service is built in |
| Blog | PostList, PostCard, PostMeta | A featured card plus cards (default), a list, or an archive, with TopicChips and SearchBox for filtering |
| Docs | DocsLayout | Line menu on the left, content, TOC on the right (`Toc`); a menu button on mobile |
| Docs | DocsSearch | Filters the menu's pages |
| Docs | DocsTitle | The page title with its rings art |
| Docs | DocsPager | Previous and next pages as cards |
| Changelog | ReleaseTimeline | The timeline, with dots lined up with the version headings |
| Changelog | ReleaseHead, KindTag | Version, date and release kind |
| Changelog | ReleaseNotes | Grouped, tagged, columns, tabs, or a summary with show/hide |
| Changelog | PastReleases | Older releases, collapsed |
| FAQ | FaqList | Numbered questions (01, 02… in orange) with the topic as a grey tag, built on `Question` |
| Legal | LegalLayout, LegalSection | A side or top TOC, numbered sections, and a "short version" box (`SummaryBox`) |
| Contact | ContactChannels | The channel list. Email opens the mail app, and the address never appears in the page text |
| 404 | NotFound | The lab's 404 design |
| Landing | InstallSteps | Numbered steps with commands; a step's ring fills when its command is copied |
| Landing | TypingTerminal | `TerminalWindow` replaying typed lines, at a fixed height. Reduced motion shows the finished text |
| Landing | CodeEditor | The editor mock from gpui-query, with file tabs |

The About page needs no new block. It's built from PageIntro, BigNumbers, Section, StepNumber, CommandBar, Mark and CtaBand, and the boilerplates include it as an example page.

## Markdown

Content pages are written in Markdown or MDX: content collections in Astro, mdsvex in SvelteKit. Both use the same plugins, which live in core (`@hmziq/brand-core/markdown`). They're framework-free remark and rehype plugins that output the same markup and classes as the kit components.

| In Markdown | Renders as |
| --- | --- |
| Text, lists, links, images | `Prose` styles |
| `##` and `###` headings | Anchored headings; their list feeds `PostContents` and `Toc` |
| Fenced code | The `CodeBlock` look, highlighted at build time with core's Shiki theme. The fence's `title="…"` becomes the file label. |
| Tables | The `DataTable` lines style |
| `> [!NOTE]`, `> [!TIP]`, `> [!IMPORTANT]` | `Notice`, info tone |
| `> [!WARNING]` | `Notice`, warning tone |
| `> [!CAUTION]` | `Notice`, destructive tone |
| Pull quotes, steps, anything without Markdown syntax | The kit component, used from MDX or mdsvex |

- A post's cover image and whether it's line art (so it inverts) come from frontmatter.
- Astro's built-in highlighter is turned off in favor of the same Shiki rehype setup SvelteKit uses, so both produce identical code markup.

## Steps

### Step 1: Markdown plugins in core

1. Add `src/markdown/` to core: the callout, heading-anchor, code-meta and table plugins, and the Shiki setup using `code-theme.ts`.
2. Tests (Vitest) for each plugin, from a sample Markdown file that uses every row of the table above.

**Done when:** the sample file renders to the expected markup in the tests.

### Step 2: The Svelte blocks

1. Build every block above in `packages/brand-svelte/src/lib/blocks/content/`.
2. Stories for each block and variant. They use the lab page's own text, so `pnpm compare` lines them up 1:1.
3. mdsvex in `svelte-app` with the core plugins.
4. Example pages in `svelte-app`, with example content marked as example: blog index, a blog post written in Markdown that uses every mapped element, a docs page, changelog, FAQ, privacy, about, contact and 404.
5. Add each block to `scripts/pieces.json`.

**Done when:**

- `pnpm compare` shows every block matching its lab page, in light and dark, at 360px and 1280px.
- The Markdown sample post renders every mapped element correctly.
- Scroll spy, the floating contents pill, the share bar's copy link, docs search and the typing terminal work with the keyboard and with reduced motion.
- axe shows zero violations.

**Step 2 status (updated 2026-10-02).** The Svelte side is built, and the
step's checks — the compare match, and the axe pass — have run; see the
list at the end of this status. Done:

- Every block in the table is in `packages/brand-svelte/src/lib/blocks/content/`:
  the blog group (`BlogLayout`, `PostHeader`, `PostContents`, `PullQuote`,
  `ShareBar`, `NewsletterBand`, `PostList`, `PostCard`, `PostMeta`), docs
  (`DocsLayout`, `DocsSearch`, `DocsTitle`, `DocsPager`), changelog
  (`ReleaseTimeline`, `PastReleases`, `ReleaseHead`, `KindTag`,
  `ReleaseNotes`), `FaqList`, legal (`LegalLayout`, `LegalSection`,
  `LegalBlock`), `ContactChannels`, `NotFound`, and the landing pieces
  (`InstallSteps`, `TypingTerminal`, `CodeEditor`). The shared prop shapes
  live in `blocks/content/types.ts`, the share network data in
  `blocks/content/share-icons.ts` — the same files the Astro kit reads,
  kept in step with them.
- A story per block and variant, next to the block, using the lab pages'
  own words (`blocks/content/stories-data.ts` holds them), so `pnpm
  compare` lines the stories up with the lab's Sites/Pages stories. The
  placeholder cover the PostHeader story uses is in the kit's `static/`
  and served by Storybook.
- `Question` gained the lab's `open` prop, matching the Astro twin.
- mdsvex in `svelte-app` with core's plugins (vite.config.ts), GFM on and
  mdsvex's own highlighter off. Three mdsvex gaps had to be closed around
  core's plugins (`src/lib/markdown-meta.ts`):
  - mdsvex's bundled remark-rehype is an old one that drops a fence's
    meta string, so `title="…"` never reached core's code-meta plugin. A
    remark/rehype pair now carries it across.
  - With its highlighter off, mdsvex escapes `{`, `}`, `<` and `>` inside
    fenced code as entities, so Shiki tokenized `&#123;` instead of `{` —
    wrong colors, and the entity showed on the page. The source is decoded
    before core's plugins and re-escaped after them, and the code markup
    now comes out byte-identical to the Astro twin's (checked against the
    built pages).
  - vite.config runs in Node, and in this repo core is TypeScript source
    Node can't follow (`../code-theme` has no extension), so the plugins
    are imported from core's source through a relative path the config
    bundler compiles. In a project started by `pnpm new-project`, core is
    real JavaScript from npm and the imports become the package
    specifiers — noted in the config for whoever writes that script.
- The example pages: blog index, the every-element post (from
  `src/content/posts`), docs pages (from `src/content/docs`), changelog,
  FAQ, privacy, terms, about, contact and the interactive pieces page,
  all with the same example copy as `astro-app`, which `src/lib/example.ts`
  shares with it. Each page renders its own `SiteHead`; `+error.svelte`
  wears the `NotFound` block for 404 and for failed pages both. The blog
  index and FAQ filter in Svelte state, the way the lab's React pages do.
- All 27 content blocks are in `scripts/pieces.json`, with their lab
  story, their Svelte story id and their `/kit` anchor; the registry
  items stay "not yet" until step 4.
- The boilerplate's stylesheet was missing an `@source` for the kit, so
  none of the kit's `sm:`/`md:`/`lg:`/`xl:` utilities reached the build —
  the header nav and the docs columns never showed at desktop. The line
  is in `src/app.css` now, closing the same hole the astro-app's
  stylesheet closes for its kit.
- Gotcha for the next ports: a snippet's name shadows everything inside
  it, so a block that forwards a `children`/`title`/`body`/`question`
  prop through a snippet of the same name recurses at runtime (compile
  and svelte-check both stay quiet). The blocks rename the incoming prop
  (`children: content`, `body: bodyText`, `title: titleText`) where they
  have to.
- Verified on the built app: every example page hydrates clean; the docs
  search narrows the menu and takes ⌘K; the menu button folds the menu
  below md; the three scroll spies move `aria-current`; the share bar's
  copy link flips to Copied; copying an install step fills its ring and
  the package manager switch swaps the command; the release notes'
  show/hide works; the FAQ and blog filters narrow live and show their
  empty notes; the typing terminal replays, holds a fixed height, and
  stays finished under reduced motion; unknown URLs render the NotFound
  block with a 404 status. The every-element post's code blocks are
  byte-identical to the astro-app twin's.

The step's own checks ran on 2026-10-02, with every server up:

- `pnpm compare content`: 396 screenshots, no unreachable view, no page
  errors, and a read of the report rows finds every block matching its
  lab page in light and dark at 360px and 1280px. (Kicker, a site piece
  rostered in the content group, has no lab or Svelte story, so its row
  is Astro-only — the kits area's roster state, unchanged here.)
- `pnpm compare --pages` over the thirteen routes both boilerplates
  share (blog index, the every-element post, the three docs pages,
  changelog, FAQ, privacy, terms, about, contact, components and a 404):
  every twin matches, most pixel-tight on a normalized-height compare
  (privacy, terms, contact and the 404 at 0.0000; the docs pages and
  changelog at ≤0.003; FAQ, about and components within small wrapping
  deltas) — except the two blog twins, and that defect is the Astro
  kit's, not the Svelte side's (below).
- The lab's blog pages carry the footer's "More from hmziq" row and the
  copyright line, and `svelte-app`'s match them; `astro-app`'s `/blog`
  and `/blog/example-every-element` drop both. `BlogLayout.astro`'s
  conditional slot forwarding — `{Astro.slots.has("footer-row") && <slot
  name="footer-row" slot="footer-row" />}`, and the same for `legal` —
  makes `SiteLayout` receive empty slots even when no page passes any,
  so its defaults never render (Astro's conditional-slot pitfall;
  reproduced with a minimal `BlogLayout` page, gone when the forwards
  are stripped). Left to the Astro kit's plan; the Svelte twin is the
  one that matches the lab. (Fixed in step 3 on 2026-10-02 — the forwards
  are gone and the blog twins match.)
- `pnpm --filter @hmziq/brand-svelte check:a11y`: 313 stories checked,
  0 violations — the content stories included.

The content blocks stayed out of the kit's `src/lib/index.ts` barrel at
first — the pages import them through `$brand/blocks/content/…`, and the
barrel belonged to the kits area (the Astro side made the same call then).
Round 3 closed the gap the round-2 review caught: both barrels export the
full 27 now, under the same "Content-page blocks" section (the step 3
note below records the Astro half), and the app blocks match on both
sides too — the same 45 names under an "App blocks" section in each
barrel, with the folder's small sub-parts (`AuthField`, `ShellNav`,
`ShellToggle`) staying internal as the Astro barrel already kept them.

### Step 3: The Astro blocks

1. Build every block above in `packages/brand-astro/src/blocks/content/`, following the kits' Astro rules.
2. Content collections in `astro-app` with the core plugins, with the built-in highlighter off.
3. The same example pages as `svelte-app`.
4. Add each block to the `/kit` gallery.

**Done when:**

- Every example page matches its `svelte-app` twin, and every block matches the lab, in `pnpm compare`.
- Content pages ship no JS except for interactive pieces (the contents scroll spy — the floating pill and the docs and legal TOCs — copy link, docs search, the blog index and FAQ filter scripts, the typing terminal, collapsible releases) plus the boilerplate's own theme scripts and whatever Starwind's Button and Input carry where they render.
- axe shows zero violations.

**Step 3 status (updated 2026-10-02).** The Astro side is built, and the
checks that waited on step 2's Svelte blocks and the roster entries have
run. Done:

- Every block in the table is in `packages/brand-astro/src/blocks/content/`:
  the blog group (`BlogLayout`, `PostHeader`, `PostContents`, `PullQuote`,
  `ShareBar`, `NewsletterBand`, `PostList`, `PostCard`, `PostMeta`), docs
  (`DocsLayout`, `DocsSearch`, `DocsTitle`, `DocsPager`), changelog
  (`ReleaseTimeline`, `PastReleases`, `ReleaseHead`, `KindTag`,
  `ReleaseNotes`), `FaqList`, legal (`LegalLayout`, `LegalSection`, and
  `LegalBlock`, the lab's four block kinds), `ContactChannels`, `NotFound`,
  and the landing pieces (`InstallSteps`, `TypingTerminal`, `CodeEditor`).
  The shared prop shapes live in `blocks/content/types.ts`, the share
  network data in `blocks/content/share-icons.ts`.
- `boilerplates/astro-app` exists: the node adapter (on demand), the theme
  with a pre-paint toggle, the landing page, the 404, and the example pages
  (blog index, the every-element post, docs, changelog, FAQ, privacy, terms
  with the top contents, about, contact, and a components page for the
  interactive pieces), all with example copy marked as example.
- Content collections in `src/content.config.ts` (posts and docs) with
  core's four rehype plugins and the built-in highlighter off. Astro 7
  ships Sätteri as its Markdown processor, so the unified pipeline the
  plugins need comes from `@astrojs/markdown-remark` through
  `markdown.processor: unified({ rehypePlugins })`.
- The `/kit` gallery: `brand`, `site` and `content` pages, every piece in
  the roster plus every content block, each under a `piece-…` anchor
  `check:parity` reads.

Findings, kept here for the next steps:

- Blocks the page filters ship no script. `PostList` and `FaqList` render
  every item with `data-topic`/`data-search` and a hidden empty note; the
  page listens to the SearchBox (which ships none) and the TopicChips'
  `topic-change`, and shows, hides and filters. The blog index and the FAQ
  page carry those ~20-line scripts.
- Scroll spy runs from the block that owns the list: `PostContents`,
  `DocsLayout`'s right column and `LegalLayout`'s contents all call core's
  `scrollSpy` and move `aria-current`. `Toc`'s colors now follow that
  attribute instead of a class picked at render time, so the spy can move
  the orange ring without re-rendering the list.
- `Step` and `StepNumber` carry their done look on `data-done` the same
  way, so `InstallSteps` can fill a step's ring when its command is copied.
- `Question` gained the lab's `open` prop (gpui-query's first question
  ships open).
- The share networks' hover colors are the theme's nearest tones (X stays
  the text color), not the networks' own hexes: colors come only from
  core's theme.css (kits.md, porting rule 4).
- A component's own `data-slot` and one passed in both render (duplicate
  attributes; the first wins in the DOM), so blocks that wrap a piece mark
  a wrapper of their own instead — `InstallSteps` wraps the `Stepper`,
  `TypingTerminal` finds its window through `[data-slot='terminal']`.
- The boilerplate's `@source` for the kit is relative to
  `src/styles/app.css`, one level deeper than the kit README's example
  assumes: `../../../../packages/brand-astro/src`. Without it the kit's
  classes silently vanish from the build.

The checks that waited on step 2 and the roster ran on 2026-10-02, and the
fixes they forced are in:

- The content blocks are exported from the kit's `src/index.ts` barrel
  (the "Content-page blocks" section there), so a project importing
  `@hmziq/brand-astro` gets them; `pnpm --filter @hmziq/brand-astro
  typecheck` passes over the barrel. Since round 3 the Svelte barrel
  exports the same 27 from `src/lib/index.ts`, so neither kit ships its
  content blocks one way only; `pnpm --filter @hmziq/brand-svelte check`
  passes over it.
- The round-1 defect in `BlogLayout`'s conditional slot forwards (the
  step 2 status above describes it) is fixed: slots pass through as
  plain elements, never behind `Astro.slots.has(…)`, so `SiteLayout`'s
  defaults — the footer's "More from hmziq" row, the legal line — render
  again, and the `head` slot (the theme's pre-paint baseline) reaches
  the document head. The blog twins now match.
- The every-element post's margin note is marked `repeated` with a line
  that actually repeats: the note is the paragraph's own first sentence,
  so the aria-hidden no longer costs screen-reader users a line. (The
  `svelte-app` twin carried the old note copy until round 3; both twins
  now use the paragraph's first sentence.)
- The newsletter band has a receiver: a `subscribe` action
  (`src/actions/index.ts`, `accept: "form"`) that the band posts to on
  the blog index, the post page and the gallery. An email in the field
  comes back to `?subscribed` and the band says thanks through its own
  `title`/`body` props; an empty field comes back to the page as it was.
  Verified on the built server: POST → 303 → the thanks band, with
  JavaScript off. The `svelte-app` twin gained the same receiver in
  round 3 — `subscribe` actions in the blog routes' `+page.server.ts`
  files, posted to as `?/subscribe`, with the same `?subscribed` thanks
  state.
- The `svelte-app` docs pages render their own `SiteHead` (round 3; they
  were the only example pages without one — round 2 caught empty titles,
  descriptions and canonicals there), with the Astro twin's title,
  description and URL shapes.
- `pnpm compare content`: 396 screenshots, every content piece in its
  lab, Svelte and Astro views, no unreachable view, no page error.
- `pnpm compare --pages` over the thirteen shared routes: every twin
  matches — most pixel-tight on a normalized-height diff (blog,
  changelog, privacy, terms, contact, 404 and docs quick-start at
  ≤0.013 both widths and both themes; the docs introduction and
  installation at ≤0.006 at 1280; faq, about and components at ≤0.015
  at 1280 with small wrapping deltas at 360), except the every-element
  post twin (0.03–0.08), whose delta was the margin-note copy fix above
  — closed in round 3, when the Svelte twin took the same first
  sentence as the Astro twin.
- The Astro axe runner exists: `pnpm --filter @hmziq/brand-astro
  check:a11y` (`scripts/axe.mjs`) reads the `/kit` gallery's own index
  for its pages and runs axe over each. `/kit/content` passes with zero
  violations (the gallery's two PostContents variants carry distinct
  nav labels now — two "On this page" navs on one page was its one
  finding). The gallery's app and brand pages still carry their own
  violations; those belong to their areas' plans.

### Step 4: Registries and BRAND.md

1. Add every content block to both registries, and the Markdown plugins to core's next release.
2. BRAND.md section 8, "Page patterns": list the content blocks and the Markdown mapping.
3. `check:parity` passes with no content block marked "not yet".

**Done when:** a fresh project from `pnpm new-project` can add any content block from its registry, and its Markdown renders like the example post.

**Step 4 status (updated 2026-10-02).** Done, and `check:parity` passes
with no content block "not yet". The fresh-copy half of the done-when ran
for both sides on 2026-10-02: `pnpm check:fresh-copy svelte` PASS and
`pnpm check:fresh-copy astro` PASS. Either run builds the registries
locally, serves them from a temporary port, copies the boilerplate (the
every-element Markdown post with it), points `@hmziq/brand-core` at the
exact tarball publish would upload (0.0.0 is unreleased, so it is
`pnpm pack`ed locally), and installs the whole kit from the served
registry — the `kit` item depends on every item, the 27 content blocks
and `content-blocks-shared` among them — so every content block lands in
a fresh copy by its own item. The copy's `pnpm build` then compiles the
example post through the framework's Markdown pipeline with core's
plugins: mdsvex in `svelte-app`, content collections in `astro-app`
(content syncs and the build completes). Both fresh copies
still run before any release (`.changeset/README.md`). Done:

- All 27 content blocks are their own items in both registries. The
  roster's `svelteItem`/`astroItem` are set and `pnpm registry:generate`
  was re-run: 124 items in the Svelte registry, 108 in the Astro one.
- The shared `blocks/content/types.ts` and `share-icons.ts` are their own
  `content-blocks-shared` item in both registries, by the generator's
  folder-shared rule: a `.ts`/`.js` helper that sits beside a folder's
  pieces seeds an item before them, so the pieces that import it depend on
  the shared item instead of on whichever piece pulled it in first (an
  item cycle there would hang the CLIs' recursive dependency fetch).
  Every kit file still lands in exactly one item.
- Story-only copy no longer ships: the generator excludes
  `blocks/**/stories-data.ts` (nothing but `*.stories.svelte` files
  imports it), so the `content-blocks` catch-all is gone from both
  registries.
- The re-run also picked up the app pieces that already exist on the
  Svelte side (`app-shell`, `app-page`, `app-page-header`,
  `workspace-switcher`, `user-menu`, plus `account-app-blocks` and
  `shell-app-blocks` catch-alls for their unlisted helpers). The
  generator reads the source tree, so that is expected; their roster
  fields stay "not yet" until app-blocks.md's own registry step. The
  Astro run warns about the six pieces with no `.astro` twin yet —
  Combobox and those five — for the same reason.
- `pnpm registry:build` lays both registries out for the Pages deploy
  with the new items serving on their own: `r/svelte/faq-list.json`
  points at its neighbors (`./post-header.json`, …) and the Astro items
  inline their file contents at `src/components/brand/…` targets.
- `.changeset/content-blocks-registries.md` puts the Markdown plugins in
  core's next release and versions both kits for the new items.
- BRAND.md section 8 gained "Page patterns" — the content-block table,
  including the About page's no-new-block note — and "Markdown": the
  mapping table, the plugin import paths, the built-in-highlighter-off
  rule and the frontmatter rule for covers.

## Not in this plan

- The Providers page and claude-multi's product demos
- A comment system, search service, newsletter service or CMS
- Moving each site's real content into the kit (each site's own repo)
