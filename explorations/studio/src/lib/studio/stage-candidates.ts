import type { Component } from 'svelte';
import MaterialGrid from '$brand/components/material-grid.svelte';
import FloatMaterial from '$moves/review/stages/float-material.svelte';
import FloatReal from '$moves/review/stages/float-real.svelte';
import Reveal from '$moves/review/stages/reveal.svelte';
import Voxel from '$moves/review/stages/voxel.svelte';
import Desk from '$moves/review/stages/desk.svelte';
import Contour from '$moves/review/stages/contour.svelte';
import Plates from '$moves/review/stages/plates.svelte';
import SceneStage from '$brand/components/scene-stage.svelte';
import Shader from '$moves/review/stages/shader.svelte';
import RingField from '$brand/components/ring-field.svelte';
import Ascii from '$moves/review/stages/ascii.svelte';
import DiagonalHatch from '$brand/components/diagonal-hatch.svelte';

export type StageCandidate = {
	id: string;
	name: string;
	line: string;
	src: string;
	panel: boolean;
	align: 'left' | 'center';
	component: Component<any>;
	props?: Record<string, unknown>;
};

export const stages: StageCandidate[] = [
	{ id: 'material-grid', name: 'Material + hover grid', line: 'Live oxide material under a veil; the cursor reveals it cell by cell.', src: 'packages/brand-svelte/src/lib/components/material-grid.svelte', panel: true, align: 'left', component: MaterialGrid },
	{ id: 'reveal', name: 'Reveal band', line: 'The same material and hover grid, fading into the page at the bottom so content can run on under it.', src: 'src/lib/moves/review/stages/reveal.svelte', panel: true, align: 'left', component: Reveal },
	{ id: 'shader', name: 'Plain shader material', line: 'One baked material poster, full bleed, no motion. Cheapest stage.', src: 'src/lib/moves/review/stages/shader.svelte', panel: true, align: 'left', component: Shader },
	{ id: 'float-material', name: 'Floating materials', line: 'Material cards drifting away from the cursor over a faint paint grid.', src: 'src/lib/moves/review/stages/float-material.svelte', panel: false, align: 'center', component: FloatMaterial },
	{ id: 'float-real', name: 'Floating, real content', line: 'The same drift with real cards: an app window, an install terminal, a project, a post, a phone.', src: 'src/lib/moves/review/stages/float-real.svelte', panel: false, align: 'center', component: FloatReal },
	{ id: 'lattice', name: 'Lattice scene', line: 'The kit three.js lattice to the right, fading out behind the words.', src: 'packages/brand-svelte/src/lib/components/scene-stage.svelte', panel: false, align: 'left', component: SceneStage, props: { seed: 'freeoxide' } },
	{ id: 'voxel', name: 'Voxel stack', line: 'Isometric voxel stack on the plain page; blocks light up and lift under the mouse.', src: 'src/lib/moves/review/stages/voxel.svelte', panel: false, align: 'left', component: Voxel },
	{ id: 'plates', name: 'Plate stack', line: 'A stack of thin floating plates, one cut from oxide.', src: 'src/lib/moves/review/stages/plates.svelte', panel: false, align: 'left', component: Plates },
	{ id: 'desk', name: 'Desk windows', line: 'A dotted desktop that bends round the cursor, with draggable material windows at the edges.', src: 'src/lib/moves/review/stages/desk.svelte', panel: false, align: 'center', component: Desk },
	{ id: 'contour', name: 'Contour lines', line: 'Topographic lines that bend around the cursor.', src: 'src/lib/moves/review/stages/contour.svelte', panel: false, align: 'left', component: Contour },
	{ id: 'rings', name: 'Ring field', line: 'Thin rings off the edges and a few stars, drifting with the cursor. The quietest stage.', src: 'packages/brand-svelte/src/lib/components/ring-field.svelte', panel: false, align: 'center', component: RingField },
	{ id: 'ascii', name: 'Glyph rain', line: 'Columns of square glyphs raining down the right side, quiet behind the words; the cursor lights the glyphs near it and speeds the columns under it.', src: 'src/lib/moves/review/stages/ascii.svelte', panel: false, align: 'left', component: Ascii },
	{ id: 'hatch', name: 'Diagonal hatch', line: 'Fine diagonal lines thickening toward one corner; they bend toward the cursor and drift when it is away.', src: 'packages/brand-svelte/src/lib/components/diagonal-hatch.svelte', panel: false, align: 'left', component: DiagonalHatch }
];

export const stage = (id: string) => stages.find((s) => s.id === id);
