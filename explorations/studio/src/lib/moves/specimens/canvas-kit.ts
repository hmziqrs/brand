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
