# Studio brief — round 1 (wide)

You are one of several agents building **whole-page design variants** for the hmziq brand inside this SvelteKit app (`explorations/studio`). The owner will star / keep / nuke every page and every *move*, then we mix the winners in round 2. Breadth and real taste matter more than polish on any one page, but every page must look finished, not like a wireframe.

## Why we are doing this

The kit (`packages/brand-svelte`, tokens in `packages/brand-core/theme.css`) is consistent but **generic**. Measured on our home page: one typeface (Onest), a 62px headline in a 464px column, nearly all body copy in muted grey at 14–16px, outline-only cards, faint rings as the only art. It reads like a shadcn template with an orange accent.

The owner's taste, from sites they love and hate:

- **Loves Dovetail**: huge white headlines (160px), a second expressive face (pixel serif) mixed *inside* headlines, odd 3D objects inline in headlines, ASCII digit-rain texture behind the hero and inside cards, the accent used as a **big solid card** (electric-blue quote card with ASCII over it), mono uppercase chips, orbit diagram, star ratings, a pre-footer where logos crowd around giant words.
- **Loves Flora**: serif italic word inside a sans headline, absolute grid-based hover background in the hero, motion on card hover, flow-chart nodes, full-height section with video + blurred glass, footer over a dark photographic/material background with a giant dithered wordmark.
- **Loves Northflank**: voxel/isometric accent art, dot-matrix pixel words ("run"), terminal chips, a loop diagram with a live counter, dithered/dotted footer field with a giant logo, mono labels, strong single accent.
- **VoidZero**: material shadows (we already borrowed), alternating light/dark bands, vivid gradient material panels beside product copy, giant counters.
- **Hex**: hand-made vector spot illustrations. Hates its tinted backgrounds and tinted grey text.
- **HeyClicky**: dislikes the look but respects that it has an unmistakable identity.
- **Framer**: good bento cards, but generic black.
- **Hates Linear**: no accent, grey text on dark that is a chore to read.
- **Hates our light mode**: oxide at `#AA530A` looks like brown leather. **Loves our dark mode.**

## What our own soul should be

Do NOT copy the pixel/ASCII aesthetic wholesale — all three loved sites share it; copying makes us one of them. Our ownable equivalents:

- **Oxide as a material.** The brand is literally oxidation. `ShaderMaterial` (`$brand/components/shader-material.svelte`) has 44 presets: `oxide-bloom cast-iron copper-sweep brushed-alloy folded-foil mineral-fault sediment woven-field caustic-glass etched-silk powder-coat optical-field porous-ceramic hammered-copper ink-diffusion frosted-glass terrazzo liquid-chrome wind-sand halftone-print porous-carbon hammered-silver chalk-diffusion black-ice salt-pepper liquid-ink chalk-dunes halftone-negative oxide-ink oxide-chalk white-sweep black-sweep endgrain-wood woven-linen carbon-twill pebbled-leather creased-paper scratched-enamel mica-flakes lava-fissures condensation interference-film embossed-labyrinth fibrous-paper`. Use `rendering="image"` by default (a baked poster, cheap); `rendering="live"` only for one hero moment. Rust grain / patina / corrosion spreading is our "ASCII".
- **Rings, lattice, the `■` square.** Rings (`$brand/components/rings.svelte`, `corner-rings`, `horizon-rings`, `scroll-rings`, `ring-*`), the 3D `scene.svelte` (lattice/network/layers/helix), the wordmark square. These can grow from faint decoration into hero art, inline headline objects, diagrams.
- **Oxide as a surface**, not a link color: solid oxide cards, bands, fields, with near-black text on vivid oxide.
- Kit sections already exist and are under-used: `blocks/sections/*` (backdrop-hero, wave-hero, bento-section, feature-bento, flow-section, orbit-section, showcase-section, testimonial-wall, band-section), `components/material-*` (material-card, -stage, -text, -tile, -rings, -gauge, -sparkline…), `glass`, `liquid-glass`, `glass-dock`, `bento`, `live-*`, `terminal-window`, `code-block`, `command-box`, `blocks/showcase/*` charts, `blocks/saas/*`. **Read the kit before inventing**; wrap or restyle kit pieces in your moves where possible.

## Quality bar (apply on every page)

1. The hero states the thesis big. Headlines 72–160px on desktop, wide containers (max-w 1200–1320px), not 464px columns.
2. **Fewer, bigger, whiter words.** Key sentences in `text-foreground` at 18–24px. Muted grey only for fine print (captions, meta). Never a wall of grey.
3. Put boldness in one or two places per page; keep the rest calm.
4. Text over shader/material always sits on a solid or glass reading panel or a strong scrim — never raw on texture.
5. Must work in **dark and light**, and in light with the oxide variants `a/b/c` (the studio bar switches them; `b`/`c` = vivid oxide fill with near-black text). Design dark-first but check light.
6. Responsive down to 400px wide; no horizontal scroll.
7. Real, specific copy about the product in the meta (see your assignment). No lorem ipsum. Write original copy — never lift text, logos, illustrations or assets from the reference sites; borrow structure and feel only.
8. No fake endorsements: no real company logos as "customers", no invented quotes attributed to real people or companies. Testimonials, if any, are labelled examples with invented names. Logos of tools the product *integrates with* (Simple Icons via `simple-icons` or `$brand/components/brand-icon.svelte`) are fine.
9. **Everything local.** The preview is published to a sandbox that blocks every external host: no remote images, fonts, videos, iframes or fetches. Art = shaders, SVG, canvas, CSS, kit components. No `<video>` with remote sources.
10. Motion: allowed and encouraged where it serves (hover reveals, ambient texture), always with `motion-reduce:` fallbacks / `prefers-reduced-motion`. The brand rule "nothing moves on hover" may be broken — but then list `no-hover-motion` in the page's `breaks`.

## Fonts available (already installed — do not add more)

Tailwind classes: `font-sans` (Onest, brand), `font-mono` (JetBrains Mono), `font-serif` (Instrument Serif, has italic), `font-fraunces` (Fraunces variable, italic), `font-newsreader` (Newsreader variable, italic), `font-bricolage` (Bricolage Grotesque), `font-space` (Space Grotesk), `font-inter-tight`, `font-geist-mono`, `font-pixel` (Silkscreen), `font-dot` (Doto, dot-matrix), `font-crt` (VT323).

## Colors

Only theme tokens: `background foreground card muted muted-foreground primary primary-foreground border` plus the brand palette `orange red yellow green teal blue purple pink` as Tailwind colors (`bg-orange`, `text-blue`, `bg-green/15`…), `--line`, `--band`, `--on-orange`, and studio extras `--oxide-vivid --oxide-ink --oxide-deep`. Derive anything else with `color-mix(in oklab, var(--token) X%, …)`. No raw hex/rgb literals except inside shader recipes.

## Code rules

- Svelte 5 runes, TypeScript. Icons from `@lucide/svelte/icons/<name>` with `class="lucide …"`. No code comments.
- Kit imports through `$brand/...` (e.g. `$brand/components/rings.svelte`, `$brand/ui/button/index.js`, `$brand/blocks/sections/feature-bento.svelte`). Your own moves through `$moves/<owner>/...`.
- Internal links must start with `#/` (hash router): `href="#/p/<owner>/<slug>"`. External links are fine.
- Do **not** edit anything outside your owned folders. Do **not** run `bun add`, `bun install`, `git` anything, or touch `package.json`/`bun.lock`. If you need something missing, build it yourself inside your folder or report it.
- Never edit the kit (`packages/`). Restyle via props/classes or wrap in your own move.

## Your folders (you own only these)

- Pages: `src/routes/p/<owner>/<slug>/+page.svelte` + `src/routes/p/<owner>/<slug>/meta.ts`
- Moves (reusable building blocks): `src/lib/moves/<owner>/*.svelte` (+ `.ts` helpers) and the registry `src/lib/moves/<owner>/moves.ts`

`meta.ts`:

```ts
import type { Meta } from '$studio/types';
export const meta: Meta = {
	title: 'Short name of this variant',
	group: '<owner>',
	kind: 'landing',            // landing | product | specimen | app | content
	product: 'claude-multi',
	inspiredBy: ['dovetail'],
	moves: ['<owner>/oxide-grain-hero', '<owner>/serif-accent-headline'],
	breaks: ['no-hover-motion'],  // brand rules this page breaks, if any
	notes: 'One sentence: what to judge on this page.',
	order: 1
};
```

`moves.ts`:

```ts
import type { Move } from '$studio/types';
export const moves: Move[] = [
	{ id: '<owner>/oxide-grain-hero', axis: 'hero', name: 'Oxide grain hero', file: 'src/lib/moves/<owner>/oxide-grain-hero.svelte', notes: 'What it is in one line.' }
];
```

Axes: `type texture accent hero layout cards illustration motion footer nav color section`. Make moves **granular and reusable with props** — the owner nukes at the move level, so one move = one idea (a headline treatment, a texture, a card style, a footer). Every page lists every move it uses. Pages within your set should mix moves differently so they are genuinely different options, not color swaps.

Brand-rule ids for `breaks`: `no-hover-motion`, `outline-only-cards`, `single-typeface`, `orange-only-fill`, `neutral-greys`, `dark-by-default`.

## Verify (required, per page)

Dev server is already running at `http://127.0.0.1:5180` (do not start another). After writing a page:

1. `cd /home/user/brand/explorations/studio && bunx svelte-check --tsconfig ./tsconfig.json --threshold error 2>&1 | grep -A3 "<owner>" | head -40` — fix errors in your files.
2. Screenshot and LOOK at it: `bun scripts/snap.mjs "http://127.0.0.1:5180/#/p/<owner>/<slug>" <outdir>/<slug>-dark.jpg dark 1` and `… light:b 1` (args: url, out, theme[:oxide], fullPage 0/1, width). Also one at width 400: `… dark 0 400`. Use the Read tool on the jpgs. Fix overlaps, unreadable text, empty regions, broken layout, console errors. Full-page shots of long pages are tall — that's fine.
3. Iterate until it looks like something a top studio would ship.

Use `<outdir>` = `/tmp/claude-0/-home-user-brand/e8d9d117-3591-5190-9941-249217f87da2/scratchpad/agents/<owner>`.

## Report back

A short list: each page path + title + the one thing that makes it distinct; each move id + one line. Mention anything you could not get working.
