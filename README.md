# hmziq brand

The shared look for every hmziq site: one theme, one set of fonts, one set of writing rules, all shown in a Storybook.

- **Theme**: [`theme.css`](./theme.css). Tailwind v4 + shadcn/ui tokens, dark by default, oxide orange as the only brand color.
- **Type**: Onest for everything people read, JetBrains Mono for code. Both self-hosted via Fontsource.
- **Components**: every shadcn/ui component (Base UI, Vega style), each with stories from the Base UI edition of the [shadcn Storybook Registry](https://registry.lloydrichards.dev/).
- **Guidelines**: the `Brand` section in Storybook (colors, typography, writing, motion).
- **Brand kit**: [`BRAND.md`](./BRAND.md), the whole brand in one file for AI agents doing migrations and redesigns. Also served at `/BRAND.md` on the published Storybook.
- **Sites**: a landing page for every hmziq site (hmziq.rs, blog, labs, freeoxide, gpui-starter, gpui-query, claude-multi, oxlabs), built only from the theme and shadcn components. Source in `src/sites/`.

## Run it

```bash
pnpm install
pnpm storybook        # http://localhost:6006
```

Use the sun/moon switch in the Storybook toolbar to see light and dark.

Other scripts:

| Command | What it does |
| --- | --- |
| `pnpm build-storybook` | Static build into `storybook-static/` |
| `pnpm typecheck` | TypeScript check across components and stories |
| `pnpm check:motion` | Fails if anything moves on hover, press or focus (brand rule) |
| `pnpm check:brand-kit` | Fails if the copy of `theme.css` in `BRAND.md` is out of date (`pnpm brand-kit:sync` fixes it) |
| `pnpm lint` | oxlint |
| `pnpm dev` | Each site full-window at http://localhost:5173, picked by hash: `#freeoxide`, `#gpui-starter`, `#gpui-query`, `#claude-multi`, `#oxlabs`, `#blog`, `#labs` (default: hmziq) |

## Use the theme in a site

Install the fonts and shadcn's base CSS in the site:

```bash
pnpm add @fontsource-variable/onest @fontsource-variable/jetbrains-mono tw-animate-css shadcn
```

Then in the site's main stylesheet:

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";
@import "@fontsource-variable/onest";
@import "@fontsource-variable/jetbrains-mono";
@import "./theme.css";
```

Put `class="dark"` on `<html>` so dark is the default.

## Change the brand color

Edit `--primary` and `--primary-foreground` in both the `:root` (light) and `.dark` blocks of `theme.css`. `--ring`, `--chart-1` and the `--sidebar-*` primary values follow it. Every story updates on reload. Then run `pnpm brand-kit:sync` to update `BRAND.md`.

## Adding components and stories

```bash
pnpm dlx shadcn@latest add <component>             # a shadcn component
pnpm dlx shadcn@latest add @storybook/<name>-story # its stories from the registry
```

`components.json` points shadcn at `src/index.css`, so it never edits `theme.css`, and at the Base UI story registry. The registry stories are written for Next.js; `vite.config.ts` and `tsconfig.app.json` redirect `next/image` and `@storybook/nextjs-vite` so they run unchanged here.

## Publish on GitHub Pages

The workflow in `.github/workflows/storybook.yml` builds and deploys on every push to `main` or `master`.

1. Create a GitHub repo and push this project.
2. In the repo: **Settings → Pages → Source: GitHub Actions**.
3. Push again (or run the workflow by hand). The Storybook appears at `https://<user>.github.io/<repo>/`.
