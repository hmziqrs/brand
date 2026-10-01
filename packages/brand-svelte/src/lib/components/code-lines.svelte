<!-- Highlighted code with line numbers, for an editor window. The line under the pointer is tinted. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import { tokenize, type CodeLanguage } from "./code-tokenize.js";
	import CodeTokens from "./code-tokens.svelte";

	let { code, lang = "rust", class: className }: { code: string; lang?: CodeLanguage; class?: string } = $props();

	const lines = $derived(tokenize(code, lang));
</script>

<div role="presentation" class={cn("overflow-x-auto py-3 font-mono text-[0.8rem] leading-[1.75] text-(--code-foreground)", className)}>
	{#each lines as line, i (i)}
		<div class="grid grid-cols-[3rem_max-content] transition-colors hover:bg-primary/8">
			<span class="pr-4.5 text-right text-muted-foreground select-none">{i + 1}</span>
			<code class="pr-5 whitespace-pre">{#if line.length}<CodeTokens {line} />{:else}&nbsp;{/if}</code>
		</div>
	{/each}
</div>
