<script lang="ts" module>
	export type VoxTone = 'oxide' | 'steel' | 'ink' | 'patina' | 'glass';
	export type VoxBlock = {
		at: [number, number];
		size: [number, number];
		height?: number;
		tone?: VoxTone;
		label?: string;
		live?: boolean;
	};
</script>

<script lang="ts">
	import { cn } from '$brand/utils.js';
	import { onThemeChange, prefersReduced } from '$moves/northflank/dot-font';

	const defaults: VoxBlock[] = [
		{ at: [0, 4], size: [8, 8], height: 1, tone: 'oxide', live: true, label: '64 sandboxes' },
		{ at: [2, -6], size: [3, 2], height: 6, tone: 'ink', label: 'prod-checkout-api' },
		{ at: [9, -3], size: [2, 2], height: 3, tone: 'patina', label: 'prod-postgres' },
		{ at: [10, 5], size: [4, 4], height: 0, tone: 'glass', label: 'pr-1284 preview' }
	];

	let {
		blocks = defaults,
		tile = 26,
		floor = 2,
		reach = 2.6,
		rise = 3.2,
		count = 10233998,
		countLabel = 'workloads running',
		legend = [
			{ tone: 'oxide', label: 'sandbox' },
			{ tone: 'ink', label: 'service' },
			{ tone: 'patina', label: 'database' },
			{ tone: 'glass', label: 'preview' }
		],
		class: className
	}: {
		blocks?: VoxBlock[];
		tile?: number;
		floor?: number;
		reach?: number;
		rise?: number;
		count?: number;
		countLabel?: string;
		legend?: { tone: VoxTone; label: string }[];
		class?: string;
	} = $props();

	type Col = { i: number; j: number; base: number; h: number; tone: VoxTone; live: boolean; block: number };

	let host: HTMLDivElement | undefined = $state();
	let canvas: HTMLCanvasElement | undefined = $state();
	let probe: HTMLSpanElement | undefined = $state();
	let tags = $state<{ x: number; y: number; text: string; block: number }[]>([]);
	let hover = $state(-1);
	let total = $state(0);
	let spawned = $state(0);

	$effect(() => {
		total = count;
	});

	$effect(() => {
		const c = canvas;
		const el = host;
		const pr = probe;
		if (!c || !el || !pr) return;
		const ctx = c.getContext('2d');
		if (!ctx) return;
		const reduced = prefersReduced();
		const w = tile;
		const s = tile * 0.56;
		const list = blocks;
		const R = reach;
		const RISE = rise;

		const cols: Col[] = [];
		list.forEach((b, n) => {
			for (let di = 0; di < b.size[0]; di++)
				for (let dj = 0; dj < b.size[1]; dj++) {
					const base = b.height ?? 1;
					cols.push({ i: b.at[0] + di, j: b.at[1] + dj, base, h: base, tone: b.tone ?? 'steel', live: !!b.live, block: n });
				}
		});
		cols.sort((a, b) => a.i + a.j - (b.i + b.j) || a.i - b.i);

		const pts = list.flatMap((b) => [b.at, [b.at[0] + b.size[0], b.at[1] + b.size[1]]]);
		const mi = Math.min(...pts.map((p) => p[0])) - floor;
		const xi = Math.max(...pts.map((p) => p[0])) + floor;
		const mj = Math.min(...pts.map((p) => p[1])) - floor;
		const xj = Math.max(...pts.map((p) => p[1])) + floor;
		const dots: [number, number][] = [];
		const ci = (mi + xi) / 2;
		const cj = (mj + xj) / 2;
		const rad = Math.max(xi - mi, xj - mj) / 2;
		for (let i = mi; i <= xi; i++)
			for (let j = mj; j <= xj; j++) {
				const d = Math.abs(i - ci) + Math.abs(j - cj);
				if (d <= rad) dots.push([i, j]);
			}

		const proj = (i: number, j: number, k: number) => ({ x: (i - j) * (w / 2), y: (i + j) * (w / 4) - k * s });
		const maxH = Math.max(...list.map((b) => (b.height ?? 1) + (b.live ? RISE : 0))) + 2;
		const corners = [proj(mi, xj, 0), proj(xi, mj, 0), proj(mi, mj, maxH), proj(xi, xj, 0)];
		const bx0 = Math.min(...corners.map((p) => p.x)) - w * 0.4;
		const bx1 = Math.max(...corners.map((p) => p.x)) + w * 0.4;
		const by0 = Math.min(...corners.map((p) => p.y)) - w * 0.5;
		const by1 = Math.max(...corners.map((p) => p.y)) + w * 0.3;

		let scale = 1;
		let ox = 0;
		let oy = 0;
		let dpr = 1;
		let colors: Record<string, string> = {};

		const read = () => {
			const get = (v: string) => {
				pr.style.color = v;
				return getComputedStyle(pr).color;
			};
			colors = {
				oxide: get('var(--oxide-vivid)'),
				deep: get('var(--oxide-deep)'),
				steel: get('color-mix(in oklab, var(--foreground) 24%, var(--background))'),
				ink: get('var(--foreground)'),
				patina: get('var(--teal)'),
				glass: get('color-mix(in oklab, var(--foreground) 5%, transparent)'),
				bg: get('var(--background)'),
				line: get('color-mix(in oklab, var(--foreground) 34%, transparent)'),
				hot: get('var(--yellow)'),
				dot: get('var(--muted-foreground)')
			};
		};

		const fit = () => {
			dpr = Math.min(2, window.devicePixelRatio || 1);
			const W = Math.max(1, c.clientWidth);
			const H = Math.max(1, c.clientHeight);
			c.width = Math.round(W * dpr);
			c.height = Math.round(H * dpr);
			scale = Math.min(W / (bx1 - bx0), H / (by1 - by0));
			ox = (W - (bx1 - bx0) * scale) / 2 - bx0 * scale;
			oy = (H - (by1 - by0) * scale) / 2 - by0 * scale;
			tags = list
				.map((b, n) => {
					if (!b.label) return null;
					const top = proj(b.at[0], b.at[1], (b.height ?? 1) + (b.live ? 1.4 : 0.6));
					return { x: ox + top.x * scale, y: oy + top.y * scale, text: b.label, block: n };
				})
				.filter((t): t is { x: number; y: number; text: string; block: number } => !!t);
		};

		const pointer = { x: 0, y: 0, on: false, gi: -99, gj: -99 };
		let hov = -1;
		const ripples: { i: number; j: number; t: number }[] = [];

		const toGrid = (px: number, py: number, k: number) => {
			const sx = (px - ox) / scale;
			const sy = (py - oy) / scale + k * s;
			const a = (2 * sx) / w;
			const b2 = (4 * sy) / w;
			return { i: (a + b2) / 2, j: (b2 - a) / 2 };
		};

		const poly = (p: number[][]) => {
			ctx.beginPath();
			ctx.moveTo(p[0][0], p[0][1]);
			for (let n = 1; n < p.length; n++) ctx.lineTo(p[n][0], p[n][1]);
			ctx.closePath();
		};

		const shade = (fill: string, dark: number, light: number) => {
			ctx.fillStyle = fill;
			ctx.fill();
			if (dark > 0) {
				ctx.globalAlpha = dark;
				ctx.fillStyle = '#000';
				ctx.fill();
				ctx.globalAlpha = 1;
			}
			if (light > 0) {
				ctx.globalAlpha = light;
				ctx.fillStyle = colors.hot;
				ctx.fill();
				ctx.globalAlpha = 1;
			}
		};

		const draw = (time: number) => {
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.clearRect(0, 0, c.width, c.height);
			ctx.setTransform(dpr * scale, 0, 0, dpr * scale, dpr * ox, dpr * oy);
			const t = time / 1000;

			ctx.fillStyle = colors.dot;
			for (const [i, j] of dots) {
				const p = proj(i, j, 0);
				const near = pointer.on ? Math.exp(-((i - pointer.gi) ** 2 + (j - pointer.gj) ** 2) / 10) : 0;
				ctx.globalAlpha = 0.28 + near * 0.6;
				const r = 1.1 + near * 1.2;
				ctx.fillRect(p.x - r, p.y - r, r * 2, r * 2);
			}
			ctx.globalAlpha = 1;

			for (const col of cols) {
				if (col.live && !reduced) {
					let target = col.base;
					if (pointer.on) {
						const d2 = (col.i + 0.5 - pointer.gi) ** 2 + (col.j + 0.5 - pointer.gj) ** 2;
						target += RISE * Math.exp(-d2 / (R * R));
					} else {
						target += 0.35 * (1 + Math.sin(t * 1.4 + col.i * 0.7 + col.j * 0.45));
					}
					for (const r of ripples) {
						const age = t - r.t;
						const d = Math.hypot(col.i + 0.5 - r.i, col.j + 0.5 - r.j);
						const front = age * 7;
						target += 1.6 * Math.exp(-((d - front) ** 2) / 1.4) * Math.max(0, 1 - age / 1.6);
					}
					col.h += (target - col.h) * 0.16;
				} else if (!col.live) {
					const lifted = hov === col.block && col.tone !== 'glass' ? col.base + 0.5 : col.base;
					col.h += (lifted - col.h) * (reduced ? 1 : 0.14);
				}
				const { i, j } = col;
				const h = col.h;
				const top = proj(i, j, h);
				const x = top.x;
				const y = top.y;
				const hs = h * s;
				const tp = [[x, y], [x + w / 2, y + w / 4], [x, y + w / 2], [x - w / 2, y + w / 4]];
				const lf = [[x - w / 2, y + w / 4], [x, y + w / 2], [x, y + w / 2 + hs], [x - w / 2, y + w / 4 + hs]];
				const rt = [[x, y + w / 2], [x + w / 2, y + w / 4], [x + w / 2, y + w / 4 + hs], [x, y + w / 2 + hs]];
				ctx.lineWidth = 0.9;
				ctx.lineJoin = 'round';
				if (col.tone === 'glass') {
					poly(tp);
					ctx.fillStyle = colors.glass;
					ctx.fill();
					ctx.setLineDash([2, 2]);
					ctx.strokeStyle = hov === col.block ? colors.oxide : colors.line;
					ctx.stroke();
					ctx.setLineDash([]);
					continue;
				}
				const fill = col.tone === 'oxide' ? colors.oxide : col.tone === 'patina' ? colors.patina : col.tone === 'ink' ? colors.ink : colors.steel;
				const heat = col.live ? Math.max(0, Math.min(1, (h - col.base) / RISE)) : 0;
				ctx.strokeStyle = colors.bg;
				if (hs > 0.2) {
					poly(lf);
					shade(fill, col.tone === 'ink' ? 0.32 : 0.26, 0);
					ctx.stroke();
					poly(rt);
					shade(fill, col.tone === 'ink' ? 0.55 : 0.48, 0);
					ctx.stroke();
				}
				poly(tp);
				shade(fill, 0, heat * 0.55);
				ctx.stroke();
			}
			while (ripples.length && t - ripples[0].t > 1.8) ripples.shift();
		};

		read();
		fit();
		let raf = 0;
		let visible = true;
		const loop = (now: number) => {
			raf = 0;
			if (!visible) return;
			draw(now);
			raf = requestAnimationFrame(loop);
		};
		const start = () => {
			if (!raf && !reduced) raf = requestAnimationFrame(loop);
		};
		draw(performance.now());
		start();

		const onMove = (e: PointerEvent) => {
			const r = c.getBoundingClientRect();
			pointer.x = e.clientX - r.left;
			pointer.y = e.clientY - r.top;
			const g = toGrid(pointer.x, pointer.y, 1);
			pointer.gi = g.i;
			pointer.gj = g.j;
			pointer.on = true;
			const f = toGrid(pointer.x, pointer.y, 0);
			let found = -1;
			list.forEach((b, n) => {
				if (b.live) return;
				const lift = toGrid(pointer.x, pointer.y, (b.height ?? 1) * 0.5);
				const hit = (q: { i: number; j: number }) => q.i >= b.at[0] && q.i <= b.at[0] + b.size[0] && q.j >= b.at[1] && q.j <= b.at[1] + b.size[1];
				if (hit(f) || hit(lift)) found = n;
			});
			hov = found;
			hover = found;
			if (reduced) draw(performance.now());
		};
		const onLeave = () => {
			pointer.on = false;
			hov = -1;
			hover = -1;
			if (reduced) draw(performance.now());
		};
		const onDown = (e: PointerEvent) => {
			const r = c.getBoundingClientRect();
			const g = toGrid(e.clientX - r.left, e.clientY - r.top, 1);
			ripples.push({ i: g.i, j: g.j, t: performance.now() / 1000 });
			spawned += 1;
			total += 1;
		};
		el.addEventListener('pointermove', onMove);
		el.addEventListener('pointerleave', onLeave);
		el.addEventListener('pointerdown', onDown);
		const ro = new ResizeObserver(() => {
			fit();
			draw(performance.now());
		});
		ro.observe(c);
		const io = new IntersectionObserver((e) => {
			visible = e.some((x) => x.isIntersecting);
			if (visible) start();
		});
		io.observe(c);
		const off = onThemeChange(() => {
			read();
			draw(performance.now());
		});
		const tick = reduced ? 0 : window.setInterval(() => (total += 1 + Math.floor(Math.random() * 4)), 900);
		return () => {
			cancelAnimationFrame(raf);
			window.clearInterval(tick);
			el.removeEventListener('pointermove', onMove);
			el.removeEventListener('pointerleave', onLeave);
			el.removeEventListener('pointerdown', onDown);
			ro.disconnect();
			io.disconnect();
			off();
		};
	});

	const swatch: Record<VoxTone, string> = {
		oxide: 'bg-orange',
		ink: 'bg-foreground',
		patina: 'bg-teal',
		steel: 'bg-foreground/30',
		glass: 'border border-dashed border-foreground/50'
	};
</script>

<div data-slot="voxel-runtime" class={cn('relative select-none', className)}>
	<div bind:this={host} class="relative aspect-[1.3/1] w-full cursor-crosshair touch-pan-y">
		<canvas bind:this={canvas} class="absolute inset-0 block h-full w-full" aria-hidden="true"></canvas>
		<span bind:this={probe} class="hidden"></span>
		{#each tags as t (t.text)}
			<span
				class={cn(
					'pointer-events-none absolute -translate-x-1/2 -translate-y-full rounded-[4px] border bg-background px-1.5 py-0.5 font-mono text-[10.5px] whitespace-nowrap transition-colors motion-reduce:transition-none',
					hover === t.block ? 'border-orange text-orange' : 'text-foreground'
				)}
				style:left="{t.x}px"
				style:top="{t.y - 6}px">{t.text}</span
			>
		{/each}
	</div>
	<div class="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10.5px] tracking-[0.12em] text-muted-foreground uppercase">
		<span class="text-foreground tabular-nums">{total.toLocaleString('en-US')} <span class="text-muted-foreground">{countLabel}</span></span>
		{#each legend as l (l.label)}
			<span class="flex items-center gap-1.5"><i class={cn('size-2', swatch[l.tone])}></i>{l.label}</span>
		{/each}
		<span class="ml-auto hidden text-foreground/60 sm:inline">{spawned ? `+${spawned} spawned` : 'hover · click to spawn'}</span>
	</div>
</div>
