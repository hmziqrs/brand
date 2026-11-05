<script lang="ts">
	import { cn } from "$brand/utils.js";
	import Tag from "$brand/components/tag.svelte";
	import LineArt from "$brand/components/line-art.svelte";
	import CornerRings from "$brand/components/corner-rings.svelte";
	import ButtonLink from "./button-link.svelte";
	import CheckList from "./check-list.svelte";
	import type { PricingTier } from "./pricing-types.js";

	let {
		tier,
		/** Which billing mode's price shows: an index into the tier's lists. */
		mode = 0,
		href = "#",
		class: className,
	}: { tier: PricingTier; mode?: number; href?: string; class?: string } = $props();
</script>

<article
	data-slot="pricing-card"
	data-line-art-host
	class={cn("relative isolate flex min-w-0 flex-col overflow-hidden rounded-2xl", tier.pick ? "band-orange" : "bg-background ring-1 ring-foreground/10", className)}
>
	{#if tier.pick}<CornerRings seed={`pricing ${tier.name}`} color="var(--on-orange)" class="-z-10 w-1/2 opacity-60 [&_circle]:[stroke-width:0.5]" />{/if}
	<div class="relative h-36 border-b border-border">
		<div class="absolute inset-x-8 inset-y-4"><LineArt kind={tier.art} /></div>
		{#if tier.badge}<Tag marker class="absolute top-4 left-4 bg-(--on-orange) text-(--orange)">{tier.badge}</Tag>{/if}
	</div>
	<div class="flex flex-1 flex-col p-6">
		<h3 class="text-[1.375rem] leading-tight font-medium tracking-[-0.02em]">{tier.name}</h3>
		<p class="mt-2 text-[0.95rem] leading-snug text-foreground/85 lg:min-h-[4.1em]">{tier.for}</p>
		<p class="mt-6 text-5xl leading-none font-medium tracking-[-0.045em] tabular-nums">{tier.amount[mode]}</p>
		<p class="mt-2.5 text-[0.875rem] leading-snug lg:min-h-[2.7em]"><span class="text-foreground">{tier.unit[mode]}</span> <span class="text-muted-foreground">· {tier.note[mode]}</span></p>
		<ButtonLink {href} size="lg" variant={tier.pick ? "default" : "outline"} class="mt-6 w-full">{tier.cta}</ButtonLink>
		<CheckList items={tier.items} class="mt-6 border-t border-border pt-6 [&>li]:text-[0.9375rem] [&>li]:text-foreground/85" />
	</div>
</article>
