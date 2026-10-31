<script lang="ts">
	import { Button } from '$brand/ui/button/index.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import Download from '@lucide/svelte/icons/download';
	import Pencil from '@lucide/svelte/icons/pencil';
	import Smartphone from '@lucide/svelte/icons/smartphone';
	import Table from '@lucide/svelte/icons/table';
	import Ellipsis from '@lucide/svelte/icons/ellipsis';
	import FileCode from '@lucide/svelte/icons/file-code';
	import Layers from '@lucide/svelte/icons/layers';
	import Upload from '@lucide/svelte/icons/upload';
	import FileSpreadsheet from '@lucide/svelte/icons/file-spreadsheet';
	import Code from '@lucide/svelte/icons/code';
	import Quote from '@lucide/svelte/icons/quote';
	import RefreshCw from '@lucide/svelte/icons/refresh-cw';
	import Images from '@lucide/svelte/icons/images';
	import ListFilter from '@lucide/svelte/icons/list-filter';
	import Bot from '@lucide/svelte/icons/bot';
	import Link from '@lucide/svelte/icons/link';
	import Eye from '@lucide/svelte/icons/eye';
	import Sparkles from '@lucide/svelte/icons/sparkles';
	import PenTool from '@lucide/svelte/icons/pen-tool';
	import Server from '@lucide/svelte/icons/server';
	import Search from '@lucide/svelte/icons/search';
	import ChartLine from '@lucide/svelte/icons/chart-line';
	import SiteHeader from '$moves/site-framer/site-header.svelte';
	import SiteFooter from '$moves/site-framer/site-footer.svelte';
	import HeroStage from '$moves/site-framer/hero-stage.svelte';
	import PromptBox from '$moves/site-framer/prompt-box.svelte';
	import ProofStrip from '$moves/site-framer/proof-strip.svelte';
	import SectionHead from '$moves/site-framer/section-head.svelte';
	import CmsTable from '$moves/site-framer/cms-table.svelte';
	import CapabilityTabs from '$moves/site-framer/capability-tabs.svelte';
	import BentoCell from '$moves/site-framer/bento-cell.svelte';
	import UiPanel from '$moves/site-framer/ui-panel.svelte';
	import FeatureChips from '$moves/site-framer/feature-chips.svelte';
	import OxideTile from '$moves/bento/oxide-tile.svelte';
	import { to } from '$moves/site-framer/site';

	const wrap = 'mx-auto max-w-[1280px] px-4 sm:px-8';
	let visible = $state(true);
	let draft = $state('Dynamic pricing');
</script>

<svelte:head><title>kiln CMS — content with an agent</title></svelte:head>

<div class="min-h-screen overflow-x-clip bg-background text-foreground">
	<SiteHeader active="feature" />

	<section class="{wrap} pt-16 md:pt-24">
		<p class="font-mono text-xs tracking-[0.16em] text-primary uppercase">kiln CMS</p>
		<h1 class="mt-5 max-w-[14ch] text-[clamp(3.25rem,8vw,7.25rem)] leading-[0.88] font-semibold tracking-[-0.06em]">Create, run and publish dynamic sites with agents<span class="ml-[0.05em] inline-block size-[0.15em] bg-primary"></span></h1>
		<div class="mt-8 flex flex-wrap gap-3">
			<Button href={to('pricing')} size="lg" class="h-12 rounded-full px-6 text-base">Start for free</Button>
			<Button href={to('pricing')} size="lg" variant="outline" class="h-12 rounded-full px-6 text-base">Download the app<Download class="lucide" /></Button>
		</div>
		<HeroStage class="mt-12 min-h-0 px-3 py-10 sm:px-10 md:min-h-0 md:py-14" preset="copper-sweep" live={false} veil={0.6} cell={56} corner="move the cursor">
			<CmsTable agent class="w-full shadow-[0_40px_120px_-30px_var(--background)]" />
		</HeroStage>
	</section>

	<section class="{wrap} py-24"><ProofStrip /></section>

	<section class="{wrap} pb-28">
		<SectionHead title="Create, update and import content. By hand or by prompt." class="mb-12" />
		<CapabilityTabs
			items={[
				{ title: 'Create a collection in seconds', body: 'Say what you want to store. The agent picks field types, makes the collection and sets up slugs.', prompt: 'Make an Authors collection for the journal: name, avatar, team, short bio and one social link.', panel: 'fields' },
				{ title: 'Fill it with believable content', body: 'Ask for sample items and get titles, summaries, dates and categories you can preview straight away.', prompt: 'Add eight sample articles across Design, Growth and Engineering, with covers.', panel: 'cms' },
				{ title: 'A detail page, already wired', body: 'Ask for a detail page and the agent makes the route, maps every field and lays it out.', prompt: 'Design the article page: big title, author line, cover, then the body.', panel: 'detail' },
				{ title: 'Spreadsheets become pages', body: 'Drop in a CSV. The agent reads the columns, writes the schema, maps every field and imports each row.', prompt: 'Turn menu.csv into a Menu collection and a page per section.', panel: 'csv' },
				{ title: 'Bulk edits and migrations', body: 'Move items between collections, link hundreds of references or rewrite copy, in one request.', prompt: 'Sort the changelog by status, then date, and tag every post that mentions billing.', panel: 'sorting' }
			]}
		/>
	</section>

	<section class="{wrap} pb-28">
		<SectionHead title="A CMS built around how teams actually work" class="mb-12" />
		<div class="grid gap-px overflow-hidden rounded-[28px] border border-border bg-border md:grid-cols-2">
			<BentoCell title="Edit content anywhere" href={to('feature')} body="Fix a typo from your phone, on the live site. Teammates never need to open the canvas.">
				{#snippet art()}
					<div class="w-[230px] rounded-[34px] border-[6px] border-foreground/15 bg-card p-3 pt-6">
						<p class="mx-auto mb-4 w-fit rounded-full bg-muted px-3 py-1 text-[0.625rem] text-foreground/70">marrow.studio/journal</p>
						<p class="text-[0.625rem] text-foreground/50">Oct 31, 2026</p>
						<p class="mt-1 text-2xl leading-[1.05] font-semibold tracking-[-0.03em] outline-1 outline-offset-2 outline-primary outline-dashed">{draft}<span class="ml-0.5 inline-block h-6 w-0.5 bg-primary align-middle motion-safe:animate-pulse"></span></p>
						<label class="mt-3 block text-[0.625rem] text-foreground/60">Edit the title<input bind:value={draft} class="mt-1 w-full rounded-md bg-muted px-2 py-1 text-xs text-foreground outline-none focus:ring-1 focus:ring-primary" /></label>
						<p class="mt-3 text-[0.625rem] leading-snug text-foreground/60">Prices now follow demand on the busiest nights, and we explain how in plain words.</p>
					</div>
				{/snippet}
			</BentoCell>
			<BentoCell title="Edit in context" href={to('feature')} body="Change content right on the canvas and see it in the real layout, not in a separate form.">
				{#snippet art()}
					<div class="w-full max-w-[440px] overflow-hidden rounded-2xl border border-border bg-card">
						<p class="flex items-center gap-1.5 bg-primary/15 px-3 py-1.5 text-xs text-primary"><span class="size-2 bg-primary"></span>Desktop 1200</p>
						<div class="p-5">
							<p class="text-3xl leading-none font-semibold tracking-[-0.04em]">Talks &amp; sessions</p>
							<ul class="mt-4 space-y-2 text-sm">
								{#each [['Designing systems that last', 'Design', '09:00'], ['Shipping with small teams', 'Process', '10:30'], ['Accessible by default', 'Design', '11:45']] as [t, c, h], i (t)}
									<li class="flex items-center gap-2 border-t border-border pt-2" class:outline-1={i === 0} class:outline-primary={i === 0} class:outline-dashed={i === 0}><span class="flex-1">{t}</span><span class="rounded-full bg-muted px-2 text-[0.625rem]">{c}</span><span class="font-mono text-xs text-foreground/60">{h}</span></li>
								{/each}
							</ul>
						</div>
					</div>
				{/snippet}
			</BentoCell>
			<BentoCell title="SEO on every page" href={to('feature')} body="Titles, descriptions, schema and share cards are filled from your fields automatically.">
				{#snippet art()}<UiPanel kind="seo" />{/snippet}
			</BentoCell>
			<BentoCell title="Drafts and publishing" href={to('feature')} body="Stage content without it going live. Preview, then publish when you are ready, alone or as a team.">
				{#snippet art()}<UiPanel kind="publish" class="max-w-[300px]" />{/snippet}
			</BentoCell>
		</div>
	</section>

	<section class="{wrap} pb-28">
		<SectionHead title="The small details that make content feel alive" class="mb-12" />
		<div class="grid gap-4 lg:grid-cols-3">
			<div class="grid gap-px overflow-hidden rounded-[28px] border border-border bg-border md:grid-cols-2 lg:col-span-2">
				<BentoCell title="Conditional visibility" body="Show or hide elements from CMS values.">
					{#snippet art()}
						<div class="w-full max-w-[280px] rounded-2xl border border-border bg-card p-4 text-sm">
							<label class="flex items-center justify-between"><span class="flex items-center gap-2"><Eye class="lucide size-4 text-primary" />Show “Sold out” badge</span>
								<button type="button" role="switch" aria-checked={visible} aria-label="Show badge" onclick={() => (visible = !visible)} class="relative h-5 w-9 rounded-full transition-colors" class:bg-primary={visible} class:bg-muted={!visible}><span class="absolute top-0.5 left-0.5 size-4 rounded-full bg-background transition-transform motion-reduce:transition-none" class:translate-x-4={visible}></span></button>
							</label>
							<div class="relative mt-4 aspect-[4/3] overflow-hidden rounded-lg">
								<ShaderMaterial preset="porous-ceramic" rendering="image" controls={false} sizes="280px" class="absolute inset-0 h-full w-full" />
								{#if visible}<span class="absolute top-2 left-2 bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">Sold out</span>{/if}
							</div>
						</div>
					{/snippet}
				</BentoCell>
				<BentoCell title="Built-in localization" body="Translate every collection and serve the right language automatically.">{#snippet art()}<UiPanel kind="locales" />{/snippet}</BentoCell>
				<BentoCell title="Dynamic filters" body="Search, tabs, toggles and dropdowns over any list.">{#snippet art()}<UiPanel kind="filters" />{/snippet}</BentoCell>
				<BentoCell title="Rich field types" body="Text, images, rich text, dates, references and more.">{#snippet art()}<UiPanel kind="fields" />{/snippet}</BentoCell>
			</div>
			<div class="flex flex-col gap-4">
				<OxideTile eyebrow="Per project" big="100k" title="items in a single collection." body="Large catalogues, directories and changelogs stay fast to edit and fast to load." seed="kiln-cms" class="flex-1" />
				<div class="rounded-[28px] border border-border p-6">
					<p class="flex items-center gap-2 text-xl font-medium tracking-[-0.02em]"><Link class="lucide size-5 text-primary" />Unlimited references</p>
					<p class="mt-1.5 text-[1.0625rem] leading-snug text-foreground/75">Link authors to posts, products to collections, speakers to talks, as deep as you need.</p>
				</div>
			</div>
		</div>
	</section>

	<section class="{wrap} pb-28">
		<SectionHead title="And the list keeps going" size="md" class="mb-10" />
		<FeatureChips
			items={[
				{ icon: Pencil, label: 'On-page editing' },
				{ icon: Smartphone, label: 'Mobile CMS' },
				{ icon: Table, label: 'Tables in rich text' },
				{ icon: Ellipsis, label: 'Pagination' },
				{ icon: FileCode, label: 'Markdown' },
				{ icon: Layers, label: 'Bulk operations' },
				{ icon: Upload, label: 'Up to 100k items' },
				{ icon: FileSpreadsheet, label: 'CSV import' },
				{ icon: Code, label: 'Code blocks' },
				{ icon: Quote, label: 'Block quotes' },
				{ icon: RefreshCw, label: 'Sheets sync' },
				{ icon: RefreshCw, label: 'Base sync' },
				{ icon: Images, label: 'CMS galleries' },
				{ icon: ListFilter, label: 'Dynamic filters' },
				{ icon: Bot, label: 'CMS agents' }
			]}
		/>
	</section>

	<section class="{wrap} pb-8">
		<SectionHead title="Everything a site needs, already inside" size="md" class="mb-10" />
		<div class="grid gap-px overflow-hidden rounded-[20px] border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
			{#each [{ i: Sparkles, t: 'Agent', b: 'Draft and refine pages' }, { i: PenTool, t: 'Canvas', b: 'Design without limits' }, { i: Server, t: 'Hosting', b: 'Global, fast, included' }, { i: Search, t: 'SEO', b: 'Ranked and readable' }, { i: ChartLine, t: 'Analytics', b: 'Traffic without cookies' }] as c (c.t)}
				<a href={to('home')} class="group flex flex-col gap-8 bg-background p-5 transition-colors hover:bg-card">
					<c.i class="lucide size-5 text-primary" />
					<span><span class="flex items-center gap-1.5 text-lg font-medium">{c.t}<ArrowRight class="lucide size-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" /></span><span class="text-foreground/70">{c.b}</span></span>
				</a>
			{/each}
		</div>
	</section>

	<SiteFooter preset="copper-sweep">
		{#snippet cta()}
			<div class="flex flex-col items-center text-center">
				<h2 class="text-[clamp(2.75rem,7vw,6rem)] leading-[0.9] font-semibold tracking-[-0.055em]">Your next idea starts here<span class="ml-[0.05em] inline-block size-[0.15em] bg-primary"></span></h2>
				<PromptBox glow={false} class="mt-10" chips={['Blog with categories', 'Product catalogue', 'Job board', 'Event schedule']} />
			</div>
		{/snippet}
	</SiteFooter>
</div>
