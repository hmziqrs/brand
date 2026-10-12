<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import ShaderMaterial from "./shader-material.svelte";
	import { shaderPng } from "@hmziq/brand-core/shaders/posters";
	import { shaderLooks } from "@hmziq/brand-core/shaders/catalog";

	const { Story } = defineMeta({
		title: "Custom/Shaders",
		component: ShaderMaterial,
		args: { preset: "oxide-bloom", animated: false, class: "aspect-[8/5] w-full max-w-3xl" },
		argTypes: { preset: { control: "select", options: shaderLooks.map(look => look.id) } },
	});
</script>

<Story name="Static oxide" />
<Story name="Image only" args={{ rendering: "image" }} />
<Story name="PNG only" args={{ rendering: "image", poster: shaderPng }} />
<Story name="Transparent image" args={{ rendering: "image", transparent: true, opacity: .12 }} />
<Story name="Animated ink" args={{ preset: "liquid-ink", animated: true }} />
<Story name="Animated light sweep" args={{ preset: "black-sweep", animated: true }} />
<Story name="Static paper" args={{ preset: "fibrous-paper" }} />
<Story name="Height map" args={{ preset: "hammered-copper", output: 1 }} />
<Story name="Normal map" args={{ preset: "hammered-copper", output: 2 }} />
<Story name="Materials" asChild>
	<div class="grid w-full max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
		{#each ["oxide-bloom", "liquid-ink", "woven-linen", "carbon-twill", "caustic-glass", "fibrous-paper"] as preset (preset)}
			<figure class="space-y-2">
				<ShaderMaterial {preset} rendering="image" class="aspect-[8/5] w-full rounded-sm" />
				<figcaption class="text-sm text-muted-foreground">{shaderLooks.find(look => look.id === preset)?.name}</figcaption>
			</figure>
		{/each}
	</div>
</Story>
