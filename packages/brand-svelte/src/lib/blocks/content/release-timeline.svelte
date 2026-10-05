<!--
  The changelog's timeline (the lab's changelog): one release per line, an
  orange ring lined up with each version heading and a line joining them
  down the page. Newest first. The latest release usually stands apart
  above it, so it is not in the timeline's list — drop it from what you
  pass, or let `skip` take it.
-->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import PastReleases from "./past-releases.svelte";
	import type { Release } from "./types.js";

	let { releases, skip = 0, class: className }: { releases: Release[]; /** How many releases to skip off the front, for the one shown above. */ skip?: number; class?: string } = $props();

	const list = $derived(releases.slice(skip));
</script>

<ol data-slot="release-timeline" class={cn("flex flex-col", className)}>
	{#each list as release, i (release.v)}
		<li
			class={cn(
				"relative pb-11 pl-9 last:pb-0",
				"before:absolute before:top-[0.42rem] before:left-0 before:z-10 before:size-3.25 before:rounded-full before:border-[1.75px] before:border-primary before:bg-background",
				i < list.length - 1 && "after:absolute after:top-[1.45rem] after:bottom-1 after:left-[calc(0.4rem-0.5px)] after:w-px after:bg-border",
			)}
		>
			<PastReleases {release} />
		</li>
	{/each}
</ol>
