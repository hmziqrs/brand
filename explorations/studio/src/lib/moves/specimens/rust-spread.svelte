<script lang="ts">
	import { mountCanvas, readColor, rgba, mix, rng, type RGB } from './canvas-kit';
	import { prefs } from '$studio/prefs.svelte';

	let { cell = 8, seed = 7, animate = true }: { cell?: number; seed?: number; animate?: boolean } = $props();
	let canvas: HTMLCanvasElement | undefined = $state();

	$effect(() => {
		if (!canvas) return;
		void prefs.colorKey;
		const host = canvas.parentElement!;
		const deep = readColor(host, 'var(--oxide-deep)');
		const mid = readColor(host, 'var(--orange)');
		const hot = readColor(host, 'color-mix(in oklab, var(--oxide-vivid) 70%, white)');
		const ramp = (a: number): RGB => (a < 0.6 ? mix(hot, mid, a / 0.6) : mix(mid, deep, Math.min(1, (a - 0.6) / 4)));

		let cols = 0;
		let rows = 0;
		let age = new Float32Array(0);
		let grain = new Float32Array(0);
		let front: number[] = [];
		let count = 0;
		let phase: 'grow' | 'hold' | 'flake' = 'grow';
		let timer = 0;
		let rand = rng(seed);

		const reset = () => {
			age.fill(-1);
			front = [];
			count = 0;
			phase = 'grow';
			timer = 0;
			for (let s = 0; s < 7; s++) {
				const i = Math.floor(rand() * cols) + Math.floor(rand() * rows) * cols;
				age[i] = 0;
				front.push(i);
				count++;
			}
		};

		const step = (n: number) => {
			for (let k = 0; k < n && front.length; k++) {
				const fi = Math.floor(rand() * front.length);
				const i = front[fi];
				const x = i % cols;
				const y = (i / cols) | 0;
				const d = Math.floor(rand() * 4);
				const nx = x + (d === 0 ? 1 : d === 1 ? -1 : 0);
				const ny = y + (d === 2 ? 1 : d === 3 ? -1 : 0);
				if (nx < 0 || ny < 0 || nx >= cols || ny >= rows) continue;
				const j = nx + ny * cols;
				if (age[j] >= 0) {
					if (rand() < 0.04) front.splice(fi, 1);
					continue;
				}
				if (rand() > 0.15 + grain[j] * 0.85) continue;
				age[j] = 0;
				front.push(j);
				count++;
			}
		};

		const m = mountCanvas(canvas, {
			animate,
			setup: ({ w, h }) => {
				cols = Math.ceil(w / cell);
				rows = Math.ceil(h / cell);
				age = new Float32Array(cols * rows);
				grain = new Float32Array(cols * rows);
				rand = rng(seed);
				for (let y = 0; y < rows; y++)
					for (let x = 0; x < cols; x++) {
						const n = Math.sin(x * 0.21 + Math.sin(y * 0.13) * 2.1) * Math.cos(y * 0.17 - x * 0.05) * 0.5 + 0.5;
						grain[x + y * cols] = Math.min(1, n * 0.8 + rand() * 0.35);
					}
				reset();
				const still = !animate || matchMedia('(prefers-reduced-motion: reduce)').matches;
				while (count < cols * rows * (still ? 0.46 : 0.28) && front.length) step(400);
				for (let i = 0; i < age.length; i++) if (age[i] >= 0) age[i] = 0.6 + rand() * 4;
			},
			draw: ({ ctx, w, h, dt }) => {
				if (dt) {
					const total = cols * rows;
					timer += dt;
					if (phase === 'grow') {
						step(Math.ceil(total * dt * 0.06) + 6);
						if (count > total * 0.58 || !front.length) (phase = 'hold'), (timer = 0);
					} else if (phase === 'hold' && timer > 2.5) (phase = 'flake'), (timer = 0);
					for (let i = 0; i < age.length; i++) {
						if (age[i] < 0) continue;
						age[i] += dt * (phase === 'flake' ? 1.8 : 0.45);
						if (phase === 'flake' && age[i] > 6 + grain[i] * 3) (age[i] = -1), count--;
					}
					if (phase === 'flake' && count < total * 0.02) reset();
				}
				ctx.clearRect(0, 0, w, h);
				for (let i = 0; i < age.length; i++) {
					const a = age[i];
					if (a < 0) continue;
					const x = (i % cols) * cell;
					const y = ((i / cols) | 0) * cell;
					const fade = a > 6 ? Math.max(0, 1 - (a - 6) / 3) : 1;
					ctx.fillStyle = rgba(ramp(a), (0.45 + grain[i] * 0.55) * fade);
					ctx.fillRect(x, y, cell - 1, cell - 1);
				}
			}
		});
		return () => m.destroy();
	});
</script>

<canvas bind:this={canvas} aria-hidden="true" class="absolute inset-0 h-full w-full"></canvas>
