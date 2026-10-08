<!--
  The name in Onest 600, ending in the orange square. Every hmziq site signs
  this way. With a `look` (from the logo tweaker) the letters, the square and
  the plate behind them can be tuned and can move; `logo.css` in core holds
  the movement.
-->
<script lang="ts">
	import { cn, styleText } from "$brand/utils.js";
	import { logoDefaults, logoMotion, paint, type LogoLook } from "@hmziq/brand-core/logo";
	import { letterStyle } from "./logo-style.js";
	import LogoLetters from "./logo-letters.svelte";
	import LogoSquare from "./logo-square.svelte";
	import "@hmziq/brand-core/logo.css";

	let {
		name,
		/** A look from the logo tweaker: colors, shapes and movement. Leave it out for the brand's own logo. */
		look,
		/** Holds a moving look still where it is. */
		paused = false,
		class: className,
		style,
		...rest
	}: {
		name: string;
		look?: Partial<LogoLook>;
		paused?: boolean;
		class?: string;
		style?: Record<string, string>;
	} & Record<string, unknown> = $props();

	const l = $derived(look ? { ...logoDefaults, ...look } : undefined);
	const motion = $derived(l ? logoMotion(l, [...name].length) : undefined);
	const plate = $derived(l ? l.plate !== "none" : false);
	const plateStyle = $derived(plate ? { background: paint(l!.plate), padding: `${l!.platePad * 0.6}em ${l!.platePad}em`, borderRadius: `${l!.plateCorner}em` } : undefined);
	const styles = $derived(
		l && motion
			? { ...letterStyle(l), ...plateStyle, "--logo-color": paint(l.color), ...motion.vars, ...style }
			: style,
	);
</script>

{#if !l}
	<span data-slot="wordmark" class={cn("font-semibold leading-none tracking-[-0.02em] whitespace-nowrap", className)} style={styleText(style)} {...rest}>{name}<i aria-hidden="true" class="ml-[0.07em] inline-block size-[0.36em] bg-primary" ></i></span>
{:else}
	<span
		data-slot="wordmark"
		data-look=""
		data-paused={paused || undefined}
		data-surface-move={plate && l.surfaceMove === "breathe" ? "breathe" : undefined}
		class={cn("relative leading-none whitespace-nowrap", className)}
		style={styleText(styles)}
		{...rest}
	>
		{#if motion?.css}{@html `<style>${motion.css}</style>`}{/if}{#if plate && l.surfaceMove === "shimmer"}<span data-part="sheen" aria-hidden="true" ></span>{/if}<LogoLetters text={name} look={l} perLetter={motion?.perLetter} /><LogoSquare look={l} size={l.size} color={l.square} />
	</span>
{/if}
