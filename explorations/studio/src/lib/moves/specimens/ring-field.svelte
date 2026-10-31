<script lang="ts">
	import { followPointer } from './canvas-kit';
	import Rings from '$brand/components/rings.svelte';

	let { seed = 'claude-multi' }: { seed?: string } = $props();
	let el: HTMLDivElement | undefined = $state();

	$effect(() => {
		if (el)
			return followPointer(el, (x, y) => ({
				'--turn': `${(Math.atan2(y - 0.5, x - 0.5) * 180) / Math.PI / 6}deg`,
				'--px': `${(x - 0.5) * -28}px`,
				'--py': `${(y - 0.5) * -20}px`
			}));
	});
</script>

<div bind:this={el} class="field absolute inset-0 overflow-hidden">
	<div class="lead absolute top-1/2 right-[-38%] w-[150%] -translate-y-[46%]">
		<Rings {seed} class="w-full max-w-none" label="Oxide rings, large" />
	</div>
	<div class="echo absolute -top-[30%] -left-[62%] w-[95%] opacity-50">
		<Rings seed={`${seed}-echo`} class="w-full max-w-none rotate-180" label="" aria-hidden="true" />
	</div>
</div>

<style>
	.lead,
	.echo {
		transition: transform 0.9s cubic-bezier(0.2, 0.7, 0.2, 1);
	}
	.lead {
		transform: translate(var(--px, 0px), calc(-46% + var(--py, 0px))) rotate(var(--turn, 0deg));
	}
	.echo {
		transform: translate(calc(var(--px, 0px) * -0.6), calc(var(--py, 0px) * -0.6)) rotate(calc(var(--turn, 0deg) * -1));
	}
	@media (prefers-reduced-motion: reduce) {
		.lead,
		.echo {
			transition: none;
		}
	}
</style>
