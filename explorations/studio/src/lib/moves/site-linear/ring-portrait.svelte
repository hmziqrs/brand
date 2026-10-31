<script lang="ts">
	import { cn } from '$brand/utils.js';

	let { seed, active = false, class: className }: { seed: string; active?: boolean; class?: string } = $props();

	function hash(s: string) {
		let h = 2166136261;
		for (const c of s) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
		return h >>> 0;
	}

	const rings = $derived.by(() => {
		let a = hash(seed);
		const rnd = () => {
			a = (a + 0x6d2b79f5) >>> 0;
			let t = Math.imul(a ^ (a >>> 15), a | 1);
			t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
			return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
		};
		const accent = 2 + Math.floor(rnd() * 4);
		return Array.from({ length: 8 }, (_, i) => {
			const r = 10 + i * 10;
			const c = 2 * Math.PI * r;
			const gap = 0.08 + rnd() * 0.3;
			return { r, dash: `${c * (1 - gap)} ${c * gap}`, rot: rnd() * 360, accent: i === accent };
		});
	});
</script>

<svg viewBox="-90 -90 180 180" aria-hidden="true" class={cn('h-full w-full', className)}>
	{#each rings as ring (ring.r)}
		<circle
			r={ring.r}
			fill="none"
			stroke-width="1"
			stroke-dasharray={ring.dash}
			stroke-linecap="round"
			class={cn('[transform-origin:0px_0px] transition-transform duration-700 motion-reduce:transition-none', ring.accent ? 'stroke-primary' : 'stroke-foreground/45')}
			style:transform="rotate({ring.rot + (active ? (ring.accent ? 140 : -40 + ring.r) : 0)}deg)"
		/>
	{/each}
	{#each rings.filter((r) => r.accent) as ring (ring.r)}
		<circle cx={ring.r * Math.cos(((ring.rot + (active ? 140 : 0)) * Math.PI) / 180)} cy={ring.r * Math.sin(((ring.rot + (active ? 140 : 0)) * Math.PI) / 180)} r="3" class="fill-primary transition-all duration-700 motion-reduce:transition-none" />
	{/each}
</svg>
