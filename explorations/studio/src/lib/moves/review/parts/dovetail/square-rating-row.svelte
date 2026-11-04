<script lang="ts">
	import { cn } from '$brand/utils.js';

	type Item = { label: string; value: string; score?: number; example?: boolean };

	let {
		items,
		align = 'start',
		class: className
	}: {
		items: Item[];
		align?: 'start' | 'end' | 'center';
		class?: string;
	} = $props();

	const fill = (score: number, i: number) => Math.max(0, Math.min(1, score - i)) * 100;
	const justify = { start: 'justify-start', end: 'justify-end', center: 'justify-center' } as const;
</script>

<ul data-slot="square-rating-row" class={cn('flex flex-wrap gap-x-8 gap-y-5', justify[align], className)}>
	{#each items as item (item.label)}
		<li class="flex flex-col gap-1.5">
			<span class="flex items-center gap-[3px]" aria-label={item.score !== undefined ? `${item.score} out of 5` : undefined}>
				{#if item.score !== undefined}
					{#each [0, 1, 2, 3, 4] as i (i)}
						<i
							aria-hidden="true"
							class="block size-[0.6rem] rounded-[1.5px] not-italic"
							style:background={`linear-gradient(to right, var(--foreground) ${fill(item.score, i)}%, color-mix(in oklab, var(--foreground) 22%, transparent) ${fill(item.score, i)}%)`}
						></i>
					{/each}
					<span class="ml-1.5 text-[0.8125rem] font-medium text-foreground">{item.value}</span>
				{:else}
					<span class="text-[0.95rem] font-medium text-foreground">{item.value}</span>
				{/if}
			</span>
			<span class="font-mono text-[0.625rem] tracking-[0.12em] text-muted-foreground uppercase">
				{item.label}{#if item.example}<span class="text-primary"> · example</span>{/if}
			</span>
		</li>
	{/each}
</ul>
