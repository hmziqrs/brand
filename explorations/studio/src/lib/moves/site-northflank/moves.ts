import type { Move } from '$studio/types';

const f = (name: string) => `src/lib/moves/site-northflank/${name}.svelte`;

export const moves: Move[] = [
	{ id: 'site-northflank/site-header', axis: 'nav', name: 'Site header + mega menus', file: f('site-header'), notes: 'Notice strip, wordmark, Platform/Resources hover menus, plain links, Log in and a key-hint Get started; details menu on mobile.' },
	{ id: 'site-northflank/site-footer', axis: 'footer', name: 'Cursor-dither footer', file: f('site-footer'), notes: 'Five link columns, compliance chips and status, then a dither field that blooms under the cursor into a giant wordmark.' },
	{ id: 'site-northflank/cursor-dither', axis: 'texture', name: 'Cursor dither field', file: f('cursor-dither'), notes: 'Bayer-dithered oxide squares that grow and turn yellow inside a lens that follows the pointer.' },
	{ id: 'site-northflank/voxel-runtime', axis: 'hero', name: 'Mouse-reactive voxel runtime', file: f('voxel-runtime'), notes: 'Canvas isometric scene: sandbox voxels rise under the cursor, ripple on click (spawn counter), hovered blocks lift and light their label.' },
	{ id: 'site-northflank/workload-bento', axis: 'cards', name: 'Live workload bento', file: f('workload-bento'), notes: 'Five cards with working mini UIs: scale deployments, wake harnesses, SSO app grid, cloud picker, workload icon rows.' },
	{ id: 'site-northflank/control-plane', axis: 'illustration', name: 'Control-plane map', file: f('control-plane'), notes: 'Audiences → control plane → run targets; pointing at an audience lights its capabilities, wires and targets in oxide.' },
	{ id: 'site-northflank/primitive-tabs', axis: 'section', name: 'Primitive code tabs', file: f('primitive-tabs'), notes: 'Tab rail of primitives beside an SDK snippet and an output log that prints in line by line.' },
	{ id: 'site-northflank/enterprise-panel', axis: 'accent', name: 'Oxide enterprise panel', file: f('enterprise-panel'), notes: 'Solid oxide statement half with compliance chips and CTAs, beside a six-cell feature grid.' },
	{ id: 'site-northflank/cta-band', axis: 'section', name: 'Command CTA band', file: f('cta-band'), notes: 'Two-tone giant closing line, key-hint buttons and a stacked install command card with an oxide glow.' },
	{ id: 'site-northflank/tier-cards', axis: 'cards', name: 'Tier cards', file: f('tier-cards'), notes: 'Three plan cards with a price, a key-hint CTA and checks; the middle one carries an oxide top rule and glow.' },
	{ id: 'site-northflank/rate-sheet', axis: 'section', name: 'Live rate sheet', file: f('rate-sheet'), notes: 'One card holding usage rates (hour/month toggle), compute plans (expandable) and GPUs with clickable pack sizes.' },
	{ id: 'site-northflank/bill-estimator', axis: 'section', name: 'Bill estimator', file: f('bill-estimator'), notes: 'Preset app shapes, cloud toggle, size selects and counts that recompute a big mono monthly total.' },
	{ id: 'site-northflank/price-compare', axis: 'section', name: 'Price comparison tabs', file: f('price-compare'), notes: 'Tabs of generic alternatives against our prices with oxide savings bars; illustrative figures, no named rivals.' },
	{ id: 'site-northflank/plan-matrix', axis: 'layout', name: 'Plan matrix', file: f('plan-matrix'), notes: 'Sticky plan header, grouped feature rows with oxide checks, highlighted middle column, fold to expand.' },
	{ id: 'site-northflank/ring-node-field', axis: 'illustration', name: 'Ring node field', file: f('ring-node-field'), notes: 'Thin concentric rings and iso cluster nodes on dashed links; rings parallax toward the cursor, the nearest node turns oxide and solidifies its links.' },
	{ id: 'site-northflank/console-mock', axis: 'illustration', name: 'Cluster console mock', file: f('console-mock'), notes: 'App-window console for a cluster with working tabs: details, observe chart, node pools, history.' },
	{ id: 'site-northflank/feature-quad', axis: 'layout', name: 'Labelled feature quad', file: f('feature-quad'), notes: 'Sticky mono label + headline beside four icon cards (or stacked in a row); icon tile fills oxide on hover.' }
];
