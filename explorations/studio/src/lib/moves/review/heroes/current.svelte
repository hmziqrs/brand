<script lang="ts">
	import Rings from '$brand/components/rings.svelte';
	import ButtonLink from '$brand/blocks/site/button-link.svelte';
	import Hero from '$brand/blocks/site/hero.svelte';
	import HeroNote from '$brand/blocks/site/hero-note.svelte';
</script>

<div class="py-16">
	<Hero>
		{#snippet title()}Free Rust tools, finished before they ship.{/snippet}
		{#snippet lede()}Open-source software made by one person. I build the tools I wish existed, test them properly, and give them away.{/snippet}
		{#snippet actions()}
			<ButtonLink href="#" size="lg" class="px-5">Browse the projects</ButtonLink>
			<ButtonLink href="#" size="lg" variant="outline" class="px-5">View on GitHub</ButtonLink>
		{/snippet}
		{#snippet note()}<HeroNote>Free and open source. MIT or Apache-2.0.</HeroNote>{/snippet}
		{#snippet aside()}
			<div class="hidden md:block">
				<Rings seed="freeoxide" />
			</div>
		{/snippet}
	</Hero>
</div>
