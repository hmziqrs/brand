# Content blocks plan

**Part of the [master plan](./README.md). Work item 5.** Starts after [kits.md](./kits.md) steps 1 and 2 (both kits exist).

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
| Blog | ShareBar | Link bar (default), logo tiles, ring buttons, or a sentence. X, LinkedIn, Hacker News, Reddit, Facebook, Telegram and copy link. Icons are in the text color; on hover, text color (default) or the networks' own colors |
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

### Step 3: The Astro blocks

1. Build every block above in `packages/brand-astro/src/blocks/content/`, following the kits' Astro rules.
2. Content collections in `astro-app` with the core plugins, with the built-in highlighter off.
3. The same example pages as `svelte-app`.
4. Add each block to the `/kit` gallery.

**Done when:**

- Every example page matches its `svelte-app` twin, and every block matches the lab, in `pnpm compare`.
- Content pages ship no JS except for interactive pieces (floating contents, copy link, docs search, typing terminal, collapsible releases).
- axe shows zero violations.

### Step 4: Registries and BRAND.md

1. Add every content block to both registries, and the Markdown plugins to core's next release.
2. BRAND.md section 8, "Page patterns": list the content blocks and the Markdown mapping.
3. `check:parity` passes with no content block marked "not yet".

**Done when:** a fresh project from `pnpm new-project` can add any content block from its registry, and its Markdown renders like the example post.

## Not in this plan

- The Providers page and claude-multi's product demos
- A comment system, search service, newsletter service or CMS
- Moving each site's real content into the kit (each site's own repo)
