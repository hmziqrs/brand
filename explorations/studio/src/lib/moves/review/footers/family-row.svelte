<script lang="ts">
	import { family } from '@hmziq/brand-core/family';
	import { cn } from '$brand/utils.js';
	import Mark from '$brand/components/mark.svelte';
	import { label, link } from './ui';

	let {
		site,
		variant = 'row',
		heading = 'mono',
		class: className
	}: {
		site: string;
		variant?: 'row' | 'grid';
		heading?: 'mono' | 'plain';
		class?: string;
	} = $props();

	const others = $derived(family.filter((f) => f.id !== site));
	const title = $derived(heading === 'mono' ? label : 'text-sm font-medium text-foreground');
</script>

{#if variant === 'row'}
	<div class={cn('flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-10', className)}>
		<h2 class={cn(title, 'shrink-0')}>More from hmziq</h2>
		<ul class="flex flex-wrap gap-x-6 gap-y-3">
			{#each others as f (f.id)}
				<li><a href={f.href} class={cn(link, 'inline-flex items-center gap-2 text-[15px]')}><Mark symbol={f.symbol} size={20} />{f.name}</a></li>
			{/each}
		</ul>
	</div>
{:else}
	<div class={className}>
		<h2 class={title}>More from hmziq</h2>
		<ul class="mt-5 grid grid-cols-1 gap-x-8 gap-y-5 min-[480px]:grid-cols-2 lg:grid-cols-4">
			{#each others as f (f.id)}
				<li>
					<a href={f.href} class="group flex items-center gap-3 rounded-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
						<Mark symbol={f.symbol} size={28} />
						<span class="flex min-w-0 flex-col leading-snug">
							<span class="text-[15px] text-foreground underline decoration-transparent decoration-[1.5px] underline-offset-[5px] transition-[text-decoration-color] group-hover:decoration-primary motion-reduce:transition-none">{f.name}</span>
							<span class="truncate text-[13px] text-foreground/70">{f.note}</span>
						</span>
					</a>
				</li>
			{/each}
		</ul>
	</div>
{/if}
