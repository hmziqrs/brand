/*
 * Shared plumbing for the micro motion stories: a 2D canvas stage that tracks the
 * pointer and redraws every frame (one frame, then only on pointer moves, under
 * reduced motion), the theme's colors read off the element, and a spring.
 */
export type Pointer = { x: number; y: number; down: boolean; inside: boolean };
export type Tones = { fg: string; muted: string; primary: string; border: string; bg: string };
export type Draw = (ctx: CanvasRenderingContext2D, w: number, h: number, t: number, pointer: Pointer, tones: Tones) => void;

export const prefersStill = () => typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

export function tones(node: Element): Tones {
	const css = getComputedStyle(node);
	const read = (name: string) => css.getPropertyValue(name).trim();
	return { fg: read("--foreground"), muted: read("--muted-foreground"), primary: read("--primary"), border: read("--border"), bg: read("--background") };
}

export function stage(node: HTMLCanvasElement, draw: Draw) {
	const ctx = node.getContext("2d");
	if (!ctx) return {};
	const pointer: Pointer = { x: -1e4, y: -1e4, down: false, inside: false };
	const still = prefersStill();
	const colors = tones(node);
	const begin = performance.now();
	let raf = 0;
	const frame = (now: number) => {
		const dpr = Math.min(window.devicePixelRatio, 2);
		const w = node.clientWidth;
		const h = node.clientHeight;
		if (node.width !== Math.round(w * dpr) || node.height !== Math.round(h * dpr)) {
			node.width = Math.round(w * dpr);
			node.height = Math.round(h * dpr);
		}
		ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		ctx.clearRect(0, 0, w, h);
		draw(ctx, w, h, (now - begin) / 1000, pointer, colors);
		raf = still ? 0 : requestAnimationFrame(frame);
	};
	const move = (e: PointerEvent) => {
		const r = node.getBoundingClientRect();
		pointer.x = e.clientX - r.left;
		pointer.y = e.clientY - r.top;
		pointer.inside = true;
		if (still && !raf) raf = requestAnimationFrame(frame);
	};
	const leave = () => {
		pointer.x = pointer.y = -1e4;
		pointer.inside = false;
		pointer.down = false;
	};
	const down = (e: PointerEvent) => {
		pointer.down = true;
		move(e);
	};
	const up = () => (pointer.down = false);
	node.addEventListener("pointermove", move);
	node.addEventListener("pointerleave", leave);
	node.addEventListener("pointerdown", down);
	node.addEventListener("pointerup", up);
	raf = requestAnimationFrame(frame);
	return {
		destroy() {
			cancelAnimationFrame(raf);
			node.removeEventListener("pointermove", move);
			node.removeEventListener("pointerleave", leave);
			node.removeEventListener("pointerdown", down);
			node.removeEventListener("pointerup", up);
		},
	};
}

export class Spring {
	value: number;
	target: number;
	velocity = 0;
	constructor(
		value: number,
		public stiffness = 0.18,
		public damping = 0.72,
	) {
		this.value = value;
		this.target = value;
	}
	step() {
		this.velocity = (this.velocity + (this.target - this.value) * this.stiffness) * this.damping;
		this.value += this.velocity;
		return this.value;
	}
	get resting() {
		return Math.abs(this.target - this.value) < 0.01 && Math.abs(this.velocity) < 0.01;
	}
}

export function animate(step: () => boolean) {
	if (prefersStill()) {
		for (let i = 0; i < 600 && step(); i++);
		return () => {};
	}
	let raf = requestAnimationFrame(function tick() {
		raf = step() ? requestAnimationFrame(tick) : 0;
	});
	return () => cancelAnimationFrame(raf);
}

export type DragHandlers = {
	start?: (e: PointerEvent) => void;
	move: (dx: number, dy: number, e: PointerEvent) => void;
	end?: (dx: number, dy: number, e: PointerEvent) => void;
};

export function drag(node: HTMLElement, handlers: DragHandlers) {
	let current = handlers;
	let origin: { x: number; y: number } | undefined;
	const down = (e: PointerEvent) => {
		origin = { x: e.clientX, y: e.clientY };
		node.setPointerCapture(e.pointerId);
		current.start?.(e);
	};
	const move = (e: PointerEvent) => {
		if (origin) current.move(e.clientX - origin.x, e.clientY - origin.y, e);
	};
	const up = (e: PointerEvent) => {
		if (!origin) return;
		current.end?.(e.clientX - origin.x, e.clientY - origin.y, e);
		origin = undefined;
	};
	node.addEventListener("pointerdown", down);
	node.addEventListener("pointermove", move);
	node.addEventListener("pointerup", up);
	node.addEventListener("pointercancel", up);
	return {
		update(next: DragHandlers) {
			current = next;
		},
		destroy() {
			node.removeEventListener("pointerdown", down);
			node.removeEventListener("pointermove", move);
			node.removeEventListener("pointerup", up);
			node.removeEventListener("pointercancel", up);
		},
	};
}
