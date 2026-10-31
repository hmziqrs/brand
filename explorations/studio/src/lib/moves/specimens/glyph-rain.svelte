<script lang="ts">
	import { mountCanvas, readColor, rgba, rng } from './canvas-kit';
	import { prefs } from '$studio/prefs.svelte';

	let { size = 15, density = 0.42, animate = true }: { size?: number; density?: number; animate?: boolean } = $props();
	let canvas: HTMLCanvasElement | undefined = $state();
	const glyphs = ['■', '□', '▪', '▫', '○', '◦', '●', '◎', '◯', '·'];

	$effect(() => {
		if (!canvas) return;
		void prefs.oxide;
		void prefs.dark;
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

		const m = mountCanvas(canvas, {
			animate,
			setup: ({ w, h }) => {
				cols = Math.ceil(w / cw);
				rows = Math.ceil(h / ch);
				grid = Array.from({ length: cols * rows }, () => Math.floor(rand() * glyphs.length));
				drops = Array.from({ length: cols }, () => ({ y: rand() * rows * 1.4, v: 2.2 + rand() * 4.5, len: 5 + Math.floor(rand() * 12), on: rand() < density }));
			},
			draw: ({ ctx, w, h, dt }) => {
				ctx.clearRect(0, 0, w, h);
				ctx.font = `${size}px "JetBrains Mono Variable", ui-monospace, monospace`;
				ctx.textAlign = 'center';
				ctx.textBaseline = 'middle';
				if (dt && rand() < 0.5) grid[Math.floor(rand() * grid.length)] = Math.floor(rand() * glyphs.length);
				for (let c = 0; c < cols; c++) {
					const d = drops[c];
					const x = c * cw + cw / 2;
					for (let r = 0; r < rows; r += 3) {
						ctx.fillStyle = rgba(fg, 0.07);
						ctx.fillText('·', x, r * ch + ch / 2);
					}
					if (!d.on) continue;
					d.y += d.v * dt;
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
		return () => m.destroy();
	});
</script>

<canvas bind:this={canvas} aria-hidden="true" class="absolute inset-0 h-full w-full"></canvas>
