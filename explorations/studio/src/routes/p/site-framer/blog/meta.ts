import type { Meta } from '$studio/types';

export const meta: Meta = {
	title: 'Framer study · Blog',
	group: 'site-framer',
	kind: 'content',
	product: 'kiln (stand-in site builder)',
	inspiredBy: ['framer', 'linear'],
	moves: [
		'site-framer/site-header',
		'site-framer/section-head',
		'site-framer/post-feature',
		'site-framer/post-list',
		'site-framer/post-card',
		'site-framer/prompt-box',
		'site-framer/site-footer',
		'flora/rust-grid-field'
	],
	breaks: ['no-hover-motion'],
	notes: 'Material lead story with side cards, then the listing as separate interactive cards: covers that answer the cursor (drifting material, following rings, lighting lattice, fanning slabs, bars), count-labelled filter buttons, search and load-more.',
	order: 6
};
