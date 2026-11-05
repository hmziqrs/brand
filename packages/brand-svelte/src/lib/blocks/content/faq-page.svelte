<!-- A product's FAQ on one page: the title and lede beside a search that narrows the questions and opens what
     matches, the topics as sticky contents on the left and each topic's numbered questions on the right with their
     full rich answers, then a card to ask on GitHub. -->
<script lang="ts">
	import { scrollSpy } from '@hmziq/brand-core/scroll-spy';
	import { inPage } from '@hmziq/brand-core/rich-blocks';
	import { faqCount, faqMatches, faqNeedle, faqNumber, faqTopics, type FaqPageData } from '@hmziq/brand-core/faq-search';
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
	import { siGithub } from 'simple-icons';
	import { cn } from '$brand/utils.js';
	import Container from '$brand/blocks/site/container.svelte';
	import ButtonLink from '$brand/blocks/site/button-link.svelte';
	import SearchBox from '$brand/blocks/site/search-box.svelte';
	import EmptyNote from '$brand/blocks/site/empty-note.svelte';
	import Questions from '$brand/components/questions.svelte';
	import Question from '$brand/components/question.svelte';
	import Toc from '$brand/components/toc.svelte';
	import BrandIcon from '$brand/components/brand-icon.svelte';
	import RichText from './rich-text.svelte';
	import RichBlocks from './rich-blocks.svelte';

	let { data, class: className }: { data: FaqPageData; class?: string } = $props();

	let query = $state('');
	let current = $state<string>();
	const top = 96;

	const intro = $derived(data.intro);
	const entries = $derived(data.entries);
	const needle = $derived(faqNeedle(query));
	const shown = $derived(faqMatches(entries, query));
	const topics = $derived(faqTopics(shown));

	$effect(() => {
		const list = topics.map((t) => t.id);
		current = list[0];
		return scrollSpy(list, (id) => (current = id));
	});
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
<div data-slot="faq-page" class={cn('pt-14 pb-24 md:pt-20 md:pb-32', className)} onclick={(e) => inPage(e, top)}>
	<Container size="wide">
		<p class="font-mono text-xs tracking-[0.14em] text-primary uppercase">{intro.kicker} · Reviewed <time datetime={intro.reviewed}>{intro.reviewed}</time></p>
		<h1 class="mt-6 max-w-[14ch] text-[clamp(3rem,7.4vw,6.75rem)] leading-[0.94] font-semibold tracking-[-0.05em] text-foreground">{intro.title[0]}<span class="text-primary">{intro.title[1]}</span></h1>
		<div class="mt-8 flex flex-wrap items-end justify-between gap-x-12 gap-y-8">
			<p class="max-w-[38rem] text-[clamp(1.125rem,1.6vw,1.375rem)] leading-snug text-pretty text-foreground"><RichText text={intro.lede} /></p>
			<div class="flex w-full max-w-[26rem] flex-col gap-2">
				<SearchBox label="Search questions" value={query} onChange={(v) => (query = v)} class="h-11" />
				<p class="font-mono text-[11px] tracking-[0.08em] text-foreground/70" aria-live="polite">{faqCount(entries, shown.length, query)}</p>
			</div>
		</div>
	</Container>

	<Container size="wide" class="mt-16 md:mt-20">
		<div class="grid gap-12 lg:grid-cols-[13rem_minmax(0,1fr)] xl:gap-16">
			<aside aria-label="Topics" class="sticky top-[calc(var(--pages-top,0px)+2rem)] hidden self-start text-[0.875rem] lg:block">
				<p class="mb-3 font-mono text-[11px] tracking-[0.14em] text-foreground/70 uppercase">Topics</p>
				<Toc items={topics.map((t) => ({ id: t.id, label: t.topic }))} {current} />
			</aside>

			<div class="flex min-w-0 flex-col gap-14">
				{#each topics as t (t.id)}
					<section id={t.id} aria-labelledby={`${t.id}-h`} class="scroll-mt-28">
						<h2 id={`${t.id}-h`} class="flex items-baseline gap-3 border-b border-border pb-3 font-mono text-xs tracking-[0.14em] text-primary uppercase">{t.topic}<span class="text-foreground/60">{t.items.length}</span></h2>
						<Questions class="max-w-none">
							{#each t.items as e (e.id)}
								<Question id={e.id} number={faqNumber(entries, e.id)} open={!!needle || e.id === entries[0].id} class="scroll-mt-28 [&>div]:max-w-[46rem] max-sm:[&>div]:pr-0 max-sm:[&>div]:pl-0">
									{#snippet question()}<span class="text-[1.125rem] leading-snug text-foreground">{e.q}</span>{/snippet}
									<RichBlocks blocks={e.blocks} class="pt-1" />
								</Question>
							{/each}
						</Questions>
					</section>
				{:else}
					<EmptyNote>No questions match “{query.trim()}”. Try another word.</EmptyNote>
				{/each}

				<div class="flex flex-wrap items-center justify-between gap-x-10 gap-y-6 rounded-2xl p-6 ring-1 ring-foreground/10 sm:p-10">
					<div class="max-w-[34rem]">
						<h2 class="text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.05] font-medium tracking-[-0.035em] text-foreground">{intro.close.title}</h2>
						<p class="mt-3 text-lg leading-snug text-foreground/85">{intro.close.line}</p>
					</div>
					<div class="flex flex-wrap gap-3">
						<ButtonLink href={intro.close.primary.href} size="lg" class="px-5" target="_blank" rel="noreferrer"><BrandIcon icon={siGithub} data-icon="inline-start" />{intro.close.primary.label}<ArrowUpRight class="lucide" data-icon="inline-end" /></ButtonLink>
						<ButtonLink href={intro.close.secondary.href} size="lg" variant="outline" class="px-5">{intro.close.secondary.label}</ButtonLink>
					</div>
				</div>
			</div>
		</div>
	</Container>
</div>
