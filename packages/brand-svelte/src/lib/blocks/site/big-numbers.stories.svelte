<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import BigNumbers from './big-numbers.svelte'

	const { Story } = defineMeta({ title: 'Content/Big numbers', component: BigNumbers })
</script>

<!-- Very large numbers under a strong line. About and changelog pages. -->
<Story name="Three" parameters={{ layout: 'fullscreen' }} asChild>
	<div class="px-6 py-16">
		<BigNumbers items={[['8', 'Sites in the family'], ['12', 'Years writing software'], ['1', 'Person doing it']]} />
	</div>
</Story>

<!-- Four numbers go two by two, then four across. -->
<Story name="Four" parameters={{ layout: 'fullscreen' }} asChild>
	<div class="px-6 py-16">
		<BigNumbers items={[['8', 'Sites'], ['24', 'Pieces'], ['120+', 'Blocks'], ['1', 'Person']]} />
	</div>
</Story>
