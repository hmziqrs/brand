<script lang="ts">
	import { cn } from '$brand/utils.js';
	import type { Snippet } from 'svelte';

	let {
		tone = 'line',
		mark = 'none',
		href,
		class: className,
		children
	}: {
		tone?: 'line' | 'solid' | 'oxide' | 'ghost';
		mark?: 'none' | 'square' | 'plus' | 'ring';
		href?: string;
		class?: string;
		children: Snippet;
	} = $props();

	const tones = {
		line: 'border-[color-mix(in_oklab,var(--foreground)_18%,transparent)] bg-[color-mix(in_oklab,var(--background)_70%,transparent)] text-foreground',
		solid: 'border-transparent bg-foreground text-background',
		oxide: 'border-transparent bg-orange text-[var(--on-orange)]',
		ghost: 'border-transparent bg-transparent text-muted-foreground'
	} as const;
	const quiet = $derived(tone === 'line' || tone === 'ghost');
</script>

<svelte:element
	this={href ? 'a' : 'span'}
	{href}
	data-slot="mono-chip"
	class={cn(
		'inline-flex h-6 shrink-0 items-center gap-1.5 rounded-[5px] border px-2 font-mono text-[0.6875rem] leading-none font-medium tracking-[0.08em] whitespace-nowrap uppercase',
		tones[tone],
		href && 'transition-colors hover:border-primary focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none',
		className
	)}
>
	{#if mark === 'square'}<i aria-hidden="true" class={cn('size-[0.5rem] not-italic', quiet ? 'bg-primary' : 'bg-current')}></i>{/if}
	{#if mark === 'ring'}<i aria-hidden="true" class={cn('size-[0.55rem] rounded-full border-[1.5px] not-italic', quiet ? 'border-primary' : 'border-current')}></i>{/if}
	{@render children()}
	{#if mark === 'plus'}<span aria-hidden="true" class="opacity-60">+</span>{/if}
</svelte:element>
