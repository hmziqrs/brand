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

	const sidebar = 'w-64 shrink-0 rounded-lg border bg-sidebar p-2'
</script>

<Story name="Workspace switcher" asChild>
	<div class="flex gap-6 p-6">
		<div class={sidebar}>
			<WorkspaceSwitcher workspaces={storyWorkspaces} currentId="ws_paperplane" />
		</div>
	</div>
</Story>

<Story name="Workspace switcher, create" asChild>
	<div class="flex gap-6 p-6">
		<div class={sidebar}>
			<WorkspaceSwitcher workspaces={storyWorkspaces} currentId="ws_northwind" createHref="/app/settings/workspace" />
		</div>
	</div>
</Story>

<Story name="Workspace switcher, collapsed" asChild>
	<div class="flex gap-6 p-6">
		<div class="group w-12 shrink-0 rounded-lg border bg-sidebar p-2" data-collapsible="icon">
			<WorkspaceSwitcher workspaces={storyWorkspaces} currentId="ws_paperplane" />
		</div>
	</div>
</Story>
