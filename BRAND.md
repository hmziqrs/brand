# hmziq brand kit

This document is the single source of truth for how every hmziq site looks, reads and behaves. It is written for AI agents and people doing migrations or redesigns. Follow it exactly. When something here conflicts with a site's existing code, this document wins.

Live reference: the Storybook in the `hmziq/brand` repo (`pnpm storybook`), which shows every component and a finished landing page for each site. Source for those pages: `src/sites/*.tsx`.

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
| Code | Highlighted with **Shiki**, using the `--code-*` colors from `theme.css`. |
| Motion | Nothing moves on hover, press or focus. Feedback is color only. |
| Words | Plain language for people, not jargon for developers. |
| Readability | Every text/background pair passes WCAG AA (4.5:1) in both modes, measured by `pnpm check:contrast`. |

---

## 2. Install the theme in a site

### Packages

```bash
pnpm add tailwindcss @tailwindcss/vite tw-animate-css shadcn \
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
@import "./theme.css";
```

Copy `theme.css` (section 3) into the site next to that stylesheet. Do not edit the tokens per site.

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
- After adding any shadcn component, **remove `active:translate-y-px`** (and any other hover/press transform) from it. See section 9.

### Per framework

- **React (Vite, Next.js, TanStack Start):** use shadcn/ui as above.
- **Svelte / SvelteKit:** shadcn-svelte uses the same token names, so `theme.css` works as is. Apply the same motion and writing rules.
- **Astro:** either render shadcn React components as islands, or use **Starwind UI** (Astro-native, shadcn-style). Starwind needs a few extra tokens; see section 3.1.
- **Dioxus or anything else with Tailwind v4:** load the same stylesheet and use the same utility classes (`bg-primary`, `text-muted-foreground`, …). Rebuild components by copying the classes from the shadcn source in the brand repo (`src/components/ui/*.tsx`) and the brand components (`src/components/brand/*.tsx`).

### Code highlighting

Code blocks use **Shiki** with its css-variables theme pointed at the `--code-*` tokens in `theme.css`. Colors then follow light/dark mode and the brand color, with no second theme to maintain.

```ts
import { createCssVariablesTheme } from "shiki/core"

export const hmziqCode = createCssVariablesTheme({ name: "hmziq", variablePrefix: "--code-" })
```

- **React:** see `src/components/brand/code-block.tsx` (a synchronous highlighter with only the languages the site needs, and a copy button).
- **Svelte / SvelteKit:** `codeToHtml(code, { lang, theme: hmziqCode })` on the server or at build time.
- **Astro:** pass the same theme object to `markdown.shikiConfig.theme` in `astro.config`. Not yet tried in a real Astro project; compare with the Storybook.
- **Dioxus or anything else:** highlight at build time with Shiki, or point another highlighter's token classes at the `--code-token-*` variables.

Code blocks sit on `--code-background` (the card color) with `--code-foreground` text.

---

## 3. theme.css (exact copy)

The real file lives at `theme.css` in the brand repo. This block is checked against it on every build.

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
 *   @import "<path-to>/brand/theme.css";
 *
 * Dark is the default: ship <html class="dark"> and remove the class for light.
 *
 * The file has three parts:
 *   1. shadcn's tokens, in shadcn's layout. Greys are shadcn "neutral" (zero
 *      chroma, no tint). A theme tool's output can replace these two blocks.
 *   2. The colors: oxide orange plus seven supporting colors, tuned per mode
 *      so each one reads as text on a card and on its own soft fill (AA).
 *   3. Roles that point at those colors: status, code and icons.
 *
 * --primary points at --orange. To try another brand color, point it at
 * another color (e.g. var(--blue)) in both blocks; everything that follows
 * the brand (ring, chart-1, sidebar, code keywords) follows it.
 * `pnpm check:contrast` measures every pair after a change.
 */

@custom-variant dark (&:is(.dark *));

/* 1. shadcn tokens ---------------------------------------------------------- */

:root {
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
 */

:root {
  --red: oklch(0.54 0.21 26);
  --orange: oklch(0.54 0.135 52);
  --yellow: oklch(0.53 0.11 75);
  --green: oklch(0.51 0.14 150);
  --teal: oklch(0.515 0.09 185);
  --blue: oklch(0.53 0.175 255);
  --purple: oklch(0.55 0.2 300);
  --pink: oklch(0.55 0.19 350);
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
}

/* 3. Roles -----------------------------------------------------------------
 * Listed under both selectors so a nested .dark area resolves them again.
 */

:root,
.dark {
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

Starwind uses shadcn's names plus a few of its own. Add this after `theme.css`. It has not been tested in a real Starwind project yet, so check the result against the Storybook.

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

## 7. Layout and components

Build pages from shadcn components (Button, Card, Badge, Tabs, Table, Accordion, Input, Empty, Item, Kbd…) plus these patterns.

| Pattern | Recipe |
| --- | --- |
| Container | `mx-auto w-full max-w-5xl px-6` |
| Page rhythm | `main`: `flex flex-col gap-24 md:gap-32 py-16 md:py-24` |
| Header | `border-b`, `h-16`, wordmark + small maker line (`by hmziq` / `by freeoxide`), ghost `sm` nav buttons in `text-muted-foreground`, one primary `sm` button |
| Hero | h1 + lede + primary `lg` button + outline `lg` button + optional one-line note (`text-sm text-muted-foreground`). Optional product preview on the right at `lg`. No code in the hero. |
| Section | h2 + one-sentence intro (`text-muted-foreground`), then content, `gap-10` |
| Feature grid | 2–3 columns; each item: an icon tile (section 8), `font-medium` title, `text-sm text-muted-foreground` body. All tiles in a grid are the same color. |
| Cards | shadcn Card; hover = `hover:border-primary/50` only |
| Stats / facts | `grid gap-px overflow-hidden rounded-xl border bg-border`, cells `bg-background p-6`, value `text-3xl font-medium tracking-tight` |
| Steps | Numbered only when the order is real. Same joined grid as stats, number in a `size-7 rounded-full bg-muted font-mono text-xs` circle |
| Code block | `rounded-xl border bg-(--code-background)`, optional file label bar `h-10 border-b font-mono text-xs text-muted-foreground`, `pre` with `p-4 font-mono text-sm`, highlighted with Shiki (section 2), copy button (ghost `icon-sm`, `Copy` → `Check`) in the label bar or top right. No copy button on code people only read. |
| Closing call to action | `rounded-2xl border bg-card p-8 md:p-12`, heading + one sentence + two buttons |
| Footer | link columns, then **"More from hmziq"**: a row linking every other hmziq site (section 11), then `© 2026 hmziq.` |

Buttons: one `default` (primary) button per view for the main action; `outline` for the second; `ghost` for navigation; `link` inside text. Labels say what happens ("Get started", "Read the blog", "Subscribe"). A link that looks like a button is a Base UI Button with `nativeButton={false} render={<a href="…" />}`.

Badges and tags: sentence case. Status is a soft **tag** in its role color with a dot for live states: `success` for "Shipped" / "Active", `warning` for "In progress", plain grey for "Planned" / "Coming soon". Blog categories are soft tags, one color per category. Tech names and topic lists are `outline` or `secondary` badges, never colored.

Links to GitHub: an outline button with the GitHub logo from Simple Icons before the label.

Icons: see section 6.

### Landing page template

1. Header
2. Hero: the outcome for the reader, one-paragraph lede, two buttons, optional note
3. Optional product preview (a real screenshot or a small mock built from components)
4. Features: 6–8 items with icons
5. How it works: steps, only if it really is a sequence
6. Details: code sample (developer products only), table, tabs
7. Closing call to action
8. Footer with "More from hmziq"

---

## 8. Custom components

### First, try not to build one

1. Use a shadcn component as it is.
2. Adjust it with classes.
3. Put shadcn components together into a page block (Hero, Section, FeatureGrid…).
4. Only then write a new component, with the rules below.

### Where things live (in a React site; mirror it elsewhere)

| Folder | What | Rule |
| --- | --- | --- |
| `components/ui` | shadcn components | Keep as shadcn ships them. The only edit: remove hover/press movement. |
| `components/brand` | small brand pieces (Tag, IconTile, Notice, CodeBlock, BrandIcon) | Tokens only. Copy them from the brand repo's `src/components/brand`. |
| `sites/shared` or `components/site` | page blocks (SiteShell, Hero, Section, FeatureGrid, Steps, CtaBand) | Same on every site. |
| pages | one per route | Put blocks together; no new styles. |

### The rules

| | Rule |
| --- | --- |
| Color | Tokens only. Surfaces: `bg-background` page, `bg-card` raised, `bg-muted` quiet. Supporting colors per section 4. |
| Lines | 1px `border`. Between items `divide-y` or a `gap-px` grid on `bg-border`. Never two borders side by side. |
| Corners | `rounded-md` controls and icon tiles, `rounded-xl` cards and panels, `rounded-2xl` large bands, `rounded-full` dots and tags. |
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
| Tag dot | `size-1.5 shrink-0 rounded-full bg-current`, before the label, for live states |
| Status dot with text | `size-2 rounded-full bg-success` + the words in `text-sm text-muted-foreground` |
| Icon tile | `flex size-9 items-center justify-center rounded-md [&_svg]:size-4.5` + `border bg-card text-primary` (default), or a tone's soft fill without the border when the color means something |
| Notice | shadcn Alert with `role="note"` + `border-warning/40 *:[svg]:text-warning` (`/30` for info, success, destructive). Icons: `Info`, `CircleCheck`, `TriangleAlert`, `OctagonAlert`. Title and text stay in the normal text colors. |
| Company logo | inline `<svg viewBox="0 0 24 24" fill="currentColor" class="size-3.5 shrink-0" aria-hidden="true">` with the Simple Icons path |
| Code block | see section 7 |

### Before it ships

1. It has a story (or a demo page) showing every tone and variant.
2. Checked in dark and in light.
3. axe reports no violations.
4. No hover/press movement, no colors outside the tokens.
5. If other sites need it, its recipe is added here.

---

## 9. Motion

- Buttons, cards, links, tabs and menu items **never move, lift, shrink, grow or rotate** on hover, press or focus. No `translate-*`, `scale-*` or `rotate-*` under `hover:`, `active:`, `focus:` or `pressed` variants.
- Feedback is color only: background, border, underline or the focus ring.
- Things that open and close (dialogs, drawers, menus, popovers, toasts) may fade and slide in. Once on screen they stay put.
- Switch thumbs slide; that is the control working, not drift.
- shadcn's Button ships with `active:not-aria-[haspopup]:translate-y-px`. Remove it.
- Respect `prefers-reduced-motion`.

Check (from the brand repo): `pnpm check:motion`, or search the code for `(hover|active|focus|pressed)[^ ]*:-?(translate|scale|rotate)-`.

---

## 10. Writing

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

## 11. The sites

Every site's footer links to all the others under "More from hmziq". Approved headlines:

| Site | URL | Headline |
| --- | --- | --- |
| hmziq (personal) | https://hmziq.rs | I build apps for phones, computers, the web and the terminal. |
| Blog | https://blog.hmziq.rs | Notes from building software. |
| Labs | https://hmziq.xyz | Experiments, in the open. |
| freeoxide | https://freeoxide.com | Free Rust tools, finished before they ship. |
| gpui-starter | https://gpui-starter.freeoxide.com | Start your desktop app with the boring parts done. |
| gpui-query | https://gpui-query.freeoxide.com | Load data in GPUI apps without writing the plumbing. |
| claude-multi | https://claude-multi.hmziq.xyz | Use Claude Code with any AI provider. |
| oxlabs | https://oxlabs.dev | Web, mobile and desktop apps, built and shipped by a small team. |

Maker lines next to the wordmark: `by hmziq` (blog, labs, freeoxide, claude-multi), `by freeoxide` (gpui-starter, gpui-query), `studio` (oxlabs). hmziq.rs has none.

---

## 12. Never do this

These made the old sites look like every other developer site:

- Near-black page with one neon accent (lime, hot pink, electric blue).
- Fake terminal or code windows, boot logs or "LIVE" panels in the hero.
- Spaced-out uppercase mono labels (`// CAPABILITIES`, `SENIOR SOFTWARE ENGINEER`).
- Wide, condensed, stencil, heavy (700+) or novelty display fonts. Handwriting fonts.
- Background textures, noise, starfields, glows, gradients, tinted greys.
- Per-site color schemes, theme switchers with many palettes, or more than one brand color.
- Hover lift, press nudge, scale on hover.
- Version numbers, star counts or tech-stack lists as the first thing a visitor reads.
- Emoji as icons or bullet markers. A second icon set, or filled icons.
- A rainbow: a different color per feature, card or nav item when the colors mean nothing.
- Solid fills in any color but orange behind text (solid green badges, blue buttons).
- Colored paragraphs, tinted notice boxes, colored card or section backgrounds.
- Tailwind's numbered palette (`bg-green-500`) or hex values in components.

---

## 13. Migration checklist

For each existing site:

1. **Inventory.** List every page, its real content, its components, and every color and font in use.
2. **Stack.** Tailwind v4, the main stylesheet and `theme.css` from section 2. Remove old fonts, color variables, theme switchers and textures.
3. **Map colors to tokens.** Every color becomes a token utility (`bg-background`, `text-foreground`, `text-muted-foreground`, `border-border`, `bg-card`, `bg-primary`…). No hex values in components.
4. **Components.** Replace hand-made UI with shadcn components (Base UI, Vega). Remove hover/press transforms. Statuses become soft tags in their role color; feature icons go in icon tiles.
5. **Icons and code.** Swap every icon to Lucide (section 6's table), logos to Simple Icons, and highlight code with Shiki and the `--code-*` tokens (section 2).
6. **Copy.** Rewrite the headline, intro and buttons under section 10. Keep facts and numbers exactly as they were.
7. **Structure.** Header, hero, sections and footer per section 7. Add the "More from hmziq" row.
8. **Dark default.** `<html class="dark">`, with light mode working too.
9. **Check.**
   - Contrast: run axe (e.g. Storybook's accessibility panel or `@axe-core`) in dark and light. Zero `color-contrast` failures.
   - Motion: no transforms on hover/press/focus.
   - Colors: no Tailwind numbered palette, hex values or `bg-white`/`bg-black` outside shadcn's own files. Search for `(bg|text|border|ring|fill|stroke)-(red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|slate|gray|zinc|neutral|stone)-[0-9]` and `#[0-9a-fA-F]{6}`.
   - Screenshots at 1280px and 390px wide, dark and light.
   - Compare against the matching page in the brand Storybook ("Sites").
