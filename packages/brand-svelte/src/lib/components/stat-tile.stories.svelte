<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import StatTile from './stat-tile.svelte'

	const { Story } = defineMeta({
		title: 'Custom/Stat tile',
		component: StatTile,
		parameters: { layout: 'fullscreen' },
	})
</script>

<Story name="Oxide and outline" asChild>
	<div class="mx-auto grid max-w-[82rem] grid-cols-2 gap-3 px-6 py-12 lg:grid-cols-3">
		<StatTile tone="oxide" value="5" label="Review rounds before a version number" rings="freeoxide-rounds" class="col-span-2 lg:col-span-1" />
		<StatTile value=">90%" label="Test coverage floor on every project" />
		<StatTile value="100%" label="Open source, MIT or Apache-2.0" />
	</div>
</Story>

<Story name="Dot digits" asChild>
	<div class="mx-auto grid max-w-[82rem] grid-cols-2 gap-3 px-6 py-12 lg:grid-cols-4">
		<StatTile tone="oxide" digits="dot" value="0" label="Changes to your ~/.claude" detail="Remove claude-multi and everything is as it was." class="col-span-2 sm:col-span-1" />
		<StatTile digits="dot" value="1" label="Command per provider" detail="claude-glm, claude-ds, claude-kimi, each with its own folder." />
		<StatTile digits="dot" accent value="8" label="Provider templates" detail="Anthropic, GLM, Kimi, DeepSeek, Qwen, MiniMax, MiMo and local." />
	</div>
</Story>
