import type { Component } from 'svelte';
import Current from '$moves/review/heroes/current.svelte';
import Float from '$moves/review/heroes/float.svelte';
import FloatReal from '$moves/review/heroes/float-real.svelte';
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
	use: string;
	src: string;
	component: Component<any>;
	props: Record<string, unknown>;
};

export const heroes: HeroCandidate[] = [
	{
		id: 'current',
		name: 'Current',
		line: 'The kit hero today: title, lede, two buttons and a note in a narrow column, rings beside it.',
		use: 'Real use: the default landing hero for a single project or person; the rings stay the only art.',
		src: 'packages/brand-svelte/src/lib/blocks/site/hero.svelte',
		component: Current,
		props: {}
	},
	{
		id: 'float',
		name: 'Floating materials',
		line: 'Centered words over a faint paint grid, with material cards that drift away from the cursor (site-flora/home).',
		use: 'Real use: a brand backdrop only; real sites swap the material cards for product shots, as in Floating, real content.',
		src: 'src/lib/moves/site-flora/float-hero.svelte',
		component: Float,
		props: {}
	},
	{
		id: 'float-real',
		name: 'Floating, real content',
		line: 'The Floating materials layout with real cards instead of materials: an app window, an install terminal, a project card, a blog post and a phone, all drifting away from the cursor.',
		use: 'Real use: product or app landing pages, where the floating cards are screenshots and posts from the product itself.',
		src: 'src/lib/moves/review/heroes/float-real.svelte',
		component: FloatReal,
		props: {}
	},
	{
		id: 'material-grid',
		name: 'Material + hover grid',
		line: 'A full-width live oxide material under a veil; the hover grid reveals it cell by cell, words on a glass panel (flora/oxlabs-3).',
		use: 'Real use: brand backdrop for studio and agency landing pages, where the material is the art and the copy sells the service.',
		src: 'src/routes/p/flora/oxlabs-3/+page.svelte',
		component: MaterialGrid,
		props: {}
	},
	{
		id: 'reveal',
		name: 'Reveal stage',
		line: 'The same material and hover grid as a band, a giant headline with an inline tile, sources and a context board inside it (site-dovetail/home).',
		use: 'Real use: product landing for a data or B2B tool; the board below the headline is the real product UI.',
		src: 'src/lib/moves/site-dovetail/reveal-stage.svelte',
		component: Reveal,
		props: {}
	},
	{
		id: 'voxel',
		name: 'Voxel stack',
		line: 'Words left, an isometric voxel stack right that lights up and lifts under the mouse (northflank/gpui-starter-1).',
		use: 'Real use: product illustration for infra and dev tools, each block labelled with a real part of the stack.',
		src: 'src/lib/moves/northflank/iso-tile-stack.svelte',
		component: Voxel,
		props: {}
	},
	{
		id: 'desk',
		name: 'Desktop',
		line: 'A dotted desktop background with draggable windows, a giant product name and a live demo under it (site-clicky/home).',
		use: 'Real use: interactive product demo for a desktop app; the windows hold real clips and the demo under it is the product.',
		src: 'src/lib/moves/site-clicky/desk-hero.svelte',
		component: Desk,
		props: {}
	},
	{
		id: 'contour',
		name: 'Contour lines',
		line: 'Topographic lines that bend around the cursor behind a big two-tone headline (site-northflank/about).',
		use: 'Real use: about, company and mission pages, where words carry the page and the art stays quiet.',
		src: 'src/lib/moves/site-northflank/contour-field.svelte',
		component: Contour,
		props: {}
	},
	{
		id: 'plates',
		name: 'Plate stack',
		line: 'Centered freeoxide words over a stack of thin floating plates, one cut from oxide (voidzero/freeoxide-1).',
		use: 'Real use: org or project index, one plate per layer or project, the oxide plate marks the one in focus.',
		src: 'src/lib/moves/voidzero/plate-stack.svelte',
		component: Plates,
		props: {}
	}
];

export const hero = (id: string) => heroes.find((h) => h.id === id);
