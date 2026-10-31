<script lang="ts">
	import SpecHead from '$moves/specimens/spec-head.svelte';
	import SpecFrame from '$moves/specimens/spec-frame.svelte';
	import FooterCurrent from '$moves/specimens/footer-current.svelte';
	import FooterMaterialWordmark from '$moves/specimens/footer-material-wordmark.svelte';
	import FooterMaterialDither from '$moves/specimens/footer-material-dither.svelte';
	import FooterDotMatrix from '$moves/specimens/footer-dot-matrix.svelte';
	import FooterRingHorizon from '$moves/specimens/footer-ring-horizon.svelte';
	import FooterOxideBand from '$moves/specimens/footer-oxide-band.svelte';
	import { footerMoves } from '$moves/specimens/moves';
	import { navFor } from '$moves/specimens/pages';

	const key = (id: string) => id.replace('specimens/footer-', '');
</script>

<svelte:head><title>Footers · specimens</title></svelte:head>

<main class="min-h-screen bg-background pb-40 text-foreground">
	<SpecHead
		kicker="Specimens · footer"
		title="Sign off louder."
		intro="Every hmziq site ends on its name. Six ways to make that last screen memorable without hiding the links: each footer runs full width, dark first, light under it."
		items={footerMoves.map((m) => ({ id: m.id, name: m.name }))}
		pages={navFor('footer')}
	/>
	<div class="mx-auto flex max-w-[1320px] flex-col gap-20 px-4 sm:px-8">
		{#each footerMoves as m, i (m.id)}
			<SpecFrame id={m.id} name={m.name} note={m.notes} index={i + 1} layout="stack" tag={i === 0 ? 'current' : undefined}>
				{#snippet children(mode)}
					{#if key(m.id) === 'giant-wordmark'}
						<FooterCurrent />
					{:else if key(m.id) === 'material-wordmark'}
						<FooterMaterialWordmark />
					{:else if key(m.id) === 'material-dither'}
						<FooterMaterialDither {mode} />
					{:else if key(m.id) === 'dot-matrix'}
						<FooterDotMatrix />
					{:else if key(m.id) === 'ring-horizon'}
						<FooterRingHorizon />
					{:else}
						<FooterOxideBand />
					{/if}
				{/snippet}
			</SpecFrame>
		{/each}
	</div>
</main>
