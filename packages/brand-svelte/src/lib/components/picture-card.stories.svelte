<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import PictureCard from './picture-card.svelte'

	const { Story } = defineMeta({
		title: 'Custom/Picture card',
		component: PictureCard,
		parameters: { layout: 'fullscreen' },
	})
</script>

<Story name="Default" asChild>
	<div class="mx-auto grid max-w-[82rem] gap-x-6 gap-y-14 px-6 py-12 sm:grid-cols-2 lg:grid-cols-3">
		<PictureCard title="gpui-query" tag="Library" dek="Data loading for GPUI apps: typed keys, one shared cache and refetch in the background." meta="freeoxide · Rust" art="lanes" />
		<PictureCard title="Command-line tool" tag="Terminal" dek="A Rust binary your team installs with one command." meta="Rust" art="terminal" />
	</div>
</Story>
