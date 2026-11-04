<!-- A release's version, its date and one tag per kind of change in it. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import { dateLabel, dateTime } from "@hmziq/brand-core/changelog";
	import Kicker from "$brand/blocks/site/kicker.svelte";
	import KindTag from "./kind-tag.svelte";
	import type { Release } from "./types.js";

	let {
		release,
		level = 3,
		longDate = false,
		class: className,
	}: {
		release: Release;
		/** h3 inside a timeline item; h2 for the latest release, on its own. */
		level?: 2 | 3;
		/** The date written out ("Nov 3, 2026") in a `<time>`, not as the release has it. */
		longDate?: boolean;
		class?: string;
	} = $props();
</script>

<div data-slot="release-head" class={cn("flex flex-wrap items-baseline gap-x-4 gap-y-2", className)}>
	{#if level === 2}
		<h2 class="font-mono text-lg leading-[1.4] font-semibold">v{release.v}</h2>
	{:else}
		<h3 class="font-mono text-lg leading-[1.4] font-semibold">v{release.v}</h3>
	{/if}
	<Kicker>{#if longDate}<time datetime={dateTime(release.date)}>{dateLabel(release.date)}</time>{:else}{release.date}{/if}</Kicker>
	<span class="inline-flex flex-wrap gap-1.5">
		{#each release.groups as [kind, items] (kind)}
			<KindTag {kind} count={items.length} />
		{/each}
	</span>
</div>
