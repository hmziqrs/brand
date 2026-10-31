<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import Glass from '$brand/components/glass.svelte';
	import Play from '@lucide/svelte/icons/play';
	import Pause from '@lucide/svelte/icons/pause';

	let {
		preset = 'ink-diffusion',
		title = 'Why we started Plumb',
		length = '3:18',
		class: className
	}: { preset?: string; title?: string; length?: string; class?: string } = $props();

	let playing = $state(false);
	let t = $state(0);

	$effect(() => {
		if (!playing) return;
		const id = setInterval(() => (t = t >= 198 ? 0 : t + 1), 1000);
		return () => clearInterval(id);
	});

	const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
</script>

<figure data-slot="film-panel" class={cn('relative isolate aspect-[4/3] overflow-hidden rounded-3xl ring-1 ring-foreground/10 sm:aspect-[16/10] md:aspect-[16/8]', className)}>
	<ShaderMaterial {preset} rendering="live" animated={playing} controls={false} loading="eager" class="absolute inset-0 -z-10 h-full w-full" />
	<div aria-hidden="true" class="absolute inset-0 -z-10 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
	<button type="button" onclick={() => (playing = !playing)} aria-label={playing ? 'Pause film' : 'Play film'} class={cn('absolute top-1/2 left-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-primary text-primary-foreground shadow-2xl transition-all hover:scale-105 motion-reduce:transition-none md:size-24', playing && 'pointer-events-none opacity-0')}>
		<Play class="lucide size-8 fill-current" />
	</button>
	<Glass variant="smoke" class="absolute inset-x-3 bottom-3 flex items-center gap-4 rounded-2xl px-4 py-3 text-foreground sm:inset-x-6 sm:bottom-6">
		<button type="button" onclick={() => (playing = !playing)} aria-label={playing ? 'Pause' : 'Play'} class="grid size-9 shrink-0 place-items-center rounded-full bg-foreground text-background">
			{#if playing}<Pause class="lucide size-4 fill-current" />{:else}<Play class="lucide size-4 fill-current" />{/if}
		</button>
		<span class="hidden min-w-0 flex-col sm:flex"><b class="truncate font-medium">{title}</b><span class="text-sm">A film made of material, not footage</span></span>
		<span class="relative h-1 min-w-16 flex-1 overflow-hidden rounded-full bg-foreground/20"><span class="absolute inset-y-0 left-0 bg-primary" style:width="{(t / 198) * 100}%"></span></span>
		<span class="font-mono text-xs tabular-nums">{fmt(t)} / {length}</span>
	</Glass>
</figure>
