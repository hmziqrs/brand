<!-- The hero rings drawing themselves as they scroll into view, one after another, the orange
     ring last with its dot. Fully drawn where scroll-driven animation or motion isn't available. -->
<script lang="ts">
	import { cn, styleText } from "$brand/utils.js";
	import { arcs, hash, rng } from "@hmziq/brand-core/motion/rings";

	let {
		seed,
		label = "Rings like layers of oxide, one of them orange",
		class: className,
	}: {
		seed: string;
		label?: string;
		class?: string;
	} = $props();

	const cx = 440;
	const cy = 225;
	const list = $derived.by(() => {
		const random = rng(hash(seed) + 7);
		const accent = 3 + Math.floor(random() * 3);
		return arcs(random, { cx, cy, radii: Array.from({ length: 11 }, (_, i) => 34 + i * 34), accent, accentGap: 0.52, gap: [0.06, 0.3] });
	});
</script>

<svg data-slot="scroll-rings" viewBox="0 0 520 440" role="img" aria-label={label} class={cn("h-auto w-full", className)}>
	{#each list as a, i (a.r)}
		<circle
			{cx}
			{cy}
			r={a.r}
			fill="none"
			stroke={a.accent ? "var(--primary)" : "var(--line)"}
			stroke-width={a.accent ? 3 : 1.25}
			stroke-linecap="round"
			stroke-dasharray={a.dash}
			transform={`rotate(${a.rotate} ${cx} ${cy})`}
			class="ring"
			style={styleText({ "--dash": a.dash.replace(" ", "px ") + "px", "--c": `${(2 * Math.PI * a.r).toFixed(2)}px`, "--start": `${a.accent ? 34 : 4 + i * 2.5}%`, "--end": `${a.accent ? 46 : 22 + i * 2.5}%` })}
		/>
		{#if a.end}<circle cx={a.end[0]} cy={a.end[1]} r="7" fill="var(--primary)" class="dot" />{/if}
	{/each}
</svg>

<style>
	@supports (animation-timeline: view()) {
		@media (prefers-reduced-motion: no-preference) {
			[data-slot="scroll-rings"] {
				view-timeline-name: --rings;
			}
			.ring {
				animation: ring-draw linear both;
				animation-timeline: --rings;
				animation-range: cover var(--start) cover var(--end);
			}
			.dot {
				animation: dot-in linear both;
				animation-timeline: --rings;
				animation-range: cover 45% cover 48%;
			}
		}
	}
	@keyframes ring-draw {
		from {
			stroke-dasharray: 0px var(--c);
		}
		to {
			stroke-dasharray: var(--dash);
		}
	}
	@keyframes dot-in {
		from {
			opacity: 0;
		}
	}
</style>
