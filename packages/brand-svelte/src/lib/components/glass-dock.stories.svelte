<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import ArrowUp from '@lucide/svelte/icons/arrow-up'
	import Archive from '@lucide/svelte/icons/archive'
	import FolderInput from '@lucide/svelte/icons/folder-input'
	import Link from '@lucide/svelte/icons/link'
	import ListTree from '@lucide/svelte/icons/list-tree'
	import Share from '@lucide/svelte/icons/share'
	import Trash2 from '@lucide/svelte/icons/trash-2'
	import GlassDock from './glass-dock.svelte'
	import ShaderMaterial from './shader-material.svelte'
	import { Button } from '$brand/ui/button/index.js'

	const { Story } = defineMeta({
		title: 'Custom/Glass dock',
		component: GlassDock,
		parameters: { layout: 'fullscreen' },
	})
</script>

{#snippet contents()}<ListTree class="lucide" />{/snippet}
{#snippet link()}<Link class="lucide" />{/snippet}
{#snippet share()}<Share class="lucide" />{/snippet}
{#snippet top()}<ArrowUp class="lucide" />{/snippet}
{#snippet archive()}<Archive class="lucide" />{/snippet}
{#snippet move()}<FolderInput class="lucide" />{/snippet}
{#snippet trash()}<Trash2 class="lucide" />{/snippet}

<Story name="Reading" asChild>
	<div class="relative isolate grid min-h-80 place-items-end justify-center overflow-hidden p-8">
		<ShaderMaterial rendering="image" preset="etched-silk" controls={false} class="absolute inset-0 -z-10" />
		<GlassDock
			label="Page actions"
			items={[
				{ label: 'Contents', icon: contents, pressed: true },
				{ label: 'Copy link', icon: link },
				{ label: 'Share', icon: share },
				'separator',
				{ label: 'Back to top', icon: top, href: '#' },
			]}
		/>
	</div>
</Story>

<Story name="Selection" asChild>
	<div class="relative isolate grid min-h-80 place-items-end justify-center overflow-hidden p-8">
		<ShaderMaterial rendering="image" preset="brushed-alloy" controls={false} class="absolute inset-0 -z-10" />
		<GlassDock
			label="3 projects selected"
			items={[
				{ label: 'Archive', icon: archive },
				{ label: 'Move', icon: move },
				{ label: 'Delete', icon: trash },
			]}
		>
			{#snippet lead()}3 selected{/snippet}
			{#snippet action()}<Button size="sm" class="rounded-full">Done</Button>{/snippet}
		</GlassDock>
	</div>
</Story>
