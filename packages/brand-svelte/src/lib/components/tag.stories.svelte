<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import { hues } from '@hmziq/brand-core/color'
	import Tag from './tag.svelte'

	const { Story } = defineMeta({
		title: 'Custom/Tag',
		component: Tag,
		parameters: { layout: 'centered' },
		args: { tone: 'success', marker: true },
		argTypes: {
			tone: {
				description: 'Status role: success, warning, info, destructive, or a hue.',
				control: 'select',
				options: [undefined, 'success', 'warning', 'info', 'destructive', ...hues],
			},
			marker: { description: 'Shows the status dot before the label.' },
		},
	})
</script>

{#snippet template(args)}
	<Tag {...args}>Shipped</Tag>
{/snippet}

<Story name="Default" {template} />

<Story name="Status" asChild>
	<div class="flex flex-wrap gap-2">
		<Tag tone="success" marker>Shipped</Tag>
		<Tag tone="warning" marker>In progress</Tag>
		<Tag>Planned</Tag>
		<Tag tone="info">Tip</Tag>
		<Tag tone="destructive">Failed</Tag>
	</div>
</Story>

<Story name="Colors" asChild>
	<div class="flex flex-wrap gap-2">
		{#each hues as hue (hue)}
			<Tag {hue}>{hue[0].toUpperCase() + hue.slice(1)}</Tag>
		{/each}
	</div>
</Story>

<Story name="As link" asChild>
	<Tag tone="blue" href="#">Engineering</Tag>
</Story>
