<script lang="ts">
	import SiteHeader from '$moves/site-framer/site-header.svelte';
	import SiteFooter from '$moves/site-framer/site-footer.svelte';
	import SectionHead from '$moves/site-framer/section-head.svelte';
	import ContactBoard from '$moves/site-framer/contact-board.svelte';

</script>

<svelte:head><title>Contact kiln</title></svelte:head>

<div class="min-h-screen overflow-x-clip bg-background text-foreground">
	<SiteHeader />
	<section class="w-full px-4 pt-16 pb-24 sm:px-6 md:pt-24 lg:px-10">
		<SectionHead as="h1" size="xl" title="Get in touch with the team" lede="Pick the door that fits. A person answers every one of them." class="mb-12" />
		<ContactBoard />
		<div class="mt-4 grid gap-4 sm:grid-cols-3">
			{#each [['Lisbon', 'Rua das Flores 28', 'HQ · design and engineering'], ['New York', '120 Walker St', 'Sales and success'], ['Remote', 'Twenty-two countries', 'Most of us, most of the time']] as [c, a, n] (c)}
				<div class="rounded-[24px] border border-border bg-card p-6"><p class="font-mono text-[0.6875rem] tracking-[0.14em] text-primary uppercase">{n}</p><p class="mt-10 text-3xl font-semibold tracking-[-0.04em]">{c}</p><p class="mt-1 text-lg">{a}</p></div>
			{/each}
		</div>
	</section>
	<SiteFooter />
</div>
