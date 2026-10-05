<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import NewsletterBand from './newsletter-band.svelte'

	const { Story } = defineMeta({
		title: 'Content/Newsletter band',
		component: NewsletterBand,
		parameters: { layout: 'fullscreen' },
	})
</script>

<!-- The orange band with an email field, at the end of every post and the post list. The form posts to the page's own action. -->
<Story name="Default" asChild>
	<NewsletterBand />
</Story>
