export type Pt = [number, number];

const C = Math.cos(Math.PI / 6);

export const iso = (x: number, y: number, z = 0, u = 1): Pt => [(x - y) * C * u, ((x + y) * 0.5 - z) * u];

export const poly = (pts: Pt[]) => 'M' + pts.map(([a, b]) => `${a.toFixed(1)} ${b.toFixed(1)}`).join('L') + 'Z';

export const line = (pts: Pt[]) => 'M' + pts.map(([a, b]) => `${a.toFixed(1)} ${b.toFixed(1)}`).join('L');

export type Box = { top: string; left: string; right: string; key: number };

export function box(x: number, y: number, z: number, w: number, d: number, h: number, u: number): Box {
	const P = (a: number, b: number, c: number) => iso(a, b, c, u);
	return {
		top: poly([P(x, y, z + h), P(x + w, y, z + h), P(x + w, y + d, z + h), P(x, y + d, z + h)]),
		left: poly([P(x, y + d, z), P(x + w, y + d, z), P(x + w, y + d, z + h), P(x, y + d, z + h)]),
		right: poly([P(x + w, y, z), P(x + w, y + d, z), P(x + w, y + d, z + h), P(x + w, y, z + h)]),
		key: x + y + z
	};
}

export function floor(n: number, m: number, u: number, step = 1) {
	const out: string[] = [];
	for (let i = 0; i <= n; i += step) out.push(line([iso(i, 0, 0, u), iso(i, m, 0, u)]));
	for (let j = 0; j <= m; j += step) out.push(line([iso(0, j, 0, u), iso(n, j, 0, u)]));
	return out;
}

export function cylinder(cx: number, cy: number, z: number, r: number, h: number, u: number) {
	const [x0, y0] = iso(cx, cy, z, u);
	const [, yt] = iso(cx, cy, z + h, u);
	const rx = r * C * u * Math.SQRT2;
	const ry = rx / Math.sqrt(3);
	return {
		cx: x0,
		top: yt,
		bottom: y0,
		rx,
		ry,
		body: `M${(x0 - rx).toFixed(1)} ${yt.toFixed(1)}V${y0.toFixed(1)}A${rx.toFixed(1)} ${ry.toFixed(1)} 0 0 0 ${(x0 + rx).toFixed(1)} ${y0.toFixed(1)}V${yt.toFixed(1)}Z`
	};
}

export const layer = (depth: number) =>
	`transform: translate(calc(var(--mx, 0) * ${depth}px), calc(var(--my, 0) * ${depth}px)); transition: transform 600ms cubic-bezier(.2,.7,.2,1)`;
