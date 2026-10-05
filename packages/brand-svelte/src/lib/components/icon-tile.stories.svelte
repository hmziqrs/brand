<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import Check from '@lucide/svelte/icons/check'
	import Database from '@lucide/svelte/icons/database'
	import Info from '@lucide/svelte/icons/info'
	import PenLine from '@lucide/svelte/icons/pen-line'
	import TriangleAlert from '@lucide/svelte/icons/triangle-alert'
	import IconTile from './icon-tile.svelte'

	const { Story } = defineMeta({
		title: 'Custom/Icon tile',
		component: IconTile,
	})
</script>

<!-- Orange icon in a thin outline, no fill: the default for features. -->
<Story name="Default" asChild>
	<IconTile>
		<Database class="lucide" />
	</IconTile>
</Story>

<!-- A soft color, only when the color means something. -->
<Story name="Tones" asChild>
	<div class="flex gap-3">
		<IconTile>
			<Database class="lucide" />
		</IconTile>
		<IconTile tone="success">
			<Check class="lucide" />
		</IconTile>
		<IconTile tone="warning">
			<TriangleAlert class="lucide" />
		</IconTile>
		<IconTile tone="info">
			<Info class="lucide" />
		</IconTile>
		<IconTile tone="purple">
			<PenLine class="lucide" />
		</IconTile>
	</div>
</Story>
