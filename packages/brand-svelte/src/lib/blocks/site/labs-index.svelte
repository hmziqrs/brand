<!-- A labs page: the title and lede beside the GitHub numbers as stat tiles (the first in solid oxide), then the
     repositories as picture cards with line drawings, filtered by kind, each with its stack, its line, its stars,
     forks and last update. -->
<script lang="ts">
	import { labItems, labsLine, type LabsIndexData } from '@hmziq/brand-core/labs-index';
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
	import { siGithub } from 'simple-icons';
	import { cn } from '$brand/utils.js';
	import Container from '$brand/blocks/site/container.svelte';
	import ButtonLink from '$brand/blocks/site/button-link.svelte';
	import BrandIcon from '$brand/components/brand-icon.svelte';
	import StatTile from '$brand/components/stat-tile.svelte';
	import PictureGrid from '$brand/components/picture-grid.svelte';

	let { data, class: className }: { data: LabsIndexData; class?: string } = $props();

	const items = $derived(labItems(data.entries));
</script>

<div data-slot="labs-index" class={cn('pt-14 pb-24 md:pt-20 md:pb-32', className)}>
	<Container size="wide" class="grid items-end gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
		<div class="min-w-0">
			<p class="font-mono text-xs tracking-[0.14em] text-primary uppercase">{data.kicker}</p>
			<h1 class="mt-6 text-[clamp(3rem,7.4vw,6.75rem)] leading-[0.94] font-semibold tracking-[-0.05em] text-balance text-foreground">{data.title[0]}<span class="text-primary">{data.title[1]}</span></h1>
			<p class="mt-8 max-w-[38rem] text-[clamp(1.125rem,1.6vw,1.375rem)] leading-snug text-pretty text-foreground">{data.lede}</p>
			<div class="mt-10 flex flex-wrap gap-3">
				<ButtonLink href={data.github} size="lg" class="px-5" target="_blank" rel="noreferrer"><BrandIcon icon={siGithub} data-icon="inline-start" />View on GitHub<ArrowUpRight class="lucide" data-icon="inline-end" /></ButtonLink>
			</div>
		</div>
		<ul class="grid min-w-0 grid-cols-2 gap-4" aria-label="Lab activity">
			{#each data.stats as s, i (s.label)}
				<li class={cn('flex min-w-0', i === 0 && 'col-span-2')}><StatTile value={s.value} label={s.label} tone={i === 0 ? 'oxide' : 'outline'} rings={i === 0 ? data.seed : undefined} class="w-full" /></li>
			{/each}
		</ul>
	</Container>

	<Container size="wide" class="mt-24 md:mt-32">
		<div class="flex flex-wrap items-end justify-between gap-x-10 gap-y-4 border-t border-border pt-10">
			<h2 class="text-[clamp(2.25rem,4.4vw,3.75rem)] leading-[0.98] font-semibold tracking-[-0.045em] text-foreground">{data.heading}</h2>
			<p class="max-w-[36rem] text-lg leading-snug text-foreground/85">{labsLine(data.entries, data.kinds, data.updated)}</p>
		</div>
		<PictureGrid items={items} filter="What it is" class="mt-10" />
	</Container>
</div>
