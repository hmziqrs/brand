<script lang="ts">
	import { cn } from '$brand/utils.js';

	let { still = false, class: className }: { still?: boolean; class?: string } = $props();
</script>

<span aria-hidden="true" class={cn('relative mx-[0.06em] inline-block size-[0.86em] align-[-0.08em]', className)}>
	<svg viewBox="0 0 100 100" class="absolute inset-0 size-full overflow-visible">
		{#each [46, 35, 24] as r (r)}
			<circle cx="50" cy="50" {r} fill="none" stroke="currentColor" stroke-opacity="0.32" stroke-width="2.4" />
		{/each}
		<g class={cn('spin', still && 'still')}>
			<path d="M50 4 A46 46 0 0 1 96 50" fill="none" stroke="var(--primary)" stroke-width="2.4" stroke-linecap="round" />
			<circle cx="96" cy="50" r="4.5" fill="var(--primary)" />
		</g>
		<g class={cn('spin rev', still && 'still')}>
			<circle cx="50" cy="15" r="3.4" fill="currentColor" />
		</g>
	</svg>
</span>

<style>
	.spin {
		transform-origin: 50px 50px;
		animation: spin 14s linear infinite;
	}
	.rev {
		animation-duration: 22s;
		animation-direction: reverse;
	}
	.still {
		animation: none;
	}
	@media (prefers-reduced-motion: reduce) {
		.spin {
			animation: none;
		}
	}
	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>
