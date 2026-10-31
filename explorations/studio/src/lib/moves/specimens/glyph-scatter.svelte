<script lang="ts">
	import { mountCanvas, readColor, rgba, mix, rng, trackPointer } from './canvas-kit';
	import { prefs } from '$studio/prefs.svelte';

	let { pitch = 24, reach = 120, force = 2600 }: { pitch?: number; reach?: number; force?: number } = $props();
	let canvas: HTMLCanvasElement | undefined = $state();
	const glyphs = ['■', '□', '▪', '▫', '○', '◎', '·', '◦', '●'];

	$effect(() => {
		if (!canvas) return;
		void prefs.colorKey;
		const host = canvas.parentElement!;
		const fg = readColor(host, 'var(--foreground)');
		const ox = readColor(host, 'var(--orange)');
		const rand = rng(23);
		let m: ReturnType<typeof mountCanvas> | undefined;
		const ptr = trackPointer(canvas, () => m?.still && m.redraw());
		let n = 0;
		let bx = new Float32Array(0);
		let by = new Float32Array(0);
		let x = new Float32Array(0);
		let y = new Float32Array(0);
		let vx = new Float32Array(0);
		let vy = new Float32Array(0);
		let heat = new Float32Array(0);
		let g = new Uint8Array(0);

		m = mountCanvas(canvas, {
			animate: true,
			setup: ({ w, h }) => {
				const cols = Math.ceil(w / pitch);
				const rows = Math.ceil(h / pitch);
				n = cols * rows;
				bx = new Float32Array(n);
				by = new Float32Array(n);
				vx = new Float32Array(n);
				vy = new Float32Array(n);
				heat = new Float32Array(n);
				g = new Uint8Array(n);
				for (let j = 0; j < rows; j++)
					for (let i = 0; i < cols; i++) {
						const k = i + j * cols;
						bx[k] = i * pitch + pitch / 2 + (rand() - 0.5) * 4;
						by[k] = j * pitch + pitch / 2 + (rand() - 0.5) * 4;
						g[k] = Math.floor(rand() ** 1.8 * glyphs.length);
					}
				x = bx.slice();
				y = by.slice();
			},
			draw: ({ ctx, w, h, t, dt }) => {
				ptr.step(dt, w, h, t, true, 9);
				const { x: px, y: py, speed } = ptr.p;
				const R2 = reach * reach;
				const push = force * (0.6 + Math.min(1.4, speed / 600));
				const step = dt || 0.6;
				ctx.clearRect(0, 0, w, h);
				ctx.font = `${Math.round(pitch * 0.62)}px "JetBrains Mono Variable", ui-monospace, monospace`;
				ctx.textAlign = 'center';
				ctx.textBaseline = 'middle';
				for (let k = 0; k < n; k++) {
					const dx = x[k] - px;
					const dy = y[k] - py;
					const d2 = dx * dx + dy * dy;
					const f = Math.exp(-d2 / R2);
					const d = Math.sqrt(d2) || 1;
					vx[k] += ((dx / d) * push * f + (bx[k] - x[k]) * 26 - vx[k] * 7.5) * step * (dt ? 1 : 0);
					vy[k] += ((dy / d) * push * f + (by[k] - y[k]) * 26 - vy[k] * 7.5) * step * (dt ? 1 : 0);
					if (dt) {
						x[k] += vx[k] * dt;
						y[k] += vy[k] * dt;
					} else {
						const s = Math.min(pitch * 1.6, (reach * f * 0.9));
						x[k] = bx[k] + (dx / d) * s;
						y[k] = by[k] + (dy / d) * s;
					}
					const off = Math.hypot(x[k] - bx[k], y[k] - by[k]) / pitch;
					heat[k] = Math.max(heat[k] * (dt ? Math.exp(-dt * 0.9) : 0), Math.min(1, off));
					const hk = heat[k];
					ctx.fillStyle = hk > 0.05 ? rgba(mix(fg, ox, Math.min(1, hk * 1.8)), 0.25 + hk * 0.75) : rgba(fg, 0.22);
					ctx.fillText(hk > 0.5 ? '■' : glyphs[g[k]], x[k], y[k]);
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
