import type { Component } from 'svelte';
import MaterialGrid from '$moves/review/stages/material-grid.svelte';
import FloatMaterial from '$moves/review/stages/float-material.svelte';
import FloatReal from '$moves/review/stages/float-real.svelte';
import Reveal from '$moves/review/stages/reveal.svelte';
import Voxel from '$moves/review/stages/voxel.svelte';
import Desk from '$moves/review/stages/desk.svelte';
import Contour from '$moves/review/stages/contour.svelte';
import Plates from '$moves/review/stages/plates.svelte';
import Lattice from '$moves/review/stages/lattice.svelte';
import Shader from '$moves/review/stages/shader.svelte';
import Rings from '$moves/review/stages/rings.svelte';
import Grid from '$moves/review/stages/grid.svelte';

export type StageCandidate = {
	id: string;
	name: string;
	line: string;
	src: string;
	panel: boolean;
	align: 'left' | 'center';
	component: Component<any>;
};

export const stages: StageCandidate[] = [
	{ id: 'material-grid', name: 'Material + hover grid', line: 'Live oxide material under a veil; the cursor reveals it cell by cell.', src: 'src/lib/moves/review/stages/material-grid.svelte', panel: true, align: 'left', component: MaterialGrid },
	{ id: 'reveal', name: 'Reveal band', line: 'The same material and hover grid, fading into the page at the bottom so content can run on under it.', src: 'src/lib/moves/review/stages/reveal.svelte', panel: true, align: 'left', component: Reveal },
	{ id: 'shader', name: 'Plain shader material', line: 'One baked material poster, full bleed, no motion. Cheapest stage.', src: 'src/lib/moves/review/stages/shader.svelte', panel: true, align: 'left', component: Shader },
	{ id: 'float-material', name: 'Floating materials', line: 'Material cards drifting away from the cursor over a faint paint grid.', src: 'src/lib/moves/review/stages/float-material.svelte', panel: false, align: 'center', component: FloatMaterial },
	{ id: 'float-real', name: 'Floating, real content', line: 'The same drift with real cards: an app window, an install terminal, a project, a post, a phone.', src: 'src/lib/moves/review/stages/float-real.svelte', panel: false, align: 'center', component: FloatReal },
	{ id: 'lattice', name: 'Lattice scene', line: 'The kit three.js lattice to the right, fading out behind the words.', src: 'src/lib/moves/review/stages/lattice.svelte', panel: false, align: 'left', component: Lattice },
	{ id: 'voxel', name: 'Voxel stack', line: 'Isometric voxel stack on a faint grid; blocks light up and lift under the mouse.', src: 'src/lib/moves/review/stages/voxel.svelte', panel: false, align: 'left', component: Voxel },
	{ id: 'plates', name: 'Plate stack', line: 'A stack of thin floating plates, one cut from oxide.', src: 'src/lib/moves/review/stages/plates.svelte', panel: false, align: 'left', component: Plates },
	{ id: 'desk', name: 'Desk windows', line: 'A dotted desktop that bends round the cursor, with draggable material windows at the edges.', src: 'src/lib/moves/review/stages/desk.svelte', panel: false, align: 'center', component: Desk },
	{ id: 'contour', name: 'Contour lines', line: 'Topographic lines that bend around the cursor.', src: 'src/lib/moves/review/stages/contour.svelte', panel: false, align: 'left', component: Contour },
	{ id: 'rings', name: 'Ring field', line: 'Thin rings off the edges and a few stars, drifting with the cursor. The quietest stage.', src: 'src/lib/moves/review/stages/rings.svelte', panel: false, align: 'center', component: Rings },
	{ id: 'grid', name: 'Quiet grid', line: 'A faint static grid fading out from the centre. The Product and Personal default.', src: 'src/lib/moves/review/stages/grid.svelte', panel: false, align: 'center', component: Grid }
];

export const stage = (id: string) => stages.find((s) => s.id === id);
