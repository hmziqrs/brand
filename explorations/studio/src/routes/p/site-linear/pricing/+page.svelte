<script lang="ts">
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import SiteHeader from '$moves/site-linear/site-header.svelte';
	import SiteFooter from '$moves/site-linear/site-footer.svelte';
	import PlanColumns from '$moves/site-linear/plan-columns.svelte';
	import CompareTable from '$moves/site-linear/compare-table.svelte';
	import IntegrationStrip from '$moves/site-linear/integration-strip.svelte';
	import { to } from '$moves/site-linear/content';
</script>

<svelte:head><title>Plumb · Pricing</title></svelte:head>

<div class="min-h-screen overflow-x-clip bg-background text-foreground">
	<SiteHeader current="pricing" />

	<section class="mx-auto max-w-[1320px] px-4 pt-20 pb-12 sm:px-6 md:pt-28">
		<h1 class="text-[clamp(3.5rem,9vw,8.5rem)] leading-[0.9] font-medium tracking-[-0.05em] text-foreground">Pricing<span class="text-primary">.</span></h1>
		<p class="mt-6 max-w-[40ch] text-xl leading-snug text-foreground md:text-2xl">Start free with your whole team. Pay when you need more teams, more control or more agents.</p>
	</section>

	<PlanColumns />

	<section class="pt-24 md:pt-32">
		<p class="mx-auto mb-6 max-w-[1320px] px-4 text-center text-lg text-foreground sm:px-6">Picked by <b class="font-semibold text-primary">40,000</b> teams <span class="font-mono text-[11px] tracking-wide text-muted-foreground uppercase">example figure</span>, and wired into the tools they already use.</p>
		<IntegrationStrip label="Every plan includes these integrations" />
		<p class="mt-6 text-center"><a href={to('customers')} class="inline-flex items-center gap-1.5 font-medium text-primary hover:underline">Customer stories <ArrowRight class="lucide size-4" /></a></p>
	</section>

	<CompareTable class="pt-24 pb-8 md:pt-32" />

	<SiteFooter />
</div>
