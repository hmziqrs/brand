<script lang="ts">
	import Check from '@lucide/svelte/icons/check';
	import KeyRound from '@lucide/svelte/icons/key-round';
	import { siApple, siLinux } from 'simple-icons';
	import { cn } from '$brand/utils.js';
	import BrandIcon from '$brand/components/brand-icon.svelte';

	let { class: className }: { class?: string } = $props();

	const siWindows = { path: 'M0 3.449 9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801' };

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

	let minor = $state(1);
	const version = $derived(`0.3.${minor}`);

	const steps = $derived([
		{ label: 'tag', detail: 'git push --tags', log: `Tagged v${version} on main.` },
		{ label: 'build', detail: 'on native runners', log: 'Built dmg, msi, AppImage and deb.' },
		{ label: 'sign', detail: 'your keys · ed25519', log: 'Signed the installers and the update manifest.' },
		{ label: 'update', detail: 'checked on launch', log: `Apps on 0.3.${minor - 1} offer the update at next launch.` }
	]);

	const installers = $derived([
		{ os: 'mac', target: 'aarch64-apple-darwin', file: `Fieldnotes-${version}-arm64.dmg`, sign: 'signed + notarized', size: '11.8 MB' },
		{ os: 'mac', target: 'x86_64-apple-darwin', file: `Fieldnotes-${version}-x64.dmg`, sign: 'signed + notarized', size: '12.4 MB' },
		{ os: 'windows', target: 'x86_64-pc-windows-msvc', file: `Fieldnotes-${version}-x64.msi`, sign: 'Authenticode', size: '9.6 MB' },
		{ os: 'linux', target: 'x86_64-unknown-linux-gnu', file: `Fieldnotes-${version}.AppImage`, sign: 'detached .sig', size: '14.1 MB' },
		{ os: 'linux', target: 'x86_64-unknown-linux-gnu', file: `fieldnotes_${version}_amd64.deb`, sign: 'detached .sig', size: '10.2 MB' }
	]);

	let progress = $state(spots[0].f + 0.001);
	let target = $state<number | null>(null);
	let pathEl: SVGPathElement | undefined = $state();
	let box: HTMLDivElement | undefined = $state();
	let samples: { x: number; y: number; f: number }[] = [];

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
	const phase = $derived.by(() => {
		const a = spots[active].f;
		const b = active === spots.length - 1 ? spots[0].f + 1 : spots[active + 1].f;
		const p = progress < a ? progress + 1 : progress;
		return Math.max(0, Math.min(1, (p - a) / (b - a)));
	});

	const rowState = (i: number) => {
		if (active === 0) return { kind: 'queued' as const, share: 0 };
		if (active === 1) return { kind: 'building' as const, share: Math.max(0, Math.min(1, (phase - i * 0.09) / 0.55)) };
		if (active === 2) return phase > i * 0.16 ? { kind: 'signed' as const, share: 1 } : { kind: 'built' as const, share: 1 };
		return { kind: 'published' as const, share: 1 };
	};

	$effect(() => {
		if (!pathEl) return;
		const len = pathEl.getTotalLength();
		samples = Array.from({ length: 240 }, (_, i) => {
			const f = i / 240;
			const p = pathEl!.getPointAtLength(f * len);
			return { x: p.x, y: p.y, f };
		});
	});

	$effect(() => {
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		let raf = 0;
		let prev = 0;
		let visible = true;
		let last = active;
		const io = new IntersectionObserver((e) => (visible = e.some((x) => x.isIntersecting)));
		if (box) io.observe(box);
		const frame = (now: number) => {
			raf = requestAnimationFrame(frame);
			const dt = prev ? Math.min(0.05, (now - prev) / 1000) : 0;
			prev = now;
			if (!visible) return;
			if (target !== null) {
				let d = target - progress;
				if (d > 0.5) d -= 1;
				if (d < -0.5) d += 1;
				progress = (progress + d * (1 - Math.exp(-dt * 9)) + 1) % 1;
			} else progress = (progress + dt / 11) % 1;
			if (active !== last) {
				if (active === 0 && last === spots.length - 1) minor++;
				last = active;
			}
		};
		raf = requestAnimationFrame(frame);
		return () => {
			cancelAnimationFrame(raf);
			io.disconnect();
		};
	});

	function aim(e: PointerEvent) {
		if (!box || !samples.length) return;
		const r = box.getBoundingClientRect();
		const x = ((e.clientX - r.left) / r.width) * VW;
		const y = ((e.clientY - r.top) / r.height) * VH;
		let best = samples[0];
		let bd = Infinity;
		for (const s of samples) {
			const d = (s.x - x) ** 2 + (s.y - y) ** 2;
			if (d < bd) {
				bd = d;
				best = s;
			}
		}
		target = best.f;
	}

	const icon = (os: string) => (os === 'mac' ? siApple : os === 'linux' ? siLinux : siWindows);
</script>

<div data-slot="release-loop" class={cn('grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-center lg:gap-10', className)}>
	<div class="min-w-0">
		<div
			bind:this={box}
			role="presentation"
			class="relative mx-auto hidden w-full max-w-[1000px] cursor-crosshair touch-pan-y sm:block"
			style:aspect-ratio={`${VW} / ${VH}`}
			onpointermove={aim}
			onpointerleave={() => (target = null)}
		>
			<svg viewBox="0 0 {VW} {VH}" class="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
				<path bind:this={pathEl} d={PATH} fill="none" stroke="var(--line)" stroke-width="1.5" stroke-dasharray="3 6" />
				<path d={PATH} fill="none" stroke="var(--primary)" stroke-width="2" pathLength="1" stroke-dasharray="0.08 0.92" stroke-dashoffset={0.08 - progress} stroke-linecap="round" />
				{#each spots as s, n (n)}
					<circle cx={s.x} cy={s.y} r={n === active ? 8 : 5} fill={n === active ? 'var(--primary)' : 'var(--background)'} stroke={n === active ? 'var(--primary)' : 'var(--muted-foreground)'} stroke-width="1.5" />
				{/each}
				<circle cx={point.x} cy={point.y} r="4.5" fill="var(--primary)" />
			</svg>
			{#each steps as step, n (step.label)}
				{@const s = spots[n]}
				<div
					class={cn(
						'pointer-events-none absolute w-40 -translate-x-1/2 text-center',
						n === 0 && '-translate-y-[calc(100%+16px)]',
						n === 2 && 'translate-y-[16px]',
						n === 1 && '-translate-y-1/2 translate-x-[calc(-100%-20px)] text-right',
						n === 3 && 'translate-x-[20px] -translate-y-1/2 text-left'
					)}
					style:left="{(s.x / VW) * 100}%"
					style:top="{(s.y / VH) * 100}%"
				>
					<p class={cn('font-mono text-[12px] tracking-[0.12em] uppercase', n === active ? 'text-primary' : 'text-foreground')}>{step.label}</p>
					<p class="mt-0.5 text-xs text-muted-foreground">{step.detail}</p>
				</div>
			{/each}
			<div class="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-[27%] text-center">
				<p class="font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">Release</p>
				<p class="mt-1 font-mono text-[clamp(30px,4.2vw,52px)] leading-none font-medium tracking-[-0.04em] text-foreground tabular-nums">v{version}</p>
				<p class="mt-3 min-h-[2.6em] max-w-[30ch] text-[13px] leading-snug text-foreground/85">{steps[active].log}</p>
			</div>
		</div>

		<div class="sm:hidden">
			<div class="rounded-2xl p-5 text-center ring-1 ring-foreground/10">
				<p class="font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">Release</p>
				<p class="mt-1 font-mono text-4xl leading-none font-medium tracking-[-0.04em] tabular-nums">v{version}</p>
				<p class="mt-3 min-h-[2.6em] text-[13px] text-foreground/85">{steps[active].log}</p>
			</div>
			<ol class="mt-3 grid grid-cols-2 gap-2">
				{#each steps as step, n (step.label)}
					<li class={cn('rounded-xl p-3 ring-1 ring-foreground/10 transition-shadow', n === active && 'ring-primary')}>
						<p class={cn('font-mono text-[12px] tracking-[0.12em] uppercase', n === active ? 'text-primary' : 'text-foreground')}><span class="text-muted-foreground">0{n + 1}</span> {step.label}</p>
						<p class="mt-1 text-xs text-muted-foreground">{step.detail}</p>
					</li>
				{/each}
			</ol>
		</div>
	</div>

	<ul class="flex min-w-0 flex-col gap-2" aria-label="Installers for this release">
		{#each installers as r, i (i)}
			{@const st = rowState(i)}
			<li class={cn('group/row flex min-w-0 items-center gap-3 rounded-xl px-4 py-3 ring-1 ring-foreground/10 transition-shadow duration-300 hover:ring-primary/60 motion-reduce:transition-none', st.kind === 'building' && st.share > 0 && st.share < 1 && 'ring-primary/40')}>
				<span class="grid size-8 shrink-0 place-items-center rounded-lg ring-1 ring-foreground/10"><BrandIcon icon={icon(r.os)} class="size-4" /></span>
				<span class="flex min-w-0 flex-1 flex-col gap-1">
					<span class="truncate font-mono text-[12.5px] text-foreground">{r.file}</span>
					{#if st.kind === 'building'}
						<span class="h-1 overflow-hidden rounded-full bg-foreground/10"><span class="block h-full rounded-full bg-primary" style:width={`${st.share * 100}%`}></span></span>
					{:else}
						<span class="truncate font-mono text-[11px] text-muted-foreground">{r.target}</span>
					{/if}
				</span>
				<span class="flex shrink-0 flex-col items-end gap-1 text-right">
					<span class={cn('inline-flex items-center gap-1.5 text-[12px]', st.kind === 'published' || st.kind === 'signed' ? 'text-foreground' : 'text-muted-foreground')}>
						{#if st.kind === 'published'}<i class="size-1.5 rounded-full bg-green"></i>published
						{:else if st.kind === 'signed'}<Check class="lucide size-3.5 text-green" />{r.sign}
						{:else if st.kind === 'built'}<KeyRound class="lucide size-3.5" />signing
						{:else if st.kind === 'building'}{st.share >= 1 ? 'built' : 'building'}
						{:else}queued{/if}
					</span>
					<span class="font-mono text-[11px] text-muted-foreground">{r.size}</span>
				</span>
			</li>
		{/each}
	</ul>
</div>
