<!-- The hero for a studio, an initiative or a lab: one big statement over a full-width stage that
     carries the identity. left sets the words on the left, with a reading layer of the page color
     fading out behind them; center centers them. `panel` puts the lede and buttons on smoke glass.
     Contents sit in the wide Container; the stage keeps the pointer where the words don't. -->
<script lang="ts">
	import type { Snippet } from "svelte";
	import { cn } from "$brand/utils.js";
	import Glass from "$brand/components/glass.svelte";
	import Container from "$brand/blocks/site/container.svelte";
	import AccentTitle from "./accent-title.svelte";

	let {
		title,
		/** The part of the title in oxide. */
		accent,
		lede,
		/** Above the title: a label, a boot log. */
		eyebrow,
		/** The buttons. */
		actions,
		/** Under everything: availability, stats, the stack. */
		meta,
		align = "left",
		/** The lede and buttons on smoke glass, for busy stages. */
		panel = false,
		/** A glow of the page color behind the title, for busy stages; on with `panel`. */
		scrim,
		/** A wordmark above the title, in display oxide ([data-display]). */
		wordmark,
		/** Replaces the title: a ResolveTitle, a custom h1. */
		heading,
		/** A full-width background: MaterialGrid, SceneStage, DiagonalHatch, RingField, … */
		stage,
		/** Classes for the title, after the defaults. */
		titleClass,
		class: className,
	}: {
		title: string;
		accent?: string;
		lede: string;
		eyebrow?: Snippet;
		actions?: Snippet;
		meta?: Snippet;
		align?: "left" | "center";
		panel?: boolean;
		scrim?: boolean;
		wordmark?: Snippet;
		heading?: Snippet;
		stage?: Snippet;
		titleClass?: string;
		class?: string;
	} = $props();

	const center = $derived(align === "center");
</script>

{#snippet body()}
	<p class={cn("text-[clamp(18px,1.7vw,22px)] text-pretty text-foreground [line-height:1.5]", center ? "mx-auto max-w-[40rem]" : "max-w-[36rem]")}>{lede}</p>
	{#if actions}<div class={cn("mt-8 flex flex-wrap gap-3", center && "justify-center")}>{@render actions()}</div>{/if}
{/snippet}

<section data-slot="brand-hero" data-align={align} data-pointer-host class={cn("relative isolate flex min-h-[min(88svh,820px)] flex-col justify-center overflow-hidden", className)}>
	{#if stage}
		<div class="absolute inset-0 -z-10">{@render stage()}</div>
		{#if !center}
			<div aria-hidden="true" data-slot="brand-hero-reading" class="pointer-events-none absolute inset-0 -z-[5] bg-[linear-gradient(to_right,color-mix(in_oklab,var(--background)_78%,transparent)_0%,color-mix(in_oklab,var(--background)_62%,transparent)_36%,color-mix(in_oklab,var(--background)_22%,transparent)_56%,transparent_68%)]"></div>
		{/if}
	{/if}
	<Container size="wide" class={cn("pointer-events-none relative py-24 lg:py-32 [&>*]:pointer-events-auto", center && "flex flex-col items-center text-center")}>
		{#if eyebrow}<div class="mb-7">{@render eyebrow()}</div>{/if}
		{#if wordmark}<div data-display class={cn("mb-8 w-full", center && "flex justify-center")}>{@render wordmark()}</div>{/if}
		{#if heading}{@render heading()}{:else}<AccentTitle
				{title}
				{accent}
				class={cn(
					"font-semibold tracking-[-0.045em] text-foreground",
					(scrim ?? panel) && "[text-shadow:0_2px_40px_var(--background),0_0_12px_var(--background)]",
					center ? "max-w-[15ch] text-[clamp(44px,6.8vw,100px)]" : "max-w-[14ch] text-[clamp(48px,8.4vw,132px)]",
					"leading-[0.95]",
					titleClass,
				)}
			/>{/if}
		{#if panel}
			<Glass variant="smoke" class={cn("mt-10 rounded-2xl p-6 sm:p-7", center ? "mx-auto max-w-[44rem]" : "max-w-[40rem]")}>{@render body()}</Glass>
		{:else}
			<div class="mt-8">{@render body()}</div>
		{/if}
		{#if meta}<div class="mt-10 w-full">{@render meta()}</div>{/if}
	</Container>
</section>
