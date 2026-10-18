<script lang="ts">
	import Container from '$brand/blocks/site/container.svelte';
	import PageIntro from '$brand/blocks/site/page-intro.svelte';

	const pages = [
		{ href: '/reference/saas', label: 'SaaS page', line: 'A landing page: hero, numbers, bento, steps, a screen, a material band, prices and questions.' },
		{ href: '/reference/content', label: 'Content page', line: 'A guide: intro, prose with a code block, a summary and a material band to close.' },
		{ href: '/reference/dashboard', label: 'Dashboard', line: 'An app screen built only from app blocks. No band.' },
		{ href: '/reference/materials', label: 'Materials', line: 'Four candidate bands, each in dark and light, with where it could go.' },
	];
</script>

<svelte:head>
	<title>Reference — Pages</title>
</svelte:head>

<Container class="flex flex-col gap-10 py-16 md:py-24">
	<PageIntro>
		{#snippet title()}Reference pages{/snippet}
		{#snippet lede()}Real kit blocks on sample copy, for the owner to judge before any rule is written.{/snippet}
	</PageIntro>

	<ul class="flex flex-col divide-y border-y">
		{#each pages as page (page.href)}
			<li>
				<a href={page.href} class="flex flex-col gap-1 py-5 underline-offset-4 outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50">
					<span class="font-medium">{page.label}</span>
					<span class="text-sm text-muted-foreground">{page.line}</span>
				</a>
			</li>
		{/each}
	</ul>
</Container>
