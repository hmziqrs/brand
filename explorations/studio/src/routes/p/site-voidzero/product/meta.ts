import type { Meta } from '$studio/types';
export const meta: Meta = {
	title: 'VoidZero study · product',
	group: 'site-voidzero',
	kind: 'product',
	product: 'kiln',
	inspiredBy: ['voidzero'],
	moves: [
		'site-voidzero/site-header',
		'site-voidzero/hover-grid',
		'voidzero/material-ink',
		'site-voidzero/command-stage',
		'voidzero/mode-band',
		'site-voidzero/speed-bars',
		'voidzero/plate-stack',
		'site-voidzero/feature-tabs',
		'site-voidzero/material-window',
		'site-voidzero/framework-hub',
		'site-voidzero/site-footer'
	],
	breaks: ['no-hover-motion', 'outline-only-cards'],
	notes: 'The toolchain landing (their Vite+ site) rebuilt: hover-grid hero, a live copper stage with a typing terminal and command tabs, hairline feature cells, speed bars, sticky feature tabs over material windows, a hover-wired framework hub.',
	order: 5
};
