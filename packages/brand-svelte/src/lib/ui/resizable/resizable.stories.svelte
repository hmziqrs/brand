<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import ResizablePaneGroup from './resizable-pane-group.svelte'
	import ResizableHandle from './resizable-handle.svelte'
	import { Pane as ResizablePane } from 'paneforge'

	const { Story } = defineMeta({
		title: 'ui/base/ResizablePanelGroup',
		component: ResizablePaneGroup,
		parameters: { layout: 'centered' },
	})
</script>

<Story name="Default" asChild>
	<ResizablePaneGroup direction="horizontal" class="max-w-96 rounded-lg border">
		<ResizablePane defaultSize={50}>
			<div class="flex h-[200px] items-center justify-center p-6">
				<span class="font-semibold">One</span>
			</div>
		</ResizablePane>
		<ResizableHandle />
		<ResizablePane defaultSize={50}>
			<ResizablePaneGroup direction="vertical">
				<ResizablePane defaultSize={25}>
					<div class="flex h-full items-center justify-center p-6">
						<span class="font-semibold">Two</span>
					</div>
				</ResizablePane>
				<ResizableHandle />
				<ResizablePane defaultSize={75}>
					<div class="flex h-full items-center justify-center p-6">
						<span class="font-semibold">Three</span>
					</div>
				</ResizablePane>
			</ResizablePaneGroup>
		</ResizablePane>
	</ResizablePaneGroup>
</Story>
