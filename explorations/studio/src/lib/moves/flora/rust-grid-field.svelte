<script lang="ts">
	import { cn } from '$brand/utils.js';

	let {
		cell = 36,
		radius = 1.6,
		gap = 2,
		fresh = '--orange',
		stain = '--teal',
		line = '--foreground',
		mode = 'paint',
		ambient = true,
		lines = true,
		fade = 'radial',
		seed = 7,
		veil = 1,
		class: className
	}: {
		cell?: number;
		radius?: number;
		gap?: number;
		fresh?: string;
		stain?: string;
		line?: string;
		mode?: 'paint' | 'reveal';
		ambient?: boolean;
		lines?: boolean;
		fade?: 'none' | 'radial' | 'bottom' | 'edges';
		seed?: number;
		veil?: number;
		class?: string;
	} = $props();

	let host: HTMLDivElement | undefined = $state();
	let canvas: HTMLCanvasElement | undefined = $state();

	const masks = {
		none: undefined,
		radial: 'radial-gradient(ellipse 75% 70% at 50% 45%, black 35%, transparent 100%)',
		bottom: 'linear-gradient(to bottom, black 55%, transparent)',
		edges: 'linear-gradient(to bottom, transparent, black 12%, black 82%, transparent)'
	};

	function rng(s: number) {
		let a = s >>> 0;
		return () => {
			a = (a + 0x6d2b79f5) >>> 0;
			let t = a;
			t = Math.imul(t ^ (t >>> 15), t | 1);
			t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
			return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
		};
	}

	$effect(() => {
		if (!host || !canvas) return;
		const el = host;
		const cv = canvas;
		const ctx = cv.getContext('2d');
		if (!ctx) return;
		const size = cell;
		const reach = radius;
		const inset = gap;
		const reveal = mode === 'reveal';
		const cover = Math.max(0, Math.min(1, veil));
		const random = rng(seed);
		const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

		let w = 0;
		let h = 0;
		let cols = 0;
		let rows = 0;
		let heat = new Float32Array(0);
		let rust = new Float32Array(0);
		let noise = new Float32Array(0);
		let colors = { fresh: '', stain: '', line: '', bg: '' };
		let raf = 0;
		let visible = true;
		let last = 0;
		let idle = 0;
		let pointer: { x: number; y: number } | null = null;

		function read() {
			const cs = getComputedStyle(el);
			const v = (name: string) => cs.getPropertyValue(name).trim() || 'currentColor';
			colors = { fresh: v(fresh), stain: v(stain), line: v(line), bg: v('--background') };
		}

		function touch(cx: number, cy: number, strength: number) {
			const r = Math.ceil(reach);
			for (let dy = -r; dy <= r; dy++) {
				for (let dx = -r; dx <= r; dx++) {
					const x = cx + dx;
					const y = cy + dy;
					if (x < 0 || y < 0 || x >= cols || y >= rows) continue;
					const d = Math.hypot(dx, dy) / Math.max(reach, 0.5);
					if (d > 1) continue;
					const i = y * cols + x;
					heat[i] = Math.max(heat[i], strength * (1 - d * d * 0.7));
				}
			}
		}

		function seedPatches(n: number) {
			for (let k = 0; k < n; k++) {
				touch(Math.floor(random() * cols), Math.floor(random() * rows), 0.6 + random() * 0.4);
			}
		}

		function step(dt: number) {
			const n = heat.length;
			for (let i = 0; i < n; i++) {
				const v = heat[i];
				if (v <= 0.001) continue;
				if (v > 0.45 && random() < dt * 2.2) {
					const x = i % cols;
					const y = (i / cols) | 0;
					const dir = (random() * 4) | 0;
					const nx = x + (dir === 0 ? 1 : dir === 1 ? -1 : 0);
					const ny = y + (dir === 2 ? 1 : dir === 3 ? -1 : 0);
					if (nx >= 0 && ny >= 0 && nx < cols && ny < rows) {
						const j = ny * cols + nx;
						heat[j] = Math.max(heat[j], v * (0.62 + noise[j] * 0.3));
					}
				}
				rust[i] = Math.max(rust[i], v * 0.7);
				heat[i] = Math.max(0, v - dt * (0.26 + noise[i] * 0.2));
			}
			for (let i = 0; i < n; i++) if (rust[i] > 0) rust[i] = Math.max(0, rust[i] - dt * 0.02);
		}

		function resize() {
			const box = el.getBoundingClientRect();
			const dpr = Math.min(devicePixelRatio || 1, 2);
			w = Math.max(1, Math.round(box.width));
			h = Math.max(1, Math.round(box.height));
			cv.width = Math.round(w * dpr);
			cv.height = Math.round(h * dpr);
			ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
			const nc = Math.ceil(w / size);
			const nr = Math.ceil(h / size);
			if (nc !== cols || nr !== rows) {
				cols = nc;
				rows = nr;
				heat = new Float32Array(cols * rows);
				rust = new Float32Array(cols * rows);
				noise = new Float32Array(cols * rows);
				for (let i = 0; i < noise.length; i++) noise[i] = random();
				seedPatches(Math.max(5, Math.round((cols * rows) / 70)));
				for (let s = 0; s < 40; s++) step(0.05);
				seedPatches(Math.max(3, Math.round((cols * rows) / 160)));
				for (let s = 0; s < 8; s++) step(0.05);
			}
			draw();
		}

		function draw() {
			ctx!.clearRect(0, 0, w, h);
			const ox = (w - cols * size) / 2;
			const oy = 0;
			if (reveal) {
				ctx!.fillStyle = colors.bg;
				for (let y = 0; y < rows; y++) {
					for (let x = 0; x < cols; x++) {
						const i = y * cols + x;
						const open = Math.min(0.62, heat[i] * 0.7 + rust[i] * 0.5);
						ctx!.globalAlpha = cover * (1 - open);
						ctx!.fillRect(ox + x * size, oy + y * size, size, size);
					}
				}
			}
			if (lines) {
				ctx!.globalAlpha = reveal ? 0.14 : 0.075;
				ctx!.strokeStyle = colors.line;
				ctx!.lineWidth = 1;
				ctx!.beginPath();
				for (let x = 0; x <= cols; x++) {
					ctx!.moveTo(Math.round(ox + x * size) + 0.5, 0);
					ctx!.lineTo(Math.round(ox + x * size) + 0.5, h);
				}
				for (let y = 0; y <= rows; y++) {
					ctx!.moveTo(0, Math.round(oy + y * size) + 0.5);
					ctx!.lineTo(w, Math.round(oy + y * size) + 0.5);
				}
				ctx!.stroke();
			}
			for (let y = 0; y < rows; y++) {
				for (let x = 0; x < cols; x++) {
					const i = y * cols + x;
					const px = ox + x * size;
					const py = oy + y * size;
					const r = rust[i];
					const v = heat[i];
					if (r > 0.02) {
						ctx!.globalAlpha = r * (reveal ? 0.3 : 0.55) * (0.55 + noise[i] * 0.45);
						ctx!.fillStyle = colors.stain;
						ctx!.fillRect(px + inset, py + inset, size - inset * 2, size - inset * 2);
					}
					if (v > 0.02) {
						const shrink = inset + (1 - v) * size * 0.18;
						ctx!.globalAlpha = Math.min(1, v * (reveal ? 0.55 : 0.95)) * (0.6 + noise[i] * 0.4);
						ctx!.fillStyle = colors.fresh;
						ctx!.fillRect(px + shrink, py + shrink, size - shrink * 2, size - shrink * 2);
						if (v > 0.55) {
							const s = Math.max(1.5, size * 0.07);
							ctx!.globalAlpha = (v - 0.55) * 1.6;
							ctx!.fillStyle = colors.bg;
							const a = noise[i];
							ctx!.fillRect(px + size * (0.2 + a * 0.4), py + size * (0.25 + (1 - a) * 0.35), s, s);
							ctx!.fillRect(px + size * (0.6 - a * 0.25), py + size * (0.6 + a * 0.15), s * 0.8, s * 0.8);
						}
					}
				}
			}
			ctx!.globalAlpha = 1;
		}

		function frame(t: number) {
			raf = 0;
			const dt = last ? Math.min(0.05, (t - last) / 1000) : 0.016;
			last = t;
			if (ambient) {
				idle += dt;
				if (idle > 0.32) {
					idle = 0;
					touch(Math.floor(random() * cols), Math.floor(random() * rows), 0.5 + random() * 0.35);
				}
			}
			step(dt);
			draw();
			if (visible && !document.hidden) raf = requestAnimationFrame(frame);
		}

		function start() {
			if (reduced || raf || !visible) return;
			last = 0;
			raf = requestAnimationFrame(frame);
		}

		function move(e: PointerEvent) {
			const box = cv.getBoundingClientRect();
			const x = e.clientX - box.left;
			const y = e.clientY - box.top;
			if (x < 0 || y < 0 || x > box.width || y > box.height) {
				pointer = null;
				return;
			}
			const ox = (box.width - cols * size) / 2;
			const cx = Math.floor((x - ox) / size);
			const cy = Math.floor(y / size);
			if (pointer) {
				const steps = Math.max(Math.abs(cx - pointer.x), Math.abs(cy - pointer.y));
				for (let s = 1; s <= steps; s++) {
					touch(Math.round(pointer.x + ((cx - pointer.x) * s) / steps), Math.round(pointer.y + ((cy - pointer.y) * s) / steps), 1);
				}
			} else touch(cx, cy, 1);
			pointer = { x: cx, y: cy };
			start();
		}

		read();
		const ro = new ResizeObserver(resize);
		ro.observe(el);
		const io = new IntersectionObserver((entries) => {
			visible = entries.some((e) => e.isIntersecting);
			if (visible) start();
		});
		io.observe(el);
		const mo = new MutationObserver(() => {
			read();
			draw();
		});
		mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-oxide', 'style'] });
		const onVis = () => {
			if (!document.hidden) start();
		};
		document.addEventListener('visibilitychange', onVis);
		if (!reduced) window.addEventListener('pointermove', move, { passive: true });
		start();

		return () => {
			cancelAnimationFrame(raf);
			ro.disconnect();
			io.disconnect();
			mo.disconnect();
			document.removeEventListener('visibilitychange', onVis);
			window.removeEventListener('pointermove', move);
		};
	});
</script>

<div
	bind:this={host}
	aria-hidden="true"
	class={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
	style:mask-image={masks[fade]}
	style:-webkit-mask-image={masks[fade]}
>
	<canvas bind:this={canvas} class="absolute inset-0 h-full w-full"></canvas>
</div>
