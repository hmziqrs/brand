import type { Move } from '$studio/types';

const f = (name: string) => `src/lib/moves/site-hex/${name}.svelte`;

export const moves: Move[] = [
	{ id: 'site-hex/top-nav', axis: 'nav', name: 'Hex study: boxed centre-mark nav', file: f('top-nav'), notes: 'Mono announce strip over a hairline-boxed bar: links split either side of a centred wordmark, corner ticks, solid Get started.' },
	{ id: 'site-hex/plot-grid', axis: 'texture', name: 'Plot-paper grid with crosshair', file: f('plot-grid'), notes: 'Canvas hairline grid; cells under the cursor light up and fade, some in oxide; a crosshair with cell coordinates follows the pointer.' },
	{ id: 'site-hex/grid-hero', axis: 'hero', name: 'Centred hero with oxide marked phrase', file: f('grid-hero'), notes: 'Huge centred headline over the plot grid; the second phrase sits on a solid oxide block instead of an italic serif.' },
	{ id: 'site-hex/spot-frame', axis: 'illustration', name: 'Cursor-lean spot frame', file: f('spot-frame'), notes: 'Corner-ticked frame that feeds pointer position to the spot drawings so their layers drift at different depths.' },
	{ id: 'site-hex/spot-drilldown', axis: 'illustration', name: 'Spot: drill-down lens', file: f('spot-drilldown'), notes: 'Isometric bars on a grid floor, one oxide; a lens over it shows the cause tree.' },
	{ id: 'site-hex/spot-layers', axis: 'illustration', name: 'Spot: governed layers', file: f('spot-layers'), notes: 'Three stacked plates: tables, a model with one oxide block, a checked answer card on top.' },
	{ id: 'site-hex/spot-pipeline', axis: 'illustration', name: 'Spot: query to story pipeline', file: f('spot-pipeline'), notes: 'Query card, code card and chart card wired on a grid, an oxide block travelling the wire.' },
	{ id: 'site-hex/spot-tangent-rings', axis: 'illustration', name: 'Spot: tangent ring fans', file: f('spot-tangent-rings'), notes: 'Two fans of equal-weight rings touching at one point (the team chip), dots orbiting; rings separate in depth with the cursor.' },
	{ id: 'site-hex/spot-terrain', axis: 'illustration', name: 'Spot: cursor data terrain', file: f('spot-terrain'), notes: 'Field of isometric blocks that rises into a hill under the cursor; the peak block is oxide.' },
	{ id: 'site-hex/spot-mini', axis: 'illustration', name: 'Mini spot covers', file: f('spot-mini'), notes: 'Small isometric cover drawings (cube, curve, lock, stack, branch, mail, mic, globe) for cards.' },
	{ id: 'site-hex/split-row', axis: 'section', name: 'Spot + copy split row', file: f('split-row'), notes: 'Alternating framed spot and big white copy with an underlined arrow link.' },
	{ id: 'site-hex/resource-card', axis: 'cards', name: 'Spot-cover resource card', file: f('resource-card'), notes: 'Hairline card with a grid-paper mini spot cover, mono tag, big title, arrow link.' },
	{ id: 'site-hex/ask-demo', axis: 'section', name: 'Ask demo with typed question', file: f('ask-demo'), notes: 'Clickable example questions type themselves in, a thinking step runs, then a hatched bar answer with a trusted-model badge.' },
	{ id: 'site-hex/context-tabs', axis: 'section', name: 'Context studio tabs', file: f('context-tabs'), notes: 'Three-tab panel beside the layers spot: usage stats, unresolved terms you can add, a plain-text metric definition.' },
	{ id: 'site-hex/kpi-bento', axis: 'cards', name: 'Generative KPI tiles', file: f('kpi-bento'), notes: 'Four hairline tiles (dot map, big figure + sparkline, dashed forecast, accounts table) each with a prompt pill.' },
	{ id: 'site-hex/eval-list', axis: 'section', name: 'Eval checklist', file: f('eval-list'), notes: 'Expandable pass/fail checks for one question; failures are solid oxide squares.' },
	{ id: 'site-hex/feature-block', axis: 'layout', name: 'Sticky title + demo block', file: f('feature-block'), notes: 'Ruled section: big title, arrow link and oxide-ruled example quote left, a working demo right.' },
	{ id: 'site-hex/name-strip', axis: 'section', name: 'Invented name strip', file: f('name-strip'), notes: 'Labelled strip of invented team names set in mixed faces in place of a customer logo wall.' },
	{ id: 'site-hex/integration-tiles', axis: 'cards', name: 'Spot integration tiles', file: f('integration-tiles'), notes: 'Six gap-ruled tiles: mini spot, tool icons, title, one line.' },
	{ id: 'site-hex/oxide-cta', axis: 'accent', name: 'Solid oxide CTA slab', file: f('oxide-cta'), notes: 'Full-width vivid oxide panel, near-black type, a baked material window ruled with a grid.' },
	{ id: 'site-hex/terrain-footer', axis: 'footer', name: 'Counter + terrain footer', file: f('terrain-footer'), notes: 'Boxed footer: ticking answers counter, four link columns, giant wordmark beside a cursor-reactive block terrain.' }
];
