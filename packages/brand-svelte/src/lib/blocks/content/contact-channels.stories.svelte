<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import ContactChannels from './contact-channels.svelte'

	const { Story } = defineMeta({ title: 'Content/Contact/Channels', component: ContactChannels })
</script>

<script lang="ts">
	import { channels } from './stories-data.js'
</script>

<Story name="Default" asChild>
	<div class="max-w-xl px-6">
		<ContactChannels channels={channels} note="Replies from a person, on weekdays. It comes straight to the engineer writing your code." />
	</div>
</Story>
