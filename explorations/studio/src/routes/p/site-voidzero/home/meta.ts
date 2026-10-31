import type { Meta } from '$studio/types';
export const meta: Meta = {
	title: 'VoidZero study · home',
	group: 'site-voidzero',
	kind: 'landing',
	product: 'bloomery',
	inspiredBy: ['voidzero'],
	moves: [
		'site-voidzero/site-header',
		'site-voidzero/grid-hero',
		'site-voidzero/hover-grid',
		'voidzero/plate-stack',
		'voidzero/material-ink',
		'voidzero/mode-band',
		'site-voidzero/logo-marquee',
		'site-voidzero/tool-rail',
		'site-voidzero/material-window',
		'voidzero/giant-counter',
		'site-voidzero/backer-grid',
		'site-voidzero/featured-updates',
		'site-voidzero/post-card',
		'site-voidzero/post-cover',
		'site-voidzero/site-footer'
	],
	breaks: ['no-hover-motion', 'outline-only-cards'],
	notes: 'voidzero.dev home rebuilt in our kit: same section order (stack hero, frameworks strip, dark open-source rail, counter, mission band, backers, updates, newsletter footer) with oxide materials and cursor-reactive hero, panels and footer strip.',
	order: 1
};
