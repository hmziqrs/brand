import type { Move } from '$studio/types';

const f = (n: string) => `src/lib/moves/new/${n}.svelte`;

export const moves: Move[] = [
	{ id: 'new/product-scope', axis: 'color', name: 'Product hue scope', file: f('product-scope'), notes: 'Wrapper that re-points --primary to one brand-palette hue per product, ■ included. tweak="<key>" adds a Hue pill so the viewer can swap the hue (remembered per product). Light b/c get a vivid fill with near-black text.' },
	{ id: 'new/product-lockup', axis: 'nav', name: 'Product lockup nav', file: f('product-lockup'), notes: 'Seeded ring glyph + name■ + mono "kind · by hmziq" endorsement, sticky glass bar.' },
	{ id: 'new/material-word', axis: 'type', name: 'Tinted material word', file: f('material-word'), notes: 'One headline word cut from a shader poster, tinted with the product hue (screen in dark, multiply in light).' },
	{ id: 'new/inline-ring', axis: 'illustration', name: 'Inline ring object', file: f('inline-ring'), notes: 'Seeded full-circle rings sized to sit inside a headline, as a glyph, or grow as data (more rings = more history).' },
	{ id: 'new/phone-frame', axis: 'illustration', name: 'CSS phone frame', file: f('phone-frame'), notes: 'iOS / Android device built in HTML+CSS, product-hue shadow in dark; real app UI goes inside.' },
	{ id: 'new/device-window', axis: 'illustration', name: 'Desktop app window', file: f('device-window'), notes: 'Native window chrome for mac / win / linux with a deep material shadow, for desktop-app screenshots.' },
	{ id: 'new/terminal-hero', axis: 'hero', name: 'Terminal-led hero', file: f('terminal-hero'), notes: 'Huge split headline, then a wide kit terminal that types itself in front of a material field.' },
	{ id: 'new/spec-counters', axis: 'section', name: 'Spec counters band', file: f('spec-counters'), notes: 'Giant numbers with mono units in a full-bleed band (grey band or inverted).' },
	{ id: 'new/accent-slab', axis: 'accent', name: 'Solid hue slab', file: f('accent-slab'), notes: 'Big solid product-hue card, optional multiplied material grain (grain=0 for a flat fill) and a thin ring fingerprint bleeding off the corner.' },
	{ id: 'new/pricing-slab', axis: 'cards', name: 'Pricing slab', file: f('pricing-slab'), notes: 'Outline plans with the recommended one as a solid hue slab; 72px prices.' },
	{ id: 'new/family-footer', axis: 'footer', name: 'Family footer', file: f('family-footer'), notes: 'Footer over the product material with a glass panel, sibling products with their hue rings, giant name■ in the product hue (never oxide on another hue).' },
	{ id: 'new/editorial-margin', axis: 'layout', name: 'Editorial chapter with margin note', file: f('editorial-margin'), notes: 'Serif chapter: italic numeral, drop-cap body, hairline margin note in the right gutter.' }
	{ id: 'new/region-pulse', axis: 'section', name: 'Region pulse demo', file: f('region-pulse'), notes: 'Fourteen live region tiles with pinging latency; click to fail regions and see the three-region confirmation rule decide when to page.' },
	{ id: 'new/alert-fold', axis: 'motion', name: 'Alert folding demo', file: f('alert-fold'), notes: 'Failed checks stream in and fold into one solid product-hue alert with a counter; replay button, final state for reduced motion.' }
];
