import { mix, mountCanvas, onThemeChange, readColor, rgba, trackPointer, type RGB } from "@hmziq/brand-core/motion/canvas";
import { hash, rng } from "@hmziq/brand-core/motion/rings";

export type RingBlocksOptions = {
  /** The name the rings are drawn from, as with the brand's other rings. */
  seed?: string;
  /** Half a block's width, in pixels. */
  size?: number;
  /** How many rings. */
  rings?: number;
  /** Which ring is orange, counted from the middle. */
  accent?: number;
};

type Ring = { r: number; from: number; span: number; accent: boolean };

const TAU = Math.PI * 2;
const spacing = 2;
const first = 3;
const rest = 9;
const rise = 30;
const lift = 26;

const smooth = (a: number, b: number, x: number) => {
  const q = Math.max(0, Math.min(1, (x - a) / (b - a)));
  return q * q * (3 - 2 * q);
};

function readDeep(host: Element): RGB {
  const light = document.createElement("span");
  light.className = "light";
  light.hidden = true;
  host.appendChild(light);
  const deep = readColor(light, "var(--orange-ink)");
  light.remove();
  return deep;
}

/**
 * The brand's rings laid flat and built from blocks on an isometric grid, drawn from `seed` like
 * every other set of rings. Each ring keeps its one gap; the orange ring's gap turns, so its blocks
 * rise ahead of the gap and sink behind it. Every few seconds a ripple lifts the gray rings one
 * after another, outward. Blocks near the cursor rise. Still for reduced motion. Returns the cleanup.
 */
export function mountRingBlocks(canvas: HTMLCanvasElement, { seed = "hmziq", size = 12, rings: count = 7, accent = 2 }: RingBlocksOptions = {}) {
  const host = canvas.parentElement!;
  const random = rng(hash(seed));
  const rings: Ring[] = Array.from({ length: count }, (_, k) => {
    const isAccent = k === accent;
    const span = TAU * (isAccent ? 0.52 : 0.06 + random() * 0.3);
    return { r: first + k * spacing, from: random() * TAU, span, accent: isAccent };
  });
  const outer = first + (count - 1) * spacing + 2.5;
  const span = Math.ceil(outer) * 2 + 1;
  const mid = (span - 1) / 2;
  const height = new Float32Array(span * span);

  let bg: RGB = [0, 0, 0];
  let fg: RGB = [0, 0, 0];
  let ox: RGB = [0, 0, 0];
  let deep: RGB = [0, 0, 0];
  const read = () => {
    bg = readColor(host, "var(--background)");
    fg = readColor(host, "var(--foreground)");
    ox = readColor(host, "var(--orange)");
    deep = readDeep(host);
  };
  read();

  const ringAt = (i: number, j: number) => {
    const d = Math.hypot(i - mid, j - mid);
    const k = Math.round((d - first) / spacing);
    if (k < 0 || k >= count || Math.abs(d - rings[k].r) > 0.55) return { d, k: -1 };
    return { d, k };
  };

  const solid = (ring: Ring, angle: number, turn: number) => {
    const from = ring.from + turn;
    const into = (((angle - from) % TAU) + TAU) % TAU;
    if (into >= ring.span) {
      const edge = Math.min(into - ring.span, TAU - into) * ring.r;
      return smooth(0, 1.6, edge);
    }
    return 0;
  };

  let m: ReturnType<typeof mountCanvas> | undefined;
  const ptr = trackPointer(canvas, () => m?.still && m.redraw());

  m = mountCanvas(canvas, {
    animate: true,
    draw: ({ ctx, w, h, t, dt }) => {
      ptr.step(dt, w, h, t, false, 6);
      const { x: px, y: py } = ptr.p;
      const k = dt ? 1 - Math.exp(-dt * 7) : 1;
      const hw = size;
      const hh = size / 2;
      const cx = w >= 1024 ? w * 0.75 : w * 0.5;
      const cy = w >= 1024 ? h * 0.52 : h * 0.74;
      const turn = (t / 60) * TAU;
      const wave = t % rest;
      const reach = 110 * 110;
      const floorTop = mix(bg, fg, 0.05);
      const ringTop = mix(bg, fg, 0.2);
      const ringLeft = mix(bg, fg, 0.1);
      const ringRight = mix(bg, fg, 0.05);
      ctx.clearRect(0, 0, w, h);
      for (let s = 0; s < span * 2 - 1; s++)
        for (let i = Math.max(0, s - span + 1); i <= Math.min(s, span - 1); i++) {
          const j = s - i;
          const { d, k: ring } = ringAt(i, j);
          if (d > outer) continue;
          const sx = cx + (i - j) * hw;
          const sy = cy + (i + j - 2 * mid) * hh;
          const dx = sx - px;
          const dy = (sy - py) * 1.4;
          const near = ptr.p.inside ? Math.exp(-(dx * dx + dy * dy) / reach) : 0;
          const r = ring >= 0 ? rings[ring] : null;
          const body = r ? solid(r, Math.atan2(j - mid, i - mid), r.accent ? turn : 0) : 0;
          const pulse = r && !r.accent ? Math.exp(-((wave - 0.6 - ring * 0.22) ** 2) / 0.06) : 0;
          const target = body * (r?.accent ? rise * 0.75 : rise * 0.45) + pulse * body * rise * 0.6 + near * lift * (0.35 + body);
          const q = i + j * span;
          height[q] += (target - height[q]) * k;
          const z = height[q];
          const fade = 1 - smooth(outer - 2.5, outer, d);
          const y = sy - z;
          const hot = r?.accent ? body : 0;
          const lit = pulse * body;
          if (z > 0.5) {
            ctx.beginPath();
            ctx.moveTo(sx - hw, y);
            ctx.lineTo(sx, y + hh);
            ctx.lineTo(sx, y + hh + z);
            ctx.lineTo(sx - hw, y + z);
            ctx.closePath();
            ctx.fillStyle = rgba(mix(ringLeft, deep, hot), 1);
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(sx + hw, y);
            ctx.lineTo(sx, y + hh);
            ctx.lineTo(sx, y + hh + z);
            ctx.lineTo(sx + hw, y + z);
            ctx.closePath();
            ctx.fillStyle = rgba(mix(ringRight, mix(deep, bg, 0.35), hot), 1);
            ctx.fill();
          }
          const solidness = Math.min(1, z / (rise * 0.4));
          const top = mix(mix(floorTop, ringTop, solidness), fg, lit * 0.35);
          ctx.beginPath();
          ctx.moveTo(sx, y - hh);
          ctx.lineTo(sx + hw, y);
          ctx.lineTo(sx, y + hh);
          ctx.lineTo(sx - hw, y);
          ctx.closePath();
          ctx.globalAlpha = Math.max(fade, solidness);
          ctx.fillStyle = rgba(mix(top, ox, hot), 1);
          ctx.fill();
          ctx.strokeStyle = rgba(fg, 0.07 + 0.15 * solidness);
          ctx.lineWidth = 0.75;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
    },
  });

  const off = onThemeChange(() => {
    read();
    if (m?.still) m.redraw();
  });
  return () => {
    off();
    m?.destroy();
    ptr.destroy();
  };
}
