<script lang="ts">
	import { mountCanvas, readColor, rgba, mix, rng, trackPointer, valueNoise, type RGB } from './canvas-kit';
	import { prefs } from '$studio/prefs.svelte';

	let { cell = 6, seed = 5 }: { cell?: number; seed?: number } = $props();
	let canvas: HTMLCanvasElement | undefined = $state();

	$effect(() => {
		if (!canvas) return;
		void prefs.colorKey;
		const host = canvas.parentElement!;
		const fg = readColor(host, 'var(--foreground)');
		const deep = readColor(host, 'var(--oxide-deep)');
		const mid = readColor(host, 'var(--orange)');
		const hot = readColor(host, 'color-mix(in oklab, var(--oxide-vivid) 60%, white)');
		const ramp = (a: number): RGB => (a < 0.5 ? mix(hot, mid, a / 0.5) : mix(mid, deep, Math.min(1, (a - 0.5) / 5)));
		const noise = valueNoise(seed);
		const rand = rng(seed * 31);
		let m: ReturnType<typeof mountCanvas> | undefined;
		const ptr = trackPointer(canvas, () => m?.still && m.redraw());
		let cols = 0;
		let rows = 0;
		let age = new Float32Array(0);
		let grain = new Float32Array(0);
		let front: number[] = [];
		let emit = 0;

		const seedAt = (x: number, y: number, r: number, n: number) => {
			for (let k = 0; k < n; k++) {
				const a = rand() * Math.PI * 2;
				const d = Math.sqrt(rand()) * r;
				const i = Math.floor((x + Math.cos(a) * d) / cell);
				const j = Math.floor((y + Math.sin(a) * d) / cell);
				if (i < 0 || j < 0 || i >= cols || j >= rows) continue;
				const q = i + j * cols;
				if (age[q] < 0 || age[q] > 4) {
					age[q] = 0;
					front.push(q);
				}
			}
		};

		const spread = (n: number) => {
			for (let k = 0; k < n && front.length; k++) {
				const fi = Math.floor(rand() * front.length);
				const q = front[fi];
				const x = q % cols;
				const y = (q / cols) | 0;
				const d = Math.floor(rand() * 4);
				const nx = x + (d === 0 ? 1 : d === 1 ? -1 : 0);
				const ny = y + (d === 2 ? 1 : d === 3 ? -1 : 0);
				if (age[q] > 3.2 || rand() < 0.012) {
					front.splice(fi, 1);
					continue;
				}
				if (nx < 0 || ny < 0 || nx >= cols || ny >= rows) continue;
				const j = nx + ny * cols;
				if (age[j] >= 0 || rand() > grain[j]) continue;
				age[j] = age[q] * 0.6;
				front.push(j);
			}
		};

		m = mountCanvas(canvas, {
			animate: true,
			setup: ({ w, h }) => {
				cols = Math.ceil(w / cell);
				rows = Math.ceil(h / cell);
				age = new Float32Array(cols * rows).fill(-1);
				grain = new Float32Array(cols * rows);
				front = [];
				for (let j = 0; j < rows; j++)
					for (let i = 0; i < cols; i++) grain[i + j * cols] = Math.max(0, Math.min(1, (noise(i * 0.09, j * 0.09, 4) - 0.32) * 2.2));
				seedAt(w * 0.78, h * 0.3, 30, 18);
				seedAt(w * 0.6, h * 0.72, 22, 10);
				for (let s = 0; s < 40; s++) spread(220);
				for (let i = 0; i < age.length; i++) if (age[i] >= 0) age[i] = 0.4 + rand() * 3;
			},
			draw: ({ ctx, w, h, t, dt }) => {
				ptr.step(dt, w, h, t, 'hop', 4);
				const p = ptr.p;
				if (dt) {
					emit += dt;
					if (p.live && emit > 0.05) {
						emit = 0;
						const linger = Math.min(1, p.dwell / 1.2);
						seedAt(p.x, p.y, 6 + linger * 34, 1 + Math.floor(linger * 9));
					}
					spread(Math.ceil(front.length * dt * 3) + 4);
					for (let i = 0; i < age.length; i++) {
						if (age[i] < 0) continue;
						age[i] += dt * 0.32;
						if (age[i] > 9 + grain[i] * 5) age[i] = -1;
					}
				} else if (p.inside) {
					seedAt(p.x, p.y, 40, 60);
					spread(900);
				}
				ctx.clearRect(0, 0, w, h);
				for (let i = 0; i < age.length; i++) {
					const a = age[i];
					const x = (i % cols) * cell;
					const y = ((i / cols) | 0) * cell;
					if (a < 0) {
						if (grain[i] > 0.62) {
							ctx.fillStyle = rgba(fg, 0.035);
							ctx.fillRect(x, y, cell - 1, cell - 1);
						}
						continue;
					}
					const fade = a > 8 ? Math.max(0, 1 - (a - 8) / 4) : 1;
					ctx.fillStyle = rgba(ramp(a), (0.4 + grain[i] * 0.6) * fade);
					ctx.fillRect(x, y, cell - 1, cell - 1);
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
