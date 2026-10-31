<script lang="ts">
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import Copy from '@lucide/svelte/icons/copy';
	import { Button } from '$brand/ui/button/index.js';
	import Wordmark from '$brand/components/wordmark.svelte';
	import Rings from '$brand/components/rings.svelte';
	import OxideStatTiles from './oxide-stat-tiles.svelte';
	import OxideSolidCard from './oxide-solid-card.svelte';
	import OxideMarkers from './oxide-markers.svelte';
	import OxideBand from './oxide-band.svelte';
</script>

<div class="flex flex-col">
	<header class="flex items-center justify-between gap-4 border-b px-6 py-4 @2xl:px-10">
		<Wordmark name="claude-multi" class="text-lg" />
		<nav class="hidden items-center gap-6 text-[15px] text-foreground @2xl:flex">
			<a href="#/p/specimens/accent" class="u">Guide</a>
			<a href="#/p/specimens/accent">Providers</a>
			<a href="#/p/specimens/accent">Changelog</a>
		</nav>
		<Button size="sm" class="px-3">Install</Button>
	</header>

	<section class="relative isolate grid gap-10 overflow-hidden px-6 pt-14 pb-16 @3xl:grid-cols-[1.25fr_1fr] @3xl:px-10 @3xl:pt-20">
		<div class="flex flex-col gap-7">
			<span class="flex items-center gap-2 font-mono text-[12px] tracking-[0.14em] text-foreground uppercase"><i class="sq"></i>v0.9 · six providers</span>
			<h2 class="text-[clamp(3rem,9cqw,7rem)] leading-[0.92] font-medium tracking-[-0.05em] text-foreground">
				Bring your <span class="slab">own</span> provider.
			</h2>
			<p class="max-w-[42ch] text-[clamp(1.1rem,2cqw,1.35rem)] leading-relaxed text-foreground">
				claude-multi moves Claude Code to Bedrock, Vertex or <mark class="hl">your own gateway</mark> with one command, and leaves settings.json the way you wrote it.
			</p>
			<div class="flex flex-wrap items-center gap-2">
				<Button size="lg" class="px-5">Install claude-multi</Button>
				<Button size="lg" variant="outline" class="px-4">Read the guide <ArrowRight class="lucide" /></Button>
			</div>
		</div>
		<div class="flex flex-col justify-end gap-3">
			<div class="cmd flex items-center justify-between gap-3 rounded-xl px-4 py-3.5 font-mono text-[14px]">
				<span><span class="opacity-70">$</span> claude-multi switch bedrock</span>
				<Copy class="lucide size-4" />
			</div>
			<div class="rounded-xl border p-4 font-mono text-[13px] leading-relaxed text-foreground">
				<p><span class="ink">✓</span> provider block written</p>
				<p><span class="ink">✓</span> 4 hooks, 3 MCP servers kept</p>
				<p><span class="ink">✓</span> undo saved to settings.json.bak</p>
			</div>
		</div>
		<Rings seed="claude-multi-accent" class="pointer-events-none absolute top-[-30%] right-[-22%] -z-10 w-[70%] max-w-none opacity-70" label="" aria-hidden="true" />
	</section>

	<div class="border-t"><OxideStatTiles /></div>
	<div class="border-t"><OxideSolidCard /></div>
	<div class="border-t"><OxideMarkers /></div>
	<OxideBand />
</div>

<style>
	.slab {
		display: inline-block;
		padding: 0 0.14em 0.04em;
		border-radius: 0.12em;
		line-height: 0.92;
		background: var(--orange);
		color: var(--on-orange);
	}
	.sq {
		display: inline-block;
		width: 8px;
		height: 8px;
		background: var(--mark-square);
	}
	.cmd {
		background: var(--orange);
		color: var(--on-orange);
	}
	.ink {
		color: var(--ox-text, var(--orange));
	}
	.hl {
		color: inherit;
		background: linear-gradient(to top, color-mix(in oklab, var(--orange) 70%, transparent) 0 36%, transparent 36%);
		padding: 0 0.06em;
	}
	.u {
		text-decoration: underline;
		text-decoration-color: var(--orange);
		text-decoration-thickness: 2px;
		text-underline-offset: 5px;
	}
</style>
