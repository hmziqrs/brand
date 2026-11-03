<script lang="ts">
	import { cn } from '$brand/utils.js';
	import type { FooterColumn } from './sites';
	import { label, link, tag } from './ui';

	let {
		columns,
		here,
		heading = 'mono',
		class: className,
		linkClass
	}: {
		columns: FooterColumn[];
		here: string;
		heading?: 'mono' | 'plain';
		class?: string;
		linkClass?: string;
	} = $props();
</script>

<nav aria-label="Footer" class={cn('grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3', className)}>
	{#each columns as col (col.title)}
		<div class="min-w-0">
			<h2 class={heading === 'mono' ? label : 'text-sm font-medium text-foreground'}>{col.title}</h2>
			<ul class="mt-4 flex flex-col gap-2.5">
				{#each col.links as l (l.label)}
					<li>
						<a href={l.href ?? here} class={cn(link, 'inline-flex max-w-full items-center gap-2 text-[15px] break-words', linkClass)}>
							<span class="min-w-0">{l.label}</span>
							{#if l.tag}<span class={tag}>{l.tag}</span>{/if}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	{/each}
</nav>
