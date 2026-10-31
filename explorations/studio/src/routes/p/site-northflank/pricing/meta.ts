import type { Meta } from '$studio/types';
export const meta: Meta = {
	title: 'Northflank study · pricing',
	group: 'site-northflank',
	kind: 'product',
	product: 'ferrous (stand-in runtime platform)',
	inspiredBy: ['northflank'],
	moves: [
		'site-northflank/site-header',
		'site-northflank/cursor-dither',
		'site-northflank/tier-cards',
		'site-northflank/rate-sheet',
		'site-northflank/bill-estimator',
		'site-northflank/price-compare',
		'site-northflank/plan-matrix',
		'site-northflank/enterprise-panel',
		'site-northflank/cta-band',
		'site-northflank/site-footer',
		'northflank/key-button',
		'northflank/mono-label',
		'northflank/oxide-slab'
	],
	breaks: ['no-hover-motion'],
	notes: 'Their pricing page in our kit: every table is live (hour/month, plan list, GPU pack sizes), the bill estimator recomputes, and the hero dither follows the cursor.',
	order: 2
};
