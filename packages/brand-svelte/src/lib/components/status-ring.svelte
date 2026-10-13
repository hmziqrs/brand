<!-- A small ring for live status: on carries a dot round it, off is a faint full ring,
     stale is broken. The word next to it carries the meaning; this only shows it. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";

	let {
		state = "on",
		color = "var(--primary)",
		class: className,
		...rest
	}: {
		state?: "on" | "off" | "stale";
		color?: string;
		class?: string;
	} & Record<string, unknown> = $props();
</script>

<svg data-slot="status-ring" data-state={state} viewBox="0 0 20 20" aria-hidden="true" class={cn("size-[1em] shrink-0", className)} style:--status={color} {...rest}>
	<g class="spin">
		<circle class="ring" cx="10" cy="10" r="7" fill="none" stroke-width="1.75" stroke-linecap="round" />
		{#if state === "on"}<circle class="dot" cx="10" cy="3" r="2.4" />{/if}
	</g>
</svg>

<style>
	.ring {
		stroke: var(--status);
	}
	.dot {
		fill: var(--status);
	}
	[data-state="on"] .ring {
		stroke-dasharray: 33 11;
	}
	[data-state="off"] .ring {
		stroke: var(--line);
	}
	[data-state="stale"] .ring {
		stroke: var(--muted-foreground);
		stroke-dasharray: 3 4;
	}
	[data-state="on"] .spin {
		transform-box: view-box;
		transform-origin: 10px 10px;
		animation: status-spin 2.8s linear infinite;
	}
	@keyframes status-spin {
		to {
			rotate: 360deg;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		[data-state="on"] .spin {
			animation: none;
		}
	}
</style>
