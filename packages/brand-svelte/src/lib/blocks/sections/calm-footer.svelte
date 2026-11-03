<!-- A quiet footer for reading: the wordmark, one line and an email box, the columns, the family,
     icon links and an optional text link, over a faint hatch that bends toward the cursor. It
     never competes with the text above it. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import { Button } from "$brand/ui/button/index.js";
	import { Input } from "$brand/ui/input/index.js";
	import Container from "$brand/blocks/site/container.svelte";
	import Wordmark from "$brand/components/wordmark.svelte";
	import DiagonalHatch from "$brand/components/diagonal-hatch.svelte";
	import FooterColumns, { type FooterColumn } from "$brand/components/footer-columns.svelte";
	import FooterFamily from "$brand/components/footer-family.svelte";
	import FooterSocials from "$brand/components/footer-socials.svelte";
	import { footerLink } from "$brand/components/footer-ui.js";

	let {
		site,
		/** After the wordmark in small type: "by hmziq". */
		maker,
		/** Where the wordmark links to. */
		href = "/",
		tagline,
		columns,
		/** The line under the email box. */
		note = "One email when a post goes up, nothing else.",
		/** The feed's address: adds "Or follow the RSS feed." to the note. */
		rss,
		/** Icon links: GitHub, X, LinkedIn, … */
		socials = [],
		/** A text link after the icons: "Edit this page on GitHub". */
		edit,
		legal = "© 2026 hmziq",
		class: className,
	}: {
		site: string;
		maker?: string;
		href?: string;
		tagline: string;
		columns: FooterColumn[];
		note?: string;
		rss?: string;
		socials?: { label: string; href: string }[];
		edit?: { label: string; href: string };
		legal?: string;
		class?: string;
	} = $props();

	const field = $derived(`${site}-footer-email`);
</script>

<footer data-slot="calm-footer" data-pointer-host class={cn("relative isolate overflow-hidden border-t border-border bg-background text-foreground", className)}>
	<DiagonalHatch class="-z-10 opacity-35" />
	<Container size="wide" class="pt-14 pb-10 sm:pt-16">
		<div class="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,2fr)]">
			<div class="flex max-w-md flex-col gap-5">
				<a {href} class="inline-flex items-baseline gap-2 self-start rounded-sm text-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
					<Wordmark name={site} />
					{#if maker}<span class="text-[0.8em] text-foreground/80">{maker}</span>{/if}
				</a>
				<p class="text-[15px] leading-relaxed">{tagline}</p>
				<form class="flex gap-2" onsubmit={(e) => e.preventDefault()}>
					<label for={field} class="sr-only">Email</label>
					<Input id={field} type="email" placeholder="you@example.com" autocomplete="email" />
					<Button type="submit" variant="outline">Subscribe</Button>
				</form>
				<p class="text-[13px] text-muted-foreground">{note}{#if rss}{" Or follow the "}<a href={rss} class={cn(footerLink, "text-foreground decoration-foreground/40")}>RSS feed</a>.{/if}</p>
			</div>
			<FooterColumns {columns} />
		</div>

		<FooterFamily {site} class="mt-14 border-t border-border pt-8" />

		<div class="mt-12 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-border pt-6 text-[13px]">
			<span class="text-muted-foreground">{legal}</span>
			<div class="flex flex-wrap items-center gap-x-5 gap-y-2">
				{#if socials.length}<FooterSocials links={socials} />{/if}
				{#if edit}<a href={edit.href} class={footerLink}>{edit.label}</a>{/if}
			</div>
		</div>
	</Container>
</footer>
