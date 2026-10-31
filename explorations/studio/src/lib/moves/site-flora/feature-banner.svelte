<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import { Button } from '$brand/ui/button/index.js';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';

	let {
		eyebrow = 'New',
		title,
		body,
		cta = 'Try it',
		href = '#',
		presets = ['woven-linen', 'pebbled-leather', 'etched-silk'],
		labels = [],
		class: className
	}: {
		eyebrow?: string;
		title: string;
		body: string;
		cta?: string;
		href?: string;
		presets?: string[];
		labels?: string[];
		class?: string;
	} = $props();
</script>

<section class={cn('group grid gap-8 overflow-hidden rounded-3xl border border-border bg-card p-6 sm:p-10 lg:grid-cols-[1fr_1.15fr] lg:items-center', className)}>
	<div>
		<p class="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] text-primary uppercase"><span class="size-1.5 bg-primary"></span>{eyebrow}</p>
		<h2 class="mt-4 max-w-[18ch] text-[clamp(1.85rem,3.2vw,2.75rem)] leading-[1.05] font-medium tracking-[-0.035em] text-foreground">{title}</h2>
		<p class="mt-4 max-w-[44ch] text-lg leading-snug text-foreground">{body}</p>
		<Button {href} variant="outline" class="mt-7 h-11 rounded-full px-5">{cta}<ArrowRight class="lucide" /></Button>
	</div>
	<div class={cn('grid gap-3', presets.length > 1 ? 'grid-cols-3' : 'grid-cols-1')}>
		{#each presets as p, i (p + i)}
			<figure class={cn('transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] motion-reduce:transition-none', presets.length > 1 && i === 1 && 'translate-y-4 group-hover:-translate-y-2', presets.length > 1 && i !== 1 && 'group-hover:translate-y-2')}>
				<div class={cn('relative overflow-hidden rounded-xl border border-border', presets.length > 1 ? 'aspect-[3/4]' : 'aspect-[16/10]')}>
					<ShaderMaterial preset={p} rendering="image" loading="lazy" controls={false} sizes="(min-width: 1024px) 20vw, 33vw" class="absolute inset-0 h-full w-full" />
				</div>
				{#if labels[i]}<figcaption class="mt-2 font-mono text-[10px] tracking-wide text-muted-foreground uppercase">{labels[i]}</figcaption>{/if}
			</figure>
		{/each}
	</div>
</section>
