import type { Move } from '$studio/types';

const f = (n: string) => `src/lib/moves/dovetail/${n}.svelte`;

export const moves: Move[] = [
	{ id: 'dovetail/mixed-headline', axis: 'type', name: 'Mixed-face mega headline', file: f('mixed-headline'), notes: 'Onest 500 at 72–168px with a second expressive face (Instrument Serif italic, Fraunces, Newsreader, VT323 or Doto) set inside the line via <em>.' },
	{ id: 'dovetail/inline-glyph', axis: 'illustration', name: 'Inline headline object', file: f('inline-glyph'), notes: 'Small em-sized brand objects that sit inside a headline: ring target, copper ■, material capsule, mini terminal, ■ orbit, isometric instance stack.' },
	{ id: 'dovetail/patina-rain', axis: 'texture', name: 'Patina glyph rain', file: f('patina-rain'), notes: 'Canvas texture in our own alphabet: dots corrode into rings, rings into ■, heads flash a digit. Rain or spreading-patina mode, paused offscreen and for reduced motion.' },
	{ id: 'dovetail/oxide-quote-card', axis: 'accent', name: 'Solid oxide quote card', file: f('oxide-quote-card'), notes: 'The accent as a big solid oxide slab (band-orange) with near-black text and patina or halftone texture faded under the copy; labelled example quote.' },
	{ id: 'dovetail/stat-slab', axis: 'cards', name: 'Big-digit stat slab', file: f('stat-slab'), notes: 'Stat card with an up-arrow and huge digits in a second face (serif, VT323, Doto); card, oxide or ink tone.' },
	{ id: 'dovetail/mono-chip', axis: 'type', name: 'Mono uppercase chip', file: f('mono-chip'), notes: 'JetBrains Mono uppercase chip with ■, ring or + marks; line, solid, oxide and ghost tones.' },
	{ id: 'dovetail/provider-orbit', axis: 'illustration', name: 'Provider orbit', file: f('provider-orbit'), notes: 'Three tilted dashed orbits with oxide squares travelling them, an isometric instance stack as the hub and provider chips on the rings.' },
	{ id: 'dovetail/square-rating-row', axis: 'section', name: 'Square rating trust row', file: f('square-rating-row'), notes: 'Rating-style trust row using five ■ instead of stars, with honest facts and placeholder figures marked “example”.' },
	{ id: 'dovetail/instance-console', axis: 'cards', name: 'Instance console panel', file: f('instance-console'), notes: 'Interactive product panel: command bar, instance list and per-instance config, history and billing; click to switch.' },
	{ id: 'dovetail/crowd-prefooter', axis: 'footer', name: 'Provider crowd pre-footer', file: f('crowd-prefooter'), notes: 'Giant closing words with provider badges (oxide, card, ink, copper-framed) crowding around them, gently bobbing.' },
	{ id: 'dovetail/glyph-nav', axis: 'nav', name: 'Wordmark nav with version chip', file: f('glyph-nav'), notes: 'Wide top bar: claude-multi■ wordmark, links, mono version chip, GitHub and install; plain, glass or line surface.' },
	{ id: 'dovetail/material-provider-tile', axis: 'cards', name: 'Material provider tile', file: f('material-provider-tile'), notes: 'Provider card cut from a shader material: icon on a solid disc, solid reading panel with model chips and how you pay.' },
	{ id: 'dovetail/live-oxide-stage', axis: 'hero', name: 'Live oxide shader stage', file: f('live-oxide-stage'), notes: 'Full-bleed live shader section with a strong scrim; the one live hero moment per page.' }
];
