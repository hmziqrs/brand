<script lang="ts">
	import DocsSearch from '$brand/blocks/content/docs-search.svelte';
	import DocsPager from '$brand/blocks/content/docs-pager.svelte';
	import InlineCode from '$brand/components/inline-code.svelte';
	import PanelLeft from '@lucide/svelte/icons/panel-left';
	import Pencil from '@lucide/svelte/icons/pencil';
	import ReadingHeader from '$moves/content/reading-header.svelte';
	import SerifMixHeadline from '$moves/content/serif-mix-headline.svelte';
	import CodeSlab from '$moves/content/code-slab.svelte';
	import CalloutPlate from '$moves/content/callout-plate.svelte';
	import RingFingerprint from '$moves/content/ring-fingerprint.svelte';
	import { scrollToId } from '$moves/content/copy';

	const menu: [string, string[]][] = [
		['Getting started', ['Introduction', 'Install', 'Your first query']],
		['Guides', ['Keys and caching', 'Retries', 'Cancellation', 'Keeping data after a restart', 'Changing data']],
		['Reference', ['QueryClient', 'Query', 'Status', 'Options']]
	];
	const page = 'Your first query';
	let query = $state('');
	let open = $state(false);
	const q = $derived(query.trim().toLowerCase());
	const filtered = $derived(menu.map(([t, pages]) => [t, pages.filter((p) => !q || p.toLowerCase().includes(q))] as const).filter(([, pages]) => pages.length));

	const toc = [
		{ id: 'install', label: 'Add the crate' },
		{ id: 'client', label: 'Start a client' },
		{ id: 'load', label: 'Load something' },
		{ id: 'fails', label: 'When it fails' },
		{ id: 'keep', label: 'Keep it after a restart' }
	];
	let current = $state(toc[0].id);

	$effect(() => {
		const io = new IntersectionObserver(
			(entries) => {
				for (const e of entries) if (e.isIntersecting) current = e.target.id;
			},
			{ rootMargin: '0px 0px -70% 0px' }
		);
		toc.forEach((t) => {
			const el = document.getElementById(t.id);
			if (el) io.observe(el);
		});
		return () => io.disconnect();
	});

	const mainRs = `use gpui::*;
use gpui_query::QueryClient;

fn main() {
    Application::new().run(|cx: &mut App| {
        QueryClient::init(cx);
        cx.open_window(WindowOptions::default(), |_, cx| {
            cx.new(Profile::new)
        })
        .unwrap();
    });
}`;

	const profileRs = `use gpui_query::{Query, QueryExt, Status};

struct Profile {
    user: Query<User>,
}

impl Profile {
    fn new(cx: &mut Context<Self>) -> Self {
        let user = cx.query(("user", 42), |_| async {
            api::user(42).await
        });
        Self { user }
    }
}

impl Render for Profile {
    fn render(
        &mut self,
        _: &mut Window,
        cx: &mut Context<Self>,
    ) -> impl IntoElement {
        match self.user.status(cx) {
            Status::Loading => div().child("Loading…"),
            Status::Ready(user) => div().child(user.name.clone()),
            Status::Failed(error) => div().child(error.to_string()),
        }
    }
}`;

	const optionsRs = `let user = cx
    .query(("user", 42), |_| async { api::user(42).await })
    .fresh_for(Duration::from_secs(60))
    .retry(Retry::backoff(3))
    .persist();`;
</script>

<svelte:head><title>Your first query · gpui-query docs</title></svelte:head>

<div class="min-h-screen bg-background text-foreground">
	<ReadingHeader
		site="gpui-query"
		maker="by freeoxide"
		wide
		links={[
			{ label: 'Docs', href: '#/p/content/docs-1', current: true },
			{ label: 'Changelog', href: '#/p/content/changelog-1' },
			{ label: 'Blog', href: '#/p/content/blog-index-1' }
		]}
	/>

	<div class="mx-auto grid max-w-[90rem] gap-10 px-4 pt-8 pb-24 sm:px-6 md:grid-cols-[14rem_minmax(0,1fr)] md:gap-12 lg:pt-12 xl:grid-cols-[15rem_minmax(0,46rem)_13rem] xl:justify-between">
		<div>
			<button
				type="button"
				aria-expanded={open}
				onclick={() => (open = !open)}
				class="inline-flex h-9 items-center gap-2 rounded-md border px-3 text-sm text-muted-foreground hover:text-foreground md:hidden"
			><PanelLeft class="lucide size-4" />Pages</button>
			<nav aria-label="Docs" class="flex-col gap-7 max-md:mt-4 md:sticky md:top-24 md:flex {open ? 'flex' : 'hidden'}">
				<DocsSearch bind:value={query} class="ml-0 flex w-full min-w-0" />
				{#each filtered as [title, pages] (title)}
					<div>
						<p class="mb-2.5 text-xs text-muted-foreground">{title}</p>
						<ul class="flex flex-col">
							{#each pages as p (p)}
								<li>
									<a
										href="#/p/content/docs-1"
										aria-current={p === page ? 'page' : undefined}
										class="flex items-center gap-2.5 rounded-md py-1.5 pr-2 pl-2 text-[0.9375rem] text-foreground/80 no-underline transition-colors hover:text-foreground aria-[current=page]:bg-foreground/[0.06] aria-[current=page]:font-medium aria-[current=page]:text-foreground"
									>
										<i aria-hidden="true" class="inline-block size-2 shrink-0 rounded-full border-[1.75px] {p === page ? 'border-primary bg-primary' : 'border-foreground/25'}"></i>{p}
									</a>
								</li>
							{/each}
						</ul>
					</div>
				{:else}
					<p class="text-sm">No page matches “{query}”.</p>
				{/each}
			</nav>
		</div>

		<article class="min-w-0 text-[1.0625rem] leading-[1.75] text-foreground">
			<p class="text-sm text-muted-foreground">Docs <span aria-hidden="true">/</span> Getting started</p>
			<div class="mt-4 flex items-start justify-between gap-6">
				<SerifMixHeadline text="Your first _query_" size="lg" />
				<RingFingerprint seed="gpui-query" count={7} weight={1.4} class="hidden size-24 sm:block lg:size-28" />
			</div>
			<p class="mt-7 max-w-[40ch] text-[1.3125rem] leading-[1.5]">Show data from the network in a GPUI window, and let the library handle loading, caching and trying again.</p>
			<p class="mt-4 text-sm text-muted-foreground">5 minute read · Code on this page is illustrative</p>

			<h2 id="install" class="mt-16 scroll-mt-24 text-[1.75rem] leading-tight font-medium tracking-[-0.025em]">Add the crate</h2>
			<p class="mt-4">gpui-query is one dependency. It works with the GPUI version your app already uses.</p>
			<CodeSlab preset="brushed-alloy" code="cargo add gpui-query" lang="bash" label="Terminal" />

			<h2 id="client" class="mt-16 scroll-mt-24 text-[1.75rem] leading-tight font-medium tracking-[-0.025em]">Start a client</h2>
			<p class="mt-4">The client holds every query your app makes. Start it once, before you open a window, and every view can reach it.</p>
			<CodeSlab preset="brushed-alloy" code={mainRs} lang="rust" label="src/main.rs" caption="QueryClient::init registers the cache as a GPUI global." />

			<h2 id="load" class="mt-16 scroll-mt-24 text-[1.75rem] leading-tight font-medium tracking-[-0.025em]">Load something</h2>
			<p class="mt-4">A query needs two things: a key that names the data, and a function that fetches it. The view reads the query’s status and redraws when it changes.</p>
			<CodeSlab preset="brushed-alloy" code={profileRs} lang="rust" label="src/profile.rs" />
			<CalloutPlate tone="tip" label="Keys">Two views that ask for the same key share one request and one cached answer. Use a tuple like <InlineCode>("user", 42)</InlineCode> so keys stay readable.</CalloutPlate>

			<h2 id="fails" class="mt-16 scroll-mt-24 text-[1.75rem] leading-tight font-medium tracking-[-0.025em]">When it fails</h2>
			<p class="mt-4">If the request fails, the query waits a moment and tries again, a little longer each time. Errors that will not fix themselves, like a missing page, stop right away so your app can say what went wrong.</p>
			<CalloutPlate tone="warn" label="Show the error">Always handle <InlineCode>Status::Failed</InlineCode>. A spinner that never ends is the worst message you can give someone.</CalloutPlate>

			<h2 id="keep" class="mt-16 scroll-mt-24 text-[1.75rem] leading-tight font-medium tracking-[-0.025em]">Keep it after a restart</h2>
			<p class="mt-4">Options chain onto the query. Here the data counts as fresh for a minute, retries three times, and is saved to disk so the next launch shows it straight away.</p>
			<CodeSlab preset="brushed-alloy" code={optionsRs} lang="rust" label="Options" />
			<CalloutPlate tone="note" label="Good to know">Persisted data is shown first and refreshed in the background. People see something useful on the first frame.</CalloutPlate>

			<div class="mt-16 flex items-center justify-between gap-4 border-t pt-6 text-sm text-muted-foreground">
				<span>Updated Oct 21, 2026 for 0.4.0</span>
				<a href="https://github.com/hmziqrs" class="inline-flex items-center gap-1.5 text-muted-foreground no-underline hover:text-foreground"><Pencil class="lucide size-3.5" />Edit this page</a>
			</div>
			<DocsPager class="mt-6" prev={{ title: 'Install', href: '#/p/content/docs-1' }} next={{ title: 'Keys and caching', href: '#/p/content/docs-1' }} />
		</article>

		<aside aria-label="On this page" class="hidden xl:block">
			<div class="sticky top-24">
				<p class="mb-3 text-xs text-muted-foreground">On this page</p>
				<ul class="flex flex-col border-l">
					{#each toc as t (t.id)}
						<li>
							<button
								type="button"
								onclick={() => scrollToId(t.id)}
								aria-current={current === t.id ? 'true' : undefined}
								class="-ml-px block w-full border-l-2 border-transparent py-1.5 pl-3.5 text-left text-[0.875rem] text-muted-foreground transition-colors hover:text-foreground aria-[current=true]:border-primary aria-[current=true]:text-foreground"
							>{t.label}</button>
						</li>
					{/each}
				</ul>
				<div class="mt-8 rounded-xl border p-4">
					<p class="text-sm font-medium">New in 0.4.0</p>
					<p class="mt-1.5 text-sm leading-snug text-foreground/85">Saved queries come back after a restart.</p>
					<a href="#/p/content/changelog-1" class="mt-3 inline-block text-sm text-primary">Read the changelog</a>
				</div>
			</div>
		</aside>
	</div>
</div>
