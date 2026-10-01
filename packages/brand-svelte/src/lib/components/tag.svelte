<!--
  A small colored label for a status or a category. Same size as shadcn's
  Badge, but filled softly with one of the brand colors. With `href` it is a
  link; hover underlines it, nothing moves.
-->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import { softTone, type Tone } from "@hmziq/brand-core/tones";

	let {
		/** A supporting color or a status. Leave it out for a plain grey tag. */
		tone,
		/** A ring marker before the label, for live states like "Shipped" or "Available". */
		marker = false,
		href,
		class: className,
		children,
		...rest
	}: {
		tone?: Tone;
		marker?: boolean;
		href?: string;
		class?: string;
		children?: import("svelte").Snippet;
	} & Record<string, unknown> = $props();

	const cls = $derived(cn(
		"inline-flex h-5 w-fit shrink-0 items-center gap-1.5 rounded-4xl px-2 text-xs font-medium whitespace-nowrap underline-offset-2 outline-none focus-visible:ring-3 focus-visible:ring-ring/50 [a]:hover:underline [&>svg]:pointer-events-none [&>svg]:size-3",
		tone ? softTone[tone] : "bg-secondary text-secondary-foreground",
		className,
	));
</script>

{#if href}
	<a {href} data-slot="tag" data-tone={tone} class={cls} {...rest}>
		{#if marker}<i class="size-1.75 shrink-0 rounded-full border-[1.5px] border-current" aria-hidden="true" ></i>{/if}
		{@render children?.()}
	</a>
{:else}
	<span data-slot="tag" data-tone={tone} class={cls} {...rest}>
		{#if marker}<i class="size-1.75 shrink-0 rounded-full border-[1.5px] border-current" aria-hidden="true" ></i>{/if}
		{@render children?.()}
	</span>
{/if}
