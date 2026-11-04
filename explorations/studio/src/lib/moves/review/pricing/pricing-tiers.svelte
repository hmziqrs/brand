<script lang="ts">
	import { cn } from '$brand/utils.js';
	import Tag from '$brand/components/tag.svelte';
	import Segmented from '$brand/components/segmented.svelte';
	import Container from '$brand/blocks/site/container.svelte';
	import DotField from './dot-field.svelte';
	import TierCard from './tier-card.svelte';
	import CompareTable from './compare-table.svelte';
	import FaqBlock from './faq-block.svelte';
	import type { Pricing } from './content';

	let { content, here = '#', class: className }: { content: Pricing; here?: string; class?: string } = $props();

	let period = $state('0');
	const alt = $derived(period === '1');
	const hero = $derived(content.hero);
	const lead = $derived(hero.title.slice(0, hero.title.indexOf(hero.accent)));
</script>

<div data-slot="pricing-tiers" class={cn('pb-24 md:pb-32', className)}>
	<section class="relative isolate overflow-hidden pb-16 md:pb-24">
		<DotField />
		<Container size="wide" class="pt-16 md:pt-24">
			<div class="mx-auto flex max-w-[64rem] flex-col items-center text-center">
				<p class="font-mono text-xs tracking-[0.14em] text-primary uppercase">{hero.kicker}</p>
				<h1 class="mt-6 text-[clamp(2.9rem,7.2vw,6.5rem)] leading-[0.95] font-semibold tracking-[-0.045em] text-balance text-foreground">{lead}<span class="text-primary">{hero.accent}</span></h1>
				<p class="mt-7 max-w-[42rem] text-[clamp(1.125rem,1.6vw,1.375rem)] leading-snug text-pretty text-foreground">{hero.lede}</p>
				<Segmented
					label={content.billing.label}
					class="mt-10 bg-background"
					value={period}
					onValueChange={(v) => (period = v)}
					options={content.billing.options.map((label, i) => ({ value: String(i), label }))}
				/>
				<p class="mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-foreground/80"><Tag tone="yellow">Examples</Tag>{content.example}</p>
			</div>
			<div class={cn('mt-12 grid gap-4 sm:grid-cols-2', content.tiers.length > 3 ? 'xl:grid-cols-4' : 'lg:grid-cols-3')}>
				{#each content.tiers as t (t.name)}
					<TierCard tier={t} {alt} href={here} />
				{/each}
			</div>
		</Container>
	</section>

	<Container size="wide" class="mt-8 md:mt-16">
		<CompareTable {content} {alt} href={here} />
	</Container>

	<Container size="wide" class="mt-24 md:mt-32">
		<FaqBlock faq={content.faq} />
	</Container>
</div>
