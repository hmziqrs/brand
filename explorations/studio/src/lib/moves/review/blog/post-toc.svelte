<script lang="ts">
	import { cn } from '$brand/utils.js';
	import { scrollSpy } from '@hmziq/brand-core/scroll-spy';
	import { scrollToId } from './posts';

	let {
		items,
		here,
		numbered = false,
		label = 'On this page',
		class: className
	}: { items: { id: string; label: string }[]; here: string; numbered?: boolean; label?: string; class?: string } = $props();

	let current = $state('');

	$effect(() => scrollSpy(items.map((i) => i.id), (id) => (current = id)));

	function go(e: MouseEvent, id: string) {
		e.preventDefault();
		scrollToId(id);
	}
</script>

<nav aria-label={label} data-slot="blog-post-toc" class={cn('text-[0.9375rem]', className)}>
	<p class="mb-3 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">{label}</p>
	<ul class="flex flex-col">
		{#each items as it, i (it.id)}
			<li>
				<a
					href={here}
					onclick={(e) => go(e, it.id)}
					aria-current={current === it.id ? 'location' : undefined}
					class="flex items-baseline gap-3 border-l border-border py-1.5 pl-3.5 text-foreground/75 transition-colors outline-none hover:text-foreground focus-visible:text-foreground aria-[current=location]:border-primary aria-[current=location]:text-foreground motion-reduce:transition-none"
				>
					{#if numbered}<span class="font-mono text-xs text-primary tabular-nums">{String(i + 1).padStart(2, '0')}</span>{/if}
					<span>{it.label}</span>
				</a>
			</li>
		{/each}
	</ul>
</nav>
