<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import { hues } from '@hmziq/brand-core/color'
	import Tag from './tag.svelte'

	const { Story } = defineMeta({
		title: 'Custom/Tag',
		component: Tag,
		args: { tone: 'success', marker: true },
		argTypes: {
			tone: {
				control: 'select',
				options: [undefined, 'success', 'warning', 'info', 'destructive', ...hues],
			},
		},
	})
</script>

{#snippet template(args)}
	<Tag {...args}>Shipped</Tag>
{/snippet}

<Story name="Default" {template} />

<!-- Status: write the role (success, warning…), not the color. -->
<Story name="Status" asChild>
	<div class="flex flex-wrap gap-2">
		<Tag tone="success" marker>Shipped</Tag>
		<Tag tone="warning" marker>In progress</Tag>
		<Tag>Planned</Tag>
		<Tag tone="info">Tip</Tag>
		<Tag tone="destructive">Failed</Tag>
	</div>
</Story>

<!-- Categories: each keeps one color on every page it appears. -->
<Story name="Colors" asChild>
	<div class="flex flex-wrap gap-2">
		{#each hues as hue (hue)}
			<Tag {hue}>{hue[0].toUpperCase() + hue.slice(1)}</Tag>
		{/each}
	</div>
</Story>

<!-- A tag can be a link. Hover underlines it; nothing moves. -->
<Story name="As link" asChild>
	<Tag tone="blue" href="#">Engineering</Tag>
</Story>
