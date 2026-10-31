<script lang="ts">
	import SiteHeader from '$moves/site-framer/site-header.svelte';
	import SiteFooter from '$moves/site-framer/site-footer.svelte';
	import SectionHead from '$moves/site-framer/section-head.svelte';
	import ContactBoard from '$moves/site-framer/contact-board.svelte';

	const wrap = 'mx-auto max-w-[1280px] px-4 sm:px-8';
</script>

<svelte:head><title>Contact kiln</title></svelte:head>

<div class="min-h-screen overflow-x-clip bg-background text-foreground">
	<SiteHeader />
	<section class="{wrap} pt-16 pb-24 md:pt-24">
		<SectionHead as="h1" size="xl" title="Get in touch with the team" class="mb-12" />
		<ContactBoard />
		<div class="mt-16 grid gap-8 border-t border-border pt-10 sm:grid-cols-3">
			{#each [['Lisbon', 'Rua das Flores 28', 'HQ · design and engineering'], ['New York', '120 Walker St', 'Sales and success'], ['Remote', 'Twenty-two countries', 'Most of us, most of the time']] as [c, a, n] (c)}
				<div><p class="text-2xl font-medium tracking-[-0.03em]">{c}</p><p class="mt-1 text-lg">{a}</p><p class="text-foreground/65">{n}</p></div>
			{/each}
		</div>
	</section>
	<SiteFooter preset="etched-silk" />
</div>
