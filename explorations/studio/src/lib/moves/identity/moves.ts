import type { Move } from '$studio/types';

const f = (name: string) => `src/lib/moves/identity/${name}.svelte`;

export const moves: Move[] = [
	{ id: 'identity/spot-one-person', axis: 'illustration', name: 'Spot: one person, all of it', file: f('spot-one-person'), notes: 'Hand-drawn SVG: a ring-faced maker at a desk, four devices orbiting, corroded oxide sun behind.' },
	{ id: 'identity/spot-four-surfaces', axis: 'illustration', name: 'Spot: four surfaces', file: f('spot-four-surfaces'), notes: 'Phone, laptop, browser, terminal on one shelf, each showing the same rings; offset oxide print behind the browser.' },
	{ id: 'identity/spot-five-rounds', axis: 'illustration', name: 'Spot: five review rounds', file: f('spot-five-rounds'), notes: 'A scribbled sheet passes through five ring hoops and comes out clean, stamped with the corroded square.' },
	{ id: 'identity/spot-lab-bench', axis: 'illustration', name: 'Spot: lab flask', file: f('spot-lab-bench'), notes: 'Flask of corroded oxide with ring and square bubbles, patina stipple; for labs/experiments.' },
	{ id: 'identity/rust-hatch', axis: 'texture', name: 'Rust hatch field', file: f('hatch-field'), notes: 'Diagonal hatch that spreads from a corner with a noisy corrosion edge; rust, patina or ink. Shares pattern defs with the spots.' },
	{ id: 'identity/square-punctuation', axis: 'type', name: '■ as punctuation', file: f('sq'), notes: 'The wordmark square ends headlines, replaces bullets, separates words; oxide, ink, hollow or hatched.' },
	{ id: 'identity/signature-headline', axis: 'type', name: 'Signature headline', file: f('signature-headline'), notes: 'Big Bricolage with Fraunces soft-italic swaps (or Newsreader light), always closed by the ■.' },
	{ id: 'identity/poster-stack', axis: 'type', name: 'Poster stack', file: f('poster-stack'), notes: 'Lines that fill the container width, condensed uppercase grotesk vs. italic serif, ■ inside the words.' },
	{ id: 'identity/fingerprint-card', axis: 'cards', name: 'Fingerprint project card', file: f('fingerprint-card'), notes: 'Each project gets rings + material + hex code from its name; tile, poster and ledger-row variants.' },
	{ id: 'identity/oxide-slab', axis: 'accent', name: 'Oxide slab', file: f('oxide-slab'), notes: 'Full-bleed solid oxide band with near-black text, ink hatch corrosion, room for a spot drawn in ink.' },
	{ id: 'identity/sign-off', axis: 'footer', name: 'Corroded sign-off', file: f('sign-off'), notes: 'Giant hmziq whose square is a corroded oxide plate with a rust-hatch shadow; quiet variant too.' }
];
