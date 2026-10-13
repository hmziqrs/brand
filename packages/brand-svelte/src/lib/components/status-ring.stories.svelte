<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import StatusRing from './status-ring.svelte'

	const { Story } = defineMeta({
		title: 'Custom/Status ring',
		component: StatusRing,
	})
</script>

<!-- On, off and stale, always next to the word that says so. -->
<Story name="States" asChild>
	<ul class="flex flex-col gap-3 text-sm">
		<li class="flex items-center gap-2"><StatusRing state="on" />Live</li>
		<li class="flex items-center gap-2"><StatusRing state="on" color="var(--green)" />Staying awake</li>
		<li class="flex items-center gap-2"><StatusRing state="stale" />Stale: its worker stopped</li>
		<li class="flex items-center gap-2"><StatusRing state="off" />Off</li>
	</ul>
</Story>
