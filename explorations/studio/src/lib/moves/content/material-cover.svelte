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
</script>

<div data-move="material-cover" class={cn('@container relative isolate overflow-hidden rounded-[inherit] bg-muted', className)}>
	<div class="absolute inset-0" style={look}>
		<ShaderMaterial preset={material} {rendering} {animated} {loading} {sizes} controls={false} class="absolute inset-0 h-full w-full" />
	</div>
	<div aria-hidden="true" class="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_100%_0%,transparent_40%,color-mix(in_oklab,black_38%,transparent))]"></div>
	{#if glyph}
		<span aria-hidden="true" class="absolute right-[6%] bottom-[2%] font-serif text-[clamp(5rem,16cqw,14rem)] leading-[0.8] text-white/90 italic mix-blend-overlay">{glyph}</span>
	{/if}
	{#if notch && number}
		<span class="absolute top-0 left-0 inline-flex items-baseline gap-1.5 rounded-br-2xl bg-background px-3.5 pt-2.5 pb-2 text-foreground">
			<span class="font-mono text-[0.6875rem] text-muted-foreground">No.</span>
			<span class="font-serif text-[1.65rem] leading-none italic">{number}</span>
		</span>
	{/if}
</div>
