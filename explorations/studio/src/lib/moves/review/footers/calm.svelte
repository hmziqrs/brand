<script lang="ts">
	import { cn } from '$brand/utils.js';
	import Wordmark from '$brand/components/wordmark.svelte';
	import Container from '$brand/blocks/site/container.svelte';
	import { Button } from '$brand/ui/button/index.js';
	import { Input } from '$brand/ui/input/index.js';
	import LinkColumns from './link-columns.svelte';
	import FamilyRow from './family-row.svelte';
	import SocialLinks from './social-links.svelte';
	import type { FooterSite } from './sites';
	import { link } from './ui';

	let { site, here, class: className }: { site: FooterSite; here: string; class?: string } = $props();

	const field = $derived(`${site.id}-footer-email`);
</script>

<footer data-slot="footer-calm" class={cn('border-t border-border bg-background text-foreground', className)}>
	<Container size="wide" class="pt-14 pb-10 sm:pt-16">
		<div class="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,2fr)]">
			<div class="flex max-w-md flex-col gap-5">
				<a href={here} class="inline-flex items-baseline gap-2 self-start rounded-sm text-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
					<Wordmark name={site.name} />
					{#if site.maker}<span class="text-[0.8em] text-foreground/80">{site.maker}</span>{/if}
				</a>
				<p class="text-[15px] leading-relaxed">{site.tagline}</p>
				<form class="flex gap-2" onsubmit={(e) => e.preventDefault()}>
					<label for={field} class="sr-only">Email</label>
					<Input id={field} type="email" placeholder="you@example.com" autocomplete="email" />
					<Button type="submit" variant="outline">Subscribe</Button>
				</form>
				<p class="text-[13px] text-muted-foreground">One email when a post goes up, nothing else. Or follow the <a href={here} class={cn(link, 'text-foreground decoration-foreground/40')}>RSS feed</a>.</p>
			</div>
			<LinkColumns columns={site.columns} {here} heading="plain" />
		</div>

		<FamilyRow site={site.id} variant="grid" heading="plain" class="mt-14 border-t border-border pt-10" />

		<div class="mt-12 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-border pt-6 text-[13px]">
			<span class="text-muted-foreground">{site.legal}</span>
			<div class="flex flex-wrap items-center gap-x-5 gap-y-2">
				<SocialLinks links={site.socials} {here} />
				<a href={site.nav.github} class={link}>{site.aside}</a>
			</div>
		</div>
	</Container>
</footer>
