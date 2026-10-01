<!-- The name or symbol. Waving or typing, each letter is its own span. -->
<script lang="ts">
	import { styleText } from "$brand/utils.js";
	import type { LogoLook } from "@hmziq/brand-core/logo";

	let { text, look, perLetter }: { text: string; look: LogoLook; perLetter?: string[] } = $props();

	const letters = $derived([...text]);
</script>

{#if look.textMove === "wave" || look.textMove === "type"}
	<span data-part="name" data-move={look.textMove}>
		{#each letters as letter, i (i)}
			<span style={styleText({ "--i": `${i}`, ...(perLetter?.[i] ? { "--logo-letter": perLetter[i] } : {}) })}>{letter}</span>
		{/each}
	</span>
{:else}
	<span data-part="name" data-move={look.textMove === "shimmer" ? "shimmer" : undefined}>{text}</span>
{/if}
