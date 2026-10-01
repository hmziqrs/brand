<!--
  How much of the plan's allowance is used: a bar or a ring, the share in
  words, and a warning the moment it matters. The fill follows the
  thresholds — primary below warnAt, warning from it, destructive at or over
  the limit — and never carries text. The meter itself (label, visual,
  words) carries role="meter" with an explicit value text, "7,420 of 10,000
  events"; the limit message and its action sit outside it, so the meter
  never swallows a focusable control.
-->
<script lang="ts">
	import CircleAlert from "@lucide/svelte/icons/circle-alert";
	import RingGauge from "$brand/components/ring-gauge.svelte";
	import { cn, styleText } from "$brand/utils.js";
	import type { Snippet } from "svelte";

	let {
		label,
		used,
		/** null means no limit: just the count, no meter role. */
		limit,
		unit,
		/** For number formatting; fixed so the server and the browser agree. */
		locale = "en-US",
		resetsOn,
		variant = "bar",
		/** The share (0–1) the warning color starts at. */
		warnAt = 0.8,
		limitMessage = "You've reached your limit.",
		/** e.g. an "Upgrade" link button, shown at the limit. */
		action,
		class: className,
		...rest
	}: {
		label: Snippet | string;
		used: number;
		limit: number | null;
		unit: string;
		locale?: string;
		resetsOn?: Snippet | string;
		variant?: "bar" | "ring";
		warnAt?: number;
		limitMessage?: Snippet | string;
		action?: Snippet;
		class?: string;
	} & Record<string, unknown> = $props();

	// The label's id names the meter for screen readers (role="meter" has no
	// name of its own otherwise), the way the sections name themselves.
	const labelId = $props.id();

	const numbers = $derived(new Intl.NumberFormat(locale));
	const ratio = $derived(limit === null || limit <= 0 ? 0 : used / limit);
	// The thresholds the plan sets: warning from warnAt, destructive at the
	// limit. The ring follows the same ones through its tone.
	const tone = $derived(ratio >= 1 ? "destructive" : ratio >= warnAt ? "warning" : "primary");
	const fill = $derived(
		tone === "destructive" ? "bg-destructive" : tone === "warning" ? "bg-warning" : "bg-primary",
	);
	const share = $derived(`${Math.round(Math.min(ratio, 1) * 100)}%`);
	const words = $derived(
		limit === null ? `${numbers.format(used)} ${unit}` : `${numbers.format(used)} of ${numbers.format(limit)} ${unit}`,
	);
</script>

{#snippet labelSpan(extraClass: string | undefined)}
	<span id={labelId} class={cn("text-sm text-muted-foreground", extraClass)}>
		{#if typeof label === "string"}{label}{:else}{@render label()}{/if}
		{#if limit === null}
			<span>· No limit</span>
		{/if}
	</span>
{/snippet}

{#snippet wordLine(extraClass: string | undefined)}
	<span class={cn("text-sm", extraClass)}>
		<span class="font-medium">{words}</span>
		{#if resetsOn}
			<span class="text-muted-foreground">
				{#if typeof resetsOn === "string"} · {resetsOn}{:else} · {@render resetsOn()}{/if}
			</span>
		{/if}
	</span>
{/snippet}

<div data-slot="usage-meter" class={cn("flex min-w-0 flex-col gap-2", className)} {...rest}>
	{#if limit === null}
		{@render labelSpan(undefined)}
		{@render wordLine(undefined)}
	{:else if variant === "ring"}
		<div
			class="flex items-center gap-4"
			role="meter"
			aria-labelledby={labelId}
			aria-valuemin={0}
			aria-valuemax={limit}
			aria-valuenow={Math.min(used, limit)}
			aria-valuetext={words}
		>
			<RingGauge value={Math.min(ratio, 1)} {tone} />
			<div class="flex min-w-0 flex-col gap-1.5">
				{@render labelSpan(undefined)}
				{@render wordLine(undefined)}
			</div>
		</div>
	{:else}
		<div
			class="flex w-full flex-col gap-2"
			role="meter"
			aria-labelledby={labelId}
			aria-valuemin={0}
			aria-valuemax={limit}
			aria-valuenow={Math.min(used, limit)}
			aria-valuetext={words}
		>
			{@render labelSpan(undefined)}
			<!-- The bar never carries text; the words below it do. -->
			<div class="h-1.5 w-full overflow-hidden rounded-full bg-muted" aria-hidden="true">
				<div class={cn("h-full rounded-full", fill)} style={styleText({ width: share })}></div>
			</div>
			{@render wordLine(undefined)}
		</div>
	{/if}

	{#if limit !== null && ratio >= 1}
		<!-- At or over the limit: what that means, in destructive words, with
		     the way out beside it — outside the meter itself. -->
		<div class="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1.5">
			<span class="inline-flex items-center gap-1.5 text-sm text-destructive">
				<CircleAlert class="lucide size-4 shrink-0" aria-hidden="true" />
				{#if typeof limitMessage === "string"}{limitMessage}{:else}{@render limitMessage()}{/if}
			</span>
			{@render action?.()}
		</div>
	{/if}
</div>
