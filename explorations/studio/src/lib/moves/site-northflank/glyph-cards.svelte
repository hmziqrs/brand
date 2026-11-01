<script lang="ts">
	import { cn } from '$brand/utils.js';
	import type { StripItem } from '$moves/northflank/feature-strip.svelte';

	let { items, class: className }: { items: StripItem[]; class?: string } = $props();
</script>

<ul data-slot="glyph-cards" class={cn('grid gap-3 sm:grid-cols-2 lg:grid-cols-4', className)}>
	{#each items as item (item.title)}
		<li class="group/g flex flex-col gap-5 rounded-xl border bg-card p-5 transition-colors hover:border-orange/60 sm:p-6 motion-reduce:transition-none">
			<span class="grid w-max gap-[2px]" style:grid-template-columns="repeat({Math.max(...item.glyph.map((r) => r.length))}, 5px)" aria-hidden="true">
				{#each item.glyph as row, y (y)}
					{#each [...row] as c, x (x)}
						<i class={cn('size-[5px]', c === 'o' ? 'bg-orange' : c === '#' ? 'bg-foreground' : c === '+' ? 'bg-foreground/25' : 'bg-transparent')}></i>
					{/each}
				{/each}
			</span>
			<div>
				<h3 class="text-[17px] font-medium text-foreground">{item.title}</h3>
				<p class="mt-1 text-[14.5px] text-foreground/75">{item.line}</p>
			</div>
		</li>
	{/each}
</ul>
