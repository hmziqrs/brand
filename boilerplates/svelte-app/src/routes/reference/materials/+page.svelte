<script lang="ts">
	import Container from '$brand/blocks/site/container.svelte';
	import PageIntro from '$brand/blocks/site/page-intro.svelte';
	import MaterialBand from '../material-band.svelte';

	const families = [
		{
			name: 'Carbon fiber',
			looks: [
				{ preset: 'carbon-twill', name: 'Carbon twill', note: 'Could go: band. Strong enough to close a page.' },
			],
		},
		{
			name: 'Oxide and copper',
			looks: [
				{ preset: 'oxide-bloom', name: 'Oxide bloom', note: 'Could go: band. The warmest of the oxide looks.' },
				{ preset: 'oxide-ink', name: 'Oxide ink', note: 'Could go: card cover.' },
				{ preset: 'copper-sweep', name: 'Copper sweep', note: 'Could go: card cover.' },
			],
		},
	];
</script>

<svelte:head>
	<title>Materials — Reference</title>
</svelte:head>

<main class="flex flex-col">
	<Container class="flex flex-col gap-16 py-16 md:py-24">
		<PageIntro>
			{#snippet title()}Materials{/snippet}
			{#snippet lede()}Four candidates. Each band uses the same heading, sentence and button. Only the material changes. Dark and light are shown side by side.{/snippet}
		</PageIntro>

		{#each families as family (family.name)}
			<section class="flex flex-col gap-12 border-t pt-10">
				<h2 class="text-2xl font-medium tracking-tight">{family.name}</h2>

				{#each family.looks as look (look.preset)}
					<figure class="flex flex-col gap-4">
						<figcaption class="flex flex-col gap-1">
							<span class="font-medium">
								{look.name}
								<span class="ml-2 font-mono text-xs font-normal text-muted-foreground">{look.preset}</span>
							</span>
							<span class="text-sm text-muted-foreground">{look.note}</span>
						</figcaption>

						<div class="grid gap-6 lg:grid-cols-2">
							<div class="flex flex-col gap-2">
								<span class="text-sm text-muted-foreground">Dark</span>
								<div class="overflow-hidden rounded-xl border">
									<MaterialBand preset={look.preset} mode="dark" />
								</div>
							</div>
							<div class="flex flex-col gap-2">
								<span class="text-sm text-muted-foreground">Light</span>
								<div class="overflow-hidden rounded-xl border">
									<MaterialBand preset={look.preset} mode="light" />
								</div>
							</div>
						</div>
					</figure>
				{/each}
			</section>
		{/each}
	</Container>
</main>
