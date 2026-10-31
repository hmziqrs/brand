<script lang="ts">
	import SpecHead from '$moves/specimens/spec-head.svelte';
	import SpecFrame from '$moves/specimens/spec-frame.svelte';
	import LightOverview from '$moves/specimens/light-overview.svelte';
	import LightMiniPage from '$moves/specimens/light-mini-page.svelte';
	import LightContrast from '$moves/specimens/light-contrast.svelte';
	import { treatments } from '$moves/specimens/light-treatments';
	import { lightMoves } from '$moves/specimens/moves';
	import { navFor } from '$moves/specimens/pages';
</script>

<svelte:head><title>Light lab · specimens</title></svelte:head>

<main class="min-h-screen bg-background pb-40 text-foreground">
	<SpecHead
		kicker="Specimens · light lab"
		title="Fixing the brown leather."
		intro="One small page under five light treatments, each set with scoped variables on its own wrapper, so the global switch does not touch them. Every text role gets its measured WCAG ratio beside it."
		items={lightMoves.map((m) => ({ id: m.id, name: m.name }))}
		pages={navFor('light-lab')}
	/>
	<div class="mx-auto flex max-w-[1320px] flex-col gap-20 px-4 sm:px-8">
		<section class="flex flex-col gap-5">
			<div class="flex flex-col gap-2">
				<h2 class="text-[clamp(1.8rem,4vw,2.8rem)] leading-none font-medium tracking-[-0.04em]">Side by side</h2>
				<p class="max-w-[62ch] text-[17px] leading-relaxed">All five at a glance, scaled down. Full size with contrast tables below.</p>
			</div>
			<LightOverview />
		</section>
		{#each treatments as t, i (t.key)}
			{@const m = lightMoves[i]}
			<SpecFrame id={m.id} name={t.name} note={t.note} index={i + 1} panes={['light']} labels={{ light: 'scoped light treatment' }} tag={i === 0 ? 'current' : undefined}>
				{#snippet children()}
					<div class="grid xl:grid-cols-[minmax(0,1fr)_360px]">
						<LightMiniPage {t} />
						<div class="flex flex-col gap-3 border-t p-5 xl:border-t-0 xl:border-l">
							<span class="font-mono text-[11px] tracking-wide uppercase">Contrast, WCAG 2</span>
							<LightContrast {t} />
						</div>
					</div>
				{/snippet}
			</SpecFrame>
		{/each}
	</div>
</main>
