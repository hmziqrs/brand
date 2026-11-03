<script lang="ts">
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import { cn } from '$brand/utils.js';
	import { Button } from '$brand/ui/button/index.js';
	import Container from '$brand/blocks/site/container.svelte';
	import AppWindow from '$moves/flora/app-window.svelte';
	import SectionHead from './section-head.svelte';
	import FlowNodes from './flow-nodes.svelte';
	import SurfaceTile from './surface-tile.svelte';
	import GlassBand from './glass-band.svelte';
	import { kicker, subtitle } from './ui';

	let { here = '#', class: className }: { here?: string; class?: string } = $props();
</script>

<section data-slot="oxlabs-flow" class={cn('pt-24 sm:pt-32', className)}>
	<Container size="wide">
		<SectionHead kicker="How a project moves" title="Four steps, always in this order." lede="Point at a step to see what it hands to the next one. Every step ends with something you can hold." />
		<FlowNodes class="mt-14 md:mt-20" />

		<div class="mt-28 grid gap-6 md:mt-36 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:items-end lg:gap-12">
			<div>
				<p class={kicker}>What we build</p>
				<h3 class={cn(subtitle, 'mt-4')}>Phones, desktops, the web and the terminal.</h3>
			</div>
			<p class="max-w-[46ch] text-lg leading-snug text-foreground lg:justify-self-end">One codebase when it fits, two when it does not. Move the cursor over a surface to tip the app toward you.</p>
		</div>

		<div class="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[repeat(2,minmax(19rem,auto))]">
			<SurfaceTile href={here} preset="sediment" title="Phone apps" body="iPhone and Android apps that feel native." kind="Phone" class="sm:row-span-2 lg:col-start-1 lg:row-span-2 lg:row-start-1">
				{#snippet art()}<AppWindow kind="phone" preset="oxide-bloom" class="mx-auto max-w-[220px] bg-background" />{/snippet}
			</SurfaceTile>
			<SurfaceTile href={here} preset="copper-sweep" title="Desktop apps" body="Mac, Windows and Linux, signed and updating." kind="Desktop" class="sm:col-span-1 lg:col-span-2 lg:col-start-2 lg:row-start-1">
				{#snippet art()}<AppWindow kind="desktop" preset="hammered-copper" title="Ledgerline" class="mx-auto max-w-[440px] bg-background" />{/snippet}
			</SurfaceTile>
			<article class="band-orange relative flex min-h-72 flex-col justify-between gap-8 overflow-hidden rounded-2xl p-6 sm:p-7 lg:col-start-4 lg:row-span-2 lg:row-start-1">
				<p class="flex items-center gap-2 font-mono text-xs tracking-wide uppercase"><span class="size-2 rounded-full bg-current motion-safe:animate-pulse"></span>Available for new projects</p>
				<div class="flex flex-col gap-5">
					<p class="text-[clamp(2.5rem,4vw,3.75rem)] leading-[0.92] font-medium tracking-[-0.05em]">One team, four surfaces.</p>
					<p class="text-lg leading-snug">One team from the first call to the store review. The people on that call write the code.</p>
					<Button href={here} variant="outline" size="lg" class="w-fit">Start a project<ArrowRight class="lucide" data-icon="inline-end" /></Button>
				</div>
			</article>
			<SurfaceTile href={here} preset="ink-diffusion" title="Web apps" body="Fast on a bad connection." kind="Web" class="lg:col-start-2 lg:row-start-2">
				{#snippet art()}<AppWindow kind="web" preset="caustic-glass" class="mx-auto max-w-[300px] bg-background" />{/snippet}
			</SurfaceTile>
			<SurfaceTile href={here} preset="oxide-bloom" title="CLI tools" body="Installed with one command." kind="Terminal" class="lg:col-start-3 lg:row-start-2">
				{#snippet art()}<AppWindow kind="terminal" class="mx-auto max-w-[300px]" />{/snippet}
			</SurfaceTile>
		</div>
	</Container>

	<GlassBand preset="etched-silk" class="mt-24 sm:mt-32">
		<p class={kicker}>Working from day one</p>
		<h3 class="mt-4 text-[clamp(2rem,3.6vw,3rem)] leading-[1.02] font-medium tracking-[-0.035em] text-balance">Small team, no hand-offs.</h3>
		<p class="mt-5 text-xl leading-snug text-foreground">The people on the first call write the code, and you can reach them the whole way through.</p>
		<ul class="mt-7 space-y-3 text-lg text-foreground">
			{#each ['A build you can install every week', 'A short written update with each build', 'A direct line to whoever is doing the work'] as l (l)}
				<li class="flex items-center gap-3"><span class="size-2.5 shrink-0 bg-primary"></span>{l}</li>
			{/each}
		</ul>
		<Button href={here} size="lg" class="mt-8">Book a call<ArrowRight class="lucide" data-icon="inline-end" /></Button>
	</GlassBand>
</section>
