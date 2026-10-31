<script lang="ts">
	import { cn } from '$brand/utils.js';
	import { Button } from '$brand/ui/button/index.js';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';

	let {
		title,
		lede,
		action,
		href = '#/p/site-framer/home',
		meta,
		as = 'h2',
		size = 'lg',
		class: className
	}: { title: string; lede?: string; action?: string; href?: string; meta?: string; as?: 'h1' | 'h2'; size?: 'xl' | 'lg' | 'md'; class?: string } = $props();

	const sizes = {
		xl: 'text-[clamp(3rem,8.4vw,7.5rem)] leading-[0.9] tracking-[-0.055em]',
		lg: 'text-[clamp(2.5rem,5.6vw,5rem)] leading-[0.95] tracking-[-0.045em]',
		md: 'text-[clamp(2rem,4vw,3.5rem)] leading-none tracking-[-0.04em]'
	};
</script>

<div class={cn('flex flex-wrap items-end justify-between gap-x-10 gap-y-6', className)}>
	<div class="min-w-0 flex-[1_1_28rem]">
		<svelte:element this={as} class={cn('font-semibold text-balance text-foreground', size === 'xl' ? 'max-w-[14ch]' : 'max-w-[17ch]', sizes[size])}>{title}<span aria-hidden="true" class="ml-[0.06em] inline-block size-[0.16em] bg-primary align-baseline"></span></svelte:element>
		{#if lede}<p class="mt-5 max-w-[46ch] text-xl leading-snug text-foreground md:text-[1.375rem]">{lede}</p>{/if}
	</div>
	{#if action || meta}
		<div class="flex items-center gap-4">
			{#if meta}<span class="text-sm text-foreground/60">{meta}</span>{/if}
			{#if action}<Button {href} variant="outline" class="h-10 rounded-full px-4">{action}<ArrowRight class="lucide" /></Button>{/if}
		</div>
	{/if}
</div>
