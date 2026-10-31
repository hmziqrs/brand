import type { Meta } from '$studio/types';

export const meta: Meta = {
	title: 'Hex study · pricing',
	group: 'site-hex',
	kind: 'product',
	product: 'quarry',
	inspiredBy: ['hex'],
	moves: [
		'site-hex/top-nav',
		'site-hex/plot-grid',
		'site-hex/grid-hero',
		'site-hex/plan-cards',
		'site-hex/spot-mini',
		'site-hex/compute-picker',
		'site-hex/compare-table',
		'site-hex/faq-split',
		'site-hex/oxide-cta',
		'site-hex/terrain-footer'
	],
	breaks: ['orange-only-fill'],
	notes: 'Hex pricing rebuilt: four plans with spot covers (the popular one printed in oxide), a compute picker that stacks blocks, a diff-only compare table.',
	order: 3
};
