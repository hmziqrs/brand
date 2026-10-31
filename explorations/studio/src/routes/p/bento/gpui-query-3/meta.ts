import type { Meta } from '$studio/types';

export const meta: Meta = {
	title: 'gpui-query · docs-landing hybrid',
	group: 'bento',
	kind: 'landing',
	product: 'gpui-query',
	inspiredBy: ['framer', 'northflank'],
	moves: [
		'bento/oxide-mark-headline',
		'bento/spec-rail',
		'bento/cache-timeline',
		'bento/refetch-pulse',
		'bento/mutation-rollback',
		'bento/devtools-inspector',
		'bento/oxide-tile',
		'bento/material-tile'
	],
	breaks: ['outline-only-cards', 'single-typeface'],
	notes: 'Dense manual-as-landing: sticky numbered rail, API tables in white mono, and every concept paired with a tile you can operate.',
	order: 3
};
