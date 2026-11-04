<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import DragWindow from './drag-window.svelte'
	import MaterialWash from './material-wash.svelte'

	const { Story } = defineMeta({ title: 'Custom/Drag window', component: DragWindow, parameters: { layout: 'fullscreen' } })
</script>

<script lang="ts">
	import EndpointsSketch from '$brand/blocks/content/stories-data-endpoints-sketch.svelte'
</script>

<Story name="On a material" asChild>
	<div data-window-bounds class="relative isolate overflow-hidden px-6 py-16 sm:px-12">
		<MaterialWash preset="copper-sweep" />
		<DragWindow title="blog.hmziq.rs" class="mx-auto max-w-[40rem]">
			<EndpointsSketch />
		</DragWindow>
	</div>
</Story>
