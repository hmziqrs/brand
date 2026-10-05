<!-- The square at the end of the name, drawn by the logo recipe. -->
<script lang="ts">
	import { styleText } from "$brand/utils.js";
	import type { LogoColor, LogoLook } from "@hmziq/brand-core/logo";
	import { squareStyle } from "./logo-style.js";

	let { look, size, color }: { look: LogoLook; size: number; color: LogoColor } = $props();

	const style = $derived(squareStyle(look, size, color));
</script>

{#if style}
	<i aria-hidden="true" data-part="square" data-move={look.squareMove === "still" ? undefined : look.squareMove} style={styleText(style)} ></i>
{/if}
