<!-- Half rings rising from a horizon around a sun in the accent color. Asleep, the sun goes out
     and a few stars come up; only colors change between the two. -->
<script lang="ts">
	import { cn, styleText } from "$brand/utils.js";
	import { hash, rng } from "@hmziq/brand-core/motion/rings";
	import { horizonArcs } from "@hmziq/brand-core/motion/ring-shapes";

	let {
		seed,
		awake = true,
		label,
		/** Light runs out through the rings every few seconds while awake. Still for reduced motion. */
		ripple = false,
		paused = false,
		class: className,
		...rest
	}: {
		seed: string;
		awake?: boolean;
		label?: string;
		ripple?: boolean;
		paused?: boolean;
		class?: string;
	} & Record<string, unknown> = $props();

	const cx = 300;
	const cy = 262;
	const arcs = $derived(horizonArcs(seed, { cx, cy, radii: Array.from({ length: 10 }, (_, i) => 46 + i * 24), accent: 2 }));
	const stars = $derived.by(() => {
		const random = rng(hash(seed) + 71);
		return Array.from({ length: 14 }, () => ({ x: 30 + random() * 540, y: 18 + random() * 150, r: 0.8 + random() * 1.3 }));
	});
	const uid = $props.id();
	const glowId = `horizon-glow-${uid}`;
	const name = $derived(label ?? (awake ? "A sun rising over the horizon, with rings of light around it" : "The sun set below the horizon, with stars out"));
</script>

<svg
	data-slot="horizon-rings"
	data-awake={awake || undefined}
	data-ripple={(ripple && awake) || undefined}
	data-paused={paused || undefined}
	viewBox="0 0 600 320"
	role="img"
	aria-label={name}
	class={cn("h-auto w-full", className)}
	{...rest}
>
	<defs>
		<radialGradient id={glowId} cx={cx} cy={cy} r="230" gradientUnits="userSpaceOnUse">
			<stop offset="0" style="stop-color: var(--primary); stop-opacity: 0.45" />
			<stop offset="0.45" style="stop-color: var(--primary); stop-opacity: 0.12" />
			<stop offset="1" style="stop-color: var(--primary); stop-opacity: 0" />
		</radialGradient>
	</defs>
	<rect class="sky" x="0" y="0" width="600" height={cy} fill={`url(#${glowId})`} />
	{#each stars as s, i (i)}
		<circle class="star" cx={s.x} cy={s.y} r={s.r} fill="var(--foreground)" />
	{/each}
	{#each arcs as arc, i (arc.r)}
		<g class={arc.accent ? "path" : "arc"} style={styleText({ "--i": `${i}` })}>
			{#each arc.segments as d, j (j)}
				<path {d} fill="none" stroke-width={arc.accent ? 2.5 : 1.25} stroke-linecap="round" />
			{/each}
			{#if arc.end}<circle class="dot" cx={arc.end[0]} cy={arc.end[1]} r="5.5" />{/if}
		</g>
	{/each}
	<path class="sun" d={`M${cx - 30} ${cy}A30 30 0 0 1 ${cx + 30} ${cy}Z`} stroke-width="1.5" />
	<line x1="16" y1={cy} x2="584" y2={cy} stroke="var(--foreground)" stroke-opacity="0.35" stroke-width="1" />
	{#each [64, 44, 28, 14] as w, i (w)}
		<line class="glint" x1={cx - w} y1={cy + 12 + i * 10} x2={cx + w} y2={cy + 12 + i * 10} stroke-width="1.5" stroke-linecap="round" style={styleText({ "--i": `${i}` })} />
	{/each}
</svg>

<style>
	[data-slot="horizon-rings"] :is(path, circle, line, rect) {
		transition: stroke 0.8s ease, fill 0.8s ease, opacity 0.8s ease, stroke-opacity 0.8s ease;
	}
	.arc path {
		stroke: var(--line);
	}
	.path path {
		stroke: var(--line);
	}
	.dot {
		fill: var(--line);
	}
	.sun {
		fill: transparent;
		stroke: var(--line);
	}
	.glint {
		stroke: var(--line);
		opacity: 0.6;
	}
	.star {
		opacity: 0.55;
	}
	.sky {
		opacity: 0;
	}
	[data-awake] .sky {
		opacity: 1;
	}
	[data-awake] .path path {
		stroke: var(--primary);
	}
	[data-awake] .dot,
	[data-awake] .sun {
		fill: var(--primary);
		stroke: var(--primary);
	}
	[data-awake] .glint {
		stroke: var(--primary);
		opacity: calc(0.7 - var(--i) * 0.15);
	}
	[data-awake] .star {
		opacity: 0;
	}
	[data-ripple] .arc path {
		animation: horizon-ripple 7s linear infinite;
		animation-delay: calc(var(--i) * 0.14s);
	}
	[data-paused] .arc path {
		animation-play-state: paused;
	}
	@keyframes horizon-ripple {
		0%,
		22%,
		100% {
			stroke: var(--line);
		}
		10% {
			stroke: color-mix(in oklab, var(--primary) 85%, transparent);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		[data-ripple] .arc path {
			animation: none;
		}
	}
</style>
