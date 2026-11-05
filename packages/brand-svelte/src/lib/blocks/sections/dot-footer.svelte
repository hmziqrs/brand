<!-- A plain footer that ends on the site's name as a full dot matrix: lit dots spell it, and the
     dots swell and heat to oxide around the cursor. Columns, the family, an optional status pill
     and icon links. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import Container from "$brand/blocks/site/container.svelte";
	import Wordmark from "$brand/components/wordmark.svelte";
	import PixelName from "$brand/components/pixel-name.svelte";
	import FooterColumns, { type FooterColumn } from "$brand/components/footer-columns.svelte";
	import FooterFamily from "$brand/components/footer-family.svelte";
	import FooterSocials from "$brand/components/footer-socials.svelte";

	let {
		site,
		/** After the wordmark in small type: "by hmziq". */
		maker,
		/** Where the wordmark links to. */
		href = "/",
		tagline,
		columns,
		/** A pill under the tagline with a pulsing green dot: "All checks green". */
		status,
		/** Icon links: GitHub, X, RSS, … */
		socials = [],
		legal = "© 2026 hmziq",
		class: className,
	}: {
		site: string;
		maker?: string;
		href?: string;
		tagline: string;
		columns: FooterColumn[];
		status?: string;
		socials?: { label: string; href: string }[];
		legal?: string;
		class?: string;
	} = $props();
</script>

<footer data-pointer-host data-slot="dot-footer" class={cn("relative border-t border-border bg-background text-foreground", className)}>
	<Container size="wide" class="pt-16">
		<div class="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
			<div class="flex flex-col gap-5">
				<a {href} class="inline-flex items-baseline gap-2 self-start rounded-sm text-2xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
					<Wordmark name={site} />
					{#if maker}<span class="text-base text-foreground/80">{maker}</span>{/if}
				</a>
				<p class="max-w-[36ch] text-[17px] leading-snug">{tagline}</p>
				{#if status}
					<span class="inline-flex items-center gap-2 self-start rounded-md border border-border px-2.5 py-1 font-mono text-[11px] tracking-[0.08em] uppercase">
						<i class="size-1.5 rounded-full bg-green motion-safe:animate-pulse"></i>{status}
					</span>
				{/if}
			</div>
			<FooterColumns {columns} />
		</div>
		<FooterFamily {site} class="mt-14 border-t border-border pt-8" />
	</Container>

	<Container size="wide" class="mt-10">
		<div class="border-t border-border pt-8">
			<PixelName text={site} look="dots" pitch={9} min={5} cols={140} reach={130} class="aspect-[5.4/1]" />
		</div>
	</Container>

	<Container size="wide" class="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 pt-6 pb-10 font-mono text-[12px]">
		<span class="text-muted-foreground">{legal}</span>
		{#if socials.length}<FooterSocials links={socials} />{/if}
	</Container>
</footer>
