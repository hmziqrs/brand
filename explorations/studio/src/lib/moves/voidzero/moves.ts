import type { Move } from '$studio/types';

const f = (name: string) => `src/lib/moves/voidzero/${name}.svelte`;

export const moves: Move[] = [
	{ id: 'voidzero/top-nav', axis: 'nav', name: 'Wordmark nav + material announce strip', file: f('top-nav'), notes: 'Plain bar or floating glass pill; optional thin material strip with a dark announcement chip above it.' },
	{ id: 'voidzero/plate-stack', axis: 'illustration', name: 'Isometric plate stack', file: f('plate-stack'), notes: 'SVG isometric stack of thin plates, one cut from an oxide shader with the mark on it, leader-line labels; plates fan out on hover.' },
	{ id: 'voidzero/mode-band', axis: 'layout', name: 'Alternating mode bands', file: f('mode-band'), notes: 'Full-width band in page, gray, deep ink (always dark), paper (always light) or vivid oxide with near-black ink; optional framed container with hairline sides.' },
	{ id: 'voidzero/project-rail', axis: 'section', name: 'Project rail', file: f('project-rail'), notes: 'Left nav of projects with material tiles; right side copy beside a vivid material panel per project. Scroll-tracked rows or a tabbed single panel.' },
	{ id: 'voidzero/material-code-panel', axis: 'cards', name: 'Material panel with terminal', file: f('material-code-panel'), notes: 'A vivid shader field with a dark terminal or code window bleeding off its corner.' },
	{ id: 'voidzero/giant-counter', axis: 'section', name: 'Giant counter + material sparkline', file: f('giant-counter'), notes: 'Huge rolling number (labelled example) beside a shader-filled area sparkline, three stat cells under it in a hairline grid.' },
	{ id: 'voidzero/updates-rail', axis: 'cards', name: 'Featured updates carousel', file: f('updates-rail'), notes: 'Kit card carousel of posts with material covers and a mark or headline on glass; split heading column or full width.' },
	{ id: 'voidzero/material-strip-cta', axis: 'section', name: 'Newsletter over a material strip', file: f('material-strip-cta'), notes: 'Headline + email form, then a full-bleed shader strip with the mark tile; or the form on a glass panel over a tall strip.' },
	{ id: 'voidzero/material-wordmark-footer', axis: 'footer', name: 'Footer with giant (material) wordmark', file: f('material-wordmark-footer'), notes: 'Link columns, More from hmziq marks, then a container-wide freeoxide■ in solid or shader-filled letters.' },
	{ id: 'voidzero/material-ink', axis: 'type', name: 'Material ink words', file: f('material-ink'), notes: 'A word in a headline filled with a slowly drifting shader poster (background-clip text).' }
];
