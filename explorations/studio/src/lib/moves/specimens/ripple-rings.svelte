<script lang="ts">
	import { mountCanvas, readColor, rgba, rng, trackPointer } from './canvas-kit';
	import { prefs } from '$studio/prefs.svelte';

	let { speed = 95, life = 4.2, every = 34 }: { speed?: number; life?: number; every?: number } = $props();
	let canvas: HTMLCanvasElement | undefined = $state();

	type Ring = { x: number; y: number; age: number; start: number; gap: number; accent: boolean };

	$effect(() => {
		if (!canvas) return;
		void prefs.colorKey;
		const host = canvas.parentElement!;
		const line = readColor(host, 'var(--foreground)');
		const ox = readColor(host, 'var(--orange)');
		const rand = rng(17);
		let m: ReturnType<typeof mountCanvas> | undefined;
		const ptr = trackPointer(canvas, () => m?.still && m.redraw());
		let rings: Ring[] = [];
		let lx = -1e4;
		let ly = -1e4;
		let pulse = 0;
		let count = 0;

		const add = (x: number, y: number, age = 0) => {
			count++;
			rings.push({ x, y, age, start: rand() * Math.PI * 2, gap: 0.08 + rand() * 0.3, accent: count % 6 === 0 });
			if (rings.length > 90) rings.shift();
		};

		const paint = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
			ctx.clearRect(0, 0, w, h);
			ctx.lineWidth = 1.25;
			ctx.lineCap = 'round';
			for (const r of rings) {
				const k = r.age / life;
				if (k >= 1) continue;
				const rad = 6 + r.age * speed;
				const a = (1 - k) ** 1.6;
				ctx.strokeStyle = r.accent ? rgba(ox, a) : rgba(line, a * 0.6);
				ctx.beginPath();
				ctx.arc(r.x, r.y, rad, r.start, r.start + Math.PI * 2 * (1 - r.gap));
				ctx.stroke();
				if (r.accent && k < 0.85) {
					const e = r.start + Math.PI * 2 * (1 - r.gap);
					ctx.fillStyle = rgba(ox, a);
					ctx.beginPath();
					ctx.arc(r.x + Math.cos(e) * rad, r.y + Math.sin(e) * rad, 3, 0, Math.PI * 2);
					ctx.fill();
				}
			}
		};

		m = mountCanvas(canvas, {
			animate: true,
			draw: ({ ctx, w, h, t, dt }) => {
				ptr.step(dt, w, h, t, true, 6);
				const p = ptr.p;
				if (!dt) {
					rings = [];
					const cx = p.inside ? p.x : w * 0.72;
					const cy = p.inside ? p.y : h * 0.42;
					for (let i = 0; i < 8; i++) add(cx, cy, i * 0.45);
					paint(ctx, w, h);
					return;
				}
				for (const r of rings) r.age += dt;
				rings = rings.filter((r) => r.age < life);
				pulse += dt;
				if (Math.hypot(p.x - lx, p.y - ly) > every) {
					add(p.x, p.y);
					lx = p.x;
					ly = p.y;
					pulse = 0;
				} else if (pulse > 0.9) {
					add(p.x, p.y);
					pulse = 0;
				}
				paint(ctx, w, h);
			}
		});
		return () => {
			m?.destroy();
			ptr.destroy();
		};
	});
</script>

<canvas bind:this={canvas} aria-hidden="true" class="absolute inset-0 h-full w-full"></canvas>
