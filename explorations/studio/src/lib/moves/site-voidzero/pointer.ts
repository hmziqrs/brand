export function pointer(node: HTMLElement, opts: { ease?: number } = {}) {
	const ease = opts.ease ?? 0.12;
	const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
	let tx = 0.5;
	let ty = 0.5;
	let x = 0.5;
	let y = 0.5;
	let raf = 0;
	const write = () => {
		node.style.setProperty('--px', x.toFixed(4));
		node.style.setProperty('--py', y.toFixed(4));
	};
	const tick = () => {
		x += (tx - x) * ease;
		y += (ty - y) * ease;
		write();
		raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.0005 ? requestAnimationFrame(tick) : 0;
	};
	const move = (e: PointerEvent) => {
		const r = node.getBoundingClientRect();
		tx = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
		ty = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
		node.dataset.hot = '';
		if (reduced) {
			x = tx;
			y = ty;
			write();
		} else if (!raf) raf = requestAnimationFrame(tick);
	};
	const leave = () => {
		tx = 0.5;
		ty = 0.5;
		delete node.dataset.hot;
		if (reduced) {
			x = tx;
			y = ty;
			write();
		} else if (!raf) raf = requestAnimationFrame(tick);
	};
	write();
	node.addEventListener('pointermove', move);
	node.addEventListener('pointerleave', leave);
	return {
		destroy() {
			cancelAnimationFrame(raf);
			node.removeEventListener('pointermove', move);
			node.removeEventListener('pointerleave', leave);
		}
	};
}
