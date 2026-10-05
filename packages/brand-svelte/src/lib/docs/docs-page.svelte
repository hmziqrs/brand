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
		"mx-auto flex w-full max-w-3xl flex-col gap-6 px-6 py-10 font-sans text-base sm:px-8 md:py-14",
		"[&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-medium [&_h2]:tracking-tight [&_h2:first-child]:mt-0 [&_h3]:mt-8 [&_h3]:text-lg [&_h3]:font-medium",
		"[&_p]:leading-relaxed [&_strong]:font-medium [&_code:not(pre_code)]:rounded-md [&_code:not(pre_code)]:bg-muted [&_code:not(pre_code)]:px-1.5 [&_code:not(pre_code)]:py-0.5 [&_code:not(pre_code)]:font-mono [&_code:not(pre_code)]:text-[0.85em]",
		"[&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:pl-5 [&_ol]:flex [&_ol]:list-decimal [&_ol]:flex-col [&_ol]:gap-2 [&_ol]:pl-5 [&_li]:leading-relaxed [&_li::marker]:text-muted-foreground",
		"[&_[data-bare]]:list-none [&_[data-bare]]:flex-row [&_[data-bare]]:pl-0",
		"[&_table]:mb-2 [&_table]:w-full [&_table]:border-collapse [&_table]:text-sm [&_th]:border-b [&_th]:pr-6 [&_th]:pb-2 [&_th]:text-left [&_th]:font-medium [&_td]:border-b [&_td]:py-2.5 [&_td]:pr-6 [&_td]:align-top",
		"[&_[data-panel]]:overflow-hidden [&_[data-panel]]:rounded-xl [&_[data-panel]]:border [&_[data-panel]]:bg-background [&_[data-panel]]:p-5",
		className,
	)}
>
	<h1 class="text-4xl font-medium tracking-tight text-balance">{title}</h1>
	{#if lead}<p class="max-w-prose text-lg text-muted-foreground">{@render lead()}</p>{/if}
	{@render children()}
</article>
