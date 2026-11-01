import type { Meta } from '$studio/types';

export const meta: Meta = {
	title: 'Framer study · Pricing',
	group: 'site-framer',
	kind: 'product',
	product: 'kiln (stand-in site builder)',
	inspiredBy: ['framer', 'hex', 'linear'],
	moves: [
		'site-framer/site-header',
		'site-framer/section-head',
		'site-framer/growth-dots',
		'site-framer/pricing-tiers',
		'site-framer/iso-stack',
		'site-framer/proof-strip',
		'site-framer/compare-table',
		'site-framer/prompt-box',
		'site-framer/site-footer',
		'flora/rust-grid-field'
	],
	breaks: ['outline-only-cards', 'no-hover-motion'],
	notes: 'Full-width hero over a cursor-lit dot field whose columns climb like a growing site; separate tier cards each topped by an iso stack of site slabs that grows with the plan (Pro solid oxide); roomy compare table with a sticky plan-card header.',
	order: 5
};
