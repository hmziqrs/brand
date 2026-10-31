import type { Move } from '$studio/types';

const f = (n: string) => `src/lib/moves/content/${n}.svelte`;

export const moves: Move[] = [
	{ id: 'content/reading-header', axis: 'nav', name: 'Reading header', file: f('reading-header'), notes: 'Thin sticky header for reading pages: wordmark, maker line, three links, frosted on scroll.' },
	{ id: 'content/serif-mix-headline', axis: 'type', name: 'Serif-mix headline', file: f('serif-mix-headline'), notes: 'Huge Onest headline with _marked_ words set in an italic serif (Instrument, Newsreader or Fraunces); can hold an inline object at [*].' },
	{ id: 'content/oxide-clip-word', axis: 'type', name: 'Oxide clip word', file: f('oxide-clip-word'), notes: 'A word filled with a baked oxide material through background-clip, drifting slowly (still for reduced motion).' },
	{ id: 'content/material-cover', axis: 'illustration', name: 'Material cover', file: f('material-cover'), notes: 'Per-post cover generated from the post name: one of eleven warm materials, zoomed, flipped and offset by seed, with a solid issue-number notch.' },
	{ id: 'content/ring-fingerprint', axis: 'illustration', name: 'Ring fingerprint', file: f('ring-fingerprint'), notes: 'Small seeded ring glyph per post or release, in the topic color; the accent arc turns on row hover.' },
	{ id: 'content/reading-progress', axis: 'motion', name: 'Reading progress', file: f('reading-progress'), notes: 'Scroll progress over the article: a copper-material rail across the top, or a ring gauge with minutes left.' },
	{ id: 'content/oxide-pull-quote', axis: 'accent', name: 'Oxide pull quote', file: f('oxide-pull-quote'), notes: 'Solid oxide card breaking out of the reading column, big serif quote in near-black, corner rings.' },
	{ id: 'content/hang-quote', axis: 'type', name: 'Hanging quote', file: f('hang-quote'), notes: 'Large Newsreader italic quote between hairlines, with a material-filled quotation mark hung into the margin.' },
	{ id: 'content/callout-plate', axis: 'cards', name: 'Callout plate', file: f('callout-plate'), notes: 'Callout card with a material strip edge per tone (copper tip, alloy note, lava warning) and white body text.' },
	{ id: 'content/code-slab', axis: 'cards', name: 'Code slab', file: f('code-slab'), notes: 'Kit CodeBlock seated in a thin material frame (copper by default, alloy for docs) with a drop shadow and a caption line.' },
	{ id: 'content/oxide-timeline', axis: 'layout', name: 'Oxide timeline', file: f('oxide-timeline'), notes: 'Changelog rail that fills with copper as you scroll; giant sticky version numbers; latest release as a solid oxide card.' },
	{ id: 'content/statement-hero', axis: 'hero', name: 'Statement hero', file: f('statement-hero'), notes: 'Full-width personal statement beside a tall live material slab with rings and a frosted fact card.' },
	{ id: 'content/process-rail', axis: 'section', name: 'Process rail', file: f('process-rail'), notes: 'Five numbered stations with giant serif numerals and ring glyphs; one station is a solid oxide card.' },
	{ id: 'content/material-signoff', axis: 'footer', name: 'Material sign-off', file: f('material-signoff'), notes: 'Family row with marks, then the giant hmziq wordmark filled with oxide material and a solid square.' }
];
