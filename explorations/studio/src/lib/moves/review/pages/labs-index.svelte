<script lang="ts">
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
	import { siGithub } from 'simple-icons';
	import { cn } from '$brand/utils.js';
	import Container from '$brand/blocks/site/container.svelte';
	import ButtonLink from '$brand/blocks/site/button-link.svelte';
	import BrandIcon from '$brand/components/brand-icon.svelte';
	import StatTile from '$brand/components/stat-tile.svelte';
	import PictureGrid from '$brand/components/picture-grid.svelte';
	import { labs } from '$moves/review/footers/sites';
	import { labsEntries, labsLive, labsStats } from './labs-data';

	let { class: className }: { here?: string; class?: string } = $props();

	const month = (iso: string) => new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });
	const items = labsEntries.map((e) => ({
		title: e.title,
		dek: e.line,
		tag: e.stack,
		art: e.art,
		href: e.href,
		group: e.kind,
		meta: [`${e.stars} ${e.stars === 1 ? 'star' : 'stars'}`, e.forks ? `${e.forks} ${e.forks === 1 ? 'fork' : 'forks'}` : '', `updated ${month(e.updated)}`].filter(Boolean).join(' · ')
	}));
	const kinds = ['Experiments', 'Games', 'Tools'] as const;
</script>

<div data-slot="labs-index" class={cn('pt-14 pb-24 md:pt-20 md:pb-32', className)}>
	<Container size="wide" class="grid items-end gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
		<div class="min-w-0">
			<p class="font-mono text-xs tracking-[0.14em] text-primary uppercase">hmziq labs · {labs.aside}</p>
			<h1 class="mt-6 text-[clamp(3rem,7.4vw,6.75rem)] leading-[0.94] font-semibold tracking-[-0.05em] text-balance text-foreground">Small things, <span class="text-primary">built to learn.</span></h1>
			<p class="mt-8 max-w-[38rem] text-[clamp(1.125rem,1.6vw,1.375rem)] leading-snug text-pretty text-foreground">{labs.page.lede}</p>
			<div class="mt-10 flex flex-wrap gap-3">
				<ButtonLink href={labsLive.github} size="lg" class="px-5" target="_blank" rel="noreferrer"><BrandIcon icon={siGithub} data-icon="inline-start" />View on GitHub<ArrowUpRight class="lucide" data-icon="inline-end" /></ButtonLink>
			</div>
		</div>
		<ul class="grid min-w-0 grid-cols-2 gap-4" aria-label="Lab activity">
			{#each labsStats as s, i (s.label)}
				<li class={cn('flex min-w-0', i === 0 && 'col-span-2')}><StatTile value={s.value} label={s.label} tone={i === 0 ? 'oxide' : 'outline'} rings={i === 0 ? 'hmziq labs' : undefined} class="w-full" /></li>
			{/each}
		</ul>
	</Container>

	<Container size="wide" class="mt-24 md:mt-32">
		<div class="flex flex-wrap items-end justify-between gap-x-10 gap-y-4 border-t border-border pt-10">
			<h2 class="text-[clamp(2.25rem,4.4vw,3.75rem)] leading-[0.98] font-semibold tracking-[-0.045em] text-foreground">Experiments</h2>
			<p class="max-w-[36rem] text-lg leading-snug text-foreground/85">{labsEntries.length} repositories: {kinds.map((k) => `${labsEntries.filter((e) => e.kind === k).length} ${k.toLowerCase()}`).join(', ')}. {labsLive.updated}.</p>
		</div>
		<PictureGrid items={items} filter="What it is" class="mt-10" />
	</Container>
</div>
