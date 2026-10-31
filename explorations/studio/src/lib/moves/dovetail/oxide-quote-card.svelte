<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import PatinaRain from './patina-rain.svelte';
	import MonoChip from './mono-chip.svelte';

	let {
		quote,
		name,
		role,
		label = 'Example quote',
		texture = 'rain',
		preset = 'halftone-print',
		face = 'sans',
		class: className
	}: {
		quote: string;
		name: string;
		role: string;
		label?: string;
		texture?: 'rain' | 'patina' | 'shader' | 'none';
		preset?: string;
		face?: 'sans' | 'serif';
		class?: string;
	} = $props();
</script>

<figure
	data-slot="oxide-quote-card"
	class={cn('band-orange relative isolate flex min-h-[22rem] flex-col justify-between gap-10 overflow-hidden rounded-2xl p-6 sm:p-9', className)}
>
	{#if texture === 'rain' || texture === 'patina'}
		<PatinaRain mode={texture} cell={15} opacity={0.32} mask="right" seed={name} class="-z-10 text-[var(--on-orange)]" />
	{:else if texture === 'shader'}
		<ShaderMaterial {preset} rendering="image" controls={false} transparent blend="multiply" opacity={0.42} sizes="(min-width: 1024px) 60vw, 100vw" class="absolute inset-0 -z-10 [mask-image:linear-gradient(to_left,black,transparent_85%)]" />
	{/if}
	<div class="flex items-center justify-between gap-4">
		<MonoChip tone="solid" mark="square">{label}</MonoChip>
		<svg viewBox="0 0 40 40" aria-hidden="true" class="size-9 opacity-80">
			{#each [18, 12, 6] as r (r)}<circle cx="20" cy="20" {r} fill="none" stroke="currentColor" stroke-width="1.6" />{/each}
			<rect x="17" y="17" width="6" height="6" fill="currentColor" />
		</svg>
	</div>
	<blockquote
		class={cn(
			'max-w-[34ch] text-balance',
			face === 'serif' ? 'font-serif text-[clamp(1.75rem,3.4vw,2.75rem)] leading-[1.08] tracking-[-0.01em]' : 'text-[clamp(1.35rem,2.4vw,1.9rem)] leading-[1.22] font-medium tracking-[-0.02em]'
		)}
	>
		“{quote}”
	</blockquote>
	<figcaption class="flex items-end justify-between gap-4">
		<span class="flex flex-col gap-0.5">
			<span class="text-[0.95rem] font-medium">{name}</span>
			<span class="text-[0.8125rem] opacity-80">{role}</span>
		</span>
		<span class="font-mono text-[0.6875rem] tracking-[0.08em] uppercase opacity-75">Invented for this draft</span>
	</figcaption>
</figure>
