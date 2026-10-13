<!-- A number whose digits roll to their new value when it changes, like an odometer. Still for
     reduced motion; screen readers get the number itself. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";

	let {
		value,
		/** Intl.NumberFormat options, e.g. { style: "currency", currency: "USD" }. */
		format = {},
		locale = "en-US",
		class: className,
	}: {
		value: number;
		format?: Intl.NumberFormatOptions;
		locale?: string;
		class?: string;
	} = $props();

	const text = $derived(new Intl.NumberFormat(locale, format).format(value));
	const chars = $derived([...text].reverse().map((c, i) => ({ c, key: i })).reverse());
</script>

<span data-slot="rolling-number" class={cn("inline-flex tabular-nums", className)}>
	<span class="sr-only">{text}</span>
	{#each chars as { c, key } (key)}
		{#if c >= "0" && c <= "9"}
			<span aria-hidden="true" class="digit">
				<span class="strip" style:--n={c}>{#each "0123456789" as d (d)}<span>{d}</span>{/each}</span>
			</span>
		{:else}
			<span aria-hidden="true">{c}</span>
		{/if}
	{/each}
</span>

<style>
	.digit {
		position: relative;
		display: inline-block;
		height: 1lh;
		overflow: hidden;
	}
	.strip {
		display: flex;
		flex-direction: column;
		translate: 0 calc(var(--n) * -1lh);
		transition: translate 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
	}
	.strip > span {
		height: 1lh;
	}
	@media (prefers-reduced-motion: reduce) {
		.strip {
			transition: none;
		}
	}
</style>
