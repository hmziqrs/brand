<!-- A plan's price: the number large, what it's for in grey. -->
<script lang="ts">
	let { plan, yearly }: { plan: { name: string; price: number | string; yearly?: number; per?: string }; yearly: boolean } = $props();

	const free = $derived(plan.price === 0);
	const amount = $derived(yearly && plan.yearly !== undefined ? plan.yearly : plan.price);
	const per = $derived(plan.per ? `${plan.per} ` : "");
</script>

{#if typeof plan.price === "string"}
	<b class="text-[2.5rem] font-medium tracking-[-0.04em]">{plan.price}</b>
{:else}
	<p>
		<b class="text-[2.5rem] font-medium tracking-[-0.04em]">${amount.toLocaleString("en-US")}</b>
		{" "}
		<span class="text-[0.9rem] text-muted-foreground">{free ? "forever" : `${per}${yearly ? "a year" : "a month"}`}</span>
	</p>
{/if}
