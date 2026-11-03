<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import HeatField from './heat-field.svelte'
	import FitWordmark from './fit-wordmark.svelte'

	const { Story } = defineMeta({
		title: 'Custom/Heat field',
		component: HeatField,
		parameters: { layout: 'fullscreen' },
	})
</script>

<Story name="Default" asChild>
	<div class="relative pt-24">
		<div class="relative h-[clamp(150px,21vw,300px)]"><HeatField class="[mask-image:linear-gradient(to_bottom,black_58%,transparent)]" /></div>
		<div class="relative mx-auto -mt-[clamp(52px,9.6vw,136px)] max-w-[82rem] px-6 pb-16"><FitWordmark name="example" max={250} /></div>
	</div>
</Story>
