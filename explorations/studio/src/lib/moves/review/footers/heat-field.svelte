<script lang="ts">
	import { cn } from '$brand/utils.js';
	import { onThemeChange, prefersReduced } from '$moves/northflank/dot-font';

	let { cell = 8, lens = 170, lift = 0.9, class: className }: { cell?: number; lens?: number; lift?: number; class?: string } = $props();

	const B = [
		[0, 32, 8, 40, 2, 34, 10, 42],
		[48, 16, 56, 24, 50, 18, 58, 26],
		[12, 44, 4, 36, 14, 46, 6, 38],
		[60, 28, 52, 20, 62, 30, 54, 22],
		[3, 35, 11, 43, 1, 33, 9, 41],
		[51, 19, 59, 27, 49, 17, 57, 25],
		[15, 47, 7, 39, 13, 45, 5, 37],
		[63, 31, 55, 23, 61, 29, 53, 21]
	].map((r) => r.map((v) => (v + 0.5) / 64));

	let canvas: HTMLCanvasElement | undefined = $state();
	let baseEl: HTMLSpanElement | undefined = $state();
	let hotEl: HTMLSpanElement | undefined = $state();

	$effect(() => {
		const c = canvas;
		if (!c || !baseEl || !hotEl) return;
		const ctx = c.getContext('2d');
		if (!ctx) return;
		const reduced = prefersReduced();
		const g = cell;
		const R = lens;
		const L = lift;
		let base = '';
		let hot = '';
		const read = () => {
			base = getComputedStyle(baseEl!).color;
			hot = getComputedStyle(hotEl!).color;
		};
		read();
		let raf = 0;
		let visible = true;
		let last = 0;
		const p = { x: -9999, y: -9999, tx: -9999, ty: -9999, e: 0, te: 0 };

		const draw = (time: number) => {
			const W = c.width;
			const H = c.height;
			const dpr = W / Math.max(1, c.clientWidth);
			const step = g * dpr;
			const cols = Math.ceil(W / step);
			const rows = Math.ceil(H / step);
			const r2 = (R * dpr) ** 2;
			const px = p.x * dpr;
			const py = p.y * dpr;
			const t = time / 1000;
			ctx.clearRect(0, 0, W, H);
			for (let y = 0; y < rows; y++) {
				const fy = y / Math.max(1, rows - 1);
				for (let x = 0; x < cols; x++) {
					const fx = x / cols;
					const cx = x * step + step / 2;
					const cy = y * step + step / 2;
					const near = p.e * Math.exp(-((cx - px) ** 2 + (cy - py) ** 2) / r2);
					const wave = 0.16 * Math.sin(fx * 9 + t * 0.35) + 0.12 * Math.sin(fx * 23 - fy * 7 + t * 0.6) + 0.08 * Math.sin((fx + fy) * 31 - t * 0.9);
					const v = Math.pow(fy, 1.6) * 1.05 + wave * fy + near * L;
					if (v > B[y & 7][x & 7]) {
						ctx.globalAlpha = Math.min(1, 0.3 + v * 0.6);
						ctx.fillStyle = near > 0.35 ? hot : base;
						const s = step * (0.5 + Math.min(0.25, near * 0.3));
						ctx.fillRect(cx - s / 2, cy - s / 2, s, s);
					}
				}
			}
			ctx.globalAlpha = 1;
		};

		const size = () => {
			const dpr = Math.min(2, window.devicePixelRatio || 1);
			c.width = Math.max(1, Math.round(c.clientWidth * dpr));
			c.height = Math.max(1, Math.round(c.clientHeight * dpr));
			draw(performance.now());
		};

		const loop = (now: number) => {
			raf = 0;
			if (!visible) return;
			p.x += (p.tx - p.x) * 0.18;
			p.y += (p.ty - p.y) * 0.18;
			p.e += (p.te - p.e) * 0.08;
			if (now - last > 40) {
				last = now;
				draw(now);
			}
			raf = requestAnimationFrame(loop);
		};

		const move = (e: PointerEvent) => {
			const r = c.getBoundingClientRect();
			p.tx = e.clientX - r.left;
			p.ty = e.clientY - r.top;
			if (p.x < -9000) {
				p.x = p.tx;
				p.y = p.ty;
			}
			p.te = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top - R && e.clientY <= r.bottom + R ? 1 : 0;
			if (reduced) {
				p.x = p.tx;
				p.y = p.ty;
				p.e = p.te;
				draw(0);
			}
		};

		size();
		if (!reduced) raf = requestAnimationFrame(loop);
		window.addEventListener('pointermove', move, { passive: true });
		const ro = new ResizeObserver(size);
		ro.observe(c);
		const io = new IntersectionObserver((entries) => {
			visible = entries.some((x) => x.isIntersecting);
			if (visible && !reduced && !raf) raf = requestAnimationFrame(loop);
		});
		io.observe(c);
		const off = onThemeChange(() => {
			read();
			draw(performance.now());
		});
		return () => {
			cancelAnimationFrame(raf);
			window.removeEventListener('pointermove', move);
			ro.disconnect();
			io.disconnect();
			off();
		};
	});
</script>

<span data-slot="heat-field" class={cn('pointer-events-none absolute inset-0 block', className)} aria-hidden="true">
	<canvas bind:this={canvas} class="block h-full w-full"></canvas>
	<span bind:this={baseEl} class="hidden text-(--orange)"></span>
	<span bind:this={hotEl} class="hidden text-(--oxide-display) dark:text-yellow"></span>
</span>
