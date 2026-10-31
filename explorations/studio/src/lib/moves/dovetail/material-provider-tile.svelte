<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import MonoChip from './mono-chip.svelte';
	import ProviderMark from './provider-mark.svelte';
	import type { Provider } from './providers';

	let {
		provider,
		preset = 'copper-sweep',
		size = 'sm',
		class: className
	}: {
		provider: Provider;
		preset?: string;
		size?: 'sm' | 'lg';
		class?: string;
	} = $props();
</script>

<article data-slot="material-provider-tile" class={cn('relative isolate flex flex-col justify-between overflow-hidden rounded-2xl p-2', size === 'lg' ? 'min-h-[24rem]' : 'min-h-[17rem]', className)}>
	<ShaderMaterial {preset} rendering="image" controls={false} sizes="(min-width: 1024px) 33vw, 100vw" class="absolute inset-0 -z-10" />
	<div class="flex items-start justify-between p-2">
		<span class={cn('grid place-items-center rounded-full bg-background text-foreground shadow-[0_10px_30px_-10px_color-mix(in_oklab,black_70%,transparent)]', size === 'lg' ? 'size-20 text-[2.1rem]' : 'size-14 text-[1.5rem]')}>
			<ProviderMark {provider} />
		</span>
		<MonoChip tone="solid">claude-{provider.id}</MonoChip>
	</div>
	<div class="flex flex-col gap-3 rounded-xl bg-background p-5">
		<h3 class={cn('font-medium tracking-[-0.03em]', size === 'lg' ? 'text-[2rem] leading-none' : 'text-[1.3rem] leading-tight')}>{provider.name}</h3>
		<div class="flex flex-wrap gap-1.5">
			<MonoChip mark="square">{provider.opus}</MonoChip>
			{#if provider.fast !== provider.opus}<MonoChip>{provider.fast}</MonoChip>{/if}
		</div>
		<p class="text-[0.875rem] text-foreground/80">{provider.pay}</p>
	</div>
</article>
