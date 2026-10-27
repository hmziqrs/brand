<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import Gallery from './gallery.svelte'
	import { shaderPosters } from '@hmziq/brand-core/shaders/posters'
	import { shaderLooks } from '@hmziq/brand-core/shaders/catalog'
	import { brandMaterials } from '@hmziq/brand-core/shaders/materials'

	const { Story } = defineMeta({
		title: 'Custom/Gallery',
		component: Gallery,
		parameters: { layout: 'padded' },
	})

	const pictures = brandMaterials.map((id) => ({
		src: shaderPosters[id].src,
		srcset: shaderPosters[id].srcset,
		alt: shaderLooks.find((l) => l.id === id)?.name ?? id,
		caption: `${shaderLooks.find((l) => l.id === id)?.name ?? id}, a shader material`,
	}))
</script>

<Story name="Materials" asChild>
	<Gallery label="The brand's materials" {pictures} class="max-w-5xl" />
</Story>

<Story name="Square" asChild>
	<Gallery label="Metals" pictures={pictures.slice(8, 14)} columns={3} aspect="aspect-square" class="max-w-3xl" />
</Story>
