<script lang="ts">
	import { tick } from 'svelte';
	import PanelLeft from '@lucide/svelte/icons/panel-left';
	import { cn } from '$brand/utils.js';
	import Container from '$brand/blocks/site/container.svelte';
	import DocsSearch from '$brand/blocks/content/docs-search.svelte';
	import PostContents from '$brand/blocks/content/post-contents.svelte';
	import DocsMenu from './docs-menu.svelte';
	import DocsHead from './docs-head.svelte';
	import DocsProse from './docs-prose.svelte';
	import DocsBlocks from './docs-blocks.svelte';
	import DocsFoot from './docs-foot.svelte';
	import { follow, headings, jump, linker, type DocsSite } from './content';

	let { site, here, prefix, offset = 0 }: { site: DocsSite; here: string; prefix: string; offset?: number } = $props();

	// svelte-ignore state_referenced_locally
	let key = $state(site.start);
	let query = $state('');
	let open = $state(false);
	let root = $state<HTMLElement>();

	const page = $derived(site.pages[key] ?? site.pages[site.start]);
	const link = $derived(linker(site, here, prefix));
	const toc = $derived(headings(page, prefix).filter((h) => h.level === 2));

	async function show(next: string, anchor?: string) {
		if (!site.pages[next]) return;
		key = next;
		open = false;
		await tick();
		if (anchor) jump(anchor);
		else if (root && root.getBoundingClientRect().top < offset) window.scrollTo({ top: root.getBoundingClientRect().top + window.scrollY - offset });
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
<div bind:this={root} data-docs="reference" onclick={(e) => follow(e, here, show)} style:--docs-top="{offset + 24}px">
	<Container size="wide">
		<div class="grid gap-12 pt-10 pb-20 md:grid-cols-[14rem_minmax(0,1fr)] lg:grid-cols-[14rem_minmax(0,1fr)_12rem]">
			<div>
				<button
					type="button"
					aria-expanded={open}
					onclick={() => (open = !open)}
					class="mb-4 inline-flex h-8.5 items-center gap-2 rounded-md border pr-3 pl-3 text-[0.8125rem] text-muted-foreground outline-none transition-colors hover:border-foreground/30 hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 md:hidden"
				>
					<PanelLeft class="lucide size-3.75" />
					Pages
				</button>
				<div class={cn('flex-col gap-6 max-md:pb-2 md:sticky md:top-(--docs-top) md:max-h-[calc(100vh-var(--docs-top)-1rem)] md:overflow-y-auto md:pr-2 md:[scrollbar-width:thin]', open ? 'flex' : 'hidden', 'md:flex')}>
					<DocsSearch bind:value={query} class="ml-0 flex w-full min-w-0 shrink-0" />
					<DocsMenu {site} current={page.key} go={link.go} {query} />
				</div>
			</div>

			<article class="max-w-[46rem] min-w-0">
				<DocsHead {page} seed={site.product} />
				<DocsProse class="mt-9 [&>h2:first-child]:mt-0">
					<DocsBlocks blocks={page.blocks} {prefix} html={link.html} />
				</DocsProse>
				<DocsFoot {site} {page} go={link.go} />
			</article>

			{#if toc.length > 0}
				<aside aria-label="On this page" class="hidden lg:block">
					<div class="sticky top-(--docs-top) max-h-[calc(100vh-var(--docs-top)-1rem)] overflow-y-auto [scrollbar-width:thin]">
						<PostContents items={toc} variant="rail" />
					</div>
				</aside>
			{/if}
		</div>
	</Container>
</div>
