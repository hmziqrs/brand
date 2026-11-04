<script lang="ts">
	import { cn } from '$brand/utils.js';
	import Container from '$brand/blocks/site/container.svelte';
	import SectionHead from '$brand/blocks/sections/section-head.svelte';
	import MaterialGrid from '$brand/components/material-grid.svelte';
	import Glass from '$brand/components/glass.svelte';
	import PrincipleCards from './principle-cards.svelte';
	import StackCards from './stack-cards.svelte';
	import WhoSection from './who-section.svelte';
	import { about } from './content';

	let { here = '#', class: className }: { here?: string; class?: string } = $props();

	const lead = about.title.slice(0, about.title.indexOf(about.accent));
	const b = about.believe;
</script>

<div data-slot="about-essay" class={cn('pb-24 md:pb-32', className)}>
	<section data-pointer-host class="relative isolate overflow-hidden border-b border-border">
		<MaterialGrid />
		<Container size="wide" class="relative py-24 md:py-32 lg:py-40">
			<Glass variant="clear" as="p" class="inline-flex rounded-full px-3 py-1.5 font-mono text-xs tracking-[0.14em] text-primary uppercase">{about.kicker}</Glass>
			<h1 class="mt-6 max-w-[11ch] text-[clamp(3.25rem,8.4vw,8.25rem)] leading-[0.9] font-semibold tracking-[-0.05em] text-foreground [text-shadow:0_2px_40px_var(--background),0_0_14px_var(--background)]">{lead}<span class="text-primary">{about.accent}</span></h1>
			<Glass class="mt-12 max-w-[40rem] rounded-2xl p-6 sm:p-7">
				<p class="text-[clamp(1.125rem,1.6vw,1.375rem)] leading-snug text-pretty text-foreground">{about.lede}</p>
			</Glass>
		</Container>
	</section>

	<Container size="wide" class="mt-24 grid gap-10 md:mt-32 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
		<SectionHead kicker={b.kicker} title={b.title} layout="stack" titleClass="max-w-[13ch]" class="lg:sticky lg:top-[calc(var(--company-top,0px)+2rem)] lg:self-start" />
		<div class="flex min-w-0 flex-col gap-8 text-[clamp(1.25rem,1.9vw,1.625rem)] leading-[1.4] tracking-[-0.01em] text-foreground">
			<p>{b.lead.before}<span class="font-medium text-primary">{b.lead.hit}</span>{b.lead.after}</p>
			<p>{b.small.title} {b.small.body}</p>
			<p>{b.tools.title} {b.tools.body}</p>
			<p>{b.write.title} {b.write.body}</p>
		</div>
	</Container>

	<Container size="wide" class="mt-28 md:mt-40">
		<PrincipleCards />
	</Container>

	<Container size="wide" class="mt-28 md:mt-40">
		<StackCards {here} />
	</Container>

	<Container size="wide" class="mt-28 md:mt-40">
		<WhoSection {here} />
	</Container>
</div>
