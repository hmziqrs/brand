<script lang="ts" module>
	export type IsoTone = 'oxide' | 'steel' | 'ink' | 'patina' | 'glass';
	export type IsoCluster = {
		at: [number, number];
		size: [number, number];
		height?: number;
		lift?: number;
		tone?: IsoTone;
		rust?: boolean;
		bumps?: number;
		label?: string;
	};
</script>

<script lang="ts">
	import { SvelteSet } from 'svelte/reactivity';
	import { cn } from '$brand/utils.js';
	import { hash, rng } from './dot-font';

	const defaults: IsoCluster[] = [
		{ at: [0, 0], size: [9, 9], height: 1, tone: 'steel', rust: true, bumps: 14, label: '64 windows' },
		{ at: [2, -8], size: [3, 3], height: 4, lift: 0, tone: 'oxide', label: 'gpui::App' },
		{ at: [8, -5], size: [2, 3], height: 2, tone: 'patina', label: 'updater' }
	];

	let {
		clusters = defaults,
		tile = 22,
		floor = 7,
		seed = 'gpui-starter',
		labels = true,
		animate = true,
		interactive = true,
		class: className
	}: {
		clusters?: IsoCluster[];
		tile?: number;
		floor?: number;
		seed?: string;
		labels?: boolean;
		animate?: boolean;
		interactive?: boolean;
		class?: string;
	} = $props();

	let svg: SVGSVGElement | undefined = $state();
	let aim = $state<{ i: number; j: number } | null>(null);
	let still = $state(true);
	const touched = new SvelteSet<string>();

	$effect(() => {
		still = matchMedia('(prefers-reduced-motion: reduce)').matches;
	});

	function point(e: PointerEvent) {
		if (!interactive || !svg || e.pointerType === 'touch') return;
		const m = svg.getScreenCTM();
		if (!m) return;
		const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(m.inverse());
		const a = (2 * p.x) / w;
		const b = (4 * (p.y + s * 1.5)) / w;
		const i = (a + b) / 2;
		const j = (b - a) / 2;
		aim = { i, j };
		const key = `${Math.floor(i)}.${Math.floor(j)}`;
		if (!touched.has(key)) touched.add(key);
	}

	const lift = (v: { i: number; j: number }) => {
		if (!aim || still) return 0;
		const d = Math.hypot(v.i + 0.5 - aim.i, v.j + 0.5 - aim.j);
		const r = 2.8;
		return d >= r ? 0 : Math.pow(1 - d / r, 1.4) * s * 2.2;
	};

	type Voxel = { i: number; j: number; k: number; tone: IsoTone; rust: number; key: string };

	const w = $derived(tile);
	const s = $derived(tile * 0.56);

	const project = (i: number, j: number, k: number) => ({ x: (i - j) * (w / 2), y: (i + j) * (w / 4) - k * s });

	const build = $derived.by(() => {
		const random = rng(hash(seed));
		const voxels: Voxel[] = [];
		const tags: { x: number; y: number; text: string; tone: IsoTone }[] = [];
		for (const c of clusters) {
			const [ci, cj] = c.at;
			const [a, b] = c.size;
			const h = c.height ?? 1;
			const lift = c.lift ?? 0;
			const tone = c.tone ?? 'steel';
			const tops = new Map<string, number>();
			for (let di = 0; di < a; di++)
				for (let dj = 0; dj < b; dj++) {
					for (let k = 0; k < h; k++) {
						const d = Math.hypot(di - a * 0.15, dj - b * 0.2) / Math.hypot(a, b);
						voxels.push({ i: ci + di, j: cj + dj, k: lift + k, tone, rust: c.rust ? d * 0.75 + random() * 0.3 : -1, key: `${ci + di}.${cj + dj}.${lift + k}` });
					}
					tops.set(`${di}.${dj}`, h);
				}
			for (let n = 0; n < (c.bumps ?? 0); n++) {
				const di = Math.floor(random() * a);
				const dj = Math.floor(random() * b);
				const k = tops.get(`${di}.${dj}`) ?? h;
				tops.set(`${di}.${dj}`, k + 1);
				const d = Math.hypot(di, dj) / Math.hypot(a, b);
				voxels.push({ i: ci + di, j: cj + dj, k: lift + k, tone, rust: c.rust ? d * 0.75 + random() * 0.3 : -1, key: `${ci + di}.${cj + dj}.${lift + k}` });
			}
			if (c.label) {
				const top = project(ci, cj, lift + h + 1);
				tags.push({ x: top.x, y: top.y - w * 0.2, text: c.label, tone });
			}
		}
		voxels.sort((p, q) => p.i + p.j - (q.i + q.j) || p.k - q.k || p.i - q.i);
		const dots: { x: number; y: number }[] = [];
		const all = clusters.flatMap((c) => [c.at, [c.at[0] + c.size[0], c.at[1] + c.size[1]]]);
		const mi = Math.min(...all.map((p) => p[0])) - floor;
		const xi = Math.max(...all.map((p) => p[0])) + floor;
		const mj = Math.min(...all.map((p) => p[1])) - floor;
		const xj = Math.max(...all.map((p) => p[1])) + floor;
		const ci = (mi + xi) / 2;
		const cj = (mj + xj) / 2;
		const r = Math.max(xi - mi, xj - mj) / 2;
		for (let i = mi; i <= xi; i++)
			for (let j = mj; j <= xj; j++) {
				const d = Math.abs(i - ci) + Math.abs(j - cj);
				if (d <= r && random() < 0.55 - (d / r) * 0.4) dots.push(project(i, j, 0));
			}
		const pts = [...dots, ...voxels.map((v) => project(v.i, v.j, v.k + 1)), ...voxels.map((v) => project(v.i + 1, v.j + 1, v.k))];
		const pad = tile * 1.4;
		const minX = Math.min(...pts.map((p) => p.x)) - pad - w / 2;
		const maxX = Math.max(...pts.map((p) => p.x)) + pad + w / 2;
		const minY = Math.min(...pts.map((p) => p.y), ...tags.map((t) => t.y)) - pad;
		const maxY = Math.max(...pts.map((p) => p.y)) + pad;
		return { voxels, tags, dots, box: `${minX} ${minY} ${maxX - minX} ${maxY - minY}` };
	});

	const faces = (v: Voxel) => {
		const p = project(v.i, v.j, v.k + 1);
		const { x, y } = p;
		const top = `${x},${y} ${x + w / 2},${y + w / 4} ${x},${y + w / 2} ${x - w / 2},${y + w / 4}`;
		const left = `${x - w / 2},${y + w / 4} ${x},${y + w / 2} ${x},${y + w / 2 + s} ${x - w / 2},${y + w / 4 + s}`;
		const right = `${x},${y + w / 2} ${x + w / 2},${y + w / 4} ${x + w / 2},${y + w / 4 + s} ${x},${y + w / 2 + s}`;
		return { top, left, right };
	};
</script>

<svg
	bind:this={svg}
	viewBox={build.box}
	class={cn('iso block h-auto w-full overflow-visible', !animate && 'iso-still', interactive && 'iso-live', className)}
	aria-hidden="true"
	onpointermove={point}
	onpointerleave={() => (aim = null)}
>
	<g class="iso-floor">
		{#each build.dots as d, n (n)}
			<rect x={d.x - 1} y={d.y - 1} width="2" height="2" />
		{/each}
	</g>
	{#each build.voxels as v (v.key)}
		{@const f = faces(v)}
		{@const up = interactive ? lift(v) : 0}
		<g
			class={cn('vox', up > s * 0.7 && 'hot', `t-${v.tone}`, v.rust >= 0 && 'rusting', v.tone === 'steel' && v.rust < 0 && touched.has(`${v.i}.${v.j}`) && 'touched')}
			style:--d="{(v.rust * 2.6).toFixed(2)}s"
			style:transform={interactive ? `translateY(${-up.toFixed(2)}px)` : undefined}
		>
			<polygon class="l" points={f.left} />
			<polygon class="r" points={f.right} />
			<polygon class="t" points={f.top} />
		</g>
	{/each}
	{#if labels}
		{#each build.tags as t (t.text)}
			{@const tw = t.text.length * 6.7 + 16}
			<g class="iso-tag" transform="translate({t.x - tw / 2} {t.y - 22})">
				<line x1={tw / 2} y1="20" x2={tw / 2} y2="34" />
				<rect width={tw} height="20" rx="3" />
				<text x="8" y="14">{t.text}</text>
			</g>
		{/each}
	{/if}
</svg>

<style>
	.iso {
		--steel-t: color-mix(in oklab, var(--foreground) 26%, var(--background));
		--steel-l: color-mix(in oklab, var(--foreground) 15%, var(--background));
		--steel-r: color-mix(in oklab, var(--foreground) 9%, var(--background));
		--ox-t: var(--oxide-vivid);
		--ox-l: color-mix(in oklab, var(--oxide-vivid) 62%, var(--oxide-deep));
		--ox-r: color-mix(in oklab, var(--oxide-deep) 80%, var(--background));
	}
	.iso-floor rect {
		fill: var(--muted-foreground);
		opacity: 0.35;
	}
	.vox polygon {
		stroke: var(--background);
		stroke-width: 0.9;
		stroke-linejoin: round;
	}
	.t-steel .t { fill: var(--steel-t); }
	.t-steel .l { fill: var(--steel-l); }
	.t-steel .r { fill: var(--steel-r); }
	.t-oxide .t { fill: var(--ox-t); }
	.t-oxide .l { fill: var(--ox-l); }
	.t-oxide .r { fill: var(--ox-r); }
	.t-ink .t { fill: var(--foreground); }
	.t-ink .l { fill: color-mix(in oklab, var(--foreground) 70%, var(--background)); }
	.t-ink .r { fill: color-mix(in oklab, var(--foreground) 45%, var(--background)); }
	.t-patina .t { fill: var(--teal); }
	.t-patina .l { fill: color-mix(in oklab, var(--teal) 62%, var(--background)); }
	.t-patina .r { fill: color-mix(in oklab, var(--teal) 34%, var(--background)); }
	.t-glass polygon { fill: color-mix(in oklab, var(--foreground) 4%, transparent); stroke: var(--line); }

	.rusting .t { fill: var(--ox-t); animation: rust-t 1.2s ease-out var(--d) both; }
	.rusting .l { fill: var(--ox-l); animation: rust-l 1.2s ease-out var(--d) both; }
	.rusting .r { fill: var(--ox-r); animation: rust-r 1.2s ease-out var(--d) both; }
	@keyframes rust-t { from { fill: var(--steel-t); } 55% { fill: var(--yellow); } }
	@keyframes rust-l { from { fill: var(--steel-l); } }
	@keyframes rust-r { from { fill: var(--steel-r); } }

	.iso-live .vox {
		transition: transform 260ms cubic-bezier(0.2, 0.7, 0.1, 1);
	}
	.hot .t { fill: color-mix(in oklab, var(--yellow) 55%, var(--ox-t)); }
	.t-ink.hot .t { fill: var(--foreground); }
	.t-patina.hot .t { fill: color-mix(in oklab, var(--teal) 60%, white); }
	.touched .t { fill: var(--ox-t); transition: fill 600ms; }
	.touched .l { fill: var(--ox-l); transition: fill 600ms; }
	.touched .r { fill: var(--ox-r); transition: fill 600ms; }
	.iso-tag rect {
		fill: var(--background);
		stroke: var(--line);
	}
	.iso-tag line {
		stroke: var(--muted-foreground);
		stroke-dasharray: 2 2;
	}
	.iso-tag text {
		font-family: var(--font-mono);
		font-size: 11px;
		fill: var(--foreground);
	}
	.iso-still .rusting polygon { animation: none; }
	@media (prefers-reduced-motion: reduce) {
		.rusting polygon { animation: none; }
		.iso-live .vox { transition: none; }
	}
</style>
