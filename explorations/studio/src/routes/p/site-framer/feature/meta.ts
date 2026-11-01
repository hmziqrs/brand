import type { Meta } from '$studio/types';

export const meta: Meta = {
	title: 'Framer study · Feature (CMS)',
	group: 'site-framer',
	kind: 'product',
	product: 'kiln (stand-in site builder)',
	inspiredBy: ['framer'],
	moves: [
		'site-framer/site-header',
		'site-framer/hero-stage',
		'site-framer/cms-table',
		'site-framer/proof-strip',
		'site-framer/section-head',
		'site-framer/capability-tabs',
		'site-framer/bento-cell',
		'site-framer/ui-panel',
		'site-framer/feature-chips',
		'site-framer/prompt-box',
		'site-framer/site-footer',
		'bento/oxide-tile',
		'flora/rust-grid-field'
	],
	breaks: ['no-hover-motion', 'outline-only-cards'],
	notes: 'CMS feature page: full-width hero with the agent CMS mock on a full-bleed hover-grid material band, auto-advancing capability stepper, bentos as separate tiles, feature pills.',
	order: 2
};
