<script lang="ts">
	import { cn } from '$brand/utils.js';
	import Wordmark from '$brand/components/wordmark.svelte';
	import Container from '$brand/blocks/site/container.svelte';
	import LinkColumns from './link-columns.svelte';
	import FamilyRow from './family-row.svelte';
	import SocialLinks from './social-links.svelte';
	import PixelName from './pixel-name.svelte';
	import type { FooterSite } from './sites';

	let { site, here, class: className }: { site: FooterSite; here: string; class?: string } = $props();
</script>

<footer data-pointer-host data-slot="footer-dots" class={cn('relative border-t border-border bg-background text-foreground', className)}>
	<Container size="wide" class="pt-16">
		<div class="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
			<div class="flex flex-col gap-5">
				<a href={here} class="inline-flex items-baseline gap-2 self-start rounded-sm text-2xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
					<Wordmark name={site.name} />
					{#if site.maker}<span class="text-base text-foreground/80">{site.maker}</span>{/if}
				</a>
				<p class="max-w-[36ch] text-[17px] leading-snug">{site.tagline}</p>
				{#if site.status}
					<span class="inline-flex items-center gap-2 self-start rounded-md border border-border px-2.5 py-1 font-mono text-[11px] tracking-[0.08em] uppercase">
						<i class="size-1.5 rounded-full bg-green motion-safe:animate-pulse"></i>{site.status}
					</span>
				{/if}
			</div>
			<LinkColumns columns={site.columns} {here} />
		</div>
		<FamilyRow site={site.id} class="mt-14 border-t border-border pt-8" />
	</Container>

	<Container size="wide" class="mt-10">
		<div class="border-t border-border pt-8">
			<PixelName text={site.name} look="dots" pitch={9} min={5} cols={140} reach={130} class="aspect-[5.4/1]" />
		</div>
	</Container>

	<Container size="wide" class="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 pt-6 pb-10 font-mono text-[12px]">
		<span class="text-muted-foreground">{site.legal}</span>
		<SocialLinks links={site.socials} {here} />
	</Container>
</footer>
