<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import MenuDemo from './menu-demo.svelte'

	const { Story } = defineMeta({ title: 'Content/Menu demo', component: MenuDemo })
</script>

<script lang="ts">
	import { addInstance, listed, menu, settingsJson } from './stories-data.js'
</script>

<!-- The claude-multi TUI in a three-pane terminal. Arrow keys move, enter opens, esc backs out; Add new instance types its setup in. -->
<Story name="Default" asChild>
	<div class="max-w-5xl px-6">
		<MenuDemo {menu} addLines={addInstance} {listed} {settingsJson} />
	</div>
</Story>
