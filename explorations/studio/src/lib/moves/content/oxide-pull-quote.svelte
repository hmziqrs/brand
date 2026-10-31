<script lang="ts">
	import type { Snippet } from 'svelte';
	import CornerRings from '$brand/components/corner-rings.svelte';
	import { cn } from '$brand/utils.js';

	let {
		seed = 'quote',
		sign,
		breakout = true,
		class: className,
		children
	}: { seed?: string; sign?: string; breakout?: boolean; class?: string; children: Snippet } = $props();
</script>

<figure
	data-move="oxide-pull-quote"
	class={cn(
		'band-orange relative isolate my-10 overflow-hidden rounded-2xl px-6 pt-8 pb-7 sm:px-10 sm:pt-12 sm:pb-10',
		breakout && 'lg:-mx-24',
		className
	)}
>
	<CornerRings {seed} quiet class="pointer-events-none absolute -top-px -right-px -z-10 w-[min(62%,22rem)] opacity-80" />
	<span aria-hidden="true" class="block font-serif text-[5rem] leading-[0.5] text-foreground/70 italic sm:text-[7rem]">&ldquo;</span>
	<blockquote class="mt-2 max-w-[24ch] font-serif text-[clamp(2rem,4.6vw,3.5rem)] leading-[1.02] tracking-[-0.015em] text-balance text-foreground">
		{@render children()}
	</blockquote>
	{#if sign}<figcaption class="mt-6 flex items-center gap-2.5 text-sm font-medium text-foreground"><i aria-hidden="true" class="inline-block size-2 bg-foreground"></i>{sign}</figcaption>{/if}
</figure>
