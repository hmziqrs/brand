<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$brand/utils.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import RustGridField from '$moves/flora/rust-grid-field.svelte';

	let {
		preset = 'copper-sweep',
		eyebrow,
		title,
		lede,
		children,
		class: className
	}: {
		preset?: string;
		eyebrow?: string;
		title: string;
		lede?: string;
		children?: Snippet;
		class?: string;
	} = $props();
</script>

<section data-slot="material-hero" class={cn('relative isolate flex min-h-[72svh] flex-col justify-end overflow-hidden pt-32 pb-14 md:pb-20', className)}>
	<ShaderMaterial {preset} rendering="image" controls={false} loading="eager" fetchpriority="high" class="absolute inset-0 -z-20 h-full w-full" />
	<RustGridField mode="reveal" cell={56} veil={0.55} fade="none" gap={0} class="-z-10" />
	<div aria-hidden="true" class="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_top,var(--background)_8%,color-mix(in_oklab,var(--background)_70%,transparent)_45%,transparent_85%)]"></div>
	<div class="mx-auto w-full max-w-[1320px] px-4 sm:px-6">
		{#if eyebrow}
			<p class="inline-flex items-center gap-2 rounded-full bg-background px-3 py-1 font-mono text-xs tracking-[0.12em] text-foreground uppercase"><span class="size-2 bg-primary"></span>{eyebrow}</p>
		{/if}
		<h1 class="mt-6 max-w-[12ch] text-[clamp(3.25rem,8.6vw,8.25rem)] leading-[0.92] font-medium tracking-[-0.05em] text-balance text-foreground [text-shadow:0_2px_40px_var(--background)]">{title}</h1>
		{#if lede}<p class="mt-6 max-w-[40ch] text-xl leading-snug text-foreground md:text-2xl">{lede}</p>{/if}
		{@render children?.()}
	</div>
</section>
