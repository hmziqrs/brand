import type { Meta } from '$studio/types';

export const meta: Meta = {
	title: 'Framer study · Pricing',
	group: 'site-framer',
	kind: 'product',
	product: 'kiln (stand-in site builder)',
	inspiredBy: ['framer'],
	moves: [
		'site-framer/site-header',
		'site-framer/section-head',
		'site-framer/pricing-tiers',
		'site-framer/proof-strip',
		'site-framer/compare-table',
		'site-framer/prompt-box',
		'site-framer/site-footer',
		'flora/rust-grid-field'
	],
	breaks: ['outline-only-cards', 'no-hover-motion'],
	notes: 'Framer’s pricing page with the Pro tier as a solid oxide column, a working billing switch and credit pickers that change the price, a sticky compare table and the kit FAQ list.',
	order: 5
};
