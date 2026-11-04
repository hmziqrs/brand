<script lang="ts">
	import { cn } from '$brand/utils.js';
	import type { Snippet } from 'svelte';

	let {
		as = 'h2',
		size = 'xl',
		alt = 'serif',
		base = 'sans',
		tint = 'foreground',
		class: className,
		children
	}: {
		as?: 'h1' | 'h2' | 'h3' | 'p';
		size?: 'mega' | 'xl' | 'lg' | 'md';
		alt?: 'serif' | 'fraunces' | 'newsreader' | 'crt' | 'dot' | 'sans' | 'accent';
		base?: 'sans' | 'serif' | 'newsreader';
		tint?: 'foreground' | 'primary' | 'muted';
		class?: string;
		children: Snippet;
	} = $props();

	const sizes = {
		mega: 'text-[clamp(3.1rem,11.2vw,10.5rem)] leading-[0.9] tracking-[-0.055em]',
		xl: 'text-[clamp(2.7rem,8.4vw,7.5rem)] leading-[0.92] tracking-[-0.05em]',
		lg: 'text-[clamp(2.3rem,5.6vw,5rem)] leading-[0.96] tracking-[-0.045em]',
		md: 'text-[clamp(1.9rem,3.6vw,3.25rem)] leading-[1] tracking-[-0.035em]'
	} as const;
</script>

<svelte:element
	this={as}
	data-alt={alt}
	data-base={base}
	data-tint={tint}
	class={cn('mixed-headline text-balance text-foreground', sizes[size], className)}
>
	{@render children()}
</svelte:element>

<style>
	.mixed-headline[data-base='sans'] {
		font-family: var(--font-sans);
		font-weight: 500;
	}
	.mixed-headline[data-base='serif'] {
		font-family: var(--font-serif);
		font-weight: 400;
		letter-spacing: -0.03em;
		line-height: 0.88;
	}
	.mixed-headline[data-base='newsreader'] {
		font-family: var(--font-newsreader);
		font-weight: 300;
		letter-spacing: -0.045em;
		line-height: 0.9;
	}
	.mixed-headline[data-alt='sans'] :global(em) {
		font-family: var(--font-sans);
		font-weight: 500;
		font-size: 0.86em;
		letter-spacing: -0.055em;
	}
	.mixed-headline :global(em) {
		font-style: normal;
		font-weight: 400;
		letter-spacing: -0.02em;
	}
	.mixed-headline[data-alt='serif'] :global(em) {
		font-family: var(--font-serif);
		font-style: italic;
		font-size: 1.09em;
		letter-spacing: -0.035em;
		line-height: 0.8;
	}
	.mixed-headline[data-alt='fraunces'] :global(em) {
		font-family: var(--font-fraunces);
		font-style: italic;
		font-weight: 330;
		font-variation-settings: 'SOFT' 100, 'WONK' 1;
		letter-spacing: -0.04em;
	}
	.mixed-headline[data-alt='newsreader'] :global(em) {
		font-family: var(--font-newsreader);
		font-style: italic;
		font-weight: 300;
		font-size: 1.04em;
		letter-spacing: -0.04em;
	}
	.mixed-headline[data-alt='crt'] :global(em) {
		font-family: var(--font-crt);
		font-size: 1.22em;
		letter-spacing: -0.01em;
		line-height: 0.7;
	}
	.mixed-headline[data-alt='dot'] :global(em) {
		font-family: var(--font-dot);
		font-weight: 700;
		font-size: 1.02em;
		letter-spacing: -0.04em;
	}
	.mixed-headline[data-alt='accent'] :global(em) {
		font-family: inherit;
		font-weight: inherit;
		letter-spacing: inherit;
		color: var(--primary);
	}
	.mixed-headline[data-tint='primary'] :global(em) {
		color: var(--primary);
	}
	.mixed-headline[data-tint='muted'] :global(em) {
		color: color-mix(in oklab, var(--foreground) 72%, transparent);
	}
</style>
