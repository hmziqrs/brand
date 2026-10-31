<script lang="ts">
	import { cn } from '$brand/utils.js';

	let {
		mode = 'rain',
		cell = 16,
		seed = 'claude-multi',
		opacity = 0.55,
		speed = 1,
		digits = true,
		mask = 'fade-bottom',
		class: className
	}: {
		mode?: 'rain' | 'patina';
		cell?: number;
		seed?: string;
		opacity?: number;
		speed?: number;
		digits?: boolean;
		mask?: 'none' | 'hero' | 'fade-bottom' | 'fade-top' | 'radial' | 'edges' | 'left' | 'right';
		class?: string;
	} = $props();

	let canvas: HTMLCanvasElement | undefined = $state();

	const masks = {
		none: '',
		hero: 'radial-gradient(ellipse 75% 95% at 88% 30%, black 0%, black 20%, transparent 78%)',
		'fade-bottom': 'linear-gradient(to bottom, black 0%, black 55%, transparent 100%)',
		'fade-top': 'linear-gradient(to top, black 0%, black 55%, transparent 100%)',
		radial: 'radial-gradient(ellipse at center, black 0%, black 30%, transparent 75%)',
		edges: 'radial-gradient(ellipse at center, transparent 0%, transparent 35%, black 85%)',
		left: 'linear-gradient(to right, black 0%, black 30%, transparent 80%)',
		right: 'linear-gradient(to left, black 0%, black 30%, transparent 80%)'
	} as const;

	const hashOf = (s: string) => {
		let h = 2166136261;
		for (const c of s) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
		return h >>> 0;
	};

	$effect(() => {
		if (!canvas) return;
		const el = canvas;
		const ctx = el.getContext('2d');
		if (!ctx) return;
		let a = hashOf(seed + mode);
		const rand = () => {
			a = (a + 0x6d2b79f5) | 0;
			let t = Math.imul(a ^ (a >>> 15), 1 | a);
			t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
			return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
		};
		const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
		let cols = 0;
		let rows = 0;
		let v = new Float32Array(0);
			let glyph = new Uint8Array(0);
		let heads: { y: number; v: number; len: number }[] = [];
		let ink = 'currentColor';
		let w = 0;
		let h = 0;
		let raf = 0;
		let last = 0;
		let visible = true;
		let tick = 0;

		const readInk = () => {
			ink = getComputedStyle(el).color;
		};

		const size = () => {
			const r = el.getBoundingClientRect();
			const dpr = Math.min(devicePixelRatio || 1, 2);
			w = Math.max(1, r.width);
			h = Math.max(1, r.height);
			el.width = Math.round(w * dpr);
			el.height = Math.round(h * dpr);
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			cols = Math.ceil(w / cell);
			rows = Math.ceil(h / cell);
			v = new Float32Array(cols * rows);
			glyph = new Uint8Array(cols * rows);
			for (let i = 0; i < glyph.length; i++) glyph[i] = Math.floor(rand() * 10);
			heads = Array.from({ length: cols }, () => ({ y: rand() * rows * 1.5 - rows * 0.5, v: (0.25 + rand() * 0.6) * speed, len: 4 + rand() * 14 }));
			readInk();
		};

		const stepRain = () => {
			for (let i = 0; i < v.length; i++) v[i] *= 0.93;
			for (let x = 0; x < cols; x++) {
				const hd = heads[x];
				hd.y += hd.v;
				if (hd.y - hd.len > rows) {
					hd.y = -rand() * rows * 0.6;
					hd.v = (0.25 + rand() * 0.6) * speed;
					hd.len = 4 + rand() * 14;
				}
				const y = Math.floor(hd.y);
				if (y >= 0 && y < rows) {
					v[y * cols + x] = 1;
					if (rand() < 0.3) glyph[y * cols + x] = Math.floor(rand() * 10);
				}
			}
		};

		const lattice = new Float32Array(64 * 64).map(() => rand());
		const lat = (x: number, y: number) => lattice[(((y % 64) + 64) % 64) * 64 + (((x % 64) + 64) % 64)];
		const noise = (x: number, y: number) => {
			const xi = Math.floor(x);
			const yi = Math.floor(y);
			const xf = x - xi;
			const yf = y - yi;
			const u = xf * xf * (3 - 2 * xf);
			const w = yf * yf * (3 - 2 * yf);
			const a1 = lat(xi, yi) + (lat(xi + 1, yi) - lat(xi, yi)) * u;
			const b1 = lat(xi, yi + 1) + (lat(xi + 1, yi + 1) - lat(xi, yi + 1)) * u;
			return a1 + (b1 - a1) * w;
		};
		let clock = rand() * 100;
		const stepPatina = () => {
			clock += 0.012 * speed;
			const sc = 0.09;
			for (let y = 0; y < rows; y++) {
				for (let x = 0; x < cols; x++) {
					const n = noise(x * sc + clock * 0.6, y * sc) * 0.62 + noise(x * sc * 2.3 - clock, y * sc * 2.3 + 7) * 0.28 + noise(x * 0.6, y * 0.6 + clock * 3) * 0.1;
					const t = (n - 0.48) / 0.3;
					v[y * cols + x] = t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t);
				}
			}
		};

		const draw = () => {
			ctx.clearRect(0, 0, w, h);
			ctx.fillStyle = ink;
			ctx.strokeStyle = ink;
			ctx.lineWidth = 1;
			ctx.font = `${Math.round(cell * 0.72)}px "JetBrains Mono Variable", ui-monospace, monospace`;
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			const half = cell / 2;
			for (let y = 0; y < rows; y++) {
				for (let x = 0; x < cols; x++) {
					const val = v[y * cols + x];
					if (val < 0.06) continue;
					const cx = x * cell + half;
					const cy = y * cell + half;
					ctx.globalAlpha = Math.min(1, val * opacity * 1.4);
					if (val > 0.9 && digits) {
						ctx.fillText(String(glyph[y * cols + x]), cx, cy);
					} else if (val > 0.62) {
						const s = cell * 0.42;
						ctx.fillRect(cx - s / 2, cy - s / 2, s, s);
					} else if (val > 0.32) {
						ctx.beginPath();
						ctx.arc(cx, cy, cell * 0.22, 0, Math.PI * 2);
						ctx.stroke();
					} else {
						ctx.fillRect(cx - 1, cy - 1, 2, 2);
					}
				}
			}
			ctx.globalAlpha = 1;
		};

		const step = () => (mode === 'rain' ? stepRain() : stepPatina());

		const loop = (t: number) => {
			raf = requestAnimationFrame(loop);
			if (!visible || t - last < 70) return;
			last = t;
			if (++tick % 30 === 0) readInk();
			step();
			draw();
		};

		size();
		for (let i = 0; i < (mode === 'rain' ? 60 : 1); i++) step();
		draw();

		const ro = new ResizeObserver(() => {
			size();
			for (let i = 0; i < (mode === 'rain' ? 60 : 1); i++) step();
			draw();
		});
		ro.observe(el);
		const io = new IntersectionObserver((e) => (visible = e.some((x) => x.isIntersecting)));
		io.observe(el);
		const mo = new MutationObserver(() => {
			readInk();
			draw();
		});
		mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-oxide'] });
		if (!reduce) raf = requestAnimationFrame(loop);

		return () => {
			cancelAnimationFrame(raf);
			ro.disconnect();
			io.disconnect();
			mo.disconnect();
		};
	});
</script>

<canvas
	bind:this={canvas}
	aria-hidden="true"
	data-slot="patina-rain"
	class={cn('pointer-events-none absolute inset-0 size-full text-orange', className)}
	style:mask-image={masks[mask] || undefined}
	style:-webkit-mask-image={masks[mask] || undefined}
></canvas>
