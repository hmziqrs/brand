<script lang="ts">
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import { hash, rng } from '@hmziq/brand-core/motion/rings';
	import { cn } from '$brand/utils.js';

	let {
		seed,
		preset,
		number,
		glyph,
		rendering = 'image',
		animated = false,
		loading = 'eager',
		sizes = '(min-width: 1024px) 50vw, 100vw',
		notch = true,
		tilt = false,
		class: className
	}: {
		seed: string;
		preset?: string;
		number?: string;
		glyph?: string;
		rendering?: 'image' | 'live';
		animated?: boolean;
		loading?: 'eager' | 'lazy';
		sizes?: string;
		notch?: boolean;
		tilt?: boolean;
		class?: string;
	} = $props();

	const covers = ['copper-sweep', 'hammered-copper', 'folded-foil', 'etched-silk', 'lava-fissures', 'mineral-fault', 'oxide-bloom', 'mica-flakes', 'sediment', 'liquid-chrome', 'cast-iron'];
	const material = $derived(preset ?? covers[hash(seed + ':x') % covers.length]);
	const look = $derived.by(() => {
		const r = rng(hash(seed) + 3);
		const s = 1.08 + r() * 0.5;
		const turn = r() < 0.5 ? 0 : 180;
		const flip = r() < 0.5 ? -1 : 1;
		const room = ((s - 1) / 2) * 100 * 0.9;
		const tx = ((r() * 2 - 1) * room).toFixed(1);
		const ty = ((r() * 2 - 1) * room).toFixed(1);
		return `transform: translate(${tx}%, ${ty}%) rotate(${turn}deg) scale(${(s * flip).toFixed(3)}, ${s.toFixed(3)});`;
	});

	let mx = $state(0);
	let my = $state(0);
	let hot = $state(false);
	let still = $state(false);

	$effect(() => {
		const q = matchMedia('(prefers-reduced-motion: reduce)');
		still = q.matches;
		const on = () => (still = q.matches);
		q.addEventListener('change', on);
		return () => q.removeEventListener('change', on);
	});

	function move(e: PointerEvent) {
		if (!tilt || e.pointerType === 'touch') return;
		const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
		mx = ((e.clientX - r.left) / r.width) * 2 - 1;
		my = ((e.clientY - r.top) / r.height) * 2 - 1;
		hot = true;
	}
	function leave() {
		mx = 0;
		my = 0;
		hot = false;
	}
	const shift = $derived(tilt && !still ? `transform: translate3d(${(-mx * 14).toFixed(1)}px, ${(-my * 14).toFixed(1)}px, 0) scale(${hot ? 1.06 : 1});` : '');
</script>

<div
	data-move="material-cover"
	role="presentation"
	onpointermove={move}
	onpointerleave={leave}
	class={cn('@container relative isolate overflow-hidden rounded-[inherit] bg-muted', className)}
>
	<div class="absolute -inset-4 transition-transform duration-500 ease-out motion-reduce:transition-none" style={shift}>
		<div class="absolute inset-0" style={look}>
			<ShaderMaterial preset={material} {rendering} {animated} {loading} {sizes} controls={false} class="absolute inset-0 h-full w-full" />
		</div>
	</div>
	{#if tilt}
		<div
			aria-hidden="true"
			class="pointer-events-none absolute inset-0 mix-blend-soft-light transition-opacity duration-300"
			style:opacity={hot ? 1 : 0}
			style:background={`radial-gradient(40% 55% at ${(50 + mx * 50).toFixed(1)}% ${(50 + my * 50).toFixed(1)}%, color-mix(in oklab, white 70%, transparent), transparent 70%)`}
		></div>
	{/if}
	<div aria-hidden="true" class="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_100%_0%,transparent_40%,color-mix(in_oklab,black_38%,transparent))]"></div>
	{#if glyph}
		<span aria-hidden="true" class="absolute right-[6%] bottom-[2%] font-serif text-[clamp(5rem,16cqw,14rem)] leading-[0.8] text-white/90 italic mix-blend-overlay">{glyph}</span>
	{/if}
	{#if notch && number}
		<span class="absolute top-0 left-0 inline-flex items-baseline gap-1.5 rounded-br-2xl bg-background px-3.5 pt-2.5 pb-2 text-foreground">
			<span class="font-mono text-[0.6875rem] text-muted-foreground">No.</span>
			<span class="text-[1.375rem] leading-none font-medium tracking-[-0.04em] tabular-nums">{number}</span>
		</span>
	{/if}
</div>
