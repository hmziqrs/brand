<script lang="ts">
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import { siGithub } from 'simple-icons';
	import { Button } from '$brand/ui/button/index.js';
	import BrandIcon from '$brand/components/brand-icon.svelte';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import MaterialTile from '$brand/components/material-tile.svelte';
	import TopNav from '$moves/voidzero/top-nav.svelte';
	import MaterialInk from '$moves/voidzero/material-ink.svelte';
	import ModeBand from '$moves/voidzero/mode-band.svelte';
	import ProjectRail from '$moves/voidzero/project-rail.svelte';
	import GiantCounter from '$moves/voidzero/giant-counter.svelte';
	import UpdatesRail from '$moves/voidzero/updates-rail.svelte';
	import MaterialStripCta from '$moves/voidzero/material-strip-cta.svelte';
	import Footer from '$moves/voidzero/material-wordmark-footer.svelte';
	import { projects, updates, downloads } from '$moves/voidzero/freeoxide';

	const promises = [
		{ word: 'Docs', preset: 'copper-sweep', line: 'Written for people who have never opened the source.' },
		{ word: 'Tests', preset: 'liquid-chrome', line: 'Run on every change, on every system the tool claims.' },
		{ word: 'Reviews', preset: 'optical-field', line: 'Five separate passes, each looking for one kind of mistake, before a version number.' }
	];
</script>

<svelte:head><title>freeoxide · Material max</title></svelte:head>

<div class="dark min-h-screen bg-background text-foreground">
	<section class="relative isolate flex min-h-[max(100svh,46rem)] flex-col justify-end overflow-hidden">
		<ShaderMaterial preset="copper-sweep" rendering="live" animated loading="eager" fetchpriority="high" class="absolute inset-0 -z-10" />
		<div aria-hidden="true" class="absolute inset-0 -z-10 bg-gradient-to-t from-background/70 via-transparent to-background/30"></div>
		<TopNav variant="floating" />
		<div class="mx-auto grid w-full max-w-[1280px] gap-4 px-4 pt-28 pb-16 sm:px-6 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] lg:items-end lg:pb-20">
			<div class="rounded-2xl bg-background/92 p-7 shadow-2xl backdrop-blur-xl sm:p-12">
				<h1 class="text-[clamp(3rem,7vw,6.75rem)] leading-[0.95] font-medium tracking-[-0.05em] text-balance">Free Rust tools, <MaterialInk preset="hammered-copper">finished</MaterialInk> before they ship.</h1>
				<p class="mt-6 max-w-[44ch] text-xl leading-relaxed text-foreground/85">Open-source building blocks for desktop apps and the command line. Nothing gets a version number until it has docs, tests and five rounds of review.</p>
				<div class="mt-8 flex flex-wrap gap-3">
					<Button size="lg" class="px-5" onclick={() => document.getElementById('shelf')?.scrollIntoView({ behavior: 'smooth' })}>See the four tools<ArrowRight class="lucide" data-icon="inline-end" /></Button>
					<Button href="https://github.com/freeoxide" size="lg" variant="outline" class="px-5"><BrandIcon icon={siGithub} data-icon="inline-start" />View on GitHub</Button>
				</div>
			</div>
			<ul class="grid grid-cols-2 gap-2 lg:grid-cols-1">
				{#each projects as p (p.id)}
					<li class="flex items-center gap-3 rounded-xl bg-background/80 p-3 backdrop-blur-xl">
						<MaterialTile preset={p.preset} size={40}><span class="text-[0.75em] font-semibold">{p.symbol}</span></MaterialTile>
						<span class="min-w-0"><span class="block font-medium">{p.name}</span><span class="block truncate text-sm text-muted-foreground">{p.kicker}</span></span>
					</li>
				{/each}
			</ul>
		</div>
	</section>

	<ModeBand tone="ink" frame id="shelf" inner="pt-20 md:pt-28">
		<div class="px-6 pb-12 sm:px-10">
			<p class="font-mono text-xs text-muted-foreground">the shelf</p>
			<h2 class="mt-4 max-w-[16ch] text-5xl leading-[0.98] font-medium tracking-[-0.045em] sm:text-7xl">Four tools, each one done.</h2>
		</div>
		<ProjectRail {projects} layout="tabs" />
	</ModeBand>

	<ModeBand frame inner="px-6 py-24 sm:px-10 md:py-32">
		<p class="font-mono text-xs text-muted-foreground">what every tool ships with</p>
		<div class="mt-8 flex flex-col">
			{#each promises as p, i (p.word)}
				<div class="grid items-end gap-3 border-t border-border py-6 md:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] md:gap-10">
					<p class="text-[clamp(3.25rem,11vw,10rem)] leading-[0.9] font-medium tracking-[-0.055em]"><span class="mr-4 align-top font-mono text-sm tracking-normal text-muted-foreground">0{i + 1}</span><MaterialInk preset={p.preset}>{p.word}</MaterialInk></p>
					<p class="pb-3 text-xl leading-snug text-foreground/90">{p.line}</p>
				</div>
			{/each}
		</div>
	</ModeBand>

	<ModeBand tone="oxide" inner="pt-20 md:pt-28">
		<div class="px-6 pb-10 text-center sm:px-10">
			<h2 class="mx-auto max-w-[18ch] text-4xl leading-[1.02] font-medium tracking-[-0.04em] text-balance sm:text-6xl">Small tools, pulled in every day.</h2>
		</div>
		<GiantCounter
			layout="stacked"
			preset="black-sweep"
			total={1284906}
			label="Downloads across every tool"
			series={downloads}
			stats={[
				{ value: 12400, label: 'GitHub stars' },
				{ value: 37, label: 'People who sent a fix' },
				{ value: 5, label: 'Review rounds per release' }
			]}
			class="border-b-0"
		/>
	</ModeBand>

	<ModeBand frame inner="px-6 py-20 sm:px-10 md:py-28">
		<UpdatesRail items={updates} layout="full" cover="headline" title="Latest from the workshop" />
	</ModeBand>

	<MaterialStripCta variant="over" preset="etched-silk" heading="Hear about the next tool first." body="One short email per release: what it does, who it is for, and how to start." />
	<ModeBand tone="ink"><Footer fill="material" preset="hammered-copper" class="border-t-0" /></ModeBand>
</div>
