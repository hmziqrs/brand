<script lang="ts" module>
	export type StripItem = { title: string; line: string; glyph: string[] };
</script>

<script lang="ts">
	import { cn } from '$brand/utils.js';

	let { items, face = 'sans', class: className }: { items: StripItem[]; face?: 'sans' | 'pixel'; class?: string } = $props();
</script>

<div data-slot="feature-strip" class={cn('grid overflow-hidden rounded-xl border sm:grid-cols-2 lg:grid-cols-4', className)}>
	{#each items as item, n (item.title)}
		<div class={cn('flex flex-col gap-5 p-5 sm:p-6', n > 0 && 'border-t sm:border-t-0', n % 2 === 1 && 'sm:border-l', n >= 2 && 'sm:border-t lg:border-t-0', n > 0 && 'lg:border-l')}>
			<span class="grid w-max gap-[2px]" style:grid-template-columns="repeat({Math.max(...item.glyph.map((r) => r.length))}, 5px)" aria-hidden="true">
				{#each item.glyph as row, y (y)}
					{#each [...row] as c, x (x)}
						<i class={cn('size-[5px]', c === 'o' ? 'bg-orange' : c === '#' ? 'bg-foreground' : c === '+' ? 'bg-foreground/25' : 'bg-transparent')}></i>
					{/each}
				{/each}
			</span>
			<div>
				<h3 class={cn('text-foreground', face === 'pixel' ? 'font-pixel text-[13px] uppercase' : 'text-[17px] font-medium')}>{item.title}</h3>
				<p class="mt-1 text-sm text-muted-foreground">{item.line}</p>
			</div>
		</div>
	{/each}
</div>
