import type { Move } from '$studio/types';

const f = (name: string) => `src/lib/moves/specimens/${name}`;

export const typeMoves: Move[] = [
	{ id: 'specimens/type-onest', axis: 'type', name: 'Onest alone', file: f('type-system.svelte'), notes: 'Baseline: Onest 500 for everything, JetBrains Mono chips.' },
	{ id: 'specimens/type-onest-fraunces', axis: 'type', name: 'Fraunces display + Onest text', file: f('type-system.svelte'), notes: 'Fraunces carries headlines with an italic second line; Onest keeps body and labels.' },
	{ id: 'specimens/type-newsreader', axis: 'type', name: 'Newsreader editorial', file: f('type-system.svelte'), notes: 'Serif headlines and serif body at 21px, Onest tracked caps for datelines.' },
	{ id: 'specimens/type-bricolage', axis: 'type', name: 'Bricolage display', file: f('type-system.svelte'), notes: 'Lowercase 800-weight Bricolage with the square ending the headline.' },
	{ id: 'specimens/type-inter-tight-mega', axis: 'type', name: 'Inter Tight mega', file: f('type-system.svelte'), notes: 'Inter Tight 600 at -0.075em and 0.8 leading, set larger than the rest.' },
	{ id: 'specimens/type-space-geist', axis: 'type', name: 'Space Grotesk + Geist Mono', file: f('type-system.svelte'), notes: 'Space Grotesk headlines, Geist Mono bracketed chips and labels.' },
	{ id: 'specimens/type-onest-doto', axis: 'type', name: 'Onest + Doto dot-matrix accents', file: f('type-system.svelte'), notes: 'One dot-matrix word in oxide inside the headline; dot-matrix labels.' },
	{ id: 'specimens/type-onest-silkscreen', axis: 'type', name: 'Onest + Silkscreen pixel labels', file: f('type-system.svelte'), notes: 'Pure Onest headline; pixel font only for chips, labels and the button.' },
	{ id: 'specimens/type-scale-62', axis: 'type', name: 'Hero scale 62px (current)', file: f('type-scale.svelte'), notes: 'Today: 62px in a 464px column with grey lede.' },
	{ id: 'specimens/type-scale-96', axis: 'type', name: 'Hero scale 96px', file: f('type-scale.svelte'), notes: '96px in an 880px column, 20px white lede.' },
	{ id: 'specimens/type-scale-128', axis: 'type', name: 'Hero scale 128px', file: f('type-scale.svelte'), notes: '128px in an 1100px column, 22px lede.' },
	{ id: 'specimens/type-scale-160', axis: 'type', name: 'Hero scale 160px', file: f('type-scale.svelte'), notes: '160px across the full 1320px container, 0.86 leading.' }
];

export const textureMoves: Move[] = [
	{ id: 'specimens/texture-diagonal-hatch', axis: 'texture', name: 'Diagonal rust hatch', file: f('diagonal-hatch.svelte'), notes: 'The hmziq-2 hero hatch rebuilt on canvas: -38° rust lines corroded by noise from one corner; lines bend toward the cursor and light up under it.' },
	{ id: 'specimens/texture-magnetic-dots', axis: 'texture', name: 'Magnetic dot field', file: f('magnetic-dots.svelte'), notes: 'A hairline dot grid; dots near the cursor are pulled in, swell and turn oxide, then spring back.' },
	{ id: 'specimens/texture-rust-linger', axis: 'texture', name: 'Rust where you linger', file: f('rust-linger.svelte'), notes: 'Rest the cursor and rust blooms there, spreads along a grain field, ages hot to deep and flakes away. Moving leaves a faint trail.' },
	{ id: 'specimens/texture-ripple-rings', axis: 'texture', name: 'Ripple rings', file: f('ripple-rings.svelte'), notes: 'Brand ring arcs ripple out from the cursor as it travels; every sixth ring is oxide with an end dot, all the same thin stroke.' },
	{ id: 'specimens/texture-grid-warp', axis: 'texture', name: 'Grid warp lens', file: f('grid-warp.svelte'), notes: 'A hairline grid bulges under the cursor like a loupe; warped lines and crossings turn oxide.' },
	{ id: 'specimens/texture-glyph-scatter', axis: 'texture', name: 'Glyph scatter', file: f('glyph-scatter.svelte'), notes: 'A field of ■ □ ○ ◎ glyphs scatters away from the cursor on springs, heats to oxide squares, and settles back.' },
	{ id: 'specimens/texture-iron-filings', axis: 'texture', name: 'Iron filings', file: f('iron-filings.svelte'), notes: 'Short filings lie along a noise field; the cursor is a magnet that combs them into dipole lines and heats them oxide.' },
	{ id: 'specimens/texture-contour-map', axis: 'texture', name: 'Contour map', file: f('contour-map.svelte'), notes: 'Topographic iso-lines over a slow noise terrain; the cursor raises a hill and every fifth line is an oxide index contour.' },
	{ id: 'specimens/texture-voxel-relief', axis: 'texture', name: 'Voxel relief', file: f('voxel-relief.svelte'), notes: 'An isometric field of quiet cubes; the ones under the cursor rise into an oxide relief and sink back.' },
	{ id: 'specimens/texture-oxidize-grid', axis: 'texture', name: 'Oxidizing cursor grid', file: f('oxidize-grid.svelte'), notes: 'Hairline grid; cells under the cursor heat to oxide and leave a slow patina stain. A ghost cursor wanders when idle.' },
	{ id: 'specimens/texture-rust-spread', axis: 'texture', name: 'Rust spreading canvas', file: f('rust-spread.svelte'), notes: 'Rust cells seed, spread along a grain field, age hot to deep, flake and regrow. The cursor scorches fresh hot rust that spreads from its path.' },
	{ id: 'specimens/texture-glyph-rain', axis: 'texture', name: 'Oxide glyph rain', file: f('glyph-rain.svelte'), notes: 'Slow columns of ■ □ ○ ◎ glyphs with an oxide square at each head. The cursor lights a lens of oxide glyphs and speeds up the columns under it.' },
	{ id: 'specimens/texture-dither-gradient', axis: 'texture', name: 'Dithered glow', file: f('dither-gradient.svelte'), notes: 'Bayer-dithered oxide glow in 4px pixels, two tones; the glow follows the cursor with a soft lag.' },
	{ id: 'specimens/texture-dot-field', axis: 'texture', name: 'Dot field', file: f('dot-field.svelte'), notes: 'CSS-only hairline dot grid; the bigger oxide dot cluster follows the cursor.' },
	{ id: 'specimens/texture-oxide-bloom', axis: 'texture', name: 'Oxide-bloom grain', file: f('tinted-material.svelte'), notes: 'The oxide-bloom poster as is in dark; re-inked in light. The cursor carries a hot torch over the material.' },
	{ id: 'specimens/texture-oxide-chalk', axis: 'texture', name: 'Oxide chalk', file: f('tinted-material.svelte'), notes: 'Oxide-chalk poster tinted through the oxide token, with a cursor torch.' },
	{ id: 'specimens/texture-halftone-print', axis: 'texture', name: 'Halftone print', file: f('tinted-material.svelte'), notes: 'Halftone-print poster printed in oxide ink, with a cursor torch.' },
	{ id: 'specimens/texture-ring-field', axis: 'texture', name: 'Ring field', file: f('ring-field.svelte'), notes: 'Kit rings blown up past the frame with a rotated echo; both turn and drift against the cursor.' },
	{ id: 'specimens/texture-lattice-scene', axis: 'texture', name: 'Lattice scene', file: f('lattice-field.svelte'), notes: 'Kit 3D lattice bled off the right edge; the whole scene tilts toward the cursor.' }
];

export const accentMoves: Move[] = [
	{ id: 'specimens/accent-solid-card', axis: 'accent', name: 'Solid oxide card + texture', file: f('oxide-solid-card.svelte'), notes: 'A big solid oxide card with a halftone multiply overlay and near-black copy, next to a calm outline tile.' },
	{ id: 'specimens/accent-full-band', axis: 'accent', name: 'Full oxide band', file: f('oxide-band.svelte'), notes: 'The closing band pushed to a 74px headline with kit band arcs.' },
	{ id: 'specimens/accent-half-bleed', axis: 'accent', name: 'Half-bleed oxide field', file: f('oxide-half-field.svelte'), notes: 'Copy on the page, the other half a bleeding oxide field with rings and a giant figure.' },
	{ id: 'specimens/accent-headline-word', axis: 'accent', name: 'Oxide slab word', file: f('oxide-word-slab.svelte'), notes: 'One headline word on an oxide slab in near-black, never orange letters.' },
	{ id: 'specimens/accent-inline-object', axis: 'accent', name: 'Oxide inline object', file: f('oxide-inline-object.svelte'), notes: 'An oxide ring tile and a material pill set inline in headlines, our take on the inline 3D object.' },
	{ id: 'specimens/accent-stat-tile', axis: 'accent', name: 'Oxide stat tile', file: f('oxide-stat-tiles.svelte'), notes: 'One solid oxide number tile leads a row of outline number tiles.' },
	{ id: 'specimens/accent-button-set', axis: 'accent', name: 'Oxide button set', file: f('oxide-buttons.svelte'), notes: 'Oxide primary, ink secondary, outline, square-marked link and chip, on the page and on oxide.' },
	{ id: 'specimens/accent-marker-system', axis: 'accent', name: 'Underline + marker system', file: f('oxide-markers.svelte'), notes: 'Ink links with a 2px oxide underline, highlighter marks, square bullets, rings, rules and step slabs.' }
];

export const footerMoves: Move[] = [
	{ id: 'specimens/footer-giant-wordmark', axis: 'footer', name: 'Giant hmziq■ (current)', file: f('footer-current.svelte'), notes: 'The kit SiteFooter as shipped: grey links, giant Onest signature.' },
	{ id: 'specimens/footer-material-wordmark', axis: 'footer', name: 'Wordmark filled with oxide', file: f('footer-material-wordmark.svelte'), notes: 'The giant signature clipped to the oxide-bloom material; links in full ink with oxide hover underlines.' },
	{ id: 'specimens/footer-material-dither', axis: 'footer', name: 'Material footer, dithered wordmark', file: f('footer-material-dither.svelte'), notes: 'Cast-iron (dark) or fibrous paper (light) under a scrim, links on a glass panel, a Bayer-dithered wordmark fading down.' },
	{ id: 'specimens/footer-dot-matrix', axis: 'footer', name: 'Dot-matrix field footer', file: f('footer-dot-matrix.svelte'), notes: 'A full dot grid where the wordmark dots light up and the square lights oxide.' },
	{ id: 'specimens/footer-ring-horizon', axis: 'footer', name: 'Ring horizon footer', file: f('footer-ring-horizon.svelte'), notes: 'Kit horizon rings rise behind the signature, which sits on the horizon line.' },
	{ id: 'specimens/footer-oxide-band', axis: 'footer', name: 'Oxide band footer', file: f('footer-oxide-band.svelte'), notes: 'The whole footer is the oxide band: near-black links and a near-black giant signature.' }
];

export const lightMoves: Move[] = [
	{ id: 'specimens/light-a-current', axis: 'color', name: 'Light A · current', file: f('light-treatments.ts'), notes: 'Brown #AA530A-ish oxide for fills, eyebrows and links; white on brown; grey lede.' },
	{ id: 'specimens/light-b-vivid', axis: 'color', name: 'Light B · vivid fill, dark ink', file: f('light-treatments.ts'), notes: 'Vivid oxide fills under near-black text; near-black body; small oxide text in deep ink.' },
	{ id: 'specimens/light-c-grey-page', axis: 'color', name: 'Light C · grey page, white cards', file: f('light-treatments.ts'), notes: 'B on a 0.968 grey page with white cards and darker body and captions.' },
	{ id: 'specimens/light-d-surface-only', axis: 'color', name: 'Light D · oxide only as surface', file: f('light-treatments.ts'), notes: 'B with no oxide text at all: black eyebrows with ■, black links with a vivid underline.' },
	{ id: 'specimens/light-e-pure-heavy', axis: 'color', name: 'Light E · pure white, heavier black', file: f('light-treatments.ts'), notes: 'B on pure white with 600 headlines, 450 body and blacker greys.' }
];

export const moves: Move[] = [...typeMoves, ...textureMoves, ...accentMoves, ...footerMoves, ...lightMoves];
