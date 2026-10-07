<!--
  The shell every brand-docs page renders in: a prose column that styles the h2s,
  lists, tables, inline code and demo panels the pages are written in.
-->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import type { Snippet } from "svelte";

	let {
		title,
		lead,
		children,
		class: className,
	}: { title: string; lead?: Snippet; children: Snippet; class?: string } = $props();
</script>

<article
	class={cn(
		"docs-page mx-auto flex w-full max-w-[1080px] flex-col gap-4 px-10 py-16 font-sans text-sm antialiased",
		"[&_h2]:mt-1 [&_h2]:mb-0 [&_h2]:border-b [&_h2]:pb-1 [&_h2]:text-2xl [&_h2]:font-normal [&_h2]:leading-9 [&_h3]:mt-1 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:leading-[30px]",
		"[&_p]:leading-6 [&_strong]:font-bold [&_code:not(pre_code)]:font-mono",
		"[&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-[0.25em] [&_ul]:pl-[30px] [&_ol]:flex [&_ol]:list-decimal [&_ol]:flex-col [&_ol]:gap-[0.25em] [&_ol]:pl-[30px] [&_li]:leading-6 [&_li::marker]:text-muted-foreground",
		"[&_[data-bare]]:list-none [&_[data-bare]]:flex-row [&_[data-bare]]:pl-0",
		"[&_table]:border-collapse [&_table]:text-sm [&_th]:border-b [&_th]:pr-6 [&_th]:pb-2 [&_th]:text-left [&_th]:font-medium [&_td]:border-b [&_td]:py-2.5 [&_td]:pr-6 [&_td]:align-top",
		"[&_[data-panel]]:overflow-hidden [&_[data-panel]]:rounded-xl [&_[data-panel]]:border [&_[data-panel]]:bg-background [&_[data-panel]]:p-5",
		className,
	)}
>
	<h1 class="text-[32px] font-bold leading-12 text-balance">{title}</h1>
	{#if lead}<div class="text-foreground">{@render lead()}</div>{/if}
	{@render children()}
</article>

<style>
	:global(:where(article.docs-page) h2:first-of-type) {
		margin-top: 0;
	}
	:global(:where(article.docs-page) a:not(:where([data-panel], [data-preview]) *)) {
		color: var(--primary);
		text-decoration: underline;
		text-decoration-thickness: 0.5px;
		text-underline-offset: 0.11em;
	}
	:global(:where(article.docs-page) code:not(:where(pre, [data-panel], [data-preview]) code)) {
		margin: 0 2px;
		padding: 3px 5px;
		border: 1px solid rgb(69 76 84);
		border-radius: 3px;
		background-color: rgb(38 74 115 / 0.15);
		color: color-mix(in srgb, var(--foreground) 70%, transparent);
		font-size: 13px;
		line-height: 1;
		white-space: nowrap;
	}
	:global(:where(article.docs-page) table code:not(:where([data-panel], [data-preview]) code)) {
		border-color: color-mix(in srgb, var(--foreground) 5%, transparent);
		background-color: color-mix(in srgb, var(--foreground) 2%, transparent);
		color: var(--foreground);
	}
	:global(:where(article.docs-page) > table) {
		align-self: start;
		margin: 0;
		border-collapse: collapse;
		font-size: 14px;
		line-height: 24px;
	}
	:global(:where(article.docs-page) > table :where(th, td)) {
		border: 1px solid var(--border);
		padding: 6px 13px;
		text-align: start;
		vertical-align: middle;
	}
	:global(:where(article.docs-page) > table > thead :where(th)) {
		text-align: center;
		font-weight: 700;
	}
	:global(:where(article.docs-page) > table > tbody :where(tr:nth-of-type(2n))) {
		background-color: var(--card);
	}
</style>
