<!--
  A changelog page as a desk, on the wide Container: the kit's ProductHero
  on the site's material with the latest release beside the words in a
  DragWindow (the `window` snippet: what the release made, linked to its
  changes through the spot), then every release with its head sticky in a
  column beside its title and changes. Big numbers, ReleaseFilters and
  folding the older releases come with `numbers`, `filters` and `open`.
-->
<script lang="ts">
	import type { Snippet } from "svelte";
	import ArrowUpRight from "@lucide/svelte/icons/arrow-up-right";
	import { dateLabel, dateTime, narrowReleases } from "@hmziq/brand-core/changelog";
	import { cn } from "$brand/utils.js";
	import ProductHero from "$brand/blocks/sections/product-hero.svelte";
	import MaterialWash from "$brand/components/material-wash.svelte";
	import DragWindow from "$brand/components/drag-window.svelte";
	import Container from "$brand/blocks/site/container.svelte";
	import BigNumbers from "$brand/blocks/site/big-numbers.svelte";
	import ButtonLink from "$brand/blocks/site/button-link.svelte";
	import ReleaseHead from "./release-head.svelte";
	import ReleaseNotes from "./release-notes.svelte";
	import ReleaseFilters from "./release-filters.svelte";
	import type { ChangeSpots, Release, ReleaseLink, SpotState } from "./types.js";

	let {
		releases,
		title,
		accent,
		lede,
		preset = "copper-sweep",
		windowTitle,
		window: win,
		numbers,
		filters = false,
		open = 4,
		spots,
		links,
		search,
		class: className,
	}: {
		/** Every release, newest first. */
		releases: Release[];
		title: string;
		/** The part of the title in oxide. */
		accent?: string;
		lede: string;
		/** The site's material behind the hero. */
		preset?: string;
		/** The window's title: the address or file it shows. */
		windowTitle: string;
		/** What the latest release made, in the window; the spot links it to the release's changes. */
		window: Snippet<[spot: SpotState]>;
		/** Big numbers over the list: `[value, label]`. */
		numbers?: [string, string][];
		/** Search and kind chips over the list. */
		filters?: boolean;
		/** How many releases stay open; the rest fold to their first change. */
		open?: number;
		/** The parts of the window the latest release's changes name. */
		spots?: ChangeSpots;
		/** The closing buttons. */
		links?: ReleaseLink[];
		/** The search box's label. */
		search?: string;
		class?: string;
	} = $props();

	let kind = $state("All");
	let query = $state("");
	let spot = $state<string | null>(null);
	let opened = $state<Record<string, boolean>>({});
	const box: SpotState = {
		get current() {
			return spot;
		},
		set current(v) {
			spot = v;
		},
	};

	const latest = $derived(releases[0]);
	const list = $derived(filters ? narrowReleases(releases, kind, query) : releases);
	const searching = $derived(query.trim().length > 0);
	const linked = $derived<ChangeSpots>(latest && spots?.[latest.v] ? { [latest.v]: spots[latest.v] } : {});
	const full = (v: string) => releases.find((r) => r.v === v);
	const folds = $derived(searching ? [] : list.slice(open));
	const allOpen = $derived(folds.length > 0 && folds.every((r) => opened[r.v]));
</script>

<div data-slot="release-desk" class={cn("pb-24 md:pb-32", className)}>
	<ProductHero {title} {accent} {lede}>
		{#snippet eyebrow()}{#if latest}<p class="text-[0.8125rem] text-muted-foreground">Latest <span class="font-mono font-semibold text-foreground">v{latest.v}</span> · <time datetime={dateTime(latest.date)}>{dateLabel(latest.date)}</time></p>{/if}{/snippet}
		{#snippet stage()}<MaterialWash {preset} />{/snippet}
		{#snippet visual()}
			<DragWindow title={windowTitle} bounds="[data-slot=product-hero]" class="lg:ml-auto lg:max-w-[40rem]">
				{@render win(box)}
			</DragWindow>
		{/snippet}
	</ProductHero>

	<Container size="wide" class="mt-14 md:mt-20">
		{#if numbers}<BigNumbers items={numbers} class="mb-16 md:mb-20" />{/if}
		{#if filters}
			<ReleaseFilters {releases} bind:kind bind:query {search} folds={folds.length} open={allOpen} onOpen={(v) => folds.forEach((r) => (opened[r.v] = v))} />
		{/if}

		<ol class={cn(filters ? "mt-8" : "mt-0")}>
			{#each list as r, i (r.v)}
				{@const top = r.v === latest?.v}
				{@const folded = !searching && i >= open}
				<li class={cn("grid gap-x-12 gap-y-4 border-t border-border md:grid-cols-[13rem_minmax(0,1fr)] lg:grid-cols-[15rem_minmax(0,1fr)]", folded && !opened[r.v] ? "pt-6 pb-8" : "pt-8 pb-12 md:pb-16")}>
					<div class="md:sticky md:top-24 md:self-start">
						{#if top}<p class="mb-2 text-[0.8125rem] font-medium text-primary">Latest release</p>{/if}
						<ReleaseHead release={r} level={top ? 2 : 3} longDate class="md:flex-col md:items-start md:gap-2" />
					</div>
					<div class="min-w-0">
						{#if r.title}<p class="text-[1.375rem] leading-snug font-medium tracking-[-0.02em] text-balance text-foreground md:text-[1.625rem]">{r.title}</p>{/if}
						<ReleaseNotes release={r} variant={folded ? "summary" : "grouped"} full={full(r.v)} spots={linked} bind:spot bind:open={opened[r.v]} class={r.title ? undefined : "mt-0"} />
					</div>
				</li>
			{/each}
		</ol>
		{#if !list.length}
			<p class="border-t border-border pt-8 text-lg text-foreground">No change matches “{query}”{kind !== "All" ? ` in ${kind}` : ""}.</p>
		{/if}

		{#if links?.length}
			<div class="flex flex-wrap gap-3 border-t border-border pt-10">
				{#each links as l, i (l.href + l.label)}
					<ButtonLink href={l.href} size="lg" variant={i ? "outline" : "default"} target={l.external ? "_blank" : undefined} rel={l.external ? "noopener" : undefined}>{l.label}{#if l.external}<ArrowUpRight class="lucide" />{/if}</ButtonLink>
				{/each}
			</div>
		{/if}
	</Container>
</div>
