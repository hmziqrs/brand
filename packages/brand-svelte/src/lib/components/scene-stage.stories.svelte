<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import SceneStage from './scene-stage.svelte'

	const { Story } = defineMeta({
		title: 'Custom/Scene stage',
		component: SceneStage,
		parameters: { layout: 'fullscreen' },
	})
</script>

<Story name="Lattice" asChild>
	<section class="relative isolate min-h-[30rem] overflow-hidden">
		<SceneStage seed="scene-stage" class="-z-10" />
		<div class="mx-auto max-w-[82rem] px-6 py-28">
			<h2 class="max-w-[14ch] text-5xl leading-[0.95] font-semibold tracking-[-0.045em]">A scene beside the <span class="text-primary">words.</span></h2>
		</div>
	</section>
</Story>
