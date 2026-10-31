<script lang="ts">
	import { cn } from '$brand/utils.js';
	import InlineGlyph from './inline-glyph.svelte';
	import MonoChip from './mono-chip.svelte';
	import ProviderMark from './provider-mark.svelte';
	import type { Provider } from './providers';

	let {
		providers,
		hub = 'claude-multi',
		caption = 'One CLI · isolated instances',
		glyph = 'stack',
		preset = 'hammered-copper',
		glow = true,
		class: className
	}: {
		providers: Provider[];
		hub?: string;
		caption?: string;
		glyph?: 'stack' | 'rings' | 'square' | 'orbit';
		preset?: string;
		glow?: boolean;
		class?: string;
	} = $props();

	const uid = $props.id();
	const W = 1000;
	const H = 620;
	const C = { x: 500, y: 310 };
	const rings = [
		{ rx: 450, ry: 150, rot: -9, dur: 26 },
		{ rx: 350, ry: 215, rot: 26, dur: 34 },
		{ rx: 290, ry: 118, rot: -38, dur: 21 }
	];
	const slots = [
		[0, 185],
		[1, 250],
		[0, 340],
		[2, 340],
		[1, 105],
		[1, 30],
		[0, 40],
		[1, 160]
	] as const;

	const at = (k: number, deg: number) => {
		const { rx, ry, rot } = rings[k];
		const t = (deg * Math.PI) / 180;
		const r = (rot * Math.PI) / 180;
		const x = C.x + rx * Math.cos(t) * Math.cos(r) - ry * Math.sin(t) * Math.sin(r);
		const y = C.y + rx * Math.cos(t) * Math.sin(r) + ry * Math.sin(t) * Math.cos(r);
		return { left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` };
	};
	const placed = $derived(providers.slice(0, slots.length).map((p, i) => ({ p, ...at(slots[i][0], slots[i][1]) })));
	const d = (rx: number, ry: number) => `M ${C.x - rx} ${C.y} a ${rx} ${ry} 0 1 0 ${rx * 2} 0 a ${rx} ${ry} 0 1 0 ${-rx * 2} 0`;

	let moving = $state(false);
	$effect(() => {
		const m = matchMedia('(prefers-reduced-motion: reduce)');
		const set = () => (moving = !m.matches);
		set();
		m.addEventListener('change', set);
		return () => m.removeEventListener('change', set);
	});
</script>

<div data-slot="provider-orbit" class={cn('relative', className)}>
	<div class="relative mx-auto hidden aspect-[1000/620] w-full max-w-[72rem] md:block">
		<svg viewBox={`0 0 ${W} ${H}`} aria-hidden="true" class="absolute inset-0 size-full overflow-visible">
			{#each rings as r, k (k)}
				<g transform={`rotate(${r.rot} ${C.x} ${C.y})`}>
					<path id={`${uid}-r${k}`} d={d(r.rx, r.ry)} fill="none" stroke="color-mix(in oklab, var(--foreground) 22%, transparent)" stroke-width="1" stroke-dasharray="2 5" />
					{#each [0, 1, 2, 3, 4, 5] as n (n)}
						<rect x="-2.5" y="-2.5" width="5" height="5" fill="var(--primary)" opacity={0.45 + (n % 3) * 0.2}>
							{#if moving}
								<animateMotion dur={`${r.dur}s`} begin={`-${(r.dur / 6) * n}s`} repeatCount="indefinite"><mpath href={`#${uid}-r${k}`} /></animateMotion>
							{/if}
						</rect>
					{/each}
				</g>
			{/each}
		</svg>
		{#if glow}
			<div aria-hidden="true" class="absolute top-1/2 left-1/2 size-[42%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--orange)_42%,transparent),transparent)] blur-xl"></div>
		{/if}
		<div class="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3 text-foreground">
			<span class="text-[clamp(5rem,11vw,9rem)] leading-none"><InlineGlyph kind={glyph} {preset} /></span>
			<span class="text-center font-mono text-[0.6875rem] leading-relaxed tracking-[0.1em] uppercase">{hub}<br /><span class="text-muted-foreground">{caption}</span></span>
		</div>
		{#each placed as n (n.p.id)}
			<span class="absolute -translate-x-1/2 -translate-y-1/2" style:left={n.left} style:top={n.top}>
				<MonoChip mark="plus"><ProviderMark provider={n.p} class="text-[0.8rem]" />{n.p.chip}</MonoChip>
			</span>
		{/each}
	</div>
	<div class="flex flex-col items-center gap-6 px-4 md:hidden">
		<span class="relative text-[6rem] leading-none">
			{#if glow}<span aria-hidden="true" class="absolute inset-[-30%] -z-10 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--orange)_40%,transparent),transparent)]"></span>{/if}
			<InlineGlyph kind={glyph} {preset} />
		</span>
		<span class="text-center font-mono text-[0.6875rem] tracking-[0.1em] uppercase">{hub} · <span class="text-muted-foreground">{caption}</span></span>
		<div class="flex flex-wrap justify-center gap-2">
			{#each providers as p (p.id)}
				<MonoChip mark="plus"><ProviderMark provider={p} class="text-[0.8rem]" />{p.chip}</MonoChip>
			{/each}
		</div>
	</div>
</div>
