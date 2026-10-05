<!-- Big arcs on the right of a closing band. The same on every site. On the orange band the accent turns dark. -->
<script lang="ts">
	import { cn, styleText } from "$brand/utils.js";

	let { class: className, style, ...rest }: { class?: string; style?: Record<string, string> } & Record<string, unknown> = $props();

	const arcsList = Array.from({ length: 8 }, (_, i) => {
		const r = 60 + i * 44;
		const c = 2 * Math.PI * r;
		const gap = c * (i === 3 ? 0.6 : 0.2);
		return {
			r,
			c,
			gap,
			rotate: 150 + i * 23,
			accent: i === 3,
			attrs: {
				cx: 400,
				cy: 200,
				r,
				fill: "none",
				stroke: i === 3 ? "var(--primary)" : "var(--line)",
				"stroke-width": i === 3 ? 3 : 1.25,
				"stroke-linecap": "round",
				"stroke-dasharray": `${(c - gap).toFixed(2)} ${gap.toFixed(2)}`,
				transform: `rotate(${150 + i * 23} 400 200)`,
			} as Record<string, string | number>,
		};
	});
</script>

<svg data-slot="band-arcs" viewBox="0 0 400 400" aria-hidden="true" class={cn("pointer-events-none absolute top-1/2 -right-[10%] hidden h-[170%] w-auto -translate-y-1/2 md:block", className)} style={styleText(style)} {...rest}>
	{#each arcsList as a (a.r)}
		<circle {...a.attrs} />
	{/each}
</svg>
