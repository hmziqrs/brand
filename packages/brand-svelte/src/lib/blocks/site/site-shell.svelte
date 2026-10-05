<!--
  Building block shared by every hmziq site: the header, the page's column
  rhythm and the footer that links the whole family together. Each site is a
  page built from these plus shadcn-svelte components.
-->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import { family } from "@hmziq/brand-core/family";
	import Container from "./container.svelte";
	import ButtonLink from "./button-link.svelte";
	import Wordmark from "$brand/components/wordmark.svelte";
	import Mark from "$brand/components/mark.svelte";
	import type { Snippet } from "svelte";

	let {
		/** The site's or product's name, shown as the wordmark. */
		site,
		/** Shown after the wordmark in small text, e.g. "by freeoxide". */
		maker,
		nav = [],
		/** The nav item for the page you're on. */
		current,
		cta,
		/** Right after the wordmark, e.g. the docs search. */
		lead,
		/** Right before the button, e.g. the version tag or a GitHub link. */
		extra,
		/** "page" for inner pages: less space between sections than a landing page. */
		layout = "landing",
		/** A wider header, for docs. */
		wide = false,
		mainClassName,
		footerLinks = [],
		/** A strip above the header, e.g. an announcement. */
		banner,
		/** Replaces the "More from hmziq" row, for products outside the family. */
		footerRow,
		/** The giant name the footer ends on, and its size in % of the footer's width. hmziq by default. */
		signature = { name: "hmziq", size: 33 },
		/** The last line of the footer. The hmziq line by default. */
		legal,
		children,
	}: {
		site: string;
		maker?: string;
		nav?: string[];
		current?: string;
		cta?: { label: string; href?: string };
		lead?: Snippet;
		extra?: Snippet;
		layout?: "landing" | "page";
		wide?: boolean;
		mainClassName?: string;
		footerLinks?: { title: string; links: string[] }[];
		banner?: Snippet;
		footerRow?: Snippet;
		signature?: { name: string; size: number };
		legal?: Snippet;
		children: Snippet;
	} = $props();

	const others = $derived(family.filter((f) => f.name !== site));
	const legalText = "© 2026 hmziq. Free and open source where it says so.";
</script>

<div class="min-h-screen bg-background text-foreground">
	{#if banner}{@render banner()}{/if}
	<header>
		<Container size={wide ? "wide" : "default"} class="flex h-19 items-center gap-4 md:gap-6">
			<a href="#" class="flex shrink-0 items-baseline gap-[0.35em] text-lg">
				<Wordmark name={site} />
				{#if maker}<span class="hidden text-[0.78em] text-muted-foreground sm:inline">{maker}</span>{/if}
			</a>
			{#if lead}{@render lead()}{/if}
			<nav class="ml-auto hidden items-center gap-1 md:flex" aria-label="Main">
				{#each nav as item (item)}
					<ButtonLink
						href="#"
						variant="ghost"
						size="sm"
						aria-current={item === current ? "page" : undefined}
						class="text-muted-foreground aria-[current=page]:text-foreground"
					>
						{item}
					</ButtonLink>
				{/each}
			</nav>
			{#if extra}<div class="ml-auto flex items-center gap-3 md:ml-0">{@render extra()}</div>{/if}
			{#if cta}
				<ButtonLink href={cta.href ?? "#"} size="sm" class={cn("px-3 md:ml-0", !extra && "ml-auto")}>
					{cta.label}
				</ButtonLink>
			{/if}
		</Container>
	</header>

	<main class={cn(layout === "landing" ? "flex flex-col gap-24 py-16 md:gap-32 md:py-24" : "flex flex-col gap-10 pt-12 pb-16 md:pt-20", mainClassName)}>
		{@render children()}
	</main>

	<footer class="border-t">
		<Container class="flex flex-col gap-5 py-11">
			{#if footerLinks.length > 0}
				<div class="grid grid-cols-2 gap-8 pb-6 sm:grid-cols-4">
					{#each footerLinks as col (col.title)}
						<div class="flex flex-col gap-3">
							<h2 class="text-sm font-medium">{col.title}</h2>
							<ul class="flex flex-col gap-2 text-sm text-muted-foreground">
								{#each col.links as l (l)}
									<li><a href="#" class="hover:text-foreground">{l}</a></li>
								{/each}
							</ul>
						</div>
					{/each}
				</div>
			{/if}

			{#if footerRow}
				{@render footerRow()}
			{:else}
				<h2 class="text-sm font-medium">More from hmziq</h2>
				<ul class="flex flex-wrap gap-x-6 gap-y-3 text-sm">
					{#each others as f (f.name)}
						<li>
							<a href={f.href} class="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
								<Mark symbol={f.symbol} />
								{f.name}
								<span class="sr-only"> ({f.note})</span>
							</a>
						</li>
					{/each}
				</ul>
			{/if}

			<!-- The signature: every site signs off with the same giant wordmark. -->
			<div class="@container mt-6 overflow-hidden border-t pt-10">
				<Wordmark name={signature.name} class="block pb-[0.2em] leading-[0.74] tracking-[-0.05em]" style={{ fontSize: `${signature.size}cqw` }} />
			</div>

			<div class="text-[0.8125rem] text-muted-foreground">{#if legal}{@render legal()}{:else}{legalText}{/if}</div>
		</Container>
	</footer>
</div>
