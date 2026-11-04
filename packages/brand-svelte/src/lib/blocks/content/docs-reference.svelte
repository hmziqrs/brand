<!-- A product's whole docs on one page, in the three columns of DocsLayout: the line menu with its search on the
     left, the page in the middle (title with thin rings, the blocks, the foot) and "On this page" on the right.
     The menu, the pager and the links between pages switch pages in place; the contents rail follows the
     page. Put it under the site's own header; `offset` is how tall a sticky header is. -->
<script lang="ts">
	import { tick } from "svelte";
	import PanelLeft from "@lucide/svelte/icons/panel-left";
	import Pencil from "@lucide/svelte/icons/pencil";
	import { cn } from "$brand/utils.js";
	import Container from "$brand/blocks/site/container.svelte";
	import Prose from "$brand/blocks/site/prose.svelte";
	import Tag from "$brand/components/tag.svelte";
	import DocsSearch from "./docs-search.svelte";
	import DocsTitle from "./docs-title.svelte";
	import PostContents from "./post-contents.svelte";
	import DocsNav from "./docs-nav.svelte";
	import DocsBlocks from "./docs-blocks.svelte";
	import DocsPager from "./docs-pager.svelte";
	import { docsFollow, docsHeadings, docsJump, docsLinker, docsNeighbours, type DocsSiteData } from "@hmziq/brand-core/docs-reference";

	let {
		site,
		/** Where the docs sit: links between pages are `<here>#~<key>`. */
		here = "",
		/** Keeps the headings' ids unique when two docs share a page. */
		prefix = "docs",
		/** The height of a sticky header above the docs, so the menu and the rail sit under it. */
		offset = 0,
		class: className,
	}: { site: DocsSiteData; here?: string; prefix?: string; offset?: number; class?: string } = $props();

	// svelte-ignore state_referenced_locally
	let key = $state(site.start);
	let query = $state("");
	let open = $state(false);
	let root = $state<HTMLElement>();

	const page = $derived(site.pages[key] ?? site.pages[site.start]);
	const link = $derived(docsLinker(site, here, prefix));
	const toc = $derived(docsHeadings(page, prefix).filter((h) => h.level === 2));
	const near = $derived(docsNeighbours(site, page.key));
	const stamp = $derived([page.reviewed, page.updated && `Last updated ${page.updated}`].filter(Boolean).join(" · "));

	async function show(next: string, anchor?: string) {
		if (!site.pages[next]) return;
		key = next;
		open = false;
		await tick();
		if (anchor) docsJump(anchor);
		else if (root && root.getBoundingClientRect().top < offset) window.scrollTo({ top: root.getBoundingClientRect().top + window.scrollY - offset });
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
<div bind:this={root} data-slot="docs-reference" onclick={(e) => docsFollow(e, here, show)} style:--docs-top="{offset + 24}px" class={className}>
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
				<div class={cn("flex-col gap-6 max-md:pb-2 md:sticky md:top-(--docs-top) md:max-h-[calc(100vh-var(--docs-top)-1rem)] md:overflow-y-auto md:pr-2 md:[scrollbar-width:thin]", open ? "flex" : "hidden", "md:flex")}>
					<DocsSearch bind:value={query} class="ml-0 flex w-full min-w-0 shrink-0" />
					<DocsNav menu={site.menu} current={page.key} go={link.go} {query} />
				</div>
			</div>

			<article class="max-w-[46rem] min-w-0">
				<DocsTitle title={page.title} lede={page.desc} trail={["Docs", ...(page.group ? [page.group] : [])]} seed={site.product} thin />
				{#if page.applies}<Tag marker tone="orange" class="relative mt-5">{page.applies}</Tag>{/if}
				<Prose class="docs-prose mt-9 text-[0.9375rem] [&_h2]:mt-9 [&>h2:first-child]:mt-0">
					<DocsBlocks blocks={page.blocks} {prefix} html={link.html} />
				</Prose>
				<div class="mt-12 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t pt-5 text-[0.8125rem] text-muted-foreground">
					<a href={page.edit ?? site.github} target="_blank" rel="noreferrer" class="inline-flex items-center gap-2 transition-colors hover:text-foreground">
						<Pencil class="lucide size-3.5" />
						{page.edit ? "Edit this page on GitHub" : `${site.product} on GitHub`}
					</a>
					{#if stamp}<span>{stamp}</span>{/if}
				</div>
				<DocsPager class="mt-8" prev={near.prev && { title: near.prev.title, href: link.go(near.prev.key) }} next={near.next && { title: near.next.title, href: link.go(near.next.key) }} />
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

<style>
	:global(.docs-prose :is(p, li, td, th, span, blockquote) > code),
	:global(.docs-prose :is(p, li, td, th, span, blockquote) > :is(a, strong, em) > code) {
		border-radius: calc(var(--radius) - 6px);
		background: var(--muted);
		padding: 0.125rem 0.375rem;
		font-family: var(--font-mono);
		font-size: 0.9em;
		color: var(--foreground);
	}
</style>
