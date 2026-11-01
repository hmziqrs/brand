<script lang="ts">
	import { cn } from '$brand/utils.js';
	import { Button } from '$brand/ui/button/index.js';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import Search from '@lucide/svelte/icons/search';
	import SiteHeader from '$moves/site-framer/site-header.svelte';
	import SiteFooter from '$moves/site-framer/site-footer.svelte';
	import TemplateBrowser from '$moves/site-framer/template-browser.svelte';
	import PosterWall from '$moves/site-framer/poster-wall.svelte';
	import OxideTile from '$moves/bento/oxide-tile.svelte';
	import { sites, to } from '$moves/site-framer/site';

	const wrap = 'mx-auto max-w-[1320px] px-4 sm:px-8';
	const tabs = [
		['Templates', '2,480'],
		['Components', '9,120'],
		['Plugins', '640'],
		['Vectors', '14,300']
	] as const;
	let tab = $state<string>('Templates');
	let q = $state('');
	const count = $derived(tabs.find(([t]) => t === tab)?.[1] ?? '');
</script>

<svelte:head><title>kiln marketplace — templates</title></svelte:head>

<div class="min-h-screen overflow-x-clip bg-background text-foreground">
	<SiteHeader active="templates" />

	<section class="w-full border-b border-border">
		<div class="grid grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-14 lg:px-10">
			<div class="min-w-0 py-14 lg:py-20">
				<div class="flex flex-wrap gap-2" role="tablist" aria-label="Marketplace">
					{#each tabs as [t, n] (t)}
						<button type="button" role="tab" aria-selected={tab === t} onclick={() => (tab = t)} class={cn('inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[0.9375rem] font-medium transition-colors', tab === t ? 'border-transparent bg-foreground text-background' : 'border-border bg-card hover:border-primary')}>
							{t}<span class="font-mono text-[0.6875rem] font-normal opacity-70">{n}</span>
						</button>
					{/each}
				</div>
				<h1 class="mt-10 text-[clamp(3.5rem,9vw,9rem)] leading-[0.85] font-semibold tracking-[-0.065em]">{count}<br />{tab.toLowerCase()}<span class="ml-[0.04em] inline-block size-[0.14em] bg-primary"></span></h1>
				<p class="mt-7 max-w-[36ch] text-xl leading-snug md:text-2xl">Made by working designers. Pick one, then let the agent make it yours in a sentence.</p>
				<label class="mt-9 flex max-w-[560px] items-center gap-3 rounded-full border border-border bg-card py-2 pr-2 pl-5 focus-within:border-primary">
					<Search class="lucide size-5 shrink-0 text-foreground/60" /><span class="sr-only">Search {tab.toLowerCase()}</span>
					<input bind:value={q} placeholder="Search {tab.toLowerCase()}, e.g. bistro, studio, docs" class="min-w-0 flex-1 bg-transparent text-lg outline-none placeholder:text-foreground/50" />
					<button type="button" onclick={() => document.getElementById('browse')?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })} class="rounded-full bg-primary px-5 py-2.5 font-medium text-primary-foreground transition-opacity hover:opacity-85">Browse</button>
				</label>
				<div class="mt-4 flex flex-wrap items-center gap-2 text-sm">
					<span class="font-mono text-[0.6875rem] tracking-[0.12em] uppercase">Popular</span>
					{#each ['Studio', 'Bistro', 'Clinic', 'Docs', 'Shop'] as s (s)}
						<button type="button" onclick={() => (q = s === 'Docs' ? 'tool' : s === 'Studio' ? 'studio' : s === 'Shop' ? 'shop' : s.toLowerCase())} class="rounded-full bg-muted px-3 py-1 transition-colors hover:bg-primary hover:text-primary-foreground">{s}</button>
					{/each}
				</div>
			</div>
			<PosterWall sites={sites} class="h-[420px] lg:h-[calc(100svh-4rem)] lg:max-h-[760px]" />
		</div>
	</section>

	<section id="browse" class="{wrap} scroll-mt-20 pt-14 pb-24">
		<TemplateBrowser bind:q />
	</section>

	<section class="{wrap} pb-8">
		<div class="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
			<OxideTile size="lg" eyebrow="For creators" title="Make a template once. Get paid every time someone ships it." body="Publish templates, components and plugins to the marketplace. You set the price; we handle checkout, licences and updates." seed="kiln-creators" class="min-h-[420px] md:p-10">
				<div class="mt-4"><Button href={to('about')} size="lg" class="h-12 rounded-full bg-(--on-orange) px-6 text-base text-(--orange) hover:bg-(--on-orange)/85">Apply as a creator<ArrowRight class="lucide" /></Button></div>
			</OxideTile>
			<div class="grid gap-4">
				{#each [['2,480', 'templates live today'], ['85%', 'of each sale goes to the creator'], ['48h', 'median review time for new work']] as [n, l] (l)}
					<div class="flex items-end justify-between gap-4 rounded-[22px] border border-border bg-card p-6">
						<span class="text-5xl font-semibold tracking-[-0.05em]">{n}</span><span class="max-w-[18ch] text-right text-lg leading-snug">{l}</span>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<SiteFooter />
</div>
