<script lang="ts">
	import { shaderPosters } from '@hmziq/brand-core/shaders/posters';
	import { cn } from '$brand/utils.js';

	let {
		target,
		variant = 'rail',
		minutes = 6,
		preset = 'copper-sweep',
		class: className
	}: {
		target?: HTMLElement;
		variant?: 'rail' | 'ring';
		minutes?: number;
		preset?: string;
		class?: string;
	} = $props();

	let progress = $state(0);
	const src = $derived((shaderPosters[preset] ?? shaderPosters['copper-sweep']).src);
	const left = $derived(Math.max(0, Math.ceil(minutes * (1 - progress))));
	const R = 22;
	const C = 2 * Math.PI * R;

	$effect(() => {
		const el = target;
		if (!el) return;
		let frame = 0;
		const measure = () => {
			frame = 0;
			const box = el.getBoundingClientRect();
			const span = box.height - window.innerHeight * 0.6;
			const done = (window.innerHeight * 0.4 - box.top) / Math.max(1, span);
			progress = Math.min(1, Math.max(0, done));
		};
		const queue = () => {
			if (!frame) frame = requestAnimationFrame(measure);
		};
		measure();
		window.addEventListener('scroll', queue, { passive: true });
		window.addEventListener('resize', queue);
		return () => {
			cancelAnimationFrame(frame);
			window.removeEventListener('scroll', queue);
			window.removeEventListener('resize', queue);
		};
	});
</script>

{#if variant === 'rail'}
	<div
		role="progressbar"
		aria-label="Reading progress"
		aria-valuemin={0}
		aria-valuemax={100}
		aria-valuenow={Math.round(progress * 100)}
		class={cn('pointer-events-none fixed inset-x-0 top-0 z-50 h-1', className)}
	>
		<div
			class="h-full origin-left bg-primary bg-cover bg-center"
			style:transform={`scaleX(${progress})`}
			style:background-image={`url(${JSON.stringify(src)})`}
		></div>
	</div>
{:else}
	<div
		role="progressbar"
		aria-label="Reading progress"
		aria-valuemin={0}
		aria-valuemax={100}
		aria-valuenow={Math.round(progress * 100)}
		class={cn(
			'fixed top-[4.5rem] right-4 z-40 flex items-center gap-2.5 rounded-full border bg-background/90 py-1.5 pr-4 pl-1.5 shadow-lg backdrop-blur transition-opacity motion-reduce:transition-none sm:right-6',
			progress <= 0 && 'opacity-0',
			className
		)}
	>
		<svg viewBox="0 0 56 56" class="size-10 -rotate-90" aria-hidden="true">
			<circle cx="28" cy="28" r={R} fill="none" stroke="var(--border)" stroke-width="5" />
			<circle cx="28" cy="28" r={R} fill="none" stroke="var(--primary)" stroke-width="5" stroke-linecap="round" stroke-dasharray={`${(C * progress).toFixed(2)} ${C}`} />
		</svg>
		<span class="flex flex-col leading-tight">
			<span class="text-[0.9375rem] font-medium tabular-nums text-foreground">{Math.round(progress * 100)}%</span>
			<span class="text-[0.6875rem] text-muted-foreground">{progress >= 1 ? 'Finished' : `${left} min left`}</span>
		</span>
	</div>
{/if}
