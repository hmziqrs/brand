<script lang="ts">
	import { cn } from '$brand/utils.js';

	let {
		cell = 56,
		radius = 2.2,
		lines = true,
		fade = 0.94,
		strength = 0.38,
		class: className
	}: {
		cell?: number;
		radius?: number;
		lines?: boolean;
		fade?: number;
		strength?: number;
		class?: string;
	} = $props();

	let canvas: HTMLCanvasElement | undefined = $state();
	let probe: HTMLElement | undefined = $state();

	$effect(() => {
		if (!canvas || !probe) return;
		const host = canvas.parentElement!.parentElement!;
		const ctx = canvas.getContext('2d')!;
		const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
		let w = 0;
		let h = 0;
		let cols = 0;
		let rows = 0;
		let heat = new Float32Array(0);
		let fill = '';
		let line = '';
		let raf = 0;
		let px = -1;
		let py = -1;

		const colors = () => {
			const cs = getComputedStyle(probe!);
			fill = cs.color;
			line = cs.borderTopColor;
		};
		const size = () => {
			const r = canvas!.getBoundingClientRect();
			const dpr = Math.min(devicePixelRatio || 1, 2);
			w = r.width;
			h = r.height;
			canvas!.width = Math.round(w * dpr);
			canvas!.height = Math.round(h * dpr);
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			cols = Math.ceil(w / cell) + 1;
			rows = Math.ceil(h / cell) + 1;
			heat = new Float32Array(cols * rows);
			colors();
			draw();
		};
		const ox = () => (w % cell) / 2;
		const draw = () => {
			ctx.clearRect(0, 0, w, h);
			const o = ox();
			ctx.fillStyle = fill;
			for (let j = 0; j < rows; j++)
				for (let i = 0; i < cols; i++) {
					const v = heat[j * cols + i];
					if (v < 0.01) continue;
					ctx.globalAlpha = v * strength;
					ctx.fillRect(o + (i - 1) * cell + 1, j * cell + 1, cell - 1, cell - 1);
				}
			ctx.globalAlpha = 1;
			if (lines) {
				ctx.strokeStyle = line;
				ctx.lineWidth = 1;
				ctx.beginPath();
				for (let i = 0; i < cols; i++) {
					const x = Math.round(o + (i - 1) * cell) + 0.5;
					ctx.moveTo(x, 0);
					ctx.lineTo(x, h);
				}
				for (let j = 0; j < rows; j++) {
					const y = Math.round(j * cell) + 0.5;
					ctx.moveTo(0, y);
					ctx.lineTo(w, y);
				}
				ctx.stroke();
			}
		};
		const tick = () => {
			let live = false;
			const o = ox();
			for (let j = 0; j < rows; j++)
				for (let i = 0; i < cols; i++) {
					const k = j * cols + i;
					let v = heat[k] * fade;
					if (px >= 0) {
						const cx = o + (i - 0.5) * cell;
						const cy = (j + 0.5) * cell;
						const d = Math.hypot(cx - px, cy - py) / cell;
						if (d < radius) v = Math.max(v, (1 - d / radius) ** 1.6);
					}
					heat[k] = v;
					if (v > 0.01) live = true;
				}
			draw();
			raf = live || px >= 0 ? requestAnimationFrame(tick) : 0;
		};
		const move = (e: PointerEvent) => {
			const r = canvas!.getBoundingClientRect();
			px = e.clientX - r.left;
			py = e.clientY - r.top;
			if (reduced) {
				heat.fill(0);
				const i = Math.floor((px - ox()) / cell) + 1;
				const j = Math.floor(py / cell);
				if (i >= 0 && i < cols && j >= 0 && j < rows) heat[j * cols + i] = 1;
				draw();
			} else if (!raf) raf = requestAnimationFrame(tick);
		};
		const leave = () => {
			px = py = -1;
			if (reduced) {
				heat.fill(0);
				draw();
			}
		};
		const ro = new ResizeObserver(size);
		ro.observe(canvas);
		const mo = new MutationObserver(() => {
			colors();
			draw();
		});
		mo.observe(document.documentElement, { attributes: true });
		host.addEventListener('pointermove', move);
		host.addEventListener('pointerleave', leave);
		return () => {
			cancelAnimationFrame(raf);
			ro.disconnect();
			mo.disconnect();
			host.removeEventListener('pointermove', move);
			host.removeEventListener('pointerleave', leave);
		};
	});
</script>

<div aria-hidden="true" class={cn('hover-grid pointer-events-none absolute inset-0 overflow-hidden', className)}>
	<span bind:this={probe} class="hidden border-t text-primary [border-color:var(--line)]"></span>
	<canvas bind:this={canvas} class="block size-full"></canvas>
</div>
