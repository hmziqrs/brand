<script lang="ts">
	import { cn } from '$brand/utils.js';

	let {
		gap = 14,
		class: className
	}: {
		gap?: number;
		class?: string;
	} = $props();
</script>

<div aria-hidden="true" class={cn('dot-field pointer-events-none absolute inset-0 overflow-hidden', className)} style:--gap={`${gap}px`}>
	<div class="dots base absolute inset-0"></div>
	<div class="dots lit absolute inset-0"></div>
</div>

<style>
	.dots {
		background-size: var(--gap) var(--gap);
	}
	.base {
		background-image: radial-gradient(circle at center, color-mix(in oklab, var(--foreground) 16%, transparent) 1px, transparent 1.4px);
		mask-image: linear-gradient(to bottom, transparent, black 70%);
	}
	.lit {
		background-image: radial-gradient(circle at center, var(--primary) 1.4px, transparent 1.9px);
		mask-image: radial-gradient(14rem 14rem at calc(var(--px, 0.5) * 100%) calc(var(--py, 0.5) * 100%), black, transparent 70%);
		opacity: 0;
		transition: opacity 0.4s;
	}
	:global([data-hot]) .dot-field .lit {
		opacity: 1;
	}
</style>
