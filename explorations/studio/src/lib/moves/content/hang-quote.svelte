<script lang="ts">
	import type { Snippet } from 'svelte';
	import OxideClipWord from './oxide-clip-word.svelte';
	import { cn } from '$brand/utils.js';

	let {
		preset = 'hammered-copper',
		class: className,
		children
	}: { preset?: string; class?: string; children: Snippet } = $props();
</script>

<figure data-move="hang-quote" class={cn('relative my-14 border-y py-9 sm:my-16 sm:py-12 lg:-mr-40 xl:-mr-56', className)}>
	<span aria-hidden="true" class="pointer-events-none absolute top-6 -left-1 font-serif text-[8rem] leading-none select-none sm:top-8 lg:-left-28 lg:text-[11rem]">
		<OxideClipWord text="&ldquo;" {preset} drift={false} />
	</span>
	<blockquote class="relative pl-14 font-newsreader text-[clamp(1.85rem,4.2vw,3.25rem)] leading-[1.08] font-[350] tracking-[-0.025em] text-balance text-foreground italic sm:pl-20 lg:pl-0">
		{@render children()}
	</blockquote>
</figure>
