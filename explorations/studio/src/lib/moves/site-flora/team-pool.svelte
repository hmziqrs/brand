<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import Glass from '$brand/components/glass.svelte';
	import CursorTag from './cursor-tag.svelte';

	let {
		perSeat = 45,
		preset = 'sediment',
		class: className
	}: {
		perSeat?: number;
		preset?: string;
		class?: string;
	} = $props();

	let seats = $state(5);
	const pool = $derived(seats * perSeat);
	const people = [
		{ name: 'Ada', tone: 'pink' as const, share: 0.22 },
		{ name: 'Kofi', tone: 'teal' as const, share: 0.12 },
		{ name: 'Wren', tone: 'yellow' as const, share: 0.31 }
	];
	const spent = $derived(Math.round(pool * people.reduce((a, p) => a + p.share, 0) * Math.min(1, 5 / seats + 0.35)));
	const left = $derived(Math.max(0, pool - spent));
	const tones = { pink: 'bg-pink', teal: 'bg-teal', yellow: 'bg-yellow' };
</script>

<div class={cn('relative isolate grid min-h-[440px] place-items-center overflow-hidden rounded-3xl border border-border p-6', className)}>
	<ShaderMaterial {preset} rendering="image" loading="lazy" controls={false} sizes="(min-width: 1024px) 45vw, 100vw" class="absolute inset-0 -z-10 h-full w-full" />
	<CursorTag name="Ada" tone="pink" class="absolute top-[12%] left-[10%]" />
	<CursorTag name="Wren" tone="yellow" class="absolute right-[8%] bottom-[14%]" />
	<CursorTag name="Kofi" tone="teal" class="absolute bottom-[10%] left-[14%]" />
	<Glass variant="smoke" class="w-full max-w-[360px] rounded-2xl p-5">
		<div class="flex items-center justify-between font-mono text-[11px] tracking-wide text-foreground uppercase">
			<span>Team pool</span><span>Team · {seats} seats</span>
		</div>
		<p class="mt-3 flex items-baseline gap-2 text-foreground">
			<span class="text-[2.75rem] leading-none font-medium tracking-[-0.04em] tabular-nums">${left.toLocaleString('en-US')}</span>
			<span class="text-sm">of ${pool.toLocaleString('en-US')} left</span>
		</p>
		<div class="mt-4 flex h-2 overflow-hidden rounded-full bg-foreground/15">
			{#each people as p (p.name)}
				<span class={cn('h-full transition-[width] duration-500 motion-reduce:transition-none', tones[p.tone])} style:width="{((pool * p.share * Math.min(1, 5 / seats + 0.35)) / pool) * 100}%"></span>
			{/each}
		</div>
		<ul class="mt-3 grid grid-cols-3 gap-2 text-[12px] text-foreground">
			{#each people as p (p.name)}
				<li class="flex items-center gap-1.5"><span class={cn('size-2 rounded-full', tones[p.tone])}></span>{p.name} ${Math.round(pool * p.share * Math.min(1, 5 / seats + 0.35))}</li>
			{/each}
		</ul>
		<label class="mt-5 block text-[13px] text-foreground">
			<span class="flex justify-between"><span>Seats</span><span class="font-mono tabular-nums">{seats}</span></span>
			<input type="range" min="1" max="25" bind:value={seats} class="mt-2 w-full accent-[var(--primary)]" />
		</label>
		<p class="mt-2 text-[12px] text-foreground/80">Add a seat and the pool grows by ${perSeat}. Nobody does seat maths.</p>
	</Glass>
</div>
