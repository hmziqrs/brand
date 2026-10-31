<script lang="ts">
	import { cn } from '$brand/utils.js';

	let {
		from = 'purple',
		to = 'red',
		flip = false,
		count = 22,
		class: className
	}: { from?: string; to?: string; flip?: boolean; count?: number; class?: string } = $props();

	const items = $derived(
		Array.from({ length: count }, (_, i) => {
			const t = i / (count - 1);
			const a = Math.PI * (1 - t * 0.85);
			const x = 50 + Math.cos(a) * 44;
			const y = 92 - Math.sin(a) * 78;
			return { x: flip ? 100 - x : x, y, mix: Math.round(t * 100), i };
		})
	);
</script>

<div aria-hidden="true" class={cn('relative aspect-[1/1]', className)}>
	{#each items as s (s.i)}
		<span
			class="group absolute block size-[13%] -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 hover:-translate-y-[80%] motion-reduce:transition-none"
			style:left="{s.x}%"
			style:top="{s.y}%"
			style:z-index={s.i}
		>
			<span
				class="block size-full rounded-[18%] border border-[color-mix(in_oklab,var(--foreground)_25%,transparent)] shadow-[inset_0_1px_0_color-mix(in_oklab,white_45%,transparent),0_4px_10px_-4px_color-mix(in_oklab,black_50%,transparent)]"
				style:background="color-mix(in oklab, var(--{to}) {s.mix}%, var(--{from}))"
			></span>
		</span>
	{/each}
</div>
