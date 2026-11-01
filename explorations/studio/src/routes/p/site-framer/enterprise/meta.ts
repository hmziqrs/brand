import type { Meta } from '$studio/types';

export const meta: Meta = {
	title: 'Framer study · Enterprise',
	group: 'site-framer',
	kind: 'landing',
	product: 'kiln (stand-in site builder)',
	inspiredBy: ['framer'],
	moves: [
		'site-framer/site-header',
		'site-framer/section-head',
		'site-framer/expert-form',
		'site-framer/site-card',
		'site-framer/bento-cell',
		'site-framer/ui-panel',
		'site-framer/prompt-box',
		'site-framer/feature-chips',
		'site-framer/story-rail',
		'site-framer/site-footer',
		'flora/rust-grid-field'
	],
	breaks: ['no-hover-motion', 'outline-only-cards'],
	notes: 'Full-width hero; benefit cards beside a three-step brief form (big choice buttons, size and launch pills, then contact) with answer chips and an oxide thank-you; every grid now separate cards; feature list as pills.',
	order: 4
};
