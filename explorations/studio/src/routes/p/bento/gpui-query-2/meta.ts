import type { Meta } from '$studio/types';

export const meta: Meta = {
	title: 'gpui-query · Linear, done right',
	group: 'bento',
	kind: 'landing',
	product: 'gpui-query',
	inspiredBy: ['linear', 'framer'],
	moves: [
		'bento/product-hero',
		'bento/oxide-mark-headline',
		'bento/forge-app-window',
		'bento/devtools-inspector',
		'bento/cache-timeline',
		'bento/refetch-pulse',
		'bento/mutation-rollback'
	],
	breaks: ['outline-only-cards'],
	notes: 'Product-UI-led page with Linear’s structure but white 20px copy, numbered oxide callouts on the app, and oxide only where it means “network / live”.',
	order: 2
};
