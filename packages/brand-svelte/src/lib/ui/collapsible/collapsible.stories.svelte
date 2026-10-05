<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import Info from '@lucide/svelte/icons/info'
	import CollapsibleRoot from './collapsible.svelte'
	import CollapsibleContent from './collapsible-content.svelte'
	import CollapsibleTrigger from './collapsible-trigger.svelte'

	const { Story } = defineMeta({
		title: 'ui/base/Collapsible',
		component: CollapsibleRoot,
		parameters: { layout: 'centered' },
	})
</script>

<script lang="ts">
	const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

	async function toggleTwice({ canvasElement }: { canvasElement: HTMLElement }) {
		await sleep(50)
		canvasElement.querySelector('button')?.click()
		await sleep(150)
		canvasElement.querySelector('button')?.click()
		await sleep(150)
	}
</script>

<Story name="Default" asChild>
	<CollapsibleRoot class="w-96">
		<CollapsibleTrigger class="flex gap-2">
			<h3 class="font-semibold">Can I use this in my project?</h3>
			<Info class="lucide size-6" />
		</CollapsibleTrigger>
		<CollapsibleContent>
			Yes. Free to use for personal and commercial projects. No attribution required.
		</CollapsibleContent>
	</CollapsibleRoot>
</Story>

<Story name="Disabled" asChild>
	<CollapsibleRoot class="w-96" disabled>
		<CollapsibleTrigger class="flex gap-2">
			<h3 class="font-semibold">Can I use this in my project?</h3>
			<Info class="lucide size-6" />
		</CollapsibleTrigger>
		<CollapsibleContent>
			Yes. Free to use for personal and commercial projects. No attribution required.
		</CollapsibleContent>
	</CollapsibleRoot>
</Story>

<Story
	name="when collapsable trigger is clicked, should show content"
	tags={['!dev', '!autodocs']}
	play={toggleTwice}
	asChild
>
	<CollapsibleRoot class="w-96">
		<CollapsibleTrigger class="flex gap-2">
			<h3 class="font-semibold">Can I use this in my project?</h3>
			<Info class="lucide size-6" />
		</CollapsibleTrigger>
		<CollapsibleContent>
			Yes. Free to use for personal and commercial projects. No attribution required.
		</CollapsibleContent>
	</CollapsibleRoot>
</Story>
