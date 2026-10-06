<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import Slider from './slider.svelte'

	const { Story } = defineMeta({
		title: 'ui/base/Slider',
		component: Slider,
	})
</script>

<Story name="Default" asChild>
	<Slider type="single" value={33} max={100} step={1} />
</Story>

<Story name="Vertical" asChild>
	<Slider type="single" value={33} max={100} step={1} orientation="vertical" class="h-40" />
</Story>

<Story name="Disabled" asChild>
	<Slider type="single" value={33} max={100} step={1} disabled />
</Story>
