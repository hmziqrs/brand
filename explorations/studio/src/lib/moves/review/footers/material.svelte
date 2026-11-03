<script lang="ts">
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import { cn } from '$brand/utils.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import Wordmark from '$brand/components/wordmark.svelte';
	import Container from '$brand/blocks/site/container.svelte';
	import { Button } from '$brand/ui/button/index.js';
	import DitherWordmark from '$moves/flora/dither-wordmark.svelte';
	import LinkColumns from './link-columns.svelte';
	import FamilyRow from './family-row.svelte';
	import type { FooterSite } from './sites';

	let { site, here, preset = 'folded-foil', class: className }: { site: FooterSite; here: string; preset?: string; class?: string } = $props();
</script>

<footer data-slot="footer-material" class={cn('dark relative isolate overflow-hidden bg-background text-foreground', className)}>
	<div aria-hidden="true" class="absolute inset-0 -z-10">
		<div class="absolute -inset-10 [filter:blur(10px)_brightness(0.7)_saturate(1.2)]">
			<ShaderMaterial {preset} rendering="image" controls={false} sizes="100vw" opacity={0.85} class="absolute inset-0 h-full w-full" />
		</div>
		<div class="absolute inset-0 bg-[linear-gradient(to_bottom,var(--background)_0%,color-mix(in_oklab,var(--background)_76%,transparent)_34%,color-mix(in_oklab,var(--background)_38%,transparent)_72%,color-mix(in_oklab,var(--background)_22%,transparent))]"></div>
	</div>

	<Container size="wide" class="pt-16 sm:pt-20">
		{#if site.cta}
			<div class="flex flex-wrap items-end justify-between gap-x-10 gap-y-6 border-b border-border pb-12">
				<h2 class="max-w-[16ch] text-[clamp(2.25rem,5vw,4rem)] leading-[1] font-medium tracking-[-0.035em] text-balance">{site.cta.title}</h2>
				<div class="flex flex-wrap gap-3">
					<Button href={here} size="lg">{site.cta.primary}<ArrowRight class="lucide" data-icon="inline-end" /></Button>
					<Button href={here} size="lg" variant="outline">{site.cta.secondary}</Button>
				</div>
			</div>
		{/if}
		<div class="grid gap-12 pt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)]">
			<div class="flex flex-col gap-5">
				<a href={here} class="inline-flex items-baseline gap-2 self-start rounded-sm text-2xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
					<Wordmark name={site.name} />
					{#if site.maker}<span class="text-base text-foreground/80">{site.maker}</span>{/if}
				</a>
				<p class="max-w-[34ch] text-lg leading-snug">{site.tagline}</p>
				{#if site.status}
					<p class="inline-flex items-center gap-2 self-start font-mono text-[11px] tracking-[0.08em] uppercase"><i class="size-1.5 shrink-0 rounded-full bg-green"></i>{site.status}</p>
				{/if}
			</div>
			<LinkColumns columns={site.columns} {here} class="sm:grid-cols-4" linkClass="[text-shadow:0_1px_12px_var(--background)]" />
		</div>
		<FamilyRow site={site.id} class="mt-14 border-t border-border pt-8" />
	</Container>

	<Container size="wide" class="mt-14">
		<DitherWordmark name={site.name} block={6} animate />
	</Container>

	<Container size="wide" class="flex flex-wrap items-center justify-between gap-3 pt-4 pb-8 text-[13px]">
		<span>{site.legal}</span>
		<span class="font-mono text-[11px] tracking-[0.08em] uppercase">{site.aside}</span>
	</Container>
</footer>
