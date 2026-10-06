<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import { Separator } from '$brand/ui/separator/index.js'

	const { Story } = defineMeta({
		title: 'ui/base/Separator',
		component: Separator,
	})
</script>

<Story name="Default" asChild>
	<div class="flex flex-col items-center justify-center gap-2">
		<div>Top</div>
		<Separator orientation="horizontal" />
		<div>Bottom</div>
	</div>
</Story>

<Story name="Vertical" asChild>
	<div class="flex h-12 items-center justify-center gap-2">
		<div>Left</div>
		<Separator orientation="vertical" />
		<div>Right</div>
	</div>
</Story>
