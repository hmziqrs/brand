<!-- An open-source project at a glance: its tile and kind, what it does, a few numbers, the
     downloads trend in metal, and the install line with links. -->
<script lang="ts">
	import BookOpen from "@lucide/svelte/icons/book-open";
	import { siGithub } from "simple-icons";
	import { cn } from "$brand/utils.js";
	import BrandIcon from "./brand-icon.svelte";
	import CopyButton from "./copy-button.svelte";
	import MaterialSparkline from "./material-sparkline.svelte";
	import MaterialTile from "./material-tile.svelte";
	import StatusRing from "./status-ring.svelte";
	import Tag from "./tag.svelte";

	let {
		name,
		symbol,
		kind,
		description,
		install,
		/** Facts in a row: [label, value]. */
		stats = [],
		/** Weekly downloads, oldest first, for the trend. */
		trend,
		status,
		preset,
		docs,
		repo,
		class: className,
	}: {
		name: string;
		symbol: string;
		kind: string;
		description: string;
		install: string;
		stats?: [label: string, value: string][];
		trend?: number[];
		/** A live state next to the name, e.g. { label: "Builds passing", state: "on" }. */
		status?: { label: string; state: "on" | "off" | "stale" };
		preset?: string;
		docs?: string;
		repo?: string;
		class?: string;
	} = $props();
</script>

<article data-slot="project-card" class={cn("flex flex-col overflow-hidden rounded-xl ring-1 ring-foreground/10", className)}>
	<div class="flex flex-col gap-4 p-6">
		<div class="flex items-start gap-3.5">
			<MaterialTile {preset} seed={name} size={44}>{symbol}</MaterialTile>
			<div class="flex min-w-0 flex-1 flex-col gap-1">
				<h3 class="flex flex-wrap items-center gap-2 text-lg leading-tight font-medium">{name}<Tag>{kind}</Tag></h3>
				{#if status}<p class="flex items-center gap-1.5 text-[0.8125rem] text-muted-foreground"><StatusRing state={status.state} />{status.label}</p>{/if}
			</div>
		</div>
		<p class="text-[0.9rem] leading-relaxed text-muted-foreground">{description}</p>
	</div>
	{#if stats.length}
		<dl class="grid border-y" style:grid-template-columns={`repeat(${stats.length}, minmax(0, 1fr))`}>
			{#each stats as [label, value], i (label)}
				<div class={cn("flex flex-col gap-0.5 px-6 py-4", i > 0 && "border-l")}>
					<dt class="text-xs text-muted-foreground">{label}</dt>
					<dd class="text-lg font-medium tracking-tight tabular-nums">{value}</dd>
				</div>
			{/each}
		</dl>
	{/if}
	{#if trend}
		<div class="px-6 pt-5">
			<MaterialSparkline values={trend} {preset} seed={name} label={`Downloads a week for ${name}, from ${trend[0]} to ${trend.at(-1)}`} />
		</div>
	{/if}
	<div class="mt-auto flex flex-col gap-3 p-6 pt-5">
		<div class="flex items-center gap-2 rounded-lg border py-1 pr-1 pl-3.5">
			<code class="min-w-0 flex-1 truncate font-mono text-[0.8125rem]">{install}</code>
			<CopyButton text={install} />
		</div>
		{#if docs || repo}
			<div class="flex gap-4 text-sm">
				{#if docs}<a href={docs} class="inline-flex items-center gap-1.5 text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:rounded-sm focus-visible:ring-3 focus-visible:ring-ring/50"><BookOpen class="lucide size-4" />Docs</a>{/if}
				{#if repo}<a href={repo} class="inline-flex items-center gap-1.5 text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:rounded-sm focus-visible:ring-3 focus-visible:ring-ring/50"><BrandIcon icon={siGithub} class="size-4" />GitHub</a>{/if}
			</div>
		{/if}
	</div>
</article>
