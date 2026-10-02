# hmziq brand kit

This document is the single source of truth for how every hmziq site looks, reads and behaves. It is written for AI agents and people doing migrations or redesigns. Follow it exactly. When something here conflicts with a site's existing code, this document wins.

Live reference: the Storybook in the `hmziq/brand` repo (`pnpm storybook`), which shows every component and a finished landing page for each site. Source for those pages: `apps/lab/src/sites/*.tsx`.

---

## 1. The brand in one table

| | Rule |
| --- | --- |
| Stack | Tailwind CSS v4 + shadcn/ui, **Base UI** primitives, **Vega** style (`base-vega`). |
| Typeface | **Onest** for everything people read. **JetBrains Mono** for code only. Self-hosted with Fontsource. |
| Weights | 400 text, 500 headings, 600 wordmark. Never heavier than 600. |
| Color | shadcn **neutral** greys (no tint), **oxide orange** as the brand color (`--primary`), and seven supporting colors (red, yellow, green, teal, blue, purple, pink) for status, categories, charts and code. |
| Mode | **Dark by default** (`<html class="dark">`). Light mode must also work. |
| Radius | `--radius: 0.625rem`. |
| Icons | **Lucide**, at line weight 1.75 (set by `theme.css`). Other companies' logos from **Simple Icons**. |
| Signature | The **wordmark** ends in an orange square (`freeoxide■`). **Rings** drawn from each site's name: hero art, card fingerprints, number gauges. A hollow **ring marker** for bullets and status. An **orange closing band** and a giant `hmziq■` signing off every footer (section 7). |
| Surfaces | Outline cards and tiles: a thin line, no grey fill. |
| Code | Highlighted with **Shiki**, using the `--code-*` colors from `theme.css`. |
| Motion | Nothing moves on hover, press or focus. Feedback is color only. |
| Words | Plain language for people, not jargon for developers. |
| Readability | Every text/background pair passes WCAG AA (4.5:1) in both modes, measured by `pnpm check:contrast`. |

---

## 2. Install the theme in a site

Two ways in.

**A new site** starts from a starter, in the brand repo:

```bash
pnpm new-project svelte ../my-site    # SvelteKit + shadcn-svelte
pnpm new-project astro ../my-site     # Astro + Starwind UI
```

It copies the boilerplate, points `@hmziq/brand-core` at npm, installs the whole kit from its registry into the kit folder (`$lib/brand` for SvelteKit, `src/components/brand` for Astro), points `$brand` there, and runs `pnpm install`. No import in the boilerplate changes.

**An existing site** gets the theme from npm and the components from its framework's registry (next subsection), then follows the steps below.

### The registries

| Framework | Kit | Registry | Install |
| --- | --- | --- | --- |
| SvelteKit | `brand-svelte` (shadcn-svelte) | `https://hmziqrs.github.io/brand/r/svelte/` | `pnpm dlx shadcn-svelte@latest add https://hmziqrs.github.io/brand/r/svelte/<piece>.json` |
| Astro | `brand-astro` (Starwind UI) | `https://hmziqrs.github.io/brand/r/astro/` | `pnpm dlx shadcn@latest add https://hmziqrs.github.io/brand/r/astro/<piece>.json` |

- Pieces are lowercase kebab names: `wordmark`, `hero`, `pricing-plans`, `notice`. The `kit` item installs everything at once; each piece pulls the pieces it imports.
- The registries ship the kit's own copies of the stock components (`ui-*` in the Svelte registry, `starwind-*` in the Astro one), with the brand's changes already applied. Use them instead of upstream's.
- The kit lands under one folder; point an alias `$brand` at it (`src/lib/brand`, `src/components/brand`) and import from `$brand/…`. Kit files already import each other that way.
- In a SvelteKit project, `components.json` reads `"registry": "https://hmziqrs.github.io/brand/r/svelte"`, aliases `$lib/brand/…`, style `vega`. In an Astro project, `components.json` carries `"registries": { "@hmziq": "https://hmziqrs.github.io/brand/r/astro/{name}.json" }` and pieces install as `pnpm dlx shadcn@latest add @hmziq/<piece>`.
- To update a copied piece, run the add command again and review the diff; the site keeps its own edits.
- Sites that use neither: fetch `/theme.css` from the Pages site, copy classes by hand from the kit sources.

### Packages

```bash
pnpm add tailwindcss @tailwindcss/vite tw-animate-css shadcn @hmziq/brand-core \
  @fontsource-variable/onest @fontsource-variable/jetbrains-mono \
  lucide-react simple-icons shiki
```

(Use the Tailwind integration that fits the framework, e.g. `@tailwindcss/vite` for Vite, Astro and SvelteKit, and the framework's own Lucide package: `@lucide/svelte`, `@lucide/astro`, or `lucide-static` for anything else.)

### Main stylesheet (e.g. `src/index.css` / `src/styles/global.css`)

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";
@import "@fontsource-variable/onest";
@import "@fontsource-variable/jetbrains-mono";
@import "@hmziq/brand-core/theme.css";
@source "../node_modules/@hmziq/brand-core/src";
```

The theme comes from the `@hmziq/brand-core` package (section 3 is its exact copy); don't copy the file into the site, and don't edit the tokens per site. The `@source` line makes Tailwind scan the package: `tones.ts` there holds class names Tailwind has to see. A site with the kit installed loads the kit's stylesheet too (`@import "$brand/styles/kit.css"`), after the theme.

### HTML

```html
<html lang="en" class="dark">
```

Dark is the default. A theme toggle removes or adds the `dark` class and remembers the choice.

### shadcn (`components.json`)

```json
{
  "style": "base-vega",
  "tailwind": { "css": "src/index.css", "baseColor": "neutral", "cssVariables": true },
  "iconLibrary": "lucide"
}
```

- Point `tailwind.css` at the **main stylesheet, never at `theme.css`**. `shadcn init` rewrites the file it's pointed at and will replace the oxide colors with its defaults.
- Initialise with `pnpm dlx shadcn@latest init --base base --preset vega`, then restore `theme.css` if it was touched.
- After adding any shadcn component, **remove `active:translate-y-px`** (and any other hover/press transform) from it. See section 10.

### Per framework

- **React (Vite, Next.js, TanStack Start):** use shadcn/ui as above. There is no React registry; the lab (`apps/lab`) stays the reference.
- **Svelte / SvelteKit:** install pieces from the Svelte registry (shadcn-svelte CLI, same token names, `theme.css` works as is). Apply the same motion and writing rules.
- **Astro:** install pieces from the Astro registry — Starwind UI (Astro-native, shadcn-style), no React, Svelte or Vue islands. Starwind needs a few extra tokens; see section 3.1.
- **Dioxus or anything else with Tailwind v4:** load the same stylesheet (`/theme.css` from the Pages site works without npm) and use the same utility classes (`bg-primary`, `text-muted-foreground`, …). Rebuild components by copying the classes from the kit sources (`packages/brand-svelte/src/lib`, `packages/brand-astro/src`) or the lab (`apps/lab/src`).

App screens — admin panels, dashboards, settings, sign-in, the signed-in side of a product — have their own blocks and their own contract: **`APP-BLOCKS.md`** in the brand repo. It lists every app block with its props, states, copy, keyboard behavior and how each one is built in Astro, and it's the reference for both kits. Install the blocks from either registry (`app-shell`, `settings-section`, `collection-toolbar`, …) and follow that document for anything it doesn't cover as a piece.

### Code highlighting

Code blocks use **Shiki** with its css-variables theme pointed at the `--code-*` tokens in `theme.css`. Colors then follow light/dark mode and the brand color, with no second theme to maintain. The theme comes from the core package:

```ts
import { hmziqCode } from "@hmziq/brand-core/code-theme"
```

- **React:** see `apps/lab/src/components/brand/code-block.tsx` (a synchronous highlighter with only the languages the site needs, and a copy button).
- **Svelte / SvelteKit:** `codeToHtml(code, { lang, theme: hmziqCode })` on the server or at build time.
- **Astro:** leave the built-in highlighter off (`markdown.syntaxHighlight: false`) and run core's Markdown plugins through `markdown.processor`, as `boilerplates/astro-app/astro.config.mjs` does — fenced code is highlighted by core's `code-meta` rehype plugin with `hmziqCode`, so Astro pages and SvelteKit pages get the same markup (section 8, "Markdown"). Code outside Markdown uses the kit's `CodeBlock`, tokenized at build time.
- **Dioxus or anything else:** highlight at build time with Shiki, or point another highlighter's token classes at the `--code-token-*` variables.

Code blocks sit on `--code-background` (the card color) with `--code-foreground` text.

---

## 3. theme.css (exact copy)

The real file lives at `packages/brand-core/theme.css` in the brand repo. This block is checked against it on every build.

<!-- theme.css:start -->
```css
/*
 * hmziq theme — shared by every hmziq site.
 *
 * Tailwind v4 + shadcn/ui token layout: semantic colors live as CSS variables
 * in :root (light) and .dark, and `@theme inline` maps them to Tailwind
 * utilities (bg-background, text-muted-foreground, border-border, ...).
 *
 * This file holds tokens only. A site's main stylesheet loads Tailwind,
 * shadcn's base CSS and the fonts first, then this file:
 *   @import "tailwindcss";
 *   @import "tw-animate-css";
 *   @import "shadcn/tailwind.css";
 *   @import "@fontsource-variable/onest";
 *   @import "@fontsource-variable/jetbrains-mono";
 *   @import "@hmziq/brand-core/theme.css";
 *
 * Dark is the default: ship <html class="dark"> and remove the class for light.
 *
 * The file has three parts:
 *   1. shadcn's tokens, in shadcn's layout. Greys are shadcn "neutral" (zero
 *      chroma, no tint). A theme tool's output can replace these two blocks.
 *   2. The colors: oxide orange plus seven supporting colors, tuned per mode
 *      so each one reads as text on a card and on its own soft fill (AA).
 *   3. Roles that point at those colors: status, code, icons, the logo
 *      square and the faint line used by ring art.
 *   4. Bands: full-width sections that change the colors inside them.
 *
 * --primary points at --orange. To try another brand color, point it at
 * another color (e.g. var(--blue)) in both blocks; everything that follows
 * the brand (ring, chart-1, sidebar, code keywords) follows it.
 * `pnpm check:contrast` measures every pair after a change.
 */

/* `dark:` applies inside .dark, but not inside a .light band placed in a dark page. */
@custom-variant dark (&:is(.dark *):not(.light *));

/* 1. shadcn tokens ---------------------------------------------------------- */

:root,
.light {
  --radius: 0.625rem;

  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);

  --primary: var(--orange);
  --primary-foreground: oklch(0.985 0 0);

  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  /* shadcn ships 0.556; 0.54 keeps grey text readable on muted surfaces too (4.6:1) */
  --muted-foreground: oklch(0.54 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: var(--red);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: var(--primary);

  --chart-1: var(--primary);
  --chart-2: var(--blue);
  --chart-3: var(--green);
  --chart-4: var(--purple);
  --chart-5: var(--yellow);

  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: var(--primary);
  --sidebar-primary-foreground: var(--primary-foreground);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: var(--primary);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.205 0 0);
  --popover-foreground: oklch(0.985 0 0);

  --primary: var(--orange);
  --primary-foreground: oklch(0.145 0 0);

  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: var(--red);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: var(--primary);

  --chart-1: var(--primary);
  --chart-2: var(--blue);
  --chart-3: var(--green);
  --chart-4: var(--purple);
  --chart-5: var(--yellow);

  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: var(--primary);
  --sidebar-primary-foreground: var(--primary-foreground);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: var(--primary);
}

/* 2. Colors ----------------------------------------------------------------
 * Oxide orange is the brand. The other seven carry meaning: status,
 * categories, charts and code. Only orange is ever a solid fill behind text;
 * the rest appear as text, icons, dots, lines and soft fills
 * (bg-green/10 text-green dark:bg-green/20).
 * Light shades sit around L 0.53 and dark shades around L 0.72–0.80, so
 * every color passes AA as text on a card and on its own soft fill.
 * --band is the gray of a full-width band; --on-orange is text on orange.
 */

:root,
.light {
  --red: oklch(0.54 0.21 26);
  --orange: oklch(0.54 0.135 52);
  --yellow: oklch(0.53 0.11 75);
  --green: oklch(0.51 0.14 150);
  --teal: oklch(0.515 0.09 185);
  --blue: oklch(0.53 0.175 255);
  --purple: oklch(0.55 0.2 300);
  --pink: oklch(0.55 0.19 350);
  --band: oklch(0.97 0 0);
  --on-orange: oklch(0.985 0 0);
}

.dark {
  --red: oklch(0.704 0.191 22.216);
  --orange: oklch(0.72 0.165 52);
  --yellow: oklch(0.8 0.14 85);
  --green: oklch(0.75 0.15 150);
  --teal: oklch(0.75 0.12 185);
  --blue: oklch(0.72 0.15 255);
  --purple: oklch(0.72 0.16 300);
  --pink: oklch(0.73 0.16 350);
  --band: oklch(0.205 0 0);
  --on-orange: oklch(0.145 0 0);
}

/* 3. Roles -----------------------------------------------------------------
 * Listed under every mode selector so a nested .dark or .light area
 * resolves them again.
 */

:root,
.dark,
.light {
  /* Status. Always soft or as text, never a solid fill. */
  --success: var(--green);
  --warning: var(--yellow);
  --info: var(--blue);

  /* Code highlighting: Shiki's css-variables theme with variablePrefix "--code-". */
  --code-foreground: var(--foreground);
  --code-background: var(--card);
  --code-token-keyword: var(--primary);
  --code-token-function: var(--blue);
  --code-token-string: var(--green);
  --code-token-string-expression: var(--green);
  --code-token-constant: var(--purple);
  --code-token-parameter: var(--foreground);
  --code-token-comment: var(--muted-foreground);
  --code-token-punctuation: var(--muted-foreground);
  --code-token-link: var(--blue);
  --code-token-inserted: var(--green);
  --code-token-deleted: var(--red);
  --code-token-changed: var(--yellow);

  /* Icon line weight, matched to Onest at 400. Lucide's default is 2. */
  --icon-stroke: 1.75;

  /* The logo's square keeps the bright orange in both modes. */
  --mark-square: oklch(0.72 0.165 52);
  /* Hairlines in ring art: the text color, faint. */
  --line: color-mix(in oklab, var(--foreground) 22%, transparent);
  /* A quiet surface on the orange band (inline code, hover): orange, nudged
     toward the page's text color so the band's text stays readable on it. */
  --band-orange-muted: color-mix(in oklab, var(--foreground) 12%, var(--orange));
}

/* 4. Bands -----------------------------------------------------------------
 * .band-orange  the closing band: solid orange; buttons and text flip to
 *               the text-on-orange color, so the main button stays readable.
 * .band-gray    a quiet full-width band, for numbers or a group of cards.
 * .light / .dark  the other mode inside a page, for an inverse band.
 */

.band-orange {
  --background: var(--orange);
  --foreground: var(--on-orange);
  --card: var(--orange);
  --card-foreground: var(--on-orange);
  --muted: var(--band-orange-muted);
  --muted-foreground: var(--on-orange);
  --primary: var(--on-orange);
  --primary-foreground: var(--orange);
  --border: color-mix(in oklab, var(--on-orange) 22%, transparent);
  --input: color-mix(in oklab, var(--on-orange) 45%, transparent);
  --ring: var(--on-orange);
  --line: color-mix(in oklab, var(--on-orange) 20%, transparent);
  background-color: var(--background);
  color: var(--foreground);
}

/* Outline buttons are only their line, like cards and tiles: no grey fill
   at rest (shadcn fills them in dark mode). Hover still tints them. */
[data-slot="button"][data-variant="outline"]:not(:hover, [aria-expanded="true"]) {
  background-color: transparent;
}

.band-gray {
  --background: var(--band);
  background-color: var(--background);
  color: var(--foreground);
}

/* An island in the other mode paints its own background: a white band on a
   dark page, or a terminal that stays dark on a light page. */
.light,
.dark {
  background-color: var(--background);
  color: var(--foreground);
}

@theme inline {
  /* Onest for everything people read; JetBrains Mono only for code. */
  --font-sans: "Onest Variable", "Onest", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
  --font-heading: var(--font-sans);
  --font-mono: "JetBrains Mono Variable", "JetBrains Mono", ui-monospace, "SF Mono", Menlo, Consolas, monospace;

  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --radius-2xl: calc(var(--radius) * 1.8);
  --radius-3xl: calc(var(--radius) * 2.2);
  --radius-4xl: calc(var(--radius) * 2.6);

  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-success: var(--success);
  --color-warning: var(--warning);
  --color-info: var(--info);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);

  --color-red: var(--red);
  --color-orange: var(--orange);
  --color-yellow: var(--yellow);
  --color-green: var(--green);
  --color-teal: var(--teal);
  --color-blue: var(--blue);
  --color-purple: var(--purple);
  --color-pink: var(--pink);
  --color-band: var(--band);
  --color-on-orange: var(--on-orange);
  --color-mark-square: var(--mark-square);
  --color-line: var(--line);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  html {
    @apply font-sans;
  }
  body {
    @apply bg-background text-foreground font-sans;
  }
  /* Every lucide icon uses the brand line weight. Change one with stroke-[2]. */
  .lucide {
    stroke-width: var(--icon-stroke);
  }
}
```
<!-- theme.css:end -->

### 3.1 Starwind UI adapter (Astro)

Starwind uses shadcn's names plus a few of its own. Add this after `theme.css`. It has been tested in a real Starwind build (the `brand-astro` kit) and is correct as written. Two lines of Starwind's own stylesheet must be deleted along with its default colors, or they override `theme.css`: the `@custom-variant dark` line (core's keeps `.light` bands working inside dark pages, section 3 part 4) and the `--radius-*` scale above `xs` (core's values differ above `--radius-xl`, and the corner rules use them). Only `--radius-xs` stays — core has no equivalent.

```css
:root,
.dark {
  --primary-accent: var(--primary); /* links and accents on the page background */
  --secondary-accent: var(--foreground);
  --error: var(--destructive);
  --outline: var(--ring);
  --sidebar-background: var(--sidebar);
  --sidebar-outline: var(--sidebar-ring);
  /* --success, --warning and --info come from theme.css. Starwind fills them
     solid, so give them text colors that pass on every palette color. */
  --error-foreground: var(--primary-foreground);
  --success-foreground: var(--primary-foreground);
  --warning-foreground: var(--primary-foreground);
  --info-foreground: var(--primary-foreground);
}
```

---

## 4. Color

`theme.css` has three parts: shadcn's tokens (part 1), the colors (part 2) and roles that point at them (part 3).

### Oxide orange, the brand

`--primary` points at `--orange`, which has two tuned shades: `oklch(0.72 0.165 52)` · `#F38230` in dark mode and `oklch(0.54 0.135 52)` · `#AA530A` in light mode. Text on it is `--primary-foreground`: near-black in dark mode, white in light mode.

Use `primary` for: the one main action on a view, links, the focus ring, and small highlights (an icon in an icon tile, a hovered card border at `/50`).

Never use it for: large backgrounds, body text, more than one main button per view, or decoration.

In shadcn, `accent` is the grey hover surface. It is **not** the brand color.

### Supporting colors

Orange plus seven supporting colors, each tuned per mode so it passes AA as text on a card and on its own soft fill. Tailwind utilities: `text-green`, `bg-green/10`, `border-green/30`, `bg-green` (dots only) and so on.

<!-- palette:start -->
| Color | Dark mode | Light mode | Role | For |
| --- | --- | --- | --- | --- |
| `red` | `oklch(0.704 0.191 22.216)` · `#FF6467` | `oklch(0.54 0.21 26)` · `#CD1622` | `destructive` | Errors, and buttons that delete things. |
| `orange` | `oklch(0.72 0.165 52)` · `#F38230` | `oklch(0.54 0.135 52)` · `#AA530A` | `primary` | The brand: the main button, links, focus rings, code keywords. |
| `yellow` | `oklch(0.8 0.14 85)` · `#E7B643` | `oklch(0.53 0.11 75)` · `#906106` | `warning` | Warnings and work in progress. |
| `green` | `oklch(0.75 0.15 150)` · `#5DC879` | `oklch(0.51 0.14 150)` · `#017B37` | `success` | Done, shipped, available, saved. |
| `teal` | `oklch(0.75 0.12 185)` · `#36C6B8` | `oklch(0.515 0.09 185)` · `#04786E` |  | Categories and charts. |
| `blue` | `oklch(0.72 0.15 255)` · `#5FA7FF` | `oklch(0.53 0.175 255)` · `#0069CD` | `info` | Tips and information. Function names in code. |
| `purple` | `oklch(0.72 0.16 300)` · `#B58BF9` | `oklch(0.55 0.2 300)` · `#864AD2` |  | Categories and charts. Numbers in code. |
| `pink` | `oklch(0.73 0.16 350)` · `#F079B6` | `oklch(0.55 0.19 350)` · `#BC3181` |  | Categories and charts. |
<!-- palette:end -->

### Where color goes

1. **Only orange is ever a solid fill behind text.** That's the main button. Every other color appears as text, an icon, a dot, a line or a soft fill. This keeps the orange button the loudest thing on the page, and keeps every page recognisably hmziq.
2. **Color has to mean something.** Use it when it tells the reader something: done, careful, which category. If you can't say what a color means, leave the thing grey.
3. **One color per thing.** A tag, a notice or an icon tile uses one color. A group of equal things (features, nav links, cards in a grid) shares one color.
4. **Same meaning, same color, on every site.** Green = done / shipped / available. Yellow = in progress / careful / beta. Red = error / deleting. Blue = tip / information. A blog category keeps one color everywhere it appears.
5. **Small things only.** Tags, icons, dots, chart lines, code. Never a colored section, page or card background, and never colored paragraphs.

### Status

Write the role, not the color: `text-success`, not `text-green`.

| Role | Points at | For |
| --- | --- | --- |
| `success` | `--green` | Done, shipped, saved, available |
| `warning` | `--yellow` | In progress, needs care, beta |
| `info` | `--blue` | Tips and extra information |
| `destructive` | `--red` | Errors, and actions that delete things |

Status is always **soft**, the same recipe shadcn uses for its destructive badge:

```html
<span class="bg-success/10 text-success dark:bg-success/20">Shipped</span>
```

A change in a number (a metric trend) is colored by whether it's good or bad news, not by whether it went up or down: a falling bounce rate is green, a rising load time is red. The arrow follows the direction, the color follows the meaning, and the words always carry a sign, so color is never the only signal (`MetricTrend`, APP-BLOCKS.md).

### Code and charts

- Code: keywords in `--primary`, function and type names in blue, strings in green, numbers and constants in purple, comments and punctuation in `--muted-foreground`. Set up in section 2 ("Code highlighting").
- Charts: `chart-1` to `chart-5` are orange, blue, green, purple, yellow. Label lines and bars; don't rely on color alone.

### Neutrals

shadcn neutral with zero chroma. The only change: light `--muted-foreground` is `0.54` (shadcn ships `0.556`), so grey text stays readable on grey surfaces.

| Token | Dark | Light | Use |
| --- | --- | --- | --- |
| `background` | `#0A0A0A` | `#FFFFFF` | page |
| `card` / `popover` | `#171717` | `#FFFFFF` | raised surfaces, code blocks |
| `muted` / `secondary` / `accent` | `#262626` | `#F5F5F5` | quiet surfaces, hover states, inline code |
| `foreground` | `#FAFAFA` | `#0A0A0A` | main text |
| `muted-foreground` | `#A1A1A1` | `#6F6F6F` | secondary text, captions, dates |
| `border` / `input` | white 10% / 15% | `#E5E5E5` | lines and fields |

### Measured contrast

Generated from `theme.css`. `pnpm check:contrast` fails the build if any pair drops below.

<!-- contrast:start -->
| Pair | Dark | Light | Needs |
| --- | --- | --- | --- |
| Body text on the page | 19.0:1 | 19.8:1 | 4.5:1 |
| Secondary text on the page | 7.6:1 | 5.1:1 | 4.5:1 |
| Secondary text on a card | 6.9:1 | 5.1:1 | 4.5:1 |
| Secondary text on a muted surface | 5.8:1 | 4.6:1 | 4.5:1 |
| Button text on oxide | 7.6:1 | 5.1:1 | 4.5:1 |
| Oxide links on the page | 7.6:1 | 5.3:1 | 4.5:1 |
| Oxide text on a card | 6.9:1 | 5.3:1 | 4.5:1 |
| Focus ring on the page | 7.6:1 | 5.3:1 | 3:1 |
| Text on the orange band | 7.6:1 | 5.1:1 | 4.5:1 |
| Code and hover on the orange band | 8.6:1 | 6.2:1 | 4.5:1 |
| Text on a gray band | 17.2:1 | 18.1:1 | 4.5:1 |
| Secondary text on a gray band | 6.9:1 | 4.6:1 | 4.5:1 |
| Red text on a card | 6.2:1 | 5.6:1 | 4.5:1 |
| Red text on its soft fill | 4.6:1 | 4.8:1 | 4.5:1 |
| Orange text on a card | 6.9:1 | 5.3:1 | 4.5:1 |
| Orange text on its soft fill | 5.0:1 | 4.6:1 | 4.5:1 |
| Yellow text on a card | 9.5:1 | 5.4:1 | 4.5:1 |
| Yellow text on its soft fill | 6.2:1 | 4.7:1 | 4.5:1 |
| Green text on a card | 8.5:1 | 5.4:1 | 4.5:1 |
| Green text on its soft fill | 5.8:1 | 4.7:1 | 4.5:1 |
| Teal text on a card | 8.5:1 | 5.4:1 | 4.5:1 |
| Teal text on its soft fill | 5.8:1 | 4.7:1 | 4.5:1 |
| Blue text on a card | 7.2:1 | 5.4:1 | 4.5:1 |
| Blue text on its soft fill | 5.1:1 | 4.6:1 | 4.5:1 |
| Purple text on a card | 6.8:1 | 5.3:1 | 4.5:1 |
| Purple text on its soft fill | 4.9:1 | 4.7:1 | 4.5:1 |
| Pink text on a card | 6.9:1 | 5.4:1 | 4.5:1 |
| Pink text on its soft fill | 5.0:1 | 4.7:1 | 4.5:1 |
| Error text on its soft fill | 4.6:1 | 4.8:1 | 4.5:1 |
| Code keywords | 6.9:1 | 5.3:1 | 4.5:1 |
| Code function and type names | 7.2:1 | 5.4:1 | 4.5:1 |
| Code strings | 8.5:1 | 5.4:1 | 4.5:1 |
| Code numbers and constants | 6.8:1 | 5.3:1 | 4.5:1 |
| Code comments | 6.9:1 | 5.1:1 | 4.5:1 |
| Code punctuation | 6.9:1 | 5.1:1 | 4.5:1 |
<!-- contrast:end -->

### Changing colors

- **Brand color:** point `--primary: var(--orange)` at another color (e.g. `var(--blue)`) in both `:root` and `.dark`. The ring, `chart-1`, the sidebar and code keywords follow.
- **A supporting color:** change its two lines in part 2, then run `pnpm check:contrast`.
- **A theme tool (tweakcn):** its output may replace the two blocks in part 1. Parts 2 and 3 stay.

Do not add: background tints, gradients, glows, per-site color schemes, colored section backgrounds, or Tailwind's numbered palette (`bg-green-500`). Every color comes from a token.

---

## 5. Typography

| Element | Classes |
| --- | --- |
| Page headline (h1) | `text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-balance` |
| Section heading (h2) | `text-3xl font-medium tracking-tight text-balance` |
| Card / item title | `text-lg font-medium` |
| Lede under h1 | `text-lg leading-relaxed text-muted-foreground max-w-prose` |
| Body | `text-base leading-relaxed` (secondary: `text-muted-foreground`) |
| Small print, meta, dates | `text-sm text-muted-foreground` |
| Wordmark | `text-lg font-semibold tracking-tight` |
| Code | `font-mono text-sm` (inline: `rounded-sm bg-muted px-1.5 py-0.5 font-mono text-[0.9em]`) |

Rules:

- Nothing above weight 600. Headings are 500.
- Normal-width type only. No wide, condensed, stencil, display or handwriting fonts.
- **No spaced-out uppercase labels** (`uppercase tracking-widest` eyebrows). Small labels are sentence case in `text-muted-foreground`.
- Body text lines stay around 60–75 characters (`max-w-prose` or `max-w-2xl`).
- Mono is for code and commands only, never headings, labels or numbers.
- Big numbers use normal (proportional) digits. `tabular-nums` only where digits line up in columns.

---

## 6. Icons

**Lucide** for every icon, drawn at line weight **1.75** instead of Lucide's 2, so lines are about as thick as Onest's regular letters. `theme.css` sets it for every element with the `lucide` class (`.lucide { stroke-width: var(--icon-stroke) }`). Lucide's React, Svelte and Astro packages add that class; with raw SVGs, add `class="lucide"`. Don't set `strokeWidth` per icon.

**Simple Icons** (`simple-icons`) for other companies' logos: GitHub, X, Bluesky. Lucide has none. Logos are solid shapes, so they sit one step smaller than line icons (14px next to 16px), always in the current text color, never the company's colors. If a logo isn't in Simple Icons (LinkedIn), write the name instead.

No other icon sets, no filled or two-tone icons, no emoji as icons.

| Size | Where |
| --- | --- |
| `size-3` (12px) | inside badges and tags |
| `size-4` (16px) | default: buttons, menus, inputs, next to body text (shadcn sizes these for you) |
| `size-4.5` (18px) | inside an icon tile |
| `size-5` (20px) | on its own in a header or toolbar |
| `size-6` (24px) | empty states; the largest an icon gets |

Rules:

- Icons take the text color around them: `text-muted-foreground` next to secondary text, the button's text color inside buttons, `text-primary` in icon tiles. A status color only when the icon *is* the status (a green check, a yellow warning triangle).
- An icon goes with a word. Icon-only buttons are only for actions everyone knows (search, close, menu, copy, light/dark), and each has an `aria-label` and a tooltip with the same words.
- Icons go before the label (`data-icon="inline-start"`); arrows that mean "go" go after (`data-icon="inline-end"`).
- Decorative icons are hidden from screen readers (`aria-hidden`; Lucide does this when there's no label).
- Not as bullets. One icon per feature at most.

Same meaning, same icon, on every site:

| Meaning | Lucide icon |
| --- | --- |
| Goes to another site | `ArrowUpRight` |
| Continue, next step | `ArrowRight` |
| Open a menu or section | `ChevronDown` |
| Documentation | `BookOpen` |
| Writing, blog posts | `PenLine` |
| Download | `Download` |
| Copy / copied | `Copy` → `Check` |
| A command to run | `SquareTerminal` |
| Release or version | `Tag` |
| Search / Settings / Email | `Search` / `Settings` / `Mail` |
| Stars on GitHub | `Star` |
| Light / dark mode | `Sun` / `Moon` |
| Open / close the menu | `Menu` / `X` |
| Success / info / warning / error | `CircleCheck` / `Info` / `TriangleAlert` / `OctagonAlert` |

When Lucide doesn't have an icon, draw it like Lucide (24×24 grid, 2px lines at that size, round caps and joins, no fills, 1px padding) and wrap it with `createLucideIcon` so it gets the `lucide` class and the brand line weight. Keep custom icons in `src/components/icons/`.

---

## 7. Signature: logo, rings and bands

The theme makes a page look tidy; these pieces make it look like hmziq. Every site uses all of them. They were picked in a long round of explorations, kept in the brand repo at `explorations/brand-directions.html`. Open it in a browser to compare every option; the picks below are loaded as "your mix".

### Wordmark

The site's name in Onest 600, ending in a small orange square. It's the only logo in the header.

```html
<span class="font-semibold leading-none tracking-[-0.02em] whitespace-nowrap">freeoxide<i aria-hidden="true" class="ml-[0.07em] inline-block size-[0.36em] bg-primary"></i></span>
```

- Size it with a text size; the square scales with it. Header: `text-lg`, then the maker line (`by hmziq`) in `text-[0.78em] text-muted-foreground`.
- No icon before the name, no other color on the letters.
- **Signature:** every footer ends with a giant `hmziq■` that fills the container: a `@container` wrapper with `overflow-hidden border-t pt-10`, and the wordmark at `block text-[33cqw] leading-[0.74] tracking-[-0.05em] pb-[0.2em]`.

### Mark

For favicons, app icons, avatars and the "More from hmziq" row. The site's two-letter symbol (section 12) and the square, on a rounded tile in the opposite of the page color: white on dark pages, black on light pages. The square is always the bright orange `--mark-square` (`#F38230`), in both modes.

```html
<span aria-hidden="true" style="font-size:20px" class="inline-grid size-[1em] shrink-0 place-items-center rounded-[22%] bg-foreground leading-none font-semibold tracking-[-0.02em] text-background">
  <span class="inline-flex items-baseline text-[0.42em]">Fx<i class="ml-[0.07em] inline-block size-[0.3em] bg-mark-square"></i></span>
</span>
```

- No rings, outlines or textures on the mark.
- Favicon and app icon files: dark is the default, so draw the white tile (`#FAFAFA`, letters `#0A0A0A`, square `#F38230`).

### Tuned logos (the logo tweaker)

`Wordmark` and `Mark` take an optional `look`: the letters (Onest or JetBrains Mono, weight 300–600, spacing, lowercase, color), the end mark (square, rounded, dot, diamond, bar or none; its size, gap, lift and color), the mark's tile (colors, corners, sizes), a plate behind the wordmark, and movement: the square pulses, fades, ripples, blinks, spins or bounces; the letters shimmer, wave or type themselves out; the tile or plate shimmers or breathes. Each move has its own length and rest, and the whole look can play once after a delay. Colors are theme colors by name or any CSS color.

Tune it on **Custom → Logo → Tweaker**, export the settings as JSON and pass them as `look` (`logo.ts` and `logo.css` in `@hmziq/brand-core`). Without a look, both are the brand's logo exactly as above. A tuned logo stops for reduced motion and never reacts to hover; pass `paused` to hold it. Ripples are outlines and shimmer is a gradient, so check a tuned look against the rules above and in section 13 before it ships.

### Marker

A small hollow ring is the brand's bullet: `inline-block size-2.25 shrink-0 rounded-full border-[1.75px] border-current`, plus `bg-current` when it's filled. It takes the text color.

- Status tags (`<Tag tone="success" marker>`), the note under the hero (`text-primary`), a project's kind (in the kind's color), list bullets.
- **Filled** means on, open, done or selected: the current page in a contents list, an open question, a copied step.
- Never a solid dot, a square or an emoji as a bullet.

### Rings

Thin circles, each with one gap, like layers of oxide. Faint rings use `--line` (the text color, faint); one ring is the accent, with a dot where it ends. They're drawn from a name with a seeded random generator, so each site, project and post gets its own picture and it never changes between visits. Copy `motion/rings.ts` from `@hmziq/brand-core` (the hash and generator, no dependencies) and the React `apps/lab/src/components/brand/rings.tsx`.

| Piece | Where | Recipe |
| --- | --- | --- |
| Hero rings | Right of the hero text (under it on phones) | viewBox `0 0 520 440`, 11 rings around (440, 225), radius `34 + 34·i`. Seed `hash(site) + 7`. The accent is ring `3 + ⌊r()·3⌋`: `--primary`, width 3, a 52% gap, a dot of radius 7 at its end. The rest: `--line`, width 1.25, a gap of 6–36%. Every ring turned `r()·360°`, round caps. |
| Corner rings | Top-right corner of a project card, 70% of its width | viewBox 100, 9 rings around (100, 0), radius `11 + 11·i`. Seed `hash(name) + 23`. The accent is ring `3 + hash(name) % 3`, in the kind's color, width 1, a 50% gap, a dot of radius 1.8. The rest: `--line`, width 0.5, a gap of 10–40%. |
| Band arcs | Right side of the orange band, from `md` up | viewBox 400, 8 rings around (400, 200), radius `60 + 44·i`, turned `150 + 23·i°`. Ring 3 in `--primary` (dark on the band), width 3, a 60% gap; the rest `--line`, width 1.25, a 20% gap. `absolute top-1/2 -right-[10%] h-[170%] -translate-y-1/2`. |
| Ring gauge | Key numbers | 72×72, radius 30, stroke 5, starting at the top. A share (0–1): a `--border` track and a `--primary` arc of that share with a round cap. A count (n > 1): n `--primary` segments with 5-unit gaps. The number beside it in `text-[1.75rem] font-medium tracking-[-0.03em]`, the label under it in `text-sm text-muted-foreground`. |

**Movement.** The hero rings can move a little, in two layers that combine: the **orange ring** (still, turns, breathes, or its dot goes round) and the **gray rings** (still, ripple, one at a time, or one turns). The gray rings have no dot, so light shows on them better than movement: a ripple lights them one after another without moving anything. Use a preset (`<Rings seed="…" motion="ripple-turn" />`) or your own settings (`motion={{ orange: { kind: "turn", seconds: 120 }, gray: { kind: "ripple", every: 10 } }}`), usually exported from the tweaker as JSON (`{ "rings": { "motion": … } }`). The movement is plain CSS (`rings.css` in `@hmziq/brand-core`, copy it with the component) plus keyframes that `ringMoves` in core's `motion/rings.ts` makes from the settings. Only one or two rings ever move; the rest of the picture stays exactly as drawn. `paused` stops it; visitors who ask for reduced motion always get the still picture. Tune it in Storybook under **Custom → Ring motion → Tweaker**: it exports the settings as JSON (copy or download) and loads pasted settings back; **Side by side** shows the presets together. Until settings are picked, the default is still.

Rings are always `--line` plus one accent. Nothing else is drawn with rings: not the logo, not cover images, not backgrounds behind text.

### Bands

Full-width sections that break up the page, edge to edge (no border, no rounded corners), with their content in the normal container. These classes (in `theme.css`) redefine the tokens, so shadcn components inside them work without changes.

| Class | For |
| --- | --- |
| `.band-orange` | The closing call to action, and the newsletter at the end of a post. Solid orange; text and buttons switch to `--on-orange`, so the main button turns dark with orange text and outline buttons lose their fill. Band arcs on the right. At most one per page. |
| `.band-gray` | A quiet band (`--band`) for numbers or a group of cards. |
| `.light` / `.dark` | The other mode inside a page, e.g. a white band on a dark page. |

### Project cards (elements)

Projects are drawn like elements of the periodic table. The hmziq sites are numbered 1–8 (section 12); projects carry on from 9. Each kind of project keeps one color everywhere: Library blue, Command-line tool teal, Desktop app purple.

- shadcn Card as an outline card: `relative gap-3 bg-transparent px-6 shadow-none hover:ring-primary/50`.
- Corner rings first, in the kind's color. Everything else gets `relative` so it sits above them.
- Top row: the number (`text-[0.8125rem] text-muted-foreground tabular-nums`, two digits) and the status tag.
- The symbol in the kind's color: `text-[2.75rem] leading-none font-medium tracking-[-0.04em]`.
- The name (`text-lg font-medium`), one or two sentences (`text-[0.9rem] leading-relaxed text-muted-foreground`), then a marker and the kind at the bottom (`mt-auto text-[0.8125rem] text-muted-foreground`).

Cards and icon tiles have **no grey fill**: a thin line only.

### 3D scenes (optional)

Most pages don't need one. When a page wants something moving, it can have **one** 3D scene, drawn with three.js in the rings' language: thin lines in the text color, one thing in orange, and the same picture every time for the same name. The scenes come from freeoxide's lattice and oxlabs' scenes, redrawn in the kit's colors. Source: `motion/scenes/` in `@hmziq/brand-core` (plain TypeScript and three.js, no framework) and the React wrapper `apps/lab/src/components/brand/scene.tsx`. Storybook: **Custom → Scenes (3D)**.

| Scene | Where | What it shows |
| --- | --- | --- |
| `lattice` | Beside the hero words (freeoxide) | Iron oxide's crystal (hematite) as a small ball, turning: iron atoms in orange, oxygen in grey, faint bonds, and the cell: a football (twenty six-sided faces, twelve five-sided ones) around the atoms, none poking out, its near edges drawn stronger than the ones behind. Every part is a setting (how many atoms, the room between them, each atom's size, the bond lines, the cell's near and far edges, the fade, the turn): tune it on **Custom → Lattice → Tweaker**, export the settings as JSON and pass them as `settings`. Without settings it uses the tweaker's starting values. |
| `network` | Beside the hero words (oxlabs) | Points joined to their nearest neighbours, a few in orange, with short orange pulses running along the links. |
| `layers` | Beside a "how it works" section | A stack of outline cards filled with the page color, one outlined in orange, breathing one after another. |
| `helix` | A thin band between sections | A twisting ribbon: one orange edge, one grey, faint rungs. |
| `tiles` | A thin band | Square outlines on a slow wave, one of them the wordmark's solid orange square. |
| `thread` | A thin band, or a contact page | Three faint threads drifting, with a short orange piece and a dot moving back and forth along the middle one. |

- **One per page**, beside the words or in its own band. Never behind text.
- **The box sets the size.** Hero scenes: `aspect-[520/440] w-full` in the hero's aside. Bands: `h-40` to `h-44 w-full border-y`, edge to edge. Band scenes run past both edges at any width.
- **Colors come from the theme**, read from wherever the scene sits, so it follows dark and light, bands and `.light`/`.dark` islands: `--foreground`, `--muted-foreground`, `--primary`, and the first solid background above it. Faint lines are the text color mixed 22% into that background, like `--line`. Never pass colors in.
- **Seed with the site or project name**, as with the rings.
- **Slow and on its own.** A full turn takes more than a minute. Scenes never follow the pointer and never react to hover (section 10). No glow, bloom or particles.
- **Stops when it should:** off screen, in a hidden tab, and when the visitor presses pause. Visitors who ask for reduced motion get one still picture and no button.
- **A pause button** in the bottom-right corner: a ghost icon button with Pause/Play icons, labelled "Pause the animation" / "Play the animation". The canvas itself is `aria-hidden`.
- **Loads only when used.** Import the scenes with `import()` so pages without one never download three.js. With no WebGL, a slow device or a visitor saving data, show the fallback: the flat `Rings` in a hero, nothing in a band.
- Line widths match the flat art: 1 to 1.25px for faint lines, 2 to 3px for orange (fat lines, `Line2`/`LineSegments2`, because WebGL's own lines are always one pixel).

The rings themselves stay flat: for a little movement in the hero rings, use `Rings` with `motion` (see Rings above), not a 3D scene.

React:

```tsx
import settings from "./lattice.json" // exported from Custom → Lattice → Tweaker

<Scene kind="lattice" seed="freeoxide" settings={settings.lattice} fallback={<Rings seed="freeoxide" />} className="aspect-[520/440] w-full" />
```

Svelte (Astro and plain HTML work the same way). Show the pause button only when `scene.moving`, and call `scene.pause()` / `scene.play()` from it:

```svelte
<script>
  import { onMount } from "svelte"
  import { canRunScenes } from "$lib/scenes/support"
  let host
  onMount(() => {
    if (!canRunScenes()) return
    let scene
    import("$lib/scenes").then(({ mountScene }) => (scene = mountScene(host, "lattice", { seed: "freeoxide" })))
    return () => scene?.dispose()
  })
</script>

<div bind:this={host} aria-hidden="true" class="relative aspect-[520/440] w-full"></div>
```

### Page patterns

What each kind of page uses. Each one is in the explorations file, working, and built in the Storybook: **Sites → Landing pages** for every site's front page, **Sites → Pages** for the rest (claude-multi's about, providers, FAQ, changelog, blog, privacy, terms and 404; gpui-query's docs; a blog post; oxlabs' contact page; and hmziq.rs/components, a catalog of the interactive pieces). Copy from `apps/lab/src/sites/`.

| Page | Pattern |
| --- | --- |
| Landing | Clean header (no line) · standard headline with hero rings · numbers as ring gauges · projects as element cards · standards as an icon-tile grid · headings stacked above content · orange closing band · signature footer. |
| Product | Hero stacked: the words, then the live demo at full width · features in outline cards (no fill, no rings) · quick start stacked: the steps, then the session under them. |
| Install and commands | Install steps as a stepper: numbered rings joined by a line; copying a step fills its ring · a command to copy sits in a bar as wide as the command, with a Copy button · a real terminal sits on a full-width orange band · no copy button on aliases or text people only read. |
| Code and comparisons | A code editor with a tab per version, line numbers and a status line · before and after: the by-hand way struck through, then what the tool does instead. |
| Tables | Boxed, with the column that matters in a soft orange wash (the accent column). Docs tables: a strong line under the headings, thin lines between rows. |
| Pricing | Three outline cards; the recommended one gets a fingerprint (corner rings). |
| Questions | An accordion; the open question's ring fills in. On a FAQ page: one numbered list with the topic on each question, and a search box. |
| Interactive demos | Fixed height, so clicking around never moves the page. Split panes: the app on the left, what it runs and the file it writes on the right. A graph where you pick one item: its line lights up and a panel shows what's inside. |
| Blog index | Plain top (title and intro) · the newest post large, the rest as cards · topic chips · search. |
| Blog post | The post's own cover image · contents at the top, in two columns · TL;DR in an orange outline box with a marker · pull quote as a margin note (beside the text on wide screens, above the paragraph on phones) · a link bar to share: the address, Copy link, then the networks as small round buttons in the text color · newsletter on the orange band. |
| About | Plain intro · principles in four outline cards · how it works: the real command, then what it does · big numbers under a strong line · the author in an outline card with their mark. |
| Changelog | Past releases on a timeline (rings joined by a line, newest first) · big numbers · each release shows its first change and a button to show the rest. |
| Privacy and terms | Contents in a side column that follows you down · sections numbered 01, 02… in orange, each with a thin line above · the one-paragraph short version in the TL;DR box. |
| Providers | An outline card per provider, with how you pay · notes with a thin line and an icon, in two columns. |
| Contact | Words on the left, channels on the right · who replies in an outline card. |
| Docs | A thin line down the side menu that the current page lights orange · "On this page" in a right column with markers · quiet notes (a thin line in the note color and a colored icon) · outline code blocks · the page's own rings faintly beside the title · previous and next as two outline cards. |
| 404 | The rings beside the words. |
| SaaS landing (templates) | The sites' own `SiteShell`: the same header, rhythm, orange close and signature footer, signed with the product's name, with the product's mark and one line in place of the "More from hmziq" row · the kit's hero parts, so headlines stay at the landing size · a product demo you can click in the hero or right under it, at a fixed height · customers as plain grey wordmarks · quotes in outline cards with a hollow ring for the person · plans in outline cards (the recommended one with its fingerprint) or as an accent table · at most one orange band: a terminal or a second band goes on grey. Five of them in the Storybook under **Templates → SaaS landing pages**, all with example content. |

The five SaaS templates, so a new product can start from the closest one (`apps/lab/src/templates/saas/`):

| Template | Product | What makes it different |
| --- | --- | --- |
| Sightline | Analytics | Announcement strip · centered hero with the app underneath, wider than the text (four screens, a date switch, charts) · bento grid of outline cards · set-up steps beside the code · privacy on a grey band |
| Hookline | Developer API | The kit's own landing layout: hero rings, ring gauges, install switch, SDK tabs · a delivery log you can play · terminal on grey · before and after · a usage slider with the price, and the plans as an accent table |
| Groundwork | Team planning | Split hero with a board you can use · four views picked from a list · templates as element cards · integrations in a grid of hairlines · per-person pricing with a team-size counter · security on grey |
| Parley | AI support | Hero on a grey band with a chat you can try · set-up steps beside an answer check · before and after as two outline columns · the same answer per channel · guardrails as notices · a customer story with its numbers · plans as an accent table · numbered FAQ |
| Openslot | Scheduling | Editorial hero: the headline across the page, then a line, then the words and buttons side by side · the booking page on a band in the other mode (white on dark pages, dark on light ones) · time zones · use cases in tabs · integrations grouped by kind · a wall of short quotes · two plans |

---

## 8. Layout and components

Build pages from shadcn components (Button, Card, Badge, Tabs, Table, Accordion, Input, Empty, Item, Kbd…) plus these patterns.

| Pattern | Recipe |
| --- | --- |
| Container | `mx-auto w-full max-w-5xl px-6` |
| Page rhythm | `main`: `flex flex-col gap-24 md:gap-32 py-16 md:py-24` |
| Header | Clean: no line under it, `h-19`. The wordmark (section 7) + small maker line (`by hmziq` / `by freeoxide`), ghost `sm` nav buttons in `text-muted-foreground`, one primary `sm` button |
| Hero | h1 (`leading-[1.02] font-medium tracking-[-0.035em]`) + lede + primary `lg` button + outline `lg` button + optional one-line note with a ring marker. Hero rings on the right from `md` (a product page may show its product there instead). No code in the hero. |
| Section | h2 + one-sentence intro (`text-muted-foreground`), then content, `gap-10` |
| Feature grid | 2–3 columns; each item: an icon tile (section 9), `font-medium` title, `text-sm text-muted-foreground` body. All tiles in a grid are the same color. |
| Cards | shadcn Card as an outline card (`bg-transparent shadow-none`); hover = `hover:ring-primary/50` only. Projects: element cards (section 7). |
| Stats / facts | Ring gauges: `grid gap-8 sm:grid-cols-3`, each a gauge beside the number and its label (section 7). On an About or Changelog page: big numbers under a strong line. |
| Steps | Numbered only when the order is real. The stepper: numbered rings (`size-9 rounded-full border-[1.75px]`) joined by a 1px line; a done step fills orange and the line below it turns orange. `Stepper` + `Step` in `components/brand`. |
| Code block | An outline, no fill: `rounded-xl border`. A bar `h-10 border-b` with the file label (`text-xs text-muted-foreground`) or tabs for versions of the same thing (Terminal / Cargo.toml), and the copy button (ghost `icon-sm`, `Copy` → `Check`) on the right. `pre` with `px-4.5 py-4 font-mono text-[0.8125rem] leading-[1.7]`, highlighted with Shiki (section 2). No copy button on code people only read. |
| Command to copy | `CommandBar`: `w-fit max-w-full rounded-xl border`, as wide as the command, `$` prompt in orange, the program in the function color and flags in the keyword color, an outline `sm` Copy button. Commands people shouldn't paste as they are (an alias they name themselves, an example) get no button. |
| Terminal | `TerminalWindow`: always dark (`dark` class, even on light pages), `rounded-xl border`, a `h-10` title bar with a terminal icon, mono `text-[0.8125rem] leading-[1.9]` lines: `$ command`, `# note` in grey, `▸ step › answer`, `✓ result`. |
| Tables | `DataTable`. On landing and product pages the accent style: boxed (`rounded-xl border`), the column that matters in a soft orange wash (`bg-primary/7`, heading `text-primary`): the last one, or the one `accent` names, e.g. the recommended plan. In docs the lines style: a strong line under the headings (`border-foreground`), thin lines between rows. Names in the first columns stay in the text color. |
| Switches | `Segmented`: a thin outline around a few buttons; the picked one gets a soft orange fill (`bg-primary/10 text-primary`, `/20` in dark). For package managers, billing periods, notes. |
| Questions | `Question` in `Questions`: `<details>` rows with a line between them; a grey ring that fills orange when open, a plus that turns to a minus. FAQ pages number them 01, 02… in orange with the topic as a grey tag. |
| Interactive demos | A fixed height, so clicking around never moves the page. |
| Closing call to action | The orange band: `band-orange relative overflow-hidden`, band arcs, then in the container a heading (`text-4xl md:text-[3.25rem] leading-[1.02] font-medium tracking-[-0.04em]`) + one sentence + two `lg` buttons, `py-16 md:py-24` |
| Footer | `border-t`, no fill. Optional link columns, then **"More from hmziq"**: each other hmziq site with its 20px mark (section 12), then the giant `hmziq■` signature, then `© 2026 hmziq.` |

Buttons: one `default` (primary) button per view for the main action; `outline` for the second; `ghost` for navigation; `link` inside text. Labels say what happens ("Get started", "Read the blog", "Subscribe"). A link that looks like a button is a Base UI Button with `nativeButton={false} render={<a href="…" />}`.

Badges and tags: sentence case. Status is a soft **tag** in its role color with a ring marker for live states: `success` for "Shipped" / "Active", `warning` for "In progress", plain grey for "Planned" / "Coming soon". Blog categories are soft tags, one color per category. Tech names and topic lists are `outline` or `secondary` badges, never colored.

Links to GitHub: an outline button with the GitHub logo from Simple Icons before the label.

Icons: see section 6.

### Landing page template

1. Header
2. Hero: the outcome for the reader, one-paragraph lede, two buttons, optional note, hero rings
3. Key numbers as ring gauges (only real numbers)
4. Optional product preview (a real screenshot or a small mock built from components)
5. Features: 6–8 items with icons, or projects as element cards
6. How it works: steps, only if it really is a sequence
7. Details: code sample (developer products only), table, tabs
8. The orange closing band
9. Footer with "More from hmziq" and the signature

The freeoxide page in the Storybook (`Sites/Landing pages`) is the reference.

### Page patterns

Content pages have their own blocks, in `blocks/content` under `$brand`. Each installs from either registry by its kebab name: `blog-layout`, `post-header`, `docs-layout`, `release-timeline`, `faq-list`, `not-found`, …

| Page | Blocks |
| --- | --- |
| Blog post | BlogLayout (the shell), PostHeader, PostContents, PullQuote, ShareBar, NewsletterBand |
| Blog index | PostList, PostCard, PostMeta; SearchBox and TopicChips filter (the page holds the filter state) |
| Docs | DocsLayout, DocsSearch, DocsTitle, DocsPager |
| Changelog | ReleaseTimeline, ReleaseHead with KindTag, ReleaseNotes, PastReleases |
| FAQ | FaqList on Question, questions numbered 01, 02… in orange with the topic as a grey tag |
| Legal | LegalLayout, LegalSection, LegalBlock; SummaryBox carries the short version |
| Contact | ContactChannels. Email opens the mail app; the address never appears in the page text |
| 404 | NotFound |
| Landing pieces | InstallSteps, TypingTerminal, CodeEditor |
| About | No block of its own: PageIntro, BigNumbers, Section, StepNumber, CommandBar, Mark, CtaBand |

Blocks never read the URL or navigate. The page passes the current path in and handles navigation (section 9).

#### Markdown

Content pages are written in Markdown: content collections in Astro, mdsvex in SvelteKit. Both run the same four plugins, each imported from its own entry under `@hmziq/brand-core/markdown/` — `callout`, `code-meta`, `heading-anchor` and `table` — with Shiki highlighting from `@hmziq/brand-core/code-theme`. The framework's built-in highlighter stays off, so both kits produce the same markup.

| In Markdown | Renders as |
| --- | --- |
| Text, lists, links, images | Prose styles |
| `##` and `###` headings | Anchored headings; their list feeds PostContents and Toc |
| Fenced code | The CodeBlock look. The fence's `title="…"` becomes the file label |
| Tables | The DataTable lines style |
| `> [!NOTE]`, `> [!TIP]`, `> [!IMPORTANT]` | Notice, info tone |
| `> [!WARNING]` | Notice, warning tone |
| `> [!CAUTION]` | Notice, destructive tone |
| Pull quotes, steps, anything without Markdown syntax | The kit component, used from MDX or mdsvex |

A post's cover image and whether it is line art (so it inverts on light pages) come from frontmatter.

### App screens

The signed-in side of a product — the shell and navigation, settings forms, members tables, metrics, sign-in — has its own blocks in `blocks/app` under `$brand`, and its own document: **`APP-BLOCKS.md`** in the brand repo is the contract for every one of them, in both kits. Build app screens from those blocks and that document; this section only adds what they sit on top of.

App screens run a step smaller and quieter than landing pages, so more fits on screen:

| Element | Classes |
| --- | --- |
| Page title (h1) | `text-2xl font-medium tracking-tight` |
| Section title (h2) | `text-base font-medium` |
| Body, table cells, form labels | `text-sm` |
| Descriptions, meta | `text-sm text-muted-foreground` |
| Big stat number | `text-2xl font-medium tracking-[-0.02em]` |

Everything else carries over from the sections above: outline panels, color only on hover, soft status fills, `font-medium` titles, mono for machine values only.

---

## 9. Custom components

### First, try not to build one

1. Use a shadcn component as it is.
2. Adjust it with classes.
3. Put shadcn components together into a page block (Hero, Section, FeatureGrid…).
4. Only then write a new component, with the rules below.

### Where things live

The kits are the source now; the React lab (`apps/lab`) is the picture they have to match, not the thing you copy from. In a site with a kit installed, `$brand` points at the kit folder — `src/lib/brand` in SvelteKit, `src/components/brand` in Astro — and everything below sits under it:

| Folder (under `$brand`) | What | Rule |
| --- | --- | --- |
| `ui` (Svelte) / `starwind` (Astro) | stock components, vendored with the brand's changes | Install from the registry (`ui-*`, `starwind-*` items), don't hand-edit beyond the brand's changes. Updates come from the registry too. |
| `components` | small brand pieces (Wordmark, Mark, Marker, Rings, Scene, Tag, IconTile, Notice, CodeBlock, CodeLines, CopyButton, CommandBar, TerminalWindow, Stepper, Segmented, Question, Toc, DataTable, BrandIcon) | Tokens only. Install from the registry; the logic (tones, logo recipe, rings, scroll spy, code theme) comes from `@hmziq/brand-core`, never copied. A site using Scene adds `three` itself. |
| `blocks/site` | page blocks (SiteShell/SiteLayout, Hero and its parts HeroTitle, HeroLede, HeroActions, HeroNotes, HeroNote, PageIntro, RingStats, Section, OutlineCard, ElementCard, FeatureCards, FeatureGrid, Steps, PricingPlans, Price, BeforeAfter, CtaBand) and content pieces (Prose, Bullets, CheckList, LinkBar, SummaryBox, BigNumbers, SearchBox, TopicChips, EmptyNote) | Same on every site. |
| `blocks/content` | content-page blocks (blog, docs, changelog, FAQ, legal, contact, 404) | Same on every site; pages pass the content in. |
| `blocks/app` | app blocks: the shell (AppShell, AppPage, AppPageHeader, WorkspaceSwitcher, UserMenu), settings (SettingsSection, SettingRow, FormActions), states (EmptyState, NoResults, ErrorState, DataState, the skeletons), lists and tables (CollectionToolbar, FilterChip, SortMenu, BulkActionBar, the table parts), sign-in (AuthLayout, the forms, ProviderButtons, PasswordInput), records (DetailList, DetailSection), metrics (MetricTrend, StatCard, StatGrid, UsageMeter) and actions (ConfirmAction, RecordSheet) | For app screens, on both kits. Their contract is `APP-BLOCKS.md`; follow it, not the lab. |
| pages / routes | one per route | Put blocks together; no new styles. |

Kit sources in the brand repo: `packages/brand-svelte/src/lib` and `packages/brand-astro/src` — port new pieces to both, add them to `scripts/pieces.json`, and re-run `pnpm registry:generate` (docs/kits.md).

### The rules

| | Rule |
| --- | --- |
| Color | Tokens only. Surfaces: `bg-background` page, `bg-card` for things that float over it, `bg-muted` for hover and selected. Cards and tiles in the page have no fill. Supporting colors per section 4. |
| Lines | 1px `border`. Between items `divide-y` or a `gap-px` grid on `bg-border`. Never two borders side by side. |
| Corners | `rounded-md` controls and icon tiles, `rounded-xl` cards and panels, `rounded-full` rings and tags. Bands are full width with square edges. |
| Shadows | None on things in the page. Floating things (menus, popovers, dialogs) get shadcn's. |
| Spacing | Tailwind's 4px steps. Inside a component `gap-1.5`–`gap-3`, `p-4`–`p-6`. Between components `gap-4`–`gap-10`. Between sections `gap-24` / `md:gap-32`. |
| Heights | `h-5` tags, `h-8` small controls, `h-9` default, `h-10` large. Nothing clickable under 32px. |
| Type | `text-sm` in components, `text-xs` only for tags, captions and file names. Titles `font-medium`; never above `font-semibold`. Sentence case. |
| Hover | Color change only: `hover:bg-muted`, `hover:text-foreground` or `hover:border-primary/50`. |
| Focus | `outline-none focus-visible:ring-3 focus-visible:ring-ring/50`. |
| Selected | `bg-muted`, or `border-primary/60 bg-primary/10` when it must stand out. |
| Disabled | `disabled:pointer-events-none disabled:opacity-50`. |
| Access | Real elements (`button`, `a`, `ul`), a label on icon-only controls, keyboard reachable, AA contrast in both modes. |

React conventions (follow shadcn's shape): a function component that spreads other props onto its root; `data-slot="name"` on the root; `className` last through `cn()`; tone classes written out in full in a map (Tailwind only finds whole class names); Base UI's `useRender` + `render` prop when it may render as another element. Other frameworks: same classes, same `data-slot` names.

### Recipes

| Piece | Classes |
| --- | --- |
| Tag (status or category) | `inline-flex h-5 w-fit items-center gap-1.5 rounded-4xl px-2 text-xs font-medium whitespace-nowrap` + tone `bg-success/10 text-success dark:bg-success/20` (any role or supporting color), or `bg-secondary text-secondary-foreground` for grey. Links: `hover:underline`. |
| Tag marker | `size-1.75 shrink-0 rounded-full border-[1.5px] border-current`, before the label, for live states |
| Status with text | the marker (section 7) in `text-success` + the words in `text-sm text-muted-foreground` |
| Icon tile | `flex size-9 items-center justify-center rounded-md [&_svg]:size-4.5` + `border text-primary` (default: a line, no fill), or a tone's soft fill without the border when the color means something |
| Notice | shadcn Alert with `role="note"` + `bg-transparent border-warning/40 *:[svg]:text-warning` (same for info, success, destructive). A line in the note color, no fill. Icons: `Info`, `CircleCheck`, `TriangleAlert`, `OctagonAlert`. Title and text stay in the normal text colors. |
| Outline button | shadcn's `outline` variant. `theme.css` keeps it unfilled at rest (shadcn fills it in dark mode); hover still tints it. |
| Text field | shadcn Input or InputGroup with `shadow-none dark:bg-transparent`: a line, no fill. |
| TL;DR box | `rounded-xl border border-primary/45 px-5 py-4.5`, a label with a ring in `text-[0.8125rem] font-medium text-primary`. Also "The short version" on legal pages. |
| Company logo | inline `<svg viewBox="0 0 24 24" fill="currentColor" class="size-3.5 shrink-0" aria-hidden="true">` with the Simple Icons path |
| Code block | see section 8 |

### Before it ships

1. It has a story (or a demo page) showing every tone and variant.
2. Checked in dark and in light.
3. axe reports no violations.
4. No hover/press movement, no colors outside the tokens.
5. If other sites need it, its recipe is added here.

---

## 10. Motion

- Buttons, cards, links, tabs and menu items **never move, lift, shrink, grow or rotate** on hover, press or focus. No `translate-*`, `scale-*` or `rotate-*` under `hover:`, `active:`, `focus:` or `pressed` variants.
- Feedback is color only: background, border, underline or the focus ring.
- Things that open and close (dialogs, drawers, menus, popovers, toasts) may fade and slide in. Once on screen they stay put.
- Switch thumbs slide; that is the control working, not drift.
- shadcn's Button ships with `active:not-aria-[haspopup]:translate-y-px`. Remove it.
- Respect `prefers-reduced-motion`.
- The optional 3D scenes (section 7) drift slowly on their own. They never follow the pointer, stop when off screen, show one still picture for reduced motion, and have a pause button.

Check (from the brand repo): `pnpm check:motion`, or search the code for `(hover|active|focus|pressed)[^ ]*:-?(translate|scale|rotate)-`.

---

## 11. Writing

These sites are for people, not only developers. The words must make sense to someone who has never opened a terminal.

1. **Say what it does for them.** Lead with the outcome, not the implementation.
2. **Plain words first.** A technical term comes after the plain version, or not at all.
3. **One idea per sentence.** Short sentences, active voice.
4. **Buttons say what happens.** "Subscribe", "Download for Mac", "Read the blog". Never "Submit" or "Learn more".
5. **No terminal cosplay on the first screen.** No fake boot logs, `$ commands`, version numbers or ASCII art in the hero.
6. **No hype.** No "blazing", "next-gen", "revolutionary", "supercharge", "seamless".
7. **Errors say what went wrong and how to fix it.**
8. **Don't invent facts.** No made-up numbers, quotes, customers or features. Use the real ones or leave them out.
9. Avoid "not X, but Y" slogans, em-dash asides and colon-reveal sentences.

Technical detail belongs in docs, changelogs and READMEs, not in the headline, intro or buttons.

Before → after (real lines from the old sites):

| Before | After |
| --- | --- |
| 24 themes, i18n, form validation, Cmd+K launcher, SQLite persistence, signed auto-updater, and macOS tray out of the box. | Start your desktop app with the boring parts already built: themes, translations, updates and a menu bar icon. |
| Zero-boilerplate async state management for GPUI. Caching, retry, cooperative cancellation, and persistence. | Your app loads data, keeps it fresh and tries again when the connection drops. You don't write that code yourself. |
| $ freeoxide --init · booting freeoxide v0.1.0 … | Free tools for building apps in Rust. Each one is tested before it ships. |
| Available for new projects · Remote · async-first | Taking on new projects. We work remotely and write everything down, so you never wait on a meeting. |
| Software that ships. Not demos. | Web, mobile and desktop apps, built and shipped by a small team. |

---

## 12. The sites

Every site's footer links to all the others under "More from hmziq". Each site has a number and a two-letter symbol for its mark, like an element; projects carry the numbers on from 9. Approved headlines:

| # | Site | Mark | URL | Headline |
| --- | --- | --- | --- | --- |
| 1 | hmziq (personal) | Hq | https://hmziq.rs | I build apps for phones, computers, the web and the terminal. |
| 2 | Blog | Bl | https://blog.hmziq.rs | Notes from building software. |
| 3 | Labs | Lb | https://hmziq.xyz | Experiments, in the open. |
| 4 | freeoxide | Fx | https://freeoxide.com | Free Rust tools, finished before they ship. |
| 5 | gpui-starter | Gs | https://gpui-starter.freeoxide.com | Start your desktop app with the boring parts done. |
| 6 | gpui-query | Gq | https://gpui-query.freeoxide.com | Load data in GPUI apps without writing the plumbing. |
| 7 | claude-multi | Cm | https://claude-multi.hmziq.xyz | Use Claude Code with any AI provider. |
| 8 | oxlabs | Ox | https://oxlabs.dev | Web, mobile and desktop apps, built and shipped by a small team. |

Maker lines next to the wordmark: `by hmziq` (blog, labs, freeoxide, claude-multi), `by freeoxide` (gpui-starter, gpui-query), `studio` (oxlabs). hmziq.rs has none.

---

## 13. Never do this

These made the old sites look like every other developer site:

- Near-black page with one neon accent (lime, hot pink, electric blue).
- Fake terminal or code windows, boot logs or "LIVE" panels in the hero.
- Spaced-out uppercase mono labels (`// CAPABILITIES`, `SENIOR SOFTWARE ENGINEER`).
- Wide, condensed, stencil, heavy (700+) or novelty display fonts. Handwriting fonts.
- Background textures, noise, starfields, glows, gradients, tinted greys.
- A 3D scene behind text, more than one on a page, or one that follows the pointer.
- Per-site color schemes, theme switchers with many palettes, or more than one brand color.
- Hover lift, press nudge, scale on hover.
- Version numbers, star counts or tech-stack lists as the first thing a visitor reads.
- Emoji as icons or bullet markers. A second icon set, or filled icons.
- A rainbow: a different color per feature, card or nav item when the colors mean nothing.
- Solid fills in any color but orange behind text (solid green badges, blue buttons).
- Colored paragraphs, tinted notice boxes, colored card backgrounds. The only colored section backgrounds are the bands in section 7.
- Grey-filled cards, tiles or panels sitting in the page.
- Rings in a logo or mark, or rings behind text. A solid dot as a bullet.
- Tailwind's numbered palette (`bg-green-500`) or hex values in components.

---

## 14. Migration checklist

For each existing site:

1. **Inventory.** List every page, its real content, its components, and every color and font in use.
2. **Stack.** Tailwind v4, the main stylesheet and `theme.css` from section 2, and the site's framework kit installed from its registry (section 2, "The registries"): `brand-svelte` for SvelteKit sites, `brand-astro` for Astro sites. Remove old fonts, color variables, theme switchers and textures.
3. **Map colors to tokens.** Every color becomes a token utility (`bg-background`, `text-foreground`, `text-muted-foreground`, `border-border`, `bg-card`, `bg-primary`…). No hex values in components.
4. **Components.** Replace hand-made UI with the kit's pieces and its vendored stock components (`ui-*` / `starwind-*` registry items), not upstream shadcn. Remove hover/press transforms. Statuses become soft tags in their role color; feature icons go in icon tiles.
5. **Icons and code.** Swap every icon to Lucide (section 6's table), logos to Simple Icons, and highlight code with Shiki and the `--code-*` tokens (section 2).
6. **Copy.** Rewrite the headline, intro and buttons under section 11. Keep facts and numbers exactly as they were.
7. **Structure.** Header, hero, sections and footer per section 8, with the signature pieces from section 7. Add the "More from hmziq" row with each site's mark.
8. **Dark default.** `<html class="dark">`, with light mode working too.
9. **Check.**
   - Contrast: run axe (e.g. Storybook's accessibility panel or `@axe-core`) in dark and light. Zero `color-contrast` failures.
   - Motion: no transforms on hover/press/focus.
   - Colors: no Tailwind numbered palette, hex values or `bg-white`/`bg-black` outside shadcn's own files. Search for `(bg|text|border|ring|fill|stroke)-(red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|slate|gray|zinc|neutral|stone)-[0-9]` and `#[0-9a-fA-F]{6}`.
   - Screenshots at 1280px and 390px wide, dark and light.
   - Compare against the matching page in the brand Storybook ("Sites").
