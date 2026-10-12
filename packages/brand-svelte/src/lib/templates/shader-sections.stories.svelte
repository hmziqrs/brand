<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import ShaderSections from "./shader-sections.svelte";
	import Container from "$brand/blocks/site/container.svelte";

	const examples = [
		{ variant: "accent", name: "Brand accent", note: "The existing orange band with a faint brushed-alloy texture. Use it for a closing action." },
		{ variant: "oxide", name: "Brown oxide", note: "An opaque oxide field with a solid reading panel. Use it when the material is the main visual." },
		{ variant: "open", name: "Open surface", note: "A texture beside content, with no added section background. Use it for a feature or a material study." },
		{ variant: "wash", name: "Transparent wash", note: "A low-opacity paper image over the theme surface. Use it for reading sections and quiet transitions." },
		{ variant: "split", name: "Split band", note: "A material spans the page edges. A solid half-column holds the feature copy." },
		{ variant: "glass", name: "Glass panel", note: "One translucent panel over a copper field. Reduced transparency switches the panel to a solid fill." },
	] as const;

	const { Story } = defineMeta({
		title: "Templates/Shader sections",
		component: ShaderSections,
		args: { variant: "accent", animated: false, rendering: "image" },
		parameters: { layout: "fullscreen" },
		argTypes: {
			variant: { control: "select", options: examples.map((example) => example.variant) },
			rendering: { control: "select", options: ["image", "live"] },
		},
	});
</script>

<Story name="Brand accent" args={{ variant: "accent" }} />
<Story name="Brown oxide" args={{ variant: "oxide" }} />
<Story name="Open surface" args={{ variant: "open" }} />
<Story name="Transparent wash" args={{ variant: "wash" }} />
<Story name="Split band" args={{ variant: "split" }} />
<Story name="Glass panel" args={{ variant: "glass" }} />

<Story name="Complete catalog" asChild>
	<main class="flex min-w-0 flex-col">
		<Container class="flex flex-col gap-4 py-16 md:py-24">
			<h1 class="max-w-2xl text-4xl font-medium tracking-tight text-balance">Six ways to use a shader material.</h1>
			<p class="max-w-2xl leading-relaxed text-muted-foreground">These sections use image rendering by default. Choose live rendering for recipe edits or motion. Keep animation controls visible when a material moves.</p>
		</Container>
		{#each examples as example (example.variant)}
			<Container class="flex flex-col gap-2 border-t py-8">
				<h2 class="text-sm font-medium">{example.name}</h2>
				<p class="max-w-2xl text-sm leading-relaxed text-muted-foreground">{example.note}</p>
			</Container>
			<ShaderSections variant={example.variant} />
		{/each}
	</main>
</Story>

<Story name="Animated accent" args={{ variant: "accent", rendering: "live", animated: true }} />
<Story name="Animated glass" args={{ variant: "glass", rendering: "live", animated: true }} />
