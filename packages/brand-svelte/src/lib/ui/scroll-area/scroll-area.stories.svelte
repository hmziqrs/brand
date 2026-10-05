<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import ScrollArea from './scroll-area.svelte'

	const { Story } = defineMeta({
		title: 'ui/base/ScrollArea',
		component: ScrollArea,
		parameters: { layout: 'centered' },
	})
</script>

<Story name="Default" asChild>
	<ScrollArea class="h-32 w-80 rounded-md border p-4">
		Jokester began sneaking into the castle in the middle of the night and leaving jokes
		all over the place: under the king's pillow, in his soup, even in the royal toilet. The
		king was furious, but he couldn't seem to stop Jokester. And then, one day, the people of
		the kingdom discovered that the jokes left by Jokester were so funny that they couldn't
		help but laugh. And once they started laughing, they couldn't stop. The king was so angry
		that he banished Jokester from the kingdom, but the people still laughed, and they
		laughed, and they laughed. And they all lived happily ever after.
	</ScrollArea>
</Story>
