import type { Move } from '$studio/types';

const f = (name: string) => `src/lib/moves/northflank/${name}.svelte`;

export const moves: Move[] = [
	{ id: 'northflank/iso-tile-stack', axis: 'illustration', name: 'Isometric oxide voxels', file: f('iso-tile-stack'), notes: 'SVG voxel clusters on a dotted iso floor; steel tiles corrode to oxide from one corner, voxels under the cursor lift and glow (steel ones rust where you pass); mono label chips.' },
	{ id: 'northflank/iso-cube-glyph', axis: 'accent', name: 'Inline iso cube', file: f('iso-cube-glyph'), notes: 'A small stacked isometric oxide cube that sits inside a headline line like a letter.' },
	{ id: 'northflank/dot-matrix-word', axis: 'type', name: 'Rusting dot-matrix word', file: f('dot-matrix-word'), notes: 'Canvas dot-matrix word in a 5×7 bitmap face; dots flicker then corrode into oxide, with optional twinkling scatter.' },
	{ id: 'northflank/terminal-chip', axis: 'accent', name: 'Terminal chip', file: f('terminal-chip'), notes: 'Inline mono prompt chip that types its command and blinks an oxide block caret.' },
	{ id: 'northflank/key-button', axis: 'accent', name: 'Key-hint button', file: f('key-button'), notes: 'Mono CTA with a keyboard-key chip (Start a project [S]); tinted oxide, outline or ink.' },
	{ id: 'northflank/mono-label', axis: 'type', name: 'Mono section label', file: f('mono-label'), notes: 'Uppercase mono or pixel label with an oxide square and an index (01 / WHAT YOU GET).' },
	{ id: 'northflank/feature-strip', axis: 'cards', name: 'Pixel-glyph feature strip', file: f('feature-strip'), notes: 'One outlined strip of four cells, each led by a tiny hand-drawn pixel glyph in ink + oxide.' },
	{ id: 'northflank/desktop-window', axis: 'illustration', name: 'Desktop app window', file: f('desktop-window'), notes: 'Mock native window (mac, Windows, Linux chrome) with settings, update, notes or command-palette screens.' },
	{ id: 'northflank/loop-diagram', axis: 'section', name: 'Release loop + live counter', file: f('loop-diagram'), notes: 'Stadium loop build → test → package → update with a travelling oxide pulse and a ticking counter + log line.' },
	{ id: 'northflank/artifact-matrix', axis: 'cards', name: 'Installer matrix', file: f('artifact-matrix'), notes: 'Mono table of targets, installer files, signing and size, with OS logos.' },
	{ id: 'northflank/dither-field', axis: 'texture', name: 'Ordered-dither field', file: f('dither-field'), notes: 'Canvas Bayer-dithered gradient of oxide (or ink) squares that drifts slowly; our take on the dotted field.' },
	{ id: 'northflank/dither-footer', axis: 'footer', name: 'Dither footer + giant wordmark', file: f('dither-footer'), notes: 'Link columns with a status chip, then a dither field melting into a full-width wordmark (sans or dot-matrix).' },
	{ id: 'northflank/crt-panel', axis: 'texture', name: 'CRT panel', file: f('crt-panel'), notes: 'Always-dark bezelled screen with scanlines, vignette, oxide phosphor glow and a faint flicker.' },
	{ id: 'northflank/material-stage', axis: 'texture', name: 'Material stage', file: f('material-stage'), notes: 'Big rounded oxide shader panel (baked image) that product windows float on, with a scrim and caption chip.' },
	{ id: 'northflank/boot-log', axis: 'section', name: 'Boot-log feature list', file: f('boot-log'), notes: 'Features as a VT323 boot sequence: [ OK ] name ····· detail, lines print in one by one on scroll.' },
	{ id: 'northflank/oxide-slab', axis: 'accent', name: 'Solid oxide slab', file: f('oxide-slab'), notes: 'Vivid oxide card or band (band-orange tokens, near-black text in every mode) with a faint on-oxide dither.' },
	{ id: 'northflank/big-counters', axis: 'section', name: 'Giant counters', file: f('big-counters'), notes: 'Four 128px numbers on hairline dividers with mono captions; unit in oxide.' }
];
