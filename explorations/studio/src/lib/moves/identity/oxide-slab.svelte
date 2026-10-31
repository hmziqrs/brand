<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$brand/utils.js';
	import HatchField from './hatch-field.svelte';

	let {
		eyebrow,
		children,
		aside,
		mark = true,
		class: className
	}: { eyebrow?: string; children: Snippet; aside?: Snippet; mark?: boolean; class?: string } = $props();
</script>

<section class={cn('slab band-orange relative overflow-hidden [--sq-color:var(--on-orange)]', className)}>
	<HatchField from="bottom-right" tone="ink" strength={0.22} spacing={6} />
	{#if mark}
		<div aria-hidden="true" class="absolute -top-[6vw] -right-[6vw] size-[28vw] max-w-[26rem] max-h-[26rem] bg-[var(--on-orange)] opacity-[0.08]"></div>
	{/if}
	<div class="relative mx-auto grid w-full max-w-[1320px] items-center gap-12 px-4 py-20 sm:px-8 md:grid-cols-[1.15fr_1fr] md:py-28">
		<div class="flex min-w-0 flex-col gap-6">
			{#if eyebrow}<span class="font-mono text-xs tracking-[0.18em] uppercase">{eyebrow}</span>{/if}
			{@render children()}
		</div>
		{#if aside}<div class="relative">{@render aside()}</div>{/if}
	</div>
</section>
