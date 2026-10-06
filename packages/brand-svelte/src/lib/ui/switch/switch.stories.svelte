<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import { Label } from '$brand/ui/label/index.js'
	import Switch from './switch.svelte'

	const { Story } = defineMeta({
		title: 'ui/base/Switch',
		component: Switch,
		parameters: { layout: 'centered' },
	})
</script>

<script lang="ts">
	const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

	async function toggleSwitch({ canvasElement }: { canvasElement: HTMLElement }) {
		await sleep(50)
		const switchButton = canvasElement.querySelector('[role="switch"]')
		if (!(switchButton instanceof HTMLElement)) throw new Error('the switch is missing')
		switchButton.click()
		await sleep(100)
		if (switchButton.getAttribute('aria-checked') !== 'true') throw new Error('the switch did not turn on')
		switchButton.click()
		await sleep(100)
		if (switchButton.getAttribute('aria-checked') !== 'false') throw new Error('the switch did not turn off')
	}
</script>

{#snippet field(id: string, disabled = false)}
	<div class="flex items-center space-x-2">
		<Switch {id} {disabled} />
		<Label for={id}>Airplane Mode</Label>
	</div>
{/snippet}

<Story name="Default" asChild>
	{@render field('default-switch')}
</Story>

<Story name="Disabled" asChild>
	{@render field('disabled-switch', true)}
</Story>

<Story
	name="when clicking the switch, should toggle it on and off"
	tags={['!dev', '!autodocs']}
	play={toggleSwitch}
	asChild
>
	{@render field('default-switch')}
</Story>
