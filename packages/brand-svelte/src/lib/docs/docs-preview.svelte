<!--
  A docs canvas: the live piece in a boxed preview panel, with the story's
  name as a tab label above it, and the storybook-docs show/hide code toggle
  and copy button under it.
-->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import { tokenize } from "$brand/components/code-tokenize.js";
	import CodeTokens from "$brand/components/code-tokens.svelte";
	import Check from "@lucide/svelte/icons/check";
	import CodeXml from "@lucide/svelte/icons/code-xml";
	import type { Snippet } from "svelte";

	let {
		story,
		code,
		children,
		class: className,
	}: { story?: string; code: string; children: Snippet; class?: string } = $props();

	let open = $state(false);
	let copied = $state(false);

	const lines = $derived(tokenize(code, "svelte"));

	const button =
		"flex h-7 items-center gap-1.5 rounded-md px-2.5 text-xs font-bold text-muted-foreground transition-colors hover:bg-primary/14 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";

	function copy() {
		navigator.clipboard?.writeText(code).then(
			() => {
				copied = true;
				window.setTimeout(() => (copied = false), 2000);
			},
			() => {},
		);
	}
</script>

<section data-preview class={cn("flex flex-col", className)}>
	<div class="mt-[9px] overflow-hidden rounded-[10px] border border-border bg-background shadow-[0_2px_5px_rgba(0,0,0,0.2)]">
		{#if story}
			<div class="flex h-10 items-center justify-between gap-4 border-b border-border px-3.5">
				<span class="text-xs font-medium text-foreground">{story}</span>
				<span class="rounded-md border border-border px-1.5 py-px font-mono text-[10px] leading-4 text-muted-foreground">
					svelte
				</span>
			</div>
		{/if}
		<div class="bg-background p-8 px-[22px]"><div class="p-2">{@render children()}</div></div>
		{#if open}
			<pre class="overflow-x-auto p-5 font-mono text-[13px] leading-[19px] text-foreground"><code>{#each lines as line, i (i)}<CodeTokens {line} />{#if i < lines.length - 1}{"\n"}{/if}{/each}</code></pre>
		{/if}
	</div>
	<div class="mb-[20px] flex h-10 items-center gap-1.5">
		<button type="button" class={button} onclick={() => (open = !open)}>
			<CodeXml class="lucide size-3.5" />
			{open ? "Hide code" : "Show code"}
		</button>
		<button type="button" class={button} onclick={copy}>
			{#if copied}
				<Check class="lucide size-3.5" />
			{:else}
				<svg
					class="lucide size-3.5"
					viewBox="0 0 14 15"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					aria-hidden="true"
				>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M11.746.07A.5.5 0 0011.5.003h-6a.5.5 0 00-.5.5v2.5H.5a.5.5 0 00-.5.5v10a.5.5 0 00.5.5h8a.5.5 0 00.5-.5v-2.5h4.5a.5.5 0 00.5-.5v-8a.498.498 0 00-.15-.357L11.857.154a.506.506 0 00-.11-.085zM9 10.003h4v-7h-1.5a.5.5 0 01-.5-.5v-1.5H6v2h.5a.5.5 0 01.357.15L8.85 5.147c.093.09.15.217.15.357v4.5zm-8-6v9h7v-7H6.5a.5.5 0 01-.5-.5v-1.5H1z"
						fill="currentColor"
					/>
				</svg>
			{/if}
			{copied ? "Copied" : "Copy code"}
		</button>
	</div>
</section>

<style>
	section[data-preview] button:active {
		color: var(--primary);
		background-color: rgb(35 57 82);
	}
</style>
