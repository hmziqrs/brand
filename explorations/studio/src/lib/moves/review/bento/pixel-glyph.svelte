<script lang="ts">
	import { cn } from '$brand/utils.js';
	import { mountCanvas, onThemeChange, readColor, rgba, trackPointer, type RGB } from '@hmziq/brand-core/motion/canvas';

	let {
		glyph,
		label,
		cell = 6,
		gap = 2,
		reach = 56,
		class: className
	}: {
		glyph: string[];
		label: string;
		cell?: number;
		gap?: number;
		reach?: number;
		class?: string;
	} = $props();

	const pad = 6;
	const cols = $derived(Math.max(...glyph.map((r) => r.length)));
	const rows = $derived(glyph.length);
	const pitch = $derived(cell + gap);
	const width = $derived(cols * pitch - gap + pad * 2);
	const height = $derived(rows * pitch - gap + pad * 2);

	let canvas: HTMLCanvasElement | undefined = $state();

	const mix = (a: RGB, b: RGB, k: number): RGB => [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k];

	$effect(() => {
		if (!canvas) return;
		const c = canvas;
		const g = glyph;
		const n = { cols, rows, pitch, cell, gap, reach };
		const heat = new Float32Array(n.cols * n.rows);
		const read = () => ({ fg: readColor(c, 'var(--foreground)'), ox: readColor(c, 'var(--mark-square)') });
		let colors = read();
		const pointer = trackPointer(c);
		const view = mountCanvas(c, {
			animate: true,
			draw: ({ ctx, w, h, t, dt }) => {
				pointer.step(dt, w, h, t, false, 14);
				ctx.clearRect(0, 0, w, h);
				const ox = (w - (n.cols * n.pitch - n.gap)) / 2;
				const oy = (h - (n.rows * n.pitch - n.gap)) / 2;
				const near = pointer.p.inside;
				for (let y = 0; y < n.rows; y++) {
					const row = g[y] ?? '';
					for (let x = 0; x < n.cols; x++) {
						const ch = row[x] ?? '.';
						const i = y * n.cols + x;
						const cx = ox + x * n.pitch + n.cell / 2;
						const cy = oy + y * n.pitch + n.cell / 2;
						const d = near ? Math.hypot(pointer.p.x - cx, pointer.p.y - cy) : Infinity;
						const target = d < n.reach ? 1 - d / n.reach : 0;
						const rate = target > heat[i] ? 16 : 2.4;
						heat[i] += (target - heat[i]) * (dt ? 1 - Math.exp(-dt * rate) : 1);
						const k = heat[i];
						let color: RGB;
						let alpha = 1;
						let s = n.cell * (1 + 0.32 * k);
						if (ch === '#') color = mix(colors.fg, colors.ox, Math.min(1, k * 1.4));
						else if (ch === 'o') color = colors.ox;
						else if (ch === '+') {
							color = mix(colors.fg, colors.ox, k);
							alpha = 0.25 + k * 0.55;
						} else {
							if (k < 0.04) continue;
							color = colors.ox;
							alpha = k * 0.4;
							s = n.cell * 0.55 * k;
						}
						ctx.fillStyle = rgba(color, alpha);
						ctx.fillRect(cx - s / 2, cy - s / 2, s, s);
					}
				}
			}
		});
		const stopTheme = onThemeChange(() => {
			colors = read();
			view.redraw();
		});
		return () => {
			view.destroy();
			pointer.destroy();
			stopTheme();
		};
	});
</script>

<span role="img" aria-label={label} class={cn('block shrink-0', className)} style:width={`${width}px`} style:height={`${height}px`} style:margin={`-${pad}px`}>
	<canvas bind:this={canvas} aria-hidden="true" class="block h-full w-full"></canvas>
</span>
