<script lang="ts">
	import { siSvelte, siReact, siVuedotjs, siAstro, siSolid, siQwik } from 'simple-icons';
	import { cn } from '$brand/utils.js';
	import BrandIcon from '$brand/components/brand-icon.svelte';
	import MaterialTile from '$brand/components/material-tile.svelte';

	let {
		symbol = 'Kn',
		preset = 'copper-sweep',
		class: className
	}: {
		symbol?: string;
		preset?: string;
		class?: string;
	} = $props();

	const nodes = [
		{ name: 'Svelte', icon: siSvelte, x: 16, y: 18 },
		{ name: 'React', icon: siReact, x: 8, y: 50 },
		{ name: 'Vue', icon: siVuedotjs, x: 16, y: 82 },
		{ name: 'Astro', icon: siAstro, x: 84, y: 18 },
		{ name: 'Solid', icon: siSolid, x: 92, y: 50 },
		{ name: 'Qwik', icon: siQwik, x: 84, y: 82 }
	];
	let hot = $state(-1);
	const path = (x: number, y: number) => {
		const mid = x < 50 ? 34 : 66;
		return `M ${x} ${y} H ${mid} V 50 H ${x < 50 ? 42 : 58}`;
	};
</script>

<div class={cn('framework-hub relative aspect-[16/10] w-full', className)}>
	<svg viewBox="0 0 100 100" preserveAspectRatio="none" class="absolute inset-0 size-full" aria-hidden="true">
		{#each nodes as n, i (n.name)}
			<path d={path(n.x, n.y)} fill="none" stroke={hot === i ? 'var(--primary)' : 'var(--line)'} stroke-width="1" vector-effect="non-scaling-stroke" class="transition-[stroke]" />
			{#if hot === i}
				<path d={path(n.x, n.y)} fill="none" stroke="var(--primary)" stroke-width="2.5" vector-effect="non-scaling-stroke" stroke-dasharray="2 98" pathLength="100" class="flow" />
			{/if}
		{/each}
	</svg>
	<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
		<MaterialTile {preset} size={84} frame={0.08} class="shadow-[0_24px_50px_-20px_color-mix(in_oklab,black_70%,transparent)]"><span class="text-xl font-semibold tracking-[-0.03em]">{symbol}<i aria-hidden="true" class="ml-[0.06em] inline-block size-[0.3em] bg-mark-square"></i></span></MaterialTile>
	</div>
	{#each nodes as n, i (n.name)}
		<button
			type="button"
			aria-label={n.name}
			onpointerenter={() => (hot = i)}
			onpointerleave={() => (hot = -1)}
			onfocus={() => (hot = i)}
			onblur={() => (hot = -1)}
			class={cn('absolute grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-xl border bg-background transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50', hot === i ? 'border-primary text-foreground' : 'border-border text-foreground/70')}
			style:left={`${n.x}%`}
			style:top={`${n.y}%`}
		><BrandIcon icon={n.icon} class="size-5" /></button>
	{/each}
</div>

<style>
	.flow {
		animation: flow 1.4s linear infinite;
	}
	@keyframes flow {
		from {
			stroke-dashoffset: 100;
		}
		to {
			stroke-dashoffset: 0;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.flow {
			animation: none;
		}
	}
</style>
