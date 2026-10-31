<script lang="ts">
	import { mountCanvas, readColor, rgba, rng, trackPointer } from './canvas-kit';
	import { prefs } from '$studio/prefs.svelte';

	let { size = 15, density = 0.42, animate = true }: { size?: number; density?: number; animate?: boolean } = $props();
	let canvas: HTMLCanvasElement | undefined = $state();
	const glyphs = ['■', '□', '▪', '▫', '○', '◦', '●', '◎', '◯', '·'];

	$effect(() => {
		if (!canvas) return;
		void prefs.colorKey;
		const host = canvas.parentElement!;
		const fg = readColor(host, 'var(--foreground)');
		const ox = readColor(host, 'var(--orange)');
		const rand = rng(91);
		const cw = size + 3;
		const ch = size + 5;
		let cols = 0;
		let rows = 0;
		let grid: number[] = [];
		let drops: { y: number; v: number; len: number; on: boolean }[] = [];

		let m: ReturnType<typeof mountCanvas> | undefined;
		const ptr = trackPointer(canvas, () => m?.still && m.redraw());
		const reach = 110;

		m = mountCanvas(canvas, {
			animate,
			setup: ({ w, h }) => {
				cols = Math.ceil(w / cw);
				rows = Math.ceil(h / ch);
				grid = Array.from({ length: cols * rows }, () => Math.floor(rand() * glyphs.length));
				drops = Array.from({ length: cols }, () => ({ y: rand() * rows * 1.4, v: 2.2 + rand() * 4.5, len: 5 + Math.floor(rand() * 12), on: rand() < density }));
			},
			draw: ({ ctx, w, h, t, dt }) => {
				ptr.step(dt, w, h, t, false, 12);
				const { x: px, y: py, inside } = ptr.p;
				const pc = Math.floor(px / cw);
				if (inside && dt && pc >= 0 && pc < cols && !drops[pc].on) {
					drops[pc].on = true;
					drops[pc].y = py / ch;
				}
				ctx.clearRect(0, 0, w, h);
				ctx.font = `${size}px "JetBrains Mono Variable", ui-monospace, monospace`;
				ctx.textAlign = 'center';
				ctx.textBaseline = 'middle';
				if (dt && rand() < 0.5) grid[Math.floor(rand() * grid.length)] = Math.floor(rand() * glyphs.length);
				for (let c = 0; c < cols; c++) {
					const d = drops[c];
					const x = c * cw + cw / 2;
					const near = inside ? Math.max(0, 1 - Math.abs(x - px) / reach) : 0;
					for (let r = 0; r < rows; r += near > 0 ? 1 : 3) {
						const y = r * ch + ch / 2;
						const f = near > 0 ? Math.max(0, 1 - Math.hypot(x - px, y - py) / reach) : 0;
						if (f > 0.02) {
							ctx.fillStyle = rgba(ox, 0.15 + f * 0.85);
							ctx.fillText(glyphs[grid[c + r * cols]], x, y);
						} else if (r % 3 === 0) {
							ctx.fillStyle = rgba(fg, 0.07);
							ctx.fillText('·', x, y);
						}
					}
					if (!d.on) continue;
					d.y += d.v * dt * (1 + near * 2.5);
					if (d.y - d.len > rows) {
						d.y = -rand() * 8;
						d.v = 2.2 + rand() * 4.5;
						d.on = rand() < density + 0.1;
					}
					const head = Math.floor(d.y);
					for (let k = 0; k < d.len; k++) {
						const r = head - k;
						if (r < 0 || r >= rows) continue;
						const g = glyphs[grid[c + r * cols]];
						const y = r * ch + ch / 2;
						if (k === 0) {
							ctx.fillStyle = rgba(ox, 1);
							ctx.fillText('■', x, y);
						} else {
							const a = (1 - k / d.len) * 0.55;
							ctx.fillStyle = k < 3 ? rgba(ox, a + 0.2) : rgba(fg, a * 0.7);
							ctx.fillText(g, x, y);
						}
					}
				}
			}
		});
		return () => {
			m?.destroy();
			ptr.destroy();
		};
	});
</script>

<canvas bind:this={canvas} aria-hidden="true" class="absolute inset-0 h-full w-full"></canvas>
