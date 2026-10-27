<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import TypingTerminal from './typing-terminal.svelte'

	const { Story } = defineMeta({ title: 'Content/Docs/Typing terminal', component: TypingTerminal })
</script>

<script lang="ts">
	import { session } from './stories-data.js'
</script>

<Story name="Default" asChild>
	<div class="px-6">
		<TypingTerminal lines={session} />
	</div>
</Story>
