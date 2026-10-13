<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import GlassSections from "./glass-sections.svelte";
	import Container from "$brand/blocks/site/container.svelte";

	const examples = [
		{ variant: "rings", name: "Over the rings", note: "The hero rings behind a glass list: the orange ring softens into the panel where they cross." },
		{ variant: "shader", name: "Shader under glass", note: "A material fills the section; the words sit on smoked glass with grain, never on the raw texture." },
		{ variant: "header", name: "Floating header", note: "A glass header that floats over the page instead of a bar across it." },
		{ variant: "band", name: "Glass band", note: "A closing band in smoked glass over hammered copper, for a page that already ends on orange elsewhere." },
	] as const;

	const { Story } = defineMeta({
		title: "Templates/Glass sections",
		component: GlassSections,
		args: { variant: "rings" },
		parameters: { layout: "fullscreen" },
		argTypes: { variant: { control: "select", options: examples.map((e) => e.variant) } },
	});
</script>

<Story name="Over the rings" args={{ variant: "rings" }} />
<Story name="Shader under glass" args={{ variant: "shader" }} />
<Story name="Floating header" args={{ variant: "header" }} />
<Story name="Glass band" args={{ variant: "band" }} />

<!-- All four, with a note on when to use each. -->
<Story name="Complete catalog" asChild>
	<div class="flex flex-col gap-16 py-16">
		{#each examples as e (e.variant)}
			<div class="flex flex-col gap-6">
				<Container class="flex flex-col gap-1">
					<h2 class="text-sm font-medium">{e.name}</h2>
					<p class="text-sm text-muted-foreground">{e.note}</p>
				</Container>
				<GlassSections variant={e.variant} />
			</div>
		{/each}
	</div>
</Story>
