<!--
  One past release, folded (the lab's PastRelease): its head, its title if
  it has one, its first change, and the button that shows the rest. The
  latest release gets the whole list instead — pass it ReleaseNotes
  directly, or turn `fold` off.
-->
<script lang="ts">
	import ReleaseHead from "./release-head.svelte";
	import ReleaseNotes from "./release-notes.svelte";
	import type { ChangeSpots, Release } from "./types.js";

	let {
		release,
		fold = true,
		open = $bindable(),
		level = 3,
		longDate = false,
		spots,
		full,
		spot = $bindable(null),
	}: {
		release: Release;
		/** Folded to its first change; off shows every change, grouped by kind. */
		fold?: boolean;
		/** The folded rest, shown. */
		open?: boolean;
		/** h2 for the latest release. */
		level?: 2 | 3;
		/** The date written out ("Nov 3, 2026"). */
		longDate?: boolean;
		/** The parts of the picture the changes name (ReleaseNotes). */
		spots?: ChangeSpots;
		/** The release before a filter narrowed it. */
		full?: Release;
		/** The part the pointer is on, shared with the picture. */
		spot?: string | null;
	} = $props();
</script>

<ReleaseHead {release} {level} {longDate} />
{#if release.title}<p class="mt-3 text-[1.375rem] leading-snug font-medium tracking-[-0.02em] text-balance text-foreground md:text-[1.625rem]">{release.title}</p>{/if}
<ReleaseNotes {release} variant={fold ? "summary" : "grouped"} {spots} {full} bind:spot bind:open />
