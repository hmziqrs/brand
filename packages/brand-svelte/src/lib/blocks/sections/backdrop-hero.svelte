<!-- The backdrop hero: the landing hero's words over one of the backdrop shaders, dark in both
     page modes, with a play/pause control bottom right. Centered like a launch, or split with
     room for a product beside the words. -->
<script lang="ts">
	import { MediaQuery } from "svelte/reactivity";
	import Pause from "@lucide/svelte/icons/pause";
	import Play from "@lucide/svelte/icons/play";
	import { Button } from "$brand/ui/button/index.js";
	import Container from "$brand/blocks/site/container.svelte";
	import HeroTitle from "$brand/blocks/site/hero-title.svelte";
	import HeroLede from "$brand/blocks/site/hero-lede.svelte";
	import HeroActions from "$brand/blocks/site/hero-actions.svelte";
	import HeroNotes from "$brand/blocks/site/hero-notes.svelte";
		import BackdropShader from "./backdrop-shader.svelte";
	import { cn } from "$brand/utils.js";
	import type { ComponentProps, Snippet } from "svelte";

	let {
		variant = "centered",
		controls = true,
		animated = true,
		badge,
		title,
		lede,
		actions,
		note,
		aside,
		class: className,
		...shader
	}: Omit<ComponentProps<typeof BackdropShader>, "animated" | "paused" | "class"> & {
		/** "split" puts a product beside the words (from md up). */
		variant?: "centered" | "split";
		controls?: boolean;
		animated?: boolean;
		badge?: Snippet;
		title: Snippet;
		lede: Snippet;
		actions?: Snippet;
		note?: Snippet;
		aside?: Snippet;
		class?: string;
	} = $props();

	let paused = $state(false);
	const reduced = new MediaQuery("prefers-reduced-motion: reduce");
	const centered = $derived(variant === "centered");
</script>

<section data-slot="backdrop-hero" data-kind={shader.kind ?? "aurora"} data-variant={variant} class={cn("dark relative isolate flex min-h-svh w-full overflow-hidden bg-background", className)}>
	<BackdropShader {animated} bind:paused {...shader} />
	<div class="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background to-transparent" aria-hidden="true"></div>
	<Container class={cn("relative z-10 flex min-h-svh flex-col justify-center gap-6 py-20", centered ? "items-center text-center" : "grid items-center gap-10 md:grid-cols-2")}>
		<div class={cn("flex flex-col gap-6", centered && "items-center")}>
			{#if badge}
				<p class="-mb-2">{@render badge()}</p>
			{/if}
			<HeroTitle size={centered ? "default" : "compact"}>{@render title()}</HeroTitle>
			<HeroLede class={centered ? "max-w-[40rem] text-balance text-foreground/85" : "text-foreground/85"}>{@render lede()}</HeroLede>
			{#if actions}<HeroActions class={centered ? "justify-center" : ""}>{@render actions()}</HeroActions>{/if}
			{#if note}<HeroNotes class={centered ? "justify-center" : ""}>{@render note()}</HeroNotes>{/if}
		</div>
		{#if !centered && aside}
			<div class="min-w-0">{@render aside()}</div>
		{/if}
	</Container>
	{#if controls}
		<div class="absolute right-4 bottom-4 z-20 flex flex-wrap items-center gap-2">
			{#if animated && !reduced.current}
				<Button variant="secondary" size="sm" class="bg-background/85 text-foreground backdrop-blur-sm" aria-label={paused ? "Play the backdrop" : "Pause the backdrop"} aria-pressed={paused} onclick={() => (paused = !paused)}>
					{#if paused}<Play class="lucide" />{:else}<Pause class="lucide" />{/if}
					{paused ? "Play" : "Pause"}
				</Button>
			{/if}
		</div>
	{/if}
</section>
