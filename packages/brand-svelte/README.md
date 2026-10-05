# @hmziq/brand-svelte

The hmziq brand kit for SvelteKit: the brand pieces (BRAND.md section 9), the
site blocks and the content pieces, on [shadcn-svelte](https://shadcn-svelte.com).
Ported from the React lab in `apps/lab`, which stays the picture this kit has
to match. Never published to npm — only its registry is.

## Layout

```text
src/lib/
├── ui/                 shadcn-svelte stock, with the brand's changes (below)
├── components/         brand pieces + their .stories.svelte
├── blocks/site/        site blocks, content pieces and SiteHead
├── blocks/content/     content-page blocks (content-blocks.md, later)
├── blocks/app/         app blocks (app-blocks.md; `state.svelte.ts` now, blocks from phase 1)
├── styles/kit.css      the stylesheet the shadcn-svelte CLI edits; never theme.css
└── utils.ts            cn(), styleText() and the shared prop helpers
```

- Kit files import each other through the `$brand` alias (components.json
  aliases point at `$brand/…`). Inside this repo it resolves to
  `packages/brand-svelte/src/lib`; a project the kit is copied into points it
  at `src/lib/brand`.
- Colors come only from core's `theme.css`. `src/lib/styles/kit.css` loads the
  framework CSS (`tailwindcss`, `tw-animate-css`, `shadcn-svelte/tailwind.css`)
  and nothing else: the color variables `shadcn-svelte init` writes into it are
  deleted again after every init, and the app stylesheet loads the theme next
  to it — framework CSS **first**, then `@hmziq/brand-core/theme.css`, or
  Tailwind's `@theme inline` utilities don't pick the tokens up.
- Framework-free logic (tones, rings, the logo recipe, scroll spy, the code
  theme, the scenes) is imported from `@hmziq/brand-core`, never copied.
- Svelte 5 only: runes, snippets, callback props. `children` is a snippet,
  `render` props become snippets or an `href`, and style objects are turned
  into text with `styleText()` at the DOM edge.
- No `$app/*` imports. The page owns routing; the components stay previewable
  in Storybook. Blocks never read the URL or navigate by themselves.

## Storybook

`pnpm storybook` (port 6007). Stories are `*.stories.svelte` files next to each
component, written with [addon-svelte-csf](https://github.com/storybookjs/addon-svelte-csf)
(`defineMeta` + `<Story>`), one file per piece, with the same states as the
piece's React story. The manager theme, fonts and heads are the lab's, so the
two Storybooks look the same; the sidebar lists the lab as a ref.

Two things to know when writing stories:

- A story that composes markup itself needs `asChild` on `<Story>`. Without it,
  the children are passed to the meta component as its `children` snippet, and
  the piece wraps itself in itself.
- Nothing may sit between `<pre>` and `<code>` (see `code-block.svelte`):
  inside a pre, whitespace renders.

## The lab's changes to stock shadcn-svelte

Porting rule 6 in `docs/kits.md`: the lab's changes to stock shadcn/ui apply
here too. Comparing `apps/lab/src/components/ui` against a fresh
`shadcn add --base base --preset vega` of each one (checked 2026-10-01), the
lab changes exactly two things, and both are applied to the copies in `ui/`:

| Change | Why | Where |
| --- | --- | --- |
| `active:not-aria-[haspopup]:translate-y-px` removed | The brand rule: nothing moves on hover, press or focus (BRAND.md section 10) | `ui/button/button.svelte` |
| `data-variant={variant}` added next to `data-slot="button"` | `theme.css` keeps outline buttons unfilled through `[data-slot="button"][data-variant="outline"]` | `ui/button/button.svelte` |

Everything else in the lab's `button.tsx`, `card.tsx`, `alert.tsx`,
`table.tsx`, `tooltip.tsx` and `input-group.tsx` is stock base-vega, and so are
the shadcn-svelte copies here (the Vega preset ships the same variants,
including the soft `destructive` fill and the `xs` / `icon-xs` / `icon-sm` /
`icon-lg` sizes).

**The CLI overwrites.** `shadcn-svelte add` reinstalls a component's
dependencies too, so adding anything that needs `button` (sidebar, sheet,
command, …) reverts the two button changes above. Re-apply them, and run
`pnpm check:motion`, after every `add`.

Two more kit-side rules for stock components:

- Every Lucide icon the kit renders carries the `lucide` class
  (`<Copy class="lucide" />`), because `@lucide/svelte` only adds `lucide-icon`
  and `theme.css` sets the brand stroke width through `.lucide`. That includes
  the icons inside the stock components themselves (`checkbox`'s check,
  `select`'s chevrons, …): porting rule 5 says to add the class where the
  library doesn't.
- `ui/` is exempt from `pnpm check:colors` (it ships as shadcn-svelte wrote
  it) but not from `pnpm check:motion`: nothing moves, whoever wrote it.

### The app-blocks stock set (app-blocks.md, phase 0)

The app blocks pulled in more stock components — sidebar, breadcrumb,
dropdown-menu, avatar, sheet, alert-dialog, popover, command, checkbox,
radio-group, switch, select, input-otp, sonner, skeleton, separator — plus the
`Combobox` the docs leave to each project, built here from Popover and Command
in `ui/combobox/`. Changes applied to those copies beyond the two above:

| Change | Why | Where |
| --- | --- | --- |
| `lucide` class on every rendered icon | The brand stroke width (rule 5 above) | 19 stock files |
| `motion-reduce:animate-none` beside `animate-pulse` / `animate-spin` | Loading animations respect reduced motion (app-blocks.md, "Brand rules") | `ui/skeleton/skeleton.svelte`, `ui/sonner/sonner.svelte` |

`svelte-sonner` and `mode-watcher` (under the Toaster) are runtime
dependencies, and both Vite configs keep them in `ssr.noExternal` next to
`bits-ui`: they ship `.svelte` files.

## Checks

- `pnpm check` (in the kit) runs svelte-check over the kit and its stories.
- `pnpm check:a11y` (in the kit, with `pnpm storybook` already running) runs
  axe over every story. The two page-scope rules (`landmark-one-main`,
  `page-has-heading-one`) are off in the preview config: a story is a
  component in an iframe, not a page, and the lab's stories report exactly
  those two and nothing else.
- `pnpm check:parity` (repo root) keeps the roster, the stories and the
  registries in step; `pnpm compare <piece>` screenshots a piece next to its
  lab story in light and dark, at 360px and 1280px.

## Registry

`registry.json` is generated, never hand-edited: `pnpm registry:generate`
(scripts/generate-registries.mjs + scripts/registry-lib.mjs) builds it from
the pieces roster and the kit's source tree — one item per roster piece
(named by its `svelteItem` in `scripts/pieces.json`), one per vendored stock
folder (`ui-*`), plus `utils`, a `kit` item that depends on everything, and a
catch-all per blocks folder the roster doesn't list yet. `pnpm check:parity`
fails when a roster piece has no registry item; `pnpm registry:build` writes
the Pages layout (`r/svelte/`, `r/astro/`, `theme.css`) the workflow deploys.
