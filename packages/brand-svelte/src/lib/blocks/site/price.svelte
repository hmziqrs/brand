<!-- A plan's price: the number large, what it's for in grey. -->
<script lang="ts">
	let { plan, yearly, lifetime = false }: { plan: { name: string; price: number | string; yearly?: number; lifetime?: number; per?: string }; yearly: boolean; lifetime?: boolean } = $props();

	const free = $derived(plan.price === 0);
	const once = $derived(lifetime && plan.lifetime !== undefined);
	const amount = $derived(once ? plan.lifetime : yearly && plan.yearly !== undefined ? plan.yearly : plan.price);
	const per = $derived(plan.per ? `${plan.per} ` : "");
</script>

{#if typeof plan.price === "string"}
	<b class="text-[2.5rem] font-medium tracking-[-0.04em]">{plan.price}</b>
{:else}
	<p>
		<b class="text-[2.5rem] font-medium tracking-[-0.04em]">${Number(amount).toLocaleString("en-US")}</b>
		{" "}
		<span class="text-[0.9rem] text-muted-foreground">{free ? "forever" : once ? `${per}once` : `${per}${yearly ? "a year" : "a month"}`}</span>
	</p>
{/if}
