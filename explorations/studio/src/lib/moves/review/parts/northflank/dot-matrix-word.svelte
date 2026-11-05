<script lang="ts">
	import { cn } from '$brand/utils.js';
	import { hash, layoutWord, onThemeChange, prefersReduced, rng } from './dot-font';

	type Tone = 'accent' | 'ink' | 'on-accent';

	let {
		word,
		tone = 'accent',
		markTone = 'accent',
		shape = 'round',
		padX = 0,
		padY = 0,
		scatter = 0,
		dim = 0.1,
		grid = true,
		rust = true,
		duration = 2200,
		twinkle = true,
		label,
		class: className
	}: {
		word: string;
		tone?: Tone;
		markTone?: Tone;
		shape?: 'round' | 'square';
		padX?: number;
		padY?: number;
		scatter?: number;
		dim?: number;
		grid?: boolean;
		rust?: boolean;
		duration?: number;
		twinkle?: boolean;
		label?: string;
		class?: string;
	} = $props();

	const toneClass: Record<Tone, string> = {
		accent: 'text-orange',
		ink: 'text-foreground',
		'on-accent': 'text-(--on-orange)'
	};

	const layout = $derived(layoutWord(word));
	const cols = $derived(layout.cols + padX * 2);
	const rows = $derived(layout.rows + padY * 2);

	let canvas: HTMLCanvasElement | undefined = $state();
	let onEl: HTMLSpanElement | undefined = $state();
	let markEl: HTMLSpanElement | undefined = $state();
	let inkEl: HTMLSpanElement | undefined = $state();

	$effect(() => {
		const c = canvas;
		if (!c || !onEl || !markEl || !inkEl) return;
		const ctx = c.getContext('2d');
		if (!ctx) return;
		const L = layout;
		const C = cols;
		const R = rows;
		const px = padX;
		const py = padY;
		const random = rng(hash(word));
		const lit = new Map<number, { mark: boolean; t0: number }>();
		for (const cell of L.cells) {
			const x = cell.x + px;
			const y = cell.y + py;
			const spread = (cell.x / Math.max(1, L.cols)) * 0.55 + random() * 0.45;
			lit.set(y * C + x, { mark: cell.mark, t0: spread * duration });
		}
		const sparks: { i: number; phase: number; speed: number }[] = [];
		for (let i = 0; i < C * R; i++) {
			if (!lit.has(i) && random() < scatter) sparks.push({ i, phase: random() * Math.PI * 2, speed: 0.6 + random() * 1.8 });
		}
		let colors = { on: '', mark: '', ink: '' };
		const readColors = () => {
			colors = {
				on: getComputedStyle(onEl!).color,
				mark: getComputedStyle(markEl!).color,
				ink: getComputedStyle(inkEl!).color
			};
		};
		readColors();

		const reduced = prefersReduced();
		const animateIn = rust && !reduced;
		let start = performance.now();
		let raf = 0;
		let visible = true;
		let last = 0;
		let cell = 1;

		const size = () => {
			const w = c.clientWidth;
			if (!w) return;
			const dpr = Math.min(2, window.devicePixelRatio || 1);
			c.width = Math.round(w * dpr);
			c.height = Math.round((w * R) / C * dpr);
			cell = c.width / C;
		};

		const dot = (i: number, color: string, alpha: number, k = 1) => {
			const x = (i % C) * cell;
			const y = Math.floor(i / C) * cell;
			ctx.globalAlpha = alpha;
			ctx.fillStyle = color;
			if (shape === 'round') {
				ctx.beginPath();
				ctx.arc(x + cell / 2, y + cell / 2, cell * 0.36 * k, 0, Math.PI * 2);
				ctx.fill();
			} else {
				const s = cell * 0.78 * k;
				ctx.fillRect(x + (cell - s) / 2, y + (cell - s) / 2, s, s);
			}
		};

		const draw = (now: number) => {
			const t = now - start;
			ctx.globalAlpha = 1;
			ctx.clearRect(0, 0, c.width, c.height);
			if (grid) for (let i = 0; i < C * R; i++) if (!lit.has(i)) dot(i, colors.ink, dim * 1.6, 0.42);
			const secs = now / 1000;
			for (const s of sparks) {
				const v = 0.5 + 0.5 * Math.sin(secs * s.speed + s.phase);
				const a = reduced || !twinkle ? 0.35 : v * v * 0.7;
				if (a > 0.04) dot(s.i, colors.on, a);
			}
			let settled = true;
			for (const [i, d] of lit) {
				const color = d.mark ? colors.mark : colors.on;
				if (!animateIn || t >= d.t0 + 260) dot(i, color, 1);
				else if (t >= d.t0) {
					const k = (t - d.t0) / 260;
					dot(i, colors.ink, 1 - k);
					dot(i, color, k);
				} else if (t >= d.t0 - 420) dot(i, colors.ink, Math.random() < 0.5 ? 0.6 : dim);
				else dot(i, colors.ink, dim * 1.6, 0.42);
			}
		};

		const loop = (now: number) => {
			raf = 0;
			if (!visible) return;
			const settled = now - start > duration + 700;
			const fps = settled ? 12 : 40;
			if (now - last >= 1000 / fps) {
				last = now;
				draw(now);
			}
			if (!settled || (twinkle && sparks.length && !reduced)) raf = requestAnimationFrame(loop);
		};

		size();
		draw(animateIn ? performance.now() : start + duration + 1000);
		if (animateIn || (twinkle && sparks.length && !reduced)) raf = requestAnimationFrame(loop);

		const ro = new ResizeObserver(() => {
			size();
			draw(performance.now());
		});
		ro.observe(c);
		const io = new IntersectionObserver((entries) => {
			const was = visible;
			visible = entries.some((e) => e.isIntersecting);
			if (!visible) {
				cancelAnimationFrame(raf);
				raf = 0;
				draw(start + duration + 1000);
			} else if (!was) {
				if (animateIn) start = performance.now();
				if (!raf) raf = requestAnimationFrame(loop);
			}
		});
		io.observe(c);
		const off = onThemeChange(() => {
			readColors();
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

<span class={cn('relative block', className)} role="img" aria-label={label ?? word}>
	<canvas bind:this={canvas} class="block h-auto w-full" style:aspect-ratio="{cols} / {rows}"></canvas>
	<span bind:this={onEl} class={cn('hidden', toneClass[tone])}></span>
	<span bind:this={markEl} class={cn('hidden', toneClass[markTone])}></span>
	<span bind:this={inkEl} class={cn('hidden', tone === 'on-accent' ? 'text-(--on-orange)' : 'text-foreground')}></span>
</span>
