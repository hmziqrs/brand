import type { Meta } from '$studio/types';

export const meta: Meta = {
	title: 'Linear study · Product (Plan)',
	group: 'site-linear',
	kind: 'product',
	product: 'plumb (stand-in)',
	inspiredBy: ['linear', 'flora', 'bento'],
	moves: [
		'site-linear/site-header',
		'site-linear/material-hero',
		'site-linear/section-head',
		'site-linear/stage-frame',
		'site-linear/project-mock',
		'site-linear/project-bento',
		'site-linear/doc-mock',
		'site-linear/planning-tabs',
		'site-linear/roadmap-mock',
		'site-linear/pulse-feed',
		'site-linear/status-icon',
		'site-linear/next-links',
		'site-linear/quote-pair',
		'site-linear/site-footer',
		'bento/oxide-tile',
		'bento/material-tile',
		'flora/rust-grid-field'
	],
	breaks: ['no-hover-motion', 'orange-only-fill', 'outline-only-cards'],
	notes: 'linear.app/plan in our system: full-width material hero with the hover grid, every product mock interactive (tabs, health switch, dependency hover, doc features), one oxide tile per bento.',
	order: 2
};
