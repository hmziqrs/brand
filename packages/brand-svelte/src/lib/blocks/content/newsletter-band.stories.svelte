<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import NewsletterBand from './newsletter-band.svelte'

	const { Story } = defineMeta({
		title: 'Content/Blog/Newsletter band',
		component: NewsletterBand,
		parameters: { layout: 'fullscreen' },
	})
</script>

<Story name="Default" asChild>
	<NewsletterBand />
</Story>
