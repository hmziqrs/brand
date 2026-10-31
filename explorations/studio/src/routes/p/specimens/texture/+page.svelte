<script lang="ts">
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
	import { textureMoves } from '$moves/specimens/moves';
	import { navFor } from '$moves/specimens/pages';

	const key = (id: string) => id.replace('specimens/texture-', '');
</script>

<svelte:head><title>Texture layers · specimens</title></svelte:head>

<main class="min-h-screen bg-background pb-40 text-foreground">
	<SpecHead
		kicker="Specimens · texture"
		title="Rust is our ASCII."
		intro="Ten layers that could sit behind a hero or inside a card. Every one carries the same reading panel, so you judge the texture and not the copy. Moving ones stop for reduced motion."
		items={textureMoves.map((m) => ({ id: m.id, name: m.name }))}
		pages={navFor('texture')}
	/>
	<div class="mx-auto flex max-w-[1320px] flex-col gap-16 px-4 sm:px-8">
		{#each textureMoves as m, i (m.id)}
			<SpecFrame id={m.id} name={m.name} note={m.notes} index={i + 1} tag={key(m.id) === 'oxidize-grid' ? 'hover it' : undefined}>
				{#snippet children(mode)}
					<TextureStage align={key(m.id) === 'ring-field' || key(m.id) === 'lattice-scene' ? 'start' : 'start'}>
						{#snippet layer()}
							{#if key(m.id) === 'oxide-bloom'}
								<TintedMaterial preset="oxide-bloom" {mode} native />
							{:else if key(m.id) === 'oxide-chalk'}
								<TintedMaterial preset="oxide-chalk" {mode} />
							{:else if key(m.id) === 'halftone-print'}
								<TintedMaterial preset="halftone-print" {mode} source="dark-on-light" />
							{:else if key(m.id) === 'rust-spread'}
								<RustSpread />
							{:else if key(m.id) === 'glyph-rain'}
								<GlyphRain />
							{:else if key(m.id) === 'oxidize-grid'}
								<OxidizeGrid />
							{:else if key(m.id) === 'dot-field'}
								<DotField />
							{:else if key(m.id) === 'ring-field'}
								<RingField />
							{:else if key(m.id) === 'lattice-scene'}
								<LatticeField />
							{:else}
								<DitherGradient />
							{/if}
						{/snippet}
					</TextureStage>
				{/snippet}
			</SpecFrame>
		{/each}
	</div>
</main>
