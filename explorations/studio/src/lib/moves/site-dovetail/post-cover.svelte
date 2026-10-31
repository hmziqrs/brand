<script lang="ts">
	import { shaderPosters } from '@hmziq/brand-core/shaders/posters';
	import RingGlobe from './ring-globe.svelte';
	import { cn } from '$brand/utils.js';
	import type { Cover } from './posts';

	let { cover, seed = 1, class: className }: { cover: Cover; seed?: number; class?: string } = $props();

	const src = (p?: string) => (shaderPosters[p ?? 'hammered-copper'] ?? shaderPosters['hammered-copper']).src;
	const pixels = $derived(
		Array.from({ length: 14 }, (_, i) => {
			const a = Math.sin(seed * 12.9 + i * 78.2) * 43758.5;
			const b = Math.sin(seed * 4.1 + i * 31.7) * 12345.6;
			return { x: (a - Math.floor(a)) * 100, y: (b - Math.floor(b)) * 100 };
		})
	);
</script>

<div class={cn('relative aspect-[3/2] overflow-hidden rounded-xl', className)}>
	{#if cover.kind === 'word'}
		<div class="band-orange absolute inset-0 grid place-items-center">
			{#each pixels as p, i (i)}<span class="absolute size-[5%] bg-[var(--on-orange)]" style:left="{p.x}%" style:top="{p.y}%" style:opacity={0.08 + (i % 4) * 0.06}></span>{/each}
			<span class="relative flex items-center gap-[0.18em] text-[clamp(1.6rem,3.2vw,2.6rem)] font-semibold tracking-[-0.04em]"><span class="size-[0.5em] bg-[var(--on-orange)]"></span>{cover.word}</span>
		</div>
	{:else if cover.kind === 'material'}
		<img src={src(cover.preset)} alt="" loading="lazy" class="absolute inset-0 size-full object-cover" />
		<span class="absolute right-[8%] bottom-[10%] size-[12%] bg-background"></span>
	{:else if cover.kind === 'rings'}
		<div class="absolute inset-0 bg-foreground text-background">
			<svg viewBox="0 0 300 200" class="size-full" aria-hidden="true">
				{#each [20, 40, 60, 80, 100, 120] as r (r)}<circle cx="150" cy="100" {r} fill="none" stroke="currentColor" stroke-opacity="0.35" stroke-width="1" />{/each}
				<rect x="141" y="91" width="18" height="18" fill="var(--orange)" />
			</svg>
		</div>
	{:else if cover.kind === 'globe'}
		<div class="absolute inset-0 grid place-items-center bg-card">
			<div class="absolute size-[70%] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--orange)_45%,transparent),transparent_70%)]"></div>
			<RingGlobe points={50} seed={seed} class="relative w-[56%]" />
		</div>
	{:else}
		<div class="absolute inset-0 bg-card p-[7%]">
			<div class="h-full rounded-lg border border-[color-mix(in_oklab,var(--foreground)_14%,transparent)] bg-background p-[6%]">
				<p class="text-[0.75rem] leading-snug font-medium text-foreground">…people want shared playlists they can actually edit, in real time.</p>
				<div class="mt-3 space-y-1.5">{#each [90, 70, 82] as w (w)}<span class="block h-1.5 rounded-full bg-[color-mix(in_oklab,var(--foreground)_12%,transparent)]" style:width="{w}%"></span>{/each}</div>
				<span class="mt-3 inline-flex items-center gap-1.5 rounded-md bg-foreground px-2 py-1 text-[0.65rem] text-background"><span class="size-1.5 bg-[var(--orange)]"></span>3 sources cited</span>
			</div>
		</div>
	{/if}
</div>
