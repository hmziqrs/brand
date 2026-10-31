<script lang="ts">
	import CircleCheck from '@lucide/svelte/icons/circle-check';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import SiteHeader from '$moves/site-linear/site-header.svelte';
	import SiteFooter from '$moves/site-linear/site-footer.svelte';
	import SalesForm from '$moves/site-linear/sales-form.svelte';
	import OxideTile from '$moves/bento/oxide-tile.svelte';
	import { to } from '$moves/site-linear/content';

	const points = ['See a live demo built around your workflow', 'Find the plan that fits your team', 'Get help onboarding and moving your data'];
</script>

<svelte:head><title>Plumb · Talk to sales</title></svelte:head>

<div class="min-h-screen overflow-x-clip bg-background text-foreground">
	<SiteHeader current="contact" />

	<section class="mx-auto grid max-w-[1320px] gap-12 px-4 pt-20 pb-28 sm:px-6 md:pt-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
		<div class="flex flex-col gap-8">
			<h1 class="text-[clamp(3.25rem,7.4vw,6.5rem)] leading-[0.92] font-medium tracking-[-0.05em] text-foreground">Talk to <span class="text-primary">sales</span></h1>
			<ul class="flex flex-col gap-4">
				{#each points as p (p)}
					<li class="flex items-start gap-3 text-xl leading-snug text-foreground"><CircleCheck class="lucide mt-1 size-5 shrink-0 text-primary" />{p}</li>
				{/each}
			</ul>
			<p class="text-base text-foreground">Stuck on something technical? <a href={to('changelog')} class="font-medium text-primary underline underline-offset-4">Contact support</a></p>
			<OxideTile eyebrow="Switching" title="We move your tracker for you." body="Issues, projects, comments and history come across in an afternoon. Your team keeps working while it runs." art="square" class="mt-auto min-h-64">
				<a href={to('customers')} class="mt-2 inline-flex items-center gap-1.5 font-medium underline underline-offset-4">How other teams switched <ArrowRight class="lucide size-4" /></a>
			</OxideTile>
		</div>
		<div class="relative isolate overflow-hidden rounded-3xl p-3 ring-1 ring-foreground/10 sm:p-8">
			<ShaderMaterial preset="brushed-alloy" rendering="image" controls={false} sizes="(min-width: 1024px) 50vw, 100vw" class="absolute inset-0 -z-10 h-full w-full" />
			<SalesForm />
		</div>
	</section>

	<SiteFooter closing={false} />
</div>
