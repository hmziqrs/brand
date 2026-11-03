<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import ResolveTitle from './resolve-title.svelte'

	const { Story } = defineMeta({
		title: 'Custom/Resolve title',
		component: ResolveTitle,
		parameters: { layout: 'fullscreen' },
	})
</script>

<Story name="Default" asChild>
	<section data-pointer-host class="flex min-h-[24rem] items-center justify-center px-6 text-center">
		<ResolveTitle text="EXAMPLE LABS" class="text-[clamp(34px,8.6vw,128px)] leading-[1] font-light tracking-[0.16em] text-foreground uppercase [text-indent:0.16em]" />
	</section>
</Story>
