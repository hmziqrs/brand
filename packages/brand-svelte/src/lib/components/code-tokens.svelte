<!-- One line of highlighted code: each token in the color Shiki gave it. -->
<script lang="ts">
	import { styleText } from "$brand/utils.js";
	import type { Token } from "./code-tokenize.js";

	let { line }: { line: Token[] } = $props();
</script>

{#each line as token, j (j)}
	{#if token.color}
		<span style={styleText({ color: token.color })}>{token.content}</span>
	{:else}
		{token.content}
	{/if}
{/each}
