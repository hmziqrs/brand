<!-- A résumé page: the name, role and about lines with the contacts and downloads beside them, the experience on the
     changelog's thin-ring rail beside a sticky heading, skills as Tag pills, the projects as picture cards with a
     filter. Printing drops the chrome, the drawings and the buttons and sets it black on white. -->
<script lang="ts">
	import { cvLatest, cvProjectItems, cvProjectsLine, cvRoleKey, type CvData } from '@hmziq/brand-core/cv-page';
	import Mail from '@lucide/svelte/icons/mail';
	import Printer from '@lucide/svelte/icons/printer';
	import Download from '@lucide/svelte/icons/download';
	import { siTelegram, siX } from 'simple-icons';
	import { cn } from '$brand/utils.js';
	import Container from '$brand/blocks/site/container.svelte';
	import ButtonLink from '$brand/blocks/site/button-link.svelte';
	import { Button } from '$brand/ui/button/index.js';
	import Tag from '$brand/components/tag.svelte';
	import Marker from '$brand/components/marker.svelte';
	import BrandIcon from '$brand/components/brand-icon.svelte';
	import PictureGrid from '$brand/components/picture-grid.svelte';
	import ReleaseTimeline from '$brand/blocks/content/release-timeline.svelte';
	import { shareIcons } from '$brand/blocks/content/share-icons';
	import type { Release } from '$brand/blocks/content/types.js';

	let { data: cv, class: className }: { data: CvData; class?: string } = $props();

	const icons: Record<string, { path: string }> = { telegram: siTelegram, x: siX, linkedin: { path: shareIcons.linkedin } };
	const rail = $derived<Release[]>(cv.roles.map((r) => ({ v: cvRoleKey(r), date: '', groups: [] })));
	const latest = $derived(cvLatest(cv.roles));
	const projects = $derived(cvProjectItems(cv.projects));
	const head = 'text-[clamp(2.25rem,4.4vw,3.75rem)] leading-[0.98] font-semibold tracking-[-0.045em] text-foreground print:break-after-avoid print:text-[20pt]';
</script>

{#snippet role(r: Release, i: number)}
	{@const x = cv.roles[i]}
	<div class="flex min-w-0 flex-col gap-3 print:gap-1.5">
		<div class="flex flex-wrap items-center gap-x-3 gap-y-1.5">
			<h3 class="text-[clamp(1.5rem,2.2vw,1.875rem)] leading-tight font-semibold tracking-[-0.03em] text-foreground print:text-[13pt]">{x.org}</h3>
			<Tag tone={x.tone}>{x.type}</Tag>
		</div>
		<p class="-mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
			<span class="text-[1.0625rem] font-medium text-foreground">{x.role}</span>
			<span class={cn('font-mono text-xs tracking-[0.08em] uppercase', x.now ? 'text-primary' : 'text-foreground/70')}>{x.dates}</span>
		</p>
		<ul class="mt-1 flex max-w-[52rem] flex-col gap-2.5 print:gap-1">
			{#each x.lines as line (line)}
				<li class="grid grid-cols-[0.5rem_minmax(0,1fr)] items-baseline gap-3 text-[1.0625rem] leading-[1.6] text-foreground/90 print:text-[9.5pt] print:leading-[1.45]"><Marker class="-translate-y-[0.1em] text-primary" /><span>{line}</span></li>
			{/each}
		</ul>
		<ul class="mt-1 flex flex-wrap gap-1.5" aria-label={`${x.org} stack`}>
			{#each x.stack as s (s)}<li><Tag>{s}</Tag></li>{/each}
		</ul>
	</div>
{/snippet}

<div data-slot="cv-page" class={cn('cv pb-24 md:pb-32 print:pb-0', className)}>
	<Container size="wide" class="grid items-start gap-x-16 gap-y-12 pt-16 md:pt-24 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)] print:grid-cols-[minmax(0,1.6fr)_minmax(0,0.6fr)] print:gap-x-8 print:pt-0">
		<header class="min-w-0">
			<p class="font-mono text-xs tracking-[0.14em] text-primary uppercase">{cv.site} · {cv.updated}</p>
			<h1 class="mt-6 text-[clamp(3.25rem,8vw,7rem)] leading-[0.92] font-semibold tracking-[-0.05em] text-foreground print:mt-2 print:text-[30pt]">{cv.name}</h1>
			<p class="mt-6 font-mono text-sm font-medium tracking-[0.06em] text-foreground print:mt-2 print:text-[9pt]">{cv.role}</p>
			<div class="mt-8 flex max-w-[44rem] flex-col gap-4 print:mt-3 print:gap-1.5">
				{#each cv.about as p, i (i)}
					<p class={cn('text-[clamp(1.125rem,1.5vw,1.3125rem)] leading-snug text-pretty print:text-[10pt]', i ? 'text-foreground/80' : 'text-foreground')}>{p}</p>
				{/each}
			</div>
		</header>

		<aside aria-label="Contact" class="flex min-w-0 flex-col gap-8 lg:pt-10 print:gap-3 print:pt-6">
			<ul class="flex flex-col">
				{#each cv.contact as c (c.id)}
					<li>
						<a href={c.href} target={c.id === 'email' ? undefined : '_blank'} rel="noreferrer" class="group flex items-center gap-3 border-b border-border py-3 text-[1.0625rem] text-foreground transition-colors hover:text-primary motion-reduce:transition-none print:py-1 print:text-[9.5pt]">
							<span class="grid size-8 place-items-center rounded-full ring-1 ring-foreground/15 transition-shadow group-hover:ring-primary/60 motion-reduce:transition-none print:size-5 print:ring-0">
								{#if c.id === 'email'}<Mail class="lucide size-4" />{:else}<BrandIcon icon={icons[c.id]} class="size-3.5" />{/if}
							</span>
							{c.label}
						</a>
					</li>
				{/each}
			</ul>
			<div class="flex flex-col gap-3 print:hidden">
				<p class="font-mono text-[11px] tracking-[0.14em] text-foreground/70 uppercase">{cv.download.title}</p>
				<div class="flex flex-wrap gap-2">
					{#each cv.download.files as [label, href] (label)}
						<ButtonLink {href} variant="outline" target="_blank" rel="noreferrer"><Download class="lucide" data-icon="inline-start" />{label}</ButtonLink>
					{/each}
					<Button onclick={() => window.print()}><Printer class="lucide" data-icon="inline-start" />Print this page</Button>
				</div>
			</div>
		</aside>
	</Container>

	<Container size="wide" class="mt-28 md:mt-36 print:mt-8">
		<section aria-labelledby="cv-experience" class="grid gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,0.5fr)_minmax(0,1.5fr)] print:block">
			<div class="lg:sticky lg:top-[calc(var(--pages-top,0px)+2rem)] lg:self-start">
				<h2 id="cv-experience" class={head}>Experience</h2>
				<p class="mt-4 font-mono text-xs tracking-[0.08em] text-foreground/70 uppercase print:mt-1 print:mb-4">{cv.span}</p>
			</div>
			<ReleaseTimeline releases={rail} rail {latest} item={role} class="min-w-0" />
		</section>
	</Container>

	<Container size="wide" class="mt-28 md:mt-36 print:mt-8">
		<section aria-labelledby="cv-skills" class="print:break-inside-avoid grid gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,0.5fr)_minmax(0,1.5fr)] print:block">
			<h2 id="cv-skills" class={cn(head, 'print:mb-3')}>Skills</h2>
			<div class="grid gap-10 sm:grid-cols-3 print:grid-cols-3 print:gap-6">
				{#each cv.skills as g (g.group)}
					<div class="min-w-0">
						<h3 class="border-b border-border pb-3 font-mono text-xs tracking-[0.14em] text-primary uppercase print:pb-1">{g.group}</h3>
						<ul class="mt-4 flex flex-wrap gap-1.5 print:mt-2">
							{#each g.items as s (s)}<li><Tag class="h-7 px-3 text-[13px] print:h-5 print:px-2 print:text-[8pt]">{s}</Tag></li>{/each}
						</ul>
					</div>
				{/each}
			</div>
		</section>
	</Container>

	<Container size="wide" class="mt-28 md:mt-36 print:mt-8">
		<section aria-labelledby="cv-projects">
			<div class="flex flex-wrap items-end justify-between gap-x-10 gap-y-3">
				<h2 id="cv-projects" class={head}>Projects</h2>
				<p class="font-mono text-xs tracking-[0.08em] text-foreground/70 uppercase">{cvProjectsLine(cv.projects, cv.counts)}</p>
			</div>
			<PictureGrid items={projects} filter="Kind" class="mt-10 print:mt-4" />
		</section>
	</Container>

	<Container size="wide" class="mt-10 hidden print:block"><p class="text-[8pt] text-foreground/70">{cv.legal}</p></Container>
</div>

<style>
	@media print {
		@page {
			margin: 14mm;
		}
		:global(html:has([data-slot='cv-page'])),
		:global(html.dark:has([data-slot='cv-page'])) {
			--background: white;
			--foreground: black;
			--card: white;
			--card-foreground: black;
			--muted: color-mix(in oklab, black 5%, white);
			--muted-foreground: color-mix(in oklab, black 68%, white);
			--secondary: color-mix(in oklab, black 6%, white);
			--secondary-foreground: black;
			--border: color-mix(in oklab, black 16%, white);
			--primary: var(--oxide-ink);
			color-scheme: light;
			background: white;
		}
		.cv :global([data-slot='picture-grid'] > [role='radiogroup']),
		.cv :global([data-slot='picture-card'] > span:first-child) {
			display: none;
		}
		.cv :global([data-slot='picture-grid'] > div) {
			grid-template-columns: repeat(3, minmax(0, 1fr));
			row-gap: 10px;
		}
		.cv :global([data-slot='picture-card']) {
			gap: 2px;
			break-inside: avoid;
		}
		.cv :global([data-slot='picture-card'] > span) {
			font-size: 9pt;
		}
		.cv :global([data-slot='release-timeline'] > li) {
			padding-bottom: 14px;
			break-inside: avoid;
		}
		.cv :global([data-slot='release-timeline'] > span + span) {
			display: none;
		}
		.cv :global([data-slot='tag']) {
			font-size: 7.5pt;
		}
	}
</style>
