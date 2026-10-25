<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { stage, type Draw } from "./motion.js";

	const { Story } = defineMeta({ title: "Micro/Motion canvas", parameters: { layout: "centered" } });

	const TAU = Math.PI * 2;
	const rand = (seed: number) => {
		let s = seed;
		return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
	};

	function dotSwarm(): Draw {
		const r = rand(7);
		const dots = Array.from({ length: 220 }, () => ({ a: r() * TAU, d: Math.sqrt(r()), x: 0, y: 0, vx: 0, vy: 0, s: 0.6 + r() * 1.6 }));
		return (ctx, w, h, t, p, c) => {
			const R = Math.min(w, h) * 0.38;
			for (const d of dots) {
				const a = d.a + t * 0.15 * (1.2 - d.d);
				const hx = w / 2 + Math.cos(a) * d.d * R;
				const hy = h / 2 + Math.sin(a) * d.d * R;
				if (!d.x) {
					d.x = hx;
					d.y = hy;
				}
				const dx = d.x - p.x;
				const dy = d.y - p.y;
				const dist = Math.hypot(dx, dy) || 1;
				const push = Math.max(0, 70 - dist) / 70;
				d.vx = (d.vx + (hx - d.x) * 0.04 + (dx / dist) * push * 4) * 0.82;
				d.vy = (d.vy + (hy - d.y) * 0.04 + (dy / dist) * push * 4) * 0.82;
				d.x += d.vx;
				d.y += d.vy;
				ctx.fillStyle = push > 0.05 ? c.primary : c.fg;
				ctx.globalAlpha = 0.35 + 0.65 * (1 - d.d);
				ctx.beginPath();
				ctx.arc(d.x, d.y, d.s, 0, TAU);
				ctx.fill();
			}
			ctx.globalAlpha = 1;
		};
	}

	function lineSphere(): Draw {
		let ry = 0;
		let rx = 0.4;
		return (ctx, w, h, t, p, c) => {
			const R = Math.min(w, h) * 0.38;
			const ty = p.inside ? (p.x / w - 0.5) * 2 : t * 0.3;
			const tx = p.inside ? (p.y / h - 0.5) * 1.5 : 0.4;
			ry += (ty - ry) * 0.08;
			rx += (tx - rx) * 0.08;
			const project = (lat: number, lon: number) => {
				let x = Math.cos(lat) * Math.sin(lon);
				let y = Math.sin(lat);
				let z = Math.cos(lat) * Math.cos(lon);
				[x, z] = [x * Math.cos(ry) - z * Math.sin(ry), x * Math.sin(ry) + z * Math.cos(ry)];
				[y, z] = [y * Math.cos(rx) - z * Math.sin(rx), y * Math.sin(rx) + z * Math.cos(rx)];
				return [w / 2 + x * R, h / 2 + y * R, z];
			};
			ctx.lineWidth = 1;
			for (let i = 1; i < 12; i++) {
				const lat = -Math.PI / 2 + (i / 12) * Math.PI;
				for (let j = 0; j < 64; j++) {
					const [x1, y1, z1] = project(lat, (j / 64) * TAU);
					const [x2, y2] = project(lat, ((j + 1) / 64) * TAU);
					ctx.strokeStyle = z1 > 0 ? c.primary : c.border;
					ctx.globalAlpha = z1 > 0 ? 0.9 : 0.5;
					ctx.beginPath();
					ctx.moveTo(x1, y1);
					ctx.lineTo(x2, y2);
					ctx.stroke();
				}
			}
			ctx.globalAlpha = 1;
		};
	}

	function dotGlobe(): Draw {
		const points: [number, number][] = [];
		const n = 900;
		for (let i = 0; i < n; i++) {
			const y = 1 - (i / (n - 1)) * 2;
			points.push([Math.asin(y), i * 2.39996]);
		}
		let spin = 0;
		let velocity = 0.004;
		let lastX: number | undefined;
		return (ctx, w, h, _t, p, c) => {
			if (p.down && lastX !== undefined) velocity = (p.x - lastX) * 0.004;
			lastX = p.down ? p.x : undefined;
			spin += velocity;
			velocity += (0.004 - velocity) * 0.02;
			const R = Math.min(w, h) * 0.4;
			for (const [lat, lon] of points) {
				const l = lon + spin;
				const z = Math.cos(lat) * Math.cos(l);
				if (z < -0.1) continue;
				const land = Math.sin(lat * 3) * Math.cos(l * 2 - spin) + Math.sin(l * 3 + lat) > 0.4;
				ctx.fillStyle = land ? c.primary : c.muted;
				ctx.globalAlpha = 0.25 + 0.75 * Math.max(0, z);
				ctx.beginPath();
				ctx.arc(w / 2 + Math.cos(lat) * Math.sin(l) * R, h / 2 - Math.sin(lat) * R, land ? 1.6 : 1, 0, TAU);
				ctx.fill();
			}
			ctx.globalAlpha = 1;
		};
	}

	function metaballs(): Draw {
		const balls = [0, 1, 2, 3, 4].map((i) => ({ i, x: 0, y: 0, r: 26 + i * 6 }));
		return (ctx, w, h, t, p, c) => {
			const step = 6;
			for (const b of balls) {
				b.x = w / 2 + Math.cos(t * (0.5 + b.i * 0.13) + b.i * 2) * w * 0.25;
				b.y = h / 2 + Math.sin(t * (0.4 + b.i * 0.11) + b.i) * h * 0.25;
			}
			const all = p.inside ? [...balls, { i: 9, x: p.x, y: p.y, r: 36 }] : balls;
			ctx.fillStyle = c.primary;
			for (let y = 0; y < h; y += step) {
				for (let x = 0; x < w; x += step) {
					let f = 0;
					for (const b of all) f += (b.r * b.r) / ((x - b.x) ** 2 + (y - b.y) ** 2 + 1);
					if (f > 1) {
						ctx.globalAlpha = Math.min(1, (f - 1) * 2);
						ctx.fillRect(x, y, step - 1, step - 1);
					}
				}
			}
			ctx.globalAlpha = 1;
		};
	}

	function particles(): Draw {
		const r = rand(3);
		const ps = Array.from({ length: 160 }, () => ({ x: r(), y: r(), vx: 0, vy: 0 }));
		return (ctx, w, h, _t, p, c) => {
			for (const q of ps) {
				const x = q.x * w;
				const y = q.y * h;
				const dx = x - p.x;
				const dy = y - p.y;
				const d2 = dx * dx + dy * dy;
				if (d2 < 8000) {
					q.vx += (dx / Math.sqrt(d2 + 1)) * 0.0015;
					q.vy += (dy / Math.sqrt(d2 + 1)) * 0.0015;
				}
				q.vy -= 0.00002;
				q.x = (q.x + q.vx + 1) % 1;
				q.y = (q.y + q.vy + 1) % 1;
				q.vx *= 0.95;
				q.vy *= 0.95;
				ctx.fillStyle = d2 < 8000 ? c.primary : c.fg;
				ctx.globalAlpha = 0.7;
				ctx.fillRect(q.x * w, q.y * h, 2, 2);
			}
			ctx.globalAlpha = 1;
		};
	}

	function magneticDots(): Draw {
		return (ctx, w, h, _t, p, c) => {
			const gap = 22;
			for (let y = gap / 2; y < h; y += gap) {
				for (let x = gap / 2; x < w; x += gap) {
					const dx = p.x - x;
					const dy = p.y - y;
					const d = Math.hypot(dx, dy);
					const pull = Math.max(0, 1 - d / 120);
					ctx.fillStyle = pull > 0 ? c.primary : c.muted;
					ctx.globalAlpha = 0.35 + pull * 0.65;
					ctx.beginPath();
					ctx.arc(x + dx * pull * 0.25, y + dy * pull * 0.25, 1.5 + pull * 2.5, 0, TAU);
					ctx.fill();
				}
			}
			ctx.globalAlpha = 1;
		};
	}

	function network(): Draw {
		const r = rand(11);
		const nodes = Array.from({ length: 26 }, () => ({ x: r(), y: r(), vx: (r() - 0.5) * 0.002, vy: (r() - 0.5) * 0.002 }));
		return (ctx, w, h, _t, p, c) => {
			for (const n of nodes) {
				n.x += n.vx;
				n.y += n.vy;
				if (n.x < 0.05 || n.x > 0.95) n.vx *= -1;
				if (n.y < 0.05 || n.y > 0.95) n.vy *= -1;
			}
			const near = (n: { x: number; y: number }) => Math.hypot(n.x * w - p.x, n.y * h - p.y) < 70;
			for (let i = 0; i < nodes.length; i++) {
				for (let j = i + 1; j < nodes.length; j++) {
					const a = nodes[i];
					const b = nodes[j];
					const d = Math.hypot((a.x - b.x) * w, (a.y - b.y) * h);
					if (d > 110) continue;
					ctx.strokeStyle = near(a) || near(b) ? c.primary : c.border;
					ctx.globalAlpha = 1 - d / 110;
					ctx.beginPath();
					ctx.moveTo(a.x * w, a.y * h);
					ctx.lineTo(b.x * w, b.y * h);
					ctx.stroke();
				}
			}
			ctx.globalAlpha = 1;
			for (const n of nodes) {
				ctx.fillStyle = near(n) ? c.primary : c.fg;
				ctx.beginPath();
				ctx.arc(n.x * w, n.y * h, near(n) ? 4 : 2.5, 0, TAU);
				ctx.fill();
			}
		};
	}

	function smudge(): Draw {
		const trail: { x: number; y: number; life: number }[] = [];
		return (ctx, w, h, _t, p, c) => {
			ctx.fillStyle = c.fg;
			ctx.font = `600 ${Math.min(w / 5, 72)}px ui-sans-serif, system-ui`;
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.fillText("smudge", w / 2, h / 2);
			if (p.inside) trail.push({ x: p.x, y: p.y, life: 1 });
			ctx.globalCompositeOperation = "source-atop";
			for (const s of trail) {
				const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, 40);
				g.addColorStop(0, c.primary);
				g.addColorStop(1, "transparent");
				ctx.globalAlpha = s.life;
				ctx.fillStyle = g;
				ctx.fillRect(s.x - 40, s.y - 40, 80, 80);
				s.life -= 0.02;
			}
			ctx.globalCompositeOperation = "source-over";
			ctx.globalAlpha = 1;
			while (trail.length && trail[0].life <= 0) trail.shift();
		};
	}

	function eyes(): Draw {
		let lx = 0;
		let ly = 0;
		return (ctx, w, h, t, p, c) => {
			const tx = p.inside ? p.x : w / 2 + Math.cos(t) * 60;
			const ty = p.inside ? p.y : h / 2 + Math.sin(t * 1.3) * 30;
			lx += (tx - lx) * 0.15;
			ly += (ty - ly) * 0.15;
			for (const ex of [w / 2 - 50, w / 2 + 50]) {
				const ey = h / 2;
				ctx.fillStyle = c.fg;
				ctx.beginPath();
				ctx.ellipse(ex, ey, 38, 44, 0, 0, TAU);
				ctx.fill();
				const a = Math.atan2(ly - ey, lx - ex);
				const d = Math.min(18, Math.hypot(lx - ex, ly - ey) * 0.15);
				ctx.fillStyle = c.bg;
				ctx.beginPath();
				ctx.arc(ex + Math.cos(a) * d, ey + Math.sin(a) * d, 14, 0, TAU);
				ctx.fill();
			}
		};
	}

	function light(): Draw {
		let lx = 0;
		let ly = 0;
		return (ctx, w, h, _t, p, c) => {
			lx += ((p.inside ? p.x : w / 2) - lx) * 0.12;
			ly += ((p.inside ? p.y : h / 3) - ly) * 0.12;
			const g = ctx.createRadialGradient(lx, ly, 0, lx, ly, Math.max(w, h) * 0.5);
			g.addColorStop(0, c.primary);
			g.addColorStop(1, "transparent");
			ctx.globalAlpha = 0.35;
			ctx.fillStyle = g;
			ctx.fillRect(0, 0, w, h);
			ctx.globalAlpha = 1;
			for (let x = 24; x < w; x += 24) {
				for (let y = 24; y < h; y += 24) {
					const d = Math.hypot(x - lx, y - ly);
					ctx.fillStyle = c.fg;
					ctx.globalAlpha = Math.max(0.08, 1 - d / 200);
					ctx.fillRect(x - 1, y - 1, 2, 2);
				}
			}
			ctx.globalAlpha = 1;
		};
	}

	function confetti(): Draw {
		const r = rand(5);
		let bits: { x: number; y: number; vx: number; vy: number; a: number; va: number; k: number }[] = [];
		let wasDown = false;
		return (ctx, w, h, _t, p, c) => {
			if (p.down && !wasDown) {
				for (let i = 0; i < 90; i++) bits.push({ x: p.x, y: p.y, vx: (r() - 0.5) * 9, vy: -r() * 9 - 3, a: r() * TAU, va: (r() - 0.5) * 0.4, k: Math.floor(r() * 3) });
			}
			wasDown = p.down;
			for (const b of bits) {
				b.vy += 0.25;
				b.vx *= 0.99;
				b.x += b.vx;
				b.y += b.vy;
				b.a += b.va;
				ctx.save();
				ctx.translate(b.x, b.y);
				ctx.rotate(b.a);
				ctx.fillStyle = [c.primary, c.fg, c.muted][b.k];
				ctx.fillRect(-4, -2, 8, 4);
				ctx.restore();
			}
			bits = bits.filter((b) => b.y < h + 20);
			if (!bits.length) {
				ctx.fillStyle = c.muted;
				ctx.font = "14px ui-sans-serif, system-ui";
				ctx.textAlign = "center";
				ctx.fillText("Click anywhere", w / 2, h / 2);
			}
		};
	}

	const loaders: Record<string, Draw> = {
		wave: (ctx, w, h, t, _p, c) => {
			ctx.fillStyle = c.primary;
			for (let i = 0; i < 7; i++) {
				const s = 0.4 + 0.6 * Math.abs(Math.sin(t * 3 - i * 0.5));
				ctx.fillRect(w / 2 - 42 + i * 12, h / 2 - 16 * s, 6, 32 * s);
			}
		},
		bounce: (ctx, w, h, t, _p, c) => {
			ctx.fillStyle = c.primary;
			for (let i = 0; i < 3; i++) {
				const y = Math.abs(Math.sin(t * 4 - i * 0.6)) * 18;
				ctx.beginPath();
				ctx.arc(w / 2 - 20 + i * 20, h / 2 + 8 - y, 5, 0, TAU);
				ctx.fill();
			}
		},
		trace: (ctx, w, h, t, _p, c) => {
			ctx.lineWidth = 3;
			ctx.lineCap = "round";
			ctx.strokeStyle = c.border;
			ctx.strokeRect(w / 2 - 20, h / 2 - 20, 40, 40);
			ctx.strokeStyle = c.primary;
			ctx.setLineDash([40, 120]);
			ctx.lineDashOffset = -t * 120;
			ctx.strokeRect(w / 2 - 20, h / 2 - 20, 40, 40);
			ctx.setLineDash([]);
		},
		morph: (ctx, w, h, t, _p, c) => {
			const k = (Math.sin(t * 2) + 1) / 2;
			ctx.fillStyle = c.primary;
			ctx.save();
			ctx.translate(w / 2, h / 2);
			ctx.rotate(t * 1.5);
			ctx.beginPath();
			ctx.roundRect(-18, -18, 36, 36, 4 + k * 14);
			ctx.fill();
			ctx.restore();
		},
		blueprint: (ctx, w, h, t, _p, c) => {
			ctx.strokeStyle = c.border;
			ctx.lineWidth = 1;
			for (let x = 0; x < w; x += 12) {
				ctx.beginPath();
				ctx.moveTo(x, 0);
				ctx.lineTo(x, h);
				ctx.stroke();
			}
			const k = (t * 0.6) % 1;
			ctx.strokeStyle = c.primary;
			ctx.lineWidth = 2;
			ctx.setLineDash([k * 200, 400]);
			ctx.beginPath();
			ctx.roundRect(w / 2 - 30, h / 2 - 20, 60, 40, 4);
			ctx.moveTo(w / 2 - 30, h / 2 - 6);
			ctx.lineTo(w / 2 + 30, h / 2 - 6);
			ctx.stroke();
			ctx.setLineDash([]);
		},
	};
</script>

{#snippet canvas(draw: Draw, size = "h-80 w-[28rem]")}
	<canvas use:stage={draw} class="{size} touch-none rounded-xl border bg-card"></canvas>
{/snippet}

<Story name="Dot swarm" asChild>{@render canvas(dotSwarm())}</Story>
<Story name="Line sphere" asChild>{@render canvas(lineSphere())}</Story>
<Story name="Dot globe" asChild>{@render canvas(dotGlobe(), "size-96 cursor-grab")}</Story>
<Story name="Metaballs" asChild>{@render canvas(metaballs())}</Story>
<Story name="Particles" asChild>{@render canvas(particles())}</Story>
<Story name="Magnetic dots" asChild>{@render canvas(magneticDots())}</Story>
<Story name="Network graph" asChild>{@render canvas(network())}</Story>
<Story name="Smudge" asChild>{@render canvas(smudge(), "h-56 w-[28rem]")}</Story>
<Story name="Eye tracker" asChild>{@render canvas(eyes(), "h-56 w-80")}</Story>
<Story name="Light" asChild>{@render canvas(light())}</Story>
<Story name="Confetti" asChild>{@render canvas(confetti())}</Story>
<Story name="Loaders" asChild>
	<div class="grid grid-cols-5 gap-4">
		{#each Object.values(loaders) as draw, i (i)}{@render canvas(draw, "h-24 w-24")}{/each}
	</div>
</Story>
