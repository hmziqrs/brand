import type { Move } from '$studio/types';

const f = (n: string) => `src/lib/moves/site-flora/${n}.svelte`;

export const moves: Move[] = [
	{ id: 'site-flora/site-nav', axis: 'nav', name: 'Site nav with mega menus', file: f('site-nav'), notes: 'Solid oxide announce strip, sticky frosted bar, Product/Solutions/Resources two-column menus, outline + oxide CTAs, phone sheet.' },
	{ id: 'site-flora/site-footer', axis: 'footer', name: 'Pre-footer CTA + six-column material footer', file: f('site-footer'), notes: 'Big closing line with two CTAs, then an always-dark footer on a blurred material with six link columns and the rusting dithered wordmark.' },
	{ id: 'site-flora/float-hero', axis: 'hero', name: 'Floating swatch hero', file: f('float-hero'), notes: 'Centered headline ringed by framed material “shots” that parallax at different depths with the cursor, over a rust grid that oxidizes where you move.' },
	{ id: 'site-flora/cursor-tag', axis: 'accent', name: 'Named cursor tag', file: f('cursor-tag'), notes: 'Multiplayer cursor arrow + name pill in a brand palette colour; used in every mock to show live collaboration.' },
	{ id: 'site-flora/canvas-board', axis: 'illustration', name: 'Draggable node canvas', file: f('canvas-board'), notes: 'Dotted board of model nodes (prompt, image, grid, palette, video) with live bezier wires and pulses; drag or arrow-key nodes, drifting teammate cursors; scales to fit phones.' },
	{ id: 'site-flora/step-trio', axis: 'cards', name: 'Ideate / Iterate / Scale cards', file: f('step-trio'), notes: 'Three tall cards with big grey numerals and live mocks: a cycling add-block menu, cursors over a frame with a comment, and one source fanning into a filling grid.' },
	{ id: 'site-flora/discipline-stage', axis: 'section', name: 'Full-height discipline stage', file: f('discipline-stage'), notes: 'Full-bleed material that cross-fades per discipline, a giant hover list of disciplines, and a smoke-glass flow card with numbered steps.' },
	{ id: 'site-flora/playbook-card', axis: 'cards', name: 'Playbook card', file: f('playbook-card'), notes: 'Material thumb that zooms on hover, category chip, optional Run bar that fills oxide, author line with initials avatar.' },
	{ id: 'site-flora/model-bento', axis: 'cards', name: 'Model family bento', file: f('model-bento'), notes: 'Six-column bento of model families, each a material tile with a dark scrim, a big name and a two-column model list.' },
	{ id: 'site-flora/plan-cards', axis: 'cards', name: 'Plan cards with billing toggle', file: f('plan-cards'), notes: 'Monthly / quarterly / yearly radio pill that reprices live; five plan cards, the starred one a solid oxide card that stands taller.' },
	{ id: 'site-flora/feature-banner', axis: 'section', name: 'Feature banner with lifting swatches', file: f('feature-banner'), notes: 'Card with eyebrow, headline, body and CTA beside three material swatches that stagger up and down on hover.' },
	{ id: 'site-flora/team-pool', axis: 'illustration', name: 'Team pool widget', file: f('team-pool'), notes: 'Smoke-glass usage card on a material with named cursors; a seats slider grows the pool and re-splits the per-person spend bar.' },
	{ id: 'site-flora/compare-table', axis: 'layout', name: 'Grouped comparison table', file: f('compare-table'), notes: 'Sticky plan header, mono oxide group labels, check / dash / text cells, the starred plan column tinted oxide; scrolls sideways inside itself on phones.' }
];
