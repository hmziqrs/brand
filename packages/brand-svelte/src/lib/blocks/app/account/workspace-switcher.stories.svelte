<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import WorkspaceSwitcher from './workspace-switcher.svelte'

	const { Story } = defineMeta({
		title: 'App/Account',
		component: WorkspaceSwitcher,
	})
</script>

<script lang="ts">
	import { storyWorkspaces } from '../stories-data.js'

	// The sidebar's own width, so the stories read as the real place.
	const sidebar = 'w-64 shrink-0 rounded-lg border bg-sidebar p-2'
</script>

<!-- Which workspace you're in, and links to the others. -->
<Story name="Workspace switcher" asChild>
	<div class="flex gap-6 p-6">
		<div class={sidebar}>
			<WorkspaceSwitcher workspaces={storyWorkspaces} currentId="ws_paperplane" />
		</div>
	</div>
</Story>

<!-- With a way to make another one at the bottom. -->
<Story name="Workspace switcher, create" asChild>
	<div class="flex gap-6 p-6">
		<div class={sidebar}>
			<WorkspaceSwitcher workspaces={storyWorkspaces} currentId="ws_northwind" createHref="/app/settings/workspace" />
		</div>
	</div>
</Story>

<!-- Inside a collapsed sidebar only the Mark stays, and the menu still opens. -->
<Story name="Workspace switcher, collapsed" asChild>
	<div class="flex gap-6 p-6">
		<div class="group w-12 shrink-0 rounded-lg border bg-sidebar p-2" data-collapsible="icon">
			<WorkspaceSwitcher workspaces={storyWorkspaces} currentId="ws_paperplane" />
		</div>
	</div>
</Story>
