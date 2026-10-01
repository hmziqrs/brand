<!--
  A legal page — a privacy policy, terms of use — built from its document
  (the lab's legal pages): the title, when it was last updated, the
  one-paragraph short version in the TL;DR box, then the sections
  themselves, numbered by LegalSection. The contents sit in a side column
  that follows you down (`side`, the default) or in a wrapped row above the
  text (`top`), and follow the page with core's scroll spy the way the
  lab's legal pages do.
-->
<script lang="ts">
	import Container from "$brand/blocks/site/container.svelte";
	import Kicker from "$brand/blocks/site/kicker.svelte";
	import Prose from "$brand/blocks/site/prose.svelte";
	import SummaryBox from "$brand/blocks/site/summary-box.svelte";
	import Toc from "$brand/components/toc.svelte";
	import { slug, scrollSpy } from "@hmziq/brand-core/scroll-spy";
	import type { LegalDoc } from "./types.js";
	import type { Snippet } from "svelte";

	let {
		doc,
		/** `side` (the default) or `top`: where the contents sit. */
		toc = "side",
		/** The box label. */
		short = "The short version",
		/** Added to each section's id, so legal sections never collide with anchored headings. */
		prefix = "l",
		class: className,
		children,
		/** The line under the sections, e.g. the GitHub history and the other document. */
		foot,
	}: { doc: LegalDoc; toc?: "side" | "top"; short?: string; prefix?: string; class?: string; children: Snippet; foot?: Snippet } = $props();

	const items = $derived(doc.sections.map(([title]) => ({ id: `${prefix}-${slug(title)}`, label: title })));
	let current = $state<string>();

	$effect(() => scrollSpy(items.map((i) => i.id), (id) => (current = id)));
</script>

<Container class={className}>
	{#if toc === "side"}
		<div class="grid gap-12 lg:grid-cols-[13rem_minmax(0,46rem)] lg:justify-center">
			<aside data-slot="legal-toc" class="sticky top-4 hidden self-start text-[0.8125rem] lg:block" aria-label="Contents">
				<h2 class="mb-2 text-xs font-medium text-muted-foreground">Contents</h2>
				<Toc items={items} {current} numbered />
			</aside>
			<article class="max-w-[46rem] min-w-0">
				<h1 class="text-[2.2rem] leading-[1.05] font-medium tracking-[-0.035em] sm:text-5xl">{doc.title}</h1>
				<Kicker class="mt-3">Last updated {doc.updated}</Kicker>
				<SummaryBox label={short} class="mt-6">
					{doc.short}
				</SummaryBox>
				<Prose class="mt-9 gap-3.5">
					{@render children()}
				</Prose>
				{#if foot}
					<p class="mt-12 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.8125rem] text-muted-foreground">
						{@render foot()}
					</p>
				{/if}
			</article>
		</div>
	{:else}
		<div class="flex flex-col items-center">
			<article class="max-w-[46rem] min-w-0">
				<h1 class="text-[2.2rem] leading-[1.05] font-medium tracking-[-0.035em] sm:text-5xl">{doc.title}</h1>
				<Kicker class="mt-3">Last updated {doc.updated}</Kicker>
				<SummaryBox label={short} class="mt-6">
					{doc.short}
				</SummaryBox>
				<nav data-slot="legal-toc" aria-label="Contents" class="mt-9 flex flex-wrap gap-x-5 gap-y-1.5 border-t pt-5 text-[0.8125rem]">
					{#each items as item, i (item.id)}
						<a href={`#${item.id}`} class="inline-flex items-baseline gap-1.5 text-muted-foreground no-underline outline-none transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50">
							<span class="text-xs font-medium tabular-nums text-primary">{String(i + 1).padStart(2, "0")}</span>
							{item.label}
						</a>
					{/each}
				</nav>
				<Prose class="mt-9 gap-3.5">
					{@render children()}
				</Prose>
				{#if foot}
					<p class="mt-12 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.8125rem] text-muted-foreground">
						{@render foot()}
					</p>
				{/if}
			</article>
		</div>
	{/if}
</Container>
