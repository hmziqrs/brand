<script lang="ts">
	import { family } from '@hmziq/brand-core/family';
	import { cn } from '$brand/utils.js';
	import Mark from '$brand/components/mark.svelte';
	import { label, link } from './ui';

	let { site, class: className }: { site: string; class?: string } = $props();

	const others = $derived(family.filter((f) => f.id !== site));
</script>

<div class={cn('flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-10', className)}>
	<h2 class={cn(label, 'shrink-0')}>More from hmziq</h2>
	<ul class="flex flex-wrap gap-x-6 gap-y-3">
		{#each others as f (f.id)}
			<li><a href={f.href} class={cn(link, 'inline-flex items-center gap-2 text-[15px]')}><Mark symbol={f.symbol} size={20} />{f.name}</a></li>
		{/each}
	</ul>
</div>
