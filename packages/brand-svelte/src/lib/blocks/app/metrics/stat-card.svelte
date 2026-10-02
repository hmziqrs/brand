<!--
  One number that matters, with its label, its trend, and room for a hint or
  a small chart. Usually a cell in StatGrid's ruled grid; it brings its own
  background so it works on its own too. Pending holds its size with a
  skeleton, error keeps the card and offers a retry while the other cards in
  the grid stay — one failed number shouldn't take the page down.
-->
<script lang="ts">
	import ErrorState from "$brand/blocks/app/states/error-state.svelte";
	import { Skeleton } from "$brand/ui/skeleton/index.js";
	import { cn } from "$brand/utils.js";
	import type { Snippet } from "svelte";
	import MetricTrend from "./metric-trend.svelte";
	import type { MetricTrendProps } from "./types.js";

	let {
		label,
		/** Already formatted: "48,210", "42.1%", "1.8 s". */
		value,
		trend,
		/** One line under the number. */
		hint,
		/** Makes the whole card a link. */
		href,
		/** A small chart under the number. */
		chart,
		status = "success",
		/** What the compact error's "Try again" runs. */
		onRetry,
		/** With no JavaScript, "Try again" is a link: the same URL, asked for again. */
		retryHref,
		class: className,
		...rest
	}: {
		label: Snippet | string;
		/** Already formatted: "48,210", "42.1%", "1.8 s". A string is enough; a snippet for anything richer. */
		value: Snippet | string;
		trend?: MetricTrendProps;
		hint?: Snippet | string;
		href?: string;
		chart?: Snippet;
		status?: "pending" | "error" | "success";
		onRetry?: () => void | Promise<void>;
		retryHref?: string;
		class?: string;
	} & Record<string, unknown> = $props();

	// A linked card is outlined on hover with an inset ring, which reads as
	// the plan's border-primary/50 without shifting the number by the pixel
	// a real border would add. Only colors change.
	const root = $derived(
		cn(
			"flex min-w-0 flex-col gap-2.5 bg-background px-4 py-4",
			href && "outline-none transition-colors hover:ring-1 hover:ring-inset hover:ring-primary/50 focus-visible:ring-3 focus-visible:ring-ring/50",
			className,
		),
	);
</script>

{#snippet body()}
	<span class="truncate text-sm text-muted-foreground">
		{#if typeof label === "string"}{label}{:else}{@render label()}{/if}
	</span>
	{#if status === "pending"}
		<!-- The same two lines SkeletonStats draws, so a pending card holds
		     exactly the size the number and the trend will land in. -->
		<Skeleton class="h-8 w-20" />
		<Skeleton class="h-4 w-14" />
	{:else if status === "error"}
		<ErrorState size="compact" {onRetry} {retryHref} />
	{:else}
		<span class="text-2xl font-medium tracking-[-0.02em]">{#if typeof value === "string"}{value}{:else}{@render value()}{/if}</span>
		{#if trend}<MetricTrend {...trend} />{/if}
		{#if hint}
			<p class="text-sm text-muted-foreground">
				{#if typeof hint === "string"}{hint}{:else}{@render hint()}{/if}
			</p>
		{/if}
		{@render chart?.()}
	{/if}
{/snippet}

{#if href}
	<a {href} data-slot="stat-card" class={root} {...rest}>
		{@render body()}
	</a>
{:else}
	<div data-slot="stat-card" class={root} {...rest}>
		{@render body()}
	</div>
{/if}
