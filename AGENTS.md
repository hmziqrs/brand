# AGENTS.md — hard rules for every agent working in this repo

Read this file first. These rules bind every task here; the skills below bind on top of them.

## Mandatory skills (every agent, every role)

Before doing any work, read and follow both of these:

- `/Users/hmziq/.agents/skills/caveman/SKILL.md` — terse communication; all technical substance stays, fluff dies.
- `/Users/hmziq/.agents/skills/code-comments/SKILL.md` — zero comments by default; only public-API contract docs, SAFETY blocks, or a proven ≤2-line upstream-constraint note.

When driving a browser, also read and follow `/Users/hmziq/.zcode/skills/agent-browser/SKILL.md`.

## The React lab is gone

- The React design lab (`apps/lab/`) was deleted after the 100% Svelte port finished; its git history is the only record left. There is no React code to port from or compare against anymore.
- The kits are the reference now. The Svelte kit's Storybook is the piece reference; `pnpm compare` diffs Svelte against the Astro kit and the two boilerplates.

## Kit conventions

- Svelte 5 runes; stock ui comes from the shadcn-svelte CLI (Bits UI); lucide class on icons; `motion-reduce` on animations; the kit is never published (registry only).
- `packages/brand-svelte/src/lib/ui/button/button.svelte` must keep both brand changes: `data-variant` present, no `translate-y-px`. The CLI can revert them — re-verify after any CLI add.
- Every Svelte story file must belong to a roster entry in `scripts/pieces.json` (`scripts/check-parity.mjs` fails on any story outside the roster). Read `scripts/pieces.schema.json` before editing the roster.
- Kit rules: `docs/kits.md` and `packages/brand-svelte/README.md`. The port behavior contract (shared localStorage keys `hmziq-lattice-tweaks` / `hmziq-ring-tweaks` / `hmziq-logo-tweaks`, paste clamping, merge-only paste semantics, `CSS.supports('color', …)` validation, browser-guarded canvas probes, `URL.createObjectURL` downloads, pause/seed controls) is 1:1 with what the old lab shipped — keep it that way.

## Verification

- Gates live in the root `package.json`; `pnpm check` chains them. Never invent a gate; never pass `--fix`/`--write` to a gate.
- `pnpm compare` needs all four servers up: kit Storybook 6007, astro gallery 4321, svelte-app 5173, astro-app 4322.

## Presentation parity rules (learned from the brand-docs drift)

- **1:1 includes presentation.** Content parity (same words) and presentation parity (same computed styles against the rendered reference) are separate acceptance criteria; both are required, checked in the same round as the change.
- **When rebuilding a surface rendered by a system the kit lacks** (e.g. Storybook addon-docs), extract that system's styling wholesale first — measured from the rendered reference or read from its stylesheets — before writing any markup. Never rebuild a look property-by-property from complaints.
- **Rebuilt surfaces have no twin to diff against** — they are the highest drift risk. Any page whose shell/layout an agent designs (rather than copies) needs measured extraction from the rendered reference or explicit owner sign-off on the design.
- **Vision/audit runs must diff rendered twins kit-vs-kit**, not just confirm "renders without errors." Unstyled-but-loading is a failure.

## Git discipline

- Explicit paths only in `git add`/`git commit`; never `git add -A`; never `--no-verify`; never push. One logical unit per commit, size-budgeted; match `git log` style.
- Working branch: `master` (the repo commits directly to it; `docs-implementation` no longer exists).
