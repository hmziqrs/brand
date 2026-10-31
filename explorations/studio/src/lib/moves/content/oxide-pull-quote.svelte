<script lang="ts">
	import type { Snippet } from 'svelte';
	import CornerRings from '$brand/components/corner-rings.svelte';
	import { cn } from '$brand/utils.js';

	let {
		seed = 'quote',
		sign,
		breakout = true,
		face = 'serif',
		class: className,
		children
	}: { seed?: string; sign?: string; breakout?: boolean; face?: 'serif' | 'sans'; class?: string; children: Snippet } = $props();
</script>

<figure
	data-move="oxide-pull-quote"
	class={cn(
		'band-orange relative isolate my-10 overflow-hidden rounded-2xl px-6 pt-8 pb-7 sm:px-10 sm:pt-12 sm:pb-10',
		breakout && 'lg:-mx-24',
		className
	)}
>
	<CornerRings {seed} quiet class="[&_circle]:[stroke-width:0.5] pointer-events-none absolute -top-px -right-px -z-10 w-[min(62%,22rem)] opacity-80" />
	{#if face === 'serif'}<span aria-hidden="true" class="block font-serif text-[5rem] leading-[0.5] text-foreground/70 italic sm:text-[7rem]">&ldquo;</span>{:else}<span aria-hidden="true" class="block size-3 bg-foreground sm:size-3.5"></span>{/if}
	<blockquote class={cn('max-w-[24ch] text-balance text-foreground', face === 'serif' ? 'mt-2 font-serif text-[clamp(2rem,4.6vw,3.5rem)] leading-[1.02] tracking-[-0.015em]' : 'mt-6 text-[clamp(1.75rem,3.8vw,3rem)] leading-[1.05] font-medium tracking-[-0.035em]')}>
		{@render children()}
	</blockquote>
	{#if sign}<figcaption class="mt-6 flex items-center gap-2.5 text-sm font-medium text-foreground"><i aria-hidden="true" class="inline-block size-2 bg-foreground"></i>{sign}</figcaption>{/if}
</figure>
