<script lang="ts" module>
	export type RingNode = { x: number; y: number; label: string };
</script>

<script lang="ts">
	import { cn } from '$brand/utils.js';
	import { prefersReduced } from '$moves/northflank/dot-font';

	const defaults: RingNode[] = [
		{ x: 300, y: 120, label: 'control plane' },
		{ x: 170, y: 260, label: 'eu-west · aws' },
		{ x: 395, y: 215, label: 'us-east · gcp' },
		{ x: 545, y: 345, label: 'on-prem' },
		{ x: 285, y: 420, label: 'air-gapped' }
	];

	let {
		nodes = defaults,
		links = [
			[0, 1],
			[0, 2],
			[2, 3],
			[1, 4],
			[0, 4]
		],
		centers = [
			{ x: 300, y: 120, rings: 9 },
			{ x: 610, y: 470, rings: 7 }
		],
		class: className
	}: {
		nodes?: RingNode[];
		links?: number[][];
		centers?: { x: number; y: number; rings: number }[];
		class?: string;
	} = $props();

	const VW = 640;
	const VH = 520;
	let svg: SVGSVGElement | undefined = $state();
	let px = $state(VW / 2);
	let py = $state(VH / 2);
	let on = $state(false);
	let sx = $state(0);
	let sy = $state(0);

	const near = $derived.by(() => {
		if (!on) return -1;
		let best = -1;
		let d = 90;
		nodes.forEach((n, k) => {
			const e = Math.hypot(n.x - px, n.y - py);
			if (e < d) {
				d = e;
				best = k;
			}
		});
		return best;
	});

	$effect(() => {
		const el = svg;
		if (!el) return;
		const reduced = prefersReduced();
		let raf = 0;
		let tx = 0;
		let ty = 0;
		const loop = () => {
			sx += (tx - sx) * 0.08;
			sy += (ty - sy) * 0.08;
			raf = Math.abs(tx - sx) + Math.abs(ty - sy) > 0.05 ? requestAnimationFrame(loop) : 0;
		};
		const move = (e: PointerEvent) => {
			const r = el.getBoundingClientRect();
			px = ((e.clientX - r.left) / r.width) * VW;
			py = ((e.clientY - r.top) / r.height) * VH;
			on = true;
			if (reduced) return;
			tx = (px - VW / 2) * 0.06;
			ty = (py - VH / 2) * 0.06;
			if (!raf) raf = requestAnimationFrame(loop);
		};
		const leave = () => {
			on = false;
			tx = 0;
			ty = 0;
			if (!reduced && !raf) raf = requestAnimationFrame(loop);
		};
		el.addEventListener('pointermove', move);
		el.addEventListener('pointerleave', leave);
		return () => {
			cancelAnimationFrame(raf);
			el.removeEventListener('pointermove', move);
			el.removeEventListener('pointerleave', leave);
		};
	});

	const cube = (x: number, y: number, s: number) => {
		const h = s * 0.58;
		return {
			top: `${x},${y - s / 2} ${x + s / 2},${y - s / 4} ${x},${y} ${x - s / 2},${y - s / 4}`,
			left: `${x - s / 2},${y - s / 4} ${x},${y} ${x},${y + h} ${x - s / 2},${y - s / 4 + h}`,
			right: `${x},${y} ${x + s / 2},${y - s / 4} ${x + s / 2},${y - s / 4 + h} ${x},${y + h}`
		};
	};
	const lit = (a: number, b: number) => near >= 0 && (a === near || b === near);
</script>

<svg bind:this={svg} viewBox="0 0 {VW} {VH}" class={cn('ring-node block h-auto w-full touch-pan-y select-none', className)} role="img" aria-label="Clusters in several clouds linked to one control plane">
	<defs>
		<radialGradient id="rnf-glow">
			<stop offset="0" stop-color="var(--orange)" stop-opacity="0.35" />
			<stop offset="1" stop-color="var(--orange)" stop-opacity="0" />
		</radialGradient>
	</defs>
	{#each centers as c, ci (ci)}
		<g transform="translate({sx * (ci + 1)} {sy * (ci + 1)})">
			{#each Array(c.rings) as _, k (k)}
				<circle cx={c.x} cy={c.y} r={34 + k * 30} fill="none" stroke="var(--line)" stroke-width="1" stroke-dasharray={k % 2 ? '2 5' : 'none'} class="rr" style:--k={k} />
			{/each}
		</g>
	{/each}
	{#if on}
		<circle cx={px} cy={py} r="90" fill="url(#rnf-glow)" />
		<circle cx={px} cy={py} r="46" fill="none" stroke="var(--orange)" stroke-width="1" opacity="0.6" />
	{/if}
	<g transform="translate({sx * 0.5} {sy * 0.5})">
		{#each links as [a, b] (`${a}-${b}`)}
			<line x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} stroke={lit(a, b) ? 'var(--orange)' : 'var(--muted-foreground)'} stroke-width="1" stroke-dasharray={lit(a, b) ? 'none' : '3 4'} opacity={lit(a, b) ? 1 : 0.6} />
		{/each}
		{#each nodes as n, k (n.label)}
			{@const s = k === 0 ? 34 : 26}
			{@const f = cube(n.x, n.y, s)}
			<g class={cn('node', k === near && 'hot')}>
				<polygon points={f.left} class="l" />
				<polygon points={f.right} class="r" />
				<polygon points={f.top} class="t" />
				<rect x={n.x - 4} y={n.y - s / 4 - 3} width="8" height="6" rx="1" class="led" />
				<g transform="translate({n.x} {n.y + s * 0.58 + 16})">
					<rect x={-(n.label.length * 3.4 + 8)} y="-11" width={n.label.length * 6.8 + 16} height="18" rx="3" class="tag" />
					<text text-anchor="middle" y="2" class="tx">{n.label}</text>
				</g>
			</g>
		{/each}
	</g>
</svg>

<style>
	.node .t { fill: color-mix(in oklab, var(--foreground) 22%, var(--background)); }
	.node .l { fill: color-mix(in oklab, var(--foreground) 12%, var(--background)); }
	.node .r { fill: color-mix(in oklab, var(--foreground) 7%, var(--background)); }
	.node polygon { stroke: var(--line); stroke-width: 0.8; transition: fill 0.25s; }
	.node .led { fill: var(--orange); }
	.node.hot .t { fill: var(--oxide-vivid); }
	.node.hot .l { fill: color-mix(in oklab, var(--oxide-vivid) 62%, var(--oxide-deep)); }
	.node.hot .r { fill: var(--oxide-deep); }
	.node.hot .led { fill: var(--yellow); }
	.tag { fill: var(--background); stroke: var(--line); }
	.node.hot .tag { stroke: var(--orange); }
	.tx { font-family: var(--font-mono); font-size: 10.5px; fill: var(--foreground); }
	.rr { animation: breathe 6s ease-in-out infinite; animation-delay: calc(var(--k) * -0.6s); transform-box: fill-box; transform-origin: center; }
	@keyframes breathe { 50% { opacity: 0.45; } }
	@media (prefers-reduced-motion: reduce) {
		.rr { animation: none; }
		.node polygon { transition: none; }
	}
</style>
