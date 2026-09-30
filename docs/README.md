# hmziq brand: master plan

**Status: planned, not started. Updated 2026-09-29.**

One brand kit that installs into every hmziq site and app, built for **SvelteKit and Astro**. This page is the index: what ships, the plans, the order of work and the open decisions. Each plan holds the detail.

## Who uses the brand

| Consumer | Framework |
| --- | --- |
| blog.hmziq.rs | Astro with Starwind UI |
| gpui-query.freeoxide.com | Astro with Starwind UI |
| gpui-starter.freeoxide.com | Astro with Starwind UI |
| claude-multi.hmziq.xyz | Astro with Starwind UI |
| freeoxide.com | SvelteKit with shadcn-svelte |
| oxlabs.dev | SvelteKit with shadcn-svelte |
| hmziq.rs | React today; moves to SvelteKit or Astro |
| hmziq.xyz (labs) | Dioxus: `theme.css` only, classes copied by hand |
| App sites (admin panels) | SvelteKit or Astro |
| New projects | Start from `svelte-app` or `astro-app` |

Every consumer lives in its own repo. So the brand has to install from outside this one.

## What ships

| Piece | What it is | How a site gets it |
| --- | --- | --- |
| `@hmziq/brand-core` | Everything not tied to a framework: theme, colors, logo recipe, rings, code theme, Markdown plugins, shared app logic | npm package |
| Svelte kit (`brand-svelte`) | Svelte 5 components on shadcn-svelte: brand pieces, site blocks, content-page blocks, app blocks | Copied in from its registry |
| Astro kit (`brand-astro`) | Astro components on Starwind UI: the same pieces and blocks | Copied in from its registry |
| `svelte-app`, `astro-app` | Starters with the theme, the kit, a landing page, content pages and the app demo | `pnpm new-project` |
| Generated assets | Logos, icons, social images, later video | Files per site |

Each kit is built on the library its sites already use: shadcn-svelte for SvelteKit, Starwind UI for Astro. Both are ported from the lab and share `brand-core`; neither depends on the other.

**React is not shipped.** The React code in this repo becomes `apps/lab`: the design lab where the brand was worked out (site pages, content pages, SaaS templates, tweakers, Storybook). It stays as the picture both kits have to match.

## The plans

| Plan | Covers |
| --- | --- |
| [structure.md](./structure.md) | The repo layout, `brand-core`, and moving the React code into `apps/lab` |
| [kits.md](./kits.md) | The Svelte kit, the Astro kit, the boilerplates, the pieces roster, the registries and publishing |
| [content-blocks.md](./content-blocks.md) | Blog, docs, changelog, FAQ, legal, contact and 404 blocks, and the shared Markdown setup |
| [app-blocks.md](./app-blocks.md) | Blocks for app screens (shell, settings, tables, sign-in, metrics), built in Svelte first, then in Astro from the contract |
| [assets.md](./assets.md) | Generated logos, icons, social images and video |

Reference documents at the repo root: `BRAND.md` (the brand rules) and `APP-BLOCKS.md` (the app-block contract, written during app-blocks.md). `scripts/pieces.json` lists every piece and where it lives in each kit (kits.md).

## Order of work

| # | Work | Plan | Starts after |
| --- | --- | --- | --- |
| 1 | Pull out `brand-core`; move the React code into `apps/lab` | structure.md, steps 0–2 | — |
| 2 | Svelte kit: brand pieces, site blocks, Storybook, `svelte-app` | kits.md, step 1 | 1 |
| 3 | Astro kit: brand pieces, site blocks, `astro-app` with its `/kit` gallery | kits.md, step 2 | 1 (can run alongside 2) |
| 4 | Publish `brand-core` and both registries; release both boilerplates | kits.md, step 3 | 2 and 3 |
| 5 | Content-page blocks and Markdown in both kits | content-blocks.md | 2 and 3 |
| 6 | App blocks in Svelte, the contract, and the demo in `svelte-app` | app-blocks.md, phases 0–9 | 2 |
| 7 | App blocks in Astro, and the same demo in `astro-app` | app-blocks.md, phase 10 | 3 and 6 |
| 8 | Generated assets | assets.md | 1 (any time after) |
| 9 | Decide the lab's future (see "Decisions") | — | 5 and 7 |

Content blocks come before app blocks because most of the sites are content sites. Moving each existing site onto a kit is separate work, done in that site's repo with BRAND.md section 14 once its kit is released.

## Rules for every plan

- The brand rules are in `BRAND.md`. Plans don't repeat them unless a step depends on one.
- A step is finished when its "Done when" list passes. The next step starts after that.
- "Matches" means side by side in the `pnpm compare` report, in light and dark, at 360px and 1280px.
- Every new piece goes into `scripts/pieces.json`; `check:parity` keeps the two kits and their registries in step.
- Work on a branch per plan (`structure`, `kits`, `content-blocks`, `app-blocks`, `assets`), with one commit per step.
- Before starting, commit or set aside any unrelated work, and merge any open branch. That's the user's call: ask, don't do it yourself.
- Write the way BRAND.md section 11 says: plain words, short sentences.

## Decisions

Asset decisions are in [assets.md](./assets.md). All others:

| Decision | Default | Needed before |
| --- | --- | --- |
| Open work before the restructure | Commit the logo tweaker work and merge the `tweakers` branch into `master` | Work item 1 |
| npm scope for `brand-core` | `@hmziq`, public; confirm the scope is available | Work item 4 |
| License for core and the kits | MIT | Work item 4 |
| How releases run | By hand: `changeset version`, the fresh-copy checks, `changeset publish`, deploy | Work item 4 |
| Interaction in the Astro kit | Starwind's own way; no React, Svelte or Vue islands | Work item 3 |
| Forms in `svelte-app` | Plain SvelteKit form actions with `use:enhance` and zod | Work item 6 |
| First sites to move onto the kits | One Astro site and one SvelteKit site, chosen after work item 4 | Migrations |
| Where hmziq.rs moves | SvelteKit or Astro | Migrating that site |
| The lab once both kits cover everything | Keep it frozen as the design record, or port its tweakers to Svelte and delete React | Work item 9 |
| Deploying sites from this repo | No. Only the Storybooks, the registries and the reference documents deploy from here | — |

## Status

| Plan | Status |
| --- | --- |
| structure.md | Not started |
| kits.md | Not started |
| content-blocks.md | Not started |
| app-blocks.md | Not started |
| assets.md | Not started |
