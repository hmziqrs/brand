<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$brand/utils.js';

	let {
		tone = 'page',
		frame = false,
		width = 'wide',
		id,
		class: className,
		inner,
		children
	}: {
		tone?: 'page' | 'band' | 'ink' | 'paper' | 'oxide';
		frame?: boolean;
		width?: 'wide' | 'full';
		id?: string;
		class?: string;
		inner?: string;
		children: Snippet;
	} = $props();
</script>

<section {id} data-tone={tone} class={cn('mode-band relative', tone === 'ink' && 'dark', tone === 'paper' && 'light', tone === 'band' && 'band-gray', className)}>
	<div class={cn(width === 'wide' && 'mx-auto w-full max-w-[1280px]', frame && width === 'wide' && 'border-border/70 min-[1300px]:border-x', inner)}>
		{@render children()}
	</div>
</section>

<style>
	.mode-band[data-tone='ink'] {
		--background: color-mix(in oklab, var(--band) 45%, black);
		--card: color-mix(in oklab, var(--band) 72%, black);
		--border: color-mix(in oklab, white 11%, transparent);
		background-color: var(--background);
	}
	.mode-band[data-tone='oxide'] {
		--ink: color-mix(in oklab, black 86%, var(--oxide-deep));
		--background: var(--oxide-vivid);
		--foreground: var(--ink);
		--card: var(--oxide-vivid);
		--card-foreground: var(--ink);
		--muted-foreground: color-mix(in oklab, var(--ink) 80%, var(--oxide-vivid));
		--primary: var(--ink);
		--primary-foreground: var(--oxide-vivid);
		--border: color-mix(in oklab, var(--ink) 22%, transparent);
		--line: color-mix(in oklab, var(--ink) 24%, transparent);
		--input: color-mix(in oklab, var(--ink) 40%, transparent);
		--ring: var(--ink);
		background-color: var(--background);
		color: var(--foreground);
	}
</style>
