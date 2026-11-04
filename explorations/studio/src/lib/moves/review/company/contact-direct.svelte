<script lang="ts">
	import { cn } from '$brand/utils.js';
	import Container from '$brand/blocks/site/container.svelte';
	import ChannelCards from './channel-cards.svelte';
	import PersonLine from './person-line.svelte';
	import HowWeWork from './how-we-work.svelte';
	import FactTiles from './fact-tiles.svelte';
	import QuestionsBlock from './questions-block.svelte';
	import { contact } from './content';

	let { class: className }: { class?: string; here?: string } = $props();
</script>

<div data-slot="contact-direct" class={cn('pb-24 md:pb-32', className)}>
	<Container size="wide" class="grid items-start gap-12 pt-16 md:pt-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
		<div class="min-w-0">
			<p class="font-mono text-xs tracking-[0.14em] text-primary uppercase">{contact.kicker}</p>
			<h1 class="mt-6 text-[clamp(3.25rem,8vw,7.5rem)] leading-[0.92] font-semibold tracking-[-0.05em] text-foreground">{contact.title}</h1>
			<p class="mt-8 max-w-[34rem] text-[clamp(1.125rem,1.6vw,1.375rem)] leading-snug text-pretty text-foreground">{contact.lede}</p>
			<PersonLine class="mt-10" />
		</div>
		<div class="min-w-0 lg:pt-3">
			<p class="mb-5 max-w-[34rem] text-lg leading-snug text-foreground">{contact.pick}</p>
			<ChannelCards note={contact.replies} />
		</div>
	</Container>

	<Container size="wide" class="mt-28 md:mt-40">
		<HowWeWork />
	</Container>

	<Container size="wide" class="mt-24 md:mt-32">
		<FactTiles />
	</Container>

	<Container size="wide" class="mt-24 md:mt-32">
		<QuestionsBlock />
	</Container>
</div>
