<script lang="ts">
	import { shaderPosters } from '@hmziq/brand-core/shaders/posters';
	import { cn } from '$brand/utils.js';

	let {
		text,
		preset = 'copper-sweep',
		drift = true,
		follow = false,
		class: className
	}: { text: string; preset?: string; drift?: boolean; follow?: boolean; class?: string } = $props();

	const src = $derived((shaderPosters[preset] ?? shaderPosters['copper-sweep']).src);
	let pos = $state('30% 40%');
	let tracking = $state(false);

	$effect(() => {
		if (!follow) return;
		const q = matchMedia('(prefers-reduced-motion: reduce)');
		if (q.matches) return;
		tracking = true;
		const on = (e: PointerEvent) => {
			if (e.pointerType === 'touch') return;
			const x = 15 + (e.clientX / innerWidth) * 70;
			const y = 20 + (e.clientY / innerHeight) * 60;
			pos = `${x.toFixed(1)}% ${y.toFixed(1)}%`;
		};
		addEventListener('pointermove', on, { passive: true });
		return () => {
			removeEventListener('pointermove', on);
			tracking = false;
		};
	});
</script>

<span
	data-move="oxide-clip-word"
	class={cn('clip inline-block pr-[0.04em] text-primary', drift && !tracking && 'drift', tracking && 'follow', className)}
	style:--clip-src={`url(${JSON.stringify(src)})`}
	style:--clip-pos={pos}
>{text}</span>

<style>
	@supports ((background-clip: text) or (-webkit-background-clip: text)) {
		.clip {
			background-image: var(--clip-src);
			background-size: 220% auto;
			background-position: var(--clip-pos, 30% 40%);
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
		.follow {
			transition: background-position 1.2s cubic-bezier(0.2, 0.7, 0.1, 1);
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
