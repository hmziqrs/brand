<!--
  Plans in outline cards, with a monthly / yearly switch. The recommended
  one gets the orange line, a tag and corner rings.
-->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import Segmented from "$brand/components/segmented.svelte";
	import CornerRings from "$brand/components/corner-rings.svelte";
	import Tag from "$brand/components/tag.svelte";
	import OutlineCard from "./outline-card.svelte";
	import ButtonLink from "./button-link.svelte";
	import Price from "./price.svelte";
	import CheckList from "./check-list.svelte";
	import type { Plan } from "./plan.js";
	import type { Snippet } from "svelte";

	let {
		plans,
		/** The monthly / yearly switch, with lifetime when a plan has a lifetime price. On by default. */
		billing = true,
		/** Draw the price yourself, e.g. with a total for the team size. */
		price,
		class: className,
	}: { plans: Plan[]; billing?: boolean; price?: Snippet<[Plan, boolean]>; class?: string } = $props();

	let billingPeriod = $state<"monthly" | "yearly" | "lifetime">("monthly");
	const yearly = $derived(billingPeriod === "yearly");
	const lifetime = $derived(billingPeriod === "lifetime");
	const sellsLifetime = $derived(plans.some((p) => p.lifetime !== undefined));
</script>

<div class={cn("flex flex-col items-start gap-6", className)}>
	{#if billing}
		<Segmented
			label="Billing"
			value={billingPeriod}
			onValueChange={(v) => (billingPeriod = v as "monthly" | "yearly" | "lifetime")}
			options={[
				{ value: "monthly", label: "Monthly" },
				{ value: "yearly", label: "Yearly, 2 months free" },
				...(sellsLifetime ? [{ value: "lifetime", label: "Lifetime" }] : []),
			]}
		/>
	{/if}
	<div class={cn("grid w-full gap-4 sm:grid-cols-2", plans.length > 2 && "lg:grid-cols-3")}>
		{#each plans as p (p.name)}
			<OutlineCard class={cn("gap-4", p.pick && "ring-primary/55")}>
				{#if p.pick}<CornerRings seed={`pricing ${p.name}`} quiet />{/if}
				<div class="relative flex items-center justify-between gap-2">
					<h3 class="text-lg font-medium">{p.name}</h3>
					{#if p.pick}
						<Tag tone="orange" marker>Recommended</Tag>
					{/if}
				</div>
				<div class="relative">
					{#if price}{@render price(p, yearly)}{:else}<Price plan={p} {yearly} {lifetime} />{/if}
				</div>
				<p class="relative text-[0.9rem] text-muted-foreground">{p.blurb}</p>
				<CheckList items={p.features} class="relative mb-2" />
				<ButtonLink href="#" size="lg" variant={p.pick ? "default" : "outline"} class="relative mt-auto">
					{p.cta}
				</ButtonLink>
			</OutlineCard>
		{/each}
	</div>
</div>
