<!-- The footer as the page's last big moment: always dark, over a blurred copper material under a
     scrim, with an optional closing line and two buttons, the columns and the family, then the
     site's name dithered across the full width, drifting and rusting under the cursor. -->
<script lang="ts">
	import ArrowRight from "@lucide/svelte/icons/arrow-right";
	import { cn } from "$brand/utils.js";
	import { Button } from "$brand/ui/button/index.js";
	import Container from "$brand/blocks/site/container.svelte";
	import ShaderMaterial from "$brand/components/shader-material.svelte";
	import Wordmark from "$brand/components/wordmark.svelte";
	import DitherName from "$brand/components/dither-name.svelte";
	import FooterColumns, { type FooterColumn } from "$brand/components/footer-columns.svelte";
	import FooterFamily from "$brand/components/footer-family.svelte";

	let {
		site,
		/** After the wordmark in small type: "studio", "by hmziq". */
		maker,
		/** Where the wordmark links to. */
		href = "/",
		tagline,
		columns,
		/** The closing line over the columns, with its main button and an optional outline one. */
		cta,
		/** A line under the tagline with a green dot: "Available for new projects". */
		status,
		legal = "© 2026 hmziq",
		/** Across from the legal line, in mono capitals. */
		aside,
		/** The material behind it. */
		preset = "folded-foil",
		class: className,
	}: {
		site: string;
		maker?: string;
		href?: string;
		tagline: string;
		columns: FooterColumn[];
		cta?: { title: string; primary: { label: string; href: string }; secondary?: { label: string; href: string } };
		status?: string;
		legal?: string;
		aside?: string;
		preset?: string;
		class?: string;
	} = $props();
</script>

<footer data-slot="material-footer" class={cn("dark relative isolate overflow-hidden bg-background text-foreground", className)}>
	<div aria-hidden="true" class="absolute inset-0 -z-10">
		<div class="absolute -inset-10 [filter:blur(10px)_brightness(0.7)_saturate(1.2)]">
			<ShaderMaterial {preset} rendering="image" controls={false} sizes="100vw" opacity={0.85} class="absolute inset-0 h-full w-full" />
		</div>
		<div class="absolute inset-0 bg-[linear-gradient(to_bottom,var(--background)_0%,color-mix(in_oklab,var(--background)_76%,transparent)_34%,color-mix(in_oklab,var(--background)_38%,transparent)_72%,color-mix(in_oklab,var(--background)_22%,transparent))]"></div>
	</div>

	<Container size="wide" class="pt-16 sm:pt-20">
		{#if cta}
			<div class="flex flex-wrap items-end justify-between gap-x-10 gap-y-6 border-b border-border pb-12">
				<h2 class="max-w-[16ch] text-[clamp(2.25rem,5vw,4rem)] leading-[1] font-medium tracking-[-0.035em] text-balance">{cta.title}</h2>
				<div class="flex flex-wrap gap-3">
					<Button href={cta.primary.href} size="lg">{cta.primary.label}<ArrowRight class="lucide" data-icon="inline-end" /></Button>
					{#if cta.secondary}<Button href={cta.secondary.href} size="lg" variant="outline">{cta.secondary.label}</Button>{/if}
				</div>
			</div>
		{/if}
		<div class="grid gap-12 pt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)]">
			<div class="flex flex-col gap-5">
				<a {href} class="inline-flex items-baseline gap-2 self-start rounded-sm text-2xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
					<Wordmark name={site} />
					{#if maker}<span class="text-base text-foreground/80">{maker}</span>{/if}
				</a>
				<p class="max-w-[34ch] text-lg leading-snug">{tagline}</p>
				{#if status}
					<p class="inline-flex items-center gap-2 self-start font-mono text-[11px] tracking-[0.08em] uppercase"><i class="size-1.5 shrink-0 rounded-full bg-green"></i>{status}</p>
				{/if}
			</div>
			<FooterColumns {columns} class="sm:grid-cols-4" linkClass="[text-shadow:0_1px_12px_var(--background)]" />
		</div>
		<FooterFamily {site} class="mt-14 border-t border-border pt-8" />
	</Container>

	<Container size="wide" class="mt-14">
		<DitherName name={site} block={6} animate />
	</Container>

	<Container size="wide" class="flex flex-wrap items-center justify-between gap-3 pt-4 pb-8 text-[13px]">
		<span>{legal}</span>
		{#if aside}<span class="font-mono text-[11px] tracking-[0.08em] uppercase">{aside}</span>{/if}
	</Container>
</footer>
