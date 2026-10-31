<script lang="ts">
	import { cn } from '$brand/utils.js';

	let {
		title,
		caption,
		points,
		goal,
		class: className
	}: {
		title: string;
		caption: string;
		points: { label: string; value: number }[];
		goal?: number;
		class?: string;
	} = $props();

	let hot = $state(-1);
	const last = $derived(points[points.length - 1]);
	const cur = $derived(hot >= 0 ? points[hot] : last);
</script>

<figure class={cn('rounded-2xl border border-[color-mix(in_oklab,var(--foreground)_12%,transparent)] bg-card p-5 sm:p-6', className)}>
	<div class="flex items-baseline justify-between gap-4">
		<p class="text-[0.95rem] font-medium text-foreground">{title}</p>
		<p class="font-dot text-[2.2rem] leading-none font-extrabold text-foreground">{cur.value}%</p>
	</div>
	<div class="relative mt-6 flex h-40 items-end gap-2" role="list">
		{#if goal}<span class="pointer-events-none absolute inset-x-0 border-t border-dashed border-[color-mix(in_oklab,var(--foreground)_40%,transparent)]" style:bottom="{goal}%"><span class="absolute -top-5 right-0 font-mono text-[0.6rem] tracking-[0.1em] text-muted-foreground uppercase">Target {goal}%</span></span>{/if}
		{#each points as p, i (p.label)}
			<button
				type="button"
				role="listitem"
				aria-label="{p.label}: {p.value}%"
				onpointerenter={() => (hot = i)}
				onpointerleave={() => (hot = -1)}
				onfocus={() => (hot = i)}
				onblur={() => (hot = -1)}
				class={cn('flex-1 rounded-t-[3px] transition-colors', i === points.length - 1 || hot === i ? 'bg-primary' : 'bg-[color-mix(in_oklab,var(--foreground)_22%,transparent)]')}
				style:height="{p.value}%"
			></button>
		{/each}
	</div>
	<div class="mt-2 flex gap-2 font-mono text-[0.6rem] tracking-[0.08em] text-muted-foreground uppercase">
		{#each points as p (p.label)}<span class="flex-1 text-center">{p.label}</span>{/each}
	</div>
	<figcaption class="mt-4 text-[0.9rem] leading-snug text-foreground/85">{caption}</figcaption>
</figure>
