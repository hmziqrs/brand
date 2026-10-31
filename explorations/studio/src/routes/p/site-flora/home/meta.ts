import type { Meta } from '$studio/types';

export const meta: Meta = {
	title: 'Flora study · Home',
	group: 'site-flora',
	kind: 'landing',
	product: 'canvasworks',
	inspiredBy: ['flora'],
	moves: [
		'site-flora/site-nav',
		'site-flora/float-hero',
		'flora/rust-grid-field',
		'flora/serif-italic-headline',
		'site-flora/step-trio',
		'site-flora/cursor-tag',
		'site-flora/canvas-board',
		'site-flora/discipline-stage',
		'site-flora/playbook-card',
		'site-flora/model-bento',
		'content/material-cover',
		'site-flora/site-footer'
	],
	breaks: ['no-hover-motion', 'single-typeface', 'orange-only-fill'],
	notes: 'flora.ai home rebuilt section-for-section in our kit: floating material swatches that parallax over a rusting hover grid, a draggable node canvas, a full-height discipline stage and the dithered-wordmark footer.',
	order: 1
};
