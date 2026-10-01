<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import NotFound from './not-found.svelte'
	import ButtonLink from '$brand/blocks/site/button-link.svelte'

	const { Story } = defineMeta({
		title: 'Content/Not found',
		component: NotFound,
		parameters: { layout: 'fullscreen' },
	})
</script>

<!-- The lab's 404 design: the words, and rings drawn from "not found" beside them. -->
<Story name="Default" asChild>
	<div class="py-10">
		<NotFound title="Page not found" lede="This URL doesn't point to anything. The page probably moved, or the link was wrong.">
			{#snippet children()}
				<ButtonLink href="#" size="lg" class="px-5">Back to home</ButtonLink>
				<ButtonLink href="#" size="lg" variant="outline" class="px-5">Read the docs</ButtonLink>
			{/snippet}
		</NotFound>
	</div>
</Story>
