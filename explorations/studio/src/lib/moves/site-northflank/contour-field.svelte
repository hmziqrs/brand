<script lang="ts">
	import { cn } from '$brand/utils.js';
	import { onThemeChange, prefersReduced } from '$moves/northflank/dot-font';

	let {
		lines = 22,
		gap = 26,
		lens = 180,
		pull = 34,
		seeds = [
			{ x: 0.78, y: 0.32 },
			{ x: 0.12, y: 0.9 }
		],
		class: className
	}: { lines?: number; gap?: number; lens?: number; pull?: number; seeds?: { x: number; y: number }[]; class?: string } = $props();

	let canvas: HTMLCanvasElement | undefined = $state();
	let probe: HTMLSpanElement | undefined = $state();

	$effect(() => {
		const c = canvas;
		const pr = probe;
		if (!c || !pr) return;
		const ctx = c.getContext('2d');
		if (!ctx) return;
		const reduced = prefersReduced();
		const N = lines;
		const G = gap;
		const L = lens;
		const P = pull;
		const S = seeds;
		let line = '';
		let hot = '';
		const read = () => {
			pr.style.color = 'color-mix(in oklab, var(--foreground) 16%, transparent)';
			line = getComputedStyle(pr).color;
			pr.style.color = 'var(--orange)';
			hot = getComputedStyle(pr).color;
		};
		const m = { x: -9999, y: -9999, tx: -9999, ty: -9999, e: 0, te: 0 };
		let W = 1;
		let H = 1;
		let dpr = 1;

		const wob = (a: number, k: number, s: number, t: number) =>
			1 + 0.09 * Math.sin(a * 3 + k * 0.35 + s * 2 + t * 0.15) + 0.06 * Math.sin(a * 5 - k * 0.22 + s + t * 0.11) + 0.04 * Math.sin(a * 9 + k * 0.5);

		const path = (cx: number, cy: number, r: number, k: number, s: number, t: number) => {
			ctx.beginPath();
			const steps = 140;
			for (let n = 0; n <= steps; n++) {
				const a = (n / steps) * Math.PI * 2;
				let x = cx + Math.cos(a) * r * wob(a, k, s, t);
				let y = cy + Math.sin(a) * r * wob(a, k, s, t) * 0.78;
				const dx = m.x - x;
				const dy = m.y - y;
				const d2 = dx * dx + dy * dy;
				const f = m.e * P * Math.exp(-d2 / (L * L));
				const d = Math.sqrt(d2) || 1;
				x -= (dx / d) * f;
				y -= (dy / d) * f;
				if (n === 0) ctx.moveTo(x, y);
				else ctx.lineTo(x, y);
			}
		};

		const draw = (time: number) => {
			const t = reduced ? 0 : time / 1000;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			ctx.clearRect(0, 0, W, H);
			ctx.lineWidth = 1;
			for (let pass = 0; pass < 2; pass++) {
				if (pass === 1) {
					if (m.e < 0.02) break;
					ctx.save();
					ctx.beginPath();
					ctx.arc(m.x, m.y, L * 0.85, 0, Math.PI * 2);
					ctx.clip();
					ctx.globalAlpha = m.e;
				}
				ctx.strokeStyle = pass ? hot : line;
				S.forEach((s, si) => {
					for (let k = 1; k <= N; k++) {
						path(s.x * W, s.y * H, k * G, k, si, t);
						ctx.stroke();
					}
				});
				if (pass === 1) ctx.restore();
			}
			ctx.globalAlpha = 1;
		};

		const size = () => {
			dpr = Math.min(2, window.devicePixelRatio || 1);
			W = Math.max(1, c.clientWidth);
			H = Math.max(1, c.clientHeight);
			c.width = Math.round(W * dpr);
			c.height = Math.round(H * dpr);
			draw(performance.now());
		};
		let raf = 0;
		let visible = true;
		let last = 0;
		const loop = (now: number) => {
			raf = 0;
			if (!visible) return;
			m.x += (m.tx - m.x) * 0.14;
			m.y += (m.ty - m.y) * 0.14;
			m.e += (m.te - m.e) * 0.08;
			if (now - last > 30) {
				last = now;
				draw(now);
			}
			raf = requestAnimationFrame(loop);
		};
		const move = (e: PointerEvent) => {
			const r = c.getBoundingClientRect();
			m.tx = e.clientX - r.left;
			m.ty = e.clientY - r.top;
			if (m.x < -9000) {
				m.x = m.tx;
				m.y = m.ty;
			}
			m.te = m.tx >= 0 && m.tx <= r.width && m.ty >= 0 && m.ty <= r.height ? 1 : 0;
		};
		read();
		size();
		if (!reduced) {
			raf = requestAnimationFrame(loop);
			window.addEventListener('pointermove', move, { passive: true });
		}
		const ro = new ResizeObserver(size);
		ro.observe(c);
		const io = new IntersectionObserver((e) => {
			visible = e.some((x) => x.isIntersecting);
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

<span data-slot="contour-field" class={cn('pointer-events-none absolute inset-0 block', className)} aria-hidden="true">
	<canvas bind:this={canvas} class="block h-full w-full"></canvas>
	<span bind:this={probe} class="hidden"></span>
</span>
