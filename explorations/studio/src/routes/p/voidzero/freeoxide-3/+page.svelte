<script lang="ts">
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
	import { siGithub } from 'simple-icons';
	import { Button } from '$brand/ui/button/index.js';
	import BrandIcon from '$brand/components/brand-icon.svelte';
	import TopNav from '$moves/voidzero/top-nav.svelte';
	import MaterialInk from '$moves/voidzero/material-ink.svelte';
	import PlateStack from '$moves/voidzero/plate-stack.svelte';
	import ModeBand from '$moves/voidzero/mode-band.svelte';
	import MaterialCodePanel from '$moves/voidzero/material-code-panel.svelte';
	import GiantCounter from '$moves/voidzero/giant-counter.svelte';
	import UpdatesRail from '$moves/voidzero/updates-rail.svelte';
	import MaterialStripCta from '$moves/voidzero/material-strip-cta.svelte';
	import Footer from '$moves/voidzero/material-wordmark-footer.svelte';
	import { projects, updates, downloads } from '$moves/voidzero/freeoxide';

	const plates = [
		{ label: 'docs + tests' },
		...[...projects].reverse().map((p) => ({ label: p.name, preset: p.preset, symbol: p.symbol }))
	];

	const rounds = [
		{ q: 'Does it do what the page says?', a: 'Every claim on the site is tried by hand, on a clean machine.' },
		{ q: 'Can someone new start in five minutes?', a: 'Install, first run and the first error message, read as a stranger.' },
		{ q: 'What happens when things go wrong?', a: 'Pulled cables, full disks, bad input. Errors say how to fix them.' },
		{ q: 'Is every line still needed?', a: 'Dead code, stray options and clever tricks come out.' },
		{ q: 'Would I hand it to a friend?', a: 'A last read of the docs, the defaults and the name of every button.' }
	];
</script>

<svelte:head><title>freeoxide · Light first</title></svelte:head>

<div class="fx-light-first min-h-screen bg-background text-foreground">
	<TopNav />

	<ModeBand inner="grid items-center gap-6 px-6 pt-10 pb-16 sm:px-10 md:pt-16 lg:grid-cols-[minmax(0,13fr)_minmax(0,11fr)] lg:pb-24">
		<div>
			<h1 class="text-[clamp(3.25rem,7.1vw,7.25rem)] leading-[0.92] font-medium tracking-[-0.055em]">Free Rust tools, <MaterialInk preset="hammered-copper">finished</MaterialInk> before they ship.</h1>
			<p class="mt-8 max-w-[40ch] text-xl leading-relaxed text-foreground/85 sm:text-2xl sm:leading-snug">Four open-source tools for desktop apps and the command line. Each one has docs, tests and five rounds of review behind it.</p>
			<div class="mt-9 flex flex-wrap gap-3">
				<Button size="lg" class="px-5" onclick={() => document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' })}>Browse the tools<ArrowRight class="lucide" data-icon="inline-end" /></Button>
				<Button href="https://github.com/freeoxide" size="lg" variant="outline" class="px-5"><BrandIcon icon={siGithub} data-icon="inline-start" />View on GitHub</Button>
			</div>
		</div>
		<PlateStack {plates} labels={false} gap={46} thickness={16} float={false} label="Four tools stacked like plates, each cut from its own material" class="mx-auto w-full max-w-[640px] lg:-mr-6" />
	</ModeBand>

	<ModeBand id="tools" inner="px-4 pb-24 sm:px-6 md:pb-32">
		<div class="flex flex-wrap items-end justify-between gap-6 px-2 pb-10 sm:px-4">
			<h2 class="max-w-[14ch] text-5xl leading-[0.98] font-medium tracking-[-0.045em] sm:text-7xl">Four tools. One finish.</h2>
			<p class="max-w-[36ch] text-lg text-foreground/85">Free under MIT. Each one does one job and tells you plainly what it cannot do.</p>
		</div>
		<div class="grid gap-4 md:grid-cols-2">
			{#each projects as p (p.id)}
				<article class="flex flex-col overflow-hidden rounded-2xl bg-card ring-1 ring-foreground/10">
					<div class="flex flex-col gap-3 p-7 sm:p-9">
						<p class="font-mono text-xs text-muted-foreground">{p.name} · {p.kicker}</p>
						<h3 class="max-w-[20ch] text-3xl leading-[1.06] font-medium tracking-[-0.03em] text-balance">{p.title}</h3>
						<p class="max-w-[46ch] text-[1.05rem] leading-relaxed text-foreground/80">{p.body}</p>
						<a href={p.href} class="mt-1 inline-flex w-fit items-center gap-1.5 text-[0.95rem] font-medium underline-offset-4 hover:underline">Explore {p.name}<ArrowUpRight class="lucide size-4" /></a>
					</div>
					<MaterialCodePanel preset={p.preset} panel={p.panel} class="mt-auto min-h-[19rem]" />
				</article>
			{/each}
		</div>
	</ModeBand>

	<ModeBand tone="ink" frame inner="px-6 py-20 sm:px-10 md:py-28">
		<div class="grid gap-6 pb-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end">
			<h2 class="max-w-[16ch] text-5xl leading-[0.98] font-medium tracking-[-0.045em] sm:text-7xl">Five rounds of review. Then a version number.</h2>
			<p class="max-w-[40ch] text-lg text-foreground/85">Each round reads the whole tool again with one question in mind. A tool that fails a round goes back to the start of it.</p>
		</div>
		<ol class="grid border-t border-border sm:grid-cols-2 lg:grid-cols-5">
			{#each rounds as r, i (r.q)}
				<li class="flex flex-col gap-4 border-b border-border py-8 sm:px-6 lg:border-b-0 lg:[&:not(:first-child)]:border-l">
					<span class="grid size-11 place-items-center rounded-full border-[1.75px] border-[var(--oxide-vivid)] font-mono text-sm text-[var(--oxide-vivid)]">{i + 1}</span>
					<p class="text-xl leading-snug font-medium tracking-[-0.015em]">{r.q}</p>
					<p class="text-[0.95rem] leading-relaxed text-foreground/75">{r.a}</p>
				</li>
			{/each}
		</ol>
	</ModeBand>

	<ModeBand tone="band" inner="pt-20 md:pt-28">
		<div class="px-6 pb-12 sm:px-10">
			<h2 class="max-w-[18ch] text-4xl leading-[1.02] font-medium tracking-[-0.04em] sm:text-6xl">Pulled into Rust projects every day.</h2>
		</div>
		<GiantCounter
			preset="mineral-fault"
			total={1284906}
			label="Downloads across every tool, crates.io and releases"
			series={downloads}
			stats={[
				{ value: 12400, label: 'GitHub stars' },
				{ value: 37, label: 'People who sent a fix' },
				{ value: 5, label: 'Review rounds before every release' }
			]}
			class="border-b-0"
		/>
	</ModeBand>

	<ModeBand inner="px-6 py-20 sm:px-10 md:py-28">
		<UpdatesRail items={updates} layout="full" title="Notes from the workshop" intro="Releases, guides and what each review round caught." />
	</ModeBand>

	<ModeBand tone="oxide" width="full">
		<MaterialStripCta heading="Get the next tool the day it ships." body="One short email per release: what it does, who it is for, and how to start." preset="sediment" />
	</ModeBand>
	<Footer class="border-t-0" />
</div>

<style>
	:global(:root:not(.dark)) .fx-light-first {
		--primary: var(--oxide-vivid);
		--primary-foreground: color-mix(in oklab, black 86%, var(--oxide-deep));
		--ring: var(--oxide-vivid);
	}
</style>
