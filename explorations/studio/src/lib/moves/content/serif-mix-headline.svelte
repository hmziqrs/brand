<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$brand/utils.js';

	let {
		text,
		as = 'h1',
		size = 'xl',
		face = 'serif',
		accent = false,
		object,
		class: className,
		id
	}: {
		text: string;
		as?: 'h1' | 'h2' | 'h3' | 'p';
		size?: 'xxl' | 'xl' | 'lg' | 'md' | 'sm';
		face?: 'serif' | 'newsreader' | 'fraunces' | 'sans';
		accent?: boolean;
		object?: Snippet;
		class?: string;
		id?: string;
	} = $props();

	const sizes = {
		xxl: 'text-[clamp(3.4rem,11.5vw,10rem)] leading-[0.88] tracking-[-0.045em]',
		xl: 'text-[clamp(3rem,9vw,8.25rem)] leading-[0.9] tracking-[-0.04em]',
		lg: 'text-[clamp(2.5rem,6.6vw,6rem)] leading-[0.95] tracking-[-0.035em]',
		md: 'text-[clamp(2.1rem,4.4vw,4rem)] leading-[1] tracking-[-0.03em]',
		sm: 'text-[clamp(1.6rem,2.8vw,2.4rem)] leading-[1.08] tracking-[-0.025em]'
	} as const;
	const faces = {
		serif: 'font-serif italic tracking-[-0.01em] text-[1.1em] leading-[0.8]',
		newsreader: 'font-newsreader italic font-[360] tracking-[-0.03em] text-[1.04em]',
		sans: 'text-primary',
		fraunces: 'font-fraunces italic font-[380] tracking-[-0.035em] [font-variation-settings:"SOFT"_100,"WONK"_1]'
	} as const;

	const parts = $derived(
		text.split(/(\[\*\]|_[^_]+_)/g).filter(Boolean).map((t) =>
			t === '[*]' ? { k: 'obj' as const, t } : t.startsWith('_') && t.endsWith('_') ? { k: 'em' as const, t: t.slice(1, -1) } : { k: 'txt' as const, t }
		)
	);
</script>

<svelte:element this={as} {id} class={cn('font-medium text-balance text-foreground', sizes[size], className)}>
	{#each parts as p, i (i)}
		{#if p.k === 'em'}<span class={cn(faces[face], accent && 'text-primary')}>{p.t}</span>{:else if p.k === 'obj'}{@render object?.()}{:else}{p.t}{/if}
	{/each}
</svelte:element>
