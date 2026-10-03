<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import InstanceGraph from './instance-graph.svelte'

	const { Story } = defineMeta({ title: 'Content/Instance graph', component: InstanceGraph })
</script>

<script lang="ts">
	import { inside, instances } from './stories-data.js'
</script>

<!-- The ~/.claude-multi folder tree. Click or tab through the instances; the picked one's line lights up. -->
<Story name="Default" asChild>
	<div class="max-w-5xl px-6">
		<InstanceGraph {instances} {inside} />
	</div>
</Story>
