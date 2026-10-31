import type { Meta } from '$studio/types';
export const meta: Meta = {
	title: 'freeoxide · Light first',
	group: 'voidzero',
	kind: 'landing',
	product: 'freeoxide',
	inspiredBy: ['voidzero', 'framer'],
	moves: [
		'voidzero/top-nav',
		'voidzero/material-ink',
		'voidzero/plate-stack',
		'voidzero/mode-band',
		'voidzero/material-code-panel',
		'voidzero/giant-counter',
		'voidzero/updates-rail',
		'voidzero/material-strip-cta',
		'voidzero/material-wordmark-footer'
	],
	breaks: ['no-hover-motion', 'outline-only-cards', 'orange-only-fill'],
	notes: 'Built for light mode: white page, a split hero with a stack of four project plates in four materials, a 2×2 bento of material panels, one dark band for the five review rounds, and a vivid oxide closing band with near-black ink. Check light a/b/c.',
	order: 3
};
