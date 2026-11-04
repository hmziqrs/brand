<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import ContactChannels from './contact-channels.svelte'

	const { Story } = defineMeta({ title: 'Content/Contact/Channels', component: ContactChannels })
</script>

<script lang="ts">
	import { channels } from './stories-data.js'
	import { contactData } from '$brand/blocks/site/stories-data-company.js'

	const cardChannels = contactData.channels
</script>

<Story name="Default" asChild>
	<div class="max-w-xl px-6">
		<ContactChannels channels={channels} note="Replies from a person, on weekdays. It comes straight to the engineer writing your code." />
	</div>
</Story>

<Story name="Cards" asChild>
	<div class="max-w-3xl px-6">
		<ContactChannels variant="cards" channels={cardChannels} note="Replies from a person · weekdays" />
	</div>
</Story>
