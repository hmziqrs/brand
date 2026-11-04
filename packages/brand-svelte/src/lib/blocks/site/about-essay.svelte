<!-- The about page as an essay: the hover-grid material across the full width behind the headline, with the
     lede on frosted glass; what the studio believes as big paragraphs beside a sticky title; the
     commitments as separate cards; the stack as picture cards with line drawings; and the person with a
     rail of their years. Under the site's own header and footer. -->
<script lang="ts">
	import ArrowUpRight from "@lucide/svelte/icons/arrow-up-right";
	import { cn } from "$brand/utils.js";
	import Container from "./container.svelte";
	import ButtonLink from "./button-link.svelte";
	import SectionHead from "$brand/blocks/sections/section-head.svelte";
	import CommitmentCards from "$brand/blocks/sections/commitment-cards.svelte";
	import MaterialGrid from "$brand/components/material-grid.svelte";
	import Glass from "$brand/components/glass.svelte";
	import PictureCard from "$brand/components/picture-card.svelte";
	import PersonCard from "$brand/components/person-card.svelte";
	import ExperienceRail from "$brand/components/experience-rail.svelte";
	import type { AboutEssayData } from "./company-types.js";

	let {
		data,
		/** Where the stack cards and "See the code" go. */
		href = "#",
		class: className,
	}: { data: AboutEssayData; href?: string; class?: string } = $props();

	const lead = $derived(data.title.slice(0, data.title.indexOf(data.accent)));
	const b = $derived(data.believe);
	const w = $derived(data.who);
</script>

<div data-slot="about-essay" class={cn("pb-24 md:pb-32", className)}>
	<section data-pointer-host class="relative isolate overflow-hidden border-b border-border">
		<MaterialGrid />
		<Container size="wide" class="relative py-24 md:py-32 lg:py-40">
			<Glass variant="clear" as="p" class="inline-flex rounded-full px-3 py-1.5 font-mono text-xs tracking-[0.14em] text-primary uppercase">{data.kicker}</Glass>
			<h1 class="mt-6 max-w-[11ch] text-[clamp(3.25rem,8.4vw,8.25rem)] leading-[0.9] font-semibold tracking-[-0.05em] text-foreground [text-shadow:0_2px_40px_var(--background),0_0_14px_var(--background)]">{lead}<span class="text-primary">{data.accent}</span></h1>
			<Glass class="mt-12 max-w-[40rem] rounded-2xl p-6 sm:p-7">
				<p class="text-[clamp(1.125rem,1.6vw,1.375rem)] leading-snug text-pretty text-foreground">{data.lede}</p>
			</Glass>
		</Container>
	</section>

	<Container size="wide" class="mt-24 grid gap-10 md:mt-32 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
		<SectionHead kicker={b.kicker} title={b.title} layout="stack" titleClass="max-w-[13ch]" class="lg:sticky lg:top-[calc(var(--company-top,0px)+2rem)] lg:self-start" />
		<div class="flex min-w-0 flex-col gap-8 text-[clamp(1.25rem,1.9vw,1.625rem)] leading-[1.4] tracking-[-0.01em] text-foreground">
			<p>{b.lead.before}<span class="font-medium text-primary">{b.lead.hit}</span>{b.lead.after}</p>
			{#each b.paragraphs as text (text)}<p>{text}</p>{/each}
		</div>
	</Container>

	<Container size="wide" class="mt-28 md:mt-40">
		<CommitmentCards data={data.commitments} />
	</Container>

	<Container size="wide" class="mt-28 md:mt-40">
		<section data-slot="stack-cards">
			<SectionHead kicker={data.stack.kicker} title={data.stack.title} lede={data.stack.aside} />
			<div class="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
				{#each data.stack.items as d (d.n)}
					<PictureCard {href} art={d.art} tag={`${d.n} / ${d.name}`} title={d.title} dek={d.dek} meta={d.tools.join(" · ")} as="h3" />
				{/each}
			</div>
			<p class="mt-12 max-w-[46rem] text-lg leading-snug text-foreground/85">{data.stack.foot}</p>
		</section>
	</Container>

	<Container size="wide" class="mt-28 md:mt-40">
		<section data-slot="who-section">
			<div class="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
				<SectionHead kicker={w.kicker} title={w.title} layout="stack" titleClass="max-w-[14ch]" />
				<div class="flex min-w-0 flex-col gap-6">
					<p class="text-[clamp(1.125rem,1.6vw,1.375rem)] leading-snug text-foreground">{w.body}</p>
					<div class="flex flex-wrap gap-3">
						<ButtonLink {href} variant="outline">{w.links.work}</ButtonLink>
						<ButtonLink href={data.person.cv} variant="outline" target="_blank" rel="noreferrer">{w.links.cv}<ArrowUpRight class="lucide" data-icon="inline-end" /></ButtonLink>
					</div>
				</div>
			</div>
			<div class="mt-16 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,3fr)]">
				<PersonCard name={data.person.name} role={`${data.person.role} · ${data.person.years}`} bio={w.bio} links={data.person.links} class="lg:self-start [&_[data-slot=avatar-fallback]]:uppercase" />
				<ExperienceRail roles={w.roles} kicker={w.rail.kicker} class="min-w-0 lg:pl-6" />
			</div>
		</section>
	</Container>
</div>
