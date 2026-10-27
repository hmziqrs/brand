<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import FileDrop, { type DropItem } from './file-drop.svelte'

	const { Story } = defineMeta({
		title: 'Custom/File drop',
		component: FileDrop,
		parameters: { layout: 'padded' },
	})
</script>

<script lang="ts">
	let items = $state<DropItem[]>([
		{ id: 'a', name: 'design-review.pdf', size: 2_516_582 },
		{ id: 'b', name: 'screenshot-dark.png', size: 831_488, progress: 0.46 },
		{ id: 'c', name: 'recording.mov', size: 75_497_472, error: 'Too big: 72 MB. The limit is 64 MB a file.' },
	])

	function add(files: File[]) {
		const added = files.map((f) => ({ id: `${f.name}-${f.size}-${Math.random()}`, name: f.name, size: f.size, progress: 0 }))
		items = [...items, ...added]
		for (const item of added) {
			const timer = setInterval(() => {
				items = items.map((i) => (i.id === item.id ? { ...i, progress: Math.min(1, (i.progress ?? 0) + 0.2) } : i))
				if ((items.find((i) => i.id === item.id)?.progress ?? 1) >= 1) clearInterval(timer)
			}, 400)
		}
	}
</script>

<Story name="Default" asChild>
	<FileDrop class="max-w-lg" hint="Up to 64 MB a file" {items} onfiles={add} onremove={(item) => (items = items.filter((i) => i.id !== item.id))} />
</Story>
