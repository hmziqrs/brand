<!--
  The brand's card: a thin line, no fill. With `href` the whole card is a
  link, and hovering tints the line orange.
-->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import type { Snippet } from "svelte";

	let { href, class: className, children, ...rest }: { href?: string; class?: string; children?: Snippet } & Record<string, unknown> = $props();

	const cls = $derived(cn(
		"relative flex flex-col gap-3 overflow-hidden rounded-xl p-6 text-sm text-foreground ring-1 ring-foreground/10",
		href && "no-underline transition-colors outline-none hover:ring-primary/50 focus-visible:ring-3 focus-visible:ring-ring/50",
		className,
	));
</script>

{#if href}
	<a {href} class={cls}>{@render children?.()}</a>
{:else}
	<div class={cls} {...rest}>{@render children?.()}</div>
{/if}
