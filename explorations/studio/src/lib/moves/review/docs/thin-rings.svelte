<script lang="ts">
	import { arcs, hash, rng } from '@hmziq/brand-core/motion/rings';
	import RingCircles from '$brand/components/ring-circles.svelte';
	import { cn } from '$brand/utils.js';

	let { seed, class: className }: { seed: string; class?: string } = $props();

	const list = $derived.by(() => {
		const random = rng(hash(seed) + 7);
		const accent = 3 + Math.floor(random() * 3);
		return arcs(random, { cx: 440, cy: 225, radii: Array.from({ length: 11 }, (_, i) => 34 + i * 34), accent, accentGap: 0.52, gap: [0.06, 0.3] });
	});
</script>

<svg viewBox="0 0 520 440" aria-hidden="true" class={cn('h-auto w-full', className)}>
	<RingCircles {list} cx={440} cy={225} color="var(--primary)" width={[1.25, 1.25]} dot={5} />
</svg>
