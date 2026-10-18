<script lang="ts">
	import Container from '$brand/blocks/site/container.svelte';
	import Tag from '$brand/components/tag.svelte';

	const pages = [
		{ href: '/reference/mix/plain', label: 'Plain', note: 'Hero, Steps, Bento, PricingPlans, FaqList. No band.' },
		{ href: '/reference/mix/orange-band', label: 'Orange band', note: 'Plain page with one orange closing band.' },
		{ href: '/reference/mix/carbon-band', label: 'Carbon band', note: 'Plain page with the carbon-twill band at the end.' },
		{ href: '/reference/mix/oxide-band', label: 'Oxide band', note: 'Plain page with the oxide-bloom band between Steps and Bento.' },
		{ href: '/reference/mix/app', label: 'App screen', note: 'App blocks only: header, stats, table, settings. No band.' },
	];
</script>

<svelte:head>
	<title>Section mix — Reference</title>
</svelte:head>

<Container class="flex flex-col gap-6 py-16 md:py-24">
	<p class="flex items-center gap-3 text-sm font-medium">Section mix <Tag>Sample copy</Tag></p>
	<ul class="flex flex-col gap-2 text-sm">
		{#each pages as page (page.href)}
			<li>
				<a href={page.href} class="underline-offset-4 hover:underline">{page.label}</a>
				<span class="text-muted-foreground">: {page.note}</span>
			</li>
		{/each}
	</ul>
</Container>
