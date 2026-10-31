<script lang="ts">
	import { cn } from '$brand/utils.js';

	let {
		before = '',
		mark,
		after = '',
		font = 'sans',
		as = 'span',
		class: className
	}: {
		before?: string;
		mark: string;
		after?: string;
		font?: 'sans' | 'serif';
		as?: string;
		class?: string;
	} = $props();
</script>

<svelte:element this={as} data-slot="oxide-mark-headline" class={cn('leading-[1.12] text-foreground', className)}>
	{before}<span class={cn('band-orange mx-[0.04em] inline rounded-[0.12em] px-[0.14em] [box-decoration-break:clone] [-webkit-box-decoration-break:clone]', font === 'serif' && 'font-serif font-normal tracking-[-0.01em] italic')}>{mark}</span>{after}
</svelte:element>
