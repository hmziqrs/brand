<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import Progress from './progress.svelte'

	const { Story } = defineMeta({
		title: 'ui/base/Progress',
		component: Progress,
	})
</script>

<Story name="Default" asChild>
	<Progress aria-label="Progress" value={30} max={100} />
</Story>

<Story name="Indeterminate" asChild>
	<Progress aria-label="Loading" max={100} />
</Story>

<Story name="Completed" asChild>
	<Progress aria-label="Progress" value={100} max={100} />
</Story>
