<script lang="ts">
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
	import { cn } from '$brand/utils.js';

	let { items, class: className }: { items: { label: string; href: string; text: string }[]; class?: string } = $props();
</script>

<ul data-slot="blog-end-links" class={cn('flex flex-col border-t border-border', className)}>
	{#each items as l (l.label)}
		<li class="border-b border-border">
			<a href={l.href} target="_blank" rel="noopener" class="group flex items-start gap-4 py-4 outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
				<span class="min-w-0 flex-1 text-[1.0625rem] leading-snug">
					<span class="font-medium text-foreground underline decoration-primary/50 underline-offset-4 group-hover:decoration-primary">{l.label}</span>
					<span class="text-foreground/85"> — {l.text}</span>
				</span>
				<ArrowUpRight class="lucide mt-1 size-4 shrink-0 text-primary" />
			</a>
		</li>
	{/each}
</ul>
