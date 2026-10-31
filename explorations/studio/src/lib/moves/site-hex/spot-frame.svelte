<script lang="ts">
	import { cn } from '$brand/utils.js';
	import type { Snippet } from 'svelte';

	let {
		ticks = true,
		grid = false,
		class: className,
		children
	}: { ticks?: boolean; grid?: boolean; class?: string; children: Snippet } = $props();

	let mx = $state(0);
	let my = $state(0);
	let reduce = $state(false);

	$effect(() => {
		const q = window.matchMedia('(prefers-reduced-motion: reduce)');
		reduce = q.matches;
		const on = () => (reduce = q.matches);
		q.addEventListener('change', on);
		return () => q.removeEventListener('change', on);
	});

	function move(e: PointerEvent) {
		if (reduce) return;
		const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
		mx = ((e.clientX - r.left) / r.width) * 2 - 1;
		my = ((e.clientY - r.top) / r.height) * 2 - 1;
	}
</script>

<div
	role="presentation"
	onpointermove={move}
	onpointerleave={() => ((mx = 0), (my = 0))}
	style:--mx={mx.toFixed(3)}
	style:--my={my.toFixed(3)}
	class={cn('spot-frame relative text-foreground', className)}
>
	{#if grid}
		<div aria-hidden="true" class="pointer-events-none absolute inset-0 [background-image:linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,black_20%,transparent_100%)]"></div>
	{/if}
	{#if ticks}
		<span aria-hidden="true" class="pointer-events-none absolute top-0 left-0 size-3 border-t border-l border-foreground/40"></span>
		<span aria-hidden="true" class="pointer-events-none absolute top-0 right-0 size-3 border-t border-r border-foreground/40"></span>
		<span aria-hidden="true" class="pointer-events-none absolute bottom-0 left-0 size-3 border-b border-l border-foreground/40"></span>
		<span aria-hidden="true" class="pointer-events-none absolute right-0 bottom-0 size-3 border-r border-b border-foreground/40"></span>
	{/if}
	<div class="relative">
		{@render children()}
	</div>
</div>
