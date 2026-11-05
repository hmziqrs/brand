<!-- The contact page with the way in first: "Get in touch." big, the person who replies, and the channels as
     separate cards beside it with the first in solid oxide. Then the steps beside a 3D book, what working
     together looks like in stat tiles, and the questions. Under the site's own header and footer. -->
<script lang="ts">
	import ArrowUpRight from "@lucide/svelte/icons/arrow-up-right";
	import { cn } from "$brand/utils.js";
	import Container from "./container.svelte";
	import OutlineCard from "./outline-card.svelte";
	import FaqSection from "./faq-section.svelte";
	import ContactChannels from "$brand/blocks/content/contact-channels.svelte";
	import BookSteps from "$brand/blocks/sections/book-steps.svelte";
	import Mark from "$brand/components/mark.svelte";
	import Tag from "$brand/components/tag.svelte";
	import StatTile from "$brand/components/stat-tile.svelte";
	import type { ContactDirectData } from "./company-types.js";

	let { data, class: className }: { data: ContactDirectData; class?: string } = $props();
</script>

<div data-slot="contact-direct" class={cn("pb-24 md:pb-32", className)}>
	<Container size="wide" class="grid items-start gap-12 pt-16 md:pt-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
		<div class="min-w-0">
			<p class="font-mono text-xs tracking-[0.14em] text-primary uppercase">{data.kicker}</p>
			<h1 class="mt-6 text-[clamp(3.25rem,8vw,7.5rem)] leading-[0.92] font-semibold tracking-[-0.05em] text-foreground">{data.title}</h1>
			<p class="mt-8 max-w-[34rem] text-[clamp(1.125rem,1.6vw,1.375rem)] leading-snug text-pretty text-foreground">{data.lede}</p>
			<OutlineCard class="mt-10 w-full max-w-[30rem] flex-row items-center gap-4 px-5 py-4.5">
				<Mark symbol="Hq" size={56} />
				<div class="flex min-w-0 flex-col gap-1.5">
					<b class="font-medium">{data.person.name}</b>
					<span class="text-[0.875rem] text-foreground/80">
						{data.person.role} · {data.person.years} ·
						<a href={data.person.cv} target="_blank" rel="noreferrer" class="inline-flex items-center gap-0.5 text-primary underline underline-offset-3">CV<ArrowUpRight class="lucide size-3.5" /></a>
					</span>
					<Tag tone="green" marker>{data.person.status}</Tag>
				</div>
			</OutlineCard>
		</div>
		<div class="min-w-0 lg:pt-3">
			<p class="mb-5 max-w-[34rem] text-lg leading-snug text-foreground">{data.pick}</p>
			<ContactChannels variant="cards" channels={data.channels} note={data.replies} />
		</div>
	</Container>

	<Container size="wide" class="mt-28 md:mt-40">
		<BookSteps data={data.how} />
	</Container>

	<Container size="wide" class="mt-24 md:mt-32">
		<section data-slot="fact-tiles" aria-label={data.facts.kicker}>
			<p class="font-mono text-xs tracking-[0.14em] text-primary uppercase">{data.facts.kicker}</p>
			<div class="mt-6 grid gap-4 md:grid-cols-3">
				{#each data.facts.items as f (f.value)}
					<StatTile value={f.value} label={f.label} tone={f.oxide ? "oxide" : "outline"} rings={f.oxide ? data.facts.seed : undefined} class="[&>p:first-of-type]:text-[clamp(2.25rem,4.2vw,3.5rem)] [&>p:first-of-type]:leading-[0.98]" />
				{/each}
			</div>
		</section>
	</Container>

	<Container size="wide" class="mt-24 md:mt-32">
		<FaqSection faq={data.faq} kicker={data.faq.kicker} class="[--pricing-top:var(--company-top,0px)]" />
	</Container>
</div>
