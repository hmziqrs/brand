<!--
  A release's changes (the lab's changelog). `grouped` (the default) is the
  lab's: one row per kind, the tag in a column on the left and the changes
  beside it. `tagged` runs them into one list with the tag before each
  change. `columns` gives each kind a column. `tabs` puts the kinds in the
  code block's tabs. And `summary` shows the first change only, with a
  button that shows the rest — the one the past releases on a timeline use.
-->
<script lang="ts">
	import ChevronDown from "@lucide/svelte/icons/chevron-down";
	import ChevronUp from "@lucide/svelte/icons/chevron-up";
	import { cn } from "$brand/utils.js";
	import KindTag from "./kind-tag.svelte";
	import { nextCodeId } from "$brand/components/code-id.js";
	import type { Release } from "./types.js";

	let { release, variant = "grouped", class: className }: { release: Release; variant?: "grouped" | "tagged" | "columns" | "tabs" | "summary"; class?: string } = $props();

	const dots = "absolute top-[0.6em] left-0 size-1.5 rounded-full border border-muted-foreground";
	const count = $derived(release.groups.reduce((n, [, items]) => n + items.length, 0));

	/** The tabs variant's picked kind. */
	let tab = $state(0);
	/** The summary variant's folded rest. */
	let open = $state(false);
	const id = nextCodeId();
	const first = $derived(release.groups[0]?.[1][0] ?? "");
	const short = $derived(first.length > 150 ? `${first.slice(0, 150).replace(/\s\S*$/, "")}…` : first);
</script>

{#if variant === "grouped"}
	<div data-slot="release-notes" data-variant={variant} class={cn("mt-4 flex flex-col gap-4", className)}>
		{#each release.groups as [kind, items] (kind)}
			<div class="grid items-start gap-x-4 gap-y-2 md:grid-cols-[6rem_minmax(0,1fr)]">
				<span class="pt-0.5">
					<KindTag {kind} />
				</span>
				<ul class="flex max-w-[46rem] flex-col gap-2">
					{#each items as item (item)}
						<li class="relative pl-4 text-[0.9rem] leading-relaxed">
							<i aria-hidden="true" class={dots}></i>
							{item}
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>
{:else if variant === "tagged"}
	<ul data-slot="release-notes" data-variant={variant} class={cn("mt-4 flex max-w-[46rem] flex-col gap-2", className)}>
		{#each release.groups as [kind, items] (kind)}
			{#each items as item (item)}
				<li class="relative grid items-start gap-x-3 gap-y-1 pl-4 text-[0.9rem] leading-relaxed md:grid-cols-[auto_minmax(0,1fr)]">
					<i aria-hidden="true" class={dots}></i>
					<span class="justify-self-start">
						<KindTag {kind} />
					</span>
					<span>{item}</span>
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
					{#each items as item (item)}
						<li class="relative pl-4 text-[0.9rem] leading-relaxed">
							<i aria-hidden="true" class={dots}></i>
							{item}
						</li>
					{/each}
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
		{#each release.groups as [, items], i (i)}
			<div id={`${id}-panel-${i}`} role="tabpanel" aria-labelledby={`${id}-tab-${i}`} hidden={i !== tab}>
				<ul class="flex flex-col gap-2 px-5 py-4">
					{#each items as item (item)}
						<li class="relative pl-4 text-[0.9rem] leading-relaxed">
							<i aria-hidden="true" class={dots}></i>
							{item}
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>
{:else}
	<div data-slot="release-notes" data-variant={variant} class={cn("mt-3", className)}>
		{#if open}
			{#each release.groups as [kind, items] (kind)}
				<div class="mt-4 grid items-start gap-x-4 gap-y-2 md:grid-cols-[6rem_minmax(0,1fr)]">
					<span class="pt-0.5">
						<KindTag {kind} />
					</span>
					<ul class="flex max-w-[46rem] flex-col gap-2">
						{#each items as item (item)}
							<li class="relative pl-4 text-[0.9rem] leading-relaxed">
								<i aria-hidden="true" class={dots}></i>
								{item}
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		{:else}
			<p class="max-w-[46rem] text-[0.9rem] leading-relaxed text-muted-foreground">{short}</p>
		{/if}
		<button
			type="button"
			aria-expanded={open}
			onclick={() => (open = !open)}
			class="mt-3.5 inline-flex items-center gap-1.5 rounded-full border py-1.5 pr-3 pl-2 text-[0.8125rem] font-medium transition-colors outline-none hover:border-primary/55 focus-visible:ring-3 focus-visible:ring-ring/50"
		>
			{#if open}<ChevronUp class="lucide size-3.5" />{:else}<ChevronDown class="lucide size-3.5" />{/if}
			{open ? "Hide the changes" : `Show all ${count} change${count === 1 ? "" : "s"}`}
		</button>
	</div>
{/if}
