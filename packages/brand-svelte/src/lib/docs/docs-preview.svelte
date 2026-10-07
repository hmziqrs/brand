<!--
  A docs canvas: the live piece in a boxed preview panel, with the storybook-docs
  show/hide code toggle and copy button under it.
-->
<script lang="ts">
	import { cn } from "$brand/utils.js";
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

	const button =
		"flex h-7 items-center gap-1.5 rounded-lg px-2.5 text-xs font-bold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground motion-reduce:transition-none";

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

<section class={cn("flex flex-col", className)}>
	<div class="overflow-hidden rounded-[10px] border border-border bg-background shadow-sm">
		<div class="bg-background px-[22px] py-8">{@render children()}</div>
		{#if open}
			<pre class="overflow-x-auto p-5 font-mono text-[13px] leading-[19px] text-foreground"><code>{code}</code></pre>
		{/if}
	</div>
	<div class="flex h-10 items-center gap-1.5">
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
