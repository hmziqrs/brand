<script lang="ts">
	import { cn } from '$brand/utils.js';

	let {
		name = 'oxlabs',
		face = 'sans',
		block = 6,
		animate = false,
		hover = true,
		square = true,
		dust = true,
		fresh = '--orange',
		light = '--foreground',
		class: className
	}: {
		name?: string;
		face?: 'sans' | 'serif';
		block?: number;
		animate?: boolean;
		hover?: boolean;
		square?: boolean;
		dust?: boolean;
		fresh?: string;
		light?: string;
		class?: string;
	} = $props();

	let host: HTMLDivElement | undefined = $state();
	let canvas: HTMLCanvasElement | undefined = $state();
	let height = $state(0);

	const bayer = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

	function hash(x: number, y: number) {
		let h = (x * 374761393 + y * 668265263) | 0;
		h = Math.imul(h ^ (h >>> 13), 1274126177);
		return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
	}
	function vnoise(x: number, y: number) {
		const xi = Math.floor(x);
		const yi = Math.floor(y);
		const xf = x - xi;
		const yf = y - yi;
		const u = xf * xf * (3 - 2 * xf);
		const v = yf * yf * (3 - 2 * yf);
		const a = hash(xi, yi);
		const b = hash(xi + 1, yi);
		const c = hash(xi, yi + 1);
		const d = hash(xi + 1, yi + 1);
		return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
	}
	function fbm(x: number, y: number) {
		return vnoise(x, y) * 0.55 + vnoise(x * 2.1, y * 2.1) * 0.3 + vnoise(x * 4.3, y * 4.3) * 0.15;
	}

	$effect(() => {
		if (!host || !canvas) return;
		const el = host;
		const cv = canvas;
		const ctx = cv.getContext('2d');
		if (!ctx) return;
		const word = name;
		const serif = face === 'serif';
		const family = serif ? 'italic 400 {s}px "Instrument Serif"' : '600 {s}px "Onest Variable"';
		const font = (s: number) => family.replace('{s}', String(s));
		const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
		const moving = animate && !reduced;
		const touchy = hover && !reduced;

		let size = block;
		let w = 0;
		let h = 0;
		let cols = 0;
		let rows = 0;
		let cover = new Float32Array(0);
		let mark = new Float32Array(0);
		let colors = { fresh: '', light: '' };
		let t = 0;
		let raf = 0;
		let visible = false;
		let last = 0;
		let pointer: { x: number; y: number; k: number } | null = null;

		function read() {
			const cs = getComputedStyle(el);
			colors = { fresh: cs.getPropertyValue(fresh).trim(), light: cs.getPropertyValue(light).trim() };
		}

		function layout() {
			w = Math.max(1, Math.round(el.getBoundingClientRect().width));
			size = Math.max(2, Math.min(block, Math.round(w / 210)));
			const probe = document.createElement('canvas').getContext('2d')!;
			probe.font = font(100);
			const m = probe.measureText(word);
			const em = 100;
			const sq = square ? em * (serif ? 0.3 : 0.36) + em * 0.08 : 0;
			const fs = (w * 0.98) / ((m.width + sq) / 100);
			const asc = (m.actualBoundingBoxAscent / 100) * fs;
			const desc = (Math.max(0, m.actualBoundingBoxDescent) / 100) * fs;
			h = Math.ceil(asc + desc + size * 4);
			height = h;
			const dpr = Math.min(devicePixelRatio || 1, 2);
			cv.width = Math.round(w * dpr);
			cv.height = Math.round(h * dpr);
			ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
			cols = Math.ceil(w / size);
			rows = Math.ceil(h / size);
			const off = document.createElement('canvas');
			off.width = cols;
			off.height = rows;
			const o = off.getContext('2d', { willReadFrequently: true })!;
			const s = fs / size;
			o.font = font(s);
			o.textBaseline = 'alphabetic';
			const x0 = ((w - (((m.width + sq) / 100) * fs)) / 2) / size;
			const base = (asc + size * 2) / size;
			o.fillStyle = 'rgb(255,0,0)';
			o.fillText(word, x0, base);
			if (square) {
				const q = s * (serif ? 0.3 : 0.36);
				o.fillStyle = 'rgb(0,255,0)';
				o.fillRect(x0 + (m.width / 100) * s + s * 0.07, base - q, q, q);
			}
			const data = o.getImageData(0, 0, cols, rows).data;
			cover = new Float32Array(cols * rows);
			mark = new Float32Array(cols * rows);
			for (let i = 0; i < cols * rows; i++) {
				cover[i] = data[i * 4] / 255;
				mark[i] = data[i * 4 + 1] / 255;
			}
			draw();
		}

		function draw() {
			ctx!.clearRect(0, 0, w, h);
			const gap = size >= 5 ? 1 : 0;
			for (let y = 0; y < rows; y++) {
				const fall = 1 - Math.pow(y / rows, 1.6) * 0.75;
				for (let x = 0; x < cols; x++) {
					const i = y * cols + x;
					const c = cover[i];
					const q = mark[i];
					const th = bayer[(y % 4) * 4 + (x % 4)];
					const ox = fbm(x * 0.045 + t * 0.18, y * 0.09 - t * 0.05);
					let boost = 0;
					if (pointer) {
						const d = Math.hypot(x * size - pointer.x, y * size - pointer.y);
						boost = Math.max(0, 1 - d / 150) * pointer.k;
					}
					if (q > 0.05) {
						if (q * (0.55 + fall * 0.45) + boost * 0.4 > th * 0.9) {
							ctx!.globalAlpha = 0.95;
							ctx!.fillStyle = colors.fresh;
							ctx!.fillRect(x * size, y * size, size - gap, size - gap);
						}
						continue;
					}
					if (c > 0.02) {
						const rusty = ox + boost * 0.6 > 0.53;
						const tone = c * (0.28 + fall * 0.6) * (0.55 + ox * 0.7) + boost * 0.55;
						if (tone > th) {
							ctx!.globalAlpha = rusty ? 0.92 : 0.5 + ox * 0.35;
							ctx!.fillStyle = rusty ? colors.fresh : colors.light;
							ctx!.fillRect(x * size, y * size, size - gap, size - gap);
						}
					} else if (dust) {
						const n = hash(x, y + 97);
						if (n > 0.985 - boost * 0.08 && ox > 0.5) {
							ctx!.globalAlpha = 0.28 + boost * 0.5;
							ctx!.fillStyle = colors.fresh;
							ctx!.fillRect(x * size, y * size, size - gap, size - gap);
						}
					}
				}
			}
			ctx!.globalAlpha = 1;
		}

		function frame(now: number) {
			raf = 0;
			const dt = last ? Math.min(0.05, (now - last) / 1000) : 0.016;
			last = now;
			if (moving) t += dt;
			if (pointer && pointer.k < 1) pointer.k = Math.min(1, pointer.k + dt * 4);
			draw();
			if (visible && !document.hidden && (moving || pointer)) raf = requestAnimationFrame(frame);
		}
		function kick() {
			if (!raf && visible) {
				last = 0;
				raf = requestAnimationFrame(frame);
			}
		}

		function onMove(e: PointerEvent) {
			const r = cv.getBoundingClientRect();
			const x = e.clientX - r.left;
			const y = e.clientY - r.top;
			if (x < -60 || y < -60 || x > r.width + 60 || y > r.height + 60) {
				if (pointer) {
					pointer = null;
					kick();
				}
				return;
			}
			pointer = { x, y, k: pointer?.k ?? 0 };
			kick();
		}

		read();
		let alive = true;
		const ready = document.fonts?.load ? document.fonts.load(font(100)) : Promise.resolve();
		ready.catch(() => {}).finally(() => {
			if (alive) layout();
		});
		const ro = new ResizeObserver(() => layout());
		ro.observe(el);
		const io = new IntersectionObserver((entries) => {
			visible = entries.some((e) => e.isIntersecting);
			if (visible && moving) kick();
		});
		io.observe(el);
		const mo = new MutationObserver(() => {
			read();
			draw();
		});
		mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-oxide'] });
		if (touchy) window.addEventListener('pointermove', onMove, { passive: true });

		return () => {
			alive = false;
			cancelAnimationFrame(raf);
			ro.disconnect();
			io.disconnect();
			mo.disconnect();
			window.removeEventListener('pointermove', onMove);
		};
	});
</script>

<div bind:this={host} class={cn('relative w-full', className)} style:height={height ? `${height}px` : '22vw'}>
	<span class="sr-only">{name}</span>
	<canvas bind:this={canvas} aria-hidden="true" class="absolute inset-0 h-full w-full"></canvas>
</div>
