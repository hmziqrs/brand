import type { Meta } from '$studio/types';
export const meta: Meta = {
	title: 'Northflank study · product (BYOC)',
	group: 'site-northflank',
	kind: 'product',
	product: 'ferrous (stand-in runtime platform)',
	inspiredBy: ['northflank', 'flora'],
	moves: [
		'site-northflank/site-header',
		'site-northflank/product-rail',
		'site-northflank/console-mock',
		'site-northflank/feature-quad',
		'site-northflank/primitive-tabs',
		'site-northflank/cta-band',
		'site-northflank/site-footer',
		'site-northflank/cursor-dither',
		'flora/rust-grid-field',
		'northflank/key-button',
		'northflank/mono-label'
	],
	breaks: ['no-hover-motion'],
	notes: 'Their bring-your-own-cloud product page: a hover grid that rusts under the cursor behind region rails, a sticky product rail, and live console tabs per section.',
	order: 4
};
