<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import DotName from './dot-name.svelte'

	const { Story } = defineMeta({
		title: 'Custom/Dot name',
		component: DotName,
		parameters: { layout: 'fullscreen' },
	})
</script>

<Story name="Default" asChild>
	<section data-pointer-host class="flex min-h-[24rem] items-center justify-center px-6">
		<h1 class="w-full"><DotName word="hmziq" class="mx-auto w-[min(100%,560px)]" /></h1>
	</section>
</Story>

<Story name="With the mark" asChild>
	<section data-pointer-host class="flex min-h-[24rem] items-center justify-center px-6">
		<h1 class="w-full"><DotName word="example■" label="example" class="mx-auto w-[min(100%,560px)]" /></h1>
	</section>
</Story>
