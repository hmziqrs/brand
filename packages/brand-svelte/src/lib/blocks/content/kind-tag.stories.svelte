<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import KindTag from './kind-tag.svelte'

	const { Story } = defineMeta({ title: 'Content/Changelog/Kind tag', component: KindTag })
</script>

<!-- A release's kind of change as a tag, each kind in its own color (the lab's changelog). -->
<Story name="Default" asChild>
	<p class="flex flex-wrap items-center gap-2 px-6">
		<KindTag kind="Added" count={2} />
		<KindTag kind="Changed" />
		<KindTag kind="Fixed" count={3} />
		<KindTag kind="Blog" />
	</p>
</Story>
