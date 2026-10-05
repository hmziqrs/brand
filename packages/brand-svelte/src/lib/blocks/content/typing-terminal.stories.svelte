<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import TypingTerminal from './typing-terminal.svelte'

	const { Story } = defineMeta({ title: 'Content/Typing terminal', component: TypingTerminal })
</script>

<script lang="ts">
	import { session } from './stories-data.js'
</script>

<!-- TerminalWindow replaying typed lines, at a fixed height (the lab's components page). Reduced motion shows the finished text. -->
<Story name="Default" asChild>
	<div class="px-6">
		<TypingTerminal lines={session} />
	</div>
</Story>
