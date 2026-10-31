<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$brand/utils.js';
	import type { Hue } from './family';

	let {
		hue = 'orange',
		class: className,
		children,
		...rest
	}: { hue?: Hue; class?: string; children: Snippet } & Record<string, unknown> = $props();
</script>

<div data-product-scope={hue} class={cn('product-scope bg-background text-foreground', className)} style:--pa={`var(--${hue})`} {...rest}>
	{@render children()}
</div>

<style>
	.product-scope {
		--pa-fill: var(--pa);
		--pa-ink: var(--pa);
		--on-pa: var(--background);
		--primary: var(--pa-fill);
		--primary-foreground: var(--on-pa);
		--ring: var(--pa);
		--chart-1: var(--pa);
		--sidebar-primary: var(--pa-fill);
		--sidebar-primary-foreground: var(--on-pa);
		--sidebar-ring: var(--pa);
		--code-token-keyword: var(--pa-ink);
		--pa-soft: color-mix(in oklab, var(--pa) 14%, var(--background));
		--pa-line: color-mix(in oklab, var(--pa) 38%, transparent);
		overflow-x: clip;
	}
	:global(:root[data-oxide='b']:not(.dark)) .product-scope,
	:global(:root[data-oxide='c']:not(.dark)) .product-scope {
		--pa-fill: oklch(from var(--pa) 0.76 calc(c * 1.12) h);
		--pa-ink: oklch(from var(--pa) 0.52 c h);
		--on-pa: var(--foreground);
	}
	:global(:root:not(.dark)) .product-scope :global(.text-primary) {
		color: var(--pa-ink);
	}
</style>
