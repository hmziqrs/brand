<!-- A playful footer that opens on the site's name built from ■ □ ○ ◎ glyphs, which the cursor
     pushes apart and heats into oxide squares, with calm columns, the family and icon links
     underneath. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import Container from "$brand/blocks/site/container.svelte";
	import Wordmark from "$brand/components/wordmark.svelte";
	import PixelName from "$brand/components/pixel-name.svelte";
	import FooterColumns, { type FooterColumn } from "$brand/components/footer-columns.svelte";
	import FooterFamily from "$brand/components/footer-family.svelte";
	import FooterSocials from "$brand/components/footer-socials.svelte";
	import { footerLabel } from "$brand/components/footer-ui.js";

	let {
		site,
		/** After the wordmark in small type: "by hmziq". */
		maker,
		/** Where the wordmark links to. */
		href = "/",
		tagline,
		columns,
		/** A mono oxide label above the name. */
		eyebrow,
		/** Across from the eyebrow, from sm up. */
		hint = "Run the cursor through the name",
		/** Icon links: GitHub, X, YouTube, … */
		socials = [],
		legal = "© 2026 hmziq",
		class: className,
	}: {
		site: string;
		maker?: string;
		href?: string;
		tagline: string;
		columns: FooterColumn[];
		eyebrow?: string;
		hint?: string;
		socials?: { label: string; href: string }[];
		legal?: string;
		class?: string;
	} = $props();
</script>

<footer data-slot="glyph-footer" class={cn("relative border-t border-border bg-background text-foreground", className)}>
	<div data-pointer-host>
		<Container size="wide" class="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 pt-10">
			{#if eyebrow}<p class={footerLabel}>{eyebrow}</p>{/if}
			{#if hint}<p class="hidden font-mono text-[11px] tracking-[0.08em] text-foreground/80 uppercase sm:block">{hint}</p>{/if}
		</Container>
		<Container size="wide" class="pt-6 pb-4">
			<PixelName text={site} look="glyphs" pitch={14} min={6} cols={90} reach={120} class="aspect-[2.4/1] sm:aspect-[3.6/1]" />
		</Container>
	</div>

	<Container size="wide">
		<div class="grid gap-12 border-t border-border pt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
			<div class="flex flex-col gap-5">
				<a {href} class="inline-flex items-baseline gap-2 self-start rounded-sm text-2xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
					<Wordmark name={site} />
					{#if maker}<span class="text-base text-foreground/80">{maker}</span>{/if}
				</a>
				<p class="max-w-[38ch] text-[17px] leading-snug">{tagline}</p>
			</div>
			<FooterColumns {columns} />
		</div>
		<FooterFamily {site} class="mt-14 border-t border-border pt-8" />
	</Container>

	<Container size="wide" class="pb-10">
		<div class="mt-12 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-border pt-6 text-[13px]">
			<span class="text-muted-foreground">{legal}</span>
			{#if socials.length}<FooterSocials links={socials} />{/if}
		</div>
	</Container>
</footer>
