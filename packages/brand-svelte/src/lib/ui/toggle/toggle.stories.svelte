<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import Bold from '@lucide/svelte/icons/bold'
	import Italic from '@lucide/svelte/icons/italic'
	import Toggle from './toggle.svelte'

	const { Story } = defineMeta({
		title: 'ui/base/Toggle',
		component: Toggle,
		parameters: { layout: 'centered' },
	})
</script>

<Story name="Default" asChild>
	<Toggle aria-label="Toggle bold">
		<Bold class="lucide size-4" />
	</Toggle>
</Story>

<Story name="Outline" asChild>
	<Toggle variant="outline" aria-label="Toggle italic">
		<Italic class="lucide size-4" />
	</Toggle>
</Story>

<Story name="With text" asChild>
	<Toggle variant="outline" aria-label="Toggle italic">
		<Italic class="lucide size-4" />
		Italic
	</Toggle>
</Story>

<Story name="Small" asChild>
	<Toggle size="sm" aria-label="Toggle bold">
		<Bold class="lucide size-4" />
	</Toggle>
</Story>

<Story name="Large" asChild>
	<Toggle size="lg" aria-label="Toggle bold">
		<Bold class="lucide size-4" />
	</Toggle>
</Story>

<Story name="Disabled" asChild>
	<Toggle disabled aria-label="Toggle bold">
		<Bold class="lucide size-4" />
	</Toggle>
</Story>
