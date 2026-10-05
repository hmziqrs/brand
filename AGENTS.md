# AGENTS.md — hard rules for every agent working in this repo

Read this file first. These rules bind every task here; the skills below bind on top of them.

## Mandatory skills (every agent, every role)

Before doing any work, read and follow both of these:

- `/Users/hmziq/.agents/skills/caveman/SKILL.md` — terse communication; all technical substance stays, fluff dies.
- `/Users/hmziq/.agents/skills/code-comments/SKILL.md` — zero comments by default; only public-API contract docs, SAFETY blocks, or a proven ≤2-line upstream-constraint note.

When driving a browser, also read and follow `/Users/hmziq/.zcode/skills/agent-browser/SKILL.md`.

## Freeze: apps/lab is read-only

- NOTHING under `apps/lab/` gets deleted or modified — source, config and assets alike.
- Exempt from the freeze (generated build output only): `apps/lab/storybook-static/` and `apps/lab/dist/`. Only builds may rewrite them.
- The lab is the frozen manual-verification reference. The kit Storybook serves its build at `/lab`.

## Migration work is additive Svelte

- Migration work only adds files under `packages/brand-svelte/` (plus roster/scripts entries a plan names). It never edits or deletes lab files.
- **Active directive: port 100% of the remaining React content to Svelte** — the five SaaS templates and their SaaS-only blocks, the site landing/page fullscreen stories, the remaining stock-ui stories, and the brand-guidelines content. This supersedes the "reference-only" rows in `docs/lab-to-svelte-migration-plan.md`; `apps/lab` stays untouched as the frozen reference until every row is ported.
- Kit rules: `docs/kits.md` and `packages/brand-svelte/README.md`.
- Port lab behavior 1:1, edge cases included: shared localStorage keys (`hmziq-lattice-tweaks`, `hmziq-ring-tweaks`, `hmziq-logo-tweaks`) so lab-saved settings carry over, paste clamping to the same ranges, merge-only paste semantics, `CSS.supports('color', …)` validation, browser-guarded canvas probes, `URL.createObjectURL` downloads, pause/seed controls.

## Kit conventions

- Svelte 5 runes; stock ui comes from the shadcn-svelte CLI (Bits UI); lucide class on icons; `motion-reduce` on animations; the kit is never published (registry only).
- `packages/brand-svelte/src/lib/ui/button/button.svelte` must keep both brand changes: `data-variant` present, no `translate-y-px`. The CLI can revert them — re-verify after any CLI add.
- Every Svelte story file must belong to a roster entry in `scripts/pieces.json` (`scripts/check-parity.mjs` fails on any story outside the roster). Read `scripts/pieces.schema.json` before editing the roster.

## Verification

- Gates live in the root `package.json`; `pnpm check` chains them. Never invent a gate; never pass `--fix`/`--write` to a gate.
- `pnpm compare` needs all five servers up: lab Storybook 6006, kit Storybook 6007, astro gallery 4321, svelte-app 5173, astro-app 4322.

## Git discipline

- Explicit paths only in `git add`/`git commit`; never `git add -A`; never `--no-verify`; never push. One logical unit per commit, size-budgeted; match `git log` style.
- Working branch: `docs-implementation`.
