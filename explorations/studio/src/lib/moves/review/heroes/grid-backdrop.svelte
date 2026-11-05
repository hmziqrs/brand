<script lang="ts">
	import { cn } from '$brand/utils.js';

	let { cell = 48, fade = 'radial', class: className }: { cell?: number; fade?: 'radial' | 'top' | 'none'; class?: string } = $props();

	const masks = {
		radial: 'radial-gradient(ellipse 80% 75% at 50% 40%, black 30%, transparent 100%)',
		top: 'linear-gradient(to bottom, black 40%, transparent)',
		none: 'none'
	};
</script>

<div
	aria-hidden="true"
	class={cn('pointer-events-none absolute inset-0 -z-10', className)}
	style:background-image="linear-gradient(to right, color-mix(in oklab, var(--foreground) 7%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--foreground) 7%, transparent) 1px, transparent 1px)"
	style:background-size="{cell}px {cell}px"
	style:background-position="center top"
	style:mask-image={masks[fade]}
></div>
