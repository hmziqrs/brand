<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import CommandEmpty from './command-empty.svelte'
	import CommandGroup from './command-group.svelte'
	import CommandInput from './command-input.svelte'
	import CommandItem from './command-item.svelte'
	import CommandList from './command-list.svelte'
	import CommandSeparator from './command-separator.svelte'
	import Command from './command.svelte'

	const { Story } = defineMeta({
		title: 'ui/base/Command',
		component: Command,
		parameters: { layout: 'centered' },
	})
</script>

<script lang="ts">
	const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

	async function typingInCombobox({ canvasElement }: { canvasElement: HTMLElement }) {
		await sleep(50)
		const input = canvasElement.querySelector('[role="combobox"]')
		if (!(input instanceof HTMLInputElement)) {
			throw new Error('the command input is missing')
		}
		const options = () => [...canvasElement.querySelectorAll('[role="option"]')]
		const named = (pattern: RegExp) =>
			options().filter((option) => pattern.test(option.textContent ?? ''))

		const type = async (text: string) => {
			input.value = text
			input.dispatchEvent(new Event('input', { bubbles: true }))
			await sleep(100)
		}

		await type('calen')
		if (named(/calendar/i).length !== 1) {
			throw new Error(`expected one calendar option, found ${named(/calendar/i).length}`)
		}

		await type('se')
		if (options().length <= 1) {
			throw new Error(`expected multiple options, found ${options().length}`)
		}
		if (named(/search/i).length !== 1) {
			throw new Error(`expected one search option, found ${named(/search/i).length}`)
		}

		await type('story')
		if (options().length !== 0) {
			throw new Error(`expected no options, found ${options().length}`)
		}
		if (!canvasElement.querySelector('[data-slot="command-empty"]')) {
			throw new Error('the no-results empty state did not show')
		}
	}
</script>

{#snippet menu()}
	<Command class="rounded-lg w-96 border shadow-md">
		<CommandInput placeholder="Type a command or search..." />
		<CommandList>
			<CommandEmpty>No results found.</CommandEmpty>
			<CommandGroup heading="Suggestions">
				<CommandItem>Calendar</CommandItem>
				<CommandItem>Search Emoji</CommandItem>
				<CommandItem disabled>Calculator</CommandItem>
			</CommandGroup>
			<CommandSeparator />
			<CommandGroup heading="Settings">
				<CommandItem>Profile</CommandItem>
				<CommandItem>Billing</CommandItem>
				<CommandItem>Settings</CommandItem>
			</CommandGroup>
		</CommandList>
	</Command>
{/snippet}

<Story name="Default" asChild>
	{@render menu()}
</Story>

<Story
	name="Typing In Combobox"
	tags={['!dev', '!autodocs']}
	play={typingInCombobox}
	asChild
>
	{@render menu()}
</Story>
