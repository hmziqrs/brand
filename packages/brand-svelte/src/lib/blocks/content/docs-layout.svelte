<!--
  A docs page's shell (the lab's gpui-query docs page): the site's header
  with the docs search in it, then the three columns — the line menu on the
  left, the page in the middle, "On this page" sticky on the right from lg
  up. Below md the menu folds behind a menu button, and the search stays in
  the header. The thin line down the menu lights orange at the page you're
  on, the search filters the menu's pages as you type, and the right column
  follows the page with core's scroll spy.
-->
<script lang="ts">
	import PanelLeft from "@lucide/svelte/icons/panel-left";
	import { cn } from "$brand/utils.js";
	import Container from "$brand/blocks/site/container.svelte";
	import SiteShell from "$brand/blocks/site/site-shell.svelte";
	import Toc from "$brand/components/toc.svelte";
	import { scrollSpy } from "@hmziq/brand-core/scroll-spy";
	import DocsSearch from "./docs-search.svelte";
	import type { DocsMenu } from "./types.js";
	import type { Snippet } from "svelte";

	let {
		/** The site's or product's name, shown as the wordmark. */
		site,
		nav = ["Docs", "Blog", "FAQ"],
		/** The nav item for the page you're on. */
		current = "Docs",
		/** The docs menu: groups of pages, the first group allowed no title. */
		menu,
		/** The menu item for the page you're on, matched by its title. */
		page,
		/** The page's headings, fed by the Markdown heading-anchor plugin or the page's own ids. */
		toc = [],
		/** Right before the button, e.g. a GitHub link or the theme toggle. */
		extra,
		class: className,
		/** The page itself. Renamed here because the snippet that carries it
		 * into the shell is also called `children`, and a snippet's name shadows
		 * everything inside it. */
		children: content,
	}: {
		site: string;
		nav?: string[];
		current?: string;
		menu: DocsMenu;
		page: string;
		toc?: { id: string; label: string }[];
		extra?: Snippet;
		class?: string;
		children: Snippet;
	} = $props();

	/** The search's words, filtering the menu's pages. */
	let query = $state("");
	/** The folded menu, below md. */
	let open = $state(false);
	let currentHeading = $state<string>();

	const parts = $derived(extra ? { extra } : {});
	const q = $derived(query.trim().toLowerCase());
	/* The menu with the pages the search leaves, and the groups that keep any. */
	const filtered = $derived(
		menu
			.map(([title, pages]) => [title, pages.filter((p) => !q || p.title.toLowerCase().includes(q))] as const)
			.filter(([, pages]) => pages.length > 0),
	);

	$effect(() => (toc.length ? scrollSpy(toc.map((t) => t.id), (id) => (currentHeading = id)) : undefined));
</script>

<SiteShell {site} maker="Docs" {nav} {current} wide layout="page" mainClassName="pt-0 pb-0 md:pt-0" {...parts}>
	{#snippet lead()}
		<DocsSearch bind:value={query} />
	{/snippet}
	{#snippet children()}
		<Container size="wide">
			<div class={cn("grid gap-12 pt-10 pb-20 md:grid-cols-[12rem_minmax(0,1fr)] lg:grid-cols-[12rem_minmax(0,1fr)_10.5rem]", className)}>
				<div>
					<!-- Below md the menu folds away and the button opens it; from md the
					     button goes and the line stays put. -->
					<button
						type="button"
						aria-expanded={open}
						onclick={() => (open = !open)}
						class="mb-4 inline-flex h-8.5 items-center gap-2 rounded-md border pr-3 pl-3 text-[0.8125rem] text-muted-foreground outline-none transition-colors hover:border-foreground/30 hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 md:hidden"
					>
						<PanelLeft class="lucide size-3.75" />
						Pages
					</button>
					<nav data-slot="docs-menu" aria-label="Docs" class={cn("flex-col gap-6 text-sm max-md:pb-2", open ? "flex" : "hidden", "md:flex")}>
						{#each filtered as [title, pages] (title ?? "top")}
							<div class="flex flex-col gap-2">
								{#if title}<h2 class="text-xs font-medium text-muted-foreground">{title}</h2>{/if}
								<!-- A thin line runs down the menu; the current page lights it orange. -->
								<ul class="flex flex-col border-l">
									{#each pages as p (p.title)}
										<li>
											<a
												href={p.href}
												aria-current={p.title === page ? "page" : undefined}
												class="-ml-px flex border-l border-transparent py-1.5 pl-3.5 text-muted-foreground no-underline transition-colors hover:text-foreground aria-[current=page]:border-primary aria-[current=page]:font-medium aria-[current=page]:text-foreground"
											>
												{p.title}
											</a>
										</li>
									{/each}
								</ul>
							</div>
						{/each}
					</nav>
				</div>

			<article class="max-w-[46rem] min-w-0">
				{@render content()}
			</article>

				{#if toc.length > 0}
					<aside data-slot="docs-toc" aria-label="On this page" class="sticky top-4 hidden self-start text-[0.8125rem] lg:block">
						<h2 class="mb-2 text-xs font-medium text-muted-foreground">On this page</h2>
						<Toc items={toc} current={currentHeading} />
					</aside>
				{/if}
			</div>
		</Container>
	{/snippet}
</SiteShell>
