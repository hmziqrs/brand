<script lang="ts">
	import { siApple, siLinux, siMarkdown, siGit } from 'simple-icons';
	import FileText from '@lucide/svelte/icons/file-text';
	import Folder from '@lucide/svelte/icons/folder';
	import Search from '@lucide/svelte/icons/search';
	import Eye from '@lucide/svelte/icons/eye';
	import BrandIcon from '$brand/components/brand-icon.svelte';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import ProductScope from '$moves/new/product-scope.svelte';
	import ProductLockup from '$moves/new/product-lockup.svelte';
	import MaterialWord from '$moves/new/material-word.svelte';
	import DeviceWindow from '$moves/new/device-window.svelte';
	import EditorialMargin from '$moves/new/editorial-margin.svelte';
	import PricingSlab from '$moves/new/pricing-slab.svelte';
	import FamilyFooter from '$moves/new/family-footer.svelte';

	const chapters = [
		{ n: '1', t: 'The tide table', w: '6,210' },
		{ n: '2', t: 'Winter moorings', w: '8,944' },
		{ n: '3', t: 'What the pilot said', w: '7,102' },
		{ n: '4', t: 'Rope and patience', w: '9,380' },
		{ n: '5', t: 'Low water', w: '5,877' },
		{ n: '6', t: 'The harbour year', w: '4,120', active: true },
		{ n: '7', t: 'Notes, unsorted', w: '1,033' }
	];
</script>

<svelte:head><title>ferrite — a calm Markdown writer, by hmziq</title></svelte:head>

<ProductScope hue="orange">
	<ProductLockup
		name="ferrite"
		kind="Desktop"
		links={[
			{ label: 'Writing', href: '#/p/new/ferrite' },
			{ label: 'Files', href: '#/p/new/ferrite' },
			{ label: 'Pricing', href: '#/p/new/ferrite' }
		]}
		cta={{ label: 'Download trial', href: '#/p/new/ferrite' }}
	/>

	<section class="mx-auto max-w-[1320px] px-4 pt-20 text-center sm:px-8 lg:pt-28">
		<p class="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">ferrite 2 · macOS · Windows · Linux · $49 once</p>
		<h1 class="mx-auto mt-8 max-w-[13ch] font-newsreader text-[clamp(3.4rem,10vw,9.5rem)] leading-[0.92] font-normal tracking-[-0.035em]">
			A quiet desk for <MaterialWord preset="endgrain-wood" class="italic">long</MaterialWord> writing.
		</h1>
		<p class="mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-foreground sm:text-[1.4rem]">
			ferrite is a Markdown editor for books, theses and essays that outgrew a notes app. It opens a 400-page manuscript instantly, keeps every chapter a plain file, and stays out of the way while you work.
		</p>
		<div class="mt-10 flex flex-wrap items-center justify-center gap-3">
			<a href="#/p/new/ferrite" class="inline-flex h-12 items-center gap-2.5 rounded-lg bg-primary px-6 font-medium text-primary-foreground"><BrandIcon icon={siApple} class="size-4" />Download for Mac</a>
			<a href="#/p/new/ferrite" class="inline-flex h-12 items-center rounded-lg border border-border px-6">Windows & Linux</a>
		</div>
		<p class="mt-4 text-sm text-muted-foreground">Full app for 30 days. No account, no card.</p>
	</section>

	<section class="relative mt-20">
		<div class="absolute inset-x-0 top-[16%] bottom-[-3rem] overflow-hidden">
			<ShaderMaterial preset="endgrain-wood" rendering="image" controls={false} class="h-full w-full" sizes="100vw" />
			<div class="absolute inset-0 bg-gradient-to-b from-background via-background/55 to-background"></div>
		</div>
		<div class="relative mx-auto max-w-[1200px] px-4 sm:px-8">
			<DeviceWindow os="mac" title="The Harbour Year — 6. The harbour year.md" class="h-[40rem]">
				{#snippet toolbar()}
					<span class="hidden items-center gap-3 text-muted-foreground sm:flex"><Search class="lucide size-3.5" /><Eye class="lucide size-3.5" /></span>
				{/snippet}
				<div class="grid h-full md:grid-cols-[15rem_minmax(0,1fr)] lg:grid-cols-[15rem_minmax(0,1fr)_13rem]">
					<aside class="hidden flex-col gap-1 border-r border-border bg-background/50 p-3 text-[0.82rem] md:flex">
						<p class="flex items-center gap-2 px-2 py-1.5 text-muted-foreground"><Folder class="lucide size-3.5" />The Harbour Year</p>
						{#each chapters as c (c.n)}
							<p class="flex items-center gap-2 rounded-md px-2 py-1.5 {c.active ? 'bg-primary/12 text-foreground' : 'text-foreground/75'}">
								<FileText class="lucide size-3.5 shrink-0 {c.active ? 'text-primary' : 'text-muted-foreground'}" />
								<span class="truncate">{c.n}. {c.t}</span>
								<span class="ml-auto font-mono text-[0.68rem] text-muted-foreground">{c.w}</span>
							</p>
						{/each}
						<p class="mt-auto px-2 font-mono text-[0.68rem] text-muted-foreground">42,666 words · 7 files</p>
					</aside>
					<div class="min-w-0 overflow-hidden px-6 py-10 sm:px-14">
						<div class="mx-auto max-w-[36rem] font-newsreader text-[1.18rem] leading-[1.75] text-foreground/90">
							<p class="font-mono text-sm text-muted-foreground"><span class="text-primary">##</span> Chapter six</p>
							<p class="mt-2 text-[2.1rem] leading-tight font-medium text-foreground">The harbour year</p>
							<p class="mt-6">The harbourmaster kept two clocks: one for the town, set by the church, and one for the water, which he never set at all. <span class="text-muted-foreground">*</span><em>The water tells you</em><span class="text-muted-foreground">*</span>, he said, and went back to his ledger.</p>
							<p class="mt-5">By March I had stopped wearing a watch. The boats came in when they came in. I learned the difference between a late tide and a lazy one, and that neither cared what I had planned for the afternoon.</p>
							<p class="mt-5 text-muted-foreground"><span class="text-primary">&gt;</span> <em>Note: move the ledger scene before the storm? Ask R.</em></p>
							<p class="mt-5">There is a kind of patience that only grows near salt<span class="ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[0.2em] bg-primary motion-safe:animate-pulse"></span></p>
						</div>
					</div>
					<aside class="hidden flex-col gap-6 border-l border-border p-5 text-[0.8rem] lg:flex">
						<div>
							<p class="font-mono text-[0.68rem] uppercase tracking-widest text-muted-foreground">Today</p>
							<p class="mt-1 text-3xl font-medium tracking-tight tabular-nums">1,284</p>
							<p class="text-muted-foreground">words, 52 min focused</p>
						</div>
						<div>
							<p class="font-mono text-[0.68rem] uppercase tracking-widest text-muted-foreground">Outline</p>
							<ul class="mt-2 flex flex-col gap-1.5 text-foreground/80">
								<li>The two clocks</li>
								<li class="text-foreground">March, no watch</li>
								<li class="pl-3">The ledger</li>
								<li>Storm in April</li>
							</ul>
						</div>
						<div class="mt-auto rounded-lg border border-border p-3">
							<p class="font-mono text-[0.68rem] uppercase tracking-widest text-muted-foreground">Saved</p>
							<p class="mt-1 truncate font-mono text-[0.72rem]">~/Writing/harbour/06-the-harbour-year.md</p>
						</div>
					</aside>
				</div>
			</DeviceWindow>
		</div>
	</section>

	<div class="h-20 sm:h-32"></div>

	<EditorialMargin numeral="I">
		{#snippet title()}Markdown, kept <em class="text-primary">out of the way.</em>{/snippet}
		<p>The syntax fades to a whisper the moment you leave a line. Headings look like headings, emphasis looks like emphasis, and the asterisks only come back when your cursor does.</p>
		<p>There are no toolbars to learn and nothing to configure on the first day. Open a folder, start typing, and the page will look like a page.</p>
		{#snippet aside()}
			<p class="font-mono text-[0.68rem] uppercase tracking-widest text-primary">Margin note</p>
			<p class="mt-2">Everything you write is CommonMark with footnotes and front matter. Any other editor can open it tomorrow.</p>
		{/snippet}
	</EditorialMargin>

	<EditorialMargin numeral="II">
		{#snippet title()}Built for the eightieth thousand word.{/snippet}
		<p>Most editors are tuned for notes. ferrite is tuned for manuscripts: a 400-page book opens in under a second, search covers every chapter at once, and the outline follows you down the page.</p>
		<p>Split a chapter, merge two, drag one earlier in the book. The files on disk follow, renamed and renumbered, so the folder always matches the story.</p>
		{#snippet aside()}
			<p class="font-mono text-[0.68rem] uppercase tracking-widest text-primary">Measured</p>
			<p class="mt-2"><span class="font-newsreader text-4xl text-foreground">0.4 s</span><br />to open 112,000 words on a five-year-old laptop.</p>
		{/snippet}
	</EditorialMargin>

	<EditorialMargin numeral="III">
		{#snippet title()}Your files, in your folder, forever.{/snippet}
		<p>ferrite never imports your work into a database. Each chapter is a <code class="font-mono text-[0.85em]">.md</code> file in a folder you choose, ready for Git, Dropbox or a USB stick in a drawer.</p>
		<p>If you stop paying for updates, the app keeps working. If you stop using it altogether, your book is still right there.</p>
		{#snippet aside()}
			<div class="flex gap-4 text-foreground/80">
				<BrandIcon icon={siMarkdown} label="Markdown" class="size-6" />
				<BrandIcon icon={siGit} label="Git" class="size-6" />
				<BrandIcon icon={siApple} label="macOS" class="size-6" />
				<BrandIcon icon={siLinux} label="Linux" class="size-6" />
			</div>
			<p class="mt-3">Plain text in, plain text out. Export to PDF, EPUB and DOCX when the book is done.</p>
		{/snippet}
	</EditorialMargin>

	<section class="border-t border-border bg-band">
		<div class="mx-auto max-w-[1200px] px-4 py-24 sm:px-8 sm:py-28">
			<div class="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:items-center">
				<div>
					<h2 class="font-newsreader text-[clamp(2.6rem,5.4vw,4.6rem)] leading-[1] font-normal tracking-[-0.02em]">Pay once. <em class="text-primary">Write for years.</em></h2>
					<p class="mt-6 max-w-md text-xl leading-relaxed">One licence covers three of your own computers, on any mix of systems. Updates for a year are included; the version you have is yours to keep.</p>
				</div>
				<PricingSlab
					seed="ferrite"
					plans={[
						{ name: 'Trial', price: '$0', per: '30 days', blurb: 'The whole app, nothing locked.', features: ['Every feature', 'Exports watermarked', 'No account needed'], cta: 'Download' },
						{ name: 'Licence', price: '$49', per: 'once', blurb: 'Yours to keep, on three machines.', features: ['macOS, Windows and Linux', 'A year of updates', 'Renew later for $19, or don’t'], cta: 'Buy ferrite', pick: true }
					]}
				/>
			</div>
		</div>
	</section>

	<FamilyFooter
		name="ferrite"
		preset="endgrain-wood"
		line="Made by a writer who got tired of their notes app. Questions go to a real inbox."
		columns={[
			{ title: 'ferrite', links: ['Download', 'What’s new', 'Licence lookup'] },
			{ title: 'Writing', links: ['Shortcuts', 'Exporting', 'Using Git'] },
			{ title: 'hmziq', links: ['About', 'Privacy', 'Contact'] }
		]}
	/>
</ProductScope>
