<script lang="ts">
	import { cn } from '$brand/utils.js';
	import { hash, layoutWord, onThemeChange, prefersReduced, rng } from '$moves/northflank/dot-font';

	let { word, label, class: className }: { word: string; label?: string; class?: string } = $props();

	const PAD = 1;
	const layout = $derived(layoutWord(word));
	const cols = $derived(layout.cols + PAD * 2);
	const rows = $derived(layout.rows + PAD * 2);

	let canvas: HTMLCanvasElement | undefined = $state();
	let inkEl: HTMLSpanElement | undefined = $state();
	let accentEl: HTMLSpanElement | undefined = $state();

	$effect(() => {
		const c = canvas;
		if (!c || !inkEl || !accentEl) return;
		const ctx = c.getContext('2d');
		if (!ctx) return;
		const C = cols;
		const R = rows;
		const random = rng(hash(word));
		const FLY = 900;
		const dots = layout.cells.map((cell) => {
			const hx = cell.x + PAD;
			const hy = cell.y + PAD;
			return {
				hx,
				hy,
				sx: hx + (random() - 0.5) * C * 0.9,
				sy: hy + (random() - 0.5) * R * 2.4,
				t0: (cell.x / Math.max(1, layout.cols)) * 700 + random() * 500,
				ox: 0,
				oy: 0,
				glow: 0
			};
		});
		const end = Math.max(...dots.map((d) => d.t0)) + FLY + 100;

		let ink = '';
		let accent = '';
		const readColors = () => {
			ink = getComputedStyle(inkEl!).color;
			accent = getComputedStyle(accentEl!).color;
		};
		readColors();

		const reduced = prefersReduced();
		let start = -1;
		let raf = 0;
		let cell = 1;
		let px = -1e5;
		let py = -1e5;

		const size = () => {
			const w = c.clientWidth;
			if (!w) return;
			const dpr = Math.min(2, window.devicePixelRatio || 1);
			c.width = Math.round(w * dpr);
			c.height = Math.round(((w * R) / C) * dpr);
			cell = c.width / C;
		};

		const ease = (k: number) => 1 - Math.pow(1 - k, 3);

		const draw = (now: number) => {
			const t = start < 0 ? (reduced ? end : 0) : now - start;
			ctx.clearRect(0, 0, c.width, c.height);
			let busy = t < end;
			const RAD = 4.5;
			for (const d of dots) {
				let tx = 0;
				let ty = 0;
				let tg = 0;
				if (!reduced) {
					const dx = d.hx + 0.5 - px;
					const dy = d.hy + 0.5 - py;
					const dist = Math.hypot(dx, dy);
					if (dist < RAD) {
						const f = (1 - dist / RAD) ** 2;
						tx = (dx / (dist || 1)) * f * 0.7;
						ty = (dy / (dist || 1)) * f * 0.7;
						tg = f;
					}
				}
				d.ox += (tx - d.ox) * 0.18;
				d.oy += (ty - d.oy) * 0.18;
				d.glow += (tg - d.glow) * 0.18;
				if (Math.abs(tx - d.ox) + Math.abs(ty - d.oy) + Math.abs(tg - d.glow) > 0.004) busy = true;

				let x = d.hx;
				let y = d.hy;
				let a = 1;
				const lt = t - d.t0;
				if (lt < FLY) {
					const k = ease(Math.max(0, lt) / FLY);
					x = d.sx + (d.hx - d.sx) * k;
					y = d.sy + (d.hy - d.sy) * k;
					a = lt < 0 ? 0 : k < 0.85 ? (Math.random() < 0.25 ? 0.25 : 0.55 + k * 0.4) : 1;
				}
				x += d.ox;
				y += d.oy;
				if (a <= 0) continue;
				const r = cell * 0.36 * (1 + d.glow * 0.25);
				ctx.globalAlpha = a;
				ctx.fillStyle = ink;
				ctx.beginPath();
				ctx.arc((x + 0.5) * cell, (y + 0.5) * cell, r, 0, Math.PI * 2);
				ctx.fill();
				if (d.glow > 0.02) {
					ctx.globalAlpha = a * Math.min(1, d.glow * 1.4);
					ctx.fillStyle = accent;
					ctx.fill();
				}
			}
			ctx.globalAlpha = 1;
			return busy;
		};

		const loop = (now: number) => {
			raf = draw(now) ? requestAnimationFrame(loop) : 0;
		};
		const kick = () => {
			if (!raf) raf = requestAnimationFrame(loop);
		};

		size();
		draw(performance.now());

		const ro = new ResizeObserver(() => {
			size();
			draw(performance.now());
		});
		ro.observe(c);
		const io = new IntersectionObserver((entries) => {
			if (start < 0 && !reduced && entries.some((e) => e.isIntersecting)) {
				start = performance.now();
				kick();
			}
		});
		io.observe(c);

		const zone = c.closest('section') ?? c;
		const move = (e: PointerEvent) => {
			const r = c.getBoundingClientRect();
			px = ((e.clientX - r.left) / r.width) * C;
			py = ((e.clientY - r.top) / r.height) * R;
			kick();
		};
		const leave = () => {
			px = py = -1e5;
			kick();
		};
		if (!reduced) {
			zone.addEventListener('pointermove', move as EventListener);
			zone.addEventListener('pointerleave', leave);
		}
		const off = onThemeChange(() => {
			readColors();
			draw(performance.now());
		});
		return () => {
			cancelAnimationFrame(raf);
			ro.disconnect();
			io.disconnect();
			off();
			zone.removeEventListener('pointermove', move as EventListener);
			zone.removeEventListener('pointerleave', leave);
		};
	});
</script>

<span class={cn('relative block', className)} role="img" aria-label={label ?? word}>
	<canvas bind:this={canvas} class="block h-auto w-full" style:aspect-ratio="{cols} / {rows}"></canvas>
	<span bind:this={inkEl} class="hidden text-foreground"></span>
	<span bind:this={accentEl} class="hidden text-primary"></span>
</span>
