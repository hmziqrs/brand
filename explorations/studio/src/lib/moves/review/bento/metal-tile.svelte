<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import MonoChip from '$moves/dovetail/mono-chip.svelte';
	import ProviderMark from '$moves/dovetail/provider-mark.svelte';
	import type { Provider } from '$moves/dovetail/providers';

	let {
		provider,
		preset = 'copper-sweep',
		size = 'sm',
		picked = false,
		onpick,
		class: className
	}: {
		provider: Provider;
		preset?: string;
		size?: 'sm' | 'lg';
		picked?: boolean;
		onpick?: (id: string) => void;
		class?: string;
	} = $props();

	let x = $state(0);
	let y = $state(0);
	let on = $state(false);
	let still = $state(false);

	$effect(() => {
		still = matchMedia('(prefers-reduced-motion: reduce)').matches;
	});

	function move(e: PointerEvent) {
		const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
		x = ((e.clientX - r.left) / r.width - 0.5) * 2;
		y = ((e.clientY - r.top) / r.height - 0.5) * 2;
		on = !still;
	}
</script>

<button
	type="button"
	data-slot="metal-tile"
	aria-pressed={picked}
	aria-label={`${provider.name}: show claude-${provider.id} in the switcher`}
	class={cn(
		'group/metal relative isolate flex flex-col justify-between overflow-hidden rounded-2xl p-2 text-left outline-none ring-1 ring-foreground/10 transition-shadow duration-300 focus-visible:ring-3 focus-visible:ring-ring/60 motion-reduce:transition-none',
		size === 'lg' ? 'min-h-[19rem] sm:min-h-[22rem]' : 'min-h-[15rem] sm:min-h-[16.5rem]',
		picked && 'ring-2 ring-primary',
		className
	)}
	onpointermove={move}
	onpointerleave={() => (on = false)}
	onclick={() => onpick?.(provider.id)}
>
	<span
		aria-hidden="true"
		class="absolute -inset-[8%] -z-10 transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] motion-reduce:transition-none motion-reduce:transform-none"
		style:transform={on ? `translate3d(${(-x * 3).toFixed(2)}%, ${(-y * 3).toFixed(2)}%, 0) scale(1.06)` : 'none'}
	>
		<ShaderMaterial {preset} rendering="image" controls={false} sizes="(min-width: 1024px) 40vw, 100vw" class="absolute inset-0" />
	</span>
	<span class="flex items-start justify-between p-2">
		<span class={cn('grid place-items-center rounded-full bg-background text-foreground shadow-[0_10px_30px_-10px_color-mix(in_oklab,black_70%,transparent)] transition-transform duration-500 motion-reduce:transition-none', size === 'lg' ? 'size-20 text-[2.1rem]' : 'size-14 text-[1.5rem]')} style:transform={on ? `translate(${(x * 4).toFixed(1)}px, ${(y * 4).toFixed(1)}px)` : 'none'}>
			<ProviderMark {provider} />
		</span>
		<MonoChip tone="solid">claude-{provider.id}</MonoChip>
	</span>
	<span class="flex flex-col gap-3 rounded-xl bg-background p-5">
		<span class={cn('font-medium tracking-[-0.03em] text-foreground', size === 'lg' ? 'text-[2rem] leading-none' : 'text-[1.3rem] leading-tight')}>{provider.name}</span>
		<span class="flex flex-wrap gap-1.5">
			<MonoChip mark="square">{provider.opus}</MonoChip>
			{#if provider.fast !== provider.opus}<MonoChip>{provider.fast}</MonoChip>{/if}
		</span>
		<span class="text-[0.875rem] text-foreground/80">{provider.pay}</span>
	</span>
</button>
