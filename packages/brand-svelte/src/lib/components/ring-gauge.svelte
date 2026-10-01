<!-- A number drawn as a ring: 100% is a full ring, 90% most of one, 5 is five segments. Put the number beside it. -->
<script lang="ts">
	import { cn, styleText } from "$brand/utils.js";

	let {
		/** A share from 0 to 1 fills the ring that far. A whole number above 1 splits it into that many segments. */
		value,
		/** Which color the filled part draws in. `warning` and `destructive` carry a threshold (UsageMeter); the default is the brand's orange. */
		tone = "primary",
		class: className,
		style,
		...rest
	}: {
		value: number;
		tone?: "primary" | "warning" | "destructive";
		class?: string;
		style?: Record<string, string>;
	} & Record<string, unknown> = $props();

	const r = 30;
	const c = 2 * Math.PI * r;
	const stroke = $derived(
		{ primary: "var(--primary)", warning: "var(--warning)", destructive: "var(--destructive)" }[tone],
	);
</script>

<svg data-slot="ring-gauge" viewBox="0 0 72 72" aria-hidden="true" class={cn("size-18 shrink-0", className)} style={styleText(style)} {...rest}>
	{#if value > 1}
		<circle cx="36" cy="36" {r} fill="none" stroke={stroke} stroke-width="5" stroke-dasharray={`${(c / value - 5).toFixed(2)} 5`} transform="rotate(-90 36 36)" />
	{:else}
		<circle cx="36" cy="36" {r} fill="none" stroke="var(--border)" stroke-width="5" />
		<circle cx="36" cy="36" {r} fill="none" stroke={stroke} stroke-width="5" stroke-linecap="round" stroke-dasharray={`${(c * value).toFixed(2)} ${c.toFixed(2)}`} transform="rotate(-90 36 36)" />
	{/if}
</svg>
