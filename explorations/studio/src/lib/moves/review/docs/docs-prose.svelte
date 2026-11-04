<script lang="ts">
	import type { Snippet } from 'svelte';
	import Prose from '$brand/blocks/site/prose.svelte';
	import { cn } from '$brand/utils.js';

	let { class: className, children }: { class?: string; children: Snippet } = $props();
</script>

<Prose class={cn('docs-prose text-[0.9375rem] [&_h2]:mt-9', className)}>{@render children()}</Prose>

<style>
	:global(.docs-prose :is(p, li, td, th, span, blockquote) > code),
	:global(.docs-prose :is(p, li, td, th, span, blockquote) > :is(a, strong, em) > code) {
		border-radius: calc(var(--radius) - 6px);
		background: var(--muted);
		padding: 0.125rem 0.375rem;
		font-family: var(--font-mono);
		font-size: 0.9em;
		color: var(--foreground);
	}
</style>
