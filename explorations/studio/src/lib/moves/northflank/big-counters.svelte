<script lang="ts" module>
	export type Counter = { value: string; unit?: string; label: string };
</script>

<script lang="ts">
	import { cn } from '$brand/utils.js';

	let {
		items,
		numberClass = 'font-sans font-medium tracking-[-0.05em]',
		class: className
	}: { items: Counter[]; numberClass?: string; class?: string } = $props();
</script>

<dl data-slot="big-counters" class={cn('grid grid-cols-2 border-t lg:grid-cols-4', className)}>
	{#each items as c, n (c.label)}
		<div class={cn('flex flex-col-reverse justify-end border-b py-8 pr-4 lg:border-b-0', n % 2 === 1 && 'border-l pl-5 lg:pl-8', n > 0 && 'lg:border-l lg:pl-8')}>
			<dt class="mt-3 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">{c.label}</dt>
			<dd class={cn('text-[clamp(56px,8.5vw,128px)] leading-[0.9] text-foreground', numberClass)}>
				{c.value}{#if c.unit}<span class="ml-1 text-[0.32em] tracking-normal text-orange">{c.unit}</span>{/if}
			</dd>
		</div>
	{/each}
</dl>
