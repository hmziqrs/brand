<script lang="ts">
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import { cn } from '$brand/utils.js';
	import Wordmark from '$brand/components/wordmark.svelte';
	import CommandBox from '$brand/components/command-box.svelte';
	import Container from '$brand/blocks/site/container.svelte';
	import { Button } from '$brand/ui/button/index.js';
	import VoxelRelief from '$moves/specimens/voxel-relief.svelte';
	import LinkColumns from './link-columns.svelte';
	import FamilyRow from './family-row.svelte';
	import SocialLinks from './social-links.svelte';
	import type { FooterSite } from './sites';
	import { label } from './ui';

	let { site, here, class: className }: { site: FooterSite; here: string; class?: string } = $props();
</script>

<footer data-slot="footer-voxel" class={cn('relative border-t border-border bg-background text-foreground', className)}>
	<div data-pointer-host class="relative isolate overflow-hidden border-b border-border">
		<div aria-hidden="true" class="absolute inset-0 -z-20"><VoxelRelief size={22} reach={150} lift={72} quiet /></div>
		<div aria-hidden="true" class="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,color-mix(in_oklab,var(--background)_90%,transparent),color-mix(in_oklab,var(--background)_55%,transparent))] lg:bg-[linear-gradient(to_right,var(--background)_0%,color-mix(in_oklab,var(--background)_90%,transparent)_36%,transparent_68%)]"></div>
		<Container size="wide" class="flex min-h-[clamp(320px,30vw,420px)] flex-col justify-center gap-6 py-16">
			<p class={label}>{site.aside}</p>
			{#if site.cta}<h2 class="max-w-[14ch] text-[clamp(2.25rem,5vw,4rem)] leading-[1] font-medium tracking-[-0.035em] text-balance">{site.cta.title}</h2>{/if}
			{#if site.command}<CommandBox command={site.command} class="w-full max-w-xl bg-background" />{/if}
			{#if site.cta}
				<div class="flex flex-wrap gap-3">
					<Button href={here} size="lg">{site.cta.primary}<ArrowRight class="lucide" data-icon="inline-end" /></Button>
					<Button href={here} size="lg" variant="outline">{site.cta.secondary}</Button>
				</div>
			{/if}
		</Container>
	</div>

	<Container size="wide" class="pt-14">
		<div class="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
			<div class="flex flex-col gap-5">
				<a href={here} class="inline-flex items-baseline gap-2 self-start rounded-sm text-2xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
					<Wordmark name={site.name} />
					{#if site.maker}<span class="text-base text-foreground/80">{site.maker}</span>{/if}
				</a>
				<p class="max-w-[34ch] text-[17px] leading-snug">{site.tagline}</p>
			</div>
			<LinkColumns columns={site.columns} {here} />
		</div>
		<FamilyRow site={site.id} class="mt-14 border-t border-border pt-8" />
		<div class="mt-12 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-border pt-6 pb-10 text-[13px]">
			<span class="text-muted-foreground">{site.legal}</span>
			<SocialLinks links={site.socials} {here} />
		</div>
	</Container>
</footer>
