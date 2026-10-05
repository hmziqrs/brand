<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import Bold from '@lucide/svelte/icons/bold'
	import Italic from '@lucide/svelte/icons/italic'
	import Underline from '@lucide/svelte/icons/underline'
	import ToggleGroupRoot from './toggle-group.svelte'
	import ToggleGroupItem from './toggle-group-item.svelte'

	const { Story } = defineMeta({
		title: 'ui/base/ToggleGroup',
		component: ToggleGroupRoot,
		parameters: { layout: 'centered' },
	})
</script>

<script lang="ts">
	const formats = [
		{ icon: Bold, value: 'bold', label: 'Toggle bold' },
		{ icon: Italic, value: 'italic', label: 'Toggle italic' },
		{ icon: Underline, value: 'underline', label: 'Toggle underline' },
	]
</script>

{#snippet items()}
	{#each formats as format (format.value)}
		<ToggleGroupItem value={format.value} aria-label={format.label}>
			<format.icon class="lucide size-4" />
		</ToggleGroupItem>
	{/each}
{/snippet}

<Story name="Default" asChild>
	<ToggleGroupRoot type="multiple">
		{@render items()}
	</ToggleGroupRoot>
</Story>

<Story name="Outline" asChild>
	<ToggleGroupRoot type="multiple" variant="outline">
		{@render items()}
	</ToggleGroupRoot>
</Story>

<Story name="Single" asChild>
	<ToggleGroupRoot type="single">
		{@render items()}
	</ToggleGroupRoot>
</Story>

<Story name="Small" asChild>
	<ToggleGroupRoot type="multiple" size="sm">
		{@render items()}
	</ToggleGroupRoot>
</Story>

<Story name="Large" asChild>
	<ToggleGroupRoot type="multiple" size="lg">
		{@render items()}
	</ToggleGroupRoot>
</Story>

<Story name="Disabled" asChild>
	<ToggleGroupRoot type="multiple" disabled>
		{@render items()}
	</ToggleGroupRoot>
</Story>
