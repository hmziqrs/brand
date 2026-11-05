<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import AppMock from './app-mock.svelte'

	const { Story } = defineMeta({
		title: 'Custom/App mock',
		component: AppMock,
		parameters: { layout: 'fullscreen' },
	})
</script>

<Story name="Kinds" asChild>
	<div class="mx-auto grid max-w-[82rem] items-center gap-8 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
		<AppMock kind="phone" class="mx-auto max-w-[220px] bg-background" />
		<AppMock kind="desktop" title="Ledgerline" class="mx-auto max-w-[440px] bg-background" />
		<AppMock kind="web" class="mx-auto max-w-[300px] bg-background" />
		<AppMock kind="terminal" class="mx-auto max-w-[300px]" />
	</div>
</Story>
