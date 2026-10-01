<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import EmptyNote from './empty-note.svelte'

	const { Story } = defineMeta({ title: 'Content/Empty note', component: EmptyNote })
</script>

<!-- Shown when a search or filter finds nothing. -->
<Story name="Default" asChild>
	<EmptyNote>Nothing matches that yet. Try a shorter word.</EmptyNote>
</Story>
