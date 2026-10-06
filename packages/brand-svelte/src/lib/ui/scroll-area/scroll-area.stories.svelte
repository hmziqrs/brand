<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import ScrollArea from './scroll-area.svelte'

	const { Story } = defineMeta({
		title: 'ui/base/ScrollArea',
		component: ScrollArea,
		parameters: { layout: 'centered' },
	})
</script>

<script lang="ts">
	let viewport = $state<HTMLElement | null>(null)
	let atStart = $state(true)
	let atEnd = $state(false)

	const edgeThreshold = 12

	function readEdges() {
		if (!viewport) return
		const max = viewport.scrollHeight - viewport.clientHeight
		atStart = viewport.scrollTop <= edgeThreshold
		atEnd = max - viewport.scrollTop <= edgeThreshold
	}

	$effect(() => {
		viewport?.addEventListener('scroll', readEdges)
		readEdges()
		return () => viewport?.removeEventListener('scroll', readEdges)
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

<!--
	The lab passes overflowEdgeThreshold (12) to Base UI, which flips the scrollbar's
	data-overflow-y-start/end attributes once that many pixels are scrolled. bits-ui has no
	such prop, so this story reads the bound viewport itself and shows the edge lines by
	the same 12px threshold.
-->
<Story name="With Edge Threshold" asChild>
	<div data-testid="edge-scroll" class="relative h-32 w-80 rounded-md border">
		<ScrollArea bind:viewportRef={viewport} class="size-full p-4">
			Jokester began sneaking into the castle in the middle of the night and leaving jokes
			all over the place: under the king's pillow, in his soup, even in the royal toilet. The
			king was furious, but he couldn't seem to stop Jokester. And then, one day, the people of
			the kingdom discovered that the jokes left by Jokester were so funny that they couldn't
			help but laugh. And once they started laughing, they couldn't stop. The king was so angry
			that he banished Jokester from the kingdom, but the people still laughed, and they
			laughed, and they laughed. And they all lived happily ever after.
		</ScrollArea>
		<span
			aria-hidden="true"
			data-edge="start"
			class="from-border pointer-events-none absolute inset-x-0 top-0 h-3 bg-gradient-to-b to-transparent {atStart
				? 'opacity-0'
				: 'opacity-100'}"
		></span>
		<span
			aria-hidden="true"
			data-edge="end"
			class="from-border pointer-events-none absolute inset-x-0 bottom-0 h-3 bg-gradient-to-t to-transparent {atEnd
				? 'opacity-0'
				: 'opacity-100'}"
		></span>
	</div>
</Story>
