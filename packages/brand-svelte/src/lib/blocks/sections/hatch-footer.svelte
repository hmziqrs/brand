<!-- A personal footer that closes the page the way the personal hero opens it: the columns and the
     family up top, then a band of the diagonal hatch around the name in the dot font, both bending
     away from the cursor. An optional contact button and icon links. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import { Button } from "$brand/ui/button/index.js";
	import Container from "$brand/blocks/site/container.svelte";
	import Wordmark from "$brand/components/wordmark.svelte";
	import DotName from "$brand/components/dot-name.svelte";
	import DiagonalHatch from "$brand/components/diagonal-hatch.svelte";
	import FooterColumns, { type FooterColumn } from "$brand/components/footer-columns.svelte";
	import FooterFamily from "$brand/components/footer-family.svelte";
	import FooterSocials from "$brand/components/footer-socials.svelte";

	let {
		/** The name: the wordmark, and the dot name (lowercase letters, digits, - . > _ and ■). */
		site,
		/** After the wordmark in small type. */
		maker,
		/** Where the wordmark links to. */
		href = "/",
		tagline,
		columns,
		/** An outline button under the tagline: "Get in touch". */
		contact,
		/** Icon links: GitHub, LinkedIn, X, Email, … */
		socials = [],
		legal = "© 2026 hmziq",
		class: className,
	}: {
		site: string;
		maker?: string;
		href?: string;
		tagline: string;
		columns: FooterColumn[];
		contact?: { label: string; href: string };
		socials?: { label: string; href: string }[];
		legal?: string;
		class?: string;
	} = $props();
</script>

<footer data-slot="hatch-footer" class={cn("relative border-t border-border bg-background text-foreground", className)}>
	<Container size="wide" class="pt-14 sm:pt-16">
		<div class="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
			<div class="flex flex-col gap-5">
				<a {href} class="inline-flex items-baseline gap-2 self-start rounded-sm text-2xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
					<Wordmark name={site} />
					{#if maker}<span class="text-base text-foreground/80">{maker}</span>{/if}
				</a>
				<p class="max-w-[36ch] text-[17px] leading-snug">{tagline}</p>
				{#if contact}<Button href={contact.href} variant="outline" class="self-start">{contact.label}</Button>{/if}
			</div>
			<FooterColumns {columns} />
		</div>
		<FooterFamily {site} class="mt-14 border-t border-border pt-8" />
	</Container>

	<div data-pointer-host class="relative isolate mt-14 overflow-hidden border-t border-border">
		<DiagonalHatch variant="frame" class="-z-10 opacity-60" />
		<Container size="wide" class="py-12 sm:py-16">
			<DotName word={site} class="mx-auto w-[min(100%,820px)]" />
		</Container>
	</div>

	<Container size="wide" class="pb-10">
		<div class="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-border pt-6 text-[13px]">
			<span class="text-muted-foreground">{legal}</span>
			{#if socials.length}<FooterSocials links={socials} />{/if}
		</div>
	</Container>
</footer>
