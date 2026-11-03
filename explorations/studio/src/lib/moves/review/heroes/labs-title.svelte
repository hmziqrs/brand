<script lang="ts">
	import { cn } from '$brand/utils.js';

	let { text, class: className }: { text: string; class?: string } = $props();

	const words = $derived.by(() => {
		const count = text.replace(/ /g, '').length;
		const mid = (count - 1) / 2;
		let n = 0;
		return text.split(' ').map((w) => [...w].map((c) => ({ c, i: n, off: n++ - mid })));
	});

	let host: HTMLElement | undefined = $state();
	let waiting = $state(true);

	$effect(() => {
		const el = host;
		if (!el) return;
		const io = new IntersectionObserver((entries) => {
			if (entries.some((e) => e.isIntersecting)) {
				waiting = false;
				io.disconnect();
			}
		});
		io.observe(el);
		return () => io.disconnect();
	});

	$effect(() => {
		const el = host;
		if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		const zone = el.closest('section') ?? el;
		const letters = [...el.querySelectorAll<HTMLElement>('[data-ch]')];
		let raf = 0;
		let x = -1e5;
		let y = -1e5;
		const paint = () => {
			raf = 0;
			for (const l of letters) {
				const r = l.getBoundingClientRect();
				const d = Math.hypot(r.left + r.width / 2 - x, r.top + r.height / 2 - y);
				const g = Math.max(0, 1 - d / Math.max(160, r.height * 2.2));
				l.style.setProperty('--g', (g * g).toFixed(3));
			}
		};
		const move = (e: PointerEvent) => {
			x = e.clientX;
			y = e.clientY;
			if (!raf) raf = requestAnimationFrame(paint);
		};
		const leave = () => {
			x = y = -1e5;
			if (!raf) raf = requestAnimationFrame(paint);
		};
		zone.addEventListener('pointermove', move as EventListener);
		zone.addEventListener('pointerleave', leave);
		return () => {
			cancelAnimationFrame(raf);
			zone.removeEventListener('pointermove', move as EventListener);
			zone.removeEventListener('pointerleave', leave);
		};
	});
</script>

<h1 bind:this={host} aria-label={text} data-wait={waiting || undefined} class={cn('labs-title', className)}>
	{#each words as w, wi (wi)}{#if wi > 0}{' '}{/if}<span aria-hidden="true" class="inline-block whitespace-nowrap">{#each w as l (l.i)}<span data-ch class="inline-block" style:--i={l.i} style:--o={l.off} style:--d={Math.abs(l.off)}>{l.c}</span>{/each}</span>{/each}
</h1>

<style>
	@property --s {
		syntax: '<number>';
		inherits: false;
		initial-value: 0;
	}
	[data-ch] {
		--g: 0;
		color: color-mix(in oklab, var(--primary) calc(max(var(--g), var(--s) * 0.55) * 100%), var(--foreground));
		text-shadow: 0 0 calc(var(--g) * 32px) color-mix(in oklab, var(--primary) calc(var(--g) * 60%), transparent);
		transition:
			color 0.3s ease,
			text-shadow 0.3s ease;
		animation:
			resolve 1.5s cubic-bezier(0.2, 0.7, 0.2, 1) both,
			shimmer 7s ease-in-out infinite;
		animation-delay: calc(var(--d) * 80ms + 120ms), calc(var(--i) * 70ms + 2.4s);
	}
	[data-wait] [data-ch] {
		opacity: 0;
		animation: none;
	}
	@keyframes resolve {
		from {
			opacity: 0;
			filter: blur(16px);
			transform: translateX(calc(var(--o) * 0.4em)) scale(1.15);
		}
		60% {
			opacity: 1;
		}
		to {
			opacity: 1;
			filter: blur(0);
			transform: none;
		}
	}
	@keyframes shimmer {
		0%,
		16%,
		100% {
			--s: 0;
		}
		7% {
			--s: 1;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		[data-ch],
		[data-wait] [data-ch] {
			opacity: 1;
			animation: none;
			transition: none;
		}
	}
</style>
