<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import ReleaseLoop from './release-loop.svelte'

	const { Story } = defineMeta({
		title: 'Custom/Release loop',
		component: ReleaseLoop,
		parameters: { layout: 'fullscreen' },
	})
</script>

<Story name="Desktop release" asChild>
	<div class="mx-auto max-w-[82rem] px-6 py-12"><ReleaseLoop /></div>
</Story>
