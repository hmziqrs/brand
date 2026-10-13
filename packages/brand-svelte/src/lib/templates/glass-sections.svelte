<script lang="ts">
	import ArrowRight from "@lucide/svelte/icons/arrow-right";
	import Container from "$brand/blocks/site/container.svelte";
	import ButtonLink from "$brand/blocks/site/button-link.svelte";
	import HeroTitle from "$brand/blocks/site/hero-title.svelte";
	import HeroLede from "$brand/blocks/site/hero-lede.svelte";
	import Glass from "$brand/components/glass.svelte";
	import Mark from "$brand/components/mark.svelte";
	import Rings from "$brand/components/rings.svelte";
	import ShaderMaterial from "$brand/components/shader-material.svelte";
	import Wordmark from "$brand/components/wordmark.svelte";

	let { variant = "rings" }: { variant?: "rings" | "shader" | "header" | "band" } = $props();

	const projects = [
		{ symbol: "Gq", name: "gpui-query", note: "Data loading for GPUI", kind: "Library" },
		{ symbol: "Gs", name: "gpui-starter", note: "Desktop app starter", kind: "Template" },
		{ symbol: "Tn", name: "tunnel", note: "A public link for anything on your computer", kind: "Command-line tool" },
		{ symbol: "Ow", name: "oxiwake", note: "Keeps your computer awake, and says when it can't", kind: "Command-line tool" },
	];
</script>

{#if variant === "rings"}
	<section data-glass-section={variant} class="overflow-hidden py-16 md:py-24">
		<Container class="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
			<div class="flex max-w-xl flex-col gap-6">
				<HeroTitle>Free Rust tools, finished before they ship.</HeroTitle>
				<HeroLede>Open-source software made by one person. I build the tools I wish existed, test them properly, and give them away.</HeroLede>
				<div><ButtonLink href="#" size="lg">Browse the projects<ArrowRight class="lucide" data-icon="inline-end" /></ButtonLink></div>
			</div>
			<div class="relative isolate">
				<Rings seed="freeoxide" class="absolute top-1/2 -right-16 -z-10 hidden w-[36rem] max-w-none -translate-y-1/2 md:block" />
				<Glass class="p-2 md:mr-24">
					<ul class="flex flex-col">
						{#each projects as p (p.name)}
							<li class="flex items-center gap-4 rounded-lg px-4 py-3">
								<Mark symbol={p.symbol} size={28} />
								<div class="flex min-w-0 flex-1 flex-col">
									<span class="font-medium">{p.name}</span>
									<span class="truncate text-sm text-muted-foreground">{p.note}</span>
								</div>
								<span class="hidden shrink-0 text-xs text-muted-foreground sm:inline">{p.kind}</span>
							</li>
						{/each}
					</ul>
				</Glass>
			</div>
		</Container>
	</section>
{:else if variant === "shader"}
	<section data-glass-section={variant} class="relative isolate overflow-hidden">
		<ShaderMaterial rendering="image" preset="etched-silk" controls={false} class="absolute inset-0 -z-10" />
		<Container class="grid gap-10 py-20 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:py-28">
			<Glass variant="smoke" grain class="flex flex-col gap-6 p-7 sm:p-10">
				<div class="flex flex-col gap-3">
					<h2 class="text-3xl font-medium tracking-tight text-balance sm:text-4xl">Materials, made from code.</h2>
					<p class="leading-relaxed text-muted-foreground">Start from oxide, metal, paper or glass. Tune the color and the light, then use it as a still image or let it move.</p>
				</div>
				<dl class="grid grid-cols-2 gap-6 border-t pt-6">
					<div><dt class="text-sm text-muted-foreground">Starting looks</dt><dd class="mt-1 text-3xl font-medium tabular-nums">44</dd></div>
					<div><dt class="text-sm text-muted-foreground">Ways to draw them</dt><dd class="mt-1 text-3xl font-medium tabular-nums">30</dd></div>
				</dl>
				<div><ButtonLink href="#" variant="outline">Open the studio<ArrowRight class="lucide" data-icon="inline-end" /></ButtonLink></div>
			</Glass>
			<p class="self-end justify-self-end"><Glass variant="clear" as="span" class="inline-block rounded-full px-3 py-1.5 text-xs">Etched silk</Glass></p>
		</Container>
	</section>
{:else if variant === "header"}
	<section data-glass-section={variant} class="relative isolate h-[34rem] overflow-hidden">
		<ShaderMaterial rendering="image" preset="copper-sweep" controls={false} class="absolute inset-0 -z-10" />
		<div class="flex h-full flex-col p-4 sm:p-6">
			<Glass as="nav" aria-label="Main" class="mx-auto flex w-full max-w-3xl items-center gap-2 rounded-full py-2 pr-2 pl-5">
				<Wordmark name="freeoxide" class="text-base" />
				<div class="ml-auto hidden items-center gap-1 sm:flex">
					{#each ["Projects", "How I work", "About"] as item (item)}<ButtonLink href="#" variant="ghost" size="sm" class="rounded-full text-muted-foreground">{item}</ButtonLink>{/each}
				</div>
				<ButtonLink href="#" size="sm" class="ml-auto rounded-full sm:ml-0">Browse</ButtonLink>
			</Glass>
			<div class="mt-auto">
				<Glass variant="smoke" class="mx-auto max-w-3xl p-6 sm:p-8">
					<p class="text-sm leading-relaxed text-muted-foreground">A floating header in glass: the page shows through it as it scrolls past, and it never covers more than its own height.</p>
				</Glass>
			</div>
		</div>
	</section>
{:else}
	<section data-glass-section={variant} class="relative isolate overflow-hidden py-16 md:py-24">
		<ShaderMaterial rendering="image" preset="hammered-copper" controls={false} class="absolute inset-0 -z-10" />
		<Container>
			<Glass variant="smoke" grain class="flex flex-col gap-7 p-8 md:flex-row md:items-end md:justify-between md:gap-12 md:p-12">
				<div class="flex max-w-xl flex-col gap-4">
					<h2 class="text-4xl leading-[1.02] font-medium tracking-[-0.04em] text-balance md:text-[3.25rem]">One person. All of it.</h2>
					<p class="text-[1.0625rem] leading-relaxed text-muted-foreground">I write Rust, ship the tools and open-source the results. Everything under freeoxide is built, tested and reviewed by me.</p>
				</div>
				<div class="flex shrink-0 flex-wrap gap-3"><ButtonLink href="#" size="lg">Read the full story</ButtonLink></div>
			</Glass>
		</Container>
	</section>
{/if}
