<script lang="ts">
	import { tick } from 'svelte';
	import PanelLeft from '@lucide/svelte/icons/panel-left';
	import ChevronLeft from '@lucide/svelte/icons/chevron-left';
	import ChevronRight from '@lucide/svelte/icons/chevron-right';
	import { cn } from '$brand/utils.js';
	import Container from '$brand/blocks/site/container.svelte';
	import PostContents from '$brand/blocks/content/post-contents.svelte';
	import DocsMenu from './docs-menu.svelte';
	import DocsHead from './docs-head.svelte';
	import DocsProse from './docs-prose.svelte';
	import DocsBlocks from './docs-blocks.svelte';
	import DocsFoot from './docs-foot.svelte';
	import DocsFind from './docs-find.svelte';
	import { follow, headings, jump, linker, neighbours, sections, type DocsSite } from './content';

	let { site, here, prefix, offset = 0 }: { site: DocsSite; here: string; prefix: string; offset?: number } = $props();

	// svelte-ignore state_referenced_locally
	let key = $state(site.start);
	let open = $state(false);
	let root = $state<HTMLElement>();

	const page = $derived(site.pages[key] ?? site.pages[site.start]);
	const link = $derived(linker(site, here, prefix));
	const toc = $derived(headings(page, prefix).filter((h) => h.level === 2));
	const parts = $derived(sections(page));
	const near = $derived(neighbours(site, page.key));
	const n = $derived(site.order.indexOf(page.key) + 1);

	async function show(next: string, anchor?: string) {
		if (!site.pages[next]) return;
		key = next;
		open = false;
		await tick();
		if (anchor) jump(anchor);
		else if (root && root.getBoundingClientRect().top < offset) window.scrollTo({ top: root.getBoundingClientRect().top + window.scrollY - offset });
	}

	const step = 'grid size-8 place-items-center rounded-md border text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground aria-disabled:pointer-events-none aria-disabled:opacity-40 motion-reduce:transition-none';
</script>

{#snippet rail()}
	{#if toc.length > 0}<PostContents items={toc} variant="rail" class="my-2 ml-3.5 text-[0.875rem]" />{/if}
{/snippet}

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
<div bind:this={root} data-docs="guide" onclick={(e) => follow(e, here, show)} style:--docs-top="{offset + 56 + 24}px" style:--band-top="{offset}px">
	<div class="sticky top-(--band-top) z-30 border-b bg-background/85 backdrop-blur-md">
		<Container size="wide" class="relative flex h-14 items-center gap-3">
			<button
				type="button"
				aria-expanded={open}
				aria-label="Pages"
				onclick={() => (open = !open)}
				class="grid size-10 shrink-0 place-items-center rounded-lg border text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground md:hidden"
			>
				<PanelLeft class="lucide size-4" />
			</button>
			<p class="hidden w-52 shrink-0 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase md:block">{site.product} docs</p>
			<DocsFind {site} onpick={(h) => show(h.key, h.id ? `${prefix}-${h.id}` : undefined)} class="min-w-0 flex-1 md:max-w-xl" />
			<div class="ml-auto hidden items-center gap-2 sm:flex">
				<span class="mr-1 text-xs text-muted-foreground tabular-nums">{n} / {site.order.length}</span>
				<a href={near.prev ? link.go(near.prev.key) : here} aria-disabled={!near.prev} aria-label={near.prev ? `Previous: ${near.prev.title}` : 'No previous page'} class={step}><ChevronLeft class="lucide size-4" /></a>
				<a href={near.next ? link.go(near.next.key) : here} aria-disabled={!near.next} aria-label={near.next ? `Next: ${near.next.title}` : 'No next page'} class={step}><ChevronRight class="lucide size-4" /></a>
			</div>
			{#if open}
				<div class="absolute inset-x-6 top-full z-40 mt-2 max-h-[70vh] overflow-y-auto rounded-xl border bg-background p-4 shadow-xl md:hidden">
					<DocsMenu {site} current={page.key} go={link.go} inside={rail} />
				</div>
			{/if}
		</Container>
	</div>

	<Container size="wide">
		<div class="grid gap-12 pt-10 pb-20 md:grid-cols-[13rem_minmax(0,1fr)]">
			<div class="hidden md:block">
				<div class="sticky top-(--docs-top) max-h-[calc(100vh-var(--docs-top)-1rem)] overflow-y-auto pr-2 [scrollbar-width:thin]">
					<DocsMenu {site} current={page.key} go={link.go} inside={rail} />
				</div>
			</div>

			<article class="min-w-0">
				<DocsHead {page} seed={site.product} class="max-w-[46rem]" />
				<div class="mt-9 flex flex-col gap-9">
					{#each parts as s, i (`${page.key}-${s.id ?? i}`)}
						{@const beside = s.code.length > 0 && !s.all.some((b) => b.kind === 'table')}
						<section class={cn('grid gap-x-10', beside && 'xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]', s.heading && i > 0 && 'border-t pt-9')}>
							<DocsProse class={cn('min-w-0 [&>h2:first-child]:mt-0', !beside && 'max-w-[46rem]')}>
								<DocsBlocks blocks={s.heading ? [s.heading, ...s.all] : s.all} {prefix} html={link.html} codeClass={beside ? 'xl:hidden' : undefined} />
							</DocsProse>
							{#if beside}
								<div class="hidden min-w-0 xl:block">
									<div class="sticky top-(--docs-top) flex flex-col gap-4">
										<DocsBlocks blocks={s.code} {prefix} html={link.html} />
									</div>
								</div>
							{/if}
						</section>
					{/each}
				</div>
				<div class="max-w-[46rem]">
					<DocsFoot {site} {page} go={link.go} />
				</div>
			</article>
		</div>
	</Container>
</div>
