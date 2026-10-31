<script lang="ts">
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import { siGithub } from 'simple-icons';
	import { Button } from '$brand/ui/button/index.js';
	import BrandIcon from '$brand/components/brand-icon.svelte';
	import TopNav from '$moves/voidzero/top-nav.svelte';
	import PlateStack from '$moves/voidzero/plate-stack.svelte';
	import ModeBand from '$moves/voidzero/mode-band.svelte';
	import ProjectRail from '$moves/voidzero/project-rail.svelte';
	import GiantCounter from '$moves/voidzero/giant-counter.svelte';
	import UpdatesRail from '$moves/voidzero/updates-rail.svelte';
	import MaterialStripCta from '$moves/voidzero/material-strip-cta.svelte';
	import Footer from '$moves/voidzero/material-wordmark-footer.svelte';
	import { projects, updates, downloads } from '$moves/voidzero/freeoxide';

	const plates = [
		{ label: 'five review rounds', side: 'left' as const },
		{ label: 'tests', side: 'right' as const },
		{ label: 'docs', side: 'left' as const },
		{ label: 'the tool', side: 'right' as const, preset: 'copper-sweep', symbol: 'Fx' },
		{ label: 'your app', side: 'left' as const }
	];
</script>

<svelte:head><title>freeoxide · VoidZero bands</title></svelte:head>

<div class="min-h-screen bg-background text-foreground">
	<TopNav announce="gpui-query 0.3 tries again on its own when the network drops" />

	<ModeBand frame inner="px-6 pt-12 pb-6 sm:px-10 md:pt-14">
		<div class="flex flex-col items-center text-center">
			<p class="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 font-mono text-xs text-muted-foreground"><span aria-hidden="true" class="size-1.5 bg-mark-square"></span>4 tools · all finished</p>
			<h1 class="mt-6 max-w-[14ch] text-[clamp(3rem,7.6vw,7rem)] leading-[0.98] font-medium tracking-[-0.045em] text-balance">Free Rust tools, finished before they ship.</h1>
			<p class="mt-6 max-w-[46ch] text-xl leading-relaxed text-foreground/85">Open-source building blocks for desktop apps and the command line. Each one ships with docs, tests and five rounds of review, or it waits.</p>
			<div class="mt-8 flex flex-wrap justify-center gap-3">
				<Button size="lg" class="px-5" onclick={() => document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' })}>Browse the tools<ArrowRight class="lucide" data-icon="inline-end" /></Button>
				<Button href="https://github.com/freeoxide" size="lg" variant="outline" class="px-5"><BrandIcon icon={siGithub} data-icon="inline-start" />View on GitHub</Button>
			</div>
		</div>
		<PlateStack {plates} class="mx-auto mt-6 max-w-[920px]" />
	</ModeBand>

	<ModeBand tone="ink" frame id="tools" inner="pt-20 md:pt-28">
		<div class="grid gap-6 px-6 pb-14 sm:px-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end">
			<div>
				<p class="font-mono text-xs text-muted-foreground">open source</p>
				<h2 class="mt-4 text-5xl leading-[0.98] font-medium tracking-[-0.045em] sm:text-7xl">Every line, in the open.</h2>
			</div>
			<p class="max-w-[42ch] text-lg leading-relaxed text-foreground/85">I build the tools I wish I had, finish them properly, and give them away under MIT. Pick one to see what it does and how it starts.</p>
		</div>
		<ProjectRail {projects} />
	</ModeBand>

	<ModeBand frame inner="pt-20 md:pt-28">
		<div class="px-6 pb-12 sm:px-10">
			<p class="font-mono text-xs text-muted-foreground">in use</p>
			<h2 class="mt-4 max-w-[18ch] text-4xl leading-[1.02] font-medium tracking-[-0.04em] sm:text-6xl">Pulled into Rust projects every day.</h2>
		</div>
		<GiantCounter
			total={1284906}
			label="Downloads across every tool, crates.io and releases"
			series={downloads}
			stats={[
				{ value: 12400, label: 'GitHub stars' },
				{ value: 37, label: 'People who sent a fix' },
				{ value: 5, label: 'Review rounds before every release' }
			]}
		/>
	</ModeBand>

	<ModeBand tone="band" frame inner="px-6 py-24 sm:px-10 md:py-36">
		<p class="mx-auto max-w-[24ch] text-center text-3xl leading-[1.15] font-medium tracking-[-0.03em] text-balance sm:text-5xl">Docs, tests and five review rounds come before a version number. The tool you install is the finished one.</p>
		<div class="mt-8 flex justify-center"><Button href="#/p/voidzero/freeoxide-3" variant="outline" size="lg">How a tool gets finished</Button></div>
	</ModeBand>

	<ModeBand frame inner="py-20 md:py-28">
		<UpdatesRail items={updates} intro="Releases, guides and notes on how the review rounds work." />
	</ModeBand>

	<ModeBand tone="ink">
		<MaterialStripCta heading="Want the next tool the day it ships?" body="One short email per release: what it does, who it is for, and how to start." preset="copper-sweep" />
		<Footer />
	</ModeBand>
</div>
