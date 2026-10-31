<script lang="ts">
	import { cn } from '$brand/utils.js';

	let {
		points = 70,
		seed = 11,
		tilt = 18,
		class: className
	}: {
		points?: number;
		seed?: number;
		tilt?: number;
		class?: string;
	} = $props();

	const R = 200;
	const C = 220;

	const rand = (s: number) => {
		let a = s >>> 0;
		return () => {
			a = (a + 0x6d2b79f5) >>> 0;
			let t = Math.imul(a ^ (a >>> 15), a | 1);
			t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
			return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
		};
	};
	const dots = $derived.by(() => {
		const r = rand(seed);
		return Array.from({ length: points }, () => ({ lat: Math.asin(r() * 2 - 1), lon: r() * Math.PI * 2, s: r() > 0.85 ? 7 : 4 }));
	});

	let spin = $state(0);
	let pull = $state(0);
	let lean = $state(0);
	let host: SVGSVGElement | undefined = $state();

	$effect(() => {
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		let raf = 0;
		let last = performance.now();
		const tick = (t: number) => {
			spin += (t - last) * 0.00012;
			last = t;
			raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	});

	const move = (e: PointerEvent) => {
		if (!host) return;
		const r = host.getBoundingClientRect();
		pull = ((e.clientX - r.left) / r.width - 0.5) * 1.6;
		lean = ((e.clientY - r.top) / r.height - 0.5) * 0.5;
	};

	const rot = $derived(spin + pull);
	const tl = $derived((tilt * Math.PI) / 180 + lean);
	const meridians = $derived(Array.from({ length: 9 }, (_, i) => Math.abs(Math.sin((i / 9) * Math.PI + rot)) * R));
	const parallels = [-60, -30, 0, 30, 60].map((d) => (d * Math.PI) / 180);
	const projected = $derived(
		dots.map((p) => {
			const x = Math.cos(p.lat) * Math.sin(p.lon + rot);
			const y = Math.sin(p.lat);
			const z = Math.cos(p.lat) * Math.cos(p.lon + rot);
			const y2 = y * Math.cos(tl) - z * Math.sin(tl);
			const z2 = y * Math.sin(tl) + z * Math.cos(tl);
			return { x: C + x * R, y: C - y2 * R, z: z2, s: p.s };
		})
	);
</script>

<svg
	bind:this={host}
	onpointermove={move}
	onpointerleave={() => ((pull = 0), (lean = 0))}
	viewBox="0 0 440 440"
	class={cn('block w-full', className)}
	role="img"
	aria-label="A turning globe of customer signals"
>
	<g>
		<circle cx={C} cy={C} r={R} fill="none" stroke="color-mix(in oklab, var(--foreground) 30%, transparent)" stroke-width="1.25" />
		{#each meridians as rx, i (i)}
			<ellipse cx={C} cy={C} {rx} ry={R} fill="none" stroke="color-mix(in oklab, var(--foreground) 16%, transparent)" stroke-width="1.25" />
		{/each}
		{#each parallels as la, i (i)}
			<ellipse cx={C} cy={C - Math.sin(la) * R * Math.cos(tl)} rx={Math.cos(la) * R} ry={Math.cos(la) * R * Math.abs(Math.sin(tl))} fill="none" stroke="color-mix(in oklab, var(--foreground) 16%, transparent)" stroke-width="1.25" />
		{/each}
	</g>
	{#each projected as p, i (i)}
		{#if p.z > -0.15}
			<rect x={p.x - p.s / 2} y={p.y - p.s / 2} width={p.s} height={p.s} fill={p.s > 5 ? 'var(--primary)' : 'var(--foreground)'} opacity={Math.max(0.12, (p.z + 0.15) * 0.95)} />
		{/if}
	{/each}
</svg>
