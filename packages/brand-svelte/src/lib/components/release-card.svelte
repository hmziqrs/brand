<!-- One release, as a card: the version large, what changed grouped by kind (a few lines each,
     the rest counted), and the update command for each package manager. -->
<script lang="ts">
	import ArrowRight from "@lucide/svelte/icons/arrow-right";
	import { cn } from "$brand/utils.js";
	import KindTag from "$brand/blocks/content/kind-tag.svelte";
	import type { Release } from "$brand/blocks/content/types.js";
	import Mark from "./mark.svelte";
	import MaterialTag from "./material-tag.svelte";
	import Segmented from "./segmented.svelte";
	import CopyButton from "./copy-button.svelte";

	let {
		product,
		symbol,
		release,
		latest = false,
		/** Update commands, `[manager, command]`. */
		installs = [],
		/** Lines shown per kind of change before the rest are counted. */
		lines = 2,
		href,
		class: className,
	}: {
		product: string;
		symbol: string;
		release: Release;
		latest?: boolean;
		installs?: readonly (readonly [manager: string, command: string])[];
		lines?: number;
		href?: string;
		class?: string;
	} = $props();

	let manager = $state<string | null>(null);
	const install = $derived(installs.find(([m]) => m === manager) ?? installs[0]);
	const when = $derived(new Date(`${release.date}T00:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }));
</script>

<article data-slot="release-card" class={cn("flex flex-col overflow-hidden rounded-xl ring-1 ring-foreground/10", className)}>
	<header class="flex items-start justify-between gap-4 p-6 pb-5">
		<div class="flex flex-col gap-3">
			<span class="flex items-center gap-2 text-[0.8125rem] text-muted-foreground"><Mark {symbol} size={18} />{product}</span>
			<h3 class="font-mono text-3xl font-medium tracking-tight">{release.v}</h3>
		</div>
		<div class="flex flex-col items-end gap-2 text-right">
			{#if latest}<MaterialTag>Latest</MaterialTag>{/if}
			<time datetime={release.date} class="text-[0.8125rem] text-muted-foreground">{when}</time>
		</div>
	</header>
	<div class="flex flex-col gap-5 border-t p-6">
		{#each release.groups as [kind, items] (kind)}
			<section class="flex flex-col gap-2.5">
				<KindTag {kind} count={items.length} />
				<ul class="flex flex-col gap-2 text-sm leading-relaxed text-muted-foreground">
					{#each items.slice(0, lines) as line, i (i)}<li class="line-clamp-3">{line}</li>{/each}
				</ul>
				{#if items.length > lines}<p class="text-xs text-muted-foreground">and {items.length - lines} more</p>{/if}
			</section>
		{/each}
	</div>
	{#if installs.length || href}
		<footer class="mt-auto flex flex-col gap-3 border-t p-4">
			{#if install}
				{#if installs.length > 1}<Segmented label="Package manager" value={install[0]} onValueChange={(v) => (manager = v)} options={installs.map(([m]) => ({ value: m, label: m }))} />{/if}
				<div class="flex items-center gap-2 rounded-lg border py-1 pr-1 pl-3.5">
					<code class="min-w-0 flex-1 truncate font-mono text-[0.8125rem]">{install[1]}</code>
					<CopyButton text={install[1]} />
				</div>
			{/if}
			{#if href}<a {href} class="inline-flex w-fit items-center gap-1.5 text-sm font-medium underline-offset-4 outline-none hover:underline focus-visible:rounded-sm focus-visible:ring-3 focus-visible:ring-ring/50">All release notes<ArrowRight class="lucide size-4" /></a>{/if}
		</footer>
	{/if}
</article>
