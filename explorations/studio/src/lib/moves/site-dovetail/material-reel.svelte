<script lang="ts">
	import Play from '@lucide/svelte/icons/play';
	import Pause from '@lucide/svelte/icons/pause';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import { cn } from '$brand/utils.js';

	let {
		preset = 'oxide-bloom',
		caption,
		label = 'Reel',
		aspect = 'aspect-video',
		class: className
	}: {
		preset?: string;
		caption: string;
		label?: string;
		aspect?: string;
		class?: string;
	} = $props();

	let playing = $state(false);
</script>

<figure class={cn('group', className)}>
	<div class={cn('relative overflow-hidden rounded-2xl border border-[color-mix(in_oklab,var(--foreground)_12%,transparent)]', aspect)}>
		{#if playing}
			<ShaderMaterial {preset} rendering="live" animated controls={false} class="absolute inset-0 h-full w-full" />
		{:else}
			<ShaderMaterial {preset} rendering="image" controls={false} sizes="(min-width: 1024px) 40vw, 100vw" class="absolute inset-0 h-full w-full" />
		{/if}
		<span class="absolute top-3 left-3 rounded-md bg-background px-2 py-1 font-mono text-[0.625rem] tracking-[0.12em] text-foreground uppercase">{label}</span>
		<button
			type="button"
			onclick={() => (playing = !playing)}
			aria-pressed={playing}
			aria-label={playing ? 'Pause the material' : 'Play the material'}
			class="absolute top-1/2 left-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-xl bg-background text-foreground shadow-lg transition-transform group-hover:scale-105 motion-reduce:transition-none"
		>
			{#if playing}<Pause class="lucide size-5" />{:else}<Play class="lucide size-5" />{/if}
		</button>
	</div>
	<figcaption class="mt-4 max-w-[28rem] text-[1.05rem] leading-snug text-foreground">{caption}</figcaption>
</figure>
