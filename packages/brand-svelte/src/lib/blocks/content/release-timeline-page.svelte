<!--
  A changelog page as a timeline, on the wide Container: the page intro
  with the latest release over the title, big numbers and ReleaseFilters,
  then ReleaseTimeline's rail with each release's PastReleases. A release
  with a picture (`pictures` for its Tag and caption, the `picture`
  snippet for what it shows) keeps it in view beside its changes, linked
  to them through the spot. The first `open` releases show every change;
  the rest fold, and their pictures with them.
-->
<script lang="ts">
	import type { Snippet } from "svelte";
	import ArrowUpRight from "@lucide/svelte/icons/arrow-up-right";
	import { dateLabel, dateTime, narrowReleases } from "@hmziq/brand-core/changelog";
	import { cn } from "$brand/utils.js";
	import Container from "$brand/blocks/site/container.svelte";
	import PageIntro from "$brand/blocks/site/page-intro.svelte";
	import BigNumbers from "$brand/blocks/site/big-numbers.svelte";
	import ButtonLink from "$brand/blocks/site/button-link.svelte";
	import PastReleases from "./past-releases.svelte";
	import ReleaseFilters from "./release-filters.svelte";
	import ReleasePicture from "./release-picture.svelte";
	import ReleaseTimeline from "./release-timeline.svelte";
	import type { ChangeSpots, Release, ReleaseLink, ReleasePictureInfo, SpotState } from "./types.js";

	let {
		releases,
		title: heading,
		accent,
		lede: intro,
		numbers,
		filters = false,
		open = 4,
		spots,
		pictures = {},
		picture,
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
		/** Big numbers under the intro: `[value, label]`. */
		numbers?: [string, string][];
		/** Search and kind chips over the timeline. */
		filters?: boolean;
		/** How many releases stay open; the rest fold to their first change. */
		open?: number;
		/** The parts of each picture the changes name. */
		spots?: ChangeSpots;
		/** The releases with a picture, by version: its Tag and caption. */
		pictures?: Record<string, ReleasePictureInfo>;
		/** What a release's picture shows, by version; the spot links it to the changes. */
		picture?: Snippet<[v: string, spot: SpotState]>;
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
	const full = (v: string) => releases.find((r) => r.v === v);
	const folds = $derived(searching ? [] : list.slice(open));
	const allOpen = $derived(folds.length > 0 && folds.every((r) => opened[r.v]));
	const parts = $derived.by(() => {
		const at = accent ? heading.indexOf(accent) : -1;
		return at < 0 || !accent ? [heading, "", ""] : [heading.slice(0, at), accent, heading.slice(at + accent.length)];
	});
</script>

<div data-slot="release-timeline-page" class={cn("pt-14 pb-24 md:pt-20 md:pb-32", className)}>
	<Container size="wide">
		<PageIntro class="max-w-3xl">
			{#snippet kicker()}{#if latest}Latest <span class="font-mono font-semibold text-foreground">v{latest.v}</span> · <time datetime={dateTime(latest.date)}>{dateLabel(latest.date)}</time>{/if}{/snippet}
			{#snippet title()}{parts[0]}{#if parts[1]}<span class="text-primary">{parts[1]}</span>{/if}{parts[2]}{/snippet}
			{#snippet lede()}<span class="text-foreground/90">{intro}</span>{/snippet}
		</PageIntro>
		{#if numbers}<BigNumbers items={numbers} class="mt-14 md:mt-20" />{/if}
		{#if filters}
			<ReleaseFilters {releases} bind:kind bind:query {search} folds={folds.length} open={allOpen} onOpen={(v) => folds.forEach((r) => (opened[r.v] = v))} class="mt-14 md:mt-16" />
		{/if}
	</Container>

	<Container size="wide" class={filters ? "mt-12" : "mt-14 md:mt-20"}>
		<ReleaseTimeline releases={list} rail latest={latest?.v}>
			{#snippet item(r, i)}
				{@const folded = !searching && i >= open}
				{@const pic = folded || !picture ? undefined : pictures[r.v]}
				<div class={cn(pic && "grid items-start gap-x-14 gap-y-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)]")}>
					<div class="min-w-0">
						<PastReleases release={r} level={r.v === latest?.v ? 2 : 3} longDate fold={folded} bind:open={opened[r.v]} {spots} full={full(r.v)} bind:spot />
					</div>
					{#if pic && picture}
						<ReleasePicture tag={pic.tag} caption={pic.caption} drawing={pic.drawing} class="lg:sticky lg:top-24">
							{@render picture(r.v, box)}
						</ReleasePicture>
					{/if}
				</div>
			{/snippet}
		</ReleaseTimeline>
		{#if !list.length}
			<p class="text-lg text-foreground">No change matches “{query}”{kind !== "All" ? ` in ${kind}` : ""}.</p>
		{/if}

		{#if links?.length}
			<div class="mt-16 flex flex-wrap gap-3 pl-9 md:mt-20 md:pl-12">
				{#each links as l, i (l.href + l.label)}
					<ButtonLink href={l.href} size="lg" variant={i ? "outline" : "default"} target={l.external ? "_blank" : undefined} rel={l.external ? "noopener" : undefined}>{l.label}{#if l.external}<ArrowUpRight class="lucide" />{/if}</ButtonLink>
				{/each}
			</div>
		{/if}
	</Container>
</div>
