<script lang="ts">
	import { cn } from '$brand/utils.js';
	import Wordmark from '$brand/components/wordmark.svelte';
	import CommandBox from '$brand/components/command-box.svelte';
	import Container from '$brand/blocks/site/container.svelte';
	import LinkColumns from './link-columns.svelte';
	import FamilyRow from './family-row.svelte';
	import SocialLinks from './social-links.svelte';
	import FitWordmark from './fit-wordmark.svelte';
	import HeatField from './heat-field.svelte';
	import type { FooterSite } from './sites';

	let { site, here, class: className }: { site: FooterSite; here: string; class?: string } = $props();
</script>

<footer data-slot="footer-heat" class={cn('relative overflow-hidden border-t border-border bg-background text-foreground', className)}>
	<Container size="wide" class="pt-16">
		<div class="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
			<div class="flex flex-col gap-5">
				<a href={here} class="inline-flex items-baseline gap-2 self-start rounded-sm text-2xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
					<Wordmark name={site.name} />
					{#if site.maker}<span class="text-base text-foreground/80">{site.maker}</span>{/if}
				</a>
				<p class="max-w-[34ch] text-[17px] leading-snug">{site.tagline}</p>
				{#if site.command}<CommandBox command={site.command} class="w-full max-w-sm bg-background" />{/if}
				{#if site.status}
					<a href={here} class="inline-flex items-center gap-2 self-start rounded-md border border-border px-2.5 py-1 font-mono text-[11px] tracking-[0.08em] uppercase transition-colors hover:border-primary motion-reduce:transition-none">
						<i class="size-1.5 rounded-full bg-green"></i>{site.status}
					</a>
				{/if}
			</div>
			<LinkColumns columns={site.columns} {here} />
		</div>
		<FamilyRow site={site.id} class="mt-14 border-t border-border pt-8" />
	</Container>

	<div class="relative mt-6">
		<div class="relative h-[clamp(150px,21vw,300px)]">
			<HeatField class="[mask-image:linear-gradient(to_bottom,black_58%,transparent)]" />
		</div>
		<Container size="wide" class="relative -mt-[clamp(52px,9.6vw,136px)]">
			<FitWordmark name={site.name} max={250} />
		</Container>
		<Container size="wide" class="relative flex flex-wrap items-center justify-between gap-x-6 gap-y-3 pt-8 pb-12 font-mono text-[12px]">
			<span class="text-muted-foreground">{site.legal} · {site.aside}</span>
			<SocialLinks links={site.socials} {here} />
		</Container>
	</div>
</footer>
