import type { Meta } from '$studio/types';

export const meta: Meta = {
	title: 'Framer study · Home',
	group: 'site-framer',
	kind: 'landing',
	product: 'kiln (stand-in site builder)',
	inspiredBy: ['framer', 'flora'],
	moves: [
		'site-framer/site-header',
		'site-framer/poster-hero',
		'site-framer/inline-poster',
		'site-framer/prompt-box',
		'site-framer/proof-strip',
		'site-framer/section-head',
		'site-framer/build-steps',
		'site-framer/bento-cell',
		'site-framer/cms-table',
		'site-framer/agent-terminal',
		'site-framer/material-fan',
		'site-framer/ui-panel',
		'site-framer/site-card',
		'site-framer/story-rail',
		'site-framer/community-window',
		'site-framer/site-footer',
		'flora/rust-grid-field'
	],
	breaks: ['no-hover-motion', 'outline-only-cards', 'single-typeface'],
	notes: 'Full-width hero: giant headline with a cycling site poster inline and a fan of posters that sways with the cursor; sticky three-step build demo; separate bento tiles; material-filled kiln footer with a publish ticker.',
	order: 1
};
