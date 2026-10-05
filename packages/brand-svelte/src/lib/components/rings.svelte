<!--
  The hero picture: eleven rings coming in from the right edge, one in orange
  with a dot where it ends. Drawn from the site's name, so it never changes
  between visits.
-->
<script lang="ts">
	import { cn, styleText } from "$brand/utils.js";
	import { arcs, hash, ringMoves, ringPresets, rng, type RingMotion, type RingPreset } from "@hmziq/brand-core/motion/rings";
	import RingCircles from "./ring-circles.svelte";
	import "@hmziq/brand-core/rings.css";

	let {
		/** The site's name. The same name always draws the same rings. */
		seed,
		/** What the picture shows, for screen readers. */
		label = "Rings like layers of oxide, one of them orange",
		/**
		 * A little movement: a preset ("ripple-turn", "turn", …) or your own mix of
		 * the orange ring and the gray rings. Still by default, and always still
		 * for visitors who ask for reduced motion.
		 */
		motion = "still",
		/** Stops the movement where it is. */
		paused = false,
		/** 1 as designed; 2 takes twice as long, 0.5 half as long. */
		speed = 1,
		class: className,
		style,
		...rest
	}: {
		seed: string;
		label?: string;
		motion?: RingPreset | RingMotion;
		paused?: boolean;
		speed?: number;
		class?: string;
		style?: Record<string, string>;
	} & Record<string, unknown> = $props();

	const list = $derived.by(() => {
		const random = rng(hash(seed) + 7);
		const accent = 3 + Math.floor(random() * 3);
		return arcs(random, { cx: 440, cy: 225, radii: Array.from({ length: 11 }, (_, i) => 34 + i * 34), accent, accentGap: 0.52, gap: [0.06, 0.3] });
	});
	const { moves, css } = $derived(ringMoves(typeof motion === "string" ? ringPresets[motion] : motion, list, seed));
	const center = $derived({ "--cx": "440px", "--cy": "225px", "--ring-speed": `${speed}` });
</script>

<svg data-slot="rings" data-paused={paused || undefined} viewBox="0 0 520 440" role="img" aria-label={label} class={cn("h-auto w-full", className)} style={styleText({ ...center, ...style })} {...rest}>
	{#if css}{@html `<style>${css}</style>`}{/if}
	<RingCircles list={list} cx={440} cy={225} color="var(--primary)" width={[1.25, 3]} dot={7} moves={moves} />
</svg>
