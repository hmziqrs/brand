<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import FooterColumns from './footer-columns.svelte'
	import { footerColumns } from '$brand/blocks/sections/stories-data.js'

	const { Story } = defineMeta({
		title: 'Custom/Footer columns',
		component: FooterColumns,
		parameters: { layout: 'fullscreen' },
	})
</script>

<Story name="Default" asChild>
	<div class="mx-auto max-w-[82rem] px-6 py-16"><FooterColumns columns={footerColumns} /></div>
</Story>
