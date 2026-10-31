<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';

	let {
		presets = ['oxide-bloom', 'copper-sweep', 'mica-flakes', 'caustic-glass', 'lava-fissures', 'folded-foil', 'interference-film'],
		class: className
	}: { presets?: string[]; class?: string } = $props();

	let open = $state(0.35);
	let turn = $state(0);
</script>

<div
	role="presentation"
	onpointermove={(e) => {
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		const r = e.currentTarget.getBoundingClientRect();
		open = 1;
		turn = ((e.clientX - r.left) / r.width - 0.5) * 24;
	}}
	onpointerleave={() => ((open = 0.35), (turn = 0))}
	class={cn('relative h-64 w-full', className)}
>
	{#each presets as p, i (p)}
		{@const mid = (presets.length - 1) / 2}
		{@const a = (i - mid) * 13 * open + turn}
		<div
			class="absolute bottom-0 left-1/2 aspect-[3/4] w-28 origin-[50%_160%] overflow-hidden rounded-xl border border-border shadow-[0_20px_40px_-20px_color-mix(in_oklab,var(--foreground)_40%,transparent)] transition-transform duration-500 ease-out motion-reduce:transition-none sm:w-32"
			style:transform={`translateX(-50%) rotate(${a}deg)`}
			style:z-index={presets.length - Math.abs(Math.round(i - mid))}
		>
			<ShaderMaterial preset={p} rendering="image" controls={false} sizes="140px" class="absolute inset-0 h-full w-full" />
			<span class="absolute bottom-1.5 left-1.5 rounded bg-background/85 px-1.5 py-0.5 font-mono text-[0.5625rem]">{p}</span>
		</div>
	{/each}
</div>
