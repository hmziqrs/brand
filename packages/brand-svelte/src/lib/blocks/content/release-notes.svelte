<!--
  A release's changes (the lab's changelog). `grouped` (the default) is the
  lab's: one row per kind, the tag in a column on the left and the changes
  beside it. `tagged` runs them into one list with the tag before each
  change. `columns` gives each kind a column. `tabs` puts the kinds in the
  code block's tabs. And `summary` shows the first change only, with a
  button that shows the rest — the one the past releases on a timeline use.
  A change keeps its **bold** lead, `code` and links, and its nested lines.
  With `spots`, a change that names a part of the release's picture lights
  its dot and sets `spot` while you point at it.
-->
<script lang="ts">
	import ChevronDown from "@lucide/svelte/icons/chevron-down";
	import ChevronUp from "@lucide/svelte/icons/chevron-up";
	import { changeCount, changeSegments, itemText, releaseSummary, spotFor, type ChangeSegment } from "@hmziq/brand-core/changelog";
	import { cn } from "$brand/utils.js";
	import InlineCode from "$brand/components/inline-code.svelte";
	import KindTag from "./kind-tag.svelte";
	import { nextCodeId } from "$brand/components/code-id.js";
	import type { ChangeItem, ChangeSpots, Release } from "./types.js";

	let {
		release,
		variant = "grouped",
		spots,
		full,
		spot = $bindable(null),
		open = $bindable(),
		class: className,
	}: {
		release: Release;
		variant?: "grouped" | "tagged" | "columns" | "tabs" | "summary";
		/** The parts of the picture the changes name, for the whole changelog. */
		spots?: ChangeSpots;
		/** The release before a search or kind filter narrowed it, so each change keeps its spot. */
		full?: Release;
		/** The part the pointer is on, shared with the picture. */
		spot?: string | null;
		/** The summary variant's rest, shown. */
		open?: boolean;
		class?: string;
	} = $props();

	const dots = "absolute top-[0.6em] left-0 size-1.5 rounded-full border transition-colors motion-reduce:transition-none";
	const count = $derived(changeCount(release));

	/** The tabs variant's picked kind. */
	let tab = $state(0);
	const id = nextCodeId();
	const short = $derived(releaseSummary(release));
	const partOf = (kind: string, item: ChangeItem) => spotFor(spots, full ?? release, kind, item);
</script>

{#snippet words(segments: ChangeSegment[])}{#each segments as s, i (i)}{#if s.kind === "code"}<InlineCode>{s.value}</InlineCode>{:else if s.kind === "bold"}<strong class="font-semibold text-foreground">{@render words(s.inner ?? [])}</strong>{:else if s.kind === "link"}<a href={s.href} target="_blank" rel="noopener" class="font-medium text-foreground underline decoration-primary/60 decoration-1 underline-offset-4 hover:decoration-primary">{s.value}</a>{:else}{s.value}{/if}{/each}{/snippet}

{#snippet body(item: ChangeItem)}
	{@render words(changeSegments(itemText(item)))}
	{#if typeof item !== "string"}
		<ul class="mt-1.5 flex flex-col gap-1 border-l border-border pl-3 text-[0.8125rem] leading-relaxed text-foreground/85">
			{#each item.sub as line, k (k)}<li>{@render words(changeSegments(line))}</li>{/each}
		</ul>
	{/if}
{/snippet}

{#snippet change(kind: string, item: ChangeItem)}
	{@const part = partOf(kind, item)}
	<li
		data-spot={part ?? undefined}
		class={cn("relative pl-4 text-[0.9rem] leading-relaxed [overflow-wrap:anywhere]", part && "cursor-default")}
		onpointerenter={part ? () => (spot = part) : undefined}
		onpointerleave={part ? () => (spot = null) : undefined}
	>
		<i aria-hidden="true" class={cn(dots, part && spot === part ? "border-primary bg-primary" : "border-muted-foreground")}></i>
		{@render body(item)}
	</li>
{/snippet}

{#snippet rows(extra?: string)}
	{#each release.groups as [kind, items] (kind)}
		<div class={cn("grid items-start gap-x-4 gap-y-2 md:grid-cols-[6rem_minmax(0,1fr)]", extra)}>
			<span class="pt-0.5">
				<KindTag {kind} />
			</span>
			<ul class="flex max-w-[46rem] min-w-0 flex-col gap-2">
				{#each items as item, i (i)}{@render change(kind, item)}{/each}
			</ul>
		</div>
	{/each}
{/snippet}

{#if variant === "grouped"}
	<div data-slot="release-notes" data-variant={variant} class={cn("mt-4 flex flex-col gap-4", className)}>
		{@render rows()}
	</div>
{:else if variant === "tagged"}
	<ul data-slot="release-notes" data-variant={variant} class={cn("mt-4 flex max-w-[46rem] flex-col gap-2", className)}>
		{#each release.groups as [kind, items] (kind)}
			{#each items as item, i (i)}
				<li class="relative grid items-start gap-x-3 gap-y-1 pl-4 text-[0.9rem] leading-relaxed [overflow-wrap:anywhere] md:grid-cols-[auto_minmax(0,1fr)]">
					<i aria-hidden="true" class={cn(dots, "border-muted-foreground")}></i>
					<span class="justify-self-start">
						<KindTag {kind} />
					</span>
					<span class="min-w-0">{@render body(item)}</span>
				</li>
			{/each}
		{/each}
	</ul>
{:else if variant === "columns"}
	<div data-slot="release-notes" data-variant={variant} class={cn("mt-4 grid items-start gap-6 md:grid-cols-3", className)}>
		{#each release.groups as [kind, items] (kind)}
			<div class="flex flex-col gap-3 border-t pt-4">
				<KindTag {kind} count={items.length} />
				<ul class="flex flex-col gap-2">
					{#each items as item, i (i)}{@render change(kind, item)}{/each}
				</ul>
			</div>
		{/each}
	</div>
{:else if variant === "tabs"}
	<div data-slot="release-notes" data-variant={variant} class={cn("mt-4 overflow-hidden rounded-xl border", className)}>
		<div role="tablist" aria-label="Kinds of change" class="-ml-2 flex h-10 items-center gap-1 border-b pr-1.5 pl-3.5">
			{#each release.groups as [kind], i (kind)}
				<button
					type="button"
					role="tab"
					id={`${id}-tab-${i}`}
					aria-selected={i === tab}
					aria-controls={`${id}-panel-${i}`}
					onclick={() => (tab = i)}
					class="h-7 rounded-md px-2.5 text-xs text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 aria-selected:bg-foreground/8 aria-selected:text-foreground"
				>
					{kind}
				</button>
			{/each}
		</div>
		{#each release.groups as [kind, items], i (i)}
			<div id={`${id}-panel-${i}`} role="tabpanel" aria-labelledby={`${id}-tab-${i}`} hidden={i !== tab}>
				<ul class="flex flex-col gap-2 px-5 py-4">
					{#each items as item, k (k)}{@render change(kind, item)}{/each}
				</ul>
			</div>
		{/each}
	</div>
{:else}
	<div data-slot="release-notes" data-variant={variant} class={cn("mt-3", className)}>
		{#if open}
			{@render rows("mt-4")}
		{:else}
			<p class="max-w-[46rem] text-[0.9rem] leading-relaxed text-foreground/80 [overflow-wrap:anywhere]">{short}</p>
		{/if}
		<button
			type="button"
			aria-expanded={!!open}
			onclick={() => (open = !open)}
			class="mt-3.5 inline-flex items-center gap-1.5 rounded-full border py-1.5 pr-3 pl-2 text-[0.8125rem] font-medium transition-colors outline-none hover:border-primary/55 focus-visible:ring-3 focus-visible:ring-ring/50 motion-reduce:transition-none"
		>
			{#if open}<ChevronUp class="lucide size-3.5" />{:else}<ChevronDown class="lucide size-3.5" />{/if}
			{open ? "Hide the changes" : `Show all ${count} change${count === 1 ? "" : "s"}`}
		</button>
	</div>
{/if}
