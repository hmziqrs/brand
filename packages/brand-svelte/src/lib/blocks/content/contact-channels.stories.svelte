<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import ContactChannels from './contact-channels.svelte'

	const { Story } = defineMeta({ title: 'Content/Contact channels', component: ContactChannels })
</script>

<script lang="ts">
	import { channels } from './stories-data.js'
</script>

<!-- The channel list, with oxlabs.dev's own channels. Email opens the mail app; the address never appears in the page text. -->
<Story name="Default" asChild>
	<div class="max-w-xl px-6">
		<ContactChannels channels={channels} note="Replies from a person, on weekdays. It comes straight to the engineer writing your code." />
	</div>
</Story>
