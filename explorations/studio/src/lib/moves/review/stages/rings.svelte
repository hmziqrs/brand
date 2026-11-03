<script lang="ts">
	import { cn } from '$brand/utils.js';

	let { class: className }: { class?: string } = $props();

	const sets = [
		{ cx: 104, cy: 18, radii: [14, 20, 26, 32, 38], depth: 1 },
		{ cx: -6, cy: 92, radii: [10, 16, 22, 28], depth: 1.6 }
	];
	const stars = Array.from({ length: 26 }, (_, i) => {
		const a = Math.sin(i * 12.9898) * 43758.5453;
		const b = Math.sin(i * 78.233) * 12345.678;
		return { x: (a - Math.floor(a)) * 100, y: (b - Math.floor(b)) * 100, r: 0.12 + ((a * 7) % 1 + 1) % 1 * 0.16 };
	});

	let host: HTMLDivElement | undefined = $state();
	let mx = $state(0);
	let my = $state(0);

	$effect(() => {
		if (matchMedia('(prefers-reduced-motion: reduce)').matches || !host) return;
		const el = host;
		let raf = 0;
		let tx = 0;
		let ty = 0;
		const on = (e: PointerEvent) => {
			const r = el.getBoundingClientRect();
			tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
			ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
		};
		const loop = () => {
			mx += (tx - mx) * 0.05;
			my += (ty - my) * 0.05;
			raf = requestAnimationFrame(loop);
		};
		addEventListener('pointermove', on, { passive: true });
		raf = requestAnimationFrame(loop);
		return () => {
			removeEventListener('pointermove', on);
			cancelAnimationFrame(raf);
		};
	});
</script>

<div bind:this={host} aria-hidden="true" class={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
	<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" class="absolute inset-0 h-full w-full">
		{#each stars as s, i (i)}
			<circle cx={s.x + mx * 0.4} cy={s.y + my * 0.4} r={s.r} class="fill-foreground/40" />
		{/each}
		{#each sets as set, i (i)}
			<g transform="translate({(-mx * set.depth * 1.2).toFixed(2)} {(-my * set.depth * 1.2).toFixed(2)})">
				{#each set.radii as r, j (r)}
					<circle cx={set.cx} cy={set.cy} {r} fill="none" vector-effect="non-scaling-stroke" stroke-width="1" class={i === 0 && j === 2 ? 'stroke-primary/70' : 'stroke-[var(--line)]'} />
				{/each}
			</g>
		{/each}
	</svg>
</div>
