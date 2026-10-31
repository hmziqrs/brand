import type { Meta } from '$studio/types';

export const meta: Meta = {
	title: 'gpui-query · oxidized bento',
	group: 'bento',
	kind: 'landing',
	product: 'gpui-query',
	inspiredBy: ['framer', 'voidzero'],
	moves: [
		'bento/product-hero',
		'bento/forge-app-window',
		'bento/devtools-inspector',
		'bento/cache-timeline',
		'bento/refetch-pulse',
		'bento/mutation-rollback',
		'bento/oxide-tile',
		'bento/material-tile'
	],
	breaks: ['outline-only-cards', 'orange-only-fill'],
	notes: 'Framer-style bento where every tile is a working mini-demo, one solid oxide tile and material cells carry the colour instead of generic black.',
	order: 1
};
