<!--
  The switch every async area of a page hangs on: loading, error, empty or
  content, from one status. The skeleton shows only after `delay` ms of
  pending (default 300), so a fast load never flashes one; the container
  names what's loading to screen readers and holds `aria-busy` while it
  waits. Refetching with data already on screen is the page's business: it
  keeps `status="success"` and shows a small spinner where the data lives.
-->
<script lang="ts">
	import { delayed } from "../state.svelte.js";
	import { cn } from "$brand/utils.js";
	import type { Snippet } from "svelte";

	let {
		status,
		isEmpty = false,
		/** A skeleton shaped like the content. */
		loading,
		error,
		/** Shown instead of the content when it arrived empty. */
		empty,
		/** Nothing shows while pending has lasted under this long. */
		delay = 300,
		/** What screen readers hear while the skeleton shows: "Loading members". */
		loadingLabel = "Loading",
		children,
		class: className,
	}: {
		status: "pending" | "error" | "success";
		isEmpty?: boolean;
		loading: Snippet;
		error: Snippet;
		empty?: Snippet;
		delay?: number;
		loadingLabel?: string;
		children: Snippet;
		class?: string;
	} = $props();

	// The delay is read once, while the helper is set up: a page that changes
	// it mid-flight isn't asking for anything sensible.
	// svelte-ignore state_referenced_locally
	const showSkeleton = delayed(() => status === "pending", delay);
</script>

<div
	data-slot="data-state"
	class={cn("min-w-0", className)}
	aria-busy={status === "pending" || undefined}
>
	{#if status === "error"}
		{@render error()}
	{:else if status === "pending" && showSkeleton.current}
		<span class="sr-only" role="status">{loadingLabel}</span>
		{@render loading()}
	{:else if status === "pending"}
		<!-- Still inside the delay: a fast load simply appears. -->
	{:else if isEmpty && empty}
		{@render empty()}
	{:else}
		{@render children()}
	{/if}
</div>
