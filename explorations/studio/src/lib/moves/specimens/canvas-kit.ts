export type RGB = [number, number, number];

export function readColor(host: Element, css: string): RGB {
	const probe = document.createElement('span');
	probe.style.color = css;
	probe.style.display = 'none';
	host.appendChild(probe);
	const resolved = getComputedStyle(probe).color;
	probe.remove();
	const c = document.createElement('canvas');
	c.width = c.height = 1;
	const x = c.getContext('2d', { willReadFrequently: true })!;
	x.fillStyle = resolved;
	x.fillRect(0, 0, 1, 1);
	const d = x.getImageData(0, 0, 1, 1).data;
	return [d[0], d[1], d[2]];
}

export const rgba = ([r, g, b]: RGB, a = 1) => `rgba(${r},${g},${b},${a})`;
export const mix = (a: RGB, b: RGB, t: number): RGB => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];

export function rng(seed: number) {
	let s = seed >>> 0 || 1;
	return () => {
		s ^= s << 13;
		s ^= s >>> 17;
		s ^= s << 5;
		return (s >>> 0) / 4294967296;
	};
}

export const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

type Frame = { ctx: CanvasRenderingContext2D; w: number; h: number; t: number; dt: number };

export function mountCanvas(
	canvas: HTMLCanvasElement,
	opts: {
		animate: boolean;
		setup?: (f: Omit<Frame, 't' | 'dt'>) => void;
		draw: (f: Frame) => void;
		dpr?: number;
	}
) {
	const ctx = canvas.getContext('2d')!;
	let w = 0;
	let h = 0;
	let raf = 0;
	let visible = true;
	let last = 0;
	let t = 0;
	const still = !opts.animate || reducedMotion();

	const size = () => {
		const r = canvas.getBoundingClientRect();
		const dpr = Math.min(opts.dpr ?? devicePixelRatio ?? 1, 2);
		w = Math.max(1, Math.round(r.width));
		h = Math.max(1, Math.round(r.height));
		canvas.width = Math.round(w * dpr);
		canvas.height = Math.round(h * dpr);
		ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		opts.setup?.({ ctx, w, h });
		if (still) opts.draw({ ctx, w, h, t, dt: 0 });
	};

	const loop = (now: number) => {
		raf = requestAnimationFrame(loop);
		if (!visible) {
			last = now;
			return;
		}
		const dt = Math.min(0.05, last ? (now - last) / 1000 : 0.016);
		last = now;
		t += dt;
		opts.draw({ ctx, w, h, t, dt });
	};

	const ro = new ResizeObserver(size);
	ro.observe(canvas);
	const io = new IntersectionObserver((e) => (visible = e.some((x) => x.isIntersecting)));
	io.observe(canvas);
	size();
	if (!still) raf = requestAnimationFrame(loop);

	return {
		still,
		redraw: () => opts.draw({ ctx, w, h, t, dt: 0 }),
		destroy() {
			cancelAnimationFrame(raf);
			ro.disconnect();
			io.disconnect();
		}
	};
}

export const bayer8 = (() => {
	const m = [
		[0, 32, 8, 40, 2, 34, 10, 42],
		[48, 16, 56, 24, 50, 18, 58, 26],
		[12, 44, 4, 36, 14, 46, 6, 38],
		[60, 28, 52, 20, 62, 30, 54, 22],
		[3, 35, 11, 43, 1, 33, 9, 41],
		[51, 19, 59, 27, 49, 17, 57, 25],
		[15, 47, 7, 39, 13, 45, 5, 37],
		[63, 31, 55, 23, 61, 29, 53, 21]
	];
	return (x: number, y: number) => (m[y & 7][x & 7] + 0.5) / 64;
})();

export function rasterText(text: string, cols: number, rows: number, font: string): Float32Array {
	const c = document.createElement('canvas');
	c.width = cols;
	c.height = rows;
	const x = c.getContext('2d', { willReadFrequently: true })!;
	x.fillStyle = 'black';
	x.fillRect(0, 0, cols, rows);
	x.fillStyle = 'white';
	x.textBaseline = 'alphabetic';
	let size = rows * 1.2;
	x.font = `${font.replace('{size}', `${size}px`)}`;
	const wFit = x.measureText(text).width;
	size = Math.min(size, (size * cols * 0.98) / wFit);
	x.font = `${font.replace('{size}', `${size}px`)}`;
	const m = x.measureText(text);
	const asc = m.actualBoundingBoxAscent;
	const desc = m.actualBoundingBoxDescent;
	const y = (rows - (asc + desc)) / 2 + asc;
	x.fillText(text, (cols - m.width) / 2, y);
	const d = x.getImageData(0, 0, cols, rows).data;
	const out = new Float32Array(cols * rows);
	for (let i = 0; i < out.length; i++) out[i] = d[i * 4] / 255;
	return out;
}

export type Pointer = { x: number; y: number; inside: boolean; live: boolean; speed: number; dwell: number };

export function trackPointer(canvas: HTMLCanvasElement, onMove?: () => void) {
	const host = (canvas.closest('[data-pointer-host], .spec-pane') as HTMLElement | null) ?? canvas.parentElement!;
	const p: Pointer = { x: -1e4, y: -1e4, inside: false, live: false, speed: 0, dwell: 0 };
	let tx = -1e4;
	let ty = -1e4;
	let idle = 99;
	const move = (e: PointerEvent) => {
		const r = canvas.getBoundingClientRect();
		tx = e.clientX - r.left;
		ty = e.clientY - r.top;
		if (!p.inside) {
			p.x = tx;
			p.y = ty;
		}
		p.inside = true;
		idle = 0;
		onMove?.();
	};
	const leave = () => (p.inside = false);
	host.addEventListener('pointermove', move);
	host.addEventListener('pointerleave', leave);
	return {
		p,
		step(dt: number, w: number, h: number, t: number, ghost: boolean | 'hop' = true, ease = 10) {
			idle += dt;
			const real = p.inside && idle < 4;
			if (!real && ghost === 'hop') {
				const r = rng(Math.floor(t / 3.4) * 7919 + 13);
				tx = w * (0.45 + r() * 0.5);
				ty = h * (0.12 + r() * 0.76);
			} else if (!real && ghost) {
				tx = w * (0.62 + 0.26 * Math.cos(t * 0.37));
				ty = h * (0.5 + 0.3 * Math.sin(t * 0.61));
			}
			const k = dt ? 1 - Math.exp(-dt * ease) : 1;
			const ox = p.x;
			const oy = p.y;
			p.x += (tx - p.x) * k;
			p.y += (ty - p.y) * k;
			const sp = dt ? Math.hypot(p.x - ox, p.y - oy) / dt : 0;
			p.speed += (sp - p.speed) * Math.min(1, dt * 8);
			p.live = real || !!ghost;
			p.dwell = p.speed < 60 && p.live ? p.dwell + dt : 0;
		},
		snap() {
			p.x = tx;
			p.y = ty;
			p.live = p.inside;
		},
		destroy() {
			host.removeEventListener('pointermove', move);
			host.removeEventListener('pointerleave', leave);
		}
	};
}

export function valueNoise(seed = 1) {
	const r = rng(seed);
	const perm = new Uint8Array(512);
	const vals = new Float32Array(256);
	for (let i = 0; i < 256; i++) {
		perm[i] = i;
		vals[i] = r();
	}
	for (let i = 255; i > 0; i--) {
		const j = Math.floor(r() * (i + 1));
		[perm[i], perm[j]] = [perm[j], perm[i]];
	}
	for (let i = 0; i < 256; i++) perm[i + 256] = perm[i];
	const at = (x: number, y: number) => vals[perm[(perm[x & 255] + y) & 511]];
	const s = (t: number) => t * t * (3 - 2 * t);
	const n = (x: number, y: number) => {
		const xi = Math.floor(x);
		const yi = Math.floor(y);
		const fx = s(x - xi);
		const fy = s(y - yi);
		const a = at(xi, yi);
		const b = at(xi + 1, yi);
		const c = at(xi, yi + 1);
		const d = at(xi + 1, yi + 1);
		return a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy;
	};
	return (x: number, y: number, oct = 3) => {
		let v = 0;
		let amp = 0.5;
		let f = 1;
		let norm = 0;
		for (let o = 0; o < oct; o++) {
			v += n(x * f, y * f) * amp;
			norm += amp;
			amp *= 0.5;
			f *= 2.03;
		}
		return v / norm;
	};
}

export function followPointer(node: HTMLElement, vars: (x: number, y: number) => Record<string, string>) {
	const host = (node.closest('[data-pointer-host], .spec-pane') as HTMLElement | null) ?? node.parentElement!;
	let keys: string[] = [];
	const move = (e: PointerEvent) => {
		const r = node.getBoundingClientRect();
		const v = vars((e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height);
		keys = Object.keys(v);
		for (const k of keys) node.style.setProperty(k, v[k]);
		node.dataset.live = '';
	};
	const leave = () => {
		for (const k of keys) node.style.removeProperty(k);
		delete node.dataset.live;
	};
	host.addEventListener('pointermove', move);
	host.addEventListener('pointerleave', leave);
	return () => {
		host.removeEventListener('pointermove', move);
		host.removeEventListener('pointerleave', leave);
	};
}
