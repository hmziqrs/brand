<!-- The wave hero: the landing hero's words over the wave shader, dark in both page modes,
     with a CSS texture over the shader as a choice (none by default) and the
     play/pause control next to it. Every wave shader prop passes through; the wave tweaker turns them into JSON.
     Centered like a launch, or split with room for a product beside the words. -->
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
	import Segmented from "$brand/components/segmented.svelte";
	import WaveShader from "./wave-shader.svelte";
	import { cn } from "$brand/utils.js";
	import type { ComponentProps, Snippet } from "svelte";

	let {
		variant = "centered",
		texture = "off",
		/** The texture choice and the play/pause control, bottom right. */
		controls = true,
		animated = true,
		/** How strongly the texture shows, 0 to 1. */
		textureStrength = 1,
		badge,
		title,
		lede,
		actions,
		note,
		aside,
		class: className,
		...shader
	}: Omit<ComponentProps<typeof WaveShader>, "animated" | "paused" | "class"> & {
		/** "split" puts a product beside the words (from md up). */
		variant?: "centered" | "split";
		texture?: "scanlines" | "grid" | "grain" | "dots" | "mesh" | "crt" | "hatch" | "blueprint" | "plaid" | "off";
		controls?: boolean;
		animated?: boolean;
		textureStrength?: number;
		badge?: Snippet;
		title: Snippet;
		lede: Snippet;
		actions?: Snippet;
		note?: Snippet;
		aside?: Snippet;
		class?: string;
	} = $props();

	let picked = $state<string | undefined>();
	let paused = $state(false);
	const current = $derived(picked ?? texture);
	const reduced = new MediaQuery("prefers-reduced-motion: reduce");
	const centered = $derived(variant === "centered");
</script>

<section data-slot="wave-hero" data-texture={current} data-variant={variant} class={cn("dark relative isolate flex min-h-svh w-full overflow-hidden bg-background", className)}>
	<WaveShader {animated} bind:paused {...shader} />
	<div class="texture pointer-events-none absolute inset-0" style:--wave-strength={textureStrength} aria-hidden="true">
		{#if current === "scanlines"}
			<div class="scanlines absolute inset-0"></div>
			<div class="grain grain-soft absolute inset-0"></div>
		{:else if current === "grid"}
			<div class="grid-lines absolute inset-0"></div>
		{:else if current === "grain"}
			<div class="grain grain-strong absolute inset-0"></div>
		{:else if current === "dots"}
			<div class="dots absolute inset-0"></div>
		{:else if current === "mesh"}
			<div class="mesh absolute inset-0"></div>
		{:else if current === "crt"}
			<div class="scanlines absolute inset-0"></div>
			<div class="columns absolute inset-0"></div>
			<div class="grain grain-soft absolute inset-0"></div>
		{:else if current === "hatch"}
			<div class="hatch absolute inset-0"></div>
		{:else if current === "blueprint"}
			<div class="blueprint absolute inset-0"></div>
		{:else if current === "plaid"}
			<div class="plaid absolute inset-0"></div>
		{/if}
	</div>
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
				<Button variant="secondary" size="sm" class="bg-background/85 text-foreground backdrop-blur-sm" aria-label={paused ? "Play the waves" : "Pause the waves"} aria-pressed={paused} onclick={() => (paused = !paused)}>
					{#if paused}<Play class="lucide" />{:else}<Pause class="lucide" />{/if}
					{paused ? "Play" : "Pause"}
				</Button>
			{/if}
			<Segmented
				label="Texture over the waves"
				options={[
					{ value: "scanlines", label: "Scanlines" },
					{ value: "grid", label: "Grid" },
					{ value: "grain", label: "Grain" },
					{ value: "dots", label: "Dots" },
					{ value: "mesh", label: "Mesh" },
					{ value: "crt", label: "CRT" },
					{ value: "hatch", label: "Hatch" },
					{ value: "blueprint", label: "Blueprint" },
					{ value: "plaid", label: "Plaid" },
					{ value: "off", label: "Off" },
				]}
				value={current}
				onValueChange={(value) => (picked = value)}
				class="bg-background/85 backdrop-blur-sm"
			/>
		</div>
	{/if}
</section>

<style>
	.texture {
		--wave-line: color-mix(in oklab, var(--foreground) 17%, transparent);
		--wave-grid: color-mix(in oklab, var(--foreground) 13%, transparent);
		--wave-noise: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
	}
	.texture .scanlines {
		background: repeating-linear-gradient(to bottom, transparent 0 2px, var(--wave-line) 2px 3px);
		opacity: var(--wave-strength, 1);
	}
	.texture .grid-lines {
		background-image:
			repeating-linear-gradient(to bottom, transparent 0 55px, var(--wave-grid) 55px 56px),
			repeating-linear-gradient(to right, transparent 0 55px, var(--wave-grid) 55px 56px);
		opacity: var(--wave-strength, 1);
	}
	.texture .grain {
		background-image: var(--wave-noise);
		background-size: 160px 160px;
	}
	.texture .grain-soft {
		opacity: calc(0.1 * var(--wave-strength, 1));
	}
	.texture .dots {
		background-image: radial-gradient(color-mix(in oklab, var(--foreground) 16%, transparent) 1px, transparent 1.4px);
		background-size: 7px 7px;
		opacity: var(--wave-strength, 1);
	}
	.texture .mesh {
		background-image:
			repeating-linear-gradient(45deg, transparent 0 6px, var(--wave-grid) 6px 7px),
			repeating-linear-gradient(-45deg, transparent 0 6px, var(--wave-grid) 6px 7px);
		opacity: var(--wave-strength, 1);
	}
	.texture .columns {
		background-image: repeating-linear-gradient(to right, transparent 0 2px, var(--wave-grid) 2px 3px);
		opacity: calc(0.5 * var(--wave-strength, 1));
	}
	.texture .hatch {
		background-image: repeating-linear-gradient(135deg, transparent 0 4px, var(--wave-grid) 4px 5px);
		opacity: var(--wave-strength, 1);
	}
	.texture .blueprint {
		background-image:
			repeating-linear-gradient(to bottom, transparent 0 79px, var(--wave-line) 79px 80px),
			repeating-linear-gradient(to right, transparent 0 79px, var(--wave-line) 79px 80px),
			repeating-linear-gradient(to bottom, transparent 0 15px, color-mix(in oklab, var(--foreground) 6%, transparent) 15px 16px),
			repeating-linear-gradient(to right, transparent 0 15px, color-mix(in oklab, var(--foreground) 6%, transparent) 15px 16px);
		opacity: var(--wave-strength, 1);
	}
	.texture .plaid {
		background-image:
			repeating-linear-gradient(to bottom, transparent 0 12px, var(--wave-grid) 12px 14px, transparent 14px 20px, var(--wave-grid) 20px 21px),
			repeating-linear-gradient(to right, transparent 0 12px, var(--wave-grid) 12px 14px, transparent 14px 20px, var(--wave-grid) 20px 21px);
		opacity: var(--wave-strength, 1);
	}
	.texture .grain-strong {
		opacity: calc(0.24 * var(--wave-strength, 1));
	}
</style>
