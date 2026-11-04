<script lang="ts">
	import { cn } from '$brand/utils.js';
	import Container from '$brand/blocks/site/container.svelte';
	import SectionHead from '$brand/blocks/sections/section-head.svelte';
	import ChannelCards from './channel-cards.svelte';
	import PersonLine from './person-line.svelte';
	import BriefForm from './brief-form.svelte';
	import HowWeWork from './how-we-work.svelte';
	import QuestionsBlock from './questions-block.svelte';
	import { contact } from './content';

	let { class: className }: { class?: string; here?: string } = $props();

	const b = contact.brief;
	const lead = b.title.slice(0, b.title.indexOf(b.accent));
</script>

<div data-slot="contact-brief" class={cn('pb-24 md:pb-32', className)}>
	<Container size="wide" class="grid items-start gap-12 pt-16 md:pt-24 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
		<div class="min-w-0 lg:sticky lg:top-[calc(var(--company-top,0px)+3rem)]">
			<p class="font-mono text-xs tracking-[0.14em] text-primary uppercase">{b.kicker}</p>
			<h1 class="mt-6 text-[clamp(3rem,6.4vw,6rem)] leading-[0.95] font-semibold tracking-[-0.045em] text-balance text-foreground">{lead}<span class="text-primary">{b.accent}</span></h1>
			<p class="mt-8 max-w-[32rem] text-[clamp(1.125rem,1.6vw,1.375rem)] leading-snug text-pretty text-foreground">{b.lede}</p>
			<p class="mt-5 font-mono text-xs tracking-[0.08em] text-foreground/75">{b.chips}</p>
			<PersonLine class="mt-10" />
		</div>
		<BriefForm class="min-w-0" />
	</Container>

	<Container size="wide" class="mt-28 md:mt-40">
		<HowWeWork />
	</Container>

	<Container size="wide" class="mt-24 md:mt-32">
		<SectionHead kicker="› Elsewhere" title="Rather write it yourself?" lede={b.elsewhere} />
		<ChannelCards cols={4} note={contact.replies} class="mt-10" />
	</Container>

	<Container size="wide" class="mt-24 md:mt-32">
		<QuestionsBlock />
	</Container>
</div>
