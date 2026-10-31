import type { Move } from '$studio/types';

const f = (name: string) => `src/lib/moves/site-voidzero/${name}.svelte`;

export const moves: Move[] = [
	{ id: 'site-voidzero/site-header', axis: 'nav', name: 'Site header with tool menu', file: f('site-header'), notes: 'Full-width bar: wordmark, an Open source menu that drops a panel of material-tiled tools, Blog, About, platform link, social icons; mobile sheet.' },
	{ id: 'site-voidzero/site-footer', axis: 'footer', name: 'Newsletter + cursor material strip footer', file: f('site-footer'), notes: 'Always-dark footer: big newsletter line and form, a full-bleed material strip whose texture and mark tile follow the cursor, four link columns.' },
	{ id: 'site-voidzero/hover-grid', axis: 'texture', name: 'Hover heat grid', file: f('hover-grid'), notes: 'Canvas hairline grid behind a section; cells near the cursor warm up in the accent and cool off as it moves on.' },
	{ id: 'site-voidzero/grid-hero', axis: 'hero', name: 'Centered grid hero with tilting art', file: f('grid-hero'), notes: 'Status chip, 140px centered headline, lede, then an art slot that tilts toward the cursor over the hover grid.' },
	{ id: 'site-voidzero/material-window', axis: 'cards', name: 'Material window', file: f('material-window'), notes: 'Vivid shader field with a centered terminal or code window; field drifts and window tilts with the cursor, a soft light follows it.' },
	{ id: 'site-voidzero/tool-rail', axis: 'section', name: 'Tool rail', file: f('tool-rail'), notes: 'Scroll-tracked left list of tools with material tiles; each row is copy, explore button and example stats beside a material window.' },
	{ id: 'site-voidzero/logo-marquee', axis: 'section', name: 'Framework marquee', file: f('logo-marquee'), notes: 'Slow marquee of framework icons it works with (not customers), paused on hover, wraps still for reduced motion.' },
	{ id: 'site-voidzero/backer-grid', axis: 'section', name: 'Backer grid', file: f('backer-grid'), notes: 'Hairline strip or 2x2 grid of example backer names, each set in a different face as a stand-in wordmark, plus a people grid.' },
	{ id: 'site-voidzero/post-cover', axis: 'illustration', name: 'Post cover', file: f('post-cover'), notes: 'Generated cover: recap style (ink half with title + material half with mark) or release style (material with mark + name + chip); zooms on card hover.' },
	{ id: 'site-voidzero/post-card', axis: 'cards', name: 'Post card with inset hover border', file: f('post-card'), notes: 'Cover + // kind + title + date, stacked or as a row; the hover border is drawn inside the card so carousels never clip it.' },
	{ id: 'site-voidzero/featured-updates', axis: 'section', name: 'Featured updates rail', file: f('featured-updates'), notes: 'Heading column with a small query snippet beside a kit carousel of post cards.' },
	{ id: 'site-voidzero/team-grid', axis: 'cards', name: 'Hairline team grid', file: f('team-grid'), notes: 'Four-up hairline cells: material-framed initials, name, role, // note, then a social row and handle chip; tile tips on hover.' },
	{ id: 'site-voidzero/dot-field', axis: 'texture', name: 'Cursor-lit dot field', file: f('dot-field'), notes: 'Faint dot grid fading in from the top; dots near the cursor light up in the accent.' },
	{ id: 'site-voidzero/bracket-statement', axis: 'section', name: 'Bracketed mission statement', file: f('bracket-statement'), notes: 'Big heading beside a paragraph held in thin oxide brackets, hand-drawn signature and name, over the dot field.' },
	{ id: 'site-voidzero/section-toc', axis: 'nav', name: 'Scroll-spy contents', file: f('section-toc'), notes: 'Sticky contents list on a hairline; the current section gets a thin oxide edge. Buttons scroll, so the hash router is never touched.' },
	{ id: 'site-voidzero/command-stage', axis: 'hero', name: 'Command stage', file: f('command-stage'), notes: 'Full-width (optionally live) material with a centered terminal that types each command in turn; tabs switch scenes; field and window follow the cursor.' },
	{ id: 'site-voidzero/feature-tabs', axis: 'section', name: 'Sticky feature tabs', file: f('feature-tabs'), notes: 'Sticky mono tab row over feature rows (copy, square bullets, runs-on tiles) beside material windows; scroll tracks the tab.' },
	{ id: 'site-voidzero/framework-hub', axis: 'illustration', name: 'Framework hub', file: f('framework-hub'), notes: 'Material tool tile in the middle, framework icons around it on hairline wires; pointing at one lights its wire with a moving dash.' },
	{ id: 'site-voidzero/speed-bars', axis: 'illustration', name: 'Material speed bars', file: f('speed-bars'), notes: 'Paired bars per task: ours filled with a material, theirs in grey, growing in on view, with an N× faster label.' }
];
