<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$brand/utils.js';
	import { kicker as kickerClass, lede as ledeClass, subtitle, title as titleClass } from './ui';

	let {
		kicker,
		title,
		accent,
		lede,
		size = 'lg',
		layout = 'split',
		aside,
		class: className
	}: {
		kicker?: string;
		title: string;
		accent?: string;
		lede?: string;
		size?: 'lg' | 'md';
		layout?: 'split' | 'stack' | 'center';
		aside?: Snippet;
		class?: string;
	} = $props();

	const parts = $derived.by(() => {
		const at = accent ? title.indexOf(accent) : -1;
		return at < 0 ? { before: title, mark: '', after: '' } : { before: title.slice(0, at), mark: accent ?? '', after: title.slice(at + (accent?.length ?? 0)) };
	});
</script>

<div
	class={cn(
		'grid gap-6',
		layout === 'split' && 'lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:items-end lg:gap-12',
		layout === 'center' && 'justify-items-center text-center',
		className
	)}
>
	<div class={cn('min-w-0', layout === 'center' && 'flex flex-col items-center')}>
		{#if kicker}<p class={kickerClass}>{kicker}</p>{/if}
		<h2 class={cn(size === 'lg' ? titleClass : subtitle, kicker && 'mt-4', layout === 'center' && 'max-w-[18ch]')}>
			{parts.before}{#if parts.mark}<span class="text-primary">{parts.mark}</span>{/if}{parts.after}
		</h2>
	</div>
	{#if lede || aside}
		<div class={cn('flex min-w-0 flex-col items-start gap-5', layout === 'split' && 'lg:items-end lg:justify-self-end', layout === 'center' && 'items-center')}>
			{#if lede}<p class={cn(ledeClass, 'max-w-[46ch]')}>{lede}</p>{/if}
			{@render aside?.()}
		</div>
	{/if}
</div>
