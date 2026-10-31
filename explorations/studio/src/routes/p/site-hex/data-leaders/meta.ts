import type { Meta } from '$studio/types';

export const meta: Meta = {
	title: 'Hex study · data leaders',
	group: 'site-hex',
	kind: 'landing',
	product: 'quarry',
	inspiredBy: ['hex'],
	moves: [
		'site-hex/top-nav',
		'site-hex/plot-grid',
		'site-hex/grid-hero',
		'site-hex/spot-frame',
		'site-hex/split-row',
		'site-hex/spot-drilldown',
		'site-hex/spot-layers',
		'site-hex/spot-pipeline',
		'site-hex/spot-tangent-rings',
		'site-hex/resource-card',
		'site-hex/spot-mini',
		'site-hex/oxide-cta',
		'site-hex/terrain-footer'
	],
	breaks: ['no-hover-motion', 'orange-only-fill'],
	notes: 'The Hex solutions page rebuilt in our kit: hand-built isometric spot drawings that lean with the cursor, a plot-paper hero with a live crosshair, one solid oxide CTA.',
	order: 1
};
