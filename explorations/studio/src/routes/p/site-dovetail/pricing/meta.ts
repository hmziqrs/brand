import type { Meta } from '$studio/types';

export const meta: Meta = {
	title: 'Dovetail study · Pricing',
	group: 'site-dovetail',
	kind: 'product',
	product: 'contextline (stand-in)',
	inspiredBy: ['dovetail'],
	moves: [
		'site-dovetail/site-header',
		'flora/rust-grid-field',
		'dovetail/mono-chip',
		'site-dovetail/accent-headline',
		'site-dovetail/tier-cards',
		'site-dovetail/ring-glyph',
		'site-dovetail/source-strip',
		'site-dovetail/compare-table',
		'site-dovetail/faq-split',
		'site-dovetail/proof-crowd',
		'site-dovetail/site-footer'
	],
	breaks: ['single-typeface', 'outline-only-cards'],
	notes: 'dovetail.com/pricing in our kit: cursor-painted grid hero, three separate tier cards with art heads (ring, material, solid oxide) and a billing toggle, a comparison table whose sticky header carries each tier’s price and CTA over a full-height oxide column, split FAQ.',
	order: 2
};
