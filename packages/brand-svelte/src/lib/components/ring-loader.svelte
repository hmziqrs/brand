<!-- Loading, in rings: three arcs turning at their own pace, the middle one orange. With
     reduced motion they stay still; the label always says what's happening. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";

	let {
		label = "Loading",
		/** Show the label next to the rings instead of only to screen readers. */
		visible = false,
		size = 24,
		/** brand: orange on faint lines. current: the text color, for buttons and other filled surfaces. */
		tone = "brand",
		class: className,
	}: {
		label?: string;
		visible?: boolean;
		size?: number;
		tone?: "brand" | "current";
		class?: string;
	} = $props();
</script>

<span data-slot="ring-loader" role="status" class={cn("inline-flex items-center gap-2.5 text-sm", tone === "brand" && "text-muted-foreground", className)}>
	<svg viewBox="0 0 40 40" aria-hidden="true" data-tone={tone} style:width={`${size}px`} style:height={`${size}px`}>
		<circle class="outer" cx="20" cy="20" r="18" fill="none" stroke="var(--line)" stroke-width="2" stroke-linecap="round" stroke-dasharray="70 43.1" />
		<circle class="middle" cx="20" cy="20" r="12.5" fill="none" stroke="var(--primary)" stroke-width="2.6" stroke-linecap="round" stroke-dasharray="34 44.5" />
		<circle class="inner" cx="20" cy="20" r="7" fill="none" stroke="var(--line)" stroke-width="2" stroke-linecap="round" stroke-dasharray="30 14" />
	</svg>
	<span class={visible ? undefined : "sr-only"}>{label}</span>
</span>

<style>
	circle {
		transform-box: view-box;
		transform-origin: 20px 20px;
		animation: ring-loader-turn linear infinite;
	}
	.outer {
		animation-duration: 2.4s;
		animation-direction: reverse;
	}
	.middle {
		animation-duration: 1.1s;
	}
	.inner {
		animation-duration: 1.7s;
	}
	[data-tone="current"] circle {
		stroke: currentColor;
	}
	[data-tone="current"] :is(.outer, .inner) {
		stroke-opacity: 0.4;
	}
	@keyframes ring-loader-turn {
		to {
			rotate: 360deg;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		circle {
			animation: none;
		}
	}
</style>
