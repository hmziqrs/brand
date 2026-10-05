<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import Notice from './notice.svelte'

	const { Story } = defineMeta({
		title: 'Custom/Notice',
		component: Notice,
		args: { tone: 'info' },
	})
</script>

<Story name="Info" asChild>
	<div class="max-w-xl">
		<Notice tone="info" title="Works with Claude Code 2">
			Older versions start, but plugins and skills won't be linked.
		</Notice>
	</div>
</Story>

<Story name="Success" asChild>
	<div class="max-w-xl">
		<Notice tone="success" title="Your settings were saved">
			They'll be used the next time the app opens.
		</Notice>
	</div>
</Story>

<Story name="Warning" asChild>
	<div class="max-w-xl">
		<Notice tone="warning" title="Back up your settings first">
			Updating replaces the settings file. Your old one is kept as settings.old.
		</Notice>
	</div>
</Story>

<Story name="Destructive" asChild>
	<div class="max-w-xl">
		<Notice tone="destructive" title="This deletes the setup">
			Its settings, history and sign-in are removed. Your other setups aren't touched.
		</Notice>
	</div>
</Story>

<Story name="Title only" asChild>
	<div class="max-w-xl">
		<Notice tone="info" title="New in 0.4: pages load in both directions." />
	</div>
</Story>
