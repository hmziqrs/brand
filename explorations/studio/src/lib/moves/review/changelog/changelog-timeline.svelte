<script lang="ts">
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
	import Container from '$brand/blocks/site/container.svelte';
	import PageIntro from '$brand/blocks/site/page-intro.svelte';
	import BigNumbers from '$brand/blocks/site/big-numbers.svelte';
	import ButtonLink from '$brand/blocks/site/button-link.svelte';
	import { cn } from '$brand/utils.js';
	import ReleaseHead from './release-head.svelte';
	import ReleaseNotes from './release-notes.svelte';
	import ReleaseFilters from './release-filters.svelte';
	import ReleasePicture from './release-picture.svelte';
	import LatestLine from './latest-line.svelte';
	import { narrow } from './parts';
	import type { Changelog } from './content';

	let { content, here = '#', class: className }: { content: Changelog; here?: string; class?: string } = $props();

	let kind = $state('All');
	let query = $state('');
	let spot = $state<string | null>(null);
	let opened = $state<Record<string, boolean>>({});

	const latest = $derived(content.releases[0]);
	const list = $derived(content.filters ? narrow(content.releases, kind, query) : content.releases);
	const searching = $derived(query.trim().length > 0);
	const full = (v: string) => content.releases.find((r) => r.v === v);
	const folds = $derived(searching ? [] : list.slice(content.open));
	const allOpen = $derived(folds.length > 0 && folds.every((r) => opened[r.v]));
	const titleParts = $derived.by(() => {
		const at = content.accent ? content.title.indexOf(content.accent) : -1;
		return at < 0 || !content.accent ? [content.title, '', ''] : [content.title.slice(0, at), content.accent, content.title.slice(at + content.accent.length)];
	});

	let ol: HTMLOListElement | undefined = $state();
	let rail = $state({ top: 0, height: 0, fill: 0 });
	let passed = $state(0);

	$effect(() => {
		if (!ol) return;
		const el = ol;
		let raf = 0;
		const measure = () => {
			raf = 0;
			const nodes = [...el.querySelectorAll<HTMLElement>('[data-node]')];
			if (!nodes.length) return;
			const box = el.getBoundingClientRect();
			const ys = nodes.map((n) => {
				const r = n.getBoundingClientRect();
				return r.top + r.height / 2 - box.top;
			});
			const first = ys[0];
			const last = ys[ys.length - 1];
			const line = window.innerHeight * 0.45 - box.top;
			rail = { top: first, height: Math.max(0, last - first), fill: Math.max(0, Math.min(last - first, line - first)) };
			passed = ys.filter((y) => y <= line).length;
		};
		const kick = () => {
			if (!raf) raf = requestAnimationFrame(measure);
		};
		const ro = new ResizeObserver(kick);
		ro.observe(el);
		window.addEventListener('scroll', kick, { passive: true });
		window.addEventListener('resize', kick);
		kick();
		return () => {
			cancelAnimationFrame(raf);
			ro.disconnect();
			window.removeEventListener('scroll', kick);
			window.removeEventListener('resize', kick);
		};
	});
</script>

<div data-slot="changelog-timeline" class={cn('pt-14 pb-24 md:pt-20 md:pb-32', className)}>
	<Container size="wide">
		<PageIntro class="max-w-3xl">
			{#snippet kicker()}{#if latest}<LatestLine release={latest} />{/if}{/snippet}
			{#snippet title()}{titleParts[0]}{#if titleParts[1]}<span class="text-primary">{titleParts[1]}</span>{/if}{titleParts[2]}{/snippet}
			{#snippet lede()}<span class="text-foreground/90">{content.lede}</span>{/snippet}
		</PageIntro>
		{#if content.numbers}<BigNumbers items={content.numbers} class="mt-14 md:mt-20" />{/if}
		{#if content.filters}
			<ReleaseFilters releases={content.releases} bind:kind bind:query folds={folds.length} open={allOpen} onOpen={(v) => folds.forEach((r) => (opened[r.v] = v))} class="mt-14 md:mt-16" />
		{/if}
	</Container>

	<Container size="wide" class={content.filters ? 'mt-12' : 'mt-14 md:mt-20'}>
		<ol bind:this={ol} class="relative">
			<span aria-hidden="true" class="absolute left-[calc(0.40625rem-0.5px)] w-px bg-border" style:top="{rail.top}px" style:height="{rail.height}px"></span>
			<span aria-hidden="true" class="absolute left-[calc(0.40625rem-0.5px)] w-px bg-primary" style:top="{rail.top}px" style:height="{rail.fill}px"></span>
			{#each list as r, i (r.v)}
				{@const top = r.v === latest?.v}
				{@const folded = !searching && i >= content.open}
				{@const pic = folded ? undefined : content.pictures[r.v]}
				<li class="relative pb-16 pl-9 last:pb-0 md:pb-20 md:pl-12">
					<span
						data-node
						aria-hidden="true"
						class={cn('absolute top-[0.42rem] left-0 z-10 size-3.25 rounded-full border bg-background transition-colors duration-200 motion-reduce:transition-none', i < passed || top ? 'border-primary' : 'border-foreground/35', top && 'bg-primary')}
					></span>
					<div class={cn(pic && 'grid items-start gap-x-14 gap-y-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)]')}>
						<div class="min-w-0">
							<ReleaseHead release={r} level={top ? 2 : 3} />
							{#if r.title}<p class="mt-3 text-[1.375rem] leading-snug font-medium tracking-[-0.02em] text-balance text-foreground md:text-[1.625rem]">{r.title}</p>{/if}
							<ReleaseNotes release={r} full={full(r.v)} spots={content.spots} bind:spot fold={folded} bind:open={opened[r.v]} />
						</div>
						{#if pic}
							<ReleasePicture tag={pic.tag} caption={pic.caption} drawing={pic.drawing} class="lg:sticky lg:top-24">
								<pic.sketch bind:spot />
							</ReleasePicture>
						{/if}
					</div>
				</li>
			{/each}
		</ol>
		{#if !list.length}
			<p class="text-lg text-foreground">No change matches “{query}”{kind !== 'All' ? ` in ${kind}` : ''}.</p>
		{/if}

		{#if content.more}
			<div class="mt-16 flex flex-wrap gap-3 pl-9 md:mt-20 md:pl-12">
				<ButtonLink href={content.more.primary.href} size="lg" target="_blank" rel="noopener">{content.more.primary.label}<ArrowUpRight class="lucide" /></ButtonLink>
				{#if content.more.secondary}<ButtonLink href={here} size="lg" variant="outline">{content.more.secondary.label}</ButtonLink>{/if}
			</div>
		{/if}
	</Container>
</div>
