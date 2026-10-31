<script lang="ts">
	import { followPointer } from './canvas-kit';
	import Scene from '$brand/components/scene.svelte';
	import Rings from '$brand/components/rings.svelte';

	let { kind = 'lattice', seed = 'claude-multi' }: { kind?: 'lattice' | 'network' | 'layers'; seed?: string } = $props();
	let el: HTMLDivElement | undefined = $state();

	$effect(() => {
		if (el) return followPointer(el, (x, y) => ({ '--rx': `${(y - 0.5) * -14}deg`, '--ry': `${(x - 0.5) * 22}deg` }));
	});
</script>

<div bind:this={el} class="absolute inset-0 overflow-hidden [perspective:1100px]">
	<div class="tilt absolute top-[-6%] right-[-16%] h-[112%] w-[92%]">
		<Scene {kind} {seed} class="absolute inset-0">
			{#snippet fallback()}<Rings {seed} class="absolute inset-0" />{/snippet}
		</Scene>
	</div>
</div>

<style>
	.tilt {
		transform: rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
		transition: transform 0.7s cubic-bezier(0.2, 0.7, 0.2, 1);
	}
	@media (prefers-reduced-motion: reduce) {
		.tilt {
			transition: none;
		}
	}
</style>
