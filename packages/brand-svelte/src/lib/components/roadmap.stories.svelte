<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import Roadmap from './roadmap.svelte'

	const { Story } = defineMeta({
		title: 'Custom/Roadmap',
		component: Roadmap,
		parameters: { layout: 'padded' },
	})
</script>

<Story name="Board" asChild>
	<Roadmap
		class="max-w-5xl"
		items={[
			{ title: 'Timeline view', body: 'Every task on a calendar, with what blocks what.', when: 'June', state: 'done' },
			{ title: 'Guest access', body: 'Clients see their project without an account.', when: 'August', state: 'done' },
			{ title: 'Recurring tasks', body: 'Weekly check-ins that make themselves.', state: 'now' },
			{ title: 'Mobile app', body: 'Boards and the Friday check-in on your phone.', state: 'now' },
			{ title: 'Time tracking', state: 'next' },
			{ title: 'Public roadmaps', body: 'Share a board as a page.', state: 'next' },
		]}
	/>
</Story>

