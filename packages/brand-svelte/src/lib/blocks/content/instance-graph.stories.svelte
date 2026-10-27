<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import InstanceGraph from './instance-graph.svelte'

	const { Story } = defineMeta({ title: 'Content/Docs/Instance graph', component: InstanceGraph })
</script>

<script lang="ts">
	import { inside, instances } from './stories-data.js'

	function pickByKeyboard({ canvasElement }: { canvasElement: HTMLElement }) {
		const card = canvasElement.querySelectorAll('[role="button"]')[2]
		if (!(card instanceof HTMLElement)) throw new Error('the instance cards are missing')
		card.focus()
		card.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))
		if (card.getAttribute('aria-pressed') !== 'true') throw new Error('Enter did not pick the focused card')
		if (!canvasElement.textContent?.includes('~/.claude-multi/cheap/')) throw new Error('the panel did not follow the pick')
	}
</script>

<Story name="Default" asChild>
	<div class="max-w-5xl px-6">
		<InstanceGraph {instances} {inside} />
	</div>
</Story>

<Story name="Keyboard" play={pickByKeyboard} asChild>
	<div class="max-w-5xl px-6">
		<InstanceGraph {instances} {inside} />
	</div>
</Story>
