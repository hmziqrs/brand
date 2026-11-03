import type { Component } from 'svelte';
import Current from '$moves/review/heroes/current.svelte';
import Float from '$moves/review/heroes/float.svelte';
import MaterialGrid from '$moves/review/heroes/material-grid.svelte';
import Reveal from '$moves/review/heroes/reveal.svelte';
import Voxel from '$moves/review/heroes/voxel.svelte';
import Desk from '$moves/review/heroes/desk.svelte';
import Contour from '$moves/review/heroes/contour.svelte';
import Plates from '$moves/review/heroes/plates.svelte';

export type HeroCandidate = {
	id: string;
	name: string;
	line: string;
	src: string;
	component: Component<any>;
	props: Record<string, unknown>;
};

export const heroes: HeroCandidate[] = [
	{
		id: 'current',
		name: 'Current',
		line: 'The kit hero today: title, lede, two buttons and a note in a narrow column, rings beside it.',
		src: 'packages/brand-svelte/src/lib/blocks/site/hero.svelte',
		component: Current,
		props: {}
	},
	{
		id: 'float',
		name: 'Floating materials',
		line: 'Centered words over a faint paint grid, with material cards that drift away from the cursor (site-flora/home).',
		src: 'src/lib/moves/site-flora/float-hero.svelte',
		component: Float,
		props: {}
	},
	{
		id: 'material-grid',
		name: 'Material + hover grid',
		line: 'A full-width live oxide material under a veil; the hover grid reveals it cell by cell, words on a glass panel (flora/oxlabs-3).',
		src: 'src/routes/p/flora/oxlabs-3/+page.svelte',
		component: MaterialGrid,
		props: {}
	},
	{
		id: 'reveal',
		name: 'Reveal stage',
		line: 'The same material and hover grid as a band, a giant headline with an inline tile, sources and a context board inside it (site-dovetail/home).',
		src: 'src/lib/moves/site-dovetail/reveal-stage.svelte',
		component: Reveal,
		props: {}
	},
	{
		id: 'voxel',
		name: 'Voxel stack',
		line: 'Words left, an isometric voxel stack right that lights up and lifts under the mouse (northflank/gpui-starter-1).',
		src: 'src/lib/moves/northflank/iso-tile-stack.svelte',
		component: Voxel,
		props: {}
	},
	{
		id: 'desk',
		name: 'Desktop',
		line: 'A dotted desktop background with draggable windows, a giant product name and a live demo under it (site-clicky/home).',
		src: 'src/lib/moves/site-clicky/desk-hero.svelte',
		component: Desk,
		props: {}
	},
	{
		id: 'contour',
		name: 'Contour lines',
		line: 'Topographic lines that bend around the cursor behind a big two-tone headline (site-northflank/about).',
		src: 'src/lib/moves/site-northflank/contour-field.svelte',
		component: Contour,
		props: {}
	},
	{
		id: 'plates',
		name: 'Plate stack',
		line: 'Centered freeoxide words over a stack of thin floating plates, one cut from oxide (voidzero/freeoxide-1).',
		src: 'src/lib/moves/voidzero/plate-stack.svelte',
		component: Plates,
		props: {}
	}
];

export const hero = (id: string) => heroes.find((h) => h.id === id);
