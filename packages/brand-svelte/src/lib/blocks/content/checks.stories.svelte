<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import Checks from './checks.svelte'

	const { Story } = defineMeta({ title: 'Content/Checks', component: Checks })
</script>

<script lang="ts">
	import { installChecks } from './stories-data.js'
</script>

<!-- Met requirements as filled green rings, wrapping horizontally (claude-multi's own variant). -->
<Story name="Default" asChild>
	<div class="px-6">
		<Checks items={installChecks} />
	</div>
</Story>
