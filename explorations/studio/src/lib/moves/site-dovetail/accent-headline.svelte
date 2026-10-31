<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$brand/utils.js';

	let {
		as = 'h2',
		size = 'xl',
		tint = 'foreground',
		class: className,
		children
	}: {
		as?: 'h1' | 'h2' | 'h3' | 'p';
		size?: 'mega' | 'xl' | 'lg' | 'md' | 'sm';
		tint?: 'foreground' | 'primary';
		class?: string;
		children: Snippet;
	} = $props();

	const sizes = {
		mega: 'text-[clamp(3.2rem,11vw,10rem)] leading-[0.9] tracking-[-0.055em]',
		xl: 'text-[clamp(2.8rem,7.6vw,6.75rem)] leading-[0.94] tracking-[-0.05em]',
		lg: 'text-[clamp(2.3rem,5.2vw,4.75rem)] leading-[0.98] tracking-[-0.045em]',
		md: 'text-[clamp(1.9rem,3.4vw,3.25rem)] leading-[1.02] tracking-[-0.035em]',
		sm: 'text-[clamp(1.6rem,2.4vw,2.25rem)] leading-[1.08] tracking-[-0.03em]'
	} as const;
</script>

<svelte:element this={as} data-tint={tint} class={cn('accent-headline font-sans font-medium text-balance text-foreground', sizes[size], className)}>
	{@render children()}
</svelte:element>

<style>
	.accent-headline :global(em) {
		font-family: var(--studio-accent, 'Doto'), ui-monospace, monospace;
		font-style: normal;
		font-weight: 800;
		font-size: 1.04em;
		letter-spacing: -0.035em;
	}
	.accent-headline[data-tint='primary'] :global(em) {
		color: var(--primary);
	}
</style>
