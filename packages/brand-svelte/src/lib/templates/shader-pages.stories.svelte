<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import ShaderPages from './shader-pages.svelte'

	const { Story } = defineMeta({
		title: 'Templates/Shader pages',
		component: ShaderPages,
		args: { variant: 'guide', animated: false },
		parameters: { layout: 'fullscreen' },
		argTypes: {
			variant: { control: 'select', options: ['guide', 'product', 'editorial', 'showcase'] },
		},
	})
</script>

<Story name="Usage guide" args={{ variant: 'guide' }} />

<Story name="Product" args={{ variant: 'product', animated: false }} />

<Story name="Editorial" args={{ variant: 'editorial', animated: false }} />

<Story name="Showcase" args={{ variant: 'showcase', animated: false }} />

<Story name="Animated product" args={{ variant: 'product', animated: true }} />
