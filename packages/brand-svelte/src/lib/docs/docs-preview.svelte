<!--
  A docs canvas: the live piece in a boxed preview panel, with the storybook-docs
  show/hide code toggle and copy button under it.
-->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import { tokenize } from "$brand/components/code-tokenize.js";
	import CodeTokens from "$brand/components/code-tokens.svelte";
	import Check from "@lucide/svelte/icons/check";
	import CodeXml from "@lucide/svelte/icons/code-xml";
	import Copy from "@lucide/svelte/icons/copy";
	import type { Snippet } from "svelte";

	let {
		code,
		children,
		class: className,
	}: { code: string; children: Snippet; class?: string } = $props();

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
		<div class="bg-background px-[22px] py-10">{@render children()}</div>
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
			{#if copied}<Check class="lucide size-3.5" />{:else}<Copy class="lucide size-3.5" />{/if}
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
