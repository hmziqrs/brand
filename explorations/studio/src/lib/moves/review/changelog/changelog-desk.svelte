<script lang="ts">
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
	import ProductHero from '$brand/blocks/sections/product-hero.svelte';
	import MaterialWash from '$brand/components/material-wash.svelte';
	import Container from '$brand/blocks/site/container.svelte';
	import BigNumbers from '$brand/blocks/site/big-numbers.svelte';
	import ButtonLink from '$brand/blocks/site/button-link.svelte';
	import { cn } from '$brand/utils.js';
	import ReleaseWindow from './release-window.svelte';
	import ReleaseHead from './release-head.svelte';
	import ReleaseNotes from './release-notes.svelte';
	import ReleaseFilters from './release-filters.svelte';
	import LatestLine from './latest-line.svelte';
	import { narrow, type Spots } from './parts';
	import type { Changelog } from './content';

	let { content, here = '#', class: className }: { content: Changelog; here?: string; class?: string } = $props();

	let kind = $state('All');
	let query = $state('');
	let spot = $state<string | null>(null);
	let opened = $state<Record<string, boolean>>({});

	const latest = $derived(content.releases[0]);
	const list = $derived(content.filters ? narrow(content.releases, kind, query) : content.releases);
	const searching = $derived(query.trim().length > 0);
	const spots = $derived<Spots>(latest && content.spots[latest.v] ? { [latest.v]: content.spots[latest.v] } : {});
	const full = (v: string) => content.releases.find((r) => r.v === v);
	const folds = $derived(searching ? [] : list.slice(content.open));
	const allOpen = $derived(folds.length > 0 && folds.every((r) => opened[r.v]));
</script>

<div data-slot="changelog-desk" class={cn('pb-24 md:pb-32', className)}>
	<ProductHero title={content.title} accent={content.accent} lede={content.lede}>
		{#snippet eyebrow()}{#if latest}<p class="text-[0.8125rem] text-muted-foreground"><LatestLine release={latest} /></p>{/if}{/snippet}
		{#snippet stage()}<MaterialWash preset={content.preset} />{/snippet}
		{#snippet visual()}
			<ReleaseWindow title={content.window.title} drag bounds="[data-slot=product-hero]" class="lg:ml-auto lg:max-w-[40rem]">
				<content.window.sketch bind:spot />
			</ReleaseWindow>
		{/snippet}
	</ProductHero>

	<Container size="wide" class="mt-14 md:mt-20">
		{#if content.numbers}<BigNumbers items={content.numbers} class="mb-16 md:mb-20" />{/if}
		{#if content.filters}
			<ReleaseFilters releases={content.releases} bind:kind bind:query folds={folds.length} open={allOpen} onOpen={(v) => folds.forEach((r) => (opened[r.v] = v))} />
		{/if}

		<ol class={cn(content.filters ? 'mt-8' : 'mt-0')}>
			{#each list as r, i (r.v)}
				{@const top = r.v === latest?.v}
				{@const folded = !searching && i >= content.open}
				<li class={cn('grid gap-x-12 gap-y-4 border-t border-border md:grid-cols-[13rem_minmax(0,1fr)] lg:grid-cols-[15rem_minmax(0,1fr)]', folded && !opened[r.v] ? 'pt-6 pb-8' : 'pt-8 pb-12 md:pb-16')}>
					<div class="md:sticky md:top-24 md:self-start">
						{#if top}<p class="mb-2 text-[0.8125rem] font-medium text-primary">Latest release</p>{/if}
						<ReleaseHead release={r} level={top ? 2 : 3} class="md:flex-col md:items-start md:gap-2" />
					</div>
					<div class="min-w-0">
						{#if r.title}<p class="text-[1.375rem] leading-snug font-medium tracking-[-0.02em] text-balance text-foreground md:text-[1.625rem]">{r.title}</p>{/if}
						<ReleaseNotes release={r} full={full(r.v)} {spots} bind:spot fold={folded} bind:open={opened[r.v]} class={r.title ? undefined : 'mt-0'} />
					</div>
				</li>
			{/each}
		</ol>
		{#if !list.length}
			<p class="border-t border-border pt-8 text-lg text-foreground">No change matches “{query}”{kind !== 'All' ? ` in ${kind}` : ''}.</p>
		{/if}

		{#if content.more}
			<div class="flex flex-wrap gap-3 border-t border-border pt-10">
				<ButtonLink href={content.more.primary.href} size="lg" target="_blank" rel="noopener">{content.more.primary.label}<ArrowUpRight class="lucide" /></ButtonLink>
				{#if content.more.secondary}<ButtonLink href={here} size="lg" variant="outline">{content.more.secondary.label}</ButtonLink>{/if}
			</div>
		{/if}
	</Container>
</div>
