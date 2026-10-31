<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';

	type Stat = { value: string; unit?: string; label: string };

	let {
		title,
		href,
		link = 'Learn more',
		stats,
		class: className
	}: { title: string; href?: string; link?: string; stats: Stat[]; class?: string } = $props();
</script>

<div data-slot="stat-band" class={cn('grid gap-px overflow-hidden rounded-2xl bg-border ring-1 ring-border md:grid-cols-4', className)}>
	<div class="flex flex-col justify-between gap-6 bg-background p-6 md:p-8">
		<p class="text-2xl leading-tight font-medium tracking-[-0.02em] text-foreground">{title}</p>
		<div class="flex flex-col gap-2">
			{#if href}<a {href} class="inline-flex items-center gap-1.5 font-medium text-primary hover:underline">{link}<ArrowRight class="lucide size-4" /></a>{/if}
			<span class="font-mono text-[11px] tracking-wide text-muted-foreground uppercase">Example figures</span>
		</div>
	</div>
	{#each stats as s, i (s.label)}
		<div class={cn('flex flex-col justify-between gap-8 p-6 md:p-8', i === stats.length - 1 ? 'band-orange' : 'bg-background text-foreground')}>
			<p class="text-[clamp(3.5rem,6vw,5.5rem)] leading-none font-medium tracking-[-0.05em] tabular-nums">{s.value}<span class={i === stats.length - 1 ? '' : 'text-primary'}>{s.unit}</span></p>
			<p class="text-base">{s.label}</p>
		</div>
	{/each}
</div>
