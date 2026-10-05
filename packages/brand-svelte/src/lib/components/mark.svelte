<!--
  The mark, for favicons, app icons and anywhere the name doesn't fit: the
  symbol and the orange square on a tile in the opposite of the page color
  (white on dark pages, black on light ones). No rings.
-->
<script lang="ts">
	import { cn, styleText } from "$brand/utils.js";
	import { logoDefaults, logoMotion, paint, type LogoLook } from "@hmziq/brand-core/logo";
	import { letterStyle } from "./logo-style.js";
	import LogoLetters from "./logo-letters.svelte";
	import LogoSquare from "./logo-square.svelte";
	import "@hmziq/brand-core/logo.css";

	let {
		/** The site's two-letter symbol, like Fx for freeoxide. */
		symbol,
		/** Width and height in pixels. The letters scale with it. */
		size = 20,
		/** A look from the logo tweaker. Leave it out for the brand's own mark. */
		look,
		/** Holds a moving look still where it is. */
		paused = false,
		class: className,
		style,
		...rest
	}: {
		symbol: string;
		size?: number;
		look?: Partial<LogoLook>;
		paused?: boolean;
		class?: string;
		style?: Record<string, string>;
	} & Record<string, unknown> = $props();

	const l = $derived(look ? { ...logoDefaults, ...look } : undefined);
	const motion = $derived(l ? logoMotion(l, [...symbol].length) : undefined);
	const styles = $derived(
		l && motion
			? { ...letterStyle(l), color: paint(l.symbol), background: paint(l.tile), borderRadius: `${l.corner}%`, "--logo-color": paint(l.symbol), ...motion.vars, ...style }
			: style,
	);
</script>

{#if !l}
	<span
		data-slot="mark"
		aria-hidden="true"
		style={styleText({ fontSize: `${size}px`, ...style })}
		class={cn("inline-grid size-[1em] shrink-0 place-items-center rounded-[22%] bg-foreground leading-none font-semibold tracking-[-0.02em] text-background", className)}
		{...rest}
	>
		<span class="inline-flex items-baseline text-[0.42em]">{symbol}<i class="ml-[0.07em] inline-block size-[0.3em] bg-mark-square" ></i></span>
	</span>
{:else}
	<span
		data-slot="mark"
		data-look=""
		data-paused={paused || undefined}
		data-surface-move={l.surfaceMove === "breathe" ? "breathe" : undefined}
		aria-hidden="true"
		style={styleText({ fontSize: `${size}px`, ...styles })}
		class={cn("relative inline-grid size-[1em] shrink-0 place-items-center overflow-hidden leading-none", className)}
		{...rest}
	>
		{#if motion?.css}{@html `<style>${motion.css}</style>`}{/if}
		<span class="inline-flex items-baseline" style={styleText({ fontSize: `${l.symbolSize}em` })}>
			<LogoLetters text={symbol} look={l} perLetter={motion?.perLetter} />
			<LogoSquare look={l} size={l.markSize} color={l.markSquare} />
		</span>
		{#if l.tile !== "none" && l.surfaceMove === "shimmer"}<span data-part="sheen" aria-hidden="true" ></span>{/if}
	</span>
{/if}
