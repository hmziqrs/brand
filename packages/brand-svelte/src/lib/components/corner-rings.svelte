<!--
  A card's fingerprint: faint rings in its top-right corner with one ring in
  the card's color. Put it first inside a `relative overflow-hidden` card and
  give the card's content `relative`.
-->
<script lang="ts">
	import { cn, styleText } from "$brand/utils.js";
	import { arcs, hash, rng } from "@hmziq/brand-core/motion/rings";
	import RingCircles from "./ring-circles.svelte";
	import "@hmziq/brand-core/rings.css";

	let {
		/** The project's name. */
		seed,
		/** The accent ring's color, e.g. the project's kind: "var(--teal)". */
		color = "var(--primary)",
		/** Eight quieter rings with no dot, for cards that hold more text. */
		quiet = false,
		class: className,
		style,
		...rest
	}: {
		seed: string;
		color?: string;
		quiet?: boolean;
		class?: string;
		style?: Record<string, string>;
	} & Record<string, unknown> = $props();

	const list = $derived.by(() => {
		const random = rng(hash(seed) + (quiet ? 29 : 23));
		return quiet
			? arcs(random, { cx: 100, cy: 0, radii: Array.from({ length: 8 }, (_, i) => 12 + i * 12), accent: 2 + (hash(seed) % 3), accentGap: 0.5, gap: [0.1, 0.3] }).map((a) => ({ ...a, end: undefined }))
			: arcs(random, { cx: 100, cy: 0, radii: Array.from({ length: 9 }, (_, i) => 11 + i * 11), accent: 3 + (hash(seed) % 3), accentGap: 0.5, gap: [0.1, 0.3] });
	});
</script>

<svg data-slot="corner-rings" viewBox="0 0 100 100" aria-hidden="true" class={cn("pointer-events-none absolute top-0 right-0 h-auto w-[70%]", className)} style={styleText(style)} {...rest}>
	<RingCircles list={list} cx={100} cy={0} color={color} width={quiet ? [0.5, 0.75] : [0.5, 1]} dot={1.8} />
</svg>
