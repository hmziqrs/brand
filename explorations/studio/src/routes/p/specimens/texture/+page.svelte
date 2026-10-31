<script lang="ts">
	import type { Component } from 'svelte';
	import SpecHead from '$moves/specimens/spec-head.svelte';
	import SpecFrame from '$moves/specimens/spec-frame.svelte';
	import TextureStage from '$moves/specimens/texture-stage.svelte';
	import TintedMaterial from '$moves/specimens/tinted-material.svelte';
	import RustSpread from '$moves/specimens/rust-spread.svelte';
	import GlyphRain from '$moves/specimens/glyph-rain.svelte';
	import OxidizeGrid from '$moves/specimens/oxidize-grid.svelte';
	import DotField from '$moves/specimens/dot-field.svelte';
	import RingField from '$moves/specimens/ring-field.svelte';
	import LatticeField from '$moves/specimens/lattice-field.svelte';
	import DitherGradient from '$moves/specimens/dither-gradient.svelte';
	import DiagonalHatch from '$moves/specimens/diagonal-hatch.svelte';
	import MagneticDots from '$moves/specimens/magnetic-dots.svelte';
	import RustLinger from '$moves/specimens/rust-linger.svelte';
	import RippleRings from '$moves/specimens/ripple-rings.svelte';
	import GridWarp from '$moves/specimens/grid-warp.svelte';
	import GlyphScatter from '$moves/specimens/glyph-scatter.svelte';
	import IronFilings from '$moves/specimens/iron-filings.svelte';
	import ContourMap from '$moves/specimens/contour-map.svelte';
	import VoxelRelief from '$moves/specimens/voxel-relief.svelte';
	import { textureMoves } from '$moves/specimens/moves';
	import { navFor } from '$moves/specimens/pages';

	const canvases: Record<string, Component> = {
		'diagonal-hatch': DiagonalHatch,
		'magnetic-dots': MagneticDots,
		'rust-linger': RustLinger,
		'ripple-rings': RippleRings,
		'grid-warp': GridWarp,
		'glyph-scatter': GlyphScatter,
		'iron-filings': IronFilings,
		'contour-map': ContourMap,
		'voxel-relief': VoxelRelief,
		'oxidize-grid': OxidizeGrid,
		'rust-spread': RustSpread,
		'glyph-rain': GlyphRain,
		'dither-gradient': DitherGradient,
		'dot-field': DotField,
		'ring-field': RingField,
		'lattice-scene': LatticeField
	};
	const fresh = new Set(['diagonal-hatch', 'magnetic-dots', 'rust-linger', 'ripple-rings', 'grid-warp', 'glyph-scatter', 'iron-filings', 'contour-map', 'voxel-relief']);
	const key = (id: string) => id.replace('specimens/texture-', '');
</script>

<svelte:head><title>Texture layers · specimens</title></svelte:head>

<main class="min-h-screen bg-background pb-40 text-foreground">
	<SpecHead
		kicker="Specimens · texture"
		title="Rust is our ASCII."
		intro="Nineteen layers that could sit behind a hero or inside a card, and every one of them answers the cursor. Move over a pane to play with it; when you leave, most fall back to a slow ghost cursor. Each carries the same reading panel, so you judge the texture and not the copy. Motion stops for reduced motion, but the cursor still redraws the still frame."
		items={textureMoves.map((m) => ({ id: m.id, name: m.name }))}
		pages={navFor('texture')}
	/>
	<div class="mx-auto flex max-w-[1320px] flex-col gap-16 px-4 sm:px-8">
		{#each textureMoves as m, i (m.id)}
			{@const k = key(m.id)}
			{@const Layer = canvases[k]}
			<SpecFrame id={m.id} name={m.name} note={m.notes} index={i + 1} tag={fresh.has(k) ? 'new · move the cursor' : 'cursor'}>
				{#snippet children(mode)}
					<TextureStage>
						{#snippet layer()}
							{#if Layer}
								<Layer />
							{:else if k === 'oxide-bloom'}
								<TintedMaterial preset="oxide-bloom" {mode} native />
							{:else if k === 'oxide-chalk'}
								<TintedMaterial preset="oxide-chalk" {mode} />
							{:else}
								<TintedMaterial preset="halftone-print" {mode} source="dark-on-light" />
							{/if}
						{/snippet}
					</TextureStage>
				{/snippet}
			</SpecFrame>
		{/each}
	</div>
</main>
