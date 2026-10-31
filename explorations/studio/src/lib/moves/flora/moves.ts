import type { Move } from '$studio/types';

export const moves: Move[] = [
	{
		id: 'flora/serif-italic-headline',
		axis: 'type',
		name: 'Serif italic word in a sans headline',
		file: 'src/lib/moves/flora/serif-italic-headline.svelte',
		notes: 'Onest headline with one word set in Instrument Serif / Fraunces / Newsreader italic; tone foreground, oxide or oxide underline.'
	},
	{
		id: 'flora/rust-grid-field',
		axis: 'texture',
		name: 'Rust grid hover field',
		file: 'src/lib/moves/flora/rust-grid-field.svelte',
		notes: 'Absolute canvas grid behind a hero: cells oxidize under the cursor, rust spreads to neighbours and fades to a verdigris stain. Paint or reveal mode; static patina for reduced motion.'
	},
	{
		id: 'flora/app-window',
		axis: 'illustration',
		name: 'Mock app windows',
		file: 'src/lib/moves/flora/app-window.svelte',
		notes: 'Phone, desktop, web and terminal mocks with real UI copy and a shader swatch as the "photo"; our stand-in for Flora\'s floating images.'
	},
	{
		id: 'flora/swatch-tile',
		axis: 'cards',
		name: 'Framed material swatch tile',
		file: 'src/lib/moves/flora/swatch-tile.svelte',
		notes: 'Project tile: a framed shader swatch that drifts and zooms on hover, arrow chip turns oxide, optional art on top.'
	},
	{
		id: 'flora/lift-card',
		axis: 'cards',
		name: 'Rust-fill lift card',
		file: 'src/lib/moves/flora/lift-card.svelte',
		notes: 'Service card that lifts while an oxide fill with grain rises from the bottom; editorial variant is a ruled row with a growing oxide rule.'
	},
	{
		id: 'flora/node-flow',
		axis: 'section',
		name: 'Node flow-chart with real cards',
		file: 'src/lib/moves/flora/node-flow.svelte',
		notes: 'Brief → design → build → ship as cards on a dotted canvas, joined by measured bezier wires with running dashes and pulses; board or line layout.'
	},
	{
		id: 'flora/glass-stage',
		axis: 'section',
		name: 'Full-height material + glass panel',
		file: 'src/lib/moves/flora/glass-stage.svelte',
		notes: '100svh section on a slowly drifting ShaderMaterial with a frost, smoke or liquid-glass reading panel.'
	},
	{
		id: 'flora/dither-footer',
		axis: 'footer',
		name: 'Dark material footer with dithered wordmark',
		file: 'src/lib/moves/flora/dither-footer.svelte',
		notes: 'Always-dark footer on a shader material, white readable links, and a giant Bayer-dithered wordmark that rusts under the cursor (optionally creeping).'
	},
	{
		id: 'flora/float-nav',
		axis: 'nav',
		name: 'Floating glass pill nav',
		file: 'src/lib/moves/flora/float-nav.svelte',
		notes: 'Sticky wordmark + links + oxide CTA, as a clear-glass pill or a plain ruled bar.'
	},
	{
		id: 'flora/word-stack',
		axis: 'motion',
		name: 'Outlined word stack',
		file: 'src/lib/moves/flora/word-stack.svelte',
		notes: 'Giant list of outlined words; the active one fills solid, turns serif italic and gains the oxide square, cycling on its own or on hover.'
	}
];
