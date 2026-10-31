<script lang="ts">
	import SpecHead from '$moves/specimens/spec-head.svelte';
	import SpecFrame from '$moves/specimens/spec-frame.svelte';
	import OxideSolidCard from '$moves/specimens/oxide-solid-card.svelte';
	import OxideBand from '$moves/specimens/oxide-band.svelte';
	import OxideHalfField from '$moves/specimens/oxide-half-field.svelte';
	import OxideWordSlab from '$moves/specimens/oxide-word-slab.svelte';
	import OxideInlineObject from '$moves/specimens/oxide-inline-object.svelte';
	import OxideStatTiles from '$moves/specimens/oxide-stat-tiles.svelte';
	import OxideButtons from '$moves/specimens/oxide-buttons.svelte';
	import OxideMarkers from '$moves/specimens/oxide-markers.svelte';
	import { accentMoves } from '$moves/specimens/moves';
	import { navFor } from '$moves/specimens/pages';

	const views = {
		'solid-card': OxideSolidCard,
		'full-band': OxideBand,
		'half-bleed': OxideHalfField,
		'headline-word': OxideWordSlab,
		'inline-object': OxideInlineObject,
		'stat-tile': OxideStatTiles,
		'button-set': OxideButtons,
		'marker-system': OxideMarkers
	} as const;
	const view = (id: string) => views[id.replace('specimens/accent-', '') as keyof typeof views];
</script>

<svelte:head><title>Oxide as a surface · specimens</title></svelte:head>

<main class="min-h-screen bg-background pb-40 text-foreground">
	<SpecHead
		kicker="Specimens · accent"
		title="Spend oxide as a surface."
		intro="Oxide stops being a link colour and becomes something you can stand on: cards, bands, fields, slabs and tiles, with near-black text on top. The light panes follow the A / B / C switch in the studio bar."
		items={accentMoves.map((m) => ({ id: m.id, name: m.name }))}
		pages={navFor('accent')}
	/>
	<div class="mx-auto flex max-w-[1320px] flex-col gap-16 px-4 sm:px-8">
		{#each accentMoves as m, i (m.id)}
			{@const View = view(m.id)}
			<SpecFrame id={m.id} name={m.name} note={m.notes} index={i + 1}>
				{#snippet children()}
					<View />
				{/snippet}
			</SpecFrame>
		{/each}
	</div>
</main>
