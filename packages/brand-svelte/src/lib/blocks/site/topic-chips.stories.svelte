<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import TopicChips from './topic-chips.svelte'

	const { Story } = defineMeta({ title: 'Content/Topic chips', component: TopicChips })
</script>

<script lang="ts">
	import type { Tone } from '@hmziq/brand-core/tones'
	const tones: Record<string, Tone> = { Rust: 'orange', GPUI: 'blue', Tooling: 'teal', Writing: 'purple' }
	let topic = $state('Rust')
</script>

<!-- Topic buttons: the topic's color on its ring. The picked one gets a line in the text color. -->
<Story name="Default" asChild>
	<TopicChips items={['Rust', 'GPUI', 'Tooling', 'Writing']} bind:value={topic} onChange={(t) => (topic = t)} tone={(t) => tones[t]} />
</Story>
