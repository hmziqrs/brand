<script lang="ts">
	import { cn } from '$brand/utils.js';
	import Wordmark from '$brand/components/wordmark.svelte';
	import DotName from '$brand/components/dot-name.svelte';
	import DiagonalHatch from '$brand/components/diagonal-hatch.svelte';
	import Container from '$brand/blocks/site/container.svelte';
	import { Button } from '$brand/ui/button/index.js';
	import LinkColumns from './link-columns.svelte';
	import FamilyRow from './family-row.svelte';
	import SocialLinks from './social-links.svelte';
	import type { FooterSite } from './sites';

	let { site, here, class: className }: { site: FooterSite; here: string; class?: string } = $props();
</script>

<footer data-slot="footer-personal" class={cn('relative border-t border-border bg-background text-foreground', className)}>
	<Container size="wide" class="pt-14 sm:pt-16">
		<div class="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
			<div class="flex flex-col gap-5">
				<a href={here} class="inline-flex items-baseline gap-2 self-start rounded-sm text-2xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
					<Wordmark name={site.name} />
				</a>
				<p class="max-w-[36ch] text-[17px] leading-snug">{site.tagline}</p>
				{#if site.email}<Button href={`mailto:${site.email}`} variant="outline" class="self-start">Get in touch</Button>{/if}
			</div>
			<LinkColumns columns={site.columns} {here} />
		</div>
		<FamilyRow site={site.id} class="mt-14 border-t border-border pt-8" />
	</Container>

	<div data-pointer-host class="relative isolate mt-14 overflow-hidden border-t border-border">
		<DiagonalHatch variant="frame" class="-z-10 opacity-60" />
		<Container size="wide" class="py-12 sm:py-16">
			<DotName word={site.name} class="mx-auto w-[min(100%,820px)]" />
		</Container>
	</div>

	<Container size="wide" class="pb-10">
		<div class="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-border pt-6 text-[13px]">
			<span class="text-muted-foreground">{site.legal}</span>
			<SocialLinks links={site.socials} {here} />
		</div>
	</Container>
</footer>
