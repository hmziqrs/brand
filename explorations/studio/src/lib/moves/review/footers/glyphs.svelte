<script lang="ts">
	import { cn } from '$brand/utils.js';
	import Wordmark from '$brand/components/wordmark.svelte';
	import Container from '$brand/blocks/site/container.svelte';
	import LinkColumns from './link-columns.svelte';
	import FamilyRow from './family-row.svelte';
	import SocialLinks from './social-links.svelte';
	import PixelName from './pixel-name.svelte';
	import type { FooterSite } from './sites';
	import { label } from './ui';

	let { site, here, class: className }: { site: FooterSite; here: string; class?: string } = $props();
</script>

<footer data-slot="footer-glyphs" class={cn('relative border-t border-border bg-background text-foreground', className)}>
	<div data-pointer-host>
		<Container size="wide" class="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 pt-10">
			<p class={label}>hmziq labs · {site.aside.toLowerCase()}</p>
			<p class="hidden font-mono text-[11px] tracking-[0.08em] text-foreground/80 uppercase sm:block">Run the cursor through the name</p>
		</Container>
		<Container size="wide" class="pt-6 pb-4">
			<PixelName text={site.name} look="glyphs" pitch={14} min={6} cols={90} reach={120} class="aspect-[2.4/1] sm:aspect-[3.6/1]" />
		</Container>
	</div>

	<Container size="wide">
		<div class="grid gap-12 border-t border-border pt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
			<div class="flex flex-col gap-5">
				<a href={here} class="inline-flex items-baseline gap-2 self-start rounded-sm text-2xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
					<Wordmark name={site.name} />
					{#if site.maker}<span class="text-base text-foreground/80">{site.maker}</span>{/if}
				</a>
				<p class="max-w-[38ch] text-[17px] leading-snug">{site.tagline}</p>
			</div>
			<LinkColumns columns={site.columns} {here} />
		</div>
		<FamilyRow site={site.id} class="mt-14 border-t border-border pt-8" />
	</Container>

	<Container size="wide" class="pb-10">
		<div class="mt-12 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-border pt-6 text-[13px]">
			<span class="text-muted-foreground">{site.legal}</span>
			<SocialLinks links={site.socials} {here} />
		</div>
	</Container>
</footer>
