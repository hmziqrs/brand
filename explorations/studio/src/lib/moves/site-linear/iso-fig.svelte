<script lang="ts">
	import { cn } from '$brand/utils.js';

	let {
		kind,
		fig,
		title,
		body,
		class: className
	}: { kind: 'layers' | 'cluster' | 'bars'; fig: string; title: string; body: string; class?: string } = $props();

	let px = $state(0.5);
	let py = $state(0.5);
	let on = $state(false);

	const C = Math.cos(Math.PI / 6);
	const S = Math.sin(Math.PI / 6);
	const P = (x: number, y: number, z: number) => [(x - y) * C, (x + y) * S - z] as const;
	const poly = (pts: (readonly [number, number])[]) => pts.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');

	function top(x: number, y: number, w: number, d: number, z: number) {
		return poly([P(x, y, z), P(x + w, y, z), P(x + w, y + d, z), P(x, y + d, z)]);
	}
	function left(x: number, y: number, w: number, d: number, z: number, h: number) {
		return poly([P(x, y + d, z), P(x + w, y + d, z), P(x + w, y + d, z - h), P(x, y + d, z - h)]);
	}
	function right(x: number, y: number, w: number, d: number, z: number, h: number) {
		return poly([P(x + w, y, z), P(x + w, y + d, z), P(x + w, y + d, z - h), P(x + w, y, z - h)]);
	}

	const spread = $derived(on ? 6 + (1 - py) * 22 : 9);
	const layers = $derived(Array.from({ length: 6 }, (_, i) => ({ z: i * spread, hot: i === 5 })));

	const cells = [
		[0, 0],
		[1, 0],
		[0, 1],
		[1, 1],
		[2, 1],
		[1, 2]
	];
	const cubes = $derived(
		cells.map(([cx, cy], i) => {
			const sx = 0.2 + (cx / 2) * 0.6;
			const sy = 0.2 + (cy / 2) * 0.6;
			const d = Math.hypot(px - sx, py - sy);
			const lift = on ? Math.max(0, 1 - d * 2.4) * 34 : i === 4 ? 18 : 0;
			return { x: cx * 46, y: cy * 46, lift, hot: on ? lift > 14 : i === 4 };
		})
	);

	const bars = $derived(
		Array.from({ length: 12 }, (_, i) => {
			const t = i / 11;
			const near = on ? Math.max(0, 1 - Math.abs(px - t) * 4) : 0;
			return { x: i * 12, h: 18 + t * 70 + near * 40, hot: on ? near > 0.6 : i === 11 };
		})
	);

	function move(e: PointerEvent) {
		const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
		px = (e.clientX - r.left) / r.width;
		py = (e.clientY - r.top) / r.height;
		on = true;
	}
</script>

<figure
	data-slot="iso-fig"
	class={cn('group flex flex-col gap-5 p-6 md:p-8', className)}
	onpointermove={move}
	onpointerleave={() => (on = false)}
>
	<figcaption class="font-mono text-[11px] tracking-[0.14em] text-primary uppercase">{fig}</figcaption>
	<div class="grid aspect-[4/3] place-items-center">
		<svg viewBox="-150 -150 300 230" class="h-full w-full max-w-[300px] overflow-visible text-foreground/60 [&_*]:transition-all [&_*]:duration-300 motion-reduce:[&_*]:transition-none" aria-hidden="true">
			{#if kind === 'layers'}
				{#each layers as l, i (i)}
					<g style:transform="translate(0px, {40 - l.z}px)">
						<polygon points={left(-60, -60, 120, 120, 0, 6)} class={l.hot ? 'fill-[var(--oxide-deep)]' : 'fill-background'} stroke="currentColor" stroke-width="1" />
						<polygon points={right(-60, -60, 120, 120, 0, 6)} class={l.hot ? 'fill-[var(--oxide-deep)]' : 'fill-background'} stroke="currentColor" stroke-width="1" />
						<polygon points={top(-60, -60, 120, 120, 0)} class={l.hot ? 'fill-primary' : 'fill-background'} stroke="currentColor" stroke-width="1" />
					</g>
				{/each}
				<g style:transform="translate(0px, {40 - 5 * spread}px)" class="text-primary-foreground">
					{#each [18, 30, 42] as r (r)}
						<ellipse cx="0" cy="0" rx={r * C * 1.2} ry={r * S * 1.2} fill="none" stroke="currentColor" stroke-width="0.8" opacity="0.7" />
					{/each}
				</g>
			{:else if kind === 'cluster'}
				{#each cubes as c, i (i)}
					<g style:transform="translate(-40px, {20 - c.lift}px)">
						<polygon points={left(c.x, c.y, 40, 40, 40, 40)} class={c.hot ? 'fill-[var(--oxide-deep)]' : 'fill-background'} stroke="currentColor" stroke-width="1" />
						<polygon points={right(c.x, c.y, 40, 40, 40, 40)} class={c.hot ? 'fill-[var(--oxide-ink)]' : 'fill-background'} stroke="currentColor" stroke-width="1" />
						<polygon points={top(c.x, c.y, 40, 40, 40)} class={c.hot ? 'fill-primary' : 'fill-background'} stroke="currentColor" stroke-width="1" />
					</g>
				{/each}
			{:else}
				{#each bars as b, i (i)}
					<g transform="translate(-70 30)">
						<polygon points={left(b.x, 0, 8, 60, b.h, b.h)} class={b.hot ? 'fill-[var(--oxide-deep)]' : 'fill-background'} stroke="currentColor" stroke-width="1" />
						<polygon points={right(b.x, 0, 8, 60, b.h, b.h)} class={b.hot ? 'fill-[var(--oxide-ink)]' : 'fill-background'} stroke="currentColor" stroke-width="1" />
						<polygon points={top(b.x, 0, 8, 60, b.h)} class={b.hot ? 'fill-primary' : 'fill-background'} stroke="currentColor" stroke-width="1" />
					</g>
				{/each}
			{/if}
		</svg>
	</div>
	<div class="flex flex-col gap-1.5">
		<p class="text-xl font-medium tracking-[-0.01em] text-foreground">{title}</p>
		<p class="max-w-[34ch] text-base leading-snug text-foreground/85">{body}</p>
	</div>
</figure>
