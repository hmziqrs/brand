<!-- A site's 404 page: the status, title and way home on the left, and the status drawn in dots on the right that
     fly in, push away from the cursor and heat to oxide; below, the pages that answer most of what brings people
     here as thin-ring picture cards. -->
<script lang="ts">
	import type { NotFoundPageData } from '@hmziq/brand-core/not-found-page';
	import ArrowLeft from '@lucide/svelte/icons/arrow-left';
	import { cn } from '$brand/utils.js';
	import Container from '$brand/blocks/site/container.svelte';
	import ButtonLink from '$brand/blocks/site/button-link.svelte';
	import DotName from '$brand/components/dot-name.svelte';
	import PictureCard from '$brand/components/picture-card.svelte';
	import InlineCode from '$brand/components/inline-code.svelte';

	let { data, class: className }: { data: NotFoundPageData; class?: string } = $props();
</script>

<div data-slot="not-found-page" class={cn('pb-24 md:pb-32', className)}>
	<section data-pointer-host aria-labelledby="nf-title" class="relative">
		<Container size="wide" class="grid min-h-[min(74svh,720px)] items-center gap-x-16 gap-y-12 pt-16 pb-12 md:pt-20 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
			<div class="min-w-0">
				<p class="font-mono text-xs tracking-[0.14em] text-primary uppercase">{data.status} · {data.host}</p>
				<h1 id="nf-title" class="mt-6 text-[clamp(3rem,7.4vw,6.75rem)] leading-[0.94] font-semibold tracking-[-0.05em] text-balance text-foreground">{data.title}</h1>
				<p class="mt-8 max-w-[32rem] text-[clamp(1.125rem,1.6vw,1.375rem)] leading-snug text-pretty text-foreground">{data.lede}</p>
				<div class="mt-10 flex flex-wrap gap-3">
					<ButtonLink href={data.home.href} size="lg" class="px-5"><ArrowLeft class="lucide" data-icon="inline-start" />{data.home.label}</ButtonLink>
					<ButtonLink href={data.docs.href} size="lg" variant="outline" class="px-5">{data.docs.label}</ButtonLink>
				</div>
			</div>
			<div class="min-w-0">
				<DotName word={data.status} label={`${data.status}, ${data.title}`} class="mx-auto w-[min(100%,620px)] cursor-crosshair" />
				<p class="relative -mt-[10%] text-center font-mono text-xs tracking-[0.08em] text-foreground/70">{data.hint}</p>
			</div>
		</Container>
	</section>

	<Container size="wide" class="mt-10 md:mt-16">
		<div class="flex flex-wrap items-end justify-between gap-x-10 gap-y-4 border-t border-border pt-10">
			<h2 class="text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.05] font-medium tracking-[-0.035em] text-foreground">{data.next.title}</h2>
			<p class="max-w-[34rem] text-lg leading-snug text-foreground/85"><InlineCode>{data.next.command}</InlineCode> {data.next.line}</p>
		</div>
		<ul class="mt-10 grid gap-4 md:grid-cols-2">
			{#each data.next.pages as p (p.title)}
				<li class="flex min-w-0"><PictureCard title={p.title} dek={p.dek} meta={p.meta} href={p.href} as="h3" class="w-full" /></li>
			{/each}
		</ul>
	</Container>
</div>
