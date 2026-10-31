<script lang="ts">
	import Menubar from '$moves/site-clicky/menubar.svelte';
	import DotDesk from '$moves/site-clicky/dot-desk.svelte';
	import PlanWindows from '$moves/site-clicky/plan-windows.svelte';
	import PlanPicker from '$moves/site-clicky/plan-picker.svelte';
	import SquareArc from '$moves/site-clicky/square-arc.svelte';
	import FaqWindow from '$moves/site-clicky/faq-window.svelte';
	import DeskFooter from '$moves/site-clicky/desk-footer.svelte';
	import { href } from '$moves/site-clicky/site';
	import { plans, faqs } from '$moves/site-clicky/copy';
</script>

<svelte:head><title>nudge · pricing</title></svelte:head>

<div class="min-h-screen overflow-x-clip bg-background text-foreground">
	<Menubar active="pricing" />
	<section class="relative isolate pb-10">
		<DotDesk />
		<div class="mx-auto grid max-w-[1180px] items-end gap-6 px-4 pt-16 pb-14 sm:px-6 md:grid-cols-[220px_1fr_220px]">
			<SquareArc from="green" to="teal" count={14} class="hidden w-full md:block" />
			<div class="text-center">
				<p class="mx-auto mb-6 w-fit rounded-full border border-border bg-background px-3 py-1 font-mono text-[11px] tracking-[0.14em] uppercase">pricing</p>
				<h1 class="text-7xl leading-[0.9] font-bold tracking-[-0.05em] sm:text-[120px]">nudge, your way</h1>
				<p class="mt-6 text-xl sm:text-2xl">three simple plans. cancel any time.</p>
			</div>
			<SquareArc from="pink" to="purple" flip count={14} class="hidden w-full md:block" />
		</div>
		<div class="px-4 sm:px-6"><PlanWindows {plans} href={href('pricing')} /></div>
	</section>

	<section class="mx-auto max-w-[1100px] px-4 py-16 sm:px-6">
		<PlanPicker />
	</section>

	<FaqWindow items={faqs} class="py-16" />
	<DeskFooter />
</div>
