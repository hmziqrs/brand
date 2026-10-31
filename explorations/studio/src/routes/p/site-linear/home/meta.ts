import type { Meta } from '$studio/types';

export const meta: Meta = {
	title: 'Linear study · Home',
	group: 'site-linear',
	kind: 'landing',
	product: 'plumb (stand-in)',
	inspiredBy: ['linear', 'flora', 'bento'],
	moves: [
		'site-linear/site-header',
		'site-linear/hero-stage',
		'site-linear/app-shell-mock',
		'site-linear/status-icon',
		'site-linear/integration-strip',
		'site-linear/iso-fig',
		'site-linear/section-head',
		'site-linear/feature-links',
		'site-linear/triage-board',
		'site-linear/roadmap-mock',
		'site-linear/agent-windows',
		'site-linear/diff-review',
		'site-linear/changelog-rail',
		'site-linear/quote-pair',
		'site-linear/site-footer',
		'bento/oxide-mark-headline',
		'flora/rust-grid-field'
	],
	breaks: ['no-hover-motion', 'orange-only-fill', 'outline-only-cards'],
	notes: 'linear.app home rebuilt in our system: same hero → logos → thesis → four product sections → changelog → quotes → closing order, but white type, oxide doing real work, and every mock clickable.',
	order: 1
};
