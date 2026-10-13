<!-- A site's footer in three sizes: columns (links, an optional newsletter, the family, the giant
     signature), simple (one row of links) and minimal (one line). -->
<script lang="ts">
	import { siGithub, siX } from "simple-icons";
	import { family } from "@hmziq/brand-core/family";
	import { cn } from "$brand/utils.js";
	import { Button } from "$brand/ui/button/index.js";
	import { Input } from "$brand/ui/input/index.js";
	import BrandIcon from "./brand-icon.svelte";
	import Mark from "./mark.svelte";
	import Wordmark from "./wordmark.svelte";

	type Column = { title: string; links: { label: string; href: string }[] };

	let {
		site,
		tagline,
		variant = "columns",
		columns = [],
		newsletter = false,
		/** The "More from hmziq" row. */
		more = true,
		/** The giant name the footer ends on. */
		signature = "hmziq",
		github,
		x,
		legal = "© 2026 hmziq. Free and open source where it says so.",
		class: className,
	}: {
		site: string;
		tagline?: string;
		variant?: "columns" | "simple" | "minimal";
		columns?: Column[];
		newsletter?: boolean;
		more?: boolean;
		signature?: string | false;
		github?: string;
		x?: string;
		legal?: string;
		class?: string;
	} = $props();

	const others = $derived(family.filter((f) => f.name !== site));
	const link = "text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:rounded-sm focus-visible:ring-3 focus-visible:ring-ring/50";
</script>

{#snippet social()}
	<div class="flex items-center gap-1">
		{#if github}<a href={github} aria-label="GitHub" class={cn(link, "grid size-8 place-items-center rounded-md")}><BrandIcon icon={siGithub} class="size-4" /></a>{/if}
		{#if x}<a href={x} aria-label="X" class={cn(link, "grid size-8 place-items-center rounded-md")}><BrandIcon icon={siX} class="size-3.5" /></a>{/if}
	</div>
{/snippet}

<footer data-slot="site-footer" data-variant={variant} class={cn("border-t", className)}>
	<div class="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-10">
		{#if variant === "columns"}
			<div class="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,2fr)]">
				<div class="flex flex-col gap-4">
					<Wordmark name={site} class="text-xl" />
					{#if tagline}<p class="max-w-xs text-sm leading-relaxed text-muted-foreground">{tagline}</p>{/if}
					{#if newsletter}
						<form class="flex max-w-sm gap-2" onsubmit={(e) => e.preventDefault()}>
							<label for={`${site}-footer-email`} class="sr-only">Email</label>
							<Input id={`${site}-footer-email`} type="email" placeholder="you@example.com" autocomplete="email" />
							<Button type="submit" variant="outline">Subscribe</Button>
						</form>
					{/if}
				</div>
				{#if columns.length}
					<div class="grid grid-cols-2 gap-8 sm:grid-cols-3">
						{#each columns as col (col.title)}
							<div class="flex flex-col gap-3">
								<h2 class="text-sm font-medium">{col.title}</h2>
								<ul class="flex flex-col gap-2 text-sm">{#each col.links as l (l.label)}<li><a href={l.href} class={link}>{l.label}</a></li>{/each}</ul>
							</div>
						{/each}
					</div>
				{/if}
			</div>
			{#if more}
				<div class="flex flex-col gap-4 border-t pt-8">
					<h2 class="text-sm font-medium">More from hmziq</h2>
					<ul class="flex flex-wrap gap-x-6 gap-y-3 text-sm">
						{#each others as f (f.name)}<li><a href={f.href} class={cn(link, "inline-flex items-center gap-2")}><Mark symbol={f.symbol} />{f.name}</a></li>{/each}
					</ul>
				</div>
			{/if}
			{#if signature}
				<div class="@container overflow-hidden border-t pt-10">
					<Wordmark name={signature} class="block pb-[0.2em] leading-[0.74] tracking-[-0.05em]" style={{ fontSize: "33cqw" }} />
				</div>
			{/if}
			<div class="flex flex-wrap items-center justify-between gap-4 text-[0.8125rem] text-muted-foreground"><span>{legal}</span>{@render social()}</div>
		{:else if variant === "simple"}
			<div class="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
				<Wordmark name={site} class="text-lg" />
				<ul class="flex flex-wrap gap-x-6 gap-y-2 text-sm">
					{#each columns.flatMap((c) => c.links).slice(0, 6) as l (l.label)}<li><a href={l.href} class={link}>{l.label}</a></li>{/each}
				</ul>
				{@render social()}
			</div>
			<p class="text-[0.8125rem] text-muted-foreground">{legal}</p>
		{:else}
			<div class="flex flex-wrap items-center justify-between gap-4 text-[0.8125rem] text-muted-foreground">
				<span class="flex items-center gap-3"><Wordmark name={site} class="text-sm text-foreground" />{legal}</span>
				{@render social()}
			</div>
		{/if}
	</div>
</footer>
