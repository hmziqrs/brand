<script lang="ts">
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import { Button } from '$brand/ui/button/index.js';
	import ModeBand from '$moves/voidzero/mode-band.svelte';
	import PlateStack from '$moves/voidzero/plate-stack.svelte';
	import GiantCounter from '$moves/voidzero/giant-counter.svelte';
	import MaterialInk from '$moves/voidzero/material-ink.svelte';
	import SiteHeader from '$moves/site-voidzero/site-header.svelte';
	import SiteFooter from '$moves/site-voidzero/site-footer.svelte';
	import GridHero from '$moves/site-voidzero/grid-hero.svelte';
	import LogoMarquee from '$moves/site-voidzero/logo-marquee.svelte';
	import ToolRail from '$moves/site-voidzero/tool-rail.svelte';
	import BackerGrid from '$moves/site-voidzero/backer-grid.svelte';
	import FeaturedUpdates from '$moves/site-voidzero/featured-updates.svelte';
	import { tools, posts, downloads, to } from '$moves/site-voidzero/site';

	const plates = [
		{ label: 'temper', side: 'left' as const },
		{ label: 'smelt', side: 'right' as const },
		{ label: 'flint', side: 'left' as const },
		{ label: 'assay', side: 'right' as const },
		{ label: 'kiln', side: 'left' as const, preset: 'copper-sweep', symbol: 'Bl' }
	];
</script>

<svelte:head><title>Bloomery · the web tooling company</title></svelte:head>

<div class="min-h-screen bg-background text-foreground">
	<SiteHeader />

	<GridHero chip="build server / running" lede="Making people who build for the web faster than they have ever been.">
		{#snippet title()}The web <MaterialInk preset="copper-sweep">tooling</MaterialInk> company{/snippet}
		{#snippet art()}<PlateStack {plates} gap={36} label="Five tools stacked as thin plates, the unified toolchain on top" class="mx-auto max-w-[900px]" />{/snippet}
	</GridHero>

	<ModeBand frame>
		<LogoMarquee />
	</ModeBand>

	<ModeBand tone="ink" frame id="open-source">
		<p class="border-b border-border px-6 py-4 font-mono text-xs text-muted-foreground uppercase sm:px-10">oss</p>
		<div class="grid gap-6 px-6 pt-16 pb-14 sm:px-10 md:pt-24 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end">
			<h2 class="text-5xl leading-[0.98] font-medium tracking-[-0.045em] sm:text-7xl">Open source</h2>
			<p class="max-w-[42ch] text-xl leading-relaxed text-foreground/90">We write, maintain and review some of the build tools a large part of the web runs on. All five live in the open.</p>
		</div>
		<ToolRail {tools} />
	</ModeBand>

	<ModeBand frame>
		<h2 class="max-w-[20ch] px-6 py-14 text-4xl leading-[1.04] font-medium tracking-[-0.04em] sm:px-10 sm:text-5xl md:py-20">Used by millions of developers every week</h2>
		<GiantCounter
			total={4182553017}
			label="Total downloads of Flint since its first release"
			series={downloads}
			from="Jan 2021"
			layout="stacked"
			class="max-sm:[&_.tracking-\[-0\.055em\]]:text-[10.2vw]"
			preset="copper-sweep"
			stats={[
				{ value: 118400000, label: 'Weekly package downloads' },
				{ value: 81200, label: 'GitHub stars' },
				{ value: 1240, label: 'Contributors' }
			]}
		/>
	</ModeBand>

	<ModeBand tone="oxide" frame inner="px-6 py-24 sm:px-10 md:py-36">
		<p class="mx-auto max-w-[22ch] text-center text-4xl leading-[1.08] font-medium tracking-[-0.04em] text-balance sm:text-6xl">We are here to make the next wave of web developers faster than any before them.</p>
		<div class="mt-10 flex justify-center"><Button href={to('about')} size="lg" class="px-5">Read why<ArrowRight class="lucide" data-icon="inline-end" /></Button></div>
	</ModeBand>

	<ModeBand frame>
		<BackerGrid class="border-t-0" />
	</ModeBand>

	<ModeBand frame inner="py-16 md:py-24">
		<FeaturedUpdates {posts} />
	</ModeBand>

	<SiteFooter />
</div>
