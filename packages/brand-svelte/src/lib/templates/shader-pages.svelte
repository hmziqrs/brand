<script lang="ts">
	import ShaderGuide from "$brand/templates/shader-guide.svelte";
	import ShaderMaterial from "$brand/components/shader-material.svelte";
	import ButtonLink from "$brand/blocks/site/button-link.svelte";
	import Hero from "$brand/blocks/site/hero.svelte";
	import Section from "$brand/blocks/site/section.svelte";
	import SiteShell from "$brand/blocks/site/site-shell.svelte";

	let { variant = "guide", animated = false }: { variant?: "guide" | "product" | "editorial" | "showcase"; animated?: boolean } = $props();

	const materials = [
		{ name: "Oxide bloom", preset: "oxide-bloom", description: "A porous iron oxide surface." },
		{ name: "Cast iron", preset: "cast-iron", description: "A dark cast metal surface." },
		{ name: "Mineral fault", preset: "mineral-fault", description: "A fractured mineral surface." },
		{ name: "Woven linen", preset: "woven-linen", description: "Crossed linen fibers." },
		{ name: "Caustic glass", preset: "caustic-glass", description: "Light distorted through glass." },
		{ name: "Fibrous paper", preset: "fibrous-paper", description: "Paper pulp with visible fibers." },
	] as const;
</script>

{#if variant === "guide"}
	<ShaderGuide />
{:else}
<SiteShell
	site="hmziq"
	nav={["Materials", "Examples", "Source"]}
	current="Materials"
	cta={{ label: "View examples", href: "#materials" }}
	footerLinks={[
		{ title: "Materials", links: ["Oxide bloom", "Cast iron", "Mineral fault"] },
		{ title: "Textures", links: ["Woven linen", "Caustic glass", "Fibrous paper"] },
		{ title: "Shader", links: ["WebGPU", "Static fallback", "Reduced motion"] },
	]}
>
	{#if variant === "product"}
		<Hero>
			{#snippet kicker()}Shader material{/snippet}
			{#snippet title()}Material previews for your next page.{/snippet}
			{#snippet lede()}Choose a preset, set its size, and place it beside page content. Each preview has a static image fallback.{/snippet}
			{#snippet actions()}
				<ButtonLink href="#materials" size="lg">View preset samples</ButtonLink>
			{/snippet}
			{#snippet note()}Animation stops when reduced motion is enabled.{/snippet}
			{#snippet aside()}
				<ShaderMaterial preset="oxide-bloom" rendering={animated ? "live" : "image"} {animated} loading="eager" fetchpriority="high" class="aspect-[4/3] w-full rounded-xl border" />
			{/snippet}
		</Hero>

		<Section>
			{#snippet title()}Preset samples{/snippet}
			{#snippet intro()}Three presets rendered as static previews.{/snippet}
			<div id="materials" class="grid gap-4 md:grid-cols-3">
				{#each materials.slice(0, 3) as material (material.preset)}
					<figure class="flex flex-col gap-3">
						<ShaderMaterial preset={material.preset} rendering="image" animated={false} controls={false} class="aspect-[4/3] w-full rounded-lg border" />
						<figcaption><span class="font-medium">{material.name}</span><span class="block text-sm text-muted-foreground">{material.description}</span></figcaption>
					</figure>
				{/each}
			</div>
		</Section>
	{:else if variant === "editorial"}
		<Hero>
			{#snippet kicker()}Material note / 01{/snippet}
			{#snippet title()}Fibrous paper.{/snippet}
			{#snippet lede()}Static preview of the fibrous-paper preset. The shader uses fine strokes and pulp variation to represent paper texture.{/snippet}
			{#snippet aside()}
				<figure class="flex flex-col gap-3">
					<ShaderMaterial preset="fibrous-paper" rendering="image" animated={false} controls={false} class="aspect-[4/3] w-full rounded-lg border" />
					<figcaption class="text-sm text-muted-foreground"><span>Fibrous paper</span><span class="block">Static preset preview</span></figcaption>
				</figure>
			{/snippet}
		</Hero>

		<Section>
			{#snippet title()}Preset details{/snippet}
			{#snippet intro()}The same component can show static material studies or animate them when requested.{/snippet}
			<div class="grid gap-6 border-t pt-6 md:grid-cols-2">
				<p class="max-w-prose leading-relaxed text-muted-foreground">This example uses image-only rendering, with no shader device. The texture stays visible when WebGPU is unavailable or JavaScript never runs.</p>
				<p class="max-w-prose leading-relaxed text-muted-foreground">Set <code class="rounded bg-muted px-1.5 py-0.5 text-sm">rendering="live"</code> and <code class="rounded bg-muted px-1.5 py-0.5 text-sm">animated</code> to enable motion. The component pauses when the visitor requests reduced motion.</p>
			</div>
		</Section>
	{:else}
		<Hero>
			{#snippet kicker()}Shader material{/snippet}
			{#snippet title()}Six preset materials.{/snippet}
			{#snippet lede()}Each tile uses a different preset. Toggle animation through the component prop or keep every preview static.{/snippet}
			{#snippet aside()}
				<ShaderMaterial preset="caustic-glass" rendering={animated ? "live" : "image"} {animated} loading="eager" fetchpriority="high" class="aspect-[4/3] w-full rounded-xl border" />
			{/snippet}
		</Hero>

		<Section>
			{#snippet title()}Material index{/snippet}
			{#snippet intro()}Six distinct presets from the shader library.{/snippet}
			<div id="materials" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{#each materials as material, i (material.preset)}
					<figure class="overflow-hidden rounded-xl border">
						<ShaderMaterial preset={material.preset} rendering={animated ? "live" : "image"} {animated} class="aspect-[4/3] w-full" />
						<figcaption class="flex items-start justify-between gap-4 p-5">
							<div><h2 class="font-medium">{material.name}</h2><p class="mt-1 text-sm text-muted-foreground">{material.description}</p></div>
							<span class="text-xs tabular-nums text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
						</figcaption>
					</figure>
				{/each}
			</div>
		</Section>
	{/if}
</SiteShell>
{/if}
