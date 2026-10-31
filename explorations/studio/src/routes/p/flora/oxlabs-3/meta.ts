import type { Meta } from '$studio/types';

export const meta: Meta = {
	title: 'oxlabs — maximal material',
	group: 'flora',
	kind: 'landing',
	product: 'oxlabs',
	inspiredBy: ['flora', 'dovetail'],
	moves: [
		'flora/float-nav',
		'flora/rust-grid-field',
		'flora/serif-italic-headline',
		'flora/word-stack',
		'flora/app-window',
		'flora/node-flow',
		'flora/swatch-tile',
		'flora/glass-stage',
		'flora/dither-footer'
	],
	breaks: ['no-hover-motion', 'single-typeface', 'orange-only-fill', 'outline-only-cards'],
	notes: 'Everything moves: a live oxide shader burns through a veil of grid cells under the cursor, a cycling outlined word stack swaps app mocks, pulsing flow wires, liquid glass, and a footer wordmark that keeps rusting.',
	order: 3
};
