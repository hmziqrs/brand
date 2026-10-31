<script lang="ts">
	import { cn } from '$brand/utils.js';
	import { onThemeChange, prefersReduced } from './dot-font';

	let {
		tone = 'accent',
		cell = 7,
		shape = 'square',
		from = 'bottom',
		strength = 1,
		animate = true,
		class: className
	}: {
		tone?: 'accent' | 'ink' | 'on-accent';
		cell?: number;
		shape?: 'square' | 'round';
		from?: 'bottom' | 'top' | 'center';
		strength?: number;
		animate?: boolean;
		class?: string;
	} = $props();

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
	let colorEl: HTMLSpanElement | undefined = $state();

	$effect(() => {
		const c = canvas;
		if (!c || !colorEl) return;
		const ctx = c.getContext('2d');
		if (!ctx) return;
		const reduced = prefersReduced();
		let color = getComputedStyle(colorEl).color;
		let raf = 0;
		let last = 0;
		let visible = true;
		const g = cell;
		const dir = from;
		const k = strength;

		const draw = (time: number) => {
			const W = c.width;
			const H = c.height;
			const dpr = W / Math.max(1, c.clientWidth);
			const step = g * dpr;
			const cols = Math.ceil(W / step);
			const rows = Math.ceil(H / step);
			ctx.clearRect(0, 0, W, H);
			ctx.fillStyle = color;
			const t = time / 1000;
			for (let y = 0; y < rows; y++) {
				const fy = y / Math.max(1, rows - 1);
				const base = dir === 'bottom' ? fy : dir === 'top' ? 1 - fy : 1 - Math.abs(fy - 0.5) * 2;
				for (let x = 0; x < cols; x++) {
					const fx = x / cols;
					const wave = 0.16 * Math.sin(fx * 9 + t * 0.35) + 0.12 * Math.sin(fx * 23 - fy * 7 + t * 0.6) + 0.08 * Math.sin((fx + fy) * 31 - t * 0.9);
					const v = (Math.pow(base, 1.6) * 1.05 + wave * base) * k;
					if (v > B[y & 7][x & 7]) {
						const a = Math.min(1, 0.35 + v * 0.65);
						ctx.globalAlpha = a;
						if (shape === 'round') {
							ctx.beginPath();
							ctx.arc(x * step + step / 2, y * step + step / 2, step * 0.3, 0, Math.PI * 2);
							ctx.fill();
						} else {
							const s = step * 0.55;
							ctx.fillRect(x * step + (step - s) / 2, y * step + (step - s) / 2, s, s);
						}
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

		const moving = animate && !reduced;
		const loop = (now: number) => {
			raf = 0;
			if (!visible) return;
			if (now - last > 90) {
				last = now;
				draw(now);
			}
			raf = requestAnimationFrame(loop);
		};
		size();
		if (moving) raf = requestAnimationFrame(loop);
		const ro = new ResizeObserver(size);
		ro.observe(c);
		const io = new IntersectionObserver((e) => {
			visible = e.some((x) => x.isIntersecting);
			if (visible && moving && !raf) raf = requestAnimationFrame(loop);
		});
		io.observe(c);
		const off = onThemeChange(() => {
			color = getComputedStyle(colorEl!).color;
			draw(performance.now());
		});
		return () => {
			cancelAnimationFrame(raf);
			ro.disconnect();
			io.disconnect();
			off();
		};
	});
</script>

<span class={cn('pointer-events-none absolute inset-0 block', className)} aria-hidden="true">
	<canvas bind:this={canvas} class="block h-full w-full"></canvas>
	<span bind:this={colorEl} class={cn('hidden', tone === 'accent' ? 'text-orange' : tone === 'ink' ? 'text-foreground' : 'text-(--on-orange)')}></span>
</span>
