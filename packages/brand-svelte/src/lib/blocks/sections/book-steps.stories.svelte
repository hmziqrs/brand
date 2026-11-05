<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import BookSteps from './book-steps.svelte'

	const { Story } = defineMeta({
		title: 'Sections/Book steps',
		component: BookSteps,
		parameters: { layout: 'fullscreen' },
	})
</script>

<script lang="ts">
	import Container from '$brand/blocks/site/container.svelte'
	import { contactData } from '$brand/blocks/site/stories-data-company.js'
</script>

<Story name="Default" asChild>
	<Container size="wide" class="py-16">
		<BookSteps data={contactData.how} />
	</Container>
</Story>
