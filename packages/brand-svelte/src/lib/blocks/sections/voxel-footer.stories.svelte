<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import VoxelFooter from './voxel-footer.svelte'
	import { footerColumns, footerSocials } from './stories-data.js'

	const { Story } = defineMeta({
		title: 'Sections/Voxel footer',
		component: VoxelFooter,
		parameters: { layout: 'fullscreen' },
	})
</script>

<Story name="Default" asChild>
	<VoxelFooter
		site="example"
		maker="by example"
		href="#"
		tagline="One repo for the whole desktop app. Run it, then start deleting what you don’t need."
		columns={footerColumns}
		eyebrow="Release 0.3.0 · signed updates"
		cta={{ title: 'Start with the whole app.', primary: { label: 'Get started', href: '#' }, secondary: { label: 'Read the docs', href: '#' } }}
		command="git clone https://example.com/starter.git"
		socials={footerSocials}
		legal="© 2026 example · MIT licensed"
	/>
</Story>
