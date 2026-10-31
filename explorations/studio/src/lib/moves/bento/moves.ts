import type { Move } from '$studio/types';

const f = (n: string) => `src/lib/moves/bento/${n}.svelte`;

export const moves: Move[] = [
	{ id: 'bento/product-hero', axis: 'hero', name: 'Product-UI hero', file: f('product-hero'), notes: 'Huge white headline over a real app window that sits on oxide material, a soft oxide glow, or nothing.' },
	{ id: 'bento/forge-app-window', axis: 'illustration', name: 'Mock app with docked devtools', file: f('forge-app-window'), notes: 'A believable GPUI desktop app (PR inbox) with live background-refetch state, an optimistic row and optional numbered oxide callouts.' },
	{ id: 'bento/devtools-inspector', axis: 'illustration', name: 'Devtools inspector', file: f('devtools-inspector'), notes: 'Working query inspector: keys tick fresh→stale, fetching is solid oxide, Refetch/Invalidate buttons work.' },
	{ id: 'bento/cache-timeline', axis: 'illustration', name: 'Cache timeline', file: f('cache-timeline'), notes: 'Per-key lanes of fetch / fresh / stale / gc with a scanning playhead; optional stale_time slider recomputes fetches vs cache hits.' },
	{ id: 'bento/refetch-pulse', axis: 'motion', name: 'Refetch pulse', file: f('refetch-pulse'), notes: 'Oxide ring pulses out of a query on focus / reconnect / interval / invalidate while the data stays on screen.' },
	{ id: 'bento/mutation-rollback', axis: 'illustration', name: 'Mutation rollback', file: f('mutation-rollback'), notes: 'Optimistic approve: count jumps in oxide, request in flight, then commit (green) or rollback (red); server answer is toggleable.' },
	{ id: 'bento/oxide-tile', axis: 'accent', name: 'Solid oxide tile', file: f('oxide-tile'), notes: 'One vivid oxide card per grid: giant number or statement in near-black, rings art in the on-orange ink.' },
	{ id: 'bento/material-tile', axis: 'cards', name: 'Material tile', file: f('material-tile'), notes: 'A bento cell that is pure shader material with the words on a smoke-glass or solid reading panel.' },
	{ id: 'bento/oxide-mark-headline', axis: 'type', name: 'Oxide-marked headline', file: f('oxide-mark-headline'), notes: 'One phrase in a white headline set on a solid oxide block, like a highlighter; optional serif italic.' },
	{ id: 'bento/spec-rail', axis: 'layout', name: 'Spec rail', file: f('spec-rail'), notes: 'Docs-style sticky numbered rail with oxide active state beside dense landing sections; becomes a sticky chip bar on phones.' }
];
