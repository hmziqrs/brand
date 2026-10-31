<script lang="ts">
	import { shaderPosters } from '@hmziq/brand-core/shaders/posters';
	import { cn } from '$brand/utils.js';

	let {
		text,
		preset = 'copper-sweep',
		drift = true,
		class: className
	}: { text: string; preset?: string; drift?: boolean; class?: string } = $props();

	const src = $derived((shaderPosters[preset] ?? shaderPosters['copper-sweep']).src);
</script>

<span
	data-move="oxide-clip-word"
	class={cn('clip inline-block pr-[0.04em] text-primary', drift && 'drift', className)}
	style:--clip-src={`url(${JSON.stringify(src)})`}
>{text}</span>

<style>
	@supports ((background-clip: text) or (-webkit-background-clip: text)) {
		.clip {
			background-image: var(--clip-src);
			background-size: 220% auto;
			background-position: 30% 40%;
			-webkit-background-clip: text;
			background-clip: text;
			color: transparent;
			-webkit-text-fill-color: transparent;
		}
		:global(:root:not(.dark)) .clip {
			filter: saturate(1.15) brightness(0.86) contrast(1.1);
		}
		.drift {
			animation: clip-drift 26s ease-in-out infinite alternate;
		}
	}
	@keyframes clip-drift {
		to {
			background-position: 70% 60%;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.drift {
			animation: none;
		}
	}
</style>
