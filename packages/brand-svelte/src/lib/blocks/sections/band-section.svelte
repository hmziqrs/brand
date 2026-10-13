<!-- A full-width band that changes the page's color: solid orange, the other mode (inverse) or the
     quiet grey. Five layouts: a call to action, numbers, a quote, words beside the product, and
     the customers. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import Container from "$brand/blocks/site/container.svelte";
	import BandArcs from "$brand/components/band-arcs.svelte";
	import Person from "$brand/blocks/saas/person.svelte";
	import { pageMode } from "$brand/hooks/page-mode.svelte.js";
	import type { Snippet } from "svelte";

	let {
		tone = "orange",
		variant = "cta",
		title,
		body,
		actions,
		/** variant="stats": the numbers. */
		stats = [],
		/** variant="quote". */
		quote,
		/** variant="split": what sits beside the words, e.g. an AppWindow. */
		aside,
		/** variant="logos": the customers' names, with an icon each. */
		logos = [],
		class: className,
	}: {
		tone?: "orange" | "inverse" | "gray";
		variant?: "cta" | "stats" | "quote" | "split" | "logos";
		title?: string;
		body?: Snippet | string;
		actions?: Snippet;
		stats?: { value: string; label: string }[];
		quote?: { text: string; name: string; role: string };
		aside?: Snippet;
		logos?: { name: string; icon?: import("svelte").Component }[];
		class?: string;
	} = $props();

	const toneClass = $derived(tone === "orange" ? "band-orange" : tone === "gray" ? "band-gray" : pageMode() === "dark" ? "light" : "dark");
</script>

{#snippet text(t: Snippet | string | undefined)}{#if typeof t === "string"}{t}{:else if t}{@render t()}{/if}{/snippet}

<section data-slot="band-section" data-tone={tone} data-variant={variant} class={cn(toneClass, "relative isolate overflow-hidden", className)}>
	{#if variant === "cta"}
		{#if tone === "orange"}<BandArcs />{/if}
		<Container class="relative flex flex-col gap-7 py-16 md:flex-row md:items-end md:justify-between md:gap-12 md:py-24">
			<div class="flex max-w-xl flex-col gap-4">
				<h2 class="text-4xl leading-[1.02] font-medium tracking-[-0.04em] text-balance md:text-[3.25rem]">{title}</h2>
				{#if body}<p class="text-[1.0625rem] leading-relaxed text-muted-foreground">{@render text(body)}</p>{/if}
			</div>
			{#if actions}<div class="flex shrink-0 flex-wrap gap-3">{@render actions()}</div>{/if}
		</Container>
	{:else if variant === "stats"}
		<Container class="flex flex-col gap-10 py-16 md:py-20">
			{#if title}<h2 class="max-w-xl text-2xl font-medium tracking-tight text-balance md:text-3xl">{title}</h2>{/if}
			<dl class="grid gap-y-8 sm:grid-cols-2 lg:grid-flow-col lg:grid-cols-none">
				{#each stats as s, i (s.label)}
					<div class={cn("flex flex-col gap-2 sm:pr-8", i > 0 && "lg:border-l lg:pl-8")}>
						<dt class="order-2 text-sm leading-relaxed text-muted-foreground">{s.label}</dt>
						<dd class="order-1 text-5xl leading-none font-medium tracking-[-0.045em] tabular-nums md:text-6xl">{s.value}</dd>
					</div>
				{/each}
			</dl>
		</Container>
	{:else if variant === "quote" && quote}
		<Container class="flex flex-col gap-8 py-16 md:py-24">
			<blockquote class="max-w-4xl text-2xl leading-[1.35] font-medium tracking-[-0.02em] text-balance md:text-[2.1rem]">{quote.text}</blockquote>
			<Person name={quote.name} role={quote.role} size="lg" />
		</Container>
	{:else if variant === "split"}
		<Container size="wide" class="grid items-center gap-10 py-16 md:py-24 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
			<div class="flex max-w-md flex-col gap-4">
				<h2 class="text-3xl leading-[1.05] font-medium tracking-[-0.03em] text-balance md:text-4xl">{title}</h2>
				{#if body}<p class="leading-relaxed text-muted-foreground">{@render text(body)}</p>{/if}
				{#if actions}<div class="mt-2 flex flex-wrap gap-3">{@render actions()}</div>{/if}
			</div>
			{#if aside}<div class={cn("min-w-0 rounded-xl", tone === "orange" && pageMode())}>{@render aside()}</div>{/if}
		</Container>
	{:else if variant === "logos"}
		<Container class="flex flex-col items-center gap-8 py-12 text-center md:py-16">
			{#if title}<p class="text-sm text-muted-foreground">{title}</p>{/if}
			<ul class="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
				{#each logos as l (l.name)}<li class="flex items-center gap-2 text-lg font-medium tracking-tight">{#if l.icon}<l.icon class="lucide size-5" />{/if}{l.name}</li>{/each}
			</ul>
		</Container>
	{/if}
</section>
