<script lang="ts">
	import Check from '@lucide/svelte/icons/check';
	import X from '@lucide/svelte/icons/x';
	import { cn } from '$brand/utils.js';
	import MaterialTile from '$brand/components/material-tile.svelte';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import ModeBand from '$moves/voidzero/mode-band.svelte';
	import SiteHeader from '$moves/site-voidzero/site-header.svelte';
	import SiteFooter from '$moves/site-voidzero/site-footer.svelte';
	import AssetTile from '$moves/site-voidzero/asset-tile.svelte';
	import SwatchRow from '$moves/site-voidzero/swatch-row.svelte';
	import HoverGrid from '$moves/site-voidzero/hover-grid.svelte';
	import { pointer } from '$moves/site-voidzero/pointer';
	import { tools, company } from '$moves/site-voidzero/site';

	let probe: HTMLElement | undefined = $state();
	const accent = () => (probe ? getComputedStyle(probe).backgroundColor : 'currentColor');

	const wordmark = (ink: string) => () =>
		`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 120"><text x="0" y="88" font-family="Onest, sans-serif" font-size="104" font-weight="600" letter-spacing="-3" fill="${ink}">bloomery</text><rect x="476" y="58" width="34" height="34" fill="${accent()}"/></svg>`;
	const mark = (symbol: string, tile: string, ink: string) => () =>
		`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" rx="56" fill="${tile}"/><text x="118" y="160" text-anchor="middle" font-family="Onest, sans-serif" font-size="104" font-weight="600" letter-spacing="-3" fill="${ink}">${symbol}</text><rect x="178" y="128" width="30" height="30" fill="${accent()}"/></svg>`;

	const swatches = [
		{ name: 'Oxide', token: '--oxide-vivid', note: 'The one accent. Fills, not text.', ink: 'dark' as const },
		{ name: 'Oxide ink', token: '--oxide-ink', note: 'Accent text on light pages.' },
		{ name: 'Oxide deep', token: '--oxide-deep', note: 'Shadows inside oxide plates.' },
		{ name: 'Page', token: '--background', note: 'Follows the theme.', ink: 'dark' as const },
		{ name: 'Type', token: '--foreground', note: 'All reading text.' },
		{ name: 'Hairline', token: '--border', note: 'Grids and frames.', ink: 'dark' as const }
	];
	const dos = [
		{ ok: true, text: 'Give the wordmark at least the height of the square on every side.' },
		{ ok: true, text: 'Put the mark on solid page color, ink, or a vivid oxide plate.' },
		{ ok: false, text: 'Do not recolor the letters or turn the square another color.' },
		{ ok: false, text: 'Do not set the wordmark raw on a busy material without a tile.' }
	];
</script>

<svelte:head><title>Brand assets · Bloomery</title></svelte:head>

<div class="min-h-screen bg-background text-foreground">
	<span bind:this={probe} aria-hidden="true" class="hidden bg-[var(--oxide-vivid)]"></span>
	<SiteHeader />

	<section use:pointer class="relative isolate overflow-hidden border-b border-border">
		<HoverGrid cell={72} class="-z-10 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
		<div class="mx-auto grid max-w-[1280px] gap-10 px-4 pt-16 pb-16 sm:px-10 md:pt-24 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end">
			<div>
				<p class="font-mono text-xs text-muted-foreground uppercase">brand assets</p>
				<h1 class="mt-5 text-[clamp(3rem,8vw,7.5rem)] leading-[0.92] font-medium tracking-[-0.055em]">The {company.name.toLowerCase()} kit</h1>
			</div>
			<p class="max-w-[38ch] text-xl text-foreground">Logos, tool marks, colors and materials for anyone writing about us or the tools. Copy or download any piece as SVG.</p>
		</div>
	</section>

	<ModeBand frame inner="px-4 py-16 sm:px-10 md:py-24">
		<div class="flex flex-wrap items-end justify-between gap-4">
			<h2 class="text-4xl font-medium tracking-[-0.04em] sm:text-5xl">Wordmark</h2>
			<p class="max-w-[44ch] text-foreground/85">Lowercase name and the oxide square. Use the version that matches the surface.</p>
		</div>
		<div class="mt-10 grid gap-4 md:grid-cols-3">
			{#each [{ s: 'ink' as const, label: 'On dark', ink: 'white' }, { s: 'paper' as const, label: 'On light', ink: 'black' }, { s: 'oxide' as const, label: 'On oxide', ink: 'black' }] as v (v.s)}
				<AssetTile name={v.label} file={`bloomery-wordmark-${v.s}.svg`} surface={v.s} svg={wordmark(v.ink)} class="min-h-64">
					<span class="text-[clamp(2.4rem,5vw,3.4rem)] font-semibold tracking-[-0.04em]">bloomery<i aria-hidden="true" class={cn('ml-[0.07em] inline-block size-[0.34em]', v.s === 'oxide' ? 'bg-current' : 'bg-[var(--oxide-vivid)]')}></i></span>
				</AssetTile>
			{/each}
		</div>
	</ModeBand>

	<ModeBand tone="ink" frame inner="px-4 py-16 sm:px-10 md:py-24">
		<div class="flex flex-wrap items-end justify-between gap-4">
			<h2 class="text-4xl font-medium tracking-[-0.04em] sm:text-5xl">Tool marks</h2>
			<p class="max-w-[44ch] text-foreground/85">Each tool gets two letters, the square and its own material. The material is the frame; letters stay on solid color.</p>
		</div>
		<div class="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
			<AssetTile name={company.name} file="bloomery-mark.svg" surface="ink" svg={mark(company.symbol, 'black', 'white')}>
				<MaterialTile preset={company.preset} size={120} frame={0.07}><span class="text-[2.1rem] font-semibold tracking-[-0.03em]">{company.symbol}<i aria-hidden="true" class="ml-[0.06em] inline-block size-[0.3em] bg-mark-square"></i></span></MaterialTile>
			</AssetTile>
			{#each tools as t (t.id)}
				<AssetTile name={t.name} file={`${t.id}-mark.svg`} surface="ink" svg={mark(t.symbol, 'black', 'white')}>
					<div class="flex flex-col items-center gap-4">
						<MaterialTile preset={t.preset} size={120} frame={0.07} class="transition-transform duration-500 group-hover:-rotate-3 motion-reduce:transition-none motion-reduce:group-hover:rotate-0"><span class="text-[2.1rem] font-semibold tracking-[-0.03em]">{t.symbol}<i aria-hidden="true" class="ml-[0.06em] inline-block size-[0.3em] bg-mark-square"></i></span></MaterialTile>
						<span class="font-mono text-xs text-muted-foreground uppercase">{t.preset}</span>
					</div>
				</AssetTile>
			{/each}
		</div>
	</ModeBand>

	<ModeBand frame inner="px-4 py-16 sm:px-10 md:py-24">
		<div class="flex flex-wrap items-end justify-between gap-4">
			<h2 class="text-4xl font-medium tracking-[-0.04em] sm:text-5xl">Color</h2>
			<p class="max-w-[44ch] text-foreground/85">One accent, used as a surface. Everything else is page, type and hairline. Click a swatch to copy its current value.</p>
		</div>
		<SwatchRow {swatches} class="mt-10" />
	</ModeBand>

	<ModeBand frame inner="px-4 py-16 sm:px-10 md:py-24">
		<div class="grid gap-10 lg:grid-cols-2">
			<div>
				<h2 class="text-4xl font-medium tracking-[-0.04em] sm:text-5xl">Type</h2>
				<p class="mt-4 max-w-[40ch] text-foreground/85">One sans for everything people read; a mono for labels, commands and numbers.</p>
				<div class="mt-8 flex flex-col divide-y divide-border border-y border-border">
					<div class="flex items-baseline justify-between gap-4 py-5"><span class="text-6xl font-medium tracking-[-0.05em]">Aa</span><span class="text-right"><span class="block font-medium">Onest</span><span class="font-mono text-xs text-muted-foreground uppercase">headlines and body</span></span></div>
					<div class="flex items-baseline justify-between gap-4 py-5"><span class="font-mono text-5xl">Aa</span><span class="text-right"><span class="block font-medium">JetBrains Mono</span><span class="font-mono text-xs text-muted-foreground uppercase">labels and code</span></span></div>
				</div>
			</div>
			<div use:pointer class="relative isolate grid min-h-80 place-items-center overflow-hidden rounded-xl border border-border">
				<div class="mat absolute -inset-[5%] -z-10"><ShaderMaterial preset="copper-sweep" rendering="image" controls={false} sizes="(min-width: 1024px) 50vw, 100vw" class="absolute inset-0" /></div>
				<div class="dark m-6 rounded-xl bg-background/85 p-6 text-foreground backdrop-blur-xl sm:p-8">
					<p class="font-mono text-xs text-muted-foreground uppercase">materials</p>
					<p class="mt-3 max-w-[22ch] text-2xl leading-snug font-medium tracking-[-0.02em]">Materials are art, never a background for reading. Text sits on a panel like this one.</p>
				</div>
			</div>
		</div>
	</ModeBand>

	<ModeBand frame inner="px-4 py-16 sm:px-10 md:py-24">
		<h2 class="text-4xl font-medium tracking-[-0.04em] sm:text-5xl">Use it well</h2>
		<ul class="mt-10 grid gap-4 md:grid-cols-2">
			{#each dos as d (d.text)}
				<li class={cn('flex gap-4 rounded-xl border p-6 text-lg', d.ok ? 'border-border' : 'border-border bg-foreground/[0.03]')}>
					<span class={cn('grid size-8 shrink-0 place-items-center rounded-full', d.ok ? 'bg-[var(--oxide-vivid)] text-black' : 'bg-foreground/10')}>{#if d.ok}<Check class="lucide size-4" />{:else}<X class="lucide size-4" />{/if}</span>
					<span><span class="font-mono text-xs text-muted-foreground uppercase">{d.ok ? 'do' : 'don’t'}</span><br />{d.text}</span>
				</li>
			{/each}
		</ul>
		<p class="mt-8 font-mono text-xs text-muted-foreground uppercase">Example assets for a stand-in company. Exported SVGs use system fonts.</p>
	</ModeBand>

	<SiteFooter />
</div>

<style>
	.mat {
		transform: translate3d(calc((0.5 - var(--px, 0.5)) * 5%), calc((0.5 - var(--py, 0.5)) * 6%), 0);
	}
	@media (prefers-reduced-motion: reduce) {
		.mat {
			transform: none;
		}
	}
</style>
