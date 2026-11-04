<script lang="ts">
	import { cn } from '$brand/utils.js';
	import Container from '$brand/blocks/site/container.svelte';
	import Tag from '$brand/components/tag.svelte';
	import LineArt from '$brand/components/line-art.svelte';
	import CornerRings from '$brand/components/corner-rings.svelte';
	import MaterialCard from '$brand/components/material-card.svelte';
	import StatTile from '$brand/components/stat-tile.svelte';
	import PrincipleCards from './principle-cards.svelte';
	import StackCards from './stack-cards.svelte';
	import WhoSection from './who-section.svelte';
	import { about } from './content';

	let { here = '#', class: className }: { here?: string; class?: string } = $props();

	const lead = about.title.slice(0, about.title.indexOf(about.accent));
	const b = about.believe;
</script>

<div data-slot="about-bento" class={cn('pb-24 md:pb-32', className)}>
	<Container size="wide" class="pt-16 md:pt-24">
		<div class="grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
			<div class="min-w-0">
				<p class="font-mono text-xs tracking-[0.14em] text-primary uppercase">{about.kicker}</p>
				<h1 class="mt-6 max-w-[11ch] text-[clamp(3.25rem,8vw,7.5rem)] leading-[0.92] font-semibold tracking-[-0.05em] text-foreground">{lead}<span class="text-primary">{about.accent}</span></h1>
			</div>
			<p class="max-w-[34rem] text-[clamp(1.125rem,1.6vw,1.375rem)] leading-snug text-pretty text-foreground lg:pb-3">{about.lede}</p>
		</div>

		<p class="mt-20 font-mono text-xs tracking-[0.14em] text-primary uppercase md:mt-28">{b.kicker} · {b.title}</p>
		<div class="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
			<article class="band-orange relative isolate flex min-h-[24rem] flex-col justify-end overflow-hidden rounded-2xl p-7 sm:p-9 md:col-span-2 lg:row-span-2 lg:min-h-[34rem]">
				<CornerRings seed="oxlabs what we believe" color="var(--on-orange)" class="-z-10 w-[55%] opacity-60 [&_circle]:[stroke-width:0.5]" />
				<p class="max-w-[22ch] text-[clamp(1.75rem,3.2vw,2.75rem)] leading-[1.08] font-medium tracking-[-0.03em] text-balance">{b.lead.before}{b.lead.hit}</p>
				<p class="mt-6 text-lg">{b.lead.after.trim()}</p>
			</article>
			<MaterialCard title={b.small.title} body={b.small.body} preset="oxide-bloom" class="min-h-[18rem] md:col-span-2 [&_h3]:text-[1.5rem] [&_h3]:tracking-[-0.025em] [&_p]:text-base [&_p]:text-foreground" />
			{#each about.stats as s (s.value)}
				<StatTile value={s.value} label={s.label} accent={s.value === 'Four'} />
			{/each}
			<article class="flex min-h-[20rem] flex-col gap-3 rounded-2xl p-7 ring-1 ring-foreground/10 md:col-span-2">
				<span class="flex flex-wrap gap-1.5"><Tag tone="blue">PostgreSQL</Tag><Tag tone="orange">Rust</Tag></span>
				<h3 class="mt-auto pt-8 text-[1.5rem] leading-tight font-medium tracking-[-0.025em] text-balance">{b.tools.title}</h3>
				<p class="text-base leading-snug text-foreground/85">{b.tools.body}</p>
			</article>
			<article data-line-art-host class="flex min-h-[20rem] flex-col gap-3 rounded-2xl p-7 ring-1 ring-foreground/10 md:col-span-2 lg:flex-row lg:items-center lg:gap-8">
				<span class="relative block aspect-[16/10] w-full shrink-0 overflow-hidden rounded-xl ring-1 ring-foreground/10 lg:w-[46%]"><LineArt kind="plan" /></span>
				<span class="flex min-w-0 flex-col gap-3 pt-4 lg:pt-0">
					<h3 class="text-[1.5rem] leading-tight font-medium tracking-[-0.025em]">{b.write.title}</h3>
					<p class="text-base leading-snug text-foreground/85">{b.write.body}</p>
				</span>
			</article>
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
