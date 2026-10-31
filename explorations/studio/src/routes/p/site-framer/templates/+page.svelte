<script lang="ts">
	import { Button } from '$brand/ui/button/index.js';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import SiteHeader from '$moves/site-framer/site-header.svelte';
	import SiteFooter from '$moves/site-framer/site-footer.svelte';
	import SectionHead from '$moves/site-framer/section-head.svelte';
	import TemplateBrowser from '$moves/site-framer/template-browser.svelte';
	import OxideTile from '$moves/bento/oxide-tile.svelte';
	import { to } from '$moves/site-framer/site';

	const wrap = 'mx-auto max-w-[1280px] px-4 sm:px-8';
	let tab = $state('Templates');
</script>

<svelte:head><title>kiln marketplace — templates</title></svelte:head>

<div class="min-h-screen overflow-x-clip bg-background text-foreground">
	<SiteHeader active="templates" />
	<div class="border-b border-border">
		<div class="{wrap} flex items-center gap-1 overflow-x-auto py-2.5 text-[0.9375rem]">
			<span class="mr-3 inline-flex items-center gap-1.5 font-medium"><span class="size-2.5 bg-primary"></span>Marketplace</span>
			{#each ['Templates', 'Components', 'Plugins', 'Vectors'] as t (t)}
				<button type="button" onclick={() => (tab = t)} class="rounded-full px-3 py-1 transition-colors" class:bg-muted={tab === t} class:opacity-60={tab !== t}>{t}</button>
			{/each}
		</div>
	</div>

	<section class="{wrap} pt-14 pb-24 md:pt-20">
		<SectionHead as="h1" size="xl" title={tab} lede="Polished starting points made by the community. Pick one, then let the agent make it yours." meta="2,480 {tab.toLowerCase()}" action="Sell yours" href={to('about')} class="mb-6" />
		<TemplateBrowser />
	</section>

	<section class="{wrap} pb-8">
		<div class="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
			<OxideTile size="lg" eyebrow="For creators" title="Make a template once. Get paid every time someone ships it." body="Publish templates, components and plugins to the marketplace. You set the price; we handle checkout, licences and updates." seed="kiln-creators" class="min-h-[420px] md:p-10">
				<div class="mt-4"><Button href={to('about')} size="lg" class="h-12 rounded-full bg-(--on-orange) px-6 text-base text-(--orange) hover:bg-(--on-orange)/85">Apply as a creator<ArrowRight class="lucide" /></Button></div>
			</OxideTile>
			<div class="grid gap-px overflow-hidden rounded-2xl border border-border bg-border">
				{#each [['2,480', 'templates live today'], ['85%', 'of each sale goes to the creator'], ['48h', 'median review time for new work']] as [n, l] (l)}
					<div class="flex items-end justify-between gap-4 bg-background p-6">
						<span class="text-5xl font-semibold tracking-[-0.05em]">{n}</span><span class="max-w-[18ch] text-right text-lg leading-snug">{l}</span>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<SiteFooter preset="mineral-fault" />
</div>
