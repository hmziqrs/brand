<script lang="ts">
	import type { Component } from 'svelte';
	import SpecHead from '$moves/specimens/spec-head.svelte';
	import SpecFrame from '$moves/specimens/spec-frame.svelte';
	import FooterCurrent from '$moves/specimens/footer-current.svelte';
	import FooterMaterialWordmark from '$moves/specimens/footer-material-wordmark.svelte';
	import FooterMaterialDither from '$moves/specimens/footer-material-dither.svelte';
	import FooterDotMatrix from '$moves/specimens/footer-dot-matrix.svelte';
	import FooterGlyphWordmark from '$moves/specimens/footer-glyph-wordmark.svelte';
	import FooterHatchPunch from '$moves/specimens/footer-hatch-punch.svelte';
	import FooterRippleSignoff from '$moves/specimens/footer-ripple-signoff.svelte';
	import FooterVoxelRidge from '$moves/specimens/footer-voxel-ridge.svelte';
	import FooterTerminal from '$moves/specimens/footer-terminal.svelte';
	import FooterOxideSplit from '$moves/specimens/footer-oxide-split.svelte';
	import FooterProductIndex from '$moves/specimens/footer-product-index.svelte';
	import FooterOxideBand from '$moves/specimens/footer-oxide-band.svelte';
	import { footerMoves } from '$moves/specimens/moves';
	import { navFor } from '$moves/specimens/pages';

	const views: Record<string, Component> = {
		'giant-wordmark': FooterCurrent,
		'material-wordmark': FooterMaterialWordmark,
		'dot-matrix': FooterDotMatrix,
		'glyph-wordmark': FooterGlyphWordmark,
		'hatch-punch': FooterHatchPunch,
		'ripple-signoff': FooterRippleSignoff,
		'voxel-ridge': FooterVoxelRidge,
		terminal: FooterTerminal,
		'oxide-split': FooterOxideSplit,
		'product-index': FooterProductIndex,
		'oxide-band': FooterOxideBand
	};
	const cursor = new Set(['material-dither', 'dot-matrix', 'glyph-wordmark', 'hatch-punch', 'ripple-signoff', 'voxel-ridge']);
	const fresh = new Set(['glyph-wordmark', 'hatch-punch', 'ripple-signoff', 'voxel-ridge', 'terminal', 'oxide-split', 'product-index']);
	const key = (id: string) => id.replace('specimens/footer-', '');
	const tag = (k: string, i: number) => (i === 0 ? 'current' : fresh.has(k) ? (cursor.has(k) ? 'new · cursor' : 'new') : cursor.has(k) ? 'cursor' : undefined);
</script>

<svelte:head><title>Footers · specimens</title></svelte:head>

<main class="min-h-screen bg-background pb-40 text-foreground">
	<SpecHead
		kicker="Specimens · footer"
		title="Sign off louder."
		intro="Every hmziq site ends on its name. Twelve ways to make that last screen memorable without hiding the links; six of them answer the cursor. Each runs full width, dark first, light under it."
		items={footerMoves.map((m) => ({ id: m.id, name: m.name }))}
		pages={navFor('footer')}
	/>
	<div class="mx-auto flex max-w-[1320px] flex-col gap-20 px-4 sm:px-8">
		{#each footerMoves as m, i (m.id)}
			{@const k = key(m.id)}
			{@const View = views[k]}
			<SpecFrame id={m.id} name={m.name} note={m.notes} index={i + 1} layout="stack" tag={tag(k, i)}>
				{#snippet children(mode)}
					{#if View}
						<View />
					{:else}
						<FooterMaterialDither {mode} />
					{/if}
				{/snippet}
			</SpecFrame>
		{/each}
	</div>
</main>
