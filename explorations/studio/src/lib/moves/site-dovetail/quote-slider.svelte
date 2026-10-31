<script lang="ts">
	import { fade } from 'svelte/transition';
	import RustGridField from '$moves/flora/rust-grid-field.svelte';
	import { cn } from '$brand/utils.js';

	type Q = { quote: string; name: string; role: string };

	let { quotes, class: className }: { quotes: Q[]; class?: string } = $props();
	let i = $state(0);
	const reduce = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
</script>

<div class={cn('relative isolate overflow-hidden rounded-3xl border border-[color-mix(in_oklab,var(--foreground)_12%,transparent)] px-6 py-16 sm:px-16 sm:py-24', className)}>
	<RustGridField cell={32} fade="edges" stain="--foreground" class="-z-10" />
	{#key i}
		<blockquote in:fade={{ duration: reduce ? 0 : 300 }} class="max-w-[46rem] rounded-xl bg-background/80 text-[clamp(1.6rem,3vw,2.6rem)] leading-[1.15] font-medium tracking-[-0.03em] text-foreground backdrop-blur-sm">“{quotes[i].quote}”</blockquote>
	{/key}
	<div class="mt-10 flex flex-wrap items-center justify-between gap-6">
		<p class="inline-flex flex-col rounded-md bg-background px-2 py-1 font-mono text-[0.72rem] tracking-[0.14em] text-foreground uppercase">
			<span>{quotes[i].name}</span><span class="text-muted-foreground">{quotes[i].role} · invented example</span>
		</p>
		<div class="flex items-center gap-3 rounded-md bg-background px-2 py-1 font-mono text-[0.75rem]" role="tablist" aria-label="Quotes">
			{#each quotes as _, k (k)}
				<button type="button" role="tab" aria-selected={i === k} onclick={() => (i = k)} class={cn('flex items-center gap-2 transition-colors', i === k ? 'text-foreground' : 'text-foreground/45 hover:text-foreground')}>
					{String(k + 1).padStart(2, '0')}{#if i === k}<span class="h-px w-8 bg-foreground"></span><span class="size-1.5 bg-primary"></span>{/if}
				</button>
			{/each}
		</div>
	</div>
</div>
