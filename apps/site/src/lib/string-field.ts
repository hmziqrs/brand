import { mix, mountCanvas, onThemeChange, readColor, rgba, rng, type RGB } from "@hmziq/brand-core/motion/canvas";

export type StringFieldOptions = {
  /** Pixels between strings. */
  gap?: number;
  /** How far, in pixels, a string follows the cursor before it slips free. */
  pull?: number;
  /** Seconds of quiet before the field strums itself. */
  rest?: number;
};

const sampleStep = 8;
const waveSpeed = 1150;
const decay = 1.15;
const viscosity = 1000;
const restAlpha = 0.2;
const fingerWidth = 12;
const flickWidth = 26;

type Strum = { x: number; to: number; y: number; slope: number; speed: number; force: number };

/**
 * Draws upright strings across `canvas`, taut between its top and bottom edges. The cursor catches
 * each string it crosses, drags it up to `pull` pixels and lets it snap back; the wave runs along
 * the string, bounces off both ends and dies out, and the string stays in the accent color while
 * it rings. After `rest` quiet seconds the field strums itself. Straight and still for reduced
 * motion. Returns the cleanup.
 */
export function mountStringField(canvas: HTMLCanvasElement, options: StringFieldOptions = {}) {
  const gap = options.gap ?? 22;
  const pull = options.pull ?? gap * 0.9;
  const rest = options.rest ?? 5;
  const limit = pull * 1.25;
  const random = rng(7);

  let count = 0;
  let samples = 2;
  let ds = sampleStep;
  let left = 0;
  let u = new Float32Array(0);
  let v = new Float32Array(0);
  let glow = new Float32Array(0);
  let awake = new Uint8Array(0);
  let held = new Uint8Array(0);
  let ink: RGB = [0, 0, 0];
  let hot: RGB = [0, 0, 0];
  let strum: Strum | null = null;
  let quiet = rest - 0.7;
  let strums = 0;
  let dirty = true;

  const cursor = { clientX: 0, clientY: 0, x: 0, y: 0, last: 0, inside: false, moved: false };

  const colors = () => {
    ink = readColor(canvas, "var(--foreground)");
    hot = readColor(canvas, "var(--primary)");
    dirty = true;
  };

  const stringX = (i: number) => Math.round(left + i * gap) + 0.5;
  const firstRight = (x: number) => Math.max(0, Math.ceil((x - left) / gap));
  const lastLeft = (x: number) => Math.min(count - 1, Math.floor((x - left) / gap));

  const press = (i: number, y: number, depth: number, width: number, add: boolean) => {
    const o = i * samples;
    const reach = Math.ceil((width * 2.5) / ds);
    const mid = Math.round(y / ds);
    const way = Math.sign(depth);
    for (let j = Math.max(1, mid - reach); j <= Math.min(samples - 2, mid + reach); j++) {
      const q = (j * ds - y) / width;
      const shape = depth * Math.exp(-q * q);
      if (add) u[o + j] = Math.max(-limit, Math.min(limit, u[o + j] + shape));
      else if (j === mid || (shape - u[o + j]) * way > 0) {
        u[o + j] = shape;
        v[o + j] = 0;
      }
    }
    awake[i] = 1;
  };

  const releaseAll = () => held.fill(0);

  const readCursor = (w: number, h: number) => {
    if (!cursor.moved) return false;
    cursor.moved = false;
    const box = canvas.getBoundingClientRect();
    const x = cursor.clientX - box.left;
    const y = cursor.clientY - box.top;
    const inside = x >= 0 && x <= w && y >= 0 && y <= h;
    cursor.last = cursor.inside && inside ? cursor.x : x;
    cursor.x = x;
    cursor.y = y;
    if (cursor.inside && !inside) releaseAll();
    cursor.inside = inside;
    return inside;
  };

  const pluck = () => {
    const { x, y, last } = cursor;
    const from = firstRight(Math.min(last, x));
    const to = lastLeft(Math.max(last, x));
    for (let i = from; i <= to; i++) {
      const at = stringX(i);
      if (at === last || held[i]) continue;
      const depth = x - at;
      if (Math.abs(depth) > pull) press(i, y, Math.sign(depth) * pull * 0.62, flickWidth, true);
      else held[i] = 1;
      quiet = 0;
    }
    for (let i = 0; i < count; i++) {
      if (!held[i]) continue;
      const depth = x - stringX(i);
      if (Math.abs(depth) > pull) held[i] = 0;
      else press(i, y, depth, fingerWidth, false);
    }
  };

  const startStrum = (w: number, h: number) => {
    const opening = strums++ === 0;
    const rightward = opening || random() < 0.5;
    const span = opening ? 1 : 0.3 + random() * 0.45;
    const start = opening ? 0 : random() * (1 - span);
    const a = w * start;
    const b = w * (start + span);
    strum = {
      x: rightward ? a : b,
      to: rightward ? b : a,
      y: h * (0.3 + random() * 0.45),
      slope: (random() - 0.5) * 0.5,
      speed: 1000 + random() * 900,
      force: opening ? 0.5 : 0.36,
    };
  };

  const playStrum = (dt: number, w: number, h: number) => {
    quiet += dt;
    if (!strum) {
      if (quiet > rest) startStrum(w, h);
      return;
    }
    const way = Math.sign(strum.to - strum.x) || 1;
    const next = way > 0 ? Math.min(strum.to, strum.x + strum.speed * dt) : Math.max(strum.to, strum.x - strum.speed * dt);
    const from = firstRight(Math.min(strum.x, next));
    const to = lastLeft(Math.max(strum.x, next));
    for (let i = from; i <= to; i++) {
      if (stringX(i) === strum.x) continue;
      press(i, Math.max(h * 0.12, Math.min(h * 0.88, strum.y)), way * pull * strum.force, flickWidth, true);
    }
    strum.y += strum.slope * Math.abs(next - strum.x);
    strum.x = next;
    if (next === strum.to) {
      strum = null;
      quiet = 0;
    }
  };

  const simulate = (dt: number) => {
    const steps = Math.max(1, Math.ceil((waveSpeed * dt) / (ds * 0.9)));
    const tick = dt / steps;
    const tension = (waveSpeed / ds) ** 2 * tick;
    const keep = Math.exp(-decay * tick);
    const smooth = Math.min(0.4, (viscosity * tick) / (ds * ds));
    const rise = 1 - Math.exp(-dt * 20);
    const fall = 1 - Math.exp(-dt * 2.4);
    let ringing = false;
    for (let i = 0; i < count; i++) {
      if (!awake[i]) continue;
      const o = i * samples;
      const end = o + samples - 1;
      for (let s = 0; s < steps; s++) {
        for (let p = o + 1; p < end; p++) v[p] = (v[p] + tension * (u[p - 1] - 2 * u[p] + u[p + 1])) * keep;
        let before = v[o];
        for (let p = o + 1; p < end; p++) {
          const here = v[p];
          v[p] = here + smooth * (before - 2 * here + v[p + 1]);
          before = here;
        }
        for (let p = o + 1; p < end; p++) u[p] += v[p] * tick;
        if (held[i]) press(i, cursor.y, cursor.x - stringX(i), fingerWidth, false);
      }
      let reach = 0;
      let rate = 0;
      for (let p = o + 1; p < end; p++) {
        reach = Math.max(reach, Math.abs(u[p]));
        rate = Math.max(rate, Math.abs(v[p]));
      }
      const target = Math.min(1, reach / (pull * 0.42));
      glow[i] += (target - glow[i]) * (target > glow[i] ? rise : fall);
      if (!held[i] && reach < 0.04 && rate < 1.5 && glow[i] < 0.01) {
        u.fill(0, o, end + 1);
        v.fill(0, o, end + 1);
        glow[i] = 0;
        awake[i] = 0;
      } else ringing = true;
    }
    return ringing;
  };

  const paint = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
    ctx.clearRect(0, 0, w, h);
    ctx.lineWidth = 1;
    ctx.strokeStyle = rgba(ink, restAlpha);
    ctx.beginPath();
    for (let i = 0; i < count; i++) {
      if (awake[i]) continue;
      const x = stringX(i);
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
    }
    ctx.stroke();
    for (let i = 0; i < count; i++) {
      if (!awake[i]) continue;
      const o = i * samples;
      const x = stringX(i);
      const g = glow[i];
      ctx.lineWidth = 1 + g * 0.5;
      ctx.strokeStyle = rgba(mix(ink, hot, 1 - (1 - g) ** 3), restAlpha + (1 - restAlpha) * g);
      ctx.beginPath();
      ctx.moveTo(x, 0);
      for (let j = 1; j < samples - 2; j++) {
        const ax = x + u[o + j];
        const bx = x + u[o + j + 1];
        ctx.quadraticCurveTo(ax, j * ds, (ax + bx) / 2, (j + 0.5) * ds);
      }
      ctx.lineTo(x, h);
      ctx.stroke();
    }
  };

  const field = mountCanvas(canvas, {
    animate: true,
    setup: ({ w, h }) => {
      count = Math.max(1, Math.floor(w / gap));
      left = (w - (count - 1) * gap) / 2;
      samples = Math.max(3, Math.round(h / sampleStep) + 1);
      ds = h / (samples - 1);
      u = new Float32Array(count * samples);
      v = new Float32Array(count * samples);
      glow = new Float32Array(count);
      awake = new Uint8Array(count);
      held = new Uint8Array(count);
      colors();
    },
    draw: ({ ctx, w, h, dt }) => {
      let ringing = false;
      if (dt) {
        if (readCursor(w, h)) pluck();
        playStrum(dt, w, h);
        ringing = simulate(dt);
      }
      if (!ringing && !dirty) return;
      paint(ctx, w, h);
      dirty = ringing;
    },
  });

  const stopTheme = onThemeChange(() => {
    colors();
    if (field.still) field.redraw();
  });

  const move = (e: PointerEvent) => {
    cursor.clientX = e.clientX;
    cursor.clientY = e.clientY;
    cursor.moved = true;
  };
  const leave = () => {
    cursor.inside = false;
    releaseAll();
  };
  if (!field.still) {
    addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
  }

  return () => {
    removeEventListener("pointermove", move);
    document.documentElement.removeEventListener("pointerleave", leave);
    stopTheme();
    field.destroy();
  };
}
