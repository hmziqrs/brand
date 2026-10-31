<script lang="ts">
	import type { Component } from 'svelte';
	import SpecHead from '$moves/specimens/spec-head.svelte';
	import SpecFrame from '$moves/specimens/spec-frame.svelte';
	import AccentPage from '$moves/specimens/accent-page.svelte';
	import AccentApp from '$moves/specimens/accent-app.svelte';
	import OxideSolidCard from '$moves/specimens/oxide-solid-card.svelte';
	import OxideBand from '$moves/specimens/oxide-band.svelte';
	import OxideHalfField from '$moves/specimens/oxide-half-field.svelte';
	import OxideWordSlab from '$moves/specimens/oxide-word-slab.svelte';
	import OxideInlineObject from '$moves/specimens/oxide-inline-object.svelte';
	import OxideStatTiles from '$moves/specimens/oxide-stat-tiles.svelte';
	import OxideButtons from '$moves/specimens/oxide-buttons.svelte';
	import OxideMarkers from '$moves/specimens/oxide-markers.svelte';
	import SwapControls from '$studio/swap-controls.svelte';
	import { accentMoves } from '$moves/specimens/moves';
	import { navFor } from '$moves/specimens/pages';

	const views: Record<string, Component> = {
		'in-landing': AccentPage,
		'in-app': AccentApp,
		'solid-card': OxideSolidCard,
		'full-band': OxideBand,
		'half-bleed': OxideHalfField,
		'headline-word': OxideWordSlab,
		'inline-object': OxideInlineObject,
		'stat-tile': OxideStatTiles,
		'button-set': OxideButtons,
		'marker-system': OxideMarkers
	};
	const key = (id: string) => id.replace('specimens/accent-', '');
	const context = accentMoves.filter((m) => key(m.id).startsWith('in-'));
	const parts = accentMoves.filter((m) => !key(m.id).startsWith('in-'));
</script>

<svelte:head><title>Oxide as a surface · specimens</title></svelte:head>

<main class="min-h-screen bg-background pb-40 text-foreground">
	<SpecHead
		kicker="Specimens · accent"
		title="Spend oxide as a surface."
		intro="Oxide stops being a link colour and becomes something you stand on. First as it would ship: a whole landing page and a product screen, each in dark and light. Then every piece on its own at full width. Swap the hue below to see the same compositions in any brand colour."
		items={accentMoves.map((m) => ({ id: m.id, name: m.name }))}
		pages={navFor('accent')}
	/>
	<div class="mx-auto flex max-w-[1320px] flex-col gap-20 px-4 sm:px-8">
		<div class="rounded-xl border bg-card p-4"><SwapControls layout="inline" /></div>
		<section class="flex flex-col gap-16">
			<h2 class="text-[clamp(2rem,5vw,3.5rem)] leading-none font-medium tracking-[-0.04em]">In context</h2>
			{#each context as m, i (m.id)}
				{@const View = views[key(m.id)]}
				<SpecFrame id={m.id} name={m.name} note={m.notes} index={i + 1} layout="stack" tag="composition">
					{#snippet children()}
						<View />
					{/snippet}
				</SpecFrame>
			{/each}
		</section>
		<section class="flex flex-col gap-16 border-t pt-16">
			<h2 class="text-[clamp(2rem,5vw,3.5rem)] leading-none font-medium tracking-[-0.04em]">The pieces</h2>
			{#each parts as m, i (m.id)}
				{@const View = views[key(m.id)]}
				<SpecFrame id={m.id} name={m.name} note={m.notes} index={context.length + i + 1} layout="stack">
					{#snippet children()}
						<View />
					{/snippet}
				</SpecFrame>
			{/each}
		</section>
	</div>
</main>
