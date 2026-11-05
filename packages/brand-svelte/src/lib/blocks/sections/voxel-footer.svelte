<!-- A footer that opens on a full-width voxel field rising into an oxide ridge under the cursor,
     carrying the last call to install: an eyebrow, the closing line, the command and two buttons
     over a reading layer. The columns, the family and icon links follow below. -->
<script lang="ts">
	import ArrowRight from "@lucide/svelte/icons/arrow-right";
	import { cn } from "$brand/utils.js";
	import { Button } from "$brand/ui/button/index.js";
	import Container from "$brand/blocks/site/container.svelte";
	import Wordmark from "$brand/components/wordmark.svelte";
	import CommandBox from "$brand/components/command-box.svelte";
	import VoxelField from "$brand/components/voxel-field.svelte";
	import FooterColumns, { type FooterColumn } from "$brand/components/footer-columns.svelte";
	import FooterFamily from "$brand/components/footer-family.svelte";
	import FooterSocials from "$brand/components/footer-socials.svelte";
	import { footerLabel } from "$brand/components/footer-ui.js";

	let {
		site,
		/** After the wordmark in small type: "by freeoxide". */
		maker,
		/** Where the wordmark links to. */
		href = "/",
		tagline,
		columns,
		/** A mono oxide label above the closing line: the release. */
		eyebrow,
		/** The closing line over the field, with its main button and an optional outline one. */
		cta,
		/** The install command, with a copy button. */
		command,
		/** Icon links: GitHub, X, … */
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
		cta?: { title: string; primary: { label: string; href: string }; secondary?: { label: string; href: string } };
		command?: string;
		socials?: { label: string; href: string }[];
		legal?: string;
		class?: string;
	} = $props();
</script>

<footer data-slot="voxel-footer" class={cn("relative border-t border-border bg-background text-foreground", className)}>
	<div data-pointer-host class="relative isolate overflow-hidden border-b border-border">
		<VoxelField size={22} reach={150} lift={72} quiet class="-z-20" />
		<div aria-hidden="true" class="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,color-mix(in_oklab,var(--background)_90%,transparent),color-mix(in_oklab,var(--background)_55%,transparent))] lg:bg-[linear-gradient(to_right,var(--background)_0%,color-mix(in_oklab,var(--background)_90%,transparent)_36%,transparent_68%)]"></div>
		<Container size="wide" class="flex min-h-[clamp(320px,30vw,420px)] flex-col justify-center gap-6 py-16">
			{#if eyebrow}<p class={footerLabel}>{eyebrow}</p>{/if}
			{#if cta}<h2 class="max-w-[14ch] text-[clamp(2.25rem,5vw,4rem)] leading-[1] font-medium tracking-[-0.035em] text-balance">{cta.title}</h2>{/if}
			{#if command}<CommandBox {command} class="w-full max-w-xl bg-background" />{/if}
			{#if cta}
				<div class="flex flex-wrap gap-3">
					<Button href={cta.primary.href} size="lg">{cta.primary.label}<ArrowRight class="lucide" data-icon="inline-end" /></Button>
					{#if cta.secondary}<Button href={cta.secondary.href} size="lg" variant="outline">{cta.secondary.label}</Button>{/if}
				</div>
			{/if}
		</Container>
	</div>

	<Container size="wide" class="pt-14">
		<div class="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
			<div class="flex flex-col gap-5">
				<a {href} class="inline-flex items-baseline gap-2 self-start rounded-sm text-2xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
					<Wordmark name={site} />
					{#if maker}<span class="text-base text-foreground/80">{maker}</span>{/if}
				</a>
				<p class="max-w-[34ch] text-[17px] leading-snug">{tagline}</p>
			</div>
			<FooterColumns {columns} />
		</div>
		<FooterFamily {site} class="mt-14 border-t border-border pt-8" />
		<div class="mt-12 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-border pt-6 pb-10 text-[13px]">
			<span class="text-muted-foreground">{legal}</span>
			{#if socials.length}<FooterSocials links={socials} />{/if}
		</div>
	</Container>
</footer>
