<script lang="ts">
	import type { Snippet } from 'svelte';
	import { shaderPosters } from '@hmziq/brand-core/shaders/posters';
	import { cn } from '$brand/utils.js';

	let {
		preset = 'oxide-bloom',
		tint = true,
		class: className,
		children
	}: { preset?: string; tint?: boolean; class?: string; children: Snippet } = $props();

	const poster = $derived(shaderPosters[preset] ?? shaderPosters['oxide-bloom']);
</script>

<span class={cn('material-word', tint && 'tinted', className)} style:--mw-img={`url(${poster.src})`}>{@render children()}</span>

<style>
	.material-word {
		background-image: var(--mw-img);
		background-size: cover;
		background-position: center;
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		color: var(--pa, var(--primary));
		padding-inline: 0.04em;
		margin-inline: -0.04em;
	}
	.tinted {
		background-image: var(--mw-img), linear-gradient(var(--pa-ink, var(--primary)), var(--pa-ink, var(--primary)));
		background-blend-mode: multiply;
	}
	:global(.dark) .tinted {
		background-image: var(--mw-img), linear-gradient(var(--pa, var(--primary)), var(--pa, var(--primary)));
		background-blend-mode: screen;
	}
</style>
