<script lang="ts">
	import { cn } from '$brand/utils.js';
	import FloatHero, { type Float } from '$moves/review/parts/site-flora/float-hero.svelte';

	let { class: className }: { class?: string } = $props();

	const floats: Float[] = [
		{ preset: 'etched-silk', x: 2, y: 8, w: 170, depth: 0.9, label: 'etched-silk' },
		{ preset: 'copper-sweep', x: 14, y: 58, w: 150, depth: 1.4, label: 'copper-sweep', hide: true },
		{ preset: 'creased-paper', x: 22, y: 4, w: 120, depth: 0.5, aspect: 'aspect-[4/3]', hide: true },
		{ preset: 'lava-fissures', x: 76, y: 4, w: 220, depth: 0.7, aspect: 'aspect-[16/10]', label: 'lava-fissures' },
		{ preset: 'interference-film', x: 86, y: 46, w: 160, depth: 1.2, label: 'interference-film', hide: true },
		{ preset: 'mineral-fault', x: 66, y: 70, w: 180, depth: 0.9, aspect: 'aspect-[4/3]', hide: true },
		{ preset: 'woven-linen', x: 0, y: 74, w: 150, depth: 0.6, aspect: 'aspect-square', hide: true }
	];
</script>

<div class={cn('absolute inset-0 isolate overflow-hidden', className)}>
	<FloatHero {floats} class="absolute inset-0">
		{#snippet children()}{/snippet}
	</FloatHero>
	<div aria-hidden="true" class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_44%_42%_at_50%_52%,var(--background)_45%,transparent_100%)] max-md:hidden"></div>
</div>
