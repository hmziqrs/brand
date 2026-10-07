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
		"docs-page mx-auto flex w-full max-w-[1032px] flex-col gap-4 px-4 py-10 font-sans text-sm md:py-14",
		"[&_h2]:mt-1 [&_h2]:mb-0 [&_h2]:border-b [&_h2]:pb-1 [&_h2]:text-2xl [&_h2]:font-normal [&_h2]:leading-9 [&_h3]:mt-1 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:leading-[30px]",
		"[&_p]:leading-6 [&_strong]:font-bold [&_code:not(pre_code)]:rounded-md [&_code:not(pre_code)]:bg-muted [&_code:not(pre_code)]:px-1.5 [&_code:not(pre_code)]:py-0.5 [&_code:not(pre_code)]:font-mono [&_code:not(pre_code)]:text-[0.85em]",
		"[&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:pl-5 [&_ol]:flex [&_ol]:list-decimal [&_ol]:flex-col [&_ol]:gap-2 [&_ol]:pl-5 [&_li]:leading-6 [&_li::marker]:text-muted-foreground",
		"[&_[data-bare]]:list-none [&_[data-bare]]:flex-row [&_[data-bare]]:pl-0",
		"[&_table]:mb-2 [&_table]:w-full [&_table]:border-collapse [&_table]:text-sm [&_th]:border-b [&_th]:pr-6 [&_th]:pb-2 [&_th]:text-left [&_th]:font-medium [&_td]:border-b [&_td]:py-2.5 [&_td]:pr-6 [&_td]:align-top",
		"[&_[data-panel]]:overflow-hidden [&_[data-panel]]:rounded-xl [&_[data-panel]]:border [&_[data-panel]]:bg-background [&_[data-panel]]:p-5",
		className,
	)}
>
	<h1 class="text-[32px] font-bold leading-12 text-balance">{title}</h1>
	{#if lead}<p class="max-w-prose text-lg text-muted-foreground">{@render lead()}</p>{/if}
	{@render children()}
</article>

<style>
	/* Unlayered :where() zeroes specificity so per-cell utilities (text-right,
	   w-10 …) win; the child combinator keeps panel-nested tables on their quiet row style. */
	:global(:where(article.docs-page) > table) {
		width: 100%;
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
</style>
