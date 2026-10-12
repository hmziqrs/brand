<script lang="ts">
	import ArrowUpRight from "@lucide/svelte/icons/arrow-up-right";
	import ArrowRight from "@lucide/svelte/icons/arrow-right";
	import Container from "$brand/blocks/site/container.svelte";
	import Section from "$brand/blocks/site/section.svelte";
	import ButtonLink from "$brand/blocks/site/button-link.svelte";
	import ShaderMaterial from "$brand/components/shader-material.svelte";
	import { cn } from "$brand/utils.js";

	let {
		variant = "accent", animated = false, rendering = "image", actionHref = "#shader-implementation",
	}: {
		variant?: "accent" | "oxide" | "open" | "wash" | "split" | "glass";
		animated?: boolean;
		rendering?: "image" | "live";
		actionHref?: string;
	} = $props();

	const moving = $derived(animated && rendering === "live");
	const source = "https://github.com/hmziqrs/brand";
</script>

{#if variant === "accent"}
	<section data-shader-section={variant} class="band-orange relative isolate overflow-hidden">
		<ShaderMaterial preset="brushed-alloy" {rendering} {animated} opacity={.075} transparent blend="multiply" controls={animated} class="absolute inset-0" />
		<Container class={cn("pointer-events-none relative flex flex-col gap-7 py-16 md:flex-row md:items-end md:justify-between md:gap-12 md:py-24", moving && "pb-24")}>
			<div class="pointer-events-auto flex max-w-xl flex-col gap-4">
				<h2 class="text-4xl leading-[1.02] font-medium tracking-[-0.04em] text-balance md:text-[3.25rem]">A starting point for your next site.</h2>
				<p class="max-w-lg text-[1.0625rem] leading-relaxed text-muted-foreground">Use the Svelte or Astro kit. Keep the colors, type, and components together as your pages grow.</p>
			</div>
			<div class="pointer-events-auto flex shrink-0 flex-wrap gap-3">
				<ButtonLink href={source} size="lg">Get the kit<ArrowUpRight class="lucide" data-icon="inline-end" /></ButtonLink>
			</div>
		</Container>
	</section>
{:else if variant === "oxide"}
	<section data-shader-section={variant} class="relative isolate overflow-hidden">
		<ShaderMaterial preset="oxide-bloom" {rendering} {animated} controls={animated} class="absolute inset-0" />
		<Container class={cn("pointer-events-none relative py-16 md:py-24", moving && "pb-24")}>
			<div class="pointer-events-auto flex max-w-xl flex-col gap-6 border bg-background p-6 text-foreground sm:p-10">
				<div class="flex flex-col gap-4">
					<h2 class="text-3xl font-medium tracking-tight text-balance sm:text-4xl">Materials, made from code.</h2>
					<p class="leading-relaxed text-muted-foreground">Start with oxide, metal, paper, or glass. Change the palette and lighting, then export the surface for your page.</p>
				</div>
				<dl class="grid grid-cols-2 gap-6 border-t pt-6">
					<div><dt class="text-sm text-muted-foreground">Starting looks</dt><dd class="mt-1 text-3xl font-medium tabular-nums">44</dd></div>
					<div><dt class="text-sm text-muted-foreground">Algorithms</dt><dd class="mt-1 text-3xl font-medium tabular-nums">30</dd></div>
				</dl>
				<div><ButtonLink href={actionHref} variant="outline">View implementation<ArrowRight class="lucide" data-icon="inline-end" /></ButtonLink></div>
			</div>
		</Container>
	</section>
{:else if variant === "open"}
	<section data-shader-section={variant} class="py-16 md:py-24">
		<Container class="grid items-center gap-10 md:grid-cols-[minmax(0,.85fr)_minmax(0,1.15fr)] md:gap-12">
			<div class="flex min-w-0 flex-col gap-6">
				<div class="flex flex-col gap-4">
					<h2 class="text-3xl font-medium tracking-tight text-balance sm:text-4xl">One theme, across your site.</h2>
					<p class="leading-relaxed text-muted-foreground">Use the same colors, typography, and components on a landing page, a documentation page, or your application.</p>
				</div>
				<div class="flex flex-col gap-4 border-t pt-6">
					<div><h3 class="text-sm font-medium">Theme tokens stay together.</h3><p class="mt-1 text-sm leading-relaxed text-muted-foreground">Colors and typography come from one shared stylesheet. Light and dark modes use the same component structure.</p></div>
					<div><h3 class="text-sm font-medium">Components stay in your project.</h3><p class="mt-1 text-sm leading-relaxed text-muted-foreground">The registry copies the Svelte or Astro source into your site, where you can edit it.</p></div>
				</div>
				<div><ButtonLink href={source + "/tree/master/packages/brand-svelte"} variant="outline">View components<ArrowUpRight class="lucide" data-icon="inline-end" /></ButtonLink></div>
			</div>
			<figure class="flex min-w-0 flex-col gap-3">
				<ShaderMaterial preset="hammered-copper" sizes="(min-width: 768px) 50vw, 100vw" {rendering} {animated} controls={animated} class="aspect-[4/5] w-full overflow-hidden rounded-xl sm:aspect-[5/4] md:aspect-[4/5]" />
				<figcaption class="flex flex-wrap justify-between gap-2 text-xs text-muted-foreground"><span>Hammered copper</span><span>A material study beside page content</span></figcaption>
			</figure>
		</Container>
	</section>
{:else if variant === "wash"}
	<section data-shader-section={variant} class="relative isolate overflow-hidden py-16 [&_.text-muted-foreground]:text-foreground/80 md:py-24">
		<ShaderMaterial preset="fibrous-paper" {rendering} {animated} opacity={.055} transparent controls={animated} class="absolute inset-0" />
		<div class={cn("pointer-events-none relative", moving && "pb-12")}>
			<Section>
				{#snippet title()}A close look at paper.{/snippet}
				{#snippet intro()}The fibrous-paper recipe combines short strokes, longer fibers, and uneven pulp to build a paper surface.{/snippet}
				<div class="pointer-events-auto grid gap-8 border-t pt-8 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-12">
					<div class="flex items-start gap-4 text-sm text-muted-foreground"><span>Surface notes<br />Fibrous paper</span></div>
					<div class="flex min-w-0 flex-col gap-6">
						<h3 class="max-w-xl text-xl font-medium tracking-tight">The fibers carry the texture.</h3>
						<p class="max-w-xl leading-relaxed text-muted-foreground">The shader mixes fibers at different scales, then applies lighting and grain to the surface. Change the seed for a different arrangement, or export a still image with the same recipe.</p>
						<a href={actionHref} class="flex w-fit items-center gap-2 text-sm font-medium underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">View implementation<ArrowUpRight class="lucide size-4" /></a>
					</div>
				</div>
			</Section>
		</div>
	</section>
{:else if variant === "split"}
	<section data-shader-section={variant} class="relative isolate overflow-hidden border-y">
		<ShaderMaterial preset="folded-foil" {rendering} {animated} controls={animated} class="absolute inset-0" />
		<Container class={cn("pointer-events-none relative grid gap-0 px-0 md:grid-cols-2 md:px-6", moving && "mb-16")}>
			<div class="flex min-h-64 items-end p-6 md:min-h-0 md:py-24">
				<span class="pointer-events-auto border bg-background px-3 py-2 text-xs text-foreground">Folded foil / material study</span>
			</div>
			<div class={cn("pointer-events-auto flex min-w-0 flex-col gap-7 bg-background px-6 py-16 md:py-24 md:pl-12", moving && "pb-24")}>
				<div class="flex flex-col gap-4">
					<h2 class="text-3xl font-medium tracking-tight text-balance sm:text-4xl">The kit follows your framework.</h2>
					<p class="leading-relaxed text-muted-foreground">Choose Svelte for an interactive application or Astro for a content site. Both kits share the brand tokens and visual components.</p>
				</div>
				<div class="flex flex-col gap-4 border-t pt-6">
					<div><h3 class="text-sm font-medium">Svelte 5 components.</h3><p class="mt-1 text-sm leading-relaxed text-muted-foreground">Runes, snippets, and callback props keep each component ready for SvelteKit and Storybook.</p></div>
					<div><h3 class="text-sm font-medium">Astro pages and blocks.</h3><p class="mt-1 text-sm leading-relaxed text-muted-foreground">Compose content pages, landing sections, and layouts with the same colors and type.</p></div>
				</div>
				<div><ButtonLink href={source + "/tree/master/packages"} variant="outline">View both kits<ArrowRight class="lucide" data-icon="inline-end" /></ButtonLink></div>
			</div>
		</Container>
	</section>
{:else}
	<section data-shader-section={variant} class="relative isolate overflow-hidden">
		<ShaderMaterial preset="copper-sweep" {rendering} {animated} controls={animated} class="absolute inset-0" />
		<Container class={cn("pointer-events-none relative flex justify-end py-16 md:py-24", moving && "pb-24")}>
			<div class="shader-glass pointer-events-auto flex w-full max-w-xl flex-col gap-6 rounded-xl border bg-background/90 p-6 text-foreground backdrop-blur-xl sm:p-10">
				<div class="flex flex-col gap-4">
					<h2 class="text-3xl font-medium tracking-tight text-balance sm:text-4xl">A shader pack you can edit.</h2>
					<p class="leading-relaxed text-foreground/85">Browse the recipes, tune a surface in the studio, and export the result as an image or a WGSL shader with its settings.</p>
				</div>
				<div class="flex flex-col gap-4 border-t pt-6">
					<h3 class="text-sm font-medium">Keep the recipe with the image.</h3>
					<p class="text-sm leading-relaxed text-foreground/85">The JSON export preserves both layers, the palette, lighting, and finish. Load it again to continue editing the same material.</p>
				</div>
				<div><ButtonLink href={actionHref}>View implementation<ArrowUpRight class="lucide" data-icon="inline-end" /></ButtonLink></div>
			</div>
		</Container>
	</section>
{/if}

<style>
	@media (prefers-reduced-transparency: reduce) {
		.shader-glass {
			background-color: var(--background);
			backdrop-filter: none;
		}
	}
</style>
