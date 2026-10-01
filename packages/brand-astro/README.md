# brand-astro

The hmziq brand kit for Astro. Starwind UI stock components with the brand's
changes, plus the brand pieces and blocks ported from the React design lab
(`apps/lab`). Built on Starwind UI because the hmziq Astro sites already use
it. Part of [docs/kits.md](../../docs/kits.md) step 2.

The kit is never published to npm. Projects copy it in from the Astro
registry (`/r/astro/`) and own the files from then on.

## Layout

```text
packages/brand-astro/
├── src/
│   ├── starwind/                Starwind stock components, with the brand's changes
│   ├── components/              brand pieces (ported from apps/lab/src/components/brand)
│   ├── blocks/site/             site blocks, content pieces, SiteLayout, SiteHead
│   ├── blocks/content/          content-page blocks (content-blocks.md)
│   ├── blocks/app/              app blocks (app-blocks.md, phase 10)
│   └── styles/kit.css           Starwind's stylesheet + the BRAND.md 3.1 adapter
├── starwind.config.json         which Starwind version each stock component came from
├── astro.config.mjs             the `$brand` alias, so `astro check` resolves the kit
└── package.json
```

`$brand` points at `src/` here, and at the folder the kit is installed into
in a copied project (`src/components/brand`). Kit files import each other
through `$brand`, never through long relative paths.

## Using it in a project

A project's main stylesheet loads Tailwind, tw-animate, the fonts and core's
theme first, then the kit's stylesheet:

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "@fontsource-variable/onest";
@import "@fontsource-variable/jetbrains-mono";
@import "@hmziq/brand-core/theme.css";
@import "$brand/styles/kit.css";
@source "../node_modules/@hmziq/brand-core/src";
```

Verified in a scratch Astro 7 app (2026-10-01): `@import "$brand/styles/kit.css"`
resolves through the Vite alias, the adapter tokens come out pointing at
core's, Starwind's blue is gone, the outline button stays unfilled, the soft
status fills double in dark mode, and `dark:` still resolves through core's
variant — `.dark\:bg-success\/20:is(.dark *):not(.light *)` — so `.light`
bands keep working.

While the kit lives outside the project (the `boilerplates/astro-app` case
inside this repo), add an `@source` for it too, or Tailwind never sees the
class names in `variants.ts`:

```css
@source "../../../packages/brand-astro/src";
```

In a copied project the kit sits inside `src/`, which Tailwind scans anyway.

Colors come only from core's `theme.css`. `kit.css` carries Starwind's own
CSS with Starwind's default palette deleted, and points Starwind's extra
token names (`--primary-accent`, `--error`, `--outline`, …) at core's theme
(BRAND.md section 3.1). Two more of Starwind's lines are deleted with the
colors, because they would override core: its `@custom-variant dark`
(core's keeps `.light` bands working inside dark pages) and its `--radius-*`
scale (core's `2xl`/`3xl`/`4xl` differ, and the brand's corner rules use
them; only `--radius-xs`, which core lacks, is kept).

## The brand's changes to stock

The reference is the lab. Every stock file in `apps/lab/src/components/ui`
was diffed against a fresh `shadcn add` of the same component (shadcn 4.21,
style `base-vega`, 2026-10-01). The lab changes exactly two things, and the
same two are applied here to the Starwind copies (sidebar, sheet, skeleton,
dropdown, alert-dialog, checkbox, combobox, input-otp and toast joined with
the app blocks, and carry the changes below too):

| Change | In the lab | In this kit |
| --- | --- | --- |
| No movement on press | Button drops `active:not-aria-[haspopup]:translate-y-px` | Starwind ships no movement classes, so nothing to remove; `check-motion` guards it |
| Buttons carry their variant | Button adds `data-variant={variant}` on the root, for `theme.css`'s outline rule | `Button.astro` sets `data-variant` on both the button and the link branch |

Everything else the diff showed (`"use client"` lines, one unused `React`
import) is drift between the lab's snapshot and today's shadcn registry, not
a brand decision, and has no Astro equivalent.

On top of those, the kit makes three changes of its own, all forced by a
brand rule or by "the lab is right":

1. **The default button is the primary one.** Starwind's default variant is a
   black button and `primary` is separate; in the lab the default variant is
   `bg-primary`. `Button.astro` resolves a bare `<Button>` to `variant:
   "primary"`, and `button/variants.ts` uses the lab's base, variant and size
   classes (h-8 small, h-9 default, h-10 large, `text-sm`, `link` included).
   Starwind's `default` (black) variant still exists under its own name.
2. **Status colors never fill solid behind text** (BRAND.md section 4). The
   `info`, `success`, `warning` and `error` variants of Button and Badge use
   the soft recipe (`bg-success/10 text-success dark:bg-success/20`), like
   the lab's destructive button. Progress and slider indicators keep their
   solid fills: nothing is printed on them. Orange (`primary`) and the
   greys keep theirs.
3. **One icon set.** Starwind ships its icons as Tabler SVGs; the kit
   replaces every one with its Lucide twin (the sidebar's panel, the
   dropdowns' checks and chevrons, the checkboxes' check, the OTP's minus,
   the toast's five) and does not depend on `@tabler/icons`. Icons in the
   kit are Lucide (`@lucide/astro`), which renders the `lucide` class
   `theme.css` needs.
4. **Spinners and pulses respect reduced motion**: the skeleton's pulse and
   every spinner the stock animates (the toast's loader) carry
   `motion-reduce:animate-none`, as BRAND.md section 10 asks.

## Updating stock components

`starwind.config.json` records the Starwind version each component came
from. To see upstream changes: `pnpm dlx starwind@latest update <component>
--diff` from this folder. Merge by hand: re-apply the table and the three
changes above after accepting anything.

Adding a component: `pnpm dlx starwind@latest add <name> -y --package-manager
pnpm` from this folder, then check it against the rules above
(`pnpm check:colors`, `pnpm check:motion` cover `src/`). `add` writes only
component files and `starwind.config.json` — it leaves `kit.css` alone (only
`init` writes the palette), but read the diff before keeping anything.

## Known stock differences to override per piece

Starwind's stock is one size step up from the lab's. Stock files keep
Starwind's own anatomy, so when a ported piece must match the lab exactly,
give the piece its own classes rather than editing stock:

- Inputs default to `h-11` `text-base` (Starwind) against `h-9` `text-sm`
  (the lab). Same for `field`, `textarea` and `select`.
- Card draws a `ring-1` instead of the lab's `border`, and its description is
  `text-base`.
- Table head cells use `text-muted-foreground` (Starwind) where the lab uses
  `text-foreground`; the height is `h-10` in both.
- Badge defaults to `text-sm` `px-3` (md); the brand's Tag recipe
  (`h-5 px-2 text-xs rounded-4xl`) is carried by the Tag piece itself.
- Alert is `p-4` with an `h5` `text-lg` title (Starwind) against the lab's
  `px-4 py-3` `text-sm` grid; Notice carries the lab's layout on the piece.

## The pieces (step 2.5)

Everything in the kits.md table is ported: the brand pieces in
`src/components/`, the site blocks and content pieces in `src/blocks/site/`,
and `SiteLayout` + `SiteHead`. `src/index.ts` is the barrel. The rules and
the shape of each piece are the lab's (`apps/lab/src/components/brand`,
`apps/lab/src/sites/shared`); where Astro works differently, the difference
is one of these:

- **Props and slots.** ReactNode props became named slots (`Hero`'s `kicker`,
  `title`, `lede`, `actions`, `note`, `aside`, `below`; `Notice`'s `icon`).
  `style` takes a string or an object; objects are kebab-cased by
  `styleText` (`$brand/utils`), because a style attribute ignores React's
  camelCase names.
- **Interaction follows Starwind's way**: small scripts that find elements by
  `data-slot` and rerun after view transitions (`astro:page-load`), no
  islands. Everything else ships no JS:
  - `CopyButton` swaps its icon and word on a `data-copied` attribute both
    markups are already in.
  - `CodeBlock` renders every tab's panel at build time and only shows and
    hides them; the raw code rides along in `data-code` for the copy button.
  - `Segmented` and `TopicChips` set `aria-pressed` in their group and
    bubble a `segmented-change` / `topic-change` CustomEvent with the value
    — the Astro stand-in for the lab's `onValueChange` / `onChange` props.
    `PricingPlans` listens for the first and shows the matching
    `[data-billing]` price (both periods are rendered).
  - `Scene` mounts through core's `mountScene` in a dynamic import, so
    three.js only downloads when a scene is on the page. **A project using
    Scene installs `three` itself** (core's optional peer; the lab and the
    boilerplates carry it).
- **Item props take components.** `FeatureCards` / `FeatureGrid` items carry
  `icon` as an imported component (a `@lucide/astro` icon renders fine);
  `DataTable` cells and `BeforeAfter` rows are strings. `PricingPlans` has
  no per-plan `price` render prop — draw a custom price with `Price` and the
  pieces around it instead.
- **`SiteShell` is `SiteLayout` here**: it renders the whole document
  (`<html>` dark by default, `<head>` with `SiteHead` through the `head`
  prop, then the shell) because an Astro page needs a layout, not a wrapper
  div. Nav is the lab's `nav: string[]` rendered as `href="#"` links;
  pointed nav is the page's job (porting rule 7).
- `SearchBox` ships no script; the page that filters listens to the input.

## The app blocks (phase 10)

`src/blocks/app/` mirrors the Svelte kit's folder shape, one `.astro` file
per block with a `types.ts` where the Svelte kit has one, so the registry's
folder-shared items line up across the kits. Static blocks ship no JavaScript.
The interactive ones follow the entry's **Astro** line in `APP-BLOCKS.md`:

- Starwind's runtime owns the overlays: the sidebar (collapsing, the mobile
  sheet, Ctrl/Cmd+B, its cookie), the dropdowns, the sheet and the alert
  dialog open, move and close by themselves.
- A block's own `<script>` is small and delegated — it finds elements by
  `data-slot`, listens at `document`, and runs again on `astro:page-load`.
  Pages talk to blocks through CustomEvents (`row-action`, `confirm`,
  `confirm-settle`, `setting-retry`, `theme-change`, `record-sheet-close`).
- Where the block's root is one of Starwind's popups, the stock keeps its
  own `data-slot` (the sheet's and dialog's content), so the block's name
  rides on a `data-slot-wrap` wrapper around it.
- The Combobox is Starwind's own `starwind/combobox`, as its contract entry
  says; the settings demo's time zone field wears it.

## Installing the kit's own files (registry test, 2026-10-01)

Tested in a scratch Astro app, as kits.md step 2.1 asks:

- Starwind's CLI with a custom `--registry` file does **not** accept
  shadcn-shaped items. It wants its own manifest (`version` as a string,
  `components[]` with `type: "component"`), which the CLI does not document;
  three attempts all failed validation.
- The shadcn CLI with plain file items (`type: "registry:file"`, exact
  `target` paths) installs `.astro` files verbatim, `$brand` imports intact.
  **This is the install method for the Astro registry** (kits.md step 3).
