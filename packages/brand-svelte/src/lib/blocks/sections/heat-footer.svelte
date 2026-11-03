<!-- An engineered footer: the install command, an optional status link and the columns up top,
     then an oxide dither field rising from the bottom edge that the cursor heats, with the site's
     name standing in it across the full width. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import Container from "$brand/blocks/site/container.svelte";
	import Wordmark from "$brand/components/wordmark.svelte";
	import CommandBox from "$brand/components/command-box.svelte";
	import HeatField from "$brand/components/heat-field.svelte";
	import FitWordmark from "$brand/components/fit-wordmark.svelte";
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
		/** The install command, with a copy button. */
		command,
		/** A pill link under the command with a green dot: the latest release. */
		status,
		/** Icon links: GitHub, X, … */
		socials = [],
		legal = "© 2026 hmziq",
		/** After the legal line: "Not affiliated with …". */
		aside,
		class: className,
	}: {
		site: string;
		maker?: string;
		href?: string;
		tagline: string;
		columns: FooterColumn[];
		command?: string;
		status?: { label: string; href: string };
		socials?: { label: string; href: string }[];
		legal?: string;
		aside?: string;
		class?: string;
	} = $props();
</script>

<footer data-slot="heat-footer" class={cn("relative overflow-hidden border-t border-border bg-background text-foreground", className)}>
	<Container size="wide" class="pt-16">
		<div class="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
			<div class="flex flex-col gap-5">
				<a {href} class="inline-flex items-baseline gap-2 self-start rounded-sm text-2xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
					<Wordmark name={site} />
					{#if maker}<span class="text-base text-foreground/80">{maker}</span>{/if}
				</a>
				<p class="max-w-[34ch] text-[17px] leading-snug">{tagline}</p>
				{#if command}<CommandBox {command} class="w-full max-w-sm bg-background" />{/if}
				{#if status}
					<a href={status.href} class="inline-flex items-center gap-2 self-start rounded-md border border-border px-2.5 py-1 font-mono text-[11px] tracking-[0.08em] uppercase transition-colors hover:border-primary motion-reduce:transition-none">
						<i class="size-1.5 rounded-full bg-green"></i>{status.label}
					</a>
				{/if}
			</div>
			<FooterColumns {columns} />
		</div>
		<FooterFamily {site} class="mt-14 border-t border-border pt-8" />
	</Container>

	<div class="relative mt-6">
		<div class="relative h-[clamp(150px,21vw,300px)]">
			<HeatField class="[mask-image:linear-gradient(to_bottom,black_58%,transparent)]" />
		</div>
		<Container size="wide" class="relative -mt-[clamp(52px,9.6vw,136px)]">
			<FitWordmark name={site} max={250} />
		</Container>
		<Container size="wide" class="relative flex flex-wrap items-center justify-between gap-x-6 gap-y-3 pt-8 pb-12 font-mono text-[12px]">
			<span class="text-muted-foreground">{legal}{#if aside}{` · ${aside}`}{/if}</span>
			{#if socials.length}<FooterSocials links={socials} />{/if}
		</Container>
	</div>
</footer>
