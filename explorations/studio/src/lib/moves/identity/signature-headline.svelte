<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$brand/utils.js';
	import Sq from './sq.svelte';

	let {
		as = 'h1',
		voice = 'grotesk',
		size = 'hero',
		square = 'oxide',
		children,
		class: className
	}: {
		as?: 'h1' | 'h2' | 'h3' | 'p';
		voice?: 'grotesk' | 'newsreader' | 'onest';
		size?: 'display' | 'hero' | 'section' | 'card';
		square?: 'oxide' | 'hatch' | 'hollow' | 'ink' | false;
		children: Snippet;
		class?: string;
	} = $props();
</script>

<svelte:element this={as} data-voice={voice} data-size={size} class={cn('sig text-foreground text-balance', className)}>
	{@render children()}{#if square}<Sq tone={square} size={voice === 'newsreader' ? 0.3 : 0.34} gap={0.08} />{/if}
</svelte:element>

<style>
	.sig {
		margin: 0;
	}
	.sig[data-size='display'] {
		font-size: clamp(3.4rem, 10.5vw, 10rem);
	}
	.sig[data-size='hero'] {
		font-size: clamp(3rem, 7.2vw, 7rem);
	}
	.sig[data-size='section'] {
		font-size: clamp(2.4rem, 5.2vw, 4.75rem);
	}
	.sig[data-size='card'] {
		font-size: clamp(1.9rem, 3vw, 2.6rem);
	}
	.sig[data-voice='grotesk'] {
		font-family: var(--font-bricolage);
		font-weight: 600;
		letter-spacing: -0.045em;
		line-height: 0.94;
		font-variation-settings: 'opsz' 96;
	}
	.sig[data-voice='grotesk'] :global(em) {
		font-family: var(--font-fraunces);
		font-style: italic;
		font-weight: 360;
		letter-spacing: -0.035em;
		font-variation-settings: 'opsz' 144, 'SOFT' 100, 'WONK' 1;
	}
	.sig[data-voice='newsreader'] {
		font-family: var(--font-newsreader);
		font-weight: 300;
		letter-spacing: -0.035em;
		line-height: 1;
	}
	.sig[data-voice='newsreader'] :global(em) {
		font-style: italic;
		font-weight: 300;
	}
	.sig[data-voice='onest'] {
		font-family: var(--font-sans);
		font-weight: 500;
		letter-spacing: -0.04em;
		line-height: 0.98;
	}
	.sig[data-voice='onest'] :global(em) {
		font-family: var(--font-serif);
		font-style: italic;
		font-weight: 400;
		letter-spacing: -0.02em;
	}
</style>
