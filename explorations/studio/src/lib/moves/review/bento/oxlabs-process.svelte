<script lang="ts">
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import { cn } from '$brand/utils.js';
	import { Button } from '$brand/ui/button/index.js';
	import Container from '$brand/blocks/site/container.svelte';
	import SectionHead from './section-head.svelte';
	import StepCards from './step-cards.svelte';
	import PlaybookGrid from './playbook-grid.svelte';
	import { kicker, subtitle } from './ui';

	let { here = '#', class: className }: { here?: string; class?: string } = $props();
</script>

<section data-slot="oxlabs-process" class={cn('py-24 sm:py-32', className)}>
	<Container size="wide">
		<SectionHead kicker="How we work" title="From the first call to the store review." lede="Three steps, and the same people the whole way through. Point at the first card to pick what you need.">
			{#snippet aside()}
				<Button href={here} size="lg">Start a project<ArrowRight class="lucide" data-icon="inline-end" /></Button>
			{/snippet}
		</SectionHead>
		<StepCards class="mt-12 md:mt-16" />

		<div class="mt-28 grid gap-6 md:mt-36 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:items-end lg:gap-12">
			<div>
				<p class={kicker}>Starting points</p>
				<h3 class={cn(subtitle, 'mt-4')}>Pick the project closest to yours.</h3>
			</div>
			<p class="max-w-[46ch] text-lg leading-snug text-foreground lg:justify-self-end">Each one names the stack we reach for first. Filter by where it runs.</p>
		</div>
		<PlaybookGrid {here} class="mt-10" />
	</Container>
</section>
