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
| Color | shadcn **neutral** greys (no tint) plus one brand color: **oxide orange** as `--primary`. |
| Mode | **Dark by default** (`<html class="dark">`). Light mode must also work. |
| Radius | `--radius: 0.625rem`. |
| Motion | Nothing moves on hover, press or focus. Feedback is color only. |
| Words | Plain language for people, not jargon for developers. |
| Readability | Every text/background pair passes WCAG AA (4.5:1) in both modes. |

---

## 2. Install the theme in a site

### Packages

```bash
pnpm add tailwindcss @tailwindcss/vite tw-animate-css shadcn \
  @fontsource-variable/onest @fontsource-variable/jetbrains-mono
```

(Use the Tailwind integration that fits the framework, e.g. `@tailwindcss/vite` for Vite, Astro and SvelteKit.)

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
- After adding any shadcn component, **remove `active:translate-y-px`** (and any other hover/press transform) from it. See section 7.

### Per framework

- **React (Vite, Next.js, TanStack Start):** use shadcn/ui as above.
- **Svelte / SvelteKit:** shadcn-svelte uses the same token names, so `theme.css` works as is. Apply the same motion and writing rules.
- **Astro:** either render shadcn React components as islands, or use **Starwind UI** (Astro-native, shadcn-style). Starwind needs a few extra tokens; see section 3.1.
- **Dioxus or anything else with Tailwind v4:** load the same stylesheet and use the same utility classes (`bg-primary`, `text-muted-foreground`, …). Rebuild components by copying the classes from the shadcn source in the brand repo (`src/components/ui/*.tsx`).

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
 * Greys are shadcn "neutral" (zero chroma, no tint). The only brand color is
 * --primary ("oxide" orange); everything else is neutral. To retheme, change
 * --primary / --primary-foreground (and the rings and chart-1 that follow it)
 * in both blocks.
 */

@custom-variant dark (&:is(.dark *));

:root {
  --radius: 0.625rem;

  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);

  /* oxide, light: #B05400. White text on it 4.9:1, as link text on white 5.1:1 */
  --primary: oklch(0.55 0.142 52);
  --primary-foreground: oklch(0.985 0 0);

  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  /* shadcn ships 0.556; 0.54 keeps grey text readable on muted surfaces too (4.6:1) */
  --muted-foreground: oklch(0.54 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.55 0.142 52);

  --chart-1: oklch(0.55 0.142 52);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);

  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.55 0.142 52);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.55 0.142 52);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.205 0 0);
  --popover-foreground: oklch(0.985 0 0);

  /* oxide, dark: #F38230. Dark text on it 7.6:1, as link text on background 7.6:1 */
  --primary: oklch(0.72 0.165 52);
  --primary-foreground: oklch(0.145 0 0);

  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.72 0.165 52);

  --chart-1: oklch(0.72 0.165 52);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);

  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.72 0.165 52);
  --sidebar-primary-foreground: oklch(0.145 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.72 0.165 52);
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
  --error-foreground: oklch(0.985 0 0);
  --outline: var(--ring);
  --sidebar-background: var(--sidebar);
  --sidebar-outline: var(--sidebar-ring);
  --info: var(--color-sky-300);
  --info-foreground: var(--color-sky-950);
  --success: var(--color-green-300);
  --success-foreground: var(--color-green-950);
  --warning: var(--color-amber-300);
  --warning-foreground: var(--color-amber-950);
}
```

---

## 4. Color

**Oxide orange** is the only brand color. It is `--primary`, in two tuned shades:

| | Dark mode | Light mode |
| --- | --- | --- |
| `--primary` | `oklch(0.72 0.165 52)` · `#F38230` | `oklch(0.55 0.142 52)` · `#B05400` |
| `--primary-foreground` | `oklch(0.145 0 0)` (near-black text) | `oklch(0.985 0 0)` (white text) |

Use `primary` for: the one main action on a view, links, the focus ring, small highlights (an "Active" badge, an icon, a hovered card border at `/50`).

Never use it for: large backgrounds, body text, more than one main button per view, or decoration.

In shadcn, `accent` is the grey hover surface. It is **not** the brand color.

Neutrals are shadcn neutral with zero chroma. The only change: light `--muted-foreground` is `0.54` (shadcn ships `0.556`), so grey text stays readable on grey surfaces.

| Token | Dark | Light | Use |
| --- | --- | --- | --- |
| `background` | `#0A0A0A` | `#FFFFFF` | page |
| `card` / `popover` | `#171717` | `#FFFFFF` | raised surfaces |
| `muted` / `secondary` / `accent` | `#262626` | `#F5F5F5` | quiet surfaces, hover states, code blocks |
| `foreground` | `#FAFAFA` | `#0A0A0A` | main text |
| `muted-foreground` | `#A1A1A1` | `#6F6F6F` | secondary text, captions, dates |
| `border` / `input` | white 10% / 15% | `#E5E5E5` | lines and fields |
| `destructive` | `#FF6467` | `#E7000B` | deleting and errors only |

Measured contrast (all pass AA):

| Pair | Dark | Light |
| --- | --- | --- |
| Body text on page | 19.0:1 | 19.8:1 |
| Secondary text on page | 7.6:1 | 5.1:1 |
| Secondary text on muted surface | 5.8:1 | 4.6:1 |
| Button text on primary | 7.6:1 | 4.9:1 |
| Primary links on page | 7.6:1 | 5.1:1 |

Do not add: background tints, gradients, glows, a second brand color, per-site accent colors, or colored section backgrounds. To rebrand later, change only `--primary`, `--primary-foreground`, `--ring`, `--chart-1` and the `--sidebar-primary*` / `--sidebar-ring` lines in both blocks.

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

## 6. Layout and components

Build pages from shadcn components (Button, Card, Badge, Tabs, Table, Accordion, Input, Empty, Item, Kbd…) plus these patterns.

| Pattern | Recipe |
| --- | --- |
| Container | `mx-auto w-full max-w-5xl px-6` |
| Page rhythm | `main`: `flex flex-col gap-24 md:gap-32 py-16 md:py-24` |
| Header | `border-b`, `h-16`, wordmark + small maker line (`by hmziq` / `by freeoxide`), ghost `sm` nav buttons in `text-muted-foreground`, one primary `sm` button |
| Hero | h1 + lede + primary `lg` button + outline `lg` button + optional one-line note (`text-sm text-muted-foreground`). Optional product preview on the right at `lg`. No code in the hero. |
| Section | h2 + one-sentence intro (`text-muted-foreground`), then content, `gap-10` |
| Feature grid | 2–3 columns; each item: icon in `size-9 rounded-md border bg-card text-primary` box, `font-medium` title, `text-sm text-muted-foreground` body |
| Cards | shadcn Card; hover = `hover:border-primary/50` only |
| Stats / facts | `grid gap-px overflow-hidden rounded-xl border bg-border`, cells `bg-background p-6`, value `text-3xl font-medium tracking-tight` |
| Steps | Numbered only when the order is real. Same joined grid as stats, number in a `size-7 rounded-full bg-muted font-mono text-xs` circle |
| Code block | `rounded-xl border bg-card`, optional file label bar `border-b font-mono text-xs text-muted-foreground`, `pre` with `p-4 font-mono text-sm` |
| Closing call to action | `rounded-2xl border bg-card p-8 md:p-12`, heading + one sentence + two buttons |
| Footer | link columns, then **"More from hmziq"**: a row linking every other hmziq site (section 9), then `© 2026 hmziq.` |

Buttons: one `default` (primary) button per view for the main action; `outline` for the second; `ghost` for navigation; `link` inside text. Labels say what happens ("Get started", "Read the blog", "Subscribe"). A link that looks like a button is a Base UI Button with `nativeButton={false} render={<a href="…" />}`.

Badges: sentence case. `secondary` for categories and "Shipped", `outline` for "In progress" / "Planned" / tech names, `default` (orange) only for one highlighted state like "Active".

Icons: lucide, 16–18px, stroke style, in `text-primary` inside feature boxes, otherwise `text-muted-foreground`. No emoji as icons or section markers.

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

## 7. Motion

- Buttons, cards, links, tabs and menu items **never move, lift, shrink, grow or rotate** on hover, press or focus. No `translate-*`, `scale-*` or `rotate-*` under `hover:`, `active:`, `focus:` or `pressed` variants.
- Feedback is color only: background, border, underline or the focus ring.
- Things that open and close (dialogs, drawers, menus, popovers, toasts) may fade and slide in. Once on screen they stay put.
- Switch thumbs slide; that is the control working, not drift.
- shadcn's Button ships with `active:not-aria-[haspopup]:translate-y-px`. Remove it.
- Respect `prefers-reduced-motion`.

Check (from the brand repo): `pnpm check:motion`, or search the code for `(hover|active|focus|pressed)[^ ]*:-?(translate|scale|rotate)-`.

---

## 8. Writing

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

## 9. The sites

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

## 10. Never do this

These made the old sites look like every other developer site:

- Near-black page with one neon accent (lime, hot pink, electric blue).
- Fake terminal or code windows, boot logs or "LIVE" panels in the hero.
- Spaced-out uppercase mono labels (`// CAPABILITIES`, `SENIOR SOFTWARE ENGINEER`).
- Wide, condensed, stencil, heavy (700+) or novelty display fonts. Handwriting fonts.
- Background textures, noise, starfields, glows, gradients, tinted greys.
- Per-site color schemes, theme switchers with many palettes, or more than one brand color.
- Hover lift, press nudge, scale on hover.
- Version numbers, star counts or tech-stack lists as the first thing a visitor reads.
- Emoji as icons or bullet markers.

---

## 11. Migration checklist

For each existing site:

1. **Inventory.** List every page, its real content, its components, and every color and font in use.
2. **Stack.** Tailwind v4, the main stylesheet and `theme.css` from section 2. Remove old fonts, color variables, theme switchers and textures.
3. **Map colors to tokens.** Every color becomes a token utility (`bg-background`, `text-foreground`, `text-muted-foreground`, `border-border`, `bg-card`, `bg-primary`…). No hex values in components.
4. **Components.** Replace hand-made UI with shadcn components (Base UI, Vega). Remove hover/press transforms.
5. **Copy.** Rewrite the headline, intro and buttons under section 8. Keep facts and numbers exactly as they were.
6. **Structure.** Header, hero, sections and footer per section 6. Add the "More from hmziq" row.
7. **Dark default.** `<html class="dark">`, with light mode working too.
8. **Check.**
   - Contrast: run axe (e.g. Storybook's accessibility panel or `@axe-core`) in dark and light. Zero `color-contrast` failures.
   - Motion: no transforms on hover/press/focus.
   - Screenshots at 1280px and 390px wide, dark and light.
   - Compare against the matching page in the brand Storybook ("Sites").
