<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import InstallSteps from './install-steps.svelte'

	const { Story } = defineMeta({ title: 'Content/Docs/Install steps', component: InstallSteps })
</script>

<script lang="ts">
	import { installSteps } from './stories-data.js'
</script>

<Story name="Default" asChild>
	<div class="max-w-[52rem] px-6">
		<InstallSteps steps={installSteps} />
	</div>
</Story>
