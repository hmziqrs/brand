<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$brand/utils.js';
	import { shaderPosters } from '@hmziq/brand-core/shaders/posters';

	let {
		preset = 'copper-sweep',
		drift = true,
		class: className,
		children
	}: {
		preset?: string;
		drift?: boolean;
		class?: string;
		children: Snippet;
	} = $props();

	const poster = $derived((shaderPosters[preset] ?? shaderPosters['copper-sweep']).src);
</script>

<span class={cn('material-ink', drift && 'is-drift', className)} style:--poster={`url(${poster})`}>{@render children()}</span>

<style>
	.material-ink {
		background-color: var(--oxide-vivid);
		background-image: var(--poster);
		background-size: 220% auto;
		background-position: 20% 50%;
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
		-webkit-box-decoration-break: clone;
		box-decoration-break: clone;
		padding-inline: 0.02em;
	}
	.is-drift {
		animation: ink-drift 18s ease-in-out infinite alternate;
	}
	@keyframes ink-drift {
		to {
			background-position: 80% 50%;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.is-drift {
			animation: none;
		}
	}
</style>
