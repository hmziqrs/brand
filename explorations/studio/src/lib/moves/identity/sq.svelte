<script lang="ts">
	import { cn } from '$brand/utils.js';

	let {
		tone = 'oxide',
		size = 0.36,
		gap = 0.07,
		class: className
	}: { tone?: 'oxide' | 'ink' | 'hollow' | 'hatch'; size?: number; gap?: number; class?: string } = $props();
</script>

<i
	aria-hidden="true"
	data-tone={tone}
	class={cn('sq inline-block align-baseline', className)}
	style:width="{size}em"
	style:height="{size}em"
	style:margin-left="{gap}em"
></i>

<style>
	.sq[data-tone='oxide'] {
		background: var(--sq-color, var(--mark-square));
	}
	.sq[data-tone='ink'] {
		background: currentColor;
	}
	.sq[data-tone='hollow'] {
		box-shadow: inset 0 0 0 max(1.5px, 0.06em) var(--sq-color, var(--mark-square));
	}
	.sq[data-tone='hatch'] {
		background: repeating-linear-gradient(-45deg, var(--sq-color, var(--mark-square)) 0 1.5px, transparent 1.5px 4px);
		box-shadow: inset 0 0 0 max(1.5px, 0.05em) var(--sq-color, var(--mark-square));
	}
</style>
