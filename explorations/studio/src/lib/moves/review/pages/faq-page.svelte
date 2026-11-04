<script lang="ts">
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
	import { siGithub } from 'simple-icons';
	import { cn } from '$brand/utils.js';
	import { scrollSpy, slug } from '@hmziq/brand-core/scroll-spy';
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
	import { blockWords, inPage } from './rich';
	import { faqEntries, faqIntro } from './faq-data';

	let { class: className }: { here?: string; class?: string } = $props();

	let query = $state('');
	let current = $state<string>();
	const top = 96;

	const words = faqEntries.map((e) => `${e.q} ${e.topic} ${blockWords(e.blocks)}`.toLowerCase());
	const needle = $derived(query.trim().toLowerCase());
	const shown = $derived(faqEntries.filter((_, i) => !needle || words[i].includes(needle)));
	const topics = $derived([...new Set(shown.map((e) => e.topic))].map((t) => ({ topic: t, id: `faq-${slug(t)}`, items: shown.filter((e) => e.topic === t) })));
	const number = (id: string) => faqEntries.findIndex((e) => e.id === id) + 1;

	$effect(() => {
		const list = topics.map((t) => t.id);
		current = list[0];
		return scrollSpy(list, (id) => (current = id));
	});
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
<div data-slot="faq-page" class={cn('pt-14 pb-24 md:pt-20 md:pb-32', className)} onclick={(e) => inPage(e, top)}>
	<Container size="wide">
		<p class="font-mono text-xs tracking-[0.14em] text-primary uppercase">{faqIntro.kicker} · Reviewed <time datetime={faqIntro.reviewed}>{faqIntro.reviewed}</time></p>
		<h1 class="mt-6 max-w-[14ch] text-[clamp(3rem,7.4vw,6.75rem)] leading-[0.94] font-semibold tracking-[-0.05em] text-foreground">{faqIntro.title[0]}<span class="text-primary">{faqIntro.title[1]}</span></h1>
		<div class="mt-8 flex flex-wrap items-end justify-between gap-x-12 gap-y-8">
			<p class="max-w-[38rem] text-[clamp(1.125rem,1.6vw,1.375rem)] leading-snug text-pretty text-foreground"><RichText text={faqIntro.lede} /></p>
			<div class="flex w-full max-w-[26rem] flex-col gap-2">
				<SearchBox label="Search questions" value={query} onChange={(v) => (query = v)} class="h-11" />
				<p class="font-mono text-[11px] tracking-[0.08em] text-foreground/70" aria-live="polite">{needle ? `${shown.length} of ${faqEntries.length} questions` : `${faqEntries.length} questions · ${new Set(faqEntries.map((e) => e.topic)).size} topics`}</p>
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
								<Question id={e.id} number={number(e.id)} open={!!needle || e.id === faqEntries[0].id} class="scroll-mt-28 [&>div]:max-w-[46rem] max-sm:[&>div]:pr-0 max-sm:[&>div]:pl-0">
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
						<h2 class="text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.05] font-medium tracking-[-0.035em] text-foreground">{faqIntro.close.title}</h2>
						<p class="mt-3 text-lg leading-snug text-foreground/85">{faqIntro.close.line}</p>
					</div>
					<div class="flex flex-wrap gap-3">
						<ButtonLink href={faqIntro.close.primary.href} size="lg" class="px-5" target="_blank" rel="noreferrer"><BrandIcon icon={siGithub} data-icon="inline-start" />{faqIntro.close.primary.label}<ArrowUpRight class="lucide" data-icon="inline-end" /></ButtonLink>
						<ButtonLink href={faqIntro.close.secondary.href} size="lg" variant="outline" class="px-5">{faqIntro.close.secondary.label}</ButtonLink>
					</div>
				</div>
			</div>
		</div>
	</Container>
</div>
