<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$brand/utils.js';

	let { class: className, children }: { class?: string; children: Snippet } = $props();

	let px = $state(0);
	let py = $state(0);
	let live = $state(false);

	$effect(() => {
		const q = matchMedia('(prefers-reduced-motion: reduce)');
		live = !q.matches;
		const on = () => (live = !q.matches);
		q.addEventListener('change', on);
		return () => q.removeEventListener('change', on);
	});

	function move(e: PointerEvent) {
		if (!live || e.pointerType === 'touch') return;
		const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
		px = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width) * 2 - 1));
		py = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height) * 2 - 1));
	}
</script>

<div
	role="presentation"
	data-move="spot-live"
	data-live={live || undefined}
	class={cn('spot-live', className)}
	style:--px={px.toFixed(3)}
	style:--py={py.toFixed(3)}
	onpointermove={move}
	onpointerleave={() => ((px = 0), (py = 0))}
>
	{@render children()}
</div>

<style>
	.spot-live :global(.dp) {
		transform: translate(calc(var(--px) * var(--depth, 1) * 4px), calc(var(--py) * var(--depth, 1) * 3px));
		transition: transform 700ms cubic-bezier(0.2, 0.7, 0.1, 1), translate 400ms cubic-bezier(0.2, 0.7, 0.1, 1), rotate 700ms cubic-bezier(0.2, 0.7, 0.1, 1);
	}
	.spot-live :global(.tilt) {
		transform-box: fill-box;
		transform-origin: center;
		rotate: calc(var(--px) * var(--turn, 10) * 1deg);
		transition: rotate 900ms cubic-bezier(0.2, 0.7, 0.1, 1);
	}
	.spot-live[data-live] :global(.lift) {
		cursor: default;
	}
	.spot-live[data-live] :global(.lift:hover) {
		translate: 0 -7px;
	}
	.spot-live[data-live] :global(.spin-on-hover .spin) {
		transition: rotate 900ms cubic-bezier(0.2, 0.7, 0.1, 1);
	}
	.spot-live[data-live] :global(.spin-on-hover:hover .spin) {
		rotate: 180deg;
	}
	.spot-live:not([data-live]) :global(.dp),
	.spot-live:not([data-live]) :global(.tilt) {
		transform: none;
		rotate: none;
		transition: none;
	}
</style>
