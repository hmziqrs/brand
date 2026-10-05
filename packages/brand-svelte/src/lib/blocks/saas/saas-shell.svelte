<!--
  The frame around every SaaS template: the kit's own SiteShell, so the
  header, rhythm and footer are the same code. It's signed with the
  product's name, and the "More from hmziq" row becomes the product's mark
  and one line about it. Swap the name, symbol and links, keep the rest.
-->
<script lang="ts">
	import ArrowRight from "@lucide/svelte/icons/arrow-right";
	import Mark from "$brand/components/mark.svelte";
	import Marker from "$brand/components/marker.svelte";
	import Tag from "$brand/components/tag.svelte";
	import ButtonLink from "$brand/blocks/site/button-link.svelte";
	import Container from "$brand/blocks/site/container.svelte";
	import SiteShell from "$brand/blocks/site/site-shell.svelte";
	import type { Snippet } from "svelte";

	let {
		/** The product's name, lowercase like every wordmark in the kit. */
		name,
		/** Two letters for the product's mark, like an element. */
		symbol,
		/** One sentence beside the mark in the footer. */
		tagline,
		nav,
		cta,
		/** A one-line strip above the header: a tag, a sentence and a link. */
		announcement,
		/** "Every system working", with a green ring, in the footer. */
		status,
		footer,
		/** Size of the giant footer name, in % of the footer's width: pick it so the name fills the width, like hmziq■ (33). */
		signature = 24,
		children,
	}: {
		name: string;
		symbol: string;
		tagline: string;
		nav: string[];
		cta: string;
		announcement?: { tag: string; text: string; link: string };
		status?: string;
		footer: { title: string; links: string[] }[];
		signature?: number;
		children: Snippet;
	} = $props();

	const title = $derived(name.charAt(0).toUpperCase() + name.slice(1));
</script>

<SiteShell site={name} {nav} cta={{ label: cta }} footerLinks={footer} signature={{ name, size: signature }}>
	{#snippet extra()}
		<ButtonLink href="#" variant="ghost" size="sm" class="hidden text-muted-foreground sm:inline-flex">Sign in</ButtonLink>
	{/snippet}
	{#snippet banner()}
		{#if announcement}
			<aside aria-label="Announcement" class="border-b">
				<Container class="flex min-h-11 flex-wrap items-center justify-center gap-x-3 gap-y-1 py-2 text-sm">
					<Tag tone="orange" marker>
						{announcement.tag}
					</Tag>
					<span class="text-muted-foreground">{announcement.text}</span>
					<a href="#" class="inline-flex items-center gap-1 rounded-sm font-medium transition-colors outline-none hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/50">
						{announcement.link}
						<ArrowRight class="lucide size-3.5" />
					</a>
				</Container>
			</aside>
		{/if}
	{/snippet}
	{#snippet footerRow()}
		<div class="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 text-sm text-muted-foreground">
			<p class="inline-flex items-center gap-2.5">
				<Mark {symbol} />
				{tagline}
			</p>
			{#if status}
				<p class="inline-flex items-center gap-2">
					<Marker filled class="text-success" />
					{status}
				</p>
			{/if}
		</div>
	{/snippet}
	{#snippet legal()}
		<div class="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
			<p>© 2026 {title}. Example content for a SaaS template.</p>
			<ul class="flex gap-5">
				{#each ["Privacy", "Terms", "Security"] as l (l)}
					<li>
						<a href="#" class="hover:text-foreground">{l}</a>
					</li>
				{/each}
			</ul>
		</div>
	{/snippet}
	{@render children()}
</SiteShell>
