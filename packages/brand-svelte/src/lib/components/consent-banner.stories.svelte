<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import ConsentBanner from './consent-banner.svelte'

	const { Story } = defineMeta({
		title: 'Custom/Consent banner',
		component: ConsentBanner,
		parameters: { layout: 'fullscreen' },
	})
</script>

<Story name="Card" asChild>
	<div class="relative min-h-[30rem] p-6"><ConsentBanner class="absolute bottom-6 left-6" /></div>
</Story>

<Story name="Bar" asChild>
	<div class="relative flex min-h-[20rem] flex-col justify-end"><ConsentBanner variant="bar" /></div>
</Story>
