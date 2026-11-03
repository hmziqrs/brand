<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import FooterFamily from './footer-family.svelte'

	const { Story } = defineMeta({
		title: 'Custom/Footer family',
		component: FooterFamily,
		parameters: { layout: 'fullscreen' },
	})
</script>

<Story name="Default" asChild>
	<div class="mx-auto max-w-[82rem] px-6 py-16"><FooterFamily site="freeoxide" /></div>
</Story>
