<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$brand/utils.js';

	let { children, below, class: className }: { children: Snippet; below?: Snippet; class?: string } = $props();

	const cols = 36;
	const rows = 6;
	const hash = (x: number, y: number) => {
		let h = (x * 374761393 + y * 668265263) | 0;
		h = Math.imul(h ^ (h >>> 13), 1274126177);
		return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
	};
	const cells = Array.from({ length: cols * rows }, (_, i) => {
		const x = i % cols;
		const y = Math.floor(i / cols);
		return { x, y, on: hash(x, y) < 1 - (y + 0.5) / rows };
	});

	let edge: HTMLDivElement | undefined = $state();
	let mx = $state(-1);
	let my = $state(-1);
	const move = (e: PointerEvent) => {
		if (!edge || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		const r = edge.getBoundingClientRect();
		mx = ((e.clientX - r.left) / r.width) * cols;
		my = ((e.clientY - r.top) / r.height) * rows;
	};
	const near = (x: number, y: number) => mx >= 0 && Math.hypot(x + 0.5 - mx, (y + 0.5 - my) * 1.2) < 2.6;
</script>

<section class={cn('relative', className)}>
	<div class="band-orange relative">
		{@render children()}
	</div>
	<div
		bind:this={edge}
		onpointermove={move}
		onpointerleave={() => ((mx = -1), (my = -1))}
		aria-hidden="true"
		class="grid w-full"
		style:grid-template-columns="repeat({cols}, minmax(0, 1fr))"
	>
		{#each cells as c (c.x + '-' + c.y)}
			{@const hot = near(c.x, c.y)}
			<span class="aspect-square transition-colors duration-300 motion-reduce:transition-none" style:background-color={c.on !== hot ? 'var(--orange)' : 'transparent'}></span>
		{/each}
	</div>
	{#if below}<div class="relative -mt-[min(14vw,11rem)]">{@render below()}</div>{/if}
</section>
