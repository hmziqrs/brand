<script lang="ts">
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
	import { siGithub } from 'simple-icons';
	import { cn } from '$brand/utils.js';
	import { scrollSpy, slug } from '@hmziq/brand-core/scroll-spy';
	import Container from '$brand/blocks/site/container.svelte';
	import ButtonLink from '$brand/blocks/site/button-link.svelte';
	import { Button } from '$brand/ui/button/index.js';
	import LineTabs from '$brand/components/line-tabs.svelte';
	import Toc from '$brand/components/toc.svelte';
	import BrandIcon from '$brand/components/brand-icon.svelte';
	import LegalSection from '$brand/blocks/content/legal-section.svelte';
	import RichBlocks from './rich-blocks.svelte';
	import { inPage } from './rich';
	import { legalPages, type LegalPage } from './legal-data';

	let { class: className }: { here?: string; class?: string } = $props();

	let value = $state<string>('privacy');
	let current = $state<string>();
	const top = 96;

	const page = $derived(legalPages.find((p) => p.id === value) ?? legalPages[0]);
	const ids = (p: LegalPage) => p.sections.map((s) => ({ id: `${p.id}-${slug(s.title)}`, label: s.title }));

	$effect(() => {
		const list = ids(page).map((i) => i.id);
		current = list[0];
		return scrollSpy(list, (id) => (current = id));
	});

	function swap(id: string) {
		value = id;
		const tabs = document.querySelector('[data-slot="legal-page"]');
		if (tabs) window.scrollTo({ top: tabs.getBoundingClientRect().top + window.scrollY - 80, behavior: 'auto' });
	}
</script>

{#snippet doc(p: LegalPage)}
	<div class="pt-8 md:pt-12">
		<p class="font-mono text-xs tracking-[0.14em] text-primary uppercase">Legal · Last updated <time datetime={p.updated}>{p.updated}</time></p>
		<h1 class="mt-6 text-[clamp(3rem,7.4vw,6.75rem)] leading-[0.94] font-semibold tracking-[-0.05em] text-foreground">{p.title[0]}<span class="text-primary">{p.title[1]}</span></h1>
		<p class="mt-8 max-w-[40rem] text-[clamp(1.125rem,1.6vw,1.375rem)] leading-snug text-pretty text-foreground">{p.short}</p>
	</div>

	<div class="mt-16 grid gap-12 md:mt-20 lg:grid-cols-[13rem_minmax(0,46rem)] xl:grid-cols-[12rem_minmax(0,46rem)_minmax(13rem,1fr)] xl:gap-14">
		<aside aria-label="Contents" class="sticky top-[calc(var(--pages-top,0px)+2rem)] hidden self-start text-[0.875rem] lg:block">
			<p class="mb-3 font-mono text-[11px] tracking-[0.14em] text-foreground/70 uppercase">Contents</p>
			<Toc items={ids(p)} {current} numbered />
		</aside>

		<article class="flex min-w-0 flex-col gap-10">
			{#each p.sections as s, i (s.id)}
				<LegalSection n={i + 1} title={s.title} prefix={p.id} class="scroll-mt-28 [&>h2]:text-[1.5rem]! [&>h2]:font-medium [&>h2]:tracking-[-0.02em] [&>h2]:text-foreground">
					<RichBlocks blocks={s.blocks} class="text-[1.0625rem]" />
				</LegalSection>
			{/each}
		</article>

		<aside aria-label="Questions" class="flex min-w-0 flex-col gap-5 self-start border-t border-border pt-8 lg:col-start-2 xl:sticky xl:top-[calc(var(--pages-top,0px)+2rem)] xl:col-start-auto xl:border-t-0 xl:pt-0">
			<p class="font-mono text-[11px] tracking-[0.14em] text-foreground/70 uppercase">Questions</p>
			<p class="text-base leading-snug text-foreground">{p.ask}</p>
			<div class="flex flex-wrap gap-2.5 xl:flex-col xl:items-start">
				<ButtonLink href={p.close.href} target="_blank" rel="noreferrer"><BrandIcon icon={siGithub} data-icon="inline-start" />{p.close.label}</ButtonLink>
				<Button variant="outline" onclick={() => swap(p.id === 'privacy' ? 'terms' : 'privacy')}>{p.other}</Button>
			</div>
			<a href={p.history} target="_blank" rel="noreferrer" class="text-sm text-foreground/75 hover:text-foreground hover:underline">Every change is in the GitHub history<ArrowUpRight class="lucide ml-1 inline size-3.5 align-[-2px]" /></a>
		</aside>
	</div>
{/snippet}

{#snippet privacyDoc()}{@render doc(legalPages[0])}{/snippet}
{#snippet termsDoc()}{@render doc(legalPages[1])}{/snippet}

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
<div data-slot="legal-page" class={cn('pt-10 pb-24 md:pt-14 md:pb-32', className)} onclick={(e) => inPage(e, top)}>
	<Container size="wide">
		<LineTabs
			label="Legal documents"
			bind:value
			tabs={[
				{ value: 'privacy', label: legalPages[0].tab, content: privacyDoc },
				{ value: 'terms', label: legalPages[1].tab, content: termsDoc }
			]}
		/>
	</Container>
</div>
