import type { Meta } from '$studio/types';

export const meta: Meta = {
	title: 'Framer study · Templates',
	group: 'site-framer',
	kind: 'app',
	product: 'kiln (stand-in site builder)',
	inspiredBy: ['framer'],
	moves: [
		'site-framer/site-header',
		'site-framer/poster-wall',
		'site-framer/template-browser',
		'site-framer/site-card',
		'bento/oxide-tile',
		'site-framer/site-footer',
		'flora/rust-grid-field'
	],
	breaks: ['no-hover-motion', 'single-typeface'],
	notes: 'Full-width split hero: giant live count, marketplace tab buttons and a big search beside a wall of site posters scrolling in opposite columns; filters are buttons with counts plus a sub-type bar, sort and price as segmented pills.',
	order: 3
};
