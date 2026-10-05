<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import InstallBlock from './install-block.svelte'

	const { Story } = defineMeta({ title: 'Content/Install block', component: InstallBlock })
</script>

<script lang="ts">
	import { installChecks, installs } from './stories-data.js'
</script>

<!-- Install with the package manager you have: the switch, the command, the requirements. -->
<Story name="Default" asChild>
	<div class="px-6">
		<InstallBlock commands={installs} items={installChecks} />
	</div>
</Story>
