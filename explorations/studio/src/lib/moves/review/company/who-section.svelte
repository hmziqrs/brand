<script lang="ts">
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
	import { cn } from '$brand/utils.js';
	import PersonCard from '$brand/components/person-card.svelte';
	import SectionHead from '$brand/blocks/sections/section-head.svelte';
	import ButtonLink from '$brand/blocks/site/button-link.svelte';
	import { about, person } from './content';

	let { here = '#', class: className }: { here?: string; class?: string } = $props();
	const w = about.who;
</script>

<section data-slot="who-section" class={className}>
	<div class="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
		<SectionHead kicker={w.kicker} title={w.title} layout="stack" titleClass="max-w-[14ch]" />
		<div class="flex min-w-0 flex-col gap-6">
			<p class="text-[clamp(1.125rem,1.6vw,1.375rem)] leading-snug text-foreground">{w.body}</p>
			<div class="flex flex-wrap gap-3">
				<ButtonLink href={here} variant="outline">{w.links.work}</ButtonLink>
				<ButtonLink href={person.cv} variant="outline" target="_blank" rel="noreferrer">{w.links.cv}<ArrowUpRight class="lucide" data-icon="inline-end" /></ButtonLink>
			</div>
		</div>
	</div>

	<div class="mt-16 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,3fr)]">
		<PersonCard name={person.name} role={`${person.role} · ${person.years}`} bio={w.bio} links={person.links} class="lg:self-start [&_[data-slot=avatar-fallback]]:uppercase" />
		<div class="min-w-0 lg:pl-6">
			<p class="font-mono text-xs tracking-[0.14em] text-primary uppercase">{w.rail.kicker}</p>
			<ol class="relative mt-8 grid gap-x-8 gap-y-12 overflow-hidden sm:grid-cols-2 xl:grid-cols-3">
				{#each w.roles as r (r.org)}
					<li class="relative min-w-0 pt-7">
						<span aria-hidden="true" class="absolute top-[7px] -right-8 left-0 h-px bg-border"></span>
						<span aria-hidden="true" class={cn('absolute top-0 left-0 size-[15px] rounded-full border bg-background', r.now ? 'border-primary' : 'border-foreground/45')}></span>
						<p class="text-[clamp(2.25rem,3.6vw,3.25rem)] leading-none font-medium tracking-[-0.04em] text-foreground tabular-nums">{r.year}</p>
						<p class="mt-3 font-mono text-[11px] tracking-[0.12em] uppercase {r.now ? 'text-primary' : 'text-foreground/75'}">{r.dates}</p>
						<p class="mt-2 text-[1.0625rem] font-medium text-foreground">{r.org}</p>
						<p class="text-sm text-foreground/80">{r.role}</p>
						<p class="mt-2 text-[0.95rem] leading-snug text-foreground/85">{r.line}</p>
					</li>
				{/each}
			</ol>
		</div>
	</div>
</section>
