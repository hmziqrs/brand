<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import ConsentBanner from './consent-banner.svelte'

	const { Story } = defineMeta({
		title: 'Custom/Consent banner',
		component: ConsentBanner,
		parameters: { layout: 'fullscreen' },
	})
</script>

<!-- In a corner: "Only essential" and "Accept all" weigh the same, and "Choose" opens a switch per kind. -->
<Story name="Card" asChild>
	<div class="relative min-h-[30rem] p-6"><ConsentBanner class="absolute bottom-6 left-6" /></div>
</Story>

<!-- Along the bottom of the page. -->
<Story name="Bar" asChild>
	<div class="relative flex min-h-[20rem] flex-col justify-end"><ConsentBanner variant="bar" /></div>
</Story>
