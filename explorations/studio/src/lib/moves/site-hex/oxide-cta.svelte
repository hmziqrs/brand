<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import ShaderMaterial from '$brand/components/shader-material.svelte';

	let {
		title,
		body,
		primary = 'Request a demo',
		secondary,
		href = '#',
		altHref = '#',
		preset = 'oxide-bloom',
		class: className
	}: {
		title: string;
		body?: string;
		primary?: string;
		secondary?: string;
		href?: string;
		altHref?: string;
		preset?: string;
		class?: string;
	} = $props();
</script>

<section class={cn('mx-auto w-full max-w-[1320px] px-4 sm:px-8', className)}>
	<div class="relative isolate grid overflow-hidden bg-[var(--orange)] text-[var(--on-orange)] md:grid-cols-[1.4fr_1fr]">
		<div class="relative z-10 p-8 sm:p-14 lg:p-20">
			<h2 class="max-w-[16ch] text-5xl leading-[0.98] font-semibold tracking-[-0.035em] text-balance sm:text-6xl lg:text-[80px]">{title}</h2>
			{#if body}<p class="mt-6 max-w-[40ch] text-xl leading-snug">{body}</p>{/if}
			<div class="mt-10 flex flex-wrap gap-3">
				<a {href} class="inline-flex h-12 items-center gap-2 bg-[var(--on-orange)] px-6 text-base font-medium text-[var(--orange)] transition-opacity hover:opacity-85">{primary}<ArrowRight class="lucide size-4" /></a>
				{#if secondary}<a href={altHref} class="inline-flex h-12 items-center border border-[var(--on-orange)] px-6 text-base font-medium transition-colors hover:bg-[color-mix(in_oklab,var(--on-orange)_10%,transparent)]">{secondary}</a>{/if}
			</div>
		</div>
		<div class="relative min-h-[220px] border-t border-[var(--on-orange)] md:border-t-0 md:border-l">
			<ShaderMaterial {preset} rendering="image" controls={false} sizes="600px" class="absolute inset-0 h-full w-full" />
			<div class="absolute inset-0 [background-image:linear-gradient(var(--on-orange)_1px,transparent_1px),linear-gradient(90deg,var(--on-orange)_1px,transparent_1px)] [background-size:40px_40px] opacity-25"></div>
		</div>
	</div>
</section>
