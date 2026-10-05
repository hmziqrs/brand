<!--
  One highlighted shell command: the program, its flags and its quoted text,
  each in its own --code-* color. Shared by Command, CommandBar, CommandBox
  and the terminal's command lines. Class names are written out in full so
  Tailwind can see them.
-->
<script lang="ts">
	import { highlightShell, type ShellPart } from "./highlight-shell.svelte.js";

	let { command }: { command: string } = $props();

	const parts: ShellPart[] = $derived(highlightShell(command));
	const toneClass: Record<string, string> = {
		function: "text-(--code-token-function)",
		string: "text-(--code-token-string)",
		keyword: "text-(--code-token-keyword)",
	};
</script>

{#each parts as part}
	{#if part.tone}
		<span class={toneClass[part.tone]}>{part.text}</span>
	{:else}
		{part.text}
	{/if}
{/each}
