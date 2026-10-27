<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import InstallBlock from './install-block.svelte'

	const { Story } = defineMeta({ title: 'Content/Docs/Install block', component: InstallBlock })
</script>

<script lang="ts">
	import { installChecks, installs } from './stories-data.js'
</script>

<Story name="Default" asChild>
	<div class="px-6">
		<InstallBlock commands={installs} items={installChecks} />
	</div>
</Story>
