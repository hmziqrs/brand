<script lang="ts">
	import { cn } from "$brand/utils.js";
	import Container from "$brand/blocks/site/container.svelte";
	import Eyebrow from "$brand/components/eyebrow.svelte";
	import type { Snippet } from "svelte";

	type Layer = { label: string; detail: string; /** A share from 0 to 1 that sets the band's width. */ share: number };

	let {
		caption,
		title,
		lede,
		layers = [],
		/** The layer you own, drawn in the brand's orange. */
		yours = 0,
		actions,
		class: className,
	}: {
		caption: string;
		title: string;
		lede?: string;
		layers?: Layer[];
		yours?: number;
		actions?: Snippet;
		class?: string;
	} = $props();
</script>

<section data-slot="stack-section" class={cn("relative isolate", className)}>
	<Container size="wide" class="flex flex-col gap-12 py-16 md:py-24">
		<div class="flex max-w-2xl flex-col gap-4">
			<Eyebrow variant="count" index={layers.length} total={layers.length}>{caption}</Eyebrow>
			<h2 class="text-3xl leading-[1.05] font-medium tracking-[-0.03em] text-balance md:text-[2.6rem]">{title}</h2>
			{#if lede}<p class="text-[1.0625rem] leading-relaxed text-muted-foreground">{lede}</p>{/if}
			{#if actions}<div class="mt-1 flex flex-wrap gap-3">{@render actions()}</div>{/if}
		</div>

		<ol class="mx-auto flex w-full flex-col items-center gap-2">
			{#each layers as layer, i (layer.label)}
				<li
					data-mine={i === yours ? "" : undefined}
					class={cn(
						"flex items-center justify-between gap-6 rounded-xl border px-5 py-3.5",
						i === yours ? "border-primary/60" : "border-border",
					)}
					style={`width: ${Math.round(45 + 55 * layer.share)}%;`}
				>
					<span class="flex min-w-0 flex-col">
						<span class={cn("font-medium", i === yours && "text-primary")}>{layer.label}</span>
						<span class="truncate text-sm text-muted-foreground">{layer.detail}</span>
					</span>
					<span class="shrink-0 text-sm text-muted-foreground tabular-nums">{String(i + 1).padStart(2, "0")}</span>
				</li>
			{/each}
		</ol>
	</Container>
</section>
