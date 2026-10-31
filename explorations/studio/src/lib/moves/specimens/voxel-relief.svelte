<script lang="ts">
	import { mountCanvas, readColor, rgba, mix, trackPointer, valueNoise } from './canvas-kit';
	import { prefs } from '$studio/prefs.svelte';

	let { size = 22, reach = 115, lift = 58 }: { size?: number; reach?: number; lift?: number } = $props();
	let canvas: HTMLCanvasElement | undefined = $state();

	$effect(() => {
		if (!canvas) return;
		void prefs.colorKey;
		const host = canvas.parentElement!;
		const bg = readColor(host, 'var(--background)');
		const fg = readColor(host, 'var(--foreground)');
		const ox = readColor(host, 'var(--orange)');
		const deep = readColor(host, 'var(--oxide-deep)');
		const noise = valueNoise(21);
		let m: ReturnType<typeof mountCanvas> | undefined;
		const ptr = trackPointer(canvas, () => m?.still && m.redraw());
		let height = new Float32Array(0);
		let span = 0;

		m = mountCanvas(canvas, {
			animate: true,
			setup: ({ w, h }) => {
				span = Math.ceil(((h + w / 4) / (size / 2) + w / (2 * size)) / 2) + 8;
				height = new Float32Array(span * span);
			},
			draw: ({ ctx, w, h, t, dt }) => {
				ptr.step(dt, w, h, t, true, 6);
				const { x: px, y: py } = ptr.p;
				const k = dt ? 1 - Math.exp(-dt * 8) : 1;
				const R2 = reach * reach;
				const hw = size;
				const hh = size / 2;
				const ox0 = w / 2;
				const oy0 = -w / 4 - hw * 2;
				ctx.clearRect(0, 0, w, h);
				const top = mix(bg, fg, 0.13);
				const left = mix(bg, fg, 0.075);
				const right = mix(bg, fg, 0.035);
				const edge = rgba(fg, 0.2);
				for (let s = 0; s < span * 2; s++)
					for (let i = 0; i <= s; i++) {
						const j = s - i;
						if (i >= span || j >= span) continue;
						const sx = ox0 + (i - j) * hw;
						const sy = oy0 + (i + j) * hh;
						if (sx < -hw * 2 || sx > w + hw * 2 || sy < -lift * 2 || sy > h + hw * 2) continue;
						const q = i + j * span;
						const dx = sx - px;
						const dy = (sy - py) * 1.4;
						const f = Math.exp(-(dx * dx + dy * dy) / R2);
						const base = Math.max(0, noise(i * 0.12, j * 0.12, 3) - 0.55) * 30;
						height[q] += (base + f * lift - height[q]) * k;
						const z = height[q];
						const heat = Math.min(1, f * 1.25 + z / (lift * 4));
						const y = sy - z;
						ctx.beginPath();
						ctx.moveTo(sx - hw, y);
						ctx.lineTo(sx, y + hh);
						ctx.lineTo(sx, y + hh + z + 2);
						ctx.lineTo(sx - hw, y + z + 2);
						ctx.closePath();
						ctx.fillStyle = rgba(heat > 0.05 ? mix(left, deep, heat) : left, 1);
						ctx.fill();
						ctx.beginPath();
						ctx.moveTo(sx + hw, y);
						ctx.lineTo(sx, y + hh);
						ctx.lineTo(sx, y + hh + z + 2);
						ctx.lineTo(sx + hw, y + z + 2);
						ctx.closePath();
						ctx.fillStyle = rgba(heat > 0.05 ? mix(right, mix(deep, bg, 0.35), heat) : right, 1);
						ctx.fill();
						ctx.beginPath();
						ctx.moveTo(sx, y - hh);
						ctx.lineTo(sx + hw, y);
						ctx.lineTo(sx, y + hh);
						ctx.lineTo(sx - hw, y);
						ctx.closePath();
						ctx.fillStyle = rgba(heat > 0.05 ? mix(top, ox, heat) : top, 1);
						ctx.fill();
						ctx.strokeStyle = edge;
						ctx.lineWidth = 0.75;
						ctx.stroke();
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
