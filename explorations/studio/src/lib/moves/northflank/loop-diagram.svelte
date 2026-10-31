<script lang="ts" module>
	export type LoopStep = { label: string; detail: string; log: string };
</script>

<script lang="ts">
	import { cn } from '$brand/utils.js';
	import { prefersReduced } from './dot-font';

	const defaults: LoopStep[] = [
		{ label: 'build', detail: 'cargo build --release', log: 'Compiled fieldnotes for aarch64-apple-darwin in 41s' },
		{ label: 'test', detail: 'unit + window snapshot tests', log: '212 tests passed, 18 window snapshots match' },
		{ label: 'package', detail: '.dmg · .msi · .AppImage', log: 'Signed and notarized Fieldnotes-0.9.0.dmg' },
		{ label: 'update', detail: 'delta patch to every install', log: 'Shipped 0.9.0 to the stable channel' }
	];

	let {
		steps = defaults,
		count = 48213,
		counterLabel = 'updates delivered',
		counterClass = 'font-mono tracking-tight',
		labelClass = 'font-mono',
		lap = 9,
		class: className
	}: {
		steps?: LoopStep[];
		count?: number;
		counterLabel?: string;
		counterClass?: string;
		labelClass?: string;
		lap?: number;
		class?: string;
	} = $props();

	const VW = 1000;
	const VH = 440;
	const R = 200;
	const PATH = `M ${R + 20} 20 H ${VW - R - 20} A ${R} ${R} 0 0 1 ${VW - R - 20} ${VH - 20} H ${R + 20} A ${R} ${R} 0 0 1 ${R + 20} 20 Z`;
	const straight = VW - 2 * R - 40;
	const arc = Math.PI * R;
	const total = 2 * straight + 2 * arc;
	const spots = [
		{ f: straight / 2 / total, x: VW / 2, y: 20 },
		{ f: (straight + arc / 2) / total, x: VW - 20, y: VH / 2 },
		{ f: (straight * 1.5 + arc) / total, x: VW / 2, y: VH - 20 },
		{ f: (straight * 2 + arc * 1.5) / total, x: 20, y: VH / 2 }
	];

	let value = $state(count);
	let progress = $state(spots[0].f);
	let pathEl: SVGPathElement | undefined = $state();
	const point = $derived.by(() => {
		if (!pathEl) return { x: spots[0].x, y: spots[0].y };
		const p = pathEl.getPointAtLength(progress * pathEl.getTotalLength());
		return { x: p.x, y: p.y };
	});
	const active = $derived.by(() => {
		let best = spots.length - 1;
		spots.forEach((s, n) => {
			if (progress >= s.f) best = n;
		});
		return progress < spots[0].f ? spots.length - 1 : best;
	});

	$effect(() => {
		if (prefersReduced()) return;
		let raf = 0;
		let prev = performance.now();
		let lastActive = active;
		let visible = true;
		const host = pathEl?.ownerSVGElement;
		const io = new IntersectionObserver((e) => {
			visible = e.some((x) => x.isIntersecting);
			if (visible && !raf) {
				prev = performance.now();
				raf = requestAnimationFrame(frame);
			}
		});
		if (host) io.observe(host);
		const frame = (now: number) => {
			raf = 0;
			if (!visible) return;
			const dt = Math.min(64, now - prev) / 1000;
			prev = now;
			progress = (progress + dt / lap) % 1;
			if (active !== lastActive) {
				lastActive = active;
				value += active === 3 ? 7 + Math.floor(Math.random() * 23) : 1 + Math.floor(Math.random() * 3);
			}
			raf = requestAnimationFrame(frame);
		};
		raf = requestAnimationFrame(frame);
		return () => {
			cancelAnimationFrame(raf);
			io.disconnect();
		};
	});

	const fmt = (n: number) => n.toLocaleString('en-US');
</script>

<div data-slot="loop-diagram" class={cn('relative', className)}>
	<div class="relative mx-auto hidden w-full max-w-[1000px] sm:block" style:aspect-ratio="{VW} / {VH}">
		<div
			class="absolute inset-[4.5%_2%] rounded-full opacity-60"
			style="background-image: radial-gradient(circle, color-mix(in oklab, var(--foreground) 22%, transparent) 1px, transparent 1.4px); background-size: 14px 14px; mask-image: radial-gradient(ellipse at center, black 30%, transparent 75%);"
			aria-hidden="true"
		></div>
		<svg viewBox="0 0 {VW} {VH}" class="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
			<path bind:this={pathEl} d={PATH} fill="none" stroke="var(--line)" stroke-width="1.5" stroke-dasharray="3 6" />
			<path
				d={PATH}
				fill="none"
				stroke="var(--orange)"
				stroke-width="2"
				pathLength="1"
				stroke-dasharray="0.08 0.92"
				stroke-dashoffset={0.08 - progress}
				stroke-linecap="round"
			/>
			{#each spots as s, n (n)}
				<circle cx={s.x} cy={s.y} r={n === active ? 8 : 5} fill={n === active ? 'var(--orange)' : 'var(--background)'} stroke={n === active ? 'var(--orange)' : 'var(--muted-foreground)'} stroke-width="1.5" />
			{/each}
			<circle cx={point.x} cy={point.y} r="14" fill="var(--orange)" opacity="0.18" />
			<circle cx={point.x} cy={point.y} r="4.5" fill="var(--orange)" />
		</svg>
		{#each steps as step, n (step.label)}
			{@const s = spots[n]}
			<div
				class={cn(
					'absolute w-44 -translate-x-1/2 text-center transition-colors',
					n === 0 && '-translate-y-[calc(100%+18px)]',
					n === 2 && 'translate-y-[18px]',
					n === 1 && '-translate-y-1/2 translate-x-[calc(-100%-22px)] text-right',
					n === 3 && 'translate-x-[22px] -translate-y-1/2 text-left'
				)}
				style:left="{(s.x / VW) * 100}%"
				style:top="{(s.y / VH) * 100}%"
			>
				<p class={cn('text-[13px] uppercase tracking-[0.12em]', labelClass, n === active ? 'text-orange' : 'text-foreground')}>{step.label}</p>
				<p class="mt-1 text-xs text-muted-foreground">{step.detail}</p>
			</div>
		{/each}
		<div class="absolute inset-0 flex flex-col items-center justify-center px-[24%] text-center">
			<p class={cn('text-[11px] tracking-[0.14em] text-muted-foreground uppercase', labelClass)}>{counterLabel}</p>
			<p class={cn('mt-2 text-[clamp(40px,6vw,72px)] leading-none text-foreground tabular-nums', counterClass)} aria-live="off">{fmt(value)}</p>
			<p class={cn('mt-3 text-[11px] uppercase tracking-[0.12em] text-orange', labelClass)}>{steps[active].label}</p>
			<p class="mt-1 min-h-[2.6em] max-w-[34ch] text-[13px] text-foreground/80">{steps[active].log}</p>
		</div>
	</div>

	<div class="sm:hidden">
		<div class="rounded-xl border p-5 text-center">
			<p class={cn('text-[11px] tracking-[0.14em] text-muted-foreground uppercase', labelClass)}>{counterLabel}</p>
			<p class={cn('mt-2 text-5xl leading-none text-foreground tabular-nums', counterClass)}>{fmt(value)}</p>
			<p class="mt-3 min-h-[2.6em] text-[13px] text-foreground/80">{steps[active].log}</p>
		</div>
		<ol class="mt-3 grid grid-cols-2 gap-2">
			{#each steps as step, n (step.label)}
				<li class={cn('rounded-lg border p-3', n === active && 'border-orange/60')}>
					<p class={cn('text-[12px] uppercase tracking-[0.12em]', labelClass, n === active ? 'text-orange' : 'text-foreground')}>
						<span class="text-muted-foreground">0{n + 1}</span>
						{step.label}
					</p>
					<p class="mt-1 text-xs text-muted-foreground">{step.detail}</p>
				</li>
			{/each}
		</ol>
	</div>
</div>
