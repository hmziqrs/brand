<!--
  A block of code in a thin outline, no fill. A label or tabs sit in a bar
  above it, with the copy button on the right.
-->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import { tokenize, type CodeFile, type CodeLanguage } from "./code-tokenize.js";
	import { nextCodeId } from "./code-id.js";
	import CodeTokens from "./code-tokens.svelte";
	import CopyButton from "./copy-button.svelte";

	let {
		code = "",
		lang = "text",
		/** A file name or short title shown above the code. */
		label,
		/** Several versions of the same thing (Terminal / Cargo.toml), as tabs. */
		files,
		/** Show a copy button. On by default; turn it off for code people only read. */
		copy = true,
		class: className,
	}: {
		code?: string;
		lang?: CodeLanguage;
		label?: string;
		files?: CodeFile[];
		copy?: boolean;
		class?: string;
	} = $props();

	const list = $derived(files ?? [{ label: label ?? "", code, lang }]);
	let index = $state(0);
	const id = nextCodeId();
	const current = $derived(list[Math.min(index, list.length - 1)]);
	const lines = $derived(tokenize(current.code, current.lang ?? "text"));
	const bar = $derived(Boolean(files || label));
</script>

<div data-slot="code-block" class={cn("relative overflow-hidden rounded-xl border", className)}>
	{#if bar}
		<div class="flex h-10 items-center justify-between gap-4 border-b pr-1.5 pl-3.5">
			{#if files}
				<div role="tablist" aria-label="Versions" class="-ml-2 flex gap-1">
					{#each files as f, i (f.label)}
						<button
							type="button"
							role="tab"
							id={`${id}-tab-${i}`}
							aria-selected={i === index}
							aria-controls={`${id}-panel`}
							onclick={() => (index = i)}
							class="h-7 rounded-md px-2.5 text-xs text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 aria-selected:bg-foreground/8 aria-selected:text-foreground"
						>
							{f.label}
						</button>
					{/each}
				</div>
			{:else}
				<span class="text-xs text-muted-foreground">{label}</span>
			{/if}
			{#if copy}<CopyButton text={current.code} />{/if}
		</div>
	{/if}
	{#if copy && !bar}
		<div class="absolute top-1.5 right-1.5">
			<CopyButton text={current.code} />
		</div>
	{/if}
	<!-- Focusable, so code wider than the box can be scrolled from the keyboard.
	     Nothing may sit between <pre> and <code>: inside a pre, whitespace renders. -->
	<pre
		id={`${id}-panel`}
		role={files ? "tabpanel" : undefined}
		aria-labelledby={files ? `${id}-tab-${index}` : undefined}
		tabindex="0"
		class={cn(
			"overflow-x-auto px-4.5 py-4 font-mono outline-none focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-inset text-[0.8125rem] leading-[1.7] text-(--code-foreground)",
			copy && !bar && "pr-12",
		)}
	><code>{#each lines as line, i (i)}<CodeTokens {line} />{#if i < lines.length - 1}{"\n"}{/if}{/each}</code></pre>
</div>
