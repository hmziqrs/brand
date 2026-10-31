<script lang="ts">
	import { followPointer } from './canvas-kit';

	let { pitch = 14, focus = '78% 70%' }: { pitch?: number; focus?: string } = $props();
	let el: HTMLDivElement | undefined = $state();

	$effect(() => {
		if (el) return followPointer(el, (x, y) => ({ '--focus': `${x * 100}% ${y * 100}%` }));
	});
</script>

<div bind:this={el} class="dots absolute inset-0" style:--pitch={`${pitch}px`} style:--rest={focus}>
	<div class="base absolute inset-0"></div>
	<div class="hot absolute inset-0"></div>
</div>

<style>
	.dots {
		--focus: var(--rest);
	}
	.base {
		background-image: radial-gradient(circle at center, color-mix(in oklab, var(--foreground) 26%, transparent) 1.1px, transparent 1.6px);
		background-size: var(--pitch) var(--pitch);
		mask-image: linear-gradient(to bottom, black, color-mix(in oklab, black 55%, transparent));
	}
	.hot {
		background-image: radial-gradient(circle at center, var(--orange) 2.3px, transparent 2.8px);
		background-size: var(--pitch) var(--pitch);
		mask-image: radial-gradient(ellipse 52% 62% at var(--focus), black 0%, color-mix(in oklab, black 50%, transparent) 40%, transparent 72%);
	}
	:global(.dots[data-live]) .hot {
		mask-image: radial-gradient(circle 190px at var(--focus), black 0%, color-mix(in oklab, black 45%, transparent) 45%, transparent 100%);
	}
</style>
